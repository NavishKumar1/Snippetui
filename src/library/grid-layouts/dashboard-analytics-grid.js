/**
 * Component: Dashboard Analytics Grid
 * Category: grid-layouts
 */

export const component = {
  id: 'dashboard-analytics-grid',
  name: 'Dashboard Analytics Grid',
  category: 'grid-layouts',
  tag: 'Premium',
  html: `<div class="dag-wrapper">
  <div class="dag-header">
    <h2>Performance Overview</h2>
    <div class="dag-controls">
      <select class="dag-select">
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
        <option>This Year</option>
      </select>
      <button class="dag-btn">Export Report</button>
    </div>
  </div>

  <div class="dag-grid">
    <!-- Mini KPI Widgets -->
    <div class="dag-widget dag-kpi">
      <div class="dag-kpi-header">
        <span class="dag-kpi-title">Total Users</span>
        <span class="dag-kpi-icon">👥</span>
      </div>
      <div class="dag-kpi-value">2.4M</div>
      <div class="dag-kpi-trend positive">↑ 12% vs last week</div>
    </div>
    
    <div class="dag-widget dag-kpi">
      <div class="dag-kpi-header">
        <span class="dag-kpi-title">Avg. Session</span>
        <span class="dag-kpi-icon">⏱️</span>
      </div>
      <div class="dag-kpi-value">42m</div>
      <div class="dag-kpi-trend positive">↑ 5% vs last week</div>
    </div>
    
    <div class="dag-widget dag-kpi">
      <div class="dag-kpi-header">
        <span class="dag-kpi-title">Bounce Rate</span>
        <span class="dag-kpi-icon">📉</span>
      </div>
      <div class="dag-kpi-value">18.2%</div>
      <div class="dag-kpi-trend negative">↓ 2% vs last week</div>
    </div>
    
    <div class="dag-widget dag-kpi">
      <div class="dag-kpi-header">
        <span class="dag-kpi-title">Active Now</span>
        <span class="dag-kpi-icon">🔴</span>
      </div>
      <div class="dag-kpi-value">124K</div>
      <div class="dag-kpi-trend">Live data</div>
    </div>

    <!-- Main Chart Widget -->
    <div class="dag-widget dag-main-chart">
      <div class="dag-widget-title">User Acquisition</div>
      <!-- CSS representation of a chart -->
      <div class="dag-chart-area">
        <div class="dag-chart-bars">
          <div class="dag-bar" style="height: 40%"></div>
          <div class="dag-bar" style="height: 60%"></div>
          <div class="dag-bar" style="height: 45%"></div>
          <div class="dag-bar" style="height: 80%"></div>
          <div class="dag-bar" style="height: 65%"></div>
          <div class="dag-bar" style="height: 90%"></div>
          <div class="dag-bar" style="height: 100%"></div>
        </div>
      </div>
    </div>

    <!-- Secondary Widgets -->
    <div class="dag-widget dag-secondary">
      <div class="dag-widget-title">Device Breakdown</div>
      <div class="dag-donut-chart">
        <div class="dag-donut-inner">
          <span class="dag-donut-val">65%</span>
          <span class="dag-donut-lbl">Desktop</span>
        </div>
      </div>
      <div class="dag-legend">
        <span><i style="background:#4361ee"></i> Desktop</span>
        <span><i style="background:#4cc9f0"></i> Mobile</span>
      </div>
    </div>

    <div class="dag-widget dag-secondary">
      <div class="dag-widget-title">Top Regions</div>
      <ul class="dag-list">
        <li><span>North America</span> <strong>45%</strong></li>
        <li><span>Europe</span> <strong>30%</strong></li>
        <li><span>Asia Pacific</span> <strong>18%</strong></li>
        <li><span>Other</span> <strong>7%</strong></li>
      </ul>
    </div>
  </div>
</div>`,
  js: `// Dashboard Analytics Grid Logic
// The grid handles layout. We add some initial animation to the bars.
const dagBars = document.querySelectorAll('.dag-bar');
setTimeout(() => {
  dagBars.forEach((bar, i) => {
    bar.style.opacity = '1';
    bar.style.transform = 'scaleY(1)';
  });
}, 300);`,
  ts: `// Dashboard Analytics Grid Logic (TypeScript)
const dagBars = document.querySelectorAll<HTMLDivElement>('.dag-bar');
setTimeout(() => {
  dagBars.forEach((bar, i) => {
    bar.style.opacity = '1';
    bar.style.transform = 'scaleY(1)';
  });
}, 300);`,
  css: `/* Dashboard Analytics Grid Styles */
.dag-wrapper {
  background: #f1f5f9;
  padding: 40px;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  width: 100%;
}

.dag-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.dag-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.dag-controls {
  display: flex;
  gap: 12px;
}

.dag-select, .dag-btn {
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: #fff;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}

.dag-btn {
  background: #0f172a;
  color: #fff;
  border: none;
}

/* The Enterprise Grid Layout */
.dag-grid {
  display: grid;
  /* 4 columns for desktop */
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.dag-widget {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
}

/* Specific Grid Placements */
.dag-kpi {
  /* KPIs take 1 column each */
  grid-column: span 1;
}

.dag-main-chart {
  /* Main chart takes 2 columns */
  grid-column: span 2;
  min-height: 350px;
}

.dag-secondary {
  /* Secondary widgets take 1 column */
  grid-column: span 1;
}

/* Widget Content Styles */
.dag-kpi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.dag-kpi-title {
  color: #64748b;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.dag-kpi-value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.dag-kpi-trend {
  font-size: 0.85rem;
  font-weight: 500;
  color: #94a3b8;
}

.dag-kpi-trend.positive { color: #10b981; }
.dag-kpi-trend.negative { color: #ef4444; }

.dag-widget-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 24px;
}

/* Mock Chart CSS */
.dag-chart-area {
  flex-grow: 1;
  border-bottom: 2px solid #f1f5f9;
  border-left: 2px solid #f1f5f9;
  padding: 10px;
  display: flex;
  align-items: flex-end;
}

.dag-chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}

.dag-bar {
  width: 8%;
  background: #3b82f6;
  border-radius: 4px 4px 0 0;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Mock Donut */
.dag-donut-chart {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(#4361ee 0% 65%, #4cc9f0 65% 100%);
  margin: 0 auto 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dag-donut-inner {
  width: 110px;
  height: 110px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dag-donut-val { font-size: 1.5rem; font-weight: 700; }
.dag-donut-lbl { font-size: 0.75rem; color: #64748b; }

.dag-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 0.85rem;
  color: #64748b;
}

.dag-legend i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
}

/* Simple List */
.dag-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dag-list li {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

/* Responsive Rules */
@media (max-width: 1200px) {
  .dag-grid { grid-template-columns: repeat(2, 1fr); }
  .dag-main-chart { grid-column: span 2; }
}

@media (max-width: 768px) {
  .dag-grid { grid-template-columns: 1fr; }
  .dag-main-chart { grid-column: span 1; }
  .dag-kpi { grid-column: span 1; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build an enterprise-grade Dashboard Analytics Grid capable of displaying statistics, charts, KPIs, widgets, and lists using an adaptive grid system.`
};
