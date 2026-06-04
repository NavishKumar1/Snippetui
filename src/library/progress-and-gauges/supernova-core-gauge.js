/**
 * Component: Supernova Core Blast Gauge
 * Category: progress-and-gauges
 */

export const component = {
  id: 'supernova-core-gauge',
  name: 'Supernova Core Blast Gauge',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="supernova-gauge-sandbox" id="supernova-gauge-sandbox-container">
  <div class="supernova-gauge-wrapper">
    <canvas class="supernova-gauge-canvas"></canvas>
    <div class="supernova-gauge-info">
      <span class="supernova-title">THERMONUCLEAR CORE</span>
      <span class="supernova-percent">0%</span>
    </div>
  </div>
  
  <div class="supernova-gauge-controls">
    <input type="range" class="supernova-gauge-slider" min="0" max="100" value="65" />
  </div>
</div>`,
  js: `// Supernova Core Blast Gauge Canvas Logic
const canvas = document.querySelector('.supernova-gauge-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.supernova-gauge-slider');
  const percentText = document.querySelector('.supernova-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let particleFlares = [];
  let flareAngle = 0;
  
  canvas.width = 180;
  canvas.height = 180;
  
  class StellarFlare {
    constructor(x, y, vx, vy, color) {
      this.x = x;
      this.y = y;
      this.vx = vx * (Math.random() * 1.5 + 0.5);
      this.vy = vy * (Math.random() * 1.5 + 0.5);
      this.size = Math.random() * 3 + 1.5;
      this.alpha = 1.0;
      this.decay = Math.random() * 0.04 + 0.02;
      this.color = color;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
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
    
    // Smooth value interpolation
    currentVal += (targetVal - currentVal) * 0.12;
    percentText.textContent = \`\${Math.round(currentVal)}%\`;
    
    flareAngle += 0.02;
    
    // Determine dynamic color matching the thermonuclear intensity
    // 0-30% = Cyan/Indigo, 30-70% = Purple/Magenta, 70-100% = Orange/Gold/White
    let baseColor = '#00f2fe';
    let glowColor = 'rgba(0, 242, 254, 0.4)';
    if (currentVal > 70) {
      baseColor = '#ffb800'; // Sun Gold
      glowColor = 'rgba(255, 184, 0, 0.45)';
    } else if (currentVal > 30) {
      baseColor = '#9b51e0'; // Purple/Violet
      glowColor = 'rgba(155, 81, 224, 0.4)';
    }
    
    // Draw concentric plasma containment fields (outer orbits)
    const activeRadius = 40 + (currentVal / 100) * 22;
    
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 65, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.strokeStyle = glowColor;
    ctx.shadowBlur = 8;
    ctx.shadowColor = baseColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // Partially rotate outer arc matching scale
    ctx.arc(cx, cy, activeRadius + 6, flareAngle, flareAngle + (currentVal / 100) * Math.PI * 1.5);
    ctx.stroke();
    ctx.restore();
    
    // 2. Draw star core orb
    ctx.save();
    ctx.shadowBlur = 24;
    ctx.shadowColor = baseColor;
    
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, activeRadius);
    if (currentVal > 70) {
      coreGrad.addColorStop(0, '#ffffff'); // Supernova white-hot core
      coreGrad.addColorStop(0.3, '#ffcc00'); // Gold heat
      coreGrad.addColorStop(0.7, '#ff3c00'); // Hot orange
      coreGrad.addColorStop(1, '#9e0d00'); // Molten dark red limit
    } else if (currentVal > 30) {
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.4, '#a855f7');
      coreGrad.addColorStop(0.8, '#6366f1');
      coreGrad.addColorStop(1, '#1e1b4b');
    } else {
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.4, '#00f2fe');
      coreGrad.addColorStop(0.8, '#004b96');
      coreGrad.addColorStop(1, '#020e1a');
    }
    
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, activeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // 3. Spawn stellar flare particles exploding from core boundaries
    if (currentVal > 5) {
      const spawnChance = currentVal > 70 ? 0.35 : (currentVal > 30 ? 0.18 : 0.08);
      if (Math.random() < spawnChance) {
        const angle = Math.random() * Math.PI * 2;
        const startX = cx + Math.cos(angle) * activeRadius;
        const startY = cy + Math.sin(angle) * activeRadius;
        const vx = Math.cos(angle) * (0.8 + (currentVal / 100) * 1.5);
        const vy = Math.sin(angle) * (0.8 + (currentVal / 100) * 1.5);
        
        let particleColor = '#00f2fe';
        if (currentVal > 70) {
          particleColor = Math.random() < 0.6 ? '#ff8000' : '#ffd700';
        } else if (currentVal > 30) {
          particleColor = Math.random() < 0.6 ? '#c084fc' : '#818cf8';
        }
        
        particleFlares.push(new StellarFlare(startX, startY, vx, vy, particleColor));
      }
    }
    
    // Update and draw flares
    for (let i = particleFlares.length - 1; i >= 0; i--) {
      const p = particleFlares[i];
      p.update();
      if (p.alpha <= 0) {
        particleFlares.splice(i, 1);
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
const canvas = document.querySelector('.supernova-gauge-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.supernova-gauge-slider') as HTMLInputElement;
  const percentText = document.querySelector('.supernova-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let particleFlares: StellarFlare[] = [];
    let flareAngle = 0;
    
    canvas.width = 180;
    canvas.height = 180;
    
    class StellarFlare {
      x: number; y: number; vx: number; vy: number; size: number; alpha: number; decay: number; color: string;
      constructor(x: number, y: number, vx: number, vy: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = vx * (Math.random() * 1.5 + 0.5);
        this.vy = vy * (Math.random() * 1.5 + 0.5);
        this.size = Math.random() * 3 + 1.5;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.04 + 0.02;
        this.color = color;
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
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
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
      
      currentVal += (targetVal - currentVal) * 0.12;
      percentText.textContent = \`\${Math.round(currentVal)}%\`;
      flareAngle += 0.02;
      
      let baseColor = '#00f2fe';
      let glowColor = 'rgba(0, 242, 254, 0.4)';
      if (currentVal > 70) {
        baseColor = '#ffb800';
        glowColor = 'rgba(255, 184, 0, 0.45)';
      } else if (currentVal > 30) {
        baseColor = '#9b51e0';
        glowColor = 'rgba(155, 81, 224, 0.4)';
      }
      
      const activeRadius = 40 + (currentVal / 100) * 22;
      
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = glowColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = baseColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, activeRadius + 6, flareAngle, flareAngle + (currentVal / 100) * Math.PI * 1.5);
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      ctx.shadowBlur = 24;
      ctx.shadowColor = baseColor;
      
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, activeRadius);
      if (currentVal > 70) {
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.3, '#ffcc00');
        coreGrad.addColorStop(0.7, '#ff3c00');
        coreGrad.addColorStop(1, '#9e0d00');
      } else if (currentVal > 30) {
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.4, '#a855f7');
        coreGrad.addColorStop(0.8, '#6366f1');
        coreGrad.addColorStop(1, '#1e1b4b');
      } else {
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.4, '#00f2fe');
        coreGrad.addColorStop(0.8, '#004b96');
        coreGrad.addColorStop(1, '#020e1a');
      }
      
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, activeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      if (currentVal > 5) {
        const spawnChance = currentVal > 70 ? 0.35 : (currentVal > 30 ? 0.18 : 0.08);
        if (Math.random() < spawnChance) {
          const angle = Math.random() * Math.PI * 2;
          const startX = cx + Math.cos(angle) * activeRadius;
          const startY = cy + Math.sin(angle) * activeRadius;
          const vx = Math.cos(angle) * (0.8 + (currentVal / 100) * 1.5);
          const vy = Math.sin(angle) * (0.8 + (currentVal / 100) * 1.5);
          
          let particleColor = '#00f2fe';
          if (currentVal > 70) {
            particleColor = Math.random() < 0.6 ? '#ff8000' : '#ffd700';
          } else if (currentVal > 30) {
            particleColor = Math.random() < 0.6 ? '#c084fc' : '#818cf8';
          }
          
          particleFlares.push(new StellarFlare(startX, startY, vx, vy, particleColor));
        }
      }
      
      for (let i = particleFlares.length - 1; i >= 0; i--) {
        const p = particleFlares[i];
        p.update();
        if (p.alpha <= 0) {
          particleFlares.splice(i, 1);
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
  css: `/* Supernova Core Blast Gauge styles */
.supernova-gauge-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #0b0210 0%, #000000 100%);
  border: 1px solid rgba(155, 81, 224, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.supernova-gauge-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.supernova-gauge-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.supernova-gauge-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.supernova-title {
  font-family: monospace;
  font-size: 7px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1px;
}

.supernova-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.7);
  margin-top: 2px;
}

.supernova-gauge-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 8px;
}

.supernova-gauge-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.supernova-gauge-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a855f7;
  border: 2px solid #0b0210;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(168, 85, 247, 0.5);
  transition: transform 0.15s;
}

.supernova-gauge-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#0b0210] to-[#000000] border border-purple-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="supernova-gauge-sandbox-container">
  <div class="relative w-[180px] h-[180px] flex items-center justify-center">
    <canvas class="supernova-gauge-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-20">
      <span class="font-mono text-[7px] text-white/25 tracking-wider">THERMONUCLEAR CORE</span>
      <span class="supernova-percent font-sans text-2xl font-extrabold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-2">
    <input type="range" class="supernova-gauge-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#a855f7] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0b0210] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="65" />
  </div>
</div>`,
  prompt: 'Design a spherical supernova core nuclear progress gauge component scaling and changing core colors from cyan to blazing orange white-hot core, firing solar plasma flares.'
};
