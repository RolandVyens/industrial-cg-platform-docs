# Compilation depuis les sources

## Pr茅requis

| Outil | Version | Notes |
| --- | --- | --- |
| **Visual Studio** | 2022 (17.x) | Avec charge de travail "D茅veloppement de bureau en C++" |
| **CMake** | 3.24+ | Inclus avec Visual Studio ou install茅 de mani猫re autonome |
| **Ninja** | 1.11+ | Syst猫me de g茅n茅ration l茅ger recommand茅 |
| **Git** | 2.30+ | Avec la prise en charge de Git LFS |
| **Python** | 3.13 | G茅r茅 automatiquement par le syst猫me de compilation de Blender |

## Cloner le R茅pertoire

```powershell
git clone https://github.com/RolandVyens/industrial-cg-platform.git
cd industrial-cg-platform
```

## Obtenir les D茅pendances

Blender n茅cessite des biblioth猫ques pr茅compil茅es. Ex茅cutez la commande suivante pour les r茅cup茅rer :

```powershell
make update
```

Cette commande t茅l茅charge les d茅pendances pr茅compil茅es `lib/windows_x64` depuis le d茅p么t SVN officiel de Blender.

::: warning Barri猫re d'Hydratation LFS
Avant de compiler, v茅rifiez que les ressources Git LFS fournies avec le d茅p么t sont correctement "hydrat茅es" (t茅l茅charg茅es en tant que fichiers r茅els et non de simples fichiers texte pointeurs). V茅rifiez que les chemins suivants ne contiennent pas de pointeurs textuels :

- `assets/`
- `release/datafiles/`
- `scripts/startup/bl_app_templates_system/`

Si l'un de ces fichiers contient uniquement le texte `version https://git-lfs.github.com/spec/v1`, vous devez d'abord l'hydrater 脿 partir d'une source de confiance en ex茅cutant `git lfs pull`.
:::

## Configuration

Utilisation de Ninja (fortement recommand茅) :

```powershell
# Ouvrez d'abord une invite de commande d茅veloppeur Visual Studio
& "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat"

cmake -G Ninja -B build -S . `
  -DCMAKE_BUILD_TYPE=Release `
  -DWITH_CYCLES_CUDA_BINARIES=ON `
  -DCYCLES_CUDA_BINARIES_ARCH=sm_89 `
  -DWITH_CYCLES_DEVICE_OPTIX=ON
```

::: tip
Remplacez `sm_89` par la capacit茅 de calcul (Compute Capability) correspondant 脿 votre carte graphique NVIDIA :
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

L'ex茅cutable et l'environnement d'ex茅cution compil茅s seront install茅s dans le r茅pertoire `install/`.

## V茅rification

```powershell
.\install\blender.exe --version
```

## Notes de Compilation Connues

- **Ninja est fortement recommand茅** 鈥?Le g茅n茅rateur Visual Studio classique peut se bloquer pendant la d茅tection de l'ID du compilateur en raison d'un probl猫me avec l'outil local de tra莽age MSBuild `Tracker.exe`. L'invite VsDevCmd associ茅e 脿 Ninja est la m茅thode par d茅faut valid茅e.
- **`TrackFileAccess=false`** 鈥?Si vous utilisez MSBuild directement en ligne de commande, passez le param猫tre `/p:TrackFileAccess=false` pour 茅viter que le tracker MSBuild ne se bloque.
- **G茅n茅ration des fichiers PDB** 鈥?Les compilations Release peuvent rencontrer des erreurs de type `LNK1318` lors de la g茅n茅ration de fichiers de symboles PDB trop volumineux. Si cela se produit, compilez avec `-DWITH_WINDOWS_RELEASE_PDB=OFF`.

## Voir Aussi

- [Manuel de compilation de Blender](https://developer.blender.org/docs/handbook/building_blender/) 鈥?Documentation de compilation officielle de Blender.
- [Installation](/fr/industrial-cg-platform/guide/installation) 鈥?Installez directement 脿 partir d'un package pr茅compil茅.
