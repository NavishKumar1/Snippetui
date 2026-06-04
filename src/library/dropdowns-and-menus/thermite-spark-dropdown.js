/**
 * Component: Thermite Spark Dropdown
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'thermite-spark-dropdown',
  name: 'Thermite Spark Dropdown',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="tm-dropdown-wrapper">
  <!-- Industrial Metal Trigger -->
  <button class="tm-dropdown-trigger">
    <span>CONVERGE METALS</span>
    <span class="tm-indicator">⚡</span>
  </button>
  
  <!-- Dropdown Panel with Sparks Canvas -->
  <div class="tm-dropdown-menu">
    <div class="tm-canvas-container">
      <canvas class="tm-sparks-canvas"></canvas>
    </div>
    <div class="tm-contents">
      <div class="tm-item" style="--i: 0;">
        <span class="tm-bullet"></span>
        <span class="tm-text">Crucible Vault</span>
      </div>
      <div class="tm-item" style="--i: 1;">
        <span class="tm-bullet"></span>
        <span class="tm-text">Molten Foundry</span>
      </div>
      <div class="tm-item" style="--i: 2;">
        <span class="tm-bullet"></span>
        <span class="tm-text">Slag Archives</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Spark showers rendering in Canvas on dropdown expand
const tmWrapper = document.querySelector('.tm-dropdown-wrapper');
if (tmWrapper) {
  const trigger = tmWrapper.querySelector('.tm-dropdown-trigger');
  const menu = tmWrapper.querySelector('.tm-dropdown-menu');
  const canvas = tmWrapper.querySelector('.tm-sparks-canvas');
  const ctx = canvas.getContext('2d');
  const items = tmWrapper.querySelectorAll('.tm-item');
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    canvas.width = menu.clientWidth || 270;
    canvas.height = 160;
  };
  resizeCanvas();
  
  trigger.addEventListener('click', () => {
    tmWrapper.classList.toggle('active');
    isOpen = tmWrapper.classList.contains('active');
    
    if (isOpen) {
      resizeCanvas();
      // Generate heavy burst of initial sparks
      for (let i = 0; i < 24; i++) {
        spawnSpark();
      }
    }
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('.tm-text').textContent;
      trigger.querySelector('span').textContent = text.toUpperCase();
      tmWrapper.classList.remove('active');
      isOpen = false;
    });
  });

  document.addEventListener('click', (e) => {
    if (!tmWrapper.contains(e.target)) {
      tmWrapper.classList.remove('active');
      isOpen = false;
    }
  });

  // Particle System
  const sparks = [];
  const colors = ['#ffffff', '#ffb700', '#ff5500', '#ff0000'];

  const spawnSpark = () => {
    const w = canvas.width;
    // Spawns from top center hinge point
    sparks.push({
      x: w / 2,
      y: 0,
      vx: -1.5 + Math.random() * 3,
      vy: 1.5 + Math.random() * 4,
      size: 1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.012 + Math.random() * 0.015
    });
  };

  let animId;
  const draw = () => {
    if (!tmWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen && Math.random() < 0.2) {
      spawnSpark();
    }
    
    sparks.forEach((s, idx) => {
      s.x += s.vx;
      s.y += s.vy;
      
      // Gravity
      s.vy += 0.04;
      s.vx *= 0.98;
      
      s.alpha -= s.decay;
      if (s.alpha <= 0 || s.x < 0 || s.x > canvas.width || s.y > canvas.height) {
        sparks.splice(idx, 1);
        return;
      }
      
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const tmWrapper = document.querySelector<HTMLDivElement>('.tm-dropdown-wrapper');
if (tmWrapper) {
  const trigger = tmWrapper.querySelector<HTMLButtonElement>('.tm-dropdown-trigger');
  const menu = tmWrapper.querySelector<HTMLDivElement>('.tm-dropdown-menu');
  const canvas = tmWrapper.querySelector<HTMLCanvasElement>('.tm-sparks-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const items = tmWrapper.querySelectorAll<HTMLDivElement>('.tm-item');
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    if (canvas && menu) {
      canvas.width = menu.clientWidth || 270;
      canvas.height = 160;
    }
  };
  resizeCanvas();
  
  if (trigger && menu) {
    trigger.addEventListener('click', () => {
      tmWrapper.classList.toggle('active');
      isOpen = tmWrapper.classList.contains('active');
      
      if (isOpen) {
        resizeCanvas();
        for (let i = 0; i < 24; i++) {
          spawnSpark();
        }
      }
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const textEl = item.querySelector<HTMLSpanElement>('.tm-text');
      const text = textEl ? textEl.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && text) {
        label.textContent = text.toUpperCase();
      }
      tmWrapper.classList.remove('active');
      isOpen = false;
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (tmWrapper && !tmWrapper.contains(e.target as Node)) {
      tmWrapper.classList.remove('active');
      isOpen = false;
    }
  });

  interface SparkItem {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
  }

  const sparks: SparkItem[] = [];
  const colors = ['#ffffff', '#ffb700', '#ff5500', '#ff0000'];

  const spawnSpark = () => {
    if (!canvas) return;
    const w = canvas.width;
    sparks.push({
      x: w / 2,
      y: 0,
      vx: -1.5 + Math.random() * 3,
      vy: 1.5 + Math.random() * 4,
      size: 1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.012 + Math.random() * 0.015
    });
  };

  let animId: number;
  const draw = () => {
    if (!tmWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen && Math.random() < 0.2) {
      spawnSpark();
    }
    
    sparks.forEach((s, idx) => {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.04;
      s.vx *= 0.98;
      
      s.alpha -= s.decay;
      if (s.alpha <= 0 || s.x < 0 || s.x > canvas.width || s.y > canvas.height) {
        sparks.splice(idx, 1);
        return;
      }
      
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Thermite Spark Dropdown Styles */
.tm-dropdown-wrapper {
  position: relative;
  width: 270px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.tm-dropdown-trigger {
  width: 100%;
  padding: 16px 22px;
  background: radial-gradient(circle at center, #1e1b18 0%, #0d0c0a 100%);
  border: 1.5px solid #ff5500;
  border-radius: 4px;
  color: #ff5500;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 85, 0, 0.1);
  transition: all 0.3s;
}

.tm-dropdown-trigger:hover {
  box-shadow: 0 0 18px rgba(255, 85, 0, 0.35), inset 0 0 15px rgba(255, 85, 0, 0.2);
}

.tm-indicator {
  font-size: 12px;
  text-shadow: 0 0 6px #ff5500;
  transition: transform 0.4s ease;
}

.tm-dropdown-wrapper.active .tm-indicator {
  transform: rotate(180deg) scale(1.1);
}

/* Dropdown body containing sparks canvas */
.tm-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: #0d0c0a;
  border: 1.5px solid rgba(255, 85, 0, 0.25);
  border-radius: 4px;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
  overflow: hidden;
}

.tm-dropdown-wrapper.active .tm-dropdown-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  border-color: #ff5500;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 85, 0, 0.1);
}

.tm-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.tm-sparks-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.tm-contents {
  position: relative;
  z-index: 2;
  padding: 8px;
  background: rgba(13, 12, 10, 0.85);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tm-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 2px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s, color 0.2s;
  transition-delay: calc(var(--i) * 0.05s);
}

.tm-dropdown-wrapper.active .tm-item {
  opacity: 1;
  transform: translateY(0);
}

.tm-bullet {
  width: 5px;
  height: 5px;
  background: rgba(255, 85, 0, 0.3);
  border-radius: 50%;
  transition: all 0.3s;
}

.tm-item:hover {
  background: rgba(255, 85, 0, 0.08);
  color: #ff5500;
  text-shadow: 0 0 3px rgba(255, 85, 0, 0.4);
}

.tm-item:hover .tm-bullet {
  background: #ff5500;
  box-shadow: 0 0 6px #ff5500;
  transform: scale(1.2);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[270px] font-sans select-none">
  <button class="w-full px-5 py-4 bg-gradient-to-b from-stone-900 to-black border border-orange-500 rounded text-orange-500 font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:shadow-[0_0_18px_rgba(255,85,0,0.35)] transition-all">
    <span>CONVERGE METALS</span>
    <span class="text-orange-500 shadow-orange-500">⚡</span>
  </button>
</div>`,
  prompt: `Design a premium "Thermite Spark Dropdown" component. Set inside dark industrial metal plates, opening the menu triggers an immediate shower of glowing white-hot iron spark particles falling down the borders.`
};
