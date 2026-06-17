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
  let result = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()

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
  return data.map(release => {
    const assets = (release.assets || []).map(asset => ({
      id: asset.id,
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
        tag_name: 'industrial-cg-platform-5.2.0-2026-06-16',
        name: 'Industrial CG Platform 5.2.0-2026-06-16',
        published_at: '2026-06-16T17:30:00Z',
        prerelease: false,
        body: '### Highlights\n- Includes the validated EXR overscan redesign-v2 stack, covering offline EXR overscan output, compositor/File Output window preservation, render-region gating, Output-panel overscan controls, viewport safety-frame guidance, and the OptiX cache-path policy\n- Keeps the shipped Deep EXR runtime kernel-header packaging follow-up, so fallback Cycles kernel compilation does not lose `deep_write.h` in the installed runtime\n- Keeps the Deep EXR output UI cleanup, removing the redundant standalone Deep EXR panel while preserving the existing file-output workflow\n- Carries the current Industrial CG Platform branded runtime and passes the full self-contained feature suite\n\n### Notes\n- Build hash: `51091989dec9`\n- Release SHA256: `ABF163964C0DDE4754EC1E03BE28B962FD0520892CC20489271E7B1286D82B87`\n- Installed runtime root: `E:\\blender_modify\\release\\industrial-cg-platform-5.2.0-2026-06-16`\n- Release zip: `industrial-cg-platform-5.2.0-2026-06-16.zip`',
        html_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/tag/industrial-cg-platform-5.2.0-2026-06-16',
        assets: [
          {
            name: 'industrial-cg-platform-5.2.0-2026-06-16.zip',
            size: 562575295,
            download_count: 85,
            browser_download_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/download/industrial-cg-platform-5.2.0-2026-06-16/industrial-cg-platform-5.2.0-2026-06-16.zip'
          }
        ]
      },
      {
        tag_name: 'industrial-cg-platform-5.2.0-2026-05-27',
        name: 'industrial-cg-platform-5.2.0-2026-05-27',
        published_at: '2026-05-27T16:00:51Z',
        prerelease: false,
        body: '### Highlights\n- Sync Cycles rendering core with upstream Blender 5.2\n- Add MoonRay project acknowledgments in documentation and source headers\n- General stability improvements for Deep EXR output.',
        html_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/tag/industrial-cg-platform-5.2.0-2026-05-27',
        assets: [
          {
            name: 'industrial-cg-platform-5.2.0-2026-05-27.zip',
            size: 562177484,
            download_count: 52,
            browser_download_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/download/industrial-cg-platform-5.2.0-2026-05-27/industrial-cg-platform-5.2.0-2026-05-27.zip'
          }
        ]
      },
      {
        tag_name: 'industrial-cg-platform-5.2.0-2026-05-20',
        name: 'Industrial CG Platform 5.2.0-2026-05-20',
        published_at: '2026-05-20T04:52:46Z',
        prerelease: false,
        body: '### Highlights\n- Integrated Qt runtime packaging under system extension\n- Native Deep EXR support and shadow color tinters\n- Qt-based ViewLayer Manager dashboard',
        html_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/tag/industrial-cg-platform-5.2.0-2026-05-20',
        assets: [
          {
            name: 'industrial-cg-platform-5.2.0-2026-05-20.zip',
            size: 559590825,
            download_count: 142,
            browser_download_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/download/industrial-cg-platform-5.2.0-2026-05-20/industrial-cg-platform-5.2.0-2026-05-20.zip'
          }
        ]
      }
    ]
    return processReleases(fallback)
  }
}
