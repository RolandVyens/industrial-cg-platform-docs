# AIO-OCIO

**AIO-OCIO** est un profil de configuration de gestion des couleurs OpenColorIO (OCIO) unifié et multi-en-un, optimisé pour les pipelines de VFX et de CG multi-logiciels modernes.

En unifiant les transformations de couleurs sur les principaux outils de création de contenu numérique (DCC), il garantit que vos rendus, projections de textures et éléments de compositing soient 100 % identiques, que vous soyez dans Blender, Autodesk Maya, SideFX Houdini ou Foundry Nuke.

---

## Fonctionnalités clés

### 🎨 Parité multi-applications
*   **Transformations de vue unifiées :** Utilisez exactement les mêmes transformations AgX, Filmic ou ACES dans Nuke, Maya, Houdini et Blender.
*   **Compatibilité AgX Punchy :** Portez les configurations populaires "AgX Punchy" et "AgX Look" de Blender directement vers d'autres DCC comme Maya et Houdini.

### 🎬 Espaces colorimétriques de production
*   **Fondation Reconnue :** Basé sur la célèbre configuration OCIO *PixelManager* de Genco Uney, avec des optimisations supplémentaires pour les studios.
*   **Affichages Pris en Charge :** Prise en charge complète du mappage des fenêtres d'affichage pour les écrans standards de l'industrie, notamment **sRGB**, **Display P3** et **Rec.1886**.
*   **Support ACES & Large Gamut :** Prise en charge complète des profils modernes à large gamme et linéaires (ACEScg, ACES2065-1, Rec.2020, sRGB Linear).
*   **Espaces Caméra Log :** Profils de caméra standards intégrés (Arri LogC3/LogC4, RED Log3G10, Sony S-Log3) pour une intégration fluide des plaques de tournage réelles.

---

## Installation et intégration

### Prérequis
*   Votre logiciel / DCC doit prendre en charge **OCIO 2.0** ou supérieur pour exploiter cette configuration.

### Intégration dans Blender
1.  Téléchargez les derniers fichiers depuis le dépôt.
2.  Allez dans le répertoire de gestion des couleurs de votre installation Blender (par exemple, `5.2/colormanagement/`).
3.  Remplacez le fichier `config.ocio` par défaut et ses dossiers associés, ou définissez votre variable d'environnement :
    ```bash
    OCIO=/path/to/AIO-OCIO/config.ocio
    ```

### Intégration dans Maya
1.  Ouvrez Maya, allez dans `Windows` > `Settings/Preferences` > `Preferences`.
2.  Sous `Color Management`, activez la gestion des couleurs et choisissez **Use OCIO Configuration**.
3.  Pointez le chemin vers le fichier `config.ocio` du dossier AIO-OCIO.

### Intégration dans Nuke
1.  Ouvrez Nuke, ouvrez les paramètres du projet (raccourci `S`).
2.  Dans l'onglet `Color`, modifiez la gestion des couleurs de `Nuke` à `OCIO`.
3.  Définissez OCIO Config sur `custom` et pointez vers le fichier `config.ocio`.

---

## Liens du dépôt

*   **Dépôt GitHub :** [RolandVyens/AIO-OCIO](https://github.com/RolandVyens/AIO-OCIO)
