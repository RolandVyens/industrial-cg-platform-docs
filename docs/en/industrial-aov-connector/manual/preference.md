# Preferences & Configurations

This page explains the core settings, performance optimizations, and output tools available in the preferences of the **Industrial AOV Connector**.

---

## **Core Function Settings**

<img width="400" alt="Core Function Preferences" src="https://github.com/user-attachments/assets/9fa6bb66-417a-4c57-a933-9a5ed51d6764" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Denoise DiffCol / GlossCol / TransCol**
Applies denoising filters to the flat color passes (`DiffCol`, `GlossCol`, `TransCol`). This can help improve detail fidelity and reduce division precision artifacts in post-production.

### 2. **Use Old EXR Layer Naming Convention**
Forces the plugin to use the legacy EXR layer naming convention (compatible with version 2.4.x and below). Keeping this off is recommended for Nuke, as the new naming convention is much cleaner and easier to read.

### 3. **Only Create Nodes For Enabled Viewlayers**
When active, the plugin ignores viewlayers that have their `Use for Rendering` checkbox turned off in the View Layer properties, saving node space and build time.

### 4. **Auto Optimize Sample Count For Data Layers**
Automatically overrides the sample count for data layers when generating nodes to speed up rendering. You can configure a specific sample limit (e.g., lower samples for utility passes like Position and Normals).

### 5. **Custom Name Suffix**
Allows you to append custom text to the generated files. For example, use `#` to customize the frame padding format. The plugin also supports dynamic tokens that evaluate at render time:
*   `$scene$` — Scene Name
*   `$file$` — Blend File Name
*   `$camera$` — Active Camera Name
*   `$version$` — Evaluates the active version number (looks for a suffix like `v001` at the end of the blend file name).

*Example configuration:* `$camera$_$version$_###`

### 6. **Node Interval Scale When Arranging**
Adjusts the spacing between nodes when running the `Arrange Nodes` command. This helps compensate for system-wide UI scaling (e.g., on Windows with a 1.5x display scale, setting this to `0.67` generates a perfectly spaced nodetree).

---

## **Output Tools Settings**

<img width="400" alt="Output Tools Settings" src="https://github.com/user-attachments/assets/ffa908d7-e51f-4367-8544-2ec1629dbe2a" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Default Useless Renders Gather**
Automatically changes Blender's default render output path to a `trash_output` subfolder, keeping your actual production directories clean.

### 2. **Show Useless Renders Clean Button**
Exposes the `Delete Useless Default Renders` button in the Output Tools UI for easy folder purging.

---

## **Appearance Settings**

<img width="400" alt="Appearance Settings" src="https://github.com/user-attachments/assets/cefe5d71-8107-4109-b097-34c9872092eb" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

Adjusts UI elements, color-coding, and custom panel themes.
