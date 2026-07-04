# Industrial AOV Connector

**Industrial AOV Connector** est un module externe open-source avancé pour Blender, conçu pour simplifier et automatiser la configuration des variables de sortie arbitraires (AOVs) et des nœuds de sortie de rendu pour les pipelines professionnels de VFX et de compositing.

En automatisant la construction d'arbres de nœuds de compositing complexes et de nœuds de sortie de fichiers, il comble le fossé entre le rendu 3D de Blender et les logiciels de compositing professionnels comme Foundry Nuke.

---

## Fonctionnalités clés

### 🔌 Gestion automatisée des sorties du compositeur
*   **Configuration manuelle zéro :** Génère automatiquement des arbres de nœuds de sortie (`File Output`) basés sur les passes de rendu actives.
*   **Débruitage intelligent :** Injecte et achemine automatiquement les nœuds de débruitage (comme OpenImageDenoise) dans votre arbre de compositing.
*   **Prise en charge multi-ViewLayer :** Gère simultanément plusieurs couches de vue, en associant systématiquement leurs chemins de sortie.

### 🎭 AOVs personnalisés par matériel et lumière
*   Prend en charge les configurations d'AOV personnalisés basés sur le matériel.
*   Associe les passes basées sur les groupes de lumières directement à des canaux de sortie séparés.
*   Prend en charge les chemins de rendu hybrides mélangeant passes standard et AOVs définis par l'utilisateur.

### 🎬 Alignement du pipeline VFX
*   Convertit et formate les passes de données (telles que le vecteur de vitesse, les normales et la position) selon les conventions de nommage de Nuke.
*   Génère des passes de profondeur ($Z$) et de position ($P$) de haute qualité avec anticrénelage.
*   Fournit une option de canal de profondeur simulé ("Fake Deep") pour les flux de travail de compositing simples.

---

## Emplacement dans l'interface

Une fois activé, le panneau du module est accessible dans le :
> 📌 **Panneau Propriétés → onglet Couche de vue (View Layer)**

---

## Installation et prise en main

### Prérequis
*   Blender 4.2 LTS ou version supérieure.
*   **Recommandation d'écosystème :** Idéalement associé à la branche personnalisée [Industrial CG Platform](/fr/industrial-cg-platform/) pour un rendu optimal des AOVs de matériaux lumineux et un support natif du format Deep EXR.

### Via les extensions Blender (Recommandé)
1.  Ouvrez Blender et allez dans `Edit` > `Preferences` > `Get Extensions`.
2.  Recherchez `Industrial AOV Connector`.
3.  Cliquez sur **Install**.

### Via l'archive GitHub
1.  Téléchargez la dernière version ZIP du dépôt officiel : [Industrial-AOV-Connector](https://github.com/RolandVyens/Industrial-AOV-Connector/releases).
2.  Dans Blender, allez dans `Edit` > `Preferences` > `Add-ons` > `Install...`.
3.  Sélectionnez le fichier `.zip` téléchargé et activez le module.

---

## Licence & Liens du dépôt

*   **Licence :** GNU General Public License v3.0 (GPL-3.0)
*   **Dépôt GitHub :** [RolandVyens/Industrial-AOV-Connector](https://github.com/RolandVyens/Industrial-AOV-Connector)
*   **Signaler un problème :** [GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-AOV-Connector/issues)
