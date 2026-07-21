---
layout: home
title: 具备原生 Deep EXR 与 EXR Overscan 的 Blender VFX 定制分支
titleTemplate: Industrial CG Platform
head:
  - - meta
    - name: description
      content: "Industrial CG Platform 是一个基于 Blender 5.2 的 Windows 专属 VFX 分支。提供原生的 Cycles Deep EXR、EXR 溢画幅 (Overscan)、基于灯光组的通道分离、阴影颜色和 Qt 视图层管理工具。"
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Industrial CG Platform",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Windows 64-bit",
        "description": "基于 Blender 的 VFX 平台，内置原生 Deep EXR、EXR Overscan、灯光组直接/间接通道及影视级 ViewLayer 管理工具。",
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
  text: 基于 Blender 的影视级 CG & VFX 管线生态
  tagline: 源于 Blender，为电影级制作而生。专为实拍特效与 CG 流程打造的生产级 Blender 渲染、数据管理和色彩管线工具生态。
  image:
    src: /logo.png
    alt: Industrial 3D Logo
  actions:
    - theme: brand
      text: 获取 Industrial CG Platform
      link: /zh/industrial-cg-platform/
    - theme: alt
      text: 浏览管线工具
      link: /zh/industrial-pipeline-tools

---

<div class="custom-features-grid">
  <a href="/zh/industrial-cg-platform/" class="feature-bg-card" style="background-image: url('/features/platform.webp')">
    <div class="feature-bg-overlay">
      <h3>Industrial CG Platform</h3>
      <p>Blender VFX branch: Deep EXR, EXR Overscan, Lightgroup Lobe Passes, Shadow Color, and ViewLayer Manager.</p>
    </div>
  </a>
  <a href="/zh/industrial-aov-connector/" class="feature-bg-card" style="background-image: url('/features/aov.webp')">
    <div class="feature-bg-overlay">
      <h3>Industrial AOV Connector</h3>
      <p>Blender 合成器自动化插件。一键自动创建渲染通道输出树，智能接入降噪节点，并导出为对接 Nuke 的标准多通道结构。</p>
    </div>
  </a>
  <a href="/zh/industrial-light-aov-splitter/" class="feature-bg-card" style="background-image: url('/features/light.webp')">
    <div class="feature-bg-overlay">
      <h3>Industrial Light AOV Splitter</h3>
      <p>灯光组 AOV 拆分工具。自动将合并通道进行拆分和材质化，为合成师提供对漫反射、高光及环境分量的独立后期重打光自由。</p>
    </div>
  </a>
  <a href="/zh/aio-ocio/" class="feature-bg-card" style="background-image: url('/features/ocio.webp')">
    <div class="feature-bg-overlay">
      <h3>AIO-OCIO</h3>
      <p>跨软件统一色彩管理方案。在 Maya、Nuke、Houdini 和 Blender 中构建完全一致的 AgX/Filmic 宽容度色彩转换。</p>
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
  <h2 style="font-size: 1.6rem; font-weight: 600; margin-bottom: 1rem; color: var(--vp-c-text-1);">深植于 Blender 流程生态</h2>
  <p style="max-width: 760px; margin: 0 auto 1.5rem; line-height: 1.7; color: var(--vp-c-text-2); font-size: 0.98rem;">
    Industrial 3D 并非游离于 Blender 之外的独立软件，而是专门为填补开源 Blender 与高端电影特效管线之间的空白而生。通过对 Blender C++ 渲染内核的底层扩展（Cycles 渲染器）、自动化合成器系统开发、以及针对主流 DCC 软件的统一色彩管理支持，让 Blender 得以在复杂的影视生产线上无缝存活与流转。
  </p>
  <div style="font-weight: 500; color: var(--vp-c-brand); font-size: 0.95rem;">
    🎬 源于 Blender • 专为特效打造 • 完美契合 Nuke/CG 制作管线
  </div>
</div>

<br id="tools-ecosystem">

<div style="text-align: center; margin-top: 4rem; padding-top: 4rem; border-top: 1px solid var(--vp-c-divider);">
  <h2 style="margin-bottom: 1rem; font-weight: 600; font-size: 1.5rem;">支持与赞助开发</h2>
  <p style="color: var(--vp-c-text-2); margin-bottom: 2rem;">Industrial 3D 流程工具集是作为专注于生产的开源研发项目进行开发的。</p>
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <a class="VPButton medium brand" href="/zh/donate">赞助支持项目</a>
  </div>
</div>
