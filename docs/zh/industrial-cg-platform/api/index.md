# API 参考

本节记录了 Industrial CG Platform 对 Blender 和 Cycles 添加或修改的 C++ 和 Python API 表面。

## 范围

API 参考涵盖五个领域的扩展：

| 领域 | 描述 | 页面 |
| --- | --- | --- |
| **Cycles 内核** | 新的内核胶片字段、通道类型、积分器扩展 | [Cycles 内核扩展](/zh/industrial-cg-platform/api/cycles-kernel) |
| **RNA 属性** | 暴露给 UI 和 Python 的新 ViewLayer、Light 和 World 属性 | [RNA 属性](/zh/industrial-cg-platform/api/rna-properties) |
| **Python 操作器** | 新的 Blender 操作器和共享的 Qt 运行时 API | [Python 操作器](/zh/industrial-cg-platform/api/python-operators) |
| **bQt 集成** | 底层集成架构、系统扩展打包规范与高级 Qt-Blender 设计模式 | [bQt 使用指南](/zh/industrial-cg-platform/api/bqt-usage) |
| **Pass 与 AOV 系统** | 新通道类型注册、命名约定和回读架构 | [Pass 与 AOV 系统](/zh/industrial-cg-platform/api/pass-system) |

## 约定

- C++ API 参考包含发生更改的源文件路径。
- Python API 参考同时显示 `bpy` 访问路径和操作器 ID。
- 此分支中的所有 API 表面都添加了前缀或命名空间，以避免与上游 Blender 的更改发生冲突。

## 上游兼容性

这些添加的 API 旨在与 Blender 上游保持向前兼容：
- 新的 RNA 属性使用标准的 Blender 属性注册模式。
- 新的通道类型扩展了现有的 Cycles 通道枚举，而不会破坏现有通道。
- `PROP_SEARCH_KEEP_ORDER` 标志是最小的 Blender 核心扩展，不影响现有的搜索行为。
