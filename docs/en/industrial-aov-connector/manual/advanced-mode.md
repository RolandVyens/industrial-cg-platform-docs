# Advanced Mode

This page details the advanced features exposed when switching the **Industrial AOV Connector** out of its default basic mode.

---

## **Advanced Settings Panel**

<img width="300" alt="Advanced Mode Panel" src="https://github.com/user-attachments/assets/42ba84fc-4f39-4c9d-a890-b028c910fd01" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Use Advanced Mode**
Switches the addon into Advanced Mode, bypassing the basic presets (`Main Config`) and exposing individual, granular controls.

### 2. **EXR Codec**
Controls the compression codec used for each output class.

| **Codec** | **Description** |
| :--- | :--- |
| **ZIP** | Lossless. Provides a good compression rate and decent read performance. The standard balanced choice. |
| **PIZ** | Lossless. Highest compression rate for grainy or noisy images, but slower to read/write. |
| **RLE** | Lossless. Fastest for read & write operations, but results in significantly larger files. |
| **ZIPS** | Lossless. Matches the compression rate of ZIP, but playbacks up to 40% faster in Nuke due to single-scanline data structures. Highly recommended. |
| **PXR24** | Lossy. Compresses 32-bit floats to 24-bit. Not suitable for Cryptomatte passes, but great for utility data channels to reduce size. |
| **DWAA / B** | Lossy. Extremely high compression rates for beauty renders. DWAA works on block groups; DWAB is optimized for scanline packages. |
| **NONE** | Uncompressed. |

> ⚠️ **Note:** Cryptomatte EXR files must use **lossless** compression methods (such as ZIP, ZIPS, or PIZ) to avoid data corruption.

### 3. **Independent DATA Layer Config**
Decouples utility and data passes from beauty passes, allowing separate sample settings and collections.

---

## **Independent DATA Layers**

<img width="300" alt="Independent Data Layer UI" src="https://github.com/user-attachments/assets/5a197960-a39e-4bdb-a4eb-de761e92fe09" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

When you enable **`Use Independent DATA Layer`**, your standard beauty viewlayers will no longer output data passes (like Depth, Normals, or Position). Instead, they are routed to a separate, dedicated "DATA" viewlayer. 

The addon automatically recognizes data layers by looking for specific prefixes or suffixes in the viewlayer name (e.g. `-_-exP_` or `_DATA`).

### **Production Use Case**
If you have a scene with heavy volume fog (like smoke or atmosphere), rendering data passes (like world position or depth) through it will produce noisy, unusable results. By using an **Independent DATA Layer**, you can hide the volume fog collections in the data viewlayer. The output passes (Z-depth, Normals, P-world) will then render clean and noise-free.

### 1. **`Make A DATA Layer` Button**
Exposes a menu to create a data-exclusive viewlayer. This is a modified version of Blender's default `Add View Layer` function (`Copy Settings` or `New`).

### 2. **`Convert To DATA Layer` Button**
Renames the currently active viewlayer, appending `-_-exP_` and `_DATA` to turn it into a recognized data layer.

### 3. **DATA Layer Material Override**
Applies a specialized utility material override to the active layer, setting up correct outputs for AOV features:
*   **Antialiased Pworld** (World Position)
*   **Pref** (Reference Position)
*   **Depth / Z**
*   **Fake DEEP**

> 💡 **Tip:** To use **Pref** (Reference Position) correctly, make sure to enable the **`rest position`** setting inside your mesh's shape key section.

### 4. **DEEP From Image Z**
Converts depth data to a 1/Z format matching Nuke's native depth structure. This allows you to plug the render directly into a Nuke `Deep From Image` node. Due to standard antialiasing, this is best used on edges without motion blur.
