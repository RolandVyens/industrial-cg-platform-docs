# Passes par lobe de lightgroup

<Badge type="tip" text="Publié" />

## Qu'est-ce que c'est ?

Les passes par lobe de lightgroup étendent le système de passes de lumière de Blender Cycles en décomposant chaque **lightgroup** (groupe de lumières) en ses composants d'éclairage individuels (lobes). Au lieu d'obtenir uniquement une passe de lightgroup combinée, vous pouvez désormais générer des passes séparées **diffuse**, **glossy**, **transmission** et **volume** pour chaque lightgroup, avec une séparation supplémentaire **directe** et **indirecte**.

## Pourquoi l'utiliser ?

- **Réeclairage précis** — Ajustez les contributions de lumière individuelles par leur type de composant en comp, pas seulement par l'intensité globale.
- **Répartition par lightgroup** — Voyez exactement comment chaque lightgroup contribue indépendamment à la diffusion, la brillance, la transmission et le volume.
- **Équilibre global** — La somme de toutes les passes par lobe de lightgroup se reconstruit dans la passe de beauté combinée.
- **Éprouvé en production** — Validé sur des scènes de production réelles.

## Comment l'activer

1. Ouvrez **Propriétés > Propriétés du View Layer > Passes > Lumière**.
2. Créez vos lightgroups comme d'habitude.
3. Cochez **Light Pass AOVs** pour activer la sortie des passes par lobe de lightgroup.
4. Sélectionnez les composants de lobe que vous souhaitez (Diffuse, Glossy, etc.).

## Convention de Nommage des Sorties

Chaque passe de lobe de lightgroup est nommée selon ce modèle :

```
<Lobe>_<Direct|Indirect>_<NomLightgroup>
```

## Équilibre Global

Les passes de lobe sont conçues de telle sorte que :

```
Combined_<lg> ≈ Σ (Lobe_Direct_<lg> + Lobe_Indirect_<lg>)
```

## Voir Aussi

- [Système de passes et AOV (API)](/fr/api/pass-system) — Architecture interne d'enregistrement et de lecture des passes.
