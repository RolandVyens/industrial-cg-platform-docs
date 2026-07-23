---
title: "Fake Deep & Composition Profonde"
description: "Cette page explique comment réaliser une composition profonde (deep compositing) en utilisant le flux de travail de sortie Fake Deep depuis Blender."
---
# Fake Deep & Composition Profonde

Cette page explique comment réaliser une composition profonde (deep compositing) en utilisant le flux de travail de sortie **Fake Deep** depuis Blender.

---

## **Qu'est-ce que la composition profonde ?**

La **composition profonde (Deep Compositing)** est une technique de post-production avancée dans les effets visuels (VFX) où les passes de rendu stockent plusieurs échantillons de profondeur par pixel (y compris la profondeur Z, la couleur et les valeurs d'opacité).

Contrairement à la composition plane traditionnelle (qui ne dispose que d'une seule valeur RGBA 2D par pixel), la composition profonde vous permet de mélanger des éléments superposés, de la fumée, des particules et des surfaces transparentes avec une précision spatiale absolue. Elle élimine le besoin de générer des caches (holdouts) complexes, permet d'ajuster la profondeur de champ après le rendu et facilite l'intégration des effets volumétriques.

---

## **Qu'est-ce que Fake Deep ?**

Blender ne génère pas nativement des fichiers EXR profonds contenant des pixels de profondeur multicouches. Le **Fake Deep** est une méthode de flux de travail qui mappe des données de profondeur Z précises directement sur les pixels, en utilisant des surcharges de profondeur (depth overrides) de shader/matériau personnalisées pour correspondre aux contours exacts de votre passe de rendu Beauty.

### **Limitations et règles de production**
1. **Pas de flou de mouvement (No Motion Blur) :** Le rendu avec flou de mouvement intégré détruit les valeurs de profondeur aux bords des pixels. Vous devez effectuer vos rendus avec des contours nets et appliquer un flou de mouvement vectoriel en post-production.
2. **Effets volumétriques (Volumetrics) :** Les volumes ne peuvent pas être facilement représentés par une seule couche de données de profondeur Fake Deep, car ils nécessitent des informations d'étendue de profondeur complexes.
3. **Géométrie en intersection (Intersecting Geometry) :** Si deux maillages s'intersectent de près, les lignes de coupe peuvent osciller légèrement en raison de la précision limitée de la profondeur 32 bits par rapport aux rendus profonds multi-échantillonnés réels.

---

## **Configuration de la composition profonde dans Nuke**

Si ces contraintes ne vous posent pas de problème, suivez ces étapes de configuration dans Nuke :

### Étape 1 : Shuffle (fusionner/réorganiser) Fake Deep et Alpha
Mélangez la passe Fake Deep et le canal Alpha de votre passe Beauty dans une structure RGBA standard :

<img width="600" alt="Configuration du nœud Shuffle de Nuke" src="https://github.com/user-attachments/assets/cabc27ab-516c-4aee-b38c-a46d9132cdff" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

Ensuite, faites passer la sortie par un nœud **Premult** (prémultiplication) pour nettoyer les pixels de bordure.

### Étape 2 : Shuffle à nouveau vers la profondeur (Depth)
Réorganisez les canaux RGBA traités vers le canal de profondeur de Nuke (`depth.Z`) :

<img width="600" alt="Configuration du nœud Shuffle Depth de Nuke" src="https://github.com/user-attachments/assets/249b9baa-0936-4c98-b2df-18ed31fc60ed" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### Étape 3 : Convertir en Deep
Connectez la sortie à un nœud **DeepFromImage**. Vous disposez maintenant d'un calque profond (Deep Layer) entièrement fonctionnel dans Nuke ! Vous pouvez utiliser les nœuds tels que `DeepMerge`, `DeepRecolor` et `DeepWrite` normalement.
