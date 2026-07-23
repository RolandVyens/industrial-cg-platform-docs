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

5. MULTI-LANGUAGE HTML PARITY:
   When refactoring or upgrading markdown UI structures (e.g., swapping a frontmatter array for a custom HTML grid), you MUST manually apply the exact same HTML structure to all localized variants (`zh`, `fr`, `en`).
   - The `audit_content_parity.py` script strictly enforces identical structural parity. Skipping a language will break the CI/CD pre-push checks.

6. REGEX MASS-REPLACE ON FRONTMATTER:
   When using Python scripts or regex to mass-replace text across markdown files, ALWAYS implement logic to explicitly skip the YAML frontmatter block (between `---`).
   - Failure to isolate frontmatter can lead to catastrophic metadata corruption (e.g., replacing SEO `description` values with CSS snippets).
