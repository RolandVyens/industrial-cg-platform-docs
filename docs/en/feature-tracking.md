---
title: "Development Tracking & Roadmap — Industrial CG Platform"
description: "Track released production features, active candidate R&D, and planned roadmap items for the Industrial CG Platform Blender VFX fork."
cover: /features/platform.webp
aside: false
---
# Development Tracking

Track the production status, active candidate R&D, and upcoming roadmap milestones across **Industrial CG Platform** (`Blender VFX Branch`).

<div class="ft-summary-grid">
  <div class="ft-stat-card">
    <span class="ft-stat-num ft-stat-brand">6</span>
    <span class="ft-stat-label">Released in Stable</span>
  </div>
  <div class="ft-stat-card">
    <span class="ft-stat-num ft-stat-cyan">2</span>
    <span class="ft-stat-label">In Progress (Active R&amp;D)</span>
  </div>
  <div class="ft-stat-card">
    <span class="ft-stat-num">3</span>
    <span class="ft-stat-label">Planned on Roadmap</span>
  </div>
</div>

<div class="ft-chart-card ft-donut-only-card">
  <div class="ft-chart-header">
    <span class="ft-chart-title">Lifecycle Distribution</span>
    <span class="ft-chart-sub">11 Tracked Features</span>
  </div>
  <div class="ft-donut-wrap">
    <svg class="ft-donut-svg" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="44" fill="none" stroke="var(--vp-c-bg-mute)" stroke-width="14" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#7c4dff" stroke-width="14" stroke-dasharray="150.80 276.46" stroke-dashoffset="0" transform="rotate(-90 60 60)" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#00e5ff" stroke-width="14" stroke-dasharray="50.27 276.46" stroke-dashoffset="-150.80" transform="rotate(-90 60 60)" />
      <text x="60" y="57" text-anchor="middle" class="ft-donut-num">54.5%</text>
      <text x="60" y="73" text-anchor="middle" class="ft-donut-caption">Shipped</text>
    </svg>
    <div class="ft-donut-legend">
      <div class="ft-legend-row">
        <span class="ft-dot ft-dot-brand"></span>
        <span class="ft-legend-name">Released in Stable</span>
        <span class="ft-legend-val">6 (54.5%)</span>
      </div>
      <div class="ft-legend-row">
        <span class="ft-dot ft-dot-cyan"></span>
        <span class="ft-legend-name">In Progress R&amp;D</span>
        <span class="ft-legend-val">2 (18.2%)</span>
      </div>
      <div class="ft-legend-row">
        <span class="ft-dot ft-dot-muted"></span>
        <span class="ft-legend-name">Planned Roadmap</span>
        <span class="ft-legend-val">3 (27.3%)</span>
      </div>
    </div>
  </div>
</div>

---

## Active Candidate R&D (In Progress)

<div class="ft-list">
  <div class="ft-card ft-card-active">
    <div class="ft-card-header">
      <div class="ft-title-group">
        <span class="ft-title">Real-Time World Light Fog (<code>Atmosphere Volume</code>)</span>
        <span class="ft-module">World Shader · Cycles Volume</span>
      </div>
      <span class="ft-badge ft-badge-progress">In Progress · Active R&amp;D</span>
    </div>
    <p class="ft-desc">
      An Arnold-style <code>Atmosphere Volume</code> World shader node and dedicated <code>Atmosphere</code> render pass delivering volumetric light beams (God Rays) and atmospheric depth at <strong>near-real-time speed</strong>—offering intuitive density, scatter tint, attenuation color, directionality, and independent sample controls without the heavy cost of traditional full-scene volumetric path tracing.
    </p>
    <div class="ft-progress-block">
      <div class="ft-progress-meta">
        <span class="ft-progress-label">Development Progress (Core Node &amp; Look Ready, Optimizing Toward Real-Time Performance)</span>
        <span class="ft-progress-pct">50%</span>
      </div>
      <div class="ft-progress-track">
        <span class="ft-progress-fill" style="width: 50%"></span>
      </div>
    </div>
    <div class="ft-milestones">
      <span class="ft-milestone">✓ <code>Atmosphere Volume</code> World Node &amp; Dedicated <code>Atmosphere</code> Pass</span>
      <span class="ft-milestone">✓ Artist Controls (Density / Scatter &amp; Attenuation Color / Anisotropy / Samples)</span>
      <span class="ft-milestone">✓ Point, Spot &amp; Area Light Volumetric Beam Support</span>
      <span class="ft-milestone ft-milestone-pending">→ Performance Optimization Toward Near-Real-Time Viewport &amp; Render Speed</span>
      <span class="ft-milestone ft-milestone-pending">→ Multi-Light &amp; Area Light Noise Reduction &amp; Convergence Polish</span>
    </div>
  </div>
  <div class="ft-card ft-card-active">
    <div class="ft-card-header">
      <div class="ft-title-group">
        <span class="ft-title">Linux Platform Support</span>
        <span class="ft-module">bQt · Platform · Build Pipeline</span>
      </div>
      <span class="ft-badge ft-badge-progress">In Progress · Active R&amp;D</span>
    </div>
    <p class="ft-desc">
      Extending the Industrial CG Platform build pipeline, Cycles GPU/Deep EXR runtime, and bQt ViewLayer Manager window integration to Linux studio environments (targeting Rocky Linux 9 / X11).
    </p>
    <div class="ft-progress-block">
      <div class="ft-progress-meta">
        <span class="ft-progress-label">Development Progress (Base Production Environment Only)</span>
        <span class="ft-progress-pct">5%</span>
      </div>
      <div class="ft-progress-track">
        <span class="ft-progress-fill" style="width: 5%"></span>
      </div>
    </div>
    <div class="ft-milestones">
      <span class="ft-milestone">✓ Base Linux Production Environment Setup</span>
    </div>
  </div>
</div>

---

## Released Production Features

<div class="ft-list">
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/deep-exr.webp" alt="Native Cycles Deep EXR Output" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Native Cycles Deep EXR Output</span>
          <span class="ft-module">Cycles · Compositor · OpenEXR</span>
        </div>
        <span class="ft-badge ft-badge-released">Released</span>
      </div>
      <p class="ft-desc">
        Writes per-sample <code>Z</code>, <code>ZBack</code>, and <code>RGBA</code> depth data directly from Cycles scene output or Compositor <code>File Output</code> nodes for lossless deep compositing in Nuke.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ Native per-sample <code>Z</code> / <code>ZBack</code> / <code>RGBA</code> deep channel output</span>
        <span class="ft-milestone">✓ <code>RLE</code> and <code>ZIPS</code> OpenEXR deep compression support</span>
        <span class="ft-milestone">✓ Configurable merge tolerances and <code>Deep Tile Budget</code> memory capping</span>
      </div>
      <div class="ft-links">
        <a href="/en/industrial-cg-platform/features/deep-exr" class="ft-link">Feature Manual →</a>
        <a href="/en/industrial-cg-platform/api/pass-system" class="ft-link ft-link-muted">Pass System API</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/blog/nuke-deep-compositing.webp" alt="Deep EXR Architecture Upgrade (v2)" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Deep EXR Architecture Upgrade (v2)</span>
          <span class="ft-module">Cycles · OpenEXR</span>
        </div>
        <span class="ft-badge ft-badge-released">Released · 5.2.4 LTS</span>
      </div>
      <p class="ft-desc">
        Upgrades the Cycles Deep EXR pipeline for improved rendering and compositing performance, cleaner volume-slice Alpha behavior, and configurable <code>Simple</code> / <code>Physical</code> color modes under <strong>Render Properties → Performance → Deep</strong>.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ Core Deep Rendering Pipeline Rebuilt &amp; Volume-Slice Alpha Improved</span>
        <span class="ft-milestone">✓ <code>Simple Mode</code> (Default) &amp; <code>Physical Mode</code> Native Color Capture</span>
        <span class="ft-milestone">✓ Shipped in Industrial CG Platform 5.2.4 LTS</span>
      </div>
      <div class="ft-links">
        <a href="/en/industrial-cg-platform/features/deep-exr" class="ft-link">Feature Manual →</a>
        <a href="/blog/posts/2026-10-17-deep-exr-architecture" class="ft-link ft-link-muted">Engineering Devlog</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/overscan.webp" alt="Native EXR Overscan" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Native EXR Overscan</span>
          <span class="ft-module">Cycles Camera · OpenEXR BBox</span>
        </div>
        <span class="ft-badge ft-badge-released">Released</span>
      </div>
      <p class="ft-desc">
        Renders extra margin pixels outside the camera frustum and writes decoupled OpenEXR Data Window and Display Window metadata for downstream lens distortion and stabilization.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ Configurable overscan margins by percentage or pixel width</span>
        <span class="ft-milestone">✓ Preserves original camera perspective and framing without shift</span>
        <span class="ft-milestone">✓ Writes standard OpenEXR <code>dataWindow</code> and <code>displayWindow</code> metadata</span>
      </div>
      <div class="ft-links">
        <a href="/en/industrial-cg-platform/features/exr-overscan" class="ft-link">Feature Manual →</a>
        <a href="/en/industrial-cg-platform/api/rna-properties" class="ft-link ft-link-muted">RNA Properties API</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/lightgroups.webp" alt="Lightgroup Lobe Passes" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Lightgroup Lobe Passes</span>
          <span class="ft-module">Cycles Kernel · ViewLayer Passes</span>
        </div>
        <span class="ft-badge ft-badge-released">Released</span>
      </div>
      <p class="ft-desc">
        Splits each Cycles Lightgroup into <code>Diffuse</code>, <code>Glossy</code>, <code>Transmission</code>, and <code>Volume</code> direct and indirect passes for granular Nuke relighting.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ Per-lightgroup <code>Diffuse</code> / <code>Glossy</code> / <code>Transmission</code> / <code>Volume</code> split</span>
        <span class="ft-milestone">✓ Independent <code>Direct</code> and <code>Indirect</code> illumination separation</span>
        <span class="ft-milestone">✓ Preserves <code>Combined_&lt;lg&gt; ≈ Σ(Direct + Indirect)</code> energy balance</span>
      </div>
      <div class="ft-links">
        <a href="/en/industrial-cg-platform/features/lightgroup-lobe-passes" class="ft-link">Feature Manual →</a>
        <a href="/en/industrial-cg-platform/api/cycles-kernel" class="ft-link ft-link-muted">Cycles Kernel API</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/shadow-color.webp" alt="Artistic Shadow Color" class="ft-card-thumb" style="object-position: 15% center;" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Artistic Shadow Color</span>
          <span class="ft-module">Cycles Lights · World Shader</span>
        </div>
        <span class="ft-badge ft-badge-released">Released</span>
      </div>
      <p class="ft-desc">
        Per-light and per-world shadow tinting controls in Cycles that color occluded shadow regions without altering unoccluded illumination.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ Per-light shadow tinting control (<code>Light.shadow_color</code>)</span>
        <span class="ft-milestone">✓ World environment shadow tinting (<code>World.cycles.shadow_color</code>)</span>
        <span class="ft-milestone">✓ Affects occluded shadows only without tinting lit surfaces</span>
      </div>
      <div class="ft-links">
        <a href="/en/industrial-cg-platform/features/shadow-color" class="ft-link">Feature Manual →</a>
        <a href="/en/industrial-cg-platform/api/rna-properties" class="ft-link ft-link-muted">RNA Properties API</a>
      </div>
    </div>
  </div>
  <div class="ft-card ft-card-media">
    <div class="ft-card-thumb-wrap">
      <img src="/features/viewlayer.webp" alt="Qt ViewLayer Manager" class="ft-card-thumb" loading="lazy" />
    </div>
    <div class="ft-card-body">
      <div class="ft-card-header">
        <div class="ft-title-group">
          <span class="ft-title">Qt ViewLayer Manager</span>
          <span class="ft-module">bQt · PySide6 · Pipeline UI</span>
        </div>
        <span class="ft-badge ft-badge-released">Released</span>
      </div>
      <p class="ft-desc">
        Dedicated top-level Qt window for managing multi-ViewLayer shots with JSON pass presets, batch operations, and live scene write-back.
      </p>
      <div class="ft-milestones">
        <span class="ft-milestone">✓ JSON pass preset import/export and batch multi-ViewLayer apply</span>
        <span class="ft-milestone">✓ Engine-adaptive Cycles and EEVEE pass panel visibility</span>
        <span class="ft-milestone">✓ Standalone Qt window with instant live write-back to Blender</span>
      </div>
      <div class="ft-links">
        <a href="/en/industrial-cg-platform/features/viewlayer-manager" class="ft-link">Feature Manual →</a>
        <a href="/en/industrial-cg-platform/api/bqt-usage" class="ft-link ft-link-muted">bQt Guide</a>
      </div>
    </div>
  </div>
</div>

---

## Planned Roadmap

<div class="ft-roadmap-grid">
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">Cycles Lighting</span>
      <span class="ft-badge ft-badge-planned">Planned</span>
    </div>
    <h3 class="ft-roadmap-title">No Direct Lighting</h3>
    <p class="ft-roadmap-desc">Object-level lighting flags that exclude direct illumination and restrict contributions strictly to indirect bounce lighting for targeted shot-level fill control.</p>
  </div>
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">ViewLayer · Overrides</span>
      <span class="ft-badge ft-badge-planned">Planned</span>
    </div>
    <h3 class="ft-roadmap-title">Collection Material Override</h3>
    <p class="ft-roadmap-desc">Granular per-collection and per-object material override workflows beyond global ViewLayer overrides for complex holdout and utility pass setups.</p>
  </div>
  <div class="ft-roadmap-item">
    <div class="ft-roadmap-top">
      <span class="ft-module">Cycles Pass · LPE</span>
      <span class="ft-badge ft-badge-planned">Planned</span>
    </div>
    <h3 class="ft-roadmap-title">Arbitrary Light Path Expressions (LPE)</h3>
    <p class="ft-roadmap-desc">Custom LPE syntax support extending beyond fixed Lightgroup lobe splits for specialized studio AOV extraction.</p>
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
