/**
 * Component: Next-Gen AI SaaS Dashboard
 * Category: dashboard-layouts
 */

export const component = {
  id: 'nextgen-ai-saas-dashboard',
  name: 'Next-Gen AI SaaS Dashboard',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="nxta-wrapper">
  
  <div class="nxta-sidebar">
    <div class="nxta-logo">
      <div class="nxta-mesh"></div>
      Nexus<span style="font-weight: 300;">AI</span>
    </div>
    <nav class="nxta-nav">
      <div class="nxta-nav-group">
        <span>CORE</span>
        <a href="#" class="active">Overview</a>
        <a href="#">Performance</a>
      </div>
      <div class="nxta-nav-group">
        <span>INTELLIGENCE</span>
        <a href="#">AI Models</a>
        <a href="#">Predictions</a>
      </div>
      <div class="nxta-nav-group">
        <span>MONETIZATION</span>
        <a href="#">Billing</a>
        <a href="#">Usage & Tiers</a>
      </div>
    </nav>
  </div>

  <main class="nxta-main">
    
    <header class="nxta-header">
      <div class="nxta-search-bar">
        <span>⌘ K</span>
        <input type="text" placeholder="Ask Nexus anything...">
      </div>
      <div class="nxta-h-actions">
        <button class="nxta-btn-h">Documentation</button>
        <div class="nxta-avatar"></div>
      </div>
    </header>

    <div class="nxta-content">
      
      <div class="nxta-welcome">
        <h1>Welcome, System Admin.</h1>
        <p>All AI models are operating at peak efficiency. You have 3 recommendations.</p>
      </div>

      <!-- Smart Recommendation Block -->
      <div class="nxta-smart-block">
        <div class="nxta-sb-icon">✨</div>
        <div class="nxta-sb-text">
          <strong>Revenue Optimization Detected</strong>
          <span>Based on current API usage patterns, prompting users at 80% quota to upgrade to the Enterprise plan will increase conversion by an estimated 14%.</span>
        </div>
        <button class="nxta-btn-glow">Deploy Automation</button>
      </div>

      <div class="nxta-grid">
        
        <!-- API Usage & Tiers -->
        <div class="nxta-card nxta-span-2">
          <div class="nxta-card-header">
            <h3>API Usage & Quota (Real-time)</h3>
            <div class="nxta-tabs"><button class="active">24h</button><button>7d</button><button>30d</button></div>
          </div>
          
          <div class="nxta-chart-wrap">
            <svg viewBox="0 0 600 200" preserveAspectRatio="none" class="nxta-svg-chart">
              <!-- Grid lines -->
              <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.05)" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.05)" />
              <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(255,255,255,0.05)" />
              <!-- Data path -->
              <path class="nxta-data-path" d="M0,180 Q100,160 200,100 T400,120 T600,40" fill="none" stroke="#a855f7" stroke-width="3" />
              <!-- Glow -->
              <path class="nxta-data-path-glow" d="M0,180 Q100,160 200,100 T400,120 T600,40" fill="none" stroke="#a855f7" stroke-width="10" opacity="0.3" filter="blur(8px)" />
            </svg>
          </div>

          <div class="nxta-tier-usage">
            <div class="nxta-tu-item">
              <span class="nxta-tu-lbl">Pro Tier Usage</span>
              <div class="nxta-tu-bar-bg"><div class="nxta-tu-bar" style="width: 82%; background:#a855f7"></div></div>
              <span class="nxta-tu-val">82%</span>
            </div>
            <div class="nxta-tu-item">
              <span class="nxta-tu-lbl">Enterprise Usage</span>
              <div class="nxta-tu-bar-bg"><div class="nxta-tu-bar" style="width: 45%; background:#3b82f6"></div></div>
              <span class="nxta-tu-val">45%</span>
            </div>
          </div>

        </div>

        <!-- System Health & Upgrade -->
        <div class="nxta-side-col">
          
          <div class="nxta-card">
            <div class="nxta-card-header">
              <h3>System Health</h3>
            </div>
            <div class="nxta-health-stats">
              <div class="nxta-hs-item">
                <span class="nxta-hs-name">Latency</span>
                <span class="nxta-hs-val" style="color:#10b981">12ms</span>
              </div>
              <div class="nxta-hs-item">
                <span class="nxta-hs-name">Error Rate</span>
                <span class="nxta-hs-val" style="color:#10b981">0.001%</span>
              </div>
              <div class="nxta-hs-item">
                <span class="nxta-hs-name">Uptime</span>
                <span class="nxta-hs-val">99.99%</span>
              </div>
            </div>
          </div>

          <div class="nxta-upgrade-panel">
            <div class="nxta-up-bg"></div>
            <div class="nxta-up-content">
              <h3>Scale Instantly</h3>
              <p>Your model inference load is increasing. Upgrade to Dedicated Compute for guaranteed sub-10ms latency.</p>
              <div class="nxta-up-price">$499<span>/mo</span></div>
              <button class="nxta-btn-glow w-full">Provision Now</button>
            </div>
          </div>

        </div>

      </div>

    </div>
  </main>
</div>`,
  js: `// Next-Gen AI Dashboard Logic
const paths = document.querySelectorAll('.nxta-data-path, .nxta-data-path-glow');
paths.forEach(path => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  setTimeout(() => {
    path.style.transition = 'stroke-dashoffset 2s ease-in-out';
    path.style.strokeDashoffset = '0';
  }, 100);
});`,
  ts: `// Next-Gen AI Dashboard Logic (TypeScript)
const paths = document.querySelectorAll<SVGPathElement>('.nxta-data-path, .nxta-data-path-glow');
paths.forEach(path => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length.toString();
  path.style.strokeDashoffset = length.toString();
  setTimeout(() => {
    path.style.transition = 'stroke-dashoffset 2s ease-in-out';
    path.style.strokeDashoffset = '0';
  }, 100);
});`,
  css: `/* Next-Gen AI SaaS Dashboard Styles */
.nxta-wrapper {
  display: flex;
  min-height: 100vh;
  background: #09090b; /* Zinc 950 */
  font-family: 'Inter', sans-serif;
  color: #f4f4f5; /* Zinc 100 */
}

/* Sidebar */
.nxta-sidebar {
  width: 240px;
  background: rgba(24, 24, 27, 0.5); /* Zinc 900 */
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255,255,255,0.05);
  display: flex; flex-direction: column;
}

.nxta-logo {
  display: flex; align-items: center; gap: 12px;
  padding: 24px; font-size: 1.25rem; font-weight: 800;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.nxta-mesh {
  width: 24px; height: 24px; border-radius: 6px;
  background: radial-gradient(circle at top left, #a855f7, #3b82f6);
}

.nxta-nav { padding: 24px 12px; display: flex; flex-direction: column; gap: 24px; }
.nxta-nav-group { display: flex; flex-direction: column; gap: 8px; }
.nxta-nav-group span { font-size: 0.7rem; color: #71717a; font-weight: 700; letter-spacing: 1px; padding-left: 12px; }

.nxta-nav a {
  text-decoration: none; color: #a1a1aa; padding: 8px 12px; border-radius: 6px;
  font-size: 0.9rem; font-weight: 500; transition: all 0.2s;
}
.nxta-nav a:hover, .nxta-nav a.active { background: rgba(255,255,255,0.05); color: #fff; }

/* Main */
.nxta-main { flex: 1; display: flex; flex-direction: column; }

.nxta-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.05);
}

.nxta-search-bar {
  display: flex; align-items: center; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px;
  gap: 12px; width: 300px;
}
.nxta-search-bar span { font-size: 0.75rem; color: #71717a; font-weight: 600; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; }
.nxta-search-bar input { border: none; background: transparent; color: #fff; outline: none; font-size: 0.9rem; width: 100%; font-family: inherit; }

.nxta-h-actions { display: flex; align-items: center; gap: 16px; }
.nxta-btn-h { background: transparent; border: none; color: #a1a1aa; font-weight: 500; cursor: pointer; }
.nxta-btn-h:hover { color: #fff; }
.nxta-avatar { width: 32px; height: 32px; border-radius: 50%; background: #a855f7; }

.nxta-content { padding: 40px; max-width: 1200px; margin: 0 auto; width: 100%; }

.nxta-welcome { margin-bottom: 32px; }
.nxta-welcome h1 { margin: 0 0 8px 0; font-size: 2rem; font-weight: 800; letter-spacing: -0.5px; }
.nxta-welcome p { margin: 0; color: #a1a1aa; }

/* Smart Block */
.nxta-smart-block {
  background: linear-gradient(90deg, rgba(168,85,247,0.1) 0%, rgba(59,130,246,0.1) 100%);
  border: 1px solid rgba(168,85,247,0.3);
  border-radius: 12px; padding: 20px 24px; display: flex; align-items: center; gap: 20px;
  margin-bottom: 40px;
}
.nxta-sb-icon { font-size: 1.5rem; }
.nxta-sb-text { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.nxta-sb-text strong { font-size: 0.95rem; }
.nxta-sb-text span { font-size: 0.85rem; color: #a1a1aa; line-height: 1.5; }

.nxta-btn-glow {
  background: #a855f7; color: #fff; border: none; padding: 10px 20px; border-radius: 8px;
  font-weight: 600; cursor: pointer; transition: all 0.2s;
  box-shadow: 0 0 15px rgba(168,85,247,0.4);
}
.nxta-btn-glow:hover { box-shadow: 0 0 25px rgba(168,85,247,0.6); transform: translateY(-1px); }
.w-full { width: 100%; }

/* Grid */
.nxta-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
.nxta-span-2 { grid-column: span 1; }

.nxta-card {
  background: rgba(24, 24, 27, 0.5); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px; padding: 24px; backdrop-filter: blur(10px);
}

.nxta-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.nxta-card-header h3 { margin: 0; font-size: 1.05rem; font-weight: 600; }

.nxta-tabs button {
  background: transparent; border: none; color: #71717a; padding: 4px 12px; border-radius: 20px;
  font-size: 0.85rem; font-weight: 500; cursor: pointer;
}
.nxta-tabs button.active { background: rgba(255,255,255,0.1); color: #fff; }

.nxta-chart-wrap { height: 250px; margin-bottom: 24px; position: relative; }
.nxta-svg-chart { width: 100%; height: 100%; overflow: visible; }

.nxta-tier-usage { display: flex; flex-direction: column; gap: 16px; }
.nxta-tu-item { display: flex; align-items: center; gap: 12px; font-size: 0.85rem; }
.nxta-tu-lbl { width: 120px; color: #a1a1aa; }
.nxta-tu-bar-bg { flex: 1; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; }
.nxta-tu-bar { height: 100%; border-radius: 3px; }
.nxta-tu-val { width: 40px; text-align: right; font-weight: 600; }

/* Side Col */
.nxta-side-col { display: flex; flex-direction: column; gap: 24px; }

.nxta-health-stats { display: flex; flex-direction: column; gap: 16px; }
.nxta-hs-item { display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; }
.nxta-hs-name { color: #a1a1aa; }
.nxta-hs-val { font-weight: 600; }

.nxta-upgrade-panel {
  position: relative; border-radius: 16px; padding: 32px 24px; overflow: hidden; text-align: center;
  border: 1px solid rgba(255,255,255,0.1);
}
.nxta-up-bg {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at center, rgba(59,130,246,0.2) 0%, rgba(9,9,11,1) 100%);
  z-index: 0;
}
.nxta-up-content { position: relative; z-index: 1; }
.nxta-up-content h3 { margin: 0 0 12px 0; font-size: 1.25rem; }
.nxta-up-content p { font-size: 0.85rem; color: #a1a1aa; margin: 0 0 24px 0; line-height: 1.5; }
.nxta-up-price { font-size: 2rem; font-weight: 800; margin-bottom: 24px; }
.nxta-up-price span { font-size: 0.9rem; color: #a1a1aa; font-weight: 500; }

/* Responsive */
@media (max-width: 1024px) {
  .nxta-grid { grid-template-columns: 1fr; }
  .nxta-sidebar { width: 80px; }
  .nxta-logo { font-size: 0; padding: 24px 0; justify-content: center; }
  .nxta-nav-group span, .nxta-nav a text { display: none; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a next-generation AI SaaS dashboard that integrates platform analytics, AI recommendations, and seamless upgrade opportunities.`
};
