# 瀹夎

## 绯荤粺瑕佹眰

| 缁勪欢 | 瑕佹眰 |
| --- | --- |
| **鎿嶄綔绯荤粺** | Windows 10/11 x64 |
| **GPU** | 鏀寔 CUDA 鎴?OptiX 鐨?NVIDIA GPU锛堟帹鑽愶級 |
| **GPU 椹卞姩** | 鏈€鏂?NVIDIA Game Ready 鎴?Studio 椹卞姩 |
| **鍐呭瓨 (RAM)** | 鏈€浣?16 GB锛屾帹鑽?32 GB |
| **纾佺洏绌洪棿** | 瑙ｅ帇鍙戝竷鍖呴渶瑕佺害 1 GB 绌洪棿 |

## 涓嬭浇

1. 鍓嶅線 [GitHub Releases](https://github.com/RolandVyens/industrial-cg-platform/releases) 椤甸潰銆?
2. 涓嬭浇鏈€鏂扮殑 `industrial-cg-platform-X.X.X-YYYY-MM-DD.zip` 鍘嬬缉鍖呫€?
3. 閫氳繃妫€鏌ュ彂甯冭鏄庝腑鍒楀嚭鐨?SHA256 鍝堝笇鍊奸獙璇佷笅杞芥枃浠剁殑瀹屾暣鎬с€?

## 瑙ｅ帇涓庡畨瑁?

1. 灏?ZIP 鍘嬬缉鍖呰В鍘嬪埌鎮ㄥ亸濂界殑浠绘剰浣嶇疆锛堜緥濡?`D:\Tools\IndustrialCGPlatform\`锛夈€?
2. 杩愯瑙ｅ帇鏂囦欢澶逛腑鐨?`blender.exe`銆?
3. 棣栨鍚姩鏃讹紝鎮ㄥ簲璇ヤ細鐪嬪埌甯︽湁 **Industrial CG Platform** 鑹烘湳鏍囪瘑鐨勮嚜瀹氫箟鍚姩鐢婚潰锛圫plash Screen锛夈€?

::: warning
濡傛灉鎮ㄦ兂閬垮厤姣忔鍚姩鏃堕兘寮瑰嚭 UAC锛堢敤鎴疯处鎴锋帶鍒讹級绠＄悊鍛樻潈闄愭彁绀猴紝璇蜂笉瑕佸皢鏂囦欢瑙ｅ帇鍒伴渶瑕佺郴缁熺鐞嗗憳鏉冮檺鐨勬晱鎰熻矾寰勶紙渚嬪 `C:\Program Files\`锛夈€傚儚 `D:\Tools\` 杩欐牱鐢ㄦ埛鍙啓鍏ョ殑鑷畾涔夎矾寰勬晥鏋滄渶浣炽€?
:::

## 楠岃瘉瀹夎

鍦ㄧ粓绔垨鍛戒护鎻愮ず绗︿腑锛屽鑸嚦瀹夎鐩綍骞惰繍琛屼互涓嬪懡浠よ繘琛岀増鏈獙璇侊細

```powershell
.\blender.exe --version
```

棰勬湡杈撳嚭锛?

```
Blender 5.2.0-2026-06-16 Industrial CG Platform
```

## GPU 娓叉煋璁剧疆

鑻ヨ涓?Cycles 鍚敤 NVIDIA GPU 纭欢鍔犻€熸覆鏌擄細

1. 鎵撳紑鑿滃崟鏍?**缂栬緫 > 鍋忓ソ璁剧疆 > 绯荤粺 (Edit > Preferences > System)**銆?
2. 鍦?**Cycles 娓叉煋璁惧 (Cycles Render Devices)** 涓嬶紝閫夋嫨锛?
   - **CUDA** 鈥?骞挎硾鍏煎鑰佹棫纭欢锛岄€熷害绋嶆參銆?
   - **OptiX** 鈥?RTX 绯诲垪 GPU 涓婄殑纭欢鍏夌嚎杩借釜鍔犻€燂紙寮虹儓鎺ㄨ崘锛夈€?
3. 鍦ㄤ笅鏂圭殑璁惧鍒楄〃涓嬀閫夋偍鐨?GPU 鏄惧崱銆?

## 涓庡畼鏂?Stock Blender 鍏卞瓨

Industrial CG Platform 榛樿浣跨敤涓庡畼鏂圭浉鍚岀殑閰嶇疆鐩綍锛坄%APPDATA%\Blender Foundation\Blender\5.2\`锛夈€傚鏋滄偍甯屾湜鍦ㄦ湰鍦颁繚鎸佸畬鍏ㄧ嫭绔嬬殑閰嶇疆鍜岀敤鎴峰亸濂斤細

- 鍦ㄥ惎鍔ㄥ揩鎹锋柟寮忓悗闄勫姞 `--factory-startup` 鍙傛暟锛屼互杩涜鍏ㄦ柊鐨勫共鍑€浼氳瘽銆?
- 鎴栬€呭湪杩愯鍓嶏紝灏嗙幆澧冨彉閲?`BLENDER_USER_RESOURCES` 璁剧疆涓轰竴涓嚜瀹氫箟鐨勪笓鐢ㄦ枃浠跺す璺緞銆?

## OptiX 鐫€鑹插櫒缂撳瓨闅旂

涓轰簡閬垮厤 Industrial CG Platform 涓庡畼鏂瑰師鐢?Blender 鐗堟湰涔嬮棿浜х敓鐫€鑹插櫒缂栬瘧鍐茬獊鎴栫紦瀛樿繃鏈燂紝鏈骇鍝佽嚜鍔ㄥ皢鍏堕粯璁ょ殑 Nvidia OptiX 缂栬瘧缂撳瓨璺緞涓?stock Blender 杩涜浜嗛殧绂汇€?

- **榛樿缂撳瓨鏂囦欢璺緞**锛?
  `%USERPROFILE%\AppData\Local\IndustrialCGPlatform\Cache\OptiX\optix7cache.db`
- **鐜鍙橀噺瑕嗙洊**锛氬鏋滄偍鐨勭郴缁熶腑鏄惧紡瀹氫箟浜?`OPTIX_CACHE_PATH` 鐜鍙橀噺锛屽畠灏嗚鐩栦骇鍝佺殑榛樿闅旂璺緞骞跺叿鏈夋渶楂樹紭鍏堢骇銆?

## 鍙﹁鍙傞槄

- [浠庢簮鐮佹瀯寤篯(/zh/industrial-cg-platform/guide/building-from-source) 鈥?鑷浠?GitHub 浠撳簱杩涜鏈湴缂栬瘧銆?
- [Blender 鎵嬪唽锛氬湪 Windows 涓婂畨瑁匽(https://docs.blender.org/manual/en/latest/getting_started/installing/windows.html) 鈥?鏍囧噯 Blender 瀹夎鎸囧崡銆?
