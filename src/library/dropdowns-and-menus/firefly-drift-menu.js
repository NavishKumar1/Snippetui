/**
 * Component: Firefly Drift Menu
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'firefly-drift-menu',
  name: 'Firefly Drift Menu',
  category: 'dropdowns-and-menus',
  tag: 'Creative',
  html: `<div class="ff-menu-wrapper">
  <!-- Trigger Box -->
  <button class="ff-menu-trigger">
    <span>TWILIGHT DECK</span>
    <span class="ff-glow-indicator"></span>
  </button>
  
  <!-- Dropping Glass Panel with Spores -->
  <div class="ff-menu-panel">
    <div class="ff-spores">
      <span class="spore sp-1"></span>
      <span class="spore sp-2"></span>
      <span class="spore sp-3"></span>
      <span class="spore sp-4"></span>
      <span class="spore sp-5"></span>
    </div>
    <div class="ff-item" style="--i: 0;">
      <span class="ff-item-text">Boreal Forest</span>
    </div>
    <div class="ff-item" style="--i: 1;">
      <span class="ff-item-text">Deep Canopy</span>
    </div>
    <div class="ff-item" style="--i: 2;">
      <span class="ff-item-text">Mossy Glade</span>
    </div>
  </div>
</div>`,
  js: `// Spring-driven firefly drifting around menu on toggle open
const ffMenu = document.querySelector('.ff-menu-wrapper');
if (ffMenu) {
  const trigger = ffMenu.querySelector('.ff-menu-trigger');
  const panel = ffMenu.querySelector('.ff-menu-panel');
  const spores = ffMenu.querySelectorAll('.spore');
  const items = ffMenu.querySelectorAll('.ff-item');
  
  let isOpen = false;
  
  trigger.addEventListener('click', () => {
    ffMenu.classList.toggle('active');
    isOpen = ffMenu.classList.contains('active');
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('.ff-item-text').textContent;
      trigger.querySelector('span').textContent = text.toUpperCase();
      ffMenu.classList.remove('active');
      isOpen = false;
    });
  });

  document.addEventListener('click', (e) => {
    if (!ffMenu.contains(e.target)) {
      ffMenu.classList.remove('active');
      isOpen = false;
    }
  });

  // Twinkle/Drift math coordinates
  const particles = [];
  spores.forEach(spore => {
    particles.push({
      el: spore,
      x: 20 + Math.random() * 60,
      y: 10 + Math.random() * 80,
      vx: 0,
      vy: 0,
      angle: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02
    });
  });

  let animId;
  const loop = () => {
    if (!ffMenu.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    if (isOpen) {
      particles.forEach(p => {
        p.angle += p.speed;
        p.vx += Math.sin(p.angle) * 0.08;
        p.vy += Math.cos(p.angle) * 0.06;
        
        // Friction
        p.vx *= 0.92;
        p.vy *= 0.92;
        
        p.x += p.vx;
        p.y += p.vy;
        
        // Border boundaries
        if (p.x < 5) { p.x = 5; p.vx *= -1; }
        if (p.x > 95) { p.x = 95; p.vx *= -1; }
        if (p.y < 5) { p.y = 5; p.vy *= -1; }
        if (p.y > 95) { p.y = 95; p.vy *= -1; }
        
        p.el.style.left = \`\${p.x}%\`;
        p.el.style.top = \`\${p.y}%\`;
      });
    }
    
    animId = requestAnimationFrame(loop);
  };
  
  loop();
}`,
  ts: `// TypeScript Implementation
const ffMenu = document.querySelector<HTMLDivElement>('.ff-menu-wrapper');
if (ffMenu) {
  const trigger = ffMenu.querySelector<HTMLButtonElement>('.ff-menu-trigger');
  const panel = ffMenu.querySelector<HTMLDivElement>('.ff-menu-panel');
  const spores = ffMenu.querySelectorAll<HTMLSpanElement>('.spore');
  const items = ffMenu.querySelectorAll<HTMLDivElement>('.ff-item');
  
  let isOpen = false;
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      ffMenu.classList.toggle('active');
      isOpen = ffMenu.classList.contains('active');
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const textSpan = item.querySelector<HTMLSpanElement>('.ff-item-text');
      const text = textSpan ? textSpan.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && text) {
        label.textContent = text.toUpperCase();
      }
      ffMenu.classList.remove('active');
      isOpen = false;
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (ffMenu && !ffMenu.contains(e.target as Node)) {
      ffMenu.classList.remove('active');
      isOpen = false;
    }
  });

  interface FireflyPoint {
    el: HTMLSpanElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    speed: number;
  }

  const particles: FireflyPoint[] = [];
  spores.forEach(spore => {
    particles.push({
      el: spore,
      x: 20 + Math.random() * 60,
      y: 10 + Math.random() * 80,
      vx: 0,
      vy: 0,
      angle: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02
    });
  });

  let animId: number;
  const loop = () => {
    if (!ffMenu.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    if (isOpen) {
      particles.forEach(p => {
        p.angle += p.speed;
        p.vx += Math.sin(p.angle) * 0.08;
        p.vy += Math.cos(p.angle) * 0.06;
        
        p.vx *= 0.92;
        p.vy *= 0.92;
        
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 5) { p.x = 5; p.vx *= -1; }
        if (p.x > 95) { p.x = 95; p.vx *= -1; }
        if (p.y < 5) { p.y = 5; p.vy *= -1; }
        if (p.y > 95) { p.y = 95; p.vy *= -1; }
        
        p.el.style.left = \`\${p.x}%\`;
        p.el.style.top = \`\${p.y}%\`;
      });
    }
    
    animId = requestAnimationFrame(loop);
  };
  
  loop();
}`,
  css: `/* Firefly Drift Menu Styles */
.ff-menu-wrapper {
  position: relative;
  width: 260px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.ff-menu-trigger {
  width: 100%;
  padding: 14px 20px;
  background: rgba(8, 12, 10, 0.7);
  border: 1.5px solid rgba(163, 230, 53, 0.15);
  border-radius: 12px;
  color: #ffffff;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
}

.ff-menu-trigger:hover {
  border-color: rgba(163, 230, 53, 0.45);
  box-shadow: 0 0 15px rgba(163, 230, 53, 0.15);
}

.ff-glow-indicator {
  width: 6px;
  height: 6px;
  background: #a3e635;
  border-radius: 50%;
  box-shadow: 0 0 8px #a3e635;
  transition: transform 0.3s;
}

.ff-menu-wrapper.active .ff-glow-indicator {
  transform: scale(1.3);
  animation: ff-pulse 1s infinite alternate;
}

/* Glass dropdown panel containing spores */
.ff-menu-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(8, 12, 10, 0.6);
  border: 1.5px solid rgba(163, 230, 53, 0.1);
  border-radius: 14px;
  padding: 8px;
  box-sizing: border-box;
  overflow: visible;
  z-index: 100;
  backdrop-filter: blur(20px);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
}

.ff-menu-wrapper.active .ff-menu-panel {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
  border-color: rgba(163, 230, 53, 0.25);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(163, 230, 53, 0.08);
}

/* Firefly spores */
.ff-spores {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: 14px;
  z-index: 1;
}

.spore {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #a3e635;
  border-radius: 50%;
  box-shadow: 0 0 8px #a3e635, 0 0 16px #10b981;
  opacity: 0;
  transition: opacity 0.4s;
}

.ff-menu-wrapper.active .spore {
  opacity: 0.75;
}

.sp-1 { animation: ff-blink 1.4s infinite alternate; }
.sp-2 { animation: ff-blink 1.8s infinite alternate 0.2s; }
.sp-3 { animation: ff-blink 1.3s infinite alternate 0.4s; }
.sp-4 { animation: ff-blink 2.1s infinite alternate 0.1s; }
.sp-5 { animation: ff-blink 1.6s infinite alternate 0.3s; }

/* Menu options items */
.ff-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 13px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s, color 0.2s;
  transition-delay: calc(var(--i) * 0.06s);
}

.ff-menu-wrapper.active .ff-item {
  opacity: 1;
  transform: translateX(0);
}

.ff-item:hover {
  background: rgba(163, 230, 53, 0.05);
  color: #ffffff;
  text-shadow: 0 0 3px rgba(163, 230, 53, 0.3);
}

@keyframes ff-pulse {
  0% { box-shadow: 0 0 4px #a3e635; }
  100% { box-shadow: 0 0 16px #a3e635, 0 0 24px #10b981; }
}

@keyframes ff-blink {
  0% { opacity: 0.25; transform: scale(0.85); }
  100% { opacity: 1; transform: scale(1.15); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] font-sans select-none">
  <button class="w-full px-5 py-3.5 bg-neutral-900/70 border border-lime-500/15 rounded-xl text-white font-semibold text-xs tracking-wider flex justify-between items-center shadow-lg hover:border-lime-500/40 hover:shadow-[0_0_15px_rgba(163,230,53,0.15)] transition-all">
    <span>TWILIGHT DECK</span>
    <span class="w-1.5 h-1.5 bg-lime-400 rounded-full shadow-[0_0_8px_#a3e635]"></span>
  </button>
</div>`,
  prompt: `Design a premium "Firefly Drift Menu" component. Opening the translucent twilight select button releases a beautiful floating swarm of glowing firefly spores that hover and cluster organically around option items.`
};
