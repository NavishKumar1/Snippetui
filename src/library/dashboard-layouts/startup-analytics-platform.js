/**
 * Component: Startup Analytics Platform
 * Category: dashboard-layouts
 */

export const component = {
  id: 'startup-analytics-platform',
  name: 'Startup Analytics Platform',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="suap-wrapper">
  
  <div class="suap-container">
    
    <header class="suap-header">
      <div class="suap-logo">
        <div class="suap-logo-mark">⚡</div>
        Velocity
      </div>
      <nav class="suap-nav">
        <a href="#" class="active">Overview</a>
        <a href="#">Metrics</a>
        <a href="#">Users</a>
        <a href="#">Settings</a>
      </nav>
      <div class="suap-actions">
        <button class="suap-btn suap-btn-outline">Invite Team</button>
        <button class="suap-btn suap-btn-primary">Upgrade Plan</button>
      </div>
    </header>

    <div class="suap-main">
      
      <div class="suap-title-area">
        <h1>Growth Dashboard</h1>
        <p>Your startup is growing fast. Here's what happened today.</p>
      </div>

      <div class="suap-stats-row">
        <div class="suap-stat">
          <div class="suap-s-label">Signups (Today)</div>
          <div class="suap-s-val">142</div>
          <div class="suap-s-trend suap-up">+12% vs yesterday</div>
        </div>
        <div class="suap-stat">
          <div class="suap-s-label">Active Users</div>
          <div class="suap-s-val">8,240</div>
          <div class="suap-s-trend suap-up">+4.5% vs yesterday</div>
        </div>
        <div class="suap-stat">
          <div class="suap-s-label">MRR</div>
          <div class="suap-s-val">$14,200</div>
          <div class="suap-s-trend suap-up">+$450 today</div>
        </div>
        <div class="suap-stat">
          <div class="suap-s-label">Avg Session</div>
          <div class="suap-s-val">4m 12s</div>
          <div class="suap-s-trend suap-down">-12s vs yesterday</div>
        </div>
      </div>

      <div class="suap-grid">
        
        <!-- Main Growth Chart -->
        <div class="suap-card suap-span-2">
          <div class="suap-card-head">
            <h3>User Acquisition vs Revenue</h3>
            <div class="suap-pill-tabs">
              <button class="active">7D</button>
              <button>30D</button>
              <button>3M</button>
            </div>
          </div>
          <div class="suap-chart-wrapper">
            <svg viewBox="0 0 500 150" class="suap-chart" preserveAspectRatio="none">
              <!-- Revenue Area -->
              <path d="M0,150 L0,120 Q100,130 200,90 T400,60 T500,30 L500,150 Z" fill="url(#suap-grad-rev)" />
              <path d="M0,120 Q100,130 200,90 T400,60 T500,30" fill="none" stroke="#10b981" stroke-width="2" />
              
              <!-- Users Area -->
              <path d="M0,150 L0,140 Q150,140 250,110 T450,70 T500,50 L500,150 Z" fill="url(#suap-grad-users)" />
              <path d="M0,140 Q150,140 250,110 T450,70 T500,50" fill="none" stroke="#3b82f6" stroke-width="2" />
              
              <defs>
                <linearGradient id="suap-grad-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(16, 185, 129, 0.2)" />
                  <stop offset="100%" stop-color="rgba(16, 185, 129, 0)" />
                </linearGradient>
                <linearGradient id="suap-grad-users" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(59, 130, 246, 0.2)" />
                  <stop offset="100%" stop-color="rgba(59, 130, 246, 0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <!-- Live Activity Feed -->
        <div class="suap-card">
          <div class="suap-card-head">
            <h3>Live Activity</h3>
            <span class="suap-live-dot"></span>
          </div>
          <div class="suap-activity-list">
            <div class="suap-act-item">
              <div class="suap-ai-icon suap-bg-green">💰</div>
              <div class="suap-ai-info">
                <strong>New Pro Subscription</strong>
                <span>startup-founder@xyz.com</span>
              </div>
              <div class="suap-ai-time">Just now</div>
            </div>
            <div class="suap-act-item">
              <div class="suap-ai-icon suap-bg-blue">👋</div>
              <div class="suap-ai-info">
                <strong>New User Signup</strong>
                <span>dev_mike@test.com</span>
              </div>
              <div class="suap-ai-time">2m ago</div>
            </div>
            <div class="suap-act-item">
              <div class="suap-ai-icon suap-bg-blue">👋</div>
              <div class="suap-ai-info">
                <strong>New User Signup</strong>
                <span>sarah_design@test.com</span>
              </div>
              <div class="suap-ai-time">5m ago</div>
            </div>
            <div class="suap-act-item">
              <div class="suap-ai-icon suap-bg-orange">⭐</div>
              <div class="suap-ai-info">
                <strong>Feature Unlocked</strong>
                <span>team@company.io</span>
              </div>
              <div class="suap-ai-time">12m ago</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</div>`,
  js: `// Startup Analytics Dashboard Logic
// Simulate live activity pulsing
const liveDot = document.querySelector('.suap-live-dot');
if (liveDot) {
  setInterval(() => {
    liveDot.style.opacity = liveDot.style.opacity === '0.2' ? '1' : '0.2';
  }, 1000);
}`,
  ts: `// Startup Analytics Dashboard Logic (TypeScript)
const liveDot = document.querySelector<HTMLSpanElement>('.suap-live-dot');
if (liveDot) {
  setInterval(() => {
    liveDot.style.opacity = liveDot.style.opacity === '0.2' ? '1' : '0.2';
  }, 1000);
}`,
  css: `/* Startup Analytics Platform Styles */
.suap-wrapper {
  background: #fafafa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #171717;
}

.suap-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.suap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 40px;
}

.suap-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.5px;
}

.suap-logo-mark {
  background: #171717;
  color: #fff;
  width: 32px; height: 32px;
  border-radius: 8px;
  display: flex; justify-content: center; align-items: center;
}

.suap-nav {
  display: flex;
  gap: 32px;
}

.suap-nav a {
  text-decoration: none;
  color: #737373;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}

.suap-nav a:hover, .suap-nav a.active { color: #171717; }

.suap-actions { display: flex; gap: 12px; }

.suap-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.suap-btn-outline { background: #fff; border: 1px solid #d4d4d4; color: #171717; }
.suap-btn-outline:hover { background: #f5f5f5; }

.suap-btn-primary { background: #171717; color: #fff; }
.suap-btn-primary:hover { background: #404040; }

/* Main */
.suap-title-area { margin-bottom: 32px; }
.suap-title-area h1 { margin: 0 0 8px 0; font-size: 2rem; font-weight: 700; letter-spacing: -1px; }
.suap-title-area p { margin: 0; color: #737373; font-size: 1.1rem; }

/* Stats */
.suap-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.suap-stat {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.suap-s-label { font-size: 0.85rem; color: #737373; font-weight: 500; margin-bottom: 8px; }
.suap-s-val { font-size: 2rem; font-weight: 700; letter-spacing: -1px; margin-bottom: 8px; }
.suap-s-trend { font-size: 0.85rem; font-weight: 500; }
.suap-up { color: #10b981; }
.suap-down { color: #ef4444; }

/* Grid */
.suap-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  padding-bottom: 60px;
}

.suap-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.suap-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.suap-card-head h3 { margin: 0; font-size: 1.1rem; font-weight: 600; }

.suap-pill-tabs {
  display: flex;
  background: #f5f5f5;
  border-radius: 20px;
  padding: 4px;
}

.suap-pill-tabs button {
  background: transparent; border: none;
  padding: 4px 12px; border-radius: 16px;
  font-size: 0.8rem; font-weight: 600; color: #737373;
  cursor: pointer;
}
.suap-pill-tabs button.active { background: #fff; color: #171717; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }

.suap-chart-wrapper {
  height: 300px;
}
.suap-chart { width: 100%; height: 100%; overflow: visible; }

/* Live Activity */
.suap-live-dot {
  width: 10px; height: 10px;
  background: #ef4444; border-radius: 50%;
  transition: opacity 0.5s;
}

.suap-activity-list {
  display: flex; flex-direction: column; gap: 20px;
}

.suap-act-item {
  display: flex; align-items: flex-start; gap: 12px;
}

.suap-ai-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; justify-content: center; align-items: center;
  font-size: 1rem;
}
.suap-bg-green { background: #d1fae5; }
.suap-bg-blue { background: #dbeafe; }
.suap-bg-orange { background: #fef3c7; }

.suap-ai-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.suap-ai-info strong { font-size: 0.9rem; font-weight: 600; }
.suap-ai-info span { font-size: 0.85rem; color: #737373; }

.suap-ai-time { font-size: 0.75rem; color: #a3a3a3; font-weight: 500; }

/* Responsive */
@media (max-width: 1024px) {
  .suap-grid { grid-template-columns: 1fr; }
  .suap-stats-row { grid-template-columns: 1fr 1fr; }
  .suap-nav { display: none; }
}
@media (max-width: 600px) {
  .suap-stats-row { grid-template-columns: 1fr; }
  .suap-actions { display: none; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a startup-focused dashboard combining rapid growth metrics and monetization. Focus on simplicity, speed, and investor-ready data presentation.`
};
