---
title: Passes de lobes direct et indirect par Lightgroup dans Cycles
head:
  - - meta
    - name: description
      content: "Découvrez comment séparer les lobes diffus, brillants, de transmission et de volume pour des lightgroups individuels dans Blender Cycles pour un relighting précis dans Nuke."
description: "Les passes par lobe de lightgroup étendent le système de passes de lumière de Blender Cycles en décomposant chaque lightgroup (groupe de lumières) en ..."
---
# Passes par lobe de lightgroup

<Badge type="tip" text="Publié" />

## Qu'est-ce que c'est ?

Les passes par lobe de lightgroup étendent le système de passes de lumière de Blender Cycles en décomposant chaque **lightgroup** (groupe de lumières) en ses composants d'éclairage individuels (lobes). Au lieu d'obtenir uniquement une passe de lightgroup combinée, vous pouvez désormais générer des passes séparées **diffuse**, **glossy**, **transmission** et **volume** pour chaque lightgroup, avec une séparation supplémentaire **directe** et **indirecte**.

Cela donne aux artistes lumière et aux compositeurs le même niveau de contrôle par lightgroup que Blender fournit déjà au niveau global, mais isolé pour chaque configuration d'éclairage.

## Pourquoi l'utiliser ?

- **Rééclairage précis** — Ajustez les contributions lumineuses individuelles par type de composant lors du compositing, et non plus seulement par intensité globale.
- **Répartition par lightgroup** — Voyez précisément comment chaque lightgroup contribue de manière indépendante à la diffusion, la brillance, la transmission et au volume.
- **Équilibre global** — La somme de toutes les passes par lobe de lightgroup se reconstruit parfaitement dans la passe de beauté combinée, permettant des allers-retours de compositing hautement fiables.
- **Éprouvé en production** — Validé sur des scènes de production réelles avec des types de lumière de zone (Area), de point, de spot et de soleil (Sun).

## Comment l'activer

1. Ouvrez **Propriétés > Propriétés du View Layer > Passes > Lumière (Properties > View Layer Properties > Passes > Light)**.
2. Créez vos groupes de lumières (lightgroups) comme d'habitude.
3. Cochez **Light Pass AOVs** pour activer la sortie des passes par lobe de lightgroup.
4. Sélectionnez les composants de lobe que vous souhaitez :
   - **Diffuse** (Direct / Indirect)
   - **Glossy** (Direct / Indirect)
   - **Transmission** (Direct / Indirect)
   - **Volume** (Direct / Indirect)

## Convention de Nommage des Sorties

Chaque passe de lobe de lightgroup est nommée selon le modèle suivant :

```
<Lobe>_<Direct|Indirect>_<NomLightgroup>
```

Par exemple, avec un lightgroup nommé `key` :

| Nom de la passe | Contenu |
| --- | --- |
| `Combined_key` | Passe de lightgroup combinée |
| `Diffuse_Direct_key` | Diffusion directe des lumières `key` |
| `Diffuse_Indirect_key` | Diffusion indirecte des lumières `key` |
| `Glossy_Direct_key` | Brillance directe des lumières `key` |
| `Glossy_Indirect_key` | Brillance indirecte des lumières `key` |
| `Transmission_Direct_key` | Transmission directe des lumières `key` |
| `Transmission_Indirect_key` | Transmission indirecte des lumières `key` |
| `Volume_Direct_key` | Volume direct des lumières `key` |
| `Volume_Indirect_key` | Volume indirect des lumières `key` |

## Équilibre Global (Aggregate Balance)

Les passes de lobe sont conçues de telle sorte que :

```
Combined_<lg> ≈ Σ (Lobe_Direct_<lg> + Lobe_Indirect_<lg>)
```

Pour chaque groupe de lumières, cela signifie :

- **Les groupes de maillages émissifs** sont uniquement combinés par conception (pas de décomposition par lobe).
- **Les lumières finies** (zone, point, spot, soleil) sont entièrement reconstruites via leurs passes de lobe.
- **Les groupes de monde/environnement** écrivent correctement les passes de lobe même si `Background pass` et `Emission pass` sont désactivés dans le view layer.

## Flux de travail Compositeur & Nuke

### Dans le Compositeur Blender

1. Connectez un nœud **Render Layers**.
2. Chaque passe de lobe de lightgroup apparaît comme une prise de sortie séparée.
3. Utilisez les nœuds de compositeur standard pour ajuster les contributions individuelles des lobes.

### Dans Nuke

1. Importez l'EXR multicouche à l'aide d'un nœud `Read`.
2. Chaque passe de lobe de lightgroup apparaît comme un calque/canal séparé dans l'EXR.
3. Utilisez des nœuds `Shuffle` pour isoler et étalonner les contributions individuelles des lobes.
4. Additionnez-les à nouveau pour obtenir l'image finale rééclairée.

::: tip
Un contrôle de compositing utile : la somme de toutes les passes par lobe de lightgroup (plus les passes émissives combinées `Combined_<lg>`) doit correspondre de très près à la passe de beauté globale `rgba`.
:::

## Limites connues

- **Maillages émissifs** — Les groupes de lumières de maillage émissif restent uniquement combinés et ne sont pas divisés en lobes directs/indirects. C'est un choix de conception.
- **LPE arbitraire complet** — La prise en charge complète de la syntaxe des expressions de chemin de lumière (LPE) est un travail futur. Le système actuel fournit les divisions de lobe les plus fréquemment nécessaires.

## Voir Aussi

- [Système de passes et AOV (API)](/fr/industrial-cg-platform/api/pass-system) — Architecture interne d'enregistrement et de lecture des passes.
- [Extensions du noyau Cycles (API)](/fr/industrial-cg-platform/api/cycles-kernel) — Données d'index de division de lightgroup au niveau du noyau.
- [Manuel Blender: Groupes de lumières](https://docs.blender.org/manual/en/latest/render/layers/passes.html) — Documentation standard sur les groupes de lumières dans Blender.
