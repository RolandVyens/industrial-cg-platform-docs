# Installation

## Configuration Requise

| Composant | Configuration |
| --- | --- |
| **OS** | Windows 10/11 x64 |
| **GPU** | GPU NVIDIA avec prise en charge CUDA ou OptiX (recommandé) |
| **Pilote GPU** | Pilote NVIDIA Game Ready ou Studio le plus récent |
| **RAM** | 16 Go minimum, 32 Go recommandés |
| **Espace Disque** | ~1 Go pour le package de publication |

## Téléchargement

1. Rendez-vous sur la page des [GitHub Releases](https://github.com/RolandVyens/industrial-cg-platform/releases).
2. Téléchargez le fichier compressé `industrial-cg-platform-X.X.X-YYYY-MM-DD.zip` le plus récent.
3. Vérifiez l'intégrité du téléchargement à l'aide de la clé de hachage SHA256 indiquée dans les notes de version.

## Installation

1. Extrayez le fichier ZIP à l'emplacement de votre choix (ex: `D:\Tools\IndustrialCGPlatform\`).
2. Exécutez le fichier `blender.exe` à partir du dossier extrait.
3. Au premier lancement, vous devriez voir l'écran de démarrage personnalisé aux couleurs de **Industrial CG Platform**.

::: warning
N'extrayez pas le dossier dans un chemin nécessitant des privilèges administrateur (comme `C:\Program Files\`) si vous souhaitez éviter une invite UAC (contrôle de compte d'utilisateur) à chaque lancement. Un dossier accessible en écriture utilisateur tel que `D:\Tools\` fonctionne parfaitement.
:::

## Vérifier l'Installation

Exécutez la commande suivante dans une invite de commande ou PowerShell dans le dossier d'installation pour valider la version :

```powershell
.\blender.exe --version
```

Sortie attendue :

```
Blender 5.2.0-2026-06-16 Industrial CG Platform
```

## Configuration GPU

Pour activer le rendu matériel Cycles GPU avec NVIDIA :

1. Ouvrez **Édition > Préférences > Système (Edit > Preferences > System)**.
2. Sous **Périphériques de rendu Cycles (Cycles Render Devices)**, sélectionnez soit :
   - **CUDA** — Large compatibilité avec le matériel ancien, légèrement plus lent.
   - **OptiX** — Lancer de rayons accéléré matériellement sur les GPU RTX (fortement recommandé).
3. Cochez votre carte graphique GPU dans la liste des périphériques.

## Coexistence avec Blender standard

Industrial CG Platform utilise par défaut le même dossier de configuration utilisateur que Blender standard (`%APPDATA%\Blender Foundation\Blender\5.2\`). Si vous préférez conserver des préférences utilisateur complètement distinctes :

- Ajoutez l'argument `--factory-startup` au raccourci de lancement pour démarrer sur une session d'usine propre.
- Ou définissez la variable d'environnement `BLENDER_USER_RESOURCES` sur un chemin personnalisé dédié avant le lancement.

## Isolation du cache de shaders OptiX

Afin d'éviter tout conflit de compilation ou état de cache obsolète entre Industrial CG Platform et les versions officielles de Blender, ce produit isole automatiquement son répertoire de cache Nvidia OptiX par défaut.

- **Chemin de cache par défaut** :
  `%USERPROFILE%\AppData\Local\IndustrialCGPlatform\Cache\OptiX\optix7cache.db`
- **Surcharge de l'environnement** : Si vous définissez la variable d'environnement système `OPTIX_CACHE_PATH`, elle remplacera le chemin par défaut du produit et restera prioritaire.

## Voir Aussi

- [Compilation depuis les sources](/fr/industrial-cg-platform/guide/building-from-source) — Compilez vous-même depuis le dépôt GitHub.
- [Manuel Blender: Installation sur Windows](https://docs.blender.org/manual/en/latest/getting_started/installing/windows.html) — Guide d'installation standard de Blender.
