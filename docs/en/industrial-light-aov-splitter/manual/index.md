# Industrial Light AOV Splitter Manual

Welcome to the user manual for the **Industrial Light AOV Splitter** add-on for Blender.

## **Recommended Reading Order**

1. [Usage & Guidelines](./usage) 鈥?Setting up light collections, constraints, and testing.
2. [Nuke Auto-Shuffle Integration](./nuke-setup) 鈥?Setting up the companion script inside Nuke.

---

> 馃挕 **Core Design Concept:**
> In professional VFX pipelines, lights are split into individual lightgroups so compositors can dial in exposure, colors, and balance. Traditional lightgroups output merged RGBA images. 
> This splitter breaks down each lightgroup into **four independent component channels** (Diffuse, Specular, Transmission, Volume), providing complete post-production control.
