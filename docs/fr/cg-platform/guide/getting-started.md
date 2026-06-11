# Premiers pas

![Industrial CG Platform Splash](/splash.png)

## Qu'est-ce qu'Industrial CG Platform ?

**Industrial CG Platform** est une distribution de production dérivée de Blender, axée sur les parties de la CG qui décident généralement si un plan peut survivre à un véritable pipeline VFX.

Il ne s'agit pas d'un fork Blender généraliste avec des ajouts aléatoires. C'est une plateforme Blender orientée production pour les studios VFX, les artistes, les directeurs techniques (TD), les développeurs de pipeline et les petites équipes qui ont besoin d'un comportement de rendu de style VFX directement dans une chaîne d'outils basée sur Blender.

La version actuelle est basée sur **Blender 5.2** et la branche est nommée `industrial-cg-platform`.

## À qui s'adresse-t-il ?

Industrial CG Platform est destiné aux :
- **Studios VFX** — qui souhaitent intégrer Blender dans leur pipeline de production.
- **Artistes d'éclairage** — qui ont besoin d'un contrôle plus poussé des passes.
- **Compositeurs** — qui ont besoin de meilleures données de rendu de Blender.
- **Directeurs Techniques (TD) et Développeurs de pipeline** — évaluant Blender pour un travail basé sur des plans.
- **Petits studios** — construisant un flux de travail VFX centré sur Blender.
- **Artistes techniques** — qui ont besoin de fonctionnalités au niveau du code source plutôt que de simples add-ons.

## Fonctionnalités Clés

| Fonctionnalité | Description |
| --- | --- |
| [Sortie Deep EXR](/fr/cg-platform/features/deep-exr) | Sortie de compositing profond native pour Cycles |
| [Passes par lobe de lightgroup](/fr/cg-platform/features/lightgroup-lobe-passes) | Passes divisées par lightgroup (diffus/glossy/transmission/volume) |
| [Couleur d'ombre](/fr/cg-platform/features/shadow-color) | Teinture artistique des ombres par lumière et par monde |
| [Gestionnaire de ViewLayer](/fr/cg-platform/features/viewlayer-manager) | Outil de gestion ViewLayer basé sur Qt avec préréglages |

## Comment diffère-t-il de Blender standard ?

- **Compatibilité totale** — Les fichiers `.blend` créés dans Industrial CG Platform sont compatibles avec Blender 5.2 standard. Les fonctionnalités personnalisées ne seront tout simplement pas disponibles lorsqu'elles sont ouvertes dans Blender standard.
- **Mêmes noms d'exécutables** — L'exécutable s'appelle toujours `blender.exe` et utilise la même structure de répertoire de configuration.
- **Suffixe de branche** — Le titre de la fenêtre affiche `Blender 5.2.0 Industrial CG Platform` pour le distinguer de Blender standard.
- **Windows uniquement** — Les versions actuelles sont uniquement des packages ZIP Windows x64. Le support Linux est prévu pour l'avenir.

## Prochaines Étapes

- [Installation](/fr/cg-platform/guide/installation) — Télécharger et configurer la version.
- [Compilation depuis les sources](/fr/cg-platform/guide/building-from-source) — Compiler à partir du dépôt GitHub.
- [FAQ](/fr/cg-platform/guide/faq) — Questions fréquentes et réponses.
