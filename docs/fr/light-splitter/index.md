# Industrial Light AOV Splitter

**Industrial Light AOV Splitter** est un module de production spécialisé pour Blender qui automatise la configuration, la séparation et la matérialisation des passes de groupes de lumières individuelles (AOV).

Plutôt que d'exporter des groupes de lumières fusionnés génériques, cet outil sépare automatiquement les groupes de lumières en leurs composants fondamentaux (comme Diffuse Direct, Diffuse Indirect, Glossy Direct, Glossy Indirect), offrant ainsi aux artistes de compositing un contrôle total sur le rééclairage en post-production.

---

## Fonctionnalités clés

### 💡 Division automatisée des groupes de lumières
*   **Division en un clic :** Sépare automatiquement vos groupes de lumières actifs en canaux de composants détaillés.
*   **Granularité des lobes :** Matérialise les passes pour les composants diffuse, glossy, transmission et volume par groupe de lumières.
*   **Compatibilité Nuke :** Nommé et configuré pour s'intégrer facilement dans Foundry Nuke, Autodesk Flame ou Blackmagic Fusion.

### 🔌 Intégration avec AOV Connector
*   Conçu pour fonctionner de manière transparente avec le module **Industrial AOV Connector** afin d'écrire automatiquement ces composants divisés dans des fichiers EXR structurés.
*   Permet des configurations personnalisées pour gérer facilement des scènes intérieures ou extérieures complexes.

---

## Installation

### Prérequis
*   Blender 4.2 LTS ou supérieur (de préférence avec la branche **Industrial CG Platform**).

### Via l'archive GitHub
1.  Téléchargez la dernière version ZIP depuis le dépôt officiel : [Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases).
2.  Dans Blender, allez dans `Edit` > `Preferences` > `Add-ons` > `Install...`.
3.  Sélectionnez le fichier `.zip` téléchargé et activez le module.

---

## Liens du dépôt

*   **Dépôt GitHub :** [RolandVyens/Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter)
*   **Signaler un problème :** [GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/issues)
