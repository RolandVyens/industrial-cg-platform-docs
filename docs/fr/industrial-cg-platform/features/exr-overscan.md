---
title: Overscan EXR
description: Référence technique et guide de l'utilisateur pour le rendu Overscan EXR hors ligne dans Industrial CG Platform.
---

# Overscan EXR

<Badge type="tip" text="Intégré" />

## Qu'est-ce que c'est ?

L'Overscan EXR est une fonctionnalité de rendu dans Industrial CG Platform qui permet au moteur Cycles de Blender de calculer des marges de pixels supplémentaires en dehors de la résolution de livraison standard.

Lors de l'exportation vers OpenEXR, le moteur de rendu préserve la résolution de livraison standard dans les métadonnées `displayWindow` (fenêtre d'affichage) de l'EXR, tout en écrivant les limites du canevas étendu d'overscan dans les métadonnées `dataWindow` (fenêtre de données). Cela garantit que les marges extérieures sont bien enregistrées dans le fichier sans déformer ni modifier le ratio d'aspect original de livraison.

## Pourquoi l'utiliser ?

- **Marges de sécurité VFX en aval** — Répond aux exigences des pipelines VFX standard en fournissant des pixels supplémentaires pour la correction de distorsion de l'objectif (undistortion), la simulation de tremblement de caméra et le matchmoving 2D/3D dans les logiciels de compositing.
- **Prévention de l'étirement des bords** — Évite les bordures noires ou l'étirement des pixels lors des translations, des rotations ou des reprojections de caméras.
- **Support des formats Deep et Multi-couches** — S'intègre parfaitement avec tous les formats EXR, y compris les fichiers EXR multi-couches (OpenEXR Multilayer) et les rendus Deep EXR.

## Comment l'activer ?

Les paramètres d'overscan sont situés dans l'onglet **Propriétés de sortie (Output Properties)**, sous le panneau **Overscan** (directement sous le panneau **Format**).

1. Définissez le moteur de rendu (**Render Engine**) sur `Cycles`.
2. Désactivez l'option **Render Region** dans le panneau Format (l'overscan est désactivé lorsque la région de rendu est active).
3. Définissez le format de fichier sur `OpenEXR`, `OpenEXR Multilayer`, ou `Deep OpenEXR`.
4. Configurez vos marges d'overscan dans le panneau **Overscan**.

::: info Conditions d'activation
Le panneau Overscan est grisé si :
- Un moteur autre que Cycles (Eevee ou Workbench) est sélectionné.
- **Render Region** est activé.
:::

## Paramètres

| Paramètre | Mode de dimensionnement | Par défaut | Description |
| --- | --- | --- | --- |
| **Mode** | Enum | `PERCENTAGE` | Méthode de calcul des marges : `PERCENTAGE` ou `PIXELS`. |
| **Amount / Size** | Pourcentage | `0.0` | Pourcentage de marge (ex. `10.0` pour 10% sur tous les côtés). |
| **Left / Right / Bottom / Top** | Pixels | `0` | Marges individuelles en pixels (disponibles uniquement en mode `PIXELS`). |

## Sémantique des fenêtres EXR

Pour que les logiciels de compositing en aval (tels que Foundry Nuke ou Blackmagic Fusion) lisent correctement les fichiers d'overscan, Industrial CG Platform respecte la norme OpenEXR concernant les attributs de fenêtre :

- **Fenêtre d'affichage (`displayWindow`)** : Définit la résolution de livraison standard (ex. `1920x1080` avec l'origine à `(0, 0)`). Cela détermine la résolution du projet dans le logiciel de compositing.
- **Fenêtre de données (`dataWindow`)** : Définit la boîte englobante réelle des pixels stockés dans le fichier. Pour un overscan de 10% sur une image de `1920x1080`, la fenêtre de données s'étend à `2304x1464` avec une origine décalée à `(-192, -192)`.

```
                    dataWindow (Limites réelles stockées : 2304 x 1464)
    ┌──────────────────────────────────────────────────────────────────┐
    │                                                                  │
    │  (-192, -192)                                                    │
    │         displayWindow (Résolution de livraison : 1920 x 1080)    │
    │         ┌──────────────────────────────────────────────┐         │
    │         │                                              │         │
    │         │ (0, 0)                                       │         │
    │         │                                              │         │
    │         │                                              │         │
    │         │                                              │         │
    │         │                                  (1920, 1080)│         │
    │         └──────────────────────────────────────────────┘         │
    │                                                                  │
    │                                                      (2112, 1272)│
    └──────────────────────────────────────────────────────────────────┘
```

Lors de l'importation dans les logiciels de compositing, le fichier s'alignera naturellement sur le format standard 1920x1080 du projet, tandis que les pixels d'overscan à l'extérieur des limites du projet sont préservés dans la boîte englobante (Bounding Box, ou BBox) et restent accessibles pour les transformations.

## Limitations connues

- **Pas de rendu en temps réel dans la vue (Viewport)** — Il n'y a pas de rendu en temps réel dans la vue caméra en dehors des limites du cadre. L'overscan de la vue se limite à la ligne guide de cadre de sécurité extérieure.
- **Région de rendu exclusive** — L'activation de la région de rendu (Render Region) désactive le rendu d'overscan ainsi que les lignes guides de la vue.
- **Cycles uniquement** — Les moteurs de rendu non-Cycles ne prennent pas en charge cette fonctionnalité.
- **Contraintes de nœud compositeur** — Lors de l'utilisation du nœud compositeur `File Output`, le groupe de nœuds doit contenir un nœud de sortie actif tel que `Group Output` pour déclencher la propagation des métadonnées d'overscan.

## Voir aussi

- [RNA Properties (API Reference)](/fr/industrial-cg-platform/api/rna-properties) — Les propriétés de l'API Python pour configurer l'overscan par script.
- [Guide d'installation](/fr/industrial-cg-platform/guide/installation) — Détails sur l'isolation du cache de shaders OptiX.
