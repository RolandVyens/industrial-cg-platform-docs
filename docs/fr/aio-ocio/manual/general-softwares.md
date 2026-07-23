---
title: "Configuration Générale des Logiciels"
description: "Cette page explique comment intégrer les recettes de configuration AIO-OCIO avec Autodesk Maya, Foundry Nuke, SideFX Houdini, et d'autres applications..."
---
# Configuration Générale des Logiciels

Cette page explique comment intégrer les recettes de configuration **AIO-OCIO** avec Autodesk Maya, Foundry Nuke, SideFX Houdini, et d'autres applications DCC.

---

## **Recettes Prédéfinies**

Le pack de configuration contient quatre recettes optimisées en fonction de votre flux de travail et de votre type de logiciel :

| **Fichier de Config** | **Utilisation Cible** | **Description du Flux de Travail** |
| :--- | :--- | :--- |
| `config_CG_ACEScg.ocio` | Maya, Houdini, 3D générale | Configuration CG par défaut prenant en charge l'espace de rendu ACEScg standard. |
| `config_COMP_ACEScg.ocio` | Nuke, Fusion, logiciels de comp | Optimisé pour les flux de travail de compositing utilisant ACEScg. |
| `config_CG_Lin709.ocio` | Blender, logiciels 3D | Spécialement conçu pour Blender où l'espace de travail colorimétrique est Linear Rec709. |
| `config_COMP_Lin709.ocio` | Nuke, Fusion, logiciels de comp | Conçu pour le compositing de rendus linéaires Rec709 (généralement utilisé avec Blender). |

---

## **Méthodes d'Intégration**

### **Méthode 1 : Variable d'Environnement Système Globale**
La configuration d'une variable d'environnement système est la méthode recommandée pour charger globalement la configuration OCIO pour tous les outils CG compatibles.

1.  Ouvrez les paramètres des **Variables d'environnement** de votre système d'exploitation.
2.  Ajoutez une nouvelle variable système :
    *   **Nom de la variable** : `OCIO`
    *   **Valeur de la variable** : Le chemin absolu vers le fichier `.ocio` de votre choix (ex. `C:\color_management\AIO-OCIO\config_CG_ACEScg.ocio`).
3.  Redémarrez votre application DCC pour hériter de la variable.

### **Méthode 2 : Configuration Spécifique au Logiciel**

*   **Autodesk Maya** : Allez dans `Preferences` > `Color Management` > cochez `Use OCIO Configuration` et pointez vers le chemin du fichier config.
*   **Foundry Nuke** : Dans vos paramètres de projet (touche `S`), allez dans l'onglet `Color`, changez `color management` en `OCIO`, et définissez le chemin de fichier dans `OCIO config`.
*   **SideFX Houdini** : Configurez le chemin d'accès via `Edit` > `Color Settings` > `OCIO`.
