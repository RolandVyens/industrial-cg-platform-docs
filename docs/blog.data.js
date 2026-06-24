import fs from 'node:fs'
import path from 'node:path'

export default {
  watch: ['blog/posts/*.md'],
  load() {
    const postsDir = path.resolve(process.cwd(), 'docs/blog/posts')
    if (!fs.existsSync(postsDir)) {
      return []
    }
    
    const files = fs.readdirSync(postsDir)
    const posts = []

    for (const file of files) {
      if (!file.endsWith('.md')) continue
      const filePath = path.join(postsDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      
      // Extract frontmatter block between the first two '---' lines
      const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
      const frontmatter = {}
      let tags = []

      if (fmMatch) {
        const fmText = fmMatch[1]
        const lines = fmText.split('\n')
        
        let inTagsList = false
        
        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed) continue

          // Handle array element in yaml bullet list
          if (inTagsList && trimmed.startsWith('-')) {
            tags.push(trimmed.replace(/^-\s*/, '').trim())
            continue
          }

          const colonIdx = trimmed.indexOf(':')
          if (colonIdx !== -1) {
            const key = trimmed.slice(0, colonIdx).trim()
            let val = trimmed.slice(colonIdx + 1).trim()
            
            // Clean string quotes
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1)
            }

            if (key === 'tags') {
              if (val.startsWith('[') && val.endsWith(']')) {
                // inline array format: [tag1, tag2]
                tags = val.slice(1, -1).split(',').map(t => t.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
                inTagsList = false
              } else {
                inTagsList = true
              }
            } else {
              inTagsList = false
              frontmatter[key] = val
            }
          } else {
            inTagsList = false
          }
        }
      }

      const url = '/blog/posts/' + file.replace(/\.md$/, '')
      const dateStr = frontmatter.date || ''
      const dateObj = dateStr ? new Date(dateStr) : new Date()

      posts.push({
        title: frontmatter.title || 'Untitled Post',
        url,
        date: dateObj,
        dateString: dateStr || new Date().toISOString().split('T')[0],
        author: frontmatter.author || 'Roland Vyens',
        summary: frontmatter.summary || frontmatter.description || '',
        cover: frontmatter.cover || '',
        tags: tags
      })
    }

    // Sort by date descending
    return posts.sort((a, b) => b.date - a.date)
  }
}
