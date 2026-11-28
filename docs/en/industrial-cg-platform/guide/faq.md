---
title: "FAQ"
description: "Frequently asked questions for Industrial CG Platform covering stock Blender compatibility, .blend interoperability, OptiX/CPU support, ViewLayer Manager, Linux Beta status, and source builds."
---
# FAQ

## General

### Is this an official Blender release?

No. Industrial CG Platform is a community-maintained fork of Blender. It is not affiliated with or endorsed by the Blender Foundation. It is released under the Blender License (GNU GPL v3 or later, GPL-3.0-or-later), matching Blender.

### Are `.blend` files compatible with stock Blender?

Yes. Files created in Industrial CG Platform can be opened in stock Blender. Custom features (Deep EXR, lightgroup lobe passes, etc.) will simply not be available — the data is preserved but ignored. For a complete feature-by-feature comparison and boundaries, see [Industrial CG Platform vs Stock Blender](/en/vs-stock-blender/).

### How often do you merge upstream Blender changes?

The `vfx-rendering-branch` staging branch regularly intakes changes from Blender `origin/main`. Merges are validated before being synchronized into the `industrial-cg-platform` mainline.

### Can I use my existing Blender add-ons?

Most Blender add-ons that work with stock Blender should work with Industrial CG Platform. However, add-ons that depend on deprecated APIs (`bgl`, specific `bpy_types` internals) may log errors on startup — this matches stock Blender behavior.

## Rendering

### Which GPU backends are supported?

- **OptiX** — NVIDIA RTX GPUs (recommended for best performance)
- **CPU** — Always available as a fallback

### Do the custom features work on CPU?

Yes. Deep EXR, lightgroup lobe passes, and shadow color all work on CPU and OptiX backends.

### How much overhead do lightgroup lobe passes add?

The lobe passes add minimal render time overhead. The primary cost is increased output file size (more EXR layers). The aggregate balance computation happens during the existing light integration path.

## ViewLayer Manager

### Why does it open as a separate window?

The ViewLayer Manager uses Qt (via BQt) for its UI, which cannot be embedded directly into Blender's native UI architecture. It runs as a standalone top-level window intentionally.

### Can I use it on Linux?

Current stable releases target Windows x64 (portable ZIP). A public **Linux Beta pre-release** (built on Rocky Linux 8.10 / EL8 baseline) is available for testing and feedback, while full native Linux GPU/OptiX and desktop qualification is still in progress. See [Development Tracking](/en/feature-tracking) and [Releases](/en/industrial-cg-platform/releases/).

### What is the `failed to get blender hwnd` message?

This is a normal BQt safe-mode log message. It means BQt is creating a new Qt application window instead of wrapping Blender's existing window. This is expected behavior and does not indicate a failure.

## Building

### Why does the Visual Studio generator hang?

This is a known workstation-local issue related to `Tracker.exe` crashing with `TrackFileAccess=true`. Use Ninja + VsDevCmd as the default build path instead.

### What is the LFS hydration gate?

Some files in the repository are stored using Git LFS. If these files are not properly "hydrated" (downloaded as real content instead of pointer stubs), builds will fail or produce broken runtimes. Always verify that `assets/`, `release/datafiles/`, and `scripts/startup/bl_app_templates_system/` contain real binary content before building.
