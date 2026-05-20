# FAQ

## Généralités

### S'agit-il d'une version officielle de Blender ?

Non. Industrial CG Platform est un fork de Blender maintenu par la communauté. Il n'est ni affilié ni approuvé par la Fondation Blender. Il est publié sous la même licence GPL-2.0-or-later que Blender.

### Les fichiers `.blend` sont-ils compatibles avec Blender standard ?

Oui. Les fichiers créés dans Industrial CG Platform peuvent être ouverts dans Blender 5.2 standard. Les fonctionnalités personnalisées (Deep EXR, etc.) ne seront tout simplement pas disponibles — les données sont préservées mais ignorées.

### Puis-je utiliser mes add-ons Blender existants ?

La plupart des add-ons Blender qui fonctionnent avec Blender 5.2 devraient fonctionner avec Industrial CG Platform.

## Rendu

### Quels backends GPU sont pris en charge ?

- **CUDA** — Tous les GPU NVIDIA avec capacité de calcul 5.0+
- **OptiX** — GPU NVIDIA RTX (recommandé pour de meilleures performances)
- **CPU** — Toujours disponible

### Les fonctionnalités personnalisées fonctionnent-elles sur CPU ?

Oui. Deep EXR, les passes de lobe de lightgroup et la couleur d'ombre fonctionnent sur les backends CPU, CUDA et OptiX.

## Gestionnaire de ViewLayer

### Pourquoi s'ouvre-t-il dans une fenêtre séparée ?

Le gestionnaire de ViewLayer utilise Qt (via BQt) pour son interface utilisateur, qui ne peut pas être intégrée directement dans l'architecture UI native de Blender.
