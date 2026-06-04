/**
 * Component: AI Business Intelligence Dashboard
 * Category: dashboard-layouts
 */

export const component = {
  id: 'ai-business-intelligence-dashboard',
  name: 'AI-Powered Business Intelligence',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="aibd-wrapper">
  
  <div class="aibd-sidebar">
    <div class="aibd-logo">
      <div class="aibd-logo-icon"></div>
      Nexus AI
    </div>
    <nav class="aibd-nav">
      <a href="#" class="active"><i class="aibd-icon">❖</i> Intelligence</a>
      <a href="#"><i class="aibd-icon">📈</i> Forecasting</a>
      <a href="#"><i class="aibd-icon">👥</i> Customers</a>
      <a href="#"><i class="aibd-icon">💰</i> Revenue</a>
    </nav>
    <div class="aibd-ai-status">
      <div class="aibd-pulse"></div>
      AI Engine Active
    </div>
  </div>

  <main class="aibd-main">
    <header class="aibd-header">
      <h2>Intelligence Hub</h2>
      <div class="aibd-header-right">
        <div class="aibd-ai-ask">
          <input type="text" placeholder="Ask AI to analyze data...">
          <button>✦</button>
        </div>
      </div>
    </header>

    <div class="aibd-content">
      
      <!-- AI Insight Banner -->
      <div class="aibd-insight-banner">
        <div class="aibd-ib-icon">✦</div>
        <div class="aibd-ib-text">
          <strong>AI Insight:</strong> Based on the current trajectory, Monthly Recurring Revenue (MRR) is projected to increase by 14% next quarter. Recommend launching the Elite Tier up-sell campaign next week.
        </div>
        <button class="aibd-ib-btn">Execute Plan</button>
      </div>

      <!-- Metrics Row -->
      <div class="aibd-metrics">
        <div class="aibd-metric-card">
          <div class="aibd-mc-head">Predicted MRR <span class="aibd-mc-tag">High Confidence</span></div>
          <div class="aibd-mc-val">$184.2K</div>
          <div class="aibd-mc-chart">
            <svg viewBox="0 0 100 20" class="aibd-sparkline">
              <path d="M0,15 Q20,18 40,10 T80,12 T100,5" fill="none" stroke="#6366f1" stroke-width="2"/>
            </svg>
          </div>
        </div>
        <div class="aibd-metric-card">
          <div class="aibd-mc-head">Churn Risk <span class="aibd-mc-tag aibd-tag-warn">Action Needed</span></div>
          <div class="aibd-mc-val">4.2%</div>
          <div class="aibd-mc-chart">
            <svg viewBox="0 0 100 20" class="aibd-sparkline">
              <path d="M0,5 Q25,8 50,15 T100,10" fill="none" stroke="#ef4444" stroke-width="2"/>
            </svg>
          </div>
        </div>
        <div class="aibd-metric-card">
          <div class="aibd-mc-head">AI Automation Savings</div>
          <div class="aibd-mc-val">$42.5K</div>
          <div class="aibd-mc-chart">
            <svg viewBox="0 0 100 20" class="aibd-sparkline">
              <path d="M0,18 Q30,15 60,8 T100,2" fill="none" stroke="#10b981" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="aibd-grid">
        
        <!-- Smart Chart -->
        <div class="aibd-card aibd-span-2">
          <div class="aibd-card-header">
            <h3>Revenue Forecast vs Actual</h3>
            <div class="aibd-card-actions">
              <span class="aibd-legend-item"><i style="background:#6366f1"></i> Actual</span>
              <span class="aibd-legend-item"><i style="background:#cbd5e1" class="dashed"></i> AI Forecast</span>
            </div>
          </div>
          <div class="aibd-chart-stage">
            <svg viewBox="0 0 500 200" class="aibd-main-svg">
              <!-- Grid -->
              <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" />
              
              <!-- Forecast Line -->
              <path d="M0,150 L100,130 L200,120 L300,90 L400,60 L500,40" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="5,5" />
              
              <!-- Actual Line (Animated) -->
              <path class="aibd-actual-line" d="M0,150 L100,130 L200,110 L300,70 L350,50" fill="none" stroke="#6366f1" stroke-width="3" />
              
              <!-- Glow point -->
              <circle cx="350" cy="50" r="5" fill="#6366f1">
                <animate attributeName="r" values="5;10;5" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>

        <!-- Dynamic Monetization Suggestions -->
        <div class="aibd-card">
          <div class="aibd-card-header">
            <h3>Smart Monetization</h3>
          </div>
          <div class="aibd-suggestions">
            
            <div class="aibd-sugg-item">
              <div class="aibd-si-icon">🎯</div>
              <div class="aibd-si-content">
                <h4>Dynamic Pricing Opportunity</h4>
                <p>Demand for API access is high. Increasing Pro tier by $5 could yield +$12k MRR.</p>
                <button class="aibd-si-btn">Simulate Change</button>
              </div>
            </div>

            <div class="aibd-sugg-item">
              <div class="aibd-si-icon">🛡️</div>
              <div class="aibd-si-content">
                <h4>Churn Prevention</h4>
                <p>84 enterprise users are at risk. AI generated a targeted discount campaign.</p>
                <button class="aibd-si-btn">View Campaign</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </main>
</div>`,
  js: `// AI Dashboard Logic
const actualLine = document.querySelector('.aibd-actual-line');
if(actualLine) {
  setTimeout(() => {
    actualLine.style.strokeDasharray = '1000';
    actualLine.style.strokeDashoffset = '1000';
    actualLine.style.animation = 'aibdDraw 2s ease-out forwards';
  }, 300);
}`,
  ts: `// AI Dashboard Logic (TypeScript)
const actualLine = document.querySelector<SVGPathElement>('.aibd-actual-line');
if(actualLine) {
  setTimeout(() => {
    actualLine.style.strokeDasharray = '1000';
    actualLine.style.strokeDashoffset = '1000';
    actualLine.style.animation = 'aibdDraw 2s ease-out forwards';
  }, 300);
}`,
  css: `/* AI Business Intelligence Dashboard Styles */
.aibd-wrapper {
  display: flex;
  height: 100vh;
  min-height: 800px;
  background: #f8fafc;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
}

/* Sidebar */
.aibd-sidebar {
  width: 250px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.aibd-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 40px;
  color: #1e293b;
}

.aibd-logo-icon {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 6px;
}

.aibd-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.aibd-nav a {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 10px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s;
}

.aibd-nav a:hover, .aibd-nav a.active {
  background: #f1f5f9;
  color: #0f172a;
}

.aibd-nav a.active {
  background: #e0e7ff;
  color: #4f46e5;
}

.aibd-icon { font-style: normal; font-size: 1.1rem; }

.aibd-ai-status {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.aibd-pulse {
  width: 8px; height: 8px;
  background: #8b5cf6;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
  animation: aibdPulse 2s infinite;
}

@keyframes aibdPulse {
  70% { box-shadow: 0 0 0 6px rgba(139, 92, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
}

/* Main */
.aibd-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.aibd-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 40px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.aibd-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.aibd-ai-ask {
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border-radius: 20px;
  padding: 4px 4px 4px 16px;
  border: 1px solid #e2e8f0;
}

.aibd-ai-ask input {
  border: none;
  background: transparent;
  width: 250px;
  outline: none;
  font-family: inherit;
  font-size: 0.9rem;
}

.aibd-ai-ask button {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border: none;
  color: #fff;
  width: 32px; height: 32px;
  border-radius: 16px;
  cursor: pointer;
  display: flex; justify-content: center; align-items: center;
}

.aibd-content {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Insight Banner */
.aibd-insight-banner {
  background: linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.aibd-ib-icon {
  font-size: 1.5rem;
  color: #6366f1;
}

.aibd-ib-text {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #334155;
}

.aibd-ib-btn {
  background: #fff;
  border: 1px solid #cbd5e1;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  color: #0f172a;
}
.aibd-ib-btn:hover { background: #f8fafc; }

/* Metrics */
.aibd-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.aibd-metric-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
}

.aibd-mc-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 12px;
}

.aibd-mc-tag {
  background: #dcfce7;
  color: #166534;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
}
.aibd-tag-warn { background: #fee2e2; color: #991b1b; }

.aibd-mc-val {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 16px;
}

.aibd-sparkline {
  width: 100%; height: 30px;
  overflow: visible;
}

/* Main Grid */
.aibd-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.aibd-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
}

.aibd-span-2 { grid-column: span 1; /* Keeping 2fr instead of span */ }

.aibd-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.aibd-card-header h3 { margin: 0; font-size: 1.1rem; font-weight: 700; }

.aibd-card-actions { display: flex; gap: 16px; font-size: 0.85rem; color: #64748b; }
.aibd-legend-item { display: flex; align-items: center; gap: 6px; }
.aibd-legend-item i { width: 12px; height: 4px; border-radius: 2px; }
.aibd-legend-item i.dashed { border: 1px dashed #cbd5e1; background: transparent !important; }

.aibd-chart-stage {
  height: 250px;
}
.aibd-main-svg { width: 100%; height: 100%; overflow: visible; }

@keyframes aibdDraw { to { stroke-dashoffset: 0; } }

/* Suggestions */
.aibd-suggestions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.aibd-sugg-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.aibd-si-icon { font-size: 1.5rem; }

.aibd-si-content h4 { margin: 0 0 8px 0; font-size: 0.95rem; font-weight: 600; }
.aibd-si-content p { margin: 0 0 12px 0; font-size: 0.85rem; color: #64748b; line-height: 1.5; }

.aibd-si-btn {
  background: #fff;
  border: 1px solid #cbd5e1;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
.aibd-si-btn:hover { border-color: #94a3b8; }

/* Responsive */
@media (max-width: 1024px) {
  .aibd-grid { grid-template-columns: 1fr; }
  .aibd-metrics { grid-template-columns: 1fr; }
  .aibd-sidebar { width: 80px; }
  .aibd-logo { justify-content: center; font-size: 0; }
  .aibd-nav a { justify-content: center; font-size: 0; padding: 16px 0; }
  .aibd-ai-status { font-size: 0; justify-content: center; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design an AI-powered dashboard that combines analytics, business intelligence, and monetization predictive insights.`
};
