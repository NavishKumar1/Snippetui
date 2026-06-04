/**
 * Component: Bioluminescent Spore Ring
 * Category: progress-and-gauges
 */

export const component = {
  id: 'bioluminescent-spore-ring',
  name: 'Bioluminescent Spore Ring',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="spore-ring-sandbox" id="spore-ring-sandbox-container">
  <div class="spore-ring-container">
    <canvas class="spore-ring-canvas"></canvas>
    <div class="spore-ring-label">
      <span class="spore-percent">0%</span>
      <span class="spore-status">HARVESTING</span>
    </div>
  </div>
  
  <div class="spore-ring-controls">
    <input type="range" class="spore-ring-slider" min="0" max="100" value="65" />
  </div>
</div>`,
  js: `// Bioluminescent Radial Gauge Spore Ring Canvas Logic
const container = document.querySelector('.spore-ring-sandbox');
if (container) {
  const canvas = container.querySelector('.spore-ring-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.spore-ring-slider');
  const percentText = container.querySelector('.spore-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let particles = [];
  
  canvas.width = 160;
  canvas.height = 160;
  
  class Spore {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2.2 + 1;
      this.vx = Math.cos(angle) * (Math.random() * 0.6 + 0.2);
      this.vy = Math.sin(angle) * (Math.random() * 0.6 + 0.2) - 0.2; // Drift upward slightly
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.01;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#d4af37';
      ctx.fillStyle = '#ffd700';
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
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 60;
    
    // Smooth value interpolation
    currentVal += (targetVal - currentVal) * 0.15;
    percentText.textContent = \`\${Math.round(currentVal)}%\`;
    
    const angleOffset = -Math.PI / 2; // Start from top
    const endAngle = angleOffset + (currentVal / 100) * Math.PI * 2;
    
    // 1. Draw static background grid ring
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // 2. Draw active glowing ring segment
    ctx.save();
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, angleOffset, endAngle);
    ctx.stroke();
    ctx.restore();
    
    // Spawn spores at the tip of the moving active progress bar
    if (Math.abs(targetVal - currentVal) > 0.2 || Math.random() < 0.25) {
      if (currentVal > 1) {
        const sporeX = cx + Math.cos(endAngle) * radius;
        const sporeY = cy + Math.sin(endAngle) * radius;
        particles.push(new Spore(sporeX, sporeY, endAngle));
      }
    }
    
    // Update and draw spores
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      if (p.alpha <= 0) {
        particles.splice(i, 1);
      } else {
        p.draw();
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
const container = document.querySelector('.spore-ring-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.spore-ring-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.spore-ring-slider') as HTMLInputElement;
  const percentText = container.querySelector('.spore-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let particles: Spore[] = [];
    
    canvas.width = 160;
    canvas.height = 160;
    
    class Spore {
      x: number; y: number; size: number; vx: number; vy: number; alpha: number; decay: number;
      constructor(x: number, y: number, angle: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2.2 + 1;
        this.vx = Math.cos(angle) * (Math.random() * 0.6 + 0.2);
        this.vy = Math.sin(angle) * (Math.random() * 0.6 + 0.2) - 0.2;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }
      
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#d4af37';
        ctx.fillStyle = '#ffd700';
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
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 60;
      
      currentVal += (targetVal - currentVal) * 0.15;
      percentText.textContent = \`\${Math.round(currentVal)}%\`;
      
      const angleOffset = -Math.PI / 2;
      const endAngle = angleOffset + (currentVal / 100) * Math.PI * 2;
      
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.save();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, angleOffset, endAngle);
      ctx.stroke();
      ctx.restore();
      
      if (Math.abs(targetVal - currentVal) > 0.2 || Math.random() < 0.25) {
        if (currentVal > 1) {
          const sporeX = cx + Math.cos(endAngle) * radius;
          const sporeY = cy + Math.sin(endAngle) * radius;
          particles.push(new Spore(sporeX, sporeY, endAngle));
        }
      }
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw();
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
  css: `/* Bioluminescent Spore Ring styles */
.spore-ring-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #100d07 0%, #030201 100%);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.spore-ring-container {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spore-ring-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.spore-ring-label {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 2;
}

.spore-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
}

.spore-status {
  font-family: monospace;
  font-size: 8px;
  color: rgba(212, 175, 55, 0.45);
  letter-spacing: 1px;
  margin-top: 2px;
}

.spore-ring-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 14px;
}

.spore-ring-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.spore-ring-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffd700;
  border: 2px solid #100d07;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 215, 0, 0.5);
  transition: transform 0.15s;
}

.spore-ring-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#100d07] to-[#030201] border border-[#d4af37]/15 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="spore-ring-sandbox-container">
  <div class="relative w-40 h-40 flex items-center justify-center">
    <canvas class="spore-ring-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-10">
      <span class="spore-percent font-sans text-2xl font-extrabold text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">0%</span>
      <span class="font-mono text-[8px] text-[#d4af37]/45 tracking-wider mt-0.5">HARVESTING</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-3.5">
    <input type="range" class="spore-ring-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ffd700] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#100d07] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="65" />
  </div>
</div>`,
  prompt: 'Design a radial progress dial component coiling glowing bioluminescent spore particles along its circular active track.'
};
