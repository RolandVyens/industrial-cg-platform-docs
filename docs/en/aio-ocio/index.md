# AIO-OCIO

**AIO-OCIO** is a unified, all-in-one OpenColorIO (OCIO) color management configuration profile optimized for modern cross-application VFX and CG production pipelines.

By unifying color transformations across major Digital Content Creation (DCC) tools, it ensures that your renders, texture projections, and compositing elements look 100% identical whether you are in Blender, Autodesk Maya, SideFX Houdini, or Foundry Nuke.

---

## Key Features

### 馃帹 Cross-Application Parity
*   **Unified View Transforms:** Use the exact same AgX, Filmic, or ACES rendering transforms in Nuke, Maya, Houdini, and Blender.
*   **AgX Punchy Support:** Port Blender's popular "AgX Punchy" and "AgX Look" configurations directly to other DCCs like Maya and Houdini.

### 馃幀 Production Color Spaces
*   **Acclaimed Foundation:** Built on top of Genco Uney's acclaimed *PixelManager OCIO* configuration, with additional studio optimizations.
*   **Supported Displays:** Full viewport mapping support for industry-standard displays including **sRGB**, **Display P3**, and **Rec.1886**.
*   **ACES & WCG Support:** Complete support for modern wide-gamut and scene-linear profiles (ACEScg, ACES2065-1, Rec.2020, sRGB Linear).
*   **Log Camera Spaces:** Built-in standard camera profiles (Arri LogC3/LogC4, RED Log3G10, Sony S-Log3) for seamless live-action plate integration.

---

## Setup & Integration

### Prerequisites
*   Your software/DCC must support **OCIO 2.0** or newer to utilize this configuration.

### Blender Integration
1.  Download the latest config files from the repository.
2.  Navigate to your Blender installation's color management directory (e.g., `5.2/colormanagement/`).
3.  Replace the default `config.ocio` and data folders, or set your environment variable:
    ```bash
    OCIO=/path/to/AIO-OCIO/config.ocio
    ```

### Maya Integration
1.  Open Maya, go to `Windows` > `Settings/Preferences` > `Preferences`.
2.  Under `Color Management`, enable color management and choose **Use OCIO Configuration**.
3.  Point the path to `config.ocio` from the AIO-OCIO folder.

### Nuke Integration
1.  Open Nuke, open Project Settings (`S` shortcut).
2.  In the `Color` tab, change color management from `Nuke` to `OCIO`.
3.  Set the OCIO Config to `custom` and point to the `config.ocio` file.

---

## Repositories & Links

*   **GitHub Repository:** [RolandVyens/AIO-OCIO](https://github.com/RolandVyens/AIO-OCIO)
