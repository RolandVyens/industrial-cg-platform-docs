---
title: "Getting Started"
cover: /splash.webp
description: "Get started with Industrial CG Platform, a VFX fork of stock Blender for studios, TDs, lighting artists, and compositors featuring native Cycles Deep EXR, EXR Overscan, Lightgroup Lobe Passes, Shadow Color, and ViewLayer Manager."
---
# Getting Started

![Industrial CG Platform Splash](/splash.webp)

## What Is Industrial CG Platform?

**Industrial CG Platform** is a Blender-derived production distribution focused on the parts of CG that usually decide whether a shot can survive a real VFX pipeline.

It is not a general Blender fork with random extras. It is a production-oriented Blender platform for VFX studios, artists, TDs, pipeline developers, and small teams who need VFX-style rendering behavior directly inside a Blender-based toolchain.

Industrial CG Platform is built on **stock Blender** and the branch is named `industrial-cg-platform`.

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

- **Full compatibility** — `.blend` files created in Industrial CG Platform are compatible with stock Blender. Custom features simply won't be available when opened in stock Blender.
- **Same executable names** — The executable is still called `blender.exe` and uses the same config directory structure.
- **Branch suffix** — The window title shows `Blender <version> Industrial CG Platform` to distinguish it from stock Blender.
- **Windows x64 stable + Linux Beta** — Current stable releases are Windows x64 ZIP packages. A public Linux Beta pre-release (Rocky Linux 8.10 / EL8 baseline) is available for testing and feedback.

For the full side-by-side feature table, fork rationale, and when to stay on stock Blender, see **[Industrial CG Platform vs Stock Blender](/en/vs-stock-blender/)**.

## Next Steps

- [Blender to Nuke Workflow](/en/blender-to-nuke-workflow/) — End-to-end production guide from Cycles Deep EXR, Overscan, and Lightgroup Lobes to Nuke compositing.
- [Blender VFX Pipeline](/en/blender-vfx-pipeline/) — Studio architecture, role evaluation, and pilot checklist for adopting Industrial CG Platform.
- [Installation](/en/industrial-cg-platform/guide/installation) — Download and set up the release.
- [Building from Source](/en/industrial-cg-platform/guide/building-from-source) — Build from the GitHub repository.
- [FAQ](/en/industrial-cg-platform/guide/faq) — Common questions and answers.
