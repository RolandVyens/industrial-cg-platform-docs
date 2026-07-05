# 高级模式

本页将详细介绍切换至 **Advanced Mode** (高级模式) 后所解锁的细分功能与工作流。

---

## **高级面板配置**

<img width="300" alt="高级模式面板" src="https://github.com/user-attachments/assets/42ba84fc-4f39-4c9d-a890-b028c910fd01" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Use Advanced Mode (使用高级模式)**
勾选后，插件将切换进入高级模式。此时基础模式下的“Main Config”预设将被忽略，从而暴露最底层的细分参数控制。

### 2. **EXR Codec (EXR 压缩编码)**
定义不同渲染层级在写入 EXR 文件时所采用的压缩算法。

| **压缩算法** | **详细说明** |
| :--- | :--- |
| **ZIP** | 无损。兼顾了高压缩率与相对较快的读取速度。行业通用首选。 |
| **PIZ** | 无损。对噪点较大或颗粒感明显的图层压缩率最高，但读取速度较慢。 |
| **RLE** | 无损。读写速度极快，但生成的文件体积会明显大于其他无损方式。 |
| **ZIPS** | 无损。压缩率与 ZIP 相同，但在 Nuke 等合成软件中单扫描线回放速度快近 40%。强烈推荐使用此格式。 |
| **PXR24** | 有损。将 32 位浮点数压缩为 24 位，不影响 16 位和 8 位。不适用于 Cryptomatte 节点，但适合普通数据层以缩减文件体积。 |
| **DWAA / B** | 有损。对 Beauty 画面具有极佳的压缩率和细节保留。DWAA 按照像素块进行压缩，DWAB 按照扫描线包进行压缩。 |
| **NONE** | 不压缩。 |

> ⚠️ **重要提示：** Cryptomatte (材质/物体ID) 通道必须使用**无损**压缩方式（如 ZIP、ZIPS、PIZ），使用有损压缩（如 DWAA）会导致ID边缘反走样数据损坏、无法正常提取遮罩。

### 3. **Independent DATA Layer Config (独立数据层配置)**
此项为高级核心功能，允许在场景中将数据通道的采样和可见性与Beauty渲染图层完全解耦，进行单独配置。

---

## **独立数据图层 (Independent DATA Layer)**

<img width="300" alt="独立数据层 UI" src="https://github.com/user-attachments/assets/5a197960-a39e-4bdb-a4eb-de761e92fe09" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

开启 **`Use Independent DATA Layer`** 选项后，常规的视图渲染图层将不再产生 **DATA**（三维空间数据，如深度、位置、法线等）输出，所有的三维数据图层必须从专门的“DATA Layer”输出。插件会通过命名前缀/后缀（例如 `-_-exP_` 或 `_DATA`）来智能识别数据层。

### **实际生产用例**
假设您的场景中包含大范围的体积雾效果。当您尝试渲染世界空间位置（Position）或深度（Depth）通道时，雾气本身会给这些空间数据层带来严重的噪点和断层，导致后期三维合成失败。
通过使用 **Independent DATA Layer**，您可以在数据专属图层中通过隐藏集合（Collection）来过滤掉体积雾对象。此时，该层渲染出的 Depth、Normals、Pworld 都会保持干净、清爽且无体积雾噪点，而在Beauty图层中依旧保留雾的视效。

### 1. **`Make A DATA Layer` 按钮**
在右上角弹出一个快捷菜单，专门用于创建数据专属的视图图层。该按钮实质上是 Blender 原生 `Add View Layer` 按钮的重构版，包含了定制的 `Copy Settings` (复制设置) 和 `New` (新建)。

### 2. **`Convert To DATA Layer` 按钮**
将当前的视图图层重命名，添加 `-_-exP_` 和 `_DATA` 标记，使其转化为插件可识别的数据专属层。

### 3. **DATA Layer Material Override (数据层材质覆盖)**
自动为该图层设置**材质通道覆盖 (AOV Material Override)**，并自动创建您选择的 AOV 通道。目前支持 4 种 AOV 空间数据输出：
*   **Antialiased Pworld** (抗锯齿世界坐标位置)
*   **Pref** (静态参考世界坐标)
*   **Depth / Z** (抗锯齿深度)
*   **Fake DEEP** (深度合成Fake Deep通道)

> 💡 **小贴士：** 要想让 **Pref** (参考位置) 正确工作，您必须在物体属性的 Shape Keys 下勾选开启 **`rest position`** 选项，从而锁定角色的静态骨骼基础坐标。

### 4. **DEEP From Image Z**
将 Blender 默认的 Z 深度转换为 1/Z 格式，从而可以直接与 Nuke 的 `Deep From Image` 节点对接。因为存在抗锯齿，此方法非常适合在不带有三维运动模糊（Motion Blur）的图层边缘上工作。
