/**
 * Component: Luxury Product Dashboard
 * Category: dashboard-layouts
 */

export const component = {
  id: 'luxury-product-dashboard',
  name: 'Luxury Product Dashboard',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="luxd-wrapper">
  
  <!-- Minimal Header -->
  <header class="luxd-header">
    <div class="luxd-logo">AURA</div>
    <nav class="luxd-nav">
      <a href="#" class="active">Overview</a>
      <a href="#">Collections</a>
      <a href="#">Clientele</a>
      <a href="#">Concierge</a>
    </nav>
    <div class="luxd-user">
      <span>Maison Admin</span>
      <div class="luxd-avatar"></div>
    </div>
  </header>

  <main class="luxd-main">
    
    <div class="luxd-title-area">
      <h1>Performance & Elegance</h1>
      <p>Quarterly review of exclusive collections and membership tiers.</p>
    </div>

    <!-- Elegance KPI Row -->
    <div class="luxd-kpi-row">
      <div class="luxd-kpi">
        <span class="luxd-k-lbl">Total Volume</span>
        <span class="luxd-k-val">€4.2M</span>
        <span class="luxd-k-trend">Up 12.5%</span>
      </div>
      <div class="luxd-kpi">
        <span class="luxd-k-lbl">Active Members</span>
        <span class="luxd-k-val">842</span>
        <span class="luxd-k-trend">Exclusive Club</span>
      </div>
      <div class="luxd-kpi">
        <span class="luxd-k-lbl">Avg. Order Value</span>
        <span class="luxd-k-val">€5,400</span>
        <span class="luxd-k-trend">Up 8.2%</span>
      </div>
    </div>

    <div class="luxd-grid">
      
      <!-- Sales Chart -->
      <div class="luxd-card luxd-span-2">
        <div class="luxd-card-top">
          <h3>Collection Sales Trajectory</h3>
          <button class="luxd-btn-link">View Detailed Report</button>
        </div>
        <div class="luxd-chart-container">
          <svg viewBox="0 0 600 200" preserveAspectRatio="none" class="luxd-svg-chart">
            <path class="luxd-line-path" d="M0,180 Q100,190 200,140 T400,80 T600,20" fill="none" stroke="#d4af37" stroke-width="2" />
            <!-- Gradient under line -->
            <path d="M0,180 Q100,190 200,140 T400,80 T600,20 L600,200 L0,200 Z" fill="url(#luxd-gold-grad)" />
            <defs>
              <linearGradient id="luxd-gold-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(212, 175, 55, 0.15)" />
                <stop offset="100%" stop-color="rgba(212, 175, 55, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Membership Tiers -->
      <div class="luxd-card">
        <div class="luxd-card-top">
          <h3>Privilege Tiers</h3>
        </div>
        <div class="luxd-tier-list">
          
          <div class="luxd-tier-item">
            <div class="luxd-ti-header">
              <span class="luxd-ti-name" style="color:#d4af37">Aura Gold</span>
              <span class="luxd-ti-count">420 Members</span>
            </div>
            <div class="luxd-ti-bar-bg"><div class="luxd-ti-bar-fill" style="width: 60%; background:#d4af37"></div></div>
          </div>

          <div class="luxd-tier-item">
            <div class="luxd-ti-header">
              <span class="luxd-ti-name" style="color:#e5e4e2">Aura Platinum</span>
              <span class="luxd-ti-count">280 Members</span>
            </div>
            <div class="luxd-ti-bar-bg"><div class="luxd-ti-bar-fill" style="width: 40%; background:#e5e4e2"></div></div>
          </div>

          <div class="luxd-tier-item">
            <div class="luxd-ti-header">
              <span class="luxd-ti-name" style="color:#111">Aura Noir</span>
              <span class="luxd-ti-count">142 Members</span>
            </div>
            <div class="luxd-ti-bar-bg"><div class="luxd-ti-bar-fill" style="width: 20%; background:#111"></div></div>
          </div>

        </div>
        
        <div class="luxd-action-box">
          <p>Invite clients to elevate their tier.</p>
          <button class="luxd-btn-solid">Send Invitations</button>
        </div>
      </div>

    </div>

    <!-- Recent Acquisitions Table -->
    <div class="luxd-card">
      <div class="luxd-card-top">
        <h3>Recent Acquisitions</h3>
      </div>
      <table class="luxd-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Collection Piece</th>
            <th>Tier</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E. Rothschild</td>
            <td>Luminous Chronograph</td>
            <td><span class="luxd-badge luxd-badge-noir">Noir</span></td>
            <td>€42,500</td>
            <td>Delivered</td>
          </tr>
          <tr>
            <td>J. Sterling</td>
            <td>Velvet Evening Clutch</td>
            <td><span class="luxd-badge luxd-badge-plat">Platinum</span></td>
            <td>€6,200</td>
            <td>Processing</td>
          </tr>
          <tr>
            <td>A. Windsor</td>
            <td>Signature Signet Ring</td>
            <td><span class="luxd-badge luxd-badge-gold">Gold</span></td>
            <td>€3,800</td>
            <td>In Transit</td>
          </tr>
        </tbody>
      </table>
    </div>

  </main>
</div>`,
  js: `// Luxury Dashboard Logic
const luxLine = document.querySelector('.luxd-line-path');
if (luxLine) {
  const len = luxLine.getTotalLength();
  luxLine.style.strokeDasharray = len;
  luxLine.style.strokeDashoffset = len;
  setTimeout(() => {
    luxLine.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.25, 1, 0.5, 1)';
    luxLine.style.strokeDashoffset = '0';
  }, 400);
}`,
  ts: `// Luxury Dashboard Logic (TypeScript)
const luxLine = document.querySelector<SVGPathElement>('.luxd-line-path');
if (luxLine) {
  const len = luxLine.getTotalLength();
  luxLine.style.strokeDasharray = len.toString();
  luxLine.style.strokeDashoffset = len.toString();
  setTimeout(() => {
    luxLine.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.25, 1, 0.5, 1)';
    luxLine.style.strokeDashoffset = '0';
  }, 400);
}`,
  css: `/* Luxury Product Dashboard Styles */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');

.luxd-wrapper {
  background: #fdfdfc;
  min-height: 100vh;
  font-family: 'Jost', sans-serif; /* Clean, elegant sans for UI */
  color: #1a1a1a;
}

/* Header */
.luxd-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 60px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.luxd-logo {
  font-family: 'Cinzel', serif; /* Classic luxury serif for logo/headings */
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 4px;
  color: #111;
}

.luxd-nav {
  display: flex;
  gap: 40px;
}

.luxd-nav a {
  text-decoration: none;
  color: #888;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: color 0.3s;
}

.luxd-nav a:hover, .luxd-nav a.active {
  color: #111;
}

.luxd-user {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.luxd-avatar {
  width: 36px; height: 36px;
  background: #111;
  border-radius: 50%;
}

/* Main */
.luxd-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px;
}

.luxd-title-area {
  text-align: center;
  margin-bottom: 60px;
}

.luxd-title-area h1 {
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 2px;
  margin: 0 0 16px 0;
  color: #111;
}

.luxd-title-area p {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
  font-weight: 300;
}

/* KPIs */
.luxd-kpi-row {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  padding: 40px 0;
  margin-bottom: 60px;
}

.luxd-kpi {
  flex: 1;
  text-align: center;
  border-right: 1px solid #eaeaea;
}
.luxd-kpi:last-child { border-right: none; }

.luxd-k-lbl {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #888;
  margin-bottom: 16px;
}

.luxd-k-val {
  display: block;
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  color: #111;
  margin-bottom: 12px;
}

.luxd-k-trend {
  font-size: 0.85rem;
  color: #d4af37; /* Metallic Gold */
  font-style: italic;
}

/* Grid */
.luxd-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

.luxd-span-2 { grid-column: span 1; }

.luxd-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  padding: 40px;
}

.luxd-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.luxd-card-top h3 {
  font-family: 'Cinzel', serif;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 0;
}

.luxd-btn-link {
  background: transparent;
  border: none;
  border-bottom: 1px solid #111;
  padding: 0 0 4px 0;
  color: #111;
  font-family: 'Jost', sans-serif;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
}

/* Chart */
.luxd-chart-container {
  height: 300px;
}
.luxd-svg-chart { width: 100%; height: 100%; overflow: visible; }

/* Tiers */
.luxd-tier-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 40px;
}

.luxd-ti-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.luxd-ti-name {
  font-family: 'Cinzel', serif;
  font-weight: 600;
  font-size: 1.1rem;
}

.luxd-ti-count {
  font-size: 0.85rem;
  color: #888;
}

.luxd-ti-bar-bg {
  height: 2px;
  background: #f0f0f0;
  width: 100%;
}
.luxd-ti-bar-fill { height: 100%; }

.luxd-action-box {
  background: #fafafa;
  padding: 24px;
  text-align: center;
}

.luxd-action-box p {
  font-size: 0.9rem; color: #666; margin: 0 0 16px 0;
}

.luxd-btn-solid {
  background: #111;
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-family: 'Jost', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s;
}
.luxd-btn-solid:hover { background: #333; }

/* Table */
.luxd-table {
  width: 100%;
  border-collapse: collapse;
}

.luxd-table th {
  text-align: left;
  padding: 16px 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #888;
  border-bottom: 1px solid #eaeaea;
  font-weight: 400;
}

.luxd-table td {
  padding: 24px 0;
  font-size: 0.95rem;
  border-bottom: 1px solid #f9f9f9;
  color: #111;
}

.luxd-badge {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 8px;
  border: 1px solid;
}
.luxd-badge-gold { color: #d4af37; border-color: #d4af37; }
.luxd-badge-plat { color: #888; border-color: #e5e4e2; background: #e5e4e2; color: #111;}
.luxd-badge-noir { color: #fff; background: #111; border-color: #111; }

/* Responsive */
@media (max-width: 1024px) {
  .luxd-grid { grid-template-columns: 1fr; }
  .luxd-kpi-row { flex-direction: column; gap: 40px; }
  .luxd-kpi { border-right: none; }
  .luxd-header { padding: 20px; flex-direction: column; gap: 20px; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a luxury-grade dashboard experience emphasizing elegance, simplicity, and premium aesthetics. Focus on minimalist typography, whitespace, and subtle gold/monochrome palettes.`
};
