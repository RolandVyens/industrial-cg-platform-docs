# 02-SITE MAP & CONSTRAINTS

MANDATORY directory boundaries and navigation architecture. READ EVERY TIME before editing or syncing language variants (en/zh/fr).

A. `docs/[en|zh|fr]/index.md` (Global Homepage)
- ALLOWED: Hero title (`Industrial 3D`), top-level entry cards for CG Platform and plugins, ecosystem summary block, and sponsorship CTA.
- FORBIDDEN: Deep-dive feature cards (e.g., Deep EXR, Overscan). Do not copy these from subdirectories!

B. `docs/blog/` (Dev Log)
- ALLOWED: Frontmatter with ONLY `date`, `title`, `summary` (plus optional `cover` for OG metadata). Single-column borderless feed list with 'Read More'.
- FORBIDDEN: Frontmatter `tags`, `author`. No `h1` (#) in markdown body. No dual-column/waterfall layouts.

C. `docs/[en|zh|fr]/industrial-cg-platform/` (Core Docs)
- ALLOWED: `index.md` contains platform Hero (`Industrial CG Platform`) and feature cards. `guide/` for user operation. `features/` for technical explanations. `api/` for C++/RNA/Python internals. `releases/` for release feed.
- FORBIDDEN: `guide/` must not contain C++ RNA or source-code API logic. API logic goes to `/api/`.

D. `docs/[en|zh|fr]/[industrial-aov-connector|industrial-light-aov-splitter|aio-ocio]/` (Plugin Docs)
- ALLOWED: Node graphs, installation, UI panels.
- FORBIDDEN: Do not mix features from Plugin A into Plugin B's manual. Total isolation.

E. `docs/public/screenshots/<feature>/` (Documentation Screenshots)
- ALLOWED: Final, page-ready screenshots grouped by feature slug and referenced through absolute `/screenshots/<feature>/<file>` URLs.
- FORBIDDEN: Full-screen source captures, temporary crop files, duplicate variants, or screenshots that are not referenced by the documentation.

F. `docs/[en|zh|fr]/feature-tracking.md` (Development Tracking & Roadmap)
- ALLOWED: Summary stat cards, lifecycle distribution donut chart (single donut chart only), In-Progress R&D cards (with progress bars and vertical single-column checklists), Released production feature cards (with compact `160px × 104px` thumbnails and vertical single-column checklists), and Planned Roadmap grid.
- FORBIDDEN: Hardcoded version number lock-ins in general labels/titles (use version-agnostic `Blender VFX Branch` / `Blender VFX 定制分支`); secondary bar charts or stacked horizontal bars; multi-column wrapped milestone pills.

G. Top Navbar & Dynamic Brand Architecture (`docs/.vitepress/config.mts` & `docs/.vitepress/theme/index.ts`)
- Top-level ecosystem navigation consists of two primary dropdowns: **`Industrial CG Platform`** and **`Plugins` (`插件` / `Plugins`)**, with each product's technical manual nested inside its respective dropdown (no separate top-level `Technical Docs` menu).
- Top-level navbar dropdown triggers (`Industrial CG Platform` and `Plugins`) are clickable in desktop view and navigate directly to `/[locale]/industrial-cg-platform/` and `/[locale]/industrial-pipeline-tools`.
- Top-left navbar brand title (`siteTitle: false` + `#nav-bar-title-after` slot) dynamically switches between **`Industrial CG Platform`** (on `/[locale]/industrial-cg-platform/...` and `/[locale]/feature-tracking`) and **`Industrial 3D`** (on global homepage, plugin pages, blog, donate, and about pages).
