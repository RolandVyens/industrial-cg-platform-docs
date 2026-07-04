# Configuration Auto-Shuffle dans Nuke

L'**Industrial Light AOV Splitter** comprend un script compagnon pour s茅parer (shuffle) et combiner automatiquement les passes de groupes de lumi猫res divis茅es dans Foundry Nuke.

---

## **脡tapes d'Installation**

Suivez ces 茅tapes pour int茅grer le script d'auto-shuffle dans votre environnement Nuke :

### 脡tape 1 : T茅l茅charger le Script
T茅l茅chargez le script Python compagnon `nuke_blender_autoaov.py` depuis la section des versions du d茅p么t :
*   馃憠 [T茅l茅charger nuke_blender_autoaov.py](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases/download/release0.5.0/nuke_blender_autoaov.py)

### 脡tape 2 : D茅placer vers le R茅pertoire `.nuke`
Copiez le fichier `nuke_blender_autoaov.py` t茅l茅charg茅 dans votre dossier `.nuke` utilisateur :
*   **Windows** : `C:\Users\<VotreNomUtilisateur>\.nuke\`
*   **macOS / Linux** : `~/.nuke/`

### 脡tape 3 : Enregistrer dans `menu.py`
Ouvrez votre fichier `menu.py` dans le dossier `.nuke` (cr茅ez-en un s'il n'existe pas) et ajoutez le code suivant 脿 la fin :

```python
import nuke_blender_autoaov
utilitiesMenu = nuke.menu('Nuke').addMenu('Industrial')
utilitiesMenu.addCommand('Nuke Blender AutoAOV', 'nuke_blender_autoaov.shuffle_and_combine_light_groups()')
```

---

## **Utilisation dans Nuke**

1.  Ouvrez Nuke et importez votre rendu EXR multicanal (contenant des groupes de lumi猫res divis茅s comme `diffuse_rim`, `specular_rim`, etc.).
2.  S茅lectionnez le n艙ud Read.
3.  Allez dans la barre de menu sup茅rieure, cliquez sur **`Industrial`** > **`Nuke Blender AutoAOV`**.
4.  Le script va automatiquement g茅n茅rer une branche de n艙uds qui s茅pare tous les canaux de composants de groupes de lumi猫res et les fusionne correctement pour reconstruire la passe Beauty.
