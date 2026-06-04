/**
 * Component: Enterprise Monetization Hub
 * Category: dashboard-layouts
 */

export const component = {
  id: 'enterprise-monetization-hub',
  name: 'Enterprise Monetization Hub',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="emh-wrapper">
  
  <!-- Sidebar -->
  <aside class="emh-sidebar">
    <div class="emh-brand">Omnistack</div>
    
    <div class="emh-nav-group">
      <div class="emh-ng-title">Revenue</div>
      <a href="#" class="active"><i class="emh-i-mrr"></i> MRR Overview</a>
      <a href="#"><i class="emh-i-sub"></i> Subscriptions</a>
      <a href="#"><i class="emh-i-inv"></i> Invoices</a>
    </div>

    <div class="emh-nav-group">
      <div class="emh-ng-title">Analytics</div>
      <a href="#"><i class="emh-i-cht"></i> Conversion Funnel</a>
      <a href="#"><i class="emh-i-chn"></i> Churn Analysis</a>
      <a href="#"><i class="emh-i-prc"></i> Pricing Experiments</a>
    </div>
  </aside>

  <!-- Main -->
  <main class="emh-main">
    
    <header class="emh-header">
      <h2>Monetization Command Center</h2>
      <div class="emh-h-actions">
        <select class="emh-select"><option>All Regions</option><option>NA</option><option>EMEA</option></select>
        <button class="emh-btn-primary">Create Campaign</button>
      </div>
    </header>

    <div class="emh-content">
      
      <!-- Top Level KPI Cards -->
      <div class="emh-kpi-grid">
        <div class="emh-kpi-card">
          <div class="emh-kpi-lbl">Total Annual Recurring Revenue</div>
          <div class="emh-kpi-val">$14.2M</div>
          <div class="emh-kpi-meta"><span class="emh-pos">+12% YoY</span> <span class="emh-target">Target: $15M</span></div>
        </div>
        <div class="emh-kpi-card">
          <div class="emh-kpi-lbl">Average Revenue Per User (ARPU)</div>
          <div class="emh-kpi-val">$840</div>
          <div class="emh-kpi-meta"><span class="emh-pos">+$24 MoM</span></div>
        </div>
        <div class="emh-kpi-card">
          <div class="emh-kpi-lbl">Enterprise Upgrades (MTD)</div>
          <div class="emh-kpi-val">42</div>
          <div class="emh-kpi-meta"><span class="emh-pos">+8 vs Last Month</span></div>
        </div>
      </div>

      <!-- Complex Layout Area -->
      <div class="emh-layout">
        
        <!-- Main Revenue Chart -->
        <div class="emh-card emh-span-2">
          <div class="emh-card-header">
            <h3>Revenue by Tier</h3>
            <div class="emh-tabs">
              <button class="active">Daily</button><button>Weekly</button><button>Monthly</button>
            </div>
          </div>
          <div class="emh-chart-wrapper">
            <!-- Simulated Stacked Area Chart -->
            <svg viewBox="0 0 800 300" preserveAspectRatio="none" class="emh-chart">
              <path d="M0,300 L0,250 Q200,240 400,200 T800,150 L800,300 Z" fill="#64748b" opacity="0.2" />
              <path d="M0,250 Q200,240 400,200 T800,150" fill="none" stroke="#64748b" stroke-width="2" />

              <path d="M0,300 L0,180 Q200,200 400,120 T800,80 L800,300 Z" fill="#3b82f6" opacity="0.3" />
              <path d="M0,180 Q200,200 400,120 T800,80" fill="none" stroke="#3b82f6" stroke-width="2" />

              <path d="M0,300 L0,100 Q200,80 400,60 T800,20 L800,300 Z" fill="#0f172a" opacity="0.4" />
              <path d="M0,100 Q200,80 400,60 T800,20" fill="none" stroke="#0f172a" stroke-width="3" />
            </svg>
          </div>
          <div class="emh-chart-legend">
            <span><i style="background:#0f172a"></i> Enterprise</span>
            <span><i style="background:#3b82f6"></i> Professional</span>
            <span><i style="background:#64748b"></i> Starter</span>
          </div>
        </div>

        <!-- Upsell Opportunities (Actionable List) -->
        <div class="emh-card">
          <div class="emh-card-header">
            <h3>Prime Upsell Opportunities</h3>
            <button class="emh-btn-icon">⋮</button>
          </div>
          <div class="emh-list">
            
            <div class="emh-li">
              <div class="emh-li-left">
                <strong>Acme Corp</strong>
                <span>Nearing storage limit</span>
              </div>
              <button class="emh-btn-sm emh-btn-blue">Pitch Elite</button>
            </div>
            
            <div class="emh-li">
              <div class="emh-li-left">
                <strong>Globex Inc</strong>
                <span>High API usage</span>
              </div>
              <button class="emh-btn-sm emh-btn-blue">Pitch Custom</button>
            </div>

            <div class="emh-li">
              <div class="emh-li-left">
                <strong>Initech</strong>
                <span>Requested 20+ seats</span>
              </div>
              <button class="emh-btn-sm emh-btn-blue">Pitch Enterprise</button>
            </div>

          </div>
          <div class="emh-card-footer">
            <a href="#">View All Opportunities &rarr;</a>
          </div>
        </div>

        <!-- Pricing Experiment Results Table -->
        <div class="emh-card emh-span-full">
          <div class="emh-card-header">
            <h3>Active Pricing Experiments</h3>
          </div>
          <table class="emh-table">
            <thead>
              <tr>
                <th>Experiment Name</th>
                <th>Variant A (Control)</th>
                <th>Variant B (Test)</th>
                <th>Status</th>
                <th>Confidence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Q3 Pro Tier Price Increase</strong></td>
                <td>$49/mo (Conv: 4.2%)</td>
                <td>$59/mo (Conv: 3.8%) <span class="emh-badge-green">+14% Rev</span></td>
                <td><span class="emh-status live">Live</span></td>
                <td>98%</td>
                <td><button class="emh-btn-sm emh-btn-dark">Deploy Variant B</button></td>
              </tr>
              <tr>
                <td><strong>Annual Discount 20% vs 30%</strong></td>
                <td>20% Off (Conv: 1.2%)</td>
                <td>30% Off (Conv: 2.1%) <span class="emh-badge-green">+5% Rev</span></td>
                <td><span class="emh-status live">Live</span></td>
                <td>82%</td>
                <td><button class="emh-btn-sm" disabled>Needs Data</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  </main>
</div>`,
  js: `// Enterprise Monetization Hub Logic
// Simple chart drawing animation
const emhChartPaths = document.querySelectorAll('.emh-chart path[stroke]');
emhChartPaths.forEach((path, i) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  setTimeout(() => {
    path.style.transition = 'stroke-dashoffset 2s ease-out';
    path.style.strokeDashoffset = '0';
  }, i * 300);
});`,
  ts: `// Enterprise Monetization Hub Logic (TypeScript)
const emhChartPaths = document.querySelectorAll<SVGPathElement>('.emh-chart path[stroke]');
emhChartPaths.forEach((path, i) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length.toString();
  path.style.strokeDashoffset = length.toString();
  setTimeout(() => {
    path.style.transition = 'stroke-dashoffset 2s ease-out';
    path.style.strokeDashoffset = '0';
  }, i * 300);
});`,
  css: `/* Enterprise Monetization Hub Styles */
.emh-wrapper {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
  font-family: -apple-system, "Inter", BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #0f172a;
}

/* Sidebar */
.emh-sidebar {
  width: 260px;
  background: #0f172a;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.emh-brand {
  font-size: 1.5rem;
  font-weight: 800;
  padding: 24px;
  letter-spacing: -0.5px;
  border-bottom: 1px solid #1e293b;
}

.emh-nav-group {
  padding: 24px 16px 0;
}

.emh-ng-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 12px;
  padding-left: 8px;
}

.emh-nav-group a {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #94a3b8;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
}

.emh-nav-group a:hover, .emh-nav-group a.active {
  background: #1e293b;
  color: #f8fafc;
}

/* Icons via CSS for simplicity */
.emh-i-mrr::before { content: "📊"; }
.emh-i-sub::before { content: "💳"; }
.emh-i-inv::before { content: "📄"; }
.emh-i-cht::before { content: "📉"; }
.emh-i-chn::before { content: "⚠️"; }
.emh-i-prc::before { content: "🧪"; }

/* Main */
.emh-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.emh-header {
  background: #fff;
  padding: 24px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
}

.emh-header h2 { margin: 0; font-size: 1.5rem; font-weight: 700; }

.emh-h-actions { display: flex; gap: 16px; align-items: center; }

.emh-select {
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
}

.emh-btn-primary {
  background: #2563eb; color: #fff;
  border: none; padding: 10px 20px; border-radius: 6px;
  font-weight: 600; cursor: pointer; transition: background 0.2s;
}
.emh-btn-primary:hover { background: #1d4ed8; }

.emh-content {
  padding: 40px;
  max-width: 1400px;
}

/* KPI Grid */
.emh-kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.emh-kpi-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.emh-kpi-lbl { font-size: 0.85rem; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 12px; }
.emh-kpi-val { font-size: 2.5rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 12px; }
.emh-kpi-meta { display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 500; }
.emh-pos { color: #16a34a; }
.emh-target { color: #94a3b8; }

/* Layout */
.emh-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.emh-span-2 { grid-column: span 1; }
.emh-span-full { grid-column: span 2; }

.emh-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

.emh-card-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 24px;
}
.emh-card-header h3 { margin: 0; font-size: 1.1rem; font-weight: 700; }

.emh-tabs button {
  background: transparent; border: none; font-size: 0.9rem; font-weight: 500; color: #64748b; padding: 4px 12px; cursor: pointer;
}
.emh-tabs button.active { color: #0f172a; font-weight: 600; background: #f1f5f9; border-radius: 4px; }

.emh-chart-wrapper {
  height: 300px;
  margin-bottom: 20px;
}
.emh-chart { width: 100%; height: 100%; }

.emh-chart-legend { display: flex; justify-content: center; gap: 24px; font-size: 0.9rem; color: #475569; }
.emh-chart-legend span { display: flex; align-items: center; gap: 8px; }
.emh-chart-legend i { width: 12px; height: 12px; border-radius: 2px; }

/* Lists */
.emh-list { display: flex; flex-direction: column; gap: 16px; flex: 1; }
.emh-li { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
.emh-li:last-child { border-bottom: none; }

.emh-li-left { display: flex; flex-direction: column; gap: 4px; }
.emh-li-left strong { font-size: 0.95rem; }
.emh-li-left span { font-size: 0.85rem; color: #64748b; }

.emh-btn-sm { padding: 6px 12px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: none; }
.emh-btn-blue { background: #eff6ff; color: #2563eb; }
.emh-btn-blue:hover { background: #dbeafe; }
.emh-btn-dark { background: #0f172a; color: #fff; }
.emh-btn-dark:hover { background: #1e293b; }
.emh-btn-sm[disabled] { background: #f1f5f9; color: #94a3b8; cursor: not-allowed; }

.emh-card-footer { margin-top: auto; padding-top: 16px; text-align: center; }
.emh-card-footer a { color: #2563eb; text-decoration: none; font-size: 0.9rem; font-weight: 500; }

/* Table */
.emh-table { width: 100%; border-collapse: collapse; }
.emh-table th { text-align: left; padding: 12px 16px; font-size: 0.85rem; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; }
.emh-table td { padding: 16px; font-size: 0.95rem; border-bottom: 1px solid #f1f5f9; }

.emh-badge-green { background: #dcfce7; color: #166534; font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 8px; }

.emh-status { font-size: 0.8rem; font-weight: 600; padding: 4px 8px; border-radius: 12px; }
.emh-status.live { background: #dbeafe; color: #1d4ed8; }

/* Responsive */
@media (max-width: 1200px) {
  .emh-layout { grid-template-columns: 1fr; }
  .emh-span-full { grid-column: span 1; }
  .emh-kpi-grid { grid-template-columns: 1fr; }
  .emh-sidebar { width: 80px; }
  .emh-brand { font-size: 0; padding: 24px 0; display: flex; justify-content: center; }
  .emh-brand::before { content: "OS"; font-size: 1.2rem; font-weight: 900; }
  .emh-ng-title, .emh-nav-group a text { display: none; }
  .emh-nav-group a { justify-content: center; font-size: 0; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design an enterprise-level monetization hub that integrates advanced analytics, upsell opportunities, and pricing optimization experiments.`
};
