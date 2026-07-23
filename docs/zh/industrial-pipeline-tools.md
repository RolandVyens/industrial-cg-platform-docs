---
title: "管线插件与流程工具"
description: "Industrial 3D 生态提供了一系列正片级的开源渲染插件与色彩配置工具，旨在自动构建、简化并打通 Blender 到高端影视特效（VFX）制作的合成与渲染管线。"
---
# 管线插件与流程工具

Industrial 3D 生态提供了一系列正片级的开源渲染插件与色彩配置工具，旨在自动构建、简化并打通 Blender 到高端影视特效（VFX）制作的合成与渲染管线。

---

<div class="tools-grid">
  <!-- AOV Connector -->
  <div class="tool-card">
    <img src="/features/aov.webp" alt="Industrial AOV Connector" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">Industrial AOV Connector</h3>
        <span class="tool-badge">Blender 插件</span>
      </div>
      <p class="tool-desc">
        一键自动创建渲染通道输出树，智能接入降噪节点，并自动导出为完美对接 Nuke 的标准多通道 EXR 结构。
      </p>
      <a href="/zh/industrial-aov-connector/" class="tool-button">阅读插件指南</a>
    </div>
  </div>

  <!-- Light AOV Splitter -->
  <div class="tool-card">
    <img src="/features/light.webp" alt="Industrial Light AOV Splitter" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">Industrial Light AOV Splitter</h3>
        <span class="tool-badge">Blender 插件</span>
      </div>
      <p class="tool-desc">
        自动将渲染的灯光组（Light Groups）通道进行拆分和材质化，为合成师提供对漫反射、高光及环境分量的独立后期重打光自由。
      </p>
      <a href="/zh/industrial-light-aov-splitter/" class="tool-button">阅读拆分器指南</a>
    </div>
  </div>

  <!-- AIO-OCIO -->
  <div class="tool-card">
    <img src="/features/ocio.webp" alt="AIO-OCIO" class="tool-preview" />
    <div class="tool-content">
      <div class="tool-header">
        <h3 class="tool-title">AIO-OCIO</h3>
        <span class="tool-badge">色彩配置</span>
      </div>
      <p class="tool-desc">
        跨 DCC 统一的 OpenColorIO 色彩方案。在 Maya、Nuke、Houdini 和 Blender 中构建完全一致的 AgX/Filmic 宽容度色彩转换。
      </p>
      <a href="/zh/aio-ocio/" class="tool-button">阅读色彩配置指南</a>
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
