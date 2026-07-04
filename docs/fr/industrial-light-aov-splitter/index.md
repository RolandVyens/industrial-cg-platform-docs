# Industrial Light AOV Splitter

**Industrial Light AOV Splitter** est un module de production sp茅cialis茅 pour Blender qui automatise la configuration, la s茅paration et la mat茅rialisation des passes de groupes de lumi猫res individuelles (AOV).

Plut么t que d'exporter des groupes de lumi猫res fusionn茅s g茅n茅riques, cet outil s茅pare automatiquement les groupes de lumi猫res en leurs composants fondamentaux (**diffuse, specular, transmission et volume** ; ex. `diffuse_env`, `specular_env`), offrant ainsi aux artistes de compositing un contr么le total sur le r茅茅clairage en post-production.

---

## Fonctionnalit茅s cl茅s

### 馃挕 Division automatis茅e des groupes de lumi猫res
*   **Division en un clic :** S茅pare automatiquement vos groupes de lumi猫res actifs en canaux de composants d茅taill茅s.
*   **Granularit茅 des lobes :** Mat茅rialise les passes pour les composants diffuse, specular, transmission et volume par groupe de lumi猫res.
*   **Compatibilit茅 Nuke :** Nomm茅 et configur茅 pour s'int茅grer facilement dans Foundry Nuke, Autodesk Flame ou Blackmagic Fusion.

### 馃攲 Int茅gration avec AOV Connector
*   Con莽u pour fonctionner de mani猫re transparente avec le module **Industrial AOV Connector** afin d'茅crire automatiquement ces composants divis茅s dans des fichiers EXR structur茅s.
*   Inclut un script Python compagnon (`nuke_blender_autoaov.py`) dans le d茅p么t pour regrouper et combiner automatiquement ces canaux dans Nuke.

---

## Flux de travail et contraintes de nommage

Pour garantir le bon fonctionnement du s茅parateur, veuillez respecter ces r猫gles :
1.  **Niveau d'interface :** L'outil fonctionne au niveau de la **couche de vue (View Layer)**.
2.  **Nommage des collections :** Les lumi猫res doivent 锚tre plac茅es dans des collections commen莽ant par le pr茅fixe **`lgt_`** (ex. `lgt_character`, `lgt_background`).
3.  **Nommage des lumi猫res :** Les lumi猫res doivent 锚tre nomm茅es en utilisant **uniquement des lettres et des chiffres** (caract猫res alphanum茅riques). N'utilisez **pas** de caract猫res de soulignement (`_`) dans les noms des lumi猫res.
4.  **Duplication des lumi猫res :** Le module g猫re automatiquement les doublons en ignorant le suffixe `.001`. Vous pouvez dupliquer les lumi猫res librement sans casser la structure de nommage.

---

## Installation

### Pr茅requis
*   Blender 4.2 LTS ou sup茅rieur.
*   **Recommandation :** Fortement recommand茅 d'utiliser ce module aux c么t茅s de **Industrial AOV Connector**.

### Via l'archive GitHub
1.  T茅l茅chargez la derni猫re version ZIP depuis le d茅p么t officiel : [Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases).
2.  Dans Blender, allez dans `Edit` > `Preferences` > `Add-ons` > `Install...`.
3.  S茅lectionnez le fichier `.zip` t茅l茅charg茅 et activez le module.

---

## Liens du d茅p么t

*   **D茅p么t GitHub :** [RolandVyens/Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter)
*   **Signaler un probl猫me :** [GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/issues)
