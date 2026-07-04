# Pr茅f茅rences et configurations

Cette page explique les param猫tres principaux, les optimisations de performance et les outils de sortie disponibles dans les pr茅f茅rences de l'**Industrial AOV Connector**.

---

## **Param猫tres des fonctions principales**

<img width="400" alt="Pr茅f茅rences des fonctions principales" src="https://github.com/user-attachments/assets/9fa6bb66-417a-4c57-a933-9a5ed51d6764" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Denoise DiffCol / GlossCol / TransCol**
Applique des filtres de d茅bruitage aux passes de couleur unie (`DiffCol`, `GlossCol`, `TransCol`). Cela permet d'am茅liorer la fid茅lit茅 des d茅tails et de r茅duire les artefacts de division de pr茅cision en post-production.

### 2. **Use Old EXR Layer Naming Convention (Utiliser l'ancienne convention de nommage des couches EXR)**
Force le plugin 脿 utiliser l'ancienne convention de nommage des couches EXR (compatible avec la version 2.4.x et inf茅rieures). Il est recommand茅 de d茅sactiver cette option pour Nuke, car la nouvelle convention de nommage est beaucoup plus propre et facile 脿 lire.

### 3. **Only Create Nodes For Enabled Viewlayers (Cr茅er des n艙uds uniquement pour les calques de vue activ茅s)**
Lorsqu'il est actif, le plugin ignore les calques de vue dont la case `Use for Rendering` (Utiliser pour le rendu) est d茅coch茅e dans les propri茅t茅s des calques de vue, ce qui permet d'茅conomiser de l'espace de n艙ud et du temps de traitement.

### 4. **Auto Optimize Sample Count For Data Layers (Optimiser automatiquement le nombre d'茅chantillons pour les couches de donn茅es)**
Remplace automatiquement le nombre d'茅chantillons pour les couches de donn茅es lors de la g茅n茅ration de n艙uds afin d'acc茅l茅rer le rendu. Vous pouvez configurer une limite d'茅chantillons sp茅cifique (par exemple, moins d'茅chantillons pour les passes utilitaires comme Position et Normals).

### 5. **Custom Name Suffix (Suffixe de nom personnalis茅)**
Vous permet d'ajouter un texte personnalis茅 aux fichiers g茅n茅r茅s. Par exemple, utilisez `#` pour personnaliser le format de remplissage des num茅ros d'images (frame padding). Le plugin prend 茅galement en charge les variables dynamiques (tokens) 茅valu茅es au moment du rendu :
* `$scene$` 鈥?Nom de la sc猫ne
* `$file$` 鈥?Nom du fichier .blend
* `$camera$` 鈥?Nom de la cam茅ra active
* `$version$` 鈥?脡value le num茅ro de version actif (recherche un suffixe comme `v001` 脿 la fin du nom du fichier .blend).

*Exemple de configuration :* `$camera$_$version$_###`

### 6. **Node Interval Scale When Arranging (脡chelle d'intervalle des n艙uds lors de l'organisation)**
Ajuste l'espacement entre les n艙uds lors de l'ex茅cution de la commande `Arrange Nodes`. Cela permet de compenser la mise 脿 l'茅chelle de l'interface syst猫me (par exemple, sur Windows avec une mise 脿 l'茅chelle d'affichage de 1,5x, d茅finir cette valeur sur `0.67` g茅n猫re un arbre de n艙uds parfaitement espac茅).

---

## **Param猫tres des outils de sortie**

<img width="400" alt="Param猫tres des outils de sortie" src="https://github.com/user-attachments/assets/ffa908d7-e51f-4367-8544-2ec1629dbe2a" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Default Useless Renders Gather (Regroupement des rendus inutiles par d茅faut)**
Modifie automatiquement le chemin de sortie par d茅faut de Blender vers un sous-dossier `trash_output`, gardant ainsi vos dossiers de production r茅els propres.

### 2. **Show Useless Renders Clean Button (Afficher le bouton de nettoyage des rendus inutiles)**
Affiche le bouton `Delete Useless Default Renders` dans l'interface des outils de sortie pour purger facilement les dossiers.

---

## **Param猫tres d'apparence**

<img width="400" alt="Param猫tres d'apparence" src="https://github.com/user-attachments/assets/cefe5d71-8107-4109-b097-34c9872092eb" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

Ajuste les 茅l茅ments d'interface, le codage couleur et les th猫mes des panneaux personnalis茅s.
