# 04-UI STYLING

MANDATORY constraints for CSS and Visual Design:

1. SEARCH BUTTON OVERRIDE:
   If overriding the search shortcut keys, you MUST target BOTH `.VPSearchButton-Key` (Local) and `.DocSearch-Button-Key` (Algolia).

2. COLOR TOKENS & TYPOGRAPHY:
   - Forced dark mode (`appearance: 'force-dark'`).
   - Brand accent tokens: `#7c4dff`, `#651fff`, `#00e5ff`. Do not introduce unapproved decorative colors (e.g., yellow or grey brand overrides).
   - Approved text-on-dark brand tints (for small text where `#7c4dff` lacks contrast): `#b39ddb` (badge/button label text) and `#9e7aff` (link / `Read More` text). Use them only as foreground text colors, never as surface fills or decorative accents.
   - Third-party brand exception: Patreon orange (`#ff4500` / `#ff6a33`) and Afdian purple (`#9457e6`) are allowed ONLY on the donate page's platform-specific buttons.
   - Hero brand titles (`.VPHero .name`, `.VPHero .name .clip`) MUST remain pure white (`#ffffff`) with no colored text gradient fill.
   - Card & list typography in dark mode must maintain high contrast: primary titles `#f4f6fb`, body/descriptions/checklists `#c8ceda` / `#d0d6e2`, and metadata `#8f98aa`.

3. BORDERLESS CARD ARCHITECTURE (SITE-WIDE):
   - All cards and surface containers across the site (`.VPFeature`, `.ft-card`, `.ft-stat-card`, `.ft-chart-card`, `.ft-roadmap-item`, `.tool-card`, `.release-card`, `.donation-card`, `.feature-bg-card`, `.blog-post-item`, and homepage callout blocks) MUST be **borderless (`border: none`)** with `box-shadow: none`.
   - Use subtle translucent dark surface elevation (`background: rgba(255, 255, 255, 0.028)`) and a gentle hover lift (`background: rgba(255, 255, 255, 0.045)`, `transform: translateY(-2px)`).
   - Internal card sub-elements (checklists `.ft-milestone`, progress blocks `.ft-progress-block`, status badges, preview thumbnails, inline `code`, release asset items, and card footer links) MUST also be **borderless (`border: none`)** so inner nodes never compete visually with outer cards.

4. BUTTON SHAPE CONVENTIONS:
   - Hero action buttons (`.VPHero .VPButton`) and card action buttons (`.tool-button`, `.card-button`) use **`8px` rounded-rectangle corners (`border-radius: 8px`)** and `border: none` (never `20px` capsule/pill shapes).
   - Bottom/inline documentation CTA buttons (`.vp-doc .VPButton`, e.g., `Support the Project` / `赞助支持项目`) retain **square corners (`border-radius: 0`)** and `border: none`.

5. STRICT MINIMALISM:
   - Do not add decorative placeholders, outer glows, or nested bordered boxes. Keep the UI clean and scannable.

6. DOCUMENTATION SCREENSHOT FRAMING:
   - Capture the smallest complete panel or standalone tool window that explains the feature. Do not publish full-screen application captures when a focused crop is sufficient.
   - Move the pointer and any on-screen-control cursor highlight outside the final crop.
   - When documenting native Blender controls, exclude custom add-on panels, overlays, and unrelated UI. The screenshot must match the interface named in the caption.
   - Reuse an existing feature cover when it is the approved page illustration; do not add redundant UI screenshots solely to increase image count.

7. SCREENSHOT MARKUP:
   - Store final assets under `docs/public/screenshots/<feature>/` and reference them with absolute `/screenshots/<feature>/<file>` paths.
   - Use the shared `.doc-screenshot` figure styles (`border: none`) and include localized `alt` text and a concise `figcaption` in every language variant.
