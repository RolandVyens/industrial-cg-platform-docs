---
title: "Pass 与 AOV 系统"
description: "本页记录了 Industrial CG Platform 如何扩展 Blender 的渲染通道（Render Pass）与 AOV 系统。"
---
# Pass 与 AOV 系统

本页记录了 Industrial CG Platform 如何扩展 Blender 的渲染通道（Render Pass）与 AOV 系统。

## 新通道类型

### Deep EXR 通道

| 通道类型 | 内部名称 | 描述 |
| --- | --- | --- |
| `PASS_DEEP_COMBINED` | `Deep Combined` | 用于 deep 合成的逐采样 RGBA 与深度数据 |
| `PASS_DEEP_POSITION` | `Deep Position` | 逐采样世界空间位置数据 |

### 雾通道（Environment Fog - 开发中）

| 通道类型 | 内部名称 | 描述 |
| --- | --- | --- |
| `PASS_FOG` | `Fog` | 环境雾贡献通道 |

::: warning
雾通道是环境雾（Environment Fog）特征的一部分，该特征目前尚未正式发布。
:::

## 灯光组分量通道注册

在视图层（ViewLayer）上启用 `use_lightgroup_light_pass_aovs` 时，系统会在渲染准备设置（Render Setup）阶段注册额外的逐灯光组通道。

### 注册流程

```
场景同步 Scene sync → Film 设置 Film setup → 对每一个灯光组进行遍历 For each lightgroup:
  → 如果启用了拆分分量通道 If split passes enabled:
    → 注册 Combined_<lg>
    → 注册 Diffuse_Direct_<lg> (如果启用)
    → 注册 Diffuse_Indirect_<lg> (如果启用)
    → 注册 Glossy_Direct_<lg> (如果启用)
    → ... (注册所有已启用的分量组合)
```

### 通道命名约定

```
<Lobe>_<Direction>_<LightgroupName>
```

其中：
- **Lobe（分量）**：`Diffuse`（漫反射）、`Glossy`（光泽）、`Transmission`（透射）、`Volume`（体积）
- **Direction（方向）**：`Direct`（直接）、`Indirect`（间接）
- **LightgroupName**：用户定义的灯光组名称

每个灯光组的 `Combined_<lg>` 通道将始终默认存在。

### Film 偏移量映射

每个注册的通道都会在 Cycles film 缓冲区中获得一个唯一的偏移量。灯光组拆分分量索引映射公式如下：

```
lightgroup_split_index[lightgroup_id * num_split_types + split_type_index] = film_offset
```

这可以在内核中通过 `kernel_data_fetch(lightgroup_split_index, index)` 来直接读取。

## 通道数据回读 (Pass Readback)

### 标识一致性保留 (Identity Preservation)

一项关键的正确性修正确保了逐灯光组的拆分分量通道能通过其真实的 `PassType` 标识来正确回读，而不是通过第一个匹配的通用通道类型回读。这可以有效防止：

- 存在间接光通道时，直接光通道异常显示为空白。
- 不同灯光组分量组合之间的通道内容发生别名/混淆冲突。

该修正位于：
```
intern/cycles/integrator/path_trace_tile.h
```

### 合成器集成 (Compositor Integration)

灯光组分量通道作为标准的 Blender 渲染通道向外暴露，并会呈现在以下位置：
- Blender 合成器（Compositor）中，表现为渲染层（Render Layers）节点的独立输出套接字（Socket）。
- 图像编辑器（Image Editor）的通道选择下拉菜单中。
- 多层 OpenEXR 输出中，保存为有明确命名的图像图层。

## Deep EXR 输出格式

启用 Deep EXR 输出时：

1. 渲染管线在存储颜色数据的同时，将逐采样的深度数据一并进行存储。
2. 在输出阶段，使用 OpenEXR 的 deep 图像 API 写入生成的 deep 文件。
3. 该 deep 格式与行业标准的 deep 合成工具完全兼容（如 Nuke 的 `DeepRead` 节点等）。

### Deep Tile 预算 (Deep Tile Budget)

`deep_tile_budget` 参数控制着在 tile 渲染期间每个像素可以存储的最大采样数。数值越高，保留的深度细节就越完美，但也会相应消耗更多内存。

## 源文件

| 文件 | 用途 |
| --- | --- |
| `intern/cycles/scene/film.cpp` | 通道注册与 film 设置逻辑 |
| `intern/cycles/integrator/path_trace_tile.h` | 带有标识一致性保留的通道数据回读逻辑 |
| `intern/cycles/blender/addon/properties.py` | Cycles 插件通道属性定义 |
| `source/blender/render/intern/pipeline.cc` | Blender 渲染管线通道集成逻辑 |
| `source/blender/makesrna/intern/rna_scene.cc` | RNA 通道属性定义 |
| `intern/cycles/kernel/types.h` | 内核通道类型枚举定义 |
