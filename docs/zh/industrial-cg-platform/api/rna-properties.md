# RNA 灞炴€?

鏈〉璁板綍浜?Industrial CG Platform 娣诲姞鍒?Blender 鏁版嵁妯″瀷涓殑鏂?RNA 灞炴€с€?

## ViewLayer 灞炴€?

### `ViewLayer.use_deep`

| 灞炴€?| 鍊?|
| --- | --- |
| **绫诲瀷** | `BoolProperty` |
| **榛樿鍊?* | `False` |
| **鎻忚堪** | 涓烘 ViewLayer 鍚敤 Deep EXR 杈撳嚭 |
| **UI 浣嶇疆** | 灞炴€?> 瑙嗗浘灞?> Passes |

```python
# Python 璁块棶绀轰緥
view_layer = bpy.context.view_layer
view_layer.use_deep = True
```

### `ViewLayer.use_lightgroup_light_pass_aovs`

| 灞炴€?| 鍊?|
| --- | --- |
| **绫诲瀷** | `BoolProperty` |
| **榛樿鍊?* | `False` |
| **鎻忚堪** | 鍚敤閫愮伅鍏夌粍鍒嗛噺閫氶亾锛圠obe Pass锛夎緭鍑?|
| **UI 浣嶇疆** | 灞炴€?> 瑙嗗浘灞?> Passes > 鐏厜 |

```python
view_layer.use_lightgroup_light_pass_aovs = True
```

### 閫愬垎閲?AOV 甯冨皵鍊?

姣忎釜鍒嗛噺閫氶亾鍧囧彲浠ョ嫭绔嬪惎鐢細

```python
view_layer.use_lightgroup_diffuse_direct = True
view_layer.use_lightgroup_diffuse_indirect = True
view_layer.use_lightgroup_glossy_direct = True
view_layer.use_lightgroup_glossy_indirect = True
view_layer.use_lightgroup_transmission_direct = True
view_layer.use_lightgroup_transmission_indirect = True
view_layer.use_lightgroup_volume_direct = True
view_layer.use_lightgroup_volume_indirect = True
```

## 鐏厜灞炴€?

### `Light.shadow_color`

| 灞炴€?| 鍊?|
| --- | --- |
| **绫诲瀷** | `FloatVectorProperty` (RGB) |
| **榛樿鍊?* | `(0.0, 0.0, 0.0)` 鈥?鏃犻槾褰辫壊璋?|
| **瀛愮被鍨?* | `COLOR` |
| **鏈€灏忓€?鏈€澶у€?* | 姣忎釜閫氶亾 `0.0` / `1.0` |
| **鎻忚堪** | 搴旂敤浜庢鐏厜闃村奖鍖哄煙鐨勯鑹茶壊璋?|
| **UI 浣嶇疆** | 灞炴€?> 鐗╀綋鏁版嵁 > 鐏厜 |

```python
light = bpy.data.lights['Key']
light.shadow_color = (0.1, 0.05, 0.2)  # 寰急鐨勭传鑹查槾褰辫壊璋?
```

## 涓栫晫灞炴€?

### `World.shadow_color`

| 灞炴€?| 鍊?|
| --- | --- |
| **绫诲瀷** | `FloatVectorProperty` (RGB) |
| **榛樿鍊?* | `(0.0, 0.0, 0.0)` 鈥?鏃犻槾褰辫壊璋?|
| **瀛愮被鍨?* | `COLOR` |
| **鏈€灏忓€?鏈€澶у€?* | 姣忎釜閫氶亾 `0.0` / `1.0` |
| **鎻忚堪** | 搴旂敤浜庝笘鐣屽厜鐓ч槾褰卞尯鍩熺殑棰滆壊鑹茶皟 |
| **UI 浣嶇疆** | 灞炴€?> 涓栫晫 |

```python
world = bpy.data.worlds['World']
world.shadow_color = (0.05, 0.08, 0.15)  # 鍐疯摑鑹茶皟鐨勪笘鐣岄槾褰?
```

## Blender 鏍稿績鎵╁睍

### `PROP_SEARCH_KEEP_ORDER`

| 灞炴€?| 鍊?|
| --- | --- |
| **绫诲瀷** | `PropertyRNA` 涓婄殑 RNA 鏍囧織锛團lag锛?|
| **鎵€鍦ㄤ綅缃?* | `source/blender/makesrna/RNA_types.hh` |
| **璁捐鐩殑** | 鍦?RNA 闆嗗悎鐨?`template_search` 鎼滅储涓烦杩囧瓧姣嶉『搴忕殑寮哄埗閲嶆帓 |

璇ユ爣蹇楀簲鐢ㄤ簬 `Scene.view_layers`锛屼互渚垮師鐢熺殑 ViewLayer 閫夋嫨鍣ㄨ兘澶熷皧閲嶇湡瀹炵殑 RNA 椤哄簭锛堝 ViewLayer 绠＄悊鍣ㄦ帓搴忔帶浠舵墍璋冩暣鐨勯『搴忥級锛岃€屼笉鏄寜瀛楁瘝椤哄簭寮鸿鎺掑簭銆?

```cpp
// source/blender/makesrna/intern/rna_scene.cc
RNA_def_property_flag(prop, PROP_SEARCH_KEEP_ORDER);
```

## Cycles 婧㈢敾骞呭睘鎬?

浠ヤ笅灞炴€ч厤缃簡 Cycles 寮曟搸璁剧疆涓嬬殑 EXR Overscan锛堟孩鐢诲箙锛夎缃紙鍙€氳繃 `Scene.cycles` 璁块棶锛夈€?

### `CyclesRenderSettings.overscan_mode`

| 灞炴€?| 鍊?|
| --- | --- |
| **绫诲瀷** | `Enum` (`'PERCENTAGE'`, `'PIXELS'`) |
| **榛樿鍊?* | `'PERCENTAGE'` |
| **鎻忚堪** | 婧㈢敾骞呰绠楁柟寮忥紙鐧惧垎姣旀墿灞曟垨杈圭紭鍍忕礌鎵╁睍锛?|
| **UI 浣嶇疆** | 灞炴€?> 杈撳嚭 > Overscan |

### `CyclesRenderSettings.overscan_size`

| 灞炴€?| 鍊?|
| --- | --- |
| **绫诲瀷** | `FloatProperty` |
| **榛樿鍊?* | `0.0` (鑼冨洿: `0.0` 鍒?`100.0`) |
| **鎻忚堪** | 鎵€鏈夎竟鐣岀粺涓€鎵╁睍鐨勭櫨鍒嗘瘮澶у皬锛堢櫨鍒嗘瘮妯″紡涓嬶級 |
| **UI 浣嶇疆** | 灞炴€?> 杈撳嚭 > Overscan > Size |

### 杈圭紭鎵╁睍灞炴€?(Pixels 妯″紡)

褰?`overscan_mode` 璁剧疆涓?`'PIXELS'` 鏃讹紝浠ヤ笅灞炴€х敤浜庡垎鍒寚瀹氬叿浣撹竟缂樼殑鍍忕礌鎵╁睍濉厖鍊硷細
- `CyclesRenderSettings.overscan_left` (鏁村瀷锛岄粯璁ゅ€?`0`)
- `CyclesRenderSettings.overscan_right` (鏁村瀷锛岄粯璁ゅ€?`0`)
- `CyclesRenderSettings.overscan_bottom` (鏁村瀷锛岄粯璁ゅ€?`0`)
- `CyclesRenderSettings.overscan_top` (鏁村瀷锛岄粯璁ゅ€?`0`)

```python
# Python 璁块棶绀轰緥
scene = bpy.context.scene
scene.cycles.overscan_mode = 'PERCENTAGE'
scene.cycles.overscan_size = 10.0
```

## 婧愭枃浠?

| 鏂囦欢 | 鐢ㄩ€?|
| --- | --- |
| `source/blender/makesrna/intern/rna_scene.cc` | 娉ㄥ唽 ViewLayer 鍒嗛噺 AOV 灞炴€у強 `PROP_SEARCH_KEEP_ORDER` 鏍囧織 |
| `source/blender/makesrna/RNA_types.hh` | `PROP_SEARCH_KEEP_ORDER` 鏍囧織瀹氫箟 |
| `source/blender/editors/interface/interface_utils.cc` | 褰撹缃簡 `PROP_SEARCH_KEEP_ORDER` 鏃惰烦杩囧瓧姣嶆帓搴忛€昏緫 |
| `intern/cycles/blender/addon/properties.py` | 澹版槑 Cycles 婧㈢敾骞呭睘鎬?|
| `scripts/startup/bl_ui/properties_output.py` | 婧㈢敾骞呰緭鍑洪潰鏉跨殑 UI 甯冨眬 |

