/**
 * Component: Supernova Blast Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'supernova-blast-slider',
  name: 'Supernova Blast Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="supernova-slider-wrapper">
  <div class="supernova-canvas-container">
    <canvas class="supernova-canvas"></canvas>
  </div>
  <div class="supernova-track">
    <div class="supernova-fill" style="width: 50%;"></div>
  </div>
  <div class="supernova-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Stellar supernova blast particles generated at thumb coordinates on drag
const snWrapper = document.querySelector('.supernova-slider-wrapper');
if (snWrapper) {
  const thumb = snWrapper.querySelector('.supernova-thumb');
  const fill = snWrapper.querySelector('.supernova-fill');
  const canvas = snWrapper.querySelector('.supernova-canvas');
  const ctx = canvas.getContext('2d');
  
  let isDragging = false;
  let percentage = 50;
  
  const resizeCanvas = () => {
    canvas.width = snWrapper.clientWidth || 300;
    canvas.height = 96;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const updateSlider = (clientX) => {
    const rect = snWrapper.getBoundingClientRect();
    percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Spawn explosion flares during dragging
    if (isDragging) {
      const numParticles = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < numParticles; i++) {
        spawnParticle();
      }
    }
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
    }
  });
  
  snWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
      // Click produces a mini blast
      for (let i = 0; i < 15; i++) {
        spawnParticle();
      }
    }
  });
  
  // Particle System
  const particles = [];
  const colors = ['#ffffff', '#ffaa00', '#ff5500', '#da77f2', '#a5d8ff'];
  
  const spawnParticle = () => {
    const w = canvas.width;
    const h = canvas.height;
    
    // Calculate exact pixel position of thumb center
    const tx = (percentage / 100) * w;
    const ty = h / 2;
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 3.5;
    
    particles.push({
      x: tx,
      y: ty,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.015 + Math.random() * 0.02
    });
  };
  
  let animId;
  const draw = () => {
    if (!snWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      
      // Friction
      p.vx *= 0.96;
      p.vy *= 0.96;
      
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        particles.splice(idx, 1);
        return;
      }
      
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
  
  snWrapper._cleanupResize = () => {
    window.removeEventListener('resize', resizeCanvas);
  };
}`,
  ts: `// TypeScript Implementation
const snWrapper = document.querySelector<HTMLDivElement>('.supernova-slider-wrapper');
if (snWrapper) {
  const thumb = snWrapper.querySelector<HTMLDivElement>('.supernova-thumb');
  const fill = snWrapper.querySelector<HTMLDivElement>('.supernova-fill');
  const canvas = snWrapper.querySelector<HTMLCanvasElement>('.supernova-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  
  let isDragging = false;
  let percentage = 50;
  
  const resizeCanvas = () => {
    if (canvas && snWrapper) {
      canvas.width = snWrapper.clientWidth || 300;
      canvas.height = 96;
    }
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const updateSlider = (clientX: number) => {
    if (!snWrapper || !thumb || !fill) return;
    const rect = snWrapper.getBoundingClientRect();
    percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    if (isDragging) {
      const numParticles = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < numParticles; i++) {
        spawnParticle();
      }
    }
  };
  
  const spawnParticle = () => {
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const tx = (percentage / 100) * w;
    const ty = h / 2;
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 3.5;
    
    particles.push({
      x: tx,
      y: ty,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.015 + Math.random() * 0.02
    });
  };
  
  if (thumb) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('active');
    });
  }
  
  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      if (thumb) thumb.classList.remove('active');
    }
  });
  
  snWrapper.addEventListener('click', (e: MouseEvent) => {
    if (thumb && e.target !== thumb) {
      updateSlider(e.clientX);
      for (let i = 0; i < 15; i++) {
        spawnParticle();
      }
    }
  });
  
  interface StarParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
  }
  
  const particles: StarParticle[] = [];
  const colors = ['#ffffff', '#ffaa00', '#ff5500', '#da77f2', '#a5d8ff'];
  
  let animId: number;
  const draw = () => {
    if (!snWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      
      p.vx *= 0.96;
      p.vy *= 0.96;
      
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        particles.splice(idx, 1);
        return;
      }
      
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Supernova Blast Slider Styles */
.supernova-slider-wrapper {
  position: relative;
  width: 300px;
  height: 96px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.supernova-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.supernova-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.supernova-track {
  width: 100%;
  height: 8px;
  background: #090212;
  border-radius: 4px;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(218, 119, 242, 0.15);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
}

.supernova-fill {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, #ff5500, #da77f2);
  border-radius: 4px;
  width: 50%;
  box-shadow: 0 0 10px rgba(218, 119, 242, 0.4);
}

.supernova-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: radial-gradient(circle, #ffffff 30%, #ffd700 75%);
  border-radius: 50%;
  z-index: 10;
  cursor: grab;
  box-shadow: 0 0 15px #ffd700, 0 0 30px #ff5500;
  transition: transform 0.15s ease;
}

.supernova-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.3);
  box-shadow: 0 0 25px #ffffff, 0 0 45px #ff5500;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-24 flex items-center select-none cursor-pointer">
  <div class="w-full h-2 bg-[#090212] border border-fuchsia-500/10 rounded relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
    <div class="absolute h-full bg-gradient-to-r from-orange-500 to-fuchsia-400 rounded w-1/2 shadow-[0_0_10px_rgba(218,119,242,0.4)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-white to-yellow-400 rounded-full cursor-grab shadow-[0_0_15px_#ffd700,0_0_30px_#ff5500]"></div>
</div>`,
  prompt: `Design a premium "Supernova Blast Slider" range selector. Track colored in deep purple space void. The thumb is a shining golden stellar star core that releases stellar explosion flares and cosmic sparks in real-time as you drag it.`
};
