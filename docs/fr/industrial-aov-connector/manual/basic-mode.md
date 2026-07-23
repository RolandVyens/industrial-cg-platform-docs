---
title: "Mode basique"
description: "Cette page présente les fonctionnalités de base et les options d'interface d'Industrial AOV Connector."
---
# Mode basique

Cette page présente les fonctionnalités de base et les options d'interface d'**Industrial AOV Connector**.

<img width="300" alt="Panneau du Mode basique" src="https://github.com/user-attachments/assets/277fb64b-c135-47f4-9cef-7c9736c90133" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

## **Contenu par défaut de l'interface**

### 1. **Main Config (Configuration principale)**
Recettes de rendu prédéfinies pour le Mode basique qui contrôlent les configurations des couches de sortie et la structure du compositeur.

### 2. **Output Settings (Paramètres de sortie)**
Options pour ajuster rapidement les paramètres des nœuds sur le point d'être générés (débruitage, préfixes personnalisés, etc.).

### 3. **Bouton `Cook Nodetree` (Générer l'arbre de nœuds)**
Génère les nœuds de sortie du compositeur pour **tous** les calques de vue (ViewLayers) de la scène. Par défaut, cela efface les nœuds existants dans le compositeur avant de créer le nouvel arbre, mais vous pouvez configurer ce comportement pour les conserver via l'option correspondante dans les préférences.

### 4. **Bouton `Update Current Viewlayer` (Mettre à jour le calque de vue actuel)**
Génère les nœuds uniquement pour le **calque de vue actuellement actif**. Cette opération est non destructive et n'affectera aucun autre nœud existant en dehors de ceux appartenant au calque de vue actif.

### 5. **Bouton `Arrange Connector Nodes` (Organiser les nœuds de connexion)**
Réaligne et nettoie la disposition des nœuds associés à l'Industrial AOV Connector dans l'éditeur du compositeur.

---

## **Contenu masqué / d'aide de l'interface**

### **Bouton `Delete Useless Default Renders` (Supprimer les rendus par défaut inutiles)**
Masqué par défaut. Ce bouton d'aide supprime le dossier nommé `trash_output` contenant les rendus par défaut de Blender. Cette opération peut être effectuée en toute sécurité, car les chemins de sortie valides générés par le plugin sont toujours placés en dehors de ce dossier.

Pour activer ce bouton de nettoyage :
1. Cliquez sur **`Preference`** dans l'en-tête.
2. Localisez la section **"Output Tools"** (Outils de sortie).
3. Activez les deux options suivantes :
   * **`Default useless renders gather`** : Modifie automatiquement le chemin de sortie par défaut des rendus de Blender vers le sous-dossier `trash_output`.
   * **`Show useless renders clean button`** : Affiche le bouton "Delete Useless Default Renders" dans le panneau des Outils de sortie.
