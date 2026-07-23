---
title: "Référence API"
description: "Cette section documente la surface API C++ et Python qu'Industrial CG Platform ajoute ou modifie dans Blender et Cycles."
---
# Référence API

Cette section documente la surface API C++ et Python qu'Industrial CG Platform ajoute ou modifie dans Blender et Cycles.

## Portée

La référence API couvre des extensions dans cinq domaines :

| Domaine | Description | Page |
| --- | --- | --- |
| **Noyau Cycles** | Nouveaux champs de film du noyau, types de passes, extensions d'intégrateur | [Extensions du noyau Cycles](/fr/industrial-cg-platform/api/cycles-kernel) |
| **Propriétés RNA** | Nouvelles propriétés ViewLayer, Light et World exposées à l'interface utilisateur et à Python | [Propriétés RNA](/fr/industrial-cg-platform/api/rna-properties) |
| **Opérateurs Python** | Nouveaux opérateurs Blender et API d'exécution Qt partagée | [Opérateurs Python](/fr/industrial-cg-platform/api/python-operators) |
| **Intégration bQt** | Architecture d'intégration, règles de disposition et modèles de conception Qt-Blender avancés | [Guide d'utilisation bQt](/fr/industrial-cg-platform/api/bqt-usage) |
| **Système Pass & AOV** | Enregistrement du nouveau type de passe, conventions de nommage et architecture de relecture | [Système Pass & AOV](/fr/industrial-cg-platform/api/pass-system) |

## Conventions

- Les références de l'API C++ incluent le chemin du fichier source où se trouve la modification.
- Les références de l'API Python affichent à la fois le chemin d'accès `bpy` et l'ID de l'opérateur.
- Toute la surface de l'API dans cette branche est préfixée ou a un espace de noms pour éviter les collisions avec les modifications de Blender en amont.

## Compatibilité en Amont

Ces ajouts d'API sont conçus pour être compatibles avec la version en amont de Blender :
- Les nouvelles propriétés RNA utilisent les modèles d'enregistrement de propriétés standard de Blender.
- Les nouveaux types de passes étendent l'énumération des passes Cycles existante sans casser les passes existantes.
- Le drapeau `PROP_SEARCH_KEEP_ORDER` est une extension minimale du cœur de Blender qui n'affecte pas le comportement de recherche existant.
