/**
 * Component: Dashboard Container
 * Category: containers
 */

export const component = {
  id: 'dashboard-container',
  name: 'Dashboard Container',
  category: 'containers',
  tag: 'Premium',
  html: `<div class="dash-wrapper">
  <div class="dash-container">
    <div class="dash-sidebar">
      <div class="dash-logo">NEXUS</div>
      <nav class="dash-nav">
        <a href="#" class="active">Overview</a>
        <a href="#">Analytics</a>
        <a href="#">Servers</a>
        <a href="#">Players</a>
        <a href="#">Settings</a>
      </nav>
    </div>
    
    <main class="dash-main">
      <header class="dash-header">
        <h2>Global Overview</h2>
        <div class="dash-user">
          <span>Admin</span>
          <img src="https://i.pravatar.cc/150?img=33" alt="Admin">
        </div>
      </header>
      
      <div class="dash-content">
        <!-- Top Stats Row -->
        <div class="dash-grid-top">
          <div class="dash-widget">
            <h4>Total Revenue</h4>
            <div class="dash-value">$124,500</div>
            <div class="dash-trend positive">+12.5%</div>
          </div>
          <div class="dash-widget">
            <h4>Active Players</h4>
            <div class="dash-value">45,210</div>
            <div class="dash-trend positive">+5.2%</div>
          </div>
          <div class="dash-widget">
            <h4>Server Load</h4>
            <div class="dash-value">78%</div>
            <div class="dash-trend negative">+14.1%</div>
          </div>
          <div class="dash-widget">
            <h4>Support Tickets</h4>
            <div class="dash-value">124</div>
            <div class="dash-trend positive">-2.4%</div>
          </div>
        </div>
        
        <!-- Main Complex Grid -->
        <div class="dash-grid-main">
          <!-- Large Chart Widget -->
          <div class="dash-widget dash-span-2">
            <div class="dash-widget-header">
              <h4>Player Activity (7 Days)</h4>
              <button class="dash-btn-small">Export</button>
            </div>
            <!-- Mock Chart Area -->
            <div class="dash-mock-chart">
               <div class="dash-bar" style="height: 40%"></div>
               <div class="dash-bar" style="height: 70%"></div>
               <div class="dash-bar" style="height: 50%"></div>
               <div class="dash-bar" style="height: 90%"></div>
               <div class="dash-bar" style="height: 65%"></div>
               <div class="dash-bar" style="height: 85%"></div>
               <div class="dash-bar" style="height: 100%"></div>
            </div>
          </div>
          
          <!-- Secondary Widget -->
          <div class="dash-widget">
            <div class="dash-widget-header">
              <h4>Server Status</h4>
            </div>
            <ul class="dash-list">
              <li>
                <span class="dash-status-dot online"></span>
                <span class="dash-list-title">US East (N. Virginia)</span>
                <span class="dash-list-val">99.9%</span>
              </li>
              <li>
                <span class="dash-status-dot online"></span>
                <span class="dash-list-title">EU Central (Frankfurt)</span>
                <span class="dash-list-val">99.8%</span>
              </li>
              <li>
                <span class="dash-status-dot issue"></span>
                <span class="dash-list-title">AP South (Mumbai)</span>
                <span class="dash-list-val">94.2%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>`,
  js: `// Dashboard Container Logic
// The dashboard relies on CSS Grid to easily scale and restructure based on viewport.

const dashBars = document.querySelectorAll('.dash-bar');
// Simple animation for the mock chart on load
dashBars.forEach((bar, index) => {
  const finalHeight = bar.style.height;
  bar.style.height = '0%';
  
  setTimeout(() => {
    bar.style.transition = 'height 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    bar.style.height = finalHeight;
  }, 100 + (index * 100));
});`,
  ts: `// Dashboard Container Logic (TypeScript)
const dashBars = document.querySelectorAll<HTMLDivElement>('.dash-bar');
dashBars.forEach((bar, index) => {
  const finalHeight = bar.style.height;
  bar.style.height = '0%';
  
  setTimeout(() => {
    bar.style.transition = 'height 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    bar.style.height = finalHeight;
  }, 100 + (index * 100));
});`,
  css: `/* Dashboard Container Styles */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.dash-wrapper {
  width: 100%;
  height: 800px;
  background: #f8f9fa;
  font-family: 'Roboto', sans-serif;
  color: #343a40;
}

.dash-container {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Sidebar structure */
.dash-sidebar {
  width: 250px;
  background: #ffffff;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.dash-logo {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #4361ee;
  letter-spacing: 2px;
  border-bottom: 1px solid #e9ecef;
}

.dash-nav {
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dash-nav a {
  padding: 12px 24px;
  text-decoration: none;
  color: #6c757d;
  font-weight: 500;
  border-left: 4px solid transparent;
  transition: all 0.2s;
}

.dash-nav a:hover {
  background: #f8f9fa;
  color: #212529;
}

.dash-nav a.active {
  background: rgba(67, 97, 238, 0.1);
  color: #4361ee;
  border-left-color: #4361ee;
}

/* Main Dashboard Area */
.dash-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dash-header {
  height: 80px;
  background: #ffffff;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  flex-shrink: 0;
}

.dash-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.dash-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dash-user span {
  font-weight: 500;
  color: #495057;
}

.dash-user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* Scrollable Content Area */
.dash-content {
  padding: 32px;
  overflow-y: auto;
  flex-grow: 1;
}

/* Core Dashboard Grids */
.dash-grid-top {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.dash-grid-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.dash-span-2 {
  grid-column: span 2;
}

/* Widgets */
.dash-widget {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
}

.dash-widget h4 {
  margin: 0 0 16px 0;
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dash-value {
  font-size: 2rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 8px;
}

.dash-trend {
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  width: fit-content;
}

.dash-trend.positive {
  background: #d1e7dd;
  color: #0f5132;
}
.dash-trend.negative {
  background: #f8d7da;
  color: #842029;
}

.dash-widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dash-widget-header h4 {
  margin: 0;
}

.dash-btn-small {
  padding: 6px 12px;
  background: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
}

/* Mock Chart */
.dash-mock-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 200px;
  padding-top: 20px;
  border-bottom: 1px solid #e9ecef;
}

.dash-bar {
  width: 10%;
  background: linear-gradient(to top, #4361ee, #4cc9f0);
  border-radius: 4px 4px 0 0;
}

/* Lists */
.dash-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dash-list li {
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #f8f9fa;
}

.dash-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.dash-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 12px;
}

.dash-status-dot.online { background: #198754; box-shadow: 0 0 8px rgba(25, 135, 84, 0.4); }
.dash-status-dot.issue { background: #dc3545; box-shadow: 0 0 8px rgba(220, 53, 69, 0.4); }

.dash-list-title {
  flex-grow: 1;
  font-weight: 500;
}

.dash-list-val {
  font-weight: 700;
}

/* Responsive */
@media (max-width: 1024px) {
  .dash-grid-main {
    grid-template-columns: 1fr;
  }
  .dash-span-2 {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .dash-sidebar {
    position: absolute;
    transform: translateX(-100%);
    z-index: 100;
  }
  .dash-header {
    padding: 0 16px;
  }
  .dash-content {
    padding: 16px;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a Dashboard Container optimized for complex interfaces containing widgets, analytics, charts, statistics, and user controls. Support dynamic layouts, nested containers, responsive grids, and scalable architecture.`
};
