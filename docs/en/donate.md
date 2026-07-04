# Donate

Thank you for supporting **Industrial 3D**! Your donations directly power the open-source research and development of production-ready CG and VFX tools, keeping them free and accessible for artists and studios worldwide.

---

<div class="donation-grid">
  <!-- Patreon Card -->
  <a href="https://www.patreon.com/cw/RolandVyens" target="_blank" class="donation-card patreon">
    <div class="card-header">
      <span class="card-icon">馃А</span>
      <h3 class="card-title">Patreon</h3>
    </div>
    <p class="card-desc">For international sponsors. Supports monthly subscription tiers, exclusive updates, and developer rewards in USD.</p>
    <div class="card-button">Support on Patreon</div>
  </a>

  <!-- Afdian Card -->
  <a href="https://www.ifdian.net/a/mogubobi2" target="_blank" class="donation-card afdian">
    <div class="card-header">
      <span class="card-icon">鈿?/span>
      <h3 class="card-title">Afdian (鐖卞彂鐢?</h3>
    </div>
    <p class="card-desc">For Chinese domestic sponsors. Supports monthly subscriptions, direct sponsorships, and platform rewards in CNY.</p>
    <div class="card-button">Support on Afdian</div>
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
