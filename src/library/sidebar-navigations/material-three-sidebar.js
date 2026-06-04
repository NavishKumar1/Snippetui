/**
 * Component: Material 3 Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'material-three-sidebar',
  name: 'Material 3 Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="m3-sidebar-container">
  <aside class="m3-sidebar">
    <div class="m3-header">
      <button class="m3-icon-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
      <span class="m3-title">Mail</span>
    </div>

    <div class="m3-fab-container">
      <button class="m3-fab">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l-5.94 5.94"></path><line x1="21.5" y1="2" x2="12" y2="11.5"></line></svg>
        <span>Compose</span>
      </button>
    </div>

    <nav class="m3-nav">
      <a href="#" class="m3-item active">
        <div class="m3-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
        </div>
        <span class="m3-label">Inbox</span>
        <span class="m3-badge">24</span>
      </a>

      <a href="#" class="m3-item">
        <div class="m3-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </div>
        <span class="m3-label">Starred</span>
      </a>

      <a href="#" class="m3-item">
        <div class="m3-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <span class="m3-label">Snoozed</span>
      </a>

      <a href="#" class="m3-item">
        <div class="m3-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </div>
        <span class="m3-label">Sent</span>
      </a>

      <div class="m3-divider"></div>

      <a href="#" class="m3-item">
        <div class="m3-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </div>
        <span class="m3-label">Trash</span>
      </a>
    </nav>
  </aside>
</div>`,
  js: `// Material 3 Ripple and Toggle
const m3Items = document.querySelectorAll('.m3-item');
const m3Btn = document.querySelector('.m3-icon-btn');
const m3Sidebar = document.querySelector('.m3-sidebar');

m3Btn.addEventListener('click', () => {
  m3Sidebar.classList.toggle('collapsed');
});

m3Items.forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    m3Items.forEach(n => n.classList.remove('active'));
    this.classList.add('active');
    
    // Ripple Effect
    const ripple = document.createElement('span');
    ripple.classList.add('m3-ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = \`\${size}px\`;
    ripple.style.left = \`\${x}px\`;
    ripple.style.top = \`\${y}px\`;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});`,
  ts: `// Material 3 Ripple and Toggle (TypeScript)
const m3Items = document.querySelectorAll<HTMLAnchorElement>('.m3-item');
const m3Btn = document.querySelector<HTMLButtonElement>('.m3-icon-btn');
const m3Sidebar = document.querySelector<HTMLElement>('.m3-sidebar');

if(m3Btn && m3Sidebar) {
  m3Btn.addEventListener('click', () => {
    m3Sidebar.classList.toggle('collapsed');
  });
}

m3Items.forEach(item => {
  item.addEventListener('click', function(this: HTMLAnchorElement, e: MouseEvent) {
    e.preventDefault();
    m3Items.forEach(n => n.classList.remove('active'));
    this.classList.add('active');
    
    // Ripple Effect
    const ripple = document.createElement('span');
    ripple.classList.add('m3-ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = \`\${size}px\`;
    ripple.style.left = \`\${x}px\`;
    ripple.style.top = \`\${y}px\`;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});`,
  css: `/* Material 3 Sidebar Styles */
.m3-sidebar-container {
  display: flex;
  height: 600px;
  background: #fdfcff; /* Material 3 Surface */
  font-family: Roboto, system-ui, sans-serif;
}

.m3-sidebar {
  width: 256px;
  height: 100%;
  background: #eff1f8; /* Surface Container Low */
  border-radius: 0 16px 16px 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1);
  overflow: hidden;
}

.m3-sidebar.collapsed {
  width: 80px;
}

.m3-header {
  padding: 16px;
  display: flex;
  align-items: center;
  height: 64px;
}

.m3-icon-btn {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: none;
  background: transparent;
  color: #44474e;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s;
}

.m3-icon-btn:hover {
  background: rgba(28, 27, 31, 0.08);
}

.m3-title {
  margin-left: 12px;
  font-size: 22px;
  color: #1a1b20;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.m3-sidebar.collapsed .m3-title {
  opacity: 0;
}

.m3-fab-container {
  padding: 16px;
}

.m3-fab {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #c2e7ff; /* Primary Container */
  color: #001d35; /* On Primary Container */
  border: none;
  height: 56px;
  padding: 0 16px;
  border-radius: 16px; /* FAB border radius in M3 */
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 4px 8px 3px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  overflow: hidden;
}

.m3-sidebar.collapsed .m3-fab {
  width: 56px;
  padding: 0;
  justify-content: center;
}

.m3-sidebar.collapsed .m3-fab span {
  display: none;
}

.m3-fab:hover {
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3), 0 6px 10px 4px rgba(0, 0, 0, 0.15);
  background: #b1dcfb;
}

.m3-nav {
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.m3-item {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  border-radius: 28px; /* M3 fully rounded active states */
  text-decoration: none;
  color: #44474e;
  position: relative;
  overflow: hidden;
  transition: background 0.2s;
}

.m3-sidebar.collapsed .m3-item {
  padding: 0;
  justify-content: center;
}

.m3-item:hover {
  background: rgba(28, 27, 31, 0.08);
}

.m3-item.active {
  background: #c2e7ff;
  color: #001d35;
}

.m3-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  z-index: 2;
}

.m3-label {
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  white-space: nowrap;
  z-index: 2;
  transition: opacity 0.2s;
}

.m3-sidebar.collapsed .m3-label {
  display: none;
}

.m3-badge {
  font-size: 12px;
  font-weight: 500;
  z-index: 2;
}

.m3-sidebar.collapsed .m3-badge {
  display: none;
}

.m3-divider {
  height: 1px;
  background: #c7c6ca;
  margin: 8px 16px;
}

/* Ripple */
.m3-ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 29, 53, 0.15);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Implement a Material Design 3 (You) sidebar. Include the pill-shaped active states, dynamic color-inspired pastel backgrounds, a large Floating Action Button (FAB) at the top, and smooth ripple click effects.`
};
