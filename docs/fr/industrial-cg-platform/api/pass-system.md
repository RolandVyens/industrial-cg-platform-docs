# Syst猫me de Passes & AOV

Cette page documente comment Industrial CG Platform 茅tend le syst猫me de passes de rendu et d'AOV de Blender.

## Nouveaux Types de Passes

### Passes Deep EXR

| Type de Passe | Nom Interne | Description |
| --- | --- | --- |
| `PASS_DEEP_COMBINED` | `Deep Combined` | RGBA par 茅chantillon avec profondeur pour la composition deep |
| `PASS_DEEP_POSITION` | `Deep Position` | Donn茅es de position en espace monde par 茅chantillon |

### Passe de Brouillard (Environment Fog - En d茅veloppement)

| Type de Passe | Nom Interne | Description |
| --- | --- | --- |
| `PASS_FOG` | `Fog` | Passe de contribution du brouillard d'environnement |

::: warning
La passe de brouillard fait partie de la fonctionnalit茅 Brouillard d'Environnement (Environment Fog) qui n'est pas encore finalis茅e.
:::

## Enregistrement des Passes par Lobe de Lightgroup

Lorsque `use_lightgroup_light_pass_aovs` est activ茅 sur un ViewLayer, le syst猫me enregistre des passes suppl茅mentaires par lightgroup lors de la configuration du rendu.

### Flux d'Enregistrement

```
Sync Sc猫neScene sync 鈫?Config Film Film setup 鈫?Pour chaque lightgroup For each lightgroup:
  鈫?Si les passes s茅par茅es sont activ茅es If split passes enabled:
    鈫?Enregistrer Combined_<lg>
    鈫?Enregistrer Diffuse_Direct_<lg> (si activ茅)
    鈫?Enregistrer Diffuse_Indirect_<lg> (si activ茅)
    鈫?Enregistrer Glossy_Direct_<lg> (si activ茅)
    鈫?... (toutes les combinaisons de lobes activ茅es)
```

### Convention de D茅nomination des Passes

```
<Lobe>_<Direction>_<LightgroupName>
```

O霉 :
- **Lobe** : `Diffuse`, `Glossy`, `Transmission`, `Volume`
- **Direction** : `Direct`, `Indirect`
- **LightgroupName** : Le nom du lightgroup d茅fini par l'utilisateur

La passe `Combined_<lg>` est toujours pr茅sente pour chaque lightgroup par d茅faut.

### Mappage du D茅calage de Film

Chaque passe enregistr茅e re莽oit un d茅calage unique dans le tampon du film de Cycles. Le tableau d'index de s茅paration de lightgroup mappe :

```
lightgroup_split_index[lightgroup_id * num_split_types + split_type_index] = film_offset
```

Cela est accessible dans le noyau (kernel) via `kernel_data_fetch(lightgroup_split_index, index)`.

## Lecture de Passe (Pass Readback)

### Pr茅servation de l'Identit茅 (Identity Preservation)

Un correctif de pr茅cision essentiel garantit que les passes de lobe s茅par茅es par lightgroup sont lues via leur v茅ritable identit茅 `PassType`, et non via le premier type de passe g茅n茅rique correspondant. Cela 茅vite :

- Les passes direct-only apparaissant vides lorsque des passes indirect-only existent.
- Les conflits d'alias de contenu de passe entre diff茅rentes combinaisons de lobes de lightgroup.

Le correctif r茅side dans :
```
intern/cycles/integrator/path_trace_tile.h
```

### Int茅gration du Compositeur (Compositor Integration)

Les passes par lobe de lightgroup sont expos茅es sous forme de passes de rendu standard de Blender et apparaissent dans :
- Le compositeur de Blender sous forme de sorties de n艙ud Render Layers.
- Le s茅lecteur de passes de l'茅diteur d'images.
- La sortie OpenEXR multicouche sous forme de calques nomm茅s.

## Format de Sortie Deep EXR

Lorsque la sortie Deep EXR est activ茅e :

1. Le pipeline de rendu stocke les donn茅es de profondeur par 茅chantillon en plus des donn茅es de couleur.
2. Lors de la sortie, l'API d'image deep d'OpenEXR est utilis茅e pour 茅crire le fichier deep.
3. Le format deep est compatible avec les outils de composition deep standard de l'industrie (n艙ud `DeepRead` de Nuke, etc.).

### Budget de Tile Deep (Deep Tile Budget)

Le param猫tre `deep_tile_budget` contr么le le nombre d'茅chantillons par pixel pouvant 锚tre stock茅s pendant le rendu des tiles. Des valeurs plus 茅lev茅es pr茅servent plus de d茅tails de profondeur mais consomment plus de m茅moire.

## Fichiers Sources

| Fichier | Objectif |
| --- | --- |
| `intern/cycles/scene/film.cpp` | Enregistrement des passes et configuration du film |
| `intern/cycles/integrator/path_trace_tile.h` | Lecture de passe avec pr茅servation de l'identit茅 |
| `intern/cycles/blender/addon/properties.py` | D茅finitions des propri茅t茅s de passe de l'extension Cycles |
| `source/blender/render/intern/pipeline.cc` | Int茅gration des passes du pipeline de rendu de Blender |
| `source/blender/makesrna/intern/rna_scene.cc` | D茅finitions des propri茅t茅s de passe RNA |
| `intern/cycles/kernel/types.h` | 脡num茅rations des types de passes du noyau |
