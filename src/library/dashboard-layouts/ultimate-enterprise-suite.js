/**
 * Component: Ultimate Enterprise Suite
 * Category: dashboard-layouts
 */

export const component = {
  id: 'ultimate-enterprise-suite',
  name: 'Ultimate Enterprise Suite',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="ues-wrapper">
  
  <!-- Massive Sidebar Architecture -->
  <aside class="ues-sidebar">
    <div class="ues-brand">
      <div class="ues-b-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
      </div>
      <div>
        <strong>OMNI<span style="font-weight: 300;">SUITE</span></strong>
        <span class="ues-b-tag">Enterprise Edition</span>
      </div>
    </div>
    
    <div class="ues-scroll-area">
      
      <div class="ues-nav-section">
        <div class="ues-ns-title">Global Overview</div>
        <a href="#" class="active"><i class="ues-i-dash"></i> Executive Dashboard</a>
        <a href="#"><i class="ues-i-live"></i> Real-Time Operations</a>
      </div>

      <div class="ues-nav-section">
        <div class="ues-ns-title">Financials & Monetization</div>
        <a href="#"><i class="ues-i-rev"></i> Revenue Analytics</a>
        <a href="#"><i class="ues-i-bill"></i> Billing & Invoices</a>
        <a href="#"><i class="ues-i-price"></i> Pricing Engine</a>
      </div>

      <div class="ues-nav-section">
        <div class="ues-ns-title">Customer Success</div>
        <a href="#"><i class="ues-i-users"></i> Account Health</a>
        <a href="#"><i class="ues-i-churn"></i> Churn Prevention AI</a>
      </div>

    </div>

    <div class="ues-user-area">
      <img src="https://i.pravatar.cc/150?img=60" alt="Admin">
      <div class="ues-ua-info">
        <strong>Jane Director</strong>
        <span>Global Admin</span>
      </div>
      <button class="ues-btn-icon">⚙</button>
    </div>
  </aside>

  <!-- Mega Main Content Area -->
  <main class="ues-main">
    
    <!-- Top Global Nav -->
    <header class="ues-topbar">
      <div class="ues-search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" placeholder="Search across OmniSuite (Customers, Invoices, Settings)...">
        <span class="ues-shortcut">Ctrl+K</span>
      </div>
      
      <div class="ues-top-actions">
        <div class="ues-env-switcher">
          <span class="ues-dot ues-prod"></span> Production
        </div>
        <button class="ues-icon-btn">🔔<span class="ues-badge-dot"></span></button>
        <button class="ues-btn-primary">Generate Master Report</button>
      </div>
    </header>

    <div class="ues-content">
      
      <!-- High-Level AI Summary -->
      <div class="ues-ai-bar">
        <div class="ues-ai-icon">✨</div>
        <div class="ues-ai-text">
          <strong>OmniAI Executive Brief:</strong> Monthly Recurring Revenue hit $14.2M (↑ 8% MoM). 14 Enterprise accounts are flagged for high churn risk. Recommended action: Deploy 'Save Offer A' to At-Risk segment.
        </div>
        <button class="ues-btn-outline">Review Accounts</button>
      </div>

      <!-- Super KPIs -->
      <div class="ues-kpi-grid">
        <div class="ues-kpi-card">
          <div class="ues-k-head">Total ARR <span class="ues-tag-blue">Q3 Adjusted</span></div>
          <div class="ues-k-val">$170.4M</div>
          <div class="ues-k-foot">
            <span class="ues-pos">↑ 14.2%</span> vs last year
          </div>
        </div>
        
        <div class="ues-kpi-card">
          <div class="ues-k-head">Enterprise Accounts</div>
          <div class="ues-k-val">1,245</div>
          <div class="ues-k-foot">
            <span class="ues-pos">↑ 42</span> net new this quarter
          </div>
        </div>

        <div class="ues-kpi-card">
          <div class="ues-k-head">Net Retention Rate</div>
          <div class="ues-k-val">124%</div>
          <div class="ues-k-foot">
            <span class="ues-pos">↑ 2%</span> expansion growth
          </div>
        </div>

        <div class="ues-kpi-card">
          <div class="ues-k-head">System Uptime</div>
          <div class="ues-k-val">99.999%</div>
          <div class="ues-k-foot">
            <span class="ues-neutral">Optimal Status</span> across all regions
          </div>
        </div>
      </div>

      <!-- Complex Grid Layout -->
      <div class="ues-grid">
        
        <!-- Massive Chart Area -->
        <div class="ues-card ues-span-8">
          <div class="ues-card-header">
            <h3>Revenue vs Forecast (Multi-Region)</h3>
            <div class="ues-filters">
              <select><option>Global</option><option>NA</option><option>EMEA</option></select>
              <select><option>Monthly</option><option>Quarterly</option></select>
            </div>
          </div>
          
          <div class="ues-chart-stage">
            <svg viewBox="0 0 800 300" preserveAspectRatio="none" class="ues-svg-chart">
              <!-- Grid lines -->
              <line x1="0" y1="75" x2="800" y2="75" stroke="#e2e8f0" stroke-dasharray="4,4" />
              <line x1="0" y1="150" x2="800" y2="150" stroke="#e2e8f0" stroke-dasharray="4,4" />
              <line x1="0" y1="225" x2="800" y2="225" stroke="#e2e8f0" stroke-dasharray="4,4" />
              
              <!-- Forecast Area -->
              <path d="M0,300 L0,200 L200,180 L400,150 L600,100 L800,50 L800,300 Z" fill="rgba(203, 213, 225, 0.3)" />
              <path d="M0,200 L200,180 L400,150 L600,100 L800,50" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,5" />
              
              <!-- Actual Line with gradient fill -->
              <path class="ues-data-area" d="M0,300 L0,220 L200,200 L400,180 L550,110 L550,300 Z" fill="url(#ues-blue-grad)" />
              <path class="ues-data-line" d="M0,220 L200,200 L400,180 L550,110" fill="none" stroke="#2563eb" stroke-width="4" />
              
              <!-- Current Point -->
              <circle cx="550" cy="110" r="6" fill="#fff" stroke="#2563eb" stroke-width="3" />
              
              <defs>
                <linearGradient id="ues-blue-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(37, 99, 235, 0.4)" />
                  <stop offset="100%" stop-color="rgba(37, 99, 235, 0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div class="ues-legend">
            <span><i style="background:#2563eb"></i> Actual Revenue</span>
            <span><i style="background:transparent; border:2px dashed #94a3b8"></i> Forecast (AI Model V4)</span>
          </div>
        </div>

        <!-- At-Risk Accounts (Actionable) -->
        <div class="ues-card ues-span-4">
          <div class="ues-card-header">
            <h3>At-Risk Enterprise Accounts</h3>
            <span class="ues-tag-red">14 Flags</span>
          </div>
          
          <div class="ues-risk-list">
            
            <div class="ues-risk-item">
              <div class="ues-ri-top">
                <strong>Stark Industries</strong>
                <span class="ues-risk-high">92% Risk</span>
              </div>
              <div class="ues-ri-meta">ARR: $1.2M • Renewal in 14 days</div>
              <div class="ues-ri-reason">Low usage + Executive sponsor changed.</div>
              <button class="ues-btn-sm ues-btn-full">Assign to Tiger Team</button>
            </div>
            
            <div class="ues-risk-item">
              <div class="ues-ri-top">
                <strong>Wayne Enterprises</strong>
                <span class="ues-risk-med">64% Risk</span>
              </div>
              <div class="ues-ri-meta">ARR: $840K • Renewal in 45 days</div>
              <div class="ues-ri-reason">Multiple high-sev support tickets open.</div>
              <button class="ues-btn-sm ues-btn-outline ues-btn-full">Escalate to Eng</button>
            </div>

          </div>
          
          <a href="#" class="ues-view-all">View all 14 accounts &rarr;</a>
        </div>

      </div>

      <!-- Data Table Section -->
      <div class="ues-card ues-mt">
        <div class="ues-card-header">
          <h3>Recent Large Contracts</h3>
          <button class="ues-btn-outline">Filter</button>
        </div>
        <table class="ues-table">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Plan Tier</th>
              <th>Contract Value</th>
              <th>Term Length</th>
              <th>Status</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Acme Corp Global</strong></td>
              <td>Enterprise Custom</td>
              <td>$450,000</td>
              <td>36 Months</td>
              <td><span class="ues-status-pill ues-closed">Closed Won</span></td>
              <td><div class="ues-avatar-sm">JS</div></td>
            </tr>
            <tr>
              <td><strong>Globex Inc</strong></td>
              <td>Enterprise Plus</td>
              <td>$280,000</td>
              <td>12 Months</td>
              <td><span class="ues-status-pill ues-closed">Closed Won</span></td>
              <td><div class="ues-avatar-sm">MK</div></td>
            </tr>
            <tr>
              <td><strong>Initech</strong></td>
              <td>Pro Bundle</td>
              <td>$85,000</td>
              <td>12 Months</td>
              <td><span class="ues-status-pill ues-nego">Negotiating</span></td>
              <td><div class="ues-avatar-sm">AL</div></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </main>
</div>`,
  js: `// Ultimate Enterprise Suite Logic
const uesLine = document.querySelector('.ues-data-line');
const uesArea = document.querySelector('.ues-data-area');

if (uesLine && uesArea) {
  // Animate the line
  const len = uesLine.getTotalLength();
  uesLine.style.strokeDasharray = len;
  uesLine.style.strokeDashoffset = len;
  
  // Fade in the area
  uesArea.style.opacity = '0';
  
  setTimeout(() => {
    uesLine.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)';
    uesLine.style.strokeDashoffset = '0';
    
    uesArea.style.transition = 'opacity 2s ease';
    uesArea.style.opacity = '1';
  }, 200);
}`,
  ts: `// Ultimate Enterprise Suite Logic (TypeScript)
const uesLine = document.querySelector<SVGPathElement>('.ues-data-line');
const uesArea = document.querySelector<SVGPathElement>('.ues-data-area');

if (uesLine && uesArea) {
  const len = uesLine.getTotalLength();
  uesLine.style.strokeDasharray = len.toString();
  uesLine.style.strokeDashoffset = len.toString();
  
  uesArea.style.opacity = '0';
  
  setTimeout(() => {
    uesLine.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)';
    uesLine.style.strokeDashoffset = '0';
    
    uesArea.style.transition = 'opacity 2s ease';
    uesArea.style.opacity = '1';
  }, 200);
}`,
  css: `/* Ultimate Enterprise Suite Styles */
.ues-wrapper {
  display: flex;
  height: 100vh;
  min-height: 900px;
  background: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #0f172a;
  overflow: hidden;
}

/* Sidebar Architecture */
.ues-sidebar {
  width: 280px;
  background: #020617; /* Very dark slate */
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.ues-brand {
  display: flex; align-items: center; gap: 16px;
  padding: 24px; border-bottom: 1px solid #1e293b;
}
.ues-b-icon {
  width: 40px; height: 40px; background: #2563eb; border-radius: 10px;
  display: flex; justify-content: center; align-items: center;
}
.ues-b-icon svg { width: 24px; height: 24px; color: #fff; }

.ues-brand strong { font-size: 1.2rem; display: block; letter-spacing: 1px; }
.ues-b-tag { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; }

.ues-scroll-area {
  flex: 1; overflow-y: auto; padding: 24px 16px; display: flex; flex-direction: column; gap: 32px;
}
.ues-scroll-area::-webkit-scrollbar { width: 6px; }
.ues-scroll-area::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }

.ues-nav-section { display: flex; flex-direction: column; gap: 8px; }
.ues-ns-title { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding-left: 12px; margin-bottom: 8px; }

.ues-nav-section a {
  display: flex; align-items: center; gap: 12px; color: #cbd5e1; text-decoration: none;
  padding: 10px 12px; border-radius: 8px; font-size: 0.9rem; font-weight: 500; transition: all 0.2s;
}
.ues-nav-section a:hover, .ues-nav-section a.active { background: #1e293b; color: #fff; }
.ues-nav-section a.active { border-left: 3px solid #3b82f6; border-radius: 0 8px 8px 0; }

.ues-i-dash::before { content: "📊"; }
.ues-i-live::before { content: "⚡"; }
.ues-i-rev::before { content: "📈"; }
.ues-i-bill::before { content: "💳"; }
.ues-i-price::before { content: "🧪"; }
.ues-i-users::before { content: "🏢"; }
.ues-i-churn::before { content: "🛡️"; }

.ues-user-area {
  padding: 24px; border-top: 1px solid #1e293b; display: flex; align-items: center; gap: 12px;
}
.ues-user-area img { width: 40px; height: 40px; border-radius: 8px; }
.ues-ua-info { flex: 1; display: flex; flex-direction: column; }
.ues-ua-info strong { font-size: 0.9rem; }
.ues-ua-info span { font-size: 0.8rem; color: #94a3b8; }
.ues-btn-icon { background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 1.2rem; }

/* Main Content */
.ues-main { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }

/* Topbar */
.ues-topbar {
  background: #fff; height: 70px; display: flex; justify-content: space-between; align-items: center;
  padding: 0 32px; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 100;
}

.ues-search-box {
  display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0;
  padding: 8px 16px; border-radius: 8px; width: 400px;
}
.ues-search-box svg { width: 16px; height: 16px; color: #94a3b8; }
.ues-search-box input { border: none; background: transparent; flex: 1; outline: none; font-size: 0.9rem; }
.ues-shortcut { font-size: 0.7rem; background: #e2e8f0; padding: 2px 6px; border-radius: 4px; color: #64748b; font-weight: 600; }

.ues-top-actions { display: flex; align-items: center; gap: 24px; }
.ues-env-switcher { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; color: #475569; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 20px; }
.ues-dot { width: 8px; height: 8px; border-radius: 50%; }
.ues-prod { background: #10b981; }

.ues-icon-btn { position: relative; background: transparent; border: none; font-size: 1.2rem; cursor: pointer; }
.ues-badge-dot { position: absolute; top: -2px; right: -2px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 2px solid #fff; }

.ues-btn-primary { background: #2563eb; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.ues-btn-primary:hover { background: #1d4ed8; }

/* Content */
.ues-content { padding: 32px; max-width: 1600px; }

/* AI Bar */
.ues-ai-bar {
  background: linear-gradient(90deg, #eff6ff 0%, #f0fdf4 100%);
  border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px 24px;
  display: flex; align-items: center; gap: 16px; margin-bottom: 32px;
}
.ues-ai-icon { font-size: 1.5rem; }
.ues-ai-text { flex: 1; font-size: 0.95rem; color: #1e293b; line-height: 1.5; }
.ues-btn-outline { background: #fff; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; }

/* KPIs */
.ues-kpi-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px;
}

.ues-kpi-card {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.ues-k-head { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; color: #64748b; margin-bottom: 12px; text-transform: uppercase; }
.ues-tag-blue { background: #dbeafe; color: #1d4ed8; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
.ues-k-val { font-size: 2.25rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 12px; }
.ues-k-foot { font-size: 0.85rem; color: #64748b; }
.ues-pos { color: #16a34a; font-weight: 600; }
.ues-neutral { color: #0f172a; font-weight: 600; }

/* Grid Layout */
.ues-grid {
  display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; margin-bottom: 32px;
}
.ues-span-8 { grid-column: span 8; }
.ues-span-4 { grid-column: span 4; }

.ues-card {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column;
}

.ues-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.ues-card-header h3 { margin: 0; font-size: 1.1rem; font-weight: 700; }

.ues-filters select { border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; margin-left: 8px; }

/* Chart */
.ues-chart-stage { height: 350px; margin-bottom: 20px; }
.ues-svg-chart { width: 100%; height: 100%; overflow: visible; }
.ues-legend { display: flex; justify-content: center; gap: 24px; font-size: 0.85rem; color: #64748b; }
.ues-legend span { display: flex; align-items: center; gap: 8px; }
.ues-legend i { width: 16px; height: 4px; border-radius: 2px; }

/* Risk List */
.ues-tag-red { background: #fee2e2; color: #b91c1c; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; }

.ues-risk-list { display: flex; flex-direction: column; gap: 16px; flex: 1; }
.ues-risk-item { padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; }
.ues-ri-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.ues-ri-top strong { font-size: 1rem; color: #0f172a; }
.ues-risk-high { color: #dc2626; font-weight: 700; font-size: 0.85rem; }
.ues-risk-med { color: #d97706; font-weight: 700; font-size: 0.85rem; }

.ues-ri-meta { font-size: 0.85rem; color: #475569; margin-bottom: 8px; font-weight: 500; }
.ues-ri-reason { font-size: 0.85rem; color: #64748b; margin-bottom: 16px; }

.ues-btn-sm { padding: 8px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: none; }
.ues-btn-full { width: 100%; }
.ues-risk-item .ues-btn-sm:not(.ues-btn-outline) { background: #0f172a; color: #fff; }
.ues-btn-outline { border: 1px solid #cbd5e1; background: #fff; color: #0f172a; }

.ues-view-all { margin-top: 16px; text-align: center; display: block; font-size: 0.9rem; color: #2563eb; text-decoration: none; font-weight: 500; }

/* Table Section */
.ues-mt { margin-top: 0; }
.ues-table { width: 100%; border-collapse: collapse; }
.ues-table th { text-align: left; padding: 16px; font-size: 0.85rem; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
.ues-table td { padding: 16px; font-size: 0.95rem; border-bottom: 1px solid #f1f5f9; color: #0f172a; }
.ues-table td strong { font-weight: 600; }

.ues-status-pill { font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; text-transform: uppercase; }
.ues-closed { background: #dcfce7; color: #166534; }
.ues-nego { background: #fef9c3; color: #854d0e; }

.ues-avatar-sm { width: 32px; height: 32px; background: #e2e8f0; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 0.75rem; font-weight: 700; color: #475569; }

/* Responsive */
@media (max-width: 1400px) {
  .ues-span-8 { grid-column: span 12; }
  .ues-span-4 { grid-column: span 12; }
}
@media (max-width: 1024px) {
  .ues-kpi-grid { grid-template-columns: 1fr 1fr; }
  .ues-sidebar { width: 80px; }
  .ues-brand strong, .ues-b-tag, .ues-ns-title, .ues-nav-section a text, .ues-ua-info, .ues-btn-icon { display: none; }
  .ues-nav-section a { justify-content: center; font-size: 0; padding: 16px 0; border-radius: 0; }
  .ues-nav-section a.active { border-radius: 0; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design and develop the most advanced Dashboard and Monetization Suite possible. Combine AI insights, complex data visualizations, modular architecture, and enterprise scalability into one cohesive ecosystem.`
};
