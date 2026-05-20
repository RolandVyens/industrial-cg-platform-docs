# 从源码构建

## 前置条件

| 工具 | 版本 | 说明 |
| --- | --- | --- |
| **Visual Studio** | 2022 (17.x) | 需安装 C++ 桌面开发工作负载 |
| **CMake** | 3.24+ | Visual Studio 自带或独立安装 |
| **Ninja** | 1.11+ | 推荐的构建系统 |
| **Git** | 2.30+ | 需要 Git LFS 支持 |
| **Python** | 3.13 | Blender 构建系统自动管理 |

## 克隆仓库

```powershell
git clone https://github.com/RolandVyens/industrial-cg-platform.git
cd industrial-cg-platform
```

## 获取依赖

```powershell
make update
```

::: warning LFS 水合检查
构建前请验证 LFS 资源文件已正确下载（不是指针存根）。检查以下路径：
- `assets/`
- `release/datafiles/`
- `scripts/startup/bl_app_templates_system/`

如果任何文件包含 `version https://git-lfs.github.com/spec/v1`，则需要从可信源进行水合。
:::

## 配置

使用 Ninja（推荐）：

```powershell
cmake -G Ninja -B build -S . `
  -DCMAKE_BUILD_TYPE=Release `
  -DWITH_CYCLES_CUDA_BINARIES=ON `
  -DCYCLES_CUDA_BINARIES_ARCH=sm_89 `
  -DWITH_CYCLES_DEVICE_OPTIX=ON
```

::: tip
将 `sm_89` 替换为您的 GPU 计算能力：
- RTX 4080/4090：`sm_89`
- RTX 3080/3090：`sm_86`
- RTX 2080：`sm_75`
:::

## 构建

```powershell
cmake --build build --target blender
```

## 安装

```powershell
cmake --install build --prefix install
```

## 验证

```powershell
.\install\blender.exe --version
```

## 另请参阅

- [Blender 构建文档](https://developer.blender.org/docs/handbook/building_blender/) — 官方 Blender 构建文档。
- [安装](/zh/guide/installation) — 使用预编译发布包安装。
