# Sortie Deep EXR

<Badge type="tip" text="Publié" />

## Qu'est-ce que c'est ?

Deep EXR est un format de sortie de rendu qui stocke les informations de profondeur par échantillon avec les données de couleur. Contrairement aux fichiers EXR "plats" standard qui ne stockent que la surface visible la plus proche, Deep EXR préserve chaque échantillon de profondeur qui contribue au pixel final. Cela permet un **compositing profond sans perte** dans des outils comme Nuke, où les calques CG peuvent être fusionnés en fonction de leur profondeur réelle plutôt que par de simples opérations de superposition (over).

Industrial CG Platform ajoute une prise en charge native de la sortie Deep EXR à Blender Cycles, permettant d'écrire des données de compositing profond directement depuis Blender sans aucun outil de conversion externe.

## Pourquoi l'utiliser ?

- **Fusion profonde sans perte** — Combinez plusieurs calques de rendu CG dans Nuke à l'aide de `DeepMerge` sans artefacts de bord ni masques de découpe manuels (holdout mattes).
- **Profondeur par échantillon** — Chaque pixel contient des informations de profondeur complètes, permettant aux compositeurs en aval de découper, rééchantillonner et réeclairer à des plages de profondeur arbitraires.
- **Prise en charge du volume** — Les données de rendu de volume sont incluses dans la sortie profonde (comportement par défaut actuel).
- **Sortie directe et compositeur** — Fonctionne à la fois comme sortie de rendu de scène directe et via le nœud de sortie de fichier du compositeur Blender.

## Comment l'activer

### Sortie de Scène

1. Ouvrez **Propriétés > Propriétés de sortie > Sortie (Properties > Output Properties > Output)**.
2. Remplacez le **Format de fichier (File Format)** par `Deep OpenEXR`.
3. Définissez le **Deep Tile Budget** souhaité (contrôle le compromis mémoire/qualité pour les données profondes).
4. Rendez votre scène normalement.

### Sortie de fichier du Compositeur

1. Ajoutez un nœud **File Output** dans le compositeur.
2. Définissez son format sur `Deep OpenEXR`.
3. Connectez vos calques de rendu.
4. Le nœud de sortie de fichier profond fonctionne correctement lorsque le périphérique du compositeur (Compositor Device) est défini sur `GPU`.

::: info
La sortie de fichier Deep EXR ne force pas le reste du compositeur à quitter le GPU — elle s'intègre parfaitement au compositing GPU.
:::

## Paramètres

| Paramètre | Description | Défaut |
| --- | --- | --- |
| **Deep Output** | Activer le format de sortie Deep EXR | Désactivé |
| **Deep Tile Budget** | Budget mémoire par tuile pour le stockage d'échantillons profonds (plus élevé = plus d'échantillons préservés) | Automatique |

## Flux de travail Nuke

1. Rendez vos calques de scène avec la sortie Deep EXR activée.
2. Importez les fichiers `.exr` dans Nuke en utilisant des nœuds `DeepRead`.
3. Utilisez `DeepMerge` pour composer les calques en fonction de la profondeur.
4. Utilisez `DeepToImage` pour aplatir les données profondes en une image standard.

::: tip
Pour de meilleurs résultats, rendez chaque élément CG majeur (personnages, décors, effets) sous forme de calques Deep EXR séparés et fusionnez-les dans Nuke.
:::

## Limites connues

- **Comportement profond du volume** — Le comportement actuel de la sortie profonde de volume est accepté tel quel. Les scènes de volume lourdes en mémoire peuvent produire des fichiers profonds très volumineux.
- **Reconstruction des métadonnées** — La reconstruction complète des métadonnées profondes est un travail futur et ne fait pas partie de la version de référence actuelle.
- **Utilisation de la mémoire** — La sortie profonde stocke beaucoup plus de données que l'EXR plat. Utilisez le paramètre Deep Tile Budget pour contrôler ce compromis.

## Travaux futurs

- Le stockage profond fragmenté/compressé inspiré de MoonRay est une optimisation future potentielle.
- Reconstruction des métadonnées pour des métadonnées de compositing en aval plus complètes.

## Voir Aussi

- [Système de passes et AOV (API)](/fr/cg-platform/api/pass-system) — Comment les passes profondes sont enregistrées en interne.
- [Manuel Blender: Propriétés de sortie](https://docs.blender.org/manual/en/latest/render/output/properties/output.html) — Paramètres de sortie standard de Blender.
