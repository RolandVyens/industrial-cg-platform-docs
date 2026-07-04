# FAQ

## G茅n茅ralit茅s

### S'agit-il d'une version officielle de Blender ?

Non. Industrial CG Platform est un fork de Blender maintenu par la communaut茅. Il n'est en aucun cas affili茅 ou approuv茅 par la Fondation Blender. Il est publi茅 sous la m锚me licence open-source GPL-2.0-or-later que Blender.

### Les fichiers `.blend` sont-ils compatibles avec Blender standard ?

Oui. Les fichiers cr茅茅s dans Industrial CG Platform peuvent 锚tre ouverts directement dans Blender 5.2 standard. Les fonctionnalit茅s personnalis茅es (Deep EXR, passes par lobe, etc.) ne seront tout simplement pas disponibles 鈥?les donn茅es sp茅cifiques sont pr茅serv茅es dans le fichier mais ignor茅es par la version officielle.

### 脌 quelle fr茅quence fusionnez-vous les modifications amont (upstream) de Blender ?

Notre branche de staging `vfx-rendering-branch` int猫gre r茅guli猫rement les modifications de la branche principale `origin/main` de Blender. Les fusions sont valid茅es sur plusieurs configurations de test avant d'锚tre synchronis茅es dans la branche de production `industrial-cg-platform`.

### Puis-je utiliser mes add-ons Blender existants ?

La grande majorit茅 des add-ons Blender compatibles avec la version 5.2 officielle fonctionneront 茅galement sur Industrial CG Platform. Cependant, les add-ons obsol猫tes d茅pendant d'API d茅pr茅ci茅es (telles que `bgl` ou des structures internes de `bpy_types` supprim茅es) peuvent journaliser des erreurs au d茅marrage 鈥?ce comportement est identique 脿 celui de Blender 5.2 standard.

## Rendu

### Quels backends GPU sont pris en charge ?

- **CUDA** 鈥?Tous les GPU NVIDIA ayant une capacit茅 de calcul (Compute Capability) sup茅rieure ou 茅gale 脿 5.0.
- **OptiX** 鈥?GPU NVIDIA RTX (fortement recommand茅 pour obtenir les meilleures performances de lancer de rayons).
- **CPU** 鈥?Toujours disponible comme alternative de secours.

### Les fonctionnalit茅s personnalis茅es fonctionnent-elles sur CPU ?

Oui. La sortie Deep EXR, les passes par lobe de lightgroup et la couleur d'ombre (Shadow Color) fonctionnent toutes de mani猫re identique sur les processeurs (CPU) et les GPU NVIDIA (via CUDA ou OptiX).

### Quel est l'impact sur le temps de rendu des passes par lobe de lightgroup ?

Les passes par lobe n'ajoutent qu'un impact infime sur le temps de rendu global. Le co没t principal r茅side dans l'augmentation de la taille des fichiers EXR en sortie (plus de couches d'images). Le calcul de l'茅quilibre global s'effectue de mani猫re int茅gr茅e au cours du processus d'int茅gration de la lumi猫re de Cycles.

## Gestionnaire de ViewLayer

### Pourquoi s'ouvre-t-il dans une fen锚tre s茅par茅e ?

Le gestionnaire de ViewLayer utilise Qt (via le runtime BQt) pour son interface utilisateur, ce qui ne permet pas de l'int茅grer directement dans l'architecture graphique native et propri茅taire de Blender. Il s'ex茅cute donc d茅lib茅r茅ment sous forme de fen锚tre syst猫me autonome de premier niveau.

### Puis-je l'utiliser sur Linux ?

Pas encore. La version actuelle est exclusive 脿 Windows x64 (sous forme d'archive ZIP). La prise en charge de Linux (en commen莽ant par Rocky Linux 9 / X11) est planifi茅e pour une prochaine mise 脿 jour majeure.

### Que signifie le message `failed to get blender hwnd` dans les logs ?

Il s'agit d'un message d'avertissement normal du mode de secours (Safe Mode) de BQt. Cela signifie que BQt cr茅e une nouvelle instance de fen锚tre d'application Qt autonome plut么t que d'envelopper directement la fen锚tre native de Blender. Ce comportement est tout 脿 fait attendu et ne nuit en rien aux fonctionnalit茅s.

## Compilation

### Pourquoi le g茅n茅rateur Visual Studio se bloque-t-il lors de la configuration CMake ?

Il s'agit d'un probl猫me local connu li茅 脿 des conflits avec l'outil syst猫me `Tracker.exe` de MSBuild lorsque le tra莽age des acc猫s aux fichiers est activ茅 par d茅faut. Utiliser le couple Ninja + VsDevCmd comme backend de compilation permet de contourner compl猫tement ce probl猫me.

### Qu'est-ce que la barri猫re d'hydratation Git LFS ?

Certains fichiers volumineux ou binaires du d茅p么t sont g茅r茅s avec Git LFS (Large File Storage). Si ces fichiers ne sont pas correctement "hydrat茅s" (c'est-脿-dire t茅l茅charg茅s sous leur forme binaire r茅elle au lieu de simples pointeurs textuels), la compilation 茅chouera ou produira un ex茅cutable Blender incomplet ou instable. Assurez-vous que les r茅pertoires `assets/`, `release/datafiles/` et `scripts/startup/bl_app_templates_system/` contiennent de vrais binaires avant de compiler.
