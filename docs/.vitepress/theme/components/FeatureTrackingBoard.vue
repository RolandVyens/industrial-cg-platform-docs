<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as tracking } from '../../../feature-tracking.data.js'

type LocaleCode = 'en' | 'zh' | 'fr'

const props = withDefaults(
  defineProps<{
    locale?: LocaleCode
  }>(),
  {
    locale: 'en',
  }
)

const UI_COPY: Record<
  LocaleCode,
  {
    statReleased: string
    statInProgress: string
    statPlanned: string
    chartTitle: string
    chartSub: (total: number) => string
    donutCaption: string
    legendReleased: string
    legendInProgress: string
    legendPlanned: string
    formatCountVal: (count: number, pct: string) => string
    sectionInProgress: string
    sectionReleased: string
    sectionPlanned: string
  }
> = {
  en: {
    statReleased: 'Released in Stable',
    statInProgress: 'In Progress (Active R&D)',
    statPlanned: 'Planned on Roadmap',
    chartTitle: 'Lifecycle Distribution',
    chartSub: (total) => `${total} Tracked Features`,
    donutCaption: 'Shipped',
    legendReleased: 'Released in Stable',
    legendInProgress: 'In Progress R&D',
    legendPlanned: 'Planned Roadmap',
    formatCountVal: (count, pct) => `${count} (${pct}%)`,
    sectionInProgress: 'Active Candidate R&D (In Progress)',
    sectionReleased: 'Released Production Features',
    sectionPlanned: 'Planned Roadmap',
  },
  zh: {
    statReleased: '已发布生产特性',
    statInProgress: '架构研发与验证中',
    statPlanned: '路线图规划特性',
    chartTitle: '生命周期状态分布',
    chartSub: (total) => `共追踪 ${total} 项核心特性`,
    donutCaption: '已交付',
    legendReleased: '已发布生产特性',
    legendInProgress: '正在研发与验证中',
    legendPlanned: '路线图规划中',
    formatCountVal: (count, pct) => `${count} 项 (${pct}%)`,
    sectionInProgress: '正在研发与候选验证 (In Progress)',
    sectionReleased: '已发布生产特性 (Released)',
    sectionPlanned: '开发路线图与未来规划 (Planned Roadmap)',
  },
  fr: {
    statReleased: 'Publiées en version stable',
    statInProgress: 'En cours (R&D Active)',
    statPlanned: 'Prévues sur la feuille de route',
    chartTitle: 'Répartition du cycle de vie',
    chartSub: (total) => `${total} fonctionnalités suivies`,
    donutCaption: 'Publié',
    legendReleased: 'Publiées en version stable',
    legendInProgress: 'R&D en cours',
    legendPlanned: 'Feuille de route',
    formatCountVal: (count, pct) => `${count} (${pct}%)`,
    sectionInProgress: 'R&D Candidate en cours (In Progress)',
    sectionReleased: 'Fonctionnalités de production publiées (Released)',
    sectionPlanned: 'Feuille de route prévue (Planned Roadmap)',
  },
}

const copy = computed(() => UI_COPY[props.locale] || UI_COPY.en)
const items = computed(() => tracking.locales[props.locale] || tracking.locales.en)
</script>

<template>
  <div class="ft-board">
    <div class="ft-summary-grid">
      <div class="ft-stat-card">
        <span class="ft-stat-num ft-stat-brand">{{ tracking.counts.released }}</span>
        <span class="ft-stat-label">{{ copy.statReleased }}</span>
      </div>
      <div class="ft-stat-card">
        <span class="ft-stat-num ft-stat-cyan">{{ tracking.counts.inProgress }}</span>
        <span class="ft-stat-label">{{ copy.statInProgress }}</span>
      </div>
      <div class="ft-stat-card">
        <span class="ft-stat-num">{{ tracking.counts.planned }}</span>
        <span class="ft-stat-label">{{ copy.statPlanned }}</span>
      </div>
    </div>

    <div class="ft-chart-card ft-donut-only-card">
      <div class="ft-chart-header">
        <span class="ft-chart-title">{{ copy.chartTitle }}</span>
        <span class="ft-chart-sub">{{ copy.chartSub(tracking.counts.total) }}</span>
      </div>
      <div class="ft-donut-wrap">
        <svg class="ft-donut-svg" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="44" fill="none" stroke="var(--vp-c-bg-mute)" stroke-width="14" />
          <circle
            cx="60"
            cy="60"
            r="44"
            fill="none"
            stroke="#7c4dff"
            stroke-width="14"
            :stroke-dasharray="tracking.donut.releasedDashArray"
            stroke-dashoffset="0"
            transform="rotate(-90 60 60)"
          />
          <circle
            cx="60"
            cy="60"
            r="44"
            fill="none"
            stroke="#00e5ff"
            stroke-width="14"
            :stroke-dasharray="tracking.donut.inProgressDashArray"
            :stroke-dashoffset="tracking.donut.inProgressDashOffset"
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="57" text-anchor="middle" class="ft-donut-num">{{ tracking.percentages.released }}%</text>
          <text x="60" y="73" text-anchor="middle" class="ft-donut-caption">{{ copy.donutCaption }}</text>
        </svg>
        <div class="ft-donut-legend">
          <div class="ft-legend-row">
            <span class="ft-dot ft-dot-brand"></span>
            <span class="ft-legend-name">{{ copy.legendReleased }}</span>
            <span class="ft-legend-val">
              {{ copy.formatCountVal(tracking.counts.released, tracking.percentages.released) }}
            </span>
          </div>
          <div class="ft-legend-row">
            <span class="ft-dot ft-dot-cyan"></span>
            <span class="ft-legend-name">{{ copy.legendInProgress }}</span>
            <span class="ft-legend-val">
              {{ copy.formatCountVal(tracking.counts.inProgress, tracking.percentages.inProgress) }}
            </span>
          </div>
          <div class="ft-legend-row">
            <span class="ft-dot ft-dot-muted"></span>
            <span class="ft-legend-name">{{ copy.legendPlanned }}</span>
            <span class="ft-legend-val">
              {{ copy.formatCountVal(tracking.counts.planned, tracking.percentages.planned) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <h2 id="in-progress">{{ copy.sectionInProgress }}</h2>

    <div class="ft-list">
      <div v-for="item in items.inProgress" :key="item.id" class="ft-card ft-card-active">
        <div class="ft-card-header">
          <div class="ft-title-group">
            <span class="ft-title" v-html="item.titleHtml"></span>
            <span class="ft-module">{{ item.module }}</span>
          </div>
          <span class="ft-badge ft-badge-progress">{{ item.badge }}</span>
        </div>
        <p class="ft-desc" v-html="item.descHtml"></p>
        <div class="ft-progress-block">
          <div class="ft-progress-meta">
            <span class="ft-progress-label">{{ item.progressLabel }}</span>
            <span class="ft-progress-pct">{{ item.progress }}%</span>
          </div>
          <div class="ft-progress-track">
            <span class="ft-progress-fill" :style="{ width: `${item.progress}%` }"></span>
          </div>
        </div>
        <div v-if="item.milestones.length" class="ft-milestones">
          <span
            v-for="(m, idx) in item.milestones"
            :key="idx"
            :class="['ft-milestone', !m.done && 'ft-milestone-pending']"
          >
            {{ m.done ? '✓' : '→' }} <span v-html="m.html"></span>
          </span>
        </div>
        <div v-if="item.links.length" class="ft-links">
          <a
            v-for="(link, idx) in item.links"
            :key="idx"
            :href="link.external ? link.href : withBase(link.href)"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener' : undefined"
            :class="['ft-link', !link.primary && 'ft-link-muted']"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>

    <hr />

    <h2 id="released">{{ copy.sectionReleased }}</h2>

    <div class="ft-list">
      <div v-for="item in items.released" :key="item.id" class="ft-card ft-card-media">
        <div v-if="item.thumb" class="ft-card-thumb-wrap">
          <img
            :src="withBase(item.thumb)"
            :alt="item.thumbAlt"
            class="ft-card-thumb"
            :style="item.thumbPosition ? { objectPosition: item.thumbPosition } : undefined"
            loading="lazy"
          />
        </div>
        <div class="ft-card-body">
          <div class="ft-card-header">
            <div class="ft-title-group">
              <span class="ft-title" v-html="item.titleHtml"></span>
              <span class="ft-module">{{ item.module }}</span>
            </div>
            <span class="ft-badge ft-badge-released">{{ item.badge }}</span>
          </div>
          <p class="ft-desc" v-html="item.descHtml"></p>
          <div v-if="item.milestones.length" class="ft-milestones">
            <span
              v-for="(m, idx) in item.milestones"
              :key="idx"
              :class="['ft-milestone', !m.done && 'ft-milestone-pending']"
            >
              {{ m.done ? '✓' : '→' }} <span v-html="m.html"></span>
            </span>
          </div>
          <div v-if="item.links.length" class="ft-links">
            <a
              v-for="(link, idx) in item.links"
              :key="idx"
              :href="link.external ? link.href : withBase(link.href)"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener' : undefined"
              :class="['ft-link', !link.primary && 'ft-link-muted']"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <h2 id="planned-roadmap">{{ copy.sectionPlanned }}</h2>

    <div class="ft-roadmap-grid">
      <div v-for="item in items.planned" :key="item.id" class="ft-roadmap-item">
        <div class="ft-roadmap-top">
          <span class="ft-module">{{ item.module }}</span>
          <span class="ft-badge ft-badge-planned">{{ item.badge }}</span>
        </div>
        <h3 class="ft-roadmap-title" v-html="item.titleHtml"></h3>
        <p class="ft-roadmap-desc" v-html="item.descHtml"></p>
      </div>
    </div>
  </div>
</template>

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
.ft-card :deep(code),
.ft-roadmap-item :deep(code) {
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
