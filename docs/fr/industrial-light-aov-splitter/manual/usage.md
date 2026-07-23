---
title: "Utilisation du Diviseur de Lumière & Directives"
description: "Cette page explique le flux de travail de production et les contraintes de nommage pour l'Industrial Light AOV Splitter."
---
# Utilisation du Diviseur de Lumière & Directives

Cette page explique le flux de travail de production et les contraintes de nommage pour l'**Industrial Light AOV Splitter**.

---

## **Contraintes du Flux de Travail**

Blender stockant les groupes de lumières au niveau de la couche de vue (View Layer), le module s'exécute par couche de vue. Veuillez respecter les conventions suivantes pour réussir la configuration automatique :

### 1. **Préfixes de Collections**
Placez toutes les lumières que vous souhaitez diviser dans des collections de scène dont les noms commencent par le préfixe **`lgt_`** (ex. `lgt_key`, `lgt_fill`, `lgt_rim`). Seules les collections activées seront traitées.

### 2. **Nommage Alphanumérique des Lumières**
Nommez vos lumières en utilisant **uniquement des lettres et des chiffres**.
> ⚠️ **Important :** N'utilisez aucun caractère de soulignement (`_`) dans les noms de vos lumières, car le diviseur utilise le trait de soulignement pour suffixer les passes de composants (ex. `diffuse_env`, `specular_env`).

### 3. **Duplication & Réutilisation des Lumières**
Si vous souhaitez que plusieurs lumières physiques partagent le même nom de groupe de lumières, dupliquez-les simplement. Blender ajoute automatiquement des suffixes comme `.001` ou `.002`. Le module reconnaît et ignore ces suffixes, les mappant automatiquement au groupe de nom de base.

---

## **Outils d'Interface Avancés**

### **Mode Grande Échelle (Large Scale Mode)**
Si la taille de votre scène est extrêmement grande, exécuter des tests de vérification de la vue peut provoquer des pertes de lumière ou des dépassements de temps du moteur de rendu. Cochez **`Large Scale Mode`** dans l'interface pour optimiser l'analyse du maillage et éviter les délais de connexion.

### **Configuration des Objets Émissifs & du Monde**
Utilisez les boutons d'attribution rapide dans le panneau des propriétés pour mapper automatiquement :
*   **Objets Émissifs (Emissive Objects)** : Parcourt la scène et attribue un groupe de lumières personnalisé à tous les maillages contenant des nœuds d'émission de matériau (ex. Propriété d'émission du Principled BSDF).
*   **Environnement Mondial (World Environment)** : Crée automatiquement un mappage de groupe de lumières distinct pour la carte d'environnement du monde (ex. Environnement HDRI).
