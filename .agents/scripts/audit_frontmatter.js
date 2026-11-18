const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const docsDir = path.join(__dirname, '../../docs');
let hasErrors = false;
const seenDescriptions = new Map();

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file === '.vitepress' || file === 'public') continue;
      scanDir(fullPath);
    } else if (fullPath.endsWith('.md')) {
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const relPath = path.relative(docsDir, filePath).replace(/\\/g, '/');
    const isBlogPost = relPath.startsWith('blog/posts/');

    if (fileContent.includes('GPL-2.0-or-later')) {
      console.error(`[Error] ${relPath}: found GPL-2.0-or-later; project license is GNU GPL v3 or later (GPL-3.0-or-later).`);
      hasErrors = true;
    }

    const effectiveDesc =
      typeof data.description === 'string'
        ? data.description.trim()
        : isBlogPost && typeof data.summary === 'string'
          ? data.summary.trim()
          : '';

    if (!effectiveDesc) {
      console.error(`[Error] ${relPath}: Missing or empty description${isBlogPost ? ' (or summary)' : ''}.`);
      hasErrors = true;
    } else if (data.description !== undefined && typeof data.description !== 'string') {
      console.error(`[Error] ${relPath}: description must be a string.`);
      hasErrors = true;
    } else {
      if (effectiveDesc.includes('{') || effectiveDesc.includes('}')) {
        console.error(`[Error] ${relPath}: description contains suspicious characters ({ or }). CSS leakage detected.`);
        hasErrors = true;
      }
      if (effectiveDesc.includes('<div') || effectiveDesc.includes('</')) {
        console.error(`[Error] ${relPath}: description contains HTML tags. HTML leakage detected.`);
        hasErrors = true;
      }
      if (effectiveDesc.startsWith('!') || effectiveDesc.includes('![')) {
        console.error(`[Error] ${relPath}: description contains image-alt markdown residue ("!").`);
        hasErrors = true;
      }
      if (effectiveDesc.startsWith('|') || effectiveDesc.startsWith('---')) {
        console.error(`[Error] ${relPath}: description contains markdown table/rule residue.`);
        hasErrors = true;
      }
      if (effectiveDesc.includes('...') || effectiveDesc.includes('…')) {
        console.error(`[Error] ${relPath}: description appears truncated ("..."). Write a complete sentence.`);
        hasErrors = true;
      }
      if (seenDescriptions.has(effectiveDesc)) {
        console.error(`[Error] ${relPath}: duplicate description also used by ${seenDescriptions.get(effectiveDesc)}.`);
        hasErrors = true;
      } else {
        seenDescriptions.set(effectiveDesc, relPath);
      }
    }

    if ((relPath.includes('blog/posts/') || relPath.includes('/features/')) && !data.cover) {
      console.error(`[Error] ${relPath}: Missing 'cover' field in frontmatter for OG image generation.`);
      hasErrors = true;
    } else if (data.cover) {
      const coverStr = data.cover.startsWith('/') ? data.cover.substring(1) : data.cover;
      const publicImagePath = path.join(docsDir, 'public', coverStr);
      if (!fs.existsSync(publicImagePath)) {
        console.error(`[Error] ${relPath}: Cover image does not exist -> ${data.cover} (Expected at: ${publicImagePath})`);
        hasErrors = true;
      }
    }
  } catch (err) {
    console.error(`[Error] Failed to parse frontmatter for ${filePath}: ${err.message}`);
    hasErrors = true;
  }
}

scanDir(docsDir);

if (hasErrors) {
  console.error('\nFRONTMATTER SCHEMA AUDIT FAILED.');
  process.exit(1);
} else {
  console.log('ALL FRONTMATTER CHECKS PASSED.');
}
