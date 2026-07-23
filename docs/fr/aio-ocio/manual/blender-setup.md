---
title: "Configuration de la Gestion des Couleurs dans Blender"
description: "Cette page explique comment installer et configurer AIO-OCIO dans Blender pour activer des profils d'affichage professionnels tels que sRGB, Display P..."
---
# Configuration de la Gestion des Couleurs dans Blender

Cette page explique comment installer et configurer **AIO-OCIO** dans Blender pour activer des profils d'affichage professionnels tels que sRGB, Display P3 et Rec.1886.

---

## **Étapes d'Installation**

Blender charge sa configuration de gestion des couleurs depuis un dossier nommé `colormanagement`. Suivez ces étapes pour le remplacer :

### Étape 1 : Localiser le Répertoire colormanagement
Trouvez le dossier de configuration utilisateur correspondant à votre version de Blender :
*   **Windows** : `C:\Users\<VotreNomUtilisateur>\AppData\Roaming\Blender Foundation\Blender\<Version>\datafiles\colormanagement\`
*   **macOS** : `/Users/<VotreNomUtilisateur>/Library/Application Support/Blender/<Version>/datafiles/colormanagement/`
*   **Linux** : `~/.config/blender/<Version>/datafiles/colormanagement/`

> 💡 **Astuce :** Si le dossier `datafiles` ou `colormanagement` n'existe pas, créez-le manuellement.

### Étape 2 : Copier les Fichiers de Configuration
Copiez tout le contenu du dossier AIO-OCIO (y compris les sous-dossiers ACES, BMD, ARRI, etc., les LUTs, et les fichiers `.ocio`) directement dans ce dossier `colormanagement`.

### Étape 3 : Définir la Configuration par Défaut
Blender s'attend à ce que le fichier de configuration actif s'appelle exactement `config.ocio`.
1.  Localisez `config_CG_Lin709.ocio` parmi les fichiers copiés.
2.  Renommez-le en **`config.ocio`** (remplacez tout fichier existant portant ce nom).

---

## **Vérification dans Blender**

1.  Lancez Blender et allez dans le panneau **Propriétés de Rendu** (Render Properties).
2.  Faites défiler vers le bas jusqu'à la section **Gestion des couleurs** (Color Management).
3.  Vous devriez maintenant voir les profils d'affichage actifs (sRGB, Display P3, Rec.1886) et les options d'affichage de la vue 3D mises à jour.
