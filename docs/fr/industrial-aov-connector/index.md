# Industrial AOV Connector

**Industrial AOV Connector** est un module externe open-source avanc茅 pour Blender, con莽u pour simplifier et automatiser la configuration des variables de sortie arbitraires (AOVs) et des n艙uds de sortie de rendu pour les pipelines professionnels de VFX et de compositing.

En automatisant la construction d'arbres de n艙uds de compositing complexes et de n艙uds de sortie de fichiers, il comble le foss茅 entre le rendu 3D de Blender et les logiciels de compositing professionnels comme Foundry Nuke.

---

## Fonctionnalit茅s cl茅s

### 馃攲 Gestion automatis茅e des sorties du compositeur
*   **Configuration manuelle z茅ro :** G茅n猫re automatiquement des arbres de n艙uds de sortie (`File Output`) bas茅s sur les passes de rendu actives.
*   **D茅bruitage intelligent :** Injecte et achemine automatiquement les n艙uds de d茅bruitage (comme OpenImageDenoise) dans votre arbre de compositing.
*   **Prise en charge multi-ViewLayer :** G猫re simultan茅ment plusieurs couches de vue, en associant syst茅matiquement leurs chemins de sortie.

### 馃幁 AOVs personnalis茅s par mat茅riel et lumi猫re
*   Prend en charge les configurations d'AOV personnalis茅s bas茅s sur le mat茅riel.
*   Associe les passes bas茅es sur les groupes de lumi猫res directement 脿 des canaux de sortie s茅par茅s.
*   Prend en charge les chemins de rendu hybrides m茅langeant passes standard et AOVs d茅finis par l'utilisateur.

### 馃幀 Alignement du pipeline VFX
*   Convertit et formate les passes de donn茅es (telles que le vecteur de vitesse, les normales et la position) selon les conventions de nommage de Nuke.
*   G茅n猫re des passes de profondeur ($Z$) et de position ($P$) de haute qualit茅 avec anticr茅nelage.
*   Fournit une option de canal de profondeur simul茅 ("Fake Deep") pour les flux de travail de compositing simples.

---

## Emplacement dans l'interface

Une fois activ茅, le panneau du module est accessible dans le :
> 馃搶 **Panneau Propri茅t茅s 鈫?onglet Couche de vue (View Layer)**

---

## Installation et prise en main

### Pr茅requis
*   Blender 4.2 LTS ou version sup茅rieure.
*   **Recommandation d'茅cosyst猫me :** Id茅alement associ茅 脿 la branche personnalis茅e [Industrial CG Platform](/fr/industrial-cg-platform/) pour un rendu optimal des AOVs de mat茅riaux lumineux et un support natif du format Deep EXR.

### Via les extensions Blender (Recommand茅)
1.  Ouvrez Blender et allez dans `Edit` > `Preferences` > `Get Extensions`.
2.  Recherchez `Industrial AOV Connector`.
3.  Cliquez sur **Install**.

### Via l'archive GitHub
1.  T茅l茅chargez la derni猫re version ZIP du d茅p么t officiel : [Industrial-AOV-Connector](https://github.com/RolandVyens/Industrial-AOV-Connector/releases).
2.  Dans Blender, allez dans `Edit` > `Preferences` > `Add-ons` > `Install...`.
3.  S茅lectionnez le fichier `.zip` t茅l茅charg茅 et activez le module.

---

## Licence & Liens du d茅p么t

*   **Licence :** GNU General Public License v3.0 (GPL-3.0)
*   **D茅p么t GitHub :** [RolandVyens/Industrial-AOV-Connector](https://github.com/RolandVyens/Industrial-AOV-Connector)
*   **Signaler un probl猫me :** [GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-AOV-Connector/issues)
