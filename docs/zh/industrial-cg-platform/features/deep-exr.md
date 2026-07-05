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

## 如何启用？

### 场景输出

1. 打开 **属性面板 > 输出属性 > 输出 (Properties > Output Properties > Output)**。
2. 将 **文件格式 (File Format)** 更改为 `Deep OpenEXR`。
3. 设置所需的 **深度图块预算 (Deep Tile Budget)**（控制深度数据的内存与质量平衡）。
4. 正常渲染场景。

### 合成器文件输出

1. 在合成器中添加一个 **文件输出 (File Output)** 节点。
2. 将其文件格式设置为 `Deep OpenEXR`。
3. 连接您的渲染图层。
4. 当合成器设备（Compositor Device）设置为 `GPU` 时，深度文件输出节点可正常工作。

::: info
Deep EXR 文件输出不会强制将合成器的其余部分移出 GPU — 它与 GPU 合成无缝集成。
:::

## 核心参数

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| **Deep Output** | 启用深度 EXR 输出格式 | 关闭 |
| **Deep Tile Budget** | 每个图块的深度采样内存预算（越高保留的采样越精细） | 自动 (Automatic) |

## Nuke 工作流程

1. 启用 Deep EXR 输出并渲染您的场景图层。
2. 使用 `DeepRead` 节点将 `.exr` 文件导入到 Nuke 中。
3. 使用 `DeepMerge` 基于深度合并各图层。
4. 使用 `DeepToImage` 将深度数据展平回标准图像。

::: tip
为了获得最佳效果，建议将每个主要的 CG 元素（例如角色、环境、特效）渲染为独立的 Deep EXR 图层并在 Nuke 中进行合并。
:::

## 已知限制

- **体积深度行为** — 当前体积的深度输出行为已被接受并发布。内存密集型的体积场景可能会产生非常庞大的深度文件。
- **元数据重建** — 完整的深度元数据重建属于未来规划，不包含在当前基线中。
- **内存占用** — 深度输出存储的数据量远多于平面 EXR。请使用 Deep Tile Budget 参数来控制平衡。

## 未来工作

- 受 MoonRay 启发的稀疏/压缩深度存储，是一个潜在的未来优化方向。
- 元数据重建，为下游合成提供更完整的元数据信息。

## 另请参阅

- [Pass 与 AOV 系统 (API)](/zh/industrial-cg-platform/api/pass-system) — 深度 Pass 的内部注册方式。
- [Blender 手册：输出属性](https://docs.blender.org/manual/en/latest/render/output/properties/output.html) — 标准 Blender 输出设置。
