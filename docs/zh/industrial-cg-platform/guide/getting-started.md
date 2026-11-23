---
title: "快速开始"
cover: /splash.webp
description: "快速上手 Industrial CG Platform：面向影视特效工作室、TD、灯光师与合成师、基于原版 Blender 的 VFX 分支，原生提供 Cycles Deep EXR、EXR Overscan、灯光组分量通道、阴影颜色与 ViewLayer 管理器。"
---
# 快速开始

![Industrial CG Platform Splash](/splash.webp)

## 什么是 Industrial CG Platform？

**Industrial CG Platform** 是一个源自 Blender 的生产级发行版，专注于那些通常决定一个镜头能否在真实 VFX 流程中存活下来的 CG 环节。

它不是一个随意堆砌额外功能的普通 Blender 分支。它是一个面向生产的 Blender 平台，专为需要直接在基于 Blender 的工具链中获得 VFX 风格渲染行为的 VFX 工作室、艺术家、技术总监（TD）、流程开发人员和小型团队而设计。

Industrial CG Platform 基于 **原版 Blender** 构建，分支名称为 `industrial-cg-platform`。

## 适用人群

Industrial CG Platform 专为以下人群设计：
- **VFX 工作室** — 希望将 Blender 引入其生产流程。
- **灯光艺术家** — 需要更强大的通道控制。
- **合成师** — 需要从 Blender 获得更好的渲染数据。
- **技术总监 (TD) 和流程开发人员** — 评估使用 Blender 进行基于镜头的工作。
- **小型工作室** — 构建以 Blender 为中心的 VFX 流程。
- **技术美术 (TA)** — 需要源码级功能而不仅仅是插件。

## 核心功能

| 功能 | 说明 |
| --- | --- |
| [Deep EXR](/zh/industrial-cg-platform/features/deep-exr) | Cycles 原生深度合成输出 |
| [EXR Overscan](/zh/industrial-cg-platform/features/exr-overscan) | 在保持成片裁切框不变的前提下向外多渲染边缘画面，适配 Nuke 镜头畸变与稳像 |
| [材质通道灯光 AOV](/zh/industrial-cg-platform/features/lightgroup-lobe-passes) | 按灯光组拆分 Direct/Indirect 漫反射、高光、透射与体积 AOV |
| [Shadow Color](/zh/industrial-cg-platform/features/shadow-color) | 单灯与世界环境的艺术阴影染色 |
| [ViewLayer 管理器](/zh/industrial-cg-platform/features/viewlayer-manager) | 独立多 ViewLayer 批量管理工具，支持预设系统 |

## 与原版 Blender 的区别

- **完全兼容** — 在 Industrial CG Platform 中创建的 `.blend` 文件可以在原版 Blender 中打开。自定义功能在原版中不可用，但数据会被保留。
- **相同的可执行文件名** — 可执行文件仍然是 `blender.exe`，使用相同的配置目录结构。
- **分支后缀** — 窗口标题显示 `Blender 5.2.4 LTS Industrial CG Platform` 以区分原版。
- **Windows x64 稳定版 + Linux Beta 1** — 当前稳定版提供 Windows x64 绿色 ZIP 包；Linux 方面已发布基于 Rocky Linux 8.10 / EL8 基线的公开 Beta 1 预发布版供测试与反馈。

如需完整的功能对照表、分支原因以及何时建议继续使用原版 Blender，请参阅 **[Industrial CG Platform 对比原版 Blender](/zh/vs-stock-blender/)**。

## 下一步

- [Blender 到 Nuke 工作流](/zh/blender-to-nuke-workflow/) — 从 Cycles 原生 Deep EXR、Overscan 与材质通道灯光 AOV 到 Nuke 合成的端到端生产指南。
- [Blender VFX 管线](/zh/blender-vfx-pipeline/) — 面向工作室的架构总览、角色收益对照与试点评估清单。
- [安装](/zh/industrial-cg-platform/guide/installation) — 下载并设置发布版本。
- [从源码构建](/zh/industrial-cg-platform/guide/building-from-source) — 从 GitHub 仓库编译。
- [常见问题](/zh/industrial-cg-platform/guide/faq) — 常见问题解答。
