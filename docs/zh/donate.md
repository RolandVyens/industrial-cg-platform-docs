# 赞助支持

感谢您对 **Industrial 3D** 的支持！您的赞助将直接驱动生产级 CG 和 VFX 开源工具的研发，帮助我们持续开发新功能并维护生态，确保这些工具对全球艺术家和工作室完全免费开放。

---

<div class="donation-grid">
  <!-- Patreon Card -->
  <a href="https://www.patreon.com/cw/RolandVyens" target="_blank" class="donation-card patreon">
    <div class="card-header">
      <span class="card-icon">🧡</span>
      <h3 class="card-title">Patreon</h3>
    </div>
    <p class="card-desc">适合海外赞助者。支持美元（USD）按月订阅档位或直接赞助，提供专属的开发动态和奖励。</p>
    <div class="card-button">在 Patreon 上支持</div>
  </a>

  <!-- Afdian Card -->
  <a href="https://www.ifdian.net/a/mogubobi2" target="_blank" class="donation-card afdian">
    <div class="card-header">
      <span class="card-icon">⚡</span>
      <h3 class="card-title">爱发电 (Afdian)</h3>
    </div>
    <p class="card-desc">适合国内赞助者。支持人民币（CNY）按月订阅或直接赞助，提供多档赞助会员方案及项目回馈。</p>
    <div class="card-button">在爱发电上支持</div>
  </a>
</div>

<style scoped>
.donation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
}
.donation-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none !important;
  color: inherit !important;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.01);
}
.donation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
}
.patreon:hover {
  border-color: #ff4500;
}
.afdian:hover {
  border-color: #9457e6;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}
.card-icon {
  font-size: 1.8rem;
}
.card-title {
  margin: 0 !important;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.card-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}
.card-button {
  text-align: center;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background-color 0.2s, color 0.2s;
}
.patreon .card-button {
  background: rgba(255, 69, 0, 0.1);
  color: #ff4500;
}
.patreon:hover .card-button {
  background: #ff4500;
  color: #ffffff;
}
.afdian .card-button {
  background: rgba(148, 87, 230, 0.1);
  color: #9457e6;
}
.afdian:hover .card-button {
  background: #9457e6;
  color: #ffffff;
}
</style>
