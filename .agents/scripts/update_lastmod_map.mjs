import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const ifFull = process.argv.includes('--if-full')
const docsRoot = path.resolve('docs')
const outFile = path.resolve('docs/.vitepress/git-lastmod.json')

const isShallow =
  execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
    encoding: 'utf8',
  }).trim() === 'true'

if (isShallow) {
  if (ifFull) {
    process.exit(0)
  }
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
const map = {}
const logOut = execFileSync(
  'git',
  ['log', '--name-only', '--pretty=format:__COMMIT__%cI', '--', 'docs'],
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
)

let currentIso = ''
for (const rawLine of logOut.split(/\r?\n/)) {
  const line = rawLine.trim()
  if (!line) continue
  if (line.startsWith('__COMMIT__')) {
    currentIso = new Date(line.slice('__COMMIT__'.length)).toISOString()
  } else if (currentIso && line.startsWith('docs/') && line.endsWith('.md')) {
    const relFromDocs = line.slice('docs/'.length)
    if (existingFiles.has(relFromDocs) && !map[relFromDocs]) {
      map[relFromDocs] = currentIso
    }
  }
}

for (const relFromDocs of existingFiles) {
  if (!map[relFromDocs]) {
    const stat = fs.statSync(path.join(docsRoot, relFromDocs))
    map[relFromDocs] = stat.mtime.toISOString()
  }
}

const sortedMap = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)))
const nextJson = JSON.stringify(sortedMap, null, 2) + '\n'
const prevJson = fs.existsSync(outFile) ? fs.readFileSync(outFile, 'utf8') : ''

if (nextJson !== prevJson) {
  fs.writeFileSync(outFile, nextJson, 'utf8')
  console.log(`Updated ${Object.keys(sortedMap).length} entries in ${path.relative(process.cwd(), outFile)}`)
}
