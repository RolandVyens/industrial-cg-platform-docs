const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const docsDir = path.join(__dirname, '../../docs');
let hasErrors = false;

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
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

    // 1. Check description for pollution
    if (data.description) {
      if (typeof data.description !== 'string') {
        console.error(`[Error] ${relPath}: description must be a string.`);
        hasErrors = true;
      } else if (data.description.includes('{') || data.description.includes('}')) {
        console.error(`[Error] ${relPath}: description contains suspicious characters ({ or }). CSS leakage detected.`);
        hasErrors = true;
      } else if (data.description.includes('<div') || data.description.includes('</')) {
        console.error(`[Error] ${relPath}: description contains HTML tags. HTML leakage detected.`);
        hasErrors = true;
      }
    }

    // 2. Check explicit cover image for blog posts and features
    if (relPath.includes('blog/posts/') || relPath.includes('/features/')) {
      if (!data.cover) {
        console.error(`[Error] ${relPath}: Missing 'cover' field in frontmatter for OG image generation.`);
        hasErrors = true;
      } else {
        // verify cover image physical existence in docs/public
        const coverStr = data.cover.startsWith('/') ? data.cover.substring(1) : data.cover;
        const publicImagePath = path.join(docsDir, 'public', coverStr);
        if (!fs.existsSync(publicImagePath)) {
          console.error(`[Error] ${relPath}: Cover image does not exist -> ${data.cover} (Expected at: ${publicImagePath})`);
          hasErrors = true;
        }
      }
    }
  } catch (err) {
    console.error(`[Error] Failed to parse frontmatter for ${filePath}: ${err.message}`);
    hasErrors = true;
  }
}

scanDir(docsDir);

if (hasErrors) {
  console.error("\nFRONTMATTER SCHEMA AUDIT FAILED.");
  process.exit(1);
} else {
  console.log("ALL FRONTMATTER CHECKS PASSED.");
}
