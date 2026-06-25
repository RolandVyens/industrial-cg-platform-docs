# 03-CODE PITFALLS

MANDATORY syntax rules for VitePress, Vue, and Markdown:

1. RELATIVE PATHS ONLY:
   Image and CSS background paths MUST be relative (e.g., `../../public/img.png`).
   NEVER use absolute paths like `/public/img.png`.

2. VUE ROUTER LINKS:
   When writing `<a :href="...">` inside a `v-for` in Markdown, the URL MUST be wrapped in VitePress's `withBase(url)`.

3. NO EMPTY LINES IN HTML BLOCKS:
   When writing raw HTML tags (`<div>`, `<article>`) inside `.md`, DO NOT leave empty lines inside the block.
   Empty lines cause the markdown parser to split the HTML, breaking the entire layout.

4. DATA LOADER SAFETY (`.data.js`):
   Use ONLY native Node.js `fs` and `path`.
   NEVER `import 'vitepress'` inside data loaders (causes CommonJS/ESM deadlock).
