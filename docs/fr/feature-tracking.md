---
title: "Suivi du développement & Feuille de route — Industrial CG Platform"
description: "Suivez les fonctionnalités de production publiées, la R&D candidate en cours et la feuille de route prévue pour la branche VFX Blender Industrial CG Platform."
cover: /features/platform.webp
aside: false
---
# Suivi du développement

Suivez l'état des fonctionnalités publiées en production, les travaux de R&D candidats en cours et les jalons de la feuille de route pour **Industrial CG Platform** (`Branche VFX Blender`).

<div class="ft-summary-grid">
  <div class="ft-stat-card">
    <span class="ft-stat-num ft-stat-brand">5</span>
    <span class="ft-stat-label">Publiées en version stable</span>
  </div>
  <div class="ft-stat-card">
    <span class="ft-stat-num ft-stat-cyan">2</span>
    <span class="ft-stat-label">En cours (R&amp;D Active)</span>
  </div>
  <div class="ft-stat-card">
    <span class="ft-stat-num">4</span>
    <span class="ft-stat-label">Prévues sur la feuille de route</span>
  </div>
</div>

<div class="ft-chart-card ft-donut-only-card">
  <div class="ft-chart-header">
    <span class="ft-chart-title">Répartition du cycle de vie</span>
    <span class="ft-chart-sub">11 fonctionnalités suivies</span>
  </div>
  <div class="ft-donut-wrap">
    <svg class="ft-donut-svg" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="44" fill="none" stroke="var(--vp-c-bg-mute)" stroke-width="14" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#7c4dff" stroke-width="14" stroke-dasharray="125.66 276.46" stroke-dashoffset="0" transform="rotate(-90 60 60)" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#00e5ff" stroke-width="14" stroke-dasharray="50.27 276.46" stroke-dashoffset="-125.66" transform="rotate(-90 60 60)" />
      <text x="60" y="57" text-anchor="middle" class="ft-donut-num">45.5%</text>
      <text x="60" y="73" text-anchor="middle" class="ft-donut-caption">Publié</text>
    </svg>
    <div class="ft-donut-legend">
      <div class="ft-legend-row">
        <span class="ft-dot ft-dot-brand"></span>
        <span class="ft-legend-name">Publiées en version stable</span>
        <span class="ft-legend-val">5 (45.5%)</span>
      </div>
      <div class="ft-legend-row">
        <span class="ft-dot ft-dot-cyan"></span>
        <span class="ft-legend-name">R&amp;D en cours</span>
        <span class="ft-legend-val">2 (18.2%)</span>
      </div>
      <div class="ft-legend-row">
        <span class="ft-dot ft-dot-muted"></span>
        <span class="ft-legend-name">Feuille de route</span>
        <span class="ft-legend-val">4 (36.4%)</span>
      </div>
    </div>
  </div>
</div>

---

## R&D Candidate en cours (In Progress)

<div class="ft-list">
  <div class="ft-card ft-card-active">
    <div class="ft-card-header">
      <div class="ft-title-group">
        <span class="ft-title">Mise à niveau de l'architecture Deep EXR (v2)</span>
        <span class="ft-module">Cycles · OpenEXR</span>
      </div>
      <span class="ft-badge ft-badge-progress">En cours · Alpha</span>
    </div>
    <p class="ft-desc">
      Mise à niveau majeure du flux de sortie Deep EXR de Cycles pour les plans volumétriques complexes (fumée, feu, brouillard) et les échantillonnages élevés — offrant une gestion mémoire plus stable, des fusions Deep plus propres dans Nuke et un mode simplifié (<code>Simple Mode</code>) en option.
    </p>
    <div class="ft-progress-block">
      <div class="ft-progress-meta">
        <span class="ft-progress-label">Progression (Version Alpha prête &amp; tests sur plans en cours)</span>
        <span class="ft-progress-pct">80%</span>
      </div>
      <div class="ft-progress-track">
        <span class="ft-progress-fill" style="width: 80%"></span>
      </div>
    </div>
    <div class="ft-milestones">
      <span class="ft-milestone">✓ Refonte du pipeline de rendu Deep principal</span>
      <span class="ft-milestone">✓ Prise en charge du <code>Simple Mode</code> &amp; des sorties multi-vues</span>
      <span class="ft-milestone">✓ Précision volumétrique &amp; découpage en demi-précision (<code>HALF</code>) corrigés</span>
      <span class="ft-milestone">✓ Version préliminaire Alpha compilée</span>
      <span class="ft-milestone ft-milestone-pending">→ Tests sur plans de production &amp; stabilisation</span>
    </div>
    <div class="ft-links">
      <a href="/blog/posts/2026-10-17-deep-exr-architecture" class="ft-link">Lire le Devlog d'ingénierie →</a>
      <a href="/fr/industrial-cg-platform/features/deep-exr" class="ft-link ft-link-muted">Documentation stable actuelle</a>
    </div>
  </div>
  <div class="ft-card ft-card-active">
    <div class="ft-card-header">
      <div class="ft-title-group">
        <span class="ft-title">Brouillard lumineux mondial en temps réel (<code>Atmosphere Volume</code>)</span>
        <span class="ft-module">World Shader · Cycles Volume</span>
      </div>
      <span class="ft-badge ft-badge-progress">En cours · R&amp;D Active</span>
    </div>
    <p class="ft-desc">
      Nœud de shader mondial <code>Atmosphere Volume</code> (inspiré d'Arnold) et passe de rendu dédiée <code>Atmosphere</code> générant des faisceaux lumineux volumétriques (God Rays) et une profondeur atmosphérique à <strong>une vitesse quasi temps réel</strong> — avec des contrôles intuitifs de densité, de teinte de diffusion, d'atténuation, de directionnalité et d'échantillonnage indépendant, sans le coût lourd du path tracing volumétrique traditionnel.
    </p>
    <div class="ft-progress-block">
      <div class="ft-progress-meta">
        <span class="ft-progress-label">Progression (Nœud &amp; rendu prêts, optimisation vers des performances temps réel en cours)</span>
        <span class="ft-progress-pct">50%</span>
      </div>
      <div class="ft-progress-track">
        <span class="ft-progress-fill" style="width: 50%"></span>
      </div>
    </div>
    <div class="ft-milestones">
      <span class="ft-milestone">✓ Nœud mondial <code>Atmosphere Volume</code> &amp; passe dédiée <code>Atmosphere</code></span>
      <span class="ft-milestone">✓ Contrôles artistiques (Densité / Diffusion &amp; Atténuation / Anisotropie / Échantillons)</span>
      <span class="ft-milestone">✓ Support des faisceaux pour lumières ponctuelles, spots et zones</span>
      <span class="ft-milestone ft-milestone-pending">→ Optimisation des performances vers une vitesse viewport &amp; rendu quasi temps réel</span>
      <span class="ft-milestone ft-milestone-pending">→ Réduction du bruit pour scènes multi-lumières &amp; lumières de zone</span>
    </div>
  </div>
</div>

---

## Fonctionnalités de production publiées (Released)

<div class="ft-list">
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/deep-exr.webp" alt="Sortie Deep EXR native pour Cycles" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Sortie Deep EXR native pour Cycles</span>
          <span class="ft-module">Cycles · Compositor · OpenEXR</span>
        </div>
        <span class="ft-badge ft-badge-released">Publié</span>
      </div>
      <p class="ft-desc">
        Écrit les données de profondeur par échantillon (<code>Z</code>, <code>ZBack</code>, <code>RGBA</code>) directement depuis Cycles ou le compositeur pour le compositing Deep sans perte dans Nuke.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ Sortie native des canaux Deep <code>Z</code> / <code>ZBack</code> / <code>RGBA</code> par échantillon</span>
        <span class="ft-milestone">✓ Prise en charge de la compression OpenEXR <code>RLE</code> et <code>ZIPS</code></span>
        <span class="ft-milestone">✓ Tolérances de fusion et plafond mémoire <code>Deep Tile Budget</code></span>
      </div>
      <div class="ft-links">
        <a href="/fr/industrial-cg-platform/features/deep-exr" class="ft-link">Manuel de la fonctionnalité →</a>
        <a href="/fr/industrial-cg-platform/api/pass-system" class="ft-link ft-link-muted">API Système de passes</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/overscan.webp" alt="Overscan EXR natif" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Overscan EXR natif</span>
          <span class="ft-module">Cycles Camera · OpenEXR BBox</span>
        </div>
        <span class="ft-badge ft-badge-released">Publié</span>
      </div>
      <p class="ft-desc">
        Rend des pixels supplémentaires hors du cadre de la caméra et écrit des métadonnées OpenEXR Data Window et Display Window distinctes pour Nuke.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ Marges d'overscan configurables en pourcentage ou en pixels</span>
        <span class="ft-milestone">✓ Préserve la perspective et le cadrage d'origine sans décalage</span>
        <span class="ft-milestone">✓ Écriture native des métadonnées <code>dataWindow</code> et <code>displayWindow</code></span>
      </div>
      <div class="ft-links">
        <a href="/fr/industrial-cg-platform/features/exr-overscan" class="ft-link">Manuel de la fonctionnalité →</a>
        <a href="/fr/industrial-cg-platform/api/rna-properties" class="ft-link ft-link-muted">API Propriétés RNA</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/lightgroups.webp" alt="Passes de lobe par Lightgroup" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Passes de lobe par Lightgroup</span>
          <span class="ft-module">Cycles Kernel · ViewLayer Passes</span>
        </div>
        <span class="ft-badge ft-badge-released">Publié</span>
      </div>
      <p class="ft-desc">
        Sépare chaque groupe de lumières Cycles en passes directes et indirectes (<code>Diffuse</code>, <code>Glossy</code>, <code>Transmission</code>, <code>Volume</code>) pour le ré-éclairage dans Nuke.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ Séparation par groupe <code>Diffuse</code> / <code>Glossy</code> / <code>Transmission</code> / <code>Volume</code></span>
        <span class="ft-milestone">✓ Contributions d'éclairage <code>Direct</code> et <code>Indirect</code> indépendantes</span>
        <span class="ft-milestone">✓ Équilibre énergétique <code>Combined_&lt;lg&gt; ≈ Σ(Direct + Indirect)</code> garanti</span>
      </div>
      <div class="ft-links">
        <a href="/fr/industrial-cg-platform/features/lightgroup-lobe-passes" class="ft-link">Manuel de la fonctionnalité →</a>
        <a href="/fr/industrial-cg-platform/api/cycles-kernel" class="ft-link ft-link-muted">API Noyau Cycles</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/shadow-color.webp" alt="Couleur d'ombre artistique" class="ft-card-thumb" style="object-position: 15% center;" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Couleur d'ombre artistique (Shadow Color)</span>
          <span class="ft-module">Cycles Lights · World Shader</span>
        </div>
        <span class="ft-badge ft-badge-released">Publié</span>
      </div>
      <p class="ft-desc">
        Contrôle de la teinte des ombres par lumière et par monde dans Cycles sans altérer le reste de l'éclairage direct ou indirect.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ Contrôle de la couleur d'ombre par lumière (<code>Light.shadow_color</code>)</span>
        <span class="ft-milestone">✓ Teinte d'ombre de l'environnement mondial (<code>World.cycles.shadow_color</code>)</span>
        <span class="ft-milestone">✓ Agit uniquement sur les zones d'ombre sans colorer les surfaces éclairées</span>
      </div>
      <div class="ft-links">
        <a href="/fr/industrial-cg-platform/features/shadow-color" class="ft-link">Manuel de la fonctionnalité →</a>
        <a href="/fr/industrial-cg-platform/api/rna-properties" class="ft-link ft-link-muted">API Propriétés RNA</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/viewlayer.webp" alt="Gestionnaire de ViewLayer Qt" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Gestionnaire de ViewLayer Qt</span>
          <span class="ft-module">bQt · PySide6 · Pipeline UI</span>
        </div>
        <span class="ft-badge ft-badge-released">Publié</span>
      </div>
      <p class="ft-desc">
        Fenêtre Qt dédiée à la gestion des couches de vue : préréglages JSON, application par lots et synchronisation instantanée avec Blender.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ Import/export de préréglages JSON et application par lots</span>
        <span class="ft-milestone">✓ Visibilité adaptative des panneaux de passes Cycles / EEVEE</span>
        <span class="ft-milestone">✓ Fenêtre Qt autonome avec synchronisation directe dans la scène Blender</span>
      </div>
      <div class="ft-links">
        <a href="/fr/industrial-cg-platform/features/viewlayer-manager" class="ft-link">Manuel de la fonctionnalité →</a>
        <a href="/fr/industrial-cg-platform/api/bqt-usage" class="ft-link ft-link-muted">Guide bQt</a>
      </div>
    </div>
  </div>
</div>

---

## Feuille de route prévue (Planned Roadmap)

<div class="ft-roadmap-grid">
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">Cycles Lighting</span>
      <span class="ft-badge ft-badge-planned">Prévu</span>
    </div>
    <h3 class="ft-roadmap-title">Objets sans éclairage direct (<code>No Direct Lighting</code>)</h3>
    <p class="ft-roadmap-desc">Propriétés par objet excluant l'éclairage direct pour limiter la contribution uniquement aux rebonds de lumière indirecte par plan.</p>
  </div>
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">ViewLayer · Overrides</span>
      <span class="ft-badge ft-badge-planned">Prévu</span>
    </div>
    <h3 class="ft-roadmap-title">Remplacement de matériaux par collection (<code>Collection Material Override</code>)</h3>
    <p class="ft-roadmap-desc">Flux de travail granulaires de Material Override au niveau des collections et des objets individuels pour les passes utilitaires complexes.</p>
  </div>
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">Cycles Pass · LPE</span>
      <span class="ft-badge ft-badge-planned">Prévu</span>
    </div>
    <h3 class="ft-roadmap-title">Expressions de chemin lumineux arbitraires (LPE)</h3>
    <p class="ft-roadmap-desc">Prise en charge d'une syntaxe LPE personnalisée au-delà des passes de lobes de groupes de lumières prédéfinies.</p>
  </div>
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">bQt · Platform</span>
      <span class="ft-badge ft-badge-planned">Prévu</span>
    </div>
    <h3 class="ft-roadmap-title">Prise en charge de la plateforme Linux</h3>
    <p class="ft-roadmap-desc">Extension de la branche Industrial CG Platform et du gestionnaire de ViewLayer bQt aux environnements de production Linux.</p>
  </div>
</div>

<style scoped>
.ft-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0 1.25rem;
}
.ft-chart-card {
  background: rgba(255, 255, 255, 0.03);
  border: none;
  border-radius: 12px;
  padding: 1.45rem 1.65rem;
}
.ft-donut-only-card {
  margin-bottom: 1.75rem;
}
.ft-chart-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.2rem;
}
.ft-chart-title {
  font-family: 'Outfit', var(--vp-font-family-base);
  font-size: 1.06rem;
  font-weight: 650;
  color: #f4f6fb;
}
.ft-chart-sub {
  font-family: var(--vp-font-family-base);
  font-size: 0.82rem;
  font-weight: 500;
  color: #8f98aa;
}
.ft-donut-wrap {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.ft-donut-svg {
  width: 112px;
  height: 112px;
  flex-shrink: 0;
}
.ft-donut-num {
  fill: #f4f6fb;
  font-family: 'Outfit', var(--vp-font-family-base);
  font-size: 1.3rem;
  font-weight: 700;
}
.ft-donut-caption {
  fill: #c8ceda;
  font-family: var(--vp-font-family-base);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.ft-donut-legend {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  flex: 1;
  min-width: 0;
}
.ft-legend-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.9rem;
}
.ft-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ft-dot-brand {
  background: #7c4dff;
}
.ft-dot-cyan {
  background: #00e5ff;
}
.ft-dot-muted {
  background: #8f98aa;
}
.ft-legend-name {
  color: #d0d6e2;
  font-weight: 500;
  flex: 1;
  white-space: nowrap;
}
.ft-legend-val {
  font-family: var(--vp-font-family-mono);
  font-size: 0.86rem;
  color: #f4f6fb;
  font-weight: 650;
  white-space: nowrap;
}
.ft-progress-block {
  margin-bottom: 1.05rem;
  padding: 0;
  background: transparent;
  border: none;
}
.ft-progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.45rem;
}
.ft-progress-label {
  font-family: var(--vp-font-family-base);
  font-size: 0.86rem;
  font-weight: 500;
  color: #d0d6e2;
}
.ft-progress-pct {
  font-family: var(--vp-font-family-mono);
  font-size: 0.88rem;
  font-weight: 700;
  color: #00e5ff;
}
.ft-progress-track {
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.ft-progress-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #7c4dff, #00e5ff);
}
.ft-stat-card {
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1.4rem;
  background: rgba(255, 255, 255, 0.03);
  border: none;
  border-radius: 12px;
}
.ft-stat-num {
  font-family: 'Outfit', var(--vp-font-family-base);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  color: #f4f6fb;
  margin-bottom: 0.4rem;
}
.ft-stat-brand {
  color: var(--vp-c-brand-1);
}
.ft-stat-cyan {
  color: #00e5ff;
}
.ft-stat-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #c8ceda;
}
.ft-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 1.25rem 0 2rem;
}
.ft-card {
  background: rgba(255, 255, 255, 0.028);
  border: none;
  border-radius: 12px;
  padding: 1.45rem 1.6rem;
  transition: transform 0.25s ease, background-color 0.25s ease;
}
.ft-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.045);
}
.ft-card-active {
  background: rgba(255, 255, 255, 0.035);
}
.ft-card-media {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1.35rem;
  align-items: flex-start;
}
.ft-card-thumb-wrap {
  width: 160px;
  height: 104px;
  border-radius: 8px;
  overflow: hidden;
  border: none;
  background: rgba(0, 0, 0, 0.25);
  flex-shrink: 0;
}
.ft-card-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ft-card-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
@media (max-width: 720px) {
  .ft-card-media {
    grid-template-columns: 1fr;
  }
  .ft-card-thumb-wrap {
    width: 100%;
    height: 140px;
  }
  .ft-donut-wrap {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
.ft-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}
.ft-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
  flex: 1;
  min-width: 0;
}
.ft-title {
  font-family: 'Outfit', var(--vp-font-family-base);
  font-size: 1.18rem;
  font-weight: 650;
  color: #f4f6fb;
}
.ft-module {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  font-weight: 500;
  color: #8f98aa;
}
.ft-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  border: none;
}
.ft-badge-released {
  background: rgba(124, 77, 255, 0.16);
  color: #b39ddb;
}
.ft-badge-progress {
  background: rgba(0, 229, 255, 0.12);
  color: #00e5ff;
}
.ft-badge-planned {
  background: rgba(255, 255, 255, 0.06);
  color: #c8ceda;
}
.ft-desc {
  margin: 0 0 0.85rem 0 !important;
  font-size: 0.93rem;
  line-height: 1.65;
  color: #c8ceda;
}
.ft-milestones {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.9rem;
  padding: 0;
  border: none;
}
.ft-milestone {
  font-family: var(--vp-font-family-base);
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.55;
  padding: 0.08rem 0;
  background: transparent;
  border: none;
  color: #d0d6e2;
}
.ft-milestone-pending {
  background: transparent;
  border: none;
  color: #00e5ff;
  font-weight: 600;
}
.ft-card :deep(code) {
  background: rgba(255, 255, 255, 0.06);
  border: none;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-size: 0.84em;
  color: #f4f6fb;
}
.ft-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
  padding-top: 0.35rem;
  margin-top: auto;
  border: none;
}
.ft-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: #9e7aff;
  text-decoration: none !important;
}
.ft-link:hover {
  opacity: 0.85;
}
.ft-link-muted {
  color: #8f98aa !important;
  font-weight: 500;
  text-decoration: none;
}
.ft-link-muted:hover {
  color: #f4f6fb !important;
}
.ft-roadmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  margin: 1.25rem 0 3rem;
}
.ft-roadmap-item {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.028);
  border: none;
  border-radius: 12px;
  padding: 1.35rem 1.45rem;
  transition: transform 0.25s ease, background-color 0.25s ease;
}
.ft-roadmap-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.045);
}
.ft-roadmap-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.7rem;
}
.ft-roadmap-title {
  margin: 0 0 0.55rem 0 !important;
  font-size: 1.1rem;
  font-weight: 650;
  color: #f4f6fb;
}
.ft-roadmap-desc {
  margin: 0 !important;
  font-size: 0.92rem;
  line-height: 1.65;
  color: #c8ceda;
}
</style>
