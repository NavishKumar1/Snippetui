/**
 * Component: Ultimate Gaming Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'ultimate-gaming-dock',
  name: 'Ultimate Gaming Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="gaming-dock-container">
  <nav class="gaming-dock">
    <div class="dock-item active" data-tooltip="Home">
      <div class="dock-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      </div>
      <span class="dock-label">Home</span>
      <div class="active-indicator"></div>
    </div>
    
    <div class="dock-item" data-tooltip="Library">
      <div class="dock-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
      </div>
      <span class="dock-label">Library</span>
      <div class="active-indicator"></div>
    </div>

    <div class="dock-item" data-tooltip="Store">
      <div class="dock-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
      </div>
      <span class="dock-label">Store</span>
      <div class="active-indicator"></div>
    </div>

    <div class="dock-item notification" data-tooltip="Community">
      <div class="dock-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <span class="badge">3</span>
      </div>
      <span class="dock-label">Community</span>
      <div class="active-indicator"></div>
    </div>

    <div class="dock-item" data-tooltip="Settings">
      <div class="dock-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </div>
      <span class="dock-label">Settings</span>
      <div class="active-indicator"></div>
    </div>
  </nav>
</div>`,
  js: `// Interactive Hover and Active states for Ultimate Gaming Dock
const dockItems = document.querySelectorAll('.dock-item');

dockItems.forEach(item => {
  // Handle click to set active state
  item.addEventListener('click', () => {
    dockItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    // Add pop animation effect
    const icon = item.querySelector('svg');
    icon.style.transform = 'scale(0.8)';
    setTimeout(() => {
      icon.style.transform = 'scale(1.1)';
      setTimeout(() => {
        icon.style.transform = 'scale(1)';
      }, 150);
    }, 50);
  });

  // Handle magnetic hover effect
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) * 0.15;
    const deltaY = (y - centerY) * 0.15;
    
    const icon = item.querySelector('.dock-icon-wrapper');
    icon.style.transform = \`translate(\${deltaX}px, \${deltaY}px) scale(1.15)\`;
  });

  // Reset transform on mouse leave
  item.addEventListener('mouseleave', () => {
    const icon = item.querySelector('.dock-icon-wrapper');
    icon.style.transform = '';
  });
});`,
  ts: `// Interactive Hover and Active states for Ultimate Gaming Dock (TypeScript)
const dockItems = document.querySelectorAll<HTMLDivElement>('.dock-item');

dockItems.forEach(item => {
  // Handle click to set active state
  item.addEventListener('click', () => {
    dockItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    // Add pop animation effect
    const icon = item.querySelector<SVGSVGElement>('svg');
    if (icon) {
      icon.style.transform = 'scale(0.8)';
      setTimeout(() => {
        icon.style.transform = 'scale(1.1)';
        setTimeout(() => {
          icon.style.transform = 'scale(1)';
        }, 150);
      }, 50);
    }
  });

  // Handle magnetic hover effect
  item.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) * 0.15;
    const deltaY = (y - centerY) * 0.15;
    
    const icon = item.querySelector<HTMLDivElement>('.dock-icon-wrapper');
    if (icon) {
      icon.style.transform = \`translate(\${deltaX}px, \${deltaY}px) scale(1.15)\`;
    }
  });

  // Reset transform on mouse leave
  item.addEventListener('mouseleave', () => {
    const icon = item.querySelector<HTMLDivElement>('.dock-icon-wrapper');
    if (icon) {
      icon.style.transform = '';
    }
  });
});`,
  css: `/* Ultimate Gaming Dock Styles */
.gaming-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
  width: 100%;
  padding-bottom: 2rem;
  font-family: 'Inter', sans-serif;
}

.gaming-dock {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(20, 20, 25, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 
    0 20px 40px -10px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 100;
}

.dock-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.dock-item::before {
  content: attr(data-tooltip);
  position: absolute;
  top: -45px;
  background: rgba(15, 15, 20, 0.9);
  backdrop-filter: blur(8px);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.dock-item:hover::before {
  opacity: 1;
  transform: translateY(0);
}

.dock-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.dock-icon-wrapper svg {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dock-item:hover .dock-icon-wrapper {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.dock-item.active .dock-icon-wrapper {
  color: #00e5ff;
  background: rgba(0, 229, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
}

.dock-item.active .dock-icon-wrapper svg {
  filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.8));
}

.badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ff3366;
  color: white;
  font-size: 10px;
  font-weight: 800;
  height: 18px;
  min-width: 18px;
  padding: 0 5px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(20, 20, 25, 0.9);
  box-shadow: 0 2px 5px rgba(255, 51, 102, 0.4);
}

.dock-label {
  display: none; /* Hidden by default, shown on expansion if needed */
  font-size: 11px;
  font-weight: 500;
  color: rgba(255,255,255,0.7);
  margin-top: 4px;
}

.active-indicator {
  position: absolute;
  bottom: 0px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #00e5ff;
  opacity: 0;
  transform: translateY(4px) scale(0);
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 0 8px #00e5ff, 0 0 12px #00e5ff;
}

.dock-item.active .active-indicator {
  opacity: 1;
  transform: translateY(-4px) scale(1);
}

/* Responsive expansion */
@media (max-width: 768px) {
  .gaming-dock {
    padding: 0.5rem;
    gap: 0.25rem;
  }
  .dock-item {
    width: 50px;
    height: 50px;
  }
  .dock-item::before {
    display: none; /* Hide tooltips on mobile */
  }
}
`,
  tailwind: `<!-- Tailwind implementation omitted for brevity, CSS is highly custom -->`,
  prompt: `Create a world-class floating dock navigation for a gaming platform. The design should feel like a fusion of Apple Vision Pro, PlayStation 5, Xbox Game Pass, and Steam. Use glassmorphism, smooth animations, premium shadows, active indicators, notification badges, and adaptive layouts. Optimize for mobile, tablet, desktop, ultrawide, and 4K screens. Maintain 60fps animations and accessibility standards.`
};
