---
title: "Couleur d'ombre"
description: "La couleur d'ombre (Shadow Color) ajoute une propriété de couleur par lumière et par monde à Blender Cycles qui teinte les régions d'ombre projetées p..."
---
# Couleur d'ombre

<Badge type="tip" text="Publié" />

## Qu'est-ce que c'est ?

La couleur d'ombre (Shadow Color) ajoute une propriété de couleur par lumière et par monde à Blender Cycles qui teinte les régions d'ombre projetées par chaque source de lumière. Au lieu que les ombres soient purement l'absence de lumière, vous pouvez leur donner une couleur spécifique — une technique artistique courante dans l'éclairage de films et d'animations.

## Pourquoi l'utiliser ?

- **Contrôle artistique** — Harmonisez la teinte de l'ombre avec votre script couleur (color script) sans modifier la couleur de la lumière elle-même.
- **Granularité par lumière** — Différentes lumières peuvent projeter des ombres de couleurs différentes dans la même scène.
- **Couleur d'ombre du monde** — L'éclairage global (du monde) peut également avoir sa propre couleur d'ombre.
- **Non destructif** — La couleur d'ombre n'affecte que les zones d'ombre ; les zones éclairées restent inchangées.

## Comment l'activer

### Couleur d'ombre par lumière

1. Sélectionnez une lumière dans la vue 3D.
2. Ouvrez **Propriétés > Propriétés des données d'objet (Properties > Object Data Properties)** (l'icône d'ampoule).
3. Trouvez la propriété **Shadow Color** (Couleur d'ombre).
4. Cliquez sur l'échantillon de couleur pour choisir une teinte d'ombre.

### Couleur d'ombre du monde

1. Ouvrez **Propriétés > Propriétés du monde (Properties > World Properties)**.
2. Trouvez la propriété **Shadow Color** (Couleur d'ombre).
3. Définissez la teinte d'ombre du monde souhaitée.

## Cas d'utilisation artistiques

| Scénario | Couleur d'ombre | Effet |
| --- | --- | --- |
| Coucher de soleil chaud | Ombres bleues / violettes | Contraste froid contre la lumière chaude |
| Scène sous-marine | Ombres sarcelles foncées | Renforce la profondeur et la couleur de l'eau |
| Animation stylisée | Complémentaire saturée | Aspect d'ombre graphique et audacieux |
| Clair de lune | Ombres bleu profond | Sensation extérieure nocturne classique |

::: tip
Commencez par des couleurs d'ombre subtiles et désaturées. Une légère teinte suffit à faire beaucoup. L'effet est particulièrement visible dans les zones de transition d'ombre douce (falloff).
:::

## Limites connues

- La couleur d'ombre n'affecte que la contribution d'ombre de la lumière spécifique. Elle ne modifie pas le comportement d'ombre des autres lumières de la scène.
- L'effet est une couleur purement additive dans la région d'ombre — il ne simule pas des objets translucides colorés projetant des ombres colorées.

## Voir Aussi

- [Propriétés RNA (API)](/fr/industrial-cg-platform/api/rna-properties) — Référence des propriétés `Light.shadow_color` et `World.shadow_color`.
- [Manuel Blender: Propriétés de lumière](https://docs.blender.org/manual/en/latest/render/lights/light_object.html) — Paramètres de lumière standard de Blender.
