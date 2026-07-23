---
title: "安装"
description: "| 组件 | 要求 |"
---
# 安装

## 系统要求

| 组件 | 要求 |
| --- | --- |
| **操作系统** | Windows 10/11 x64 |
| **GPU** | 支持 CUDA 或 OptiX 的 NVIDIA GPU（推荐） |
| **GPU 驱动** | 最新 NVIDIA Game Ready 或 Studio 驱动 |
| **内存 (RAM)** | 最低 16 GB，推荐 32 GB |
| **磁盘空间** | 解压发布包需要约 1 GB 空间 |

## 下载

1. 前往 [GitHub Releases](https://github.com/RolandVyens/industrial-cg-platform/releases) 页面。
2. 下载最新的 `industrial-cg-platform-X.X.X-YYYY-MM-DD.zip` 压缩包。
3. 通过检查发布说明中列出的 SHA256 哈希值验证下载文件的完整性。

## 解压与安装

1. 将 ZIP 压缩包解压到您偏好的任意位置（例如 `D:\Tools\IndustrialCGPlatform\`）。
2. 运行解压文件夹中的 `blender.exe`。
3. 首次启动时，您应该会看到带有 **Industrial CG Platform** 艺术标识的自定义启动画面（Splash Screen）。

::: warning
如果您想避免每次启动时都弹出 UAC（用户账户控制）管理员权限提示，请不要将文件解压到需要系统管理员权限的敏感路径（例如 `C:\Program Files\`）。像 `D:\Tools\` 这样用户可写入的自定义路径效果最佳。
:::

## 验证安装

在终端或命令提示符中，导航至安装目录并运行以下命令进行版本验证：

```powershell
.\blender.exe --version
```

预期输出：

```
Blender 5.2.0-2026-06-16 Industrial CG Platform
```

## GPU 渲染设置

若要为 Cycles 启用 NVIDIA GPU 硬件加速渲染：

1. 打开菜单栏 **编辑 > 偏好设置 > 系统 (Edit > Preferences > System)**。
2. 在 **Cycles 渲染设备 (Cycles Render Devices)** 下，选择：
   - **CUDA** — 广泛兼容老旧硬件，速度稍慢。
   - **OptiX** — RTX 系列 GPU 上的硬件光线追踪加速（强烈推荐）。
3. 在下方的设备列表中勾选您的 GPU 显卡。

## 与官方 Stock Blender 共存

Industrial CG Platform 默认使用与官方相同的配置目录（`%APPDATA%\Blender Foundation\Blender\5.2\`）。如果您希望在本地保持完全独立的配置和用户偏好：

- 在启动快捷方式后附加 `--factory-startup` 参数，以进行全新的干净会话。
- 或者在运行前，将环境变量 `BLENDER_USER_RESOURCES` 设置为一个自定义的专用文件夹路径。

## OptiX 着色器缓存隔离

为了避免 Industrial CG Platform 与官方原生 Blender 版本之间产生着色器编译冲突或缓存过期，本产品自动将其默认的 Nvidia OptiX 编译缓存路径与 stock Blender 进行了隔离。

- **默认缓存文件路径**：
  `%USERPROFILE%\AppData\Local\IndustrialCGPlatform\Cache\OptiX\optix7cache.db`
- **环境变量覆盖**：如果您的系统中显式定义了 `OPTIX_CACHE_PATH` 环境变量，它将覆盖产品的默认隔离路径并具有最高优先级。

## 另请参阅

- [从源码构建](/zh/industrial-cg-platform/guide/building-from-source) — 自行从 GitHub 仓库进行本地编译。
- [Blender 手册：在 Windows 上安装](https://docs.blender.org/manual/en/latest/getting_started/installing/windows.html) — 标准 Blender 安装指南。
