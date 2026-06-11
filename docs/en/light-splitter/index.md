# Industrial Light AOV Splitter

**Industrial Light AOV Splitter** is a specialized production utility add-on for Blender that automates the setup, separation, and materialization of individual light group AOV (Arbitrary Output Variable) passes. 

Instead of exporting generic merged lightgroups, this tool automatically splits lightgroups into their core shader component components (such as Diffuse Direct, Diffuse Indirect, Glossy Direct, Glossy Indirect, and Environment components), giving compositing artists complete control over relighting in post-production.

---

## Key Features

### 💡 Automated Light Group Split
*   **One-Click Split:** Automatically breaks down your active Blender Light Groups into detailed component channels.
*   **Lobe-Level Granularity:** Materializes passes for diffuse, glossy, transmission, and volume components per light group.
*   **Nuke Compatibility:** Named and formatted to easily build composite networks in Foundry Nuke, Autodesk Flame, or Blackmagic Fusion.

### 🎭 Integration with AOV Connector
*   Designed to work seamlessly with the **Industrial AOV Connector** add-on to automatically write these split components to EXR file trees.
*   Allows custom grouping configurations to easily manage complex interior or exterior scenes.

---

## Installation

### Prerequisites
*   Blender 4.2 LTS or Blender 5.2 (best paired with the **Industrial CG Platform** custom branch).

### Via GitHub Zip
1.  Download the latest release ZIP from the official repository: [Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases).
2.  In Blender, navigate to `Edit` > `Preferences` > `Add-ons` > `Install...`.
3.  Choose the downloaded `.zip` file and activate the add-on.

---

## Repository & Links

*   **GitHub Repository:** [RolandVyens/Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter)
*   **Report Issues:** [GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/issues)
