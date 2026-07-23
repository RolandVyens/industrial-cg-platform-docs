---
title: "AIO-OCIO"
description: "AIO-OCIO 是一个统一的、多合一的 OpenColorIO (OCIO) 色彩管理配置文件，专为现代跨软件 VFX 和 CG 制作管线优化。"
---
# AIO-OCIO

**AIO-OCIO** 是一个统一的、多合一的 OpenColorIO (OCIO) 色彩管理配置文件，专为现代跨软件 VFX 和 CG 制作管线优化。

通过统一主流数字内容创作 (DCC) 工具的色彩空间转换，它能够确保您的渲染图、贴图投影和合成元素在 Blender、Autodesk Maya、SideFX Houdini 或 Foundry Nuke 中看起来 100% 保持一致。

---

## 核心功能

### 🎨 跨软件色彩一致性
*   **统一的视图变换 (View Transforms)**：在 Nuke、Maya、Houdini 和 Blender 中使用完全相同的 AgX、Filmic 或 ACES 渲染变换。
*   **AgX Punchy 跨软件支持**：将 Blender 中广受欢迎的 “AgX Punchy” 和 “AgX Look” 色彩空间直接移植到 Maya、Houdini 等其他 DCC 软件中。

### 🎬 专业电影级色彩空间
*   **坚实基础：** 基于 Genco Uney 著名的 *PixelManager OCIO* 色彩配置进行二次优化。
*   **支持的显示设备：** 完美适配行业标准显示色域，包括 **sRGB**、**Display P3** 以及 **Rec.1886**。
*   **ACES 宽色域：** 全面支持现代宽色域和场景线性配置文件（ACEScg、ACES2065-1、Rec.2020、sRGB Linear）。
*   **专业摄像机曲线：** 内置主流电影摄像机曲线（Arri LogC3/LogC4、RED Log3G10、Sony S-Log3），便于无缝拼合实拍素材。

---

## 配置与集成指南

### 前提条件
*   您使用的 CG 软件或 DCC 工具必须支持 **OCIO 2.0** 或更高版本。

### 在 Blender 中配置
1.  从开源仓库下载最新的色彩配置文件。
2.  前往您的 Blender 安装目录下的色彩管理文件夹（例如 `5.2/colormanagement/`）。
3.  替换默认的 `config.ocio` 文件及数据文件夹，或者直接设置系统环境变量：
    ```bash
    OCIO=/path/to/AIO-OCIO/config.ocio
    ```

### 在 Maya 中配置
1.  打开 Maya，前往 `窗口 (Windows)` > `设置/偏好设置 (Settings/Preferences)` > `偏好设置 (Preferences)`。
2.  在 `色彩管理 (Color Management)` 选项卡中，启用色彩管理并选择 **使用 OCIO 配置 (Use OCIO Configuration)**。
3.  将路径指向下载的 `config.ocio` 文件。

### 在 Nuke 中配置
1.  打开 Nuke，按下快捷键 `S` 打开项目设置（Project Settings）。
2.  在 `色彩 (Color)` 选项卡下，将色彩管理（Color Management）从 `Nuke` 切换为 `OCIO`。
3.  将 OCIO Config 设为 `custom`，并将路径指向 `config.ocio` 文件。

---

## 开源仓库与链接

*   **GitHub 仓库**：[RolandVyens/AIO-OCIO](https://github.com/RolandVyens/AIO-OCIO)
