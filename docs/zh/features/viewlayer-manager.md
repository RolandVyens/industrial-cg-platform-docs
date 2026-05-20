# ViewLayer 管理器

<Badge type="tip" text="已发布" />

## 简介

ViewLayer 管理器是一个专用的基于 Qt 的工具窗口，提供了一个全面的界面，用于管理 ViewLayer、渲染通道、Shader AOV、灯光组和 Cycles 灯光通道 AOV 控制——全部集中在 Blender 原生属性编辑器之外的一个独立面板中。

它基于 [BQt](https://github.com/techartorg/bqt) 构建，作为 Blender 系统扩展（System Extension）捆绑发布。

## 为什么使用它

- **集中管理** — 所有与 ViewLayer 相关的设置集中在一个窗口中，而不是分散在多个属性面板中。
- **预设系统** — 将通道配置保存为预设，并一次性应用到多个 ViewLayer。
- **批量操作** — 在左侧列表中选择多个 ViewLayer，并同时对其应用预设。
- **有组织的通道显示** — 通道被分为逻辑类别：数据、灯光、着色器和效果/实用工具。
- **多语言 UI** — 管理器界面支持简体中文、繁体中文和法语翻译。

## 如何启动

1. 查看 Blender 右上角的标题栏，位于原生的 `ViewLayer` 选择器旁边。
2. 点击 **ViewLayer Manager** 按钮。
3. 管理器作为独立的 Qt 窗口打开。

## 另请参阅

- [Python 操作器 (API)](/zh/api/python-operators) — `wm.blender_vfx_viewlayer_manager_show` 操作器参考。
- [灯光组分量通道](/zh/features/lightgroup-lobe-passes) — 由管理器的 Cycles Light Pass AOVs 部分控制的分量通道。
