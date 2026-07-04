# Python 鎿嶄綔鍣?

鏈〉璁板綍浜?Industrial CG Platform 娣诲姞鍒?Blender 鐨?Python 鎿嶄綔鍣ㄥ拰鍏变韩 Qt 杩愯鏃?API銆?

## Blender 鎿嶄綔鍣?

### `wm.blender_vfx_viewlayer_manager_show`

| 灞炴€?| 鍊?|
| --- | --- |
| **鎿嶄綔鍣?ID** | `wm.blender_vfx_viewlayer_manager_show` |
| **鏍囩** | `ViewLayer Manager` |
| **鎻忚堪** | 鎵撳紑鎴栧皢 ViewLayer 绠＄悊鍣ㄧ獥鍙ｇ疆浜庢渶鍓?|

姝ゆ搷浣滃櫒锛?
1. 涓哄綋鍓嶄細璇濆惎鐢?`blender_vfx_qt_runtime` 绯荤粺鎵╁睍銆?
2. 涓哄綋鍓嶄細璇濆惎鐢?`blender_vfx_viewlayer_manager` 绯荤粺鎵╁睍銆?
3. 鎵撳紑 ViewLayer 绠＄悊鍣?Qt 绐楀彛锛屽鏋滃凡鎵撳紑鍒欏皢鍏剁疆浜庢渶鍓嶃€?

## 鍏变韩 Qt 杩愯鏃?API

浣嶄簬 `scripts/modules/blender_vfx_qt` 鐨勫叡浜?Qt 杩愯鏃跺寘瑁呭櫒妯″潡鎻愪緵浠ヤ笅鍏叡 API锛?

### `blender_vfx_qt.ensure_runtime()`

纭繚褰撳墠浼氳瘽鍙娇鐢?BQt Qt 杩愯鏃躲€?

### `blender_vfx_qt.present_window(widget)`

鏄剧ず骞跺敜璧?Qt 绐楀彛锛屼娇鍏剁疆浜庢渶鍓嶅苟鑾峰彇閿洏/榧犳爣鐒︾偣銆?

```python
from blender_vfx_qt import present_window

# widget 鏄竴涓凡瀹炰緥鍖栫殑 QWidget 瀵硅薄
present_window(my_window_instance)
```

**鍙傛暟锛?*
- `widget` 鈥?瑕佹樉绀虹殑 `QWidget` 瀹炰緥銆?

**琛屼负锛?*
- 璋冪敤璇ユ帶浠剁殑 `.show()`銆?
- 璋冪敤璇ユ帶浠剁殑 `.raise_()` 浠ョ‘淇濈獥鍙ｇЩ鑷虫渶鍓嶇銆?
- 璋冪敤 `.activateWindow()` 浠ュ己鍒舵崟鑾锋搷浣滅郴缁熺殑閿洏涓庨紶鏍囩劍鐐广€?
- 杩斿洖绐楀彛瀹炰緥瀵硅薄銆?

### `blender_vfx_qt.show_unique_window(cache_ref, factory)`

浣跨敤瀛楀吀缂撳瓨涓庡伐鍘傚嚱鏁板垱寤烘垨鏄剧ず鍗曚緥 Qt 绐楀彛锛屼互纭繚鍦?Blender 杩愯浼氳瘽涓彧鏈変竴涓獥鍙ｅ疄渚嬪浜庢椿鍔ㄧ姸鎬併€?

```python
from blender_vfx_qt import show_unique_window
from blender_vfx_viewlayer_manager.window import ViewLayerManagerWindow

# 瀹氫箟涓€涓寔涔呭寲鐨勫瓧鍏哥紦瀛樺紩鐢?
_window_cache = {"value": None}

def factory():
    window = ViewLayerManagerWindow()
    return window

show_unique_window(_window_cache, factory)
```

**鍙傛暟锛?*
- `cache_ref` 鈥?鐢ㄤ簬缂撳瓨娲诲姩绐楀彛寮曠敤鐨勫瓧鍏革紙褰㈠ `{"value": None}`锛夈€?
- `factory` 鈥?涓€涓笉鎺ュ彈鍙傛暟鐨勫彲璋冪敤瀵硅薄锛堝鍑芥暟鎴?lambda锛夛紝鎵ц鏃惰繑鍥炰竴涓柊瀹炰緥鍖栫殑 `QWidget` 瀛愮被瀵硅薄銆?

**琛屼负锛?*
- 妫€鏌ョ紦瀛樹腑鐨勭獥鍙ｆ槸鍚﹀瓨鍦ㄥ苟涓斾粛澶勪簬娲诲姩鐘舵€侊紙閫氳繃 `qt_window_is_alive(widget)`锛夈€?
- 鑻ョ獥鍙ｄ粛澶勪簬娲诲姩鐘舵€侊紝鐩存帴瀵硅缂撳瓨瀹炰緥璋冪敤 `present_window()` 灏嗗叾缃簬鏈€鍓嶃€?
- 鑻ョ獥鍙ｄ笉瀛樺湪鎴栧凡琚攢姣侊紝鎵ц浼犲叆鐨?`factory` 宸ュ巶鍑芥暟鍒涘缓鏂扮獥鍙ｏ紝灏嗗叾寮曠敤瀛樺叆 `cache_ref["value"]` 涓紝骞惰皟鐢?`present_window()` 杩涜娓叉煋灞曠ず銆?
- 杩斿洖鏄剧ず鐨勭獥鍙ｅ疄渚嬪璞°€?

### `blender_vfx_qt.qt_window_is_alive(widget)`

妫€鏌ヤ竴涓?Qt 绐楀彛瀹炰緥褰撳墠鏄惁宸插疄渚嬪寲锛屼笖鍦?C++ 灞傞潰娌℃湁琚攢姣佹垨鍨冨溇鍥炴敹銆?

```python
from blender_vfx_qt import qt_window_is_alive

if qt_window_is_alive(my_window):
    print("绐楀彛澶勪簬娲诲姩鐘舵€佷笖姝ｅ父娓叉煋锛?)
```

**鍙傛暟锛?*
- `widget` 鈥?`QWidget` 瀹炰緥锛堟垨 `None`锛夈€?

**琛屼负锛?*
- 鑻?`widget` 涓?`None` 鍒欒繑鍥?`False`銆?
- 灏濊瘯璁块棶璇ユ帶浠剁殑 `objectName()`銆?
- 鎹曡幏 PySide/PyQt 鍦ㄤ氦浜掑凡琚攢姣佺殑搴曞眰 C++ 瀵硅薄鏃舵姏鍑虹殑 `RuntimeError`锛岃嫢鎹曡幏鍒板垯杩斿洖 `False`銆?
- 鑻ョ獥鍙ｅ浜庡瓨娲荤姸鎬佸垯杩斿洖 `True`銆?
