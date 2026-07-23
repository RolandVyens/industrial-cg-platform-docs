---
layout: home
title: Industrial CG Platform
titleTemplate: Branche VFX pour Blender

hero:
  name: Industrial CG Platform
  text: Branche VFX pour Blender
  tagline: Conçu pour les VFX. Construit à partir de Blender. Fait pour les plans. Une plateforme de production basée sur Blender pour des flux de travail VFX avancés.
  image:
    src: /logo.png
    alt: Industrial CG Platform Logo
  actions:
    - theme: brand
      text: Premiers pas
      link: /fr/industrial-cg-platform/guide/getting-started
    - theme: alt
      text: Fonctionnalités
      link: /fr/industrial-cg-platform/features/deep-exr
    - theme: alt
      text: Référence API
      link: /fr/industrial-cg-platform/api/

description: "Une plateforme de production basée sur Blender pour des flux de travail VFX avancés."
---

<div class="custom-features-grid">
  <a href="/fr/industrial-cg-platform/features/deep-exr" class="feature-bg-card" style="background-image: url('/features/deep-exr.webp')">
    <div class="feature-bg-overlay">
      <h3>Sortie Deep EXR</h3>
      <p>Sortie de compositing profond native pour Cycles — écrit des données de profondeur par échantillon pour des fusions profondes sans perte dans Nuke et d'autres outils de compositing.</p>
    </div>
  </a>
  <a href="/fr/industrial-cg-platform/features/exr-overscan" class="feature-bg-card" style="background-image: url('/features/overscan.webp')">
    <div class="feature-bg-overlay">
      <h3>Overscan EXR</h3>
      <p>Support natif de l'overscan EXR dans Cycles — rend des pixels supplémentaires en dehors du cadre de la caméra pour ajuster la distorsion de l'objectif, le tremblement de la caméra et les transformations.</p>
    </div>
  </a>
  <a href="/fr/industrial-cg-platform/features/lightgroup-lobe-passes" class="feature-bg-card" style="background-image: url('/features/lightgroups.webp')">
    <div class="feature-bg-overlay">
      <h3>Passes de Lobe de Lightgroup</h3>
      <p>Passes séparées par groupe de lumières (diffus/brillant/transmission/volume) avec séparation directe et indirecte pour un contrôle fin du rééclairage.</p>
    </div>
  </a>
  <a href="/fr/industrial-cg-platform/features/shadow-color" class="feature-bg-card" style="background-image: url('/features/shadow-color.webp'); background-position: 15% center;">
    <div class="feature-bg-overlay">
      <h3>Couleur d'Ombre</h3>
      <p>Contrôle artistique de la couleur d'ombre par lumière et par environnement — teintez les ombres sans affecter le reste de l'éclairage.</p>
    </div>
  </a>
  <a href="/fr/industrial-cg-platform/features/viewlayer-manager" class="feature-bg-card" style="background-image: url('/features/viewlayer.webp')">
    <div class="feature-bg-overlay">
      <h3>Gestionnaire de ViewLayer</h3>
      <p>Outil de gestion des calques de vue basé sur Qt avec système de préréglages, regroupement de passes et opérations par lots — le tout depuis une fenêtre de gestion dédiée.</p>
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

<div style="text-align: center; margin-top: 4rem; padding-top: 4rem; border-top: 1px solid var(--vp-c-divider);">
  <h2 style="margin-bottom: 1rem; font-weight: 600; font-size: 1.5rem;">Soutenir le Développement</h2>
  <p style="color: var(--vp-c-text-2); margin-bottom: 2rem;">Industrial CG Platform est développé en tant que projet R&D open-source axé sur la production.</p>
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <a class="VPButton medium brand" href="https://www.patreon.com/cw/RolandVyens" target="_blank">Soutenir sur Patreon</a>
    <a class="VPButton medium alt" href="https://www.ifdian.net/a/mogubobi2" target="_blank">Soutenir sur Afdian</a>
  </div>
</div>
