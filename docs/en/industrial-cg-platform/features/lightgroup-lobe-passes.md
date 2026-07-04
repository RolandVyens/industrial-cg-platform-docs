# Lightgroup Lobe Passes

<Badge type="tip" text="Shipped" />

## What Is It

Lightgroup Lobe Passes extend Blender Cycles' light pass system by breaking down each **lightgroup** into its individual lighting components (lobes). Instead of getting only a combined lightgroup pass, you can now output separate **diffuse**, **glossy**, **transmission**, and **volume** passes for each lightgroup, with further **direct** and **indirect** separation.

This gives lighting artists and compositors the same level of control per lightgroup that Blender already provides at the global level 鈥?but isolated to each lighting setup.

## Why Use It

- **Fine-grained relighting** 鈥?Adjust individual light contributions by their component type in comp, not just by overall intensity.
- **Per-lightgroup breakdown** 鈥?See exactly how each lightgroup contributes to diffuse, glossy, transmission, and volume independently.
- **Aggregate balance** 鈥?The sum of all per-lightgroup lobe passes reconstructs back to the combined beauty pass, enabling reliable round-trip compositing.
- **Production-proven** 鈥?Validated on real production scenes with area, point, spot, and sun light types.

## How To Enable

1. Open **Properties > View Layer Properties > Passes > Light**.
2. Create your lightgroups as normal.
3. Check **Light Pass AOVs** to enable per-lightgroup lobe pass output.
4. Select which lobe components you want:
   - **Diffuse** (Direct / Indirect)
   - **Glossy** (Direct / Indirect)
   - **Transmission** (Direct / Indirect)
   - **Volume** (Direct / Indirect)

## Output Naming Convention

Each lightgroup lobe pass is named following this pattern:

```
<Lobe>_<Direct|Indirect>_<LightgroupName>
```

For example, with a lightgroup named `key`:

| Pass Name | Content |
| --- | --- |
| `Combined_key` | Combined lightgroup pass |
| `Diffuse_Direct_key` | Direct diffuse from `key` lights |
| `Diffuse_Indirect_key` | Indirect diffuse from `key` lights |
| `Glossy_Direct_key` | Direct glossy from `key` lights |
| `Glossy_Indirect_key` | Indirect glossy from `key` lights |
| `Transmission_Direct_key` | Direct transmission from `key` lights |
| `Transmission_Indirect_key` | Indirect transmission from `key` lights |
| `Volume_Direct_key` | Direct volume from `key` lights |
| `Volume_Indirect_key` | Indirect volume from `key` lights |

## Aggregate Balance

The lobe passes are designed so that:

```
Combined_<lg> 鈮?危 (Lobe_Direct_<lg> + Lobe_Indirect_<lg>)
```

for each lightgroup. This means:

- **Emissive mesh lightgroups** are combined-only by design (no lobe split).
- **Finite lights** (area, point, spot, sun) fully reconstruct through their lobe passes.
- **World/environment lightgroups** correctly write lobe passes even when `Background pass` and `Emission pass` are disabled in the view layer.

## Compositor & Nuke Workflow

### In Blender Compositor

1. Connect a **Render Layers** node.
2. Each lightgroup lobe pass appears as a separate output socket.
3. Use standard compositor nodes to adjust individual lobe contributions.

### In Nuke

1. Import the multilayer EXR using a `Read` node.
2. Each lightgroup lobe pass appears as a separate layer/channel in the EXR.
3. Use `Shuffle` nodes to isolate and grade individual lobe contributions.
4. Sum them back together for the final relit beauty.

::: tip
A useful compositing check: the sum of all lightgroup lobe passes (plus emissive `Combined_<lg>` passes) should closely match the overall `rgba` beauty pass.
:::

## Known Limitations

- **Emissive meshes** 鈥?Emissive mesh lightgroups remain combined-only and do not split into direct/indirect lobes. This is by design.
- **Full arbitrary LPE** 鈥?Full Light Path Expression syntax is future work. The current system provides the most commonly needed lobe breakdown.

## See Also

- [Pass & AOV System (API)](/en/industrial-cg-platform/api/pass-system) 鈥?Internal pass registration and readback architecture.
- [Cycles Kernel Extensions (API)](/en/industrial-cg-platform/api/cycles-kernel) 鈥?Kernel-level lightgroup split index data.
- [Blender Manual: Light Groups](https://docs.blender.org/manual/en/latest/render/layers/passes.html) 鈥?Standard Blender light group documentation.
