/**
 * Component: Minimalist Developer Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'minimalist-dev-dock',
  name: 'Minimalist Developer Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="dev-dock-container">
  <nav class="dev-dock">
    <div class="dd-indicator"></div>
    
    <a href="#" class="dd-item active" data-index="0">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
      <span class="dd-tooltip">Editor</span>
    </a>

    <a href="#" class="dd-item" data-index="1">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
      <span class="dd-tooltip">Performance</span>
    </a>

    <a href="#" class="dd-item" data-index="2">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      <span class="dd-tooltip">Packages</span>
    </a>

    <a href="#" class="dd-item" data-index="3">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span class="dd-tooltip">Issues</span>
    </a>

    <a href="#" class="dd-item" data-index="4">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
      <span class="dd-tooltip">Design</span>
    </a>
  </nav>
</div>`,
  js: `// Developer Dock sliding indicator
const devDock = document.querySelector('.dev-dock');
const devItems = document.querySelectorAll('.dd-item');
const indicator = document.querySelector('.dd-indicator');

function updateIndicator(index) {
  if (!indicator) return;
  // 48px is the width of an item, 8px is the gap
  const offset = index * (48 + 8);
  indicator.style.transform = \`translateX(\${offset}px)\`;
}

// Initial set
updateIndicator(0);

devItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    devItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    const index = parseInt(item.getAttribute('data-index'));
    updateIndicator(index);
  });
});`,
  ts: `// Developer Dock sliding indicator (TypeScript)
const devDock = document.querySelector<HTMLElement>('.dev-dock');
const devItems = document.querySelectorAll<HTMLAnchorElement>('.dd-item');
const indicator = document.querySelector<HTMLDivElement>('.dd-indicator');

function updateIndicator(index: number) {
  if (!indicator) return;
  // 48px is the width of an item, 8px is the gap
  const offset = index * (48 + 8);
  indicator.style.transform = \`translateX(\${offset}px)\`;
}

// Initial set
updateIndicator(0);

devItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    devItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    const index = parseInt(item.getAttribute('data-index') || '0');
    updateIndicator(index);
  });
});`,
  css: `/* Minimalist Developer Dock Styles */
.dev-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
  width: 100%;
  padding-bottom: 2rem;
  background: #f8fafc; /* Very light slate background */
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.dev-dock {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.05),
    0 8px 10px -6px rgba(0, 0, 0, 0.01);
  border: 1px solid #e2e8f0;
  position: relative;
}

.dd-indicator {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 48px;
  height: 48px;
  background: #f1f5f9;
  border-radius: 12px;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1;
}

.dd-item {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  text-decoration: none;
  z-index: 2;
  border-radius: 12px;
  transition: color 0.3s;
}

.dd-item:hover {
  color: #0f172a;
}

.dd-item.active {
  color: #3b82f6;
}

.dd-tooltip {
  position: absolute;
  top: -36px;
  background: #1e293b;
  color: #f8fafc;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transform: translateY(5px);
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  white-space: nowrap;
}

.dd-tooltip::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px 4px 0;
  border-style: solid;
  border-color: #1e293b transparent transparent transparent;
}

.dd-item:hover .dd-tooltip {
  opacity: 1;
  transform: translateY(0);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a minimalist, developer-focused dock navigation. Use clean lines, light themes, monospaced typography influences, and a highly precise sliding background indicator for active states.`
};
