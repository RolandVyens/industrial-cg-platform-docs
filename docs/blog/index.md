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
  <p class="blog-subtitle">
    Design logs, technical writeups, and development progress of the Industrial 3D tools ecosystem.
  </p>
</div>

<div class="blog-container">
  <div v-if="posts.length === 0" class="no-posts">
    <p>No devlog updates published yet. Check back soon!</p>
  </div>
  <div v-else class="blog-list">
    <article 
      v-for="post in posts" 
      :key="post.url" 
      class="blog-post-item"
    >
      <header class="post-header">
        <div class="post-meta">
          <time :datetime="post.dateString">📅 {{ post.dateString }}</time>
        </div>
        <h2 class="post-title">
          <a :href="withBase(post.url)">{{ post.title }}</a>
        </h2>
      </header>
      <section class="post-excerpt">
        <p>{{ post.summary }}</p>
      </section>
      <footer class="post-footer">
        <a :href="withBase(post.url)" class="read-more-link">
          Read Devlog <span class="arrow">→</span>
        </a>
      </footer>
    </article>
  </div>
</div>

<style scoped>
.blog-header {
  max-width: 800px;
  margin: 3.5rem auto 0;
  padding: 0 1.5rem;
  text-align: left;
}

.blog-subtitle {
  font-size: 1.05rem;
  color: #c8ceda;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.75rem 1.5rem 6rem;
}

.no-posts {
  padding: 4rem 0;
  color: #8f98aa;
  font-size: 1rem;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blog-post-item {
  display: flex;
  flex-direction: column;
  padding: 1.55rem 1.75rem;
  background: rgba(255, 255, 255, 0.028);
  border: none;
  border-radius: 12px;
  transition: transform 0.25s ease, background-color 0.25s ease;
}

.blog-post-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.045);
}

.post-header {
  margin-bottom: 0.75rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: #8f98aa;
  margin-bottom: 0.45rem;
}

.post-title {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 650;
  line-height: 1.35;
  margin: 0 !important;
}

.post-title a {
  color: #f4f6fb;
  text-decoration: none !important;
  transition: color 0.15s ease;
}

.post-title a:hover {
  color: #9e7aff;
}

.post-excerpt {
  font-size: 0.95rem;
  color: #c8ceda;
  line-height: 1.65;
  margin-bottom: 1.15rem;
}

.post-excerpt p {
  margin: 0 !important;
}

.post-footer {
  display: flex;
  align-items: center;
}

.read-more-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: #9e7aff;
  text-decoration: none !important;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: opacity 0.2s ease;
}

.read-more-link:hover {
  opacity: 0.85;
}

.read-more-link .arrow {
  transition: transform 0.2s ease;
}

.read-more-link:hover .arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .post-title {
    font-size: 1.35rem;
  }
}
</style>
