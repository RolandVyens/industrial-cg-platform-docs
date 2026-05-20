# Installation

## Configuration Requise

| Composant | Configuration |
| --- | --- |
| **OS** | Windows 10/11 x64 |
| **GPU** | GPU NVIDIA avec support CUDA ou OptiX (recommandé) |
| **Pilote GPU** | Pilote NVIDIA Game Ready ou Studio le plus récent |
| **RAM** | 16 Go minimum, 32 Go recommandés |
| **Disque** | ~1 Go pour le package de publication |

## Téléchargement

1. Allez sur la page [GitHub Releases](https://github.com/RolandVyens/industrial-cg-platform/releases).
2. Téléchargez le fichier `industrial-cg-platform-X.X.X-YYYY-MM-DD.zip` le plus récent.
3. Vérifiez l'intégrité du téléchargement en vérifiant le hachage SHA256 indiqué dans les notes de version.

## Installation

1. Extrayez le fichier ZIP à l'emplacement de votre choix (ex: `D:\Tools\IndustrialCGPlatform\`).
2. Exécutez `blender.exe` à partir du dossier extrait.
3. Au premier lancement, vous devriez voir l'écran de démarrage avec la marque **Industrial CG Platform**.

::: warning
N'extrayez pas dans un chemin nécessitant des autorisations d'administrateur si vous souhaitez éviter les invites UAC à chaque lancement. Un emplacement accessible en écriture par l'utilisateur comme `D:\Tools\` fonctionne bien.
:::

## Configuration GPU

Pour le rendu Cycles GPU avec NVIDIA :

1. Ouvrez **Édition > Préférences > Système**.
2. Sous **Périphériques de rendu Cycles**, sélectionnez soit :
   - **CUDA** — Large compatibilité, légèrement plus lent.
   - **OptiX** — Lancer de rayons plus rapide sur les GPU RTX (recommandé).
3. Cochez votre GPU dans la liste des périphériques.

## Voir Aussi

- [Compilation depuis les sources](/fr/guide/building-from-source) — Compiler à partir du dépôt GitHub.
- [Manuel Blender: Installation sur Windows](https://docs.blender.org/manual/en/latest/getting_started/installing/windows.html) — Guide d'installation standard de Blender.
