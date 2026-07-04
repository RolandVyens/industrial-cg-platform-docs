# 绠＄嚎鎻掍欢涓庢祦绋嬪伐鍏?
Industrial 3D 鐢熸€佹彁渚涗簡涓€绯诲垪姝ｇ墖绾х殑寮€婧愭覆鏌撴彃浠朵笌鑹插僵閰嶇疆宸ュ叿锛屾棬鍦ㄨ嚜鍔ㄦ瀯寤恒€佺畝鍖栧苟鎵撻€?Blender 鍒伴珮绔奖瑙嗙壒鏁堬紙VFX锛夊埗浣滅殑鍚堟垚涓庢覆鏌撶绾裤€?
---

<div class="tools-grid">
  <!-- AOV Connector -->
  <div class="tool-card">
    <img src="https://github.com/RolandVyens/Industrial-AOV-Connector/assets/30930721/95a2f623-6158-438b-aaa7-34e6ac099c47" alt="Industrial AOV Connector" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">Industrial AOV Connector</h3>
        <span class="tool-badge">Blender 鎻掍欢</span>
      </div>
      <p class="tool-desc">
        涓€閿嚜鍔ㄥ垱寤烘覆鏌撻€氶亾杈撳嚭鏍戯紝鏅鸿兘鎺ュ叆闄嶅櫔鑺傜偣锛屽苟鑷姩瀵煎嚭涓哄畬缇庡鎺?Nuke 鐨勬爣鍑嗗閫氶亾 EXR 缁撴瀯銆?      </p>
      <a href="/zh/industrial-aov-connector/" class="tool-button">闃呰鎻掍欢鎸囧崡</a>
    </div>
  </div>

  <!-- Light AOV Splitter -->
  <div class="tool-card">
    <img src="https://github.com/user-attachments/assets/7900602f-d222-400d-87c9-00e2506aea4a" alt="Industrial Light AOV Splitter" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">Industrial Light AOV Splitter</h3>
        <span class="tool-badge">Blender 鎻掍欢</span>
      </div>
      <p class="tool-desc">
        鑷姩灏嗘覆鏌撶殑鐏厜缁勶紙Light Groups锛夐€氶亾杩涜鎷嗗垎鍜屾潗璐ㄥ寲锛屼负鍚堟垚甯堟彁渚涘婕弽灏勩€侀珮鍏夊強鐜鍒嗛噺鐨勭嫭绔嬪悗鏈熼噸鎵撳厜鑷敱銆?      </p>
      <a href="/zh/industrial-light-aov-splitter/" class="tool-button">闃呰鎷嗗垎鍣ㄦ寚鍗?/a>
    </div>
  </div>

  <!-- AIO-OCIO -->
  <div class="tool-card">
    <img src="https://github.com/user-attachments/assets/461f6a96-af0b-4680-b531-b988667c4e19" alt="AIO-OCIO" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">AIO-OCIO</h3>
        <span class="tool-badge">鑹插僵閰嶇疆</span>
      </div>
      <p class="tool-desc">
        璺?DCC 缁熶竴鐨?OpenColorIO 鑹插僵鏂规銆傚湪 Maya銆丯uke銆丠oudini 鍜?Blender 涓瀯寤哄畬鍏ㄤ竴鑷寸殑 AgX/Filmic 瀹藉搴﹁壊褰╄浆鎹€?      </p>
      <a href="/zh/aio-ocio/" class="tool-button">闃呰鑹插僵閰嶇疆鎸囧崡</a>
    </div>
  </div>
</div>

<style scoped>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
}
.tool-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.01);
}
.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
  border-color: var(--vp-c-brand);
}
.tool-preview {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
  aspect-ratio: 1200/600;
  object-fit: cover;
}
.tool-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.tool-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
.tool-title {
  margin: 0 !important;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.tool-badge {
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}
.tool-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}
.tool-button {
  text-align: center;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  text-decoration: none !important;
  transition: background-color 0.2s, color 0.2s;
}
.tool-button:hover {
  background: var(--vp-c-brand-1);
  color: #ffffff !important;
}
</style>
