# Installation

## System Requirements

| Component | Requirement |
| --- | --- |
| **OS** | Windows 10/11 x64 |
| **GPU** | NVIDIA GPU with CUDA or OptiX support (recommended) |
| **GPU Driver** | Latest NVIDIA Game Ready or Studio driver |
| **RAM** | 16 GB minimum, 32 GB recommended |
| **Disk** | ~1 GB for the release package |

## Download

1. Go to the [GitHub Releases](https://github.com/RolandVyens/industrial-cg-platform/releases) page.
2. Download the latest `industrial-cg-platform-X.X.X-YYYY-MM-DD.zip` file.
3. Verify the download integrity by checking the SHA256 hash listed in the release notes.

## Install

1. Extract the ZIP file to your preferred location (e.g., `C:\Program Files\IndustrialCGPlatform\`).
2. Run `blender.exe` from the extracted folder.
3. On first launch, you should see the branded splash screen showing **Industrial CG Platform**.

::: warning
Do not extract into a path that requires administrator permissions if you want to avoid UAC prompts on every launch. A user-writable location like `D:\Tools\` works well.
:::

## Verify Installation

Run the following from a command prompt to verify:

```powershell
.\blender.exe --version
```

Expected output:

```
Blender 5.2.0 Industrial CG Platform
```

## GPU Setup

For Cycles GPU rendering with NVIDIA:

1. Open **Edit > Preferences > System**.
2. Under **Cycles Render Devices**, select either:
   - **CUDA** — Broad compatibility, slightly slower.
   - **OptiX** — Faster ray tracing on RTX GPUs (recommended).
3. Check your GPU in the device list.

## Coexistence with Stock Blender

Industrial CG Platform uses the same Blender config directory (`%APPDATA%\Blender Foundation\Blender\5.2\`). If you want to keep completely separate user preferences:

- Use the `--factory-startup` flag for a clean session.
- Or set `BLENDER_USER_RESOURCES` to a custom path before launching.

## See Also

- [Building from Source](/en/guide/building-from-source) — Compile from the GitHub repository.
- [Blender Manual: Installing on Windows](https://docs.blender.org/manual/en/latest/getting_started/installing/windows.html) — Standard Blender installation guide.
