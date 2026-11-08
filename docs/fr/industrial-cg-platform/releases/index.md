---
layout: doc
title: Versions
---
# Versions

<script setup>
import { data as releases } from '../../../releases.data.js'
</script>

<div class="releases-container">
  <p style="color: var(--vp-c-text-3); font-size: 0.9rem; margin-bottom: 1.5rem;">
    ⚡ Compilé statiquement depuis le dépôt principal. Mis à jour lors de la build.
  </p>
  <div v-for="release in releases" :key="release.tag_name" class="release-card">
    <div class="release-card-content">
      <div class="release-header">
        <div>
          <span class="release-title">{{ release.name }}</span>
          <div class="release-date">Publié le {{ release.publishedAtFR }}</div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span v-if="release.isLatestStable" class="badge badge-latest">Dernière version</span>
          <span v-if="release.prerelease" class="badge badge-prerelease">Pré-version</span>
          <span v-else-if="!release.isLatestStable" class="badge badge-regular">Stable</span>
          <a v-if="release.html_url" :href="release.html_url" target="_blank" class="badge badge-regular" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;">
            🔗 GitHub
          </a>
        </div>
      </div>
      <div class="release-body" v-html="release.bodyHtml" style="margin-top: 1rem; font-size: 0.95rem;"></div>
      <!-- Téléchargement des actifs -->
      <div v-if="release.assets && release.assets.length" class="assets-box">
        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.6rem; color: var(--vp-c-text-1);">
          📦 Paquets de téléchargement (Windows x64 ZIP)
        </div>
        <div v-for="asset in release.assets" :key="asset.id" class="asset-item">
          <a v-if="asset.browser_download_url" :href="asset.browser_download_url" target="_blank" class="asset-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; vertical-align: middle; margin-right: 0.3rem;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>
            {{ asset.name }}
          </a>
          <span class="asset-meta">
            {{ asset.sizeFormattedFR }}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

<style scoped>
.releases-container {
  margin-top: 1.5rem;
}
.release-card {
  background: rgba(255, 255, 255, 0.028);
  border: none;
  border-radius: 12px;
  padding: 1.5rem 1.65rem;
  margin-bottom: 1.5rem;
  box-shadow: none;
  transition: transform 0.25s ease, background-color 0.25s ease;
}
.release-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.045);
  box-shadow: none;
  border: none;
}
.release-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: none;
}
.release-title {
  font-size: 1.25rem;
  font-weight: 650;
  color: #f4f6fb;
}
.release-date {
  font-size: 0.82rem;
  color: #8f98aa;
  margin-top: 0.2rem;
}
.badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  font-size: 0.74rem;
  font-weight: 600;
  border-radius: 6px;
  border: none;
}
.badge-latest {
  background: rgba(0, 229, 255, 0.12);
  color: #00e5ff;
  border: none;
}
.badge-prerelease {
  background: rgba(124, 77, 255, 0.16);
  color: #b39ddb;
  border: none;
}
.badge-regular {
  background: rgba(255, 255, 255, 0.06);
  color: #c8ceda;
  border: none;
  transition: color 0.2s, background 0.2s;
}
a.badge-regular:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
}
.assets-box {
  margin-top: 1.1rem;
  border-top: none;
  padding-top: 0.4rem;
}
.asset-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0.85rem;
  background: rgba(255, 255, 255, 0.035);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-size: 0.86rem;
  border: none;
}
.asset-link {
  color: #9e7aff;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.asset-link:hover {
  text-decoration: underline;
}
.asset-meta {
  color: #8f98aa;
  font-size: 0.82rem;
}
</style>
