---
title: "Pass & AOV System"
description: "This page documents how Industrial CG Platform extends Blender's render pass and AOV system."
---
# Pass & AOV System

This page documents how Industrial CG Platform extends Blender's render pass and AOV system.

## New Pass Types

### Deep EXR Passes

| Pass Type | Internal Name | Description |
| --- | --- | --- |
| `PASS_DEEP_COMBINED` | `Deep Combined` | Per-sample RGBA with depth for deep compositing |
| `PASS_DEEP_POSITION` | `Deep Position` | Per-sample world-space position data |

### Fog Pass (Pending)

| Pass Type | Internal Name | Description |
| --- | --- | --- |
| `PASS_FOG` | `Fog` | Environment fog contribution pass |

::: warning
The Fog pass is part of the Environment Fog feature which is not yet shipped.
:::

## Lightgroup Lobe Pass Registration

When `use_lightgroup_light_pass_aovs` is enabled on a ViewLayer, the system registers additional per-lightgroup passes at render setup time.

### Registration Flow

```
Scene sync → Film setup → For each lightgroup:
  → If split passes enabled:
    → Register Combined_<lg>
    → Register Diffuse_Direct_<lg> (if enabled)
    → Register Diffuse_Indirect_<lg> (if enabled)
    → Register Glossy_Direct_<lg> (if enabled)
    → ... (all enabled lobe combinations)
```

### Pass Naming Convention

```
<Lobe>_<Direction>_<LightgroupName>
```

Where:
- **Lobe**: `Diffuse`, `Glossy`, `Transmission`, `Volume`
- **Direction**: `Direct`, `Indirect`
- **LightgroupName**: The user-defined lightgroup name

The `Combined_<lg>` pass is always present for each lightgroup.

### Film Offset Mapping

Each registered pass receives a unique offset in the Cycles film buffer. The lightgroup split index array maps:

```
lightgroup_split_index[lightgroup_id * num_split_types + split_type_index] = film_offset
```

This is accessed in the kernel via `kernel_data_fetch(lightgroup_split_index, index)`.

## Pass Readback

### Identity Preservation

A key correctness fix ensures that per-lightgroup split passes are read back through their actual `PassType` identity, not through the first matching generic pass type. This prevents:

- Direct-only passes appearing empty when indirect-only passes exist.
- Pass content aliasing between different lightgroup lobe combinations.

The fix lives in:
```
intern/cycles/integrator/path_trace_tile.h
```

### Compositor Integration

Lightgroup lobe passes are exposed as standard Blender render passes and appear in:
- The Blender compositor as Render Layers node outputs.
- The Image Editor's pass selector.
- OpenEXR multilayer output as named layers.

## Deep EXR Output Format

When Deep EXR output is enabled:

1. The render pipeline stores per-sample depth data alongside color data.
2. At output time, the OpenEXR deep image API is used to write the deep file.
3. The deep format is compatible with standard deep compositing tools (Nuke `DeepRead`, etc.).

### Deep Tile Budget

The `deep_tile_budget` parameter controls how many samples per pixel can be stored during tile rendering. Higher values preserve more depth detail but use more memory.

## Source Files

| File | Purpose |
| --- | --- |
| `intern/cycles/scene/film.cpp` | Pass registration and film setup |
| `intern/cycles/integrator/path_trace_tile.h` | Pass readback with identity preservation |
| `intern/cycles/blender/addon/properties.py` | Cycles addon pass property definitions |
| `source/blender/render/intern/pipeline.cc` | Blender render pipeline pass integration |
| `source/blender/makesrna/intern/rna_scene.cc` | RNA pass property definitions |
| `intern/cycles/kernel/types.h` | Kernel pass type enumerations |
