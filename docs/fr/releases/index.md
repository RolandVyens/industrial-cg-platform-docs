---
layout: doc
title: Versions
---

# Versions

<script setup>
import { ref, onMounted } from 'vue'

const releases = ref([])
const loading = ref(true)
const error = ref(null)

const fallbackReleases = [
  {
    tag_name: 'industrial-cg-platform-5.2.0-2026-05-27',
    name: 'industrial-cg-platform-5.2.0-2026-05-27',
    published_at: '2026-05-27T16:00:51Z',
    prerelease: false,
    body: '### Points forts\n- Synchronisation du noyau de rendu Cycles avec Blender 5.2 amont\n- Ajout des remerciements au projet MoonRay dans la documentation et les en-têtes de code source\n- Améliorations de la stabilité générale pour la sortie Deep EXR.',
    assets: [
      {
        name: 'blender-5.2.0-industrial-cg-platform-windows-x64.zip',
        size: 256880000,
        download_count: 85,
        browser_download_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/tag/industrial-cg-platform-5.2.0-2026-05-27'
      }
    ]
  },
  {
    tag_name: 'industrial-cg-platform-5.2.0-2026-05-20',
    name: 'Industrial CG Platform 5.2.0-2026-05-20',
    published_at: '2026-05-20T04:52:46Z',
    prerelease: false,
    body: '### Points forts\n- Intégration de l\'empaquetage de l\'exécution Qt sous l\'extension système\n- Support de la sortie native Deep EXR Cycles et du contrôle de la couleur d\'ombre\n- Panneau d\'administration dédié ViewLayer basé sur Qt (BQt)',
    assets: [
      {
        name: 'blender-5.2.0-industrial-cg-platform-windows-x64.zip',
        size: 254200000,
        download_count: 142,
        browser_download_url: 'https://github.com/RolandVyens/industrial-cg-platform/releases/tag/Industrial-CG-Platform-5.2.0-2026-05-20'
      }
    ]
  }
]

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/RolandVyens/industrial-cg-platform/releases')
    if (!res.ok) throw new Error('Failed to fetch from GitHub API')
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
      releases.value = data
    } else {
      releases.value = fallbackReleases
    }
  } catch (err) {
    console.error('Error fetching releases, using fallback:', err)
    error.value = err.message
    releases.value = fallbackReleases
  } finally {
    loading.value = false
  }
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatBytes(bytes) {
  if (!bytes) return 'N/A'
  if (bytes === 0) return '0 Octets'
  const k = 1024
  const sizes = ['Octets', 'Ko', 'Mo', 'Go']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function parseMarkdown(text) {
  if (!text) return ''
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/`(.*?)`/g, '<code style="background: var(--vp-c-bg-mute); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; border: 1px solid var(--vp-c-divider);">$1</code>')
  html = html.replace(/^### (.*?)$/gm, '<h4 style="margin-top: 1.2rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--vp-c-text-1); font-size: 1.05rem;">$1</h4>')
  html = html.replace(/^## (.*?)$/gm, '<h3 style="margin-top: 1.5rem; margin-bottom: 0.6rem; font-weight: 600; color: var(--vp-c-text-1); font-size: 1.15rem;">$1</h3>')
  html = html.replace(/^[-\*] (.*?)$/gm, '<li style="margin-left: 1.2rem; margin-bottom: 0.3rem; list-style-type: disc; line-height: 1.5;">$1</li>')
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: var(--vp-c-brand); font-weight: 500; text-decoration: underline;">$1</a>')
  
  html = html.split('\n\n').map(p => {
    if (p.trim().startsWith('<li') || p.trim().startsWith('<h')) return p
    return `<p style="margin-bottom: 0.6rem; line-height: 1.6; color: var(--vp-c-text-2);">${p.replace(/\n/g, '<br>')}</p>`
  }).join('\n')
  
  return html
}
</script>

<div class="releases-container">
  <!-- Chargement -->
  <div v-if="loading">
    <p style="color: var(--vp-c-text-2); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
      <svg class="spinner" viewBox="0 0 50 50" style="width: 20px; height: 20px; animation: spin 1s linear infinite;"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" style="stroke-linecap: round; animation: dash 1.5s ease-in-out infinite;"></circle></svg>
      Chargement des dernières versions depuis l'API GitHub...
    </p>
    <div class="skeleton-card"></div>
    <div class="skeleton-card"></div>
  </div>

  <!-- Liste des versions chargée -->
  <div v-else>
    <p style="color: var(--vp-c-text-3); font-size: 0.9rem; margin-bottom: 1.5rem;">
      ⚡ Affichage en temps réel des versions depuis le dépôt principal.
      <span v-if="error" style="color: var(--vp-c-warning-text)"> (Note: limite d'API atteinte, affichage du cache local)</span>
    </p>

    <div v-for="(release, index) in releases" :key="release.tag_name" class="release-card">
      <div class="release-header">
        <div>
          <span class="release-title">{{ release.name || release.tag_name }}</span>
          <div class="release-date">Publié le {{ formatDate(release.published_at) }}</div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span v-if="index === 0 && !release.prerelease" class="badge badge-latest">Dernière version</span>
          <span v-if="release.prerelease" class="badge badge-prerelease">Pré-version</span>
          <span v-else-if="index !== 0" class="badge badge-regular">Stable</span>
          <a :href="release.html_url" target="_blank" class="badge badge-regular" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;">
            🔗 Dépôt Releases
          </a>
        </div>
      </div>

      <div class="release-body" v-html="parseMarkdown(release.body)" style="margin-top: 1rem; font-size: 0.95rem;"></div>

      <!-- Téléchargement des actifs -->
      <div v-if="release.assets && release.assets.length > 0" class="assets-box">
        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.6rem; color: var(--vp-c-text-1);">
          📦 Paquets de téléchargement (Windows x64 ZIP)
        </div>
        <div v-for="asset in release.assets" :key="asset.id" class="asset-item">
          <a :href="asset.browser_download_url" target="_blank" class="asset-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; vertical-align: middle; margin-right: 0.3rem;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            {{ asset.name }}
          </a>
          <span class="asset-meta">
            {{ formatBytes(asset.size) }} <span v-if="asset.download_count !== undefined">| {{ asset.download_count }} téléchargements</span>
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
.skeleton-card {
  height: 180px;
  background: linear-gradient(90deg, var(--vp-c-bg-soft) 25%, var(--vp-c-bg-mute) 50%, var(--vp-c-bg-soft) 75%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}
@keyframes loading-animation {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style>
