/**
 * Component: Activity Widget
 * Category: dashboard-widgets
 */

export const component = {
  id: 'activity-widget',
  name: 'Activity Widget',
  category: 'dashboard-widgets',
  tag: 'Premium',
  html: `<div class="actw-wrapper">
  <div class="actw-container">
    <div class="actw-header">
      <h2>Recent Activity</h2>
      <button class="actw-filter-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        Filter
      </button>
    </div>
    
    <div class="actw-timeline">
      
      <!-- Activity Item 1 -->
      <div class="actw-item">
        <div class="actw-marker actw-marker-achievement"></div>
        <div class="actw-content">
          <div class="actw-time">2 mins ago</div>
          <div class="actw-body">
            <img src="https://i.pravatar.cc/150?img=11" alt="User" class="actw-avatar">
            <div class="actw-text">
              <strong>You</strong> unlocked the achievement <span class="actw-highlight">Master Explorer</span> in <em>Stellar Explorer</em>.
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Item 2 -->
      <div class="actw-item">
        <div class="actw-marker actw-marker-social"></div>
        <div class="actw-content">
          <div class="actw-time">45 mins ago</div>
          <div class="actw-body">
            <img src="https://i.pravatar.cc/150?img=33" alt="User" class="actw-avatar">
            <div class="actw-text">
              <strong>Sarah_J</strong> invited you to join a party in <em>Neon Drifter</em>.
            </div>
          </div>
          <div class="actw-actions">
            <button class="actw-btn actw-btn-primary">Join Party</button>
            <button class="actw-btn actw-btn-secondary">Decline</button>
          </div>
        </div>
      </div>

      <!-- Activity Item 3 -->
      <div class="actw-item">
        <div class="actw-marker actw-marker-system"></div>
        <div class="actw-content">
          <div class="actw-time">2 hours ago</div>
          <div class="actw-body">
            <div class="actw-icon-box">⚙️</div>
            <div class="actw-text">
              <strong>System Update</strong> installed successfully. Version 4.2.1 is now active.
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Item 4 -->
      <div class="actw-item">
        <div class="actw-marker actw-marker-purchase"></div>
        <div class="actw-content">
          <div class="actw-time">Yesterday</div>
          <div class="actw-body">
            <div class="actw-icon-box">🛒</div>
            <div class="actw-text">
              Successfully purchased <strong>Cybernetic Overdrive - Expansion Pass</strong>.
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    <button class="actw-view-all">View All Activity</button>
  </div>
</div>`,
  js: `// Activity Widget Logic
// Add simple hover effect to timeline items
const actwItems = document.querySelectorAll('.actw-item');
actwItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.querySelector('.actw-marker').style.transform = 'scale(1.5)';
  });
  item.addEventListener('mouseleave', () => {
    item.querySelector('.actw-marker').style.transform = 'scale(1)';
  });
});`,
  ts: `// Activity Widget Logic (TypeScript)
const actwItems = document.querySelectorAll<HTMLDivElement>('.actw-item');
actwItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const marker = item.querySelector<HTMLDivElement>('.actw-marker');
    if(marker) marker.style.transform = 'scale(1.5)';
  });
  item.addEventListener('mouseleave', () => {
    const marker = item.querySelector<HTMLDivElement>('.actw-marker');
    if(marker) marker.style.transform = 'scale(1)';
  });
});`,
  css: `/* Activity Widget Styles */
.actw-wrapper {
  background: #f8fafc;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
}

.actw-container {
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1);
  padding: 24px;
  border: 1px solid #e2e8f0;
}

.actw-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.actw-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.actw-filter-btn {
  background: #f1f5f9;
  border: none;
  color: #64748b;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.actw-filter-btn:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.actw-timeline {
  position: relative;
  padding-left: 20px; /* Space for line */
}

/* The vertical line */
.actw-timeline::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 20px;
  left: 5px;
  width: 2px;
  background: #e2e8f0;
}

.actw-item {
  position: relative;
  margin-bottom: 30px;
}

.actw-item:last-child {
  margin-bottom: 10px;
}

.actw-marker {
  position: absolute;
  top: 6px;
  left: -20px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  transition: transform 0.3s;
  box-shadow: 0 0 0 1px #e2e8f0;
  z-index: 2;
}

.actw-marker-achievement { background: #eab308; box-shadow: 0 0 0 1px #eab308; }
.actw-marker-social { background: #3b82f6; box-shadow: 0 0 0 1px #3b82f6; }
.actw-marker-system { background: #94a3b8; box-shadow: 0 0 0 1px #94a3b8; }
.actw-marker-purchase { background: #10b981; box-shadow: 0 0 0 1px #10b981; }

.actw-content {
  padding-left: 16px;
}

.actw-time {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 8px;
  font-weight: 500;
}

.actw-body {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.actw-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
}

.actw-icon-box {
  width: 32px;
  height: 32px;
  background: #f1f5f9;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.actw-text {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #475569;
}

.actw-text strong {
  color: #0f172a;
}

.actw-highlight {
  color: #eab308;
  font-weight: 600;
}

.actw-actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  padding-left: 44px; /* Align with text */
}

.actw-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.actw-btn-primary { background: #3b82f6; color: #fff; }
.actw-btn-primary:hover { background: #2563eb; }

.actw-btn-secondary { background: #f1f5f9; color: #64748b; }
.actw-btn-secondary:hover { background: #e2e8f0; color: #0f172a; }

.actw-view-all {
  width: 100%;
  background: #fff;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.actw-view-all:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a modern Activity Widget that displays real-time platform activity, friend actions, community updates, achievements, and notifications in a clean timeline format.`
};
