---
title: "从源码构建"
description: "在 Windows 上按最新 Release 构建流程编译 Industrial CG Platform：Visual Studio 2022、CMake、Ninja、OptiX SDK、完整 install 目标构建与安装后完整性校验。"
---

# 从源码构建

本指南对应 **Industrial CG Platform** 当前使用的 Windows x64 Release 构建流程（Ninja + `VsDevCmd` 完整 `install` 构建链路）。

## 前置依赖

| 工具 | 版本要求 | 说明 |
| --- | --- | --- |
| **Visual Studio** | 2022 (17.x) 或 Build Tools 2022 | 安装“使用 C++ 的桌面开发”工作负载 |
| **CMake** | 3.24+ | Visual Studio 自带或独立安装均可 |
| **Ninja** | 1.11+ | 推荐且已验证的默认构建工具 |
| **Git** | 2.30+ | 需启用 Git LFS |
| **OptiX SDK + NVIDIA 编译工具链** | 遵循原版 Blender 官方构建要求 | 仅在启用 Cycles OptiX GPU 渲染时需要（用于编译 OptiX PTX 内核） |
| **Python** | 3.13 | 由 Blender 预编译依赖自动提供，无需手动配置 |

## 克隆仓库与获取依赖

```powershell
git clone https://github.com/RolandVyens/industrial-cg-platform.git
cd industrial-cg-platform
make update
```

`make update` 会从 Blender 官方依赖仓库拉取 `lib/windows_x64` 预编译库。

::: warning Git LFS 资源检查（首次克隆或同步上游后）
首次克隆或执行上游同步后，请确认以下目录中的内置资源已完成 LFS 还原，而非仅包含指针文本：

- `assets/`
- `release/datafiles/`
- `scripts/startup/bl_app_templates_system/`

如果文件中出现 `version https://git-lfs.github.com/spec/v1`，需先还原真实资源再构建。日常本地增量编译无需重复拉取 LFS。
:::

## 配置 Release 构建

先初始化 x64 架构的 Visual Studio 开发者环境，再使用 Ninja 配置独立的 Release 构建目录与安装输出目录：

```powershell
# 初始化 Visual Studio 2022 x64 编译环境（Community 或 BuildTools 按实际路径调整）
& $env:ComSpec /c 'call "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=x64 -host_arch=x64 && cmake -G Ninja -S . -B build_release -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=install_release -DWITH_BUILDINFO=ON -DWITH_CYCLES_DEVICE_OPTIX=ON -DOPTIX_ROOT_DIR="C:/path/to/optix-dev" -DWITH_WINDOWS_RELEASE_PDB=OFF'
```

::: tip 关于 GPU 后端与预设配置
- 仅构建 CPU 版本时，可将 `-DWITH_CYCLES_DEVICE_OPTIX=OFF` 并省略 `-DOPTIX_ROOT_DIR`。
- 若需要对齐 Blender 官方全量特性开关，可在上述 `cmake` 命令前附加 `-C build_files/cmake/config/blender_release.cmake`，再按本机工具链显式覆盖不需要的后端开关。
:::

## 构建与安装（完整 `install` 依赖图）

请直接构建 **`install`** 目标，而不要只编 `blender` 单个目标：

```powershell
& $env:ComSpec /c 'call "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=x64 -host_arch=x64 && ninja -C build_release install'
```

::: warning 为什么必须运行 `ninja install`
仅构建 `blender` 目标会跳过 Cycles GPU 内核与完整运行时打包依赖。直接运行 `ninja -C build_release install` 会按完整依赖图同时生成内嵌启动画面（`splash.png.c`）、构建信息（`buildinfo`）、Cycles OptiX 内核，并将完整可运行的绿色版输出到 `install_release/`。
:::

## 安装后完整性校验

构建完成后，建议按 Release 验收标准执行以下检查：

```powershell
# 1. 验证版本标识与干净构建信息
.\install_release\blender.exe --version

# 2. 隔离用户配置启动验证（不污染本机 Blender 偏好设置）
.\install_release\blender.exe --factory-startup --command help
```

预期 `--version` 首行输出为：

```text
Blender <版本号> Industrial CG Platform
```

同时确认以下三项：

1. **构建信息干净**：从干净的 Release 分支构建时，`build branch` 不应出现 `(modified)` 标记。
2. **OptiX 内核齐全**：启用 OptiX 时，检查 `install_release\<主版本.次版本>\scripts\addons_core\cycles\lib\` 中已生成非空的 OptiX 内核文件。
3. **内置资源无 LFS 指针残留**：确认 `install_release\<主版本.次版本>\datafiles\` 下的 `.blend` 资源均为真实二进制文件（非 LFS 指针文本）。

## 常见问题与平台说明

- **为什么推荐 Ninja + `VsDevCmd`**：在部分 Windows 工作站上，Visual Studio 生成器 / MSBuild 可能因 `Tracker.exe` 在编译器探测阶段卡死；Ninja + `VsDevCmd -arch=x64 -host_arch=x64` 是当前正式 Release 的验证路径。若必须直接调用 MSBuild，可附加 `/p:TrackFileAccess=false`。
- **避免 `LNK1318` 链接报错**：Release 链接阶段如遇到 `LNK1318` PDB 错误，保持 `-DWITH_WINDOWS_RELEASE_PDB=OFF` 即可避免。
- **Linux 构建说明**：当前稳定版面向 Windows x64；Linux 版本目前处于公开 **Linux Beta** 预发布阶段（基于 Rocky Linux 8.10 / EL8 基线构建），最新进展可查阅 [开发追踪](/zh/feature-tracking) 与 [版本发布](/zh/industrial-cg-platform/releases/)。

## 参考链接

- [Blender 官方文档：Building Blender](https://developer.blender.org/docs/handbook/building_blender/) — 上游工具链与平台编译参考。
- [安装指南](/zh/industrial-cg-platform/guide/installation) — 直接下载并部署预编译的 Windows x64 Release 绿色包。
