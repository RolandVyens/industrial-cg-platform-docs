# Cycles Kernel Extensions

This page documents the C++ kernel-level additions that Industrial CG Platform makes to the Cycles rendering engine.

## Deep EXR Kernel Extensions

### Pass Types

```cpp
// intern/cycles/kernel/types.h
PASS_DEEP_COMBINED   // Deep combined RGBA pass
PASS_DEEP_POSITION   // Deep per-sample position data
```

These pass types are registered in the Cycles film and enable per-sample depth data output in the rendering pipeline.

### KernelFilm Fields

```cpp
// intern/cycles/kernel/types.h (KernelFilm struct)
int pass_deep_combined;     // Film offset for deep combined pass
int pass_deep_position;     // Film offset for deep position pass
int deep_tile_budget;       // Memory budget per tile for deep samples
```

### Deep Output Pipeline

The deep output pipeline extends the standard Cycles film write path:
1. During path tracing, each sample records its depth alongside color data.
2. The film accumulates deep samples per tile, controlled by `deep_tile_budget`.
3. At output time, deep data is written using the OpenEXR deep image API.

## Shadow Color Kernel Extensions

### KernelBackground Fields

```cpp
// intern/cycles/kernel/types.h (KernelBackground struct)
float3 shadow_color;        // World shadow color (RGB)
```

### KernelLight Fields

```cpp
// intern/cycles/kernel/types.h (KernelLight struct)
float3 shadow_color;        // Per-light shadow color (RGB)
```

The shadow color is applied in the shadow evaluation path of the integrator, tinting shadow contributions with the specified color.

## Lightgroup Lobe Passes

### Split Lobe Index System

```cpp
// intern/cycles/kernel/types.h
int lightgroup_split_index[];   // Per-lightgroup remap from split lobe to film offset
```

The lightgroup split index is a data array (accessed via `kernel_data_fetch`) that maps each lightgroup's split lobe pass to its film buffer offset. This replaces the earlier raw device pointer approach.

### Film Write Extensions

The following film write functions are extended to support per-lightgroup lobe output:

```cpp
// intern/cycles/kernel/film/write.h
film_write_lightgroup_split_pass()  // Write to a specific lightgroup lobe pass
```

### Environment Lightgroup Fix

A key correctness fix ensures that world/environment lightgroup lobe passes write correctly even when `Background pass` and `Emission pass` are disabled:

```cpp
// intern/cycles/kernel/integrator/shade_surface.h
// Uses explicit contribution kind instead of pass-offset comparison
// to avoid PASS_UNUSED aliasing when both passes are disabled
```

### Finite Light Lamp-Hit Fix

The ordinary lamp-hit path (`PRIMITIVE_LAMP` forward hit) now writes into lightgroup lobe passes for finite lights (area, point, spot, sun), while emissive mesh paths remain combined-only:

```cpp
// intern/cycles/kernel/integrator/shade_light.h
// Finite light forward-hit emission writes into existing lobe family
```

## Environment Fog (Pending)

::: warning
Environment Fog kernel extensions are currently in development and not yet shipped. This section will be populated when the feature is released.
:::

## Source Files

| File | Purpose |
| --- | --- |
| `intern/cycles/kernel/types.h` | Kernel data structures, pass enums, film fields |
| `intern/cycles/kernel/film/write.h` | Film write functions including split lightgroup passes |
| `intern/cycles/kernel/integrator/shade_surface.h` | Surface shading with env lightgroup fix |
| `intern/cycles/kernel/integrator/shade_light.h` | Light shading with lamp-hit lobe fix |
| `intern/cycles/kernel/integrator/path_trace_tile.h` | Tile-level pass readback with split pass identity |
| `intern/cycles/scene/film.cpp` | Film setup and pass registration |
| `intern/cycles/scene/light.cpp` | Light sync with shadow color |
| `intern/cycles/scene/background.cpp` | Background sync with shadow color |
