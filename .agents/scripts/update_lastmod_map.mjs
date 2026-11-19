import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')
const docsRoot = path.join(repoRoot, 'docs')
const outFile = path.join(docsRoot, '.vitepress/git-lastmod.json')

const gitOpts = { cwd: repoRoot, encoding: 'utf8' }

const isShallow =
  execFileSync('git', ['rev-parse', '--is-shallow-repository'], gitOpts).trim() === 'true'

if (isShallow) {
  console.error('Refusing to overwrite git-lastmod.json from a shallow git clone.')
  process.exit(1)
}

function collectMarkdownFiles(dir) {
  const results = new Set()
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.vitepress' || entry.name === 'public') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      for (const child of collectMarkdownFiles(full)) results.add(child)
    } else if (entry.name.endsWith('.md')) {
      results.add(path.relative(docsRoot, full).replace(/\\/g, '/'))
    }
  }
  return results
}

const existingFiles = collectMarkdownFiles(docsRoot)

const blobMap = {}
const treeOut = execFileSync('git', ['ls-tree', '-r', 'HEAD', '--', 'docs'], {
  ...gitOpts,
  maxBuffer: 16 * 1024 * 1024,
})
for (const line of treeOut.split(/\r?\n/)) {
  const match = line.match(/^\d+\s+blob\s+([0-9a-f]+)\tdocs\/(.+\.md)$/)
  if (match) {
    blobMap[match[2]] = match[1]
  }
}

const lastmodMap = {}
const logOut = execFileSync(
  'git',
  ['log', '--name-only', '--pretty=format:__COMMIT__%cI', '--', 'docs'],
  { ...gitOpts, maxBuffer: 64 * 1024 * 1024 }
)

let currentIso = ''
for (const rawLine of logOut.split(/\r?\n/)) {
  const line = rawLine.trim()
  if (!line) continue
  if (line.startsWith('__COMMIT__')) {
    currentIso = new Date(line.slice('__COMMIT__'.length)).toISOString()
  } else if (currentIso && line.startsWith('docs/') && line.endsWith('.md')) {
    const relFromDocs = line.slice('docs/'.length)
    if (existingFiles.has(relFromDocs) && !lastmodMap[relFromDocs]) {
      lastmodMap[relFromDocs] = currentIso
    }
  }
}

const entries = {}
for (const relFromDocs of [...existingFiles].sort()) {
  const lastmod =
    lastmodMap[relFromDocs] || fs.statSync(path.join(docsRoot, relFromDocs)).mtime.toISOString()
  const blob =
    blobMap[relFromDocs] ||
    execFileSync('git', ['hash-object', path.join('docs', relFromDocs)], gitOpts).trim()
  entries[relFromDocs] = { lastmod, blob }
}

const nextJson = JSON.stringify(entries, null, 2) + '\n'
const rawPrev = fs.existsSync(outFile) ? fs.readFileSync(outFile, 'utf8') : ''
const normalizedPrev = rawPrev.replace(/\r\n/g, '\n')

if (nextJson !== normalizedPrev) {
  const eol = rawPrev.includes('\r\n') ? '\r\n' : '\n'
  fs.writeFileSync(outFile, eol === '\r\n' ? nextJson.replace(/\n/g, '\r\n') : nextJson, 'utf8')
  console.log(`Updated ${Object.keys(entries).length} entries in ${path.relative(repoRoot, outFile)}`)
} else {
  console.log(`git-lastmod.json already up to date (${Object.keys(entries).length} entries).`)
}
