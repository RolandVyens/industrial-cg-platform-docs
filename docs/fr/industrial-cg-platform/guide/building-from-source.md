---
title: "Compilation depuis les sources"
description: "| Outil | Version | Notes |"
---
# Compilation depuis les sources

## Prérequis

| Outil | Version | Notes |
| --- | --- | --- |
| **Visual Studio** | 2022 (17.x) | Avec charge de travail "Développement de bureau en C++" |
| **CMake** | 3.24+ | Inclus avec Visual Studio ou installé de manière autonome |
| **Ninja** | 1.11+ | Système de génération léger recommandé |
| **Git** | 2.30+ | Avec la prise en charge de Git LFS |
| **Python** | 3.13 | Géré automatiquement par le système de compilation de Blender |

## Cloner le Répertoire

```powershell
git clone https://github.com/RolandVyens/industrial-cg-platform.git
cd industrial-cg-platform
```

## Obtenir les Dépendances

Blender nécessite des bibliothèques précompilées. Exécutez la commande suivante pour les récupérer :

```powershell
make update
```

Cette commande télécharge les dépendances précompilées `lib/windows_x64` depuis le dépôt SVN officiel de Blender.

::: warning Barrière d'Hydratation LFS
Avant de compiler, vérifiez que les ressources Git LFS fournies avec le dépôt sont correctement "hydratées" (téléchargées en tant que fichiers réels et non de simples fichiers texte pointeurs). Vérifiez que les chemins suivants ne contiennent pas de pointeurs textuels :

- `assets/`
- `release/datafiles/`
- `scripts/startup/bl_app_templates_system/`

Si l'un de ces fichiers contient uniquement le texte `version https://git-lfs.github.com/spec/v1`, vous devez d'abord l'hydrater à partir d'une source de confiance en exécutant `git lfs pull`.
:::

## Configuration

Utilisation de Ninja (fortement recommandé) :

```powershell
# Ouvrez d'abord une invite de commande développeur Visual Studio
& "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat"

cmake -G Ninja -B build -S . `
  -DCMAKE_BUILD_TYPE=Release `
  -DWITH_CYCLES_CUDA_BINARIES=ON `
  -DCYCLES_CUDA_BINARIES_ARCH=sm_89 `
  -DWITH_CYCLES_DEVICE_OPTIX=ON
```

::: tip
Remplacez `sm_89` par la capacité de calcul (Compute Capability) correspondant à votre carte graphique NVIDIA :
- RTX 4080/4090 : `sm_89`
- RTX 3080/3090 : `sm_86`
- RTX 2080 : `sm_75`
:::

## Compilation

```powershell
cmake --build build --target blender
```

## Installation

```powershell
cmake --install build --prefix install
```

L'exécutable et l'environnement d'exécution compilés seront installés dans le répertoire `install/`.

## Vérification

```powershell
.\install\blender.exe --version
```

## Notes de Compilation Connues

- **Ninja est fortement recommandé** — Le générateur Visual Studio classique peut se bloquer pendant la détection de l'ID du compilateur en raison d'un problème avec l'outil local de traçage MSBuild `Tracker.exe`. L'invite VsDevCmd associée à Ninja est la méthode par défaut validée.
- **`TrackFileAccess=false`** — Si vous utilisez MSBuild directement en ligne de commande, passez le paramètre `/p:TrackFileAccess=false` pour éviter que le tracker MSBuild ne se bloque.
- **Génération des fichiers PDB** — Les compilations Release peuvent rencontrer des erreurs de type `LNK1318` lors de la génération de fichiers de symboles PDB trop volumineux. Si cela se produit, compilez avec `-DWITH_WINDOWS_RELEASE_PDB=OFF`.

## Voir Aussi

- [Manuel de compilation de Blender](https://developer.blender.org/docs/handbook/building_blender/) — Documentation de compilation officielle de Blender.
- [Installation](/fr/industrial-cg-platform/guide/installation) — Installez directement à partir d'un package précompilé.
