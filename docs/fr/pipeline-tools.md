# Modules & Outils de Pipeline

La suite Industrial 3D fournit un ensemble de modules complémentaires open-source et de configurations de couleur conçus pour automatiser, simplifier et intégrer Blender et la gestion des couleurs dans les pipelines VFX professionnels.

---

<div class="tools-grid">
  <!-- AOV Connector -->
  <div class="tool-card">
    <div class="tool-header">
      <span class="tool-icon">🔌</span>
      <div>
        <h3 class="tool-title">Connecteur AOV pour Blender</h3>
        <span class="tool-badge">Module Blender</span>
      </div>
    </div>
    <p class="tool-desc">
      Configure automatiquement les arbres de nœuds de composition, connecte le débruitage OIDN et structure les canaux de sortie pour s'aligner sur les normes Nuke.
    </p>
    <a href="/fr/aov-connector/" class="tool-button">Lire le Guide du Module</a>
  </div>

  <!-- Light AOV Splitter -->
  <div class="tool-card">
    <div class="tool-header">
      <span class="tool-icon">💡</span>
      <div>
        <h3 class="tool-title">Séparateur d'AOV de Lumière</h3>
        <span class="tool-badge">Module Blender</span>
      </div>
    </div>
    <p class="tool-desc">
      Divise et matérialise automatiquement les passes de groupes de lumières pour offrir un contrôle total et indépendant du compositing.
    </p>
    <a href="/fr/light-splitter/" class="tool-button">Lire le Guide du Séparateur</a>
  </div>

  <!-- AIO-OCIO -->
  <div class="tool-card">
    <div class="tool-header">
      <span class="tool-icon">🎨</span>
      <div>
        <h3 class="tool-title">Gestion de Couleur AIO-OCIO</h3>
        <span class="tool-badge">Configuration Couleur</span>
      </div>
    </div>
    <p class="tool-desc">
      Configuration OpenColorIO unifiée garantissant une conversion de couleurs AgX/Filmic cohérente et identique sur Maya, Nuke, Houdini et Blender.
    </p>
    <a href="/fr/aio-ocio/" class="tool-button">Lire le Guide de Couleur</a>
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
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.01);
}
.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
  border-color: var(--vp-c-brand);
}
.tool-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.tool-icon {
  font-size: 2.2rem;
}
.tool-title {
  margin: 0 !important;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.tool-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  margin-top: 0.2rem;
}
.tool-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}
.tool-button {
  text-align: center;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  text-decoration: none !important;
  transition: background-color 0.2s, color 0.2s;
}
.tool-button:hover {
  background: var(--vp-c-brand-1);
  color: #ffffff !important;
}
</style>
