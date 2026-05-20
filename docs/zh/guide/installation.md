# 安装

## 系统要求

| 组件 | 要求 |
| --- | --- |
| **操作系统** | Windows 10/11 x64 |
| **GPU** | 支持 CUDA 或 OptiX 的 NVIDIA GPU（推荐） |
| **GPU 驱动** | 最新 NVIDIA Game Ready 或 Studio 驱动 |
| **内存** | 最低 16 GB，推荐 32 GB |
| **磁盘** | 发布包约 1 GB |

## 下载

1. 前往 [GitHub Releases](https://github.com/RolandVyens/industrial-cg-platform/releases) 页面。
2. 下载最新的 `industrial-cg-platform-X.X.X-YYYY-MM-DD.zip` 文件。
3. 通过检查发布说明中列出的 SHA256 哈希值验证下载完整性。

## 安装

1. 将 ZIP 文件解压到您想要的位置（例如 `D:\Tools\IndustrialCGPlatform\`）。
2. 运行解压文件夹中的 `blender.exe`。
3. 首次启动时，您应该会看到带有 **Industrial CG Platform** 标识的启动画面。

::: warning
不要解压到需要管理员权限的路径，否则每次启动都会出现 UAC 提示。用户可写的路径（如 `D:\Tools\`）效果最佳。
:::

## 验证安装

在命令提示符中运行以下命令进行验证：

```powershell
.\blender.exe --version
```

预期输出：

```
Blender 5.2.0 Industrial CG Platform
```

## GPU 设置

使用 NVIDIA 进行 Cycles GPU 渲染：

1. 打开 **编辑 > 偏好设置 > 系统**。
2. 在 **Cycles 渲染设备** 下，选择：
   - **CUDA** — 广泛兼容，速度稍慢。
   - **OptiX** — RTX GPU 上更快的光线追踪（推荐）。
3. 在设备列表中勾选您的 GPU。

## 另请参阅

- [从源码构建](/zh/guide/building-from-source) — 从 GitHub 仓库编译。
- [Blender 手册：在 Windows 上安装](https://docs.blender.org/manual/en/latest/getting_started/installing/windows.html) — 标准 Blender 安装指南。
