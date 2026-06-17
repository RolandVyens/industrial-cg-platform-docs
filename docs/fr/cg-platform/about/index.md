# À propos du projet

## Pourquoi cette plateforme existe-t-elle ?

Blender est déjà un outil de création puissant, mais la production VFX nécessite souvent plus que de simples résultats visuels magnifiques dans le viewport.

Un véritable pipeline de plans nécessite des données de rendu qui peuvent voyager proprement vers la composition, des ajustements d'éclairage qui restent contrôlables par plan, et un comportement de sortie qui a du sens pour les artistes, les TD et les fermes de rendu.

Industrial CG Platform existe pour pousser Blender plus loin dans cette direction tout en restant suffisamment proche de Blender upstream pour que la maintenance future reste réalisable.

## Feuille de route (Roadmap)

Les orientations prévues axées sur les VFX et la production comprennent :

- Objets n'affectant que la lumière indirecte (indirect-light-only) pour un contrôle d'éclairage plus ciblé
- Flux de travail de remplacement de matériaux (Material Override) au niveau de la collection et de l'objet
- Comportement du brouillard de l'environnement mondial similaire à `aiFog`, axé sur les cas d'utilisation de la lumière directe
- Documentation plus approfondie sur le rendu par plan et les flux de travail de compositing

## Soutien et Parrainage

Industrial CG Platform est développé en tant que projet R&D open-source axé sur la production.

Si ce projet aide votre studio, votre cours, votre pipeline ou votre travail de production personnel, le parrainage aide à accélérer le développement. Le parrainage est particulièrement utile pour financer des fonctionnalités difficiles à justifier en tant que simples add-ons : comportement de sortie de rendu, données profondes (deep data), packaging de l'exécution Qt, conception de passes de lumière et documentation orientée pipeline.

- Soutenez le créateur sur [Patreon](https://www.patreon.com/cw/RolandVyens)
- Soutenez le créateur sur [Afdian](https://www.ifdian.net/a/mogubobi2)
- Mettez une étoile (Star) sur le dépôt et partagez-le avec les artistes Blender et VFX qui ont besoin de flux de travail de production plus solides

## Relation avec l'Amont (Upstream)

Industrial CG Platform est dérivé de Blender.
Blender reste la fondation amont pour l'application, l'écosystème de documentation et une grande partie du flux de travail de développement.

- [blender.org](https://www.blender.org)
- [Manuel de Blender](https://docs.blender.org/manual/en/latest/index.html)
- [Portail des Développeurs Blender](https://developer.blender.org/docs/)

## Crédits

Industrial CG Platform est créé et dirigé par Roland Vyens, avec des travaux de développement, de documentation, d'empaquetage et de recherche accélérés grâce à un flux de travail assisté par l'IA utilisant Codex et Claude.

Ces outils font partie du processus de travail derrière le projet, mais l'orientation de la plateforme, les choix de fonctionnalités, les décisions de publication et la maintenance du fork restent la propriété du projet.

Le projet remercie également le projet MoonRay, dont les idées d'implémentation publique ont contribué à inspirer certaines des approches de rendu explorées dans cette branche.

## Licence

Industrial CG Platform suit le modèle de licence GPL de Blender pour l'application principale, et intègre également une extension d'exécution bQt avec des composants tiers supplémentaires.

- Le code de l'application dérivé de Blender reste sous la licence Blender License (GNU GPL v3 or later), avec des fichiers individuels utilisant parfois une licence différente mais compatible.
- L'extension d'exécution Qt groupée comprend des paquets tiers tels que `bqt`, `QtPy`, `PySide6`, `PySide6_Essentials`, `PySide6_Addons`, `shiboken6`, `packaging` et `blender-qt-stylesheet`.
- Ces composants intégrés portent leurs propres licences amont, notamment MPL-2.0, MIT, Apache-2.0, BSD-2-Clause, LGPL-3.0-only, GPL-2.0-only et GPL-3.0-only.

Pour les détails de la licence principale de Blender, voir [blender.org/about/license](https://www.blender.org/about/license).
