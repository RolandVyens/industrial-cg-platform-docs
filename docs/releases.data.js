function parseMarkdown(text) {
  if (!text) return ''
  
  // Basic HTML escape
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Inline formatting: Bold, Code, Links
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/`(.*?)`/g, '<code style="background: var(--vp-c-bg-mute); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; border: 1px solid var(--vp-c-divider);">$1</code>')
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: var(--vp-c-brand); font-weight: 500; text-decoration: underline;">$1</a>')

  // Split into lines for block parsing
  const lines = html.split('\n')
  const firstContentLine = lines.findIndex(line => line.trim() !== '')
  let result = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()

    // The release card already renders the release name as its title.
    if (i === firstContentLine && line.startsWith('# ')) {
      continue
    }

    // Handle Headers
    if (line.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      const headerText = line.substring(3)
      result.push(`<h3 style="margin-top: 1.5rem; margin-bottom: 0.6rem; font-weight: 600; color: var(--vp-c-text-1); font-size: 1.15rem;">${headerText}</h3>`)
    } else if (line.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      const headerText = line.substring(4)
      result.push(`<h4 style="margin-top: 1.2rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--vp-c-text-1); font-size: 1.05rem;">${headerText}</h4>`)
    } 
    // Handle List Items
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        result.push('<ul style="margin-top: 0.4rem; margin-bottom: 0.8rem; padding-left: 1.2rem; list-style-type: disc;">')
        inList = true
      }
      const itemText = line.substring(2)
      result.push(`<li style="margin-bottom: 0.4rem; line-height: 1.6; color: var(--vp-c-text-2);">${itemText}</li>`)
    } 
    // Handle Empty Lines
    else if (line === '') {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
    } 
    // Handle Regular Paragraph Lines
    else {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      result.push(`<p style="margin-top: 0.4rem; margin-bottom: 0.8rem; line-height: 1.6; color: var(--vp-c-text-2);">${line}</p>`)
    }
  }

  if (inList) {
    result.push('</ul>')
  }

  return result.join('\n')
}

function formatDate(dateStr, locale) {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch (e) {
    return dateStr
  }
}

function formatBytes(bytes, locale) {
  if (!bytes) return 'N/A'
  if (bytes === 0) {
    return locale === 'fr-FR' ? '0 Octets' : '0 Bytes'
  }
  const k = 1024
  const sizes = locale === 'fr-FR'
    ? ['Octets', 'Ko', 'Mo', 'Go']
    : ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function processReleases(data) {
  if (!Array.isArray(data)) return []
  const sortedReleases = [...data].sort((a, b) => {
    const publishedAtA = Date.parse(a.published_at || '') || 0
    const publishedAtB = Date.parse(b.published_at || '') || 0
    return publishedAtB - publishedAtA
  })
  const latestStable = sortedReleases.find(release => !release.prerelease)

  return sortedReleases.map(release => {
    const assets = (release.assets || []).map(asset => ({
      id: asset.id || asset.browser_download_url || asset.name,
      name: asset.name,
      size: asset.size,
      sizeFormattedEN: formatBytes(asset.size, 'en-US'),
      sizeFormattedZH: formatBytes(asset.size, 'zh-CN'),
      sizeFormattedFR: formatBytes(asset.size, 'fr-FR'),
      download_count: asset.download_count,
      browser_download_url: asset.browser_download_url
    }))
    
    return {
      tag_name: release.tag_name,
      name: release.name || release.tag_name,
      published_at: release.published_at,
      publishedAtEN: formatDate(release.published_at, 'en-US'),
      publishedAtZH: formatDate(release.published_at, 'zh-CN'),
      publishedAtFR: formatDate(release.published_at, 'fr-FR'),
      prerelease: !!release.prerelease,
      isLatestStable: release.tag_name === latestStable?.tag_name,
      html_url: release.html_url,
      bodyHtml: parseMarkdown(release.body),
      assets
    }
  })
}

export default {
  async load() {
    try {
      console.log('Fetching releases at build time...')
      const headers = {}
      if (process.env.GITHUB_TOKEN) {
        console.log('Found GITHUB_TOKEN in environment, using authenticated requests to raise rate limit.')
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
      }
      const res = await fetch('https://api.github.com/repos/RolandVyens/industrial-cg-platform/releases', { headers })
      if (!res.ok) throw new Error(`Failed to fetch releases: ${res.statusText}`)
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        console.log(`Successfully loaded ${data.length} releases from GitHub API at build time.`)
        return processReleases(data)
      }
    } catch (err) {
      console.error('Error loading releases at build-time, using fallback:', err)
    }
    
    // Fallback data
    const fallback = [
      {
        tag_name: 'industrial-cg-platform-5.2.1',
        name: 'Industrial CG Platform 5.2.1 Stable Release',
        published_at: '2026-08-29T07:53:41Z',
        prerelease: false,
        body: '# Industrial CG Platform 5.2.1 Stable\n\n- Updated to the official Blender 5.2.1 LTS foundation.\n- Fixed an issue where the Deep Tile Budget setting could remain grayed out in some projects.\n- Improved Deep EXR reliability and workflow defaults.\n- Added a dedicated bug report entry for Industrial CG Platform.',
        html_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/tag/industrial-cg-platform-5.2.1',
        assets: [
          {
            id: 534935238,
            name: 'industrial-cg-platform-5.2.1.zip',
            size: 593318777,
            download_count: 0,
            browser_download_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/download/industrial-cg-platform-5.2.1/industrial-cg-platform-5.2.1.zip'
          }
        ]
      },
      {
        tag_name: 'industrial-cg-platform-5.2.0',
        name: 'Industrial CG Platform 5.2.0 Stable Release',
        published_at: '2026-07-17T14:37:37Z',
        prerelease: false,
        body: '# Industrial CG Platform 5.2.0 Stable\n\n- Updated to the official Blender 5.2 LTS foundation.\n- Promoted from preview to stable release.\n- Improved stability and NVIDIA GPU compatibility.',
        html_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/tag/industrial-cg-platform-5.2.0',
        assets: [
          {
            id: 480471978,
            name: 'industrial-cg-platform-5.2.0.zip',
            size: 595219590,
            download_count: 23,
            browser_download_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/download/industrial-cg-platform-5.2.0/industrial-cg-platform-5.2.0.zip'
          }
        ]
      },
      {
        tag_name: 'industrial-cg-platform-5.2.0-2026-06-18',
        name: 'industrial-cg-platform-5.2.0-2026-06-18',
        published_at: '2026-06-18T04:03:04Z',
        prerelease: true,
        body: '# Industrial CG Platform 5.2.0-2026-06-18\n\n- Runtime build hash: `0554f88d0014`\n- GitHub continuation snapshot: `427d6476`\n- Release ZIP SHA256: `CAEF0F41BDCEAEAB50BD4E0944D151B61622DBF23515F2B885851B8739924681`\n\n## Panel Identifier Hotfix\n\n- Registers the Output Properties Overscan panel as `RENDER_PT_exr_overscan` instead of the generic `RENDER_PT_overscan`.\n- Prevents third-party add-ons that use the generic identifier from replacing the Industrial CG Platform panel.\n- Keeps the retained release identity synchronized as `Blender 5.2.0-2026-06-18 Industrial CG Platform`.',
        html_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/tag/industrial-cg-platform-5.2.0-2026-06-18',
        assets: [
          {
            id: 451374008,
            name: 'industrial-cg-platform-5.2.0-2026-06-18.zip',
            size: 559823975,
            download_count: 26,
            browser_download_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/download/industrial-cg-platform-5.2.0-2026-06-18/industrial-cg-platform-5.2.0-2026-06-18.zip'
          }
        ]
      }
    ]
    return processReleases(fallback)
  }
}
