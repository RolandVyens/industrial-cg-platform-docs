# Mode avanc茅

Cette page d茅taille les fonctionnalit茅s avanc茅es affich茅es lorsque l'**Industrial AOV Connector** est bascul茅 hors de son mode basique par d茅faut.

---

## **Panneau des param猫tres avanc茅s**

<img width="300" alt="Panneau du Mode avanc茅" src="https://github.com/user-attachments/assets/42ba84fc-4f39-4c9d-a890-b028c910fd01" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Use Advanced Mode (Utiliser le mode avanc茅)**
Bascule le plugin en Mode avanc茅, contournant les pr茅r茅glages de base (`Main Config`) et affichant des commandes individuelles et granulaires.

### 2. **EXR Codec (Codec EXR)**
Contr么le le codec de compression utilis茅 pour chaque classe de sortie.

| **Codec** | **Description** |
| :--- | :--- |
| **ZIP** | Sans perte. Offre un bon taux de compression et des performances de lecture d茅centes. Le choix 茅quilibr茅 standard. |
| **PIZ** | Sans perte. Taux de compression le plus 茅lev茅 pour les images avec du grain ou du bruit, mais plus lent 脿 lire/茅crire. |
| **RLE** | Sans perte. Le plus rapide pour les op茅rations de lecture et d'茅criture, mais produit des fichiers nettement plus volumineux. |
| **ZIPS** | Sans perte. Correspond au taux de compression de ZIP, mais permet une lecture jusqu'脿 40 % plus rapide dans Nuke gr芒ce 脿 des structures de donn茅es 脿 une seule ligne de balayage (scanline). Fortement recommand茅. |
| **PXR24** | Avec perte. Compresse les nombres flottants 32 bits en 24 bits. Non adapt茅 pour les passes Cryptomatte, mais id茅al pour r茅duire la taille des canaux de donn茅es utilitaires. |
| **DWAA / B** | Avec perte. Taux de compression extr锚mement 茅lev茅s pour les rendus Beauty. DWAA fonctionne sur des groupes de blocs ; DWAB est optimis茅 pour les paquets de lignes de balayage (scanline). |
| **NONE** | Non compress茅. |

> 鈿狅笍 **Note :** Les fichiers EXR de Cryptomatte doivent utiliser des m茅thodes de compression **sans perte** (telles que ZIP, ZIPS ou PIZ) pour 茅viter la corruption des donn茅es.

### 3. **Independent DATA Layer Config (Configuration de la couche DATA ind茅pendante)**
S茅pare les passes utilitaires et de donn茅es des passes Beauty, permettant ainsi des configurations d'茅chantillonnage et des collections distinctes.

---

## **Couches DATA ind茅pendantes**

<img width="300" alt="Interface de la couche DATA ind茅pendante" src="https://github.com/user-attachments/assets/5a197960-a39e-4bdb-a4eb-de761e92fe09" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

Lorsque vous activez **`Use Independent DATA Layer`**, vos calques de vue Beauty standard ne g茅n猫reront plus de passes de donn茅es (telles que Depth, Normals ou Position). 脌 la place, elles seront dirig茅es vers un calque de vue d茅di茅 "DATA".

Le plugin reconna卯t automatiquement les couches de donn茅es en recherchant des pr茅fixes ou suffixes sp茅cifiques dans le nom du calque de vue (par exemple, `-_-exP_` ou `_DATA`).

### **Cas d'usage en production**
Si vous avez une sc猫ne avec du brouillard volum茅trique dense (comme de la fum茅e ou de l'atmosph猫re), le rendu des passes de donn茅es (comme la position mondiale ou la profondeur) 脿 travers ce brouillard produira des r茅sultats bruit茅s et inutilisables. En utilisant une **couche DATA ind茅pendante**, vous pouvez masquer les collections de brouillard volum茅trique dans le calque de vue de donn茅es. Les passes de sortie (Z-depth, Normals, P-world) seront alors rendues proprement et sans bruit.

### 1. **Bouton `Make A DATA Layer` (Cr茅er une couche DATA)**
Affiche un menu pour cr茅er un calque de vue exclusif pour les donn茅es. Il s'agit d'une version modifi茅e de la fonction par d茅faut de Blender `Add View Layer` (`Copy Settings` ou `New`).

### 2. **Bouton `Convert To DATA Layer` (Convertir en couche DATA)**
Renomme le calque de vue actif en y ajoutant `-_-exP_` et `_DATA` afin qu'il soit reconnu comme une couche de donn茅es.

### 3. **DATA Layer Material Override (Surcharge de mat茅riau pour la couche DATA)**
Applique une surcharge de mat茅riau utilitaire sp茅cialis茅e au calque actif, configurant ainsi les sorties correctes pour les fonctionnalit茅s AOV :
* **Antialiased Pworld** (Position mondiale)
* **Pref** (Position de r茅f茅rence)
* **Depth / Z**
* **Fake DEEP**

> 馃挕 **Astuce :** Pour utiliser **Pref** (Position de r茅f茅rence) correctement, assurez-vous d'activer l'option **`rest position`** dans la section des formes cl茅s (shape keys) de votre maillage.

### 4. **DEEP From Image Z**
Convertit les donn茅es de profondeur au format 1/Z correspondant 脿 la structure de profondeur native de Nuke. Cela vous permet de brancher directement le rendu dans un n艙ud Nuke `Deep From Image`. En raison de l'anticr茅nelage standard, cette option est pr茅f茅rable sur les bords sans flou de mouvement.
