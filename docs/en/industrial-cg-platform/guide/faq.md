# FAQ

## General

### Is this an official Blender release?

No. Industrial CG Platform is a community-maintained fork of Blender. It is not affiliated with or endorsed by the Blender Foundation. It is released under the same GPL-2.0-or-later license as Blender.

### Are `.blend` files compatible with stock Blender?

Yes. Files created in Industrial CG Platform can be opened in stock Blender 5.2. Custom features (Deep EXR, lightgroup lobe passes, etc.) will simply not be available — the data is preserved but ignored.

### How often do you merge upstream Blender changes?

The `vfx-rendering-branch` staging branch regularly intakes changes from Blender `origin/main`. Merges are validated before being synchronized into the `industrial-cg-platform` mainline.

### Can I use my existing Blender add-ons?

Most Blender add-ons that work with Blender 5.2 should work with Industrial CG Platform. However, add-ons that depend on deprecated APIs (`bgl`, specific `bpy_types` internals) may log errors on startup — this matches stock Blender 5.2 behavior.

## Rendering

### Which GPU backends are supported?

- **CUDA** — All NVIDIA GPUs with compute capability 5.0+
- **OptiX** — NVIDIA RTX GPUs (recommended for best performance)
- **CPU** — Always available as a fallback

### Do the custom features work on CPU?

Yes. Deep EXR, lightgroup lobe passes, and shadow color all work on CPU, CUDA, and OptiX backends.

### How much overhead do lightgroup lobe passes add?

The lobe passes add minimal render time overhead. The primary cost is increased output file size (more EXR layers). The aggregate balance computation happens during the existing light integration path.

## ViewLayer Manager

### Why does it open as a separate window?

The ViewLayer Manager uses Qt (via BQt) for its UI, which cannot be embedded directly into Blender's native UI architecture. It runs as a standalone top-level window intentionally.

### Can I use it on Linux?

Not yet. The current release is Windows-only. Linux support (starting with Rocky 9 / X11) is planned for a future release.

### What is the `failed to get blender hwnd` message?

This is a normal BQt safe-mode log message. It means BQt is creating a new Qt application window instead of wrapping Blender's existing window. This is expected behavior and does not indicate a failure.

## Building

### Why does the Visual Studio generator hang?

This is a known workstation-local issue related to `Tracker.exe` crashing with `TrackFileAccess=true`. Use Ninja + VsDevCmd as the default build path instead.

### What is the LFS hydration gate?

Some files in the repository are stored using Git LFS. If these files are not properly "hydrated" (downloaded as real content instead of pointer stubs), builds will fail or produce broken runtimes. Always verify that `assets/`, `release/datafiles/`, and `scripts/startup/bl_app_templates_system/` contain real binary content before building.
