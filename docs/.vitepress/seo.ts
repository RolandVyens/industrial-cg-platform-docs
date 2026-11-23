import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import type { HeadConfig, PageData, SitemapItem, TransformContext } from 'vitepress'

export const SITE_ORIGIN = 'https://cgweave.com'
export const BASE_URL = `${SITE_ORIGIN}/`
const DOCS_ROOT = path.resolve('docs')
const LASTMOD_MAP_PATH = path.resolve('docs/.vitepress/git-lastmod.json')

const DEFAULT_FALLBACK_DESCRIPTION =
  'A Blender-based VFX platform with native Deep EXR, EXR overscan, lightgroup lobe passes and production ViewLayer tools.'

interface LocaleInfo {
  code: 'en' | 'zh' | 'fr'
  ogLocale: string
  ogAlternates: string[]
  inLanguage: string
  homeUrl: string
  homeLabel: string
  platformLabel: string
  toolsLabel: string
  apiLabel: string
  releasesLabel: string
  manualLabel: string
  blogLabel: string
}

const LOCALE_META: Record<'en' | 'zh' | 'fr', LocaleInfo> = {
  en: {
    code: 'en',
    ogLocale: 'en_US',
    ogAlternates: ['zh_CN', 'fr_FR'],
    inLanguage: 'en',
    homeUrl: `${BASE_URL}en/`,
    homeLabel: 'Home',
    platformLabel: 'Industrial CG Platform',
    toolsLabel: 'Pipeline Tools',
    apiLabel: 'API Reference',
    releasesLabel: 'Releases',
    manualLabel: 'Manual',
    blogLabel: 'Blog',
  },
  zh: {
    code: 'zh',
    ogLocale: 'zh_CN',
    ogAlternates: ['en_US', 'fr_FR'],
    inLanguage: 'zh-Hans',
    homeUrl: `${BASE_URL}zh/`,
    homeLabel: '首页',
    platformLabel: 'Industrial CG Platform',
    toolsLabel: '管线插件与流程工具',
    apiLabel: 'API 参考',
    releasesLabel: '版本发布',
    manualLabel: '用户手册',
    blogLabel: 'Blog',
  },
  fr: {
    code: 'fr',
    ogLocale: 'fr_FR',
    ogAlternates: ['en_US', 'zh_CN'],
    inLanguage: 'fr',
    homeUrl: `${BASE_URL}fr/`,
    homeLabel: 'Accueil',
    platformLabel: 'Industrial CG Platform',
    toolsLabel: 'Outils de Pipeline',
    apiLabel: 'Référence API',
    releasesLabel: 'Versions',
    manualLabel: 'Manuel',
    blogLabel: 'Blog',
  },
}

const PLUGIN_SCHEMA: Record<
  string,
  {
    type: 'SoftwareApplication' | 'CreativeWork'
    name: string
    applicationCategory?: string
    operatingSystem?: string
    softwareVersion?: string
    license?: string
  }
> = {
  'industrial-aov-connector': {
    type: 'SoftwareApplication',
    name: 'Industrial AOV Connector',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Blender 4.x / 5.x (Windows, macOS, Linux)',
    softwareVersion: '5.3.0',
    license: 'https://www.gnu.org/licenses/gpl-3.0.html',
  },
  'industrial-light-aov-splitter': {
    type: 'SoftwareApplication',
    name: 'Industrial Light AOV Splitter',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Blender (Windows, macOS, Linux)',
  },
  'auto-light-shuffle': {
    type: 'SoftwareApplication',
    name: 'Auto Light Shuffle',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Foundry Nuke (Windows, macOS, Linux)',
  },
  'aio-ocio': {
    type: 'CreativeWork',
    name: 'AIO-OCIO',
  },
}

interface LastmodEntry {
  lastmod: string
  blob?: string
}

interface GitLastmodState {
  isShallow: boolean
  staticMap: Record<string, LastmodEntry>
  shallowOverrides: Record<string, string>
  headBlobs: Record<string, string>
  headCommitIso: string
}

let cachedLastmodState: GitLastmodState | null = null

function parseStaticMap(raw: unknown): Record<string, LastmodEntry> {
  if (!raw || typeof raw !== 'object') return {}
  const out: Record<string, LastmodEntry> = {}
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof v === 'string') {
      out[k] = { lastmod: v }
    } else if (v && typeof v === 'object' && typeof (v as LastmodEntry).lastmod === 'string') {
      out[k] = {
        lastmod: (v as LastmodEntry).lastmod,
        ...(typeof (v as LastmodEntry).blob === 'string' ? { blob: (v as LastmodEntry).blob } : {}),
      }
    }
  }
  return out
}

function getGitLastmodState(): GitLastmodState {
  if (cachedLastmodState) return cachedLastmodState

  let isShallow = false
  try {
    isShallow =
      execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
        encoding: 'utf8',
      }).trim() === 'true'
  } catch {
    isShallow = false
  }

  let staticMap: Record<string, LastmodEntry> = {}
  if (fs.existsSync(LASTMOD_MAP_PATH)) {
    try {
      staticMap = parseStaticMap(JSON.parse(fs.readFileSync(LASTMOD_MAP_PATH, 'utf8')))
    } catch {
      staticMap = {}
    }
  }

  const shallowOverrides: Record<string, string> = {}
  const headBlobs: Record<string, string> = {}
  let headCommitIso = ''

  if (isShallow) {
    try {
      const headTs = execFileSync('git', ['log', '-1', '--format=%cI', 'HEAD'], {
        encoding: 'utf8',
      }).trim()
      if (headTs) headCommitIso = new Date(headTs).toISOString()

      const treeOut = execFileSync('git', ['ls-tree', '-r', 'HEAD', '--', 'docs'], {
        encoding: 'utf8',
        maxBuffer: 16 * 1024 * 1024,
      })
      for (const line of treeOut.split(/\r?\n/)) {
        const match = line.match(/^\d+\s+blob\s+([0-9a-f]+)\tdocs\/(.+\.md)$/)
        if (match) headBlobs[match[2]] = match[1]
      }

      // Only trust git log --name-only for commits that have a parent in this shallow repo;
      // grafted shallow-root commits list every file in the repository.
      const logOut = execFileSync(
        'git',
        ['log', '--name-only', '--pretty=format:__COMMIT__%cI|%P', '--', 'docs'],
        { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
      )
      let currentIso = ''
      let hasParent = false
      for (const rawLine of logOut.split(/\r?\n/)) {
        const line = rawLine.trim()
        if (!line) continue
        if (line.startsWith('__COMMIT__')) {
          const [isoRaw, parentsRaw = ''] = line.slice('__COMMIT__'.length).split('|')
          hasParent = parentsRaw.trim().length > 0
          currentIso = hasParent && isoRaw ? new Date(isoRaw).toISOString() : ''
        } else if (
          hasParent &&
          currentIso &&
          line.startsWith('docs/') &&
          (line.endsWith('.md') || line === 'docs/feature-tracking.data.json')
        ) {
          const relFromDocs = line.slice('docs/'.length)
          if (!shallowOverrides[relFromDocs]) {
            shallowOverrides[relFromDocs] = currentIso
          }
        }
      }
    } catch {
      // Fall back to staticMap only
    }
  }

  cachedLastmodState = { isShallow, staticMap, shallowOverrides, headBlobs, headCommitIso }
  return cachedLastmodState
}

function resolveShallowIso(relativePath: string): string | undefined {
  const state = getGitLastmodState()
  if (!state.isShallow) return undefined
  let iso: string | undefined = state.shallowOverrides[relativePath]
  if (!iso) {
    const entry = state.staticMap[relativePath]
    const headBlob = state.headBlobs[relativePath]
    if (entry) {
      if (!entry.blob || !headBlob || entry.blob === headBlob) {
        iso = entry.lastmod
      } else {
        iso = state.headCommitIso || entry.lastmod
      }
    } else {
      iso = state.headCommitIso || undefined
    }
  }
  if (/^(en|zh|fr)\/feature-tracking\.md$/.test(relativePath)) {
    const dataIso = state.shallowOverrides['feature-tracking.data.json']
    if (dataIso && (!iso || Date.parse(dataIso) > Date.parse(iso))) {
      iso = dataIso
    }
  }
  return iso
}

export function resolveFallbackTimestamp(relativePath: string): number | undefined {
  const iso = resolveShallowIso(relativePath)
  if (!iso) return undefined
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? undefined : ms
}

function resolveRelPathFromSitemapUrl(url: string): string | null {
  const trimmed = url.replace(/^\/+|\/+$/g, '')
  if (!trimmed) return 'index.md'
  const indexCandidate = `${trimmed}/index.md`
  if (fs.existsSync(path.join(DOCS_ROOT, indexCandidate))) {
    return indexCandidate
  }
  const mdCandidate = `${trimmed}.md`
  if (fs.existsSync(path.join(DOCS_ROOT, mdCandidate))) {
    return mdCandidate
  }
  return null
}

const HREFLANG_MAP: Record<string, string> = {
  'en-US': 'en',
  'zh-CN': 'zh-Hans',
  'fr-FR': 'fr',
}

export function transformSitemapItems(items: SitemapItem[]): SitemapItem[] {
  const state = getGitLastmodState()
  return items
    .filter((item) => item.url !== '' && item.url !== '/')
    .map((item) => {
      const updated = { ...item }
      if (state.isShallow) {
        const relPath = resolveRelPathFromSitemapUrl(item.url)
        if (relPath) {
          const iso = resolveShallowIso(relPath)
          if (iso) {
            updated.lastmod = iso
          }
        }
      }
      if (Array.isArray(item.links) && item.links.length > 0) {
        const normalizedLinks = item.links.map((link) => ({
          ...link,
          lang: HREFLANG_MAP[link.lang] ?? link.lang,
        }))
        const enLink = normalizedLinks.find((link) => link.lang === 'en')
        if (enLink && !normalizedLinks.some((link) => link.lang === 'x-default')) {
          normalizedLinks.push({ lang: 'x-default', url: enLink.url })
        }
        updated.links = normalizedLinks
      }
      return updated
    })
}

export function toCleanPath(relativePath: string): string {
  return relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
}

export function toCanonicalUrl(relativePath: string): string {
  const cleanPath = toCleanPath(relativePath)
  if (!cleanPath) {
    return `${BASE_URL}en/`
  }
  return `${BASE_URL}${cleanPath}`
}

function resolveLocaleInfo(relativePath: string): LocaleInfo & { isBlog: boolean } {
  if (relativePath.startsWith('zh/')) {
    return { ...LOCALE_META.zh, isBlog: false }
  }
  if (relativePath.startsWith('fr/')) {
    return { ...LOCALE_META.fr, isBlog: false }
  }
  if (relativePath.startsWith('blog/')) {
    const isZhBlog = relativePath.includes('2026-06-29-code-quality-month')
    return {
      ...LOCALE_META.en,
      ogLocale: isZhBlog ? 'zh_CN' : 'en_US',
      ogAlternates: [],
      inLanguage: isZhBlog ? 'zh-Hans' : 'en',
      isBlog: true,
    }
  }
  return { ...LOCALE_META.en, isBlog: false }
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractFaqEntities(
  relativePath: string,
  faqSectionOnly = false
): Array<Record<string, unknown>> {
  const fullPath = path.join(DOCS_ROOT, relativePath)
  if (!fs.existsSync(fullPath)) return []
  const raw = fs.readFileSync(fullPath, 'utf8')
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  const lines = body.split(/\r?\n/)
  const entities: Array<Record<string, unknown>> = []
  let inFaqSection = !faqSectionOnly
  let currentQuestion = ''
  let currentAnswerLines: string[] = []

  const flush = () => {
    if (!currentQuestion) return
    const answerText = stripMarkdown(currentAnswerLines.join('\n'))
    if (answerText) {
      entities.push({
        '@type': 'Question',
        name: stripMarkdown(currentQuestion),
        acceptedAnswer: {
          '@type': 'Answer',
          text: answerText,
        },
      })
    }
    currentQuestion = ''
    currentAnswerLines = []
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flush()
      if (faqSectionOnly) {
        const heading = line.slice(3).trim()
        inFaqSection = /(?:FAQ|Frequently Asked Questions|常见问题|Questions fréquentes)/i.test(
          heading
        )
      }
    } else if (line.startsWith('# ')) {
      flush()
    } else if (inFaqSection && line.startsWith('### ')) {
      flush()
      currentQuestion = line.slice(4).trim()
    } else if (inFaqSection && currentQuestion) {
      currentAnswerLines.push(line)
    }
  }
  flush()
  return entities
}

function buildBreadcrumbList(
  relativePath: string,
  pageTitle: string,
  canonicalUrl: string,
  locale: LocaleInfo & { isBlog: boolean }
): Record<string, unknown> | null {
  if (
    relativePath === 'index.md' ||
    relativePath === 'en/index.md' ||
    relativePath === 'zh/index.md' ||
    relativePath === 'fr/index.md'
  ) {
    return null
  }

  const items: Array<{ name: string; item: string }> = [
    { name: locale.homeLabel, item: locale.homeUrl },
  ]

  if (relativePath === 'blog/index.md') {
    items.push({ name: locale.blogLabel, item: `${BASE_URL}blog/` })
  } else if (relativePath.startsWith('blog/posts/')) {
    items.push({ name: locale.blogLabel, item: `${BASE_URL}blog/` })
    items.push({ name: pageTitle, item: canonicalUrl })
  } else {
    const parts = relativePath.split('/')
    const loc = parts[0]
    const sub = parts[1]

    if (sub === 'industrial-cg-platform') {
      const platformUrl = `${BASE_URL}${loc}/industrial-cg-platform/`
      items.push({ name: locale.platformLabel, item: platformUrl })

      if (relativePath !== `${loc}/industrial-cg-platform/index.md`) {
        const section = parts[2]
        if (section === 'api' && relativePath !== `${loc}/industrial-cg-platform/api/index.md`) {
          items.push({
            name: locale.apiLabel,
            item: `${BASE_URL}${loc}/industrial-cg-platform/api/`,
          })
        } else if (
          section === 'releases' &&
          relativePath !== `${loc}/industrial-cg-platform/releases/index.md`
        ) {
          items.push({
            name: locale.releasesLabel,
            item: `${BASE_URL}${loc}/industrial-cg-platform/releases/`,
          })
        }
        items.push({ name: pageTitle, item: canonicalUrl })
      }
    } else if (sub && PLUGIN_SCHEMA[sub]) {
      items.push({
        name: locale.toolsLabel,
        item: toCanonicalUrl(`${loc}/industrial-pipeline-tools.md`),
      })
      const pluginUrl = toCanonicalUrl(`${loc}/${sub}/index.md`)
      if (relativePath === `${loc}/${sub}/index.md`) {
        items.push({ name: PLUGIN_SCHEMA[sub].name, item: canonicalUrl })
      } else {
        items.push({ name: PLUGIN_SCHEMA[sub].name, item: pluginUrl })
        if (
          parts[2] === 'manual' &&
          relativePath !== `${loc}/${sub}/manual/index.md` &&
          fs.existsSync(path.join(DOCS_ROOT, `${loc}/${sub}/manual/index.md`))
        ) {
          items.push({
            name: locale.manualLabel,
            item: toCanonicalUrl(`${loc}/${sub}/manual/index.md`),
          })
        }
        items.push({ name: pageTitle, item: canonicalUrl })
      }
    } else {
      items.push({ name: pageTitle, item: canonicalUrl })
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: entry.name,
      item: entry.item,
    })),
  }
}

function jsonLdScript(payload: Record<string, unknown>): HeadConfig {
  return ['script', { type: 'application/ld+json' }, JSON.stringify(payload)]
}

function resolveDefaultCover(relativePath: string): string {
  if (/^(en|zh|fr)\/index\.md$/.test(relativePath)) return '/home-splash.webp'
  if (relativePath.includes('/industrial-cg-platform/')) return '/splash.webp'
  if (relativePath.includes('/industrial-aov-connector/') || /\/industrial-pipeline-tools\.md$/.test(relativePath)) {
    return '/features/aov.webp'
  }
  if (relativePath.includes('/industrial-light-aov-splitter/')) return '/features/light.webp'
  if (relativePath.includes('/auto-light-shuffle/')) return '/features/lightgroups.webp'
  if (relativePath.includes('/aio-ocio/')) return '/features/ocio.webp'
  if (relativePath.includes('/blender-to-nuke-workflow/')) return '/blog/nuke-deep-compositing.webp'
  if (relativePath.includes('/blender-vfx-pipeline/')) return '/splash.webp'
  if (/\/feature-tracking\.md$/.test(relativePath)) return '/features/platform.webp'
  return '/logo.webp'
}

export function normalizePageSeoData(pageData: PageData): void {
  const fm = pageData.frontmatter
  if (Array.isArray(fm.head)) {
    fm.head = fm.head.filter(
      (entry) =>
        !(
          Array.isArray(entry) &&
          entry[0] === 'meta' &&
          entry[1] &&
          typeof entry[1] === 'object' &&
          entry[1].name === 'description'
        )
    )
  }

  const rawTitle = typeof fm.title === 'string' ? fm.title : pageData.title
  if (
    rawTitle &&
    fm.titleTemplate === undefined &&
    rawTitle !== 'Industrial CG Platform' &&
    /(?:—|\|)\s*Industrial CG Platform\s*$/.test(rawTitle)
  ) {
    pageData.titleTemplate = false
  }
}

export function buildSeoHead(context: TransformContext): HeadConfig[] {
  const { pageData } = context
  const relPath = pageData.relativePath
  if (pageData.isNotFound || relPath === '404.md') {
    return [['meta', { name: 'robots', content: 'noindex, nofollow' }]]
  }

  const fm = pageData.frontmatter
  const locale = resolveLocaleInfo(relPath)

  const pageTitle =
    fm.title || pageData.title || 'Industrial CG Platform — Blender VFX Fork by CGWeave'
  const pageDescription = fm.description || fm.summary || DEFAULT_FALLBACK_DESCRIPTION
  const coverPath = fm.cover || resolveDefaultCover(relPath)
  const ogImage = `${SITE_ORIGIN}${coverPath}`
  const canonicalUrl = toCanonicalUrl(relPath)
  const isBlogPost = relPath.startsWith('blog/posts/')

  const head: HeadConfig[] = [
    ['meta', { name: 'description', content: pageDescription }],
    ['meta', { property: 'og:type', content: isBlogPost ? 'article' : 'website' }],
    ['meta', { property: 'og:site_name', content: 'Industrial CG Platform' }],
    ['meta', { property: 'og:url', content: canonicalUrl }],
    ['meta', { property: 'og:locale', content: locale.ogLocale }],
    ...locale.ogAlternates.map(
      (alt): HeadConfig => ['meta', { property: 'og:locale:alternate', content: alt }]
    ),
    ['meta', { property: 'og:title', content: pageTitle }],
    ['meta', { property: 'og:description', content: pageDescription }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: pageTitle }],
    ['meta', { name: 'twitter:description', content: pageDescription }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    jsonLdScript({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_ORIGIN}/#organization`,
          name: 'CGWeave',
          alternateName: 'Industrial 3D',
          url: `${BASE_URL}en/`,
          logo: `${SITE_ORIGIN}/logo.webp`,
          sameAs: [
            'https://github.com/RolandVyens/industrial-cg-platform',
            'https://github.com/RolandVyens/industrial-cg-platform-docs',
            'https://github.com/RolandVyens/Industrial-AOV-Connector',
            'https://github.com/RolandVyens/Industrial-Light-AOV-Splitter',
            'https://github.com/RolandVyens/auto-light-shuffle',
            'https://github.com/RolandVyens/AIO-OCIO',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_ORIGIN}/#website`,
          name: 'Industrial CG Platform',
          url: `${BASE_URL}en/`,
          inLanguage: ['en', 'zh-Hans', 'fr'],
          publisher: { '@id': `${SITE_ORIGIN}/#organization` },
        },
      ],
    }),
  ]

  if (relPath.endsWith('/guide/faq.md') || fm.faq === true) {
    const faqEntities = extractFaqEntities(relPath, !relPath.endsWith('/guide/faq.md'))
    if (faqEntities.length > 0) {
      head.push(
        jsonLdScript({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqEntities,
          inLanguage: locale.inLanguage,
          url: canonicalUrl,
        })
      )
    }
  }

  if (isBlogPost) {
    const publishedDate =
      fm.date instanceof Date
        ? fm.date.toISOString().slice(0, 10)
        : typeof fm.date === 'string'
          ? fm.date
          : undefined
    head.push(
      jsonLdScript({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: pageTitle,
        description: pageDescription,
        image: ogImage,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        inLanguage: locale.inLanguage,
        ...(publishedDate ? { datePublished: publishedDate } : {}),
        author: {
          '@type': 'Person',
          name: 'Roland Vyens',
        },
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      })
    )
  }

  const breadcrumb = buildBreadcrumbList(relPath, pageTitle, canonicalUrl, locale)
  if (breadcrumb) {
    head.push(jsonLdScript(breadcrumb))
  }

  const parts = relPath.split('/')
  const pluginSlug = parts.length === 3 && parts[2] === 'index.md' ? parts[1] : ''
  const pluginMeta = PLUGIN_SCHEMA[pluginSlug]
  if (pluginMeta) {
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': pluginMeta.type,
      name: pluginMeta.name,
      description: pageDescription,
      url: canonicalUrl,
      inLanguage: locale.inLanguage,
      isAccessibleForFree: true,
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      ...(pluginMeta.applicationCategory ? { applicationCategory: pluginMeta.applicationCategory } : {}),
      ...(pluginMeta.operatingSystem ? { operatingSystem: pluginMeta.operatingSystem } : {}),
      ...(pluginMeta.softwareVersion ? { softwareVersion: pluginMeta.softwareVersion } : {}),
      ...(pluginMeta.license ? { license: pluginMeta.license } : {}),
    }
    if (pluginMeta.type === 'SoftwareApplication') {
      schema.offers = { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
    }
    head.push(jsonLdScript(schema))
  }

  return head
}
