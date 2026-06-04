/**
 * Component: Statistics Widget
 * Category: dashboard-widgets
 */

export const component = {
  id: 'statistics-widget',
  name: 'Statistics Widget',
  category: 'dashboard-widgets',
  tag: 'Premium',
  html: `<div class="statw-wrapper">
  <div class="statw-container">
    
    <div class="statw-card">
      <div class="statw-header">
        <h3 class="statw-title">Active Players</h3>
        <div class="statw-icon statw-icon-blue">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
      </div>
      <div class="statw-value" data-target="124592">0</div>
      <div class="statw-footer">
        <div class="statw-trend statw-positive">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          12.5%
        </div>
        <span class="statw-vs">vs last month</span>
      </div>
      <div class="statw-sparkline">
        <svg viewBox="0 0 100 30" class="statw-chart">
          <path d="M0,25 C10,20 20,28 30,15 C40,2 50,18 60,10 C70,2 80,22 90,5 L100,8" fill="none" stroke="#3b82f6" stroke-width="2"/>
          <path d="M0,30 L0,25 C10,20 20,28 30,15 C40,2 50,18 60,10 C70,2 80,22 90,5 L100,8 L100,30 Z" fill="url(#blue-grad)" />
          <defs>
            <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(59, 130, 246, 0.2)" />
              <stop offset="100%" stop-color="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    <div class="statw-card">
      <div class="statw-header">
        <h3 class="statw-title">Engagement Rate</h3>
        <div class="statw-icon statw-icon-emerald">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
        </div>
      </div>
      <div class="statw-value" data-target="68" data-suffix="%">0%</div>
      <div class="statw-footer">
        <div class="statw-trend statw-positive">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          4.2%
        </div>
        <span class="statw-vs">vs last month</span>
      </div>
      <div class="statw-sparkline">
        <svg viewBox="0 0 100 30" class="statw-chart">
          <path d="M0,20 L20,15 L40,18 L60,8 L80,12 L100,5" fill="none" stroke="#10b981" stroke-width="2"/>
          <path d="M0,30 L0,20 L20,15 L40,18 L60,8 L80,12 L100,5 L100,30 Z" fill="url(#green-grad)" />
          <defs>
            <linearGradient id="green-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(16, 185, 129, 0.2)" />
              <stop offset="100%" stop-color="rgba(16, 185, 129, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    <div class="statw-card">
      <div class="statw-header">
        <h3 class="statw-title">Churn Rate</h3>
        <div class="statw-icon statw-icon-rose">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
      </div>
      <div class="statw-value" data-target="2.4" data-suffix="%" data-decimals="1">0.0%</div>
      <div class="statw-footer">
        <div class="statw-trend statw-negative">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline><polyline points="16 17 22 17 22 11"></polyline></svg>
          1.1%
        </div>
        <span class="statw-vs">vs last month</span>
      </div>
      <div class="statw-sparkline">
        <svg viewBox="0 0 100 30" class="statw-chart">
          <path d="M0,5 L20,10 L40,8 L60,18 L80,15 L100,25" fill="none" stroke="#f43f5e" stroke-width="2"/>
          <path d="M0,30 L0,5 L20,10 L40,8 L60,18 L80,15 L100,25 L100,30 Z" fill="url(#rose-grad)" />
          <defs>
            <linearGradient id="rose-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(244, 63, 94, 0.2)" />
              <stop offset="100%" stop-color="rgba(244, 63, 94, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
    
  </div>
</div>`,
  js: `// Statistics Widget Logic
// Animated Counters
const statwCounters = document.querySelectorAll('.statw-value');
const statwObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0');
      
      let count = 0;
      const duration = 1500;
      const fps = 60;
      const increment = target / (duration / (1000 / fps));
      
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        
        // Format with commas and suffix
        let displayVal = count.toFixed(decimals);
        // Add commas for thousands
        if (decimals === 0) {
           displayVal = Math.floor(count).toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
        }
        
        el.innerText = displayVal + suffix;
      }, 1000 / fps);
      
      statwObserver.unobserve(el);
    }
  });
});

statwCounters.forEach(counter => statwObserver.observe(counter));`,
  ts: `// Statistics Widget Logic (TypeScript)
const statwCounters = document.querySelectorAll<HTMLElement>('.statw-value');
const statwObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const targetStr = el.getAttribute('data-target');
      if (!targetStr) return;
      
      const target = parseFloat(targetStr);
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0');
      
      let count = 0;
      const duration = 1500;
      const fps = 60;
      const increment = target / (duration / (1000 / fps));
      
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        
        let displayVal = count.toFixed(decimals);
        if (decimals === 0) {
           displayVal = Math.floor(count).toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
        }
        
        el.innerText = displayVal + suffix;
      }, 1000 / fps);
      
      statwObserver.unobserve(el);
    }
  });
});

statwCounters.forEach(counter => statwObserver.observe(counter));`,
  css: `/* Statistics Widget Styles */
.statw-wrapper {
  background: #09090b; /* Very dark zinc */
  padding: 40px;
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  justify-content: center;
}

.statw-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.statw-card {
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}

.statw-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);
  border-color: #3f3f46;
}

.statw-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.statw-title {
  color: #a1a1aa;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.statw-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.statw-icon-blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.statw-icon-emerald { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.statw-icon-rose { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }

.statw-value {
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.statw-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px; /* Space for sparkline */
}

.statw-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 6px;
}

.statw-positive { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.statw-negative { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }

.statw-vs {
  color: #71717a;
  font-size: 0.85rem;
}

.statw-sparkline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  opacity: 0.6;
}

.statw-chart {
  width: 100%;
  height: 100%;
  display: block;
  /* Simple entrance animation for SVG */
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawLine 2s ease-out forwards;
}

@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design and develop a world-class Statistics Widget component for a premium gaming platform featuring animated counters and inline sparkline charts.`
};
