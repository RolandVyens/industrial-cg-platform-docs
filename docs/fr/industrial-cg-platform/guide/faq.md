---
title: "FAQ"
description: "Non. Industrial CG Platform est un fork de Blender maintenu par la communauté. Il n'est en aucun cas affilié ou approuvé par la Fondation Blender. Il ..."
---
# FAQ

## Généralités

### S'agit-il d'une version officielle de Blender ?

Non. Industrial CG Platform est un fork de Blender maintenu par la communauté. Il n'est en aucun cas affilié ou approuvé par la Fondation Blender. Il est publié sous la même licence open-source GPL-2.0-or-later que Blender.

### Les fichiers `.blend` sont-ils compatibles avec Blender standard ?

Oui. Les fichiers créés dans Industrial CG Platform peuvent être ouverts directement dans Blender 5.2 standard. Les fonctionnalités personnalisées (Deep EXR, passes par lobe, etc.) ne seront tout simplement pas disponibles — les données spécifiques sont préservées dans le fichier mais ignorées par la version officielle.

### À quelle fréquence fusionnez-vous les modifications amont (upstream) de Blender ?

Notre branche de staging `vfx-rendering-branch` intègre régulièrement les modifications de la branche principale `origin/main` de Blender. Les fusions sont validées sur plusieurs configurations de test avant d'être synchronisées dans la branche de production `industrial-cg-platform`.

### Puis-je utiliser mes add-ons Blender existants ?

La grande majorité des add-ons Blender compatibles avec la version 5.2 officielle fonctionneront également sur Industrial CG Platform. Cependant, les add-ons obsolètes dépendant d'API dépréciées (telles que `bgl` ou des structures internes de `bpy_types` supprimées) peuvent journaliser des erreurs au démarrage — ce comportement est identique à celui de Blender 5.2 standard.

## Rendu

### Quels backends GPU sont pris en charge ?

- **CUDA** — Tous les GPU NVIDIA ayant une capacité de calcul (Compute Capability) supérieure ou égale à 5.0.
- **OptiX** — GPU NVIDIA RTX (fortement recommandé pour obtenir les meilleures performances de lancer de rayons).
- **CPU** — Toujours disponible comme alternative de secours.

### Les fonctionnalités personnalisées fonctionnent-elles sur CPU ?

Oui. La sortie Deep EXR, les passes par lobe de lightgroup et la couleur d'ombre (Shadow Color) fonctionnent toutes de manière identique sur les processeurs (CPU) et les GPU NVIDIA (via CUDA ou OptiX).

### Quel est l'impact sur le temps de rendu des passes par lobe de lightgroup ?

Les passes par lobe n'ajoutent qu'un impact infime sur le temps de rendu global. Le coût principal réside dans l'augmentation de la taille des fichiers EXR en sortie (plus de couches d'images). Le calcul de l'équilibre global s'effectue de manière intégrée au cours du processus d'intégration de la lumière de Cycles.

## Gestionnaire de ViewLayer

### Pourquoi s'ouvre-t-il dans une fenêtre séparée ?

Le gestionnaire de ViewLayer utilise Qt (via le runtime BQt) pour son interface utilisateur, ce qui ne permet pas de l'intégrer directement dans l'architecture graphique native et propriétaire de Blender. Il s'exécute donc délibérément sous forme de fenêtre système autonome de premier niveau.

### Puis-je l'utiliser sur Linux ?

Pas encore. La version actuelle est exclusive à Windows x64 (sous forme d'archive ZIP). La prise en charge de Linux (en commençant par Rocky Linux 9 / X11) est planifiée pour une prochaine mise à jour majeure.

### Que signifie le message `failed to get blender hwnd` dans les logs ?

Il s'agit d'un message d'avertissement normal du mode de secours (Safe Mode) de BQt. Cela signifie que BQt crée une nouvelle instance de fenêtre d'application Qt autonome plutôt que d'envelopper directement la fenêtre native de Blender. Ce comportement est tout à fait attendu et ne nuit en rien aux fonctionnalités.

## Compilation

### Pourquoi le générateur Visual Studio se bloque-t-il lors de la configuration CMake ?

Il s'agit d'un problème local connu lié à des conflits avec l'outil système `Tracker.exe` de MSBuild lorsque le traçage des accès aux fichiers est activé par défaut. Utiliser le couple Ninja + VsDevCmd comme backend de compilation permet de contourner complètement ce problème.

### Qu'est-ce que la barrière d'hydratation Git LFS ?

Certains fichiers volumineux ou binaires du dépôt sont gérés avec Git LFS (Large File Storage). Si ces fichiers ne sont pas correctement "hydratés" (c'est-à-dire téléchargés sous leur forme binaire réelle au lieu de simples pointeurs textuels), la compilation échouera ou produira un exécutable Blender incomplet ou instable. Assurez-vous que les répertoires `assets/`, `release/datafiles/` et `scripts/startup/bl_app_templates_system/` contiennent de vrais binaires avant de compiler.
