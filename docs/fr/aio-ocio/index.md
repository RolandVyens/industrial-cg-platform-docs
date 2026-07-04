# AIO-OCIO

**AIO-OCIO** est un profil de configuration de gestion des couleurs OpenColorIO (OCIO) unifi茅 et multi-en-un, optimis茅 pour les pipelines de VFX et de CG multi-logiciels modernes.

En unifiant les transformations de couleurs sur les principaux outils de cr茅ation de contenu num茅rique (DCC), il garantit que vos rendus, projections de textures et 茅l茅ments de compositing soient 100 % identiques, que vous soyez dans Blender, Autodesk Maya, SideFX Houdini ou Foundry Nuke.

---

## Fonctionnalit茅s cl茅s

### 馃帹 Parit茅 multi-applications
*   **Transformations de vue unifi茅es :** Utilisez exactement les m锚mes transformations AgX, Filmic ou ACES dans Nuke, Maya, Houdini et Blender.
*   **Compatibilit茅 AgX Punchy :** Portez les configurations populaires "AgX Punchy" et "AgX Look" de Blender directement vers d'autres DCC comme Maya et Houdini.

### 馃幀 Espaces colorim茅triques de production
*   **Fondation Reconnue :** Bas茅 sur la c茅l猫bre configuration OCIO *PixelManager* de Genco Uney, avec des optimisations suppl茅mentaires pour les studios.
*   **Affichages Pris en Charge :** Prise en charge compl猫te du mappage des fen锚tres d'affichage pour les 茅crans standards de l'industrie, notamment **sRGB**, **Display P3** et **Rec.1886**.
*   **Support ACES & Large Gamut :** Prise en charge compl猫te des profils modernes 脿 large gamme et lin茅aires (ACEScg, ACES2065-1, Rec.2020, sRGB Linear).
*   **Espaces Cam茅ra Log :** Profils de cam茅ra standards int茅gr茅s (Arri LogC3/LogC4, RED Log3G10, Sony S-Log3) pour une int茅gration fluide des plaques de tournage r茅elles.

---

## Installation et int茅gration

### Pr茅requis
*   Votre logiciel / DCC doit prendre en charge **OCIO 2.0** ou sup茅rieur pour exploiter cette configuration.

### Int茅gration dans Blender
1.  T茅l茅chargez les derniers fichiers depuis le d茅p么t.
2.  Allez dans le r茅pertoire de gestion des couleurs de votre installation Blender (par exemple, `5.2/colormanagement/`).
3.  Remplacez le fichier `config.ocio` par d茅faut et ses dossiers associ茅s, ou d茅finissez votre variable d'environnement :
    ```bash
    OCIO=/path/to/AIO-OCIO/config.ocio
    ```

### Int茅gration dans Maya
1.  Ouvrez Maya, allez dans `Windows` > `Settings/Preferences` > `Preferences`.
2.  Sous `Color Management`, activez la gestion des couleurs et choisissez **Use OCIO Configuration**.
3.  Pointez le chemin vers le fichier `config.ocio` du dossier AIO-OCIO.

### Int茅gration dans Nuke
1.  Ouvrez Nuke, ouvrez les param猫tres du projet (raccourci `S`).
2.  Dans l'onglet `Color`, modifiez la gestion des couleurs de `Nuke` 脿 `OCIO`.
3.  D茅finissez OCIO Config sur `custom` et pointez vers le fichier `config.ocio`.

---

## Liens du d茅p么t

*   **D茅p么t GitHub :** [RolandVyens/AIO-OCIO](https://github.com/RolandVyens/AIO-OCIO)
