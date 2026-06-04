/**
 * Component: Real-Time Analytics Center
 * Category: dashboard-layouts
 */

export const component = {
  id: 'real-time-analytics-center',
  name: 'Real-Time Analytics Center',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="rta-wrapper">
  
  <header class="rta-header">
    <div class="rta-logo">
      <div class="rta-pulse-icon"></div>
      LIVE ANALYTICS
    </div>
    <div class="rta-server-status">
      <span>System Status: Optimal</span>
      <div class="rta-status-bars">
        <i></i><i></i><i></i><i></i>
      </div>
    </div>
  </header>

  <main class="rta-main">
    
    <!-- Top Active View -->
    <div class="rta-active-grid">
      
      <div class="rta-card rta-card-dark">
        <div class="rta-c-head">Active Users Right Now</div>
        <div class="rta-active-val">12,482</div>
        <div class="rta-active-sub">Page views per minute: <strong>4,250</strong></div>
      </div>
      
      <div class="rta-card rta-card-dark">
        <div class="rta-c-head">Current Revenue Rate</div>
        <div class="rta-active-val" style="color: #10b981;">$42.50 / min</div>
        <div class="rta-active-sub">Estimated Daily MRR Gain: <strong>+$4,200</strong></div>
      </div>

    </div>

    <!-- Main Grid -->
    <div class="rta-grid">
      
      <!-- Live Traffic Chart -->
      <div class="rta-card rta-span-2">
        <div class="rta-card-header">
          <h3>Live Traffic Activity</h3>
          <span class="rta-badge">Updating 1s</span>
        </div>
        <div class="rta-chart-box">
          <svg viewBox="0 0 800 200" preserveAspectRatio="none" class="rta-live-chart">
            <!-- Simulated moving chart using stroke-dashoffset animation -->
            <path class="rta-line-wave" d="M0,150 Q50,180 100,120 T200,80 T300,140 T400,60 T500,100 T600,40 T700,130 T800,90" fill="none" stroke="#3b82f6" stroke-width="3" />
            <path class="rta-area-wave" d="M0,150 Q50,180 100,120 T200,80 T300,140 T400,60 T500,100 T600,40 T700,130 T800,90 L800,200 L0,200 Z" fill="url(#rta-blue-grad)" />
            <defs>
              <linearGradient id="rta-blue-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stop-color="rgba(59, 130, 246, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Live Events Stream -->
      <div class="rta-card">
        <div class="rta-card-header">
          <h3>Live Events</h3>
        </div>
        <div class="rta-events-list">
          <div class="rta-event rta-e-money">
            <span class="rta-e-time">14:02:45</span>
            <span class="rta-e-msg">Pro Plan Checkout</span>
            <span class="rta-e-val">+$49.00</span>
          </div>
          <div class="rta-event">
            <span class="rta-e-time">14:02:42</span>
            <span class="rta-e-msg">User Signup (US)</span>
          </div>
          <div class="rta-event rta-e-money">
            <span class="rta-e-time">14:02:38</span>
            <span class="rta-e-msg">Elite Plan Checkout</span>
            <span class="rta-e-val">+$149.00</span>
          </div>
          <div class="rta-event">
            <span class="rta-e-time">14:02:35</span>
            <span class="rta-e-msg">Password Reset</span>
          </div>
          <div class="rta-event rta-e-warn">
            <span class="rta-e-time">14:02:30</span>
            <span class="rta-e-msg">Failed Payment</span>
            <span class="rta-e-val">-$29.00</span>
          </div>
          <div class="rta-event">
            <span class="rta-e-time">14:02:22</span>
            <span class="rta-e-msg">User Signup (EU)</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Monetization Forecasting -->
    <div class="rta-grid">
      <div class="rta-card rta-span-full">
        <div class="rta-card-header">
          <h3>Real-Time Monetization Forecasting</h3>
        </div>
        <div class="rta-forecast-grid">
          
          <div class="rta-fc-item">
            <h4>Predicted EOD Revenue</h4>
            <div class="rta-fc-val">$12,450</div>
            <div class="rta-fc-bar"><div style="width: 80%; background:#10b981;"></div></div>
          </div>
          
          <div class="rta-fc-item">
            <h4>Expected New Subscribers</h4>
            <div class="rta-fc-val">142</div>
            <div class="rta-fc-bar"><div style="width: 65%; background:#3b82f6;"></div></div>
          </div>

          <div class="rta-fc-item">
            <h4>Current Conversion Rate</h4>
            <div class="rta-fc-val">4.2%</div>
            <div class="rta-fc-bar"><div style="width: 42%; background:#8b5cf6;"></div></div>
          </div>

          <div class="rta-fc-item">
            <h4>Upgrade Velocity</h4>
            <div class="rta-fc-val">12/hr</div>
            <div class="rta-fc-bar"><div style="width: 55%; background:#f59e0b;"></div></div>
          </div>

        </div>
      </div>
    </div>

  </main>
</div>`,
  js: `// Real Time Analytics Logic
const val = document.querySelector('.rta-active-val');
if(val) {
  setInterval(() => {
    // Simulate real-time fluctuation
    const current = 12482 + Math.floor(Math.random() * 20 - 10);
    val.innerText = current.toLocaleString();
  }, 2000);
}`,
  ts: `// Real Time Analytics Logic (TypeScript)
const val = document.querySelector<HTMLDivElement>('.rta-active-val');
if(val) {
  setInterval(() => {
    const current = 12482 + Math.floor(Math.random() * 20 - 10);
    val.innerText = current.toLocaleString();
  }, 2000);
}`,
  css: `/* Real Time Analytics Center Styles */
.rta-wrapper {
  background: #0f172a; /* Deep slate background */
  min-height: 100vh;
  font-family: 'JetBrains Mono', 'Courier New', monospace; /* Monospace for data vibe */
  color: #f8fafc;
}

.rta-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 40px; background: #1e293b; border-bottom: 1px solid #334155;
}

.rta-logo {
  display: flex; align-items: center; gap: 12px;
  font-size: 1.1rem; font-weight: 700; letter-spacing: 2px; color: #3b82f6;
}

.rta-pulse-icon {
  width: 12px; height: 12px; border-radius: 50%; background: #ef4444;
  box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  animation: rtaPulse 1.5s infinite;
}

@keyframes rtaPulse {
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

.rta-server-status {
  display: flex; align-items: center; gap: 16px; font-size: 0.85rem; color: #94a3b8;
}

.rta-status-bars {
  display: flex; gap: 4px; align-items: flex-end; height: 16px;
}
.rta-status-bars i {
  width: 4px; background: #10b981; border-radius: 2px;
  animation: rtaBars 1s infinite alternate;
}
.rta-status-bars i:nth-child(1) { height: 60%; animation-delay: 0.1s; }
.rta-status-bars i:nth-child(2) { height: 100%; animation-delay: 0.3s; }
.rta-status-bars i:nth-child(3) { height: 40%; animation-delay: 0.5s; }
.rta-status-bars i:nth-child(4) { height: 80%; animation-delay: 0.2s; }

@keyframes rtaBars {
  from { transform: scaleY(0.5); }
  to { transform: scaleY(1); }
}

/* Main */
.rta-main { padding: 40px; max-width: 1400px; margin: 0 auto; }

.rta-active-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;
}

.rta-card {
  background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px;
}

.rta-card-dark { background: #020617; border-color: #1e293b; text-align: center; }

.rta-c-head { font-size: 0.85rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
.rta-active-val { font-size: 4rem; font-weight: 800; font-family: 'Inter', sans-serif; line-height: 1; margin-bottom: 12px; }
.rta-active-sub { font-size: 0.9rem; color: #cbd5e1; }
.rta-active-sub strong { color: #fff; font-size: 1.1rem; }

/* Grid */
.rta-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 24px; }
.rta-span-2 { grid-column: span 1; }
.rta-span-full { grid-column: span 2; }

.rta-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.rta-card-header h3 { margin: 0; font-size: 1rem; font-family: 'Inter', sans-serif; }
.rta-badge { background: rgba(59, 130, 246, 0.2); color: #60a5fa; font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; }

/* Chart */
.rta-chart-box { height: 250px; overflow: hidden; }
.rta-live-chart { width: 100%; height: 100%; }

/* Animate the stroke to simulate moving data */
.rta-line-wave {
  stroke-dasharray: 50 20;
  animation: rtaMoveWave 2s linear infinite;
}
@keyframes rtaMoveWave {
  to { stroke-dashoffset: -70; }
}

/* Events List */
.rta-events-list {
  display: flex; flex-direction: column; gap: 12px; height: 250px; overflow-y: auto;
}

.rta-events-list::-webkit-scrollbar { width: 4px; }
.rta-events-list::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }

.rta-event { display: flex; gap: 12px; font-size: 0.85rem; padding: 8px 0; border-bottom: 1px solid #334155; }
.rta-e-time { color: #64748b; }
.rta-e-msg { flex: 1; color: #cbd5e1; }
.rta-e-val { font-weight: bold; }

.rta-e-money .rta-e-val { color: #10b981; }
.rta-e-warn .rta-e-val { color: #ef4444; }

/* Forecasting */
.rta-forecast-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; font-family: 'Inter', sans-serif;
}

.rta-fc-item h4 { margin: 0 0 12px 0; font-size: 0.85rem; color: #94a3b8; font-weight: 500; }
.rta-fc-val { font-size: 1.75rem; font-weight: 700; margin-bottom: 12px; }
.rta-fc-bar { height: 4px; background: #334155; border-radius: 2px; }
.rta-fc-bar div { height: 100%; border-radius: 2px; }

/* Responsive */
@media (max-width: 1024px) {
  .rta-grid { grid-template-columns: 1fr; }
  .rta-forecast-grid { grid-template-columns: 1fr 1fr; }
  .rta-active-grid { grid-template-columns: 1fr; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a real-time analytics center featuring live statistics, dynamic charts, user activity streams, and monetization forecasting.`
};
