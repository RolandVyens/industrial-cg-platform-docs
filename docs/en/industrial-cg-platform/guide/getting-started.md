# Getting Started

![Industrial CG Platform Splash](/splash.png)

## What Is Industrial CG Platform?

**Industrial CG Platform** is a Blender-derived production distribution focused on the parts of CG that usually decide whether a shot can survive a real VFX pipeline.

It is not a general Blender fork with random extras. It is a production-oriented Blender platform for VFX studios, artists, TDs, pipeline developers, and small teams who need VFX-style rendering behavior directly inside a Blender-based toolchain.

The current version is based on **Blender 5.2** and the branch is named `industrial-cg-platform`.

## Who Is It For?

Industrial CG Platform is intended for:
- **VFX Studios** — that want to acquire Blender into their production pipeline.
- **Lighting Artists** — who need stronger pass control.
- **Compositors** — who need better render data from Blender.
- **TDs and Pipeline Developers** — evaluating Blender for shot-based work.
- **Small Studios** — building a Blender-centered VFX workflow.
- **Technical Artists** — who need source-level features rather than only add-ons.

## Key Features

| Feature | What It Does |
| --- | --- |
| [Deep EXR](/en/industrial-cg-platform/features/deep-exr) | Native deep compositing output for Cycles |
| [EXR Overscan](/en/industrial-cg-platform/features/exr-overscan) | Preserves displayWindow and expands dataWindow for downstream VFX padding |
| [Lightgroup Lobe Passes](/en/industrial-cg-platform/features/lightgroup-lobe-passes) | Per-lightgroup diffuse/glossy/transmission/volume split passes |
| [Shadow Color](/en/industrial-cg-platform/features/shadow-color) | Per-light and per-world artistic shadow tinting |
| [ViewLayer Manager](/en/industrial-cg-platform/features/viewlayer-manager) | Qt-based ViewLayer management tool with presets |

## How It Differs from Stock Blender

- **Full compatibility** — `.blend` files created in Industrial CG Platform are compatible with stock Blender 5.2. Custom features simply won't be available when opened in stock Blender.
- **Same executable names** — The executable is still called `blender.exe` and uses the same config directory structure.
- **Branch suffix** — The window title shows `Blender 5.2.0-2026-06-16 Industrial CG Platform` to distinguish it from stock Blender.
- **Windows only** — Current releases are Windows x64 ZIP packages only. Linux support is planned for the future.

## Next Steps

- [Installation](/en/industrial-cg-platform/guide/installation) — Download and set up the release.
- [Building from Source](/en/industrial-cg-platform/guide/building-from-source) — Build from the GitHub repository.
- [FAQ](/en/industrial-cg-platform/guide/faq) — Common questions and answers.
