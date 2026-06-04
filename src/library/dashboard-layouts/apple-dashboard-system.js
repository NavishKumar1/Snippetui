/**
 * Component: Apple Dashboard System
 * Category: dashboard-layouts
 */

export const component = {
  id: 'apple-dashboard-system',
  name: 'Apple-Level Dashboard',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="apld-wrapper">
  <!-- Sidebar -->
  <aside class="apld-sidebar">
    <div class="apld-brand">
      <div class="apld-logo"></div>
      <span>Platform</span>
    </div>
    <nav class="apld-nav">
      <a href="#" class="active">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        Overview
      </a>
      <a href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        Analytics
      </a>
      <a href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        Audience
      </a>
      <a href="#">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M7 15h0M2 9.5h20"></path></svg>
        Billing
      </a>
    </nav>
    <div class="apld-user">
      <img src="https://i.pravatar.cc/150?img=11" alt="User">
      <span>Alexander</span>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="apld-main">
    <header class="apld-header">
      <div class="apld-h-text">
        <h1>Overview</h1>
        <p>Thursday, October 24</p>
      </div>
      <div class="apld-h-actions">
        <div class="apld-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search...">
        </div>
        <button class="apld-btn-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </button>
      </div>
    </header>

    <div class="apld-content">
      
      <!-- Top KPIs -->
      <section class="apld-kpis">
        <div class="apld-card apld-kpi">
          <div class="apld-kpi-head">
            <span>Revenue</span>
            <div class="apld-icon apld-bg-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>
          </div>
          <div class="apld-kpi-val">$124,500</div>
          <div class="apld-kpi-trend apld-green">↑ 12% vs last month</div>
        </div>

        <div class="apld-card apld-kpi">
          <div class="apld-kpi-head">
            <span>Active Users</span>
            <div class="apld-icon apld-bg-purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
          </div>
          <div class="apld-kpi-val">42.8K</div>
          <div class="apld-kpi-trend apld-green">↑ 8.2% vs last month</div>
        </div>

        <div class="apld-card apld-kpi">
          <div class="apld-kpi-head">
            <span>Churn Rate</span>
            <div class="apld-icon apld-bg-orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
          </div>
          <div class="apld-kpi-val">2.4%</div>
          <div class="apld-kpi-trend apld-red">↓ 0.5% vs last month</div>
        </div>
      </section>

      <!-- Main Chart & Activity -->
      <section class="apld-middle">
        <div class="apld-card apld-chart-box">
          <div class="apld-card-header">
            <h3>Growth Overview</h3>
            <select class="apld-select"><option>This Year</option><option>Last Year</option></select>
          </div>
          <div class="apld-mock-chart">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" class="apld-svg-chart">
              <path d="M0,25 C20,20 30,28 50,15 C70,2 80,18 100,5 L100,30 L0,30 Z" fill="url(#apld-blue-grad)" />
              <path d="M0,25 C20,20 30,28 50,15 C70,2 80,18 100,5" fill="none" stroke="#0071e3" stroke-width="1.5" />
              <defs>
                <linearGradient id="apld-blue-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(0, 113, 227, 0.2)" />
                  <stop offset="100%" stop-color="rgba(0, 113, 227, 0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div class="apld-card apld-activity-box">
          <div class="apld-card-header">
            <h3>Recent Activity</h3>
          </div>
          <ul class="apld-activity-list">
            <li>
              <div class="apld-act-icon">↑</div>
              <div class="apld-act-info">
                <strong>Pro Plan Upgrade</strong>
                <span>sarah@example.com</span>
              </div>
              <div class="apld-act-time">2m ago</div>
            </li>
            <li>
              <div class="apld-act-icon apld-bg-green">+</div>
              <div class="apld-act-info">
                <strong>New Registration</strong>
                <span>mike.w@example.com</span>
              </div>
              <div class="apld-act-time">14m ago</div>
            </li>
            <li>
              <div class="apld-act-icon apld-bg-orange">⚠</div>
              <div class="apld-act-info">
                <strong>Payment Failed</strong>
                <span>alex@example.com</span>
              </div>
              <div class="apld-act-time">1h ago</div>
            </li>
            <li>
              <div class="apld-act-icon">↑</div>
              <div class="apld-act-info">
                <strong>Elite Plan Upgrade</strong>
                <span>jessica@example.com</span>
              </div>
              <div class="apld-act-time">3h ago</div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Monetization Section -->
      <section class="apld-monetization">
        <div class="apld-card apld-sub-card">
          <div class="apld-sub-info">
            <span class="apld-tag">CURRENT PLAN</span>
            <h3>Platform Pro</h3>
            <p>Access to advanced analytics and API endpoints.</p>
          </div>
          <div class="apld-sub-price">
            <strong>$49</strong><span>/mo</span>
          </div>
        </div>

        <div class="apld-card apld-upgrade-card">
          <div class="apld-ug-content">
            <h3>Ready for more?</h3>
            <p>Upgrade to Elite for unlimited API calls, dedicated support, and custom data modeling.</p>
            <button class="apld-btn-primary">Upgrade to Elite</button>
          </div>
          <div class="apld-ug-graphic"></div>
        </div>
      </section>
      
    </div>
  </main>
</div>`,
  js: `// Apple Dashboard System Logic
// Simple entrance animation
const apldCards = document.querySelectorAll('.apld-card');
apldCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  setTimeout(() => {
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 100 * index);
});`,
  ts: `// Apple Dashboard System Logic (TypeScript)
const apldCards = document.querySelectorAll<HTMLDivElement>('.apld-card');
apldCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  setTimeout(() => {
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 100 * index);
});`,
  css: `/* Apple Dashboard System Styles */
.apld-wrapper {
  display: flex;
  height: 100vh;
  min-height: 800px;
  background: #f5f5f7; /* Classic Apple light gray background */
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #1d1d1f;
  overflow: hidden;
}

/* Sidebar */
.apld-sidebar {
  width: 260px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  z-index: 10;
}

.apld-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  margin-bottom: 40px;
}

.apld-logo {
  width: 28px;
  height: 28px;
  background: #1d1d1f;
  border-radius: 8px;
}

.apld-brand span {
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: -0.5px;
}

.apld-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.apld-nav a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  color: #515154;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
}

.apld-nav a:hover {
  background: rgba(0,0,0,0.04);
}

.apld-nav a.active {
  background: #1d1d1f;
  color: #fff;
}

.apld-nav svg { width: 18px; height: 18px; }

.apld-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.apld-user img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.apld-user span {
  font-weight: 500;
  font-size: 0.95rem;
}

/* Main Area */
.apld-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.apld-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px 24px;
}

.apld-h-text h1 {
  margin: 0 0 4px 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.apld-h-text p {
  margin: 0;
  color: #86868b;
  font-size: 0.95rem;
}

.apld-h-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.apld-search {
  position: relative;
  display: flex;
  align-items: center;
}

.apld-search svg {
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  color: #86868b;
}

.apld-search input {
  background: #e8e8ed;
  border: none;
  border-radius: 12px;
  padding: 10px 10px 10px 36px;
  width: 240px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #1d1d1f;
  outline: none;
  transition: width 0.3s;
}

.apld-search input:focus { width: 280px; }

.apld-btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #1d1d1f;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.apld-content {
  padding: 0 48px 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Cards */
.apld-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.04);
}

/* KPIs */
.apld-kpis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.apld-kpi-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: #515154;
  font-weight: 500;
  font-size: 0.95rem;
}

.apld-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.apld-icon svg { width: 16px; height: 16px; }

.apld-bg-blue { background: #0071e3; }
.apld-bg-purple { background: #5e5ce6; }
.apld-bg-orange { background: #ff9f0a; }

.apld-kpi-val {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 8px;
}

.apld-kpi-trend {
  font-size: 0.85rem;
  font-weight: 500;
}
.apld-green { color: #34c759; }
.apld-red { color: #ff3b30; }

/* Middle Section */
.apld-middle {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.apld-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.apld-card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.apld-select {
  border: none;
  background: #f5f5f7;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  color: #1d1d1f;
  outline: none;
}

.apld-mock-chart {
  height: 250px;
  width: 100%;
}
.apld-svg-chart {
  width: 100%; height: 100%; overflow: visible;
}

.apld-activity-list {
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.apld-activity-list li {
  display: flex;
  align-items: center;
  gap: 12px;
}

.apld-act-icon {
  width: 36px;
  height: 36px;
  background: #0071e3;
  color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.apld-bg-green { background: #34c759; }

.apld-act-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.apld-act-info strong { font-size: 0.9rem; font-weight: 600; }
.apld-act-info span { font-size: 0.8rem; color: #86868b; }
.apld-act-time { font-size: 0.8rem; color: #86868b; }

/* Monetization */
.apld-monetization {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
}

.apld-sub-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #1d1d1f 0%, #434347 100%);
  color: #fff;
  border: none;
}

.apld-tag {
  background: rgba(255,255,255,0.2);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.apld-sub-info h3 { margin: 12px 0 8px 0; font-size: 1.5rem; }
.apld-sub-info p { color: rgba(255,255,255,0.7); font-size: 0.9rem; margin: 0; line-height: 1.4; }

.apld-sub-price {
  margin-top: 24px;
}
.apld-sub-price strong { font-size: 2.5rem; letter-spacing: -1px; }
.apld-sub-price span { color: rgba(255,255,255,0.7); }

.apld-upgrade-card {
  display: flex;
  align-items: center;
  background: #fff;
  overflow: hidden;
  padding: 0;
}

.apld-ug-content {
  padding: 32px;
  flex: 1;
}

.apld-ug-content h3 { margin: 0 0 12px 0; font-size: 1.5rem; }
.apld-ug-content p { color: #515154; margin: 0 0 24px 0; line-height: 1.5; }

.apld-btn-primary {
  background: #0071e3;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px; /* Pill shape */
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.apld-btn-primary:hover { background: #0077ed; }

.apld-ug-graphic {
  width: 200px;
  height: 100%;
  background: linear-gradient(135deg, #fecb2e 0%, #fc354c 100%);
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 1024px) {
  .apld-kpis, .apld-middle, .apld-monetization { grid-template-columns: 1fr; }
  .apld-sidebar { width: 80px; }
  .apld-brand span, .apld-nav a text, .apld-user span { display: none; }
  .apld-nav a { justify-content: center; padding: 16px 0; }
  .apld-content { padding: 0 24px 24px; }
  .apld-header { padding: 24px; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a world-class Dashboard and Monetization System inspired by Apple's design philosophy. Create a highly polished interface featuring Statistics Widgets, Analytics Charts, Activity Feeds, Subscription Cards, and Upgrade Banners.`
};
