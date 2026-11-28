---
title: "Pipeline VFX Blender pour studios : Deep EXR natif, hors-champ et livraison de rendu"
description: "Architecture et guide d'évaluation de pipeline VFX Blender en studio avec Industrial CG Platform : Deep EXR natif, rendu hors-champ (EXR Overscan), passes détaillées par lumière, gestionnaire de couches et gestion couleur partagée."
cover: "/splash.webp"
faq: true
---

# Pipeline VFX Blender pour studios : Deep EXR natif, hors-champ et livraison de rendu

Intégrer Blender dans un vrai studio VFX échoue rarement sur la modélisation ou le rendu viewport : le point de rupture se situe presque toujours à la **passation des données de rendu**. Sans sortie Deep EXR native, sans rendu hors-champ standard, sans passes directes/indirectes par lumière et sans cohérence couleur entre logiciels, les plans s'enlisent dans les masques manuels et les re-rendus complets entre Blender et Nuke.

**Industrial CG Platform** intègre directement ces briques manquantes dans le moteur Cycles et l'environnement de Blender officiel (version stable Windows x64 ; préversion publique Linux Bêta disponible pour test), avec une suite d'outils open-source compagnons conçus pour **Foundry Nuke**, **Autodesk Maya** et **SideFX Houdini**.

## 1. Ce qu'exige réellement un pipeline VFX Blender de production

Un pipeline de plan VFX en studio s'articule autour de six étapes liées : **Tournage et tracking caméra → Layout et assets → Éclairage et couches de rendu → Rendu Cycles et livraison EXR → Compositing Nuke → Couleur et livraison finale**.

Le rôle précis d'**Industrial CG Platform** — et ce qu'il ne cherche pas à remplacer :

- **Par rapport à Blender officiel** : Blender officiel offre une base solide de modélisation, d'animation et de rendu Cycles, mais ne dispose ni de sortie Deep EXR native, ni de rendu hors-champ standard, ni de passes directes/indirectes par lumière, ni d'un gestionnaire multicouche par lots. Industrial CG Platform ajoute ces fonctions directement au cœur du moteur tout en conservant une compatibilité `.blend` totale.
- **Par rapport aux outils de suivi de plans et d'assets (Blender_Plumber, Kitsu, ShotGrid)** : les gestionnaires de production pilotent les tâches, les versions et l'ingestion des plans. Industrial CG Platform agit sur la **couche rendu, passes, passation EXR et cohérence couleur** — il complète donc les outils de suivi existants sans les remplacer.

## 2. Architecture de la plateforme : ce que résout chaque module

```text
[Plans & Couleur]   -> [Layout / Éclairage Blender] -> [Rendu Cycles]             -> [Compositing Nuke]
  Config couleur       Gestionnaire de couches          Deep EXR natif                DeepRead / DeepMerge
  (AIO-OCIO)           Teinte d'ombre par lumière       Rendu hors-champ (Overscan)   Reconstruction lumière
                       Passes détaillées par lumière    Export EXR automatisé         Vues couleur alignées
```

| Étape du pipeline | Fonction clé / Outil compagnon | Ce qu'il résout en production | Logiciels cibles |
| --- | --- | --- | --- |
| **Gestion des couches** | [Gestionnaire de couches (ViewLayer Manager)](/fr/industrial-cg-platform/features/viewlayer-manager) | Fenêtre dédiée pour organiser couches de rendu, passes, AOV personnalisés et groupes de lumières via préréglages par lots | Blender (intégré) |
| **Éclairage artistique** | [Teinte d'ombre par lumière (Shadow Color)](/fr/industrial-cg-platform/features/shadow-color) + [Passes par lumière](/fr/industrial-cg-platform/features/lightgroup-lobe-passes) | Teinter librement les ombres par lumière ou monde et séparer chaque groupe en passes directes/indirectes (diffus, spéculaire, transmission, volume) | Blender Cycles |
| **EXR Deep et hors-champ** | [Deep EXR natif](/fr/industrial-cg-platform/features/deep-exr) + [Rendu hors-champ (EXR Overscan)](/fr/industrial-cg-platform/features/exr-overscan) | Fichiers EXR 3D multi-échantillons (modes Simple et Physical, incluant les volumes d'objets et le World Volume) et marges extérieures pour la distorsion d'objectif sans altérer le cadrage final | Blender Cycles → Nuke |
| **Export EXR automatisé** | [Export EXR automatisé (Industrial AOV Connector)](/fr/industrial-aov-connector/) (5.3.0) | Construit automatiquement des arbres multicouches séparant Beauty, Deep, Cryptomatte et données géométriques, câble le débruitage et désactive le rendu par défaut inutile | Blender → Nuke |
| **Séparation Blender officiel** | [Séparateur Blender officiel (Industrial Light AOV Splitter)](/fr/industrial-light-aov-splitter/) | Permet aux équipes restant sur Blender officiel de séparer les groupes de lumières en passes diffus, spéculaire, transmission et volume | Blender → Nuke |
| **Reconstruction lumière Nuke** | [Reconstruction lumière en un clic (Auto Light Shuffle)](/fr/auto-light-shuffle/) | Reconstruit les EXR de lumières Blender dans Nuke en un arbre de rééclairage équilibré avec cadres étiquetés et alpha préservé | Foundry Nuke |
| **Couleur multi-logiciels** | [Configuration couleur partagée (AIO-OCIO)](/fr/aio-ocio/) | Aligne strictement les vues AgX, Filmic, ACEScg et Log caméra entre Blender, Nuke, Maya et Houdini | Blender, Nuke, Maya, Houdini |

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/screenshots/viewlayer-manager/manager-window.webp" target="_blank" rel="noopener"><img src="/screenshots/viewlayer-manager/manager-window.webp" alt="Fenêtre du gestionnaire de couches Industrial CG Platform organisant les couches Beauty, Characters et Environment par préréglages" loading="lazy"></a>
<figcaption>Le gestionnaire de couches intégré regroupe couches de rendu, passes et préréglages de lumières dans une seule fenêtre pour accélérer l'éclairage en studio.</figcaption>
</figure>

## 3. À qui s'adresse cette plateforme

| Rôle | Point bloquant fréquent sous Blender officiel | Apport d'Industrial CG Platform |
| --- | --- | --- |
| **Superviseurs VFX et chefs de studio** | De petits retours tardifs sur les assets ou la lumière déclenchent des re-rendus complets | Le Deep EXR natif et les passes par lumière absorbent la majorité des retouches dans Nuke sans relancer les couches intactes |
| **Pipeline TDs** | Maintenance de scripts fragiles pour les marges EXR, le câblage AOV et les écarts couleur entre logiciels | Rendu hors-champ EXR natif, API de scripting documentées (RNA/C++), cache OptiX isolé et configuration AIO-OCIO unifiée |
| **Artistes éclairage** | Activation répétitive des passes sur de nombreuses couches et contrôle artistique limité par lumière | Préréglages par lots dans le gestionnaire de couches, passes directes/indirectes par lumière et teinte d'ombre dédiée |
| **Compositeurs (Nuke)** | Bordures noires lors de la distorsion d'objectif, absence de profondeur dans fumée/fourrure et câblage manuel des `Shuffle` | Cadre hors-champ reconnu automatiquement, compatibilité `DeepRead`/`DeepMerge` native et reconstruction lumineuse en un clic |

## 4. Liste de contrôle d'évaluation et pilote en studio

Vous pouvez tester **Industrial CG Platform** sur un seul plan réel sans perturber votre installation Blender existante :

1. **Vérifier le socle matériel et système** (voir [Installation](/fr/industrial-cg-platform/guide/installation)) :
   - **OS** : archive ZIP portable Windows 10/11 x64 pour les versions stables. (Une **préversion publique Linux Bêta** compilée sur Rocky Linux 8.10 est disponible pour tests et retours, non encore qualifiée stable.)
   - **GPU** : carte NVIDIA RTX avec OptiX recommandée ; le rendu CPU reste toujours disponible.
   - **Mémoire et disque** : 16 Go de RAM minimum (32 Go+ recommandés pour le Deep EXR multicouche), environ 1 Go d'espace disque extrait.
2. **Déployer côte à côte avec Blender officiel** : extrayez le ZIP portable dans un dossier accessible en écriture (ex. `D:\Tools\IndustrialCGPlatform\`). Le titre de fenêtre indique clairement `Blender <version> Industrial CG Platform` et le cache OptiX par défaut est isolé automatiquement.
3. **Valider l'interopérabilité `.blend`** : ouvrez un fichier de production Blender officiel existant, activez Deep EXR, Overscan et les passes par lumière sur un plan test, enregistrez et vérifiez que le fichier s'ouvre toujours proprement dans Blender officiel (les propriétés étendues sont conservées et ignorées sans erreur).
4. **Tester l'aller-retour complet avec Nuke** : vérifiez le cadrage hors-champ dans `Read`, la fusion 3D via `DeepRead` → `DeepMerge` et la reconstruction lumineuse via Auto Light Shuffle.

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/splash.webp" target="_blank" rel="noopener"><img src="/splash.webp" alt="Écran de démarrage personnalisé de la branche VFX Blender Industrial CG Platform" loading="lazy"></a>
<figcaption>Industrial CG Platform est livré en archive portable côte à côte, avec une identification claire et une compatibilité .blend complète avec Blender officiel.</figcaption>
</figure>

## 5. Un plan du tournage au compositing final (vue d'ensemble)

Un plan VFX type traverse six étapes documentées :

1. **Verrouiller la gestion couleur** — Déployez la [Configuration couleur partagée (AIO-OCIO)](/fr/aio-ocio/manual/general-softwares) dans Blender, Nuke, Maya et Houdini pour garantir une correspondance exacte entre prises de vues et 3D.
2. **Structurer les couches de rendu** — Séparez décor, accessoires, éléments principaux et données géométriques grâce aux préréglages du [Gestionnaire de couches](/fr/industrial-cg-platform/features/viewlayer-manager).
3. **Activer Deep EXR et hors-champ** — Configurez le [Deep EXR natif](/fr/industrial-cg-platform/features/deep-exr) (mode Simple ou Physical, limite VRAM) et le [Rendu hors-champ (EXR Overscan)](/fr/industrial-cg-platform/features/exr-overscan) pour la distorsion d'objectif.
4. **Activer les passes par lumière** — Séparez les lumières clé, d'appoint, de contour et d'environnement en passes directes et indirectes via les [Passes par lumière](/fr/industrial-cg-platform/features/lightgroup-lobe-passes).
5. **Automatiser l'export EXR** — Générez les arbres de sortie séparés Beauty, Deep, Cryptomatte et données géométriques avec [Export EXR automatisé (Industrial AOV Connector)](/fr/industrial-aov-connector/).
6. **Composer dans Nuke** — Fusionnez les couches 3D (`DeepRead` → `DeepMerge` → `DeepToImage`) et reconstruisez les groupes de lumières avec [Reconstruction lumière (Auto Light Shuffle)](/fr/auto-light-shuffle/).

Pour les paramètres précis des panneaux, les graphes Nuke, les conventions de nommage et le dépannage, suivez notre guide pratique dédié : **[Workflow Blender vers Nuke](/fr/blender-to-nuke-workflow/)**.

## 6. Différences clés avec Blender officiel

Industrial CG Platform reste très proche de Blender officiel afin que les studios conservent leurs extensions, outils Python et fichiers `.blend` sans friction. Plutôt que de bouleverser l'interface ou le format de Blender, la plateforme ajoute au cœur du moteur ce que des scripts Python seuls ne peuvent pas offrir : Deep EXR natif, rendu hors-champ EXR standard, passes directes/indirectes par lumière, teinte d'ombre par lumière et support d'interface autonome intégré (bQt / `PySide6`).

Pour le tableau comparatif complet, les raisons du fork, les limites de compatibilité et les cas où rester sur Blender officiel, consultez **[Industrial CG Platform vs Blender officiel](/fr/vs-stock-blender/)**. Consultez également [Prise en main](/fr/industrial-cg-platform/guide/getting-started) pour la compatibilité, [Référence API](/fr/industrial-cg-platform/api/) pour les interfaces développeurs et [Suivi du développement](/fr/feature-tracking) pour la R&D en cours (Atmosphere Volume, qualification Linux et Light Motion Blur).

## 7. Questions fréquentes (FAQ)

### Un studio peut-il tester Industrial CG Platform en parallèle de Blender officiel ?

Oui. Industrial CG Platform est distribué sous forme d'archive ZIP portable Windows x64 dotée d'un cache OptiX isolé par défaut et d'une compatibilité `.blend` complète avec Blender officiel. Définissez `BLENDER_USER_RESOURCES` avant le lancement si vous souhaitez également isoler entièrement les préférences utilisateur.

### Sous quelle licence est distribué Industrial CG Platform ?

Industrial CG Platform est publié gratuitement sous **Blender License (GNU GPL v3 ou ultérieure, `GPL-3.0-or-later`)**. Les composants d'interface tiers intégrés (tels que `bqt` et `PySide6`) conservent leurs licences amont respectives, détaillées sur la page [À propos](/fr/industrial-cg-platform/about/).

### Linux est-il pris en charge pour les fermes de rendu en studio ?

Les versions stables actuelles visent uniquement Windows x64. Une **préversion publique Linux Bêta** (compilée sur base Rocky Linux 8.10 / EL8 avec glibc 2.28+) est disponible pour tests et retours en studio, tandis que la qualification complète GPU/OptiX, bureau et performances sous Linux reste en cours. Suivez l'avancement sur [Suivi du développement](/fr/feature-tracking).

### Industrial CG Platform remplace-t-il les gestionnaires de plans ou d'assets comme Blender_Plumber ?

Non. Les gestionnaires de plans et d'assets pilotent les versions, les prises de vues et le suivi de tâches, tandis qu'Industrial CG Platform renforce le moteur de rendu Blender, la passation EXR, la gestion des passes et la couche couleur. Les deux fonctionnent ensemble de manière complémentaire dans un même pipeline.

### Où télécharger la dernière version et vérifier les empreintes ?

Téléchargez les archives ZIP stables officielles Windows x64 (ainsi que la préversion publique Linux Bêta) accompagnées des sommes SHA256 depuis la page [Versions](/fr/industrial-cg-platform/releases/) ou [GitHub Releases](https://github.com/RolandVyens/industrial-cg-platform/releases), puis suivez le [Guide d'installation](/fr/industrial-cg-platform/guide/installation).
