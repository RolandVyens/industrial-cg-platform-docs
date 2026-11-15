---
title: "Auto Light Shuffle — Reconstruction automatique d'AOV de lumières Blender pour Nuke"
description: "Script Nuke automatique pour séparer et fusionner en couches les AOV de groupes de lumières Blender. Prend en charge les passes directes/indirectes, les lobes et les replis Combined."
cover: "/features/lightgroups.webp"
---
# Auto Light Shuffle

**Auto Light Shuffle** construit un graphe de nœuds Foundry Nuke propre à partir des AOV de groupes de lumières Blender stockés dans un EXR multicouche. Il détecte les passes disponibles depuis le nœud `Read` sélectionné, crée les nœuds `Shuffle` requis, reconstruit chaque lumière avec un arbre `Merge` équilibré en couches et combine toutes les lumières dans une sortie Beauty finale.

---

## Fonctionnalités clés

- **Détection automatique des groupes de lumières :** Détecte les lightgroups directement depuis le nœud `Read` sélectionné.
- **Priorité à la granularité la plus fine :** Privilégie la représentation AOV la plus détaillée pour chaque lumière :
  1. Passes de lobes directes et indirectes (`<lobe>_direct_<light>`, `<lobe>_indirect_<light>`) ;
  2. Passes de lobes matériaux (`<lobe>_<light>`, `RGBA_<lobe>_<light>`) ;
  3. Passes de repli combinées (`Combined_<light>`, `RGBA_<light>`).
- **Arbres Merge équilibrés :** Construit un arbre `Merge` multiniveau équilibré dans chaque groupe de lumières et combine tous les groupes via une chaîne Beauty lisible.
- **Organisation & Backdrops :** Trie les groupes de lumières par granularité AOV puis par ordre alphabétique, et encadre chaque groupe d'un `Backdrop` gris étiqueté.
- **Préservation de l'Alpha :** Préserve le canal alpha d'origine via des nœuds `Copy` et `Premult`.
- **Compatibilité Nuke :** Utilise `Shuffle2` et `Merge2` lorsqu'ils sont disponibles, avec repli sur les nœuds hérités, et aligne les nœuds selon les dimensions GUI réelles rapportées par Nuke.

---

## Noms d'AOV pris en charge

| Format | Exemple | Priorité |
| --- | --- | --- |
| `<lobe>_direct_<light>` | `diffuse_direct_key` | Plus élevée |
| `<lobe>_indirect_<light>` | `glossy_indirect_fill` | Plus élevée |
| `<lobe>_<light>` | `transmission_rim` | Moyenne |
| `RGBA_<lobe>_<light>` | `RGBA_specular_rim` | Moyenne (hérité) |
| `Combined_<light>` | `Combined_key` | Repli |
| `RGBA_<light>` | `RGBA_emissive` | Repli |

Les lobes pris en charge incluent `diffuse`, `glossy`, `specular`, `transmission` et `volume`.

---

## Prérequis

- Foundry Nuke avec prise en charge de Python (testé avec Nuke 13 et 14).
- Un EXR multicouche rendu depuis Blender contenant des AOV de groupes de lumières (via [Lightgroup Lobe Passes](/fr/industrial-cg-platform/features/lightgroup-lobe-passes) ou [Industrial Light AOV Splitter](/fr/industrial-light-aov-splitter/)).

---

## Installation

1. Copiez ces fichiers depuis le [dépôt GitHub](https://github.com/RolandVyens/auto-light-shuffle) dans le dossier `python` de votre répertoire utilisateur Nuke :

   ```text
   nuke_blender_autoaov.py
   settings_default.py
   ```

   Emplacements typiques :

   ```text
   Windows : %USERPROFILE%\.nuke\python
   macOS :   ~/.nuke/python
   Linux :   ~/.nuke/python
   ```

2. Ajoutez le dossier `python` dans `~/.nuke/init.py` :

   ```python
   import nuke

   nuke.pluginAddPath("./python")
   ```

3. Ajoutez la commande de menu dans `~/.nuke/menu.py` :

   ```python
   import nuke_blender_autoaov

   industrial_menu = nuke.menu("Nuke").addMenu("Industrial")
   industrial_menu.addCommand(
       "Auto Light Shuffle",
       "nuke_blender_autoaov.shuffle_and_combine_light_groups()",
   )
   ```

4. Redémarrez Nuke.

---

## Utilisation

1. Créez ou sélectionnez le nœud `Read` contenant l'EXR multicouche Blender (un seul nœud source doit être sélectionné).
2. Exécutez **Industrial > Auto Light Shuffle** dans la barre de menu supérieure.
3. Le script génère les nœuds `Unpremult`, le rail `Dot`, `Shuffle`, `Merge`, `Backdrop`, `Copy` et `Premult`.

### Disposition générée

```text
Read
 |
 +-- original alpha branch --------------------------------------+
 |                                                               |
 Unpremult                                                       |
 |                                                               |
 input Dot rail                                                  |
 |                                                               |
 Shuffle nodes grouped by light                                  |
 |                                                               |
 balanced Merge trees inside labelled Backdrops                  |
 |                                                               |
 Beauty Merge chain                                              |
 |                                                               |
 Copy <----------------------------------------------------------+
 |
 Premult
```

La chaîne finale Beauty est placée en dehors des `Backdrop` individuels par lumière.

---

## Configuration

Les valeurs par défaut se trouvent dans `settings_default.py`. Vous pouvez également passer un dictionnaire de surcharge complet :

```python
import nuke_blender_autoaov

nuke_blender_autoaov.shuffle_and_combine_light_groups(
    {
        "selection_groups": [
            ["diffuse", "glossy", "specular", "transmission", "volume"],
            ["Combined"],
        ],
        "node_spacing": {"x": 180, "y": 320},
        "debug": True,
    }
)
```

Paramètres par défaut :
- Espacement horizontal : `150`
- Espacement vertical : `280`
- `Backdrop` gris avec étiquettes en 64 points

---

## Dépôt & Documentation connexe

- **Dépôt GitHub :** [RolandVyens/auto-light-shuffle](https://github.com/RolandVyens/auto-light-shuffle)
- **Signaler un problème :** [GitHub Issues](https://github.com/RolandVyens/auto-light-shuffle/issues)
- [Lightgroup Lobe Passes](/fr/industrial-cg-platform/features/lightgroup-lobe-passes) — Passes de lobes directes/indirectes natives dans Cycles.
- [Industrial Light AOV Splitter](/fr/industrial-light-aov-splitter/) — Module Blender pour diviser les groupes de lumières en AOV de composants.
- [Industrial AOV Connector](/fr/industrial-aov-connector/) — Constructeur automatisé d'arbres de sortie EXR pour Blender.
