# Blender 鑹插僵绠＄悊閰嶇疆鎵嬪唽

鏈〉闈㈠皢浠嬬粛濡備綍鍦?Blender 涓畨瑁呭拰搴旂敤 **AIO-OCIO** 閰嶇疆鏂囦欢锛屼互瀹炵幇涓庤涓氭帴杞ㄧ殑 sRGB, Display P3, Rec.1886 鏄剧ず杞崲銆?
---

## **瀹夎姝ラ**

Blender 鐨勯粯璁よ壊褰╃鐞嗘満鍒舵槸閫氳繃璇诲彇杞欢鐩綍涓嬬殑 `colormanagement` 鏂囦欢澶规潵瀹炵幇鐨勩€傝鎸夌収浠ヤ笅姝ラ杩涜瑕嗙洊锛?
### 姝ラ 1锛氬畾浣嶆湰鍦?colormanagement 璺緞
鎵惧埌鎮ㄥ綋鍓嶄娇鐢ㄧ殑 Blender 鐗堟湰鐨勬湰鍦扮敤鎴烽厤缃矾寰勶細
*   **Windows 璺緞**锛歚C:\Users\<鎮ㄧ殑鐢ㄦ埛鍚?\AppData\Roaming\Blender Foundation\Blender\<鐗堟湰鍙?\datafiles\colormanagement\`
*   **macOS 璺緞**锛歚/Users/<鎮ㄧ殑鐢ㄦ埛鍚?/Library/Application Support/Blender/<鐗堟湰鍙?/datafiles/colormanagement/`
*   **Linux 璺緞**锛歚~/.config/blender/<鐗堟湰鍙?/datafiles/colormanagement/`

> 馃挕 **鎻愮ず锛?* 濡傛灉浠ヤ笂璺緞涓殑 `datafiles` 鎴?`colormanagement` 鏂囦欢澶逛笉瀛樺湪锛岃鎵嬪姩鏂板缓瀹冧滑銆?
### 姝ラ 2锛氭嫹璐濋厤缃枃浠?灏?AIO-OCIO 鏂囦欢澶瑰唴鐨勬墍鏈夊唴瀹癸紙鍖呭惈 ACES, BMD, ARRI 绛夊瓙鐩綍锛屼互鍙婃墍鏈夌殑 `.ocio` 鏂囦欢鍜?LUTs 璧勬簮锛夌洿鎺ユ嫹璐濆埌涓婅堪鐨?`colormanagement` 鏂囦欢澶逛腑銆?
### 姝ラ 3锛氳缃粯璁ら厤缃枃浠?Blender 鍘熺敓浠呬細璇诲彇鍚嶄负 `config.ocio` 鐨勮壊褰╃鐞嗘弿杩版枃浠讹細
1.  鍦ㄦ嫹璐濊繃鏉ョ殑鏂囦欢涓紝鎵惧埌 `config_CG_Lin709.ocio` 鏂囦欢銆?2.  灏嗗叾閲嶅懡鍚嶄负 **`config.ocio`**锛堢洿鎺ヨ鐩栧凡鏈夌殑鍚屽悕鏂囦欢锛夈€?
---

## **鍦?Blender 涓繘琛岀‘璁?*

1.  鍚姩 Blender锛屾墦寮€鍙充晶鐨?**娓叉煋灞炴€?(Render Properties)** 闈㈡澘銆?2.  鍚戜笅鎷夋壘鍒?**鑹插僵绠＄悊 (Color Management)** 閫夐」鍗″苟灞曞紑銆?3.  姝ゆ椂鎮ㄥ簲褰撹兘鏌ョ湅鍒版柊鐨勬樉绀哄櫒娓叉煋閰嶇疆閫夐」锛堝 sRGB, Display P3, Rec.1886锛夛紝浠ュ強閰嶅瀵归綈鐨勮鍥炬樉绀哄彉鎹㈤€夐」銆?