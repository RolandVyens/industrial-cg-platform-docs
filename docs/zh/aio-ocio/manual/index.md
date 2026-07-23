---
title: "AIO-OCIO 用户手册"
description: "欢迎阅读 AIO-OCIO（多合一 OpenColorIO 色彩配置文件）的官方用户手册。"
---
# AIO-OCIO 用户手册

欢迎阅读 **AIO-OCIO**（多合一 OpenColorIO 色彩配置文件）的官方用户手册。

## **推荐阅读顺序**

1. [通用三维/合成软件设置](./general-softwares) — 了解如何在 Maya、Nuke、Houdini 中加载配置及设置系统环境变量。
2. [Blender 专项配置](./blender-setup) — 了解如何在 Blender 中覆盖默认的色彩管理文件并设置 Lin709 流程。

---

> 💡 **核心设计概念：**
> AIO-OCIO 是基于 Genco Uney 的原版 PixelManager OCIO 修改和优化而来的色彩管理配置文件，旨在为多种三维创作及后期合成软件提供统一且对齐的色彩工作流。
>
> **前提条件**：您的创作软件必须支持 **OCIO 2.0**（或更高版本）标准才能加载此色彩配置文件。
