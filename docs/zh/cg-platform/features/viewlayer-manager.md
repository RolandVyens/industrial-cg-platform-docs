# ViewLayer 管理器

<Badge type="tip" text="已发布" />

## 什么是 ViewLayer 管理器？

ViewLayer 管理器是一个专用的、基于 Qt 的工具窗口，提供了一个直观且全面的界面，用于管理场景 ViewLayer（视图层）、渲染通道（Render Passes）、Shader AOV（着色器 AOV）、灯光组（Lightgroups）以及 Cycles 灯光通道 AOV 控制——全部集中在 Blender 原生属性编辑器之外的单个精简面板中。

它基于 [BQt](https://github.com/techartorg/bqt) 构建，并作为 Blender 系统扩展（Blender System Extension）捆绑发布。

## 为什么使用它？

- **集中管理** — 所有与 ViewLayer 相关的设置都集中在一个窗口中，无需在不同的属性面板和菜单页签中来回跳转。
- **预设系统** — 可以将通道配置保存为命名预设，并一次性应用到多个不同的 ViewLayer 中。
- **批量操作** — 支持在左侧列表中多选 ViewLayer，并同时对其批量应用预设。
- **有组织的通道显示** — 通道被清晰地归类为逻辑类别：数据 (Data)、灯光 (Light)、着色器 (Shader) 以及效果与公用工具 (Effects / Utility)。
- **多语言 UI** — 管理器界面本身支持简体中文、繁体中文和法语的本地化翻译。

## 如何启动？

1. 观察 Blender 界面右上角标题栏，在原生的 `ViewLayer` 选择器旁边。
2. 点击 **ViewLayer Manager** 图标按钮。
3. 管理器将作为独立的顶级 Qt 窗口打开。

::: info
首次点击时，捆绑的 BQt 运行时扩展会在当前会话中自动启用。您无需手动前往偏好设置启用任何扩展。
:::

## 管理器窗口布局

### 左侧面板 — ViewLayer 列表

- 列出当前场景中的所有 ViewLayer。
- 逐行提供直观的 **用于渲染 (Use For Rendering)** 状态开关。
- 提供 **上移 (Up)** / **下移 (Down)** 按钮，可直接重排 ViewLayer 的渲染顺序。
- 支持多选（Ctrl 或 Shift），以便批量应用通道预设。
- 支持直接新建、重命名和删除 ViewLayer。

### 右侧面板 — 详细窗格

编辑当前选中的 ViewLayer 属性，包含以下部分：

#### 通道 (Passes)

按 Blender 原生逻辑进行分组：

| 分组 | 包含内容 |
| --- | --- |
| **数据 (Data)** | 综合 (Combined), 深度 (Z), 迷雾 (Mist), 法线 (Normal), 位置 (Position), 速度矢量 (Vector), UV, 物体索引 (Object Index), 材质索引 (Material Index) 等 |
| **灯光 (Light)** | 漫反射 (Diffuse Direct/Indirect/Color), 光泽 (Glossy), 透射 (Transmission), 体积 (Volume), 自发光 (Emission), 环境背景 (Background), 阴影 (Shadow), 环境光遮蔽 (Ambient Occlusion) |
| **着色器 (Shader)** | 自定义 Shader AOV 列表项 |
| **效果/实用工具 (Effects / Utility)** | 降噪数据 (Denoising Data), 采样数 (Sample Count) |

#### Cryptomatte

针对 Cryptomatte 通道设置的专用管理区域（同时适用于 Eevee 和 Cycles 渲染引擎）。

#### 深度 (Deep)

ViewLayer 级别的 Deep EXR 深度输出开关（由于软件后端要求，此标签特意保持纯英文显示）。

#### 着色器 AOV (Shader AOV)

用于添加和管理自定义着色器 AOV（Shader AOV）实体的单列列表。

#### 灯光组 (Light Groups)

管理和分配给当前 ViewLayer 的灯光组。

#### Cycles 灯光通道 AOV (Cycles Light Pass AOVs)

启用并配置逐灯光组分量通道的输出：
- Diffuse 漫反射 (Direct 直接 / Indirect 间接)
- Glossy 光泽 (Direct 直接 / Indirect 间接)
- Transmission 透射 (Direct 直接 / Indirect 间接)
- Volume 体积 (Direct 直接 / Indirect 间接)

### 预设工具栏

- **保存 (Save)** — 将当前 ViewLayer 的通道设置另存为一个命名的预设。
- **更新 (Update)** — 使用当前设置覆盖和更新现有预设。
- **应用 (Apply)** — 将选中的预设批量应用到左侧列表中所有选中的 ViewLayer。
- **删除 (Delete)** — 移除现有预设。

预设以 JSON 文件的形式安全存储在用户的本地 Blender 扩展资源目录中。

## 渲染引擎自适应可见性

管理器会自动识别当前启用的渲染引擎，并智能显示/隐藏相关的配置区域：

| 区域 | CYCLES 引擎 | EEVEE 引擎 |
| --- | --- | --- |
| Eevee Passes | ❌ | ✅ |
| Cycles Passes | ✅ | ❌ |
| 灯光组 (Light Groups) | ✅ | ❌ |
| Cycles Light Pass AOVs | ✅ | ❌ |
| 着色器 AOV (Shader AOV) | ✅ | ✅ |

## 实时写回 (Live Write-Back)

在管理器中所做的一切属性修改都会**立即**被写回 Blender 中 — 正常编辑属性时不需要点击额外的“应用”或“手动刷新”按钮。管理器在显示及重新获得操作系统焦点时，都会自动与 Blender 进行重新同步。

## 已知行为

- 管理器作为独立的顶级 Qt 窗口运行（不嵌入 Blender Native 窗口中）。
- BQt 运行时在某些情况下可能会输出 `failed to get blender hwnd, creating new window` 日志 — 这属于安全模式路径下的正常行为，并非启动失败，也不会影响任何功能的使用。
- 当前版本仅支持 Windows 平台，Linux 支持正在开发规划中。

## 另请参阅

- [Python 操作器 (API)](/zh/cg-platform/api/python-operators) — `wm.blender_vfx_viewlayer_manager_show` 操作器参考。
- [灯光组分量通道](/zh/cg-platform/features/lightgroup-lobe-passes) — 由管理器的 Cycles Light Pass AOVs 区域控制的分量通道。
- [Blender 手册：视图层](https://docs.blender.org/manual/en/latest/render/layers/view_layer.html) — 标准 Blender 视图层文档。
