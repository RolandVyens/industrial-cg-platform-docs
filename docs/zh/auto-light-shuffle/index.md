---
title: "Auto Light Shuffle — Nuke Blender 灯光 AOV 自动分流重组工具"
description: "面向 Foundry Nuke 的 Blender 灯光组 AOV 自动分流与分层合并脚本。支持直接/间接分量通道、分量级通道及 Combined 回退。"
cover: "/features/lightgroups.webp"
---
# Auto Light Shuffle

**Auto Light Shuffle** 可根据多通道 EXR 中的 Blender 灯光组 AOV，在 Foundry Nuke 中自动构建整洁的合成节点树。它能从选中的 `Read` 节点自动识别可用通道，创建所需的 `Shuffle` 节点，为每个灯光组构建均衡的多层 `Merge` 节点树，并最终汇总输出 Beauty 画面。

---

## 核心功能

- **自动识别灯光组**：直接从选中的 `Read` 节点中检测所有灯光组通道。
- **精细度优先匹配**：为每个灯光组自动优先选择最精细的 AOV 表达形式：
  1. 直接与间接材质分量通道（`<lobe>_direct_<light>`、`<lobe>_indirect_<light>`）；
  2. 材质分量通道（`<lobe>_<light>`、`RGBA_<lobe>_<light>`）；
  3. 合并回退通道（`Combined_<light>`、`RGBA_<light>`）。
- **均衡多层 Merge 树**：在每个灯光组内部构建均衡的多级 `Merge` 树，并通过清晰的 Beauty 合并链汇总所有灯光组。
- **整洁排版与 Backdrop**：按 AOV 精细度与字母顺序自动排序，并为每个灯光组生成带标签的灰色 `Backdrop`。
- **完整保留 Alpha**：通过 `Copy` 与 `Premult` 节点自动保留原始 Alpha 通道。
- **Nuke 版本兼容**：优先使用 `Shuffle2` 与 `Merge2`（支持旧版节点回退），并基于 Nuke 实际报告的 GUI 尺寸进行节点对齐。

---

## 支持的 AOV 命名格式

| 格式 | 示例 | 优先级 |
| --- | --- | --- |
| `<lobe>_direct_<light>` | `diffuse_direct_key` | 最高 |
| `<lobe>_indirect_<light>` | `glossy_indirect_fill` | 最高 |
| `<lobe>_<light>` | `transmission_rim` | 中 |
| `RGBA_<lobe>_<light>` | `RGBA_specular_rim` | 中（兼容旧版） |
| `Combined_<light>` | `Combined_key` | 回退 |
| `RGBA_<light>` | `RGBA_emissive` | 回退 |

支持的分量（lobe）包括：`diffuse`、`glossy`、`specular`、`transmission` 与 `volume`。

---

## 运行环境要求

- 支持 Python 的 Foundry Nuke（已在 Nuke 13 与 14 中验证使用）。
- 包含灯光组 AOV 的 Blender 多通道 EXR 文件（可通过 [Lightgroup Lobe Passes](/zh/industrial-cg-platform/features/lightgroup-lobe-passes) 或 [Industrial Light AOV Splitter](/zh/industrial-light-aov-splitter/) 导出）。

---

## 安装步骤

1. 从 [GitHub 仓库](https://github.com/RolandVyens/auto-light-shuffle) 将以下文件复制到 Nuke 用户目录下的 `python` 文件夹中：

   ```text
   nuke_blender_autoaov.py
   settings_default.py
   ```

   常见路径：

   ```text
   Windows: %USERPROFILE%\.nuke\python
   macOS:   ~/.nuke/python
   Linux:   ~/.nuke/python
   ```

2. 在 `~/.nuke/init.py` 中添加 Python 搜索路径：

   ```python
   import nuke

   nuke.pluginAddPath("./python")
   ```

3. 在 `~/.nuke/menu.py` 中注册菜单命令：

   ```python
   import nuke_blender_autoaov

   industrial_menu = nuke.menu("Nuke").addMenu("Industrial")
   industrial_menu.addCommand(
       "Auto Light Shuffle",
       "nuke_blender_autoaov.shuffle_and_combine_light_groups()",
   )
   ```

4. 重启 Nuke。

---

## 使用方法

1. 创建或选中包含 Blender 多通道 EXR 的 `Read` 节点（执行时仅选中一个源节点）。
2. 在顶部菜单栏点击 **Industrial > Auto Light Shuffle**。
3. 脚本将自动生成 `Unpremult`、`Dot` 总线、`Shuffle`、`Merge`、`Backdrop`、`Copy` 与 `Premult` 节点网络。

### 生成的节点布局

```text
Read
 |
 +-- original alpha branch --------------------------------------+
 |                                                               |
 Unpremult                                                       |
 |                                                               |
 input Dot rail                                                  |
 |                                                               |
 Shuffle nodes grouped by light                                  |
 |                                                               |
 balanced Merge trees inside labelled Backdrops                  |
 |                                                               |
 Beauty Merge chain                                              |
 |                                                               |
 Copy <----------------------------------------------------------+
 |
 Premult
```

最终的 Beauty 合并链会放置在各个灯光组 `Backdrop` 外部，保持视图清晰。

---

## 自定义配置

默认配置位于 `settings_default.py`，你也可以在调用时传入完整的覆盖字典：

```python
import nuke_blender_autoaov

nuke_blender_autoaov.shuffle_and_combine_light_groups(
    {
        "selection_groups": [
            ["diffuse", "glossy", "specular", "transmission", "volume"],
            ["Combined"],
        ],
        "node_spacing": {"x": 180, "y": 320},
        "debug": True,
    }
)
```

默认布局参数：
- 水平间距：`150`
- 垂直间距：`280`
- 带 64 号字号标签的灰色 `Backdrop`

---

## 开源仓库与相关文档

- **GitHub 仓库**：[RolandVyens/auto-light-shuffle](https://github.com/RolandVyens/auto-light-shuffle)
- **问题反馈**：[GitHub Issues](https://github.com/RolandVyens/auto-light-shuffle/issues)
- [灯光组分量通道 (Lightgroup Lobe Passes)](/zh/industrial-cg-platform/features/lightgroup-lobe-passes) — Cycles 原生每灯光组直接/间接分量通道。
- [Industrial Light AOV Splitter](/zh/industrial-light-aov-splitter/) — 用于将灯光组拆分为分量 AOV 的 Blender 插件。
- [Industrial AOV Connector](/zh/industrial-aov-connector/) — 自动化 Blender EXR 输出节点树构建插件。
