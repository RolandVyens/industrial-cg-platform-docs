---
title: "Building from Source"
description: "Build Industrial CG Platform 5.2.4 LTS from source on Windows following the current Release workflow: Visual Studio 2022, CMake, Ninja, OptiX SDK, full install-target build, and post-install verification."
---

# Building from Source

This guide follows the current **Industrial CG Platform 5.2.4 LTS** Windows x64 Release build workflow (Ninja + `VsDevCmd` building the complete `install` dependency graph).

## Prerequisites

| Tool | Version | Notes |
| --- | --- | --- |
| **Visual Studio** | 2022 (17.x) or Build Tools 2022 | With the "Desktop development with C++" workload |
| **CMake** | 3.24+ | Included with Visual Studio or standalone |
| **Ninja** | 1.11+ | Validated default build generator |
| **Git** | 2.30+ | With Git LFS enabled |
| **OptiX SDK + NVIDIA Compiler Toolchain** | Per official Blender 5.2 build requirements | Required only when building Cycles OptiX GPU support (for OptiX PTX kernels) |
| **Python** | 3.13 | Bundled automatically by Blender's precompiled dependencies |

## Clone & Fetch Dependencies

```powershell
git clone https://github.com/RolandVyens/industrial-cg-platform.git
cd industrial-cg-platform
make update
```

`make update` fetches the `lib/windows_x64` precompiled libraries from Blender's official dependency repository.

::: warning Git LFS Asset Check (Fresh Clone or Upstream Sync)
After a fresh clone or upstream sync, verify that shipped assets are hydrated rather than Git LFS pointer stubs:

- `assets/`
- `release/datafiles/`
- `scripts/startup/bl_app_templates_system/`

If any file begins with `version https://git-lfs.github.com/spec/v1`, hydrate the real asset before building. Routine incremental local rebuilds do not need to re-fetch LFS payloads.
:::

## Configure the Release Build

Initialize the x64 Visual Studio developer environment and configure a dedicated Release build directory and install prefix with Ninja:

```powershell
# Initialize the Visual Studio 2022 x64 environment (adjust path for Community or BuildTools)
& $env:ComSpec /c 'call "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=x64 -host_arch=x64 && cmake -G Ninja -S . -B build_release -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=install_release -DWITH_BUILDINFO=ON -DWITH_CYCLES_DEVICE_OPTIX=ON -DOPTIX_ROOT_DIR="C:/path/to/optix-dev" -DWITH_WINDOWS_RELEASE_PDB=OFF'
```

::: tip GPU Backend & Release Preset Options
- For a CPU-only build, set `-DWITH_CYCLES_DEVICE_OPTIX=OFF` and omit `-DOPTIX_ROOT_DIR`.
- To start from Blender's full release feature matrix, pass `-C build_files/cmake/config/blender_release.cmake` before your local overrides and disable any GPU backends not installed on your workstation.
:::

## Build & Install (Full `install` Graph)

Build the **`install`** target directly rather than building only `blender`:

```powershell
& $env:ComSpec /c 'call "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=x64 -host_arch=x64 && ninja -C build_release install'
```

::: warning Why `ninja install` Matters
Building only the `blender` target skips Cycles GPU kernel generation and full runtime packaging dependencies. Running `ninja -C build_release install` builds the entire dependency graph—including embedded splash assets (`splash.png.c`), `buildinfo`, and Cycles OptiX kernels—and installs the ready-to-run portable runtime into `install_release/`.
:::

## Post-Install Verification

Verify the installed runtime before packaging or testing shots:

```powershell
# 1. Verify version identity and clean build metadata
.\install_release\blender.exe --version

# 2. Smoke-test in an isolated session (without touching local preferences)
.\install_release\blender.exe --factory-startup --command help
```

Expected first line from `--version`:

```text
Blender 5.2.4 LTS Industrial CG Platform
```

Also confirm three release integrity checks:

1. **Clean build info**: When built from a clean release branch, `build branch` should not show a `(modified)` suffix.
2. **OptiX kernels present**: When OptiX is enabled, verify non-empty OptiX kernel files exist under `install_release\5.2\scripts\addons_core\cycles\lib\`.
3. **No LFS pointer stubs**: Confirm bundled `.blend` assets under `install_release\5.2\datafiles\` are real binary assets, not LFS pointer text.

## Known Notes & Platform Status

- **Why Ninja + `VsDevCmd`**: On some Windows workstations, the Visual Studio generator / MSBuild can stall during compiler detection due to `Tracker.exe`. Ninja + `VsDevCmd -arch=x64 -host_arch=x64` is the validated Release build path. If invoking MSBuild directly, pass `/p:TrackFileAccess=false`.
- **Avoiding `LNK1318` link errors**: Keep `-DWITH_WINDOWS_RELEASE_PDB=OFF` if Release linking hits `LNK1318` PDB errors.
- **Linux builds**: The current stable release targets Windows x64. Linux builds are currently in public **Linux Beta 1** (built on a Rocky Linux 8.10 / EL8 baseline); follow progress on [Development Tracking](/en/feature-tracking) and [Releases](/en/industrial-cg-platform/releases/).

## See Also

- [Blender Manual: Building Blender](https://developer.blender.org/docs/handbook/building_blender/) — Official upstream toolchain and platform build guide.
- [Installation](/en/industrial-cg-platform/guide/installation) — Download and deploy a pre-built Windows x64 Release ZIP package.
