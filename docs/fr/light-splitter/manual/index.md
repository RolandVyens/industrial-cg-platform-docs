# Manuel de l'Industrial Light AOV Splitter

Bienvenue dans le manuel d'utilisation officiel du module **Industrial Light AOV Splitter** pour Blender.

## **Ordre de lecture recommandé**

1. [Utilisation & Directives](./usage) — Configuration des collections de lumières, contraintes et tests.
2. [Intégration Auto-Shuffle dans Nuke](./nuke-setup) — Configuration du script compagnon dans Nuke.

---

> [!TIP]
> **Télécharger le manuel complet en français**
> Vous pouvez télécharger la version PDF complète du manuel rédigé en français ici : [Industrial-Light-AOV-Splitter_manual_French.pdf](/Industrial-Light-AOV-Splitter_manual_French.pdf).

---

> 💡 **Concept de conception de base :**
> Dans les pipelines VFX professionnels, les lumières sont divisées en groupes de lumières individuels afin que les compositeurs puissent ajuster l'exposition, les couleurs et la balance. Les groupes de lumières traditionnels exportent des images RGBA fusionnées.
> Ce diviseur décompose chaque groupe de lumières en **quatre canaux de composants indépendants** (Diffuse, Specular, Transmission, Volume), offrant un contrôle total en post-production.
