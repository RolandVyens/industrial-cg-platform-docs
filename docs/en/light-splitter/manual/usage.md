# Light Splitter Usage & Guidelines

This page explains the production workflow and naming constraints for the **Industrial Light AOV Splitter**.

---

## **Workflow Constraints**

Because Blender stores lightgroups at the View Layer level, the add-on runs per viewlayer. Please follow these conventions for the automatic setup to succeed:

### 1. **Collection Prefixes**
Place all lights you wish to split into scene collections whose names start with the prefix **`lgt_`** (e.g. `lgt_key`, `lgt_fill`, `lgt_rim`). Only enabled collections will be processed.

### 2. **Alphanumeric Light Naming**
Name your lights using **letters and numbers only**. 
> ⚠️ **Important:** Do not use any underscores (`_`) in light names, as the splitter uses underscores to append the component passes (e.g., `diffuse_env`, `specular_env`).

### 3. **Light Duplication & Reusability**
If you want multiple physical lights to share the same lightgroup name, simply duplicate the lights. Blender automatically appends suffixes like `.001` or `.002`. The add-on recognizes and ignores these suffixes, automatically mapping them to the base name group.

---

## **Advanced UI Tools**

### **Large Scale Mode**
If your scene size is extremely large, running viewport verification tests might cause occasional light loss or renderer timeouts. Check **`Large Scale Mode`** in the UI to optimize mesh parsing and prevent connection timeouts.

### **Emissive Objects & World Setup**
Use the quick assign buttons in the properties panel to automatically map:
*   **Emissive Objects**: Scan the scene and assign a custom lightgroup to all meshes with material emission nodes (e.g. Principled BSDF Emission).
*   **World Environment**: Automatically create a separate lightgroup mapping for the world environment map (e.g. HDRI environment).
