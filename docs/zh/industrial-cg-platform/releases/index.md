---
layout: doc
title: 鐗堟湰鍙戝竷
---

# 鐗堟湰鍙戝竷

<script setup>
import { data as releases } from '../../../releases.data.js'
</script>

<div class="releases-container">
  <p style="color: var(--vp-c-text-3); font-size: 0.9rem; margin-bottom: 1.5rem;">
    鈿?闈欐€佺紪璇戣嚜瀹樻柟涓讳粨搴撱€傛瀯寤烘椂鑷姩鍚屾鏇存柊銆?
  </p>
  <div v-for="(release, index) in releases" :key="release.tag_name" class="release-card">
    <div class="release-card-content">
      <div class="release-header">
        <div>
          <span class="release-title">{{ release.name }}</span>
          <div class="release-date">鍙戝竷浜?{{ release.publishedAtZH }}</div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span v-if="index === 0 && !release.prerelease" class="badge badge-latest">鏈€鏂扮増鏈?/span>
          <span v-if="release.prerelease" class="badge badge-prerelease">棰勫彂甯冪増</span>
          <span v-else-if="index !== 0" class="badge badge-regular">绋冲畾鐗?/span>
          <a v-if="release.html_url" :href="release.html_url" target="_blank" class="badge badge-regular" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;">
            馃敆 浠撳簱 Releases
          </a>
        </div>
      </div>
      <div class="release-body" v-html="release.bodyHtml" style="margin-top: 1rem; font-size: 0.95rem;"></div>
      <!-- 璧勬簮鍖呬笅杞藉尯 -->
      <div v-if="release.assets && release.assets.length" class="assets-box">
        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.6rem; color: var(--vp-c-text-1);">
          馃摝 杩愯绋嬪簭涓嬭浇鍖?(Windows x64 ZIP)
        </div>
        <div v-for="asset in release.assets" :key="asset.id" class="asset-item">
          <a v-if="asset.browser_download_url" :href="asset.browser_download_url" target="_blank" class="asset-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; vertical-align: middle; margin-right: 0.3rem;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>
            {{ asset.name }}
          </a>
          <span class="asset-meta">
            {{ asset.sizeFormattedZH }}
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
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.01);
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}
.release-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  border-color: var(--vp-c-brand);
}
.release-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.release-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.release-date {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.2rem;
}
.badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 12px;
}
.badge-latest {
  background: rgba(16, 185, 129, 0.1);
  color: rgb(16, 185, 129);
  border: 1px solid rgba(16, 185, 129, 0.2);
}
.badge-prerelease {
  background: rgba(245, 158, 11, 0.1);
  color: rgb(245, 158, 11);
  border: 1px solid rgba(245, 158, 11, 0.2);
}
.badge-regular {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  transition: color 0.2s, background 0.2s;
}
a.badge-regular:hover {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}
.assets-box {
  margin-top: 1.2rem;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 1rem;
}
.asset-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  border: 1px solid var(--vp-c-divider);
}
.asset-link {
  color: var(--vp-c-brand);
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.asset-link:hover {
  text-decoration: underline;
}
.asset-meta {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}
</style>
