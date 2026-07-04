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

## How To Enable

### Scene Output

1. Open **Properties > Output Properties > Output**.
2. Change the **File Format** to `Deep OpenEXR`.
3. Set the desired **Deep Tile Budget** (controls memory vs. quality tradeoff for deep data).
4. Render your scene normally.

### Compositor File Output

1. Add a **File Output** node in the compositor.
2. Set its format to `Deep OpenEXR`.
3. Connect your render layers.
4. The deep file output node works correctly when the compositor device is set to `GPU`.

::: info
Deep EXR File Output does not force the rest of the compositor off the GPU — it integrates seamlessly with GPU compositing.
:::

## Parameters

| Parameter | Description | Default |
| --- | --- | --- |
| **Deep Output** | Enable deep EXR output format | Off |
| **Deep Tile Budget** | Memory budget per tile for deep sample storage (higher = more samples preserved) | Automatic |

## Nuke Workflow

1. Render your scene layers with Deep EXR output enabled.
2. Import the `.exr` files into Nuke using `DeepRead` nodes.
3. Use `DeepMerge` to composite layers based on depth.
4. Use `DeepToImage` to flatten the deep data back to a standard image.

::: tip
For best results, render each major CG element (characters, environments, effects) as separate Deep EXR layers and merge them in Nuke.
:::

## Known Limitations

- **Volume deep behavior** — Current volume deep output is accepted as shipped. Memory-heavy volume scenes may produce large deep files.
- **Metadata reconstruction** — Full deep metadata reconstruction is future work, not part of the current baseline.
- **Memory usage** — Deep output stores significantly more data than flat EXR. Use the Deep Tile Budget parameter to control the tradeoff.

## Future Work

- Sparse/compressed deep storage inspired by MoonRay is a potential future optimization.
- Metadata reconstruction for more complete downstream compositing metadata.

## See Also

- [Pass & AOV System (API)](/en/industrial-cg-platform/api/pass-system) — How deep passes are registered internally.
- [Blender Manual: Output Properties](https://docs.blender.org/manual/en/latest/render/output/properties/output.html) — Standard Blender output settings.
