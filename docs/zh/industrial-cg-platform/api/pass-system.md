# Pass 涓?AOV 绯荤粺

鏈〉璁板綍浜?Industrial CG Platform 濡備綍鎵╁睍 Blender 鐨勬覆鏌撻€氶亾锛圧ender Pass锛変笌 AOV 绯荤粺銆?

## 鏂伴€氶亾绫诲瀷

### Deep EXR 閫氶亾

| 閫氶亾绫诲瀷 | 鍐呴儴鍚嶇О | 鎻忚堪 |
| --- | --- | --- |
| `PASS_DEEP_COMBINED` | `Deep Combined` | 鐢ㄤ簬 deep 鍚堟垚鐨勯€愰噰鏍?RGBA 涓庢繁搴︽暟鎹?|
| `PASS_DEEP_POSITION` | `Deep Position` | 閫愰噰鏍蜂笘鐣岀┖闂翠綅缃暟鎹?|

### 闆鹃€氶亾锛圗nvironment Fog - 寮€鍙戜腑锛?

| 閫氶亾绫诲瀷 | 鍐呴儴鍚嶇О | 鎻忚堪 |
| --- | --- | --- |
| `PASS_FOG` | `Fog` | 鐜闆捐础鐚€氶亾 |

::: warning
闆鹃€氶亾鏄幆澧冮浘锛圗nvironment Fog锛夌壒寰佺殑涓€閮ㄥ垎锛岃鐗瑰緛鐩墠灏氭湭姝ｅ紡鍙戝竷銆?
:::

## 鐏厜缁勫垎閲忛€氶亾娉ㄥ唽

鍦ㄨ鍥惧眰锛圴iewLayer锛変笂鍚敤 `use_lightgroup_light_pass_aovs` 鏃讹紝绯荤粺浼氬湪娓叉煋鍑嗗璁剧疆锛圧ender Setup锛夐樁娈垫敞鍐岄澶栫殑閫愮伅鍏夌粍閫氶亾銆?

### 娉ㄥ唽娴佺▼

```
鍦烘櫙鍚屾 Scene sync 鈫?Film 璁剧疆 Film setup 鈫?瀵规瘡涓€涓伅鍏夌粍杩涜閬嶅巻 For each lightgroup:
  鈫?濡傛灉鍚敤浜嗘媶鍒嗗垎閲忛€氶亾 If split passes enabled:
    鈫?娉ㄥ唽 Combined_<lg>
    鈫?娉ㄥ唽 Diffuse_Direct_<lg> (濡傛灉鍚敤)
    鈫?娉ㄥ唽 Diffuse_Indirect_<lg> (濡傛灉鍚敤)
    鈫?娉ㄥ唽 Glossy_Direct_<lg> (濡傛灉鍚敤)
    鈫?... (娉ㄥ唽鎵€鏈夊凡鍚敤鐨勫垎閲忕粍鍚?
```

### 閫氶亾鍛藉悕绾﹀畾

```
<Lobe>_<Direction>_<LightgroupName>
```

鍏朵腑锛?
- **Lobe锛堝垎閲忥級**锛歚Diffuse`锛堟极鍙嶅皠锛夈€乣Glossy`锛堝厜娉斤級銆乣Transmission`锛堥€忓皠锛夈€乣Volume`锛堜綋绉級
- **Direction锛堟柟鍚戯級**锛歚Direct`锛堢洿鎺ワ級銆乣Indirect`锛堥棿鎺ワ級
- **LightgroupName**锛氱敤鎴峰畾涔夌殑鐏厜缁勫悕绉?

姣忎釜鐏厜缁勭殑 `Combined_<lg>` 閫氶亾灏嗗缁堥粯璁ゅ瓨鍦ㄣ€?

### Film 鍋忕Щ閲忔槧灏?

姣忎釜娉ㄥ唽鐨勯€氶亾閮戒細鍦?Cycles film 缂撳啿鍖轰腑鑾峰緱涓€涓敮涓€鐨勫亸绉婚噺銆傜伅鍏夌粍鎷嗗垎鍒嗛噺绱㈠紩鏄犲皠鍏紡濡備笅锛?

```
lightgroup_split_index[lightgroup_id * num_split_types + split_type_index] = film_offset
```

杩欏彲浠ュ湪鍐呮牳涓€氳繃 `kernel_data_fetch(lightgroup_split_index, index)` 鏉ョ洿鎺ヨ鍙栥€?

## 閫氶亾鏁版嵁鍥炶 (Pass Readback)

### 鏍囪瘑涓€鑷存€т繚鐣?(Identity Preservation)

涓€椤瑰叧閿殑姝ｇ‘鎬т慨姝ｇ‘淇濅簡閫愮伅鍏夌粍鐨勬媶鍒嗗垎閲忛€氶亾鑳介€氳繃鍏剁湡瀹炵殑 `PassType` 鏍囪瘑鏉ユ纭洖璇伙紝鑰屼笉鏄€氳繃绗竴涓尮閰嶇殑閫氱敤閫氶亾绫诲瀷鍥炶銆傝繖鍙互鏈夋晥闃叉锛?

- 瀛樺湪闂存帴鍏夐€氶亾鏃讹紝鐩存帴鍏夐€氶亾寮傚父鏄剧ず涓虹┖鐧姐€?
- 涓嶅悓鐏厜缁勫垎閲忕粍鍚堜箣闂寸殑閫氶亾鍐呭鍙戠敓鍒悕/娣锋穯鍐茬獊銆?

璇ヤ慨姝ｄ綅浜庯細
```
intern/cycles/integrator/path_trace_tile.h
```

### 鍚堟垚鍣ㄩ泦鎴?(Compositor Integration)

鐏厜缁勫垎閲忛€氶亾浣滀负鏍囧噯鐨?Blender 娓叉煋閫氶亾鍚戝鏆撮湶锛屽苟浼氬憟鐜板湪浠ヤ笅浣嶇疆锛?
- Blender 鍚堟垚鍣紙Compositor锛変腑锛岃〃鐜颁负娓叉煋灞傦紙Render Layers锛夎妭鐐圭殑鐙珛杈撳嚭濂楁帴瀛楋紙Socket锛夈€?
- 鍥惧儚缂栬緫鍣紙Image Editor锛夌殑閫氶亾閫夋嫨涓嬫媺鑿滃崟涓€?
- 澶氬眰 OpenEXR 杈撳嚭涓紝淇濆瓨涓烘湁鏄庣‘鍛藉悕鐨勫浘鍍忓浘灞傘€?

## Deep EXR 杈撳嚭鏍煎紡

鍚敤 Deep EXR 杈撳嚭鏃讹細

1. 娓叉煋绠＄嚎鍦ㄥ瓨鍌ㄩ鑹叉暟鎹殑鍚屾椂锛屽皢閫愰噰鏍风殑娣卞害鏁版嵁涓€骞惰繘琛屽瓨鍌ㄣ€?
2. 鍦ㄨ緭鍑洪樁娈碉紝浣跨敤 OpenEXR 鐨?deep 鍥惧儚 API 鍐欏叆鐢熸垚鐨?deep 鏂囦欢銆?
3. 璇?deep 鏍煎紡涓庤涓氭爣鍑嗙殑 deep 鍚堟垚宸ュ叿瀹屽叏鍏煎锛堝 Nuke 鐨?`DeepRead` 鑺傜偣绛夛級銆?

### Deep Tile 棰勭畻 (Deep Tile Budget)

`deep_tile_budget` 鍙傛暟鎺у埗鐫€鍦?tile 娓叉煋鏈熼棿姣忎釜鍍忕礌鍙互瀛樺偍鐨勬渶澶ч噰鏍锋暟銆傛暟鍊艰秺楂橈紝淇濈暀鐨勬繁搴︾粏鑺傚氨瓒婂畬缇庯紝浣嗕篃浼氱浉搴旀秷鑰楁洿澶氬唴瀛樸€?

## 婧愭枃浠?

| 鏂囦欢 | 鐢ㄩ€?|
| --- | --- |
| `intern/cycles/scene/film.cpp` | 閫氶亾娉ㄥ唽涓?film 璁剧疆閫昏緫 |
| `intern/cycles/integrator/path_trace_tile.h` | 甯︽湁鏍囪瘑涓€鑷存€т繚鐣欑殑閫氶亾鏁版嵁鍥炶閫昏緫 |
| `intern/cycles/blender/addon/properties.py` | Cycles 鎻掍欢閫氶亾灞炴€у畾涔?|
| `source/blender/render/intern/pipeline.cc` | Blender 娓叉煋绠＄嚎閫氶亾闆嗘垚閫昏緫 |
| `source/blender/makesrna/intern/rna_scene.cc` | RNA 閫氶亾灞炴€у畾涔?|
| `intern/cycles/kernel/types.h` | 鍐呮牳閫氶亾绫诲瀷鏋氫妇瀹氫箟 |
