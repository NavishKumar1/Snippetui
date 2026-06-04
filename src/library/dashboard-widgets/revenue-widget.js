/**
 * Component: Revenue Widget
 * Category: dashboard-widgets
 */

export const component = {
  id: 'revenue-widget',
  name: 'Revenue Widget',
  category: 'dashboard-widgets',
  tag: 'Premium',
  html: `<div class="rev-wrapper">
  <div class="rev-container">
    <div class="rev-header">
      <div class="rev-title-area">
        <h2>Monthly Recurring Revenue</h2>
        <span class="rev-badge">MRR</span>
      </div>
      <button class="rev-more">•••</button>
    </div>
    
    <div class="rev-main-stat">
      <div class="rev-amount">$842,500.00</div>
      <div class="rev-trend">
        <span class="rev-up">↑ 18.2%</span> vs last month
      </div>
    </div>
    
    <div class="rev-chart-container">
      <!-- Pure CSS Bar Chart for Revenue Breakdown -->
      <div class="rev-bars">
        <div class="rev-bar-group">
          <div class="rev-bar rev-bar-sub" style="height: 60%" title="Subscriptions"></div>
          <div class="rev-bar rev-bar-mxt" style="height: 30%" title="Microtransactions"></div>
          <span class="rev-label">Jan</span>
        </div>
        <div class="rev-bar-group">
          <div class="rev-bar rev-bar-sub" style="height: 65%"></div>
          <div class="rev-bar rev-bar-mxt" style="height: 35%"></div>
          <span class="rev-label">Feb</span>
        </div>
        <div class="rev-bar-group">
          <div class="rev-bar rev-bar-sub" style="height: 62%"></div>
          <div class="rev-bar rev-bar-mxt" style="height: 40%"></div>
          <span class="rev-label">Mar</span>
        </div>
        <div class="rev-bar-group">
          <div class="rev-bar rev-bar-sub" style="height: 70%"></div>
          <div class="rev-bar rev-bar-mxt" style="height: 38%"></div>
          <span class="rev-label">Apr</span>
        </div>
        <div class="rev-bar-group">
          <div class="rev-bar rev-bar-sub" style="height: 75%"></div>
          <div class="rev-bar rev-bar-mxt" style="height: 45%"></div>
          <span class="rev-label">May</span>
        </div>
        <div class="rev-bar-group">
          <div class="rev-bar rev-bar-sub" style="height: 85%"></div>
          <div class="rev-bar rev-bar-mxt" style="height: 50%"></div>
          <span class="rev-label">Jun</span>
        </div>
      </div>
    </div>
    
    <div class="rev-breakdown">
      <div class="rev-b-item">
        <div class="rev-b-dot" style="background:#6366f1;"></div>
        <div class="rev-b-info">
          <span class="rev-b-name">Subscriptions</span>
          <span class="rev-b-val">$514k</span>
        </div>
      </div>
      <div class="rev-b-item">
        <div class="rev-b-dot" style="background:#a855f7;"></div>
        <div class="rev-b-info">
          <span class="rev-b-name">In-Game</span>
          <span class="rev-b-val">$328k</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Revenue Widget Logic
// Add entrance animation to bars
const revGroups = document.querySelectorAll('.rev-bar-group');
setTimeout(() => {
  revGroups.forEach((group, index) => {
    const bars = group.querySelectorAll('.rev-bar');
    bars.forEach(bar => {
      bar.style.opacity = '1';
      bar.style.transform = 'translateY(0)';
    });
  });
}, 100);`,
  ts: `// Revenue Widget Logic (TypeScript)
const revGroups = document.querySelectorAll<HTMLDivElement>('.rev-bar-group');
setTimeout(() => {
  revGroups.forEach((group) => {
    const bars = group.querySelectorAll<HTMLDivElement>('.rev-bar');
    bars.forEach(bar => {
      bar.style.opacity = '1';
      bar.style.transform = 'translateY(0)';
    });
  });
}, 100);`,
  css: `/* Revenue Widget Styles */
.rev-wrapper {
  background: #f8fafc;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1e293b;
}

.rev-container {
  width: 100%;
  max-width: 450px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
  padding: 32px;
  border: 1px solid #f1f5f9;
}

.rev-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.rev-title-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rev-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #475569;
}

.rev-badge {
  background: #f1f5f9;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.rev-more {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1.2rem;
  cursor: pointer;
  letter-spacing: 2px;
}

.rev-main-stat {
  margin-bottom: 32px;
}

.rev-amount {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1px;
  color: #0f172a;
  margin-bottom: 8px;
}

.rev-trend {
  font-size: 0.95rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.rev-up {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
}

/* Chart */
.rev-chart-container {
  height: 200px;
  margin-bottom: 32px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 20px;
}

.rev-bars {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
}

.rev-bar-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 30px;
  height: 100%;
  gap: 4px;
}

.rev-bar {
  width: 100%;
  border-radius: 4px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.rev-bar-sub { background: #6366f1; }
.rev-bar-mxt { background: #a855f7; }

.rev-label {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 10px;
  font-weight: 500;
}

/* Breakdown */
.rev-breakdown {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.rev-b-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
}

.rev-b-dot {
  width: 12px;
  height: 12px;
  border-radius: 4px;
}

.rev-b-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rev-b-name {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

.rev-b-val {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create an executive-level Revenue Widget optimized for subscription businesses and gaming platforms. Display MRR, trends, and a stacked bar chart breakdown.`
};
