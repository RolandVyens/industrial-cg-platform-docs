# 01-PRE-PUSH CHECKLIST

MANDATORY actions before any `git push`:

1. RUN AUDIT SCRIPT:
   Execute `python .agents/scripts/audit_all_links.py`.
   Must output `Found 0 issues`.

2. RUN BUILD TEST:
   Execute `npm run docs:build`.
   Must output `build complete` (catches Vue template errors).

3. EXPLICIT CONSENT:
   List modified files and ask the User.
   WAIT for "OK" or "Push" confirmation.
   DO NOT push silently in the background.

4. CLEAN ENVIRONMENT:
   Before pushing, clear token: `$env:GITHUB_TOKEN = $null`

5. EMERGENCY OVERRIDE (Only if unauthorized push occurred):
   Local reset: `git reset --hard HEAD~1` (or last safe node)
   Force push: `git push origin <hash>:main --force`
