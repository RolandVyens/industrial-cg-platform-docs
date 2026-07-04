# AIO-OCIO

**AIO-OCIO** 鏄竴涓粺涓€鐨勩€佸鍚堜竴鐨?OpenColorIO (OCIO) 鑹插僵绠＄悊閰嶇疆鏂囦欢锛屼笓涓虹幇浠ｈ法杞欢 VFX 鍜?CG 鍒朵綔绠＄嚎浼樺寲銆?
閫氳繃缁熶竴涓绘祦鏁板瓧鍐呭鍒涗綔 (DCC) 宸ュ叿鐨勮壊褰╃┖闂磋浆鎹紝瀹冭兘澶熺‘淇濇偍鐨勬覆鏌撳浘銆佽创鍥炬姇褰卞拰鍚堟垚鍏冪礌鍦?Blender銆丄utodesk Maya銆丼ideFX Houdini 鎴?Foundry Nuke 涓湅璧锋潵 100% 淇濇寔涓€鑷淬€?
---

## 鏍稿績鍔熻兘

### 馃帹 璺ㄨ蒋浠惰壊褰╀竴鑷存€?*   **缁熶竴鐨勮鍥惧彉鎹?(View Transforms)**锛氬湪 Nuke銆丮aya銆丠oudini 鍜?Blender 涓娇鐢ㄥ畬鍏ㄧ浉鍚岀殑 AgX銆丗ilmic 鎴?ACES 娓叉煋鍙樻崲銆?*   **AgX Punchy 璺ㄨ蒋浠舵敮鎸?*锛氬皢 Blender 涓箍鍙楁杩庣殑 鈥淎gX Punchy鈥?鍜?鈥淎gX Look鈥?鑹插僵绌洪棿鐩存帴绉绘鍒?Maya銆丠oudini 绛夊叾浠?DCC 杞欢涓€?
### 馃幀 涓撲笟鐢靛奖绾ц壊褰╃┖闂?*   **鍧氬疄鍩虹锛?* 鍩轰簬 Genco Uney 钁楀悕鐨?*PixelManager OCIO* 鑹插僵閰嶇疆杩涜浜屾浼樺寲銆?*   **鏀寔鐨勬樉绀鸿澶囷細** 瀹岀編閫傞厤琛屼笟鏍囧噯鏄剧ず鑹插煙锛屽寘鎷?**sRGB**銆?*Display P3** 浠ュ強 **Rec.1886**銆?*   **ACES 瀹借壊鍩燂細** 鍏ㄩ潰鏀寔鐜颁唬瀹借壊鍩熷拰鍦烘櫙绾挎€ч厤缃枃浠讹紙ACEScg銆丄CES2065-1銆丷ec.2020銆乻RGB Linear锛夈€?*   **涓撲笟鎽勫儚鏈烘洸绾匡細** 鍐呯疆涓绘祦鐢靛奖鎽勫儚鏈烘洸绾匡紙Arri LogC3/LogC4銆丷ED Log3G10銆丼ony S-Log3锛夛紝渚夸簬鏃犵紳鎷煎悎瀹炴媿绱犳潗銆?
---

## 閰嶇疆涓庨泦鎴愭寚鍗?
### 鍓嶆彁鏉′欢
*   鎮ㄤ娇鐢ㄧ殑 CG 杞欢鎴?DCC 宸ュ叿蹇呴』鏀寔 **OCIO 2.0** 鎴栨洿楂樼増鏈€?
### 鍦?Blender 涓厤缃?1.  浠庡紑婧愪粨搴撲笅杞芥渶鏂扮殑鑹插僵閰嶇疆鏂囦欢銆?2.  鍓嶅線鎮ㄧ殑 Blender 瀹夎鐩綍涓嬬殑鑹插僵绠＄悊鏂囦欢澶癸紙渚嬪 `5.2/colormanagement/`锛夈€?3.  鏇挎崲榛樿鐨?`config.ocio` 鏂囦欢鍙婃暟鎹枃浠跺す锛屾垨鑰呯洿鎺ヨ缃郴缁熺幆澧冨彉閲忥細
    ```bash
    OCIO=/path/to/AIO-OCIO/config.ocio
    ```

### 鍦?Maya 涓厤缃?1.  鎵撳紑 Maya锛屽墠寰€ `绐楀彛 (Windows)` > `璁剧疆/鍋忓ソ璁剧疆 (Settings/Preferences)` > `鍋忓ソ璁剧疆 (Preferences)`銆?2.  鍦?`鑹插僵绠＄悊 (Color Management)` 閫夐」鍗′腑锛屽惎鐢ㄨ壊褰╃鐞嗗苟閫夋嫨 **浣跨敤 OCIO 閰嶇疆 (Use OCIO Configuration)**銆?3.  灏嗚矾寰勬寚鍚戜笅杞界殑 `config.ocio` 鏂囦欢銆?
### 鍦?Nuke 涓厤缃?1.  鎵撳紑 Nuke锛屾寜涓嬪揩鎹烽敭 `S` 鎵撳紑椤圭洰璁剧疆锛圥roject Settings锛夈€?2.  鍦?`鑹插僵 (Color)` 閫夐」鍗′笅锛屽皢鑹插僵绠＄悊锛圕olor Management锛変粠 `Nuke` 鍒囨崲涓?`OCIO`銆?3.  灏?OCIO Config 璁句负 `custom`锛屽苟灏嗚矾寰勬寚鍚?`config.ocio` 鏂囦欢銆?
---

## 寮€婧愪粨搴撲笌閾炬帴

*   **GitHub 浠撳簱**锛歔RolandVyens/AIO-OCIO](https://github.com/RolandVyens/AIO-OCIO)
