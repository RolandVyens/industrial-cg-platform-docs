---
layout: page
title: Ecosystem Devlog
titleTemplate: Industrial 3D Development Updates
---

<script setup>
import { withBase } from 'vitepress'
import { data as posts } from '../blog.data.js'
</script>

<div class="blog-header">
  <h1 class="blog-title">Ecosystem Devlog</h1>
  <p class="blog-subtitle">
    Follow the design decisions, C++ Cycles kernel extensions, pipeline integrations, and workflow retrospectives of the Industrial 3D ecosystem.
  </p>
  <div class="blog-badge-row">
    <span class="blog-badge">🎬 Industrial CG Platform</span>
    <span class="blog-badge">🔌 AOV Connector</span>
    <span class="blog-badge">💡 Light AOV Splitter</span>
    <span class="blog-badge">🎨 AIO-OCIO</span>
  </div>
</div>

<div class="blog-container">
  <div v-if="posts.length === 0" class="no-posts">
    <p>No devlog updates published yet. Check back soon!</p>
  </div>
  <div v-else class="blog-grid">
    <a 
      v-for="post in posts" 
      :key="post.url" 
      :href="withBase(post.url)"
      class="blog-card"
    >
      <div class="card-cover-wrapper">
        <div 
          v-if="post.cover" 
          class="card-cover" 
          :style="{ backgroundImage: `url(${post.cover})` }"
        ></div>
        <div v-else class="card-cover-fallback">
          <div class="fallback-pattern"></div>
        </div>
        <div class="card-tags" v-if="post.tags && post.tags.length">
          <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
        </div>
      </div>
      <div class="card-content">
        <div class="card-meta">
          <span class="meta-item">📅 {{ post.dateString }}</span>
          <span class="meta-divider">•</span>
          <span class="meta-item">👤 {{ post.author }}</span>
        </div>
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-summary">{{ post.summary }}</p>
        <div class="card-action">
          <span class="action-text">Read Devlog</span>
          <span class="action-arrow">→</span>
        </div>
      </div>
    </a>
  </div>
</div>

<style scoped>
.blog-header {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 3.5rem;
  padding: 0 1rem;
}

.blog-title {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #c5a3ff 0%, #7c4dff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.8rem;
  letter-spacing: -0.5px;
}

.blog-subtitle {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  max-width: 680px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}

.blog-badge-row {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.blog-badge {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-dimm-1);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
}

.blog-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}

.no-posts {
  text-align: center;
  padding: 4rem 1rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  color: var(--vp-c-text-3);
  font-size: 1.05rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.blog-card {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none !important;
  color: inherit !important;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
              border-color 0.3s ease, 
              box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.blog-card:hover {
  transform: translateY(-6px);
  border-color: var(--vp-c-brand-dimm-1);
  box-shadow: 0 12px 24px -10px rgba(124, 77, 255, 0.15);
}

.card-cover-wrapper {
  position: relative;
  height: 180px;
  width: 100%;
  overflow: hidden;
  background: #110e1a;
}

.card-cover {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.blog-card:hover .card-cover {
  transform: scale(1.05);
}

.card-cover-fallback {
  height: 100%;
  width: 100%;
  background: linear-gradient(135deg, #1b162d 0%, #0d0a14 100%);
  position: relative;
}

.fallback-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.15;
  background-image: radial-gradient(var(--vp-c-brand) 1.5px, transparent 1.5px);
  background-size: 16px 16px;
}

.card-tags {
  position: absolute;
  bottom: 0.8rem;
  left: 0.8rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.post-tag {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  background: rgba(124, 77, 255, 0.85);
  backdrop-filter: blur(4px);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.card-content {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  flex-grow: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.6rem;
}

.meta-divider {
  opacity: 0.5;
}

.card-title {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.8rem !important;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.blog-card:hover .card-title {
  color: var(--vp-c-brand);
}

.card-summary {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0 0 1.5rem !important;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.card-action {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.action-arrow {
  transition: transform 0.2s ease;
}

.blog-card:hover .action-arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .blog-title {
    font-size: 2.2rem;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
