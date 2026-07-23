---
layout: home
title: Fork VFX de Blender avec Deep EXR Natif & EXR Overscan
titleTemplate: Industrial CG Platform
head:
  - - meta
    - name: description
      content: "Industrial CG Platform est un fork VFX basé sur Blender 5.2 pour Windows, intégrant des fonctions de Deep EXR natif, d'overscan EXR, des passes de lightgroups par lobe, et la gestion des ViewLayers via Qt."
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Industrial CG Platform",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Windows 64-bit",
        "description": "Une plateforme VFX basée sur Blender intégrant Deep EXR, EXR overscan, des passes de lightgroup et des outils de production de ViewLayer.",
        "softwareVersion": "5.2.0",
        "license": "https://www.gnu.org/licenses/gpl-3.0.html",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }

hero:
  name: Industrial 3D
  text: Écosystème CG & VFX propulsé par Blender
  tagline: Outils de rendu, de gestion des données et de colorimétrie prêts pour la production, profondément intégrés à Blender et optimisés pour les exigences des studios.
  image:
    src: /logo.png
    alt: Industrial 3D Logo
  actions:
    - theme: brand
      text: Obtenir Industrial CG Platform
      link: /fr/industrial-cg-platform/
    - theme: alt
      text: Outils de pipeline
      link: /fr/industrial-pipeline-tools

description: ".custom-features-grid {"
---
<div class="custom-features-grid">
  <a href="/fr/industrial-cg-platform/" class="feature-bg-card" style="background-image: url('/features/platform.webp')">
    <div class="feature-bg-overlay">
      <h3>Industrial CG Platform</h3>
      <p>Blender VFX branch: Deep EXR, EXR Overscan, Lightgroup Lobe Passes, Shadow Color, and ViewLayer Manager.</p>
    </div>
  </a>
  <a href="/fr/industrial-aov-connector/" class="feature-bg-card" style="background-image: url('/features/aov.webp')">
    <div class="feature-bg-overlay">
      <h3>Industrial AOV Connector</h3>
      <p>Module d'automatisation du compositeur de Blender pour configurer les arbres d'AOV et s'aligner sur les normes Nuke.</p>
    </div>
  </a>
  <a href="/fr/industrial-light-aov-splitter/" class="feature-bg-card" style="background-image: url('/features/light.webp')">
    <div class="feature-bg-overlay">
      <h3>Industrial Light AOV Splitter</h3>
      <p>Séparateur automatique de groupes de lumières pour diviser et matérialiser les passes de lumières individuelles en compositing.</p>
    </div>
  </a>
  <a href="/fr/aio-ocio/" class="feature-bg-card" style="background-image: url('/features/ocio.webp')">
    <div class="feature-bg-overlay">
      <h3>AIO-OCIO</h3>
      <p>Configuration OpenColorIO unifiée et optimisée pour les pipelines multi-logiciels (Maya, Nuke, Houdini, Blender).</p>
    </div>
  </a>
</div>

<style scoped>
.custom-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 4rem;
  margin-bottom: 2rem;
  padding: 0 1.5rem;
  max-width: 1152px;
  margin-left: auto;
  margin-right: auto;
}
.feature-bg-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 280px;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none !important;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
.feature-bg-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
  border-color: var(--vp-c-brand);
}
.feature-bg-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.33) 100%);
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: background 0.3s ease;
}
.feature-bg-card:hover .feature-bg-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 100%);
}
.feature-bg-overlay h3 {
  color: #ffffff !important;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  border: none !important;
}
.feature-bg-overlay p {
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}
</style>

<div style="margin-top: 6rem; padding: 3rem 2rem; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 16px; text-align: center;">
  <h2 style="font-size: 1.6rem; font-weight: 600; margin-bottom: 1rem; color: var(--vp-c-text-1);">Profondément intégré à l'écosystème Blender</h2>
  <p style="max-width: 760px; margin: 0 auto 1.5rem; line-height: 1.7; color: var(--vp-c-text-2); font-size: 0.98rem;">
    Industrial 3D n'est pas un système autonome, mais une suite conçue spécifiquement pour combler le fossé entre le logiciel libre Blender et les pipelines VFX haut de gamme. En étendant le code source C++ du moteur de rendu Cycles de Blender, en automatisant le compositeur via des scripts dédiés et en introduisant une gestion unifiée des couleurs cross-DCC, nous faisons de Blender un outil de premier choix pour les flux de production professionnels.
  </p>
  <div style="font-weight: 500; color: var(--vp-c-brand); font-size: 0.95rem;">
    🎬 Basé sur Blender • Conçu pour les VFX • Connecté aux pipelines Nuke/CG
  </div>
</div>

<br id="tools-ecosystem">

<div style="text-align: center; margin-top: 4rem; padding-top: 4rem; border-top: 1px solid var(--vp-c-divider);">
  <h2 style="margin-bottom: 1rem; font-weight: 600; font-size: 1.5rem;">Soutenir le développement</h2>
  <p style="color: var(--vp-c-text-2); margin-bottom: 2rem;">Les outils Industrial 3D sont développés sous forme de projets R&D open-source axés sur la production.</p>
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <a class="VPButton medium brand" href="/fr/donate">Soutenir le Projet</a>
  </div>
</div>
