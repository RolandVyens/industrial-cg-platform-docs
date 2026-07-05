# Préférences et configurations

Cette page explique les paramètres principaux, les optimisations de performance et les outils de sortie disponibles dans les préférences de l'**Industrial AOV Connector**.

---

## **Paramètres des fonctions principales**

<img width="400" alt="Préférences des fonctions principales" src="https://github.com/user-attachments/assets/9fa6bb66-417a-4c57-a933-9a5ed51d6764" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Denoise DiffCol / GlossCol / TransCol**
Applique des filtres de débruitage aux passes de couleur unie (`DiffCol`, `GlossCol`, `TransCol`). Cela permet d'améliorer la fidélité des détails et de réduire les artefacts de division de précision en post-production.

### 2. **Use Old EXR Layer Naming Convention (Utiliser l'ancienne convention de nommage des couches EXR)**
Force le plugin à utiliser l'ancienne convention de nommage des couches EXR (compatible avec la version 2.4.x et inférieures). Il est recommandé de désactiver cette option pour Nuke, car la nouvelle convention de nommage est beaucoup plus propre et facile à lire.

### 3. **Only Create Nodes For Enabled Viewlayers (Créer des nœuds uniquement pour les calques de vue activés)**
Lorsqu'il est actif, le plugin ignore les calques de vue dont la case `Use for Rendering` (Utiliser pour le rendu) est décochée dans les propriétés des calques de vue, ce qui permet d'économiser de l'espace de nœud et du temps de traitement.

### 4. **Auto Optimize Sample Count For Data Layers (Optimiser automatiquement le nombre d'échantillons pour les couches de données)**
Remplace automatiquement le nombre d'échantillons pour les couches de données lors de la génération de nœuds afin d'accélérer le rendu. Vous pouvez configurer une limite d'échantillons spécifique (par exemple, moins d'échantillons pour les passes utilitaires comme Position et Normals).

### 5. **Custom Name Suffix (Suffixe de nom personnalisé)**
Vous permet d'ajouter un texte personnalisé aux fichiers générés. Par exemple, utilisez `#` pour personnaliser le format de remplissage des numéros d'images (frame padding). Le plugin prend également en charge les variables dynamiques (tokens) évaluées au moment du rendu :
* `$scene$` — Nom de la scène
* `$file$` — Nom du fichier .blend
* `$camera$` — Nom de la caméra active
* `$version$` — Évalue le numéro de version actif (recherche un suffixe comme `v001` à la fin du nom du fichier .blend).

*Exemple de configuration :* `$camera$_$version$_###`

### 6. **Node Interval Scale When Arranging (Échelle d'intervalle des nœuds lors de l'organisation)**
Ajuste l'espacement entre les nœuds lors de l'exécution de la commande `Arrange Nodes`. Cela permet de compenser la mise à l'échelle de l'interface système (par exemple, sur Windows avec une mise à l'échelle d'affichage de 1,5x, définir cette valeur sur `0.67` génère un arbre de nœuds parfaitement espacé).

---

## **Paramètres des outils de sortie**

<img width="400" alt="Paramètres des outils de sortie" src="https://github.com/user-attachments/assets/ffa908d7-e51f-4367-8544-2ec1629dbe2a" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Default Useless Renders Gather (Regroupement des rendus inutiles par défaut)**
Modifie automatiquement le chemin de sortie par défaut de Blender vers un sous-dossier `trash_output`, gardant ainsi vos dossiers de production réels propres.

### 2. **Show Useless Renders Clean Button (Afficher le bouton de nettoyage des rendus inutiles)**
Affiche le bouton `Delete Useless Default Renders` dans l'interface des outils de sortie pour purger facilement les dossiers.

---

## **Paramètres d'apparence**

<img width="400" alt="Paramètres d'apparence" src="https://github.com/user-attachments/assets/cefe5d71-8107-4109-b097-34c9872092eb" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

Ajuste les éléments d'interface, le codage couleur et les thèmes des panneaux personnalisés.
