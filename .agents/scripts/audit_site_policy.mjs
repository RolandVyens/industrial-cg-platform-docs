import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')
const docsRoot = path.join(repoRoot, 'docs')
const distRoot = path.join(docsRoot, '.vitepress/dist')
const lastmodFile = path.join(docsRoot, '.vitepress/git-lastmod.json')

const errors = []

function walkFiles(dir, exts, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.vitepress' || entry.name === 'node_modules') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkFiles(full, exts, out)
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      out.push(full)
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// Gate A: Factual redlines across docs/**/*.md and docs/public/llms*.txt
// ---------------------------------------------------------------------------
const contentFiles = walkFiles(docsRoot, ['.md', '.txt']).filter((full) => {
  const rel = path.relative(docsRoot, full).replace(/\\/g, '/')
  return rel.endsWith('.md') || rel === 'public/llms.txt' || rel === 'public/llms-full.txt'
})

const gpl2Allowlist = new Set([
  'en/industrial-cg-platform/about/index.md',
  'zh/industrial-cg-platform/about/index.md',
  'fr/industrial-cg-platform/about/index.md',
])

const faqPages = []

for (const full of contentFiles) {
  const rel = path.relative(docsRoot, full).replace(/\\/g, '/')
  const raw = fs.readFileSync(full, 'utf8')
  const lines = raw.split(/\r?\n/)

  lines.forEach((line, idx) => {
    const lineNo = idx + 1
    if (/\bcuda\b/i.test(line)) {
      errors.push(`[CUDA] docs/${rel}:${lineNo} mentions CUDA (platform supports NVIDIA RTX OptiX + CPU only)`)
    }
    if (/Rocky Linux 9|\bRocky 9\b/i.test(line)) {
      errors.push(`[LINUX] docs/${rel}:${lineNo} mentions stale "Rocky Linux 9" (Linux Beta 1 uses Rocky Linux 8.10 / EL8 baseline)`)
    }
    if (!gpl2Allowlist.has(rel) && /GPL-2\.0|\bGPL\s*v2\b/i.test(line)) {
      errors.push(`[LICENSE] docs/${rel}:${lineNo} mentions GPL-2.0 (platform license is GPL-3.0-or-later)`)
    }
  })

  if (rel.endsWith('.md') && rel !== 'index.md') {
    const parsed = matter(raw)
    if (parsed.data?.faq === true || rel.endsWith('/guide/faq.md')) {
      faqPages.push(rel)
    }
  }
}

// ---------------------------------------------------------------------------
// Gate B: Built HTML SEO, JSON-LD (FAQPage / canonical / og:image / hreflang)
// ---------------------------------------------------------------------------
if (!fs.existsSync(distRoot)) {
  errors.push('[DIST] docs/.vitepress/dist is missing. Run `npm run docs:build` first.')
} else {
  const sitemapPath = path.join(distRoot, 'sitemap.xml')
  const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : ''
  if (!sitemap) {
    errors.push('[SITEMAP] docs/.vitepress/dist/sitemap.xml is missing or empty.')
  }

  for (const rel of faqPages) {
    const htmlRel = rel.endsWith('/index.md')
      ? rel.replace(/\/index\.md$/, '/index.html')
      : rel.replace(/\.md$/, '.html')
    const htmlPath = path.join(distRoot, htmlRel)

    if (!fs.existsSync(htmlPath)) {
      errors.push(`[SEO] Missing built HTML for ${rel}: expected ${htmlRel}`)
      continue
    }

    const html = fs.readFileSync(htmlPath, 'utf8')
    const canon = (html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i) || [])[1]
    const ogImage = (html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) || [])[1]
    const hreflangs = (html.match(/<link[^>]*rel="alternate"[^>]*hreflang=/gi) || []).length

    if (!canon || !canon.startsWith('https://cgweave.com/')) {
      errors.push(`[SEO] ${htmlRel} missing valid canonical URL`)
    } else if (sitemap && !sitemap.includes(`<loc>${canon}</loc>`)) {
      errors.push(`[SEO] ${htmlRel} canonical (${canon}) missing from sitemap.xml`)
    }

    if (!ogImage || !ogImage.startsWith('https://cgweave.com/')) {
      errors.push(`[SEO] ${htmlRel} missing valid absolute og:image`)
    }

    if (/^(en|zh|fr)\//.test(rel) && hreflangs !== 4) {
      errors.push(`[SEO] ${htmlRel} expected 4 hreflang alternates, got ${hreflangs}`)
    }

    const ldBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
      .map((m) => {
        try {
          return JSON.parse(m[1])
        } catch (err) {
          errors.push(`[JSON-LD] ${htmlRel} contains invalid JSON-LD: ${err.message}`)
          return null
        }
      })
      .filter(Boolean)

    const faqBlock = ldBlocks.find((b) => b['@type'] === 'FAQPage')
    if (!faqBlock || !Array.isArray(faqBlock.mainEntity) || faqBlock.mainEntity.length === 0) {
      errors.push(`[FAQPage] ${htmlRel} declares FAQ but built FAQPage JSON-LD is missing or has 0 questions`)
    }
  }
}

// ---------------------------------------------------------------------------
// Gate C: git-lastmod.json blob SHA parity with HEAD docs/**/*.md
// ---------------------------------------------------------------------------
if (!fs.existsSync(lastmodFile)) {
  errors.push('[LASTMOD] docs/.vitepress/git-lastmod.json is missing. Run `npm run update:lastmod`.')
} else {
  const lastmodMap = JSON.parse(fs.readFileSync(lastmodFile, 'utf8'))
  const treeOut = execFileSync('git', ['ls-tree', '-r', 'HEAD', '--', 'docs'], {
    cwd: repoRoot,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  })

  const headMdBlobs = {}
  for (const line of treeOut.split(/\r?\n/)) {
    const match = line.match(/^\d+\s+blob\s+([0-9a-f]+)\tdocs\/(.+\.md)$/)
    if (!match) continue
    const [, blob, rel] = match
    if (rel.startsWith('.vitepress/') || rel.startsWith('public/')) continue
    headMdBlobs[rel] = blob
  }

  let staleCount = 0
  for (const [rel, blob] of Object.entries(headMdBlobs)) {
    const entry = lastmodMap[rel]
    if (!entry || entry.blob !== blob || !entry.lastmod) {
      staleCount += 1
      if (staleCount <= 10) {
        errors.push(`[LASTMOD] docs/${rel} blob mismatch in git-lastmod.json (run \`npm run update:lastmod\`)`)
      }
    }
  }
  if (staleCount > 10) {
    errors.push(`[LASTMOD] ... and ${staleCount - 10} more stale entries in git-lastmod.json`)
  }
}

if (errors.length > 0) {
  console.error(`SITE POLICY AUDIT FAILED (${errors.length} issue(s)):`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}

console.log(
  `ALL SITE POLICY CHECKS PASSED. Checked ${contentFiles.length} content file(s), ${faqPages.length} FAQ page(s), and git-lastmod.json parity.`
)
