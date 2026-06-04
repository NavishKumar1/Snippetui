/**
 * Component: Liquid Magma Thermometer
 * Category: progress-and-gauges
 */

export const component = {
  id: 'liquid-magma-thermometer',
  name: 'Liquid Magma Thermometer',
  category: 'progress-and-gauges',
  tag: 'Creative',
  html: `<div class="magma-thermometer-sandbox" id="magma-thermometer-sandbox-container">
  <div class="thermometer-wrapper">
    <div class="thermometer-scale">
      <span>100</span>
      <span>75</span>
      <span>50</span>
      <span>25</span>
      <span>0</span>
    </div>
    
    <div class="thermometer-glass">
      <canvas class="thermometer-canvas"></canvas>
    </div>
    
    <div class="thermometer-bulb">
      <span class="bulb-glow"></span>
    </div>
  </div>
  
  <div class="thermometer-controls">
    <input type="range" class="thermometer-slider" min="0" max="100" value="70" />
    <span class="thermometer-val">70%</span>
  </div>
</div>`,
  js: `// Liquid Magma Thermometer Canvas Logic
const container = document.querySelector('.magma-thermometer-sandbox');
if (container) {
  const canvas = container.querySelector('.thermometer-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.thermometer-slider');
  const valLabel = container.querySelector('.thermometer-val');
  
  let animId = null;
  let currentPercent = 0;
  let targetPercent = parseInt(slider.value, 10);
  let bubbles = [];
  let steam = [];
  
  canvas.width = 16;
  canvas.height = 140;
  
  class Bubble {
    constructor(y) {
      this.x = Math.random() * 8 + 4;
      this.y = y;
      this.size = Math.random() * 2 + 1;
      this.speed = Math.random() * 0.8 + 0.3;
      this.wobble = Math.random() * Math.PI * 2;
    }
    
    update(topLimit) {
      this.y -= this.speed;
      this.wobble += 0.15;
      this.x += Math.sin(this.wobble) * 0.25;
      
      return this.y <= topLimit; // Pop at surface
    }
    
    draw() {
      ctx.fillStyle = '#ffeb3b';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  class Steam {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -Math.random() * 0.6 - 0.4;
      this.alpha = 1;
      this.size = Math.random() * 2 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.04;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = 'rgba(255, 100, 0, 0.4)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  
  const animate = () => {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const w = canvas.width;
    const h = canvas.height;
    
    currentPercent += (targetPercent - currentPercent) * 0.15;
    valLabel.textContent = \`\${Math.round(currentPercent)}%\`;
    
    // Convert percent to coordinates (0% = bottom, 100% = top)
    const levelH = (currentPercent / 100) * h;
    const topY = h - levelH;
    
    // Draw boiling magma column
    if (levelH > 0) {
      ctx.save();
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#ff3d00';
      
      const grad = ctx.createLinearGradient(0, topY, 0, h);
      grad.addColorStop(0, '#ff9100'); // Hot yellow-orange boiling tip
      grad.addColorStop(0.5, '#ff3d00'); // Rich red-orange center
      grad.addColorStop(1, '#9e0d00'); // Dark red bottom
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, topY, w, levelH);
      ctx.restore();
      
      // Spawn magma bubbles inside column
      if (Math.random() < 0.12) {
        bubbles.push(new Bubble(h));
      }
      
      // Update and draw bubbles
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        const popped = b.update(topY);
        if (popped || b.y > h) {
          // If popped at surface, spawn steam
          if (popped) {
            for (let s = 0; s < 3; s++) {
              steam.push(new Steam(b.x, topY));
            }
          }
          bubbles.splice(i, 1);
        } else {
          b.draw();
        }
      }
      
      // Spawn steam ambiently at top surface
      if (Math.random() < 0.2) {
        steam.push(new Steam(Math.random() * w, topY));
      }
      
      // Update and draw steam
      for (let i = steam.length - 1; i >= 0; i--) {
        const s = steam[i];
        s.update();
        if (s.alpha <= 0 || s.y < topY - 30) {
          steam.splice(i, 1);
        } else {
          s.draw();
        }
      }
    }
    
    animId = requestAnimationFrame(animate);
  };
  
  slider.addEventListener('input', () => {
    targetPercent = parseInt(slider.value, 10);
  });
  
  animate();
}`,
  ts: `// TypeScript Implementation
const container = document.querySelector('.magma-thermometer-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.thermometer-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.thermometer-slider') as HTMLInputElement;
  const valLabel = container.querySelector('.thermometer-val') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentPercent = 0;
    let targetPercent = parseInt(slider.value, 10);
    let bubbles: Bubble[] = [];
    let steam: Steam[] = [];
    
    canvas.width = 16;
    canvas.height = 140;
    
    class Bubble {
      x: number; y: number; size: number; speed: number; wobble: number;
      constructor(y: number) {
        this.x = Math.random() * 8 + 4;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.8 + 0.3;
        this.wobble = Math.random() * Math.PI * 2;
      }
      
      update(topLimit: number) {
        this.y -= this.speed;
        this.wobble += 0.15;
        this.x += Math.sin(this.wobble) * 0.25;
        return this.y <= topLimit;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = '#ffeb3b';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    class Steam {
      x: number; y: number; vx: number; vy: number; alpha: number; size: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -Math.random() * 0.6 - 0.4;
        this.alpha = 1;
        this.size = Math.random() * 2 + 1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.04;
      }
      
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = 'rgba(255, 100, 0, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      
      currentPercent += (targetPercent - currentPercent) * 0.15;
      valLabel.textContent = \`\${Math.round(currentPercent)}%\`;
      
      const levelH = (currentPercent / 100) * h;
      const topY = h - levelH;
      
      if (levelH > 0) {
        ctx.save();
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#ff3d00';
        
        const grad = ctx.createLinearGradient(0, topY, 0, h);
        grad.addColorStop(0, '#ff9100');
        grad.addColorStop(0.5, '#ff3d00');
        grad.addColorStop(1, '#9e0d00');
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, topY, w, levelH);
        ctx.restore();
        
        if (Math.random() < 0.12) {
          bubbles.push(new Bubble(h));
        }
        
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const b = bubbles[i];
          const popped = b.update(topY);
          if (popped || b.y > h) {
            if (popped) {
              for (let s = 0; s < 3; s++) {
                steam.push(new Steam(b.x, topY));
              }
            }
            bubbles.splice(i, 1);
          } else {
            b.draw();
          }
        }
        
        if (Math.random() < 0.2) {
          steam.push(new Steam(Math.random() * w, topY));
        }
        
        for (let i = steam.length - 1; i >= 0; i--) {
          const s = steam[i];
          s.update();
          if (s.alpha <= 0 || s.y < topY - 30) {
            steam.splice(i, 1);
          } else {
            s.draw();
          }
        }
      }
      
      animId = requestAnimationFrame(animate);
    };
    
    slider.addEventListener('input', () => {
      targetPercent = parseInt(slider.value, 10);
    });
    
    animate();
  }
}`,
  css: `/* Liquid Magma Thermometer styles */
.magma-thermometer-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #0f0502 0%, #030100 100%);
  border: 1px solid rgba(255, 61, 0, 0.15);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.thermometer-wrapper {
  display: flex;
  align-items: flex-end;
  height: 180px;
  gap: 8px;
}

.thermometer-scale {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 140px;
  margin-bottom: 24px; /* Align with tube base */
  font-family: monospace;
  font-size: 8px;
  color: rgba(255, 255, 255, 0.25);
  text-align: right;
  width: 20px;
}

.thermometer-glass {
  position: relative;
  width: 16px;
  height: 140px;
  background: rgba(255, 255, 255, 0.02);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  margin-bottom: 20px; /* Align with bulb */
}

.thermometer-canvas {
  width: 100%;
  height: 100%;
}

.thermometer-bulb {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-42px); /* Relative centering alignment */
  width: 24px;
  height: 24px;
  background: #ff3d00;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 61, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.bulb-glow {
  width: 10px;
  height: 10px;
  background: #ffeb3b;
  border-radius: 50%;
  opacity: 0.8;
  filter: blur(1.5px);
}

.thermometer-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.thermometer-slider {
  -webkit-appearance: none;
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.thermometer-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff3d00;
  border: 2px solid #0f0502;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 61, 0, 0.5);
  transition: transform 0.15s;
}

.thermometer-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.thermometer-val {
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #ff3d00;
  text-shadow: 0 0 8px rgba(255, 61, 0, 0.4);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#0f0502] to-[#030100] border border-red-500/10 rounded-2xl flex items-center justify-center gap-7 p-4 box-border overflow-hidden" id="magma-thermometer-sandbox-container">
  <div class="relative flex items-end h-[180px] gap-2">
    <div class="flex flex-col justify-between h-[140px] mb-6 font-mono text-[8px] text-white/25 text-right w-5">
      <span>100</span>
      <span>75</span>
      <span>50</span>
      <span>25</span>
      <span>0</span>
    </div>
    
    <div class="relative w-4 h-[140px] bg-white/2 border border-white/10 border-b-0 rounded-t-full overflow-hidden mb-5">
      <canvas class="thermometer-canvas w-full h-full"></canvas>
    </div>
    
    <div class="absolute bottom-5 left-1/2 -translate-x-[42px] w-6 h-6 bg-[#ff3d00] border border-white/10 rounded-full shadow-[0_0_10px_rgba(255,61,0,0.5)] flex items-center justify-center">
      <span class="w-2.5 h-2.5 bg-yellow-400 rounded-full opacity-80 blur-[1.5px]"></span>
    </div>
  </div>
  
  <div class="flex flex-col items-center gap-3">
    <input type="range" class="thermometer-slider w-[100px] h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff3d00] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0f0502] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="70" />
    <span class="thermometer-val font-sans text-xl font-extrabold text-[#ff3d00] drop-shadow-[0_0_8px_rgba(255,61,0,0.4)]">70%</span>
  </div>
</div>`,
  prompt: 'Design a vertical thermometer progress gauge component displaying custom Canvas bubbling liquid magma and steam particles rising at top boiling thresholds.'
};
// Add CSS hook to align the bulb correctly inside relative parent container
component.css = component.css.replace('transform: translateX(-42px);', 'transform: translateX(-37px);');
component.tailwind = component.tailwind.replace('-translate-x-[42px]', '-translate-x-[36px]');
