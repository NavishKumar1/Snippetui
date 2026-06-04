/**
 * Component: Gaming Dashboard Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'gaming-dashboard-sidebar',
  name: 'Gaming Dashboard Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="gds-container">
  <aside class="gds-sidebar">
    <div class="gds-header">
      <div class="gds-avatar-container">
        <img src="https://i.pravatar.cc/100?img=15" alt="Player" class="gds-avatar">
        <div class="gds-level-ring"></div>
        <span class="gds-level-num">99</span>
      </div>
      <div class="gds-user-info">
        <h3 class="gds-username">Kaelith Storm</h3>
        <span class="gds-rank">Grandmaster</span>
      </div>
    </div>

    <div class="gds-stats">
      <div class="gds-stat-box">
        <span class="gds-stat-value">1.2K</span>
        <span class="gds-stat-label">Hours</span>
      </div>
      <div class="gds-stat-box">
        <span class="gds-stat-value">45</span>
        <span class="gds-stat-label">Platinums</span>
      </div>
    </div>

    <div class="gds-scroll">
      <div class="gds-section">
        <h4 class="gds-section-title">QUICK ACCESS</h4>
        <nav class="gds-nav">
          <a href="#" class="gds-nav-item active">
            <svg class="gds-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            Overview
          </a>
          <a href="#" class="gds-nav-item">
            <svg class="gds-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
            Trophies
          </a>
        </nav>
      </div>

      <div class="gds-section">
        <h4 class="gds-section-title">RECENTLY PLAYED</h4>
        <div class="gds-recent-list">
          <a href="#" class="gds-game-item">
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&q=80" alt="Game" class="gds-game-img">
            <div class="gds-game-details">
              <span class="gds-game-title">Cyber Strike 2077</span>
              <span class="gds-game-time">2 hours ago</span>
            </div>
          </a>
          <a href="#" class="gds-game-item">
            <img src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=100&q=80" alt="Game" class="gds-game-img">
            <div class="gds-game-details">
              <span class="gds-game-title">Elden Quest</span>
              <span class="gds-game-time">Yesterday</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </aside>
</div>`,
  js: `// Interaction for Gaming Dashboard Sidebar
const dashItems = document.querySelectorAll('.gds-nav-item');

dashItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    dashItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Interaction for Gaming Dashboard Sidebar (TypeScript)
const dashItems = document.querySelectorAll<HTMLAnchorElement>('.gds-nav-item');

dashItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    dashItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Gaming Dashboard Sidebar Styles */
.gds-container {
  display: flex;
  height: 650px;
  background: #0f172a; /* Slate 900 */
  padding: 1rem;
  font-family: 'Outfit', sans-serif;
}

.gds-sidebar {
  width: 280px;
  height: 100%;
  background: #1e293b; /* Slate 800 */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.gds-header {
  padding: 2rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(180deg, rgba(56, 189, 248, 0.1) 0%, transparent 100%);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.gds-avatar-container {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

.gds-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1e293b;
  z-index: 2;
  position: relative;
}

.gds-level-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(#38bdf8 0%, #818cf8 50%, #38bdf8 100%);
  animation: spin 4s linear infinite;
}

@keyframes spin { 100% { transform: rotate(360deg); } }

.gds-level-num {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  background: #38bdf8;
  color: #0f172a;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 10px;
  z-index: 3;
  border: 2px solid #1e293b;
}

.gds-username {
  color: #f8fafc;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.gds-rank {
  color: #38bdf8;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.gds-stats {
  display: flex;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.gds-stat-box {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.gds-stat-box:first-child {
  border-right: 1px solid rgba(255,255,255,0.05);
}

.gds-stat-value {
  color: #f8fafc;
  font-size: 1.2rem;
  font-weight: 700;
}

.gds-stat-label {
  color: #94a3b8;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.gds-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}
.gds-scroll::-webkit-scrollbar { width: 4px; }
.gds-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }

.gds-section {
  margin-bottom: 2rem;
}

.gds-section-title {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0 0 1rem 0;
}

.gds-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gds-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.gds-nav-item:hover {
  background: rgba(255,255,255,0.05);
  color: #f8fafc;
}

.gds-nav-item.active {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
}

.gds-icon {
  opacity: 0.7;
  transition: transform 0.2s;
}

.gds-nav-item:hover .gds-icon {
  transform: scale(1.1);
}

.gds-recent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gds-game-item {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  padding: 8px;
  border-radius: 12px;
  background: rgba(255,255,255,0.02);
  transition: all 0.2s;
  border: 1px solid rgba(255,255,255,0.02);
}

.gds-game-item:hover {
  background: rgba(255,255,255,0.05);
  transform: translateX(4px);
  border-color: rgba(56, 189, 248, 0.2);
}

.gds-game-img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}

.gds-game-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gds-game-title {
  color: #f8fafc;
  font-size: 0.85rem;
  font-weight: 600;
}

.gds-game-time {
  color: #64748b;
  font-size: 0.75rem;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a dashboard sidebar optimized for a gaming ecosystem. Include quick access, favorites, recently played games, and user profile sections.`
};
