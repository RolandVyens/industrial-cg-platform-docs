---
title: "Propriétés RNA"
description: "Cette page documente les nouvelles propriétés RNA qu'Industrial CG Platform ajoute au modèle de données de Blender."
---
# Propriétés RNA

Cette page documente les nouvelles propriétés RNA qu'Industrial CG Platform ajoute au modèle de données de Blender.

## Propriétés ViewLayer

### `ViewLayer.use_deep`

| Propriété | Valeur |
| --- | --- |
| **Type** | `BoolProperty` |
| **Défaut** | `False` |
| **Description** | Activer la sortie Deep EXR pour ce ViewLayer |
| **Emplacement UI** | Propriétés > View Layer > Passes |

```python
# Exemple d'accès Python
view_layer = bpy.context.view_layer
view_layer.use_deep = True
```

### `ViewLayer.use_lightgroup_light_pass_aovs`

| Propriété | Valeur |
| --- | --- |
| **Type** | `BoolProperty` |
| **Défaut** | `False` |
| **Description** | Activer la sortie de passe par lobe de lightgroup |
| **Emplacement UI** | Propriétés > View Layer > Passes > Lumière |

```python
view_layer.use_lightgroup_light_pass_aovs = True
```

### Booléens AOV par Lobe

Chaque composant de lobe peut être activé individuellement :

```python
view_layer.use_lightgroup_diffuse_direct = True
view_layer.use_lightgroup_diffuse_indirect = True
view_layer.use_lightgroup_glossy_direct = True
view_layer.use_lightgroup_glossy_indirect = True
view_layer.use_lightgroup_transmission_direct = True
view_layer.use_lightgroup_transmission_indirect = True
view_layer.use_lightgroup_volume_direct = True
view_layer.use_lightgroup_volume_indirect = True
```

## Propriétés de Lumière (Light)

### `Light.shadow_color`

| Propriété | Valeur |
| --- | --- |
| **Type** | `FloatVectorProperty` (RGB) |
| **Défaut** | `(0.0, 0.0, 0.0)` — aucune teinte d'ombre |
| **Sous-type** | `COLOR` |
| **Min/Max** | `0.0` / `1.0` par canal |
| **Description** | Teinte de couleur appliquée à la région d'ombre de cette lumière |
| **Emplacement UI** | Propriétés > Données de l'objet > Lumière |

```python
light = bpy.data.lights['Key']
light.shadow_color = (0.1, 0.05, 0.2)  # Teinte d'ombre violette subtile
```

## Propriétés du Monde (World)

### `World.shadow_color`

| Propriété | Valeur |
| --- | --- |
| **Type** | `FloatVectorProperty` (RGB) |
| **Défaut** | `(0.0, 0.0, 0.0)` — aucune teinte d'ombre |
| **Sous-type** | `COLOR` |
| **Min/Max** | `0.0` / `1.0` par canal |
| **Description** | Teinte de couleur appliquée à la région d'ombre de l'éclairage du monde |
| **Emplacement UI** | Propriétés > Monde |

```python
world = bpy.data.worlds['World']
world.shadow_color = (0.05, 0.08, 0.15)  # Ombres bleues fraîches pour le monde
```

## Extensions Principales de Blender

### `PROP_SEARCH_KEEP_ORDER`

| Propriété | Valeur |
| --- | --- |
| **Type** | Indicateur RNA sur `PropertyRNA` |
| **Emplacement** | `source/blender/makesrna/RNA_types.hh` |
| **Objectif** | Ignorer le tri alphabétique automatique dans `template_search` pour les collections RNA |

Cet indicateur est appliqué à `Scene.view_layers` afin que le sélecteur ViewLayer natif respecte le véritable ordre RNA (tel que défini par les commandes de réorganisation du ViewLayer Manager) au lieu de trier les éléments par ordre alphabétique.

```cpp
// source/blender/makesrna/intern/rna_scene.cc
RNA_def_property_flag(prop, PROP_SEARCH_KEEP_ORDER);
```

## Propriétés d'Overscan Cycles

Les propriétés suivantes configurent les paramètres d'Overscan EXR sous les paramètres du moteur Cycles (accessibles via `Scene.cycles`).

### `CyclesRenderSettings.overscan_mode`

| Propriété | Valeur |
| --- | --- |
| **Type** | `Enum` (`'PERCENTAGE'`, `'PIXELS'`) |
| **Défaut** | `'PERCENTAGE'` |
| **Description** | Mode de dimensionnement pour la région d'overscan |
| **Emplacement UI** | Propriétés > Sortie > Overscan |

### `CyclesRenderSettings.overscan_size`

| Propriété | Valeur |
| --- | --- |
| **Type** | `FloatProperty` |
| **Défaut** | `0.0` (plage : `0.0` à `100.0`) |
| **Description** | Pourcentage de marge d'overscan sur tous les côtés (mode Percentage) |
| **Emplacement UI** | Propriétés > Sortie > Overscan > Size |

### Propriétés de Marge (Mode Pixels)

Les propriétés suivantes spécifient les marges de bordure personnalisées en pixels lorsque `overscan_mode` est défini sur `'PIXELS'` :
- `CyclesRenderSettings.overscan_left` (Int, défaut `0`)
- `CyclesRenderSettings.overscan_right` (Int, default `0`)
- `CyclesRenderSettings.overscan_bottom` (Int, default `0`)
- `CyclesRenderSettings.overscan_top` (Int, default `0`)

```python
# Exemple d'accès Python
scene = bpy.context.scene
scene.cycles.overscan_mode = 'PERCENTAGE'
scene.cycles.overscan_size = 10.0
```

## Fichiers Sources

| Fichier | Objectif |
| --- | --- |
| `source/blender/makesrna/intern/rna_scene.cc` | Propriétés AOV de lobe de ViewLayer, indicateur `PROP_SEARCH_KEEP_ORDER` |
| `source/blender/makesrna/RNA_types.hh` | Définition de l'indicateur `PROP_SEARCH_KEEP_ORDER` |
| `source/blender/editors/interface/interface_utils.cc` | Sauter le tri alphabétique lorsque `PROP_SEARCH_KEEP_ORDER` est activé |
| `intern/cycles/blender/addon/properties.py` | Déclarations des propriétés d'overscan Cycles |
| `scripts/startup/bl_ui/properties_output.py` | Disposition de l'interface utilisateur pour le panneau de sortie Overscan |

