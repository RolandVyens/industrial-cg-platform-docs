---
title: "开发追踪与路线图 — Industrial CG Platform"
description: "追踪 Industrial CG Platform（Blender VFX 定制分支）已发布的生产级特性、正在研发中的候选架构升级与未来开发路线图。"
cover: /features/platform.webp
aside: false
---
# 开发追踪

实时追踪 **Industrial CG Platform**（`Blender VFX 定制分支`）已发布的生产级功能、正在推进的候选架构研发以及后续路线图计划。

<div class="ft-summary-grid">
  <div class="ft-stat-card">
    <span class="ft-stat-num ft-stat-brand">5</span>
    <span class="ft-stat-label">已发布生产特性</span>
  </div>
  <div class="ft-stat-card">
    <span class="ft-stat-num ft-stat-cyan">2</span>
    <span class="ft-stat-label">架构研发与验证中</span>
  </div>
  <div class="ft-stat-card">
    <span class="ft-stat-num">4</span>
    <span class="ft-stat-label">路线图规划特性</span>
  </div>
</div>

<div class="ft-chart-card ft-donut-only-card">
  <div class="ft-chart-header">
    <span class="ft-chart-title">生命周期状态分布</span>
    <span class="ft-chart-sub">共追踪 11 项核心特性</span>
  </div>
  <div class="ft-donut-wrap">
    <svg class="ft-donut-svg" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="44" fill="none" stroke="var(--vp-c-bg-mute)" stroke-width="14" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#7c4dff" stroke-width="14" stroke-dasharray="125.66 276.46" stroke-dashoffset="0" transform="rotate(-90 60 60)" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#00e5ff" stroke-width="14" stroke-dasharray="50.27 276.46" stroke-dashoffset="-125.66" transform="rotate(-90 60 60)" />
      <text x="60" y="57" text-anchor="middle" class="ft-donut-num">45.5%</text>
      <text x="60" y="73" text-anchor="middle" class="ft-donut-caption">已交付</text>
    </svg>
    <div class="ft-donut-legend">
      <div class="ft-legend-row">
        <span class="ft-dot ft-dot-brand"></span>
        <span class="ft-legend-name">已发布生产特性</span>
        <span class="ft-legend-val">5 项 (45.5%)</span>
      </div>
      <div class="ft-legend-row">
        <span class="ft-dot ft-dot-cyan"></span>
        <span class="ft-legend-name">正在研发与验证中</span>
        <span class="ft-legend-val">2 项 (18.2%)</span>
      </div>
      <div class="ft-legend-row">
        <span class="ft-dot ft-dot-muted"></span>
        <span class="ft-legend-name">路线图规划中</span>
        <span class="ft-legend-val">4 项 (36.4%)</span>
      </div>
    </div>
  </div>
</div>

---

## 正在研发与候选验证 (In Progress)

<div class="ft-list">
  <div class="ft-card ft-card-active">
    <div class="ft-card-header">
      <div class="ft-title-group">
        <span class="ft-title">Deep EXR 深度渲染架构升级 (v2)</span>
        <span class="ft-module">Cycles · OpenEXR</span>
      </div>
      <span class="ft-badge ft-badge-progress">研发验证中 · Alpha</span>
    </div>
    <p class="ft-desc">
      全面升级 Cycles 的 Deep EXR 深度输出管线，重点解决复杂体积雾（烟火、大气）与高采样镜头下的深度合成难题，大幅提升文件写入稳定性、显存可控性与 Nuke 后期深度合并表现，并提供更轻量的简化色彩重建模式（<code>Simple Mode</code>）。
    </p>
    <div class="ft-progress-block">
      <div class="ft-progress-meta">
        <span class="ft-progress-label">当前研发进度（已进入 Alpha 候选版本实测阶段）</span>
        <span class="ft-progress-pct">80%</span>
      </div>
      <div class="ft-progress-track">
        <span class="ft-progress-fill" style="width: 80%"></span>
      </div>
    </div>
    <div class="ft-milestones">
      <span class="ft-milestone">✓ 核心深度渲染管线重写完成</span>
      <span class="ft-milestone">✓ 简化模式 (<code>Simple Mode</code>) 与多视图输出支持</span>
      <span class="ft-milestone">✓ 体积雾深度精度与半精度 (<code>HALF</code>) 合成表现修复</span>
      <span class="ft-milestone">✓ Alpha 预览版打包完成</span>
      <span class="ft-milestone ft-milestone-pending">→ 复杂生产镜头实测与稳定性打磨中</span>
    </div>
    <div class="ft-links">
      <a href="/blog/posts/2026-10-17-deep-exr-architecture" class="ft-link">阅读工程研发日志 (Devlog) →</a>
      <a href="/zh/industrial-cg-platform/features/deep-exr" class="ft-link ft-link-muted">查看当前稳定版文档</a>
    </div>
  </div>
  <div class="ft-card ft-card-active">
    <div class="ft-card-header">
      <div class="ft-title-group">
        <span class="ft-title">实时世界灯光雾 (<code>Atmosphere Volume</code>)</span>
        <span class="ft-module">World Shader · Cycles Volume</span>
      </div>
      <span class="ft-badge ft-badge-progress">研发验证中 · In Progress</span>
    </div>
    <p class="ft-desc">
      对标 Arnold <code>atmosphere_volume</code> 的实时世界灯光雾（<code>Atmosphere Volume</code>）节点与独立 <code>Atmosphere</code> 渲染通道：以<strong>近乎实时的交互与渲染速度</strong>实现全场景灯光体积雾与光束（丁达尔光 / God Rays），提供直观的浓度、散射染色、吸收衰减、散射方向性与独立采样预算控制，无需承担传统全场景体积路径追踪的高昂耗时即可获得干净可控的空气感与光束效果。
    </p>
    <div class="ft-progress-block">
      <div class="ft-progress-meta">
        <span class="ft-progress-label">当前研发进度（核心节点与画面效果已就绪，正在攻坚实时级性能优化）</span>
        <span class="ft-progress-pct">50%</span>
      </div>
      <div class="ft-progress-track">
        <span class="ft-progress-fill" style="width: 50%"></span>
      </div>
    </div>
    <div class="ft-milestones">
      <span class="ft-milestone">✓ <code>Atmosphere Volume</code> 世界节点与独立 <code>Atmosphere</code> 渲染通道</span>
      <span class="ft-milestone">✓ 美术参数面板（浓度 / 散射与衰减色彩 / 各向异性 / 独立采样）</span>
      <span class="ft-milestone">✓ 点光源、聚光灯与面光源体积光束支持</span>
      <span class="ft-milestone ft-milestone-pending">→ 面向近实时视口交互与高速渲染的性能优化攻坚中</span>
      <span class="ft-milestone ft-milestone-pending">→ 大规模多灯光与面光源下的降噪与收敛打磨中</span>
    </div>
  </div>
</div>

---

## 已发布生产特性 (Released)

<div class="ft-list">
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/deep-exr.webp" alt="Cycles 原生 Deep EXR 深度输出" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Cycles 原生 Deep EXR 深度输出</span>
          <span class="ft-module">Cycles · Compositor · OpenEXR</span>
        </div>
        <span class="ft-badge ft-badge-released">已发布</span>
      </div>
      <p class="ft-desc">
        支持从场景输出或合成器 <code>File Output</code> 节点直接写出逐采样 <code>Z</code>、<code>ZBack</code> 与 <code>RGBA</code> 深度数据，为 Nuke 等下游合成软件提供无损深度合并能力。
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ 原生输出逐采样 <code>Z</code> / <code>ZBack</code> / <code>RGBA</code> 深度通道</span>
        <span class="ft-milestone">✓ 支持 <code>RLE</code> 与 <code>ZIPS</code> 深度压缩格式</span>
        <span class="ft-milestone">✓ 提供合并容差控制与 <code>Deep Tile Budget</code> 显存上限保护</span>
      </div>
      <div class="ft-links">
        <a href="/zh/industrial-cg-platform/features/deep-exr" class="ft-link">阅读功能手册 →</a>
        <a href="/zh/industrial-cg-platform/api/pass-system" class="ft-link ft-link-muted">Pass 系统 API</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/overscan.webp" alt="原生 EXR Overscan 溢画幅" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">原生 EXR Overscan 溢画幅</span>
          <span class="ft-module">Cycles Camera · OpenEXR BBox</span>
        </div>
        <span class="ft-badge ft-badge-released">已发布</span>
      </div>
      <p class="ft-desc">
        在相机画幅框外渲染额外边缘像素，并在 OpenEXR 中独立写入 Data Window 与 Display Window 元数据，供下游镜头反畸变与防抖使用。
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ 支持按百分比或像素宽度扩展渲染画幅边缘</span>
        <span class="ft-milestone">✓ 保持原始相机透视与构图零偏移</span>
        <span class="ft-milestone">✓ 原生写入标准 OpenEXR <code>dataWindow</code> / <code>displayWindow</code></span>
      </div>
      <div class="ft-links">
        <a href="/zh/industrial-cg-platform/features/exr-overscan" class="ft-link">阅读功能手册 →</a>
        <a href="/zh/industrial-cg-platform/api/rna-properties" class="ft-link ft-link-muted">RNA 属性 API</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/lightgroups.webp" alt="灯光组分量通道" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">灯光组分量通道 (Lightgroup Lobe Passes)</span>
          <span class="ft-module">Cycles Kernel · ViewLayer Passes</span>
        </div>
        <span class="ft-badge ft-badge-released">已发布</span>
      </div>
      <p class="ft-desc">
        将每个 Cycles 灯光组拆分为漫反射、光泽、透射与体积的直接光/间接光独立通道，满足后期精细重打光需求。
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ 逐灯光组拆分 <code>Diffuse</code> / <code>Glossy</code> / <code>Transmission</code> / <code>Volume</code></span>
        <span class="ft-milestone">✓ 独立分离直接光 (<code>Direct</code>) 与间接光 (<code>Indirect</code>) 贡献</span>
        <span class="ft-milestone">✓ 严格满足 <code>Combined_&lt;lg&gt; ≈ Σ(Direct + Indirect)</code> 能量守恒</span>
      </div>
      <div class="ft-links">
        <a href="/zh/industrial-cg-platform/features/lightgroup-lobe-passes" class="ft-link">阅读功能手册 →</a>
        <a href="/zh/industrial-cg-platform/api/cycles-kernel" class="ft-link ft-link-muted">Cycles 内核 API</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/shadow-color.webp" alt="美术级阴影颜色控制" class="ft-card-thumb" style="object-position: 15% center;" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">美术级阴影颜色控制 (Shadow Color)</span>
          <span class="ft-module">Cycles Lights · World Shader</span>
        </div>
        <span class="ft-badge ft-badge-released">已发布</span>
      </div>
      <p class="ft-desc">
        提供逐灯光与逐世界环境的阴影色彩调节能力，在不影响非遮挡区域正常照明的前提下单独为阴影着色。
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ 支持逐灯光独立阴影着色 (<code>Light.shadow_color</code>)</span>
        <span class="ft-milestone">✓ 支持世界环境光阴影着色 (<code>World.cycles.shadow_color</code>)</span>
        <span class="ft-milestone">✓ 仅作用于遮挡阴影区域，不污染正常受光面色彩</span>
      </div>
      <div class="ft-links">
        <a href="/zh/industrial-cg-platform/features/shadow-color" class="ft-link">阅读功能手册 →</a>
        <a href="/zh/industrial-cg-platform/api/rna-properties" class="ft-link ft-link-muted">RNA 属性 API</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/viewlayer.webp" alt="Qt 视图层管理器" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Qt 视图层管理器 (ViewLayer Manager)</span>
          <span class="ft-module">bQt · PySide6 · Pipeline UI</span>
        </div>
        <span class="ft-badge ft-badge-released">已发布</span>
      </div>
      <p class="ft-desc">
        基于 Qt 构建的独立顶级视图层管理窗口，专为多视图层复杂镜头的通道预设管理与批量操作设计。
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ 支持 JSON 通道预设导入导出与多视图层批量套用</span>
        <span class="ft-milestone">✓ Cycles / EEVEE 渲染引擎通道面板自适应切换</span>
        <span class="ft-milestone">✓ 独立顶级窗口交互，修改结果实时同步写回 Blender 场景</span>
      </div>
      <div class="ft-links">
        <a href="/zh/industrial-cg-platform/features/viewlayer-manager" class="ft-link">阅读功能手册 →</a>
        <a href="/zh/industrial-cg-platform/api/bqt-usage" class="ft-link ft-link-muted">bQt 使用指南</a>
      </div>
    </div>
  </div>
</div>

---

## 开发路线图与未来规划 (Planned Roadmap)

<div class="ft-roadmap-grid">
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">Cycles Lighting</span>
      <span class="ft-badge ft-badge-planned">规划中</span>
    </div>
    <h3 class="ft-roadmap-title">无直接照明物体 (<code>No Direct Lighting</code>)</h3>
    <p class="ft-roadmap-desc">允许物体关闭直接照明响应、仅参与间接反弹照明（Indirect Light），实现更精准的镜头级补光与反弹控制。</p>
  </div>
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">ViewLayer · Overrides</span>
      <span class="ft-badge ft-badge-planned">规划中</span>
    </div>
    <h3 class="ft-roadmap-title">集合材质覆盖 (<code>Collection Material Override</code>)</h3>
    <p class="ft-roadmap-desc">突破传统全局 ViewLayer 材质覆盖限制，提供面向集合（Collection）与单物体级别的细粒度材质覆盖工作流。</p>
  </div>
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">Cycles Pass · LPE</span>
      <span class="ft-badge ft-badge-planned">规划中</span>
    </div>
    <h3 class="ft-roadmap-title">任意光通路表达式 (LPE) 语法支持</h3>
    <p class="ft-roadmap-desc">在现有固定灯光组分量通道基础上，扩展完整的任意光通路表达式（Light Path Expression）自定义通道提取能力。</p>
  </div>
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">bQt · Platform</span>
      <span class="ft-badge ft-badge-planned">规划中</span>
    </div>
    <h3 class="ft-roadmap-title">Linux 生产环境支持</h3>
    <p class="ft-roadmap-desc">将 Industrial CG Platform 编译打包管线与 bQt 视图层管理器窗口运行环境扩展至 Linux 工作室生产系统。</p>
  </div>
</div>

<style scoped>
.ft-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0 1.25rem;
}
.ft-chart-card {
  background: rgba(255, 255, 255, 0.03);
  border: none;
  border-radius: 12px;
  padding: 1.45rem 1.65rem;
}
.ft-donut-only-card {
  margin-bottom: 1.75rem;
}
.ft-chart-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.2rem;
}
.ft-chart-title {
  font-family: 'Outfit', var(--vp-font-family-base);
  font-size: 1.06rem;
  font-weight: 650;
  color: #f4f6fb;
}
.ft-chart-sub {
  font-family: var(--vp-font-family-base);
  font-size: 0.82rem;
  font-weight: 500;
  color: #8f98aa;
}
.ft-donut-wrap {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.ft-donut-svg {
  width: 112px;
  height: 112px;
  flex-shrink: 0;
}
.ft-donut-num {
  fill: #f4f6fb;
  font-family: 'Outfit', var(--vp-font-family-base);
  font-size: 1.3rem;
  font-weight: 700;
}
.ft-donut-caption {
  fill: #c8ceda;
  font-family: var(--vp-font-family-base);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.ft-donut-legend {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  flex: 1;
  min-width: 0;
}
.ft-legend-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.9rem;
}
.ft-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ft-dot-brand {
  background: #7c4dff;
}
.ft-dot-cyan {
  background: #00e5ff;
}
.ft-dot-muted {
  background: #8f98aa;
}
.ft-legend-name {
  color: #d0d6e2;
  font-weight: 500;
  flex: 1;
  white-space: nowrap;
}
.ft-legend-val {
  font-family: var(--vp-font-family-mono);
  font-size: 0.86rem;
  color: #f4f6fb;
  font-weight: 650;
  white-space: nowrap;
}
.ft-progress-block {
  margin-bottom: 1.05rem;
  padding: 0;
  background: transparent;
  border: none;
}
.ft-progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.45rem;
}
.ft-progress-label {
  font-family: var(--vp-font-family-base);
  font-size: 0.86rem;
  font-weight: 500;
  color: #d0d6e2;
}
.ft-progress-pct {
  font-family: var(--vp-font-family-mono);
  font-size: 0.88rem;
  font-weight: 700;
  color: #00e5ff;
}
.ft-progress-track {
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.ft-progress-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #7c4dff, #00e5ff);
}
.ft-stat-card {
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1.4rem;
  background: rgba(255, 255, 255, 0.03);
  border: none;
  border-radius: 12px;
}
.ft-stat-num {
  font-family: 'Outfit', var(--vp-font-family-base);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  color: #f4f6fb;
  margin-bottom: 0.4rem;
}
.ft-stat-brand {
  color: var(--vp-c-brand-1);
}
.ft-stat-cyan {
  color: #00e5ff;
}
.ft-stat-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #c8ceda;
}
.ft-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 1.25rem 0 2rem;
}
.ft-card {
  background: rgba(255, 255, 255, 0.028);
  border: none;
  border-radius: 12px;
  padding: 1.45rem 1.6rem;
  transition: transform 0.25s ease, background-color 0.25s ease;
}
.ft-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.045);
}
.ft-card-active {
  background: rgba(255, 255, 255, 0.035);
}
.ft-card-media {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1.35rem;
  align-items: flex-start;
}
.ft-card-thumb-wrap {
  width: 160px;
  height: 104px;
  border-radius: 8px;
  overflow: hidden;
  border: none;
  background: rgba(0, 0, 0, 0.25);
  flex-shrink: 0;
}
.ft-card-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ft-card-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
@media (max-width: 720px) {
  .ft-card-media {
    grid-template-columns: 1fr;
  }
  .ft-card-thumb-wrap {
    width: 100%;
    height: 140px;
  }
  .ft-donut-wrap {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
.ft-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}
.ft-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
  flex: 1;
  min-width: 0;
}
.ft-title {
  font-family: 'Outfit', var(--vp-font-family-base);
  font-size: 1.18rem;
  font-weight: 650;
  color: #f4f6fb;
}
.ft-module {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  font-weight: 500;
  color: #8f98aa;
}
.ft-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  border: none;
}
.ft-badge-released {
  background: rgba(124, 77, 255, 0.16);
  color: #b39ddb;
}
.ft-badge-progress {
  background: rgba(0, 229, 255, 0.12);
  color: #00e5ff;
}
.ft-badge-planned {
  background: rgba(255, 255, 255, 0.06);
  color: #c8ceda;
}
.ft-desc {
  margin: 0 0 0.85rem 0 !important;
  font-size: 0.93rem;
  line-height: 1.65;
  color: #c8ceda;
}
.ft-milestones {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.9rem;
  padding: 0;
  border: none;
}
.ft-milestone {
  font-family: var(--vp-font-family-base);
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.55;
  padding: 0.08rem 0;
  background: transparent;
  border: none;
  color: #d0d6e2;
}
.ft-milestone-pending {
  background: transparent;
  border: none;
  color: #00e5ff;
  font-weight: 600;
}
.ft-card :deep(code) {
  background: rgba(255, 255, 255, 0.06);
  border: none;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-size: 0.84em;
  color: #f4f6fb;
}
.ft-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
  padding-top: 0.35rem;
  margin-top: auto;
  border: none;
}
.ft-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: #9e7aff;
  text-decoration: none !important;
}
.ft-link:hover {
  opacity: 0.85;
}
.ft-link-muted {
  color: #8f98aa !important;
  font-weight: 500;
  text-decoration: none;
}
.ft-link-muted:hover {
  color: #f4f6fb !important;
}
.ft-roadmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  margin: 1.25rem 0 3rem;
}
.ft-roadmap-item {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.028);
  border: none;
  border-radius: 12px;
  padding: 1.35rem 1.45rem;
  transition: transform 0.25s ease, background-color 0.25s ease;
}
.ft-roadmap-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.045);
}
.ft-roadmap-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.7rem;
}
.ft-roadmap-title {
  margin: 0 0 0.55rem 0 !important;
  font-size: 1.1rem;
  font-weight: 650;
  color: #f4f6fb;
}
.ft-roadmap-desc {
  margin: 0 !important;
  font-size: 0.92rem;
  line-height: 1.65;
  color: #c8ceda;
}
</style>
