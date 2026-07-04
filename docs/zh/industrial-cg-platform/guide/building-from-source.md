# 浠庢簮鐮佹瀯寤?

## 鍓嶇疆渚濊禆鏉′欢

| 宸ュ叿 | 鐗堟湰瑕佹眰 | 澶囨敞 |
| --- | --- | --- |
| **Visual Studio** | 2022 (17.x) | 蹇呴』鍕鹃€夆€滀娇鐢?C++ 鐨勬闈㈠紑鍙戔€濆伐浣滆礋杞?|
| **CMake** | 3.24+ | Visual Studio 鑷甫鎴栫嫭绔嬪畨瑁呯増鏈潎鍙?|
| **Ninja** | 1.11+ | 寮虹儓鎺ㄨ崘鐨勮交閲忕骇鏋勫缓绯荤粺 |
| **Git** | 2.30+ | 蹇呴』闆嗘垚 Git LFS 鏀寔 |
| **Python** | 3.13 | 鐢?Blender 鐨勬瀯寤虹郴缁熻嚜鍔ㄨ幏鍙栧苟绠＄悊 |

## 鍏嬮殕浠撳簱

```powershell
git clone https://github.com/RolandVyens/industrial-cg-platform.git
cd industrial-cg-platform
```

## 鑾峰彇缂栬瘧渚濊禆

Blender 缂栬瘧闇€瑕佸ぇ閲忕殑棰勭紪璇戦潤鎬佸簱銆傝繍琛屼互涓嬪懡浠や互鎷夊彇瀹樻柟渚濊禆锛?

```powershell
make update
```

杩欎細鑷姩浠?Blender 瀹樻柟鐨?SVN 浠撳簱涓媺鍙栧搴旂殑 `lib/windows_x64` 棰勭紪璇戜緷璧栥€?

::: warning LFS 璧勬簮姘村悎鎷︽埅 (LFS Hydration Gate)
鍦ㄥ紑濮嬬紪璇戝墠锛岃鍔″繀楠岃瘉浠撳簱涓嚜甯︾殑 LFS 浜岃繘鍒惰祫浜ф槸鍚﹀凡琚纭€滄按鍚堚€濓紙鍗充笅杞戒负鐪熷疄鐨勫疄浣撴枃浠惰€岄潪鎸囬拡瀛樻牴锛夈€傝妫€鏌ヤ互涓嬭矾寰勭殑鏂囦欢鏄惁鍖呭惈浜嗘寚閽堝瓨鏍规枃鏈細

- `assets/`
- `release/datafiles/`
- `scripts/startup/bl_app_templates_system/`

濡傛灉浠讳綍璧勪骇鏂囦欢浠呭寘鍚?`version https://git-lfs.github.com/spec/v1` 鐨勭函鏂囨湰鍐呭锛岃〃绀哄叾浠嶄负瀛樻牴鐘舵€侊紝鎮ㄩ渶瑕佸厛浠庡彲淇＄殑 Git 婧愬鍏惰繍琛?`git lfs pull` 浠ュ畬鎴愭按鍚堛€?
:::

## 閰嶇疆缂栬瘧鍙傛暟

浣跨敤 Ninja 缂栬瘧绯荤粺杩涜 CMake 閰嶇疆锛堝畼鏂规帹鑽愯矾寰勶級锛?

```powershell
# 蹇呴』棣栧厛鍔犺浇 Visual Studio 寮€鍙戣€呯幆澧冨懡浠よ鐜
& "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat"

cmake -G Ninja -B build -S . `
  -DCMAKE_BUILD_TYPE=Release `
  -DWITH_CYCLES_CUDA_BINARIES=ON `
  -DCYCLES_CUDA_BINARIES_ARCH=sm_89 `
  -DWITH_CYCLES_DEVICE_OPTIX=ON
```

::: tip
璇锋牴鎹偍鏈満鐨勫叿浣?GPU 鏄惧崱鏋舵瀯鏋舵瀯锛屽皢 `sm_89` 鏇挎崲涓虹浉搴旂殑璁＄畻鑳藉姏锛圕ompute Capability锛夛細
- RTX 4080/4090锛歚sm_89`
- RTX 3080/3090锛歚sm_86`
- RTX 2080锛歚sm_75`
:::

## 鎵ц缂栬瘧

```powershell
cmake --build build --target blender
```

## 瀹夎

```powershell
cmake --install build --prefix install
```

缂栬瘧杈撳嚭鐨勮繍琛屾椂鐜浼氳鎻愬彇骞跺畨瑁呭湪 `install/` 鐩綍涓嬨€?

## 楠岃瘉

```powershell
.\install\blender.exe --version
```

## 宸茬煡鏋勫缓娉ㄦ剰浜嬮」 (Known Build Notes)

- **寮虹儓寤鸿浣跨敤 Ninja** 鈥?浼犵粺鐨?Visual Studio 瑙ｅ喅鏂规鐢熸垚鍣ㄥ湪杩涜缂栬瘧鍣?ID 鎺㈡祴锛坈ompiler-ID detection锛夋椂锛屽彲鑳戒細鍥犱负宸ヤ綔绔欐湰鍦扮殑 `Tracker.exe` 鍐茬獊鑰屽交搴曟寕璧枫€備娇鐢?VS 寮€鍙戣€呯粓绔姞杞?Ninja 鏄粡杩囦弗瀵嗛獙璇佺殑瀹樻柟榛樿鏋勫缓璺緞銆?
- **`TrackFileAccess=false`** 鈥?濡傛灉鎮ㄥ繀椤荤洿鎺ヤ娇鐢?MSBuild锛岃鍔″繀鍦ㄥ懡浠よ鍙傛暟涓紶鍏?`/p:TrackFileAccess=false`锛屼互閬垮厤 MSBuild Tracker 鎸傝捣銆?
- **PDB 绗﹀彿鐢熸垚澶辫触** 鈥?鍦ㄧ敓鎴?Release 鏋勫缓鏃讹紝鍙兘浼氬洜涓?PDB 绗﹀彿鏂囦欢浣撶Н搴炲ぇ鑰屽湪鐢熸垚闃舵瑙﹀彂 `LNK1318` 杩炴帴鍣ㄩ敊璇€傝嫢閬囧埌姝ら棶棰橈紝寤鸿浼犲叆 `-DWITH_WINDOWS_RELEASE_PDB=OFF` 绂佺敤 PDB 绗﹀彿鐢熸垚銆?

## 鍙﹁鍙傞槄

- [Blender 寮€鍙戣€呮墜鍐岋細鏋勫缓 Blender](https://developer.blender.org/docs/handbook/building_blender/) 鈥?瀹樻柟 Blender 婧愮爜鏋勫缓鍙傝€冩枃妗ｃ€?
- [瀹夎](/zh/industrial-cg-platform/guide/installation) 鈥?浠庨缂栬瘧濂界殑 Release 鍖呭揩閫熷畨瑁呫€?
