# 閫氱敤杞欢鑹插僵绠＄悊閰嶇疆

鏈〉闈粙缁嶅浣曞皢 **AIO-OCIO** 棰勫埗鐨勮壊褰╅厤缃枃浠舵暣鍚堝埌 Autodesk Maya銆丗oundry Nuke銆丼ideFX Houdini 绛変富娴?DCC 鍒涗綔杞欢涓€?
---

## **棰勫埗閰嶇疆鏂囦欢锛堥厤鏂癸級**

AIO-OCIO 閽堝涓嶅悓鐨勮蒋浠惰鑹插拰娴佺▼鎻愪緵浜嗗洓涓笉鍚岀殑 `.ocio` 閰嶇疆鏂囦欢锛?
| **閰嶇疆鏂囦欢** | **鎺ㄨ崘杞欢/鐢ㄩ€?* | **鑹插僵娴佸悜璇存槑** |
| :--- | :--- | :--- |
| `config_CG_ACEScg.ocio` | Maya, Houdini 绛変笁缁磋蒋浠?| 閫傜敤浜庡師鐢熶互 ACEScg 浣滀负娓叉煋宸ヤ綔鑹插僵绌洪棿鐨勯€氱敤 CG 鍒朵綔鐜銆?|
| `config_COMP_ACEScg.ocio` | Nuke, Fusion 绛夊悎鎴愯蒋浠?| 涓撲负鍚堟垚闃舵杩涜浜嗚皟鍏変紭鍖栫殑 ACEScg 宸ヤ綔娴侀厤缃€?|
| `config_CG_Lin709.ocio` | Blender 绛変笁缁磋蒋浠?| 涓撲负宸ヤ綔绌洪棿涓?Linear Rec709 鐨?Blender 娣卞害瀵归綈娴佺▼閲忚韩瀹氬埗銆?|
| `config_COMP_Lin709.ocio` | Nuke, Fusion 绛夊悎鎴愯蒋浠?| 閫傜敤浜庡悗鏈熷悎鎴愮嚎鎬?Rec709 娓叉煋鍥剧殑宸ヤ綔娴侊紙涓昏鐢ㄤ簬閰嶅悎 Blender 娓叉煋绠＄嚎锛夈€?|

---

## **閰嶇疆鏂瑰紡**

### **鏂规硶涓€锛氶厤缃叏灞€绯荤粺鐜鍙橀噺锛堟帹鑽愶級**
杩欐槸鏈€鎺ㄨ崘鐨勯厤缃柟寮忥紝鍙互涓€閿负绯荤粺涓畨瑁呯殑鎵€鏈夋敮鎸?OCIO 鐨?CG 鍜屽悎鎴愬伐鍏峰簲鐢ㄧ粺涓€鐨勮壊褰╅厤缃細

1.  鎵撳紑鎮ㄦ搷浣滅郴缁熺殑 **绯荤粺鐜鍙橀噺** 璁剧疆绐楀彛銆?2.  鏂板缓涓€涓郴缁熷彉閲忥細
    *   **鍙橀噺鍚?*锛歚OCIO`
    *   **鍙橀噺鍊?*锛氭偍閫夋嫨鐨?`.ocio` 閰嶇疆鏂囦欢鐨勭粷瀵硅矾寰勶紙渚嬪锛歚C:\color_management\AIO-OCIO\config_CG_ACEScg.ocio`锛夈€?3.  淇濆瓨骞堕噸鏂板惎鍔ㄦ偍鐨勪笁缁?鍚堟垚杞欢鍗冲彲鑷姩缁ф壙璇ヨ壊褰╃┖闂淬€?
### **鏂规硶浜岋細鍦ㄥ悇杞欢鍐呴儴鎵嬪姩鎸囧畾**

*   **Autodesk Maya**锛氬墠寰€ `Preferences` > `Color Management` > 鍕鹃€?`Use OCIO Configuration` 骞舵寚瀹?`.ocio` 鏂囦欢璺緞銆?*   **Foundry Nuke**锛氬湪椤圭洰璁剧疆绐楀彛锛堟寜 `S` 閿級涓紝鍓嶅線 `Color` 閫夐」鍗★紝灏?`color management` 鏇存敼涓?`OCIO`锛屽苟鍦?`OCIO config` 涓～鍏ユ枃浠惰矾寰勩€?*   **SideFX Houdini**锛氶€氳繃椤堕儴 `Edit` > `Color Settings` > `OCIO` 涓寚瀹氶厤缃€?