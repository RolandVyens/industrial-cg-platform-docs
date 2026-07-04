# 03-CODE PITFALLS

MANDATORY syntax rules for VitePress, Vue, and Markdown:

1. ABSOLUTE PATHS PREFERRED:
   Since the site is hosted on a custom root domain (`cgweave.com`), absolute paths (e.g., `/logo.png`, `/en/donate`) are the safest and most robust way to link assets and pages.
   Do not use convoluted relative paths like `../../public/img.png` unless necessary.

2. VUE ROUTER LINKS:
   When writing `<a :href="...">` inside a `v-for` in Markdown, the URL MUST be wrapped in VitePress's `withBase(url)`.

3. NO EMPTY LINES IN HTML BLOCKS:
   When writing raw HTML tags (`<div>`, `<article>`) inside `.md`, DO NOT leave empty lines inside the block.
   Empty lines cause the markdown parser to split the HTML, breaking the entire layout.

4. DATA LOADER SAFETY (`.data.js`):
   Use ONLY native Node.js `fs` and `path`.
   NEVER `import 'vitepress'` inside data loaders (causes CommonJS/ESM deadlock).
