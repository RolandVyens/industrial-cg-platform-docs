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

5. DOCUMENTATION SCREENSHOT FRAMING:
   - Capture the smallest complete panel or standalone tool window that explains the feature. Do not publish full-screen application captures when a focused crop is sufficient.
   - Move the pointer and any on-screen-control cursor highlight outside the final crop.
   - When documenting native Blender controls, exclude custom add-on panels, overlays, and unrelated UI. The screenshot must match the interface named in the caption.
   - Reuse an existing feature cover when it is the approved page illustration; do not add redundant UI screenshots solely to increase image count.

6. SCREENSHOT MARKUP:
   - Store final assets under `docs/public/screenshots/<feature>/` and reference them with absolute `/screenshots/<feature>/<file>` paths.
   - Use the shared `.doc-screenshot` figure styles and include localized `alt` text and a concise `figcaption` in every language variant.
