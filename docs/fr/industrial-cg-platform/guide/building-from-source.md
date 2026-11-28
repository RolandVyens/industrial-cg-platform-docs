---
title: "Compilation depuis les sources"
description: "Compilez Industrial CG Platform depuis les sources sous Windows selon le workflow Release actuel : Visual Studio 2022, CMake, Ninja, SDK OptiX, cible install complète et vérification post-installation."
---

# Compilation depuis les sources

Ce guide suit le workflow actuel de compilation Release Windows x64 d'**Industrial CG Platform** (Ninja + `VsDevCmd` sur le graphe de dépendances complet `install`).

## Prérequis

| Outil | Version | Notes |
| --- | --- | --- |
| **Visual Studio** | 2022 (17.x) ou Build Tools 2022 | Avec la charge de travail « Développement de bureau en C++ » |
| **CMake** | 3.24+ | Inclus avec Visual Studio ou installé séparément |
| **Ninja** | 1.11+ | Générateur par défaut validé |
| **Git** | 2.30+ | Avec Git LFS activé |
| **SDK OptiX + chaîne de compilation NVIDIA** | Selon les prérequis officiels de Blender | Requis uniquement pour compiler le support GPU Cycles OptiX (noyaux PTX OptiX) |
| **Python** | 3.13 | Fourni automatiquement par les dépendances précompilées de Blender |

## Cloner le dépôt et récupérer les dépendances

```powershell
git clone https://github.com/RolandVyens/industrial-cg-platform.git
cd industrial-cg-platform
make update
```

`make update` télécharge les bibliothèques précompilées `lib/windows_x64` depuis le dépôt officiel de dépendances Blender.

::: warning Vérification Git LFS (clonage initial ou synchronisation amont)
Après un clonage initial ou une synchronisation amont, vérifiez que les ressources embarquées sont bien hydratées et non de simples pointeurs Git LFS :

- `assets/`
- `release/datafiles/`
- `scripts/startup/bl_app_templates_system/`

Si un fichier commence par `version https://git-lfs.github.com/spec/v1`, restaurez la ressource réelle avant de compiler. Les recompilations incrémentales locales n'ont pas besoin de retélécharger LFS.
:::

## Configurer la compilation Release

Initialisez l'environnement développeur Visual Studio x64 puis configurez un dossier de build Release et un préfixe d'installation dédiés avec Ninja :

```powershell
# Initialiser l'environnement Visual Studio 2022 x64 (adapter le chemin selon Community ou BuildTools)
& $env:ComSpec /c 'call "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=x64 -host_arch=x64 && cmake -G Ninja -S . -B build_release -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=install_release -DWITH_BUILDINFO=ON -DWITH_CYCLES_DEVICE_OPTIX=ON -DOPTIX_ROOT_DIR="C:/path/to/optix-dev" -DWITH_WINDOWS_RELEASE_PDB=OFF'
```

::: tip Options GPU et préréglage Release
- Pour une compilation CPU uniquement, passez `-DWITH_CYCLES_DEVICE_OPTIX=OFF` et omettez `-DOPTIX_ROOT_DIR`.
- Pour partir de la matrice complète de fonctionnalités Release de Blender, ajoutez `-C build_files/cmake/config/blender_release.cmake` avant vos options locales et désactivez les backends GPU absents de votre poste.
:::

## Compiler et installer (cible `install` complète)

Compilez directement la cible **`install`** plutôt que la seule cible `blender` :

```powershell
& $env:ComSpec /c 'call "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=x64 -host_arch=x64 && ninja -C build_release install'
```

::: warning Pourquoi `ninja install` est indispensable
Compiler uniquement la cible `blender` omet la génération des noyaux GPU Cycles et une partie du déploiement runtime. Lancer `ninja -C build_release install` construit l'ensemble du graphe — écran de démarrage intégré (`splash.png.c`), `buildinfo` et noyaux Cycles OptiX — et installe un exécutable portable complet dans `install_release/`.
:::

## Vérification post-installation

Validez le runtime installé avant tout empaquetage ou test de plan :

```powershell
# 1. Vérifier l'identité de version et les métadonnées propres
.\install_release\blender.exe --version

# 2. Test rapide en session isolée (sans toucher aux préférences locales)
.\install_release\blender.exe --factory-startup --command help
```

Première ligne attendue pour `--version` :

```text
Blender <version> Industrial CG Platform
```

Contrôlez également ces trois points d'intégrité :

1. **Métadonnées propres** : depuis une branche Release propre, `build branch` ne doit pas afficher `(modified)`.
2. **Noyaux OptiX présents** : lorsque OptiX est activé, vérifiez la présence de fichiers noyaux non vides dans `install_release\<major.minor>\scripts\addons_core\cycles\lib\`.
3. **Aucun pointeur LFS résiduel** : confirmez que les fichiers `.blend` dans `install_release\<major.minor>\datafiles\` sont bien des binaires réels.

## Notes connues et statut des plateformes

- **Pourquoi Ninja + `VsDevCmd`** : sur certains postes Windows, le générateur Visual Studio / MSBuild peut se bloquer lors de la détection du compilateur à cause de `Tracker.exe`. Ninja + `VsDevCmd -arch=x64 -host_arch=x64` est la voie Release validée. En cas d'appel direct à MSBuild, ajoutez `/p:TrackFileAccess=false`.
- **Éviter les erreurs d'édition de liens `LNK1318`** : conservez `-DWITH_WINDOWS_RELEASE_PDB=OFF` si la génération de PDB provoque une erreur `LNK1318`.
- **Compilations Linux** : les versions stables actuelles visent Windows x64. Linux est actuellement en **Linux Bêta** publique (base Rocky Linux 8.10 / EL8) ; suivez l'avancement sur [Suivi du développement](/fr/feature-tracking) et [Versions](/fr/industrial-cg-platform/releases/).

## Voir aussi

- [Manuel Blender : Building Blender](https://developer.blender.org/docs/handbook/building_blender/) — Documentation officielle sur la chaîne de compilation amont.
- [Installation](/fr/industrial-cg-platform/guide/installation) — Télécharger et déployer le package ZIP Release Windows x64 précompilé.
