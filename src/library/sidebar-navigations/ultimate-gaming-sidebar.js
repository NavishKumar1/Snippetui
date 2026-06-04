/**
 * Component: Ultimate Gaming Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'ultimate-gaming-sidebar',
  name: 'Ultimate Gaming Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="premium-gaming-sidebar-container">
  <div class="sidebar-particles"></div>
  <aside class="pg-sidebar">
    <div class="pg-header">
      <div class="pg-brand">
        <div class="pg-logo-wrapper">
          <svg class="pg-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <div class="pg-logo-glow"></div>
        </div>
        <span class="pg-brand-text">NEXUS</span>
      </div>
      <button class="pg-collapse-btn" aria-label="Toggle Sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
    </div>

    <div class="pg-scroll-zone">
      <!-- MAIN SECTION -->
      <div class="pg-nav-group">
        <span class="pg-group-title">MAIN</span>
        <nav class="pg-nav">
          <a href="#" class="pg-item active">
            <div class="pg-item-bg"></div>
            <div class="pg-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            </div>
            <span class="pg-label">Home</span>
            <div class="pg-active-dot"></div>
          </a>
          
          <a href="#" class="pg-item">
            <div class="pg-item-bg"></div>
            <div class="pg-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </div>
            <span class="pg-label">Games Store</span>
          </a>
          
          <a href="#" class="pg-item">
            <div class="pg-item-bg"></div>
            <div class="pg-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>
            </div>
            <span class="pg-label">Library</span>
            <span class="pg-badge secondary">24</span>
          </a>
        </nav>
      </div>

      <!-- SOCIAL SECTION -->
      <div class="pg-nav-group">
        <span class="pg-group-title">SOCIAL</span>
        <nav class="pg-nav">
          <a href="#" class="pg-item">
            <div class="pg-item-bg"></div>
            <div class="pg-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <span class="pg-label">Community</span>
            <span class="pg-badge primary">5</span>
          </a>
          
          <a href="#" class="pg-item">
            <div class="pg-item-bg"></div>
            <div class="pg-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <span class="pg-label">Friends</span>
            <div class="pg-status online"></div>
          </a>
          
          <a href="#" class="pg-item">
            <div class="pg-item-bg"></div>
            <div class="pg-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>
            </div>
            <span class="pg-label">Tournaments</span>
          </a>
        </nav>
      </div>

      <!-- PROGRESS SECTION -->
      <div class="pg-nav-group">
        <span class="pg-group-title">SYSTEM</span>
        <nav class="pg-nav">
          <a href="#" class="pg-item">
            <div class="pg-item-bg"></div>
            <div class="pg-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
            </div>
            <span class="pg-label">Achievements</span>
          </a>
          
          <a href="#" class="pg-item">
            <div class="pg-item-bg"></div>
            <div class="pg-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
            </div>
            <span class="pg-label">Downloads</span>
            <div class="pg-mini-progress">
              <div class="pg-progress-bar" style="width: 75%"></div>
            </div>
          </a>
        </nav>
      </div>
    </div>

    <div class="pg-footer">
      <a href="#" class="pg-settings">
        <div class="pg-icon-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </div>
        <span class="pg-label">Settings</span>
      </a>
      
      <div class="pg-profile">
        <div class="pg-avatar-wrapper">
          <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" class="pg-avatar">
          <div class="pg-level-badge">42</div>
        </div>
        <div class="pg-user-details">
          <span class="pg-username">NeoPlayer</span>
          <div class="pg-xp-bar">
            <div class="pg-xp-fill" style="width: 60%"></div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</div>`,
  js: `// Advanced interactions for Premium Gaming Sidebar
const sidebar = document.querySelector('.pg-sidebar');
const collapseBtn = document.querySelector('.pg-collapse-btn');
const navItems = document.querySelectorAll('.pg-item');
const particles = document.querySelector('.sidebar-particles');

// Create ambient particles
if (particles) {
  for(let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 5 + 's';
    p.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particles.appendChild(p);
  }
}

// Sidebar toggle logic with fluid animation
if (collapseBtn && sidebar) {
  collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}

// Complex active state switching
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navItems.forEach(nav => {
      nav.classList.remove('active');
    });
    item.classList.add('active');
    
    // Ripple effect on click
    const rect = item.getBoundingClientRect();
    const ripple = document.createElement('div');
    ripple.className = 'pg-ripple';
    ripple.style.left = \`\${e.clientX - rect.left}px\`;
    ripple.style.top = \`\${e.clientY - rect.top}px\`;
    item.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});`,
  ts: `// Advanced interactions for Premium Gaming Sidebar (TypeScript)
const sidebar = document.querySelector<HTMLElement>('.pg-sidebar');
const collapseBtn = document.querySelector<HTMLButtonElement>('.pg-collapse-btn');
const navItems = document.querySelectorAll<HTMLAnchorElement>('.pg-item');
const particles = document.querySelector<HTMLDivElement>('.sidebar-particles');

// Create ambient particles
if (particles) {
  for(let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 5 + 's';
    p.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particles.appendChild(p);
  }
}

// Sidebar toggle logic with fluid animation
if (collapseBtn && sidebar) {
  collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}

// Complex active state switching
navItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    navItems.forEach(nav => {
      nav.classList.remove('active');
    });
    item.classList.add('active');
    
    // Ripple effect on click
    const rect = item.getBoundingClientRect();
    const ripple = document.createElement('div');
    ripple.className = 'pg-ripple';
    ripple.style.left = \`\${e.clientX - rect.left}px\`;
    ripple.style.top = \`\${e.clientY - rect.top}px\`;
    item.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});`,
  css: `/* Ultra-Premium Gaming Sidebar Styles */
.premium-gaming-sidebar-container {
  display: flex;
  height: 700px;
  background: #000000;
  padding: 1rem;
  font-family: 'Inter', system-ui, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Ambient particle background */
.sidebar-particles {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.3;
}
.particle {
  position: absolute;
  width: 4px; height: 4px;
  background: #00e5ff;
  border-radius: 50%;
  filter: blur(2px);
  animation: float-up linear infinite;
}
@keyframes float-up {
  0% { transform: translateY(100px) scale(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100px) scale(2); opacity: 0; }
}

.pg-sidebar {
  width: 280px;
  height: 100%;
  background: rgba(15, 15, 18, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 10;
  overflow: hidden;
}

.pg-sidebar.collapsed {
  width: 88px;
}

/* HEADER */
.pg-header {
  padding: 1.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

.pg-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  overflow: hidden;
  white-space: nowrap;
}

.pg-logo-wrapper {
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: linear-gradient(135deg, rgba(0,229,255,0.1), rgba(180,0,255,0.1));
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.05);
}

.pg-logo {
  stroke: url(#pg-grad);
  width: 20px;
  height: 20px;
}

.pg-logo-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: conic-gradient(from 180deg at 50% 50%, #00e5ff, #b400ff, #00e5ff);
  filter: blur(10px);
  opacity: 0.5;
  z-index: -1;
  animation: spin 4s linear infinite;
}

@keyframes spin { 100% { transform: rotate(360deg); } }

.pg-brand-text {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: #fff;
  transition: opacity 0.3s, transform 0.3s;
}

.pg-sidebar.collapsed .pg-brand-text {
  opacity: 0;
  transform: translateX(-10px);
  pointer-events: none;
  width: 0;
}

.pg-collapse-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.6);
  width: 32px; height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
}

.pg-collapse-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.pg-sidebar.collapsed .pg-collapse-btn svg {
  transform: rotate(180deg);
}

/* SCROLL AREA */
.pg-scroll-zone {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem 0;
}

.pg-scroll-zone::-webkit-scrollbar { width: 4px; }
.pg-scroll-zone::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

.pg-nav-group {
  margin-bottom: 2rem;
}

.pg-group-title {
  display: block;
  font-size: 0.7rem;
  font-weight: 800;
  color: rgba(255,255,255,0.3);
  letter-spacing: 2px;
  padding: 0 1.5rem;
  margin-bottom: 1rem;
  transition: opacity 0.3s;
}

.pg-sidebar.collapsed .pg-group-title {
  opacity: 0;
}

.pg-nav {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* NAV ITEMS */
.pg-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 12px;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  gap: 16px;
  transition: all 0.3s;
}

.pg-item-bg {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.05);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 12px;
}

.pg-item:hover .pg-item-bg {
  opacity: 1;
}

.pg-icon-box {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s;
}

.pg-item:hover .pg-icon-box {
  transform: scale(1.1) rotate(-5deg);
  color: #fff;
}

.pg-label {
  font-size: 0.95rem;
  font-weight: 600;
  z-index: 2;
  transition: opacity 0.3s, transform 0.3s;
  white-space: nowrap;
}

.pg-sidebar.collapsed .pg-label {
  opacity: 0;
  transform: translateX(-10px);
  width: 0;
}

/* ACTIVE STATE */
.pg-item.active {
  color: #fff;
}

.pg-item.active .pg-item-bg {
  background: linear-gradient(90deg, rgba(0,229,255,0.1), transparent);
  opacity: 1;
}

.pg-item.active .pg-icon-box {
  color: #00e5ff;
  filter: drop-shadow(0 0 8px rgba(0,229,255,0.6));
}

.pg-active-dot {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scale(0);
  width: 4px;
  height: 60%;
  background: #00e5ff;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 0 10px #00e5ff;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pg-item.active .pg-active-dot {
  transform: translateY(-50%) scale(1);
}

/* BADGES & PROGRESS */
.pg-badge {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 4px 8px;
  border-radius: 20px;
  z-index: 2;
  transition: opacity 0.3s;
}
.pg-badge.primary { background: #ff0055; color: white; box-shadow: 0 4px 10px rgba(255,0,85,0.4); }
.pg-badge.secondary { background: rgba(255,255,255,0.1); color: white; }

.pg-sidebar.collapsed .pg-badge { opacity: 0; }

.pg-status {
  width: 10px; height: 10px;
  border-radius: 50%;
  margin-left: auto;
  border: 2px solid #18181b;
  z-index: 2;
  transition: opacity 0.3s;
}
.pg-status.online { background: #00ff88; box-shadow: 0 0 10px #00ff88; }
.pg-sidebar.collapsed .pg-status { opacity: 0; }

.pg-mini-progress {
  margin-left: auto;
  width: 40px;
  height: 6px;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
  overflow: hidden;
  z-index: 2;
  transition: opacity 0.3s;
}
.pg-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #00e5ff, #b400ff);
}
.pg-sidebar.collapsed .pg-mini-progress { opacity: 0; }


/* RIPPLE EFFECT */
.pg-ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
  background: rgba(255,255,255,0.2);
  pointer-events: none;
}
@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}

/* FOOTER */
.pg-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255,255,255,0.03);
  background: rgba(0,0,0,0.2);
}

.pg-settings {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0.75rem;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s;
}
.pg-settings:hover {
  background: rgba(255,255,255,0.05);
  color: #fff;
}

.pg-profile {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 12px;
  background: rgba(255,255,255,0.03);
  cursor: pointer;
  transition: background 0.3s;
  border: 1px solid rgba(255,255,255,0.02);
}
.pg-profile:hover {
  background: rgba(255,255,255,0.08);
}

.pg-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.pg-avatar {
  width: 40px; height: 40px;
  border-radius: 12px;
  object-fit: cover;
}

.pg-level-badge {
  position: absolute;
  bottom: -6px; right: -6px;
  background: linear-gradient(135deg, #00e5ff, #b400ff);
  color: white;
  font-size: 0.6rem;
  font-weight: 900;
  padding: 2px 4px;
  border-radius: 6px;
  border: 2px solid #18181b;
}

.pg-user-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  transition: opacity 0.3s;
  white-space: nowrap;
}
.pg-sidebar.collapsed .pg-user-details {
  opacity: 0;
  width: 0;
  pointer-events: none;
}

.pg-username {
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
}

.pg-xp-bar {
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
}
.pg-xp-fill {
  height: 100%;
  background: #00e5ff;
  box-shadow: 0 0 10px #00e5ff;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a premium gaming sidebar inspired by Steam, Discord, PlayStation, and Xbox. Include Home, Games, Library, Community, Tournaments, Friends, Achievements, Downloads, and Settings. Make it extremely high quality with particle effects, advanced glassmorphism, and flawless animations.`
};
