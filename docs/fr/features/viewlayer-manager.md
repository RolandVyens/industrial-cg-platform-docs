# Gestionnaire de ViewLayer

<Badge type="tip" text="Publié" />

## Qu'est-ce que c'est ?

Le gestionnaire de ViewLayer (ViewLayer Manager) est un outil dédié basé sur Qt qui fournit une interface complète pour gérer les ViewLayers, les passes de rendu, les Shader AOVs, les lightgroups et les contrôles AOV des passes de lumière Cycles — le tout depuis un seul panneau organisé en dehors de l'éditeur de propriétés natif de Blender.

Il est construit sur [BQt](https://github.com/techartorg/bqt) et est fourni en tant qu'extension système Blender intégrée.

## Pourquoi l'utiliser ?

- **Gestion centralisée** — Tous les paramètres liés au ViewLayer dans une seule fenêtre au lieu d'être dispersés.
- **Système de préréglages** — Enregistrez les configurations de passes en tant que préréglages et appliquez-les à plusieurs ViewLayers.
- **Opérations par lots** — Sélectionnez plusieurs ViewLayers dans la liste de gauche et appliquez-y des préréglages simultanément.
- **Affichage organisé des passes** — Les passes sont regroupées en catégories logiques.
- **Interface utilisateur multilingue** — L'interface du gestionnaire prend en charge les traductions en chinois simplifié, chinois traditionnel et français.

## Comment le Lancer

1. Regardez dans la barre d'en-tête en haut à droite dans Blender, à côté du sélecteur `ViewLayer` natif.
2. Cliquez sur le bouton **ViewLayer Manager**.
3. Le gestionnaire s'ouvre sous la forme d'une fenêtre Qt autonome.

## Voir Aussi

- [Opérateurs Python (API)](/fr/api/python-operators) — Référence de l'opérateur `wm.blender_vfx_viewlayer_manager_show`.
