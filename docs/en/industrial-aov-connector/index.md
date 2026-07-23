---
title: "Industrial AOV Connector"
description: "Industrial AOV Connector is an advanced open-source add-on for Blender designed to streamline and automate the setup of Arbitrary Output Variables (AO..."
---
# Industrial AOV Connector

**Industrial AOV Connector** is an advanced open-source add-on for Blender designed to streamline and automate the setup of Arbitrary Output Variables (AOVs) and render output file nodes for professional VFX and compositing pipelines. 

By automating the construction of complex compositor node trees and file output nodes, it bridges the gap between Blender's 3D rendering and professional compositing software like Foundry Nuke.

---

## Key Features

### 🔌 Automated Compositor Output Management
*   **Zero Manual Setup:** Automatically generates output node trees (`File Output` nodes) based on active render passes.
*   **Smart Denoising:** Automatically injects and routes denoising nodes (such as OpenImageDenoise) into your compositing tree.
*   **Multi-ViewLayer Support:** Handles multiple view layers concurrently, mapping their render output paths systematically.

### 🎭 Custom Material & Light AOVs
*   Supports material-based custom AOV setups.
*   Maps light-group-based AOVs directly to separate output channels.
*   Supports hybrid render paths that mix standard passes and user-defined AOVs.

### 🎬 VFX Pipeline Alignment
*   Converts and formats data passes (such as vector velocity, normals, and position) into Nuke-compliant naming conventions and formats.
*   Generates high-quality, anti-aliased Depth ($Z$) and Position ($P$) passes.
*   Provides a "fake" deep channel option for simple deep-style compositing workflows.

---

## Usage & UI Location

Once installed, the add-on panel can be found in the:
> 📌 **Properties Panel → View Layer** tab

---

## Installation & Getting Started

### Prerequisites
*   Blender 4.2 LTS or newer.
*   **Ecosystem Recommendation:** Best paired with the custom [Industrial CG Platform](/en/industrial-cg-platform/) Blender branch for optimal light material AOVs and native deep EXR support.

### Via Blender Extensions (Recommended)
1.  Open Blender and navigate to `Edit` > `Preferences` > `Get Extensions`.
2.  Search for `Industrial AOV Connector`.
3.  Click **Install**.

### Via GitHub Zip
1.  Download the latest release ZIP from the official repository: [Industrial-AOV-Connector](https://github.com/RolandVyens/Industrial-AOV-Connector/releases).
2.  In Blender, go to `Edit` > `Preferences` > `Add-ons` > `Install...`.
3.  Select the downloaded `.zip` file and activate the add-on.

---

## License & Repositories

*   **License:** GNU General Public License v3.0 (GPL-3.0)
*   **GitHub Repository:** [RolandVyens/Industrial-AOV-Connector](https://github.com/RolandVyens/Industrial-AOV-Connector)
*   **Report Issues:** [GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-AOV-Connector/issues)
