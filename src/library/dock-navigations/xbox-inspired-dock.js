/**
 * Component: Xbox Inspired Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'xbox-inspired-dock',
  name: 'Xbox-Inspired Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="xbox-dock-container">
  <nav class="xbox-dock">
    <div class="xd-focus-ring"></div>
    
    <button class="xd-item active">
      <div class="xd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
      </div>
    </button>

    <button class="xd-item">
      <div class="xd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
      </div>
    </button>

    <button class="xd-item xd-brand-btn">
      <div class="xd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <!-- Simplified Xbox Logo representation -->
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle>
          <path d="M6 6 Q12 14 18 6" stroke="currentColor" stroke-width="2.5" fill="none"></path>
          <path d="M6 18 Q12 10 18 18" stroke="currentColor" stroke-width="2.5" fill="none"></path>
        </svg>
      </div>
    </button>

    <button class="xd-item">
      <div class="xd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      </div>
    </button>

    <button class="xd-item">
      <div class="xd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      </div>
    </button>
  </nav>
</div>`,
  js: `// Xbox Dock focus and slide mechanics
const dock = document.querySelector('.xbox-dock');
const items = document.querySelectorAll('.xd-item');
const focusRing = document.querySelector('.xd-focus-ring');

function updateFocusRing(element) {
  if(!element || !focusRing) return;
  const rect = element.getBoundingClientRect();
  const dockRect = dock.getBoundingClientRect();
  
  focusRing.style.width = \`\${rect.width}px\`;
  focusRing.style.height = \`\${rect.height}px\`;
  focusRing.style.transform = \`translate(\${rect.left - dockRect.left}px, \${rect.top - dockRect.top}px)\`;
}

// Initialize position
const activeItem = document.querySelector('.xd-item.active');
setTimeout(() => updateFocusRing(activeItem), 100);

items.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    items.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    updateFocusRing(item);
    
    // Add pop effect
    item.style.transform = 'scale(0.9)';
    setTimeout(() => {
      item.style.transform = '';
    }, 150);
  });
});

window.addEventListener('resize', () => {
  const active = document.querySelector('.xd-item.active');
  updateFocusRing(active);
});`,
  ts: `// Xbox Dock focus and slide mechanics (TypeScript)
const dock = document.querySelector<HTMLElement>('.xbox-dock');
const items = document.querySelectorAll<HTMLButtonElement>('.xd-item');
const focusRing = document.querySelector<HTMLDivElement>('.xd-focus-ring');

function updateFocusRing(element: HTMLElement | null) {
  if(!element || !focusRing || !dock) return;
  const rect = element.getBoundingClientRect();
  const dockRect = dock.getBoundingClientRect();
  
  focusRing.style.width = \`\${rect.width}px\`;
  focusRing.style.height = \`\${rect.height}px\`;
  focusRing.style.transform = \`translate(\${rect.left - dockRect.left}px, \${rect.top - dockRect.top}px)\`;
}

// Initialize position
const activeItem = document.querySelector<HTMLElement>('.xd-item.active');
setTimeout(() => updateFocusRing(activeItem), 100);

items.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    items.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    updateFocusRing(item);
    
    // Add pop effect
    item.style.transform = 'scale(0.9)';
    setTimeout(() => {
      item.style.transform = '';
    }, 150);
  });
});

window.addEventListener('resize', () => {
  const active = document.querySelector<HTMLElement>('.xd-item.active');
  updateFocusRing(active);
});`,
  css: `/* Xbox Inspired Dock Styles */
.xbox-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 2rem;
  background: #101010; /* Xbox dark theme base */
}

.xbox-dock {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #1a1b1e;
  border-radius: 40px;
  box-shadow: 
    0 20px 40px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.05);
  position: relative;
  border: 1px solid rgba(255,255,255,0.05);
}

.xd-focus-ring {
  position: absolute;
  top: 0; left: 0;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #107c10; /* Xbox Green */
  box-shadow: 
    0 0 20px rgba(16, 124, 16, 0.3),
    inset 0 0 10px rgba(16, 124, 16, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
  z-index: 1;
}

.xd-item {
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a0a0;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.xd-item:hover {
  color: #fff;
  background: rgba(255,255,255,0.05);
}

.xd-item.active {
  color: #fff;
}

.xd-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.xd-item.active .xd-icon {
  transform: scale(1.1);
}

.xd-brand-btn {
  color: #107c10; /* Xbox Green */
}

.xd-brand-btn:hover {
  color: #1ed760;
}

.xd-brand-btn.active {
  color: #107c10;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build a gaming dock inspired by Xbox Game Pass navigation principles. Use clean spacing, bold iconography, smooth hover effects, active state indicators, and intuitive navigation hierarchy.`
};
