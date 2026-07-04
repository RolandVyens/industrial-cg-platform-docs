---
title: Overscan EXR
description: R茅f茅rence technique et guide de l'utilisateur pour le rendu Overscan EXR hors ligne dans Industrial CG Platform.
---

# Overscan EXR

<Badge type="tip" text="Int茅gr茅" />

## Qu'est-ce que c'est ?

L'Overscan EXR est une fonctionnalit茅 de rendu dans Industrial CG Platform qui permet au moteur Cycles de Blender de calculer des marges de pixels suppl茅mentaires en dehors de la r茅solution de livraison standard.

Lors de l'exportation vers OpenEXR, le moteur de rendu pr茅serve la r茅solution de livraison standard dans les m茅tadonn茅es `displayWindow` (fen锚tre d'affichage) de l'EXR, tout en 茅crivant les limites du canevas 茅tendu d'overscan dans les m茅tadonn茅es `dataWindow` (fen锚tre de donn茅es). Cela garantit que les marges ext茅rieures sont bien enregistr茅es dans le fichier sans d茅former ni modifier le ratio d'aspect original de livraison.

## Pourquoi l'utiliser ?

- **Marges de s茅curit茅 VFX en aval** 鈥?R茅pond aux exigences des pipelines VFX standard en fournissant des pixels suppl茅mentaires pour la correction de distorsion de l'objectif (undistortion), la simulation de tremblement de cam茅ra et le matchmoving 2D/3D dans les logiciels de compositing.
- **Pr茅vention de l'茅tirement des bords** 鈥?脡vite les bordures noires ou l'茅tirement des pixels lors des translations, des rotations ou des reprojections de cam茅ras.
- **Support des formats Deep et Multi-couches** 鈥?S'int猫gre parfaitement avec tous les formats EXR, y compris les fichiers EXR multi-couches (OpenEXR Multilayer) et les rendus Deep EXR.

## Comment l'activer ?

Les param猫tres d'overscan sont situ茅s dans l'onglet **Propri茅t茅s de sortie (Output Properties)**, sous le panneau **Overscan** (directement sous le panneau **Format**).

1. D茅finissez le moteur de rendu (**Render Engine**) sur `Cycles`.
2. D茅sactivez l'option **Render Region** dans le panneau Format (l'overscan est d茅sactiv茅 lorsque la r茅gion de rendu est active).
3. D茅finissez le format de fichier sur `OpenEXR`, `OpenEXR Multilayer`, ou `Deep OpenEXR`.
4. Configurez vos marges d'overscan dans le panneau **Overscan**.

::: info Conditions d'activation
Le panneau Overscan est gris茅 si :
- Un moteur autre que Cycles (Eevee ou Workbench) est s茅lectionn茅.
- **Render Region** est activ茅.
:::

## Param猫tres

| Param猫tre | Mode de dimensionnement | Par d茅faut | Description |
| --- | --- | --- | --- |
| **Mode** | Enum | `PERCENTAGE` | M茅thode de calcul des marges : `PERCENTAGE` ou `PIXELS`. |
| **Amount / Size** | Pourcentage | `0.0` | Pourcentage de marge (ex. `10.0` pour 10% sur tous les c么t茅s). |
| **Left / Right / Bottom / Top** | Pixels | `0` | Marges individuelles en pixels (disponibles uniquement en mode `PIXELS`). |

## S茅mantique des fen锚tres EXR

Pour que les logiciels de compositing en aval (tels que Foundry Nuke ou Blackmagic Fusion) lisent correctement les fichiers d'overscan, Industrial CG Platform respecte la norme OpenEXR concernant les attributs de fen锚tre :

- **Fen锚tre d'affichage (`displayWindow`)** : D茅finit la r茅solution de livraison standard (ex. `1920x1080` avec l'origine 脿 `(0, 0)`). Cela d茅termine la r茅solution du projet dans le logiciel de compositing.
- **Fen锚tre de donn茅es (`dataWindow`)** : D茅finit la bo卯te englobante r茅elle des pixels stock茅s dans le fichier. Pour un overscan de 10% sur une image de `1920x1080`, la fen锚tre de donn茅es s'茅tend 脿 `2304x1464` avec une origine d茅cal茅e 脿 `(-192, -192)`.

```
                    dataWindow (Limites r茅elles stock茅es : 2304 x 1464)
    鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?    鈹?                                                                 鈹?    鈹? (-192, -192)                                                    鈹?    鈹?        displayWindow (R茅solution de livraison : 1920 x 1080)    鈹?    鈹?        鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?        鈹?    鈹?        鈹?                                             鈹?        鈹?    鈹?        鈹?(0, 0)                                       鈹?        鈹?    鈹?        鈹?                                             鈹?        鈹?    鈹?        鈹?                                             鈹?        鈹?    鈹?        鈹?                                             鈹?        鈹?    鈹?        鈹?                                 (1920, 1080)鈹?        鈹?    鈹?        鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?        鈹?    鈹?                                                                 鈹?    鈹?                                                     (2112, 1272)鈹?    鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?```

Lors de l'importation dans les logiciels de compositing, le fichier s'alignera naturellement sur le format standard 1920x1080 du projet, tandis que les pixels d'overscan 脿 l'ext茅rieur des limites du projet sont pr茅serv茅s dans la bo卯te englobante (Bounding Box, ou BBox) et restent accessibles pour les transformations.

## Limitations connues

- **Pas de rendu en temps r茅el dans la vue (Viewport)** 鈥?Il n'y a pas de rendu en temps r茅el dans la vue cam茅ra en dehors des limites du cadre. L'overscan de la vue se limite 脿 la ligne guide de cadre de s茅curit茅 ext茅rieure.
- **R茅gion de rendu exclusive** 鈥?L'activation de la r茅gion de rendu (Render Region) d茅sactive le rendu d'overscan ainsi que les lignes guides de la vue.
- **Cycles uniquement** 鈥?Les moteurs de rendu non-Cycles ne prennent pas en charge cette fonctionnalit茅.
- **Contraintes de n艙ud compositeur** 鈥?Lors de l'utilisation du n艙ud compositeur `File Output`, le groupe de n艙uds doit contenir un n艙ud de sortie actif tel que `Group Output` pour d茅clencher la propagation des m茅tadonn茅es d'overscan.

## Voir aussi

- [RNA Properties (API Reference)](/fr/industrial-cg-platform/api/rna-properties) 鈥?Les propri茅t茅s de l'API Python pour configurer l'overscan par script.
- [Guide d'installation](/fr/industrial-cg-platform/guide/installation) 鈥?D茅tails sur l'isolation du cache de shaders OptiX.
