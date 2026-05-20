# 常见问题

## 一般问题

### 这是 Blender 的官方发行版吗？

不是。Industrial CG Platform 是社区维护的 Blender 分支，与 Blender Foundation 无关。它使用与 Blender 相同的 GPL-2.0-or-later 许可证发布。

### `.blend` 文件与官方 Blender 兼容吗？

兼容。在 Industrial CG Platform 中创建的文件可以在官方 Blender 5.2 中打开。自定义功能不可用，但数据会被保留。

### 多久合并一次上游 Blender 的更新？

`vfx-rendering-branch` 暂存分支定期从 Blender `origin/main` 获取更新。合并在同步到 `industrial-cg-platform` 主线之前会经过验证。

### 可以使用现有的 Blender 插件吗？

大多数兼容 Blender 5.2 的插件应该可以正常工作。依赖已弃用 API 的插件可能会在启动时输出错误——这与官方 Blender 5.2 的行为一致。

## 渲染

### 支持哪些 GPU 后端？

- **CUDA** — 所有计算能力 5.0+ 的 NVIDIA GPU
- **OptiX** — NVIDIA RTX GPU（推荐获得最佳性能）
- **CPU** — 始终可用

### 灯光组分量通道会增加多少开销？

主要开销是输出文件大小增加（更多 EXR 层）。渲染时间开销很小。

## ViewLayer 管理器

### 为什么它以单独窗口打开？

ViewLayer 管理器使用 Qt（通过 BQt），无法直接嵌入 Blender 的原生 UI 架构中。作为独立的顶级窗口运行是有意设计的。

### 什么是 `failed to get blender hwnd` 消息？

这是正常的 BQt 安全模式日志消息。它表示 BQt 正在创建新的 Qt 应用程序窗口而不是包装 Blender 的现有窗口。这是预期行为，不是故障。
