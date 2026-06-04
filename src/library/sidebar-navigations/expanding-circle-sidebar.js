/**
 * Component: Expanding Circle Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'expanding-circle-sidebar',
  name: 'Expanding Circle Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="circ-sidebar-container">
  <div class="circ-menu">
    <button class="circ-toggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
    
    <div class="circ-bg"></div>
    
    <nav class="circ-nav">
      <a href="#" class="circ-item" style="--i:0;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        <span>Home</span>
      </a>

      <a href="#" class="circ-item" style="--i:1;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"></path></svg>
        <span>Discover</span>
      </a>

      <a href="#" class="circ-item" style="--i:2;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <span>Favorites</span>
      </a>

      <a href="#" class="circ-item" style="--i:3;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        <span>Settings</span>
      </a>
    </nav>
  </div>
</div>`,
  js: `// Expanding Circle Logic
const circMenus = document.querySelectorAll('.circ-menu');

circMenus.forEach(menu => {
  const toggle = menu.querySelector('.circ-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
});`,
  ts: `// Expanding Circle Logic (TypeScript)
const circMenus = document.querySelectorAll<HTMLDivElement>('.circ-menu');

circMenus.forEach(menu => {
  const toggle = menu.querySelector<HTMLButtonElement>('.circ-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
});`,
  css: `/* Expanding Circle Sidebar Styles */
.circ-sidebar-container {
  display: flex;
  height: 600px;
  background: #f0f2f5;
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;
}

.circ-menu {
  position: absolute;
  top: 40px;
  left: 40px;
}

.circ-bg {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 1px;
  height: 1px;
  background: #3b82f6; /* Blue 500 */
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.6s cubic-bezier(0.83, 0, 0.17, 1);
  z-index: 1;
}

.circ-menu.active .circ-bg {
  /* Scale big enough to cover a sidebar area */
  transform: translate(-50%, -50%) scale(800); 
}

.circ-toggle {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  background: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1e293b;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s, color 0.3s;
}

.circ-menu.active .circ-toggle {
  transform: rotate(90deg);
  background: #1d4ed8; /* Blue 700 */
  color: #fff;
}

.circ-nav {
  position: absolute;
  top: 80px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 5;
  pointer-events: none;
}

.circ-menu.active .circ-nav {
  pointer-events: auto;
}

.circ-item {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  opacity: 0;
  transform: translateX(-40px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.circ-menu.active .circ-item {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(var(--i) * 0.1s + 0.2s);
}

.circ-item:hover {
  transform: translateX(10px);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a circular expanding sidebar. It starts as a single floating action button in the top left. When clicked, a colored circle expands radically from the button to cover the sidebar area, and menu items slide in from the left sequentially.`
};
