# 从源码构建

## 前置依赖条件

| 工具 | 版本要求 | 备注 |
| --- | --- | --- |
| **Visual Studio** | 2022 (17.x) | 必须勾选“使用 C++ 的桌面开发”工作负载 |
| **CMake** | 3.24+ | Visual Studio 自带或独立安装版本均可 |
| **Ninja** | 1.11+ | 强烈推荐的轻量级构建系统 |
| **Git** | 2.30+ | 必须集成 Git LFS 支持 |
| **Python** | 3.13 | 由 Blender 的构建系统自动获取并管理 |

## 克隆仓库

```powershell
git clone https://github.com/RolandVyens/industrial-cg-platform.git
cd industrial-cg-platform
```

## 获取编译依赖

Blender 编译需要大量的预编译静态库。运行以下命令以拉取官方依赖：

```powershell
make update
```

这会自动从 Blender 官方的 SVN 仓库中拉取对应的 `lib/windows_x64` 预编译依赖。

::: warning LFS 资源水合拦截 (LFS Hydration Gate)
在开始编译前，请务必验证仓库中自带的 LFS 二进制资产是否已被正确“水合”（即下载为真实的实体文件而非指针存根）。请检查以下路径的文件是否包含了指针存根文本：

- `assets/`
- `release/datafiles/`
- `scripts/startup/bl_app_templates_system/`

如果任何资产文件仅包含 `version https://git-lfs.github.com/spec/v1` 的纯文本内容，表示其仍为存根状态，您需要先从可信的 Git 源对其运行 `git lfs pull` 以完成水合。
:::

## 配置编译参数

使用 Ninja 编译系统进行 CMake 配置（官方推荐路径）：

```powershell
# 必须首先加载 Visual Studio 开发者环境命令行环境
& "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat"

cmake -G Ninja -B build -S . `
  -DCMAKE_BUILD_TYPE=Release `
  -DWITH_CYCLES_CUDA_BINARIES=ON `
  -DCYCLES_CUDA_BINARIES_ARCH=sm_89 `
  -DWITH_CYCLES_DEVICE_OPTIX=ON
```

::: tip
请根据您本机的具体 GPU 显卡架构架构，将 `sm_89` 替换为相应的计算能力（Compute Capability）：
- RTX 4080/4090：`sm_89`
- RTX 3080/3090：`sm_86`
- RTX 2080：`sm_75`
:::

## 执行编译

```powershell
cmake --build build --target blender
```

## 安装

```powershell
cmake --install build --prefix install
```

编译输出的运行时环境会被提取并安装在 `install/` 目录下。

## 验证

```powershell
.\install\blender.exe --version
```

## 已知构建注意事项 (Known Build Notes)

- **强烈建议使用 Ninja** — 传统的 Visual Studio 解决方案生成器在进行编译器 ID 探测（compiler-ID detection）时，可能会因为工作站本地的 `Tracker.exe` 冲突而彻底挂起。使用 VS 开发者终端加载 Ninja 是经过严密验证的官方默认构建路径。
- **`TrackFileAccess=false`** — 如果您必须直接使用 MSBuild，请务必在命令行参数中传入 `/p:TrackFileAccess=false`，以避免 MSBuild Tracker 挂起。
- **PDB 符号生成失败** — 在生成 Release 构建时，可能会因为 PDB 符号文件体积庞大而在生成阶段触发 `LNK1318` 连接器错误。若遇到此问题，建议传入 `-DWITH_WINDOWS_RELEASE_PDB=OFF` 禁用 PDB 符号生成。

## 另请参阅

- [Blender 开发者手册：构建 Blender](https://developer.blender.org/docs/handbook/building_blender/) — 官方 Blender 源码构建参考文档。
- [安装](/zh/industrial-cg-platform/guide/installation) — 从预编译好的 Release 包快速安装。
