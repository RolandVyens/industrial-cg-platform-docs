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

4. STRUCTURED DATA, LICENSE, EDGE CACHING & AI DISCOVERY:
   - `docs/.vitepress/seo.ts` automatically generates `Organization` + `WebSite`, `BreadcrumbList`, `FAQPage` (from `###` Q&A in `guide/faq.md` OR any page with frontmatter `faq: true` containing an `## FAQ` / `## 常见问题` / `## Questions fréquentes` section), `BlogPosting`, and plugin `SoftwareApplication`/`CreativeWork` JSON-LD.
   - Keep license references unified at **GNU GPL v3 or later (`GPL-3.0-or-later`)** (`https://www.gnu.org/licenses/gpl-3.0.html`). Never write `GPL-2.0` for the platform itself.
   - Whenever adding, renaming, or retiring core features, plugins, or releases, update `docs/public/llms.txt` and `docs/public/llms-full.txt` using verified repository facts only.
   - `docs/public/_headers` sets `Cache-Control: public, max-age=0, must-revalidate` on `/robots.txt` (requires Cloudflare Zone `Browser Cache TTL` set to *Respect Existing Headers* to override the 4h CDN default).
   - `docs/.vitepress/git-lastmod.json` stores `{ lastmod, blob }` per `.md` file; in shallow clones (`depth=1`), `docs/.vitepress/seo.ts` ignores parentless grafted commits and compares `git ls-tree -r HEAD -- docs` blob SHAs against `git-lastmod.json`. Run `npm run update:lastmod` on a full clone before committing `.md` changes.

5. FACTUAL REDLINES, WRITING STYLE & TERMINOLOGY (MANDATORY — ENFORCED BY `audit:site-policy`):
   - **GPU Backends**: Industrial CG Platform supports **NVIDIA RTX OptiX** and **CPU** only. NEVER claim CUDA rendering backend support anywhere in `docs/` or `llms*.txt`.
   - **Release Source Builds**: Build guides must follow the validated Windows x64 Release workflow (`VsDevCmd -arch=x64 -host_arch=x64` + Ninja full `install` target so Cycles OptiX kernels and embedded splash/buildinfo are built; never instruct building `--target blender` alone or hardcoding CUDA binary arch flags).
   - **Platform & Linux Status**: Current stable release is **5.2.4 LTS (Windows x64 ZIP)**. Linux is available as a public **Linux Beta 1 pre-release** (Rocky Linux 8.10 / EL8 baseline, glibc 2.28+) for testing and feedback—never claim stable Linux is delivered, and never write stale "Rocky Linux 9" or "Windows-only / Linux not supported" copy.
   - **Human-Readable Writing**: Write for VFX artists, lighting TDs, and compositors—not raw internal code dumps. Lead with what a feature solves; explain companion tools by purpose before naming them; avoid spamming internal implementation tokens (`Qt/BQt`, `displayWindow`/`dataWindow`, `RgBA`/`CryptoMaTTe`/`DaTA`) in prose outside dedicated naming/technical sections.
   - **Upstream Blender Wording**: In evergreen copy describing the fork base or comparing against upstream, write **`stock Blender`** / **`原版 Blender`** / **`Blender officiel`** rather than hardcoding a specific upstream version number (e.g., avoid `based on Blender 5.2` / `stock Blender 5.2` outside actual CLI `--version` output, historical release notes/blog posts, or plugin minimum-API requirements).
   - **Chinese (`zh`) Industry Terminology**: Do NOT force-translate standard VFX English terms (`Deep EXR`, `EXR Overscan`, `Fake Deep`, `ViewLayer`, `Beauty`, `Cryptomatte`, `Shadow Color`, `AOV`, `Direct`/`Indirect`, `Backdrop`, `bbox`). Refer to per-lightgroup split passes as **`材质通道灯光 AOV`** (keeping `(溢画幅)` / `(Lightgroup Lobe Passes)` once in feature detail intros for SEO long-tail coverage). Top-level workflow showcase nav is **`流程案例` / `Pipeline Cases` / `Cas de Pipeline`**.
