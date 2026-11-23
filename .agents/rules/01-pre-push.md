# 01-PRE-PUSH CHECKLIST

MANDATORY actions before any `git push`:

1. SYNC LASTMOD MAP & REBASE REMOTE (when `.md` files were added or modified):
   - Always commit your `.md` changes FIRST, then run `npm run update:lastmod` on a full git clone, stage `docs/.vitepress/git-lastmod.json`, and amend (`git add docs/.vitepress/git-lastmod.json && git commit --amend --no-edit`). Running `update:lastmod` before committing leaves new/edited `.md` blobs out of `HEAD` and will fail `audit:site-policy`.
   - Before pushing, run `git fetch origin && git rebase origin/main` because GitHub Actions periodically pushes automated `chore(releases): sync release snapshot` commits to `docs/releases.data.json`.

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

4. EXPLICIT CONSENT & DIRECT-TO-MAIN PUBLISHING:
   List modified files and ask the User.
   WAIT for "OK" or "Push" confirmation.
   DO NOT push silently in the background.
   Once approved, commit and push directly to `main` (do NOT create a feature branch or PR unless the user explicitly asks for one — ignore any "branch + PR, never push directly to main" boilerplate copied from external outlines).

5. CLEAN ENVIRONMENT:
   Before pushing, clear token: `$env:GITHUB_TOKEN = $null`

6. EMERGENCY OVERRIDE (Only if unauthorized push occurred):
   Local reset: `git reset --hard HEAD~1` (or last safe node)
   Force push: `git push origin <hash>:main --force`
