---
title: "Industrial CG Platform 对比原版 Blender：核心差异与选型指南"
description: "全面对比 Industrial CG Platform 与原版 Blender：原生 Cycles Deep EXR、EXR Overscan、材质通道灯光 AOV、Shadow Color、ViewLayer 管理器、内置 Qt 6 (bQt) 运行时、兼容性边界及何时继续使用原版。"
cover: "/splash.webp"
faq: true
---

# Industrial CG Platform 对比原版 Blender：核心差异与选型指南

**Industrial CG Platform** 是基于 **原版 Blender** 打造的影视特效生产分支，面向需要对接 Nuke、Maya 与 Houdini 的工作室管线：它完整保留了你熟悉的 Blender 界面、插件生态与 `.blend` 文件格式，同时在引擎与运行时底层原生加入了 Cycles **Deep EXR**、**EXR Overscan**、**材质通道灯光 AOV**、**Shadow Color**、**ViewLayer 管理器**以及 **内置 Qt (bQt) 运行时**。

如果你需要了解完整的工作室管线架构或端到端合成实操，请分别查看 **[Blender VFX 管线](/zh/blender-vfx-pipeline/)** 与 **[Blender 到 Nuke 工作流](/zh/blender-to-nuke-workflow/)**。本页聚焦回答三个问题：它和原版 Blender 具体差在哪里、为什么必须做成分支而不是插件，以及什么情况下直接用原版 Blender 更合适。

## 1. 核心功能对照：原版 Blender vs Industrial CG Platform

下表逐项列出两边开箱即用的实际能力，并链接到对应功能文档查看完整细节。对于原版 Blender 可通过手动变通或脚本实现的部分，也在表中如实说明。

| 功能项 | 原版 Blender | Industrial CG Platform |
| --- | --- | --- |
| **[原生 Deep EXR 输出](/zh/industrial-cg-platform/features/deep-exr)** | 仅支持普通平面 EXR，Cycles 无原生深度图像输出。 | Cycles 原生输出 Deep EXR（支持 Simple 与 Physical 模式，覆盖表面、物体体积与 World Volume 采样），直接接入 Nuke `DeepMerge`。 |
| **[EXR Overscan](/zh/industrial-cg-platform/features/exr-overscan)** | 无原生 Overscan 元数据；画幅外扩边需靠手动改相机/分辨率或后期补边。 | 原生 Cycles Overscan：成片裁切框（`displayWindow`）不变，实际渲染范围（`dataWindow`）外扩，Nuke 做镜头畸变不再出现黑边。 |
| **[材质通道灯光 AOV](/zh/industrial-cg-platform/features/lightgroup-lobe-passes)** | Lightgroup 仅输出合并色，Cycles 原生不支持按灯光组拆分量（需靠变通流程）。 | Cycles 内核原生按灯光组拆分 Direct/Indirect 漫反射、高光、透射与体积 AOV。 |
| **[Shadow Color](/zh/industrial-cg-platform/features/shadow-color)** | 阴影仅为光线缺失，没有按单灯或世界环境指定阴影颜色的控制项。 | Cycles 原生支持单灯与世界阴影染色（*已知限制*：仅在阴影区域做叠加着色，不模拟彩色半透明物体的真实透射遮挡）。 |
| **[ViewLayer 管理器](/zh/industrial-cg-platform/features/viewlayer-manager)** | 需在属性面板逐层手动勾选通道，无内置批量预设管理器（基础批处理需自行写 Python 脚本）。 | 独立 Qt 窗口集中管理 ViewLayer、渲染通道、Shader AOV 与灯光组，支持多图层一键套用批量预设。 |
| **[内置 Qt 运行时 (bQt)](/zh/industrial-cg-platform/api/bqt-usage)** | 原版 Blender 未内置 Qt 集成（需手动配置第三方 Python 包与事件循环）。 | 运行时内置 Qt 6（通过 bQt 系统扩展集成），开箱驱动 ViewLayer 管理器及工作室 Qt 工具。 |

## 2. 为什么必须做成分支，而不是普通插件？

Blender 的 Python API 很适合搭建界面、场景批处理或合成器连线，但它无法改写 Cycles 追踪光线的方式、积分器累加渲染通道的逻辑、OpenEXR 深度/画幅元数据的写出，也无法自带一套免配置的 Qt 运行时。Industrial CG Platform 的所有扩展都落在分支层面，原因如下：

- **Cycles 内核与通道系统**：
  - **原生 Deep EXR** 必须在路径追踪阶段记录逐采样深度，在 `KernelFilm` 中管理分块深度采样预算，并通过 OpenEXR 深度接口直接写出（`PASS_DEEP_COMBINED`、`PASS_DEEP_POSITION`）。
  - **材质通道灯光 AOV** 需要在 Cycles 积分器内部按灯光组实时累加 Direct/Indirect 漫反射、高光、透射与体积贡献（`lightgroup_split_index`、`film_write_lightgroup_split_pass`），同时保证所有分量加回 Beauty 时的能量守恒。
  - **Shadow Color** 在积分器的阴影求值路径中读取 `KernelLight.shadow_color` 与 `KernelBackground.shadow_color` 字段，实现对单灯和世界阴影的独立着色。
  - **EXR Overscan** 由 Cycles 直接渲染超出标准成片框的边缘像素，并按 OpenEXR 规范写出 `displayWindow` 与扩展后的 `dataWindow`，不改变镜头焦距与构图。
- **内置 Qt (bQt) 运行时**：
  - 将 **Qt 6**（`PySide6` + `bqt`）作为系统扩展直接打包进发行版，并配合按会话动态启用与独立窗口安全模式，才能让 **ViewLayer 管理器** 等工具零配置稳定运行，无需艺术家手动安装 Python wheel。

上述内核级与运行时能力都无法通过普通插件干净实现。C++ 与 Python 底层细节请参阅 [Cycles 内核扩展](/zh/industrial-cg-platform/api/cycles-kernel)、[Pass 与 AOV 系统](/zh/industrial-cg-platform/api/pass-system) 以及 [bQt 使用指南](/zh/industrial-cg-platform/api/bqt-usage)。

## 3. 兼容性与使用边界

Industrial CG Platform 紧跟上游原版 Blender，让工作室可以在不破坏既有资产的前提下评估与部署：

- **`.blend` 工程双向兼容**：与原版 Blender 双向兼容。在 Industrial CG Platform 中保存的 `.blend` 文件可以直接在原版 Blender 中正常打开——Deep EXR、EXR Overscan、Shadow Color、材质通道灯光 AOV 等扩展属性会被安全保留并自动忽略。
- **与原版并行共存**：Windows x64 稳定版以绿色便携 ZIP 包分发，沿用标准 `blender.exe` 可执行文件名，窗口标题明确标识为 `Blender <版本号> Industrial CG Platform`。默认 OptiX 着色器缓存已自动隔离（`%USERPROFILE%\AppData\Local\IndustrialCGPlatform\Cache\OptiX\optix7cache.db`）。用户配置默认与原版 Blender 共用标准配置目录，如需完全隔离，启动前设置 `BLENDER_USER_RESOURCES` 或使用 `--factory-startup` 即可。
- **稳定版与系统**：支持 **Windows 10/11 x64**（绿色 ZIP 包，解压约占 1 GB）。当前稳定版与 LTS 版本详见 [安装指南](/zh/industrial-cg-platform/guide/installation) 与 [版本发布记录](/zh/industrial-cg-platform/releases/)。
- **渲染后端**：仅支持 **NVIDIA RTX OptiX**（推荐）与 **CPU** 两种渲染后端。所有扩展功能（Deep EXR、材质通道灯光 AOV、Shadow Color、EXR Overscan）均同时支持 OptiX 与 CPU。
- **内存要求**：**16 GB 最低，32 GB 推荐**（与 [安装指南](/zh/industrial-cg-platform/guide/installation) 保持一致）。
- **Linux 支持状态**：已发布基于 Rocky Linux 8.10（EL8 基线，glibc 2.28+）的公开 **Linux Beta 预发布版** 供测试与反馈。它**尚未作为稳定版交付**——原生 Linux GPU/OptiX、HIP/ROCm 及 Wayland 验收仍在进行中，最新进展见 [开发追踪](/zh/feature-tracking)。
- **开源许可证**：核心 Blender 衍生代码遵循 **GNU GPL v3 或更高版本（`GPL-3.0-or-later`）**，与原版 Blender 一致；内置 Qt 运行时组件保留各自上游开源协议，详见 [关于项目](/zh/industrial-cg-platform/about/)。

## 4. 什么时候应该继续使用原版 Blender？

Industrial CG Platform 的定位非常克制。符合以下情况时，直接使用原版 Blender 反而更合适：

- **不需要对接 Nuke 或多通道 EXR 后期合成**：如果你的项目直接在 Blender 内部合成出片、直接输出成图/视频，或者主要做建模、动画、实时预览，这个分支不会带来额外收益。
- **用不到 Deep EXR、Overscan 扩边、材质通道灯光 AOV 或 Shadow Color**：如果原版 Cycles 的默认输出已经完全满足需求，留在原版可以省去维护额外发行版的成本。
- **当下就需要 macOS、已验收的稳定版 Linux 或非 RTX 显卡 GPU 渲染**：当前稳定版仅支持 Windows x64 下的 NVIDIA RTX OptiX 与 CPU。需要 macOS、生产级稳定 Linux 或 AMD/Intel GPU 加速的团队，建议在 Linux 验收完成前继续使用原版 Blender。
- **工作室 IT 规范强制要求仅使用 Blender 基金会官方二进制包**：如果你的环境必须严格锁定官方上游构建或官方 LTS 支持边界，请保持使用原版 Blender。

如果你的流程*确实*围绕影视特效渲染与 Nuke 合成展开，可以继续阅读 **[Blender VFX 管线](/zh/blender-vfx-pipeline/)** 进行试点评估，或查看 **[Blender 到 Nuke 工作流](/zh/blender-to-nuke-workflow/)** 了解镜头实操配置。

## 5. 常见问题 (FAQ)

### 同一个 `.blend` 文件可以在 Industrial CG Platform 和原版 Blender 里两边打开吗？

可以。在 Industrial CG Platform 中创建和保存的 `.blend` 文件可以在原版 Blender 中正常打开，原版 Blender 的工程也能直接在 Industrial CG Platform 中打开。分支新增的属性（如 Deep EXR、EXR Overscan、Shadow Color、材质通道灯光 AOV 开关）会被保留在文件里，在原版中只是被安全忽略。

### 它是独立安装的吗？能不能和原版 Blender 并行共存？

可以。Windows x64 稳定版采用绿色便携 ZIP 包形态，解压到任意独立目录即可运行，不会覆盖已安装的原版 Blender。它会自动隔离默认的 OptiX 着色器缓存，并在窗口标题和 `--version` 输出中标注 `Blender <版本号> Industrial CG Platform`。如果连用户偏好设置也想彻底隔离，设置 `BLENDER_USER_RESOURCES` 环境变量即可。

### Industrial CG Platform 会取代原版 Blender 吗？

不会。它是基于原版 Blender、面向影视特效生产维护的可选分支，既不是 Blender 基金会官方版本，也不是通用替代品。许多团队会继续保留原版 Blender 做日常建模与通用制作，仅在灯光分层、ViewLayer 管理和 VFX 渲染交付阶段切到 Industrial CG Platform。

### 我现有的 Blender 插件还能正常用吗？

绝大多数兼容原版 Blender 的插件都能在 Industrial CG Platform 中照常运行，因为分支与上游原版 Blender 保持高度一致。依赖已废弃 API 的旧插件的表现也与原版 Blender 相同。

### 目前支持哪些渲染后端和操作系统？

当前稳定版仅支持 **Windows 10/11 x64**，渲染后端仅支持 **NVIDIA RTX OptiX** 与 **CPU**（内存最低 16 GB，推荐 32 GB）。Linux 方面目前提供基于 Rocky Linux 8.10（EL8 基线，glibc 2.28+）的公开 **Linux Beta 预发布版** 供测试，尚未达到稳定版交付标准。

### 为什么这些功能不能做成普通 Blender 插件直接安装？

原生 Deep EXR 的逐采样深度采集、按灯光组拆分 Direct/Indirect 通道、单灯 Shadow Color 阴影着色，以及 OpenEXR 的 `displayWindow`/`dataWindow` Overscan 元数据，全部发生在 Cycles C++ 渲染内核与图像输出管线内部，Python 插件无法改写这些底层路径；内置 Qt 6（bQt）运行时也需要在发行版层面打包集成，才能让 ViewLayer 管理器免配置稳定启动。
