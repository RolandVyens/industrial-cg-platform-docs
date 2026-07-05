# Blender Color Management Setup

This page explains how to install and configure **AIO-OCIO** inside Blender to enable professional color spaces like sRGB, Display P3, and Rec.1886.

---

## **Installation Steps**

Blender loads its color management configuration from a folder named `colormanagement`. Follow these steps to override it:

### Step 1: Locate colormanagement Directory
Locate the user configuration folder for your Blender version:
*   **Windows**: `C:\Users\<YourUsername>\AppData\Roaming\Blender Foundation\Blender\<Version>\datafiles\colormanagement\`
*   **macOS**: `/Users/<YourUsername>/Library/Application Support/Blender/<Version>/datafiles/colormanagement/`
*   **Linux**: `~/.config/blender/<Version>/datafiles/colormanagement/`

> 💡 **Tip:** If the `datafiles` or `colormanagement` directory does not exist, create them manually.

### Step 2: Copy Config Files
Copy all the contents of the AIO-OCIO folder (including the ACES, BMD, ARRI, etc. subfolders, LUTs, and `.ocio` files) directly into this `colormanagement` folder.

### Step 3: Set Default Config
Blender expects the active color configuration file to be named exactly `config.ocio`.
1.  Locate `config_CG_Lin709.ocio` inside the copied files.
2.  Rename it to **`config.ocio`** (replace any existing file of that name).

---

## **Verification in Blender**

1.  Launch Blender and navigate to the **Render Properties** panel.
2.  Scroll down to the **Color Management** section.
3.  You should now see the active display profiles (sRGB, Display P3, Rec.1886) and the updated viewport shading options.
