DOCUMENTATION ROUTER & CORE OPERATING RULES

[CORE OPERATING RULES]
1. BOUNDARY: Do NOT modify files outside E:\blender_modify\industrial-cg-platform-docs\
2. CONFLICT RESOLUTION: Prefer: Current User Prompt > Core Rules > .agents/rules/ > older notes.
3. DELETION: NEVER delete tracked files without explicit user confirmation.
4. GIT: NEVER use force git operations (e.g., reset --hard, push --force) without explicit user approval.
5. AGENT FS: Keep root `.agents/` strictly for active entry docs (`AGENTS.md`). Put transient logs/scripts in `.agents/tmp/`.

[ROUTER INSTRUCTIONS]
To conserve context window, DO NOT load all rules at once. 
Use your file reading tool to load specific rule files below based on your active task:

1. READ EVERY TIME YOU MODIFY ANY FILE:
   - path: .agents/rules/02-site-map.md
   - purpose: Contains strict directory purposes, allowed content, and forbidden boundaries.

2. READ BEFORE RUNNING GIT PUSH:
   - path: .agents/rules/01-pre-push.md
   - purpose: Mandatory validation scripts and user-consent checklist.

3. READ WHEN WRITING VUE, MARKDOWN, OR JS:
   - path: .agents/rules/03-code-pitfalls.md
   - purpose: Syntax constraints to prevent VitePress build failures (e.g., relative paths).

4. READ WHEN ADJUSTING CSS OR LAYOUT:
   - path: .agents/rules/04-ui-styling.md
   - purpose: Layout restrictions (no tags, no authors) and approved color tokens.

5. READ BEFORE WRITING NEW CONTENT OR TRANSLATIONS:
   - path: .agents/rules/05-seo-guidelines.md
   - purpose: Mandatory Hreflang file symmetry and Implicit SEO/Metadata constraints.
