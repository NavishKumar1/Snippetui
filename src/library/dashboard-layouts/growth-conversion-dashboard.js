/**
 * Component: Growth Conversion Dashboard
 * Category: dashboard-layouts
 */

export const component = {
  id: 'growth-conversion-dashboard',
  name: 'Growth Conversion Dashboard',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="gcd-wrapper">
  
  <div class="gcd-container">
    
    <header class="gcd-header">
      <div class="gcd-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
        Growth Metrics
      </div>
      <div class="gcd-h-right">
        <div class="gcd-date-picker">Last 30 Days <span>▼</span></div>
        <button class="gcd-btn-primary">New Experiment</button>
      </div>
    </header>

    <main class="gcd-main">
      
      <!-- Conversion Funnel Section -->
      <section class="gcd-funnel-section">
        <div class="gcd-section-head">
          <h2>Acquisition Funnel</h2>
          <p>User journey from visitor to paid subscriber.</p>
        </div>
        
        <div class="gcd-funnel-stages">
          
          <div class="gcd-stage">
            <div class="gcd-stage-icon" style="background:#e0e7ff; color:#4f46e5;">1</div>
            <div class="gcd-stage-info">
              <h4>Site Visitors</h4>
              <span class="gcd-stage-val">245,800</span>
            </div>
          </div>

          <div class="gcd-funnel-arrow">
            <span class="gcd-conv-rate">12.4% Conv</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
          </div>

          <div class="gcd-stage">
            <div class="gcd-stage-icon" style="background:#dbeafe; color:#2563eb;">2</div>
            <div class="gcd-stage-info">
              <h4>Free Signups</h4>
              <span class="gcd-stage-val">30,479</span>
            </div>
          </div>

          <div class="gcd-funnel-arrow">
            <span class="gcd-conv-rate">4.8% Conv</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
          </div>

          <div class="gcd-stage">
            <div class="gcd-stage-icon" style="background:#dcfce7; color:#16a34a;">3</div>
            <div class="gcd-stage-info">
              <h4>Pro Upgrades</h4>
              <span class="gcd-stage-val">1,462</span>
            </div>
          </div>

          <div class="gcd-funnel-arrow">
            <span class="gcd-conv-rate">1.2% Conv</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
          </div>

          <div class="gcd-stage">
            <div class="gcd-stage-icon" style="background:#fef3c7; color:#d97706;">4</div>
            <div class="gcd-stage-info">
              <h4>Elite Upgrades</h4>
              <span class="gcd-stage-val">295</span>
            </div>
          </div>

        </div>
      </section>

      <!-- Experiments & Cohorts Grid -->
      <div class="gcd-grid">
        
        <!-- A/B Test Results -->
        <div class="gcd-card gcd-span-2">
          <div class="gcd-card-header">
            <h3>Pricing Page Experiments</h3>
          </div>
          <table class="gcd-exp-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Traffic</th>
                <th>Win Prob.</th>
                <th>Lift</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Annual Toggle Default</strong><br><span>Switched default toggle to Annual</span></td>
                <td>
                  <div class="gcd-traffic-bar"><div style="width: 100%; background:#3b82f6;"></div></div>
                  12,400 sessions
                </td>
                <td><span class="gcd-prob gcd-high">94%</span></td>
                <td>+14% ARPU</td>
                <td><span class="gcd-status gcd-winner">Winner</span></td>
              </tr>
              <tr>
                <td><strong>Remove Starter Tier</strong><br><span>Hid Starter tier under "More options"</span></td>
                <td>
                  <div class="gcd-traffic-bar"><div style="width: 50%; background:#8b5cf6;"></div></div>
                  6,200 sessions
                </td>
                <td><span class="gcd-prob gcd-med">62%</span></td>
                <td>+4% Conv</td>
                <td><span class="gcd-status gcd-running">Running</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Retention Cohort -->
        <div class="gcd-card">
          <div class="gcd-card-header">
            <h3>Retention by Cohort</h3>
          </div>
          <div class="gcd-cohort-matrix">
            <div class="gcd-cm-row gcd-cm-head">
              <div>Month</div><div>M1</div><div>M2</div><div>M3</div>
            </div>
            <div class="gcd-cm-row">
              <div>Jan</div>
              <div style="background: rgba(16, 185, 129, 1)">100%</div>
              <div style="background: rgba(16, 185, 129, 0.8)">84%</div>
              <div style="background: rgba(16, 185, 129, 0.6)">62%</div>
            </div>
            <div class="gcd-cm-row">
              <div>Feb</div>
              <div style="background: rgba(16, 185, 129, 1)">100%</div>
              <div style="background: rgba(16, 185, 129, 0.85)">89%</div>
              <div style="background: rgba(16, 185, 129, 0.65)">68%</div>
            </div>
            <div class="gcd-cm-row">
              <div>Mar</div>
              <div style="background: rgba(16, 185, 129, 1)">100%</div>
              <div style="background: rgba(16, 185, 129, 0.9)">92%</div>
              <div style="background: rgba(226, 232, 240, 1); color: #94a3b8;">-</div>
            </div>
          </div>
        </div>

      </div>

    </main>
  </div>
</div>`,
  js: `// Growth Conversion Dashboard Logic
// Stagger animate funnel
const stages = document.querySelectorAll('.gcd-stage, .gcd-funnel-arrow');
stages.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  setTimeout(() => {
    el.style.transition = 'all 0.4s ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 100 * i);
});`,
  ts: `// Growth Conversion Dashboard Logic (TypeScript)
const stages = document.querySelectorAll<HTMLElement>('.gcd-stage, .gcd-funnel-arrow');
stages.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  setTimeout(() => {
    el.style.transition = 'all 0.4s ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 100 * i);
});`,
  css: `/* Growth Conversion Dashboard Styles */
.gcd-wrapper {
  background: #f8fafc;
  min-height: 100vh;
  font-family: -apple-system, "Inter", sans-serif;
  color: #0f172a;
}

.gcd-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.gcd-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 24px 0; border-bottom: 1px solid #e2e8f0; margin-bottom: 40px;
}

.gcd-logo {
  display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 1.25rem;
}
.gcd-logo svg { width: 24px; height: 24px; color: #2563eb; }

.gcd-h-right { display: flex; gap: 16px; align-items: center; }

.gcd-date-picker {
  background: #fff; border: 1px solid #cbd5e1; padding: 8px 16px;
  border-radius: 8px; font-size: 0.9rem; font-weight: 500; cursor: pointer;
  display: flex; align-items: center; gap: 8px;
}
.gcd-date-picker span { font-size: 0.7rem; color: #64748b; }

.gcd-btn-primary {
  background: #0f172a; color: #fff; border: none; padding: 8px 16px;
  border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;
}
.gcd-btn-primary:hover { background: #1e293b; }

/* Main */
.gcd-main { padding-bottom: 60px; }

.gcd-section-head { margin-bottom: 32px; text-align: center; }
.gcd-section-head h2 { margin: 0 0 8px 0; font-size: 1.75rem; font-weight: 800; }
.gcd-section-head p { margin: 0; color: #64748b; }

/* Funnel */
.gcd-funnel-section {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 40px; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
}

.gcd-funnel-stages {
  display: flex; align-items: center; justify-content: space-between;
}

.gcd-stage {
  display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px;
}

.gcd-stage-icon {
  width: 48px; height: 48px; border-radius: 50%;
  display: flex; justify-content: center; align-items: center; font-weight: 800; font-size: 1.1rem;
}

.gcd-stage-info h4 { margin: 0 0 4px 0; font-size: 0.95rem; color: #475569; }
.gcd-stage-val { font-size: 1.5rem; font-weight: 800; color: #0f172a; }

.gcd-funnel-arrow {
  display: flex; flex-direction: column; align-items: center; gap: 4px; color: #94a3b8;
}
.gcd-conv-rate { font-size: 0.8rem; font-weight: 600; background: #f1f5f9; padding: 2px 8px; border-radius: 10px; color: #475569; }
.gcd-funnel-arrow svg { width: 24px; height: 24px; }

/* Grid */
.gcd-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
.gcd-span-2 { grid-column: span 1; }

.gcd-card {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
}
.gcd-card-header { margin-bottom: 24px; }
.gcd-card-header h3 { margin: 0; font-size: 1.1rem; font-weight: 700; }

/* Exp Table */
.gcd-exp-table { width: 100%; border-collapse: collapse; }
.gcd-exp-table th { text-align: left; padding: 12px; font-size: 0.85rem; color: #64748b; border-bottom: 1px solid #e2e8f0; }
.gcd-exp-table td { padding: 16px 12px; font-size: 0.9rem; border-bottom: 1px solid #f1f5f9; }
.gcd-exp-table td strong { font-size: 0.95rem; color: #0f172a; }
.gcd-exp-table td span { font-size: 0.8rem; color: #64748b; }

.gcd-traffic-bar { height: 6px; background: #f1f5f9; border-radius: 3px; margin-bottom: 4px; width: 80px; }
.gcd-traffic-bar div { height: 100%; border-radius: 3px; }

.gcd-prob { font-weight: 700; padding: 4px 8px; border-radius: 6px; }
.gcd-high { background: #dcfce7; color: #166534; }
.gcd-med { background: #fef9c3; color: #854d0e; }

.gcd-status { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 4px 8px; border-radius: 4px; }
.gcd-winner { background: #1e293b; color: #fff; }
.gcd-running { border: 1px solid #cbd5e1; color: #475569; }

/* Cohort Matrix */
.gcd-cohort-matrix { display: flex; flex-direction: column; gap: 4px; }
.gcd-cm-row { display: flex; gap: 4px; }
.gcd-cm-head div { background: transparent !important; color: #64748b; font-weight: 600; font-size: 0.8rem; }
.gcd-cm-row div {
  flex: 1; height: 32px; display: flex; justify-content: center; align-items: center;
  font-size: 0.85rem; font-weight: 500; color: #fff; border-radius: 4px;
}
.gcd-cm-row div:first-child { background: transparent !important; color: #0f172a; font-weight: 600; justify-content: flex-start; }

/* Responsive */
@media (max-width: 1024px) {
  .gcd-grid { grid-template-columns: 1fr; }
  .gcd-funnel-stages { flex-direction: column; gap: 24px; }
  .gcd-funnel-arrow svg { transform: rotate(0deg); } /* Keeps arrow pointing down */
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a conversion-focused dashboard optimized for user acquisition, retention, and pricing experiments.`
};
