/**
 * Component: User Growth Widget
 * Category: dashboard-widgets
 */

export const component = {
  id: 'user-growth-widget',
  name: 'User Growth Widget',
  category: 'dashboard-widgets',
  tag: 'Premium',
  html: `<div class="ugw-wrapper">
  <div class="ugw-container">
    <div class="ugw-header">
      <div class="ugw-title-wrap">
        <h2>User Growth</h2>
        <span class="ugw-status">Live</span>
      </div>
      <div class="ugw-tabs">
        <button class="active">Daily</button>
        <button>Weekly</button>
        <button>Monthly</button>
      </div>
    </div>
    
    <div class="ugw-metrics">
      <div class="ugw-metric">
        <span class="ugw-label">New Registrations</span>
        <strong class="ugw-value">12,482</strong>
      </div>
      <div class="ugw-metric">
        <span class="ugw-label">Active Users (DAU)</span>
        <strong class="ugw-value">1.2M</strong>
      </div>
      <div class="ugw-metric">
        <span class="ugw-label">Retention Rate</span>
        <strong class="ugw-value">78.4%</strong>
      </div>
    </div>
    
    <div class="ugw-chart-box">
      <!-- Curved SVG line chart -->
      <svg viewBox="0 0 500 150" class="ugw-svg">
        <defs>
          <linearGradient id="ugw-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(244, 63, 94, 0.4)"/>
            <stop offset="100%" stop-color="rgba(244, 63, 94, 0)"/>
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <!-- Grid -->
        <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" stroke-width="1" />
        <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" stroke-width="1" />
        <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" stroke-width="1" />
        
        <!-- Area -->
        <path class="ugw-area" fill="url(#ugw-grad)" d="M0,120 C50,110 100,50 150,70 C200,90 250,110 300,60 C350,10 400,30 450,20 L500,10 L500,150 L0,150 Z" />
        
        <!-- Line -->
        <path class="ugw-line" fill="none" stroke="#f43f5e" stroke-width="3" filter="url(#glow)" d="M0,120 C50,110 100,50 150,70 C200,90 250,110 300,60 C350,10 400,30 450,20 L500,10" />
        
        <!-- Points -->
        <circle cx="150" cy="70" r="4" fill="#fff" stroke="#f43f5e" stroke-width="2" />
        <circle cx="300" cy="60" r="4" fill="#fff" stroke="#f43f5e" stroke-width="2" />
        <circle cx="500" cy="10" r="4" fill="#fff" stroke="#f43f5e" stroke-width="2" />
      </svg>
    </div>
    
    <div class="ugw-footer">
      <div class="ugw-insight">
        <strong>Growth Insight:</strong> 42% of new users originated from the recent Twitch Rivals event.
      </div>
    </div>
  </div>
</div>`,
  js: `// User Growth Widget Logic
// Add entry animation for SVG
const ugwLine = document.querySelector('.ugw-line');
const ugwArea = document.querySelector('.ugw-area');

if(ugwLine && ugwArea) {
  setTimeout(() => {
    ugwLine.style.strokeDasharray = '1000';
    ugwLine.style.strokeDashoffset = '1000';
    ugwLine.style.animation = 'ugwDraw 2s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    
    ugwArea.style.opacity = '0';
    ugwArea.style.animation = 'ugwFade 1s 1s forwards';
  }, 100);
}`,
  ts: `// User Growth Widget Logic (TypeScript)
const ugwLine = document.querySelector<SVGPathElement>('.ugw-line');
const ugwArea = document.querySelector<SVGPathElement>('.ugw-area');

if(ugwLine && ugwArea) {
  setTimeout(() => {
    ugwLine.style.strokeDasharray = '1000';
    ugwLine.style.strokeDashoffset = '1000';
    ugwLine.style.animation = 'ugwDraw 2s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    
    ugwArea.style.opacity = '0';
    ugwArea.style.animation = 'ugwFade 1s 1s forwards';
  }, 100);
}`,
  css: `/* User Growth Widget Styles */
.ugw-wrapper {
  background: #f8fafc;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}

.ugw-container {
  width: 100%;
  max-width: 700px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
  padding: 32px;
  border: 1px solid #e2e8f0;
}

.ugw-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.ugw-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ugw-title-wrap h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #0f172a;
}

.ugw-status {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
}

.ugw-status::before {
  content: '';
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.ugw-tabs {
  display: flex;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 10px;
}

.ugw-tabs button {
  background: transparent;
  border: none;
  padding: 6px 16px;
  border-radius: 8px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.ugw-tabs button.active {
  background: #fff;
  color: #0f172a;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.ugw-metrics {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.ugw-metric {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 150px;
}

.ugw-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ugw-value {
  font-size: 2rem;
  color: #0f172a;
}

.ugw-chart-box {
  width: 100%;
  margin-bottom: 24px;
}

.ugw-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

@keyframes ugwDraw { to { stroke-dashoffset: 0; } }
@keyframes ugwFade { to { opacity: 1; } }

.ugw-footer {
  border-top: 1px solid #f1f5f9;
  padding-top: 24px;
}

.ugw-insight {
  background: #fff0f2;
  border: 1px solid #ffe4e6;
  color: #be123c;
  padding: 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design an advanced User Growth Widget capable of visualizing new registrations and retention metrics using an animated SVG curved line chart with glowing effects.`
};
