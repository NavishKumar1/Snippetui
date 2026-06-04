/**
 * Component: FAB Morphing Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'fab-morphing-dock',
  name: 'FAB Morphing Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="fab-dock-container">
  <div class="fab-wrapper">
    <div class="fab-menu">
      <a href="#" class="fab-item" style="--i:1;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
      </a>
      <a href="#" class="fab-item" style="--i:2;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </a>
      <a href="#" class="fab-item" style="--i:3;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </a>
      <a href="#" class="fab-item" style="--i:4;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </a>
    </div>
    
    <button class="fab-btn">
      <svg class="fab-plus" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </button>
  </div>
</div>`,
  js: `// FAB Morphing logic
const fabBtn = document.querySelector('.fab-btn');
const fabMenu = document.querySelector('.fab-menu');

fabBtn.addEventListener('click', () => {
  fabBtn.classList.toggle('active');
  fabMenu.classList.toggle('active');
});

const fabItems = document.querySelectorAll('.fab-item');
fabItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    fabItems.forEach(n => n.classList.remove('selected'));
    item.classList.add('selected');
    
    // Auto-close after selection
    setTimeout(() => {
      fabBtn.classList.remove('active');
      fabMenu.classList.remove('active');
    }, 400);
  });
});`,
  ts: `// FAB Morphing logic (TypeScript)
const fabBtn = document.querySelector<HTMLButtonElement>('.fab-btn');
const fabMenu = document.querySelector<HTMLDivElement>('.fab-menu');

if (fabBtn && fabMenu) {
  fabBtn.addEventListener('click', () => {
    fabBtn.classList.toggle('active');
    fabMenu.classList.toggle('active');
  });
}

const fabItems = document.querySelectorAll<HTMLAnchorElement>('.fab-item');
fabItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    fabItems.forEach(n => n.classList.remove('selected'));
    item.classList.add('selected');
    
    // Auto-close after selection
    setTimeout(() => {
      if(fabBtn && fabMenu) {
        fabBtn.classList.remove('active');
        fabMenu.classList.remove('active');
      }
    }, 400);
  });
});`,
  css: `/* FAB Morphing Dock Styles */
.fab-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 2rem;
  background: #f1f5f9;
  font-family: system-ui, -apple-system, sans-serif;
}

.fab-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
}

.fab-btn {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: #6366f1; /* Indigo */
  border: none;
  border-radius: 32px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fab-btn:hover {
  box-shadow: 0 15px 35px rgba(99, 102, 241, 0.5);
  transform: translateY(-2px);
}

.fab-plus {
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.fab-btn.active {
  background: #1e293b; /* Slate 800 */
  box-shadow: 0 10px 25px rgba(30, 41, 59, 0.4);
}

.fab-btn.active .fab-plus {
  transform: rotate(135deg);
}

.fab-menu {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 32px;
  z-index: 5;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  display: flex;
  align-items: center;
  padding: 0 8px;
  opacity: 0;
  pointer-events: none;
}

/* When active, morph the background into a pill */
.fab-menu.active {
  width: 280px; /* 4 items * (48px + 8px gap) + padding */
  left: 50%;
  transform: translateX(-50%);
  opacity: 1;
  pointer-events: auto;
}

.fab-item {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #64748b;
  text-decoration: none;
  margin: 0 4px;
  opacity: 0;
  transform: scale(0.5) translateY(20px);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Staggered appearance */
.fab-menu.active .fab-item {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.fab-menu.active .fab-item:nth-child(1) { transition-delay: 0.1s; }
.fab-menu.active .fab-item:nth-child(2) { transition-delay: 0.15s; }
.fab-menu.active .fab-item:nth-child(3) { transition-delay: 0.2s; }
.fab-menu.active .fab-item:nth-child(4) { transition-delay: 0.25s; }

.fab-item:hover {
  background: #f1f5f9;
  color: #6366f1;
}

.fab-item.selected {
  background: #6366f1;
  color: white;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a Floating Action Button (FAB) that morphs into a horizontal dock when clicked. The animation should use a bouncy spring effect, expanding smoothly from a circle to a rounded pill containing icons.`
};
