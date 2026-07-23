---
layout: home
title: Industrial CG Platform
titleTemplate: Blender VFX 分支

hero:
  name: Industrial CG Platform
  text: Blender VFX 分支
  tagline: 专为 VFX 打造。源于 Blender。为镜头而生。基于 Blender 的高级 VFX 工作流生产平台。
  image:
    src: /logo.png
    alt: Industrial CG Platform Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/industrial-cg-platform/guide/getting-started
    - theme: alt
      text: 功能
      link: /zh/industrial-cg-platform/features/deep-exr
    - theme: alt
      text: API 参考
      link: /zh/industrial-cg-platform/api/

description: "基于 Blender 的高级 VFX 工作流生产平台。"
---
<div class="custom-features-grid">
  <a href="/zh/industrial-cg-platform/features/deep-exr" class="feature-bg-card" style="background-image: url('/features/deep-exr.webp')">
    <div class="feature-bg-overlay">
      <h3>Deep EXR 深度输出</h3>
      <p>Cycles 原生深度合成输出 — 写入逐采样深度数据，支持在 Nuke 等合成工具中进行无损深度合并。</p>
    </div>
  </a>
  <a href="/zh/industrial-cg-platform/features/exr-overscan" class="feature-bg-card" style="background-image: url('/features/overscan.webp')">
    <div class="feature-bg-overlay">
      <h3>EXR Overscan 溢画幅</h3>
      <p>Cycles 原生 EXR 溢画幅支持 — 在相机框外计算额外的像素边缘，为后期镜头防抖、去畸变和图像变形提供缓冲。</p>
    </div>
  </a>
  <a href="/zh/industrial-cg-platform/features/lightgroup-lobe-passes" class="feature-bg-card" style="background-image: url('/features/lightgroups.webp')">
    <div class="feature-bg-overlay">
      <h3>灯光组分量通道</h3>
      <p>逐灯光组的漫反射/光泽/透射/体积分量通道，支持直接光和间接光分离，实现精细重打光控制。</p>
    </div>
  </a>
  <a href="/zh/industrial-cg-platform/features/shadow-color" class="feature-bg-card" style="background-image: url('/features/shadow-color.webp'); background-position: 15% center;">
    <div class="feature-bg-overlay">
      <h3>阴影颜色</h3>
      <p>美术级逐灯光和逐世界阴影颜色控制 — 为阴影着色而不影响其余照明。</p>
    </div>
  </a>
  <a href="/zh/industrial-cg-platform/features/viewlayer-manager" class="feature-bg-card" style="background-image: url('/features/viewlayer.webp')">
    <div class="feature-bg-overlay">
      <h3>ViewLayer 管理器</h3>
      <p>基于 Qt 的 ViewLayer 管理工具，提供预设系统、通道分组和批量 ViewLayer 操作 — 全部通过专用管理器窗口。</p>
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
  <h2 style="margin-bottom: 1rem; font-weight: 600; font-size: 1.5rem;">支持与赞助开发</h2>
  <p style="color: var(--vp-c-text-2); margin-bottom: 2rem;">Industrial CG Platform 是作为专注于生产的开源研发项目进行开发的。</p>
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <a class="VPButton medium brand" href="https://www.patreon.com/cw/RolandVyens" target="_blank">在 Patreon 上支持</a>
    <a class="VPButton medium alt" href="https://www.ifdian.net/a/mogubobi2" target="_blank">在爱发电上支持</a>
  </div>
</div>
