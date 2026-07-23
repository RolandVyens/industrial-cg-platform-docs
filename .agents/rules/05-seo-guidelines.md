# 05-SEO & METADATA GUIDELINES

MANDATORY constraints for SEO, Frontmatter, and Language variations:

1. STRICT HREFLANG SYMMETRY (CRITICAL):
   Because `config.mts` uses `transformPageData` to dynamically inject cross-language `hreflang` links into the `<head>` of every page, the file structure across language directories MUST be 100% symmetrical.
   - If you create `docs/en/feature/x.md`, you MUST immediately create `docs/zh/feature/x.md` and `docs/fr/feature/x.md`, even if they only contain un-translated English placeholders.
   - FAILURE CONSEQUENCE: A missing language file will generate a 404 hreflang link on the other pages, resulting in a severe Google SEO penalty.

2. IMPLICIT SEO (FRONTMATTER):
   To preserve the minimalist UI, DO NOT write long marketing text or keyword-stuffed `<h1>` headers in the markdown body.
   - Inject SEO keywords ONLY into the frontmatter (`title`, `meta description`, `JSON-LD`).
   - Example: The visible markdown H1 can be `# Deep EXR`, but the frontmatter `title` should be `How to Render Native Deep EXR in Blender for Nuke`.

3. GOOGLE TITLE REWRITE RISK:
   If the discrepancy between the frontmatter `title` and the visible `<h1>` is too extreme, Google may rewrite the SERP title. Keep the `<h1>` concise, but ensure it accurately reflects the core subject of the longer frontmatter title.

4. EXPLICIT OG:IMAGE COVER FIELDS:
   The `transformHead` hook in `config.mts` relies on `pageData.frontmatter.cover` to generate dynamic `og:image` and `twitter:image` tags.
   - ALWAYS explicitly define `cover: /path/to/image.png` in the frontmatter of Blog posts and Feature pages.
   - If omitted, the social media scraper will fall back to the generic global logo, ruining social media link previews.
