# Nuke Auto-Shuffle Setup

The **Industrial Light AOV Splitter** includes a companion script to automatically shuffle and combine split lightgroup passes inside Foundry Nuke.

---

## **Installation Steps**

Follow these steps to integrate the auto-shuffle script into your Nuke environment:

### Step 1: Download the Script
Download the companion python script `nuke_blender_autoaov.py` from the releases section of the repository:
*   👉 [Download nuke_blender_autoaov.py](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases/download/release0.5.0/nuke_blender_autoaov.py)

### Step 2: Move to `.nuke` Directory
Copy the downloaded `nuke_blender_autoaov.py` file to your home `.nuke` directory:
*   **Windows**: `C:\Users\<YourUsername>\.nuke\`
*   **macOS / Linux**: `~/.nuke/`

### Step 3: Register in `menu.py`
Open your `menu.py` file inside the `.nuke` folder (create one if it does not exist) and append the following lines of code:

```python
import nuke_blender_autoaov
utilitiesMenu = nuke.menu('Nuke').addMenu('Industrial')
utilitiesMenu.addCommand('Nuke Blender AutoAOV', 'nuke_blender_autoaov.shuffle_and_combine_light_groups()')
```

---

## **Usage in Nuke**

1.  Open Nuke and import your multi-channel EXR render tree (containing split light groups like `diffuse_rim`, `specular_rim`, etc.).
2.  Select the Read node.
3.  Go to the top menu bar, click **`Industrial`** > **`Nuke Blender AutoAOV`**.
4.  The script will automatically generate a node branch that shuffles out all lightgroup component passes and merges them correctly to reconstruct the beauty pass.
