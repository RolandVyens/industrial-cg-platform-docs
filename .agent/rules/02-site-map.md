# 02-SITE MAP & CONSTRAINTS

MANDATORY directory boundaries. READ EVERY TIME before editing or syncing language variants (en/zh/fr).

A. `docs/[en|zh|fr]/index.md` (Global Homepage)
- ALLOWED: Hero title, top-level entry cards for CG Platform and plugins.
- FORBIDDEN: Deep-dive feature cards (e.g., Deep EXR, Overscan). Do not copy these from subdirectories!

B. `docs/[en|zh|fr]/blog/` (Dev Log)
- ALLOWED: Frontmatter with ONLY `date`, `title`, `summary`. Feed list with 'Read More'.
- FORBIDDEN: Frontmatter `tags`, `author`. No `h1` (#) in markdown body. No dual-column/waterfall layouts.

C. `docs/[en|zh|fr]/cg-platform/` (Core Docs)
- ALLOWED: `index.md` contains feature cards. `guide/` for user operation. `features/` for technical explanations.
- FORBIDDEN: `guide/` must not contain C++ RNA or source-code API logic. API logic goes to `/api/`.

D. `docs/[en|zh|fr]/[aov-connector|light-splitter|aio-ocio]/` (Plugin Docs)
- ALLOWED: Node graphs, installation, UI panels.
- FORBIDDEN: Do not mix features from Plugin A into Plugin B's manual. Total isolation.
