---
title: How to Render Native Deep EXR in Blender Cycles for Nuke
head:
  - - meta
    - name: description
      content: "Learn how to output native Deep EXR from Blender Cycles for lossless deep compositing in Nuke, and how it differs from standard Z-Depth."
description: "Deep EXR is a rendering output format that stores per-sample depth information alongside color data. Unlike standard 'flat' EXR files that only store ..."
cover: "/features/deep-exr.webp"
---
# Deep EXR Output

<Badge type="tip" text="Shipped" />

## What Is It

Deep EXR is a rendering output format that stores per-sample depth information alongside color data. Unlike standard "flat" EXR files that only store the closest visible surface, Deep EXR preserves every depth sample that contributes to the final pixel. This enables **lossless deep compositing** in tools like Nuke, where CG layers can be merged based on their actual depth rather than simple over operations.

Industrial CG Platform adds native Deep EXR output support to Blender Cycles, making it possible to write deep compositing data directly from Blender without external conversion tools.

## Why Use It

- **Lossless deep merge** — Combine multiple CG render layers in Nuke using `DeepMerge` without edge artifacts or manual holdout mattes.
- **Per-sample depth** — Each pixel carries full depth information, allowing downstream compositors to slice, resample, and relight at arbitrary depth ranges.
- **Volume support** — Volume rendering data is included in the deep output with the current shipped behavior.
- **Direct scene output and compositor** — Works both as direct render output and through the Blender compositor.

## Choose an Output Path

Deep EXR is enabled automatically when either the scene output or a compositor File Output node uses the `Deep EXR` format. There is no separate Deep Output switch to enable.

### Option A: Scene Output

Use this path when the render should write one Deep EXR directly from the scene output settings.

1. Open **Output Properties > Output**.
2. Set **File Format** to `Deep EXR`.
3. Configure the color channels, color depth, codec, and merge tolerances in the same panel.
4. Set the output path and render normally.

<figure class="doc-screenshot doc-screenshot--compact">
<a href="/screenshots/deep-exr/output-format-menu.png" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/output-format-menu.png" alt="Blender Output Properties file format menu with Deep EXR selected" loading="lazy"></a>
<figcaption>Select Deep EXR from the File Format menu in Output Properties. Click the image to view it at full size.</figcaption>
</figure>

<figure class="doc-screenshot">
<a href="/screenshots/deep-exr/output-format-settings.png" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/output-format-settings.png" alt="Deep EXR output settings showing color channels, bit depth, codec, and merge tolerances" loading="lazy"></a>
<figcaption>All controls shown here belong to the scene Output panel. The displayed values are an example configuration.</figcaption>
</figure>

#### Output Panel Controls

| Control | What it changes | Beginner guidance |
| --- | --- | --- |
| **File Format** | Selects native Deep EXR output and enables Deep rendering automatically. | Choose `Deep EXR`. |
| **Color** | Selects which color channels are stored. It does not change `Z` or `ZBack`. | Use `RGBA` when transparency is required; otherwise `RGB` is sufficient. |
| **Color Depth** | Controls RGBA storage only. `16-bit` uses half-float; `32-bit` uses full-float. `Z` and `ZBack` always remain 32-bit float. | Use 16-bit for smaller output or 32-bit for greater color and alpha precision. |
| **Codec** | Compresses the Deep EXR file. Deep EXR supports None, RLE, and ZIPS. | `ZIPS` is the general lossless choice. |
| **Deep Merge Tolerance** | Depth-distance threshold for merging nearby Deep samples. | Default `0.010`. Smaller values preserve more separate depth samples. |
| **Alpha Merge Tolerance** | Alpha-difference threshold used together with the depth tolerance. | Default `0.010`. Smaller values preserve more opacity detail. |

Samples merge only when both tolerance tests pass. Color Depth does not change their count or depth position; it only changes RGBA storage precision.

### Option B: Compositor File Output

Use this path when the compositor must control the file path, naming, or image sockets.

1. Add a **File Output** node in the compositor.
2. In **Node Format**, select `Image`, then set **File Format** to `Deep EXR`.
3. Configure the node's color depth, codec, and merge tolerances.
4. Add the required image sockets, connect the render data, and set the output paths.

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/screenshots/deep-exr/compositor-file-output.png" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/compositor-file-output.png" alt="Blender compositor File Output node configured to write Deep EXR" loading="lazy"></a>
<figcaption>The compositor File Output node has its own Node Format, Images, and Output Paths panels.</figcaption>
</figure>

#### File Output Node Panels

- **Node Format** — Contains the node-specific Deep EXR format, color depth, codec, and merge tolerances.
- **Images** — Defines the image sockets written by this node.
- **Output Paths** — Controls the destination and naming for the node output.

The File Output node stores its own format settings. Changing the scene Output panel does not configure this node.

## Render Memory Settings

These controls are separate from both output-format locations. Open **Render Properties > Performance > Memory** while using Cycles.

| Control | What it changes | Default |
| --- | --- | --- |
| **Tile Size** | Sets the requested render tile dimension for high-resolution rendering. | 2048 px |
| **Deep Tile Budget** | Limits Deep tile-buffer memory per rendering device. Cycles reduces the effective tile size when necessary to stay within this budget. Set `0` to disable the limit. | 1024 MB |

Deep Tile Budget is a memory limit, not a Deep quality setting. It does not directly reduce depth precision or merge samples.

<figure class="doc-screenshot doc-screenshot--compact">
<a href="/screenshots/deep-exr/deep-tile-budget.png" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/deep-tile-budget.png" alt="Blender Cycles Memory panel showing Tile Size and Deep Tile Budget controls" loading="lazy"></a>
<figcaption>These controls belong to Render Properties > Performance > Memory. The values shown are examples, not defaults.</figcaption>
</figure>

## Nuke Workflow

1. Render your scene layers with Deep EXR output enabled.
2. Import the `.exr` files into Nuke using `DeepRead` nodes.
3. Use `DeepMerge` to composite layers based on depth.
4. Use `DeepToImage` to flatten the deep data back to a standard image.

::: tip
For best results, render each major CG element (characters, environments, effects) as separate Deep EXR layers and merge them in Nuke.
:::

## Known Limitations

- **Metadata reconstruction** — Full deep metadata reconstruction is future work, not part of the current baseline.
- **Memory usage** — Deep output stores significantly more data than flat EXR. Use the Deep Tile Budget parameter to control the tradeoff.

## Future Work

- Sparse/compressed deep storage inspired by MoonRay is a potential future optimization.
- Metadata reconstruction for more complete downstream compositing metadata.

## See Also

- [Pass & AOV System (API)](/en/industrial-cg-platform/api/pass-system) — How deep passes are registered internally.
- [Blender Manual: Output Properties](https://docs.blender.org/manual/en/latest/render/output/properties/output.html) — Standard Blender output settings.
