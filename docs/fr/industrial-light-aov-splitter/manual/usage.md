# Utilisation du Diviseur de Lumi猫re & Directives

Cette page explique le flux de travail de production et les contraintes de nommage pour l'**Industrial Light AOV Splitter**.

---

## **Contraintes du Flux de Travail**

Blender stockant les groupes de lumi猫res au niveau de la couche de vue (View Layer), le module s'ex茅cute par couche de vue. Veuillez respecter les conventions suivantes pour r茅ussir la configuration automatique :

### 1. **Pr茅fixes de Collections**
Placez toutes les lumi猫res que vous souhaitez diviser dans des collections de sc猫ne dont les noms commencent par le pr茅fixe **`lgt_`** (ex. `lgt_key`, `lgt_fill`, `lgt_rim`). Seules les collections activ茅es seront trait茅es.

### 2. **Nommage Alphanum茅rique des Lumi猫res**
Nommez vos lumi猫res en utilisant **uniquement des lettres et des chiffres**.
> 鈿狅笍 **Important :** N'utilisez aucun caract猫re de soulignement (`_`) dans les noms de vos lumi猫res, car le diviseur utilise le trait de soulignement pour suffixer les passes de composants (ex. `diffuse_env`, `specular_env`).

### 3. **Duplication & R茅utilisation des Lumi猫res**
Si vous souhaitez que plusieurs lumi猫res physiques partagent le m锚me nom de groupe de lumi猫res, dupliquez-les simplement. Blender ajoute automatiquement des suffixes comme `.001` ou `.002`. Le module reconna卯t et ignore ces suffixes, les mappant automatiquement au groupe de nom de base.

---

## **Outils d'Interface Avanc茅s**

### **Mode Grande 脡chelle (Large Scale Mode)**
Si la taille de votre sc猫ne est extr锚mement grande, ex茅cuter des tests de v茅rification de la vue peut provoquer des pertes de lumi猫re ou des d茅passements de temps du moteur de rendu. Cochez **`Large Scale Mode`** dans l'interface pour optimiser l'analyse du maillage et 茅viter les d茅lais de connexion.

### **Configuration des Objets 脡missifs & du Monde**
Utilisez les boutons d'attribution rapide dans le panneau des propri茅t茅s pour mapper automatiquement :
*   **Objets 脡missifs (Emissive Objects)** : Parcourt la sc猫ne et attribue un groupe de lumi猫res personnalis茅 脿 tous les maillages contenant des n艙uds d'茅mission de mat茅riau (ex. Propri茅t茅 d'茅mission du Principled BSDF).
*   **Environnement Mondial (World Environment)** : Cr茅e automatiquement un mappage de groupe de lumi猫res distinct pour la carte d'environnement du monde (ex. Environnement HDRI).
