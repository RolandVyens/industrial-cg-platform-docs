---
title: "Modules & Outils de Pipeline"
description: "La suite Industrial 3D fournit un ensemble de modules complémentaires open-source et de configurations de couleur conçus pour automatiser, simplifier ..."
---
# Modules & Outils de Pipeline

La suite Industrial 3D fournit un ensemble de modules complémentaires open-source et de configurations de couleur conçus pour automatiser, simplifier et intégrer Blender et la gestion des couleurs dans les pipelines VFX professionnels.

---

<div class="tools-grid">
  <!-- AOV Connector -->
  <div class="tool-card">
    <img src="/features/aov.webp" alt="Industrial AOV Connector" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">Industrial AOV Connector</h3>
        <span class="tool-badge">Module Blender</span>
      </div>
      <p class="tool-desc">
        Configure automatiquement les arbres de nœuds de composition, connecte le débruitage OIDN et structure les canaux de sortie pour s'aligner sur les normes Nuke.
      </p>
      <div class="tool-actions">
        <a href="/fr/industrial-aov-connector/" class="tool-button">Lire le Guide du Module</a>
        <a href="https://extensions.blender.org/add-ons/industrial-aov-connector/" class="tool-button tool-button-download" target="_blank" rel="noopener noreferrer">Télécharger</a>
      </div>
    </div>
  </div>

  <!-- Light AOV Splitter -->
  <div class="tool-card">
    <img src="/features/light.webp" alt="Industrial Light AOV Splitter" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">Industrial Light AOV Splitter</h3>
        <span class="tool-badge">Module Blender</span>
      </div>
      <p class="tool-desc">
        Divise et matérialise automatiquement les passes de groupes de lumières pour offrir un contrôle total et indépendant du compositing.
      </p>
      <div class="tool-actions">
        <a href="/fr/industrial-light-aov-splitter/" class="tool-button">Lire le Guide du Séparateur</a>
        <a href="https://extensions.blender.org/add-ons/industrial-light-aov-splitter/" class="tool-button tool-button-download" target="_blank" rel="noopener noreferrer">Télécharger</a>
      </div>
    </div>
  </div>

  <!-- AIO-OCIO -->
  <div class="tool-card">
    <img src="/features/ocio.webp" alt="AIO-OCIO" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">AIO-OCIO</h3>
        <span class="tool-badge">Config Couleur</span>
      </div>
      <p class="tool-desc">
        Configuration OpenColorIO unifiée garantissant une conversion de couleurs AgX/Filmic cohérente et identique sur Maya, Nuke, Houdini et Blender.
      </p>
      <div class="tool-actions">
        <a href="/fr/aio-ocio/" class="tool-button">Lire le Guide de Couleur</a>
        <a href="https://github.com/RolandVyens/AIO-OCIO/releases" class="tool-button tool-button-download" target="_blank" rel="noopener noreferrer">Télécharger</a>
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
