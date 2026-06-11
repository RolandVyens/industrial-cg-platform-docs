---
layout: home
title: Industrial 3D
titleTemplate: CG 与 VFX 流程管线工具集

hero:
  name: Industrial 3D
  text: CG 与 VFX 流程管线工具集
  tagline: 专为实拍特效与电影级 CG 流程打造的生产级渲染、数据管理和色彩管线工具生态。
  image:
    src: /logo.png
    alt: Industrial 3D Logo
  actions:
    - theme: brand
      text: 进入 CG Platform 分支
      link: /zh/cg-platform/
    - theme: alt
      text: 浏览管线工具
      link: #tools-ecosystem

features:
  - icon: 🎬
    title: Industrial CG Platform
    details: 基于 Blender 5.2 源码定制的 VFX 渲染分支。提供 Cycles 原生 Deep EXR 深度图写入、阴影着色控制以及 PyQt 渲染层管理器。
    link: /zh/cg-platform/
  - icon: 🔌
    title: Industrial AOV Connector
    details: Blender 合成器自动化插件。一键自动创建渲染通道输出树，智能接入降噪节点，并导出为对接 Nuke 的标准多通道结构。
    link: /zh/aov-connector/
  - icon: 💡
    title: Light AOV Splitter
    details: 灯光组 AOV 拆分工具。自动将合并通道进行拆分和材质化，为合成师提供对漫反射、高光及环境分量的独立后期重打光自由。
    link: /zh/light-splitter/
  - icon: 🎨
    title: AIO-OCIO
    details: 跨软件统一色彩管理方案。在 Maya、Nuke、Houdini 和 Blender 中构建完全一致的 AgX/Filmic 宽容度色彩转换。
    link: /zh/aio-ocio/
---

<br id="tools-ecosystem">

<div style="text-align: center; margin-top: 4rem; padding-top: 4rem; border-top: 1px solid var(--vp-c-divider);">
  <h2 style="margin-bottom: 1rem; font-weight: 600; font-size: 1.5rem;">支持与赞助开发</h2>
  <p style="color: var(--vp-c-text-2); margin-bottom: 2rem;">Industrial 3D 流程工具集是作为专注于生产的开源研发项目进行开发的。</p>
  <div style="display: flex; gap: 1rem; justify-content: center;">
    <a class="VPButton medium brand" href="https://www.patreon.com/cw/RolandVyens" target="_blank">在 Patreon 上支持</a>
    <a class="VPButton medium alt" href="https://www.ifdian.net/a/mogubobi2" target="_blank">在爱发电上支持</a>
  </div>
</div>
