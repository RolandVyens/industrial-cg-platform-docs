---
title: "Nuke 自动通道重组配置"
description: "Industrial Light AOV Splitter 配套提供了一个辅助 Python 脚本，用于在 Foundry Nuke 合成软件中自动对拆分出的灯光通道进行 Shuffle 重组与拼合。"
---
# Nuke 自动通道重组配置

**Industrial Light AOV Splitter** 配套提供了一个辅助 Python 脚本，用于在 Foundry Nuke 合成软件中自动对拆分出的灯光通道进行 Shuffle 重组与拼合。

---

## **安装步骤**

按照以下步骤将自动重组脚本集成到您的 Nuke 工作环境中：

### 步骤 1：下载脚本文件
从官方仓库的 Releases 部分下载名为 `nuke_blender_autoaov.py` 的 Python 脚本：
*   👉 [下载 nuke_blender_autoaov.py](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases/download/release0.5.0/nuke_blender_autoaov.py)

### 步骤 2：拷贝至 `.nuke` 目录
将下载好的 `nuke_blender_autoaov.py` 文件复制到您的用户主目录下的 `.nuke` 文件夹中：
*   **Windows 路径**：`C:\Users\<您的用户名>\.nuke\`
*   **macOS / Linux 路径**：`~/.nuke/`

### 步骤 3：注册到 `menu.py`
在 `.nuke` 文件夹中打开您的 `menu.py` 文件（若不存在，请新建一个），并在文件末尾粘贴以下注册代码：

```python
import nuke_blender_autoaov
utilitiesMenu = nuke.menu('Nuke').addMenu('Industrial')
utilitiesMenu.addCommand('Nuke Blender AutoAOV', 'nuke_blender_autoaov.shuffle_and_combine_light_groups()')
```

---

## **在 Nuke 中使用**

1.  打开 Nuke 并导入您渲染出的多通道 EXR 序列图（其中应当包含诸如 `diffuse_rim`, `specular_rim` 等拆分好的灯光通道）。
2.  选中对应的 Read 节点。
3.  点击顶部菜单栏的 **`Industrial`** > **`Nuke Blender AutoAOV`**。
4.  脚本将自动在下方生成完整的节点分支，分流出所有的灯光分量通道，并将它们重新相加合并以完美重构 Beauty 效果。
