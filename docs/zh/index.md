---
layout: home
title: Industrial 3D
titleTemplate: CG 与 VFX 流程管线工具集

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

features:
  - icon: 🎬
    title: Industrial CG Platform
    details: 基于 Blender 5.2 源码定制的正片级 VFX 渲染分支。提供 Cycles 原生 Deep EXR 深度图写入、阴影着色控制以及 PyQt 渲染层管理器。
    link: /zh/industrial-cg-platform/
  - icon: 🔌
    title: Industrial AOV Connector
    details: Blender 合成器自动化插件。一键自动创建渲染通道输出树，智能接入降噪节点，并导出为对接 Nuke 的标准多通道结构。
    link: /zh/industrial-aov-connector/
  - icon: 💡
    title: Industrial Light AOV Splitter
    details: 灯光组 AOV 拆分工具。自动将合并通道进行拆分和材质化，为合成师提供对漫反射、高光及环境分量的独立后期重打光自由。
    link: /zh/industrial-light-aov-splitter/
  - icon: 🎨
    title: AIO-OCIO
    details: 跨软件统一色彩管理方案。在 Maya、Nuke、Houdini 和 Blender 中构建完全一致的 AgX/Filmic 宽容度色彩转换。
    link: /zh/aio-ocio/
---

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
    <a class="VPButton medium brand" href="/industrial-cg-platform-docs/zh/donate">赞助支持项目</a>
  </div>
</div>
