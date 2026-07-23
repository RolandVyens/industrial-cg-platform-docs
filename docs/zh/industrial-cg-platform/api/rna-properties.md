---
title: "RNA 属性"
description: "本页记录了 Industrial CG Platform 添加到 Blender 数据模型中的新 RNA 属性。"
---
# RNA 属性

本页记录了 Industrial CG Platform 添加到 Blender 数据模型中的新 RNA 属性。

## ViewLayer 属性

### `ViewLayer.use_deep`

| 属性 | 值 |
| --- | --- |
| **类型** | `BoolProperty` |
| **默认值** | `False` |
| **描述** | 为此 ViewLayer 启用 Deep EXR 输出 |
| **UI 位置** | 属性 > 视图层 > Passes |

```python
# Python 访问示例
view_layer = bpy.context.view_layer
view_layer.use_deep = True
```

### `ViewLayer.use_lightgroup_light_pass_aovs`

| 属性 | 值 |
| --- | --- |
| **类型** | `BoolProperty` |
| **默认值** | `False` |
| **描述** | 启用逐灯光组分量通道（Lobe Pass）输出 |
| **UI 位置** | 属性 > 视图层 > Passes > 灯光 |

```python
view_layer.use_lightgroup_light_pass_aovs = True
```

### 逐分量 AOV 布尔值

每个分量通道均可以独立启用：

```python
view_layer.use_lightgroup_diffuse_direct = True
view_layer.use_lightgroup_diffuse_indirect = True
view_layer.use_lightgroup_glossy_direct = True
view_layer.use_lightgroup_glossy_indirect = True
view_layer.use_lightgroup_transmission_direct = True
view_layer.use_lightgroup_transmission_indirect = True
view_layer.use_lightgroup_volume_direct = True
view_layer.use_lightgroup_volume_indirect = True
```

## 灯光属性

### `Light.shadow_color`

| 属性 | 值 |
| --- | --- |
| **类型** | `FloatVectorProperty` (RGB) |
| **默认值** | `(0.0, 0.0, 0.0)` — 无阴影色调 |
| **子类型** | `COLOR` |
| **最小值/最大值** | 每个通道 `0.0` / `1.0` |
| **描述** | 应用于此灯光阴影区域的颜色色调 |
| **UI 位置** | 属性 > 物体数据 > 灯光 |

```python
light = bpy.data.lights['Key']
light.shadow_color = (0.1, 0.05, 0.2)  # 微弱的紫色阴影色调
```

## 世界属性

### `World.shadow_color`

| 属性 | 值 |
| --- | --- |
| **类型** | `FloatVectorProperty` (RGB) |
| **默认值** | `(0.0, 0.0, 0.0)` — 无阴影色调 |
| **子类型** | `COLOR` |
| **最小值/最大值** | 每个通道 `0.0` / `1.0` |
| **描述** | 应用于世界光照阴影区域的颜色色调 |
| **UI 位置** | 属性 > 世界 |

```python
world = bpy.data.worlds['World']
world.shadow_color = (0.05, 0.08, 0.15)  # 冷蓝色调的世界阴影
```

## Blender 核心扩展

### `PROP_SEARCH_KEEP_ORDER`

| 属性 | 值 |
| --- | --- |
| **类型** | `PropertyRNA` 上的 RNA 标志（Flag） |
| **所在位置** | `source/blender/makesrna/RNA_types.hh` |
| **设计目的** | 在 RNA 集合的 `template_search` 搜索中跳过字母顺序的强制重排 |

该标志应用于 `Scene.view_layers`，以便原生的 ViewLayer 选择器能够尊重真实的 RNA 顺序（如 ViewLayer 管理器排序控件所调整的顺序），而不是按字母顺序强行排序。

```cpp
// source/blender/makesrna/intern/rna_scene.cc
RNA_def_property_flag(prop, PROP_SEARCH_KEEP_ORDER);
```

## Cycles 溢画幅属性

以下属性配置了 Cycles 引擎设置下的 EXR Overscan（溢画幅）设置（可通过 `Scene.cycles` 访问）。

### `CyclesRenderSettings.overscan_mode`

| 属性 | 值 |
| --- | --- |
| **类型** | `Enum` (`'PERCENTAGE'`, `'PIXELS'`) |
| **默认值** | `'PERCENTAGE'` |
| **描述** | 溢画幅计算方式（百分比扩展或边缘像素扩展） |
| **UI 位置** | 属性 > 输出 > Overscan |

### `CyclesRenderSettings.overscan_size`

| 属性 | 值 |
| --- | --- |
| **类型** | `FloatProperty` |
| **默认值** | `0.0` (范围: `0.0` 到 `100.0`) |
| **描述** | 所有边界统一扩展的百分比大小（百分比模式下） |
| **UI 位置** | 属性 > 输出 > Overscan > Size |

### 边缘扩展属性 (Pixels 模式)

当 `overscan_mode` 设置为 `'PIXELS'` 时，以下属性用于分别指定具体边缘的像素扩展填充值：
- `CyclesRenderSettings.overscan_left` (整型，默认值 `0`)
- `CyclesRenderSettings.overscan_right` (整型，默认值 `0`)
- `CyclesRenderSettings.overscan_bottom` (整型，默认值 `0`)
- `CyclesRenderSettings.overscan_top` (整型，默认值 `0`)

```python
# Python 访问示例
scene = bpy.context.scene
scene.cycles.overscan_mode = 'PERCENTAGE'
scene.cycles.overscan_size = 10.0
```

## 源文件

| 文件 | 用途 |
| --- | --- |
| `source/blender/makesrna/intern/rna_scene.cc` | 注册 ViewLayer 分量 AOV 属性及 `PROP_SEARCH_KEEP_ORDER` 标志 |
| `source/blender/makesrna/RNA_types.hh` | `PROP_SEARCH_KEEP_ORDER` 标志定义 |
| `source/blender/editors/interface/interface_utils.cc` | 当设置了 `PROP_SEARCH_KEEP_ORDER` 时跳过字母排序逻辑 |
| `intern/cycles/blender/addon/properties.py` | 声明 Cycles 溢画幅属性 |
| `scripts/startup/bl_ui/properties_output.py` | 溢画幅输出面板的 UI 布局 |

