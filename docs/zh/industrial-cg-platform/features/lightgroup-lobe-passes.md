---
title: Blender Cycles 渲染：针对每个灯光组输出独立的直接与间接光照通道
head:
  - - meta
    - name: description
      content: "学习如何在 Blender Cycles 中将单个灯光组拆分为漫反射、高光、透射和体积等分量通道，为 Nuke 精细重打光提供可能。"
description: "灯光组分量通道（Lightgroup Lobe Passes）扩展了 Blender Cycles 的灯光通道系统，通过将每个灯光组 (lightgroup) 分解为其独立的照明分量（即 Lobes）。您现在可以为每个灯光组输出单独的漫反射 (diffuse)、光泽 (glossy)、透射 (tra..."
---
# 灯光组分量通道

<Badge type="tip" text="已发布" />

## 什么是灯光组分量通道？

灯光组分量通道（Lightgroup Lobe Passes）扩展了 Blender Cycles 的灯光通道系统，通过将每个**灯光组 (lightgroup)** 分解为其独立的照明分量（即 Lobes）。您现在可以为每个灯光组输出单独的**漫反射 (diffuse)**、**光泽 (glossy)**、**透射 (transmission)** 和**体积 (volume)** 通道，并进一步分离**直接光 (direct)** 和**间接光 (indirect)**，而不是仅仅获得一个合并的灯光组通道。

这使得灯光艺术家和合成师在单独的灯光设置上能够拥有与 Blender 全局通道同等水平的控制力。

## 为什么使用它？

- **精细重打光** — 在合成中按分量类型调整各个灯光组的照明贡献，而不仅仅是整体强度。
- **逐灯光组分解** — 独立地精确查看每个灯光组如何对漫反射、光泽、透射和体积做出贡献。
- **聚合平衡** — 所有逐灯光组分量通道的总和可完美还原重建回合并的 Beauty 通道，实现高度可靠的合成往返。
- **生产验证** — 已在真实生产场景中，对区域光 (Area)、点光 (Point)、聚光灯 (Spot) 和日光 (Sun) 等灯光类型进行了全面验证。

## 如何启用？

1. 打开 **属性面板 > 视图层属性 > 通道 > 灯光 (Properties > View Layer Properties > Passes > Light)**。
2. 像往常一样创建您的灯光组。
3. 勾选 **Light Pass AOVs** 启用逐灯光组分量通道输出。
4. 选择您需要的分量组件 (Lobes)：
   - **Diffuse** 漫反射 (Direct 直接 / Indirect 间接)
   - **Glossy** 光泽 (Direct 直接 / Indirect 间接)
   - **Transmission** 透射 (Direct 直接 / Indirect 间接)
   - **Volume** 体积 (Direct 直接 / Indirect 间接)

## 输出命名规则

每个灯光组分量通道遵循以下命名模式：

```
<Lobe>_<Direct|Indirect>_<LightgroupName>
```

例如，当灯光组名为 `key` 时：

| 通道名称 | 内容 |
| --- | --- |
| `Combined_key` | 合并灯光组通道 |
| `Diffuse_Direct_key` | 来自 `key` 灯光的直接漫反射 |
| `Diffuse_Indirect_key` | 来自 `key` 灯光的间接漫反射 |
| `Glossy_Direct_key` | 来自 `key` 灯光的直接光泽 |
| `Glossy_Indirect_key` | 来自 `key` 灯光的间接光泽 |
| `Transmission_Direct_key` | 来自 `key` 灯光的直接透射 |
| `Transmission_Indirect_key` | 来自 `key` 灯光的间接透射 |
| `Volume_Direct_key` | 来自 `key` 灯光的直接体积 |
| `Volume_Indirect_key` | 来自 `key` 灯光的间接体积 |

## 聚合平衡 (Aggregate Balance)

分量通道的设计确保：

```
Combined_<lg> ≈ Σ (Lobe_Direct_<lg> + Lobe_Indirect_<lg>)
```

对于每个灯光组，这意味着：

- **自发光网格灯光组 (Emissive mesh lightgroups)** 在设计上为仅合并模式（不进行分量拆分）。
- **有限光源 (Finite lights)**（区域光、点光、聚光灯、日光）可通过其分量通道完全重建。
- **世界/环境灯光组 (World/environment lightgroups)** 即使在视图层中禁用了 `Background pass` 和 `Emission pass`，也能正确写入分量通道。

## 合成器与 Nuke 工作流程

### 在 Blender 合成器中

1. 连接一个 **渲染图层 (Render Layers)** 节点。
2. 每个灯光组分量通道都会显示为一个单独的输出插槽。
3. 使用标准合成节点来微调和调整各个分量的照明贡献。

### 在 Nuke 中

1. 使用 `Read` 节点导入多通道 EXR。
2. 每个灯光组分量通道在 EXR 中显示为一个单独的图层/通道。
3. 使用 `Shuffle` 节点隔离并对各个分量贡献进行调色。
4. 将它们求和相加，即可得到最终重打光后的 Beauty 画面。

::: tip
一个实用的合成检查方法：所有灯光组分量通道（加上自发光 `Combined_<lg>` 通道）的总和应与整体的 `rgba` Beauty 通道几乎完全一致。
:::

## 已知限制

- **自发光网格** — 自发光网格灯光组保持仅合并模式，不拆分为直接/间接分量。这是设计使然。
- **任意 LPE 语法** — 完整的任意光通路表达式 (Light Path Expression, LPE) 语法支持属于未来的工作。当前的系统提供了生产中最常用和最需要的分量拆分。

## 另请参阅

- [Pass 与 AOV 系统 (API)](/zh/industrial-cg-platform/api/pass-system) — 内部 Pass 注册和回读架构。
- [Cycles 内核扩展 (API)](/zh/industrial-cg-platform/api/cycles-kernel) — 内核级灯光组拆分索引数据。
- [Blender 手册：灯光组](https://docs.blender.org/manual/en/latest/render/layers/passes.html) — 标准 Blender 灯光组文档。
