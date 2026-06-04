/**
 * Component: Neon Cyberpunk Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'neon-cyberpunk-sidebar',
  name: 'Neon Cyberpunk Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="cyber-sidebar-container">
  <aside class="cyber-sidebar">
    <div class="cs-glitch-layer"></div>
    
    <div class="cs-header">
      <div class="cs-logo">
        <span class="cs-sys">SYS</span><span class="cs-core">CORE</span>
      </div>
      <div class="cs-status">
        <div class="cs-dot"></div> ONLINE
      </div>
    </div>

    <div class="cs-nav-wrapper">
      <div class="cs-nav-group">
        <div class="cs-group-title">/// MAIN_NET</div>
        <nav class="cs-nav">
          <a href="#" class="cs-item active">
            <span class="cs-bracket">[</span>
            <span class="cs-text">DASHBOARD</span>
            <span class="cs-bracket">]</span>
            <div class="cs-fill"></div>
          </a>
          <a href="#" class="cs-item">
            <span class="cs-bracket">[</span>
            <span class="cs-text">NETRUN_OPS</span>
            <span class="cs-bracket">]</span>
            <div class="cs-fill"></div>
          </a>
          <a href="#" class="cs-item">
            <span class="cs-bracket">[</span>
            <span class="cs-text">DATA_VAULT</span>
            <span class="cs-bracket">]</span>
            <div class="cs-fill"></div>
          </a>
        </nav>
      </div>

      <div class="cs-nav-group">
        <div class="cs-group-title">/// COMMS_LINK</div>
        <nav class="cs-nav">
          <a href="#" class="cs-item">
            <span class="cs-bracket">[</span>
            <span class="cs-text">SYNDICATE</span>
            <span class="cs-bracket">]</span>
            <span class="cs-badge">3</span>
            <div class="cs-fill"></div>
          </a>
          <a href="#" class="cs-item">
            <span class="cs-bracket">[</span>
            <span class="cs-text">BLACK_MARKET</span>
            <span class="cs-bracket">]</span>
            <div class="cs-fill"></div>
          </a>
        </nav>
      </div>
    </div>

    <div class="cs-footer">
      <div class="cs-user">
        <img src="https://i.pravatar.cc/100?img=12" alt="User" class="cs-avatar">
        <div class="cs-user-info">
          <span class="cs-name">V_MERC</span>
          <span class="cs-id">ID: 8894-X</span>
        </div>
      </div>
    </div>
  </aside>
</div>`,
  js: `// Cyberpunk interactions
const cyberItems = document.querySelectorAll('.cs-item');

cyberItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    cyberItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Cyberpunk interactions (TypeScript)
const cyberItems = document.querySelectorAll<HTMLAnchorElement>('.cs-item');

cyberItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    cyberItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Neon Cyberpunk Sidebar Styles */
.cyber-sidebar-container {
  display: flex;
  height: 600px;
  background: #000;
  padding: 1rem;
  font-family: 'Courier New', Courier, monospace;
}

.cyber-sidebar {
  width: 280px;
  height: 100%;
  background: #09090b;
  border: 2px solid #fcee0a; /* Cyberpunk Yellow */
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 
    5px 5px 0px rgba(252, 238, 10, 0.2),
    inset 0 0 20px rgba(252, 238, 10, 0.05);
}

.cyber-sidebar::before {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  width: 20px; height: 20px;
  background: #fcee0a;
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
}

.cs-header {
  padding: 20px;
  border-bottom: 2px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cs-logo {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -1px;
}
.cs-sys { color: #fcee0a; }
.cs-core { color: #00ffff; } /* Cyan */

.cs-status {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #00ff00; /* Neon Green */
  font-size: 0.8rem;
  font-weight: bold;
}
.cs-dot {
  width: 8px; height: 8px;
  background: #00ff00;
  box-shadow: 0 0 8px #00ff00;
  animation: blink 1s infinite;
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.cs-nav-wrapper {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.cs-nav-group { margin-bottom: 30px; }

.cs-group-title {
  color: #00ffff;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.cs-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cs-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  border: 1px solid transparent;
  transition: all 0.2s;
  overflow: hidden;
  z-index: 1;
}

.cs-bracket {
  color: #333;
  transition: color 0.2s, transform 0.2s;
  font-weight: normal;
}

.cs-text {
  flex: 1;
  margin: 0 10px;
  position: relative;
  z-index: 2;
  transition: transform 0.2s;
}

.cs-fill {
  position: absolute;
  top: 0; left: 0;
  height: 100%; width: 10%;
  background: #00ffff;
  opacity: 0;
  transform: skewX(-15deg) translateX(-20px);
  transition: all 0.3s;
  z-index: 0;
}

.cs-item:hover {
  border-color: #333;
}

.cs-item:hover .cs-bracket {
  color: #00ffff;
}

.cs-item:hover .cs-text {
  transform: translateX(5px);
}

.cs-item.active {
  color: #000;
  border-color: #00ffff;
}

.cs-item.active .cs-bracket {
  color: #000;
}

.cs-item.active .cs-fill {
  opacity: 1;
  width: 150%;
  background: #00ffff;
  box-shadow: 0 0 15px #00ffff;
}

.cs-badge {
  background: #ff003c; /* Cyber Red */
  color: white;
  font-size: 0.8rem;
  padding: 2px 6px;
  z-index: 2;
}

.cs-footer {
  padding: 20px;
  border-top: 2px solid #333;
  background: rgba(252, 238, 10, 0.05);
}

.cs-user {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cs-avatar {
  width: 48px; height: 48px;
  border: 2px solid #00ffff;
  filter: grayscale(100%) contrast(150%);
}

.cs-user-info {
  display: flex;
  flex-direction: column;
}

.cs-name {
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
}

.cs-id {
  color: #666;
  font-size: 0.8rem;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a high-contrast Neon Cyberpunk sidebar. Use jagged lines, glitch aesthetics, stark yellow/cyan/magenta colors, and monospace fonts reminiscent of terminal interfaces.`
};
