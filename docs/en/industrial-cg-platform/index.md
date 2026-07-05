---
layout: home
title: Industrial CG Platform
titleTemplate: Blender VFX Rendering Branch

hero:
  name: Industrial CG Platform
  text: Blender VFX Rendering Branch
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

features:
  - icon: 🎬
    title: Deep EXR Output
    details: Native deep compositing output for Cycles — write per-sample depth data for lossless deep merges in Nuke and other compositing tools.
    link: /en/industrial-cg-platform/features/deep-exr
  - icon: 📐
    title: EXR Overscan
    details: Native EXR overscan support in Cycles — render extra pixels outside the camera frame to pad lens distortion, camera shake, and transformations.
    link: /en/industrial-cg-platform/features/exr-overscan
  - icon: 💡
    title: Lightgroup Lobe Passes
    details: Per-lightgroup split diffuse/glossy/transmission/volume passes with direct and indirect separation for fine-grained relighting control.
    link: /en/industrial-cg-platform/features/lightgroup-lobe-passes
  - icon: 🎨
    title: Shadow Color
    details: Artistic per-light and per-world shadow color control — tint shadows without affecting the rest of the lighting.
    link: /en/industrial-cg-platform/features/shadow-color
  - icon: 🖥️
    title: ViewLayer Manager
    details: Qt-based ViewLayer management tool with preset system, pass grouping, and batch ViewLayer operations — all from a dedicated manager window.
    link: /en/industrial-cg-platform/features/viewlayer-manager
---

<br>

<div style="text-align: center; margin-top: 4rem; padding-top: 4rem; border-top: 1px solid var(--vp-c-divider);">
  <h2 style="margin-bottom: 1rem; font-weight: 600; font-size: 1.5rem;">Support the Development</h2>
  <p style="color: var(--vp-c-text-2); margin-bottom: 2rem;">Industrial CG Platform is developed as production-focused open-source R&D.</p>
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <a class="VPButton medium brand" href="https://www.patreon.com/cw/RolandVyens" target="_blank">Support on Patreon</a>
    <a class="VPButton medium alt" href="https://www.ifdian.net/a/mogubobi2" target="_blank">Support on Afdian</a>
  </div>
</div>
