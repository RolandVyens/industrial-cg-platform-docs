# Fake Deep 涓庢繁搴﹀悎鎴?
鏈〉闈㈠皢鍚戞偍浠嬬粛濡備綍浣跨敤 Blender 杈撳嚭鐨?**Fake Deep** 宸ヤ綔娴佹潵瀹炵幇娣卞害鍚堟垚銆?
---

## **浠€涔堟槸娣卞害鍚堟垚锛?*

**娣卞害鍚堟垚锛圖eep Compositing锛?* 鏄瑙夌壒鏁堬紙VFX锛変腑涓€绉嶅厛杩涚殑鍚庢湡鍚堟垚鎶€鏈紝鍏舵覆鏌撳浘灞傚湪姣忎釜鍍忕礌涓婂瓨鍌ㄤ簡澶氫釜娣卞害閲囨牱鐐癸紙鍖呭惈 Z 娣卞害銆侀鑹插拰閫忔槑搴?涓嶉€忔槑搴︽暟鍊硷級銆?
涓庝紶缁熺殑浠呭寘鍚崟涓€ 2D RGBA 鍍忕礌鍊肩殑鈥滃钩闈⑩€濆悎鎴愪笉鍚岋紝娣卞害鍚堟垚鍏佽鎮ㄤ互缁濆鐨勭┖闂寸簿搴︽潵娣峰悎閲嶅彔鐨勫厓绱犮€佺儫闆俱€佺矑瀛愬拰閫忔槑琛ㄩ潰銆傚畠娑堥櫎浜嗘覆鏌撳鏉傜殑閬僵锛圚oldout锛夌殑闇€瑕侊紝鏀寔鍦ㄦ覆鏌撳悗璋冩暣鏅繁锛屽苟鑳藉闈炲父杞绘澗鍦版暣鍚堜綋绉壒鏁堛€?
---

## **浠€涔堟槸 Fake Deep锛?*

Blender 鍘熺敓骞朵笉鏀寔杈撳嚭鍖呭惈澶氬眰娣卞害鍍忕礌鐨?Deep EXR 鏂囦欢銆?*Fake Deep**锛堜吉娣卞害锛夋槸涓€绉嶅皢绮剧‘鐨?Z 娣卞害鏁版嵁鐩存帴鏄犲皠鍒板儚绱犱笂鐨勫伐浣滄祦鏂规硶锛屽畠閫氳繃鑷畾涔夌潃鑹插櫒/鏉愯川鐨勬繁搴﹁鐩栵紙Depth Override锛夛紝鏉ュ尮閰?Beauty 娓叉煋鍥剧殑绮剧‘杈圭紭銆?
### **鍒朵綔闄愬埗涓庤鍒?*
1. **鏃犺繍鍔ㄦā绯婏紙No Motion Blur锛夛細** 甯︽湁鎽勫儚鏈鸿繍鍔ㄦā绯婄殑娓叉煋浼氱牬鍧忓儚绱犺竟缂樼殑娣卞害鍊笺€傛偍搴旇娓叉煋娓呮櫚鐨勮竟缂橈紝骞跺湪鍚庢湡鍚堟垚涓簲鐢ㄥ熀浜庣煝閲忕殑杩愬姩妯＄硦銆?2. **浣撶Н鐗规晥锛圴olumetrics锛夛細** 浣撶Н寰堥毦鐢ㄥ崟灞傜殑 Fake Deep 娣卞害鏁版嵁鏉ヨ〃绀猴紝鍥犱负瀹冧滑闇€瑕佸鏉傜殑娣卞害鑼冨洿淇℃伅銆?3. **鐩镐氦鍑犱綍浣擄紙Intersecting Geometry锛夛細** 濡傛灉涓や釜缃戞牸闈犲緱闈炲父杩戞垨鐩镐氦锛岀敱浜?32 浣嶆繁搴︾簿搴︾殑闄愬埗锛屽垏绾垮彲鑳戒細浜х敓杞诲井鐨勬姈鍔紙鐩告瘮浜庣湡瀹炵殑澶氶噰鏍锋繁搴︽覆鏌擄級銆?
---

## **Nuke 涓殑娣卞害鍚堟垚璁剧疆**

濡傛灉鎮ㄥ杩欎簺闄愬埗鏈夋墍浜嗚В锛屽彲浠ユ寜鐓т互涓嬫楠ゅ湪 Nuke 涓繘琛岃缃細

### 姝ラ 1锛歋huffle锛堥€氶亾閲嶇粍锛塅ake Deep 鍜?Alpha
灏?Fake Deep 閫氶亾鍜?Beauty 鍥剧殑 Alpha 閫氶亾 Shuffle锛堥噸缁勶級鎴愭爣鍑嗙殑 RGBA 缁撴瀯锛?
<img width="600" alt="Nuke Shuffle 鑺傜偣璁剧疆" src="https://github.com/user-attachments/assets/cabc27ab-516c-4aee-b38c-a46d9132cdff" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

鐒跺悗锛屽皢杈撳嚭杩炴帴鍒颁竴涓?**Premult**锛堥涔橈級鑺傜偣浠ユ竻闄よ竟缂樺儚绱犮€?
### 姝ラ 2锛歋huffle 鍥?Depth
灏嗗鐞嗗悗鐨?RGBA 閫氶亾閲嶆柊 Shuffle 鍥?Nuke 鐨?Depth (`depth.Z`) 閫氶亾锛?
<img width="600" alt="Nuke Shuffle Depth 鑺傜偣璁剧疆" src="https://github.com/user-attachments/assets/249b9baa-0936-4c98-b2df-18ed31fc60ed" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 姝ラ 3锛氳浆鎹负 Deep
灏嗚緭鍑鸿繛鎺ュ埌 **DeepFromImage** 鑺傜偣銆傜幇鍦紝鎮ㄥ湪 Nuke 涓氨鎷ユ湁浜嗕竴涓姛鑳藉畬鏁寸殑 Deep 鍥惧眰锛佹偍鍙互鍍忓線甯镐竴鏍蜂娇鐢?`DeepMerge`銆乣DeepRecolor` 鍜?`DeepWrite` 绛夎妭鐐广€?