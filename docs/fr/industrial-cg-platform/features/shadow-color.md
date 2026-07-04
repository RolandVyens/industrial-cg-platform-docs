# Couleur d'ombre

<Badge type="tip" text="Publi茅" />

## Qu'est-ce que c'est ?

La couleur d'ombre (Shadow Color) ajoute une propri茅t茅 de couleur par lumi猫re et par monde 脿 Blender Cycles qui teinte les r茅gions d'ombre projet茅es par chaque source de lumi猫re. Au lieu que les ombres soient purement l'absence de lumi猫re, vous pouvez leur donner une couleur sp茅cifique 鈥?une technique artistique courante dans l'茅clairage de films et d'animations.

## Pourquoi l'utiliser ?

- **Contr么le artistique** 鈥?Harmonisez la teinte de l'ombre avec votre script couleur (color script) sans modifier la couleur de la lumi猫re elle-m锚me.
- **Granularit茅 par lumi猫re** 鈥?Diff茅rentes lumi猫res peuvent projeter des ombres de couleurs diff茅rentes dans la m锚me sc猫ne.
- **Couleur d'ombre du monde** 鈥?L'茅clairage global (du monde) peut 茅galement avoir sa propre couleur d'ombre.
- **Non destructif** 鈥?La couleur d'ombre n'affecte que les zones d'ombre ; les zones 茅clair茅es restent inchang茅es.

## Comment l'activer

### Couleur d'ombre par lumi猫re

1. S茅lectionnez une lumi猫re dans la vue 3D.
2. Ouvrez **Propri茅t茅s > Propri茅t茅s des donn茅es d'objet (Properties > Object Data Properties)** (l'ic么ne d'ampoule).
3. Trouvez la propri茅t茅 **Shadow Color** (Couleur d'ombre).
4. Cliquez sur l'茅chantillon de couleur pour choisir une teinte d'ombre.

### Couleur d'ombre du monde

1. Ouvrez **Propri茅t茅s > Propri茅t茅s du monde (Properties > World Properties)**.
2. Trouvez la propri茅t茅 **Shadow Color** (Couleur d'ombre).
3. D茅finissez la teinte d'ombre du monde souhait茅e.

## Cas d'utilisation artistiques

| Sc茅nario | Couleur d'ombre | Effet |
| --- | --- | --- |
| Coucher de soleil chaud | Ombres bleues / violettes | Contraste froid contre la lumi猫re chaude |
| Sc猫ne sous-marine | Ombres sarcelles fonc茅es | Renforce la profondeur et la couleur de l'eau |
| Animation stylis茅e | Compl茅mentaire satur茅e | Aspect d'ombre graphique et audacieux |
| Clair de lune | Ombres bleu profond | Sensation ext茅rieure nocturne classique |

::: tip
Commencez par des couleurs d'ombre subtiles et d茅satur茅es. Une l茅g猫re teinte suffit 脿 faire beaucoup. L'effet est particuli猫rement visible dans les zones de transition d'ombre douce (falloff).
:::

## Limites connues

- La couleur d'ombre n'affecte que la contribution d'ombre de la lumi猫re sp茅cifique. Elle ne modifie pas le comportement d'ombre des autres lumi猫res de la sc猫ne.
- L'effet est une couleur purement additive dans la r茅gion d'ombre 鈥?il ne simule pas des objets translucides color茅s projetant des ombres color茅es.

## Voir Aussi

- [Propri茅t茅s RNA (API)](/fr/industrial-cg-platform/api/rna-properties) 鈥?R茅f茅rence des propri茅t茅s `Light.shadow_color` et `World.shadow_color`.
- [Manuel Blender: Propri茅t茅s de lumi猫re](https://docs.blender.org/manual/en/latest/render/lights/light_object.html) 鈥?Param猫tres de lumi猫re standard de Blender.
