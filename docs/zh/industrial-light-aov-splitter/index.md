# Industrial Light AOV Splitter

**Industrial Light AOV Splitter** 鏄竴涓笓涓?Blender 鎵撻€犵殑楂樼骇娴佺▼杈呭姪鎻掍欢锛岀敤浜庤嚜鍔ㄩ厤缃€佸垎绂诲拰鏉愯川鍖栫伅鍏夌粍锛圠ight Group锛夌殑鍗曚釜 AOV锛堣嚜瀹氫箟杈撳嚭閫氶亾锛夐€氶亾銆?
鐩告瘮浜庡鍑哄父瑙勭殑鍚堝苟鐏厜缁勶紝璇ュ伐鍏疯兘澶熻嚜鍔ㄥ皢鍚勪釜鐏厜缁勬媶鍒嗕负鍩虹鐨勭潃鑹插垎閲忛€氶亾锛堝寘鎷細**婕弽灏?diffuse銆侀珮鍏?specular銆侀€忓皠 transmission 鍜屼綋绉?volume**锛屼緥濡傦細`diffuse_env`, `specular_env`锛夛紝涓哄悗鏈熷悎鎴愬笀鎻愪緵鏋佷匠鐨勭伅鍏夐噸缁勪笌閲嶆墦鍏夋帶鍒躲€?
---

## 鏍稿績鍔熻兘

### 馃挕 鑷姩鐏厜缁勬媶鍒?*   **涓€閿紡鎷嗗垎**锛氳嚜鍔ㄥ皢 Blender 涓縺娲荤殑鐏厜缁勶紙Light Groups锛夋媶鍒嗕负璇﹀敖鐨勫垎閲忛€氶亾銆?*   **鍒嗛噺绾х粏鍒?*锛氫负姣忎釜鐏厜缁勬彁鍙栧苟杈撳嚭婕弽灏勶紙diffuse锛夈€侀珮鍏夛紙specular锛夈€侀€忓皠锛坱ransmission锛夊拰浣撶Н锛坴olume锛夊垎閲忋€?*   **Nuke 瀹岀編鍏煎**锛氳緭鍑哄懡鍚嶅拰閫氶亾鏍煎紡瀹屽叏瀵归綈 Nuke銆丗lame 鎴?Fusion锛屾柟渚垮悗鏈熷揩閫熸嫾鍚?Beauty銆?
### 馃攲 AOV Connector 娣卞害鍗忓悓
*   鍙笌 **Industrial AOV Connector** 鎻掍欢鏃犵紳鍗忓悓锛岃嚜鍔ㄥ皢鎷嗗垎鍑虹殑鐏厜鍒嗛噺鍐欏叆澶氶€氶亾 EXR 鏂囦欢涓€?*   鎻愪緵閰嶅鐨?Nuke 鑷姩鍚堟垚鑴氭湰 `nuke_blender_autoaov.py`锛堜綅浜?GitHub 浠撳簱涓級锛屽彲涓€閿湪 Nuke 涓嚜鍔ㄩ噸缁勬媶鍒嗗嚭鐨勭伅鍏夐€氶亾銆?
---

## 鍒朵綔娴佺▼涓庡懡鍚嶈鑼?
涓轰簡纭繚鎷嗗垎宸ュ叿鑳藉姝ｇ‘璇嗗埆鍜屽伐浣滐紝璇峰姟蹇呴伒瀹堜互涓嬭鑼冿細
1.  **瑙嗗浘灞傜骇鎿嶄綔**锛氳宸ュ叿瀹屽叏鍩轰簬 **瑙嗗浘灞?(View Layer)** 绾у埆杩涜杩愪綔銆?2.  **闆嗗悎鍛藉悕瑙勮寖**锛氶渶瑕佹媶鍒嗛€氶亾鐨勭伅鍏夊繀椤绘斁缃湪浠?**`lgt_`** 浣滀负鍓嶇紑鐨勯泦鍚堜腑锛堜緥濡傦細`lgt_character`, `lgt_background`锛夈€?3.  **鐏厜鍛藉悕瑙勮寖**锛氱伅鍏夋湰韬殑鍛藉悕搴斿綋**浠呬娇鐢ㄨ嫳鏂囧瓧姣嶄笌鏁板瓧**锛堝崐瑙掑瓧绗︼級銆傝**涓嶈**鍦ㄧ伅鍏夊懡鍚嶄腑浣跨敤涓嬪垝绾?(`_`)銆?4.  **澶嶅埗鐏厜澶勭悊**锛氭彃浠惰兘鑷姩澶勭悊澶嶅埗鐏厜甯︽潵鐨勯噸鍚嶅悗缂€銆備綘鍙互鐩存帴杩涜澶嶅埗鐢熸垚 `.001` 绛夊悗缂€锛屾彃浠朵細鑷姩蹇界暐璇ュ悗缂€杩樺師鑷冲師鏈殑鍛藉悕杩涜鎷嗗垎銆?
---

## 瀹夎璇存槑

### 鍓嶆彁鏉′欢
*   Blender 4.2 LTS 鎴栨洿楂樼増鏈€?*   **鐢熸€佹帹鑽愶細** 寮虹儓寤鸿涓?**Industrial AOV Connector** 鎻掍欢涓€璧烽厤鍚堜娇鐢紝鍙畬缇庢壙鎺ュ鍑虹殑澶氶€氶亾 EXR 缁撴瀯銆?
### 绂荤嚎瀹夎姝ラ
1.  鍓嶅線 GitHub 浠撳簱涓嬭浇鏈€鏂扮殑 release ZIP 鍖咃細[Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases)銆?2.  鍦?Blender 涓墦寮€ `缂栬緫 (Edit)` > `鍋忓ソ璁剧疆 (Preferences)` > `鎻掍欢 (Add-ons)` > `瀹夎... (Install...)`銆?3.  閫夋嫨涓嬭浇濂界殑 `.zip` 鏂囦欢骞跺嬀閫夊惎鐢ㄣ€?
---

## 寮€婧愪粨搴撲笌閾炬帴

*   **GitHub 浠撳簱**锛歔RolandVyens/Industrial-Light-AOV-Splitter](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter)
*   **闂鍙嶉**锛歔GitHub Issues Tracker](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/issues)
