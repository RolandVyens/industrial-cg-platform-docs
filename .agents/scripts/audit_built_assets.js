const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../../docs/.vitepress/dist');
const siteOrigin = 'https://cgweave.com';
const scannedExtensions = new Set(['.html', '.css']);
const assetExtensions = new Set([
  '.avif', '.css', '.eot', '.gif', '.ico', '.jpeg', '.jpg', '.js', '.json',
  '.mp4', '.otf', '.png', '.svg', '.ttf', '.webm', '.webp', '.woff', '.woff2',
  '.xml',
]);
const attributePattern = /\b(?:src|href|poster|content)=["']([^"']+)["']/gi;
const srcsetPattern = /\bsrcset=["']([^"']+)["']/gi;
const cssUrlPattern = /url\(\s*(['"]?)([^'")]+)\1\s*\)/gi;

if (!fs.existsSync(distDir)) {
  console.error(`[Error] Build output does not exist: ${distDir}`);
  console.error('Run "npm run docs:build" before this audit.');
  process.exit(1);
}

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

function normalizeLocalAsset(rawValue) {
  let value = rawValue.trim();
  if (value.startsWith(siteOrigin)) {
    value = value.slice(siteOrigin.length);
  }

  if (!value.startsWith('/') || value.startsWith('//')) {
    return null;
  }

  const cleanPath = value.split(/[?#]/, 1)[0];
  if (!assetExtensions.has(path.posix.extname(cleanPath).toLowerCase())) {
    return null;
  }

  try {
    return decodeURIComponent(cleanPath);
  } catch {
    return cleanPath;
  }
}

const references = new Map();

function recordReference(rawValue, sourceFile) {
  const assetPath = normalizeLocalAsset(rawValue);
  if (!assetPath) {
    return;
  }

  if (!references.has(assetPath)) {
    references.set(assetPath, new Set());
  }
  references.get(assetPath).add(path.relative(distDir, sourceFile).replace(/\\/g, '/'));
}

for (const filePath of listFiles(distDir)) {
  if (!scannedExtensions.has(path.extname(filePath))) {
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  for (const match of content.matchAll(attributePattern)) {
    recordReference(match[1], filePath);
  }

  for (const match of content.matchAll(srcsetPattern)) {
    for (const candidate of match[1].split(',')) {
      recordReference(candidate.trim().split(/\s+/, 1)[0], filePath);
    }
  }

  for (const match of content.matchAll(cssUrlPattern)) {
    recordReference(match[2], filePath);
  }
}

const missing = [];
for (const [assetPath, sourceFiles] of references) {
  const resolvedPath = path.resolve(distDir, assetPath.slice(1));
  const relativeToDist = path.relative(distDir, resolvedPath);
  const staysInsideDist = relativeToDist && !relativeToDist.startsWith('..') && !path.isAbsolute(relativeToDist);

  if (!staysInsideDist || !fs.existsSync(resolvedPath) || fs.statSync(resolvedPath).isDirectory()) {
    missing.push({ assetPath, sourceFiles: [...sourceFiles].sort() });
  }
}

if (missing.length > 0) {
  console.error(`BUILT ASSET AUDIT FAILED. Found ${missing.length} missing asset(s):`);
  for (const issue of missing) {
    console.error(`- ${issue.assetPath} (referenced by ${issue.sourceFiles.join(', ')})`);
  }
  process.exit(1);
}

console.log(`ALL BUILT ASSET CHECKS PASSED. Verified ${references.size} local asset reference(s).`);
