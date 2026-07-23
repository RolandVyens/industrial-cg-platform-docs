---
layout: home
title: Blender VFX Fork with Native Deep EXR & EXR Overscan
titleTemplate: Industrial CG Platform
head:
  - - meta
    - name: description
      content: "Industrial CG Platform is a Windows-exclusive VFX rendering fork based on Blender 5.2. Features native Cycles Deep EXR, EXR Overscan, lightgroup lobe passes, and production ViewLayers."
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Industrial CG Platform",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Windows 64-bit",
        "description": "A Blender-based VFX platform with native Deep EXR, EXR overscan, lightgroup lobe passes and production ViewLayer tools.",
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
  text: Blender-Powered CG & VFX Pipeline
  tagline: Production-ready rendering, data management, and color pipeline tools, deeply integrated with Blender and optimized for professional studio pipelines.
  image:
    src: /logo.png
    alt: Industrial 3D Logo
  actions:
    - theme: brand
      text: Get Industrial CG Platform
      link: /en/industrial-cg-platform/
    - theme: alt
      text: Pipeline Tools
      link: /en/industrial-pipeline-tools

description: ".custom-features-grid {"
---
<div class="custom-features-grid">
  <a href="/en/industrial-cg-platform/" class="feature-bg-card" style="background-image: url('/features/platform.webp')">
    <div class="feature-bg-overlay">
      <h3>Industrial CG Platform</h3>
      <p>Blender VFX branch: Deep EXR, EXR Overscan, Lightgroup Lobe Passes, Shadow Color, and ViewLayer Manager.</p>
    </div>
  </a>
  <a href="/en/industrial-aov-connector/" class="feature-bg-card" style="background-image: url('/features/aov.webp')">
    <div class="feature-bg-overlay">
      <h3>Industrial AOV Connector</h3>
      <p>Blender compositor addon for automated AOV trees, denoising node management, and Nuke pass alignment.</p>
    </div>
  </a>
  <a href="/en/industrial-light-aov-splitter/" class="feature-bg-card" style="background-image: url('/features/light.webp')">
    <div class="feature-bg-overlay">
      <h3>Industrial Light AOV Splitter</h3>
      <p>Automatic lightgroup separator to split and materialize individual light AOVs for fine-grained compositing control.</p>
    </div>
  </a>
  <a href="/en/aio-ocio/" class="feature-bg-card" style="background-image: url('/features/ocio.webp')">
    <div class="feature-bg-overlay">
      <h3>AIO-OCIO</h3>
      <p>Unified cross-application OpenColorIO pipeline configuration (Maya, Nuke, Houdini, Blender).</p>
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
  <h2 style="font-size: 1.6rem; font-weight: 600; margin-bottom: 1rem; color: var(--vp-c-text-1);">Deeply Integrated with the Blender Ecosystem</h2>
  <p style="max-width: 760px; margin: 0 auto 1.5rem; line-height: 1.7; color: var(--vp-c-text-2); font-size: 0.98rem;">
    Industrial 3D is not a standalone system, but a suite designed specifically to fill the gaps between open-source Blender and high-end film VFX pipelines. By extending Blender's Cycles rendering kernel C++ source code, building automated compositor addon pipelines, and introducing unified cross-DCC color management, we make Blender a first-class citizen in professional studio workflows.
  </p>
  <div style="font-weight: 500; color: var(--vp-c-brand); font-size: 0.95rem;">
    🎬 Built on Blender • Tailored for VFX • Seamlessly Connected to Nuke/CG Pipelines
  </div>
</div>

<br id="tools-ecosystem">

<div style="text-align: center; margin-top: 4rem; padding-top: 4rem;">
  <h2 style="margin-bottom: 1rem; font-weight: 600; font-size: 1.5rem;">Sponsorship & Support</h2>
  <p style="color: var(--vp-c-text-2); margin-bottom: 2rem;">Industrial 3D tools are developed as open-source, production-focused R&D projects.</p>
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <a class="VPButton medium brand" href="/en/donate">Support the Project</a>
  </div>
</div>
