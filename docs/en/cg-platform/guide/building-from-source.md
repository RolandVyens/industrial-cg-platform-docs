# Building from Source

## Prerequisites

| Tool | Version | Notes |
| --- | --- | --- |
| **Visual Studio** | 2022 (17.x) | With C++ desktop development workload |
| **CMake** | 3.24+ | Included with Visual Studio or standalone |
| **Ninja** | 1.11+ | Recommended build system |
| **Git** | 2.30+ | With Git LFS support |
| **Python** | 3.13 | Bundled by Blender's build system |

## Clone the Repository

```powershell
git clone https://github.com/RolandVyens/industrial-cg-platform.git
cd industrial-cg-platform
```

## Fetch Dependencies

Blender requires precompiled libraries. Follow the standard Blender build process:

```powershell
make update
```

This fetches the `lib/windows_x64` precompiled dependencies from Blender's official SVN repository.

::: warning LFS Hydration Gate
Before building, verify that shipped-data LFS assets are hydrated (not pointer stubs). Check these paths for pointer text:

- `assets/`
- `release/datafiles/`
- `scripts/startup/bl_app_templates_system/`

If any file contains `version https://git-lfs.github.com/spec/v1`, it needs hydration from a trusted source before building.
:::

## Configure

Using Ninja (recommended):

```powershell
# Open a Visual Studio Developer Command Prompt first
& "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat"

cmake -G Ninja -B build -S . `
  -DCMAKE_BUILD_TYPE=Release `
  -DWITH_CYCLES_CUDA_BINARIES=ON `
  -DCYCLES_CUDA_BINARIES_ARCH=sm_89 `
  -DWITH_CYCLES_DEVICE_OPTIX=ON
```

::: tip
Replace `sm_89` with your GPU's compute capability:
- RTX 4080/4090: `sm_89`
- RTX 3080/3090: `sm_86`
- RTX 2080: `sm_75`
:::

## Build

```powershell
cmake --build build --target blender
```

## Install

```powershell
cmake --install build --prefix install
```

The installed runtime will be in the `install/` directory.

## Verify

```powershell
.\install\blender.exe --version
```

## Known Build Notes

- **Ninja recommended** — The Visual Studio generator may hang during compiler-ID detection due to a workstation-local `Tracker.exe` issue. Ninja + VsDevCmd is the validated default build path.
- **`TrackFileAccess=false`** — If using MSBuild directly, pass `/p:TrackFileAccess=false` to avoid MSBuild tracker hangs.
- **PDB generation** — Release builds may encounter `LNK1318` errors during PDB generation. Build with `WITH_WINDOWS_RELEASE_PDB=OFF` if this occurs.

## See Also

- [Blender Manual: Building Blender](https://developer.blender.org/docs/handbook/building_blender/) — Official Blender build documentation.
- [Installation](/en/cg-platform/guide/installation) — Install from a pre-built release package.
