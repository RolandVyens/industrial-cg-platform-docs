# Couleur d'ombre

<Badge type="tip" text="Publié" />

## Qu'est-ce que c'est ?

La couleur d'ombre ajoute une propriété de couleur par lumière et par monde à Blender Cycles qui teinte les régions d'ombre projetées par chaque source de lumière. Au lieu que les ombres soient purement l'absence de lumière, vous pouvez leur donner une couleur spécifique — une technique artistique courante dans l'éclairage de films et d'animations.

## Comment l'activer

### Couleur d'ombre par lumière

1. Sélectionnez une lumière dans le viewport.
2. Ouvrez **Propriétés > Propriétés des données d'objet** (icône d'ampoule).
3. Trouvez la propriété **Shadow Color**.
4. Cliquez sur l'échantillon de couleur pour choisir une teinte d'ombre.

### Couleur d'ombre du monde

1. Ouvrez **Propriétés > Propriétés du monde**.
2. Trouvez la propriété **Shadow Color**.
3. Définissez la teinte d'ombre du monde souhaitée.

## Cas d'utilisation artistiques

| Scénario | Couleur d'ombre | Effet |
| --- | --- | --- |
| Coucher de soleil chaud | Ombres bleues/violettes | Contraste froid contre la lumière chaude |
| Scène sous-marine | Ombres sarcelles | Renforce la profondeur et la couleur de l'eau |
| Animation stylisée | Complémentaire saturée | Aspect d'ombre graphique et audacieux |
| Clair de lune | Ombres bleu profond | Sensation extérieure nocturne classique |

## Voir Aussi

- [Propriétés RNA (API)](/fr/api/rna-properties) — Référence de propriété `Light.shadow_color` et `World.shadow_color`.
