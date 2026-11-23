# 02-SITE MAP & CONSTRAINTS

MANDATORY directory boundaries and navigation architecture. READ EVERY TIME before editing or syncing language variants (en/zh/fr).

A. `docs/[en|zh|fr]/index.md` (Global Homepage)
- ALLOWED: Hero title (`Industrial 3D`), top-level entry cards for CG Platform and plugins, ecosystem summary block, and sponsorship CTA.
- FORBIDDEN: Deep-dive feature cards (e.g., Deep EXR, Overscan). Do not copy these from subdirectories!

B. `docs/blog/` (Dev Log)
- ALLOWED: `docs/blog/index.md` renders a single-column borderless feed list with 'Read More' (no dual-column/waterfall layouts). Posts live under `docs/blog/posts/*.md` (shared English-only devlog) with `title`, `date`, `description` (or `summary`), `cover`, and optional `category` / `tags` / `editLink`.
- FORBIDDEN: Translating `docs/blog/` into `/[en|zh|fr]/blog/` subdirectories without updating `transformPageData` and `seo.ts`.

C. `docs/[en|zh|fr]/industrial-cg-platform/` (Core Docs)
- ALLOWED: `index.md` contains platform Hero (`Industrial CG Platform`) and feature cards. `guide/` for user operation. `features/` for technical explanations. `api/` for C++/RNA/Python internals. `releases/` for release feed.
- FORBIDDEN: `guide/` must not contain C++ RNA or source-code API logic. API logic goes to `/api/`.

D. `docs/[en|zh|fr]/[industrial-aov-connector|industrial-light-aov-splitter|auto-light-shuffle|aio-ocio]/` (Plugin Docs)
- ALLOWED: Node graphs, installation, UI panels.
- FORBIDDEN: Do not mix features from Plugin A into Plugin B's manual. Total isolation.

E. `docs/public/screenshots/<feature>/` (Documentation Screenshots)
- ALLOWED: Final, page-ready screenshots grouped by feature slug and referenced through absolute `/screenshots/<feature>/<file>` URLs.
- FORBIDDEN: Full-screen source captures, temporary crop files, duplicate variants, or screenshots that are not referenced by the documentation.

F. `docs/[en|zh|fr]/feature-tracking.md` (Development Tracking & Roadmap)
- DATA SOURCE: Single source of truth lives in `docs/feature-tracking.data.json`, loaded by `docs/feature-tracking.data.js` and rendered by `docs/.vitepress/theme/components/FeatureTrackingBoard.vue` (`<FeatureTrackingBoard locale="..." />`). Sync/drift script: `.agents/scripts/sync_feature_tracking.mjs` (`npm run ft:check` / `npm run ft:sync`); upstream template: `.agents/templates/upstream-ROADMAP.json`.
- ALLOWED: Summary stat cards, lifecycle distribution donut chart (single donut chart only), In-Progress R&D cards (with progress bars and vertical single-column checklists), Released production feature cards (with compact `160px × 104px` thumbnails and vertical single-column checklists), and Planned Roadmap grid.
- FORBIDDEN: Hardcoded version number lock-ins in general labels/titles (use version-agnostic `Blender VFX Branch` / `Blender VFX 定制分支`); secondary bar charts or stacked horizontal bars; multi-column wrapped milestone pills; duplicating raw card HTML across `en`/`zh`/`fr` `.md` files.
- DONUT MATH: Computed automatically in `docs/feature-tracking.data.js` (`r="44"`, `C = 276.46`). Keep `en`, `zh`, and `fr` `.md` wrappers symmetrical.

G. Top Navbar & Dynamic Brand Architecture (`docs/.vitepress/config.mts` & `docs/.vitepress/theme/index.ts`)
- Top-level ecosystem navigation consists of primary dropdowns: **`Industrial CG Platform`**, **`Plugins` (`插件` / `Plugins`)**, and **`Pipeline Cases` (`流程案例` / `Cas de Pipeline`)**, with each product's technical manual nested inside its respective dropdown (no separate top-level `Technical Docs` menu).
- Top-level navbar dropdown triggers (`Industrial CG Platform` and `Plugins`) are clickable in desktop view and navigate directly to `/[locale]/industrial-cg-platform/` and `/[locale]/industrial-pipeline-tools`.
- Top-left navbar brand title (`siteTitle: false` + `#nav-bar-title-after` slot) dynamically switches between **`Industrial CG Platform`** (on `/[locale]/industrial-cg-platform/...` and `/[locale]/feature-tracking`) and **`Industrial 3D`** (on global homepage, plugin pages, blog, donate, and about pages).

H. SEO, AI Discovery & Root Routing (`docs/index.md`, `docs/public/`, `docs/.vitepress/seo.ts`, `docs/.vitepress/git-lastmod.json`)
- `docs/index.md` serves as the `<noscript>`/metadata fallback for `/` while `docs/public/_redirects` handles the Cloudflare Pages 301 redirect (`/ -> /en/`).
- `docs/public/robots.txt`, `llms.txt`, `llms-full.txt`, and `_headers` govern crawler access, LLM indexing, and edge headers (`/sitemap.xml` MIME type and `/robots.txt` `Cache-Control`).
- `docs/.vitepress/seo.ts` centralizes OG/Twitter meta, JSON-LD, clean canonical URLs, and shallow-clone `sitemap.xml` `lastmod` resolution via `docs/.vitepress/git-lastmod.json` (`{ lastmod, blob }` entries maintained by `npm run update:lastmod`).

I. `docs/[en|zh|fr]/[blender-to-nuke-workflow|blender-vfx-pipeline|vs-stock-blender]/` (Top-Level Pipeline Cases / Pillar Pages)
- ALLOWED: Top-level directory per pillar/comparison page with a single `index.md` (mirroring `auto-light-shuffle/`), `faq: true` frontmatter for `FAQPage` JSON-LD, dedicated path-prefix sidebar in `docs/.vitepress/config.mts`, and entry under the `Pipeline Cases` (`流程案例` / `Cas de Pipeline`) top nav dropdown.
- FORBIDDEN: Nesting new pillar/workflow case pages under `industrial-cg-platform/guide/`, adding pillar entry buttons to `industrial-cg-platform/index.md` hero actions (keep them in the top navbar and in-page cross-links only), or omitting `zh`/`fr` mirrors and `llms.txt` / `llms-full.txt` updates.
