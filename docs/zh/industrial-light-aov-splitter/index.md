# Industrial Light AOV Splitter

**Industrial Light AOV Splitter** 是一个专为 Blender 打造的高级流程辅助插件，用于自动配置、分离和材质化灯光组（Light Group）的单个 AOV（自定义输出通道）通道。

相比于导出常规的合并灯光组，该工具能够自动将各个灯光组拆分为基础的着色分量通道（包括：**漫反射 diffuse、高光 specular、透射 transmission 和体积 volume**，例如：`diffuse_env`, `specular_env`），为后期合成师提供极佳的灯光重组与重打光控制。

---

## 核心功能

### 💡 自动灯光组拆分
*   **一键式拆分**：自动将 Blender 中激活的灯光组（Light Groups）拆分为详尽的分量通道。
*   **分量级细分**：为每个灯光组提取并输出漫反射（diffuse）、高光（specular）、透射（transmission）和体积（volume）分量。
*   **Nuke 完美兼容**：输出命名和通道格式完全对齐 Nuke、Flame 或 Fusion，方便后期快速拼合 Beauty。

### 🔌 AOV Connector 深度协同
*   可与 **Industrial AOV Connector** 插件无缝协同，自动将拆分出的灯光分量写入多通道 EXR 文件中。
*   提供配套的 Nuke 自动合成脚本 `nuke_blender_autoaov.py`（位于 GitHub 仓库中），可一键在 Nuke 中自动重组拆分出的灯光通道。

---

## 制作流程与命名规范

为了确保拆分工具能够正确识别和工作，请务必遵守以下规范：
1.  **视图层级操作**：该工具完全基于 **视图层 (View Layer)** 级别进行运作。
2.  **集合命名规范**：需要拆分通道的灯光必须放置在以 **`lgt_`** 作为前缀的集合中（例如：`lgt_character`, `lgt_background`）。
3.  **灯光命名规范**：灯光本身的命名应当**仅使用英文字母与数字**（半角字符）。请**不要**在灯光命名中使用下划线 (`_`)。
4.  **复制灯光处理**：插件能自动处理复制灯光带来的重名后缀。你可以直接进行复制生成 `.001` 等后缀，插件会自动忽略该后缀还原至原本的命名进行拆分。

---

## 安装说明

### 前提条件
*   Blender 4.2 LTS 或更高版本。
*   **生态推荐：** 强烈建议与 **Industrial AOV Connector** 插件一起配合使用，可完美承接导出的多通道 EXR 结构。

### 离线安装步骤
1.  前往 GitHub 仓库下载最新的 release ZIP 包：[Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases)。
2.  在 Blender 中打开 `编辑 (Edit)` > `偏好设置 (Preferences)` > `插件 (Add-ons)` > `安装... (Install...)`。
3.  选择下载好的 `.zip` 文件并勾选启用。

---

## 开源仓库与链接

*   **GitHub 仓库**：[RolandVyens/Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter)
*   **问题反馈**：[GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/issues)
