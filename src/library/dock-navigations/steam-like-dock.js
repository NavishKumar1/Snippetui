/**
 * Component: Steam-Like Dock Navigation
 * Category: dock-navigations
 */

export const component = {
  id: 'steam-like-dock',
  name: 'Steam-Like Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="steam-dock-container">
  <nav class="steam-dock">
    <a href="#" class="sd-item active" data-tooltip="Store">
      <div class="sd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
      </div>
      <div class="sd-active-bar"></div>
    </a>

    <a href="#" class="sd-item" data-tooltip="Library">
      <div class="sd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>
      </div>
      <div class="sd-active-bar"></div>
    </a>

    <a href="#" class="sd-item" data-tooltip="Community">
      <div class="sd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      </div>
      <span class="sd-badge">New</span>
      <div class="sd-active-bar"></div>
    </a>

    <div class="sd-divider"></div>

    <a href="#" class="sd-item sd-profile" data-tooltip="Profile">
      <div class="sd-avatar-box">
        <img src="https://i.pravatar.cc/100?img=11" alt="User">
        <div class="sd-frame"></div>
      </div>
      <div class="sd-active-bar"></div>
    </a>

    <a href="#" class="sd-item" data-tooltip="Downloads">
      <div class="sd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
      </div>
      <div class="sd-download-progress"></div>
      <div class="sd-active-bar"></div>
    </a>
  </nav>
</div>`,
  js: `// Steam-Like Dock interactions
const steamItems = document.querySelectorAll('.sd-item');

steamItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    steamItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Steam-Like Dock interactions (TypeScript)
const steamItems = document.querySelectorAll<HTMLAnchorElement>('.sd-item');

steamItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    steamItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Steam-Like Dock Styles */
.steam-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
  width: 100%;
  padding-bottom: 2rem;
  background: #171a21; /* Steam Dark Blue */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.steam-dock {
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #1e2837 0%, #171a21 100%);
  border-top: 1px solid #2a3f5a;
  border-bottom: 1px solid #000;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  padding: 0 16px;
  border-radius: 4px;
}

.sd-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  color: #67707b;
  text-decoration: none;
  transition: all 0.2s;
}

.sd-item:hover {
  color: #c6d4df; /* Steam light text */
  background: linear-gradient(to bottom, rgba(103,193,245,0.1) 0%, transparent 100%);
}

.sd-item.active {
  color: #66c0f4; /* Steam Blue */
  background: linear-gradient(to bottom, rgba(102,192,244,0.15) 0%, transparent 100%);
}

.sd-icon {
  position: relative;
  transition: transform 0.2s;
}
.sd-item:hover .sd-icon { transform: translateY(-2px); }

/* Tooltip */
.sd-item::before {
  content: attr(data-tooltip);
  position: absolute;
  top: -35px;
  background: #c2c2c2;
  color: #3d4450;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 2px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(5px);
  transition: all 0.2s;
  white-space: nowrap;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

.sd-item:hover::before {
  opacity: 1;
  transform: translateY(0);
}

/* Active Bar */
.sd-active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1a9fff, #53c5ff);
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.2s;
  box-shadow: 0 -2px 10px rgba(26,159,255,0.5);
}

.sd-item.active .sd-active-bar {
  opacity: 1;
  transform: scaleX(1);
}

/* Divider */
.sd-divider {
  width: 1px;
  height: 30px;
  background: #2a3f5a;
  margin: 0 8px;
}

/* Badge */
.sd-badge {
  position: absolute;
  top: 10px;
  right: 6px;
  background: #1a9fff;
  color: white;
  font-size: 8px;
  font-weight: bold;
  padding: 2px 4px;
  border-radius: 2px;
}

/* Avatar Frame */
.sd-avatar-box {
  position: relative;
  width: 32px;
  height: 32px;
}
.sd-avatar-box img {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.sd-frame {
  position: absolute;
  inset: -2px;
  border: 2px solid #53a4c4; /* Steam online frame */
  border-radius: 4px;
}
.sd-item.active .sd-frame {
  border-color: #66c0f4;
  box-shadow: 0 0 8px rgba(102,192,244,0.5);
}

/* Download Progress */
.sd-download-progress {
  position: absolute;
  bottom: 6px;
  left: 10px;
  right: 10px;
  height: 2px;
  background: rgba(255,255,255,0.1);
  overflow: hidden;
}
.sd-download-progress::after {
  content: '';
  display: block;
  width: 70%;
  height: 100%;
  background: #1a9fff;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a modern dock inspired by Steam's gaming ecosystem. Focus on discoverability, fast access, visual hierarchy, and usability. Include animated active indicators, hover states, notification badges, and responsive scaling.`
};
