# Configuration G茅n茅rale des Logiciels

Cette page explique comment int茅grer les recettes de configuration **AIO-OCIO** avec Autodesk Maya, Foundry Nuke, SideFX Houdini, et d'autres applications DCC.

---

## **Recettes Pr茅d茅finies**

Le pack de configuration contient quatre recettes optimis茅es en fonction de votre flux de travail et de votre type de logiciel :

| **Fichier de Config** | **Utilisation Cible** | **Description du Flux de Travail** |
| :--- | :--- | :--- |
| `config_CG_ACEScg.ocio` | Maya, Houdini, 3D g茅n茅rale | Configuration CG par d茅faut prenant en charge l'espace de rendu ACEScg standard. |
| `config_COMP_ACEScg.ocio` | Nuke, Fusion, logiciels de comp | Optimis茅 pour les flux de travail de compositing utilisant ACEScg. |
| `config_CG_Lin709.ocio` | Blender, logiciels 3D | Sp茅cialement con莽u pour Blender o霉 l'espace de travail colorim茅trique est Linear Rec709. |
| `config_COMP_Lin709.ocio` | Nuke, Fusion, logiciels de comp | Con莽u pour le compositing de rendus lin茅aires Rec709 (g茅n茅ralement utilis茅 avec Blender). |

---

## **M茅thodes d'Int茅gration**

### **M茅thode 1 : Variable d'Environnement Syst猫me Globale**
La configuration d'une variable d'environnement syst猫me est la m茅thode recommand茅e pour charger globalement la configuration OCIO pour tous les outils CG compatibles.

1.  Ouvrez les param猫tres des **Variables d'environnement** de votre syst猫me d'exploitation.
2.  Ajoutez une nouvelle variable syst猫me :
    *   **Nom de la variable** : `OCIO`
    *   **Valeur de la variable** : Le chemin absolu vers le fichier `.ocio` de votre choix (ex. `C:\color_management\AIO-OCIO\config_CG_ACEScg.ocio`).
3.  Red茅marrez votre application DCC pour h茅riter de la variable.

### **M茅thode 2 : Configuration Sp茅cifique au Logiciel**

*   **Autodesk Maya** : Allez dans `Preferences` > `Color Management` > cochez `Use OCIO Configuration` et pointez vers le chemin du fichier config.
*   **Foundry Nuke** : Dans vos param猫tres de projet (touche `S`), allez dans l'onglet `Color`, changez `color management` en `OCIO`, et d茅finissez le chemin de fichier dans `OCIO config`.
*   **SideFX Houdini** : Configurez le chemin d'acc猫s via `Edit` > `Color Settings` > `OCIO`.
