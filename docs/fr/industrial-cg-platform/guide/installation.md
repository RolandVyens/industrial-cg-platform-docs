# Installation

## Configuration Requise

| Composant | Configuration |
| --- | --- |
| **OS** | Windows 10/11 x64 |
| **GPU** | GPU NVIDIA avec prise en charge CUDA ou OptiX (recommand茅) |
| **Pilote GPU** | Pilote NVIDIA Game Ready ou Studio le plus r茅cent |
| **RAM** | 16 Go minimum, 32 Go recommand茅s |
| **Espace Disque** | ~1 Go pour le package de publication |

## T茅l茅chargement

1. Rendez-vous sur la page des [GitHub Releases](https://github.com/RolandVyens/industrial-cg-platform/releases).
2. T茅l茅chargez le fichier compress茅 `industrial-cg-platform-X.X.X-YYYY-MM-DD.zip` le plus r茅cent.
3. V茅rifiez l'int茅grit茅 du t茅l茅chargement 脿 l'aide de la cl茅 de hachage SHA256 indiqu茅e dans les notes de version.

## Installation

1. Extrayez le fichier ZIP 脿 l'emplacement de votre choix (ex: `D:\Tools\IndustrialCGPlatform\`).
2. Ex茅cutez le fichier `blender.exe` 脿 partir du dossier extrait.
3. Au premier lancement, vous devriez voir l'茅cran de d茅marrage personnalis茅 aux couleurs de **Industrial CG Platform**.

::: warning
N'extrayez pas le dossier dans un chemin n茅cessitant des privil猫ges administrateur (comme `C:\Program Files\`) si vous souhaitez 茅viter une invite UAC (contr么le de compte d'utilisateur) 脿 chaque lancement. Un dossier accessible en 茅criture utilisateur tel que `D:\Tools\` fonctionne parfaitement.
:::

## V茅rifier l'Installation

Ex茅cutez la commande suivante dans une invite de commande ou PowerShell dans le dossier d'installation pour valider la version :

```powershell
.\blender.exe --version
```

Sortie attendue :

```
Blender 5.2.0-2026-06-16 Industrial CG Platform
```

## Configuration GPU

Pour activer le rendu mat茅riel Cycles GPU avec NVIDIA :

1. Ouvrez **脡dition > Pr茅f茅rences > Syst猫me (Edit > Preferences > System)**.
2. Sous **P茅riph茅riques de rendu Cycles (Cycles Render Devices)**, s茅lectionnez soit :
   - **CUDA** 鈥?Large compatibilit茅 avec le mat茅riel ancien, l茅g猫rement plus lent.
   - **OptiX** 鈥?Lancer de rayons acc茅l茅r茅 mat茅riellement sur les GPU RTX (fortement recommand茅).
3. Cochez votre carte graphique GPU dans la liste des p茅riph茅riques.

## Coexistence avec Blender standard

Industrial CG Platform utilise par d茅faut le m锚me dossier de configuration utilisateur que Blender standard (`%APPDATA%\Blender Foundation\Blender\5.2\`). Si vous pr茅f茅rez conserver des pr茅f茅rences utilisateur compl猫tement distinctes :

- Ajoutez l'argument `--factory-startup` au raccourci de lancement pour d茅marrer sur une session d'usine propre.
- Ou d茅finissez la variable d'environnement `BLENDER_USER_RESOURCES` sur un chemin personnalis茅 d茅di茅 avant le lancement.

## Isolation du cache de shaders OptiX

Afin d'茅viter tout conflit de compilation ou 茅tat de cache obsol猫te entre Industrial CG Platform et les versions officielles de Blender, ce produit isole automatiquement son r茅pertoire de cache Nvidia OptiX par d茅faut.

- **Chemin de cache par d茅faut** :
  `%USERPROFILE%\AppData\Local\IndustrialCGPlatform\Cache\OptiX\optix7cache.db`
- **Surcharge de l'environnement** : Si vous d茅finissez la variable d'environnement syst猫me `OPTIX_CACHE_PATH`, elle remplacera le chemin par d茅faut du produit et restera prioritaire.

## Voir Aussi

- [Compilation depuis les sources](/fr/industrial-cg-platform/guide/building-from-source) 鈥?Compilez vous-m锚me depuis le d茅p么t GitHub.
- [Manuel Blender: Installation sur Windows](https://docs.blender.org/manual/en/latest/getting_started/installing/windows.html) 鈥?Guide d'installation standard de Blender.
