/**
 * Component: Ethereal Smoke Gauge
 * Category: progress-and-gauges
 */

export const component = {
  id: 'ethereal-smoke-gauge',
  name: 'Ethereal Smoke Gauge',
  category: 'progress-and-gauges',
  tag: 'Creative',
  html: `<div class="smoke-gauge-sandbox" id="smoke-gauge-sandbox-container">
  <div class="smoke-gauge-wrapper">
    <canvas class="smoke-gauge-canvas"></canvas>
    <div class="smoke-gauge-info">
      <span class="smoke-gauge-title">AURA DENSITY</span>
      <span class="smoke-gauge-percent">0%</span>
    </div>
  </div>
  
  <div class="smoke-gauge-controls">
    <input type="range" class="smoke-gauge-slider" min="0" max="100" value="50" />
  </div>
</div>`,
  js: `// Ethereal Smoke Gauge Canvas Animation Logic
const container = document.querySelector('.smoke-gauge-sandbox');
if (container) {
  const canvas = container.querySelector('.smoke-gauge-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.smoke-gauge-slider');
  const percentText = container.querySelector('.smoke-gauge-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let smokeParticles = [];
  
  canvas.width = 240;
  canvas.height = 140;
  
  class SmokeParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 6;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = -Math.random() * 0.7 - 0.3; // Rise upward
      this.alpha = 0.6;
      this.decay = Math.random() * 0.012 + 0.008;
      // Morph color: transition teal to violet
      this.color = Math.random() < 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(138, 43, 226, ';
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.size += 0.2; // Expand
      this.alpha -= this.decay;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color + '0.25)';
      ctx.filter = 'blur(4px)';
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
    const cy = canvas.height - 20;
    const radius = 80;
    
    // Smooth value interpolation
    currentVal += (targetVal - currentVal) * 0.12;
    percentText.textContent = \`\${Math.round(currentVal)}%\`;
    
    const startAngle = Math.PI; // Standard semi-circular gauge start (left)
    const endAngleLimit = Math.PI * 2; // Right end
    const activeAngle = startAngle + (currentVal / 100) * Math.PI;
    
    // 1. Ambient Background Arch Track
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngleLimit);
    ctx.stroke();
    ctx.restore();
    
    // 2. Active Glowing Trail Arch Segment
    ctx.save();
    const grad = ctx.createLinearGradient(cx - radius, 0, cx + radius, 0);
    grad.addColorStop(0, '#00f2fe'); // Teal left
    grad.addColorStop(1, '#8a2be2'); // Violet right
    
    ctx.strokeStyle = grad;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, activeAngle);
    ctx.stroke();
    ctx.restore();
    
    // 3. Ethereal smoke particles spawning from needle tip
    const needleX = cx + Math.cos(activeAngle) * radius;
    const needleY = cy + Math.sin(activeAngle) * radius;
    
    if (Math.abs(targetVal - currentVal) > 0.2 || Math.random() < 0.35) {
      smokeParticles.push(new SmokeParticle(needleX, needleY));
    }
    
    // Update and draw smoke
    for (let i = smokeParticles.length - 1; i >= 0; i--) {
      const p = smokeParticles[i];
      p.update();
      if (p.alpha <= 0) {
        smokeParticles.splice(i, 1);
      } else {
        p.draw();
      }
    }
    
    // 4. Elegant needle pointer
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(activeAngle);
    
    // Needle body
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius - 6, 0);
    ctx.stroke();
    
    // Center cap ring
    ctx.fillStyle = '#00f2fe';
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#00f2fe';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    animId = requestAnimationFrame(animate);
  };
  
  slider.addEventListener('input', () => {
    targetVal = parseInt(slider.value, 10);
  });
  
  animate();
}`,
  ts: `// TypeScript Implementation
const container = document.querySelector('.smoke-gauge-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.smoke-gauge-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.smoke-gauge-slider') as HTMLInputElement;
  const percentText = container.querySelector('.smoke-gauge-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let smokeParticles: SmokeParticle[] = [];
    
    canvas.width = 240;
    canvas.height = 140;
    
    class SmokeParticle {
      x: number; y: number; size: number; vx: number; vy: number; alpha: number; decay: number; color: string;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 6;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = -Math.random() * 0.7 - 0.3;
        this.alpha = 0.6;
        this.decay = Math.random() * 0.012 + 0.008;
        this.color = Math.random() < 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(138, 43, 226, ';
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += 0.2;
        this.alpha -= this.decay;
      }
      
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color + '0.25)';
        if ('filter' in ctx) {
          (ctx as any).filter = 'blur(4px)';
        }
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
      const cy = canvas.height - 20;
      const radius = 80;
      
      currentVal += (targetVal - currentVal) * 0.12;
      percentText.textContent = \`\${Math.round(currentVal)}%\`;
      
      const startAngle = Math.PI;
      const endAngleLimit = Math.PI * 2;
      const activeAngle = startAngle + (currentVal / 100) * Math.PI;
      
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngleLimit);
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      const grad = ctx.createLinearGradient(cx - radius, 0, cx + radius, 0);
      grad.addColorStop(0, '#00f2fe');
      grad.addColorStop(1, '#8a2be2');
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, activeAngle);
      ctx.stroke();
      ctx.restore();
      
      const needleX = cx + Math.cos(activeAngle) * radius;
      const needleY = cy + Math.sin(activeAngle) * radius;
      
      if (Math.abs(targetVal - currentVal) > 0.2 || Math.random() < 0.35) {
        smokeParticles.push(new SmokeParticle(needleX, needleY));
      }
      
      for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const p = smokeParticles[i];
        p.update();
        if (p.alpha <= 0) {
          smokeParticles.splice(i, 1);
        } else {
          p.draw();
        }
      }
      
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(activeAngle);
      
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius - 6, 0);
      ctx.stroke();
      
      ctx.fillStyle = '#00f2fe';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00f2fe';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      animId = requestAnimationFrame(animate);
    };
    
    slider.addEventListener('input', () => {
      targetVal = parseInt(slider.value, 10);
    });
    
    animate();
  }
}`,
  css: `/* Ethereal Smoke Gauge styles */
.smoke-gauge-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #07030e 0%, #010003 100%);
  border: 1px solid rgba(138, 43, 226, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.smoke-gauge-wrapper {
  position: relative;
  width: 240px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.smoke-gauge-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.smoke-gauge-info {
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.smoke-gauge-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.smoke-gauge-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #00f2fe;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
  margin-top: 1px;
}

.smoke-gauge-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 14px;
}

.smoke-gauge-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.smoke-gauge-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #8a2be2;
  border: 2px solid #07030e;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(138, 43, 226, 0.5);
  transition: transform 0.15s;
}

.smoke-gauge-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#07030e] to-[#010003] border border-purple-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="smoke-gauge-sandbox-container">
  <div class="relative w-[240px] h-[140px] flex items-center justify-center">
    <canvas class="smoke-gauge-canvas absolute inset-0"></canvas>
    <div class="absolute bottom-0 flex flex-col items-center pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">AURA DENSITY</span>
      <span class="smoke-gauge-percent font-sans text-lg font-extrabold text-[#00f2fe] drop-shadow-[0_0_10px_rgba(0,242,254,0.5)] mt-px">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-3.5">
    <input type="range" class="smoke-gauge-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8a2be2] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#07030e] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="50" />
  </div>
</div>`,
  prompt: 'Design a semi-circular speedometer aura gauge with a sweeping white dial leaving expanding and fading purple-to-teal canvas smoke trails.'
};
