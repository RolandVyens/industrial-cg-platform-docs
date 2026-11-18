# 05-SEO & METADATA GUIDELINES

MANDATORY constraints for SEO, GEO (AI discovery), Frontmatter, and Language variations:

1. STRICT HREFLANG SYMMETRY (CRITICAL):
   Because `docs/.vitepress/config.mts` and `docs/.vitepress/seo.ts` inject cross-language `hreflang` links into `<head>` and `sitemap.xml`, the file structure across `docs/en/`, `docs/zh/`, and `docs/fr/` MUST be 100% symmetrical.
   - If you create `docs/en/feature/x.md`, you MUST immediately create `docs/zh/feature/x.md` and `docs/fr/feature/x.md` with matching frontmatter keys.
   - Shared `/blog/` is English-only (new posts under `docs/blog/posts/` must be written in English with `en`/`x-default` alternates only).

2. CLEAN URL, CANONICAL & ROOT REDIRECT:
   `docs/.vitepress/seo.ts` enforces clean URLs automatically:
   - Directory `index.md` pages keep a trailing `/`; non-index `.md` pages have no trailing `/` (matching `cleanUrls: true` and `sitemap.xml`). Never hardcode trailing slashes on non-index internal links.
   - Root `/` redirects 301 -> `/en/` via `docs/public/_redirects` and is excluded from `sitemap.xml`; `docs/index.md` provides `<noscript>` fallback content and canonical `https://cgweave.com/en/`.

3. FRONTMATTER `description`, `title` & `cover`:
   - Every `.md` page MUST define a unique, complete, plain-prose `description:` (blog posts may use `summary:` or `description:`).
   - NEVER leave `description` empty, duplicated across pages, starting with `!` (image alt residue), starting with `|` / `---` (table residue), or containing `...` truncation.
   - `docs/.vitepress/seo.ts` automatically strips redundant `meta[name="description"]` from `frontmatter.head`, prevents duplicate `| Industrial CG Platform` title suffixes, and supplies default landscape `cover` images per product route; set explicit `cover: /path/to/image.webp` (under `docs/public/`) on Blog posts and Feature pages.

4. STRUCTURED DATA, LICENSE & AI DISCOVERY:
   - `docs/.vitepress/seo.ts` automatically generates `Organization` + `WebSite`, `BreadcrumbList`, `FAQPage` (from `###` headings in `guide/faq.md`), `BlogPosting`, and plugin `SoftwareApplication`/`CreativeWork` JSON-LD.
   - Keep license references unified at **GNU GPL v3 or later (`GPL-3.0-or-later`)** (`https://www.gnu.org/licenses/gpl-3.0.html`).
   - Whenever adding, renaming, or retiring core features, plugins, or releases, update `docs/public/llms.txt` and `docs/public/llms-full.txt` using verified repository facts only.
   - `docs/.vitepress/seo.ts` combines `docs/.vitepress/git-lastmod.json` with shallow `HEAD` history so Cloudflare Pages shallow clones preserve per-page `sitemap.xml` `<lastmod>` timestamps; run `npm run update:lastmod` periodically on a full clone to sync historical entries.
