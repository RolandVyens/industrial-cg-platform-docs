# General Software Setup

This page explains how to integrate **AIO-OCIO** config recipes with Autodesk Maya, Foundry Nuke, SideFX Houdini, and other DCC applications.

---

## **Pre-made Recipes**

The configuration bundle contains four optimized recipes depending on your workflow and software type:

| **Config File** | **Target Usage** | **Workflow Description** |
| :--- | :--- | :--- |
| `config_CG_ACEScg.ocio` | Maya, Houdini, general 3D | Default CG configuration supporting standard ACEScg rendering space. |
| `config_COMP_ACEScg.ocio` | Nuke, Fusion, comp software | Optimized for compositing workflows using ACEScg. |
| `config_CG_Lin709.ocio` | Blender, 3D software | Specifically tailored for Blender where the working color space is Linear Rec709. |
| `config_COMP_Lin709.ocio` | Nuke, Fusion, comp software | Tailored for compositing linear Rec709 renders (most commonly used for Blender pipelines). |

---

## **Integration Methods**

### **Method 1: Global System Environment Variable**
Setting a system environment variable is the recommended way to load the OCIO configuration globally for all compatible CG tools.

1.  Open your OS Environment Variables settings.
2.  Add a new system variable:
    *   **Variable Name**: `OCIO`
    *   **Variable Value**: The absolute path to your chosen `.ocio` file (e.g. `C:\color_management\AIO-OCIO\config_CG_ACEScg.ocio`).
3.  Restart your DCC application to inherit the variable.

### **Method 2: Software-Specific Setup**

*   **Autodesk Maya**: Navigate to `Preferences` > `Color Management` > check `Use OCIO Configuration` and point to the config path.
*   **Foundry Nuke**: In your project settings (`S` key), go to the `Color` tab, change `color management` to `OCIO`, and set the `OCIO config` to point to the file path.
*   **SideFX Houdini**: Set color settings via `Edit` > `Color Settings` > `OCIO` path.
