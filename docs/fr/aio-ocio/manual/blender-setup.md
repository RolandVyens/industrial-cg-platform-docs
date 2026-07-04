# Configuration de la Gestion des Couleurs dans Blender

Cette page explique comment installer et configurer **AIO-OCIO** dans Blender pour activer des profils d'affichage professionnels tels que sRGB, Display P3 et Rec.1886.

---

## **脡tapes d'Installation**

Blender charge sa configuration de gestion des couleurs depuis un dossier nomm茅 `colormanagement`. Suivez ces 茅tapes pour le remplacer :

### 脡tape 1 : Localiser le R茅pertoire colormanagement
Trouvez le dossier de configuration utilisateur correspondant 脿 votre version de Blender :
*   **Windows** : `C:\Users\<VotreNomUtilisateur>\AppData\Roaming\Blender Foundation\Blender\<Version>\datafiles\colormanagement\`
*   **macOS** : `/Users/<VotreNomUtilisateur>/Library/Application Support/Blender/<Version>/datafiles/colormanagement/`
*   **Linux** : `~/.config/blender/<Version>/datafiles/colormanagement/`

> 馃挕 **Astuce :** Si le dossier `datafiles` ou `colormanagement` n'existe pas, cr茅ez-le manuellement.

### 脡tape 2 : Copier les Fichiers de Configuration
Copiez tout le contenu du dossier AIO-OCIO (y compris les sous-dossiers ACES, BMD, ARRI, etc., les LUTs, et les fichiers `.ocio`) directement dans ce dossier `colormanagement`.

### 脡tape 3 : D茅finir la Configuration par D茅faut
Blender s'attend 脿 ce que le fichier de configuration actif s'appelle exactement `config.ocio`.
1.  Localisez `config_CG_Lin709.ocio` parmi les fichiers copi茅s.
2.  Renommez-le en **`config.ocio`** (remplacez tout fichier existant portant ce nom).

---

## **V茅rification dans Blender**

1.  Lancez Blender et allez dans le panneau **Propri茅t茅s de Rendu** (Render Properties).
2.  Faites d茅filer vers le bas jusqu'脿 la section **Gestion des couleurs** (Color Management).
3.  Vous devriez maintenant voir les profils d'affichage actifs (sRGB, Display P3, Rec.1886) et les options d'affichage de la vue 3D mises 脿 jour.
