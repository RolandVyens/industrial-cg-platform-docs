# 偏好设置与详细配置

本页将详细解释 **Industrial AOV Connector** 偏好设置中的核心功能、性能优化选项及输出管理工具。

---

## **核心功能设置 (Core Function)**

<img width="400" alt="核心功能设置" src="https://github.com/user-attachments/assets/9fa6bb66-417a-4c57-a933-9a5ed51d6764" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Denoise DiffCol / GlossCol / TransCol (颜色通道降噪)**
对平涂纯色通道（`DiffCol` / `GlossCol` / `TransCol` 等颜色 AOV）进行降噪处理，能够有效提升后期合成除法计算的精度。

### 2. **Use Old EXR Layer Naming Convention (旧版 EXR 命名)**
强制使用旧版（兼容 2.4.x 及以下版本）的 EXR 层级命名规范。由于新版层级命名在 Nuke 中具有极佳的可读性，通常建议保持关闭此选项。

### 3. **Only Create Nodes For Enabled Viewlayers (仅为启用层生成节点)**
仅为勾选了 `Use For Rendering` (用于渲染) 的视图层生成合成节点，从而节省合成编辑器的节点空间和生成速度。

### 4. **Auto Optimize Sample Count For Data Layers (自动优化数据层采样)**
启用后，插件在烘焙节点树时会为三维数据层应用 **采样率覆盖 (sample count override)**。由于数据通道（如法线、坐标）不需要Beauty层那么高的采样数，这能极大缩短整体渲染时间。您可以在此处设定数据层专用的采样数。

### 5. **Custom Name Suffix (自定义名称后缀)**
允许在输出的文件名称中添加自定义后缀。例如使用 `#` 来定义帧数占位符（帧补零）。同时，插件支持在渲染时自动解析的动态变量占位符：
*   `$scene$` — 场景名称
*   `$file$` — Blender工程文件名
*   `$camera$` — 当前激活的摄像机名称
*   `$version$` — 自动匹配版本号（要求您的 blend 工程文件名结尾带有类似 **`v001`** 的版本字符）。

*推荐的后缀搭配：* `$camera$_$version$_###`

### 6. **Node Interval Scale When Arranging (节点间距缩放)**
设置整理节点时的间距比例，用于补偿操作系统的显示缩放。例如在 Windows 开启了 150% (1.5x) 的 DPI 缩放时，将此值设为 `0.67` 可以生成排版完美的节点间距，防止间距过大。

---

## **输出工具设置 (Output Tools)**

<img width="400" alt="输出工具设置" src="https://github.com/user-attachments/assets/ffa908d7-e51f-4367-8544-2ec1629dbe2a" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Default useless renders gather (无用渲染重定向)**
自动将 Blender 默认的常规渲染输出路径修改到工程目录下的 `trash_output` 子文件夹，避免污染您的正式交付目录。

### 2. **Show useless renders clean button (显示无用渲染清理按钮)**
开启后，将在插件面板的 Output Tools 下显示 `Delete Useless Default Renders` 按钮，一键物理删除 `trash_output` 整个垃圾文件夹。

---

## **外观设置 (Appearance)**

<img width="400" alt="外观设置" src="https://github.com/user-attachments/assets/cefe5d71-8107-4109-b097-34c9872092eb" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

用于控制面板各区域的主题配色、显示开关和样式风格。
