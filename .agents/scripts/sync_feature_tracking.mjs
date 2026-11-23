import { execFileSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')
const trackingPath = path.join(repoRoot, 'docs/feature-tracking.data.json')
const releasesPath = path.join(repoRoot, 'docs/releases.data.json')
const pendingReportPath = path.join(repoRoot, '.agents/tmp/ft-sync-pending.json')

function parseArgs(argv) {
  const args = {
    apply: false,
    json: false,
    exitCode: false,
    markSynced: false,
    upstreamFile: null,
    noRemote: false,
    remoteOnly: false,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--apply') args.apply = true
    else if (a === '--check') args.apply = false
    else if (a === '--json') args.json = true
    else if (a === '--exit-code') args.exitCode = true
    else if (a === '--mark-synced') args.markSynced = true
    else if (a === '--no-remote' || a === '--local-only') args.noRemote = true
    else if (a === '--remote-only') args.remoteOnly = true
    else if (a === '--upstream-file' && argv[i + 1]) {
      args.upstreamFile = argv[++i]
    }
  }
  return args
}

function stableSortObject(value) {
  if (Array.isArray(value)) return value.map(stableSortObject)
  if (value && typeof value === 'object') {
    const out = {}
    for (const k of Object.keys(value).sort()) {
      out[k] = stableSortObject(value[k])
    }
    return out
  }
  return value
}

function computeUpstreamFactHash(item) {
  const payload = {
    id: item.id,
    status: item.status || 'planned',
    progress: typeof item.progress === 'number' ? item.progress : 0,
    module: item.module || '',
    releaseTag: item.releaseTag || null,
    title: item.title || '',
    summary: item.summary || '',
    progressNote: item.progressNote || '',
    milestones: Array.isArray(item.milestones)
      ? item.milestones.map((m) => ({ done: !!m.done, text: String(m.text || '') }))
      : [],
  }
  const canonical = JSON.stringify(stableSortObject(payload))
  return crypto.createHash('sha256').update(canonical).digest('hex').slice(0, 16)
}

function findMatchingRelease(releases, track) {
  if (!track || !track.tagPattern) return null
  let regex
  try {
    regex = new RegExp(track.tagPattern)
  } catch {
    return null
  }
  const includePre = !!track.includePrerelease
  const candidates = releases
    .filter((r) => (includePre || !r.prerelease) && regex.test(r.tag_name || ''))
    .sort((a, b) => (Date.parse(b.published_at || '') || 0) - (Date.parse(a.published_at || '') || 0))
  return candidates[0] || null
}

function findLocalWorktreeOnBranch(localRepoDir, branch) {
  try {
    const out = execFileSync('git', ['-C', localRepoDir, 'worktree', 'list', '--porcelain'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    let currentPath = null
    let currentBranch = null
    const targetRef = `refs/heads/${branch}`
    for (const line of [...out.split(/\r?\n/), '']) {
      if (line.trim() === '') {
        if (currentPath && currentBranch === targetRef) {
          return currentPath
        }
        currentPath = null
        currentBranch = null
        continue
      }
      if (line.startsWith('worktree ')) {
        currentPath = line.slice('worktree '.length).trim()
      } else if (line.startsWith('branch ')) {
        currentBranch = line.slice('branch '.length).trim()
      }
    }
  } catch {
    return null
  }
  return null
}

function tryLoadLocalRoadmap(upstreamCfg) {
  const roadmapRel = upstreamCfg?.roadmapPath || 'ROADMAP.json'
  const branch = upstreamCfg?.branch || 'industrial-cg-platform'
  const localRepoRel = upstreamCfg?.localRepoRelative || '../blender'
  const localRepoDir = path.resolve(repoRoot, localRepoRel)

  if (!fs.existsSync(localRepoDir)) {
    return null
  }

  // 1. Prefer an active worktree checked out on the target upstream branch (e.g. industrial-cg-platform)
  const branchWorktree = findLocalWorktreeOnBranch(localRepoDir, branch)
  if (branchWorktree) {
    const candidate = path.join(branchWorktree, roadmapRel)
    if (fs.existsSync(candidate)) {
      return {
        source: candidate,
        origin: 'local_worktree',
        status: 'ok',
        data: JSON.parse(fs.readFileSync(candidate, 'utf8')),
      }
    }
  }

  // 2. Check the main local repo working directory directly (supports uncommitted edits)
  const directCandidate = path.join(localRepoDir, roadmapRel)
  if (fs.existsSync(directCandidate)) {
    return {
      source: directCandidate,
      origin: 'local_repo_file',
      status: 'ok',
      data: JSON.parse(fs.readFileSync(directCandidate, 'utf8')),
    }
  }

  // 3. Check committed ROADMAP.json on local branch refs/heads/<branch> even if checked out elsewhere
  try {
    const content = execFileSync('git', ['-C', localRepoDir, 'show', `refs/heads/${branch}:${roadmapRel}`], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    return {
      source: `${localRepoDir} (${branch}:${roadmapRel})`,
      origin: 'local_git_ref',
      status: 'ok',
      data: JSON.parse(content),
    }
  } catch {
    // Not committed on local branch yet
  }

  return null
}

async function loadUpstreamRoadmap(upstreamCfg, args) {
  const explicitFile = args.upstreamFile || process.env.ICGP_ROADMAP_PATH
  if (explicitFile) {
    const resolved = path.resolve(repoRoot, explicitFile)
    if (!fs.existsSync(resolved)) {
      return { source: resolved, origin: 'explicit_file', status: 'missing_local', data: null }
    }
    return {
      source: resolved,
      origin: 'explicit_file',
      status: 'ok',
      data: JSON.parse(fs.readFileSync(resolved, 'utf8')),
    }
  }

  if (!args.remoteOnly) {
    const localHit = tryLoadLocalRoadmap(upstreamCfg)
    if (localHit) return localHit
  }

  if (args.noRemote || !upstreamCfg?.repo || !upstreamCfg?.roadmapPath) {
    return { source: 'local_repo_not_found', origin: 'local_only', status: 'not_found_local', data: null }
  }

  const branch = upstreamCfg.branch || 'industrial-cg-platform'
  const url = `https://raw.githubusercontent.com/${upstreamCfg.repo}/${branch}/${upstreamCfg.roadmapPath}`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'industrial-cg-platform-docs-sync/1.0' },
      signal: AbortSignal.timeout(10000),
    })
    if (res.status === 404) {
      return { source: url, origin: 'github_raw', status: 'not_found_404', data: null }
    }
    if (!res.ok) {
      return { source: url, origin: 'github_raw', status: `http_${res.status}`, data: null }
    }
    const data = await res.json()
    return { source: url, origin: 'github_raw', status: 'ok', data }
  } catch (err) {
    return { source: url, origin: 'github_raw', status: `network_error:${err.message}`, data: null }
  }
}

function buildScaffoldFeature(up) {
  const status = up.status || 'planned'
  const progress = typeof up.progress === 'number' ? up.progress : status === 'released' ? 100 : 0
  const milestones = Array.isArray(up.milestones)
    ? up.milestones.map((m) => ({ done: !!m.done, html: String(m.text || '') }))
    : []
  const placeholderLoc = {
    titleHtml: String(up.title || up.id),
    badge: status === 'released' ? 'Released' : status === 'in_progress' ? 'In Progress' : 'Planned',
    descHtml: String(up.summary || ''),
    ...(status === 'in_progress' ? { progressLabel: String(up.progressNote || '') } : {}),
    milestones,
  }
  return {
    id: up.id,
    status,
    progress,
    module: up.module || '',
    thumb: null,
    thumbPosition: null,
    releaseTrack: null,
    releaseTag: up.releaseTag || null,
    syncedHash: null,
    links: [],
    i18n: {
      en: structuredClone(placeholderLoc),
      zh: structuredClone(placeholderLoc),
      fr: structuredClone(placeholderLoc),
    },
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const tracking = JSON.parse(fs.readFileSync(trackingPath, 'utf8'))
  const releases = fs.existsSync(releasesPath) ? JSON.parse(fs.readFileSync(releasesPath, 'utf8')) : []

  const upstreamRes = await loadUpstreamRoadmap(tracking.upstream, args)
  const upstreamFeatures = Array.isArray(upstreamRes.data?.features) ? upstreamRes.data.features : []
  const upstreamById = new Map(upstreamFeatures.map((f) => [f.id, f]))
  const trackingById = new Map((tracking.features || []).map((f) => [f.id, f]))

  const releaseDrifts = []
  const structuralChanges = []
  const copySyncQueue = []
  const newFeatures = []
  const removedUpstream = []

  // 1. Check release drifts against docs/releases.data.json
  for (const item of tracking.features || []) {
    if (!item.releaseTrack) continue
    const latest = findMatchingRelease(releases, item.releaseTrack)
    if (!latest) continue
    const trackedLink = (item.links || []).find((l) => l.trackReleaseLink)
    const expectedHref = latest.html_url || `https://github.com/${tracking.upstream?.repo}/releases/tag/${latest.tag_name}`
    const tagChanged = item.releaseTag !== latest.tag_name
    const linkChanged = trackedLink && trackedLink.href !== expectedHref

    if (tagChanged || linkChanged) {
      releaseDrifts.push({
        id: item.id,
        currentTag: item.releaseTag,
        latestTag: latest.tag_name,
        latestName: latest.name,
        publishedAt: latest.published_at,
        prerelease: !!latest.prerelease,
        expectedHref,
      })

      if (args.apply) {
        item.releaseTag = latest.tag_name
        if (trackedLink) {
          trackedLink.href = expectedHref
        }
      }
    }
  }

  // 2. Check upstream ROADMAP.json if available
  if (upstreamRes.status === 'ok') {
    for (const up of upstreamFeatures) {
      const factHash = computeUpstreamFactHash(up)
      const local = trackingById.get(up.id)

      if (!local) {
        newFeatures.push({
          id: up.id,
          factHash,
          upstream: up,
        })
        if (args.apply) {
          const scaffold = buildScaffoldFeature(up)
          tracking.features.push(scaffold)
          trackingById.set(up.id, scaffold)
        }
        continue
      }

      const diffs = []
      if (up.status && local.status !== up.status) {
        diffs.push({ field: 'status', from: local.status, to: up.status })
        if (args.apply) local.status = up.status
      }
      if (typeof up.progress === 'number' && local.progress !== up.progress) {
        diffs.push({ field: 'progress', from: local.progress, to: up.progress })
        if (args.apply) local.progress = up.progress
      }
      if (typeof up.module === 'string' && local.module !== up.module) {
        diffs.push({ field: 'module', from: local.module, to: up.module })
        if (args.apply) local.module = up.module
      }
      if (up.releaseTag !== undefined && up.releaseTag !== null && local.releaseTag !== up.releaseTag) {
        // Do not downgrade a newer releaseTag resolved from releases.data.json if releaseTrack already matched
        const wasUpdatedByReleaseTrack = releaseDrifts.some((d) => d.id === local.id)
        if (!wasUpdatedByReleaseTrack) {
          diffs.push({ field: 'releaseTag', from: local.releaseTag, to: up.releaseTag })
          if (args.apply) local.releaseTag = up.releaseTag
        }
      }

      if (diffs.length > 0) {
        structuralChanges.push({ id: up.id, diffs })
      }

      if (local.syncedHash !== factHash) {
        copySyncQueue.push({
          id: up.id,
          reason: local.syncedHash ? 'upstream_changed' : 'initial_hash_bind',
          previousHash: local.syncedHash,
          factHash,
          upstream: up,
        })
        if (args.markSynced) {
          local.syncedHash = factHash
        }
      }
    }

    for (const local of tracking.features || []) {
      if (local.syncedHash && !upstreamById.has(local.id)) {
        removedUpstream.push({ id: local.id, status: local.status })
      }
    }
  }

  const hasChanges =
    releaseDrifts.length > 0 ||
    structuralChanges.length > 0 ||
    copySyncQueue.length > 0 ||
    newFeatures.length > 0 ||
    removedUpstream.length > 0

  if (args.apply || args.markSynced) {
    fs.writeFileSync(trackingPath, JSON.stringify(tracking, null, 2) + '\n', 'utf8')
    if (releaseDrifts.length > 0 || copySyncQueue.length > 0 || newFeatures.length > 0) {
      fs.mkdirSync(path.dirname(pendingReportPath), { recursive: true })
      fs.writeFileSync(
        pendingReportPath,
        JSON.stringify(
          {
            generatedAt: new Date().toISOString(),
            upstream: upstreamRes.source,
            releaseDrifts,
            structuralChanges,
            copySyncQueue,
            newFeatures,
            removedUpstream,
          },
          null,
          2
        ) + '\n',
        'utf8'
      )
    }
  }

  const report = {
    upstream: {
      origin: upstreamRes.origin || 'unknown',
      source: upstreamRes.source,
      status: upstreamRes.status,
      featureCount: upstreamFeatures.length,
    },
    hasChanges,
    releaseDrifts,
    structuralChanges,
    copySyncQueueCount: copySyncQueue.length,
    copySyncIds: copySyncQueue.map((x) => x.id),
    newFeatures: newFeatures.map((x) => x.id),
    removedUpstream,
  }

  if (args.json) {
    console.log(JSON.stringify(report, null, 2))
  } else {
    console.log(`Feature Tracking Check (${args.apply ? 'APPLY' : 'CHECK'})`)
    console.log(`- Upstream ROADMAP [${upstreamRes.origin || 'unknown'}]: ${upstreamRes.status} (${upstreamRes.source})`)
    console.log(`- Release drifts (vs docs/releases.data.json): ${releaseDrifts.length}`)
    for (const d of releaseDrifts) {
      console.log(`  * ${d.id}: ${d.currentTag || '(none)'} -> ${d.latestTag} (${d.publishedAt})`)
    }
    console.log(`- Structural diffs (vs upstream ROADMAP): ${structuralChanges.length}`)
    for (const s of structuralChanges) {
      console.log(`  * ${s.id}: ${s.diffs.map((d) => `${d.field}: ${d.from} -> ${d.to}`).join(', ')}`)
    }
    console.log(`- New upstream features: ${newFeatures.length}`)
    for (const n of newFeatures) {
      console.log(`  * ${n.id} (${n.upstream.status || 'planned'})`)
    }
    console.log(`- Items needing trilingual copy review / hash sync: ${copySyncQueue.length}`)
    for (const c of copySyncQueue) {
      console.log(`  * ${c.id} [${c.reason}] -> ${c.factHash}`)
    }
    if (removedUpstream.length > 0) {
      console.log(`- Removed upstream: ${removedUpstream.map((r) => r.id).join(', ')}`)
    }
    if (!hasChanges) {
      console.log('ALL FEATURE TRACKING DATA IS IN SYNC.')
    } else if (args.apply) {
      console.log(`Applied deterministic updates to docs/feature-tracking.data.json.`)
      if (releaseDrifts.length > 0 || copySyncQueue.length > 0 || newFeatures.length > 0) {
        console.log(`Pending trilingual review details written to ${path.relative(repoRoot, pendingReportPath).replace(/\\/g, '/')}.`)
      }
    }
  }

  if (args.exitCode && hasChanges) {
    process.exit(2)
  }
}

main()
