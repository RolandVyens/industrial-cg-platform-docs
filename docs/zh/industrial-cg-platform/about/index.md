---
title: "关于项目"
description: "Blender 已经是一个非常强大的创作工具，但 VFX 生产通常需要的不只是视口里的漂亮结果。"
---
# 关于项目

## 为什么需要这个平台？

Blender 已经是一个非常强大的创作工具，但 VFX 生产通常需要的不只是视口里的漂亮结果。

一个真正的镜头制作流程需要能够无缝导入合成软件的渲染数据，需要能够在每个镜头中保持可控的灯光调整能力，还需要对艺术家、技术总监（TD）和渲染农场都有意义的输出行为。

Industrial CG Platform 的存在就是为了推动 Blender 向这个方向走得更远，同时保持与上游 Blender 足够近的距离，以确保未来的可维护性。

## 开发路线图 (Roadmap)

计划中的 VFX 和面向生产的开发方向包括：

- 仅影响间接光（indirect-light-only）的物体属性，用于更精准的打光控制
- 集合（Collection）和物体级别的材质覆盖（Material Override）工作流
- 类似于 `aiFog` 的世界环境雾行为，专注于直接光用例
- 更深入的基于镜头渲染和合成工作流的文档

## 支持与赞助 (Sponsor)

Industrial CG Platform 是作为专注于生产的开源研发项目进行开发的。

如果这个项目对你的工作室、课程、制作流程或个人创作有所帮助，你的赞助将有助于加快开发进度。赞助对于资助那些很难以“小插件”形式存在的底层功能尤其重要，例如：渲染输出行为、深度数据、Qt 运行时打包、灯光通道设计以及面向流程的文档编写。

- 在 [Patreon](https://www.patreon.com/cw/RolandVyens) 上支持开发者
- 在 [爱发电 (Afdian)](https://www.ifdian.net/a/mogubobi2) 上支持开发者
- 给这个仓库点个 Star，并将其分享给需要更强生产流程的 Blender 和 VFX 艺术家们

## 上游关系

Industrial CG Platform 衍生自 Blender。
Blender 仍然是该应用程序、文教生态系统以及大部分开发工作流的上游基础。

- [blender.org](https://www.blender.org)
- [Blender 官方手册](https://docs.blender.org/manual/en/latest/index.html)
- [Blender 开发者门户](https://developer.blender.org/docs/)

## 致谢 (Credits)

Industrial CG Platform 由 Roland Vyens 创建和主导开发，其中开发、文档、打包和研究工作借助了 Codex 和 Claude 等 AI 辅助工作流的加速。

这些工具是项目背后工作流程的一部分，但平台的开发方向、功能选择、发布决策以及分支维护仍然完全由项目方主导。

项目也感谢 MoonRay 项目；我们在这个分支里探索的一些渲染侧实现方式，参考了他们公开呈现出的部分实现思路。

## 许可证 (License)

Industrial CG Platform 核心应用程序遵循 Blender 的 GPL 许可模式，此外它还搭载了一个包含其他第三方组件的 bQt 运行时扩展。

- 衍生自 Blender 的应用程序代码仍受 Blender License (GNU GPL v3 or later) 保护，个别文件有时可能使用不同但兼容的许可证。
- 搭载的 Qt 运行时扩展包含第三方包，例如 `bqt`、`QtPy`、`PySide6`、`PySide6_Essentials`、`PySide6_Addons`、`shiboken6`、`packaging` 和 `blender-qt-stylesheet`。
- 这些附带组件带有它们自己的上游许可证，包括 MPL-2.0、MIT、Apache-2.0、BSD-2-Clause、仅限 LGPL-3.0、仅限 GPL-2.0 和仅限 GPL-3.0。

有关 Blender 的核心许可证详细信息，请参阅 [blender.org/about/license](https://www.blender.org/about/license)。
