# Cycles 鍐呮牳鎵╁睍

鏈〉璁板綍浜?Industrial CG Platform 瀵?Cycles 娓叉煋寮曟搸杩涜鐨?C++ 鍐呮牳绾ф坊鍔犮€?

## Deep EXR 鍐呮牳鎵╁睍

### 閫氶亾绫诲瀷

```cpp
// intern/cycles/kernel/types.h
PASS_DEEP_COMBINED   // Deep 缁撳悎 RGBA 閫氶亾
PASS_DEEP_POSITION   // Deep 閫愰噰鏍蜂綅缃暟鎹?
```

杩欎簺閫氶亾绫诲瀷鍦?Cycles film 涓敞鍐岋紝骞跺惎鐢ㄦ覆鏌撶绾夸腑鐨勯€愰噰鏍锋繁搴︽暟鎹緭鍑恒€?

### KernelFilm 瀛楁

```cpp
// intern/cycles/kernel/types.h (KernelFilm 缁撴瀯浣?
int pass_deep_combined;     // Deep 缁撳悎閫氶亾鐨?film 鍋忕Щ閲?
int pass_deep_position;     // Deep 浣嶇疆閫氶亾鐨?film 鍋忕Щ閲?
int deep_tile_budget;       // 閫?tile 瀛樺偍 deep 閲囨牱鐨勫唴瀛橀绠?
```

### Deep 杈撳嚭绠＄嚎

Deep 杈撳嚭绠＄嚎鎵╁睍浜嗘爣鍑嗙殑 Cycles film 鍐欏叆璺緞锛?
1. 鍦ㄨ矾寰勮拷韪紙Path Tracing锛夎繃绋嬩腑锛屾瘡涓噰鏍疯褰曞叾棰滆壊鏁版嵁鐨勫悓鏃惰褰曞叾娣卞害淇℃伅銆?
2. Film 璐熻矗鎸?tile 绱Н deep 閲囨牱鏁版嵁锛岀疮绉繁搴﹀彈 `deep_tile_budget` 鍙傛暟鎺у埗銆?
3. 鍦ㄦ渶缁堣緭鍑烘椂锛屼娇鐢?OpenEXR 鐨?deep 鍥惧儚 API 灏?deep 鏁版嵁鍐欏叆鏂囦欢銆?

## 闃村奖棰滆壊鍐呮牳鎵╁睍

### KernelBackground 瀛楁

```cpp
// intern/cycles/kernel/types.h (KernelBackground 缁撴瀯浣?
float3 shadow_color;        // 涓栫晫闃村奖棰滆壊 (RGB)
```

### KernelLight 瀛楁

```cpp
// intern/cycles/kernel/types.h (KernelLight 缁撴瀯浣?
float3 shadow_color;        // 閫愮伅鍏夐槾褰遍鑹?(RGB)
```

闃村奖棰滆壊搴旂敤浜庣Н鍒嗗櫒鐨勯槾褰辫瘎浼拌矾寰勪腑锛屼娇鐢ㄦ寚瀹氱殑棰滆壊瀵归槾褰辫础鐚繘琛岀潃鑹层€?

## 鐏厜缁勫垎閲忛€氶亾 (Lightgroup Lobe Passes)

### 鎷嗗垎鍒嗛噺绱㈠紩绯荤粺

```cpp
// intern/cycles/kernel/types.h
int lightgroup_split_index[];   // 閫愮伅鍏夌粍浠庢媶鍒嗗垎閲忓埌 film 鍋忕Щ閲忕殑閲嶆柊鏄犲皠
```

鐏厜缁勬媶鍒嗙储寮曟槸涓€涓暟鎹暟缁勶紙閫氳繃 `kernel_data_fetch` 璁块棶锛夛紝灏嗘瘡涓伅鍏夌粍鐨勬媶鍒嗗垎閲忛€氶亾鏄犲皠鍒板叾 film 缂撳啿鍖哄亸绉婚噺銆傝繖鍙栦唬浜嗘鍓嶄娇鐢ㄧ殑鍘熺敓璁惧鎸囬拡鏂规銆?

### Film 鍐欏叆鎵╁睍

浠ヤ笅 film 鍐欏叆鍑芥暟宸叉墿灞曪紝浠ユ敮鎸侀€愮伅鍏夌粍鐨勬媶鍒嗗垎閲忛€氶亾杈撳嚭锛?

```cpp
// intern/cycles/kernel/film/write.h
film_write_lightgroup_split_pass()  // 鍐欏叆鐗瑰畾鐨勭伅鍏夌粍鍒嗛噺閫氶亾
```

### 鐜鐏厜缁勬纭€т慨姝?(Environment Lightgroup Fix)

涓€椤瑰叧閿殑姝ｇ‘鎬т慨澶嶇‘淇濅簡鍗充娇鍦ㄨ鍥惧眰锛圴iew Layer锛変腑绂佺敤浜?`Background pass`锛堣儗鏅€氶亾锛夊拰 `Emission pass`锛堝彂灏勯€氶亾锛夋椂锛屼笘鐣?鐜鐏厜缁勭殑鍒嗛噺閫氶亾涔熻兘姝ｇ‘鍐欏叆锛?

```cpp
// intern/cycles/kernel/integrator/shade_surface.h
// 浣跨敤鏄惧紡璐＄尞绫诲埆锛圕ontribution Kind锛変唬鏇块€氶亾鍋忕Щ閲忔瘮杈冿紝
// 浠ラ伩鍏嶅湪涓や釜閫氶亾鍧囪绂佺敤鏃跺洜 PASS_UNUSED 浜х敓鍒悕/娣锋穯闂
```

### 灞炴€х伅鍏夌伅娉″懡涓慨姝?(Finite Light Lamp-Hit Fix)

鏅€氱伅娉″懡涓矾寰勶紙`PRIMITIVE_LAMP` 鍓嶅悜纰版挒鍛戒腑锛夌幇鍦ㄥ彲涓哄睘鎬х伅鍏夛紙鍖哄煙鍏夈€佺偣鍏夋簮銆佽仛鍏夌伅銆佹棩鍏夛級姝ｇ‘鍐欏叆鐏厜缁勫垎閲忛€氶亾锛岃€屽彂灏勭綉鏍硷紙Emissive Mesh锛夎矾寰勫垯淇濇寔璁捐涓婄殑鍚堝苟杈撳嚭锛圕ombined-Only锛夛細

```cpp
// intern/cycles/kernel/integrator/shade_light.h
// 灞炴€х伅鍏夊墠鍚戝懡涓彂灏勫啓鍏ョ幇鏈夌殑鍒嗛噺鏃忎腑
```

## 鐜闆?(Environment Fog - 寮€鍙戜腑)

::: warning
鐜闆撅紙Environment Fog锛夊唴鏍告墿灞曠洰鍓嶅浜庡紑鍙戦樁娈碉紝灏氭湭姝ｅ紡鍙戝竷銆傛鐗瑰緛鍙戝竷鍚庯紝鏈妭鍐呭灏嗕細浜堜互濉厖銆?
:::

## 婧愭枃浠?

| 鏂囦欢 | 鐢ㄩ€?|
| --- | --- |
| `intern/cycles/kernel/types.h` | 鍐呮牳鏁版嵁缁撴瀯銆侀€氶亾鏋氫妇鍊笺€乫ilm 瀛楁瀹氫箟 |
| `intern/cycles/kernel/film/write.h` | 鍖呭惈鎷嗗垎鐏厜缁勯€氶亾鐨?film 鍐欏叆鍑芥暟 |
| `intern/cycles/kernel/integrator/shade_surface.h` | 琛ㄩ潰鐫€鑹查€昏緫锛屽寘鍚幆澧冪伅鍏夌粍淇 |
| `intern/cycles/kernel/integrator/shade_light.h` | 鐏厜鐫€鑹查€昏緫锛屽寘鍚伅娉″懡涓垎閲忎慨澶?|
| `intern/cycles/integrator/path_trace_tile.h` | 甯︽湁鎷嗗垎閫氶亾鏍囪瘑鐨?tile 绾ч€氶亾鏁版嵁鍥炶 |
| `intern/cycles/scene/film.cpp` | Film 璁剧疆涓庨€氶亾娉ㄥ唽閫昏緫 |
| `intern/cycles/scene/light.cpp` | 鐏厜闃村奖棰滆壊鍚屾 |
| `intern/cycles/scene/background.cpp` | 鑳屾櫙涓栫晫闃村奖棰滆壊鍚屾 |
