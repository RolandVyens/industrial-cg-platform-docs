# 脌 propos du projet

## Pourquoi cette plateforme existe-t-elle ?

Blender est d茅j脿 un outil de cr茅ation puissant, mais la production VFX n茅cessite souvent plus que de simples r茅sultats visuels magnifiques dans le viewport.

Un v茅ritable pipeline de plans n茅cessite des donn茅es de rendu qui peuvent voyager proprement vers la composition, des ajustements d'茅clairage qui restent contr么lables par plan, et un comportement de sortie qui a du sens pour les artistes, les TD et les fermes de rendu.

Industrial CG Platform existe pour pousser Blender plus loin dans cette direction tout en restant suffisamment proche de Blender upstream pour que la maintenance future reste r茅alisable.

## Feuille de route (Roadmap)

Les orientations pr茅vues ax茅es sur les VFX et la production comprennent :

- Objets n'affectant que la lumi猫re indirecte (indirect-light-only) pour un contr么le d'茅clairage plus cibl茅
- Flux de travail de remplacement de mat茅riaux (Material Override) au niveau de la collection et de l'objet
- Comportement du brouillard de l'environnement mondial similaire 脿 `aiFog`, ax茅 sur les cas d'utilisation de la lumi猫re directe
- Documentation plus approfondie sur le rendu par plan et les flux de travail de compositing

## Soutien et Parrainage

Industrial CG Platform est d茅velopp茅 en tant que projet R&D open-source ax茅 sur la production.

Si ce projet aide votre studio, votre cours, votre pipeline ou votre travail de production personnel, le parrainage aide 脿 acc茅l茅rer le d茅veloppement. Le parrainage est particuli猫rement utile pour financer des fonctionnalit茅s difficiles 脿 justifier en tant que simples add-ons : comportement de sortie de rendu, donn茅es profondes (deep data), packaging de l'ex茅cution Qt, conception de passes de lumi猫re et documentation orient茅e pipeline.

- Soutenez le cr茅ateur sur [Patreon](https://www.patreon.com/cw/RolandVyens)
- Soutenez le cr茅ateur sur [Afdian](https://www.ifdian.net/a/mogubobi2)
- Mettez une 茅toile (Star) sur le d茅p么t et partagez-le avec les artistes Blender et VFX qui ont besoin de flux de travail de production plus solides

## Relation avec l'Amont (Upstream)

Industrial CG Platform est d茅riv茅 de Blender.
Blender reste la fondation amont pour l'application, l'茅cosyst猫me de documentation et une grande partie du flux de travail de d茅veloppement.

- [blender.org](https://www.blender.org)
- [Manuel de Blender](https://docs.blender.org/manual/en/latest/index.html)
- [Portail des D茅veloppeurs Blender](https://developer.blender.org/docs/)

## Cr茅dits

Industrial CG Platform est cr茅茅 et dirig茅 par Roland Vyens, avec des travaux de d茅veloppement, de documentation, d'empaquetage et de recherche acc茅l茅r茅s gr芒ce 脿 un flux de travail assist茅 par l'IA utilisant Codex et Claude.

Ces outils font partie du processus de travail derri猫re le projet, mais l'orientation de la plateforme, les choix de fonctionnalit茅s, les d茅cisions de publication et la maintenance du fork restent la propri茅t茅 du projet.

Le projet remercie 茅galement le projet MoonRay, dont les id茅es d'impl茅mentation publique ont contribu茅 脿 inspirer certaines des approches de rendu explor茅es dans cette branche.

## Licence

Industrial CG Platform suit le mod猫le de licence GPL de Blender pour l'application principale, et int猫gre 茅galement une extension d'ex茅cution bQt avec des composants tiers suppl茅mentaires.

- Le code de l'application d茅riv茅 de Blender reste sous la licence Blender License (GNU GPL v3 or later), avec des fichiers individuels utilisant parfois une licence diff茅rente mais compatible.
- L'extension d'ex茅cution Qt group茅e comprend des paquets tiers tels que `bqt`, `QtPy`, `PySide6`, `PySide6_Essentials`, `PySide6_Addons`, `shiboken6`, `packaging` et `blender-qt-stylesheet`.
- Ces composants int茅gr茅s portent leurs propres licences amont, notamment MPL-2.0, MIT, Apache-2.0, BSD-2-Clause, LGPL-3.0-only, GPL-2.0-only et GPL-3.0-only.

Pour les d茅tails de la licence principale de Blender, voir [blender.org/about/license](https://www.blender.org/about/license).
