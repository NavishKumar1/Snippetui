/**
 * Component: Neumorphic Clean Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'neumorphic-clean-dock',
  name: 'Neumorphic Clean Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="neu-dock-container">
  <nav class="neu-dock">
    <a href="#" class="neu-item active" data-title="Dashboard">
      <div class="neu-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
      </div>
    </a>

    <a href="#" class="neu-item" data-title="Messages">
      <div class="neu-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </div>
      <span class="neu-badge"></span>
    </a>

    <a href="#" class="neu-item neu-primary" data-title="Create">
      <div class="neu-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </div>
    </a>

    <a href="#" class="neu-item" data-title="Calendar">
      <div class="neu-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      </div>
    </a>

    <a href="#" class="neu-item" data-title="Settings">
      <div class="neu-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </div>
    </a>
  </nav>
</div>`,
  js: `// Neumorphic Interactions
const neuItems = document.querySelectorAll('.neu-item:not(.neu-primary)');
const primaryNeu = document.querySelector('.neu-primary');

neuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    neuItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});

if (primaryNeu) {
  primaryNeu.addEventListener('click', (e) => {
    e.preventDefault();
    const icon = primaryNeu.querySelector('.neu-icon');
    icon.style.transform = 'scale(0.9)';
    setTimeout(() => {
      icon.style.transform = '';
    }, 150);
  });
}`,
  ts: `// Neumorphic Interactions (TypeScript)
const neuItems = document.querySelectorAll<HTMLAnchorElement>('.neu-item:not(.neu-primary)');
const primaryNeu = document.querySelector<HTMLAnchorElement>('.neu-primary');

neuItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    neuItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});

if (primaryNeu) {
  primaryNeu.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    const icon = primaryNeu.querySelector<HTMLDivElement>('.neu-icon');
    if(icon) {
      icon.style.transform = 'scale(0.9)';
      setTimeout(() => {
        icon.style.transform = '';
      }, 150);
    }
  });
}`,
  css: `/* Neumorphic Dock Styles */
.neu-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
  width: 100%;
  padding-bottom: 2rem;
  background: #e0e5ec; /* Classic Neumorphic Base */
  font-family: system-ui, -apple-system, sans-serif;
}

.neu-dock {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 30px;
  background: #e0e5ec;
  border-radius: 40px;
  box-shadow: 
    9px 9px 16px rgb(163,177,198,0.6), 
    -9px -9px 16px rgba(255,255,255, 0.5);
}

.neu-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #8a9bb1;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: #e0e5ec;
  box-shadow: 
    4px 4px 8px rgb(163,177,198,0.5), 
    -4px -4px 8px rgba(255,255,255, 0.5);
}

.neu-icon {
  transition: transform 0.2s;
  display: flex;
}

.neu-item:hover {
  color: #64748b;
  transform: translateY(-2px);
}

/* Active State (Pressed In) */
.neu-item.active {
  color: #3b82f6;
  box-shadow: 
    inset 4px 4px 8px rgb(163,177,198,0.5), 
    inset -4px -4px 8px rgba(255,255,255, 0.5);
}

.neu-item.active .neu-icon {
  transform: scale(0.9);
}

/* Primary Action Button (Convex) */
.neu-primary {
  width: 60px;
  height: 60px;
  color: #3b82f6;
  box-shadow: 
    6px 6px 12px rgb(163,177,198,0.6), 
    -6px -6px 12px rgba(255,255,255, 0.6);
  transform: translateY(-5px);
}

.neu-primary:hover {
  color: #2563eb;
  transform: translateY(-7px);
  box-shadow: 
    8px 8px 16px rgb(163,177,198,0.6), 
    -8px -8px 16px rgba(255,255,255, 0.6);
}

.neu-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
}

/* Neumorphic Tooltips */
.neu-item::after {
  content: attr(data-title);
  position: absolute;
  top: -45px;
  background: #e0e5ec;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 12px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
  transition: all 0.3s;
  box-shadow: 
    4px 4px 8px rgb(163,177,198,0.5), 
    -4px -4px 8px rgba(255,255,255, 0.5);
  white-space: nowrap;
}

.neu-item:hover::after {
  opacity: 1;
  transform: translateY(0);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a soft, neumorphic dock navigation. Use realistic soft shadows (inset and outset) on a light grey-blue background to create elements that look extruded from or pressed into the surface.`
};
