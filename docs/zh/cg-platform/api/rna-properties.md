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

## 源文件

| 文件 | 用途 |
| --- | --- |
| `source/blender/makesrna/intern/rna_scene.cc` | 注册 ViewLayer 分量 AOV 属性及 `PROP_SEARCH_KEEP_ORDER` 标志 |
| `source/blender/makesrna/RNA_types.hh` | `PROP_SEARCH_KEEP_ORDER` 标志定义 |
| `source/blender/editors/interface/interface_utils.cc` | 当设置了 `PROP_SEARCH_KEEP_ORDER` 时跳过字母排序逻辑 |
