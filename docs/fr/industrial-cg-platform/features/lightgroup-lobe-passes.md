# Passes par lobe de lightgroup

<Badge type="tip" text="Publi茅" />

## Qu'est-ce que c'est ?

Les passes par lobe de lightgroup 茅tendent le syst猫me de passes de lumi猫re de Blender Cycles en d茅composant chaque **lightgroup** (groupe de lumi猫res) en ses composants d'茅clairage individuels (lobes). Au lieu d'obtenir uniquement une passe de lightgroup combin茅e, vous pouvez d茅sormais g茅n茅rer des passes s茅par茅es **diffuse**, **glossy**, **transmission** et **volume** pour chaque lightgroup, avec une s茅paration suppl茅mentaire **directe** et **indirecte**.

Cela donne aux artistes lumi猫re et aux compositeurs le m锚me niveau de contr么le par lightgroup que Blender fournit d茅j脿 au niveau global, mais isol茅 pour chaque configuration d'茅clairage.

## Pourquoi l'utiliser ?

- **R茅茅clairage pr茅cis** 鈥?Ajustez les contributions lumineuses individuelles par type de composant lors du compositing, et non plus seulement par intensit茅 globale.
- **R茅partition par lightgroup** 鈥?Voyez pr茅cis茅ment comment chaque lightgroup contribue de mani猫re ind茅pendante 脿 la diffusion, la brillance, la transmission et au volume.
- **脡quilibre global** 鈥?La somme de toutes les passes par lobe de lightgroup se reconstruit parfaitement dans la passe de beaut茅 combin茅e, permettant des allers-retours de compositing hautement fiables.
- **脡prouv茅 en production** 鈥?Valid茅 sur des sc猫nes de production r茅elles avec des types de lumi猫re de zone (Area), de point, de spot et de soleil (Sun).

## Comment l'activer

1. Ouvrez **Propri茅t茅s > Propri茅t茅s du View Layer > Passes > Lumi猫re (Properties > View Layer Properties > Passes > Light)**.
2. Cr茅ez vos groupes de lumi猫res (lightgroups) comme d'habitude.
3. Cochez **Light Pass AOVs** pour activer la sortie des passes par lobe de lightgroup.
4. S茅lectionnez les composants de lobe que vous souhaitez :
   - **Diffuse** (Direct / Indirect)
   - **Glossy** (Direct / Indirect)
   - **Transmission** (Direct / Indirect)
   - **Volume** (Direct / Indirect)

## Convention de Nommage des Sorties

Chaque passe de lobe de lightgroup est nomm茅e selon le mod猫le suivant :

```
<Lobe>_<Direct|Indirect>_<NomLightgroup>
```

Par exemple, avec un lightgroup nomm茅 `key` :

| Nom de la passe | Contenu |
| --- | --- |
| `Combined_key` | Passe de lightgroup combin茅e |
| `Diffuse_Direct_key` | Diffusion directe des lumi猫res `key` |
| `Diffuse_Indirect_key` | Diffusion indirecte des lumi猫res `key` |
| `Glossy_Direct_key` | Brillance directe des lumi猫res `key` |
| `Glossy_Indirect_key` | Brillance indirecte des lumi猫res `key` |
| `Transmission_Direct_key` | Transmission directe des lumi猫res `key` |
| `Transmission_Indirect_key` | Transmission indirecte des lumi猫res `key` |
| `Volume_Direct_key` | Volume direct des lumi猫res `key` |
| `Volume_Indirect_key` | Volume indirect des lumi猫res `key` |

## 脡quilibre Global (Aggregate Balance)

Les passes de lobe sont con莽ues de telle sorte que :

```
Combined_<lg> 鈮?危 (Lobe_Direct_<lg> + Lobe_Indirect_<lg>)
```

Pour chaque groupe de lumi猫res, cela signifie :

- **Les groupes de maillages 茅missifs** sont uniquement combin茅s par conception (pas de d茅composition par lobe).
- **Les lumi猫res finies** (zone, point, spot, soleil) sont enti猫rement reconstruites via leurs passes de lobe.
- **Les groupes de monde/environnement** 茅crivent correctement les passes de lobe m锚me si `Background pass` et `Emission pass` sont d茅sactiv茅s dans le view layer.

## Flux de travail Compositeur & Nuke

### Dans le Compositeur Blender

1. Connectez un n艙ud **Render Layers**.
2. Chaque passe de lobe de lightgroup appara卯t comme une prise de sortie s茅par茅e.
3. Utilisez les n艙uds de compositeur standard pour ajuster les contributions individuelles des lobes.

### Dans Nuke

1. Importez l'EXR multicouche 脿 l'aide d'un n艙ud `Read`.
2. Chaque passe de lobe de lightgroup appara卯t comme un calque/canal s茅par茅 dans l'EXR.
3. Utilisez des n艙uds `Shuffle` pour isoler et 茅talonner les contributions individuelles des lobes.
4. Additionnez-les 脿 nouveau pour obtenir l'image finale r茅茅clair茅e.

::: tip
Un contr么le de compositing utile : la somme de toutes les passes par lobe de lightgroup (plus les passes 茅missives combin茅es `Combined_<lg>`) doit correspondre de tr猫s pr猫s 脿 la passe de beaut茅 globale `rgba`.
:::

## Limites connues

- **Maillages 茅missifs** 鈥?Les groupes de lumi猫res de maillage 茅missif restent uniquement combin茅s et ne sont pas divis茅s en lobes directs/indirects. C'est un choix de conception.
- **LPE arbitraire complet** 鈥?La prise en charge compl猫te de la syntaxe des expressions de chemin de lumi猫re (LPE) est un travail futur. Le syst猫me actuel fournit les divisions de lobe les plus fr茅quemment n茅cessaires.

## Voir Aussi

- [Syst猫me de passes et AOV (API)](/fr/industrial-cg-platform/api/pass-system) 鈥?Architecture interne d'enregistrement et de lecture des passes.
- [Extensions du noyau Cycles (API)](/fr/industrial-cg-platform/api/cycles-kernel) 鈥?Donn茅es d'index de division de lightgroup au niveau du noyau.
- [Manuel Blender: Groupes de lumi猫res](https://docs.blender.org/manual/en/latest/render/layers/passes.html) 鈥?Documentation standard sur les groupes de lumi猫res dans Blender.
