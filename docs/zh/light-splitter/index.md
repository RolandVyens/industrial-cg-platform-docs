# Industrial Light AOV Splitter

**Industrial Light AOV Splitter** 是一个专为 Blender 打造的高级流程辅助插件，用于自动配置、分离和材质化灯光组（Light Group）的单个 AOV（自定义输出通道）通道。

相比于导出常规的合并灯光组，该工具能够自动将各个灯光组拆分为基础的着色分量通道（例如：漫反射直接光/间接光、高光直接光/间接光及环境光分量），为后期合成师提供极佳的灯光重组与重打光控制。

---

## 核心功能

### 💡 自动灯光组拆分
*   **一键式拆分**：自动将 Blender 中激活的灯光组（Light Groups）拆分为详尽的分量通道。
*   **分量级细分**：为每个灯光组提取并输出漫反射（Diffuse）、高光（Glossy）、透射（Transmission）和体积（Volume）分量。
*   **Nuke 完美兼容**：输出命名和通道格式完全对齐 Nuke、Flame 或 Fusion，方便后期快速拼合 Beauty。

### 🔌 AOV Connector 深度协同
*   可与 **Industrial AOV Connector** 插件无缝协同，自动将拆分出的灯光分量写入多通道 EXR 文件夹树中。
*   支持自定义分组规则，轻松管理大型复杂室内或室外场景。

---

## 安装说明

### 前提条件
*   Blender 4.2 LTS 或更高版本（搭配 **Industrial CG Platform** 定制渲染分支使用效果更佳）。

### 离线安装步骤
1.  前往 GitHub 仓库下载最新的 release ZIP 包：[Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases)。
2.  在 Blender 中打开 `编辑 (Edit)` > `偏好设置 (Preferences)` > `插件 (Add-ons)` > `安装... (Install...)`。
3.  选择下载好的 `.zip` 文件并勾选启用。

---

## 开源仓库与链接

*   **GitHub 仓库**：[RolandVyens/Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter)
*   **问题反馈**：[GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/issues)
