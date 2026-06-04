/**
 * Component: Supernova Blast Dial
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'supernova-blast-dial',
  name: 'Supernova Blast Dial',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="sb-dial-wrapper">
  <!-- Interactive Trigger Center Star -->
  <button class="sb-trigger-star">
    <span class="sb-star-icon">✦</span>
  </button>
  
  <!-- Outer Cosmic Blast Node Systems -->
  <div class="sb-blast-system">
    <div class="sb-canvas-container">
      <canvas class="sb-starburst-canvas"></canvas>
    </div>
    
    <div class="sb-node" style="--a: 0deg;" title="Flares">
      <span class="sb-node-icon">🔥</span>
    </div>
    <div class="sb-node" style="--a: 90deg;" title="Gravity">
      <span class="sb-node-icon">🕳️</span>
    </div>
    <div class="sb-node" style="--a: 180deg;" title="Nebula">
      <span class="sb-node-icon">🌌</span>
    </div>
    <div class="sb-node" style="--a: 270deg;" title="Nova">
      <span class="sb-node-icon">☀️</span>
    </div>
  </div>
</div>`,
  js: `// Stellar explosion flare particles on click
const sbWrapper = document.querySelector('.sb-dial-wrapper');
if (sbWrapper) {
  const trigger = sbWrapper.querySelector('.sb-trigger-star');
  const system = sbWrapper.querySelector('.sb-blast-system');
  const canvas = sbWrapper.querySelector('.sb-starburst-canvas');
  const ctx = canvas.getContext('2d');
  const nodes = sbWrapper.querySelectorAll('.sb-node');
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    canvas.width = sbWrapper.clientWidth || 280;
    canvas.height = sbWrapper.clientHeight || 280;
  };
  resizeCanvas();
  
  trigger.addEventListener('click', () => {
    sbWrapper.classList.toggle('active');
    isOpen = sbWrapper.classList.contains('active');
    
    if (isOpen) {
      resizeCanvas();
      // Ignite massive spark burst
      for (let i = 0; i < 35; i++) {
        spawnSpark();
      }
    }
  });

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      sbWrapper.classList.remove('active');
      isOpen = false;
    });
  });

  // Particle System
  const sparks = [];
  const colors = ['#ffffff', '#ffd700', '#ff8800', '#ff0055'];

  const spawnSpark = () => {
    const w = canvas.width;
    const h = canvas.height;
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 5;
    
    sparks.push({
      x: w / 2,
      y: h / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1.5 + Math.random() * 2.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.018 + Math.random() * 0.02
    });
  };

  let animId;
  const draw = () => {
    if (!sbWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    sparks.forEach((s, idx) => {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.94;
      s.vy *= 0.94;
      
      s.alpha -= s.decay;
      if (s.alpha <= 0) {
        sparks.splice(idx, 1);
        return;
      }
      
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const sbWrapper = document.querySelector<HTMLDivElement>('.sb-dial-wrapper');
if (sbWrapper) {
  const trigger = sbWrapper.querySelector<HTMLButtonElement>('.sb-trigger-star');
  const system = sbWrapper.querySelector<HTMLDivElement>('.sb-blast-system');
  const canvas = sbWrapper.querySelector<HTMLCanvasElement>('.sb-starburst-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const nodes = sbWrapper.querySelectorAll<HTMLDivElement>('.sb-node');
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    if (canvas && sbWrapper) {
      canvas.width = sbWrapper.clientWidth || 280;
      canvas.height = sbWrapper.clientHeight || 280;
    }
  };
  resizeCanvas();
  
  if (trigger && system) {
    trigger.addEventListener('click', () => {
      sbWrapper.classList.toggle('active');
      isOpen = sbWrapper.classList.contains('active');
      
      if (isOpen) {
        resizeCanvas();
        for (let i = 0; i < 35; i++) {
          spawnSpark();
        }
      }
    });
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      sbWrapper.classList.remove('active');
      isOpen = false;
    });
  });

  interface NovaSpark {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
  }

  const sparks: NovaSpark[] = [];
  const colors = ['#ffffff', '#ffd700', '#ff8800', '#ff0055'];

  const spawnSpark = () => {
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 5;
    
    sparks.push({
      x: w / 2,
      y: h / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1.5 + Math.random() * 2.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.018 + Math.random() * 0.02
    });
  };

  let animId: number;
  const draw = () => {
    if (!sbWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    sparks.forEach((s, idx) => {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.94;
      s.vy *= 0.94;
      
      s.alpha -= s.decay;
      if (s.alpha <= 0) {
        sparks.splice(idx, 1);
        return;
      }
      
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Supernova Blast Dial Styles */
.sb-dial-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  overflow: visible;
  box-sizing: border-box;
}

.sb-trigger-star {
  position: relative;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, #ffffff 10%, #ffd700 70%);
  border: none;
  border-radius: 50%;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px #ffd700, 0 0 40px #ff5500, inset 0 2px 4px rgba(255,255,255,0.8);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.sb-star-icon {
  font-size: 26px;
  color: #120224;
  text-shadow: 0 1px 1px rgba(255,255,255,0.4);
  transition: transform 0.4s;
}

.sb-dial-wrapper.active .sb-trigger-star {
  transform: scale(1.1) rotate(135deg);
  box-shadow: 0 0 30px #ffffff, 0 0 50px #ff0055;
  background: radial-gradient(circle, #ffffff 10%, #ff0055 70%);
}

/* Starburst radial dial node system */
.sb-blast-system {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.sb-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.sb-starburst-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.sb-node {
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(18, 5, 36, 0.95);
  border: 1.5px solid #ff8800;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  box-shadow: 0 0 10px rgba(255, 136, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  scale: 0;
  
  /* Radial coordinate formula */
  top: calc(50% - 20px + 90px * sin(var(--a)));
  left: calc(50% - 20px + 90px * cos(var(--a)));
}

.sb-dial-wrapper.active .sb-node {
  opacity: 1;
  scale: 1;
  pointer-events: auto;
  transition-delay: calc(var(--a) * 0.001s);
}

.sb-node:hover {
  transform: scale(1.25);
  border-color: #ffffff;
  background: #ffffff;
  box-shadow: 0 0 20px #ffffff, 0 0 35px #ff0055;
}

.sb-node-icon {
  font-size: 16px;
  transition: transform 0.3s;
}

.sb-node:hover .sb-node-icon {
  transform: scale(1.15);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[280px] h-[280px] flex items-center justify-center select-none">
  <button class="w-[60px] h-[60px] bg-gradient-to-br from-white to-yellow-400 border-none rounded-full cursor-grab shadow-[0_0_20px_#ffd700,0_0_40px_#ff5500]">
    <span class="text-2xl text-purple-950 font-bold">✦</span>
  </button>
</div>`,
  prompt: `Design a premium "Supernova Blast Dial" menu. A central star trigger star launches a golden solar explosion on Canvas, shooting option nodes out along radial coordinates like glowing stellar flares.`
};
