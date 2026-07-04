# Mode basique

Cette page pr茅sente les fonctionnalit茅s de base et les options d'interface d'**Industrial AOV Connector**.

<img width="300" alt="Panneau du Mode basique" src="https://github.com/user-attachments/assets/277fb64b-c135-47f4-9cef-7c9736c90133" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

## **Contenu par d茅faut de l'interface**

### 1. **Main Config (Configuration principale)**
Recettes de rendu pr茅d茅finies pour le Mode basique qui contr么lent les configurations des couches de sortie et la structure du compositeur.

### 2. **Output Settings (Param猫tres de sortie)**
Options pour ajuster rapidement les param猫tres des n艙uds sur le point d'锚tre g茅n茅r茅s (d茅bruitage, pr茅fixes personnalis茅s, etc.).

### 3. **Bouton `Cook Nodetree` (G茅n茅rer l'arbre de n艙uds)**
G茅n猫re les n艙uds de sortie du compositeur pour **tous** les calques de vue (ViewLayers) de la sc猫ne. Par d茅faut, cela efface les n艙uds existants dans le compositeur avant de cr茅er le nouvel arbre, mais vous pouvez configurer ce comportement pour les conserver via l'option correspondante dans les pr茅f茅rences.

### 4. **Bouton `Update Current Viewlayer` (Mettre 脿 jour le calque de vue actuel)**
G茅n猫re les n艙uds uniquement pour le **calque de vue actuellement actif**. Cette op茅ration est non destructive et n'affectera aucun autre n艙ud existant en dehors de ceux appartenant au calque de vue actif.

### 5. **Bouton `Arrange Connector Nodes` (Organiser les n艙uds de connexion)**
R茅aligne et nettoie la disposition des n艙uds associ茅s 脿 l'Industrial AOV Connector dans l'茅diteur du compositeur.

---

## **Contenu masqu茅 / d'aide de l'interface**

### **Bouton `Delete Useless Default Renders` (Supprimer les rendus par d茅faut inutiles)**
Masqu茅 par d茅faut. Ce bouton d'aide supprime le dossier nomm茅 `trash_output` contenant les rendus par d茅faut de Blender. Cette op茅ration peut 锚tre effectu茅e en toute s茅curit茅, car les chemins de sortie valides g茅n茅r茅s par le plugin sont toujours plac茅s en dehors de ce dossier.

Pour activer ce bouton de nettoyage :
1. Cliquez sur **`Preference`** dans l'en-t锚te.
2. Localisez la section **"Output Tools"** (Outils de sortie).
3. Activez les deux options suivantes :
   * **`Default useless renders gather`** : Modifie automatiquement le chemin de sortie par d茅faut des rendus de Blender vers le sous-dossier `trash_output`.
   * **`Show useless renders clean button`** : Affiche le bouton "Delete Useless Default Renders" dans le panneau des Outils de sortie.
