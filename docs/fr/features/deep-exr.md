# Sortie Deep EXR

<Badge type="tip" text="Publié" />

## Qu'est-ce que c'est ?

Deep EXR est un format de sortie de rendu qui stocke les informations de profondeur par échantillon avec les données de couleur. Contrairement aux fichiers EXR "plats" standard qui ne stockent que la surface visible la plus proche, Deep EXR préserve chaque échantillon de profondeur qui contribue au pixel final. Cela permet un **compositing profond sans perte** dans des outils comme Nuke, où les calques CG peuvent être fusionnés en fonction de leur profondeur réelle.

Industrial CG Platform ajoute une prise en charge native de la sortie Deep EXR à Blender Cycles.

## Pourquoi l'utiliser ?

- **Fusion profonde sans perte** — Combinez plusieurs calques de rendu CG dans Nuke à l'aide de `DeepMerge` sans artefacts de bord.
- **Profondeur par échantillon** — Chaque pixel contient des informations de profondeur complètes.
- **Prise en charge du volume** — Les données de rendu de volume sont incluses dans la sortie profonde.
- **Sortie de scène directe et compositeur** — Fonctionne à la fois comme sortie de rendu directe et via le compositeur Blender.

## Comment l'activer

### Sortie de Scène

1. Ouvrez **Propriétés > Propriétés de sortie > Sortie**.
2. Remplacez le **Format de fichier** par `Deep OpenEXR`.
3. Définissez le **Deep Tile Budget** souhaité.
4. Rendez votre scène normalement.

### Sortie de fichier du Compositeur

1. Ajoutez un nœud **File Output** dans le compositeur.
2. Définissez son format sur `Deep OpenEXR`.
3. Connectez vos calques de rendu.

## Paramètres

| Paramètre | Description | Défaut |
| --- | --- | --- |
| **Deep Output** | Activer le format de sortie Deep EXR | Désactivé |
| **Deep Tile Budget** | Budget de mémoire par tuile pour le stockage d'échantillons profonds | Automatique |

## Flux de travail Nuke

1. Rendez vos calques de scène avec la sortie Deep EXR activée.
2. Importez les fichiers `.exr` dans Nuke en utilisant des nœuds `DeepRead`.
3. Utilisez `DeepMerge` pour composer les calques en fonction de la profondeur.
4. Utilisez `DeepToImage` pour aplatir les données profondes en une image standard.

## Voir Aussi

- [Système de passes et AOV (API)](/fr/api/pass-system) — Comment les passes profondes sont enregistrées en interne.
