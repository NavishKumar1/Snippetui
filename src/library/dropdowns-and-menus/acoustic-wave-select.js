/**
 * Component: Acoustic Wave Select
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'acoustic-wave-select',
  name: 'Acoustic Wave Select',
  category: 'dropdowns-and-menus',
  tag: 'Premium',
  html: `<div class="aw-select-wrapper">
  <!-- Audio Trigger -->
  <button class="aw-trigger">
    <span>FREQUENCY CONVERGE</span>
    <span class="aw-icon">|||</span>
  </button>
  
  <!-- Waveform panel menu -->
  <div class="aw-menu">
    <div class="aw-canvas-container">
      <canvas class="aw-wave-canvas"></canvas>
    </div>
    <div class="aw-contents">
      <div class="aw-item" style="--i: 0;" data-index="0">
        <span class="aw-label">Bass Booster</span>
      </div>
      <div class="aw-item" style="--i: 1;" data-index="1">
        <span class="aw-label">Vocal Tuner</span>
      </div>
      <div class="aw-item" style="--i: 2;" data-index="2">
        <span class="aw-label">Treble Shaper</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Oscillating frequency waves canvas rendering on hover coordinates
const awWrapper = document.querySelector('.aw-select-wrapper');
if (awWrapper) {
  const trigger = awWrapper.querySelector('.aw-trigger');
  const menu = awWrapper.querySelector('.aw-menu');
  const canvas = awWrapper.querySelector('.aw-wave-canvas');
  const ctx = canvas.getContext('2d');
  const items = awWrapper.querySelectorAll('.aw-item');
  
  let isOpen = false;
  let activeIndex = -1;
  let excitement = 0;
  
  const resizeCanvas = () => {
    canvas.width = menu.clientWidth || 270;
    canvas.height = 140;
  };
  resizeCanvas();
  
  trigger.addEventListener('click', () => {
    awWrapper.classList.toggle('active');
    isOpen = awWrapper.classList.contains('active');
    if (isOpen) {
      resizeCanvas();
    }
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('.aw-label').textContent;
      trigger.querySelector('span').textContent = text.toUpperCase();
      awWrapper.classList.remove('active');
      isOpen = false;
    });

    item.addEventListener('mouseenter', () => {
      activeIndex = parseInt(item.getAttribute('data-index'));
      excitement = 1;
    });

    item.addEventListener('mouseleave', () => {
      activeIndex = -1;
    });
  });

  document.addEventListener('click', (e) => {
    if (!awWrapper.contains(e.target)) {
      awWrapper.classList.remove('active');
      isOpen = false;
    }
  });

  // Soundwave Math Model
  let time = 0;
  let animId;
  const draw = () => {
    if (!awWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      time += 0.08;
      const w = canvas.width;
      const h = canvas.height;
      
      // Easing excitement factor
      excitement += (0 - excitement) * 0.05;
      
      // Draw 3 layers of frequency soundwaves
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = layer === 0 ? 'rgba(0, 242, 254, 0.45)' : 
                          layer === 1 ? 'rgba(255, 0, 127, 0.25)' : 
                                        'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = layer === 0 ? 1.5 : 1;
        
        for (let x = 0; x < w; x += 4) {
          // Normalize x coord
          const normX = x / w;
          
          // Base wave height oscillation
          let amplitude = 6 + (layer * 4);
          
          // Excitement peak calculations at hover item indices
          if (activeIndex !== -1) {
            const itemCenter = 0.2 + (activeIndex * 0.3); // approximate coordinates
            const dist = Math.abs(normX - itemCenter);
            if (dist < 0.25) {
              const peak = (1 - dist / 0.25) * 25 * excitement;
              amplitude += peak;
            }
          }
          
          const freq = 0.02 + (layer * 0.015);
          const phase = time * (1 + layer * 0.3);
          const y = h / 2 + Math.sin(x * freq + phase) * amplitude * Math.sin(normX * Math.PI);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const awWrapper = document.querySelector<HTMLDivElement>('.aw-select-wrapper');
if (awWrapper) {
  const trigger = awWrapper.querySelector<HTMLButtonElement>('.aw-trigger');
  const menu = awWrapper.querySelector<HTMLDivElement>('.aw-menu');
  const canvas = awWrapper.querySelector<HTMLCanvasElement>('.aw-wave-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const items = awWrapper.querySelectorAll<HTMLDivElement>('.aw-item');
  
  let isOpen = false;
  let activeIndex = -1;
  let excitement = 0;
  
  const resizeCanvas = () => {
    if (canvas && menu) {
      canvas.width = menu.clientWidth || 270;
      canvas.height = 140;
    }
  };
  resizeCanvas();
  
  if (trigger && menu) {
    trigger.addEventListener('click', () => {
      awWrapper.classList.toggle('active');
      isOpen = awWrapper.classList.contains('active');
      if (isOpen) {
        resizeCanvas();
      }
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const labelEl = item.querySelector<HTMLSpanElement>('.aw-label');
      const text = labelEl ? labelEl.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && text) {
        label.textContent = text.toUpperCase();
      }
      awWrapper.classList.remove('active');
      isOpen = false;
    });

    item.addEventListener('mouseenter', () => {
      const idxStr = item.getAttribute('data-index') || '0';
      activeIndex = parseInt(idxStr);
      excitement = 1;
    });

    item.addEventListener('mouseleave', () => {
      activeIndex = -1;
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (awWrapper && !awWrapper.contains(e.target as Node)) {
      awWrapper.classList.remove('active');
      isOpen = false;
    }
  });

  let time = 0;
  let animId: number;
  const draw = () => {
    if (!awWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      time += 0.08;
      const w = canvas.width;
      const h = canvas.height;
      
      excitement += (0 - excitement) * 0.05;
      
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = layer === 0 ? 'rgba(0, 242, 254, 0.45)' : 
                          layer === 1 ? 'rgba(255, 0, 127, 0.25)' : 
                                        'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = layer === 0 ? 1.5 : 1;
        
        for (let x = 0; x < w; x += 4) {
          const normX = x / w;
          let amplitude = 6 + (layer * 4);
          
          if (activeIndex !== -1) {
            const itemCenter = 0.2 + (activeIndex * 0.3);
            const dist = Math.abs(normX - itemCenter);
            if (dist < 0.25) {
              const peak = (1 - dist / 0.25) * 25 * excitement;
              amplitude += peak;
            }
          }
          
          const freq = 0.02 + (layer * 0.015);
          const phase = time * (1 + layer * 0.3);
          const y = h / 2 + Math.sin(x * freq + phase) * amplitude * Math.sin(normX * Math.PI);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Acoustic Wave Select Styles */
.aw-select-wrapper {
  position: relative;
  width: 270px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.aw-trigger {
  width: 100%;
  padding: 14px 20px;
  background: rgba(10, 15, 20, 0.75);
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.aw-trigger:hover {
  border-color: rgba(0, 242, 254, 0.55);
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.2);
}

.aw-icon {
  font-size: 10px;
  color: #00f2fe;
  text-shadow: 0 0 4px #00f2fe;
  letter-spacing: 2px;
  font-weight: bold;
}

.aw-select-wrapper.active .aw-icon {
  animation: aw-pulse 0.6s infinite alternate;
}

/* Equalizer backdrop dropdown menu panel */
.aw-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(8, 10, 14, 0.7);
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

.aw-select-wrapper.active .aw-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  border-color: rgba(0, 242, 254, 0.35);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
}

.aw-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.aw-wave-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.aw-contents {
  position: relative;
  z-index: 2;
  padding: 6px;
  display: flex;
  flex-direction: column;
}

.aw-item {
  position: relative;
  padding: 12px 18px;
  cursor: pointer;
  border-radius: 3px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s, color 0.2s;
  transition-delay: calc(var(--i) * 0.05s);
}

.aw-select-wrapper.active .aw-item {
  opacity: 1;
  transform: translateY(0);
}

.aw-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 600;
  transition: color 0.3s;
}

.aw-item:hover {
  background: rgba(0, 242, 254, 0.06);
}

.aw-item:hover .aw-label {
  color: #ffffff;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
}

@keyframes aw-pulse {
  0% { letter-spacing: 2px; }
  100% { letter-spacing: 4px; color: #ff007f; text-shadow: 0 0 6px #ff007f; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[270px] font-sans select-none">
  <button class="w-full px-5 py-3.5 bg-slate-950/75 border border-cyan-500/20 rounded text-white font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all">
    <span>FREQUENCY CONVERGE</span>
    <span class="text-cyan-400 font-bold tracking-widest">|||</span>
  </button>
</div>`,
  prompt: `Design a premium "Acoustic Wave Select" menu. Featuring glassmorphism overlay, opening it displays a real-time oscillating sound wave mesh canvas that vibrates in response to option mouse hovers.`
};
