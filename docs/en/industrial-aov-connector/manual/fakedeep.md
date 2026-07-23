---
title: "Fake Deep & Deep Compositing"
description: "This page explains how to achieve deep compositing using the Fake Deep output workflow from Blender."
---
# Fake Deep & Deep Compositing

This page explains how to achieve deep compositing using the **Fake Deep** output workflow from Blender.

---

## **What is Deep Compositing?**

**Deep Compositing** is an advanced post-production technique in visual effects (VFX) where render passes store multiple depth samples per pixel (including Z-depth, color, and opacity values). 

Unlike traditional "flat" compositing (which only has a single 2D RGBA value per pixel), Deep Compositing allows you to blend overlapping elements, smoke, particles, and transparent surfaces with absolute spatial accuracy. It eliminates the need to render complex holdouts, allows adjusting depth of field post-render, and makes it easy to integrate volumetric effects.

---

## **What is Fake Deep?**

Blender does not natively output deep EXR files with multi-layered depth pixels. **Fake Deep** is a workflow method that maps precise Z-depth data directly to the pixels, using customized shader/material depth overrides to match the exact edges of your beauty pass.

### **Production Limitations & Rules**
1.  **No Motion Blur:** Rendering with in-camera motion blur destroys pixel edge depth values. You should render sharp edges and apply vector-based motion blur in post-production.
2.  **Volumetrics:** Volumes cannot be easily represented by a single layer of Fake Deep depth data, as they require complex depth-span information.
3.  **Intersecting Geometry:** If two meshes intersect closely, the cut lines might wiggle slightly due to limited 32-bit depth precision compared to true multi-sampled deep renders.

---

## **Nuke Deep Compositing Setup**

If you are comfortable with these constraints, follow this step-by-step setup in Nuke:

### Step 1: Shuffle Fake Deep and Alpha
Shuffle the Fake Deep pass and your beauty's alpha channel into a standard RGBA structure:

<img width="600" alt="Nuke Shuffle Node Setup" src="https://github.com/user-attachments/assets/cabc27ab-516c-4aee-b38c-a46d9132cdff" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

Then, run the output through a **Premult** node to clean up the edge pixels.

### Step 2: Shuffle Back to Depth
Shuffle the processed RGBA channels back into the Nuke Depth (`depth.Z`) channel:

<img width="600" alt="Nuke Shuffle Depth Node Setup" src="https://github.com/user-attachments/assets/249b9baa-0936-4c98-b2df-18ed31fc60ed" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### Step 3: Convert to Deep
Connect the output to a **DeepFromImage** node. You now have a fully functional Deep Layer inside Nuke! You can use nodes like `DeepMerge`, `DeepRecolor`, and `DeepWrite` normally.
