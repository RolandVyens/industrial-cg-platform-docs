# RNA Properties

This page documents the new RNA properties that Industrial CG Platform adds to Blender's data model.

## ViewLayer Properties

### `ViewLayer.use_deep`

| Property | Value |
| --- | --- |
| **Type** | `BoolProperty` |
| **Default** | `False` |
| **Description** | Enable Deep EXR output for this ViewLayer |
| **UI Location** | Properties > View Layer > Passes |

```python
# Python access
view_layer = bpy.context.view_layer
view_layer.use_deep = True
```

### `ViewLayer.use_lightgroup_light_pass_aovs`

| Property | Value |
| --- | --- |
| **Type** | `BoolProperty` |
| **Default** | `False` |
| **Description** | Enable per-lightgroup lobe pass output |
| **UI Location** | Properties > View Layer > Passes > Light |

```python
view_layer.use_lightgroup_light_pass_aovs = True
```

### Per-Lobe AOV Booleans

Each lobe component can be individually enabled:

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

## Light Properties

### `Light.shadow_color`

| Property | Value |
| --- | --- |
| **Type** | `FloatVectorProperty` (RGB) |
| **Default** | `(0.0, 0.0, 0.0)` 鈥?no shadow tint |
| **Subtype** | `COLOR` |
| **Min/Max** | `0.0` / `1.0` per channel |
| **Description** | Color tint applied to the shadow region of this light |
| **UI Location** | Properties > Object Data > Light |

```python
light = bpy.data.lights['Key']
light.shadow_color = (0.1, 0.05, 0.2)  # Subtle purple shadow tint
```

## World Properties

### `World.shadow_color`

| Property | Value |
| --- | --- |
| **Type** | `FloatVectorProperty` (RGB) |
| **Default** | `(0.0, 0.0, 0.0)` 鈥?no shadow tint |
| **Subtype** | `COLOR` |
| **Min/Max** | `0.0` / `1.0` per channel |
| **Description** | Color tint applied to the shadow region of the world lighting |
| **UI Location** | Properties > World |

```python
world = bpy.data.worlds['World']
world.shadow_color = (0.05, 0.08, 0.15)  # Cool blue world shadows
```

## Blender Core Extensions

### `PROP_SEARCH_KEEP_ORDER`

| Property | Value |
| --- | --- |
| **Type** | RNA flag on `PropertyRNA` |
| **Location** | `source/blender/makesrna/RNA_types.hh` |
| **Purpose** | Skip alphabetical re-sorting in `template_search` for RNA collections |

This flag is applied to `Scene.view_layers` so that the native ViewLayer selector respects the real RNA order (as set by the ViewLayer Manager's reorder controls) instead of alphabetically sorting entries.

```cpp
// source/blender/makesrna/intern/rna_scene.cc
RNA_def_property_flag(prop, PROP_SEARCH_KEEP_ORDER);
```

## Cycles Overscan Properties

The following properties configure the EXR Overscan settings under the Cycles engine settings (accessible via `Scene.cycles`).

### `CyclesRenderSettings.overscan_mode`

| Property | Value |
| --- | --- |
| **Type** | `Enum` (`'PERCENTAGE'`, `'PIXELS'`) |
| **Default** | `'PERCENTAGE'` |
| **Description** | Sizing mode for the overscan region |
| **UI Location** | Properties > Output > Overscan |

### `CyclesRenderSettings.overscan_size`

| Property | Value |
| --- | --- |
| **Type** | `FloatProperty` |
| **Default** | `0.0` (range: `0.0` to `100.0`) |
| **Description** | Sizing percentage for overscan on all sides (Percentage mode) |
| **UI Location** | Properties > Output > Overscan > Size |

### Margin Properties (Pixels Mode)

The following properties specify custom border margins in pixels when `overscan_mode` is set to `'PIXELS'`:
- `CyclesRenderSettings.overscan_left` (Int, default `0`)
- `CyclesRenderSettings.overscan_right` (Int, default `0`)
- `CyclesRenderSettings.overscan_bottom` (Int, default `0`)
- `CyclesRenderSettings.overscan_top` (Int, default `0`)

```python
# Python access
scene = bpy.context.scene
scene.cycles.overscan_mode = 'PERCENTAGE'
scene.cycles.overscan_size = 10.0
```

## Source Files

| File | Purpose |
| --- | --- |
| `source/blender/makesrna/intern/rna_scene.cc` | ViewLayer lobe AOV properties, `PROP_SEARCH_KEEP_ORDER` |
| `source/blender/makesrna/RNA_types.hh` | `PROP_SEARCH_KEEP_ORDER` flag definition |
| `source/blender/editors/interface/interface_utils.cc` | Skip alphabetical sort when `PROP_SEARCH_KEEP_ORDER` is set |
| `intern/cycles/blender/addon/properties.py` | Cycles overscan property declarations |
| `scripts/startup/bl_ui/properties_output.py` | UI layout for the Overscan output panel |

