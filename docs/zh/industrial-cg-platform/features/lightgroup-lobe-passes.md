# 鐏厜缁勫垎閲忛€氶亾

<Badge type="tip" text="宸插彂甯? />

## 浠€涔堟槸鐏厜缁勫垎閲忛€氶亾锛?

鐏厜缁勫垎閲忛€氶亾锛圠ightgroup Lobe Passes锛夋墿灞曚簡 Blender Cycles 鐨勭伅鍏夐€氶亾绯荤粺锛岄€氳繃灏嗘瘡涓?*鐏厜缁?(lightgroup)** 鍒嗚В涓哄叾鐙珛鐨勭収鏄庡垎閲忥紙鍗?Lobes锛夈€傛偍鐜板湪鍙互涓烘瘡涓伅鍏夌粍杈撳嚭鍗曠嫭鐨?*婕弽灏?(diffuse)**銆?*鍏夋辰 (glossy)**銆?*閫忓皠 (transmission)** 鍜?*浣撶Н (volume)** 閫氶亾锛屽苟杩涗竴姝ュ垎绂?*鐩存帴鍏?(direct)** 鍜?*闂存帴鍏?(indirect)**锛岃€屼笉鏄粎浠呰幏寰椾竴涓悎骞剁殑鐏厜缁勯€氶亾銆?

杩欎娇寰楃伅鍏夎壓鏈鍜屽悎鎴愬笀鍦ㄥ崟鐙殑鐏厜璁剧疆涓婅兘澶熸嫢鏈変笌 Blender 鍏ㄥ眬閫氶亾鍚岀瓑姘村钩鐨勬帶鍒跺姏銆?

## 涓轰粈涔堜娇鐢ㄥ畠锛?

- **绮剧粏閲嶆墦鍏?* 鈥?鍦ㄥ悎鎴愪腑鎸夊垎閲忕被鍨嬭皟鏁村悇涓伅鍏夌粍鐨勭収鏄庤础鐚紝鑰屼笉浠呬粎鏄暣浣撳己搴︺€?
- **閫愮伅鍏夌粍鍒嗚В** 鈥?鐙珛鍦扮簿纭煡鐪嬫瘡涓伅鍏夌粍濡備綍瀵规极鍙嶅皠銆佸厜娉姐€侀€忓皠鍜屼綋绉仛鍑鸿础鐚€?
- **鑱氬悎骞宠　** 鈥?鎵€鏈夐€愮伅鍏夌粍鍒嗛噺閫氶亾鐨勬€诲拰鍙畬缇庤繕鍘熼噸寤哄洖鍚堝苟鐨?Beauty 閫氶亾锛屽疄鐜伴珮搴﹀彲闈犵殑鍚堟垚寰€杩斻€?
- **鐢熶骇楠岃瘉** 鈥?宸插湪鐪熷疄鐢熶骇鍦烘櫙涓紝瀵瑰尯鍩熷厜 (Area)銆佺偣鍏?(Point)銆佽仛鍏夌伅 (Spot) 鍜屾棩鍏?(Sun) 绛夌伅鍏夌被鍨嬭繘琛屼簡鍏ㄩ潰楠岃瘉銆?

## 濡備綍鍚敤锛?

1. 鎵撳紑 **灞炴€ч潰鏉?> 瑙嗗浘灞傚睘鎬?> 閫氶亾 > 鐏厜 (Properties > View Layer Properties > Passes > Light)**銆?
2. 鍍忓線甯镐竴鏍峰垱寤烘偍鐨勭伅鍏夌粍銆?
3. 鍕鹃€?**Light Pass AOVs** 鍚敤閫愮伅鍏夌粍鍒嗛噺閫氶亾杈撳嚭銆?
4. 閫夋嫨鎮ㄩ渶瑕佺殑鍒嗛噺缁勪欢 (Lobes)锛?
   - **Diffuse** 婕弽灏?(Direct 鐩存帴 / Indirect 闂存帴)
   - **Glossy** 鍏夋辰 (Direct 鐩存帴 / Indirect 闂存帴)
   - **Transmission** 閫忓皠 (Direct 鐩存帴 / Indirect 闂存帴)
   - **Volume** 浣撶Н (Direct 鐩存帴 / Indirect 闂存帴)

## 杈撳嚭鍛藉悕瑙勫垯

姣忎釜鐏厜缁勫垎閲忛€氶亾閬靛惊浠ヤ笅鍛藉悕妯″紡锛?

```
<Lobe>_<Direct|Indirect>_<LightgroupName>
```

渚嬪锛屽綋鐏厜缁勫悕涓?`key` 鏃讹細

| 閫氶亾鍚嶇О | 鍐呭 |
| --- | --- |
| `Combined_key` | 鍚堝苟鐏厜缁勯€氶亾 |
| `Diffuse_Direct_key` | 鏉ヨ嚜 `key` 鐏厜鐨勭洿鎺ユ极鍙嶅皠 |
| `Diffuse_Indirect_key` | 鏉ヨ嚜 `key` 鐏厜鐨勯棿鎺ユ极鍙嶅皠 |
| `Glossy_Direct_key` | 鏉ヨ嚜 `key` 鐏厜鐨勭洿鎺ュ厜娉?|
| `Glossy_Indirect_key` | 鏉ヨ嚜 `key` 鐏厜鐨勯棿鎺ュ厜娉?|
| `Transmission_Direct_key` | 鏉ヨ嚜 `key` 鐏厜鐨勭洿鎺ラ€忓皠 |
| `Transmission_Indirect_key` | 鏉ヨ嚜 `key` 鐏厜鐨勯棿鎺ラ€忓皠 |
| `Volume_Direct_key` | 鏉ヨ嚜 `key` 鐏厜鐨勭洿鎺ヤ綋绉?|
| `Volume_Indirect_key` | 鏉ヨ嚜 `key` 鐏厜鐨勯棿鎺ヤ綋绉?|

## 鑱氬悎骞宠　 (Aggregate Balance)

鍒嗛噺閫氶亾鐨勮璁＄‘淇濓細

```
Combined_<lg> 鈮?危 (Lobe_Direct_<lg> + Lobe_Indirect_<lg>)
```

瀵逛簬姣忎釜鐏厜缁勶紝杩欐剰鍛崇潃锛?

- **鑷彂鍏夌綉鏍肩伅鍏夌粍 (Emissive mesh lightgroups)** 鍦ㄨ璁′笂涓轰粎鍚堝苟妯″紡锛堜笉杩涜鍒嗛噺鎷嗗垎锛夈€?
- **鏈夐檺鍏夋簮 (Finite lights)**锛堝尯鍩熷厜銆佺偣鍏夈€佽仛鍏夌伅銆佹棩鍏夛級鍙€氳繃鍏跺垎閲忛€氶亾瀹屽叏閲嶅缓銆?
- **涓栫晫/鐜鐏厜缁?(World/environment lightgroups)** 鍗充娇鍦ㄨ鍥惧眰涓鐢ㄤ簡 `Background pass` 鍜?`Emission pass`锛屼篃鑳芥纭啓鍏ュ垎閲忛€氶亾銆?

## 鍚堟垚鍣ㄤ笌 Nuke 宸ヤ綔娴佺▼

### 鍦?Blender 鍚堟垚鍣ㄤ腑

1. 杩炴帴涓€涓?**娓叉煋鍥惧眰 (Render Layers)** 鑺傜偣銆?
2. 姣忎釜鐏厜缁勫垎閲忛€氶亾閮戒細鏄剧ず涓轰竴涓崟鐙殑杈撳嚭鎻掓Ы銆?
3. 浣跨敤鏍囧噯鍚堟垚鑺傜偣鏉ュ井璋冨拰璋冩暣鍚勪釜鍒嗛噺鐨勭収鏄庤础鐚€?

### 鍦?Nuke 涓?

1. 浣跨敤 `Read` 鑺傜偣瀵煎叆澶氶€氶亾 EXR銆?
2. 姣忎釜鐏厜缁勫垎閲忛€氶亾鍦?EXR 涓樉绀轰负涓€涓崟鐙殑鍥惧眰/閫氶亾銆?
3. 浣跨敤 `Shuffle` 鑺傜偣闅旂骞跺鍚勪釜鍒嗛噺璐＄尞杩涜璋冭壊銆?
4. 灏嗗畠浠眰鍜岀浉鍔狅紝鍗冲彲寰楀埌鏈€缁堥噸鎵撳厜鍚庣殑 Beauty 鐢婚潰銆?

::: tip
涓€涓疄鐢ㄧ殑鍚堟垚妫€鏌ユ柟娉曪細鎵€鏈夌伅鍏夌粍鍒嗛噺閫氶亾锛堝姞涓婅嚜鍙戝厜 `Combined_<lg>` 閫氶亾锛夌殑鎬诲拰搴斾笌鏁翠綋鐨?`rgba` Beauty 閫氶亾鍑犱箮瀹屽叏涓€鑷淬€?
:::

## 宸茬煡闄愬埗

- **鑷彂鍏夌綉鏍?* 鈥?鑷彂鍏夌綉鏍肩伅鍏夌粍淇濇寔浠呭悎骞舵ā寮忥紝涓嶆媶鍒嗕负鐩存帴/闂存帴鍒嗛噺銆傝繖鏄璁′娇鐒躲€?
- **浠绘剰 LPE 璇硶** 鈥?瀹屾暣鐨勪换鎰忓厜閫氳矾琛ㄨ揪寮?(Light Path Expression, LPE) 璇硶鏀寔灞炰簬鏈潵鐨勫伐浣溿€傚綋鍓嶇殑绯荤粺鎻愪緵浜嗙敓浜т腑鏈€甯哥敤鍜屾渶闇€瑕佺殑鍒嗛噺鎷嗗垎銆?

## 鍙﹁鍙傞槄

- [Pass 涓?AOV 绯荤粺 (API)](/zh/industrial-cg-platform/api/pass-system) 鈥?鍐呴儴 Pass 娉ㄥ唽鍜屽洖璇绘灦鏋勩€?
- [Cycles 鍐呮牳鎵╁睍 (API)](/zh/industrial-cg-platform/api/cycles-kernel) 鈥?鍐呮牳绾х伅鍏夌粍鎷嗗垎绱㈠紩鏁版嵁銆?
- [Blender 鎵嬪唽锛氱伅鍏夌粍](https://docs.blender.org/manual/en/latest/render/layers/passes.html) 鈥?鏍囧噯 Blender 鐏厜缁勬枃妗ｃ€?
