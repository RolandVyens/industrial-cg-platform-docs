---
title: "Workflow Blender vers Nuke : Deep EXR natif, rendu hors-champ et rééclairage par lumière"
description: "Guide complet Blender vers Nuke avec Industrial CG Platform : Deep EXR natif, rendu hors-champ (EXR Overscan), passes d'éclairage détaillées par lumière, gestionnaire de couches de rendu et outils open-source compagnons."
cover: "/blog/nuke-deep-compositing.webp"
faq: true
---

# Workflow Blender vers Nuke : Deep EXR natif, rendu hors-champ et rééclairage par lumière

Blender officiel s'arrête aux fichiers EXR plats, obligeant les compositeurs à multiplier les rendus de masques manuels, à subir des bordures noires après distorsion d'objectif et à retourner en 3D pour ajuster une seule lumière. **Industrial CG Platform** intègre directement ces capacités de production dans Blender officiel : **sortie Deep EXR native**, **rendu hors-champ (EXR Overscan)**, **passes d'éclairage détaillées par lumière** et **gestionnaire de couches de rendu** (version stable Windows x64 ; préversion publique Linux Bêta disponible pour test).

À partir d'un véritable plan VFX multicouche, ce guide détaille la chaîne complète de Cycles vers Foundry Nuke en combinant Industrial CG Platform avec nos outils open-source compagnons : export EXR automatisé ([Industrial AOV Connector](/fr/industrial-aov-connector/)), reconstruction lumineuse en un clic dans Nuke ([Auto Light Shuffle](/fr/auto-light-shuffle/)) et configuration couleur partagée ([AIO-OCIO](/fr/aio-ocio/)).

## 1. Vue d'ensemble du pipeline complet

| Étape | Outils | Livrables / Passation clés |
| --- | --- | --- |
| **Couches et gestion couleur** | [Gestionnaire de couches (ViewLayer Manager)](/fr/industrial-cg-platform/features/viewlayer-manager) + [Configuration couleur (AIO-OCIO)](/fr/aio-ocio/) | Couches de rendu propres (décor, accessoires, personnage principal et couche dédiée aux données géométriques) partageant la même configuration OCIO 2.0+ entre Blender et Nuke |
| **Configuration de rendu Cycles** | [Deep EXR natif](/fr/industrial-cg-platform/features/deep-exr) + [Rendu hors-champ (EXR Overscan)](/fr/industrial-cg-platform/features/exr-overscan) + [Passes par lumière](/fr/industrial-cg-platform/features/lightgroup-lobe-passes) | Fichiers Deep EXR multi-échantillons, marges hors-champ pour la distorsion d'objectif et passes directes/indirectes de diffus, spéculaire, transmission et volume par lumière |
| **Export depuis le compositeur** | [Export EXR automatisé (Industrial AOV Connector)](/fr/industrial-aov-connector/) (5.3.0) | Arbre d'export multicouche généré automatiquement séparant l'image principale (Beauty), le Deep, les masques Cryptomatte et les données géométriques anticrénelées |
| **Compositing Deep et lumière dans Nuke** | Foundry Nuke + [Reconstruction lumière (Auto Light Shuffle)](/fr/auto-light-shuffle/) | Fusion 3D par profondeur (`DeepRead` → `DeepMerge` → `DeepToImage`) associée à un arbre de rééclairage reconstruit automatiquement |
| **Couleur et livraison finale** | [AIO-OCIO](/fr/aio-ocio/manual/general-softwares) dans Nuke | Transformations AgX / Filmic / ACES strictement identiques et rendu final recadré au format de livraison |

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/screenshots/blender-to-nuke-workflow/compositor-aov-deep-tree.webp" target="_blank" rel="noopener"><img src="/screenshots/blender-to-nuke-workflow/compositor-aov-deep-tree.webp" alt="Arbre de nœuds du compositeur Industrial CG Platform acheminant plusieurs couches de rendu vers des sorties Beauty, Deep, Cryptomatte et données géométriques" loading="lazy"></a>
<figcaption>Arbre de compositeur issu d'un plan réel dans Industrial CG Platform : plusieurs couches de rendu acheminées via Industrial AOV Connector vers des sorties séparées Beauty, Deep EXR, Cryptomatte et données géométriques.</figcaption>
</figure>

## 2. Ce dont vous avez besoin

Installez uniquement les briques utiles à votre plan :

| Composant | Ce qu'il résout | Plateforme / Prérequis |
| --- | --- | --- |
| **[Industrial CG Platform](/fr/industrial-cg-platform/releases/)** | Sortie Deep EXR native, rendu hors-champ (EXR Overscan), passes directes/indirectes par lumière, teinte d'ombre par lumière et gestionnaire de couches de rendu | Archive ZIP stable Windows 10/11 x64 (préversion publique Linux Bêta sur Rocky Linux 8.10 disponible pour test) |
| **Foundry Nuke** | Compositing profond (`DeepRead` / `DeepMerge` / `DeepToImage`), rééclairage multipasse, distorsion d'objectif et livraison finale | Windows / Linux / macOS |
| **[Export EXR automatisé (Industrial AOV Connector)](/fr/industrial-aov-connector/)** (5.3.0) | Construit automatiquement les arbres d'export multicouches, câble le débruitage, formate les passes Z/Position/Normale pour Nuke, désactive le rendu par défaut inutile ou propose un mode Fake Deep | Extension Blender 4.x / 5.x (compatible plateforme et Blender officiel) |
| **[Séparateur de lumières Blender officiel (Industrial Light AOV Splitter)](/fr/industrial-light-aov-splitter/)** | Sépare les groupes de lumières en passes diffus, spéculaire, transmission et volume sous **Blender officiel** dépourvu des passes natives | Extension Blender |
| **[Reconstruction lumière en un clic (Auto Light Shuffle)](/fr/auto-light-shuffle/)** | Lit les EXR de lumières Blender dans Nuke et génère automatiquement un arbre équilibré `Shuffle2`/`Merge2` avec cadres étiquetés et alpha préservé | Script Python Foundry Nuke (`nuke_blender_autoaov.py`) |
| **[Configuration couleur partagée (AIO-OCIO)](/fr/aio-ocio/)** | Garantit un rendu strictement identique des espaces AgX, Filmic, ACEScg et Log caméra entre Blender et Nuke | Configuration OCIO 2.0+ pour Blender, Nuke, Maya et Houdini |

## 3. Étape 1 — Découpage des couches et alignement couleur

Verrouillez vos couches de rendu et votre configuration couleur avant d'activer le Deep ou les AOV afin d'éviter toute reprise en aval :

1. **Organiser les couches par préréglages** : ouvrez le **[Gestionnaire de couches (ViewLayer Manager)](/fr/industrial-cg-platform/features/viewlayer-manager)** à côté du sélecteur ViewLayer en haut à droite de Blender. Séparez les éléments clés (décor, accessoires, personnage principal et couche anticrénelée de données géométriques), puis appliquez des préréglages de passes et de lumières sur plusieurs couches à la fois.
2. **Partager une seule configuration couleur** : faites pointer Blender et Nuke vers le même `config.ocio` **AIO-OCIO** via la variable d'environnement `OCIO` (ou le dossier `<major.minor>/colormanagement/` de Blender) pour aligner parfaitement les EXR linéaires et les vues AgX/ACES. Voir [Configuration couleur Blender](/fr/aio-ocio/manual/blender-setup) et [Configuration multi-logiciels](/fr/aio-ocio/manual/general-softwares).
3. **Éviter les rendus par défaut en double** : avec **Industrial AOV Connector 5.3.0**, laissez cochée l'option **Automatically Disable Default Render Output** dans les préférences afin que la sortie de rendu par défaut de Blender (`Save Output`) soit désactivée automatiquement lors de la génération de l'arbre.

## 4. Étape 2 — Rendre un Deep EXR natif

Le Deep EXR natif enregistre plusieurs échantillons de profondeur 3D et de transparence (`Z`, `ZBack`, `RGBA`) par pixel directement depuis Cycles — couvrant les surfaces, les volumes d'objets et les shaders World Volume natifs — permettant à Nuke de fusionner personnages, fourrure, fumée et brouillard atmosphérique dans l'espace 3D sans masques manuels.

1. **Choisir la sortie Deep EXR** :
   - **Sortie rapide monocouche** : dans **Output Properties > Output**, réglez **File Format** sur `Deep EXR` (`RGBA`, `16-bit` demi-flottant ou `32-bit` flottant complet, compression sans perte `ZIPS`).
   - **Sortie multicouche par compositeur (recommandé en production)** : ajoutez un nœud `File Output` (ou laissez Industrial AOV Connector le générer), choisissez **Node Format** → `Image` → `Deep EXR` et connectez la sortie `Image` de chaque couche.
2. **Choisir le mode couleur Deep** : dans **Render Properties > Performance > Deep**, laissez activé le **Mode léger (`Simple Mode`)** par défaut pour répartir la couleur Beauty non débruitée sur les échantillons profonds avec un poids mémoire et disque réduit. Décochez-le pour passer en **Mode physique (`Physical Mode`)** uniquement lorsque des volumes semi-transparents complexes exigent la radiance brute à chaque tranche de profondeur.
3. **Plafonner la mémoire vidéo** : dans **Render Properties > Performance > Memory**, ajustez la **Limite VRAM Deep (`Deep Tile Budget`)** (par défaut `1024 Mo`, ou `0` pour illimité). Sur les plans haute résolution, Cycles réduit automatiquement la taille des tuiles pour respecter la VRAM sans diminuer la précision de profondeur.

Consultez le [Manuel Deep EXR](/fr/industrial-cg-platform/features/deep-exr) et l'article [Blender Deep EXR in Nuke](/blog/posts/2026-07-22-deep-exr-compositing) pour tous les paramètres.

## 5. Étape 3 — Activer le rendu hors-champ (EXR Overscan)

Lorsque Nuke applique une distorsion d'objectif, un tremblement caméra ou une stabilisation 2D, un cadrage standard fait apparaître des bordures noires. Le **rendu hors-champ (EXR Overscan)** calcule une marge supplémentaire tout autour de l'image sans modifier le cadrage final, en inscrivant le cadre de livraison (`displayWindow`) et les limites étendues (`dataWindow`) dans les métadonnées OpenEXR standards.

1. Vérifiez que **Render Engine** est réglé sur `Cycles` et que **Render Region** est décoché dans **Output Properties > Format** (l'overscan est automatiquement désactivé lorsque Render Region est actif).
2. Réglez le format de sortie sur `OpenEXR`, `OpenEXR Multilayer` ou `Deep EXR`.
3. Ouvrez **Output Properties > Overscan** (juste sous **Format**) et saisissez une marge en pourcentage ou en pixels (par exemple `15%` pour absorber la distorsion d'objectif).

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/screenshots/blender-to-nuke-workflow/viewport-overscan-guide.webp" target="_blank" rel="noopener"><img src="/screenshots/blender-to-nuke-workflow/viewport-overscan-guide.webp" alt="Vue caméra Industrial CG Platform montrant le cadre de livraison intérieur et la marge hors-champ pointillée de 15 pour cent" loading="lazy"></a>
<figcaption>Vue caméra d'un plan réel dans Industrial CG Platform : le cadre intérieur repère le format final et le cadre pointillé extérieur montre la marge hors-champ de 15 %.</figcaption>
</figure>

Dans Nuke, `Read` et `DeepRead` reconnaissent automatiquement le cadre final et la marge étendue, fournissant de vrais pixels rendus aux nœuds `LensDistortion`, `Transform` et `Blur`. Voir le [Manuel EXR Overscan](/fr/industrial-cg-platform/features/exr-overscan).

## 6. Étape 4 — Passes détaillées par lumière (diffus, spéculaire, volume)

Pour rééquilibrer les reflets, les rebonds indirects ou le volume d'une seule lumière dans Nuke sans relancer de rendu, activez les **passes d'éclairage détaillées par groupe (Lightgroup Lobe Passes)** :

1. Dans **View Layer Properties > Passes > Light**, créez vos groupes de lumières (par exemple `env`, `key`, `fill01`, `fill02`) et activez **Light Pass AOVs**.
2. Cochez les composantes **Direct** et **Indirect** souhaitées (diffus, spéculaire, transmission, volume) pour chaque groupe.
3. Vérifiez l'équilibre énergétique au compositing : la somme de toutes les passes par lumière (plus les passes `Combined_<lg>` des surfaces émissives) restitue exactement l'image Beauty. Voir le [Manuel Lightgroup Lobe Passes](/fr/industrial-cg-platform/features/lightgroup-lobe-passes).

### Passes natives par lumière vs. Séparateur pour Blender officiel

Industrial 3D propose deux solutions distinctes selon que votre équipe utilise **Industrial CG Platform** ou **Blender officiel** :

| Critère | Passes natives par lumière (Lightgroup Lobe Passes) | [Séparateur Blender officiel (Industrial Light AOV Splitter)](/fr/industrial-light-aov-splitter/) |
| --- | --- | --- |
| **Version de Blender requise** | Industrial CG Platform (natif dans Cycles) | Blender officiel (extension Python) |
| **Niveau de détail** | Passes **Direct + Indirect** séparées (diffus, spéculaire, transmission, volume) par groupe de lumière | Passes diffus, spéculaire, transmission et volume par groupe de lumière |
| **Contraintes de scène** | Utilise le panneau Lightgroup standard de Cycles sans règle de nommage de collection | Les lumières doivent être dans des collections `lgt_*` avec des noms alphanumériques uniquement (sans underscore) |
| **Reconstruction Nuke** | Reconnues en priorité par [Auto Light Shuffle](/fr/auto-light-shuffle/) | Reconnues automatiquement par [Auto Light Shuffle](/fr/auto-light-shuffle/) |

## 7. Étape 5 — Compositing dans Nuke

### Chaîne de compositing Deep (`DeepRead` → `DeepMerge` → `DeepToImage`)

1. Chargez la séquence Deep EXR de chaque couche avec un nœud **`DeepRead`** (décor, accessoires, personnage).
2. Assemblez les couches 3D qui s'entrecroisent avec **`DeepMerge`** : utilisez `combine` pour une fusion en profondeur classique, ou `holdout` pour découper proprement un premier plan dans un flux Deep d'arrière-plan.
3. Si vous rééclairez ou étalonnez une couche en 2D grâce à ses passes par lumière, reliez l'image 2D modifiée et son flux Deep correspondant dans **`DeepRecolor`** avant **`DeepMerge`** pour réappliquer la profondeur 3D exacte.
4. Aplatissez le flux Deep assemblé en 2D avec **`DeepToImage`** pour l'étalonnage final, les effets optiques et l'export `Write`.

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/blog/nuke-deep-compositing.webp" target="_blank" rel="noopener"><img src="/blog/nuke-deep-compositing.webp" alt="Graphe de compositing Deep dans Nuke fusionnant plusieurs couches Deep EXR issues de Blender Cycles" loading="lazy"></a>
<figcaption>La fusion de couches Deep EXR Blender Cycles dans Nuke via DeepRead, DeepMerge et DeepToImage élimine les rendus manuels de masques.</figcaption>
</figure>

### Reconstruction lumineuse en un clic (Auto Light Shuffle)

1. Importez l'EXR multicouche Beauty et lumières avec un nœud **`Read`** standard de Nuke.
2. Sélectionnez ce nœud `Read` et lancez **[Auto Light Shuffle](/fr/auto-light-shuffle/)** (`nuke_blender_autoaov.py`).
3. Le script détecte automatiquement tous les groupes de lumières, privilégie les canaux les plus fins disponibles (`<lobe>_direct_<light>` / `<lobe>_indirect_<light>` → `<lobe>_<light>` → `Combined_<light>`), construit un arbre équilibré `Shuffle2` / `Merge2` organisé en cadres gris étiquetés et conserve l'alpha d'origine via `Copy` et `Premult`.

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/blog/nuke-lightgroup-lobes.webp" target="_blank" rel="noopener"><img src="/blog/nuke-lightgroup-lobes.webp" alt="Graphe Nuke reconstruisant les passes directes et indirectes des lumières Blender" loading="lazy"></a>
<figcaption>La reconstruction automatique des passes directes et indirectes par lumière dans Nuke offre un rééclairage fin sans repasser par Cycles.</figcaption>
</figure>

### Alternative Fake Deep sans Deep natif

Si un plan doit être rendu sous Blender officiel ou ne nécessite qu'une profondeur simple sans volumes multi-échantillons, le mode **Fake Deep** intégré à **Industrial AOV Connector** exporte une passe `Z` anticrénelée exploitable avec `DeepFromImage` dans Nuke. Voir [Fake Deep et compositing profond](/fr/industrial-aov-connector/manual/fakedeep).

## 8. Nommage des fichiers et liste de contrôle

Des noms de couches et de canaux cohérents permettent aux gabarits Nuke et à Auto Light Shuffle de fonctionner sans recâblage manuel :

```text
# Sorties EXR types par couche (générées par Industrial AOV Connector)
<shot>_<viewlayer>--RgBA.####.exr        # Beauty + passes par lumière (EXR 16-bit half)
<shot>_<viewlayer>--Deep.####.exr        # Deep EXR natif (RGBA + Z/ZBack 32-bit, ZIPS)
<shot>_<viewlayer>--CryptoMaTTe.####.exr # Masques Cryptomatte 32-bit float
<shot>_<viewlayer>_DATA--DaTA.####.exr   # Données géométriques 32-bit float (Z, Position P, Normale, Vecteur)

# Convention de nommage des passes par lumière Cycles
Diffuse_Direct_<lg> / Diffuse_Indirect_<lg>
Glossy_Direct_<lg>  / Glossy_Indirect_<lg>
Transmission_Direct_<lg> / Transmission_Indirect_<lg>
Volume_Direct_<lg>  / Volume_Indirect_<lg>
```

**Liste de contrôle avant passation au compositing :**

1. Vérifier que la résolution du cadre de livraison est exacte et que la marge hors-champ correspond au cahier des charges.
2. Vérifier que chaque séquence Deep EXR inclut un canal Alpha (`RGBA`, indispensable pour `DeepMerge`) et utilise une compression sans perte `ZIPS` ou `RLE`.
3. Contrôler que la somme de toutes les passes par lumière (y compris les `Combined_<lg>` émissives) reconstitue fidèlement la Beauty.
4. Transmettre la version exacte de la configuration **AIO-OCIO** ainsi que l'espace couleur de rendu (`ACEScg` ou `Linear Rec.709`).
5. Conserver les masques Cryptomatte et les passes géométriques (`Z`, `P`, `Normale`) en `32-bit float` sans débruitage.

## 9. Dépannage

```text
Ordre de diagnostic Nuke pour les rendus Deep et AOV Blender :
DeepRead -> DeepSample (inspecter Z / ZBack / Alpha par pixel)
         -> DeepRecolor (réappliquer la profondeur 3D sur une image 2D rééclairée)
         -> DeepMerge (combine / holdout)
         -> DeepToImage -> Reformat / Crop (vérifier cadre final vs marge hors-champ)
```

- **Bords mous ou franges dans les volumes avec `DeepMerge`** : inspectez les échantillons avec `DeepSample` dans Nuke. Si des échantillons proches fusionnent trop fort, réduisez la **Tolérance de fusion de profondeur (`Deep Merge Tolerance`)** et la **Tolérance alpha (`Alpha Merge Tolerance`)** (par défaut `0.010`) dans les réglages Deep EXR de Blender. Pour une radiance physique stricte dans des volumes semi-transparents imbriqués, décochez **Simple Mode** dans **Render Properties > Performance > Deep** pour passer en **Physical Mode**.
- **Saturation mémoire GPU en rendu Deep haute résolution** : abaissez la **Limite VRAM Deep (`Deep Tile Budget`)** dans **Render Properties > Performance > Memory** (par défaut `1024 Mo`). Cycles réduit automatiquement la taille des tuiles pour respecter la VRAM sans perte de précision.
- **Panneau Overscan grisé** : vérifiez que **Render Engine** est sur `Cycles` et décochez **Render Region** dans **Output Properties > Format**.
- **Limitations actuelles connues** : la **conservation complète des métadonnées Deep personnalisées** relève d'évolutions futures hors base actuelle.

## 10. Questions fréquentes (FAQ)

### Blender officiel peut-il réaliser ce workflow Deep EXR et hors-champ vers Nuke ?

Pas nativement. Blender officiel ne propose ni sortie Deep EXR native dans Cycles, ni rendu hors-champ OpenEXR standard, ni passes directes/indirectes par lumière. Vous pouvez toutefois utiliser nos outils autonomes ([Industrial AOV Connector](/fr/industrial-aov-connector/), [Industrial Light AOV Splitter](/fr/industrial-light-aov-splitter/), [Auto Light Shuffle](/fr/auto-light-shuffle/) et [AIO-OCIO](/fr/aio-ocio/)) avec Blender officiel, mais le Deep EXR natif et le véritable rendu hors-champ nécessitent [Industrial CG Platform](/fr/industrial-cg-platform/).

### Faut-il installer Industrial AOV Connector si l'on utilise déjà Industrial CG Platform ?

C'est facultatif pour un test monocouche : vous pouvez écrire un Deep EXR directement depuis **Output Properties > Output**. En revanche, sur un plan de production multicouche, [Industrial AOV Connector](/fr/industrial-aov-connector/) fait gagner un temps précieux en séparant automatiquement Beauty, Deep, Cryptomatte et données géométriques, en câblant le débruitage et en désactivant le rendu par défaut inutile.

### Quand utiliser le Deep EXR natif plutôt que le Fake Deep ?

Utilisez le **Deep EXR natif** dès que des éléments s'entrecroisent dans l'espace 3D — personnage traversant de la fumée, fourrure, particules ou feuillage — lorsqu'un pixel requiert plusieurs échantillons de profondeur. Réservez [Fake Deep](/fr/industrial-aov-connector/manual/fakedeep) aux plans contraints sur Blender officiel ou lorsqu'une simple passe `Z` anticrénelée suffit.

### Faut-il rendre le Deep EXR en Simple Mode ou en Physical Mode ?

Commencez avec le **Simple Mode** activé par défaut : il consomme moins de mémoire, produit des fichiers plus légers et rend plus vite sur la majorité des plans. Passez en **Physical Mode** (en décochant **Simple Mode**) uniquement lorsque des volumes semi-transparents imbriqués exigent la radiance brute à chaque tranche de profondeur.

### Ce workflow fonctionne-t-il sous Linux ?

Les versions stables actuelles (**Industrial CG Platform**, GPL-3.0-or-later) visent **Windows 10/11 x64**. Une **préversion publique Linux Bêta** (compilée sur Rocky Linux 8.10) est disponible pour les tests et retours, tandis que la qualification complète GPU/OptiX et bureau Linux reste en cours. Voir [Suivi du développement](/fr/feature-tracking) et [Versions](/fr/industrial-cg-platform/releases/).
