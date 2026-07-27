---
title: Comment générer un rendu Deep EXR natif dans Blender Cycles pour Nuke
head:
  - - meta
    - name: description
      content: "Découvrez comment générer un Deep EXR natif depuis Blender Cycles pour un compositing deep sans perte dans Nuke, et en quoi cela diffère du Z-Depth standard."
description: "Deep EXR est un format de sortie de rendu qui stocke les informations de profondeur par échantillon avec les données de couleur. Contrairement aux fic..."
cover: "/features/deep-exr.webp"
---
# Sortie Deep EXR

<Badge type="tip" text="Publié" />

## Qu'est-ce que c'est ?

Deep EXR est un format de sortie de rendu qui stocke les informations de profondeur par échantillon avec les données de couleur. Contrairement aux fichiers EXR "plats" standard qui ne stockent que la surface visible la plus proche, Deep EXR préserve chaque échantillon de profondeur qui contribue au pixel final. Cela permet un **compositing profond sans perte** dans des outils comme Nuke, où les calques CG peuvent être fusionnés en fonction de leur profondeur réelle plutôt que par de simples opérations de superposition (over).

Industrial CG Platform ajoute une prise en charge native de la sortie Deep EXR à Blender Cycles, permettant d'écrire des données de compositing profond directement depuis Blender sans aucun outil de conversion externe.

## Pourquoi l'utiliser ?

- **Fusion profonde sans perte** — Combinez plusieurs calques de rendu CG dans Nuke à l'aide de `DeepMerge` sans artefacts de bord ni masques de découpe manuels (holdout mattes).
- **Profondeur par échantillon** — Chaque pixel contient des informations de profondeur complètes, permettant aux compositeurs en aval de découper, rééchantillonner et réeclairer à des plages de profondeur arbitraires.
- **Prise en charge du volume** — Les données de rendu de volume sont incluses dans la sortie profonde (comportement par défaut actuel).
- **Sortie directe et compositeur** — Fonctionne à la fois comme sortie de rendu de scène directe et via le nœud de sortie de fichier du compositeur Blender.

## Choisir un mode de sortie

Deep EXR est activé automatiquement lorsque la sortie de scène ou un nœud File Output du compositeur utilise le format `Deep EXR`. Il n’existe aucun interrupteur Deep Output séparé à activer.

### Option A : sortie directe de la scène

Utilisez cette méthode lorsque le rendu doit écrire directement un seul Deep EXR depuis les réglages de sortie de la scène.

1. Ouvrez **Propriétés de sortie > Sortie (Output Properties > Output)**.
2. Définissez le **Format de fichier** sur `Deep EXR`.
3. Configurez les canaux, la profondeur de couleur, le codec et les tolérances de fusion dans le même panneau.
4. Définissez le chemin de sortie et lancez le rendu.

<figure class="doc-screenshot doc-screenshot--compact">
<a href="/screenshots/deep-exr/output-format-menu.webp" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/output-format-menu.webp" alt="Menu du format de fichier dans les propriétés de sortie de Blender avec Deep EXR sélectionné" loading="lazy"></a>
<figcaption>Sélectionnez Deep EXR dans le menu du format de fichier des propriétés de sortie. Cliquez sur l’image pour l’afficher en taille réelle.</figcaption>
</figure>

<figure class="doc-screenshot">
<a href="/screenshots/deep-exr/output-format-settings.webp" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/output-format-settings.webp" alt="Réglages de sortie Deep EXR montrant les canaux, la profondeur, le codec et les tolérances de fusion" loading="lazy"></a>
<figcaption>Tous les contrôles affichés ici appartiennent au panneau Sortie de la scène. Les valeurs sont données à titre d’exemple.</figcaption>
</figure>

#### Contrôles du panneau Sortie

| Contrôle | Effet | Conseil pour débuter |
| --- | --- | --- |
| **Format de fichier** | Sélectionne la sortie Deep EXR native et active automatiquement le rendu Deep. | Choisissez `Deep EXR`. |
| **Couleur** | Sélectionne les canaux de couleur stockés sans modifier `Z` ou `ZBack`. | Utilisez `RGBA` si la transparence est nécessaire, sinon `RGB` suffit. |
| **Profondeur de couleur** | Contrôle uniquement le stockage RGBA. `16 bits` utilise le half-float et `32 bits` le full-float ; `Z` et `ZBack` restent toujours en flottant 32 bits. | 16 bits réduit la sortie ; 32 bits préserve davantage les couleurs et l’alpha. |
| **Codec** | Compresse le fichier Deep EXR. Deep EXR prend en charge None, RLE et ZIPS. | `ZIPS` est le choix général sans perte. |
| **Tolérance de fusion Deep** | Seuil de distance en profondeur pour fusionner les échantillons Deep voisins. | Valeur par défaut `0.010` ; une valeur plus petite conserve plus d’échantillons distincts. |
| **Tolérance de fusion Alpha** | Seuil d’écart alpha utilisé avec la tolérance de profondeur. | Valeur par défaut `0.010` ; une valeur plus petite préserve davantage les détails d’opacité. |

Les échantillons ne sont fusionnés que si les deux tests de tolérance sont satisfaits. La profondeur de couleur ne modifie ni leur nombre ni leur position, uniquement la précision de stockage RGBA.

### Option B : sortie de fichier du compositeur

Utilisez cette méthode lorsque le compositeur doit contrôler le chemin, le nom ou les entrées d’image.

1. Ajoutez un nœud **File Output** dans le compositeur.
2. Dans **Node Format**, choisissez `Image`, puis définissez le **Format de fichier** sur `Deep EXR`.
3. Configurez la profondeur de couleur, le codec et les tolérances propres au nœud.
4. Ajoutez les entrées nécessaires, connectez les données de rendu et définissez les chemins de sortie.

<figure class="doc-screenshot doc-screenshot--wide">
<a href="/screenshots/deep-exr/compositor-file-output.webp" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/compositor-file-output.webp" alt="Nœud File Output du compositeur Blender configuré pour écrire un Deep EXR" loading="lazy"></a>
<figcaption>Le nœud File Output du compositeur possède ses propres panneaux Node Format, Images et Output Paths.</figcaption>
</figure>

#### Panneaux du nœud File Output

- **Node Format** — Contient le format Deep EXR, la profondeur de couleur, le codec et les tolérances propres au nœud.
- **Images** — Définit les entrées d’image écrites par ce nœud.
- **Output Paths** — Contrôle la destination et le nom des fichiers du nœud.

Le nœud File Output conserve ses propres réglages de format. Modifier le panneau Sortie de la scène ne configure pas ce nœud.

## Réglages de mémoire du rendu

Ces contrôles sont séparés des deux emplacements de format précédents. Avec Cycles, ouvrez **Propriétés de rendu > Performance > Memory (Render Properties > Performance > Memory)**.

| Contrôle | Effet | Défaut |
| --- | --- | --- |
| **Tile Size** | Définit la dimension de tuile demandée pour le rendu haute résolution. | 2048 px |
| **Deep Tile Budget** | Limite la mémoire du tampon de tuile Deep par périphérique de rendu. Cycles réduit si nécessaire la taille de tuile effective pour respecter ce budget. `0` désactive la limite. | 1024 MB |

Deep Tile Budget est une limite de mémoire, pas un réglage de qualité Deep. Il ne réduit pas directement la précision de profondeur et ne fusionne pas les échantillons.

<figure class="doc-screenshot doc-screenshot--compact">
<a href="/screenshots/deep-exr/deep-tile-budget.webp" target="_blank" rel="noopener"><img src="/screenshots/deep-exr/deep-tile-budget.webp" alt="Panneau Memory de Blender Cycles avec les réglages Tile Size et Deep Tile Budget" loading="lazy"></a>
<figcaption>Ces contrôles se trouvent dans Propriétés de rendu > Performance > Memory. Les valeurs affichées sont des exemples, pas les valeurs par défaut.</figcaption>
</figure>

## Flux de travail Nuke

1. Rendez vos calques de scène avec la sortie Deep EXR activée.
2. Importez les fichiers `.exr` dans Nuke en utilisant des nœuds `DeepRead`.
3. Utilisez `DeepMerge` pour composer les calques en fonction de la profondeur.
4. Utilisez `DeepToImage` pour aplatir les données profondes en une image standard.

::: tip
Pour de meilleurs résultats, rendez chaque élément CG majeur (personnages, décors, effets) sous forme de calques Deep EXR séparés et fusionnez-les dans Nuke.
:::

## Limites connues

- **Reconstruction des métadonnées** — La reconstruction complète des métadonnées profondes est un travail futur et ne fait pas partie de la version de référence actuelle.
- **Utilisation de la mémoire** — La sortie profonde stocke beaucoup plus de données que l'EXR plat. Utilisez le paramètre Deep Tile Budget pour contrôler ce compromis.

## Travaux futurs

- Le stockage profond fragmenté/compressé inspiré de MoonRay est une optimisation future potentielle.
- Reconstruction des métadonnées pour des métadonnées de compositing en aval plus complètes.

## Voir Aussi

- [Système de passes et AOV (API)](/fr/industrial-cg-platform/api/pass-system) — Comment les passes profondes sont enregistrées en interne.
- [Manuel Blender: Propriétés de sortie](https://docs.blender.org/manual/en/latest/render/output/properties/output.html) — Paramètres de sortie standard de Blender.
