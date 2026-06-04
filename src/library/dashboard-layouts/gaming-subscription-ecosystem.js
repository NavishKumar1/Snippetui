/**
 * Component: Gaming Subscription Ecosystem Dashboard
 * Category: dashboard-layouts
 */

export const component = {
  id: 'gaming-subscription-ecosystem',
  name: 'Gaming Subscription Ecosystem',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="gse-wrapper">
  
  <div class="gse-sidebar">
    <div class="gse-brand">NEXUS PASS</div>
    <nav class="gse-nav">
      <a href="#" class="active"><i class="gse-icon">🎮</i> Dashboard</a>
      <a href="#"><i class="gse-icon">📈</i> Player Stats</a>
      <a href="#"><i class="gse-icon">🏆</i> Battle Pass</a>
      <a href="#"><i class="gse-icon">💳</i> Subscription</a>
    </nav>
    <div class="gse-pass-status">
      <div class="gse-ps-title">Season 4 Pass</div>
      <div class="gse-ps-days">14 Days Left</div>
    </div>
  </div>

  <main class="gse-main">
    <header class="gse-header">
      <div class="gse-user">
        <img src="https://i.pravatar.cc/150?img=11" alt="Avatar">
        <div class="gse-user-info">
          <h2>Welcome back, Alex</h2>
          <span class="gse-badge gse-badge-gold">Premium Member</span>
        </div>
      </div>
      <button class="gse-btn gse-btn-primary">Manage Subscription</button>
    </header>

    <div class="gse-content">
      
      <!-- Battle Pass Progress -->
      <section class="gse-section">
        <div class="gse-section-header">
          <h3>Season 4 Battle Pass</h3>
          <span>Tier 42 / 100</span>
        </div>
        <div class="gse-bp-card">
          <div class="gse-bp-track">
            <!-- Tiers -->
            <div class="gse-bp-tier gse-tier-unlocked">
              <div class="gse-tier-num">40</div>
              <div class="gse-tier-reward" style="background-image:url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=100&auto=format&fit=crop')"></div>
            </div>
            <div class="gse-bp-tier gse-tier-unlocked">
              <div class="gse-tier-num">41</div>
              <div class="gse-tier-reward" style="background-image:url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=100&auto=format&fit=crop')"></div>
            </div>
            <div class="gse-bp-tier gse-tier-active">
              <div class="gse-tier-num">42</div>
              <div class="gse-tier-reward gse-glow" style="background-image:url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=100&auto=format&fit=crop')"></div>
            </div>
            <div class="gse-bp-tier">
              <div class="gse-tier-num">43</div>
              <div class="gse-tier-reward gse-locked">🔒</div>
            </div>
            <div class="gse-bp-tier">
              <div class="gse-tier-num">44</div>
              <div class="gse-tier-reward gse-locked">🔒</div>
            </div>
            <div class="gse-bp-tier gse-tier-epic">
              <div class="gse-tier-num">45</div>
              <div class="gse-tier-reward gse-locked">🔒</div>
            </div>
          </div>
          <div class="gse-bp-progress-bar">
            <div class="gse-bp-fill" style="width: 42%;"></div>
          </div>
          <p class="gse-bp-xp">2,450 XP needed for Tier 43</p>
        </div>
      </section>

      <div class="gse-grid">
        
        <!-- Player Engagement Stats -->
        <div class="gse-card">
          <div class="gse-card-header">
            <h3>Weekly Engagement</h3>
          </div>
          <div class="gse-stat-grid">
            <div class="gse-stat">
              <span class="gse-stat-lbl">Hours Played</span>
              <span class="gse-stat-val">24.5</span>
              <span class="gse-trend gse-up">↑ 2.1 hrs</span>
            </div>
            <div class="gse-stat">
              <span class="gse-stat-lbl">Matches Won</span>
              <span class="gse-stat-val">18</span>
              <span class="gse-trend gse-up">↑ 4</span>
            </div>
            <div class="gse-stat">
              <span class="gse-stat-lbl">XP Earned</span>
              <span class="gse-stat-val">42.5K</span>
              <span class="gse-trend gse-down">↓ 1.2K</span>
            </div>
            <div class="gse-stat">
              <span class="gse-stat-lbl">Rank</span>
              <span class="gse-stat-val" style="color:#eab308">Gold II</span>
              <span class="gse-trend">-</span>
            </div>
          </div>
        </div>

        <!-- Monetization / Subscription Management -->
        <div class="gse-card gse-sub-card">
          <div class="gse-card-header">
            <h3>Premium Benefits</h3>
          </div>
          <ul class="gse-benefits-list">
            <li><span class="gse-check">✓</span> 20% XP Boost Active</li>
            <li><span class="gse-check">✓</span> Exclusive Monthly Skin Unlocked</li>
            <li><span class="gse-check">✓</span> Priority Matchmaking</li>
            <li class="gse-locked-benefit"><span class="gse-cross">✕</span> Dedicated Private Servers</li>
          </ul>
          <div class="gse-sub-actions">
            <div class="gse-sub-price">$14.99<span>/mo</span></div>
            <button class="gse-btn gse-btn-outline">Upgrade Tier</button>
          </div>
        </div>

      </div>

    </div>
  </main>
</div>`,
  js: `// Gaming Subscription Ecosystem Logic
// Add a slow pulse to the active tier
const activeTier = document.querySelector('.gse-tier-active .gse-tier-reward');
if (activeTier) {
  activeTier.style.animation = 'gsePulse 2s infinite alternate';
}`,
  ts: `// Gaming Subscription Ecosystem Logic (TypeScript)
const activeTier = document.querySelector<HTMLDivElement>('.gse-tier-active .gse-tier-reward');
if (activeTier) {
  activeTier.style.animation = 'gsePulse 2s infinite alternate';
}`,
  css: `/* Gaming Subscription Ecosystem Styles */
.gse-wrapper {
  display: flex;
  min-height: 100vh;
  background: #09090b; /* Zinc 950 */
  color: #fff;
  font-family: 'Inter', sans-serif;
}

/* Sidebar */
.gse-sidebar {
  width: 260px;
  background: #18181b; /* Zinc 900 */
  border-right: 1px solid #27272a;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.gse-brand {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: #eab308;
  margin-bottom: 48px;
  font-style: italic;
}

.gse-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.gse-nav a {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #a1a1aa;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

.gse-nav a:hover {
  background: #27272a;
  color: #fff;
}

.gse-nav a.active {
  background: rgba(234, 179, 8, 0.1);
  color: #eab308;
  border-left: 3px solid #eab308;
}

.gse-icon { font-style: normal; font-size: 1.2rem; }

.gse-pass-status {
  background: linear-gradient(135deg, #1f2937, #111827);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #374151;
  text-align: center;
}

.gse-ps-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 4px; color: #fff; }
.gse-ps-days { font-size: 0.8rem; color: #ef4444; font-weight: 600; }

/* Main */
.gse-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.gse-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px;
  border-bottom: 1px solid #27272a;
}

.gse-user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.gse-user img {
  width: 56px; height: 56px;
  border-radius: 50%;
  border: 2px solid #eab308;
}

.gse-user-info h2 { margin: 0 0 4px 0; font-size: 1.5rem; }
.gse-badge {
  font-size: 0.75rem; font-weight: 700;
  padding: 2px 8px; border-radius: 12px;
  text-transform: uppercase;
}
.gse-badge-gold { background: #eab308; color: #000; }

.gse-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.gse-btn-primary { background: #fff; color: #000; }
.gse-btn-primary:hover { background: #d4d4d8; }

.gse-btn-outline { background: transparent; border: 1px solid #52525b; color: #fff; }
.gse-btn-outline:hover { background: #27272a; }

.gse-content {
  padding: 48px;
  max-width: 1200px;
}

.gse-section { margin-bottom: 40px; }
.gse-section-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 20px;
}
.gse-section-header h3 { margin: 0; font-size: 1.25rem; }
.gse-section-header span { color: #a1a1aa; font-weight: 600; }

/* Battle Pass Track */
.gse-bp-card {
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 16px;
  padding: 32px;
}

.gse-bp-track {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.gse-bp-tier {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.gse-tier-num {
  font-size: 0.85rem; font-weight: 700; color: #71717a;
}

.gse-tier-reward {
  width: 80px; height: 80px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  border: 2px solid #3f3f46;
  display: flex; justify-content: center; align-items: center;
  font-size: 1.5rem;
}

.gse-tier-unlocked .gse-tier-num { color: #10b981; }
.gse-tier-unlocked .gse-tier-reward { border-color: #10b981; opacity: 0.7; }

.gse-tier-active .gse-tier-num { color: #eab308; }
.gse-tier-active .gse-tier-reward { border-color: #eab308; }
.gse-glow { box-shadow: 0 0 20px rgba(234, 179, 8, 0.4); }

.gse-tier-epic .gse-tier-num { color: #a855f7; }
.gse-tier-epic .gse-tier-reward { border-color: #a855f7; background: rgba(168, 85, 247, 0.1); }

.gse-bp-progress-bar {
  height: 8px;
  background: #27272a;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.gse-bp-fill {
  height: 100%;
  background: linear-gradient(90deg, #eab308, #f59e0b);
  border-radius: 4px;
}

.gse-bp-xp { margin: 0; font-size: 0.85rem; color: #a1a1aa; text-align: right; }

@keyframes gsePulse {
  from { box-shadow: 0 0 10px rgba(234, 179, 8, 0.2); }
  to { box-shadow: 0 0 25px rgba(234, 179, 8, 0.6); transform: scale(1.05); }
}

/* Grid */
.gse-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.gse-card {
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 16px;
  padding: 24px;
}

.gse-card-header h3 { margin: 0 0 24px 0; font-size: 1.1rem; }

.gse-stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.gse-stat {
  display: flex; flex-direction: column;
  background: #09090b; padding: 16px; border-radius: 12px;
}
.gse-stat-lbl { font-size: 0.8rem; color: #71717a; text-transform: uppercase; margin-bottom: 8px; }
.gse-stat-val { font-size: 1.5rem; font-weight: 700; margin-bottom: 4px; }
.gse-trend { font-size: 0.8rem; }
.gse-up { color: #10b981; }
.gse-down { color: #ef4444; }

/* Sub Card */
.gse-benefits-list {
  list-style: none; padding: 0; margin: 0 0 32px 0;
  display: flex; flex-direction: column; gap: 12px;
}
.gse-benefits-list li { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; }
.gse-check { color: #10b981; font-weight: bold; }
.gse-cross { color: #ef4444; font-weight: bold; }
.gse-locked-benefit { color: #71717a; }

.gse-sub-actions {
  display: flex; justify-content: space-between; align-items: center;
  border-top: 1px solid #27272a; padding-top: 24px;
}
.gse-sub-price { font-size: 1.5rem; font-weight: 800; color: #eab308; }
.gse-sub-price span { font-size: 0.9rem; color: #71717a; }

/* Responsive */
@media (max-width: 1024px) {
  .gse-grid { grid-template-columns: 1fr; }
  .gse-sidebar { width: 80px; padding: 24px 12px; }
  .gse-brand, .gse-nav a text, .gse-pass-status { display: none; }
  .gse-nav a { justify-content: center; padding: 16px 0; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a complete gaming subscription dashboard featuring player analytics, battle pass performance, premium membership tracking, and upgrade opportunities.`
};
