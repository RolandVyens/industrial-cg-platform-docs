---
title: "Blender 色彩管理配置手册"
description: "本页面将介绍如何在 Blender 中安装和应用 AIO-OCIO 配置文件，以实现与行业接轨的 sRGB, Display P3, Rec.1886 显示转换。"
---
# Blender 色彩管理配置手册

本页面将介绍如何在 Blender 中安装和应用 **AIO-OCIO** 配置文件，以实现与行业接轨的 sRGB, Display P3, Rec.1886 显示转换。

---

## **安装步骤**

Blender 的默认色彩管理机制是通过读取软件目录下的 `colormanagement` 文件夹来实现的。请按照以下步骤进行覆盖：

### 步骤 1：定位本地 colormanagement 路径
找到您当前使用的 Blender 版本的本地用户配置路径：
*   **Windows 路径**：`C:\Users\<您的用户名>\AppData\Roaming\Blender Foundation\Blender\<版本号>\datafiles\colormanagement\`
*   **macOS 路径**：`/Users/<您的用户名>/Library/Application Support/Blender/<版本号>/datafiles/colormanagement/`
*   **Linux 路径**：`~/.config/blender/<版本号>/datafiles/colormanagement/`

> 💡 **提示：** 如果以上路径中的 `datafiles` 或 `colormanagement` 文件夹不存在，请手动新建它们。

### 步骤 2：拷贝配置文件
将 AIO-OCIO 文件夹内的所有内容（包含 ACES, BMD, ARRI 等子目录，以及所有的 `.ocio` 文件和 LUTs 资源）直接拷贝到上述的 `colormanagement` 文件夹中。

### 步骤 3：设置默认配置文件
Blender 原生仅会读取名为 `config.ocio` 的色彩管理描述文件：
1.  在拷贝过来的文件中，找到 `config_CG_Lin709.ocio` 文件。
2.  将其重命名为 **`config.ocio`**（直接覆盖已有的同名文件）。

---

## **在 Blender 中进行确认**

1.  启动 Blender，打开右侧的 **渲染属性 (Render Properties)** 面板。
2.  向下拉找到 **色彩管理 (Color Management)** 选项卡并展开。
3.  此时您应当能查看到新的显示器渲染配置选项（如 sRGB, Display P3, Rec.1886），以及配套对齐的视图显示变换选项。
