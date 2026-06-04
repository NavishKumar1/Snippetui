/**
 * Component: MacOS Dynamic Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'macos-dynamic-dock',
  name: 'MacOS Dynamic Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="mac-dock-container">
  <div class="mac-bg"></div>
  <nav class="mac-dock">
    <ul class="mac-list">
      <li class="mac-li">
        <a href="#" class="mac-item">
          <div class="mac-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          </div>
          <span class="mac-label">Finder</span>
          <div class="mac-dot active"></div>
        </a>
      </li>
      <li class="mac-li">
        <a href="#" class="mac-item">
          <div class="mac-icon" style="background: linear-gradient(135deg, #10b981, #059669);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <span class="mac-label">Messages</span>
          <div class="mac-dot"></div>
        </a>
      </li>
      <li class="mac-li">
        <a href="#" class="mac-item">
          <div class="mac-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <span class="mac-label">Calendar</span>
          <div class="mac-dot"></div>
        </a>
      </li>
      <li class="mac-li">
        <a href="#" class="mac-item">
          <div class="mac-icon" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </div>
          <span class="mac-label">Terminal</span>
          <div class="mac-dot active"></div>
        </a>
      </li>
      <li class="mac-li separator"></li>
      <li class="mac-li">
        <a href="#" class="mac-item">
          <div class="mac-icon" style="background: linear-gradient(135deg, #64748b, #475569);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"></path></svg>
          </div>
          <span class="mac-label">System</span>
          <div class="mac-dot"></div>
        </a>
      </li>
    </ul>
  </nav>
</div>`,
  js: `// MacOS Dock Magnification Logic
const dockContainer = document.querySelector('.mac-dock');
const dockItems = document.querySelectorAll('.mac-li:not(.separator)');

dockContainer.addEventListener('mousemove', (e) => {
  dockItems.forEach((item) => {
    const itemRect = item.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2;
    const distance = Math.abs(e.clientX - itemCenter);
    
    // Max distance to affect (e.g., 150px)
    const maxDistance = 150;
    const scale = distance < maxDistance ? 1 + (1 - distance / maxDistance) * 0.5 : 1; // Max scale 1.5
    
    // Smooth applying scale and margin
    item.style.transform = \`scale(\${scale})\`;
    item.style.margin = \`0 \${(scale - 1) * 15}px\`;
  });
});

dockContainer.addEventListener('mouseleave', () => {
  dockItems.forEach((item) => {
    item.style.transform = 'scale(1)';
    item.style.margin = '0';
  });
});

// Click logic
const macAnchors = document.querySelectorAll('.mac-item');
macAnchors.forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const dot = anchor.querySelector('.mac-dot');
    
    // Bounce animation
    anchor.classList.add('bounce');
    setTimeout(() => anchor.classList.remove('bounce'), 1000);
    
    // Activate dot
    if (dot && !dot.classList.contains('active')) {
      dot.classList.add('active');
    }
  });
});`,
  ts: `// MacOS Dock Magnification Logic (TypeScript)
const dockContainer = document.querySelector<HTMLElement>('.mac-dock');
const dockItems = document.querySelectorAll<HTMLElement>('.mac-li:not(.separator)');

if (dockContainer) {
  dockContainer.addEventListener('mousemove', (e: MouseEvent) => {
    dockItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(e.clientX - itemCenter);
      
      const maxDistance = 150;
      const scale = distance < maxDistance ? 1 + (1 - distance / maxDistance) * 0.5 : 1;
      
      item.style.transform = \`scale(\${scale})\`;
      item.style.margin = \`0 \${(scale - 1) * 15}px\`;
    });
  });

  dockContainer.addEventListener('mouseleave', () => {
    dockItems.forEach((item) => {
      item.style.transform = 'scale(1)';
      item.style.margin = '0';
    });
  });
}

const macAnchors = document.querySelectorAll<HTMLAnchorElement>('.mac-item');
macAnchors.forEach(anchor => {
  anchor.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    const dot = anchor.querySelector<HTMLDivElement>('.mac-dot');
    
    anchor.classList.add('bounce');
    setTimeout(() => anchor.classList.remove('bounce'), 1000);
    
    if (dot && !dot.classList.contains('active')) {
      dot.classList.add('active');
    }
  });
});`,
  css: `/* MacOS Dynamic Dock Styles */
.mac-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 10px;
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.mac-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop') center/cover;
  z-index: 0;
}

.mac-dock {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 8px 12px;
  box-shadow: 
    0 30px 60px rgba(0,0,0,0.4),
    inset 0 1px 1px rgba(255,255,255,0.6);
}

.mac-list {
  display: flex;
  align-items: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 54px;
}

.mac-li {
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: bottom center;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), margin 0.2s;
}

.mac-li.separator {
  width: 1px;
  height: 40px;
  background: rgba(0,0,0,0.2);
  margin: 0 10px 10px 10px;
}

.mac-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  position: relative;
}

.mac-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.2);
}

.mac-label {
  position: absolute;
  top: -35px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.2s;
  border: 1px solid rgba(255,255,255,0.1);
}

.mac-label::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px 4px 0;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.5) transparent transparent transparent;
}

.mac-item:hover .mac-label {
  opacity: 1;
}

.mac-dot {
  width: 4px;
  height: 4px;
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  margin-top: 4px;
  opacity: 0;
  transition: opacity 0.3s;
}

.mac-dot.active {
  opacity: 1;
}

/* Bounce Animation */
.mac-item.bounce {
  animation: mac-bounce 1s ease-in-out;
}

@keyframes mac-bounce {
  0%, 100% { transform: translateY(0); }
  30% { transform: translateY(-20px); }
  50% { transform: translateY(0); }
  70% { transform: translateY(-10px); }
  85% { transform: translateY(0); }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Recreate the iconic macOS dock with its dynamic magnification effect. Use JavaScript to calculate proximity to the cursor to smoothly scale the icons and adjust their margins. Include a frosted glass background and bounce animations on click.`
};
