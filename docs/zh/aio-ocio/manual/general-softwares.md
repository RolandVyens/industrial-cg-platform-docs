---
title: "通用软件色彩管理配置"
description: "本页面介绍如何将 AIO-OCIO 预制的色彩配置文件整合到 Autodesk Maya、Foundry Nuke、SideFX Houdini 等主流 DCC 创作软件中。"
---
# 通用软件色彩管理配置

本页面介绍如何将 **AIO-OCIO** 预制的色彩配置文件整合到 Autodesk Maya、Foundry Nuke、SideFX Houdini 等主流 DCC 创作软件中。

---

## **预制配置文件（配方）**

AIO-OCIO 针对不同的软件角色和流程提供了四个不同的 `.ocio` 配置文件：

| **配置文件** | **推荐软件/用途** | **色彩流向说明** |
| :--- | :--- | :--- |
| `config_CG_ACEScg.ocio` | Maya, Houdini 等三维软件 | 适用于原生以 ACEScg 作为渲染工作色彩空间的通用 CG 制作环境。 |
| `config_COMP_ACEScg.ocio` | Nuke, Fusion 等合成软件 | 专为合成阶段进行了调光优化的 ACEScg 工作流配置。 |
| `config_CG_Lin709.ocio` | Blender 等三维软件 | 专为工作空间为 Linear Rec709 的 Blender 深度对齐流程量身定制。 |
| `config_COMP_Lin709.ocio` | Nuke, Fusion 等合成软件 | 适用于后期合成线性 Rec709 渲染图的工作流（主要用于配合 Blender 渲染管线）。 |

---

## **配置方式**

### **方法一：配置全局系统环境变量（推荐）**
这是最推荐的配置方式，可以一键为系统中安装的所有支持 OCIO 的 CG 和合成工具应用统一的色彩配置：

1.  打开您操作系统的 **系统环境变量** 设置窗口。
2.  新建一个系统变量：
    *   **变量名**：`OCIO`
    *   **变量值**：您选择的 `.ocio` 配置文件的绝对路径（例如：`C:\color_management\AIO-OCIO\config_CG_ACEScg.ocio`）。
3.  保存并重新启动您的三维/合成软件即可自动继承该色彩空间。

### **方法二：在各软件内部手动指定**

*   **Autodesk Maya**：前往 `Preferences` > `Color Management` > 勾选 `Use OCIO Configuration` 并指定 `.ocio` 文件路径。
*   **Foundry Nuke**：在项目设置窗口（按 `S` 键）中，前往 `Color` 选项卡，将 `color management` 更改为 `OCIO`，并在 `OCIO config` 中填入文件路径。
*   **SideFX Houdini**：通过顶部 `Edit` > `Color Settings` > `OCIO` 中指定配置。
