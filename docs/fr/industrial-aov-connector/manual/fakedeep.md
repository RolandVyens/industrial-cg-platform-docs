# Fake Deep & Composition Profonde

Cette page explique comment r茅aliser une composition profonde (deep compositing) en utilisant le flux de travail de sortie **Fake Deep** depuis Blender.

---

## **Qu'est-ce que la composition profonde ?**

La **composition profonde (Deep Compositing)** est une technique de post-production avanc茅e dans les effets visuels (VFX) o霉 les passes de rendu stockent plusieurs 茅chantillons de profondeur par pixel (y compris la profondeur Z, la couleur et les valeurs d'opacit茅).

Contrairement 脿 la composition plane traditionnelle (qui ne dispose que d'une seule valeur RGBA 2D par pixel), la composition profonde vous permet de m茅langer des 茅l茅ments superpos茅s, de la fum茅e, des particules et des surfaces transparentes avec une pr茅cision spatiale absolue. Elle 茅limine le besoin de g茅n茅rer des caches (holdouts) complexes, permet d'ajuster la profondeur de champ apr猫s le rendu et facilite l'int茅gration des effets volum茅triques.

---

## **Qu'est-ce que Fake Deep ?**

Blender ne g茅n猫re pas nativement des fichiers EXR profonds contenant des pixels de profondeur multicouches. Le **Fake Deep** est une m茅thode de flux de travail qui mappe des donn茅es de profondeur Z pr茅cises directement sur les pixels, en utilisant des surcharges de profondeur (depth overrides) de shader/mat茅riau personnalis茅es pour correspondre aux contours exacts de votre passe de rendu Beauty.

### **Limitations et r猫gles de production**
1. **Pas de flou de mouvement (No Motion Blur) :** Le rendu avec flou de mouvement int茅gr茅 d茅truit les valeurs de profondeur aux bords des pixels. Vous devez effectuer vos rendus avec des contours nets et appliquer un flou de mouvement vectoriel en post-production.
2. **Effets volum茅triques (Volumetrics) :** Les volumes ne peuvent pas 锚tre facilement repr茅sent茅s par une seule couche de donn茅es de profondeur Fake Deep, car ils n茅cessitent des informations d'茅tendue de profondeur complexes.
3. **G茅om茅trie en intersection (Intersecting Geometry) :** Si deux maillages s'intersectent de pr猫s, les lignes de coupe peuvent osciller l茅g猫rement en raison de la pr茅cision limit茅e de la profondeur 32 bits par rapport aux rendus profonds multi-茅chantillonn茅s r茅els.

---

## **Configuration de la composition profonde dans Nuke**

Si ces contraintes ne vous posent pas de probl猫me, suivez ces 茅tapes de configuration dans Nuke :

### 脡tape 1 : Shuffle (fusionner/r茅organiser) Fake Deep et Alpha
M茅langez la passe Fake Deep et le canal Alpha de votre passe Beauty dans une structure RGBA standard :

<img width="600" alt="Configuration du n艙ud Shuffle de Nuke" src="https://github.com/user-attachments/assets/cabc27ab-516c-4aee-b38c-a46d9132cdff" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

Ensuite, faites passer la sortie par un n艙ud **Premult** (pr茅multiplication) pour nettoyer les pixels de bordure.

### 脡tape 2 : Shuffle 脿 nouveau vers la profondeur (Depth)
R茅organisez les canaux RGBA trait茅s vers le canal de profondeur de Nuke (`depth.Z`) :

<img width="600" alt="Configuration du n艙ud Shuffle Depth de Nuke" src="https://github.com/user-attachments/assets/249b9baa-0936-4c98-b2df-18ed31fc60ed" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 脡tape 3 : Convertir en Deep
Connectez la sortie 脿 un n艙ud **DeepFromImage**. Vous disposez maintenant d'un calque profond (Deep Layer) enti猫rement fonctionnel dans Nuke ! Vous pouvez utiliser les n艙uds tels que `DeepMerge`, `DeepRecolor` et `DeepWrite` normalement.
