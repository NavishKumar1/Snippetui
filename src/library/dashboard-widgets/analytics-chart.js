/**
 * Component: Analytics Chart
 * Category: dashboard-widgets
 */

export const component = {
  id: 'analytics-chart',
  name: 'Analytics Chart',
  category: 'dashboard-widgets',
  tag: 'Premium',
  html: `<div class="achart-wrapper">
  <div class="achart-container">
    <div class="achart-header">
      <div class="achart-info">
        <h2>Revenue & Active Users</h2>
        <p>Performance over the last 12 months</p>
      </div>
      <div class="achart-toggles">
        <button class="achart-btn active">12M</button>
        <button class="achart-btn">6M</button>
        <button class="achart-btn">30D</button>
      </div>
    </div>
    
    <div class="achart-legend">
      <div class="achart-legend-item">
        <span class="achart-dot" style="background: #3b82f6;"></span> Revenue (MRR)
      </div>
      <div class="achart-legend-item">
        <span class="achart-dot" style="background: #10b981;"></span> Active Users
      </div>
    </div>
    
    <!-- CSS-based Area Chart representation -->
    <div class="achart-stage">
      <div class="achart-y-axis">
        <span>$100k</span>
        <span>$75k</span>
        <span>$50k</span>
        <span>$25k</span>
        <span>$0</span>
      </div>
      
      <div class="achart-graph-area">
        <!-- Grid Lines -->
        <div class="achart-grid-line" style="bottom: 25%"></div>
        <div class="achart-grid-line" style="bottom: 50%"></div>
        <div class="achart-grid-line" style="bottom: 75%"></div>
        <div class="achart-grid-line" style="bottom: 100%"></div>
        
        <!-- Graph SVG -->
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" class="achart-svg">
          <defs>
            <linearGradient id="area-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stop-color="rgba(59, 130, 246, 0.0)" />
            </linearGradient>
            <linearGradient id="area-green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(16, 185, 129, 0.4)" />
              <stop offset="100%" stop-color="rgba(16, 185, 129, 0.0)" />
            </linearGradient>
          </defs>
          
          <!-- Blue Area (Revenue) -->
          <path class="achart-area-path" fill="url(#area-blue)" d="M0,250 C100,230 200,280 300,180 C400,80 500,200 600,140 C700,80 800,150 900,50 L1000,20 L1000,300 L0,300 Z" />
          <path class="achart-line-path" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" d="M0,250 C100,230 200,280 300,180 C400,80 500,200 600,140 C700,80 800,150 900,50 L1000,20" />
          
          <!-- Green Area (Users) -->
          <path class="achart-area-path" fill="url(#area-green)" d="M0,280 C150,270 250,220 350,240 C450,260 550,180 650,190 C750,200 850,120 1000,90 L1000,300 L0,300 Z" />
          <path class="achart-line-path" fill="none" stroke="#10b981" stroke-width="4" stroke-linecap="round" d="M0,280 C150,270 250,220 350,240 C450,260 550,180 650,190 C750,200 850,120 1000,90" />
        </svg>
        
        <!-- Interactive Tooltip Overlay (Demo) -->
        <div class="achart-tooltip-line">
          <div class="achart-tooltip">
            <strong>Oct 2026</strong>
            <div style="color:#3b82f6">$84,500</div>
            <div style="color:#10b981">42,000 Users</div>
          </div>
        </div>
      </div>
      
      <div class="achart-x-axis">
        <span>Jan</span>
        <span>Mar</span>
        <span>May</span>
        <span>Jul</span>
        <span>Sep</span>
        <span>Nov</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Analytics Chart Logic
const stage = document.querySelector('.achart-graph-area');
const tooltipLine = document.querySelector('.achart-tooltip-line');

if(stage && tooltipLine) {
  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    let x = e.clientX - rect.left;
    
    // Boundary checks
    if(x < 0) x = 0;
    if(x > rect.width) x = rect.width;
    
    tooltipLine.style.opacity = '1';
    tooltipLine.style.left = \`\${x}px\`;
  });
  
  stage.addEventListener('mouseleave', () => {
    tooltipLine.style.opacity = '0';
  });
}`,
  ts: `// Analytics Chart Logic (TypeScript)
const stage = document.querySelector<HTMLDivElement>('.achart-graph-area');
const tooltipLine = document.querySelector<HTMLDivElement>('.achart-tooltip-line');

if(stage && tooltipLine) {
  stage.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = stage.getBoundingClientRect();
    let x = e.clientX - rect.left;
    
    if(x < 0) x = 0;
    if(x > rect.width) x = rect.width;
    
    tooltipLine.style.opacity = '1';
    tooltipLine.style.left = \`\${x}px\`;
  });
  
  stage.addEventListener('mouseleave', () => {
    tooltipLine.style.opacity = '0';
  });
}`,
  css: `/* Analytics Chart Styles */
.achart-wrapper {
  background: #ffffff;
  padding: 40px;
  display: flex;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

.achart-container {
  width: 100%;
  max-width: 1200px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
  border: 1px solid #f1f5f9;
  padding: 32px;
}

.achart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.achart-info h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.achart-info p {
  color: #64748b;
  margin: 0;
  font-size: 0.95rem;
}

.achart-toggles {
  display: flex;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 4px;
}

.achart-btn {
  background: transparent;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.achart-btn:hover {
  color: #1e293b;
}

.achart-btn.active {
  background: #fff;
  color: #0f172a;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.achart-legend {
  display: flex;
  gap: 24px;
  margin-bottom: 30px;
}

.achart-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #475569;
}

.achart-dot {
  width: 12px;
  height: 12px;
  border-radius: 4px;
}

/* The Chart Stage */
.achart-stage {
  position: relative;
  width: 100%;
  height: 350px;
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr 30px;
}

.achart-y-axis {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #94a3b8;
  font-size: 0.8rem;
  padding-right: 16px;
  text-align: right;
  padding-bottom: 15px; /* Offset for x-axis */
}

.achart-graph-area {
  grid-column: 2;
  grid-row: 1;
  position: relative;
  border-bottom: 2px solid #e2e8f0;
}

.achart-grid-line {
  position: absolute;
  left: 0;
  right: 0;
  border-bottom: 1px dashed #e2e8f0;
}

.achart-svg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.achart-line-path {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: drawChart 2s ease-in-out forwards;
}

.achart-area-path {
  opacity: 0;
  animation: fadeChart 1s 1.5s forwards;
}

@keyframes drawChart { to { stroke-dashoffset: 0; } }
@keyframes fadeChart { to { opacity: 1; } }

/* Tooltip Line */
.achart-tooltip-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #94a3b8;
  left: 50%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.achart-tooltip {
  position: absolute;
  top: 40px;
  left: 10px;
  background: #1e293b;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  width: 130px;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.achart-x-axis {
  grid-column: 2;
  grid-row: 2;
  display: flex;
  justify-content: space-between;
  color: #94a3b8;
  font-size: 0.8rem;
  padding-top: 12px;
}

@media (max-width: 600px) {
  .achart-header { flex-direction: column; }
  .achart-toggles { width: 100%; }
  .achart-btn { flex: 1; }
  .achart-stage { height: 250px; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create an enterprise-grade Analytics Chart component displaying user activity and revenue growth. Include interactive hover states, animations, and beautiful dual-axis representation.`
};
