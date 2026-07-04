# Nuke 鑷姩閫氶亾閲嶇粍閰嶇疆

**Industrial Light AOV Splitter** 閰嶅鎻愪緵浜嗕竴涓緟鍔?Python 鑴氭湰锛岀敤浜庡湪 Foundry Nuke 鍚堟垚杞欢涓嚜鍔ㄥ鎷嗗垎鍑虹殑鐏厜閫氶亾杩涜 Shuffle 閲嶇粍涓庢嫾鍚堛€?
---

## **瀹夎姝ラ**

鎸夌収浠ヤ笅姝ラ灏嗚嚜鍔ㄩ噸缁勮剼鏈泦鎴愬埌鎮ㄧ殑 Nuke 宸ヤ綔鐜涓細

### 姝ラ 1锛氫笅杞借剼鏈枃浠?浠庡畼鏂逛粨搴撶殑 Releases 閮ㄥ垎涓嬭浇鍚嶄负 `nuke_blender_autoaov.py` 鐨?Python 鑴氭湰锛?*   馃憠 [涓嬭浇 nuke_blender_autoaov.py](https://github.com/RolandVyens/Industrial-Light-AOV-Splitter/releases/download/release0.5.0/nuke_blender_autoaov.py)

### 姝ラ 2锛氭嫹璐濊嚦 `.nuke` 鐩綍
灏嗕笅杞藉ソ鐨?`nuke_blender_autoaov.py` 鏂囦欢澶嶅埗鍒版偍鐨勭敤鎴蜂富鐩綍涓嬬殑 `.nuke` 鏂囦欢澶逛腑锛?*   **Windows 璺緞**锛歚C:\Users\<鎮ㄧ殑鐢ㄦ埛鍚?\.nuke\`
*   **macOS / Linux 璺緞**锛歚~/.nuke/`

### 姝ラ 3锛氭敞鍐屽埌 `menu.py`
鍦?`.nuke` 鏂囦欢澶逛腑鎵撳紑鎮ㄧ殑 `menu.py` 鏂囦欢锛堣嫢涓嶅瓨鍦紝璇锋柊寤轰竴涓級锛屽苟鍦ㄦ枃浠舵湯灏剧矘璐翠互涓嬫敞鍐屼唬鐮侊細

```python
import nuke_blender_autoaov
utilitiesMenu = nuke.menu('Nuke').addMenu('Industrial')
utilitiesMenu.addCommand('Nuke Blender AutoAOV', 'nuke_blender_autoaov.shuffle_and_combine_light_groups()')
```

---

## **鍦?Nuke 涓娇鐢?*

1.  鎵撳紑 Nuke 骞跺鍏ユ偍娓叉煋鍑虹殑澶氶€氶亾 EXR 搴忓垪鍥撅紙鍏朵腑搴斿綋鍖呭惈璇稿 `diffuse_rim`, `specular_rim` 绛夋媶鍒嗗ソ鐨勭伅鍏夐€氶亾锛夈€?2.  閫変腑瀵瑰簲鐨?Read 鑺傜偣銆?3.  鐐瑰嚮椤堕儴鑿滃崟鏍忕殑 **`Industrial`** > **`Nuke Blender AutoAOV`**銆?4.  鑴氭湰灏嗚嚜鍔ㄥ湪涓嬫柟鐢熸垚瀹屾暣鐨勮妭鐐瑰垎鏀紝鍒嗘祦鍑烘墍鏈夌殑鐏厜鍒嗛噺閫氶亾锛屽苟灏嗗畠浠噸鏂扮浉鍔犲悎骞朵互瀹岀編閲嶆瀯 Beauty 鏁堟灉銆?