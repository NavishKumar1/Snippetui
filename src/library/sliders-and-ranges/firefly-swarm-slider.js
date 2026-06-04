/**
 * Component: Firefly Swarm Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'firefly-swarm-slider',
  name: 'Firefly Swarm Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="firefly-slider-wrapper">
  <div class="firefly-track">
    <div class="firefly-fill" style="width: 50%;"></div>
  </div>
  <div class="firefly-swarm">
    <span class="firefly ff-1"></span>
    <span class="firefly ff-2"></span>
    <span class="firefly ff-3"></span>
    <span class="firefly ff-4"></span>
    <span class="firefly ff-5"></span>
    <span class="firefly ff-6"></span>
    <span class="firefly ff-7"></span>
    <span class="firefly ff-8"></span>
  </div>
  <div class="firefly-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Spring-driven firefly swarm trailing slider thumb
const fWrapper = document.querySelector('.firefly-slider-wrapper');
if (fWrapper) {
  const thumb = fWrapper.querySelector('.firefly-thumb');
  const fill = fWrapper.querySelector('.firefly-fill');
  const fireflies = fWrapper.querySelectorAll('.firefly');
  
  let isDragging = false;
  let percentage = 50;
  
  const updateSlider = (clientX) => {
    const rect = fWrapper.getBoundingClientRect();
    percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
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
  
  fWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
  
  // Initialize swarm physics
  const swarm = [];
  fireflies.forEach((ff, index) => {
    swarm.push({
      el: ff,
      x: 50,
      y: 0,
      vx: 0,
      vy: 0,
      angle: Math.random() * Math.PI * 2,
      speed: 0.03 + Math.random() * 0.04,
      offsetX: -30 + Math.random() * 60,
      offsetY: -20 + Math.random() * 40
    });
  });
  
  let animId;
  const animate = () => {
    if (!fWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    const targetX = percentage;
    swarm.forEach((ff) => {
      // Idle movement
      ff.angle += ff.speed;
      const driftX = Math.sin(ff.angle) * 8;
      const driftY = Math.cos(ff.angle) * 6;
      
      // Pull to target coordinates
      const tx = targetX + ff.offsetX + driftX;
      const ty = ff.offsetY + driftY;
      
      const dx = tx - ff.x;
      const dy = ty - ff.y;
      
      ff.vx += dx * 0.04;
      ff.vy += dy * 0.04;
      
      // Friction
      ff.vx *= 0.82;
      ff.vy *= 0.82;
      
      ff.x += ff.vx;
      ff.y += ff.vy;
      
      ff.el.style.left = \`\${ff.x}%\`;
      ff.el.style.transform = \`translate(-50%, -50%) translateY(\${ff.y}px)\`;
    });
    
    animId = requestAnimationFrame(animate);
  };
  
  animate();
}`,
  ts: `// TypeScript Implementation
const fWrapper = document.querySelector<HTMLDivElement>('.firefly-slider-wrapper');
if (fWrapper) {
  const thumb = fWrapper.querySelector<HTMLDivElement>('.firefly-thumb');
  const fill = fWrapper.querySelector<HTMLDivElement>('.firefly-fill');
  const fireflies = fWrapper.querySelectorAll<HTMLSpanElement>('.firefly');
  
  let isDragging = false;
  let percentage = 50;
  
  const updateSlider = (clientX: number) => {
    const rect = fWrapper.getBoundingClientRect();
    percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
    }
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
  
  fWrapper.addEventListener('click', (e: MouseEvent) => {
    if (thumb && e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
  
  interface FireflyNode {
    el: HTMLSpanElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    speed: number;
    offsetX: number;
    offsetY: number;
  }
  
  const swarm: FireflyNode[] = [];
  fireflies.forEach((ff) => {
    swarm.push({
      el: ff,
      x: 50,
      y: 0,
      vx: 0,
      vy: 0,
      angle: Math.random() * Math.PI * 2,
      speed: 0.03 + Math.random() * 0.04,
      offsetX: -30 + Math.random() * 60,
      offsetY: -20 + Math.random() * 40
    });
  });
  
  let animId: number;
  const animate = () => {
    if (!fWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    const targetX = percentage;
    swarm.forEach((ff) => {
      ff.angle += ff.speed;
      const driftX = Math.sin(ff.angle) * 8;
      const driftY = Math.cos(ff.angle) * 6;
      
      const tx = targetX + ff.offsetX + driftX;
      const ty = ff.offsetY + driftY;
      
      const dx = tx - ff.x;
      const dy = ty - ff.y;
      
      ff.vx += dx * 0.04;
      ff.vy += dy * 0.04;
      
      ff.vx *= 0.82;
      ff.vy *= 0.82;
      
      ff.x += ff.vx;
      ff.y += ff.vy;
      
      ff.el.style.left = \`\${ff.x}%\`;
      ff.el.style.transform = \`translate(-50%, -50%) translateY(\${ff.y}px)\`;
    });
    
    animId = requestAnimationFrame(animate);
  };
  
  animate();
}`,
  css: `/* Firefly Swarm Slider Styles */
.firefly-slider-wrapper {
  position: relative;
  width: 300px;
  height: 64px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.firefly-track {
  width: 100%;
  height: 8px;
  background: #03140e;
  border-radius: 9999px;
  position: relative;
  border: 1px solid rgba(16, 185, 129, 0.1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
}

.firefly-fill {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, #10b981, #a3e635);
  border-radius: 9999px;
  width: 50%;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

.firefly-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 3px solid #a3e635;
  border-radius: 50%;
  z-index: 10;
  cursor: grab;
  box-shadow: 0 0 15px #a3e635, inset 0 0 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s ease, border-color 0.3s;
}

.firefly-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  border-color: #10b981;
  box-shadow: 0 0 20px #10b981;
}

/* Firefly swarm styling */
.firefly-swarm {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

.firefly {
  position: absolute;
  top: 50%;
  width: 6px;
  height: 6px;
  background: #a3e635;
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0.8;
  box-shadow: 0 0 8px #a3e635, 0 0 16px #10b981;
  transition: opacity 0.3s;
}

/* Add custom pulsing/twinkling to individual fireflies */
.ff-1 { width: 5px; height: 5px; animation: ff-twinkle 1.5s infinite alternate; }
.ff-2 { width: 7px; height: 7px; animation: ff-twinkle 1.8s infinite alternate 0.2s; }
.ff-3 { width: 4px; height: 4px; animation: ff-twinkle 1.2s infinite alternate 0.4s; }
.ff-4 { width: 6px; height: 6px; animation: ff-twinkle 2s infinite alternate 0.1s; }
.ff-5 { width: 5px; height: 5px; animation: ff-twinkle 1.6s infinite alternate 0.3s; }
.ff-6 { width: 6px; height: 6px; animation: ff-twinkle 1.4s infinite alternate 0.5s; }
.ff-7 { width: 8px; height: 8px; animation: ff-twinkle 2.2s infinite alternate 0.2s; }
.ff-8 { width: 4px; height: 4px; animation: ff-twinkle 1.7s infinite alternate 0.6s; }

@keyframes ff-twinkle {
  0% { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-[64px] flex items-center select-none cursor-pointer">
  <div class="w-full h-2 bg-[#03140e] border border-emerald-500/10 rounded-full relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
    <div class="absolute h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full w-1/2 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-[3px] border-lime-400 rounded-full cursor-grab shadow-[0_0_15px_#a3e635]"></div>
</div>`,
  prompt: `Design a premium "Firefly Swarm Slider" range selector. Set against a dark forest nightscape, a magical swarm of glowing golden-green fireflies hovers dynamically and clusters around the thumb as you drag.`
};
