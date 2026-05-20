# 快速开始

## 什么是 Industrial CG Platform？

**Industrial CG Platform** 是一个源自 Blender 的生产级发行版，专注于那些通常决定一个镜头能否在真实 VFX 流程中存活下来的 CG 环节。

它不是一个随意堆砌额外功能的普通 Blender 分支。它是一个面向生产的 Blender 平台，专为需要直接在基于 Blender 的工具链中获得 VFX 风格渲染行为的 VFX 工作室、艺术家、技术总监（TD）、流程开发人员和小型团队而设计。

当前版本基于 **Blender 5.2**，分支名称为 `industrial-cg-platform`。

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
| [Deep EXR 深度输出](/zh/features/deep-exr) | Cycles 原生深度合成输出 |
| [灯光组分量通道](/zh/features/lightgroup-lobe-passes) | 逐灯光组的漫反射/光泽/透射/体积分量通道 |
| [阴影颜色](/zh/features/shadow-color) | 逐灯光和逐世界的艺术级阴影着色 |
| [ViewLayer 管理器](/zh/features/viewlayer-manager) | 基于 Qt 的 ViewLayer 管理工具，支持预设系统 |

## 与官方 Blender 的区别

- **完全兼容** — 在 Industrial CG Platform 中创建的 `.blend` 文件可以在官方 Blender 5.2 中打开。自定义功能在官方版本中不可用，但数据会被保留。
- **相同的可执行文件名** — 可执行文件仍然是 `blender.exe`，使用相同的配置目录结构。
- **分支后缀** — 窗口标题显示 `Blender 5.2.0 Industrial CG Platform` 以区分官方版本。
- **仅 Windows** — 当前发布版本仅提供 Windows x64 ZIP 包。Linux 支持计划在未来版本中提供。

## 下一步

- [安装](/zh/guide/installation) — 下载并设置发布版本。
- [从源码构建](/zh/guide/building-from-source) — 从 GitHub 仓库编译。
- [常见问题](/zh/guide/faq) — 常见问题解答。
