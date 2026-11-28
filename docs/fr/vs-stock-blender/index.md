---
title: "Industrial CG Platform vs Blender officiel : différences clés et quand choisir lequel"
description: "Comparaison complète entre Industrial CG Platform et Blender officiel : Deep EXR natif Cycles, EXR Overscan, passes par lobe de lightgroup, Shadow Color, gestionnaire ViewLayer, runtime Qt 6 (bQt) intégré, limites de compatibilité et cas où rester sur Blender officiel."
cover: "/splash.webp"
faq: true
---

# Industrial CG Platform vs Blender officiel : différences clés et quand choisir lequel

**Industrial CG Platform** est un fork orienté production de **Blender officiel** conçu pour les pipelines VFX de studio livrant vers Nuke, Maya et Houdini : il conserve l'interface, l'écosystème d'extensions et le format `.blend` que vous connaissez déjà, tout en intégrant directement au niveau du moteur et du runtime le **Deep EXR** natif Cycles, l'**EXR Overscan**, les **passes par lobe de lightgroup**, **Shadow Color**, un **gestionnaire de ViewLayer** et un **runtime Qt (bQt) intégré**.

Si vous évaluez l'architecture complète d'un pipeline studio ou cherchez un guide pas à pas de compositing, consultez **[Pipeline VFX Blender](/fr/blender-vfx-pipeline/)** et **[Workflow Blender vers Nuke](/fr/blender-to-nuke-workflow/)**. Cette page répond précisément à ce qui change par rapport à Blender officiel, pourquoi un fork est nécessaire, et dans quels cas Blender officiel reste préférable.

## 1. Tableau comparatif : Blender officiel vs Industrial CG Platform

Chaque ligne résume ce que chaque version fait réellement en sortie d'installation et renvoie vers la page de documentation dédiée pour le détail technique. Lorsque Blender officiel permet une approche manuelle ou scriptée, cela est indiqué clairement.

| Fonctionnalité | Blender officiel | Industrial CG Platform |
| --- | --- | --- |
| **[Sortie Deep EXR native](/fr/industrial-cg-platform/features/deep-exr)** | EXR plat uniquement ; aucune sortie Deep native dans Cycles. | Sortie Deep EXR native Cycles (modes Simple et Physical, surfaces, volumes d'objets et World Volume), prête directement pour `DeepMerge` dans Nuke. |
| **[EXR Overscan](/fr/industrial-cg-platform/features/exr-overscan)** | Aucune métadonnée d'overscan native ; les marges hors-champ demandent des contournements caméra/résolution ou du padding en postproduction. | Overscan Cycles natif : `displayWindow` reste au cadrage de livraison tandis que `dataWindow` s'étend pour éviter les bords noirs lors de la distorsion d'objectif dans Nuke. |
| **[Passes par lobe de lightgroup](/fr/industrial-cg-platform/features/lightgroup-lobe-passes)** | Les lightgroups sortent uniquement en couleur combinée ; la séparation par lobe n'est pas intégrée à Cycles et demande des contournements. | Passes natives par lightgroup séparant direct et indirect pour diffus, spéculaire, transmission et volume directement dans Cycles. |
| **[Shadow Color](/fr/industrial-cg-platform/features/shadow-color)** | Les ombres ne sont que l'absence de lumière, sans contrôle de teinte d'ombre par lumière ou par monde. | Teinte d'ombre par lumière et par monde dans Cycles (*Limitation connue* : teinte additive appliquée uniquement aux zones d'ombre ; ne simule pas l'occlusion translucide colorée). |
| **[Gestionnaire de ViewLayer](/fr/industrial-cg-platform/features/viewlayer-manager)** | Activation manuelle des passes couche par couche dans l'éditeur de propriétés, sans gestionnaire de préréglages par lots intégré (le traitement par lots doit être scripté en Python). | Fenêtre Qt autonome centralisant les ViewLayers, passes de rendu, Shader AOV, lightgroups et préréglages appliqués en un clic sur plusieurs couches. |
| **[Runtime Qt intégré (bQt)](/fr/industrial-cg-platform/api/bqt-usage)** | Aucune intégration Qt fournie dans Blender officiel (nécessite une installation manuelle de paquets Python tiers et de la boucle d'événements). | Qt 6 intégré directement au runtime Blender via l'extension système bQt — alimente le gestionnaire de ViewLayer et les outils Qt studio prêts à l'emploi. |

## 2. Pourquoi un fork plutôt qu'une simple extension ?

L'API Python de Blender convient très bien à la mise en scène, aux panneaux UI et au câblage du compositeur, mais elle ne peut pas modifier la façon dont Cycles lance les rayons, accumule les passes de film, écrit les métadonnées OpenEXR profondes ou hors-champ, ni embarquer un runtime Qt géré. Chaque ajout d'Industrial CG Platform se situe au niveau du fork pour une raison technique précise :

- **Noyau Cycles et système de passes** :
  - Le **Deep EXR natif** impose la capture de profondeur par échantillon pendant le path tracing, des budgets mémoire par tuile dans `KernelFilm` et l'écriture directe via l'API Deep d'OpenEXR (`PASS_DEEP_COMBINED`, `PASS_DEEP_POSITION`).
  - Les **passes par lobe de lightgroup** accumulent les contributions directes et indirectes (diffus, spéculaire, transmission, volume) par lightgroup directement dans l'intégrateur Cycles (`lightgroup_split_index`, `film_write_lightgroup_split_pass`) tout en préservant l'équilibre énergétique avec la passe Beauty.
  - **Shadow Color** évalue la teinte par lumière et par monde dans le chemin d'ombre de l'intégrateur via les champs `KernelLight.shadow_color` et `KernelBackground.shadow_color`.
  - **EXR Overscan** rend des marges caméra étendues dans Cycles et écrit des en-têtes OpenEXR standard `displayWindow` et `dataWindow` sans modifier la focale ni le cadrage.
- **Runtime Qt intégré (bQt)** :
  - Embarquer **Qt 6** (`PySide6` + `bqt`) en extension système avec activation par session et mode autonome sécurisé garantit que des outils comme le **gestionnaire de ViewLayer** fonctionnent immédiatement sans installation manuelle de wheels Python par les artistes.

Aucun de ces comportements moteur ou runtime ne peut être ajouté proprement par un add-on Blender classique. Pour les détails C++ et Python, consultez [Extensions du noyau Cycles](/fr/industrial-cg-platform/api/cycles-kernel), [Système de passes et AOV](/fr/industrial-cg-platform/api/pass-system) et le [Guide d'utilisation bQt](/fr/industrial-cg-platform/api/bqt-usage).

## 3. Compatibilité et limites

Industrial CG Platform reste proche de Blender officiel en amont afin que les studios puissent l'évaluer ou le déployer sans casser leurs assets existants :

- **Compatibilité des fichiers `.blend`** : Bidirectionnelle avec Blender officiel. Les fichiers enregistrés dans Industrial CG Platform s'ouvrent proprement dans Blender officiel — les propriétés spécifiques (Deep EXR, overscan, Shadow Color, passes par lobe) sont conservées dans le fichier et ignorées sans erreur par Blender officiel.
- **Coexistence côte à côte** : Distribué sous forme d'archive ZIP portable utilisant le nom d'exécutable standard `blender.exe` et un titre de fenêtre dédié (`Blender <version> Industrial CG Platform`). Son cache de shaders OptiX par défaut est isolé automatiquement (`%USERPROFILE%\AppData\Local\IndustrialCGPlatform\Cache\OptiX\optix7cache.db`). Par défaut, il partage le répertoire de préférences standard de Blender, mais vous pouvez isoler totalement les préférences via `BLENDER_USER_RESOURCES` ou `--factory-startup`.
- **Versions stables et OS** : **Windows 10/11 x64** (archive ZIP portable, ~1 Go extrait). Voir [Installation](/fr/industrial-cg-platform/guide/installation) et [Notes de version](/fr/industrial-cg-platform/releases/) pour les versions stables et LTS actuelles.
- **Backends de rendu** : **NVIDIA RTX OptiX** (recommandé) et **CPU** uniquement. Les fonctions ajoutées (Deep EXR, passes par lobe de lightgroup, Shadow Color, EXR Overscan) fonctionnent sur OptiX comme sur CPU.
- **Mémoire requise** : **16 Go de RAM minimum, 32 Go recommandés** (vérifié sur le [Guide d'installation](/fr/industrial-cg-platform/guide/installation)).
- **Statut Linux** : Une **préversion publique Linux Bêta** (compilée sur base Rocky Linux 8.10 / EL8, glibc 2.28+) est disponible pour tests et retours. Elle n'est **pas encore qualifiée comme version stable** — la qualification native Linux GPU/OptiX, HIP/ROCm et Wayland reste en cours. Suivez l'avancement sur [Suivi du développement](/fr/feature-tracking).
- **Licence** : **GNU GPL v3 ou ultérieure (`GPL-3.0-or-later`)** pour le cœur dérivé de Blender, comme Blender amont. Les paquets du runtime Qt embarqué conservent leurs licences amont respectives, listées sur [À propos du projet](/fr/industrial-cg-platform/about/).

## 4. Quand rester sur Blender officiel

Industrial CG Platform a volontairement un périmètre ciblé. Blender officiel reste le meilleur choix si :

- **Vous ne livrez pas vos rendus vers Nuke ou un compositing EXR multicouche** : si vous sortez directement depuis le compositeur de Blender, rendez des images/vidéos finales ou travaillez principalement en modélisation, animation ou lookdev temps réel, le fork n'apporte aucun avantage concret.
- **Vous n'avez pas besoin de Deep EXR, de métadonnées d'overscan, de passes par lobe par lightgroup ni de Shadow Color** : rester sur Blender officiel évite de maintenir un binaire distinct quand Cycles standard couvre déjà vos besoins.
- **Vous avez besoin dès aujourd'hui de macOS, d'une version Linux stable qualifiée en production ou du rendu GPU non-RTX** : les versions stables actuelles ciblent Windows x64 avec NVIDIA RTX OptiX ou CPU. Les équipes ayant besoin de macOS, de Linux stable ou d'accélération GPU AMD/Intel doivent rester sur Blender officiel en attendant la qualification Linux.
- **La politique IT de votre studio impose exclusivement des binaires officiels de la Blender Foundation** : si votre environnement exige des builds amont non modifiés ou le périmètre de support LTS officiel, restez sur Blender officiel.

Si votre pipeline s'appuie en revanche sur le rendu VFX de studio et le compositing Nuke, poursuivez avec **[Pipeline VFX Blender](/fr/blender-vfx-pipeline/)** pour évaluer un pilote ou **[Workflow Blender vers Nuke](/fr/blender-to-nuke-workflow/)** pour la mise en place d'un plan.

## 5. Questions fréquentes (FAQ)

### Puis-je ouvrir mes fichiers `.blend` aussi bien dans Industrial CG Platform que dans Blender officiel ?

Oui. Les fichiers `.blend` créés dans Industrial CG Platform s'ouvrent proprement dans Blender officiel, et inversement. Les propriétés spécifiques au fork (Deep EXR, EXR Overscan, Shadow Color, options de passes par lobe) sont préservées dans le fichier et ignorées sans erreur par Blender officiel.

### S'agit-il d'une installation séparée, utilisable en parallèle de Blender officiel ?

Oui. Sous Windows x64, Industrial CG Platform est livré en archive ZIP portable à extraire dans son propre dossier sans écraser votre installation officielle de Blender. Il isole automatiquement son cache OptiX par défaut et s'identifie comme `Blender <version> Industrial CG Platform` dans le titre de fenêtre et `--version`. Définissez `BLENDER_USER_RESOURCES` pour isoler aussi les préférences utilisateur.

### Industrial CG Platform remplace-t-il Blender officiel ?

Non. C'est un fork optionnel de Blender officiel orienté production VFX, maintenu en parallèle de Blender amont — ni une version officielle de la Blender Foundation, ni un remplacement généraliste. De nombreux studios conservent Blender officiel pour la modélisation ou les tâches courantes et utilisent Industrial CG Platform pour l'éclairage, la gestion des ViewLayers et la livraison de rendu VFX.

### Mes add-ons Blender existants fonctionnent-ils toujours ?

La grande majorité des add-ons compatibles avec Blender officiel fonctionnent à l'identique sur Industrial CG Platform, car le fork reste très proche de Blender officiel en amont. Les add-ons reposant sur des API dépréciées se comportent exactement comme sous Blender officiel.

### Quels backends de rendu et systèmes d'exploitation sont pris en charge ?

Les versions stables actuelles prennent en charge **Windows 10/11 x64** avec les backends **NVIDIA RTX OptiX** et **CPU** uniquement (16 Go de RAM minimum, 32 Go recommandés). Une **préversion publique Linux Bêta** (base Rocky Linux 8.10 / EL8, glibc 2.28+) est disponible pour tests, sans être encore qualifiée comme version stable.

### Pourquoi ces fonctions ne peuvent-elles pas être installées comme de simples add-ons Blender ?

La capture d'échantillons Deep EXR natifs, l'accumulation directe/indirecte par lobe de lightgroup, l'évaluation de Shadow Color par lumière et les métadonnées OpenEXR `displayWindow`/`dataWindow` d'overscan s'exécutent dans le noyau C++ de Cycles et la chaîne de sortie image, inaccessibles aux add-ons Python. L'intégration de Qt 6 via l'extension système bQt nécessite également un empaquetage au niveau du fork afin que le gestionnaire de ViewLayer se lance sans configuration manuelle.
