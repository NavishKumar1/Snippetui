/**
 * Component: Cyber Wave Drawer
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'cyber-wave-drawer',
  name: 'Cyber Wave Drawer',
  category: 'dropdowns-and-menus',
  tag: 'Premium',
  html: `<div class="cyber-drawer-wrapper">
  <!-- Grid Trigger -->
  <button class="cyber-drawer-trigger">
    <span>INITIALIZE CYBERGRID</span>
    <span class="cyber-drawer-icon">❖</span>
  </button>
  
  <!-- Wave grid drawer panel -->
  <div class="cyber-drawer-menu">
    <div class="cyber-drawer-canvas-container">
      <canvas class="cyber-grid-canvas"></canvas>
    </div>
    <div class="cyber-drawer-contents">
      <div class="cyber-drawer-item" style="--i: 0;">
        <span class="cyber-node-indicator"></span>
        <span>Grid Array A</span>
      </div>
      <div class="cyber-drawer-item" style="--i: 1;">
        <span class="cyber-node-indicator"></span>
        <span>Wave Scanner B</span>
      </div>
      <div class="cyber-drawer-item" style="--i: 2;">
        <span class="cyber-node-indicator"></span>
        <span>Synth Vector C</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Cyber synth grid perspective rendering inside Canvas on toggled open
const cdWrapper = document.querySelector('.cyber-drawer-wrapper');
if (cdWrapper) {
  const trigger = cdWrapper.querySelector('.cyber-drawer-trigger');
  const menu = cdWrapper.querySelector('.cyber-drawer-menu');
  const canvas = cdWrapper.querySelector('.cyber-grid-canvas');
  const ctx = canvas.getContext('2d');
  const items = cdWrapper.querySelectorAll('.cyber-drawer-item');
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    canvas.width = menu.clientWidth || 270;
    canvas.height = 150;
  };
  resizeCanvas();
  
  trigger.addEventListener('click', () => {
    cdWrapper.classList.toggle('active');
    isOpen = cdWrapper.classList.contains('active');
    if (isOpen) {
      resizeCanvas();
    }
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('span:nth-child(2)').textContent;
      trigger.querySelector('span').textContent = text.toUpperCase();
      cdWrapper.classList.remove('active');
      isOpen = false;
    });
  });

  document.addEventListener('click', (e) => {
    if (!cdWrapper.contains(e.target)) {
      cdWrapper.classList.remove('active');
      isOpen = false;
    }
  });

  // Cyber 3D perspective grid math model
  let offset = 0;
  let animId;
  const draw = () => {
    if (!cdWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      const w = canvas.width;
      const h = canvas.height;
      offset += 0.5; // grid scroll speed
      
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.12)';
      ctx.lineWidth = 1;
      
      // Draw horizontal scrolling grid lines in 3D perspective
      const numHoriz = 6;
      for (let i = 0; i < numHoriz; i++) {
        // Perspective curve formula
        const normY = i / (numHoriz - 1);
        const y = h * Math.pow(normY, 1.8);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      
      // Draw vertical vanishing lines
      const numVert = 9;
      const vanishingX = w / 2;
      const vanishingY = -20;
      
      for (let i = 0; i < numVert; i++) {
        const borderX = (i / (numVert - 1)) * w;
        ctx.beginPath();
        ctx.moveTo(vanishingX, vanishingY);
        ctx.lineTo(borderX, h);
        ctx.stroke();
      }
      
      // Draw neon wave pulse lines sweeping through
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < w; x += 5) {
        const angle = (x * 0.02) + (offset * 0.05);
        const waveY = h - 25 + Math.sin(angle) * 15;
        if (x === 0) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.stroke();
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const cdWrapper = document.querySelector<HTMLDivElement>('.cyber-drawer-wrapper');
if (cdWrapper) {
  const trigger = cdWrapper.querySelector<HTMLButtonElement>('.cyber-drawer-trigger');
  const menu = cdWrapper.querySelector<HTMLDivElement>('.cyber-drawer-menu');
  const canvas = cdWrapper.querySelector<HTMLCanvasElement>('.cyber-grid-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const items = cdWrapper.querySelectorAll<HTMLDivElement>('.cyber-drawer-item');
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    if (canvas && menu) {
      canvas.width = menu.clientWidth || 270;
      canvas.height = 150;
    }
  };
  resizeCanvas();
  
  if (trigger && menu) {
    trigger.addEventListener('click', () => {
      cdWrapper.classList.toggle('active');
      isOpen = cdWrapper.classList.contains('active');
      if (isOpen) {
        resizeCanvas();
      }
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const labelEl = item.querySelector<HTMLSpanElement>('span:nth-child(2)');
      const text = labelEl ? labelEl.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && text) {
        label.textContent = text.toUpperCase();
      }
      cdWrapper.classList.remove('active');
      isOpen = false;
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (cdWrapper && !cdWrapper.contains(e.target as Node)) {
      cdWrapper.classList.remove('active');
      isOpen = false;
    }
  });

  let offset = 0;
  let animId: number;
  const draw = () => {
    if (!cdWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      const w = canvas.width;
      const h = canvas.height;
      offset += 0.5;
      
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.12)';
      ctx.lineWidth = 1;
      
      const numHoriz = 6;
      for (let i = 0; i < numHoriz; i++) {
        const normY = i / (numHoriz - 1);
        const y = h * Math.pow(normY, 1.8);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      
      const numVert = 9;
      const vanishingX = w / 2;
      const vanishingY = -20;
      
      for (let i = 0; i < numVert; i++) {
        const borderX = (i / (numVert - 1)) * w;
        ctx.beginPath();
        ctx.moveTo(vanishingX, vanishingY);
        ctx.lineTo(borderX, h);
        ctx.stroke();
      }
      
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < w; x += 5) {
        const angle = (x * 0.02) + (offset * 0.05);
        const waveY = h - 25 + Math.sin(angle) * 15;
        if (x === 0) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.stroke();
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Cyber Wave Drawer Styles */
.cyber-drawer-wrapper {
  position: relative;
  width: 270px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.cyber-drawer-trigger {
  width: 100%;
  padding: 14px 20px;
  background: rgba(4, 8, 12, 0.75);
  border: 1.5px solid rgba(0, 242, 254, 0.2);
  border-radius: 4px;
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s;
}

.cyber-drawer-trigger:hover {
  border-color: rgba(0, 242, 254, 0.55);
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.2);
}

.cyber-drawer-icon {
  font-size: 12px;
  color: #00f2fe;
  text-shadow: 0 0 6px #00f2fe;
  transition: transform 0.4s;
}

.cyber-drawer-wrapper.active .cyber-drawer-icon {
  transform: rotate(180deg);
}

/* Cyber grid backdrop menu panel */
.cyber-drawer-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(4, 6, 10, 0.7);
  border: 1.5px solid rgba(0, 242, 254, 0.15);
  border-radius: 4px;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.cyber-drawer-wrapper.active .cyber-drawer-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  border-color: rgba(0, 242, 254, 0.35);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
}

.cyber-drawer-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.cyber-grid-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.cyber-drawer-contents {
  position: relative;
  z-index: 2;
  padding: 6px;
  display: flex;
  flex-direction: column;
}

.cyber-drawer-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  cursor: pointer;
  border-radius: 3px;
  opacity: 0;
  transform: translateY(8px);
  color: rgba(255, 255, 255, 0.65);
  transition: opacity 0.35s, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s, color 0.2s;
  transition-delay: calc(var(--i) * 0.05s);
}

.cyber-drawer-wrapper.active .cyber-drawer-item {
  opacity: 1;
  transform: translateY(0);
}

.cyber-node-indicator {
  width: 5px;
  height: 5px;
  background: rgba(0, 242, 254, 0.3);
  border-radius: 50%;
  transition: all 0.3s;
}

.cyber-drawer-item:hover {
  background: rgba(0, 242, 254, 0.06);
  color: #00f2fe;
}

.cyber-drawer-item:hover .cyber-node-indicator {
  background: #00f2fe;
  box-shadow: 0 0 8px #00f2fe;
  transform: scale(1.3);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[270px] font-sans select-none">
  <button class="w-full px-5 py-3.5 bg-slate-950/75 border border-cyan-500/20 rounded text-white font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all">
    <span>INITIALIZE CYBERGRID</span>
    <span class="text-cyan-400 font-bold">❖</span>
  </button>
</div>`,
  prompt: `Design a premium "Cyber Wave Drawer" component. Unfolding the drawer displays a 3D perspective cyber grid wireframe inside an HTML5 Canvas, with pulsing cyan digital wave currents running through on toggle.`
};
