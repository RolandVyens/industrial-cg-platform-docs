# bQt 闆嗘垚涓庝娇鐢ㄦ寚鍗?

Industrial CG Platform 灏嗗畬鏁寸殑鐢熶骇绾?PyQt/PySide6 杩愯鐜 (**bQt**) 鐩存帴浣滀负绯荤粺鎵╁睍锛圫ystem Extension锛夋墦鍖呭唴缃€傝繖浣垮緱寮€鍙戣€呰兘澶熷湪 Blender 鍐呴儴缂栧啓涓板瘜鐨勫熀浜?Qt 鐨勯珮鎬ц兘 UI 宸ュ叿锛岃€屾棤闇€寮鸿揩鑹烘湳瀹舵墜鍔ㄥ畨瑁?Python 鍖呫€?

鏈寚鍗楄缁嗚鏄庝簡鍦ㄦ Blender 鍒嗘敮锛團ork锛変腑闆嗘垚鐨勫簳灞傛灦鏋勩€佹墦鍖呭竷灞€瑙勫垯銆佺嫭绔嬪畨鍏ㄧ幆澧冮厤缃紝浠ュ強鍐呯疆鐨?**ViewLayer 绠＄悊鍣?* 鎻掍欢涓娇鐢ㄧ殑鍚勭楂樼骇杞欢宸ョ▼璁捐妯″紡銆?

---

## 1. 涓夊眰闆嗘垚鏋舵瀯

涓轰簡淇濇寔浠ｇ爜鐨勫彲缁存姢鎬с€佸彲澶嶇敤鎬т笌瀹夊叏鎬э紝鏈?Blender 鍒嗘敮涓婄殑 BQt 闆嗘垚閲囩敤浜嗕弗鏍肩殑涓夊眰瑙ｈ€︽灦鏋勶細

```mermaid
graph TD
    subgraph Blender 鍐呴儴鐜
        OP[scripts/startup/bl_operators/<br>鍚姩鎿嶄綔鍣ㄥ叆鍙
        SH[scripts/modules/blender_vfx_qt<br>Fork 鍏变韩 Python API 鍖呰灞俔
    end

    subgraph 绯荤粺鎵╁睍 System Extensions
        FE[release/extensions/system/blender_vfx_viewlayer_manager<br>涓氬姟鍔熻兘鎵╁睍 - 绾笟鍔?UI]
        RT[release/extensions/system/blender_vfx_qt_runtime<br>鍏变韩杩愯鏃舵墿灞?- Wheels 涓庡紩瀵奸€昏緫]
    end

    OP -->|1. 鍞よ捣| SH
    SH -->|2. 纭繚鍚敤| RT
    SH -->|3. 鍚姩骞跺睍绀虹獥鍙 FE
    FE -->|4. 澶嶇敤 Qt 杩愯鐜涓庡紩瀵奸€昏緫| RT
```

### 绗竴灞傦細鍏变韩杩愯鏃舵墿灞?(`blender_vfx_qt_runtime`)
* **瀛樻斁璺緞锛?* `release/extensions/system/blender_vfx_qt_runtime`
* **鏍稿績鑱岃矗锛?* 浠呯敤浜庢惡甯︾閲嶇殑棰勭紪璇戜緷璧栧寘锛圥ySide6 鍙婂叾渚濊禆椤?wheels锛夛紝骞跺疄鐜板簳灞傜殑寮曞鍚姩锛圔ootstrap锛夐€昏緫銆傚畠鏆撮湶浜嗘瀬钖勭殑杩愯鏃跺垵濮嬪寲閽╁瓙锛?*涓嶅寘鍚换浣?*鍏蜂綋鐨勪笟鍔℃垨 UI 浠ｇ爜銆?

### 绗簩灞傦細Fork 鍏变韩 Python 鍖呰灞?(`blender_vfx_qt`)
* **瀛樻斁璺緞锛?* `scripts/modules/blender_vfx_qt`
* **鏍稿績鑱岃矗锛?* 瀹冩槸 Fork 鍏ㄥ眬鐨勫父椹诲叕鍏辨ā鍧楋紝璐熻矗鍔ㄦ€佹煡鎵惧苟鍚敤杩愯鏃舵墿灞曘€佹帶鍒?Qt 涓?Blender 鐨勪簨浠跺惊鐜泦鎴愶紝骞舵毚闇茬ǔ瀹氱殑绐楀彛绠＄悊 API锛?
  - `ensure_runtime()`: 鍒濆鍖?Qt 骞跺皢鍏跺畨鍏ㄧ粦瀹氬埌 Blender 绐楀彛銆?
  - `show_unique_window(cache, factory)`: 绠＄悊绐楀彛鍗曚緥鐢熷懡鍛ㄦ湡銆?

### 绗笁灞傦細涓氬姟鍔熻兘鎵╁睍 (渚嬪 `blender_vfx_viewlayer_manager`)
* **瀛樻斁璺緞锛?* `release/extensions/system/blender_vfx_viewlayer_manager`
* **鏍稿績鑱岃矗锛?* 绾补鍏虫敞鑷韩涓氬姟閫昏緫锛圲I 妗嗘灦鏋勫缓銆丷NA 灞炴€у悓姝ャ€侀璁剧鐞嗕互鍙婂璇█缈昏瘧锛夈€傚畠涓嶅寘鍚换浣曠紪璇戝悗鐨?wheel 鏂囦欢锛屼粎閫氳繃璋冪敤绗簩灞?API 鍔ㄦ€佹媺璧?UI 绐楀彛銆?

---

## 2. 鍩轰簬浼氳瘽鐨勫姩鎬佸惎鐢ㄦ満鍒?(Session-Based Enablement)

涓轰簡閬垮厤鍑忔參 Blender 鐨勫紑鏈哄惎鍔ㄩ€熷害锛屾垨鍦ㄧ敤鎴烽厤缃腑鍐欏叆杩囧鎸佷箙璁剧疆锛孊Qt 閲囩敤浜?*鍩轰簬浼氳瘽鐨勫姩鎬佸惎鐢?*璁捐妯″紡锛?

1. 杩愯鏃舵墿灞曞湪鐢ㄦ埛鍋忓ソ璁剧疆锛圥references锛変腑**榛樿涓嶅惎鐢?*銆?
2. 鍦ㄥ惎鍔ㄨ剼鏈腑娉ㄥ唽涓€涓瀬杞婚噺鐨勬ˉ鎺ユ搷浣滃櫒锛圔ridge Operator锛夛細`scripts/startup/bl_operators/blender_vfx_viewlayer_manager.py`銆?
3. 褰撹壓鏈鐐瑰嚮鑿滃崟鏍忔寜閽垨閫氳繃绌烘牸閿悳绱㈠惎鍔ㄥ伐鍏锋椂锛岃鎿嶄綔鍣ㄤ細鍔ㄦ€佽皟鐢?`blender_vfx_qt.ensure_runtime()`锛屼粎鍦?*鏈 Blender 浼氳瘽鐢熷懡鍛ㄦ湡鍐?*鍔ㄦ€佸惎鐢ㄧ郴缁熸墿灞曞苟鎷夎捣绐楀彛锛屼粠鑰屽疄鐜伴浂寮€鏈哄紑閿€銆?

### 妗ユ帴鎿嶄綔鍣ㄦā鏉夸唬鐮侊細
```python
import bpy

class VFX_OT_show_viewlayer_manager(bpy.types.Operator):
    """鍚姩鐙珛鐨?Qt ViewLayer 绠＄悊鍣?""
    bl_idname = "wm.blender_vfx_viewlayer_manager_show"
    bl_label = "ViewLayer Manager"
    
    def execute(self, context):
        # 1. 瀵煎叆 Fork 鍏变韩鍖呰妯″潡
        from blender_vfx_qt import ensure_runtime
        try:
            # 2. 鍔ㄦ€佸惎鐢ㄨ繍琛屾椂鎵╁睍骞惰幏鍙?bQt 鐜
            bqt = ensure_runtime()
            
            # 3. 璋冪敤鍏蜂綋涓氬姟鎵╁睍鐨?manager 鎺ュ彛娓叉煋绐楀彛
            from bl_ext.system.blender_vfx_viewlayer_manager.manager import show_manager
            show_manager()
            return {'FINISHED'}
        except Exception as e:
            self.report({'ERROR'}, f"鏃犳硶鍚姩 ViewLayer 绠＄悊鍣? {str(e)}")
            return {'CANCELLED'}
```

---

## 3. 鍒涘缓鎵樼绐楀彛 (鍗曚緥妯″紡)

涓轰簡闃叉鐢ㄦ埛閲嶅鐐瑰嚮鎵撳紑澶氫釜鐩稿悓鐨勫伐鍏风獥鍙ｏ紙杩欏湪 VFX 鍒朵綔鐜涓瀬鏄撳鑷村簳灞傚満鏅暟鎹鍐欏啿绐佷笌鍐呭瓨娉勬紡锛夛紝宸ュ叿绐楀彛蹇呴』鍒嗛厤鍞竴鐨?`objectName`锛屽苟鍦ㄦ敞鍐屾椂浣跨敤 `bqt.add(..., unique=True)`銆?

### 鍗曚緥鍚姩璋冪敤妯℃澘锛?
```python
# release/extensions/system/blender_vfx_viewlayer_manager/manager.py
from blender_vfx_qt import ensure_runtime, qt_window_is_alive, show_unique_window

# 鐢ㄤ簬瀛樺偍娲诲姩绐楀彛寮曠敤鐨勫瓧鍏哥紦瀛?
_window_cache = {"value": None}

def show_manager():
    bqt = ensure_runtime()
    
    # 鑻ョ獥鍙ｅ凡澶勪簬娲诲姩鐘舵€侊紝鍒欏埛鏂板叾鏁版嵁骞跺皢鍏剁疆浜庢渶鍓?
    cached_window = _window_cache.get("value")
    if qt_window_is_alive(cached_window):
        cached_window.refresh_from_blender()

    from .window import ViewLayerManagerWindow

    def factory():
        window = ViewLayerManagerWindow()
        # 娉ㄥ唽骞朵紶鍏?unique=True锛屽惎鐢ㄥ崟渚嬪畨鍏ㄦ牎楠?
        bqt.add(window, unique=True)
        return window

    return show_unique_window(_window_cache, factory)
```

---

## 4. 瀹夊叏鐙珛绐楀彛妯″紡 (Standalone Safety Mode)

鏈垎鏀腑榛樿浠?*瀹夊叏鐙珛绐楀彛妯″紡**鍚姩 Qt 杩愯鐜銆傝妯″紡鍦?UI 鍝嶅簲搴︺€侀敭鐩樼劍鐐规崟鑾凤紙Focus Integrity锛変笂鏈€涓虹ǔ鍋ワ紝瀹屽叏瑙勯伩浜嗗皢鍘熺敓 Win32 瑙嗗彛鍙ユ焺寮哄埗宓屽叆 Qt 绐楀彛瀹瑰櫒涓椂鍙兘寮曞彂鐨勯殢鏈哄穿婧冦€?

### 鏍稿績鐜鍙橀噺璁剧疆
鍦ㄦ媺璧?Qt 鐜鍓嶏紝`blender_vfx_qt` 妯″潡浼氶粯璁ら厤缃互涓嬬幆澧冨彉閲忥細

* **`BQT_DISABLE_WRAP="1"`**锛氱鐢ㄥ皢 Blender 瑙嗗彛宓屽叆鍒?Qt 甯冨眬妗嗘灦涓殑琛屼负銆俀t 绐楀彛灏嗕互瀹屽叏鐙珛鐨勬搷浣滅郴缁熺骇鍘熺敓绐楀彛褰㈠紡杩愯銆?
* **`BQT_AUTO_ADD="0"`**锛氱鐢?bQt 鑷姩鎹曡幏骞舵墭绠″绔嬬殑椤剁骇 Qt 寮圭獥鐨勮涓猴紝纭繚绐楀彛鐖跺瓙绾у叧绯诲畬鍏ㄧ敱寮€鍙戣€呭畾涔夈€?
* **`BQT_DOCKABLE_WRAP="0"`**锛氱鐢ㄥ皢宸叉敞鍐岀殑 Widget 鑷姩鍖呰鍦?`QDockWidget` 渚ц竟闈㈡澘涓殑榛樿琛屼负銆?
* **`BQT_MANAGE_FOREGROUND="1"`**锛氱洃鎺ф搷浣滅郴缁熺骇鍒殑娲诲姩绐楀彛鍙ユ焺銆傚垏鍑?Blender 鏃惰嚜鍔ㄩ殣钘忔墍鏈夊凡娉ㄥ唽鐨?Qt 娴姩绐楀彛锛涘垏鍥?Blender 鏃讹紝鐬棿鎭㈠瀹冧滑鐨勬樉绀恒€?

> [!NOTE]
> 鍦ㄥ畨鍏ㄧ嫭绔嬬獥鍙ｆā寮忎笅锛孊lender 鎺у埗鍙颁細杈撳嚭涓€鏉¤鍛婏細`failed to get blender hwnd, creating new window`銆?*璇ヨ鍛婂畬鍏ㄦ甯镐笖鏃犲**銆傚畠琛ㄦ槑鐙珛璺敱宸叉垚鍔熸帴绠★紝鍒囧嬁灏嗗叾璇垽涓哄穿婧冩牴鍥犮€?

---

## 5. 鐜閰嶇疆鍙橀噺閫熸煡琛?

| 鐜鍙橀噺 | 榛樿鍊?| 鍏佽鐨勫€?| 璇︾粏璇存槑 |
| :--- | :--- | :--- | :--- |
| **`BQT_DISABLE_WRAP`** | `0` (鏈缃? | `1`, `0` | 璁句负 `1` 鍚敤瀹夊叏鐙珛绐楀彛妯″紡锛岃烦杩囧鏉傜殑瑙嗗彛瀹瑰櫒宓屽叆銆?|
| **`BQT_AUTO_ADD`** | `1` (鏈缃? | `1`, `0` | 鍦ㄥ叡浜寘瑁呭櫒涓寮哄埗璁句负 `0`锛岄槻姝㈣鎹曡幏鍏朵粬鍘熺敓鎮诞绐椼€?|
| **`BQT_DOCKABLE_WRAP`** | `1` (鏈缃? | `1`, `0` | 璁句负 `0` 淇濇寔 Widget 涓哄共鍑€鐨勬诞鍔ㄥ皬宸ュ叿锛岃€屼笉鏄祵鍏ュ紡闈㈡澘銆?|
| **`BQT_MANAGE_FOREGROUND`** | `1` | `1`, `0` | 鍦?`BQT_DISABLE_WRAP="1"` 鏃剁敓鏁堛€傚惎鐢ㄥ墠鍚庡彴鍙鎬ц嚜鍔ㄥ悓姝ャ€?|
| **`BQT_NO_STYLESHEET`** | `0` (鏈缃? | `1`, `0` | 璁句负 `1` 绂佺敤鍐呯疆鐨勬繁鑹?Blender 椋庢牸鏍峰紡琛ㄣ€?|
| **`BQT_DISABLE_CLOSE_DIALOGUE`**| `0` (鏈缃? | `1`, `0` | 璁句负 `1` 鍏抽棴 Qt 渚ц嚜瀹氫箟鐨勯€€鍑虹‘璁ゅ脊绐楋紝鐢?Blender 缁熶竴澶勭悊淇濆瓨銆?|
| **`BQT_LOG_LEVEL`** | `"WARNING"` | `"DEBUG"`, `"INFO"`, `"WARNING"`, `"ERROR"` | 閰嶇疆杩愯鏃剁殑鏃ュ織杈撳嚭绾у埆銆?|

---

## 6. 绯荤粺鎵╁睍鎵撳寘涓庣洰褰曠粨鏋勮鑼?

> [!CAUTION]
> **缁濆涓嶅彲杩濊儗鐨勬墦鍖呰鍒欙細** 缁濆涓嶈灏嗙郴缁熸墿灞曞寘瑁呭湪閲嶅鐨勫浣?`system` 鏂囦欢澶逛腑銆傛绫荤洰褰曞閲嶅祵濂椾細瀵艰嚧鎵弿澶辨晥骞惰Е鍙?`bl_ext.system.*` 瀵煎叆閿欒銆?

### 姝ｇ‘鐨勭洰褰曠粨鏋勫竷灞€
```
馃搨 release/extensions/system/
    鈹溾攢鈹€ 馃搨 blender_vfx_qt_runtime/         # 姝ｇ‘鐩存帴鏀惧湪 system/ 涓?
    鈹?    鈹溾攢鈹€ 馃搫 blender_manifest.toml
    鈹?    鈹斺攢鈹€ 馃搫 __init__.py
    鈹斺攢鈹€ 馃搨 blender_vfx_viewlayer_manager/  # 姝ｇ‘鐩存帴鏀惧湪 system/ 涓?
          鈹溾攢鈹€ 馃搫 blender_manifest.toml
          鈹斺攢鈹€ 馃搫 __init__.py
```

### 閿欒鐨勫祵濂楃粨鏋勫竷灞€锛堝垏鍕夸娇鐢級
```
馃搨 release/extensions/system/
    鈹斺攢鈹€ 馃搨 system/                          # 閿欒鐨勫浣欏祵濂楀眰
          鈹斺攢鈹€ 馃搨 blender_vfx_viewlayer_manager/
```

* **浜х敓鍘熷洜锛?* Blender 鑷甫鐨勬墿灞曠鐞嗗櫒锛圗xtension Manager锛夊湪娉ㄥ唽绯荤粺鏈湴浠撳簱鏃讹紝浼氳嚜鍔ㄥ湪瑙ｆ瀽璺緞涓嫾鎺ヤ竴绾?`system` 鍛藉悕绌洪棿銆傝嫢浣犲湪纾佺洏婧愮爜鏍戜笂鍐嶆鎵嬪姩宓屽涓€灞?`system/system/`锛岃В鏋愬眰渚夸細鍑虹幇閫氳矾闃绘柇锛屽鑷存枃浠舵槑鏄庡瓨鍦ㄤ絾澶栭儴鏍规湰鏃犳硶 `import` 瀵煎叆涓氬姟妯″潡銆?

---

## 7. ViewLayer 绠＄悊鍣ㄩ珮绾ц璁℃ā寮?

**ViewLayer 绠＄悊鍣?* 瀹炵幇浜嗕簲绉嶇敓浜х骇鐨勯珮绾?Qt-Blender 浜や簰璁捐妯″紡锛?

### 妯″紡 1锛氫笂涓嬫枃绐楀彛淇濇姢 (`@context_window`)
褰撶敤鎴峰湪 Qt 鐣岄潰涓Е鍙戞搷浣滐紙渚嬪鐐瑰嚮鎸夐挳锛夋椂锛屼笟鍔℃Ы鍑芥暟鏄湪 Qt 鐨勪簨浠跺惊鐜嚎绋嬩腑杩愯鐨勩€傚鏋滄鏃剁洿鎺ヨ鍐?Blender 鐨?RNA 灞炴€ф垨璋冪敤绠楀瓙锛堜緥濡?`bpy.ops.ed.undo_push`锛夛紝Blender 甯稿父浼氬洜涓婁笅鏂囷紙Context锛夋湭鍒濆鍖栨垨缂哄け鑰屽彂鐢熷穿婧冦€?

瑕佽В鍐虫闂锛岃浣跨敤 `bqt.utils` 鎻愪緵鐨?`@context_window` 瑁呴グ鍣ㄥ鎵€鏈変慨鏀?Blender 鍦烘櫙鏁版嵁鐨?Qt 绫绘柟娉曡繘琛岃楗帮細

```python
from bqt.utils import context_window
import bpy

class ViewLayerManagerWindow(QtWidgets.QDialog):
    
    @context_window
    def _set_view_layer_use_in_blender(self, view_layer_name: str, value: bool) -> bool:
        # 璇ユ柟娉曞湪鎵ц鏃讹紝浼氳嚜鍔ㄥ寘瑁瑰湪瀹夊叏涓旀椿鍔ㄧ殑 Blender 绐楀彛涓婁笅鏂囧弬鏁颁腑
        view_layer = self._find_view_layer(view_layer_name)
        if view_layer is None:
            return False
        
        if view_layer.use != value:
            view_layer.use = value
            # 姝ゆ椂鍙互瀹夊叏鎺ㄩ€佹挙閿€鐘舵€?
            bpy.ops.ed.undo_push(message="ViewLayer Manager: Update Use")
            return True
        return False
```

### 妯″紡 2锛氬弻璺緞鍙屽悜鐘舵€佸悓姝?
褰?Qt 绐楀彛鎵撳紑鏃讹紝鑹烘湳瀹朵粛鑳藉湪 Blender 鍘熺敓鐨勫睘鎬у睘鎬ч潰鏉夸腑鏇存敼灞炴€с€備负浜嗙‘淇?Qt UI 鐨勫疄鏃跺悓姝ヤ笖涓嶅彂鐢熺嚎绋嬪啿绐侊紝闇€缁撳悎涓ょ鍚屾鏂瑰紡锛?

#### A. QTimer 杞娲诲姩涓婁笅鏂囨洿鏀?
浣跨敤涓€涓交閲忕骇鐨?`QTimer` 浣庨锛堝 150 姣闂撮殧锛夋鏌?Blender 涓殑褰撳墠娲诲姩椤癸紝鍙戠敓鏇存敼鏃跺埛鏂?UI锛?
```python
self._active_state_timer = QtCore.QTimer(self)
self._active_state_timer.setInterval(150) # 150ms 闂撮殧
self._active_state_timer.timeout.connect(self._poll_active_view_layer_state)
self._active_state_timer.start()

def _poll_active_view_layer_state(self) -> None:
    active_name = bpy.context.view_layer.name
    if active_name != self._last_active_view_layer_name:
        self._sync_active_view_layer_from_context()
```

#### B. Blender 娑堟伅鎬荤嚎 (MsgBus) 鐨勭嚎绋嬪畨鍏ㄨ皟搴?
瀵逛簬鐗瑰畾灞炴€х殑鍙樻洿璁㈤槄锛屼娇鐢?Blender 鐨?MsgBus銆傜敱浜?MsgBus 鍥炶皟鏄湪 Blender 鍐呴儴绾跨▼涓縺鍙戠殑锛屼笉鑳界洿鎺ユ搷鎺?Qt UI銆傞渶浣跨敤 `QTimer.singleShot(0, ...)` 灏嗛噸缁橀€昏緫瀹夊叏浼犻€掔粰 Qt 浜嬩欢寰幆鐨?UI 绾跨▼锛?

```python
def _register_message_bus(self) -> None:
    # 璁㈤槄娲诲姩 view_layer 鐨勪慨鏀逛簨浠?
    bpy.msgbus.subscribe_rna(
        key=(bpy.types.Window, "view_layer"),
        owner=self._msgbus_owner,
        args=(self,),
        notify=self._notify_active_view_layer_changed,
    )

def _notify_active_view_layer_changed(window: "ViewLayerManagerWindow") -> None:
    # 绾跨▼瀹夊叏鍒嗗彂鍥?Qt 鐨勪富浜嬩欢寰幆绾跨▼鎵ц閲嶇粯
    QtCore.QTimer.singleShot(0, window._sync_active_view_layer_from_context)
```

### 妯″紡 3锛氭粦鍔ㄨ繛閫夊閫夋 ("Brush Selection")
鍦ㄦ嫢鏈夊ぇ閲忔覆鏌撻€氶亾锛圧ender Passes锛夌殑琛ㄦ牸涓紝閫愪釜鐐瑰嚮澶嶉€夋闈炲父绻佺悙銆俈iewLayer 绠＄悊鍣ㄥ疄鐜颁簡涓€绉嶁€滃埛瀛愨€濋€夋嫨浣撻獙锛氭寜浣忛紶鏍囧乏閿苟鍦ㄥ閫夋鍒楄〃涓婂垝杩囷紝鍗冲彲涓€姘斿懙鎴愭壒閲忓弽杞垨璁剧疆瀹冧滑鐨勭姸鎬併€?

杩欐槸閫氳繃鑷畾涔?`BrushCheckBox` 骞跺畨瑁呭叏灞€搴旂敤绋嬪簭浜嬩欢杩囨护鍣ㄥ疄鐜扮殑锛?

```python
class BrushCheckBox(QtWidgets.QCheckBox):
    def mousePressEvent(self, event) -> None:
        if event.button() == QtCore.Qt.MouseButton.LeftButton and self.isEnabled():
            # 濮旀墭缁欎富绐楀彛寮€濮嬧€滃埛鍔ㄢ€濇搷浣?
            if self._manager._begin_checkbox_brush(self):
                event.accept()
                return
        super().mousePressEvent(event)
```

鍦ㄤ富绐楀彛绫讳腑锛屾粦鍔ㄦ湡闂存崟鑾烽紶鏍囧垝杩囩殑鐩爣鎺т欢锛?
```python
def eventFilter(self, watched, event) -> bool:
    if self._checkbox_brush_active:
        if event.type() == QtCore.QEvent.Type.MouseMove:
            # 鐩戞祴榧犳爣鎷栨嫿鐘舵€?
            buttons = event.buttons()
            if not (buttons & QtCore.Qt.MouseButton.LeftButton):
                self._end_checkbox_brush()
                return True
            
            # 鑾峰彇鍏夋爣涓嬬殑 Widget 骞跺簲鐢ㄦ壒閲忎慨鏀?
            global_pos = QtGui.QCursor.pos()
            checkbox = self._find_brush_checkbox(QtWidgets.QApplication.widgetAt(global_pos))
            if checkbox:
                self._apply_checkbox_brush_to(checkbox)
            return True
            
        elif event.type() == QtCore.QEvent.Type.MouseButtonRelease:
            self._end_checkbox_brush()
            return True
            
    return super().eventFilter(watched, event)
```

### 妯″紡 4锛氳嚜瀹氫箟 QListWidget Item 涓殑澶氶€変笌淇グ閿鐞?
褰撴垜浠妸鑷畾涔夌殑澶嶆潅 Widget锛堝甯﹀浘琛ㄧ殑鑷畾涔夊抚锛夐€氳繃 `setItemWidget` 濉炶繘 `QListWidget` 涓椂锛屽瓙 Widget 浼氭嫤鎴墍鏈夌殑榧犳爣浜嬩欢銆傝繖浼氬鑷村師鏈?`QListWidget` 鑷甫鐨勫閫夛紙鎸変綇 Shift 鎴?Ctrl 閿繛閫夛級澶辨晥銆?

ViewLayer 绠＄悊鍣ㄩ€氳繃閲嶅啓瀛?Widget 鐨?`mousePressEvent`锛屾彁鍙栨縺娲荤殑閿洏淇グ閿紝鐒跺悗鎵嬪伐鍥炶皟涓荤獥鍙ｇ殑鍒楄〃閫夋嫨绠楁硶锛?

```python
class ViewLayerListRowWidget(QtWidgets.QFrame):
    clicked = QtCore.Signal(str, int) # 鍙戦€佽鍥惧眰鍚嶇О涓庝慨楗伴敭鐨勬暣鍨嬫暟鍊?

    def mousePressEvent(self, event) -> None:
        if event.button() == QtCore.Qt.MouseButton.LeftButton:
            modifiers = event.modifiers()
            modifier_value = getattr(modifiers, "value", modifiers)
            self.clicked.emit(self._view_layer_name, int(modifier_value))
            event.accept()
            return
        super().mousePressEvent(event)
```

鍦ㄤ富绐楀彛涓紝鎺ユ敹淇″彿骞跺疄鐜板閫夎鐩栵細
```python
def _on_classic_row_clicked(self, view_layer_name: str, modifiers: int) -> None:
    ctrl_pressed = bool(modifiers & QtCore.Qt.KeyboardModifier.ControlModifier.value)
    shift_pressed = bool(modifiers & QtCore.Qt.KeyboardModifier.ShiftModifier.value)
    
    self.view_layer_list.blockSignals(True)
    if shift_pressed and self._selection_anchor:
        # 閫夋嫨閿氱偣涓庣洰鏍囪涔嬮棿鐨勬墍鏈夐」
        self._select_range(self._selection_anchor, view_layer_name)
    elif ctrl_pressed:
        # 浠呭弽杞綋鍓嶉€変腑椤圭殑鐘舵€?
        self._toggle_selection(view_layer_name)
    else:
        # 鏅€氬崟閫?
        self._select_single(view_layer_name)
        self._selection_anchor = view_layer_name
    self.view_layer_list.blockSignals(False)
    
    self.refresh_from_blender()
```

### 妯″紡 5锛氭瀬鑷村儚绱犵骇娴佺晠鍒楄〃婊氬姩
瀵逛簬鍒楄〃鍏冪礌杩囬暱涓旂揣鍑戠殑瑙嗗浘锛屽師鐢?Qt 婊氬姩鏉℃槸鎸夐」锛坕tem-by-item锛夋粴鍔ㄧ殑锛屼細鏈夋槑鏄剧殑椤挎尗鎰熴€傚彲浠ラ€氳繃寮哄埗寮€鍚儚绱犵骇骞虫粦婊氬姩鏉ヤ紭鍖栬壓鏈浣撻獙锛?

```python
def _configure_smooth_scroll(view: QtWidgets.QAbstractScrollArea) -> None:
    view.setVerticalScrollMode(QtWidgets.QAbstractItemView.ScrollMode.ScrollPerPixel)
    
    vertical_scrollbar = view.verticalScrollBar()
    vertical_scrollbar.setSingleStep(18)  # 鍗曟骞虫粦鍍忕礌璺濈
    vertical_scrollbar.setPageStep(72)    # 椤甸潰鍗曢〉缈绘粴鍍忕礌璺濈
```

---

## 8. 鏂板缓 Qt 宸ュ叿寮€鍙戞祦绋?

鑻ヤ綘璁″垝鍦ㄦ Blender 鍒嗘敮涓泦鎴愬叏鏂扮殑 Qt 宸ュ叿锛岃鍔″繀閬靛惊浠ヤ笅瀹夊叏鐨勬帴鍏ヨ鑼冿細

### 绗竴姝ワ細鏋勫缓妗ユ帴绠楀瓙鍏ュ彛
棣栧厛鍦?`scripts/startup/bl_operators/` 鐩綍涓嬪垱寤鸿交閲忕殑鍏ュ彛绠楀瓙锛堜緥濡?`blender_vfx_my_new_tool.py`锛夈€傜‘璁よ兘姝ｅ父娉ㄥ唽骞跺湪鑿滃崟鏍忔樉绀猴紝鍏堜笉瑕佺紪鍐欎换浣曞鏉傜殑 UI 閫昏緫銆?

### 绗簩姝ワ細鍒涘缓涓嶅惈渚濊禆鐨勭郴缁熸墿灞?
鍦?`release/extensions/system/my_new_tool_extension/` 鐩綍涓嬪缓绔嬩綘鑷繁鐨勬墿灞曞寘銆傞厤缃ソ鍩虹鐨?`blender_manifest.toml`銆?*缁濆绂佹**鍦ㄨ鎵╁睍鍖呭唴鎼哄甫浠讳綍 `.whl` 鏂囦欢銆?

### 绗簩姝ワ細缂栧啓 UI 涓庡悓姝ユ満鍒?
鍦ㄦ墿灞曞寘鍐呭疄鐜?`manager.py`锛屽湪鍏跺唴璋冪敤甯搁┗鍖呰妯″潡鐨?`ensure_runtime()` 寮曞 Qt锛屽苟鍩轰簬鍗曚緥妯″紡瀹炰緥鍖栦綘鐨?Standalone 绐楀彛銆傜‘淇濇秹鍙?Blender 灞炴€т慨鏀圭殑鏂规硶琚?`@context_window` 姝ｇ‘瑕嗙洊銆?

---

## 9. 鑷姩鍖栭泦鎴愪笌楠岃瘉娴佹按绾?

鎵€鏈夊紑鍙戠殑 BQt 宸ュ叿鍦ㄥ悎骞惰繘鍏ヤ富绾垮墠锛屽繀椤婚€氳繃浠ヤ笅瀹屾暣鐨勫垎灞傞獙璇侀獙璇侀摼锛?

```
[姝ラ涓€锛氱紪璇戦獙璇乚 鉃?[姝ラ浜岋細甯冨眬瀹屾暣鎬ч獙璇乚 鉃?[姝ラ涓夛細鍚庡彴妯″紡鍐掔儫楠岃瘉] 鉃?[姝ラ鍥涳細GUI 鍔熻兘鍐掔儫楠岃瘉]
```

1. **姝ラ涓€锛氱紪璇戦獙璇?*锛氫娇鐢?`python -m compileall` 妫€鏌ユ墍鏈夎剼鏈殑璇硶姝ｇ‘鎬с€?
2. **姝ラ浜岋細甯冨眬瀹屾暣鎬ч獙璇?*锛氳繍琛屾墦鍖呭竷灞€娴嬭瘯锛岄槻姝㈡墿灞曡璇皝瑁呭湪宓屽鐨?`system/system/` 鏂囦欢澶逛笅銆傛墽琛屾祴璇曞懡浠わ細
   ```bash
   ctest -R blender_vfx_system_extensions_layout_test
   ```
3. **姝ラ涓夛細鍚庡彴妯″紡鍐掔儫楠岃瘉**锛氬惎鍔?Blender 鍚庡彴妯″紡锛圚eadless Mode锛夛紝璋冪敤绠楀瓙娴嬭瘯纭繚鍚敤 `bqt` 鏃朵笉鍙戠敓瀵煎叆姝婚攣鎴栧穿婧冦€?
4. **姝ラ鍥涳細GUI 鍔熻兘鍐掔儫楠岃瘉**锛氬湪缂栬瘧鍚庣殑 Blender release 涓墿鐞嗘媺璧峰伐鍏风獥鍙ｏ紝瀹炴祴婊戝姩杩為€夈€佸儚绱犵骇骞虫粦婊氬姩浠ュ強鍓嶅悗鍙扮劍鐐瑰垏鎹㈣嚜鍔ㄩ殣钘忓姛鑳姐€?
