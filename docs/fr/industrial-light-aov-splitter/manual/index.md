# Manuel de l'Industrial Light AOV Splitter

Bienvenue dans le manuel d'utilisation officiel du module **Industrial Light AOV Splitter** pour Blender.

## **Ordre de lecture recommand茅**

1. [Utilisation & Directives](./usage) 鈥?Configuration des collections de lumi猫res, contraintes et tests.
2. [Int茅gration Auto-Shuffle dans Nuke](./nuke-setup) 鈥?Configuration du script compagnon dans Nuke.

---

> [!TIP]
> **T茅l茅charger le manuel complet en fran莽ais**
> Vous pouvez t茅l茅charger la version PDF compl猫te du manuel r茅dig茅 en fran莽ais ici : [Industrial-Light-AOV-Splitter_manual_French.pdf](/Industrial-Light-AOV-Splitter_manual_French.pdf).

---

> 馃挕 **Concept de conception de base :**
> Dans les pipelines VFX professionnels, les lumi猫res sont divis茅es en groupes de lumi猫res individuels afin que les compositeurs puissent ajuster l'exposition, les couleurs et la balance. Les groupes de lumi猫res traditionnels exportent des images RGBA fusionn茅es.
> Ce diviseur d茅compose chaque groupe de lumi猫res en **quatre canaux de composants ind茅pendants** (Diffuse, Specular, Transmission, Volume), offrant un contr么le total en post-production.
