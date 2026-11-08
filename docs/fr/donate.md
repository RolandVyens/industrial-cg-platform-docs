---
title: "Faire un don"
description: "Merci de soutenir Industrial 3D ! Vos dons financent directement la recherche et le développement open-source d'outils de CG et de VFX professionnels,..."
---
# Faire un don

Merci de soutenir **Industrial 3D** ! Vos dons financent directement la recherche et le développement open-source d'outils de CG et de VFX professionnels, les gardant gratuits et accessibles pour les artistes et studios du monde entier.

---

<div class="donation-grid">
  <!-- Patreon Card -->
  <a href="https://www.patreon.com/cw/RolandVyens" target="_blank" class="donation-card patreon">
    <div class="card-header">
      <span class="card-icon">🧡</span>
      <h3 class="card-title">Patreon</h3>
    </div>
    <p class="card-desc">Pour les donateurs internationaux. Prend en charge les abonnements mensuels, les actus exclusives et les récompenses en USD.</p>
    <div class="card-button">Soutenir sur Patreon</div>
  </a>

  <!-- Afdian Card -->
  <a href="https://www.ifdian.net/a/mogubobi2" target="_blank" class="donation-card afdian">
    <div class="card-header">
      <span class="card-icon">⚡</span>
      <h3 class="card-title">Afdian (爱发电)</h3>
    </div>
    <p class="card-desc">Pour les donateurs résidant en Chine. Prend en charge les abonnements mensuels et le mécénat direct en CNY.</p>
    <div class="card-button">Soutenir sur Afdian</div>
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
  background: rgba(255, 255, 255, 0.028);
  border: none;
  border-radius: 12px;
  padding: 1.5rem 1.65rem;
  text-decoration: none !important;
  color: inherit !important;
  transition: transform 0.25s ease, background-color 0.25s ease;
  box-shadow: none;
}
.donation-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.045);
  box-shadow: none;
  border: none;
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
  font-weight: 650;
  color: #f4f6fb;
}
.card-desc {
  font-size: 0.92rem;
  color: #c8ceda;
  line-height: 1.62;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}
.card-button {
  text-align: center;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  transition: background-color 0.2s, color 0.2s;
}
.patreon .card-button {
  background: rgba(255, 69, 0, 0.12);
  color: #ff6a33;
}
.patreon:hover .card-button {
  background: #ff4500;
  color: #ffffff;
}
.afdian .card-button {
  background: rgba(148, 87, 230, 0.14);
  color: #b39ddb;
}
.afdian:hover .card-button {
  background: #9457e6;
  color: #ffffff;
}
</style>
