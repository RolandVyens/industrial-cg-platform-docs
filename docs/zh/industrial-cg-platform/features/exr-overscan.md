---
title: 如何在 Blender 中渲染真实的 EXR 溢画幅 (Overscan) 且不改变相机取景
head:
  - - meta
    - name: description
      content: "学习如何在 Blender Cycles 中渲染真正的 EXR Overscan，完美保留 displayWindow 元数据，为 Nuke 镜头畸变工作流提供支持。"
description: "EXR Overscan（溢画幅）是 Industrial CG Platform 中的一项渲染功能，它允许 Blender Cycles 渲染引擎在标准相机画幅大小之外计算额外的像素边缘。"
---
# EXR Overscan 溢画幅

<Badge type="tip" text="已发布" />

## 功能介绍

EXR Overscan（溢画幅）是 Industrial CG Platform 中的一项渲染功能，它允许 Blender Cycles 渲染引擎在标准相机画幅大小之外计算额外的像素边缘。

当导出为 OpenEXR 时，渲染引擎会将标准的交付分辨率保留在 EXR `displayWindow`（显示窗口）元数据中，同时将较大的溢画幅画布边界写入 `dataWindow`（数据窗口）元数据。这保证了在不拉伸交付宽高比或缩放裁剪画幅的前提下，将多余的边缘像素保存到文件中。

## 为什么使用它

- **下游 VFX 画面缓冲** — 满足标准 VFX 管线的要求，为合成软件中的镜头反畸变、模拟相机抖动以及 2D/3D 运动跟踪提供画幅外的边缘像素缓冲。
- **防止边缘拉伸** — 避免在运动镜头平移、旋转或投影图像时产生黑边或像素插值拉伸。

## 如何启用

溢画幅设置位于 **输出属性 (Output Properties)** 选项卡的 **Overscan** 面板中（直接位于 **Format** 面板下方）。

1. 将 **渲染引擎 (Render Engine)** 设置为 `Cycles`。
2. 禁用 Format 面板下的 **Render Region**（当渲染区域处于激活状态时，溢画幅会被禁用）。
3. 将活动的文件格式设置为 `OpenEXR`、`OpenEXR Multilayer` 或 `Deep OpenEXR`。
4. 在 **Overscan** 面板中配置您的溢画幅边缘大小。

::: info 启用限制条件
在以下情况下，Overscan 面板将呈灰色不可用状态：
- 选择了非 Cycles 渲染引擎（Eevee 或 Workbench）。
- 启用了 **Render Region**。
:::

## 属性参数

| 参数 | 尺寸模式 | 默认值 | 描述 |
| --- | --- | --- | --- |
| **Mode** | 枚举 | `PERCENTAGE` | 尺寸计算方式：`PERCENTAGE`（百分比）或 `PIXELS`（像素）。 |
| **Amount / Size** | 百分比 | `0.0` | 溢画幅扩展百分比（例如输入 `10.0` 代表四周各扩展 10%）。 |
| **Left / Right / Bottom / Top** | 像素 | `0` | 四个边缘各自的具体扩展像素（仅在 `PIXELS` 模式下可用）。 |

## EXR 窗口语义

为了确保下游合成软件（如 Foundry Nuke 或 Blackmagic Fusion）正确解析带有溢画幅的 EXR 文件，Industrial CG Platform 遵循官方 OpenEXR 窗口标准：

- **显示窗口 (`displayWindow`)**：定义交付的图像格式大小（例如 `1920x1080`，原点为 `(0, 0)`）。这决定了合成工具中项目的分辨率。
- **数据窗口 (`dataWindow`)**：定义文件实际存储像素的包围盒。对于 `1920x1080` 画幅四周增加 10% 的溢画幅，数据窗口会扩展为 `2304x1464`，其偏移原点为 `(-192, -192)`。

```
                    数据窗口 (溢画幅实际存储边界: 2304 x 1464)
    ┌──────────────────────────────────────────────────────────────────┐
    │                                                                  │
    │  (-192, -192)                                                    │
    │         显示窗口 (交付分辨率边界: 1920 x 1080)                     │
    │         ┌──────────────────────────────────────────────┐         │
    │         │                                              │         │
    │         │ (0, 0)                                       │         │
    │         │                                              │         │
    │         │                                              │         │
    │         │                                              │         │
    │         │                                  (1920, 1080)│         │
    │         └──────────────────────────────────────────────┘         │
    │                                                                  │
    │                                                      (2112, 1272)│
    └──────────────────────────────────────────────────────────────────┘
```

当导入到合成软件中时，文件会自动对齐到项目的标准交付格式，而视口外的溢画幅像素将被保留在 Bounding Box（BBox）中，供后期反畸变和防抖使用。

## 已知限制

- **无实时视口渲染** — 3D 视图相机框之外的区域没有实时的渲染像素输出，视口溢画幅仅显示代表溢画幅边界的安全框线。
- **与渲染区域互斥** — 启用 Render Region（渲染区域）会自动停用溢画幅输出和视口引导线。
- **仅支持 Cycles** — 非 Cycles 渲染引擎不支持此功能。
- **合成器节点限制** — 在合成器中通过 `File Output` 节点输出时，节点组中必须包含一个处于激活状态的 `Group Output` 节点，以触发溢画幅窗口元数据的正常传递。

## 另请参阅

- [RNA 属性 (API 参考)](/zh/industrial-cg-platform/api/rna-properties) — 用于通过 Python 脚本配置溢画幅的 API 属性。
- [安装指南](/zh/industrial-cg-platform/guide/installation) — 关于 OptiX 着色器缓存隔离的详细信息。
