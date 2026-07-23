---
title: "Extensions du Noyau Cycles"
description: "Cette page documente les ajouts C++ au niveau du noyau (kernel) qu'Industrial CG Platform apporte au moteur de rendu Cycles."
---
# Extensions du Noyau Cycles

Cette page documente les ajouts C++ au niveau du noyau (kernel) qu'Industrial CG Platform apporte au moteur de rendu Cycles.

## Extensions de Noyau Deep EXR

### Types de Passes

```cpp
// intern/cycles/kernel/types.h
PASS_DEEP_COMBINED   // Passe RGBA combinée Deep
PASS_DEEP_POSITION   // Données de position par échantillon Deep
```

Ces types de passes sont enregistrés dans le film de Cycles et permettent la sortie de données de profondeur par échantillon dans le pipeline de rendu.

### Champs KernelFilm

```cpp
// intern/cycles/kernel/types.h (structure KernelFilm)
int pass_deep_combined;     // Décalage de film pour la passe combinée deep
int pass_deep_position;     // Décalage de film pour la passe de position deep
int deep_tile_budget;       // Budget mémoire par tile pour les échantillons deep
```

### Pipeline de Sortie Deep

Le pipeline de sortie deep étend le chemin d'écriture de film standard de Cycles :
1. Pendant le lancer de rayons (path tracing), chaque échantillon enregistre sa profondeur en plus des données de couleur.
2. Le film accumule les échantillons deep par tile, sous le contrôle du paramètre `deep_tile_budget`.
3. Au moment de la sortie, les données deep sont écrites à l'aide de l'API d'image deep d'OpenEXR.

## Extensions de Noyau pour la Couleur d'Ombre

### Champs KernelBackground

```cpp
// intern/cycles/kernel/types.h (structure KernelBackground)
float3 shadow_color;        // Couleur d'ombre du monde (RGB)
```

### Champs KernelLight

```cpp
// intern/cycles/kernel/types.h (structure KernelLight)
float3 shadow_color;        // Couleur d'ombre par lumière (RGB)
```

La couleur de l'ombre est appliquée dans le chemin d'évaluation de l'ombre de l'intégrateur, teintant les contributions d'ombre avec la couleur spécifiée.

## Passes par Lobe de Lightgroup

### Système d'Indexation de Lobe Séparé

```cpp
// intern/cycles/kernel/types.h
int lightgroup_split_index[];   // Remappage par lightgroup du lobe séparé vers le décalage de film
```

L'index de séparation de lightgroup est un tableau de données (accessible via `kernel_data_fetch`) qui mappe la passe de lobe séparée de chaque lightgroup à son décalage de tampon de film. Cela remplace l'ancienne approche par pointeur de périphérique brut.

### Extensions d'Écriture du Film

Les fonctions d'écriture de film suivantes ont été étendues pour prendre en charge la sortie de lobe par lightgroup :

```cpp
// intern/cycles/kernel/film/write.h
film_write_lightgroup_split_pass()  // Écrire dans une passe de lobe de lightgroup spécifique
```

### Correction du Lightgroup d'Environnement (Environment Lightgroup Fix)

Un correctif de précision essentiel garantit que les passes de lobe de lightgroup du monde/environnement s'écrivent correctement même lorsque la passe `Background` et la passe `Emission` sont désactivées dans le ViewLayer :

```cpp
// intern/cycles/kernel/integrator/shade_surface.h
// Utilise un type de contribution explicite plutôt qu'une comparaison de décalage de passe
// pour éviter le problème d'alias de PASS_UNUSED lorsque les deux passes sont désactivées
```

### Correction de Collision de Lampe (Finite Light Lamp-Hit Fix)

Le chemin normal de collision de lampe (`PRIMITIVE_LAMP` impact direct) écrit désormais dans les passes de lobe de lightgroup pour les lumières finies (zone, point, spot, soleil), tandis que les chemins de maillage émissif restent combinés uniquement :

```cpp
// intern/cycles/kernel/integrator/shade_light.h
// L'émission d'impact direct pour une lumière finie écrit dans la famille de lobes existante
```

## Brouillard d'Environnement (Environment Fog - En développement)

::: warning
Les extensions de noyau pour le brouillard d'environnement (Environment Fog) sont actuellement en cours de développement et ne sont pas encore intégrées. Cette section sera complétée lors de la publication de la fonctionnalité.
:::

## Fichiers Sources

| Fichier | Objectif |
| --- | --- |
| `intern/cycles/kernel/types.h` | Structures de données du noyau, énumérations de passes, champs de film |
| `intern/cycles/kernel/film/write.h` | Fonctions d'écriture de film, y compris les passes de lightgroup séparées |
| `intern/cycles/kernel/integrator/shade_surface.h` | Ombrage de surface avec correction du lightgroup d'environnement |
| `intern/cycles/kernel/integrator/shade_light.h` | Ombrage de lumière avec correction du lobe d'impact de lampe |
| `intern/cycles/integrator/path_trace_tile.h` | Lecture de passe au niveau des tiles avec identité de passe séparée |
| `intern/cycles/scene/film.cpp` | Configuration du film et enregistrement des passes |
| `intern/cycles/scene/light.cpp` | Synchronisation de la lumière avec la couleur d'ombre |
| `intern/cycles/scene/background.cpp` | Synchronisation du monde/arrière-plan avec la couleur d'ombre |
