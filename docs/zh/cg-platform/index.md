---
layout: home
title: Industrial CG Platform
titleTemplate: Blender VFX 渲染分支

hero:
  name: Industrial CG Platform
  text: Blender VFX 渲染分支
  tagline: 专为 VFX 打造。源于 Blender。为镜头而生。基于 Blender 的高级 VFX 工作流生产平台。
  image:
    src: /logo.png
    alt: Industrial CG Platform Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/cg-platform/guide/getting-started
    - theme: alt
      text: 功能
      link: /zh/cg-platform/features/deep-exr
    - theme: alt
      text: API 参考
      link: /zh/cg-platform/api/

features:
  - icon: 🎬
    title: Deep EXR 深度输出
    details: Cycles 原生深度合成输出 — 写入逐采样深度数据，支持在 Nuke 等合成工具中进行无损深度合并。
    link: /zh/cg-platform/features/deep-exr
  - icon: 💡
    title: 灯光组分量通道
    details: 逐灯光组的漫反射/光泽/透射/体积分量通道，支持直接光和间接光分离，实现精细重打光控制。
    link: /zh/cg-platform/features/lightgroup-lobe-passes
  - icon: 🎨
    title: 阴影颜色
    details: 美术级逐灯光和逐世界阴影颜色控制 — 为阴影着色而不影响其余照明。
    link: /zh/cg-platform/features/shadow-color
  - icon: 🖥️
    title: ViewLayer 管理器
    details: 基于 Qt 的 ViewLayer 管理工具，提供预设系统、通道分组和批量 ViewLayer 操作 — 全部通过专用管理器窗口。
    link: /zh/cg-platform/features/viewlayer-manager
---

<br>

<div style="text-align: center; margin-top: 4rem; padding-top: 4rem; border-top: 1px solid var(--vp-c-divider);">
  <h2 style="margin-bottom: 1rem; font-weight: 600; font-size: 1.5rem;">支持与赞助开发</h2>
  <p style="color: var(--vp-c-text-2); margin-bottom: 2rem;">Industrial CG Platform 是作为专注于生产的开源研发项目进行开发的。</p>
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <a class="VPButton medium brand" href="https://www.patreon.com/cw/RolandVyens" target="_blank">在 Patreon 上支持</a>
    <a class="VPButton medium alt" href="https://www.ifdian.net/a/mogubobi2" target="_blank">在爱发电上支持</a>
  </div>
</div>
