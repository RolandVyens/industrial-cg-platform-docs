# Industrial AOV Connector

**Industrial AOV Connector** 是一个专为 Blender 打造的高级开源插件，旨在为专业的影视特效（VFX）与合成流程简化并自动化自定义输出通道（AOV）和渲染文件输出节点的配置。

通过自动构建复杂的合成器节点树和文件输出节点，它在 Blender 的 3D 渲染与 Foundry Nuke 等专业合成软件之间搭建起高效的桥梁。

---

## 核心功能

### 🔌 自动合成器输出管理
*   **零手动配置**：根据当前激活的渲染层通道，自动生成完整的文件输出节点树（`File Output` 节点）。
*   **智能降噪连接**：自动在合成树中路由并接入降噪节点（如 OpenImageDenoise），输出干净的降噪通道与噪点通道。
*   **多视图层（ViewLayer）支持**：原生处理多个视图层，系统化映射每个层的渲染输出路径。

### 🎭 自定义材质与灯光 AOV
*   支持基于材质的自定义 AOV 配置。
*   将灯光组（Light Group）渲染通道直接映射到单独的输出通道中。
*   支持混合渲染管线，将标准 Passes 与用户自定义的 AOV 进行统一输出。

### 🎬 VFX 流程对齐
*   将数据通道（如运动矢量 Vector、法线 Normal、位置 Position）进行格式化，使其遵循 Nuke 的命名规范与通道标准。
*   生成高质量、支持抗锯齿的深度（$Z$）通道和世界坐标位置（$P$）通道。
*   为轻量化合成工作流提供“伪深度”（Fake Deep）通道选项。

---

## 面板位置

启用插件后，您可以在 Blender 的下方位置找到该插件的控制面板：
> 📌 **属性面板 (Properties) → 视图层 (View Layer)** 选项卡

---

## 安装与快速上手

### 前提条件
*   Blender 4.2 LTS 或更高版本。
*   **生态搭配推荐：** 强烈建议搭配定制的 [Industrial CG Platform](/zh/industrial-cg-platform/) 渲染分支使用，以获得最佳的灯光材质 AOV 以及 Cycles 原生 Deep EXR 深度图输出支持。

### 通过官方扩展平台安装（推荐）
1.  打开 Blender，前往 `编辑 (Edit)` > `偏好设置 (Preferences)` > `获取扩展 (Get Extensions)`。
2.  在搜索栏中输入 `Industrial AOV Connector`。
3.  点击 **安装 (Install)**。

### 通过 GitHub 离线安装
1.  前往 GitHub 仓库下载最新的 ZIP 压缩包：[Industrial-AOV-Connector](https://github.com/RolandVyens/Industrial-AOV-Connector/releases)。
2.  在 Blender 中前往 `偏好设置 (Preferences)` > `插件 (Add-ons)` > `安装... (Install...)`。
3.  选择下载好的 `.zip` 文件，并勾选启用该插件。

---

## 开源协议与链接

*   **开源协议：** GNU General Public License v3.0 (GPL-3.0)
*   **GitHub 仓库**：[RolandVyens/Industrial-AOV-Connector](https://github.com/RolandVyens/Industrial-AOV-Connector)
*   **问题反馈**：[GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-AOV-Connector/issues)
