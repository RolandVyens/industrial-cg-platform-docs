---
title: "Addons & Pipeline Tools"
description: "The Industrial 3D suite includes specialized open-source tools and color configurations designed to automate, streamline, and integrate Blender and co..."
---
# Addons & Pipeline Tools

The Industrial 3D suite includes specialized open-source tools and color configurations designed to automate, streamline, and integrate Blender and color pipelines into high-end film and VFX workflows.

---

<div class="tools-grid">
  <!-- AOV Connector -->
  <div class="tool-card">
    <img src="/features/aov.webp" alt="Industrial AOV Connector" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">Industrial AOV Connector</h3>
        <span class="tool-badge">Blender Addon</span>
      </div>
      <p class="tool-desc">
        Automatically builds composition node trees, hooks up OIDN denoisers, and structures output channels to align with VFX studio standards (Nuke).
      </p>
      <div class="tool-actions">
        <a href="/en/industrial-aov-connector/" class="tool-button">Read Addon Guide</a>
        <a href="https://extensions.blender.org/add-ons/industrial-aov-connector/" class="tool-button tool-button-download" target="_blank" rel="noopener noreferrer">Download</a>
      </div>
    </div>
  </div>

  <!-- Light AOV Splitter -->
  <div class="tool-card">
    <img src="/features/light.webp" alt="Industrial Light AOV Splitter" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">Industrial Light AOV Splitter</h3>
        <span class="tool-badge">Blender Addon</span>
      </div>
      <p class="tool-desc">
        Automatically splits combined rendering passes into individual light component AOVs, giving compositors absolute lighting control.
      </p>
      <div class="tool-actions">
        <a href="/en/industrial-light-aov-splitter/" class="tool-button">Read Splitter Guide</a>
        <a href="https://extensions.blender.org/add-ons/industrial-light-aov-splitter/" class="tool-button tool-button-download" target="_blank" rel="noopener noreferrer">Download</a>
      </div>
    </div>
  </div>

  <!-- AIO-OCIO -->
  <div class="tool-card">
    <img src="/features/ocio.webp" alt="AIO-OCIO" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">AIO-OCIO</h3>
        <span class="tool-badge">Color Config</span>
      </div>
      <p class="tool-desc">
        A unified OpenColorIO configuration ensuring pixel-perfect AgX/Filmic viewport consistency across Maya, Nuke, Houdini, and Blender.
      </p>
      <div class="tool-actions">
        <a href="/en/aio-ocio/" class="tool-button">Read OCIO Config Guide</a>
        <a href="https://github.com/RolandVyens/AIO-OCIO/releases" class="tool-button tool-button-download" target="_blank" rel="noopener noreferrer">Download</a>
      </div>
    </div>
  </div>
</div>

<style scoped>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
}
.tool-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.028);
  border: none;
  border-radius: 12px;
  padding: 1.35rem;
  transition: transform 0.25s ease, background-color 0.25s ease;
  box-shadow: none;
}
.tool-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.045);
  box-shadow: none;
  border: none;
}
.tool-preview {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1.05rem;
  border: none;
  aspect-ratio: 1200/600;
  object-fit: cover;
}
.tool-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.tool-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
}
.tool-title {
  margin: 0 !important;
  font-size: 1.2rem;
  font-weight: 650;
  color: #f4f6fb;
}
.tool-badge {
  font-size: 0.76rem;
  font-weight: 600;
  background: rgba(124, 77, 255, 0.16);
  color: #b39ddb;
  padding: 0.15rem 0.55rem;
  border-radius: 5px;
  white-space: nowrap;
  border: none;
}
.tool-desc {
  font-size: 0.92rem;
  color: #c8ceda;
  line-height: 1.62;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}
.tool-actions {
  display: grid;
  gap: 0.75rem;
  margin-top: auto;
}
.tool-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  text-align: center;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  background: rgba(124, 77, 255, 0.14);
  color: #b39ddb;
  border: none;
  text-decoration: none !important;
  transition: background-color 0.2s, color 0.2s;
}
.tool-button:hover {
  background: var(--vp-c-brand-1);
  color: #ffffff !important;
}
.tool-button-download {
  background: var(--vp-c-brand-1);
  color: #ffffff;
}
.tool-button-download:hover {
  background: var(--vp-c-brand-2);
}
</style>
