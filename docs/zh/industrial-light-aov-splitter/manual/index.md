# Industrial Light AOV Splitter 用户手册

欢迎阅读 Blender 插件 **Industrial Light AOV Splitter** 的官方用户手册。

## **推荐阅读顺序**

1. [使用说明与规范](./usage) — 了解如何配置灯光集合、命名规则以及视窗测试。
2. [Nuke 自动合成集成](./nuke-setup) — 了解如何在 Nuke 后期合成软件中配置自动分流/拼合脚本。

---

> 💡 **核心设计概念：**
> 在专业的特效（VFX）管线中，通常需要将灯光单独输出为灯光组（Light Group），以便后期合成师进行精确调光。
> 传统的灯光组仅输出合并的 RGBA 图像。而本插件能将每个灯光组进一步自动拆分为 **4 个独立的着色分量通道**（漫反射 Diffuse、高光 Specular、透射 Transmission、体积 Volume），实现极佳的后期重打光控制。
