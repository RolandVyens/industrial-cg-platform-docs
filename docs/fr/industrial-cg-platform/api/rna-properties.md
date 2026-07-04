# Propri茅t茅s RNA

Cette page documente les nouvelles propri茅t茅s RNA qu'Industrial CG Platform ajoute au mod猫le de donn茅es de Blender.

## Propri茅t茅s ViewLayer

### `ViewLayer.use_deep`

| Propri茅t茅 | Valeur |
| --- | --- |
| **Type** | `BoolProperty` |
| **D茅faut** | `False` |
| **Description** | Activer la sortie Deep EXR pour ce ViewLayer |
| **Emplacement UI** | Propri茅t茅s > View Layer > Passes |

```python
# Exemple d'acc猫s Python
view_layer = bpy.context.view_layer
view_layer.use_deep = True
```

### `ViewLayer.use_lightgroup_light_pass_aovs`

| Propri茅t茅 | Valeur |
| --- | --- |
| **Type** | `BoolProperty` |
| **D茅faut** | `False` |
| **Description** | Activer la sortie de passe par lobe de lightgroup |
| **Emplacement UI** | Propri茅t茅s > View Layer > Passes > Lumi猫re |

```python
view_layer.use_lightgroup_light_pass_aovs = True
```

### Bool茅ens AOV par Lobe

Chaque composant de lobe peut 锚tre activ茅 individuellement :

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

## Propri茅t茅s de Lumi猫re (Light)

### `Light.shadow_color`

| Propri茅t茅 | Valeur |
| --- | --- |
| **Type** | `FloatVectorProperty` (RGB) |
| **D茅faut** | `(0.0, 0.0, 0.0)` 鈥?aucune teinte d'ombre |
| **Sous-type** | `COLOR` |
| **Min/Max** | `0.0` / `1.0` par canal |
| **Description** | Teinte de couleur appliqu茅e 脿 la r茅gion d'ombre de cette lumi猫re |
| **Emplacement UI** | Propri茅t茅s > Donn茅es de l'objet > Lumi猫re |

```python
light = bpy.data.lights['Key']
light.shadow_color = (0.1, 0.05, 0.2)  # Teinte d'ombre violette subtile
```

## Propri茅t茅s du Monde (World)

### `World.shadow_color`

| Propri茅t茅 | Valeur |
| --- | --- |
| **Type** | `FloatVectorProperty` (RGB) |
| **D茅faut** | `(0.0, 0.0, 0.0)` 鈥?aucune teinte d'ombre |
| **Sous-type** | `COLOR` |
| **Min/Max** | `0.0` / `1.0` par canal |
| **Description** | Teinte de couleur appliqu茅e 脿 la r茅gion d'ombre de l'茅clairage du monde |
| **Emplacement UI** | Propri茅t茅s > Monde |

```python
world = bpy.data.worlds['World']
world.shadow_color = (0.05, 0.08, 0.15)  # Ombres bleues fra卯ches pour le monde
```

## Extensions Principales de Blender

### `PROP_SEARCH_KEEP_ORDER`

| Propri茅t茅 | Valeur |
| --- | --- |
| **Type** | Indicateur RNA sur `PropertyRNA` |
| **Emplacement** | `source/blender/makesrna/RNA_types.hh` |
| **Objectif** | Ignorer le tri alphab茅tique automatique dans `template_search` pour les collections RNA |

Cet indicateur est appliqu茅 脿 `Scene.view_layers` afin que le s茅lecteur ViewLayer natif respecte le v茅ritable ordre RNA (tel que d茅fini par les commandes de r茅organisation du ViewLayer Manager) au lieu de trier les 茅l茅ments par ordre alphab茅tique.

```cpp
// source/blender/makesrna/intern/rna_scene.cc
RNA_def_property_flag(prop, PROP_SEARCH_KEEP_ORDER);
```

## Propri茅t茅s d'Overscan Cycles

Les propri茅t茅s suivantes configurent les param猫tres d'Overscan EXR sous les param猫tres du moteur Cycles (accessibles via `Scene.cycles`).

### `CyclesRenderSettings.overscan_mode`

| Propri茅t茅 | Valeur |
| --- | --- |
| **Type** | `Enum` (`'PERCENTAGE'`, `'PIXELS'`) |
| **D茅faut** | `'PERCENTAGE'` |
| **Description** | Mode de dimensionnement pour la r茅gion d'overscan |
| **Emplacement UI** | Propri茅t茅s > Sortie > Overscan |

### `CyclesRenderSettings.overscan_size`

| Propri茅t茅 | Valeur |
| --- | --- |
| **Type** | `FloatProperty` |
| **D茅faut** | `0.0` (plage : `0.0` 脿 `100.0`) |
| **Description** | Pourcentage de marge d'overscan sur tous les c么t茅s (mode Percentage) |
| **Emplacement UI** | Propri茅t茅s > Sortie > Overscan > Size |

### Propri茅t茅s de Marge (Mode Pixels)

Les propri茅t茅s suivantes sp茅cifient les marges de bordure personnalis茅es en pixels lorsque `overscan_mode` est d茅fini sur `'PIXELS'` :
- `CyclesRenderSettings.overscan_left` (Int, d茅faut `0`)
- `CyclesRenderSettings.overscan_right` (Int, default `0`)
- `CyclesRenderSettings.overscan_bottom` (Int, default `0`)
- `CyclesRenderSettings.overscan_top` (Int, default `0`)

```python
# Exemple d'acc猫s Python
scene = bpy.context.scene
scene.cycles.overscan_mode = 'PERCENTAGE'
scene.cycles.overscan_size = 10.0
```

## Fichiers Sources

| Fichier | Objectif |
| --- | --- |
| `source/blender/makesrna/intern/rna_scene.cc` | Propri茅t茅s AOV de lobe de ViewLayer, indicateur `PROP_SEARCH_KEEP_ORDER` |
| `source/blender/makesrna/RNA_types.hh` | D茅finition de l'indicateur `PROP_SEARCH_KEEP_ORDER` |
| `source/blender/editors/interface/interface_utils.cc` | Sauter le tri alphab茅tique lorsque `PROP_SEARCH_KEEP_ORDER` est activ茅 |
| `intern/cycles/blender/addon/properties.py` | D茅clarations des propri茅t茅s d'overscan Cycles |
| `scripts/startup/bl_ui/properties_output.py` | Disposition de l'interface utilisateur pour le panneau de sortie Overscan |

