---
title: Deep EXR Output and EXR Overscan Pipeline Integration / Deep EXR 与 EXR Overscan 的渲染管线融合
date: 2026-06-23
author: Roland Vyens
summary: A technical review of the C++ implementation for Cycles EXR Overscan and native Deep EXR compositing pipelines. / 剖析 Cycles C++ 渲染内核关于 EXR 溢画幅及原生深度通道输出的设计实践与管线融合。
tags:
  - cycles
  - render-kernel
---

# Deep EXR Output and EXR Overscan Pipeline Integration

In professional VFX shot pipelines, two rendering features are highly critical for downstream compositing:
1. **EXR Overscan**: Rendering extra canvas space outside the active camera framing boundary to prevent border stretching during camera stabilization, lens distortion correction, or transformations in Nuke.
2. **Deep EXR**: Writing individual sub-pixel sample depths instead of flattened Z-buffers, allowing compositors to perform seamless deep merges on complex volumes, hair, and edges without edge aliasing or manual holdout mattes.

In our branch, we implemented both directly within Cycles' C++ kernel code.

### Cycles C++ Kernel Overscan Mapping
To support overscan, the camera projection matrix must be expanded dynamically. For example, in `camera.cpp` (`Camera::update`):

```cpp
/* Adjust film translation and scale based on overscan margins */
float overscan_scale_x = 1.0f + (overscan_left + overscan_right) / (float)width;
float overscan_scale_y = 1.0f + (overscan_bottom + overscan_top) / (float)height;

projection_matrix[0][0] /= overscan_scale_x;
projection_matrix[1][1] /= overscan_scale_y;
```

This ensures the image resolution remains standard for the `displayWindow` while enlarging the active pixel `dataWindow` to wrap the padded regions, keeping OpenEXR metadata compliant with Nuke's parsing engine.

---

# Deep EXR 与 EXR Overscan 的渲染管线融合

在影视特效制作中，有两个渲染底层特性对于后期合成至关重要：
1. **EXR Overscan（溢画幅）**：在相机取景框外额外渲染一定的像素边，防止后期在 Nuke 中做去畸变、防抖或位移变换时边缘拉伸露底。
2. **Deep EXR（深度合成图）**：写入逐采样的深度数据而不是扁平的单层 Z-Buffer，使合成师可以对毛发、半透明烟雾进行完美的深度拼合，消除抗锯齿边缘黑边。

我们在 Industrial CG Platform 中，将这两个特性深植于 Cycles 的 C++ 渲染内核与 OpenEXR 写入器中。

### C++ 内核投影矩阵扩展
为了让 Cycles 渲染出多余的像素，我们必须在 Cycles 准备相机投影时动态放宽视口变换。例如在 `camera.cpp` 的 `Camera::update` 阶段，通过以下逻辑调整相机参数：

```cpp
/* 根据溢画幅边距调整投影缩放 */
float overscan_scale_x = 1.0f + (overscan_left + overscan_right) / (float)width;
float overscan_scale_y = 1.0f + (overscan_bottom + overscan_top) / (float)height;

projection_matrix[0][0] /= overscan_scale_x;
projection_matrix[1][1] /= overscan_scale_y;
```

这样做的好处是完美的保留了相机的透视中心，同时将 Nuke 合成所需的 `displayWindow`（交付分辨率）与 `dataWindow`（实际包含溢画幅的渲染画布）正确写入 OpenEXR 头信息中。
