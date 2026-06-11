# Mode avancé

Cette page détaille les fonctionnalités avancées affichées lorsque l'**Industrial AOV Connector** est basculé hors de son mode basique par défaut.

---

## **Panneau des paramètres avancés**

<img width="300" alt="Panneau du Mode avancé" src="https://github.com/user-attachments/assets/42ba84fc-4f39-4c9d-a890-b028c910fd01" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Use Advanced Mode (Utiliser le mode avancé)**
Bascule le plugin en Mode avancé, contournant les préréglages de base (`Main Config`) et affichant des commandes individuelles et granulaires.

### 2. **EXR Codec (Codec EXR)**
Contrôle le codec de compression utilisé pour chaque classe de sortie.

| **Codec** | **Description** |
| :--- | :--- |
| **ZIP** | Sans perte. Offre un bon taux de compression et des performances de lecture décentes. Le choix équilibré standard. |
| **PIZ** | Sans perte. Taux de compression le plus élevé pour les images avec du grain ou du bruit, mais plus lent à lire/écrire. |
| **RLE** | Sans perte. Le plus rapide pour les opérations de lecture et d'écriture, mais produit des fichiers nettement plus volumineux. |
| **ZIPS** | Sans perte. Correspond au taux de compression de ZIP, mais permet une lecture jusqu'à 40 % plus rapide dans Nuke grâce à des structures de données à une seule ligne de balayage (scanline). Fortement recommandé. |
| **PXR24** | Avec perte. Compresse les nombres flottants 32 bits en 24 bits. Non adapté pour les passes Cryptomatte, mais idéal pour réduire la taille des canaux de données utilitaires. |
| **DWAA / B** | Avec perte. Taux de compression extrêmement élevés pour les rendus Beauty. DWAA fonctionne sur des groupes de blocs ; DWAB est optimisé pour les paquets de lignes de balayage (scanline). |
| **NONE** | Non compressé. |

> ⚠️ **Note :** Les fichiers EXR de Cryptomatte doivent utiliser des méthodes de compression **sans perte** (telles que ZIP, ZIPS ou PIZ) pour éviter la corruption des données.

### 3. **Independent DATA Layer Config (Configuration de la couche DATA indépendante)**
Sépare les passes utilitaires et de données des passes Beauty, permettant ainsi des configurations d'échantillonnage et des collections distinctes.

---

## **Couches DATA indépendantes**

<img width="300" alt="Interface de la couche DATA indépendante" src="https://github.com/user-attachments/assets/5a197960-a39e-4bdb-a4eb-de761e92fe09" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

Lorsque vous activez **`Use Independent DATA Layer`**, vos calques de vue Beauty standard ne génèreront plus de passes de données (telles que Depth, Normals ou Position). À la place, elles seront dirigées vers un calque de vue dédié "DATA".

Le plugin reconnaît automatiquement les couches de données en recherchant des préfixes ou suffixes spécifiques dans le nom du calque de vue (par exemple, `-_-exP_` ou `_DATA`).

### **Cas d'usage en production**
Si vous avez une scène avec du brouillard volumétrique dense (comme de la fumée ou de l'atmosphère), le rendu des passes de données (comme la position mondiale ou la profondeur) à travers ce brouillard produira des résultats bruités et inutilisables. En utilisant une **couche DATA indépendante**, vous pouvez masquer les collections de brouillard volumétrique dans le calque de vue de données. Les passes de sortie (Z-depth, Normals, P-world) seront alors rendues proprement et sans bruit.

### 1. **Bouton `Make A DATA Layer` (Créer une couche DATA)**
Affiche un menu pour créer un calque de vue exclusif pour les données. Il s'agit d'une version modifiée de la fonction par défaut de Blender `Add View Layer` (`Copy Settings` ou `New`).

### 2. **Bouton `Convert To DATA Layer` (Convertir en couche DATA)**
Renomme le calque de vue actif en y ajoutant `-_-exP_` et `_DATA` afin qu'il soit reconnu comme une couche de données.

### 3. **DATA Layer Material Override (Surcharge de matériau pour la couche DATA)**
Applique une surcharge de matériau utilitaire spécialisée au calque actif, configurant ainsi les sorties correctes pour les fonctionnalités AOV :
* **Antialiased Pworld** (Position mondiale)
* **Pref** (Position de référence)
* **Depth / Z**
* **Fake DEEP**

> 💡 **Astuce :** Pour utiliser **Pref** (Position de référence) correctement, assurez-vous d'activer l'option **`rest position`** dans la section des formes clés (shape keys) de votre maillage.

### 4. **DEEP From Image Z**
Convertit les données de profondeur au format 1/Z correspondant à la structure de profondeur native de Nuke. Cela vous permet de brancher directement le rendu dans un nœud Nuke `Deep From Image`. En raison de l'anticrénelage standard, cette option est préférable sur les bords sans flou de mouvement.
