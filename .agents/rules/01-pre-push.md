# 01-PRE-PUSH CHECKLIST

MANDATORY actions before any `git push`:

1. SYNC LASTMOD MAP (when `.md` files were added or modified):
   Execute `npm run update:lastmod` on a full git clone and include any updates to `docs/.vitepress/git-lastmod.json` in the commit so Cloudflare Pages `depth=1` shallow clones preserve accurate per-page `sitemap.xml` `<lastmod>` timestamps.

2. RUN AUDIT SCRIPTS:
   Execute `python .agents/scripts/audit_all_links.py`.
   Must output `Found 0 issues`.
   Execute `python .agents/scripts/audit_content_parity.py`.
   Must output `ALL CONTENT PARITY CHECKS PASSED.`.
   Execute `node .agents/scripts/audit_frontmatter.js`.
   Must output `ALL FRONTMATTER CHECKS PASSED.`.

3. RUN BUILD TEST:
   Execute `npm run docs:build`.
   Must output `build complete` (catches Vue template errors).
   Execute `npm run audit:built-assets`.
   Must output `ALL BUILT ASSET CHECKS PASSED` (catches generated pages that reference missing local assets).
   Execute `npm run audit:site-policy`.
   Must output `ALL SITE POLICY CHECKS PASSED` (enforces factual redlines, built FAQPage/SEO metadata, and `git-lastmod.json` parity).

4. EXPLICIT CONSENT:
   List modified files and ask the User.
   WAIT for "OK" or "Push" confirmation.
   DO NOT push silently in the background.

5. CLEAN ENVIRONMENT:
   Before pushing, clear token: `$env:GITHUB_TOKEN = $null`

6. EMERGENCY OVERRIDE (Only if unauthorized push occurred):
   Local reset: `git reset --hard HEAD~1` (or last safe node)
   Force push: `git push origin <hash>:main --force`
