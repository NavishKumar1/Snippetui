/**
 * Component: Thermite Welding Spark Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'thermite-welding-spark-progress',
  name: 'Thermite Welding Spark Progress',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="weld-spark-sandbox" id="weld-spark-sandbox-container">
  <div class="weld-wrapper">
    <canvas class="weld-canvas"></canvas>
    <div class="weld-info">
      <span class="weld-title">REACTION WELD TEMPERATURE</span>
      <span class="weld-val">0%</span>
    </div>
  </div>
  
  <div class="weld-controls">
    <input type="range" class="weld-slider" min="0" max="100" value="70" />
  </div>
</div>`,
  js: `// Thermite Welding Spark Progress Canvas Animation Logic
const canvas = document.querySelector('.weld-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.weld-slider');
  const valLabel = document.querySelector('.weld-val');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let sparks = [];
  
  canvas.width = 280;
  canvas.height = 100;
  
  class WeldSpark {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1.0;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = -Math.random() * 3 - 2; // Explode upward
      this.gravity = 0.15;
      this.alpha = 1.0;
      this.decay = Math.random() * 0.04 + 0.02;
    }
    
    update() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#ffae00';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#ff5100';
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
    
    // Smooth value interpolation
    currentVal += (targetVal - currentVal) * 0.12;
    valLabel.textContent = \`\${Math.round(currentVal)}%\`;
    
    const barH = 8;
    const barY = h - 20;
    const activeW = w * (currentVal / 100);
    
    // 1. Draw solid cold rail track
    ctx.save();
    ctx.fillStyle = '#221a16';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, barY, w, barH, 2) : ctx.rect(0, barY, w, barH);
    ctx.fill();
    ctx.restore();
    
    // 2. Draw glowing hot active weld track
    if (activeW > 2) {
      ctx.save();
      const grad = ctx.createLinearGradient(0, 0, activeW, 0);
      grad.addColorStop(0, '#9e0d00'); // Dark cooling red
      grad.addColorStop(0.7, '#ff3d00'); // Radiant orange
      grad.addColorStop(1, '#ffea00'); // Molten yellow weld point
      
      ctx.fillStyle = grad;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ff3d00';
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(0, barY, activeW, barH, 2) : ctx.rect(0, barY, activeW, barH);
      ctx.fill();
      ctx.restore();
      
      // 3. Spawn metal sparks continuously from the active welder core tip
      if (Math.abs(targetVal - currentVal) > 0.2 || Math.random() < 0.6) {
        sparks.push(new WeldSpark(activeW, barY + barH / 2));
      }
      
      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.update();
        if (p.alpha <= 0 || p.y > h) {
          sparks.splice(i, 1);
        } else {
          p.draw();
        }
      }
      
      // 4. White-hot contact spark arc glow overlay
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ffea00';
      ctx.beginPath();
      ctx.arc(activeW, barY + barH / 2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    
    animId = requestAnimationFrame(animate);
  };
  
  slider.addEventListener('input', () => {
    targetVal = parseInt(slider.value, 10);
  });
  
  animate();
}`,
  ts: `// TypeScript Implementation
const canvas = document.querySelector('.weld-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.weld-slider') as HTMLInputElement;
  const valLabel = document.querySelector('.weld-val') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let sparks: WeldSpark[] = [];
    
    canvas.width = 280;
    canvas.height = 100;
    
    class WeldSpark {
      x: number; y: number; size: number; vx: number; vy: number; gravity: number; alpha: number; decay: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1.0;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = -Math.random() * 3 - 2;
        this.gravity = 0.15;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.04 + 0.02;
      }
      
      update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }
      
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#ffae00';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#ff5100';
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
      
      currentVal += (targetVal - currentVal) * 0.12;
      valLabel.textContent = \`\${Math.round(currentVal)}%\`;
      
      const barH = 8;
      const barY = h - 20;
      const activeW = w * (currentVal / 100);
      
      ctx.save();
      ctx.fillStyle = '#221a16';
      ctx.beginPath();
      if ('roundRect' in ctx) {
        (ctx as any).roundRect(0, barY, w, barH, 2);
      } else {
        ctx.rect(0, barY, w, barH);
      }
      ctx.fill();
      ctx.restore();
      
      if (activeW > 2) {
        ctx.save();
        const grad = ctx.createLinearGradient(0, 0, activeW, 0);
        grad.addColorStop(0, '#9e0d00');
        grad.addColorStop(0.7, '#ff3d00');
        grad.addColorStop(1, '#ffea00');
        
        ctx.fillStyle = grad;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff3d00';
        ctx.beginPath();
        if ('roundRect' in ctx) {
          (ctx as any).roundRect(0, barY, activeW, barH, 2);
        } else {
          ctx.rect(0, barY, activeW, barH);
        }
        ctx.fill();
        ctx.restore();
        
        if (Math.abs(targetVal - currentVal) > 0.2 || Math.random() < 0.6) {
          sparks.push(new WeldSpark(activeW, barY + barH / 2));
        }
        
        for (let i = sparks.length - 1; i >= 0; i--) {
          const p = sparks[i];
          p.update();
          if (p.alpha <= 0 || p.y > h) {
            sparks.splice(i, 1);
          } else {
            p.draw();
          }
        }
        
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ffea00';
        ctx.beginPath();
        ctx.arc(activeW, barY + barH / 2, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      animId = requestAnimationFrame(animate);
    };
    
    slider.addEventListener('input', () => {
      targetVal = parseInt(slider.value, 10);
    });
    
    animate();
  }
}`,
  css: `/* Thermite Welding Spark Progress styles */
.weld-spark-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #1b0c03 0%, #030100 100%);
  border: 1px solid rgba(255, 174, 0, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.weld-wrapper {
  position: relative;
  width: 280px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weld-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.weld-info {
  position: absolute;
  top: 6px;
  left: 6px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
}

.weld-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.weld-val {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ff9d00;
  text-shadow: 0 0 10px rgba(255, 157, 0, 0.5);
  margin-top: 2px;
}

.weld-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 24px;
}

.weld-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.weld-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffaa00;
  border: 2px solid #1b0c03;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 170, 0, 0.5);
  transition: transform 0.15s;
}

.weld-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#1b0c03] to-[#030100] border border-orange-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="weld-spark-sandbox-container">
  <div class="relative w-[280px] h-[100px] flex items-center justify-center">
    <canvas class="weld-canvas absolute inset-0"></canvas>
    <div class="absolute top-1.5 left-1.5 flex flex-col pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">REACTION WELD TEMPERATURE</span>
      <span class="weld-val font-sans text-sm font-extrabold text-[#ff9d00] drop-shadow-[0_0_10px_rgba(255,157,0,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-6">
    <input type="range" class="weld-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ffaa00] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1b0c03] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="70" />
  </div>
</div>`,
  prompt: 'Design a horizontal welding progress rail component shooting brilliant golden iron sparks from a sliding laser torch head.'
};
