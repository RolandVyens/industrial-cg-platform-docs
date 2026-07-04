# ViewLayer 绠＄悊鍣?

<Badge type="tip" text="宸插彂甯? />

## 浠€涔堟槸 ViewLayer 绠＄悊鍣紵

ViewLayer 绠＄悊鍣ㄦ槸涓€涓笓鐢ㄧ殑銆佸熀浜?Qt 鐨勫伐鍏风獥鍙ｏ紝鎻愪緵浜嗕竴涓洿瑙備笖鍏ㄩ潰鐨勭晫闈紝鐢ㄤ簬绠＄悊鍦烘櫙 ViewLayer锛堣鍥惧眰锛夈€佹覆鏌撻€氶亾锛圧ender Passes锛夈€丼hader AOV锛堢潃鑹插櫒 AOV锛夈€佺伅鍏夌粍锛圠ightgroups锛変互鍙?Cycles 鐏厜閫氶亾 AOV 鎺у埗鈥斺€斿叏閮ㄩ泦涓湪 Blender 鍘熺敓灞炴€х紪杈戝櫒涔嬪鐨勫崟涓簿绠€闈㈡澘涓€?

瀹冨熀浜?[BQt](https://github.com/techartorg/bqt) 鏋勫缓锛屽苟浣滀负 Blender 绯荤粺鎵╁睍锛圔lender System Extension锛夋崋缁戝彂甯冦€?

## 涓轰粈涔堜娇鐢ㄥ畠锛?

- **闆嗕腑绠＄悊** 鈥?鎵€鏈変笌 ViewLayer 鐩稿叧鐨勮缃兘闆嗕腑鍦ㄤ竴涓獥鍙ｄ腑锛屾棤闇€鍦ㄤ笉鍚岀殑灞炴€ч潰鏉垮拰鑿滃崟椤电涓潵鍥炶烦杞€?
- **棰勮绯荤粺** 鈥?鍙互灏嗛€氶亾閰嶇疆淇濆瓨涓哄懡鍚嶉璁撅紝骞朵竴娆℃€у簲鐢ㄥ埌澶氫釜涓嶅悓鐨?ViewLayer 涓€?
- **鎵归噺鎿嶄綔** 鈥?鏀寔鍦ㄥ乏渚у垪琛ㄤ腑澶氶€?ViewLayer锛屽苟鍚屾椂瀵瑰叾鎵归噺搴旂敤棰勮銆?
- **鏈夌粍缁囩殑閫氶亾鏄剧ず** 鈥?閫氶亾琚竻鏅板湴褰掔被涓洪€昏緫绫诲埆锛氭暟鎹?(Data)銆佺伅鍏?(Light)銆佺潃鑹插櫒 (Shader) 浠ュ強鏁堟灉涓庡叕鐢ㄥ伐鍏?(Effects / Utility)銆?
- **澶氳瑷€ UI** 鈥?绠＄悊鍣ㄧ晫闈㈡湰韬敮鎸佺畝浣撲腑鏂囥€佺箒浣撲腑鏂囧拰娉曡鐨勬湰鍦板寲缈昏瘧銆?

## 濡備綍鍚姩锛?

1. 瑙傚療 Blender 鐣岄潰鍙充笂瑙掓爣棰樻爮锛屽湪鍘熺敓鐨?`ViewLayer` 閫夋嫨鍣ㄦ梺杈广€?
2. 鐐瑰嚮 **ViewLayer Manager** 鍥炬爣鎸夐挳銆?
3. 绠＄悊鍣ㄥ皢浣滀负鐙珛鐨勯《绾?Qt 绐楀彛鎵撳紑銆?

::: info
棣栨鐐瑰嚮鏃讹紝鎹嗙粦鐨?BQt 杩愯鏃舵墿灞曚細鍦ㄥ綋鍓嶄細璇濅腑鑷姩鍚敤銆傛偍鏃犻渶鎵嬪姩鍓嶅線鍋忓ソ璁剧疆鍚敤浠讳綍鎵╁睍銆?
:::

## 绠＄悊鍣ㄧ獥鍙ｅ竷灞€

### 宸︿晶闈㈡澘 鈥?ViewLayer 鍒楄〃

- 鍒楀嚭褰撳墠鍦烘櫙涓殑鎵€鏈?ViewLayer銆?
- 閫愯鎻愪緵鐩磋鐨?**鐢ㄤ簬娓叉煋 (Use For Rendering)** 鐘舵€佸紑鍏炽€?
- 鎻愪緵 **涓婄Щ (Up)** / **涓嬬Щ (Down)** 鎸夐挳锛屽彲鐩存帴閲嶆帓 ViewLayer 鐨勬覆鏌撻『搴忋€?
- 鏀寔澶氶€夛紙Ctrl 鎴?Shift锛夛紝浠ヤ究鎵归噺搴旂敤閫氶亾棰勮銆?
- 鏀寔鐩存帴鏂板缓銆侀噸鍛藉悕鍜屽垹闄?ViewLayer銆?

### 鍙充晶闈㈡澘 鈥?璇︾粏绐楁牸

缂栬緫褰撳墠閫変腑鐨?ViewLayer 灞炴€э紝鍖呭惈浠ヤ笅閮ㄥ垎锛?

#### 閫氶亾 (Passes)

鎸?Blender 鍘熺敓閫昏緫杩涜鍒嗙粍锛?

| 鍒嗙粍 | 鍖呭惈鍐呭 |
| --- | --- |
| **鏁版嵁 (Data)** | 缁煎悎 (Combined), 娣卞害 (Z), 杩烽浘 (Mist), 娉曠嚎 (Normal), 浣嶇疆 (Position), 閫熷害鐭㈤噺 (Vector), UV, 鐗╀綋绱㈠紩 (Object Index), 鏉愯川绱㈠紩 (Material Index) 绛?|
| **鐏厜 (Light)** | 婕弽灏?(Diffuse Direct/Indirect/Color), 鍏夋辰 (Glossy), 閫忓皠 (Transmission), 浣撶Н (Volume), 鑷彂鍏?(Emission), 鐜鑳屾櫙 (Background), 闃村奖 (Shadow), 鐜鍏夐伄钄?(Ambient Occlusion) |
| **鐫€鑹插櫒 (Shader)** | 鑷畾涔?Shader AOV 鍒楄〃椤?|
| **鏁堟灉/瀹炵敤宸ュ叿 (Effects / Utility)** | 闄嶅櫔鏁版嵁 (Denoising Data), 閲囨牱鏁?(Sample Count) |

#### Cryptomatte

閽堝 Cryptomatte 閫氶亾璁剧疆鐨勪笓鐢ㄧ鐞嗗尯鍩燂紙鍚屾椂閫傜敤浜?Eevee 鍜?Cycles 娓叉煋寮曟搸锛夈€?

#### 娣卞害 (Deep)

ViewLayer 绾у埆鐨?Deep EXR 娣卞害杈撳嚭寮€鍏筹紙鐢变簬杞欢鍚庣瑕佹眰锛屾鏍囩鐗规剰淇濇寔绾嫳鏂囨樉绀猴級銆?

#### 鐫€鑹插櫒 AOV (Shader AOV)

鐢ㄤ簬娣诲姞鍜岀鐞嗚嚜瀹氫箟鐫€鑹插櫒 AOV锛圫hader AOV锛夊疄浣撶殑鍗曞垪鍒楄〃銆?

#### 鐏厜缁?(Light Groups)

绠＄悊鍜屽垎閰嶇粰褰撳墠 ViewLayer 鐨勭伅鍏夌粍銆?

#### Cycles 鐏厜閫氶亾 AOV (Cycles Light Pass AOVs)

鍚敤骞堕厤缃€愮伅鍏夌粍鍒嗛噺閫氶亾鐨勮緭鍑猴細
- Diffuse 婕弽灏?(Direct 鐩存帴 / Indirect 闂存帴)
- Glossy 鍏夋辰 (Direct 鐩存帴 / Indirect 闂存帴)
- Transmission 閫忓皠 (Direct 鐩存帴 / Indirect 闂存帴)
- Volume 浣撶Н (Direct 鐩存帴 / Indirect 闂存帴)

### 棰勮宸ュ叿鏍?

- **淇濆瓨 (Save)** 鈥?灏嗗綋鍓?ViewLayer 鐨勯€氶亾璁剧疆鍙﹀瓨涓轰竴涓懡鍚嶇殑棰勮銆?
- **鏇存柊 (Update)** 鈥?浣跨敤褰撳墠璁剧疆瑕嗙洊鍜屾洿鏂扮幇鏈夐璁俱€?
- **搴旂敤 (Apply)** 鈥?灏嗛€変腑鐨勯璁炬壒閲忓簲鐢ㄥ埌宸︿晶鍒楄〃涓墍鏈夐€変腑鐨?ViewLayer銆?
- **鍒犻櫎 (Delete)** 鈥?绉婚櫎鐜版湁棰勮銆?

棰勮浠?JSON 鏂囦欢鐨勫舰寮忓畨鍏ㄥ瓨鍌ㄥ湪鐢ㄦ埛鐨勬湰鍦?Blender 鎵╁睍璧勬簮鐩綍涓€?

## 娓叉煋寮曟搸鑷€傚簲鍙鎬?

绠＄悊鍣ㄤ細鑷姩璇嗗埆褰撳墠鍚敤鐨勬覆鏌撳紩鎿庯紝骞舵櫤鑳芥樉绀?闅愯棌鐩稿叧鐨勯厤缃尯鍩燂細

| 鍖哄煙 | CYCLES 寮曟搸 | EEVEE 寮曟搸 |
| --- | --- | --- |
| Eevee Passes | 鉂?| 鉁?|
| Cycles Passes | 鉁?| 鉂?|
| 鐏厜缁?(Light Groups) | 鉁?| 鉂?|
| Cycles Light Pass AOVs | 鉁?| 鉂?|
| 鐫€鑹插櫒 AOV (Shader AOV) | 鉁?| 鉁?|

## 瀹炴椂鍐欏洖 (Live Write-Back)

鍦ㄧ鐞嗗櫒涓墍鍋氱殑涓€鍒囧睘鎬т慨鏀归兘浼?*绔嬪嵆**琚啓鍥?Blender 涓?鈥?姝ｅ父缂栬緫灞炴€ф椂涓嶉渶瑕佺偣鍑婚澶栫殑鈥滃簲鐢ㄢ€濇垨鈥滄墜鍔ㄥ埛鏂扳€濇寜閽€傜鐞嗗櫒鍦ㄦ樉绀哄強閲嶆柊鑾峰緱鎿嶄綔绯荤粺鐒︾偣鏃讹紝閮戒細鑷姩涓?Blender 杩涜閲嶆柊鍚屾銆?

## 宸茬煡琛屼负

- 绠＄悊鍣ㄤ綔涓虹嫭绔嬬殑椤剁骇 Qt 绐楀彛杩愯锛堜笉宓屽叆 Blender Native 绐楀彛涓級銆?
- BQt 杩愯鏃跺湪鏌愪簺鎯呭喌涓嬪彲鑳戒細杈撳嚭 `failed to get blender hwnd, creating new window` 鏃ュ織 鈥?杩欏睘浜庡畨鍏ㄦā寮忚矾寰勪笅鐨勬甯歌涓猴紝骞堕潪鍚姩澶辫触锛屼篃涓嶄細褰卞搷浠讳綍鍔熻兘鐨勪娇鐢ㄣ€?
- 褰撳墠鐗堟湰浠呮敮鎸?Windows 骞冲彴锛孡inux 鏀寔姝ｅ湪寮€鍙戣鍒掍腑銆?

## 鍙﹁鍙傞槄

- [Python 鎿嶄綔鍣?(API)](/zh/industrial-cg-platform/api/python-operators) 鈥?`wm.blender_vfx_viewlayer_manager_show` 鎿嶄綔鍣ㄥ弬鑰冦€?
- [鐏厜缁勫垎閲忛€氶亾](/zh/industrial-cg-platform/features/lightgroup-lobe-passes) 鈥?鐢辩鐞嗗櫒鐨?Cycles Light Pass AOVs 鍖哄煙鎺у埗鐨勫垎閲忛€氶亾銆?
- [Blender 鎵嬪唽锛氳鍥惧眰](https://docs.blender.org/manual/en/latest/render/layers/view_layer.html) 鈥?鏍囧噯 Blender 瑙嗗浘灞傛枃妗ｃ€?
