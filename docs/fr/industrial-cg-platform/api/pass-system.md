---
title: "Système de Passes & AOV"
description: "Cette page documente comment Industrial CG Platform étend le système de passes de rendu et d'AOV de Blender."
---
# Système de Passes & AOV

Cette page documente comment Industrial CG Platform étend le système de passes de rendu et d'AOV de Blender.

## Nouveaux Types de Passes

### Passes Deep EXR

| Type de Passe | Nom Interne | Description |
| --- | --- | --- |
| `PASS_DEEP_COMBINED` | `Deep Combined` | RGBA par échantillon avec profondeur pour la composition deep |
| `PASS_DEEP_POSITION` | `Deep Position` | Données de position en espace monde par échantillon |

### Passe de Brouillard (Environment Fog - En développement)

| Type de Passe | Nom Interne | Description |
| --- | --- | --- |
| `PASS_FOG` | `Fog` | Passe de contribution du brouillard d'environnement |

::: warning
La passe de brouillard fait partie de la fonctionnalité Brouillard d'Environnement (Environment Fog) qui n'est pas encore finalisée.
:::

## Enregistrement des Passes par Lobe de Lightgroup

Lorsque `use_lightgroup_light_pass_aovs` est activé sur un ViewLayer, le système enregistre des passes supplémentaires par lightgroup lors de la configuration du rendu.

### Flux d'Enregistrement

```
Sync ScèneScene sync → Config Film Film setup → Pour chaque lightgroup For each lightgroup:
  → Si les passes séparées sont activées If split passes enabled:
    → Enregistrer Combined_<lg>
    → Enregistrer Diffuse_Direct_<lg> (si activé)
    → Enregistrer Diffuse_Indirect_<lg> (si activé)
    → Enregistrer Glossy_Direct_<lg> (si activé)
    → ... (toutes les combinaisons de lobes activées)
```

### Convention de Dénomination des Passes

```
<Lobe>_<Direction>_<LightgroupName>
```

Où :
- **Lobe** : `Diffuse`, `Glossy`, `Transmission`, `Volume`
- **Direction** : `Direct`, `Indirect`
- **LightgroupName** : Le nom du lightgroup défini par l'utilisateur

La passe `Combined_<lg>` est toujours présente pour chaque lightgroup par défaut.

### Mappage du Décalage de Film

Chaque passe enregistrée reçoit un décalage unique dans le tampon du film de Cycles. Le tableau d'index de séparation de lightgroup mappe :

```
lightgroup_split_index[lightgroup_id * num_split_types + split_type_index] = film_offset
```

Cela est accessible dans le noyau (kernel) via `kernel_data_fetch(lightgroup_split_index, index)`.

## Lecture de Passe (Pass Readback)

### Préservation de l'Identité (Identity Preservation)

Un correctif de précision essentiel garantit que les passes de lobe séparées par lightgroup sont lues via leur véritable identité `PassType`, et non via le premier type de passe générique correspondant. Cela évite :

- Les passes direct-only apparaissant vides lorsque des passes indirect-only existent.
- Les conflits d'alias de contenu de passe entre différentes combinaisons de lobes de lightgroup.

Le correctif réside dans :
```
intern/cycles/integrator/path_trace_tile.h
```

### Intégration du Compositeur (Compositor Integration)

Les passes par lobe de lightgroup sont exposées sous forme de passes de rendu standard de Blender et apparaissent dans :
- Le compositeur de Blender sous forme de sorties de nœud Render Layers.
- Le sélecteur de passes de l'éditeur d'images.
- La sortie OpenEXR multicouche sous forme de calques nommés.

## Format de Sortie Deep EXR

Lorsque la sortie Deep EXR est activée :

1. Le pipeline de rendu stocke les données de profondeur par échantillon en plus des données de couleur.
2. Lors de la sortie, l'API d'image deep d'OpenEXR est utilisée pour écrire le fichier deep.
3. Le format deep est compatible avec les outils de composition deep standard de l'industrie (nœud `DeepRead` de Nuke, etc.).

### Budget de Tile Deep (Deep Tile Budget)

Le paramètre `deep_tile_budget` contrôle le nombre d'échantillons par pixel pouvant être stockés pendant le rendu des tiles. Des valeurs plus élevées préservent plus de détails de profondeur mais consomment plus de mémoire.

## Fichiers Sources

| Fichier | Objectif |
| --- | --- |
| `intern/cycles/scene/film.cpp` | Enregistrement des passes et configuration du film |
| `intern/cycles/integrator/path_trace_tile.h` | Lecture de passe avec préservation de l'identité |
| `intern/cycles/blender/addon/properties.py` | Définitions des propriétés de passe de l'extension Cycles |
| `source/blender/render/intern/pipeline.cc` | Intégration des passes du pipeline de rendu de Blender |
| `source/blender/makesrna/intern/rna_scene.cc` | Définitions des propriétés de passe RNA |
| `intern/cycles/kernel/types.h` | Énumérations des types de passes du noyau |
