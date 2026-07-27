---
title: 如何在 Blender Cycles 中渲染并输出原生 Deep EXR 给 Nuke
head:
  - - meta
    - name: description
      content: "了解如何从 Blender Cycles 输出原生 Deep EXR，实现 Nuke 中的无损深度合成，以及它与标准 Z-Depth 的区别。"
description: "Deep EXR 是一种渲染输出格式，在颜色数据旁边存储逐采样的深度信息。与只存储最近可见表面的标准“平面”EXR 文件不同，Deep EXR 保留了每个对最终像素有贡献的深度采样。这使得在 Nuke 等工具中进行无损深度合成成为可能，CG 图层可以基于其实际深度进行合并，而不是简单的叠加操作。"
cover: "/features/deep-exr.webp"
---
# Deep EXR 深度输出

<Badge type="tip" text="已发布" />

## 什么是 Deep EXR？

Deep EXR 是一种渲染输出格式，在颜色数据旁边存储逐采样的深度信息。与只存储最近可见表面的标准“平面”EXR 文件不同，Deep EXR 保留了每个对最终像素有贡献的深度采样。这使得在 Nuke 等工具中进行**无损深度合成**成为可能，CG 图层可以基于其实际深度进行合并，而不是简单的叠加操作。

Industrial CG Platform 为 Blender Cycles 添加了原生 Deep EXR 输出支持，使得无需任何外部转换工具即可直接从 Blender 写入深度合成数据。

## 为什么使用它？

- **无损深度合并** — 在 Nuke 中使用 `DeepMerge` 合并多个 CG 渲染图层，避免边缘产生伪影，也无需手动绘制遮罩（holdout mattes）。
- **逐采样深度** — 每个像素携带完整的深度信息，允许下游合成人员在任意深度范围内对画面进行切片、重新采样和重打光。
- **体积支持** — 体积渲染数据包含在深度输出中（当前已发布的默认行为）。
- **合成器集成** — 同时支持直接场景渲染输出和 Blender 合成器节点输出。

## 选择输出方式

当场景输出或合成器文件输出节点使用 `Deep EXR` 格式时，Deep 渲染会自动启用，不需要再寻找单独的 Deep Output 开关。

### 方式 A：场景直接输出

当渲染结果需要直接从场景输出设置写成一个 Deep EXR 时，使用这种方式。

1. 打开 **输出属性 > 输出 (Output Properties > Output)**。
2. 将 **文件格式 (File Format)** 设置为 `Deep EXR`。
3. 在同一面板中配置颜色通道、颜色位深、压缩格式和两个合并容差。
4. 设置输出路径并正常渲染。

<figure class="doc-screenshot doc-screenshot--compact">
<a href="/screenshots/deep-exr/output-format-menu.png" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/output-format-menu.png" alt="Blender 输出属性的文件格式菜单，其中已选择 Deep EXR" loading="lazy"></a>
<figcaption>在输出属性的文件格式菜单中选择 Deep EXR。点击图片可查看原始尺寸。</figcaption>
</figure>

<figure class="doc-screenshot">
<a href="/screenshots/deep-exr/output-format-settings.png" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/output-format-settings.png" alt="Deep EXR 输出设置，显示颜色通道、位深、压缩格式和合并容差" loading="lazy"></a>
<figcaption>图中的控件都属于场景的输出面板；当前数值仅为配置示例。</figcaption>
</figure>

#### 输出面板控件

| 控件 | 作用 | 新手建议 |
| --- | --- | --- |
| **文件格式** | 选择原生 Deep EXR 输出，并自动启用 Deep 渲染。 | 选择 `Deep EXR`。 |
| **颜色** | 选择要存储的颜色通道，不会改变 `Z` 或 `ZBack`。 | 需要透明度时使用 `RGBA`，否则使用 `RGB` 即可。 |
| **颜色位深** | 仅控制 RGBA 存储。`16-bit` 使用 half-float，`32-bit` 使用 full-float；`Z` 与 `ZBack` 始终为 32 位浮点。 | 16 位可减小输出，32 位可保留更高的颜色与 Alpha 精度。 |
| **压缩格式** | 压缩 Deep EXR 文件。Deep EXR 支持 None、RLE 和 ZIPS。 | 一般使用无损的 `ZIPS`。 |
| **Deep 合并容差** | 合并相邻 Deep 样本时使用的深度距离阈值。 | 默认 `0.010`；数值越小，保留的独立深度样本越多。 |
| **Alpha 合并容差** | 与深度容差共同使用的 Alpha 差异阈值。 | 默认 `0.010`；数值越小，保留的透明度细节越多。 |

只有两个容差条件都满足时样本才会合并。颜色位深不会改变样本数量或深度位置，只会改变 RGBA 的存储精度。

### 方式 B：合成器文件输出

当需要由合成器控制文件路径、命名或图像插槽时，使用这种方式。

1. 在合成器中添加 **文件输出 (File Output)** 节点。
2. 在 **节点格式 (Node Format)** 中选择 `Image`，然后将 **文件格式** 设置为 `Deep EXR`。
3. 配置该节点自己的颜色位深、压缩格式和合并容差。
4. 添加需要的图像插槽、连接渲染数据并设置输出路径。

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/screenshots/deep-exr/compositor-file-output.png" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/compositor-file-output.png" alt="配置为写入 Deep EXR 的 Blender 合成器文件输出节点" loading="lazy"></a>
<figcaption>合成器文件输出节点拥有独立的节点格式、图像和输出路径面板。</figcaption>
</figure>

#### 文件输出节点面板

- **节点格式 (Node Format)** — 包含该节点自己的 Deep EXR 格式、颜色位深、压缩格式和合并容差。
- **图像 (Images)** — 定义该节点要写出的图像插槽。
- **输出路径 (Output Paths)** — 控制节点输出的目标位置和命名。

文件输出节点保存自己的格式设置。修改场景输出面板不会配置这个节点。

## 渲染内存设置

这些控件不属于前面两个输出格式位置。使用 Cycles 时，请打开 **渲染属性 > 性能 > 内存 (Render Properties > Performance > Memory)**。

| 控件 | 作用 | 默认值 |
| --- | --- | --- |
| **Tile Size** | 设置高分辨率渲染请求使用的图块尺寸。 | 2048 px |
| **Deep Tile Budget** | 限制每个渲染设备的 Deep 图块缓冲区内存。必要时 Cycles 会减小实际图块尺寸以满足预算；设为 `0` 可关闭限制。 | 1024 MB |

Deep Tile Budget 是内存限制，不是 Deep 质量参数。它不会直接降低深度精度，也不会合并样本。

<figure class="doc-screenshot doc-screenshot--compact">
<a href="/screenshots/deep-exr/deep-tile-budget.png" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/deep-tile-budget.png" alt="Blender Cycles 内存面板中的 Tile Size 和 Deep Tile Budget 控件" loading="lazy"></a>
<figcaption>这些控件位于渲染属性 > 性能 > 内存。图中数值仅为示例，并非默认值。</figcaption>
</figure>

## Nuke 工作流程

1. 启用 Deep EXR 输出并渲染您的场景图层。
2. 使用 `DeepRead` 节点将 `.exr` 文件导入到 Nuke 中。
3. 使用 `DeepMerge` 基于深度合并各图层。
4. 使用 `DeepToImage` 将深度数据展平回标准图像。

::: tip
为了获得最佳效果，建议将每个主要的 CG 元素（例如角色、环境、特效）渲染为独立的 Deep EXR 图层并在 Nuke 中进行合并。
:::

## 已知限制

- **元数据重建** — 完整的深度元数据重建属于未来规划，不包含在当前基线中。
- **内存占用** — 深度输出存储的数据量远多于平面 EXR。请使用 Deep Tile Budget 参数来控制平衡。

## 未来工作

- 受 MoonRay 启发的稀疏/压缩深度存储，是一个潜在的未来优化方向。
- 元数据重建，为下游合成提供更完整的元数据信息。

## 另请参阅

- [Pass 与 AOV 系统 (API)](/zh/industrial-cg-platform/api/pass-system) — 深度 Pass 的内部注册方式。
- [Blender 手册：输出属性](https://docs.blender.org/manual/en/latest/render/output/properties/output.html) — 标准 Blender 输出设置。
