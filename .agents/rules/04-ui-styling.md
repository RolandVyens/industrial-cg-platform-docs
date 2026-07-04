# 04-UI STYLING

MANDATORY constraints for CSS and Visual Design:

1. SEARCH BUTTON OVERRIDE:
   If overriding the search shortcut keys, you MUST target BOTH `.VPSearchButton-Key` (Local) and `.DocSearch-Button-Key` (Algolia).

2. COLOR TOKENS:
   Only use the brand gradients: `#7c4dff`, `#651fff`, `#00e5ff`.
   Do not introduce unapproved colors (reds, greens, yellows) for decorative purposes.

3. HOVER EFFECTS (`.VPFeature:hover`):
   Only use `backdrop-filter: blur` and a slight `-2px` transform-y.
   NEVER add colorful drop-shadows or outer glows.

4. STRICT MINIMALISM:
   Do not add decorative placeholders. Keep the UI extremely clean.
