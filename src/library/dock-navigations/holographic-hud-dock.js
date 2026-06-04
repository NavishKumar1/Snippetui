/**
 * Component: Holographic HUD Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'holographic-hud-dock',
  name: 'Holographic HUD Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="hud-dock-container">
  <div class="hud-scanline"></div>
  <div class="hud-grid"></div>
  
  <nav class="hud-dock">
    <div class="hud-bracket left"></div>
    <div class="hud-bracket right"></div>

    <a href="#" class="hud-item active">
      <svg class="hud-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      <span class="hud-label">CORE</span>
    </a>

    <a href="#" class="hud-item">
      <svg class="hud-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
      <span class="hud-label">DATA</span>
    </a>

    <a href="#" class="hud-item">
      <svg class="hud-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
      <span class="hud-label">TARGET</span>
    </a>

    <a href="#" class="hud-item">
      <svg class="hud-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M2 15h10"></path><path d="m9 18 3-3-3-3"></path></svg>
      <span class="hud-label">LOGS</span>
    </a>

    <a href="#" class="hud-item">
      <svg class="hud-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
      <span class="hud-label">MOD</span>
    </a>
  </nav>
</div>`,
  js: `// Holographic HUD interactions
const hudItems = document.querySelectorAll('.hud-item');

hudItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    hudItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    // Add glitch effect on click
    item.style.animation = 'glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite';
    setTimeout(() => {
      item.style.animation = '';
    }, 150);
  });
});`,
  ts: `// Holographic HUD interactions (TypeScript)
const hudItems = document.querySelectorAll<HTMLAnchorElement>('.hud-item');

hudItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    hudItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    // Add glitch effect on click
    item.style.animation = 'glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite';
    setTimeout(() => {
      item.style.animation = '';
    }, 150);
  });
});`,
  css: `/* Holographic HUD Dock Styles */
.hud-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 3rem;
  background: #050a0f;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  overflow: hidden;
}

.hud-grid {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  transform: perspective(500px) rotateX(60deg) translateY(100px) translateZ(-200px);
  transform-origin: bottom;
  opacity: 0.5;
  pointer-events: none;
}

.hud-scanline {
  position: absolute;
  width: 100%;
  height: 10px;
  background: rgba(0, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  animation: scan 4s linear infinite;
  pointer-events: none;
  z-index: 10;
}

@keyframes scan {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.hud-dock {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2.5rem;
  background: rgba(0, 20, 30, 0.7);
  border: 1px solid rgba(0, 255, 255, 0.3);
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.1),
    inset 0 0 30px rgba(0, 255, 255, 0.1);
  position: relative;
  z-index: 2;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

/* Sci-fi Brackets */
.hud-bracket {
  position: absolute;
  top: -5px;
  bottom: -5px;
  width: 15px;
  border: 2px solid #0ff;
  opacity: 0.7;
}

.hud-bracket.left {
  left: -5px;
  border-right: none;
}
.hud-bracket.left::before {
  content: ''; position: absolute; top: -2px; left: -2px; width: 6px; height: 6px; background: #0ff;
}
.hud-bracket.left::after {
  content: ''; position: absolute; bottom: -2px; left: -2px; width: 6px; height: 6px; background: #0ff;
}

.hud-bracket.right {
  right: -5px;
  border-left: none;
}
.hud-bracket.right::before {
  content: ''; position: absolute; top: -2px; right: -2px; width: 6px; height: 6px; background: #0ff;
}
.hud-bracket.right::after {
  content: ''; position: absolute; bottom: -2px; right: -2px; width: 6px; height: 6px; background: #0ff;
}

.hud-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(0, 255, 255, 0.5);
  text-decoration: none;
  width: 60px;
  transition: all 0.3s;
  position: relative;
}

.hud-item::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 255, 255, 0.1);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.3s;
  z-index: -1;
}

.hud-item:hover, .hud-item.active {
  color: #0ff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
}

.hud-item:hover::before, .hud-item.active::before {
  transform: scaleY(1);
}

.hud-icon {
  transition: transform 0.3s;
}

.hud-item:hover .hud-icon,
.hud-item.active .hud-icon {
  transform: translateY(-4px);
}

.hud-label {
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.hud-item:hover .hud-label,
.hud-item.active .hud-label {
  opacity: 1;
}

@keyframes glitch-skew {
  0% { transform: skew(0deg); }
  20% { transform: skew(-10deg); }
  40% { transform: skew(10deg); }
  60% { transform: skew(-5deg); }
  80% { transform: skew(5deg); }
  100% { transform: skew(0deg); }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a holographic HUD-style dock navigation inspired by sci-fi interfaces and mecha displays. Use glowing cyan/blue aesthetics, scanlines, grids, and technical fonts.`
};
