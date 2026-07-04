# 鍋忓ソ璁剧疆涓庤缁嗛厤缃?
鏈〉灏嗚缁嗚В閲?**Industrial AOV Connector** 鍋忓ソ璁剧疆涓殑鏍稿績鍔熻兘銆佹€ц兘浼樺寲閫夐」鍙婅緭鍑虹鐞嗗伐鍏枫€?
---

## **鏍稿績鍔熻兘璁剧疆 (Core Function)**

<img width="400" alt="鏍稿績鍔熻兘璁剧疆" src="https://github.com/user-attachments/assets/9fa6bb66-417a-4c57-a933-9a5ed51d6764" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Denoise DiffCol / GlossCol / TransCol (棰滆壊閫氶亾闄嶅櫔)**
瀵瑰钩娑傜函鑹查€氶亾锛坄DiffCol` / `GlossCol` / `TransCol` 绛夐鑹?AOV锛夎繘琛岄檷鍣鐞嗭紝鑳藉鏈夋晥鎻愬崌鍚庢湡鍚堟垚闄ゆ硶璁＄畻鐨勭簿搴︺€?
### 2. **Use Old EXR Layer Naming Convention (鏃х増 EXR 鍛藉悕)**
寮哄埗浣跨敤鏃х増锛堝吋瀹?2.4.x 鍙婁互涓嬬増鏈級鐨?EXR 灞傜骇鍛藉悕瑙勮寖銆傜敱浜庢柊鐗堝眰绾у懡鍚嶅湪 Nuke 涓叿鏈夋瀬浣崇殑鍙鎬э紝閫氬父寤鸿淇濇寔鍏抽棴姝ら€夐」銆?
### 3. **Only Create Nodes For Enabled Viewlayers (浠呬负鍚敤灞傜敓鎴愯妭鐐?**
浠呬负鍕鹃€変簡 `Use For Rendering` (鐢ㄤ簬娓叉煋) 鐨勮鍥惧眰鐢熸垚鍚堟垚鑺傜偣锛屼粠鑰岃妭鐪佸悎鎴愮紪杈戝櫒鐨勮妭鐐圭┖闂村拰鐢熸垚閫熷害銆?
### 4. **Auto Optimize Sample Count For Data Layers (鑷姩浼樺寲鏁版嵁灞傞噰鏍?**
鍚敤鍚庯紝鎻掍欢鍦ㄧ儤鐒欒妭鐐规爲鏃朵細涓轰笁缁存暟鎹眰搴旂敤 **閲囨牱鐜囪鐩?(sample count override)**銆傜敱浜庢暟鎹€氶亾锛堝娉曠嚎銆佸潗鏍囷級涓嶉渶瑕丅eauty灞傞偅涔堥珮鐨勯噰鏍锋暟锛岃繖鑳芥瀬澶х缉鐭暣浣撴覆鏌撴椂闂淬€傛偍鍙互鍦ㄦ澶勮瀹氭暟鎹眰涓撶敤鐨勯噰鏍锋暟銆?
### 5. **Custom Name Suffix (鑷畾涔夊悕绉板悗缂€)**
鍏佽鍦ㄨ緭鍑虹殑鏂囦欢鍚嶇О涓坊鍔犺嚜瀹氫箟鍚庣紑銆備緥濡備娇鐢?`#` 鏉ュ畾涔夊抚鏁板崰浣嶇锛堝抚琛ラ浂锛夈€傚悓鏃讹紝鎻掍欢鏀寔鍦ㄦ覆鏌撴椂鑷姩瑙ｆ瀽鐨勫姩鎬佸彉閲忓崰浣嶇锛?*   `$scene$` 鈥?鍦烘櫙鍚嶇О
*   `$file$` 鈥?Blender宸ョ▼鏂囦欢鍚?*   `$camera$` 鈥?褰撳墠婵€娲荤殑鎽勫儚鏈哄悕绉?*   `$version$` 鈥?鑷姩鍖归厤鐗堟湰鍙凤紙瑕佹眰鎮ㄧ殑 blend 宸ョ▼鏂囦欢鍚嶇粨灏惧甫鏈夌被浼?**`v001`** 鐨勭増鏈瓧绗︼級銆?
*鎺ㄨ崘鐨勫悗缂€鎼厤锛? `$camera$_$version$_###`

### 6. **Node Interval Scale When Arranging (鑺傜偣闂磋窛缂╂斁)**
璁剧疆鏁寸悊鑺傜偣鏃剁殑闂磋窛姣斾緥锛岀敤浜庤ˉ鍋挎搷浣滅郴缁熺殑鏄剧ず缂╂斁銆備緥濡傚湪 Windows 寮€鍚簡 150% (1.5x) 鐨?DPI 缂╂斁鏃讹紝灏嗘鍊艰涓?`0.67` 鍙互鐢熸垚鎺掔増瀹岀編鐨勮妭鐐归棿璺濓紝闃叉闂磋窛杩囧ぇ銆?
---

## **杈撳嚭宸ュ叿璁剧疆 (Output Tools)**

<img width="400" alt="杈撳嚭宸ュ叿璁剧疆" src="https://github.com/user-attachments/assets/ffa908d7-e51f-4367-8544-2ec1629dbe2a" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

### 1. **Default useless renders gather (鏃犵敤娓叉煋閲嶅畾鍚?**
鑷姩灏?Blender 榛樿鐨勫父瑙勬覆鏌撹緭鍑鸿矾寰勪慨鏀瑰埌宸ョ▼鐩綍涓嬬殑 `trash_output` 瀛愭枃浠跺す锛岄伩鍏嶆薄鏌撴偍鐨勬寮忎氦浠樼洰褰曘€?
### 2. **Show useless renders clean button (鏄剧ず鏃犵敤娓叉煋娓呯悊鎸夐挳)**
寮€鍚悗锛屽皢鍦ㄦ彃浠堕潰鏉跨殑 Output Tools 涓嬫樉绀?`Delete Useless Default Renders` 鎸夐挳锛屼竴閿墿鐞嗗垹闄?`trash_output` 鏁翠釜鍨冨溇鏂囦欢澶广€?
---

## **澶栬璁剧疆 (Appearance)**

<img width="400" alt="澶栬璁剧疆" src="https://github.com/user-attachments/assets/cefe5d71-8107-4109-b097-34c9872092eb" style="border: 1px solid var(--vp-c-divider); border-radius: 8px; margin: 1.5rem 0;" />

鐢ㄤ簬鎺у埗闈㈡澘鍚勫尯鍩熺殑涓婚閰嶈壊銆佹樉绀哄紑鍏冲拰鏍峰紡椋庢牸銆?