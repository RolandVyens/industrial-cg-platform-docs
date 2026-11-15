---
title: "Auto Light Shuffle — Nuke Blender Light AOV Reconstructor"
description: "Automatic Blender light AOV shuffling and layered merging for Foundry Nuke. Supports direct/indirect lobe passes, lobe-only passes, and Combined fallbacks."
cover: "/features/lightgroups.webp"
---
# Auto Light Shuffle

**Auto Light Shuffle** builds a clean Foundry Nuke node graph from Blender light-group AOVs stored in a multilayer EXR. It detects the available passes from a selected `Read` node, creates the required `Shuffle` nodes, reconstructs each light with a balanced layered `Merge` tree, and combines all lights into a final Beauty output.

---

## Key Features

- **Automatic Light-Group Detection:** Detects light groups directly from the selected `Read` node.
- **Finest-Granularity Priority:** Prefers the finest available AOV representation for each light:
  1. Direct and indirect material lobe passes (`<lobe>_direct_<light>`, `<lobe>_indirect_<light>`);
  2. Material-lobe passes (`<lobe>_<light>`, `RGBA_<lobe>_<light>`);
  3. Combined fallback passes (`Combined_<light>`, `RGBA_<light>`).
- **Balanced Layered Merge Trees:** Builds a balanced, multi-level `Merge` tree inside each light group and combines all light groups through a readable Beauty merge chain.
- **Clean Organization & Backdrops:** Sorts light groups by AOV granularity then alphabetically, and wraps each light group in a labelled grey `Backdrop`.
- **Alpha Preservation:** Preserves the original alpha channel through `Copy` and `Premult` nodes.
- **Nuke Version Compatibility:** Uses `Shuffle2` and `Merge2` when available, with legacy-node fallbacks, and aligns nodes using real GUI dimensions reported by Nuke.

---

## Supported AOV Names

| Format | Example | Priority |
| --- | --- | --- |
| `<lobe>_direct_<light>` | `diffuse_direct_key` | Highest |
| `<lobe>_indirect_<light>` | `glossy_indirect_fill` | Highest |
| `<lobe>_<light>` | `transmission_rim` | Medium |
| `RGBA_<lobe>_<light>` | `RGBA_specular_rim` | Medium (legacy) |
| `Combined_<light>` | `Combined_key` | Fallback |
| `RGBA_<light>` | `RGBA_emissive` | Fallback |

Supported lobes include `diffuse`, `glossy`, `specular`, `transmission`, and `volume`.

---

## Requirements

- Foundry Nuke with Python support (tested with Nuke 13 and 14).
- A Blender-rendered multilayer EXR containing light-group AOVs (from [Lightgroup Lobe Passes](/en/industrial-cg-platform/features/lightgroup-lobe-passes) or [Industrial Light AOV Splitter](/en/industrial-light-aov-splitter/)).

---

## Installation

1. Copy these files from the [GitHub repository](https://github.com/RolandVyens/auto-light-shuffle) into the `python` directory inside your Nuke user folder:

   ```text
   nuke_blender_autoaov.py
   settings_default.py
   ```

   Typical locations:

   ```text
   Windows: %USERPROFILE%\.nuke\python
   macOS:   ~/.nuke/python
   Linux:   ~/.nuke/python
   ```

2. Add the `python` directory in `~/.nuke/init.py`:

   ```python
   import nuke

   nuke.pluginAddPath("./python")
   ```

3. Add a menu command in `~/.nuke/menu.py`:

   ```python
   import nuke_blender_autoaov

   industrial_menu = nuke.menu("Nuke").addMenu("Industrial")
   industrial_menu.addCommand(
       "Auto Light Shuffle",
       "nuke_blender_autoaov.shuffle_and_combine_light_groups()",
   )
   ```

4. Restart Nuke.

---

## Usage

1. Create or select the `Read` node containing the Blender multilayer EXR (only one source node should be selected).
2. Run **Industrial > Auto Light Shuffle** from the top menu bar.
3. The script generates the `Unpremult`, `Dot` rail, `Shuffle`, `Merge`, `Backdrop`, `Copy`, and `Premult` nodes.

### Generated Layout

```text
Read
 |
 +-- original alpha branch --------------------------------------+
 |                                                               |
 Unpremult                                                       |
 |                                                               |
 input Dot rail                                                  |
 |                                                               |
 Shuffle nodes grouped by light                                  |
 |                                                               |
 balanced Merge trees inside labelled Backdrops                  |
 |                                                               |
 Beauty Merge chain                                              |
 |                                                               |
 Copy <----------------------------------------------------------+
 |
 Premult
```

The final Beauty merge chain is placed outside the per-light `Backdrop`s for clarity.

---

## Configuration

Defaults live in `settings_default.py`. You can also pass a complete override dictionary when calling the function:

```python
import nuke_blender_autoaov

nuke_blender_autoaov.shuffle_and_combine_light_groups(
    {
        "selection_groups": [
            ["diffuse", "glossy", "specular", "transmission", "volume"],
            ["Combined"],
        ],
        "node_spacing": {"x": 180, "y": 320},
        "debug": True,
    }
)
```

Default layout values:
- Horizontal spacing: `150`
- Vertical spacing: `280`
- Grey `Backdrop` nodes with 64-point labels

---

## Repository & Related Docs

- **GitHub Repository:** [RolandVyens/auto-light-shuffle](https://github.com/RolandVyens/auto-light-shuffle)
- **Report Issues:** [GitHub Issues](https://github.com/RolandVyens/auto-light-shuffle/issues)
- [Lightgroup Lobe Passes](/en/industrial-cg-platform/features/lightgroup-lobe-passes) — Native Cycles per-lightgroup direct/indirect lobe passes.
- [Industrial Light AOV Splitter](/en/industrial-light-aov-splitter/) — Blender add-on for splitting light groups into component AOVs.
- [Industrial AOV Connector](/en/industrial-aov-connector/) — Automated Blender EXR output tree builder.
