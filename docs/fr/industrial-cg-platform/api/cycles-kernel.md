# Extensions du Noyau Cycles

Cette page documente les ajouts C++ au niveau du noyau (kernel) qu'Industrial CG Platform apporte au moteur de rendu Cycles.

## Extensions de Noyau Deep EXR

### Types de Passes

```cpp
// intern/cycles/kernel/types.h
PASS_DEEP_COMBINED   // Passe RGBA combin茅e Deep
PASS_DEEP_POSITION   // Donn茅es de position par 茅chantillon Deep
```

Ces types de passes sont enregistr茅s dans le film de Cycles et permettent la sortie de donn茅es de profondeur par 茅chantillon dans le pipeline de rendu.

### Champs KernelFilm

```cpp
// intern/cycles/kernel/types.h (structure KernelFilm)
int pass_deep_combined;     // D茅calage de film pour la passe combin茅e deep
int pass_deep_position;     // D茅calage de film pour la passe de position deep
int deep_tile_budget;       // Budget m茅moire par tile pour les 茅chantillons deep
```

### Pipeline de Sortie Deep

Le pipeline de sortie deep 茅tend le chemin d'茅criture de film standard de Cycles :
1. Pendant le lancer de rayons (path tracing), chaque 茅chantillon enregistre sa profondeur en plus des donn茅es de couleur.
2. Le film accumule les 茅chantillons deep par tile, sous le contr么le du param猫tre `deep_tile_budget`.
3. Au moment de la sortie, les donn茅es deep sont 茅crites 脿 l'aide de l'API d'image deep d'OpenEXR.

## Extensions de Noyau pour la Couleur d'Ombre

### Champs KernelBackground

```cpp
// intern/cycles/kernel/types.h (structure KernelBackground)
float3 shadow_color;        // Couleur d'ombre du monde (RGB)
```

### Champs KernelLight

```cpp
// intern/cycles/kernel/types.h (structure KernelLight)
float3 shadow_color;        // Couleur d'ombre par lumi猫re (RGB)
```

La couleur de l'ombre est appliqu茅e dans le chemin d'茅valuation de l'ombre de l'int茅grateur, teintant les contributions d'ombre avec la couleur sp茅cifi茅e.

## Passes par Lobe de Lightgroup

### Syst猫me d'Indexation de Lobe S茅par茅

```cpp
// intern/cycles/kernel/types.h
int lightgroup_split_index[];   // Remappage par lightgroup du lobe s茅par茅 vers le d茅calage de film
```

L'index de s茅paration de lightgroup est un tableau de donn茅es (accessible via `kernel_data_fetch`) qui mappe la passe de lobe s茅par茅e de chaque lightgroup 脿 son d茅calage de tampon de film. Cela remplace l'ancienne approche par pointeur de p茅riph茅rique brut.

### Extensions d'脡criture du Film

Les fonctions d'茅criture de film suivantes ont 茅t茅 茅tendues pour prendre en charge la sortie de lobe par lightgroup :

```cpp
// intern/cycles/kernel/film/write.h
film_write_lightgroup_split_pass()  // 脡crire dans une passe de lobe de lightgroup sp茅cifique
```

### Correction du Lightgroup d'Environnement (Environment Lightgroup Fix)

Un correctif de pr茅cision essentiel garantit que les passes de lobe de lightgroup du monde/environnement s'茅crivent correctement m锚me lorsque la passe `Background` et la passe `Emission` sont d茅sactiv茅es dans le ViewLayer :

```cpp
// intern/cycles/kernel/integrator/shade_surface.h
// Utilise un type de contribution explicite plut么t qu'une comparaison de d茅calage de passe
// pour 茅viter le probl猫me d'alias de PASS_UNUSED lorsque les deux passes sont d茅sactiv茅es
```

### Correction de Collision de Lampe (Finite Light Lamp-Hit Fix)

Le chemin normal de collision de lampe (`PRIMITIVE_LAMP` impact direct) 茅crit d茅sormais dans les passes de lobe de lightgroup pour les lumi猫res finies (zone, point, spot, soleil), tandis que les chemins de maillage 茅missif restent combin茅s uniquement :

```cpp
// intern/cycles/kernel/integrator/shade_light.h
// L'茅mission d'impact direct pour une lumi猫re finie 茅crit dans la famille de lobes existante
```

## Brouillard d'Environnement (Environment Fog - En d茅veloppement)

::: warning
Les extensions de noyau pour le brouillard d'environnement (Environment Fog) sont actuellement en cours de d茅veloppement et ne sont pas encore int茅gr茅es. Cette section sera compl茅t茅e lors de la publication de la fonctionnalit茅.
:::

## Fichiers Sources

| Fichier | Objectif |
| --- | --- |
| `intern/cycles/kernel/types.h` | Structures de donn茅es du noyau, 茅num茅rations de passes, champs de film |
| `intern/cycles/kernel/film/write.h` | Fonctions d'茅criture de film, y compris les passes de lightgroup s茅par茅es |
| `intern/cycles/kernel/integrator/shade_surface.h` | Ombrage de surface avec correction du lightgroup d'environnement |
| `intern/cycles/kernel/integrator/shade_light.h` | Ombrage de lumi猫re avec correction du lobe d'impact de lampe |
| `intern/cycles/integrator/path_trace_tile.h` | Lecture de passe au niveau des tiles avec identit茅 de passe s茅par茅e |
| `intern/cycles/scene/film.cpp` | Configuration du film et enregistrement des passes |
| `intern/cycles/scene/light.cpp` | Synchronisation de la lumi猫re avec la couleur d'ombre |
| `intern/cycles/scene/background.cpp` | Synchronisation du monde/arri猫re-plan avec la couleur d'ombre |
