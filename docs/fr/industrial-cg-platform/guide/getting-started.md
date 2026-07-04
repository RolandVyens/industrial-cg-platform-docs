# Premiers pas

![Industrial CG Platform Splash](/splash.png)

## Qu'est-ce qu'Industrial CG Platform ?

**Industrial CG Platform** est une distribution de production d茅riv茅e de Blender, ax茅e sur les parties de la CG qui d茅cident g茅n茅ralement si un plan peut survivre 脿 un v茅ritable pipeline VFX.

Il ne s'agit pas d'un fork Blender g茅n茅raliste avec des ajouts al茅atoires. C'est une plateforme Blender orient茅e production pour les studios VFX, les artistes, les directeurs techniques (TD), les d茅veloppeurs de pipeline et les petites 茅quipes qui ont besoin d'un comportement de rendu de style VFX directement dans une cha卯ne d'outils bas茅e sur Blender.

La version actuelle est bas茅e sur **Blender 5.2** et la branche est nomm茅e `industrial-cg-platform`.

## 脌 qui s'adresse-t-il ?

Industrial CG Platform est destin茅 aux :
- **Studios VFX** 鈥?qui souhaitent int茅grer Blender dans leur pipeline de production.
- **Artistes d'茅clairage** 鈥?qui ont besoin d'un contr么le plus pouss茅 des passes.
- **Compositeurs** 鈥?qui ont besoin de meilleures donn茅es de rendu de Blender.
- **Directeurs Techniques (TD) et D茅veloppeurs de pipeline** 鈥?茅valuant Blender pour un travail bas茅 sur des plans.
- **Petits studios** 鈥?construisant un flux de travail VFX centr茅 sur Blender.
- **Artistes techniques** 鈥?qui ont besoin de fonctionnalit茅s au niveau du code source plut么t que de simples add-ons.

## Fonctionnalit茅s Cl茅s

| Fonctionnalit茅 | Description |
| --- | --- |
| [Sortie Deep EXR](/fr/industrial-cg-platform/features/deep-exr) | Sortie de compositing profond native pour Cycles |
| [EXR Overscan](/fr/industrial-cg-platform/features/exr-overscan) | Pr茅serve la displayWindow et 茅tend la dataWindow pour le padding VFX en aval |
| [Passes par lobe de lightgroup](/fr/industrial-cg-platform/features/lightgroup-lobe-passes) | Passes divis茅es par lightgroup (diffus/glossy/transmission/volume) |
| [Couleur d'ombre](/fr/industrial-cg-platform/features/shadow-color) | Teinture artistique des ombres par lumi猫re et par monde |
| [Gestionnaire de ViewLayer](/fr/industrial-cg-platform/features/viewlayer-manager) | Outil de gestion ViewLayer bas茅 sur Qt avec pr茅r茅glages |

## Comment diff猫re-t-il de Blender standard ?

- **Compatibilit茅 totale** 鈥?Les fichiers `.blend` cr茅茅s dans Industrial CG Platform sont compatibles avec Blender 5.2 standard. Les fonctionnalit茅s personnalis茅es ne seront tout simplement pas disponibles lorsqu'elles sont ouvertes dans Blender standard.
- **M锚mes noms d'ex茅cutables** 鈥?L'ex茅cutable s'appelle toujours `blender.exe` et utilise la m锚me structure de r茅pertoire de configuration.
- **Suffixe de branche** 鈥?Le titre de la fen锚tre affiche `Blender 5.2.0-2026-06-16 Industrial CG Platform` pour le distinguer de Blender standard.
- **Windows uniquement** 鈥?Les versions actuelles sont uniquement des packages ZIP Windows x64. Le support Linux est pr茅vu pour l'avenir.

## Prochaines 脡tapes

- [Installation](/fr/industrial-cg-platform/guide/installation) 鈥?T茅l茅charger et configurer la version.
- [Compilation depuis les sources](/fr/industrial-cg-platform/guide/building-from-source) 鈥?Compiler 脿 partir du d茅p么t GitHub.
- [FAQ](/fr/industrial-cg-platform/guide/faq) 鈥?Questions fr茅quentes et r茅ponses.
