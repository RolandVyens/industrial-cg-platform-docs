---
title: "Gestionnaire de ViewLayer"
description: "Le gestionnaire de ViewLayer (ViewLayer Manager) est une fenêtre d'outil dédiée basée sur Qt qui fournit une interface complète pour gérer les ViewLay..."
---
# Gestionnaire de ViewLayer

<Badge type="tip" text="Publié" />

## Qu'est-ce que c'est ?

Le gestionnaire de ViewLayer (ViewLayer Manager) est une fenêtre d'outil dédiée basée sur Qt qui fournit une interface complète pour gérer les ViewLayers (calques de vue), les passes de rendu, les Shader AOVs, les groupes de lumières (lightgroups) et les contrôles AOV des passes de lumière Cycles — le tout depuis un seul panneau organisé, en dehors de l'éditeur de propriétés natif de Blender.

Il est construit sur [BQt](https://github.com/techartorg/bqt) et est fourni en tant qu'extension système (System Extension) Blender intégrée.

## Pourquoi l'utiliser ?

- **Gestion centralisée** — Tous les paramètres liés aux ViewLayers dans une seule fenêtre au lieu d'être dispersés dans de multiples onglets de propriétés.
- **Système de préréglages** — Enregistrez et appliquez des configurations de passes en tant que préréglages nommés sur plusieurs ViewLayers à la fois.
- **Opérations par lots** — Sélectionnez plusieurs ViewLayers dans la liste de gauche et appliquez-y des préréglages simultanément.
- **Affichage organisé des passes** — Les passes sont regroupées en catégories logiques : Données (Data), Lumière (Light), Shader et Effets/Utilitaires (Effects / Utility).
- **Interface multilingue** — L'interface du gestionnaire prend en charge les traductions en chinois simplifié, chinois traditionnel et français.

## Comment le Lancer

1. Regardez dans la barre d'en-tête en haut à droite de Blender, juste à côté du sélecteur `ViewLayer` natif.
2. Cliquez sur le bouton **ViewLayer Manager** (icône dédiée).
3. Le gestionnaire s'ouvre sous la forme d'une fenêtre Qt autonome.

::: info
Au premier clic, l'extension d'exécution BQt intégrée est automatiquement activée pour la session en cours. Vous n'avez pas besoin d'activer manuellement des extensions dans les préférences.
:::

## Disposition de la Fenêtre du Gestionnaire

### Panneau Gauche — Liste des ViewLayers

- Répertorie tous les ViewLayers de la scène actuelle.
- Commutateur **Utiliser pour le rendu (Use For Rendering)** directement en ligne pour chaque ViewLayer.
- Boutons **Monter (Up)** / **Descendre (Down)** pour réordonner les ViewLayers.
- Prise en charge de la multi-sélection pour l'application de préréglages par lots.
- Créez, renommez et supprimez des ViewLayers directement.

### Panneau Droit — Volet de Détails

Modifie le ViewLayer actuellement sélectionné avec des sections pour :

#### Passes (Render Passes)

Organisé en sous-groupes natifs de Blender :

| Groupe | Contenu |
| --- | --- |
| **Données (Data)** | Combined, Z, Mist, Normal, Position, Vector, UV, Object Index, Material Index, etc. |
| **Lumière (Light)** | Diffuse (Direct/Indirect/Color), Glossy, Transmission, Volume, Emission, Background, Shadow, Ambient Occlusion |
| **Shader** | Entrées de passes Shader AOV personnalisées |
| **Effets / Utilitaires** | Données de débruitage (Denoising), Nombre d'échantillons (Sample Count) |

#### Cryptomatte

Section dédiée aux paramètres de passes Cryptomatte (disponible pour Eevee et Cycles).

#### Profondeur (Deep)

Propriété de sortie Deep OpenEXR au niveau du ViewLayer (étiquette volontairement conservée en anglais pour des raisons techniques).

#### Shader AOV

Liste à colonne unique pour gérer les entrées Shader AOV personnalisées.

#### Groupes de Lumières (Light Groups)

Gère les groupes de lumières affectés au ViewLayer actuel.

#### Passes de Lumière Cycles AOV (Cycles Light Pass AOVs)

Activez et configurez la sortie de passes par lobe de lightgroup :
- Diffuse (Direct / Indirect)
- Glossy (Direct / Indirect)
- Transmission (Direct / Indirect)
- Volume (Direct / Indirect)

### Barre d'outils des préréglages (Presets)

- **Save** — Enregistre les paramètres de passes du ViewLayer actuel en tant que préréglage nommé.
- **Update** — Met à jour un préréglage existant avec les paramètres actuels.
- **Apply** — Applique un préréglage à tous les ViewLayers actuellement sélectionnés dans la liste de gauche.
- **Delete** — Supprime un préréglage.

Les préréglages sont stockés sous forme de fichiers JSON dans le répertoire local des ressources de l'extension Blender de l'utilisateur.

## Visibilité selon le Moteur de Rendu

Le gestionnaire affiche ou masque automatiquement des sections selon le moteur de rendu actif :

| Section | CYCLES | EEVEE |
| --- | --- | --- |
| Passes Eevee | ❌ | ✅ |
| Passes Cycles | ✅ | ❌ |
| Groupes de Lumières | ✅ | ❌ |
| Passes de Lumière Cycles AOV | ✅ | ❌ |
| Shader AOV | ✅ | ✅ |

## Écriture Directe (Live Write-Back)

Les modifications de propriétés dans le gestionnaire sont réécrites dans Blender **immédiatement** — il n'y a pas d'étape de validation manuelle pour l'édition normale. Le gestionnaire se synchronise automatiquement lorsqu'il est affiché et lorsqu'il reprend le focus système.

## Comportement Connu

- Le gestionnaire s'exécute comme une fenêtre Qt autonome de haut niveau (non intégrée à l'interface native de Blender).
- L'exécution de BQt peut journaliser `failed to get blender hwnd, creating new window` — c'est un comportement attendu dans le chemin du mode sécurisé, et non un échec de lancement.
- Version Windows uniquement pour le moment. Le support Linux est reporté à une version ultérieure.

## Voir Aussi

- [Opérateurs Python (API)](/fr/industrial-cg-platform/api/python-operators) — Référence de l'opérateur `wm.blender_vfx_viewlayer_manager_show`.
- [Passes par lobe de lightgroup](/fr/industrial-cg-platform/features/lightgroup-lobe-passes) — Les passes par lobe contrôlées par la section Cycles Light Pass AOVs.
- [Manuel Blender: View Layers](https://docs.blender.org/manual/en/latest/render/layers/view_layer.html) — Documentation Blender standard sur les View Layers.
