# Industrial Light AOV Splitter

**Industrial Light AOV Splitter** is a specialized production utility add-on for Blender that automates the setup, separation, and materialization of individual light group AOV (Arbitrary Output Variable) passes. 

Instead of exporting generic merged lightgroups, this tool automatically splits lightgroups into their core shader components (**diffuse, specular, transmission, and volume**; e.g. `diffuse_env`, `specular_env`), giving compositing artists complete control over relighting in post-production.

---

## Key Features

### 馃挕 Automated Light Group Split
*   **One-Click Split:** Automatically breaks down your active Blender Light Groups into detailed component channels.
*   **Lobe-Level Granularity:** Materializes passes for diffuse, specular, transmission, and volume components per light group.
*   **Nuke Compatibility:** Designed to easily build composite networks in Foundry Nuke, Autodesk Flame, or Blackmagic Fusion.

### 馃幁 Integration with AOV Connector
*   Designed to work seamlessly with the **Industrial AOV Connector** add-on to automatically write these split components to EXR file trees.
*   Includes a companion Python script (`nuke_blender_autoaov.py`) in the repository to automatically shuffle and combine these light group AOV channels inside Nuke.

---

## Workflow & Naming Constraints

To ensure the splitter operates correctly, please follow these guidelines:
1.  **UI Level:** The tool operates at the **View Layer** level.
2.  **Collection Naming:** Lights must be placed inside collections starting with the prefix **`lgt_`** (e.g. `lgt_character`, `lgt_background`).
3.  **Light Naming:** Lights should be named using **only letters and numbers** (alphanumeric characters). Do **not** use underscores (`_`) in light names.
4.  **Light Duplication:** The plugin automatically handles light reuse by ignoring `.001` suffixes. You can duplicate lights freely without breaking the naming structure.

---

## Installation

### Prerequisites
*   Blender 4.2 LTS or newer.
*   **Recommendation:** Highly recommended to use alongside the **Industrial AOV Connector** add-on.

### Via GitHub Zip
1.  Download the latest release ZIP from the official repository: [Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases).
2.  In Blender, navigate to `Edit` > `Preferences` > `Add-ons` > `Install...`.
3.  Choose the downloaded `.zip` file and activate the add-on.

---

## Repository & Links

*   **GitHub Repository:** [RolandVyens/Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter)
*   **Report Issues:** [GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/issues)
