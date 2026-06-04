/**
 * Component: Supernova Flare Ring
 * Category: progress-and-gauges
 */

export const component = {
  id: 'supernova-flare-ring',
  name: 'Supernova Flare Ring',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="flare-ring-sandbox" id="flare-ring-sandbox-container">
  <div class="flare-ring-wrapper">
    <canvas class="flare-ring-canvas"></canvas>
    <div class="flare-ring-info">
      <span class="flare-title">PLASMA FLARE CORE</span>
      <span class="flare-percent">0%</span>
    </div>
  </div>
  
  <div class="flare-ring-controls">
    <input type="range" class="flare-ring-slider" min="0" max="100" value="60" />
  </div>
</div>`,
  js: `// Supernova Flare Ring Canvas Animation Logic
const canvas = document.querySelector('.flare-ring-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.flare-ring-slider');
  const percentText = document.querySelector('.flare-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let embers = [];
  let spinAngle = 0;
  
  canvas.width = 180;
  canvas.height = 180;
  
  class PlasmaEmber {
    constructor(x, y, vx, vy, size, life, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.size = size;
      this.maxLife = life;
      this.life = life;
      this.color = color;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;
    }
    
    draw() {
      const alpha = this.life / this.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2);
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
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    currentVal += (targetVal - currentVal) * 0.12;
    percentText.textContent = \`\${Math.round(currentVal)}%\`;
    
    spinAngle += 0.015;
    
    const radius = 60;
    const endAngle = -Math.PI / 2 + (currentVal / 100) * Math.PI * 2;
    
    // Draw star core glow behind
    ctx.save();
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
    coreGrad.addColorStop(0, 'rgba(255, 200, 50, 0.45)');
    coreGrad.addColorStop(0.5, 'rgba(255, 80, 0, 0.15)');
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // Draw static tracking ring base
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 80, 0, 0.04)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    
    // Draw neon glowing arc
    ctx.save();
    const progressGrad = ctx.createSweepGradient ? null : ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
    if (progressGrad) {
      progressGrad.addColorStop(0, '#ff3300');
      progressGrad.addColorStop(0.5, '#ffaa00');
      progressGrad.addColorStop(1, '#ffea00');
      ctx.strokeStyle = progressGrad;
    } else {
      ctx.strokeStyle = '#ff6a00';
    }
    
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(255, 106, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI / 2, endAngle);
    ctx.stroke();
    ctx.restore();
    
    // Spawn plasma flare embers at the leading edge of the progress arc
    if (currentVal > 1) {
      const edgeX = cx + Math.cos(endAngle) * radius;
      const edgeY = cy + Math.sin(endAngle) * radius;
      
      // Spawn 1-2 embers per frame
      for (let i = 0; i < 2; i++) {
        const spreadAngle = endAngle + Math.PI + (Math.random() - 0.5) * 0.4;
        const velocity = Math.random() * 1.5 + 0.4;
        const vx = Math.cos(spreadAngle) * velocity + (Math.random() - 0.5) * 0.3;
        const vy = Math.sin(spreadAngle) * velocity + (Math.random() - 0.5) * 0.3;
        
        const size = Math.random() * 3.5 + 1.5;
        const life = Math.random() * 25 + 15;
        
        const rColor = Math.random();
        const color = rColor < 0.4 ? '#ffffff' : (rColor < 0.75 ? '#ffaa00' : '#ff3300');
        
        embers.push(new PlasmaEmber(edgeX, edgeY, vx, vy, size, life, color));
      }
    }
    
    // Update and draw embers
    for (let i = embers.length - 1; i >= 0; i--) {
      const ember = embers[i];
      ember.update();
      if (ember.life <= 0) {
        embers.splice(i, 1);
      } else {
        ember.draw();
      }
    }
    
    animId = requestAnimationFrame(animate);
  };
  
  slider.addEventListener('input', () => {
    targetVal = parseInt(slider.value, 10);
  });
  
  animate();
}`,
  ts: `// TypeScript Implementation
const canvas = document.querySelector('.flare-ring-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.flare-ring-slider') as HTMLInputElement;
  const percentText = document.querySelector('.flare-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let embers: PlasmaEmber[] = [];
    let spinAngle = 0;
    
    canvas.width = 180;
    canvas.height = 180;
    
    class PlasmaEmber {
      x: number; y: number; vx: number; vy: number; size: number; maxLife: number; life: number; color: string;
      constructor(x: number, y: number, vx: number, vy: number, size: number, life: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.maxLife = life;
        this.life = life;
        this.color = color;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
      }
      
      draw() {
        if (!ctx) return;
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2);
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
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      currentVal += (targetVal - currentVal) * 0.12;
      percentText.textContent = \`\${Math.round(currentVal)}%\`;
      spinAngle += 0.015;
      
      const radius = 60;
      const endAngle = -Math.PI / 2 + (currentVal / 100) * Math.PI * 2;
      
      ctx.save();
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
      coreGrad.addColorStop(0, 'rgba(255, 200, 50, 0.45)');
      coreGrad.addColorStop(0.5, 'rgba(255, 80, 0, 0.15)');
      coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 80, 0, 0.04)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      ctx.strokeStyle = '#ff6a00';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(255, 106, 0, 0.8)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, -Math.PI / 2, endAngle);
      ctx.stroke();
      ctx.restore();
      
      if (currentVal > 1) {
        const edgeX = cx + Math.cos(endAngle) * radius;
        const edgeY = cy + Math.sin(endAngle) * radius;
        
        for (let i = 0; i < 2; i++) {
          const spreadAngle = endAngle + Math.PI + (Math.random() - 0.5) * 0.4;
          const velocity = Math.random() * 1.5 + 0.4;
          const vx = Math.cos(spreadAngle) * velocity + (Math.random() - 0.5) * 0.3;
          const vy = Math.sin(spreadAngle) * velocity + (Math.random() - 0.5) * 0.3;
          
          const size = Math.random() * 3.5 + 1.5;
          const life = Math.random() * 25 + 15;
          
          const rColor = Math.random();
          const color = rColor < 0.4 ? '#ffffff' : (rColor < 0.75 ? '#ffaa00' : '#ff3300');
          
          embers.push(new PlasmaEmber(edgeX, edgeY, vx, vy, size, life, color));
        }
      }
      
      for (let i = embers.length - 1; i >= 0; i--) {
        const ember = embers[i];
        ember.update();
        if (ember.life <= 0) {
          embers.splice(i, 1);
        } else {
          ember.draw();
        }
      }
      
      animId = requestAnimationFrame(animate);
    };
    
    slider.addEventListener('input', () => {
      targetVal = parseInt(slider.value, 10);
    });
    
    animate();
  }
}`,
  css: `/* Supernova Flare Ring Styles */
.flare-ring-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #140502 0%, #000000 100%);
  border: 1px solid rgba(255, 80, 0, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.flare-ring-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flare-ring-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.flare-ring-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.flare-title {
  font-family: monospace;
  font-size: 7px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1px;
}

.flare-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 12px rgba(255, 106, 0, 0.8);
  margin-top: 2px;
}

.flare-ring-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 8px;
}

.flare-ring-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.flare-ring-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff6a00;
  border: 2px solid #140502;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 106, 0, 0.7);
  transition: transform 0.15s;
}

.flare-ring-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#140502] to-[#000000] border border-orange-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="flare-ring-sandbox-container">
  <div class="relative w-[180px] h-[180px] flex items-center justify-center">
    <canvas class="flare-ring-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-20">
      <span class="font-mono text-[7px] text-white/25 tracking-wider">PLASMA FLARE CORE</span>
      <span class="flare-percent font-sans text-2xl font-extrabold text-white drop-shadow-[0_0_12px_rgba(255,106,0,0.8)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-2">
    <input type="range" class="flare-ring-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff6a00] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#140502] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="60" />
  </div>
</div>`,
  prompt: 'Design a circular orbital supernova progress loop where highly glowing orange-yellow plasma flares and ember sparks trail behind a blazing star core.'
};
