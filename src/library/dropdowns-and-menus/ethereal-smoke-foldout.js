/**
 * Component: Ethereal Smoke Foldout
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'ethereal-smoke-foldout',
  name: 'Ethereal Smoke Foldout',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="smoke-foldout-wrapper">
  <!-- Frosted Trigger -->
  <button class="smoke-trigger">
    <span>CONVERGE VAPORS</span>
    <span class="smoke-indicator">░</span>
  </button>
  
  <!-- Smoke backdrop panel drawer -->
  <div class="smoke-menu">
    <div class="smoke-canvas-container">
      <canvas class="smoke-vapor-canvas"></canvas>
    </div>
    <div class="smoke-contents">
      <div class="smoke-item" style="--i: 0;">
        <span class="smoke-label">Aura Vapor A</span>
      </div>
      <div class="smoke-item" style="--i: 1;">
        <span class="smoke-label">Nirvana Gas B</span>
      </div>
      <div class="smoke-item" style="--i: 2;">
        <span class="smoke-label">Zephyr Nebula C</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Gaseous smoke drift rendering inside HTML5 Canvas on panel toggle
const smWrapper = document.querySelector('.smoke-foldout-wrapper');
if (smWrapper) {
  const trigger = smWrapper.querySelector('.smoke-trigger');
  const menu = smWrapper.querySelector('.smoke-menu');
  const canvas = smWrapper.querySelector('.smoke-vapor-canvas');
  const ctx = canvas.getContext('2d');
  const items = smWrapper.querySelectorAll('.smoke-item');
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    canvas.width = menu.clientWidth || 270;
    canvas.height = 150;
  };
  resizeCanvas();
  
  trigger.addEventListener('click', () => {
    smWrapper.classList.toggle('active');
    isOpen = smWrapper.classList.contains('active');
    if (isOpen) {
      resizeCanvas();
      // Generate heavy burst of initial smoke
      for (let i = 0; i < 15; i++) {
        spawnSmokeParticle();
      }
    }
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('.smoke-label').textContent;
      trigger.querySelector('span').textContent = text.toUpperCase();
      smWrapper.classList.remove('active');
      isOpen = false;
    });
  });

  document.addEventListener('click', (e) => {
    if (!smWrapper.contains(e.target)) {
      smWrapper.classList.remove('active');
      isOpen = false;
    }
  });

  // Particle System
  const smoke = [];
  const colors = ['rgba(0, 242, 254, 0.08)', 'rgba(138, 43, 226, 0.06)', 'rgba(255, 0, 127, 0.04)'];

  const spawnSmokeParticle = () => {
    const w = canvas.width;
    const h = canvas.height;
    smoke.push({
      x: 30 + Math.random() * (w - 60),
      y: h + 10,
      vx: -0.3 + Math.random() * 0.6,
      vy: -0.4 - Math.random() * 0.8,
      size: 15 + Math.random() * 25,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.003 + Math.random() * 0.004,
      expansion: 0.15 + Math.random() * 0.15
    });
  };

  let animId;
  const draw = () => {
    if (!smWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen && Math.random() < 0.25) {
      spawnSmokeParticle();
    }
    
    smoke.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      
      // Expand gaseous cloud size over time
      p.size += p.expansion;
      
      p.alpha -= p.decay;
      if (p.alpha <= 0 || p.y < -p.size) {
        smoke.splice(idx, 1);
        return;
      }
      
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      // Draw blurry gaseous blob
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      grad.addColorStop(0, p.color);
      grad.addColorStop(1, 'transparent');
      
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const smWrapper = document.querySelector<HTMLDivElement>('.smoke-foldout-wrapper');
if (smWrapper) {
  const trigger = smWrapper.querySelector<HTMLButtonElement>('.smoke-trigger');
  const menu = smWrapper.querySelector<HTMLDivElement>('.smoke-menu');
  const canvas = smWrapper.querySelector<HTMLCanvasElement>('.smoke-vapor-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const items = smWrapper.querySelectorAll<HTMLDivElement>('.smoke-item');
  
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
      smWrapper.classList.toggle('active');
      isOpen = smWrapper.classList.contains('active');
      if (isOpen) {
        resizeCanvas();
        for (let i = 0; i < 15; i++) {
          spawnSmokeParticle();
        }
      }
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const labelEl = item.querySelector<HTMLSpanElement>('.smoke-label');
      const text = labelEl ? labelEl.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && text) {
        label.textContent = text.toUpperCase();
      }
      smWrapper.classList.remove('active');
      isOpen = false;
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (smWrapper && !smWrapper.contains(e.target as Node)) {
      smWrapper.classList.remove('active');
      isOpen = false;
    }
  });

  interface SmokeBlob {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
    expansion: number;
  }

  const smoke: SmokeBlob[] = [];
  const colors = ['rgba(0, 242, 254, 0.08)', 'rgba(138, 43, 226, 0.06)', 'rgba(255, 0, 127, 0.04)'];

  const spawnSmokeParticle = () => {
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    smoke.push({
      x: 30 + Math.random() * (w - 60),
      y: h + 10,
      vx: -0.3 + Math.random() * 0.6,
      vy: -0.4 - Math.random() * 0.8,
      size: 15 + Math.random() * 25,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.003 + Math.random() * 0.004,
      expansion: 0.15 + Math.random() * 0.15
    });
  };

  let animId: number;
  const draw = () => {
    if (!smWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen && Math.random() < 0.25) {
      spawnSmokeParticle();
    }
    
    smoke.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.size += p.expansion;
      
      p.alpha -= p.decay;
      if (p.alpha <= 0 || p.y < -p.size) {
        smoke.splice(idx, 1);
        return;
      }
      
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      grad.addColorStop(0, p.color);
      grad.addColorStop(1, 'transparent');
      
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Ethereal Smoke Foldout Styles */
.smoke-foldout-wrapper {
  position: relative;
  width: 270px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.smoke-trigger {
  width: 100%;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1.5px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(14px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.smoke-trigger:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.smoke-indicator {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  transition: transform 0.4s;
}

.smoke-foldout-wrapper.active .smoke-indicator {
  transform: rotate(180deg);
  color: #ffffff;
  text-shadow: 0 0 4px #ffffff;
}

/* Glass dropdown panel containing smoke canvas */
.smoke-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(10, 10, 15, 0.6);
  border: 1.5px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 100;
  backdrop-filter: blur(25px);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
}

.smoke-foldout-wrapper.active .smoke-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
}

.smoke-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.smoke-vapor-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.smoke-contents {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.smoke-item {
  padding: 13px 18px;
  cursor: pointer;
  border-radius: 10px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.35s, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s, color 0.25s;
  transition-delay: calc(var(--i) * 0.05s);
}

.smoke-foldout-wrapper.active .smoke-item {
  opacity: 1;
  transform: translateY(0);
}

.smoke-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  transition: all 0.3s;
}

.smoke-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.smoke-item:hover .smoke-label {
  color: #ffffff;
  transform: translateX(4px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[270px] font-sans select-none">
  <button class="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white/90 font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:bg-white/10 hover:border-white/20 transition-all">
    <span>CONVERGE VAPORS</span>
    <span class="text-white/30 text-xs">░</span>
  </button>
</div>`,
  prompt: `Design a premium "Ethereal Smoke Foldout" menu. Opening the frosted select panel trigger releases beautiful curls of rising violet and teal gaseous smoke particles drifting behind options in a custom Canvas.`
};
