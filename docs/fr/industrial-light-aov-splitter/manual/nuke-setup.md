# Configuration Auto-Shuffle dans Nuke

L'**Industrial Light AOV Splitter** comprend un script compagnon pour séparer (shuffle) et combiner automatiquement les passes de groupes de lumières divisées dans Foundry Nuke.

---

## **Étapes d'Installation**

Suivez ces étapes pour intégrer le script d'auto-shuffle dans votre environnement Nuke :

### Étape 1 : Télécharger le Script
Téléchargez le script Python compagnon `nuke_blender_autoaov.py` depuis la section des versions du dépôt :
*   👉 [Télécharger nuke_blender_autoaov.py](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases/download/release0.5.0/nuke_blender_autoaov.py)

### Étape 2 : Déplacer vers le Répertoire `.nuke`
Copiez le fichier `nuke_blender_autoaov.py` téléchargé dans votre dossier `.nuke` utilisateur :
*   **Windows** : `C:\Users\<VotreNomUtilisateur>\.nuke\`
*   **macOS / Linux** : `~/.nuke/`

### Étape 3 : Enregistrer dans `menu.py`
Ouvrez votre fichier `menu.py` dans le dossier `.nuke` (créez-en un s'il n'existe pas) et ajoutez le code suivant à la fin :

```python
import nuke_blender_autoaov
utilitiesMenu = nuke.menu('Nuke').addMenu('Industrial')
utilitiesMenu.addCommand('Nuke Blender AutoAOV', 'nuke_blender_autoaov.shuffle_and_combine_light_groups()')
```

---

## **Utilisation dans Nuke**

1.  Ouvrez Nuke et importez votre rendu EXR multicanal (contenant des groupes de lumières divisés comme `diffuse_rim`, `specular_rim`, etc.).
2.  Sélectionnez le nœud Read.
3.  Allez dans la barre de menu supérieure, cliquez sur **`Industrial`** > **`Nuke Blender AutoAOV`**.
4.  Le script va automatiquement générer une branche de nœuds qui sépare tous les canaux de composants de groupes de lumières et les fusionne correctement pour reconstruire la passe Beauty.
