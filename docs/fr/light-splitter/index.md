# Industrial Light AOV Splitter

**Industrial Light AOV Splitter** est un module de production spécialisé pour Blender qui automatise la configuration, la séparation et la matérialisation des passes de groupes de lumières individuelles (AOV).

Plutôt que d'exporter des groupes de lumières fusionnés génériques, cet outil sépare automatiquement les groupes de lumières en leurs composants fondamentaux (**diffuse, specular, transmission et volume** ; ex. `diffuse_env`, `specular_env`), offrant ainsi aux artistes de compositing un contrôle total sur le rééclairage en post-production.

---

## Fonctionnalités clés

### 💡 Division automatisée des groupes de lumières
*   **Division en un clic :** Sépare automatiquement vos groupes de lumières actifs en canaux de composants détaillés.
*   **Granularité des lobes :** Matérialise les passes pour les composants diffuse, specular, transmission et volume par groupe de lumières.
*   **Compatibilité Nuke :** Nommé et configuré pour s'intégrer facilement dans Foundry Nuke, Autodesk Flame ou Blackmagic Fusion.

### 🔌 Intégration avec AOV Connector
*   Conçu pour fonctionner de manière transparente avec le module **Industrial AOV Connector** afin d'écrire automatiquement ces composants divisés dans des fichiers EXR structurés.
*   Inclut un script Python compagnon (`nuke_blender_autoaov.py`) dans le dépôt pour regrouper et combiner automatiquement ces canaux dans Nuke.

---

## Flux de travail et contraintes de nommage

Pour garantir le bon fonctionnement du séparateur, veuillez respecter ces règles :
1.  **Niveau d'interface :** L'outil fonctionne au niveau de la **couche de vue (View Layer)**.
2.  **Nommage des collections :** Les lumières doivent être placées dans des collections commençant par le préfixe **`lgt_`** (ex. `lgt_character`, `lgt_background`).
3.  **Nommage des lumières :** Les lumières doivent être nommées en utilisant **uniquement des lettres et des chiffres** (caractères alphanumériques). N'utilisez **pas** de caractères de soulignement (`_`) dans les noms des lumières.
4.  **Duplication des lumières :** Le module gère automatiquement les doublons en ignorant le suffixe `.001`. Vous pouvez dupliquer les lumières librement sans casser la structure de nommage.

---

## Installation

### Prérequis
*   Blender 4.2 LTS ou supérieur.
*   **Recommandation :** Fortement recommandé d'utiliser ce module aux côtés de **Industrial AOV Connector**.

### Via l'archive GitHub
1.  Téléchargez la dernière version ZIP depuis le dépôt officiel : [Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases).
2.  Dans Blender, allez dans `Edit` > `Preferences` > `Add-ons` > `Install...`.
3.  Sélectionnez le fichier `.zip` téléchargé et activez le module.

---

## Liens du dépôt

*   **Dépôt GitHub :** [RolandVyens/Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter)
*   **Signaler un problème :** [GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/issues)
