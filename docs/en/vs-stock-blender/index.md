---
title: "Industrial CG Platform vs Stock Blender: What's Different, and When to Use Which"
description: "Complete comparison of Industrial CG Platform vs stock Blender: native Cycles Deep EXR, EXR Overscan, lightgroup lobe passes, Shadow Color, ViewLayer Manager, integrated Qt 6 (bQt) runtime, compatibility boundaries, and when to stay on stock Blender."
cover: "/splash.webp"
faq: true
---

# Industrial CG Platform vs Stock Blender: What's Different, and When to Use Which

**Industrial CG Platform** is a production-oriented fork of **stock Blender** built for studio VFX pipelines handing off to Nuke, Maya, and Houdini: it keeps the same Blender interface, add-on ecosystem, and `.blend` file format you already know, while adding native Cycles **Deep EXR**, **EXR Overscan**, **per-lightgroup lobe passes**, **Shadow Color**, a **ViewLayer Manager**, and an **integrated Qt (bQt) runtime** directly at the engine and runtime level.

If you are evaluating a full studio pipeline architecture or an end-to-end compositing guide, see **[Blender VFX Pipeline](/en/blender-vfx-pipeline/)** and **[Blender to Nuke Workflow](/en/blender-to-nuke-workflow/)**. This page focuses specifically on what differs from stock Blender, why those additions require a fork, and when stock Blender is still the better choice.

## 1. Feature Comparison: Stock Blender vs Industrial CG Platform

Each row summarizes what each side actually does out of the box and links to the corresponding documentation page for full technical details. Where stock Blender can approximate a workflow through manual steps or scripting, that is noted honestly below.

| Feature | Stock Blender | Industrial CG Platform |
| --- | --- | --- |
| **[Native Deep EXR output](/en/industrial-cg-platform/features/deep-exr)** | Flat EXR only; no native deep image output from Cycles. | Cycles native Deep EXR output (Simple and Physical modes, surface, object volume, and World Volume samples) feeding straight into Nuke `DeepMerge`. |
| **[EXR Overscan](/en/industrial-cg-platform/features/exr-overscan)** | No native overscan metadata; extra margin around the frame requires manual camera/resolution workarounds or post padding. | Native Cycles overscan: `displayWindow` stays at delivery resolution while `dataWindow` expands so Nuke lens distortion has no black edges. |
| **[Lightgroup lobe passes](/en/industrial-cg-platform/features/lightgroup-lobe-passes)** | Lightgroups output combined color only; per-lightgroup lobe separation is not built into Cycles and requires workarounds. | Native per-lightgroup direct and indirect diffuse, glossy, transmission, and volume split passes computed inside Cycles. |
| **[Shadow Color](/en/industrial-cg-platform/features/shadow-color)** | Shadows are strictly the absence of light, with no per-light or per-world shadow tint control. | Per-light and per-world shadow tinting in Cycles (*Known limitation*: applies an additive overlay tint to shadowed regions only; it does not simulate colored translucent occlusion). |
| **[ViewLayer Manager](/en/industrial-cg-platform/features/viewlayer-manager)** | Manual per-layer pass toggling in the Properties editor with no built-in batch preset manager (basic batching must be scripted in Python). | Standalone Qt window centralizing ViewLayers, render passes, Shader AOVs, lightgroups, and one-click batch presets across multiple layers. |
| **[Integrated Qt runtime (bQt)](/en/industrial-cg-platform/api/bqt-usage)** | No Qt integration bundled in stock Blender (requires manual third-party Python package installation and event-loop setup). | Qt 6 integrated directly into the Blender runtime via a bundled bQt system extension — powers the ViewLayer Manager and studio Qt tools out of the box. |

## 2. Why a Fork Instead of an Add-on?

Blender's Python API is well suited for scene layout, UI panels, and compositor wiring, but it cannot modify how Cycles traces rays, accumulates film passes, writes OpenEXR deep/window metadata, or ships a managed Qt runtime. Every addition in Industrial CG Platform lives at the fork level for a concrete technical reason:

- **Cycles kernel and pass system**:
  - **Native Deep EXR** requires per-sample depth capture during path tracing, tile-level deep sample budgets in `KernelFilm`, and direct OpenEXR deep image writing (`PASS_DEEP_COMBINED`, `PASS_DEEP_POSITION`).
  - **Lightgroup lobe passes** accumulate per-lightgroup direct/indirect diffuse, glossy, transmission, and volume contributions directly inside the Cycles integrator (`lightgroup_split_index`, `film_write_lightgroup_split_pass`) while preserving energy balance back to the Beauty pass.
  - **Shadow Color** evaluates per-light and per-world tinting inside the integrator's shadow path via the `KernelLight.shadow_color` and `KernelBackground.shadow_color` fields.
  - **EXR Overscan** renders expanded camera margins inside Cycles and writes standard OpenEXR `displayWindow` and `dataWindow` headers without altering camera focal length or framing.
- **Integrated Qt (bQt) runtime**:
  - Shipping **Qt 6** (`PySide6` + `bqt`) as a bundled system extension with session-based enablement and standalone safety mode gives tools like **ViewLayer Manager** a stable, zero-install Qt environment that artists do not have to configure manually.

None of these engine-level or runtime-level behaviors can be added cleanly by a standard Blender add-on. For C++ and Python implementation details, see [Cycles Kernel Extensions](/en/industrial-cg-platform/api/cycles-kernel), [Pass & AOV System](/en/industrial-cg-platform/api/pass-system), and the [bQt Usage Guide](/en/industrial-cg-platform/api/bqt-usage).

## 3. Compatibility and Boundaries

Industrial CG Platform stays close to upstream stock Blender so studios can evaluate or deploy it without breaking existing assets:

- **`.blend` file compatibility**: Bidirectional with stock Blender. Files saved in Industrial CG Platform open cleanly in stock Blender — custom properties (Deep EXR, overscan, Shadow Color, lobe pass toggles) are preserved in the file and safely ignored by stock builds.
- **Side-by-side coexistence**: Ships as a portable ZIP using the standard `blender.exe` executable name and a branded window title (`Blender <version> Industrial CG Platform`). Its default OptiX shader cache is isolated automatically (`%USERPROFILE%\AppData\Local\IndustrialCGPlatform\Cache\OptiX\optix7cache.db`). By default it shares the standard Blender user preferences directory, or you can isolate preferences completely with `BLENDER_USER_RESOURCES` or `--factory-startup`.
- **Stable releases & OS**: **Windows 10/11 x64** (portable ZIP, ~1 GB extracted). See [Installation](/en/industrial-cg-platform/guide/installation) and [Releases](/en/industrial-cg-platform/releases/) for current stable and LTS builds.
- **Rendering backends**: **NVIDIA RTX OptiX** (recommended) and **CPU** only. Custom features (Deep EXR, lightgroup lobe passes, Shadow Color, EXR Overscan) work on both OptiX and CPU.
- **Memory requirements**: **16 GB RAM minimum, 32 GB recommended** (verified against the [Installation Guide](/en/industrial-cg-platform/guide/installation)).
- **Linux status**: A public **Linux Beta pre-release** (built on Rocky Linux 8.10 / EL8 baseline, glibc 2.28+) is available for testing and feedback. It is **not a stable release** yet — native Linux GPU/OptiX, HIP/ROCm, and Wayland qualification are still in progress. Track progress on [Development Tracking](/en/feature-tracking).
- **License**: **GNU GPL v3 or later (`GPL-3.0-or-later`)** for the core Blender-derived application, matching upstream Blender. Bundled Qt runtime packages retain their respective upstream licenses, documented on [About the Project](/en/industrial-cg-platform/about/).

## 4. When to Stay on Stock Blender

Industrial CG Platform is intentionally narrow in scope. Stock Blender is the better choice if:

- **You do not hand off renders to Nuke or multi-layer EXR compositing**: If you deliver straight from Blender's compositor, render final stills/videos directly, or work primarily in modeling, animation, or real-time lookdev, the fork adds no practical benefit.
- **You do not need Deep EXR, overscan metadata, per-lightgroup lobe splits, or Shadow Color**: Staying on stock Blender avoids tracking a separate binary when stock Cycles already covers your output needs.
- **You require macOS, a production-qualified stable Linux build, or non-RTX GPU rendering today**: Current stable releases target Windows x64 with NVIDIA RTX OptiX or CPU. Teams that require macOS, stable Linux, or AMD/Intel GPU acceleration should stay on stock Blender until Linux qualification completes.
- **Studio IT policy mandates official Blender Foundation binaries only**: If your environment requires unmodified upstream builds or official Blender LTS support boundaries, keep production on stock Blender.

If your pipeline *does* center on studio VFX rendering and Nuke compositing, continue with **[Blender VFX Pipeline](/en/blender-vfx-pipeline/)** for pilot evaluation or **[Blender to Nuke Workflow](/en/blender-to-nuke-workflow/)** for shot setup.

## 5. FAQ

### Can I open my `.blend` files in both Industrial CG Platform and stock Blender?

Yes. `.blend` files created in Industrial CG Platform open cleanly in stock Blender, and stock Blender files open directly in Industrial CG Platform. Custom fork properties (such as Deep EXR, EXR Overscan, Shadow Color, and lightgroup lobe pass flags) are preserved in the file and safely ignored when opened in stock Blender.

### Is Industrial CG Platform a separate install, and can it run alongside stock Blender?

Yes. On Windows x64, Industrial CG Platform distributes as a portable ZIP package that extracts into its own folder without overwriting your stock Blender installation. It isolates its default OptiX shader cache automatically and identifies itself as `Blender <version> Industrial CG Platform` in the window title and `--version` output. Set `BLENDER_USER_RESOURCES` if you also want isolated user preferences.

### Does Industrial CG Platform replace stock Blender?

No. It is an optional, production-focused fork of stock Blender maintained alongside upstream Blender, not an official Blender Foundation release and not a general replacement. Many studios keep stock Blender installed for modeling or general tasks while running Industrial CG Platform specifically for lighting, ViewLayer management, and VFX render delivery.

### Do my existing Blender add-ons still work?

Most add-ons that work on stock Blender work identically on Industrial CG Platform, because the fork stays close to upstream stock Blender. Add-ons relying on deprecated APIs behave the same way they do on stock Blender.

### What rendering backends and operating systems are supported?

Current stable releases support **Windows 10/11 x64** with **NVIDIA RTX OptiX** and **CPU** rendering backends only (16 GB RAM minimum, 32 GB recommended). A public **Linux Beta pre-release** (Rocky Linux 8.10 / EL8 baseline, glibc 2.28+) is available for testing, but is not yet qualified as a stable release.

### Why can't these features just be installed as regular Blender add-ons?

Native Deep EXR sample capture, per-lightgroup direct/indirect lobe accumulation, per-light Shadow Color evaluation, and OpenEXR `displayWindow`/`dataWindow` overscan metadata all happen inside the C++ Cycles kernel and image output pipeline, which Python add-ons cannot modify. Bundling Qt 6 via the bQt runtime extension also requires fork-level packaging so tools like ViewLayer Manager launch reliably without manual environment setup.
