# 常见问题 (FAQ)

## 一般问题

### 这是 Blender 的官方发行版吗？

不是。Industrial CG Platform 是一个由社区发起并维护的 Blender 生产级分支（Fork），与 Blender 基金会（Blender Foundation）无直接关联或背书关系。它使用与 Blender 相同的 GPL-2.0-or-later（或更高版本）开源许可证发布。

### 在此平台创建的 `.blend` 文件与官方 Stock Blender 兼容吗？

兼容。在 Industrial CG Platform 中创建和保存的文件可以直接在官方 Stock Blender 5.2 中无缝打开。自定义扩展功能（例如 Deep EXR、灯光组分量通道等）在官方版本中仅仅是不可用 — 这些自定义数据会被官方版本完整保留，只是被安全地忽略。

### 平台多久合并一次上游 Blender 的更新？

我们的 `vfx-rendering-branch` 暂存分支会定期从 Blender 官方的 `origin/main` 主线拉取并 intake 变更。合并后的代码在进入正式的 `industrial-cg-platform` 生产主线之前，会在多套工作站上进行严密的自动化编译与功能验证。

### 我可以使用我现有的 Blender 插件吗？

绝大多数兼容官方 Blender 5.2 的第三方插件都可以在 Industrial CG Platform 中正常运行。然而，深度依赖已弃用底层 API（例如 `bgl` 模块、以及部分已经被废除的 `bpy_types` 内部结构）的陈旧插件可能会在启动时抛出报错——这与官方 Stock Blender 5.2 的行为完全一致。

## 渲染系统

### 支持哪些 GPU 渲染后端？

- **CUDA** — 支持所有计算能力（Compute Capability）在 5.0 及以上的 NVIDIA 独立显卡。
- **OptiX** — 强烈推荐 NVIDIA RTX 系列显卡使用，可获得最佳的光线追踪吞吐与渲染速度。
- **CPU** — 始终作为最后的保底和回退渲染器可用。

### 这些自定义的扩展渲染功能可以在 CPU 上运行吗？

可以。无论是 Deep EXR 深度输出、灯光组分量通道、还是艺术阴影着色（Shadow Color），都完美兼容并支持 CPU、CUDA 和 OptiX 渲染后端。

### 灯光组分量通道（Lobe Passes）会带来多少渲染时间开销？

分量通道几乎不会增加明显的渲染计算耗时。其最主要的开销在于增加了最终输出的 EXR 文件的图层数量，从而使文件体积增大。分量的聚合平衡计算（Aggregate Balance Computation）是直接嵌入在现有的灯光积分核心通路中执行的，非常轻量。

## ViewLayer 管理器

### 为什么管理器要以独立的单独窗口形式打开？

ViewLayer 管理器使用 Qt（通过 BQt）构建其高级 UI 界面。由于 Blender 自身的 native UI 框架极其闭源且排他，外部的 Qt 渲染上下文无法直接以子窗口的形式嵌入到 Blender 内部。因此，管理器被有意设计为运行在独立的顶级（Top-Level）系统窗口中。

### 我能在 Linux 上使用它吗？

目前还不支持。当前的发布版本仅提供 Windows x64 二进制 ZIP 压缩包。我们已经制定了针对 Linux 平台（初步拟定支持 Rocky Linux 9 / X11 视窗环境）的移植计划，将在未来的版本中发布。

### 启动时提示的 `failed to get blender hwnd` 日志代表什么？

这是正常的 BQt 安全模式（Safe Mode）调试日志。它表示 BQt 目前无法直接获取并包装已有的 Blender 窗口句柄（hwnd），因此选择在后台新建并初始化一个独立的 Qt 应用程序生命周期。这属于设计的正常预案行为，不代表任何功能崩溃或启动失败。

## 源码编译

### 为什么使用 Visual Studio 生成器配置 CMake 时会卡死挂起？

这是已知的本地开发工作站环境冲突问题。主要是因为 MSBuild 底层的 `Tracker.exe` 在默认开启文件追踪策略时，与本地某些杀毒软件或系统设置冲突导致挂起。使用 Ninja + VsDevCmd 作为 CMake 的编译后端即可完美避开此挂起陷阱。

### 什么是 LFS 资源水合检查（LFS Hydration Gate）？

为了避免仓库臃肿，我们将许多体积较大的二进制资产文件通过 Git LFS（Large File Storage）托管。如果在克隆仓库时没有正确“水合”（即拉取真正的资产数据而非留下一堆几百字节的指针纯文本），则编译出的 Blender 运行时会缺失图标、UI 预设或直接闪退。请在配置编译前，务必保证 `assets/`、`release/datafiles/` 和 `scripts/startup/bl_app_templates_system/` 下不包含指针存根。
