# Compilation depuis les sources

## Prérequis

| Outil | Version | Notes |
| --- | --- | --- |
| **Visual Studio** | 2022 (17.x) | Avec charge de travail de développement de bureau C++ |
| **CMake** | 3.24+ | Inclus avec Visual Studio ou autonome |
| **Ninja** | 1.11+ | Système de build recommandé |
| **Git** | 2.30+ | Avec support Git LFS |
| **Python** | 3.13 | Géré par le système de build de Blender |

## Cloner le Répertoire

```powershell
git clone https://github.com/RolandVyens/industrial-cg-platform.git
cd industrial-cg-platform
```

## Obtenir les Dépendances

```powershell
make update
```

::: warning Vérification de l'Hydratation LFS
Avant de compiler, vérifiez que les ressources LFS sont correctement téléchargées (et non des pointeurs). Vérifiez ces chemins :
- `assets/`
- `release/datafiles/`
- `scripts/startup/bl_app_templates_system/`

Si un fichier contient `version https://git-lfs.github.com/spec/v1`, il a besoin d'être hydraté à partir d'une source fiable.
:::

## Configuration

Utiliser Ninja (recommandé) :

```powershell
cmake -G Ninja -B build -S . `
  -DCMAKE_BUILD_TYPE=Release `
  -DWITH_CYCLES_CUDA_BINARIES=ON `
  -DCYCLES_CUDA_BINARIES_ARCH=sm_89 `
  -DWITH_CYCLES_DEVICE_OPTIX=ON
```

::: tip
Remplacez `sm_89` par la capacité de calcul de votre GPU :
- RTX 4080/4090 : `sm_89`
- RTX 3080/3090 : `sm_86`
- RTX 2080 : `sm_75`
:::

## Compilation

```powershell
cmake --build build --target blender
```

## Voir Aussi

- [Manuel Blender: Compilation](https://developer.blender.org/docs/handbook/building_blender/) — Documentation officielle de compilation de Blender.
