# Sortie Deep EXR

<Badge type="tip" text="Publi茅" />

## Qu'est-ce que c'est ?

Deep EXR est un format de sortie de rendu qui stocke les informations de profondeur par 茅chantillon avec les donn茅es de couleur. Contrairement aux fichiers EXR "plats" standard qui ne stockent que la surface visible la plus proche, Deep EXR pr茅serve chaque 茅chantillon de profondeur qui contribue au pixel final. Cela permet un **compositing profond sans perte** dans des outils comme Nuke, o霉 les calques CG peuvent 锚tre fusionn茅s en fonction de leur profondeur r茅elle plut么t que par de simples op茅rations de superposition (over).

Industrial CG Platform ajoute une prise en charge native de la sortie Deep EXR 脿 Blender Cycles, permettant d'茅crire des donn茅es de compositing profond directement depuis Blender sans aucun outil de conversion externe.

## Pourquoi l'utiliser ?

- **Fusion profonde sans perte** 鈥?Combinez plusieurs calques de rendu CG dans Nuke 脿 l'aide de `DeepMerge` sans artefacts de bord ni masques de d茅coupe manuels (holdout mattes).
- **Profondeur par 茅chantillon** 鈥?Chaque pixel contient des informations de profondeur compl猫tes, permettant aux compositeurs en aval de d茅couper, r茅茅chantillonner et r茅eclairer 脿 des plages de profondeur arbitraires.
- **Prise en charge du volume** 鈥?Les donn茅es de rendu de volume sont incluses dans la sortie profonde (comportement par d茅faut actuel).
- **Sortie directe et compositeur** 鈥?Fonctionne 脿 la fois comme sortie de rendu de sc猫ne directe et via le n艙ud de sortie de fichier du compositeur Blender.

## Comment l'activer

### Sortie de Sc猫ne

1. Ouvrez **Propri茅t茅s > Propri茅t茅s de sortie > Sortie (Properties > Output Properties > Output)**.
2. Remplacez le **Format de fichier (File Format)** par `Deep OpenEXR`.
3. D茅finissez le **Deep Tile Budget** souhait茅 (contr么le le compromis m茅moire/qualit茅 pour les donn茅es profondes).
4. Rendez votre sc猫ne normalement.

### Sortie de fichier du Compositeur

1. Ajoutez un n艙ud **File Output** dans le compositeur.
2. D茅finissez son format sur `Deep OpenEXR`.
3. Connectez vos calques de rendu.
4. Le n艙ud de sortie de fichier profond fonctionne correctement lorsque le p茅riph茅rique du compositeur (Compositor Device) est d茅fini sur `GPU`.

::: info
La sortie de fichier Deep EXR ne force pas le reste du compositeur 脿 quitter le GPU 鈥?elle s'int猫gre parfaitement au compositing GPU.
:::

## Param猫tres

| Param猫tre | Description | D茅faut |
| --- | --- | --- |
| **Deep Output** | Activer le format de sortie Deep EXR | D茅sactiv茅 |
| **Deep Tile Budget** | Budget m茅moire par tuile pour le stockage d'茅chantillons profonds (plus 茅lev茅 = plus d'茅chantillons pr茅serv茅s) | Automatique |

## Flux de travail Nuke

1. Rendez vos calques de sc猫ne avec la sortie Deep EXR activ茅e.
2. Importez les fichiers `.exr` dans Nuke en utilisant des n艙uds `DeepRead`.
3. Utilisez `DeepMerge` pour composer les calques en fonction de la profondeur.
4. Utilisez `DeepToImage` pour aplatir les donn茅es profondes en une image standard.

::: tip
Pour de meilleurs r茅sultats, rendez chaque 茅l茅ment CG majeur (personnages, d茅cors, effets) sous forme de calques Deep EXR s茅par茅s et fusionnez-les dans Nuke.
:::

## Limites connues

- **Comportement profond du volume** 鈥?Le comportement actuel de la sortie profonde de volume est accept茅 tel quel. Les sc猫nes de volume lourdes en m茅moire peuvent produire des fichiers profonds tr猫s volumineux.
- **Reconstruction des m茅tadonn茅es** 鈥?La reconstruction compl猫te des m茅tadonn茅es profondes est un travail futur et ne fait pas partie de la version de r茅f茅rence actuelle.
- **Utilisation de la m茅moire** 鈥?La sortie profonde stocke beaucoup plus de donn茅es que l'EXR plat. Utilisez le param猫tre Deep Tile Budget pour contr么ler ce compromis.

## Travaux futurs

- Le stockage profond fragment茅/compress茅 inspir茅 de MoonRay est une optimisation future potentielle.
- Reconstruction des m茅tadonn茅es pour des m茅tadonn茅es de compositing en aval plus compl猫tes.

## Voir Aussi

- [Syst猫me de passes et AOV (API)](/fr/industrial-cg-platform/api/pass-system) 鈥?Comment les passes profondes sont enregistr茅es en interne.
- [Manuel Blender: Propri茅t茅s de sortie](https://docs.blender.org/manual/en/latest/render/output/properties/output.html) 鈥?Param猫tres de sortie standard de Blender.
