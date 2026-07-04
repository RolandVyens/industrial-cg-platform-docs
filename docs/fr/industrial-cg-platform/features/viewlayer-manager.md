# Gestionnaire de ViewLayer

<Badge type="tip" text="Publi茅" />

## Qu'est-ce que c'est ?

Le gestionnaire de ViewLayer (ViewLayer Manager) est une fen锚tre d'outil d茅di茅e bas茅e sur Qt qui fournit une interface compl猫te pour g茅rer les ViewLayers (calques de vue), les passes de rendu, les Shader AOVs, les groupes de lumi猫res (lightgroups) et les contr么les AOV des passes de lumi猫re Cycles 鈥?le tout depuis un seul panneau organis茅, en dehors de l'茅diteur de propri茅t茅s natif de Blender.

Il est construit sur [BQt](https://github.com/techartorg/bqt) et est fourni en tant qu'extension syst猫me (System Extension) Blender int茅gr茅e.

## Pourquoi l'utiliser ?

- **Gestion centralis茅e** 鈥?Tous les param猫tres li茅s aux ViewLayers dans une seule fen锚tre au lieu d'锚tre dispers茅s dans de multiples onglets de propri茅t茅s.
- **Syst猫me de pr茅r茅glages** 鈥?Enregistrez et appliquez des configurations de passes en tant que pr茅r茅glages nomm茅s sur plusieurs ViewLayers 脿 la fois.
- **Op茅rations par lots** 鈥?S茅lectionnez plusieurs ViewLayers dans la liste de gauche et appliquez-y des pr茅r茅glages simultan茅ment.
- **Affichage organis茅 des passes** 鈥?Les passes sont regroup茅es en cat茅gories logiques : Donn茅es (Data), Lumi猫re (Light), Shader et Effets/Utilitaires (Effects / Utility).
- **Interface multilingue** 鈥?L'interface du gestionnaire prend en charge les traductions en chinois simplifi茅, chinois traditionnel et fran莽ais.

## Comment le Lancer

1. Regardez dans la barre d'en-t锚te en haut 脿 droite de Blender, juste 脿 c么t茅 du s茅lecteur `ViewLayer` natif.
2. Cliquez sur le bouton **ViewLayer Manager** (ic么ne d茅di茅e).
3. Le gestionnaire s'ouvre sous la forme d'une fen锚tre Qt autonome.

::: info
Au premier clic, l'extension d'ex茅cution BQt int茅gr茅e est automatiquement activ茅e pour la session en cours. Vous n'avez pas besoin d'activer manuellement des extensions dans les pr茅f茅rences.
:::

## Disposition de la Fen锚tre du Gestionnaire

### Panneau Gauche 鈥?Liste des ViewLayers

- R茅pertorie tous les ViewLayers de la sc猫ne actuelle.
- Commutateur **Utiliser pour le rendu (Use For Rendering)** directement en ligne pour chaque ViewLayer.
- Boutons **Monter (Up)** / **Descendre (Down)** pour r茅ordonner les ViewLayers.
- Prise en charge de la multi-s茅lection pour l'application de pr茅r茅glages par lots.
- Cr茅ez, renommez et supprimez des ViewLayers directement.

### Panneau Droit 鈥?Volet de D茅tails

Modifie le ViewLayer actuellement s茅lectionn茅 avec des sections pour :

#### Passes (Render Passes)

Organis茅 en sous-groupes natifs de Blender :

| Groupe | Contenu |
| --- | --- |
| **Donn茅es (Data)** | Combined, Z, Mist, Normal, Position, Vector, UV, Object Index, Material Index, etc. |
| **Lumi猫re (Light)** | Diffuse (Direct/Indirect/Color), Glossy, Transmission, Volume, Emission, Background, Shadow, Ambient Occlusion |
| **Shader** | Entr茅es de passes Shader AOV personnalis茅es |
| **Effets / Utilitaires** | Donn茅es de d茅bruitage (Denoising), Nombre d'茅chantillons (Sample Count) |

#### Cryptomatte

Section d茅di茅e aux param猫tres de passes Cryptomatte (disponible pour Eevee et Cycles).

#### Profondeur (Deep)

Propri茅t茅 de sortie Deep OpenEXR au niveau du ViewLayer (茅tiquette volontairement conserv茅e en anglais pour des raisons techniques).

#### Shader AOV

Liste 脿 colonne unique pour g茅rer les entr茅es Shader AOV personnalis茅es.

#### Groupes de Lumi猫res (Light Groups)

G猫re les groupes de lumi猫res affect茅s au ViewLayer actuel.

#### Passes de Lumi猫re Cycles AOV (Cycles Light Pass AOVs)

Activez et configurez la sortie de passes par lobe de lightgroup :
- Diffuse (Direct / Indirect)
- Glossy (Direct / Indirect)
- Transmission (Direct / Indirect)
- Volume (Direct / Indirect)

### Barre d'outils des pr茅r茅glages (Presets)

- **Save** 鈥?Enregistre les param猫tres de passes du ViewLayer actuel en tant que pr茅r茅glage nomm茅.
- **Update** 鈥?Met 脿 jour un pr茅r茅glage existant avec les param猫tres actuels.
- **Apply** 鈥?Applique un pr茅r茅glage 脿 tous les ViewLayers actuellement s茅lectionn茅s dans la liste de gauche.
- **Delete** 鈥?Supprime un pr茅r茅glage.

Les pr茅r茅glages sont stock茅s sous forme de fichiers JSON dans le r茅pertoire local des ressources de l'extension Blender de l'utilisateur.

## Visibilit茅 selon le Moteur de Rendu

Le gestionnaire affiche ou masque automatiquement des sections selon le moteur de rendu actif :

| Section | CYCLES | EEVEE |
| --- | --- | --- |
| Passes Eevee | 鉂?| 鉁?|
| Passes Cycles | 鉁?| 鉂?|
| Groupes de Lumi猫res | 鉁?| 鉂?|
| Passes de Lumi猫re Cycles AOV | 鉁?| 鉂?|
| Shader AOV | 鉁?| 鉁?|

## 脡criture Directe (Live Write-Back)

Les modifications de propri茅t茅s dans le gestionnaire sont r茅茅crites dans Blender **imm茅diatement** 鈥?il n'y a pas d'茅tape de validation manuelle pour l'茅dition normale. Le gestionnaire se synchronise automatiquement lorsqu'il est affich茅 et lorsqu'il reprend le focus syst猫me.

## Comportement Connu

- Le gestionnaire s'ex茅cute comme une fen锚tre Qt autonome de haut niveau (non int茅gr茅e 脿 l'interface native de Blender).
- L'ex茅cution de BQt peut journaliser `failed to get blender hwnd, creating new window` 鈥?c'est un comportement attendu dans le chemin du mode s茅curis茅, et non un 茅chec de lancement.
- Version Windows uniquement pour le moment. Le support Linux est report茅 脿 une version ult茅rieure.

## Voir Aussi

- [Op茅rateurs Python (API)](/fr/industrial-cg-platform/api/python-operators) 鈥?R茅f茅rence de l'op茅rateur `wm.blender_vfx_viewlayer_manager_show`.
- [Passes par lobe de lightgroup](/fr/industrial-cg-platform/features/lightgroup-lobe-passes) 鈥?Les passes par lobe contr么l茅es par la section Cycles Light Pass AOVs.
- [Manuel Blender: View Layers](https://docs.blender.org/manual/en/latest/render/layers/view_layer.html) 鈥?Documentation Blender standard sur les View Layers.
