# Repository Agent Entry (`industrial-cg-platform-docs`)

Read [`.agents/AGENTS.md`](.agents/AGENTS.md) first — it is the authoritative router for all operating rules, directory boundaries, SEO/GEO redlines, and pre-push gates in this repository.

## Quick Commands

- `npm run docs:build` — Production VitePress build (`docs/.vitepress/dist/`)
- `npm run docs:preview -- --port 4173 --host 127.0.0.1` — Local preview of built output (restart after rebuilding new routes)
- `npm run update:lastmod` — Refresh `docs/.vitepress/git-lastmod.json` after committing `.md` changes
- `npm run audit:built-assets` — Verify all local asset references in built HTML
- `npm run audit:site-policy` — Enforce factual redlines (OptiX+CPU only / no CUDA, Linux Beta 1 / no Rocky 9, `GPL-3.0-or-later`), built `FAQPage`/SEO tags, and `git-lastmod.json` parity
