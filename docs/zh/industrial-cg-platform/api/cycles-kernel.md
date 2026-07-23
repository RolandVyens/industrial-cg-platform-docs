---
title: "Cycles 内核扩展"
description: "本页记录了 Industrial CG Platform 对 Cycles 渲染引擎进行的 C++ 内核级添加。"
---
# Cycles 内核扩展

本页记录了 Industrial CG Platform 对 Cycles 渲染引擎进行的 C++ 内核级添加。

## Deep EXR 内核扩展

### 通道类型

```cpp
// intern/cycles/kernel/types.h
PASS_DEEP_COMBINED   // Deep 结合 RGBA 通道
PASS_DEEP_POSITION   // Deep 逐采样位置数据
```

这些通道类型在 Cycles film 中注册，并启用渲染管线中的逐采样深度数据输出。

### KernelFilm 字段

```cpp
// intern/cycles/kernel/types.h (KernelFilm 结构体)
int pass_deep_combined;     // Deep 结合通道的 film 偏移量
int pass_deep_position;     // Deep 位置通道的 film 偏移量
int deep_tile_budget;       // 逐 tile 存储 deep 采样的内存预算
```

### Deep 输出管线

Deep 输出管线扩展了标准的 Cycles film 写入路径：
1. 在路径追踪（Path Tracing）过程中，每个采样记录其颜色数据的同时记录其深度信息。
2. Film 负责按 tile 累积 deep 采样数据，累积深度受 `deep_tile_budget` 参数控制。
3. 在最终输出时，使用 OpenEXR 的 deep 图像 API 将 deep 数据写入文件。

## 阴影颜色内核扩展

### KernelBackground 字段

```cpp
// intern/cycles/kernel/types.h (KernelBackground 结构体)
float3 shadow_color;        // 世界阴影颜色 (RGB)
```

### KernelLight 字段

```cpp
// intern/cycles/kernel/types.h (KernelLight 结构体)
float3 shadow_color;        // 逐灯光阴影颜色 (RGB)
```

阴影颜色应用于积分器的阴影评估路径中，使用指定的颜色对阴影贡献进行着色。

## 灯光组分量通道 (Lightgroup Lobe Passes)

### 拆分分量索引系统

```cpp
// intern/cycles/kernel/types.h
int lightgroup_split_index[];   // 逐灯光组从拆分分量到 film 偏移量的重新映射
```

灯光组拆分索引是一个数据数组（通过 `kernel_data_fetch` 访问），将每个灯光组的拆分分量通道映射到其 film 缓冲区偏移量。这取代了此前使用的原生设备指针方案。

### Film 写入扩展

以下 film 写入函数已扩展，以支持逐灯光组的拆分分量通道输出：

```cpp
// intern/cycles/kernel/film/write.h
film_write_lightgroup_split_pass()  // 写入特定的灯光组分量通道
```

### 环境灯光组正确性修正 (Environment Lightgroup Fix)

一项关键的正确性修复确保了即使在视图层（View Layer）中禁用了 `Background pass`（背景通道）和 `Emission pass`（发射通道）时，世界/环境灯光组的分量通道也能正确写入：

```cpp
// intern/cycles/kernel/integrator/shade_surface.h
// 使用显式贡献类别（Contribution Kind）代替通道偏移量比较，
// 以避免在两个通道均被禁用时因 PASS_UNUSED 产生别名/混淆问题
```

### 属性灯光灯泡命中修正 (Finite Light Lamp-Hit Fix)

普通灯泡命中路径（`PRIMITIVE_LAMP` 前向碰撞命中）现在可为属性灯光（区域光、点光源、聚光灯、日光）正确写入灯光组分量通道，而发射网格（Emissive Mesh）路径则保持设计上的合并输出（Combined-Only）：

```cpp
// intern/cycles/kernel/integrator/shade_light.h
// 属性灯光前向命中发射写入现有的分量族中
```

## 环境雾 (Environment Fog - 开发中)

::: warning
环境雾（Environment Fog）内核扩展目前处于开发阶段，尚未正式发布。此特征发布后，本节内容将会予以填充。
:::

## 源文件

| 文件 | 用途 |
| --- | --- |
| `intern/cycles/kernel/types.h` | 内核数据结构、通道枚举值、film 字段定义 |
| `intern/cycles/kernel/film/write.h` | 包含拆分灯光组通道的 film 写入函数 |
| `intern/cycles/kernel/integrator/shade_surface.h` | 表面着色逻辑，包含环境灯光组修复 |
| `intern/cycles/kernel/integrator/shade_light.h` | 灯光着色逻辑，包含灯泡命中分量修复 |
| `intern/cycles/integrator/path_trace_tile.h` | 带有拆分通道标识的 tile 级通道数据回读 |
| `intern/cycles/scene/film.cpp` | Film 设置与通道注册逻辑 |
| `intern/cycles/scene/light.cpp` | 灯光阴影颜色同步 |
| `intern/cycles/scene/background.cpp` | 背景世界阴影颜色同步 |
