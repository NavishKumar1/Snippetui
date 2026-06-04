/**
 * Component: Executive Leadership Dashboard
 * Category: dashboard-layouts
 */

export const component = {
  id: 'executive-leadership-dashboard',
  name: 'Executive Leadership Dashboard',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="exec-wrapper">
  
  <header class="exec-header">
    <div class="exec-h-left">
      <div class="exec-logo">CorpSight</div>
      <div class="exec-date-range">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        Q3 2026 (Jul 1 - Sep 30)
      </div>
    </div>
    <div class="exec-h-right">
      <button class="exec-btn exec-btn-outline">Download Report</button>
      <button class="exec-btn exec-btn-primary">Share Dashboard</button>
    </div>
  </header>

  <div class="exec-container">
    
    <!-- Top KPI Bar -->
    <div class="exec-kpi-bar">
      <div class="exec-kpi">
        <span class="exec-kpi-lbl">Total Revenue (Q3)</span>
        <div class="exec-kpi-val">$4.2M</div>
        <div class="exec-kpi-trend positive">↑ 18.4% vs Q2</div>
      </div>
      <div class="exec-divider"></div>
      <div class="exec-kpi">
        <span class="exec-kpi-lbl">EBITDA Margin</span>
        <div class="exec-kpi-val">24.5%</div>
        <div class="exec-kpi-trend positive">↑ 2.1% vs Q2</div>
      </div>
      <div class="exec-divider"></div>
      <div class="exec-kpi">
        <span class="exec-kpi-lbl">Customer Acquisition Cost</span>
        <div class="exec-kpi-val">$240</div>
        <div class="exec-kpi-trend negative">↑ $15 vs Q2</div>
      </div>
      <div class="exec-divider"></div>
      <div class="exec-kpi">
        <span class="exec-kpi-lbl">Lifetime Value (LTV)</span>
        <div class="exec-kpi-val">$3,200</div>
        <div class="exec-kpi-trend positive">↑ $400 vs Q2</div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="exec-grid">
      
      <!-- Revenue Growth Chart -->
      <div class="exec-card exec-span-2">
        <div class="exec-card-head">
          <h3>Revenue Growth & Projections</h3>
          <div class="exec-card-actions">
            <span class="exec-legend"><i style="background:#0f172a"></i> Historical</span>
            <span class="exec-legend"><i style="background:#3b82f6"></i> Projected</span>
          </div>
        </div>
        <div class="exec-chart-area">
          <div class="exec-y-axis">
            <span>$5M</span><span>$4M</span><span>$3M</span><span>$2M</span><span>$1M</span>
          </div>
          <div class="exec-bars">
            <div class="exec-bar-wrapper"><div class="exec-bar" style="height: 40%; background: #0f172a;"></div><span>Q1</span></div>
            <div class="exec-bar-wrapper"><div class="exec-bar" style="height: 55%; background: #0f172a;"></div><span>Q2</span></div>
            <div class="exec-bar-wrapper"><div class="exec-bar" style="height: 80%; background: #0f172a;"></div><span>Q3</span></div>
            <div class="exec-bar-wrapper"><div class="exec-bar exec-projected" style="height: 95%; background: #3b82f6;"></div><span>Q4 (Est)</span></div>
          </div>
        </div>
      </div>

      <!-- Subscription Breakdown -->
      <div class="exec-card">
        <div class="exec-card-head">
          <h3>Subscription Distribution</h3>
        </div>
        <div class="exec-donut-container">
          <svg viewBox="0 0 100 100" class="exec-donut">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" stroke-width="20" />
            <circle class="exec-donut-segment" cx="50" cy="50" r="40" fill="transparent" stroke="#0f172a" stroke-width="20" stroke-dasharray="251.2" stroke-dashoffset="62.8" />
            <circle class="exec-donut-segment" cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" stroke-width="20" stroke-dasharray="251.2" stroke-dashoffset="188.4" />
          </svg>
          <div class="exec-donut-center">
            <strong>12.4K</strong>
            <span>Active</span>
          </div>
        </div>
        <div class="exec-legend-list">
          <div class="exec-ll-item">
            <div class="exec-ll-color" style="background:#0f172a"></div>
            <span class="exec-ll-name">Enterprise Plan</span>
            <span class="exec-ll-val">75%</span>
          </div>
          <div class="exec-ll-item">
            <div class="exec-ll-color" style="background:#3b82f6"></div>
            <span class="exec-ll-name">Pro Plan</span>
            <span class="exec-ll-val">25%</span>
          </div>
        </div>
      </div>

      <!-- Regional Performance Table -->
      <div class="exec-card exec-span-full">
        <div class="exec-card-head">
          <h3>Regional Performance</h3>
        </div>
        <table class="exec-table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Revenue</th>
              <th>Growth (YoY)</th>
              <th>Active Customers</th>
              <th>Health Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>North America</strong></td>
              <td>$2.4M</td>
              <td class="exec-td-pos">+ 22%</td>
              <td>5,240</td>
              <td><div class="exec-health exec-h-good">92/100</div></td>
            </tr>
            <tr>
              <td><strong>Europe, Middle East, Africa</strong></td>
              <td>$1.1M</td>
              <td class="exec-td-pos">+ 14%</td>
              <td>3,820</td>
              <td><div class="exec-health exec-h-good">88/100</div></td>
            </tr>
            <tr>
              <td><strong>Asia Pacific</strong></td>
              <td>$700K</td>
              <td class="exec-td-neg">- 2%</td>
              <td>3,340</td>
              <td><div class="exec-health exec-h-warn">74/100</div></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>`,
  js: `// Executive Dashboard Logic
// Animate bars
const execBars = document.querySelectorAll('.exec-bar');
if(execBars.length > 0) {
  setTimeout(() => {
    execBars.forEach((bar, i) => {
      bar.style.opacity = '1';
      bar.style.transform = 'scaleY(1)';
    });
  }, 200);
}`,
  ts: `// Executive Dashboard Logic (TypeScript)
const execBars = document.querySelectorAll<HTMLDivElement>('.exec-bar');
if(execBars.length > 0) {
  setTimeout(() => {
    execBars.forEach((bar) => {
      bar.style.opacity = '1';
      bar.style.transform = 'scaleY(1)';
    });
  }, 200);
}`,
  css: `/* Executive Leadership Dashboard Styles */
.exec-wrapper {
  background: #f8fafc;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #0f172a;
}

.exec-header {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.exec-h-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.exec-logo {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.exec-date-range {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f5f9;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #475569;
}
.exec-date-range svg { width: 16px; height: 16px; }

.exec-h-right {
  display: flex;
  gap: 16px;
}

.exec-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.exec-btn-outline {
  background: #fff;
  border: 1px solid #cbd5e1;
  color: #0f172a;
}
.exec-btn-outline:hover { background: #f8fafc; border-color: #94a3b8; }

.exec-btn-primary {
  background: #0f172a;
  border: none;
  color: #fff;
}
.exec-btn-primary:hover { background: #1e293b; }

.exec-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
}

/* KPI Bar */
.exec-kpi-bar {
  display: flex;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
}

.exec-kpi {
  flex: 1;
  padding: 24px;
}

.exec-divider {
  width: 1px;
  background: #e2e8f0;
}

.exec-kpi-lbl {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 8px;
}

.exec-kpi-val {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 8px;
}

.exec-kpi-trend {
  font-size: 0.9rem;
  font-weight: 500;
}
.positive { color: #16a34a; }
.negative { color: #dc2626; }

/* Grid */
.exec-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

.exec-span-2 { grid-column: span 1; /* Retaining 2fr */ }
.exec-span-full { grid-column: span 2; }

.exec-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
}

.exec-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.exec-card-head h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.exec-legend { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: #64748b; }
.exec-legend i { width: 12px; height: 12px; border-radius: 2px; }

/* Bar Chart */
.exec-chart-area {
  display: flex;
  height: 300px;
}

.exec-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 16px;
  color: #94a3b8;
  font-size: 0.85rem;
  border-right: 1px solid #e2e8f0;
  padding-bottom: 24px;
  text-align: right;
  width: 60px;
}

.exec-bars {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding-bottom: 24px;
  position: relative;
}

.exec-bar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
  height: 100%;
  justify-content: flex-end;
  gap: 12px;
}

.exec-bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s;
}

.exec-projected {
  opacity: 0.8;
  background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px) !important;
}

.exec-bar-wrapper span {
  position: absolute;
  bottom: 0;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

/* Donut */
.exec-donut-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 32px;
}

.exec-donut {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.exec-donut-segment {
  transition: stroke-dashoffset 1.5s ease-out;
}

.exec-donut-center {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.exec-donut-center strong { font-size: 1.5rem; font-weight: 800; }
.exec-donut-center span { font-size: 0.85rem; color: #64748b; }

.exec-legend-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.exec-ll-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.exec-ll-color { width: 12px; height: 12px; border-radius: 2px; }
.exec-ll-name { flex: 1; font-size: 0.95rem; font-weight: 500; }
.exec-ll-val { font-weight: 700; }

/* Table */
.exec-table {
  width: 100%;
  border-collapse: collapse;
}

.exec-table th {
  text-align: left;
  padding: 16px;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  border-bottom: 1px solid #e2e8f0;
}

.exec-table td {
  padding: 16px;
  font-size: 0.95rem;
  border-bottom: 1px solid #f1f5f9;
}

.exec-td-pos { color: #16a34a; font-weight: 500; }
.exec-td-neg { color: #dc2626; font-weight: 500; }

.exec-health {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}
.exec-h-good { background: #dcfce7; color: #166534; }
.exec-h-warn { background: #fef9c3; color: #854d0e; }

/* Responsive */
@media (max-width: 1200px) {
  .exec-grid { grid-template-columns: 1fr; }
  .exec-span-full { grid-column: span 1; }
  .exec-kpi-bar { flex-direction: column; }
  .exec-divider { width: 100%; height: 1px; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build a high-end executive dashboard designed for founders and CEOs. Display critical KPIs, revenue trends, customer growth, and regional performance with enterprise-grade data visualization.`
};
