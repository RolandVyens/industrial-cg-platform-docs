---
title: "Blender 到 Nuke 影视合成工作流：原生 Deep EXR、Overscan 与材质通道灯光 AOV"
description: "基于 Industrial CG Platform 5.2.4 LTS 的 Blender 到 Nuke 端到端实操指南：原生 Deep EXR、EXR Overscan、材质通道灯光 AOV 与 ViewLayer 批量管理，配合配套开源插件完成从 Cycles 渲染到 Nuke 合成的完整交接。"
cover: "/blog/nuke-deep-compositing.webp"
faq: true
---

# Blender 到 Nuke 影视合成工作流：原生 Deep EXR、Overscan 与材质通道灯光 AOV

原版 Blender 默认只提供平面 EXR 输出，进到 Foundry Nuke 合成时常常要面对三大痛点：物体穿插全靠手画或反复重渲遮罩、做镜头畸变时画面边缘拉黑边、想在后期单独调一盏灯的高光或漫反射却只能退回三维重渲。**Industrial CG Platform 5.2.4 LTS** 直接在原版 Blender 渲染内核里原生补齐了这些生产能力——内置 **原生 Deep EXR**、**EXR Overscan**、**材质通道灯光 AOV** 与 **ViewLayer 批量管理器**（Windows x64 稳定版；另有面向 Linux 的公开 Beta 1 预发布版供测试）。

本指南结合真实影视多 ViewLayer 镜头，串联 Industrial CG Platform 与配套开源工具——自动分层导出插件（[Industrial AOV Connector](/zh/industrial-aov-connector/)）、Nuke 灯光一键连线脚本（[Auto Light Shuffle](/zh/auto-light-shuffle/)）和跨软件统一色彩配置（[AIO-OCIO](/zh/aio-ocio/)），带你走通从 Cycles 渲染到 Nuke 最终合成的完整流程。

## 1. 全链路流程总览

| 阶段 | 使用工具 | 核心产物 / 交接内容 |
| --- | --- | --- |
| **场景分层与色彩对齐** | [ViewLayer 批量管理器](/zh/industrial-cg-platform/features/viewlayer-manager) + [跨软件色彩配置（AIO-OCIO）](/zh/aio-ocio/) | 拆分渲染层（如场景、道具、主体角色与独立几何数据层），让 Blender 与 Nuke 共用同一套 OCIO 色彩标准 |
| **Cycles 渲染配置** | [原生 Deep EXR](/zh/industrial-cg-platform/features/deep-exr) + [EXR Overscan](/zh/industrial-cg-platform/features/exr-overscan) + [灯光组细分通道](/zh/industrial-cg-platform/features/lightgroup-lobe-passes) | 记录逐像素三维深度的 Deep EXR、带边缘余量的 Overscan 画面，以及每盏灯独立的漫反射/高光/透射/体积通道 |
| **合成器批量写出** | [自动分层导出插件（Industrial AOV Connector）](/zh/industrial-aov-connector/) (5.3.0) | 自动搭建多 ViewLayer 输出节点树，按类别分开写出 Beauty、Deep EXR、Cryptomatte 与抗锯齿几何数据序列 |
| **Nuke 深度与灯光合成** | Foundry Nuke + [灯光一键连线脚本（Auto Light Shuffle）](/zh/auto-light-shuffle/) | 用 `DeepRead` → `DeepMerge` → `DeepToImage` 直接按真实空间深度融合，再一键还原整套灯光组调节树 |
| **色彩管理与交付** | Nuke 端 [AIO-OCIO](/zh/aio-ocio/manual/general-softwares) | 保持 AgX / Filmic / ACES 观感完全一致，按最终成片裁切框输出交付 |

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/screenshots/blender-to-nuke-workflow/compositor-aov-deep-tree.webp" target="_blank" rel="noopener"><img src="/screenshots/blender-to-nuke-workflow/compositor-aov-deep-tree.webp" alt="Industrial CG Platform 5.2.4 真实镜头合成器节点树，多个 ViewLayer 经降噪后分别输出至 Beauty、Deep EXR、Cryptomatte 与几何数据输出节点" loading="lazy"></a>
<figcaption>Industrial CG Platform 5.2.4 LTS 真实生产镜头合成器节点树：通过自动分层导出插件（Industrial AOV Connector），把多 ViewLayer 分别路由到 Beauty、Deep EXR、Cryptomatte 与几何数据输出节点。</figcaption>
</figure>

## 2. 前置工具与选用清单

不需要把所有工具一次装全，按镜头实际需求挑选即可：

| 组件 | 解决什么问题 | 平台 / 运行要求 |
| --- | --- | --- |
| **[Industrial CG Platform 5.2.4 LTS](/zh/industrial-cg-platform/releases/)** | 提供原生 Deep EXR、EXR Overscan、按灯光拆分的 Direct/Indirect 细分通道、Shadow Color 与 ViewLayer 批量管理器 | Windows 10/11 x64 稳定版绿色包（另有基于 Rocky Linux 8.10 的 Linux Beta 1 预发布版供测试） |
| **Foundry Nuke** | 下游 Deep 合成（`DeepRead` / `DeepMerge` / `DeepToImage`）、多通道重打光、镜头畸变还原与成片输出 | Windows / Linux / macOS |
| **[自动分层导出插件（Industrial AOV Connector）](/zh/industrial-aov-connector/)** (5.3.0) | 自动搭建多 ViewLayer 输出节点树、接入降噪、按 Nuke 规范格式化 Z/Position/Normal 数据、自动关闭多余默认输出，或在官方版上提供 Fake Deep 方案 | Blender 4.x / 5.x 插件（本平台与官方 Blender 均可用） |
| **[官方版灯光拆分插件（Industrial Light AOV Splitter）](/zh/industrial-light-aov-splitter/)** | 仅在**官方 Blender**（没有内核级灯光细分通道）时使用，把指定灯光集合拆分成漫反射/高光/透射/体积 AOV | Blender 插件 |
| **[灯光一键连线脚本（Auto Light Shuffle）](/zh/auto-light-shuffle/)** | 在 Nuke 里选中导出的多通道 EXR，一键识别全部灯光组并自动搭好合并树与分组 Backdrop，同时保留原始 Alpha | Foundry Nuke Python 脚本（`nuke_blender_autoaov.py`） |
| **[跨软件色彩配置（AIO-OCIO）](/zh/aio-ocio/)** | 让 Blender 与 Nuke 看到的 AgX、Filmic、ACEScg 与摄影机 Log 色彩完全一致，消除跨软件色差 | 适用于 Blender、Nuke、Maya、Houdini 的 OCIO 2.0+ 配置 |

## 3. Step 1 — ViewLayer 拆分与色彩对齐

在开启 Deep EXR 或拆分 AOV 之前，先把分层结构和色彩标准定死，能省掉后面大半返工：

1. **用批量管理器理清 ViewLayer**：点击 Blender 右上角 ViewLayer 下拉框旁边的入口，打开 **[ViewLayer 批量管理器](/zh/industrial-cg-platform/features/viewlayer-manager)**。按合成需求拆开主要元素（例如背景场景、道具、主体角色，以及专门用于抗锯齿几何数据的图层），选中多个 ViewLayer 后一键套用通道与灯光组预设。
2. **双端统一色彩配置**：通过 `OCIO` 环境变量（或替换 Blender 的 `5.2/colormanagement/` 目录），让 Blender 和 Nuke 加载同一份 **AIO-OCIO** 配置文件，确保线性 EXR 与 AgX/ACES 显示观感完全一致。详见 [Blender 色彩管理配置](/zh/aio-ocio/manual/blender-setup) 与 [通用软件配置](/zh/aio-ocio/manual/general-softwares)。
3. **关掉多余的默认渲染输出**：如果使用了 **Industrial AOV Connector 5.3.0**，保持偏好设置里的**自动禁用默认渲染输出**开启；每次生成或更新输出树时，插件会自动关掉 Blender 默认的 `Save Output`，避免多写一份占空间的无用成图。

## 4. Step 2 — 渲染原生 Deep EXR

原生 Deep EXR 由 Cycles 直接在每个像素里记录多层三维深度与透明度（`Z` / `ZBack` / `RGBA`）。送进 Nuke 后，毛发、烟雾和前后穿插的角色可以直接按真实空间位置合并，再也不用因为资产微调反复重渲遮罩。

1. **选择输出方式**：
   - **单层快速输出**：在 **输出属性 > 输出** 中将 **文件格式** 设为 `Deep EXR`（色彩选 `RGBA`，色深选 `16-bit` 半浮点或 `32-bit` 全浮点，压缩选无损 `ZIPS`）。
   - **多 ViewLayer 合成器输出（生产推荐）**：添加 `File Output` 节点（或让自动分层导出插件直接建好），在 **节点格式** 里选择 `Image` → `Deep EXR`，接上对应 ViewLayer 的 `Image` 接口即可。
2. **选择 Deep 色彩模式（5.2.4 LTS）**：在 **渲染属性 > 性能 > Deep** 中，默认开启 **Simple Mode（轻量模式）**，它会把未降噪的 Beauty 颜色按权重分配给深度采样，省显存、文件小、速度快；只有遇到复杂半透明体积嵌套、需要记录每层原始辐射度时，再取消勾选切到 **Physical Mode（物理精确模式）**。
3. **控制显存上限**：在 **渲染属性 > 性能 > 内存** 里调整 **Deep Tile Budget（显存上限）**（默认 `1024 MB`，填 `0` 为不限）。高分辨率镜头显存紧张时，它会自动缩小分块尺寸保住显存，不会牺牲 Deep 精度。

完整参数与界面说明可查阅 [Deep EXR 功能手册](/zh/industrial-cg-platform/features/deep-exr) 及博客 [Blender Deep EXR in Nuke](/blog/posts/2026-07-22-deep-exr-compositing)。

## 5. Step 3 — 开启 EXR Overscan

当 Nuke 合成需要做镜头去畸变/重畸变、添加画面抖动或二维稳像时，按常规尺寸渲染的画面边缘会被拉伸出黑边。**EXR Overscan** 会在保持最终交付裁切框不变的前提下，向外多渲染一圈真实像素并写入标准 OpenEXR 边界框（`displayWindow` 与 `dataWindow`）。

1. 确认 **渲染引擎** 为 `Cycles`，且 **输出属性 > 格式** 中没有勾选 **渲染区域（Render Region）**（开启局部渲染区域时，Overscan 选项会自动置灰）。
2. 将输出格式设为 `OpenEXR`、`OpenEXR Multilayer` 或 `Deep EXR`。
3. 在 **输出属性 > Overscan**（紧挨在格式面板下方）中填入百分比或像素余量（例如 `15%`，为镜头畸变留足安全边）。

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/screenshots/blender-to-nuke-workflow/viewport-overscan-guide.webp" target="_blank" rel="noopener"><img src="/screenshots/blender-to-nuke-workflow/viewport-overscan-guide.webp" alt="Blender 5.2.4 相机视口展示内框最终交付画幅与外框 15% 虚线 Overscan 安全边" loading="lazy"></a>
<figcaption>Industrial CG Platform 5.2.4 LTS 真实镜头相机视口：内框为最终成片交付范围，外侧虚线框为向外多渲染 15% 的 Overscan 安全边。</figcaption>
</figure>

文件进到 Nuke 后，`Read` 和 `DeepRead` 会自动识别交付画幅与外扩 bbox，下游的镜头畸变（`LensDistortion`）、位移（`Transform`）和模糊（`Blur`）节点都能直接吃到真实渲染像素。详见 [EXR Overscan 功能手册](/zh/industrial-cg-platform/features/exr-overscan)。

## 6. Step 4 — 开启按灯光拆分的细分通道

如果想在 Nuke 后期单独调亮主光的高光、压低环境光的间接漫反射，而不用退回 Blender 重渲，可以开启 **灯光组细分通道（Lightgroup Lobe Passes）**：

1. 在 **视图层属性 > 通道 > 灯光** 中建好灯光组（例如主光 `key`、环境光 `env`、辅光 `fill01` / `fill02`），并勾选 **Light Pass AOVs**。
2. 按需勾选各灯光组的 **Direct（直接光）** 与 **Indirect（间接光）** 细分通道（漫反射、高光、透射、体积）。
3. 核对还原精度：把所有灯光组的细分通道（加上自发光物体的 `Combined_<lg>` 通道）相加，就能严丝合缝地还原出原始 Beauty 画面。详见 [灯光组细分通道手册](/zh/industrial-cg-platform/features/lightgroup-lobe-passes)。

### 平台原生灯光细分通道 vs. 官方版灯光拆分插件

针对使用**本平台**和**官方 Blender**的不同团队，我们分别提供了两套方案：

| 对比维度 | 平台原生灯光组细分通道 | [官方版灯光拆分插件（Industrial Light AOV Splitter）](/zh/industrial-light-aov-splitter/) |
| --- | --- | --- |
| **适用软件版本** | Industrial CG Platform 5.2.x（Cycles 内核原生支持） | 官方 Blender（Python 插件方案） |
| **拆分精细度** | 每组灯光分别输出 **Direct + Indirect** 四项细分（漫反射 / 高光 / 透射 / 体积） | 每组灯光输出四项细分（漫反射 / 高光 / 透射 / 体积） |
| **场景整理要求** | 直接沿用 Cycles 标准灯光组面板，不限制集合命名 | 灯光需放入 `lgt_*` 前缀集合，且灯光名称只能用字母和数字（不能带下划线） |
| **Nuke 端自动重建** | 由 [Auto Light Shuffle](/zh/auto-light-shuffle/) 原生最高优先级识别 | 由 [Auto Light Shuffle](/zh/auto-light-shuffle/) 自动兼容识别 |

## 7. Step 5 — Nuke 端合成实操

### Deep 合成链路（`DeepRead` → `DeepMerge` → `DeepToImage`）

1. 用 **`DeepRead`** 分别读取每个 ViewLayer 的 Deep EXR 序列（例如场景层、道具层、角色层）。
2. 用 **`DeepMerge`** 合并空间交错的 CG 元素：常规三维穿插融合用 `combine`，需要用前景干净抠掉背景深度流时选 `holdout`。
3. 如果某层先在 2D 平面里用灯光细分通道做过重打光或调色，把调完色的 2D 画面和对应的 Deep 流一起接进 **`DeepRecolor`**，再送进 **`DeepMerge`**，调色后的画面就会继承精确的三维深度。
4. 最后用 **`DeepToImage`** 把合并好的 Deep 流拍平回 2D，继续做最终调色、光学特效与成片输出。

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/blog/nuke-deep-compositing.webp" target="_blank" rel="noopener"><img src="/blog/nuke-deep-compositing.webp" alt="Nuke 深度合成节点图，展示使用 DeepRead 与 DeepMerge 合并多层 Blender Cycles Deep EXR" loading="lazy"></a>
<figcaption>在 Nuke 中通过 DeepRead、DeepMerge 与 DeepToImage 直接合并多层 Blender Cycles Deep EXR，资产微调时无需反复重渲遮罩。</figcaption>
</figure>

### 一键重建灯光组（Auto Light Shuffle）

1. 用普通 **`Read`** 节点导入包含灯光细分通道的多层 EXR。
2. 选中该 `Read` 节点，运行 **[灯光一键连线脚本（Auto Light Shuffle）](/zh/auto-light-shuffle/)**（`nuke_blender_autoaov.py`）。
3. 脚本会自动扫描所有灯光组，优先匹配最精细的通道（先找 Direct/Indirect 细分，其次找合并细分，最后找灯光总通道），自动搭出带灰色分组 Backdrop 的 `Shuffle2` / `Merge2` 节点树，并通过 `Copy` 和 `Premult` 保留原始 Alpha。

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/blog/nuke-lightgroup-lobes.webp" target="_blank" rel="noopener"><img src="/blog/nuke-lightgroup-lobes.webp" alt="Nuke 节点图展示重组 Blender 灯光组 Direct 与 Indirect 细分通道" loading="lazy"></a>
<figcaption>在 Nuke 中一键还原每盏灯的 Direct 与 Indirect 细分通道，让合成师无需退回渲染即可精细重打光。</figcaption>
</figure>

### 无法使用原生 Deep EXR 时的 Fake Deep 回退方案

如果项目受限必须用官方 Blender 渲染，或者镜头只需要单层干净深度、不需要多采样烟雾体积，可以使用自动分层导出插件内置的 **Fake Deep** 流程：导出干净的抗锯齿 `Z` 深度通道，配合 Nuke 的 `DeepFromImage` 实现单层深度近似。详见 [Fake Deep 与深度合成](/zh/industrial-aov-connector/manual/fakedeep)。

## 8. 文件命名与合成交接清单

保持图层和通道命名规范统一，Nuke 合成模板和 Auto Light Shuffle 就能零改线直接接管：

```text
# 典型多 ViewLayer EXR 输出结构（由 Industrial AOV Connector 自动生成）
<shot>_<viewlayer>--RgBA.####.exr        # Beauty + 灯光组细分通道（16-bit half EXR）
<shot>_<viewlayer>--Deep.####.exr        # 原生 Deep EXR（RGBA + 32-bit Z/ZBack，ZIPS 压缩）
<shot>_<viewlayer>--CryptoMaTTe.####.exr # 32-bit float Cryptomatte 遮罩
<shot>_<viewlayer>_DATA--DaTA.####.exr   # 32-bit float 几何数据（Z、Position P、Normal、Vector）

# Cycles 灯光组细分通道命名规范
Diffuse_Direct_<lg> / Diffuse_Indirect_<lg>
Glossy_Direct_<lg>  / Glossy_Indirect_<lg>
Transmission_Direct_<lg> / Transmission_Indirect_<lg>
Volume_Direct_<lg>  / Volume_Indirect_<lg>
```

**交给合成师前，快速核对这 5 件事：**

1. 成片交付画幅分辨率正确，且外扩的 Overscan 余量与前期约定一致。
2. 所有 Deep EXR 序列均包含 Alpha 通道（`RGBA`，这是 `DeepMerge` 正常工作的前提），并使用无损 `ZIPS` 或 `RLE` 压缩。
3. 所有灯光组细分通道（含自发光物体的 `Combined_<lg>`）相加后，与 Beauty 画面亮度色彩一致。
4. 同步交付所用的 **AIO-OCIO** 配置版本号，并注明渲染工作色彩空间（如 `ACEScg` 或 `Linear Rec.709`）。
5. Cryptomatte 与几何数据通道（`Z`、`P`、`Normal`）保持 `32-bit float` 且未经降噪处理。

## 9. 常见问题排障

```text
Nuke 端排查 Blender Deep 与 AOV 问题的标准顺序：
DeepRead -> DeepSample（逐像素查看 Z / ZBack / Alpha 分布）
         -> DeepRecolor（把 2D 重打光后的画面重新赋回三维深度）
         -> DeepMerge（combine 融合 / holdout 抠除）
         -> DeepToImage -> Reformat / Crop（核对成片画幅与 Overscan bbox）
```

- **`DeepMerge` 边缘发虚或体积穿插异常**：先用 Nuke 的 `DeepSample` 节点查看单个像素里的采样分布。如果相近深度的采样被合并得太狠，在 Blender 的 Deep EXR 输出设置里调低 **Deep Merge Tolerance（深度合并容差）** 与 **Alpha Merge Tolerance（透明度合并容差）**（默认 `0.010`）。如果半透明烟雾穿插需要更严格的物理精度，在 **渲染属性 > 性能 > Deep** 中取消勾选 **Simple Mode**，改用 **Physical Mode**。
- **高分辨率 Deep 渲染爆显存**：在 **渲染属性 > 性能 > 内存** 中调低 **Deep Tile Budget**（默认 `1024 MB`），Cycles 会自动缩小有效分块保住显存，不影响 Deep 精度。
- **Overscan 面板呈灰色点不了**：检查 **渲染引擎** 是否为 `Cycles`，并取消勾选 **输出属性 > 格式** 中的 **渲染区域（Render Region）**。
- **当前已知限制**：Deep EXR 目前**暂不支持 World Volume（世界环境体积）**；完整的自定义 Deep metadata 透传属于后续开发计划，尚未包含在当前 5.2.4 版本中。

## 10. 常见问题 (FAQ)

### 官方 Blender 能原生完成这套 Deep EXR 与 Overscan 到 Nuke 的流程吗？

不能原生完成。原版 Blender 没有 Cycles 原生 Deep EXR、标准 EXR Overscan，也没有按灯光拆分的 Direct/Indirect 细分通道。你可以在原版 Blender 上单独安装 [Industrial AOV Connector](/zh/industrial-aov-connector/)、[Industrial Light AOV Splitter](/zh/industrial-light-aov-splitter/)、[Auto Light Shuffle](/zh/auto-light-shuffle/) 和 [AIO-OCIO](/zh/aio-ocio/)，但原生 Deep EXR 和真实 EXR Overscan 需要使用 [Industrial CG Platform](/zh/industrial-cg-platform/)。

### 已经用了 Industrial CG Platform，还需要装自动分层导出插件吗？

单层测试不装也行——你可以直接在 **输出属性 > 输出** 里写出 Deep EXR。但到了多 ViewLayer 生产镜头，[Industrial AOV Connector](/zh/industrial-aov-connector/) 能自动把 Beauty、Deep EXR、Cryptomatte 和几何数据拆成独立的输出节点、自动接好降噪并关掉多余默认输出，省下大量手工连线和排查的时间。

### 什么时候该用原生 Deep EXR，什么时候用 Fake Deep？

只要镜头里存在真实的三维空间穿插——比如角色穿过烟雾、毛发遮挡、粒子飞溅或前景树叶遮挡——单个像素需要记录多层深度时，务必使用**原生 Deep EXR**。只有在必须使用官方 Blender 渲染，或者单层干净 `Z` 深度已经够用的简单镜头里，再选用 [Fake Deep](/zh/industrial-aov-connector/manual/fakedeep)。

### Deep EXR 应该选 Simple Mode 还是 Physical Mode？

绝大多数日常镜头直接用默认的 **Simple Mode（轻量模式）** 就够了：它显存占用低、文件更小、渲染更快。只有遇到复杂的半透明体积多层嵌套、要求每个深度切片都独立保留原始物理辐射度时，再取消勾选切到 **Physical Mode（物理精确模式）**。

### 这套流程支持 Linux 吗？

当前稳定版（**Industrial CG Platform 5.2.4 LTS**，遵循 GPL-3.0-or-later 开源协议）面向 **Windows 10/11 x64**。Linux 方面，现已发布基于 Rocky Linux 8.10 基线的公开 **Linux Beta 1 预发布版**（`industrial-cg-platform-5.2.4-linux-beta.1`）供下载测试与反馈，完整的原生 Linux GPU/OptiX 与桌面验收仍在进行中。最新进展请参阅 [开发追踪](/zh/feature-tracking) 与 [版本发布](/zh/industrial-cg-platform/releases/)。
