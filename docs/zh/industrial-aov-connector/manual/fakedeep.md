# Fake Deep 与深度合成

本页面将向您介绍如何使用 Blender 输出的 **Fake Deep** 工作流来实现深度合成。

---

## **什么是深度合成？**

**深度合成（Deep Compositing）** 是视觉特效（VFX）中一种先进的后期合成技术，其渲染图层在每个像素上存储了多个深度采样点（包含 Z 深度、颜色和透明度/不透明度数值）。

与传统的仅包含单一 2D RGBA 像素值的“平面”合成不同，深度合成允许您以绝对的空间精度来混合重叠的元素、烟雾、粒子和透明表面。它消除了渲染复杂的遮罩（Holdout）的需要，支持在渲染后调整景深，并能够非常轻松地整合体积特效。

---

## **什么是 Fake Deep？**

Blender 原生并不支持输出包含多层深度像素的 Deep EXR 文件。**Fake Deep**（伪深度）是一种将精确的 Z 深度数据直接映射到像素上的工作流方法，它通过自定义着色器/材质的深度覆盖（Depth Override），来匹配 Beauty 渲染图的精确边缘。

### **制作限制与规则**
1. **无运动模糊（No Motion Blur）：** 带有摄像机运动模糊的渲染会破坏像素边缘的深度值。您应该渲染清晰的边缘，并在后期合成中应用基于矢量的运动模糊。
2. **体积特效（Volumetrics）：** 体积很难用单层的 Fake Deep 深度数据来表示，因为它们需要复杂的深度范围信息。
3. **相交几何体（Intersecting Geometry）：** 如果两个网格靠得非常近或相交，由于 32 位深度精度的限制，切线可能会产生轻微的抖动（相比于真实的多采样深度渲染）。

---

## **Nuke 中的深度合成设置**

如果您对这些限制有所了解，可以按照以下步骤在 Nuke 中进行设置：

### 步骤 1：Shuffle（通道重组）Fake Deep 和 Alpha
将 Fake Deep 通道和 Beauty 图的 Alpha 通道 Shuffle（重组）成标准的 RGBA 结构：

<img width="600" alt="Nuke Shuffle 节点设置" src="https://github.com/user-attachments/assets/cabc27ab-516c-4aee-b38c-a46d9132cdff" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

然后，将输出连接到一个 **Premult**（预乘）节点以清除边缘像素。

### 步骤 2：Shuffle 回 Depth
将处理后的 RGBA 通道重新 Shuffle 回 Nuke 的 Depth (`depth.Z`) 通道：

<img width="600" alt="Nuke Shuffle Depth 节点设置" src="https://github.com/user-attachments/assets/249b9baa-0936-4c98-b2df-18ed31fc60ed" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 步骤 3：转换为 Deep
将输出连接到 **DeepFromImage** 节点。现在，您在 Nuke 中就拥有了一个功能完整的 Deep 图层！您可以像往常一样使用 `DeepMerge`、`DeepRecolor` 和 `DeepWrite` 等节点。
