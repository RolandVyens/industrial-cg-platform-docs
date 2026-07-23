---
layout: home
title: Industrial CG Platform
titleTemplate: Blender VFX Branch

hero:
  name: Industrial CG Platform
  text: Blender VFX Branch
  tagline: Built for VFX. Built from Blender. Built for shots. A Blender-based production platform for advanced VFX workflows.
  image:
    src: /logo.png
    alt: Industrial CG Platform Logo
  actions:
    - theme: brand
      text: Getting Started
      link: /en/industrial-cg-platform/guide/getting-started
    - theme: alt
      text: Features
      link: /en/industrial-cg-platform/features/deep-exr
    - theme: alt
      text: API Reference
      link: /en/industrial-cg-platform/api/

description: "A Blender-based production platform for advanced VFX workflows."
---
<div class="custom-features-grid">
  <a href="/en/industrial-cg-platform/features/deep-exr" class="feature-bg-card" style="background-image: url('/features/deep-exr.webp')">
    <div class="feature-bg-overlay">
      <h3>Deep EXR Output</h3>
      <p>Native deep compositing output for Cycles — write per-sample depth data for lossless deep merges in Nuke and other compositing tools.</p>
    </div>
  </a>
  <a href="/en/industrial-cg-platform/features/exr-overscan" class="feature-bg-card" style="background-image: url('/features/overscan.webp')">
    <div class="feature-bg-overlay">
      <h3>EXR Overscan</h3>
      <p>Native EXR overscan support in Cycles — render extra pixels outside the camera frame to pad lens distortion, camera shake, and transformations.</p>
    </div>
  </a>
  <a href="/en/industrial-cg-platform/features/lightgroup-lobe-passes" class="feature-bg-card" style="background-image: url('/features/lightgroups.webp')">
    <div class="feature-bg-overlay">
      <h3>Lightgroup Lobe Passes</h3>
      <p>Per-lightgroup split diffuse/glossy/transmission/volume passes with direct and indirect separation for fine-grained relighting control.</p>
    </div>
  </a>
  <a href="/en/industrial-cg-platform/features/shadow-color" class="feature-bg-card" style="background-image: url('/features/shadow-color.webp'); background-position: 15% center;">
    <div class="feature-bg-overlay">
      <h3>Shadow Color</h3>
      <p>Artistic per-light and per-world shadow color control — tint shadows without affecting the rest of the lighting.</p>
    </div>
  </a>
  <a href="/en/industrial-cg-platform/features/viewlayer-manager" class="feature-bg-card" style="background-image: url('/features/viewlayer.webp')">
    <div class="feature-bg-overlay">
      <h3>ViewLayer Manager</h3>
      <p>Qt-based ViewLayer management tool with preset system, pass grouping, and batch ViewLayer operations — all from a dedicated manager window.</p>
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

<br>

<div style="text-align: center; margin-top: 4rem; padding-top: 4rem;">
  <h2 style="margin-bottom: 1rem; font-weight: 600; font-size: 1.5rem;">Support the Development</h2>
  <p style="color: var(--vp-c-text-2); margin-bottom: 2rem;">Industrial CG Platform is developed as production-focused open-source R&D.</p>
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <a class="VPButton medium brand" href="https://www.patreon.com/cw/RolandVyens" target="_blank">Support on Patreon</a>
    <a class="VPButton medium alt" href="https://www.ifdian.net/a/mogubobi2" target="_blank">Support on Afdian</a>
  </div>
</div>
