---
title: "基础模式"
description: "本页将为您介绍 Industrial AOV Connector 的基础功能和界面选项。"
---
# 基础模式

本页将为您介绍 **Industrial AOV Connector** 的基础功能和界面选项。

<img width="300" alt="基础模式面板" src="https://github.com/user-attachments/assets/277fb64b-c135-47f4-9cef-7c9736c90133" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

## **UI 默认选项**

### 1. **Main Config (主配置预设)**
基础模式下的预设配方，决定了生成合成节点时的通道输出结构和文件格式。

### 2. **Output Settings (输出设置)**
包含一系列快速开关，用于在生成节点树前快速微调（例如开启降噪、指定路径等）。

### 3. **`Cook Nodetree` 按钮**
一键为场景中**所有的视图层 (ViewLayers)** 自动生成完整的合成输出节点树（`File Output` 节点）。默认情况下，它会先清空合成器中的现有节点，您可以在偏好设置中关闭此清空动作。

### 4. **`Update Current Viewlayer` 按钮**
仅为**当前选中的视图层**生成输出节点。这属于非破坏性操作，不会影响当前视图层之外的任何已有节点。

### 5. **`Arrange Connector Nodes` 按钮**
一键自动整理并对齐合成器中由本插件生成的节点树，使界面保持整洁。

---

## **UI 隐藏/辅助功能**

### **`Delete Useless Default Renders` 按钮**
默认隐藏。此按钮专门用于清理名为 `trash_output` 的文件夹（该文件夹内包含了 Blender 的默认无用渲染输出）。执行此操作非常安全，因为本插件生成的有效渲染路径绝对不会放在 `trash_output` 目录下。

若要开启此按钮：
1. 点击插件头部栏上的 **`Preference` (偏好设置)**。
2. 找到 **"Output Tools"** (输出工具) 部分。
3. 勾选并开启以下两个选项：
   * **`Default useless renders gather`**：自动将 Blender 默认的渲染输出路径重定向至 `trash_output` 文件夹，方便后续统一清理。
   * **`Show useless renders clean button`**：在输出工具面板上显示“Delete Useless Default Renders”清理按钮。
