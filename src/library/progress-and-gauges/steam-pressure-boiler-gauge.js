/**
 * Component: Steam Pressure Boiler Gauge
 * Category: progress-and-gauges
 */

export const component = {
  id: 'steam-pressure-boiler-gauge',
  name: 'Steam Pressure Boiler Gauge',
  category: 'progress-and-gauges',
  tag: 'Creative',
  html: `<div class="steam-gauge-sandbox" id="steam-gauge-sandbox-container">
  <div class="steam-gauge-wrapper">
    <canvas class="steam-gauge-canvas"></canvas>
    <div class="steam-gauge-info">
      <span class="steam-title">BOILER PRESSURE</span>
      <span class="steam-val">0%</span>
    </div>
  </div>
  
  <div class="steam-gauge-controls">
    <input type="range" class="steam-gauge-slider" min="0" max="100" value="70" />
  </div>
</div>`,
  js: `// Steam Pressure Boiler Gauge Canvas Animation Logic
const canvas = document.querySelector('.steam-gauge-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.steam-gauge-slider');
  const valLabel = document.querySelector('.steam-val');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let steamParticles = [];
  
  canvas.width = 180;
  canvas.height = 180;
  
  class SteamPuff {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * (Math.random() * 2 + 1);
      this.vy = Math.sin(angle) * (Math.random() * 2 + 1) - 0.5;
      this.size = Math.random() * 4 + 2;
      this.alpha = 0.8;
      this.decay = Math.random() * 0.03 + 0.02;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.size += 0.2; // Expand steam
      this.alpha -= this.decay;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = 'rgba(220, 220, 220, 0.3)';
      ctx.filter = 'blur(2px)';
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
    const radius = 64;
    
    // Smooth value interpolation
    currentVal += (targetVal - currentVal) * 0.12;
    valLabel.textContent = \`\${Math.round(currentVal)}%\`;
    
    // High pressure vibration multiplier
    const pressureRatio = currentVal / 100;
    const vibration = pressureRatio > 0.8 ? (Math.random() - 0.5) * 3 * pressureRatio : 0;
    
    const startAngle = Math.PI * 0.75;
    const endAngleLimit = Math.PI * 2.25;
    const activeAngle = startAngle + pressureRatio * (Math.PI * 1.5);
    
    // 1. Draw outer brass containment dial frame
    ctx.save();
    ctx.strokeStyle = '#8b5a2b'; // Deep brass border
    ctx.lineWidth = 6;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
    ctx.stroke();
    
    // Internal backing plate
    ctx.fillStyle = '#1e1610';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // 2. Dial face markings (Steampunk mechanical sectors)
    ctx.save();
    ctx.strokeStyle = 'rgba(218, 165, 32, 0.15)'; // Gold markings
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 8, startAngle, endAngleLimit);
    ctx.stroke();
    
    // Draw critical red zone at the end
    ctx.strokeStyle = '#ff3c00';
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 8, startAngle + (Math.PI * 1.5) * 0.8, endAngleLimit);
    ctx.stroke();
    ctx.restore();
    
    // 3. Emit steam puffs from pressure valves when active
    if (pressureRatio > 0.1) {
      const spawnChance = pressureRatio > 0.8 ? 0.4 : 0.08;
      if (Math.random() < spawnChance) {
        // Emit from top-left/top-right virtual release vents
        const angle = pressureRatio > 0.8 ? -Math.PI / 2 + (Math.random() - 0.5) * 0.5 : -Math.PI / 4;
        steamParticles.push(new SteamPuff(cx + 40, cy - 40, angle));
      }
    }
    
    // Update and draw steam
    for (let i = steamParticles.length - 1; i >= 0; i--) {
      const p = steamParticles[i];
      p.update();
      if (p.alpha <= 0) {
        steamParticles.splice(i, 1);
      } else {
        p.draw();
      }
    }
    
    // 4. Vibrant mechanical needle with high-pressure vibration wobble
    ctx.save();
    ctx.translate(cx + vibration, cy + vibration);
    ctx.rotate(activeAngle);
    
    // Draw copper needle
    ctx.strokeStyle = '#ff4500';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(radius - 12, 0);
    ctx.stroke();
    
    // Brass pivot cap
    ctx.fillStyle = '#daa520';
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
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
const canvas = document.querySelector('.steam-gauge-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.steam-gauge-slider') as HTMLInputElement;
  const valLabel = document.querySelector('.steam-val') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let steamParticles: SteamPuff[] = [];
    
    canvas.width = 180;
    canvas.height = 180;
    
    class SteamPuff {
      x: number; y: number; vx: number; vy: number; size: number; alpha: number; decay: number;
      constructor(x: number, y: number, angle: number) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * (Math.random() * 2 + 1);
        this.vy = Math.sin(angle) * (Math.random() * 2 + 1) - 0.5;
        this.size = Math.random() * 4 + 2;
        this.alpha = 0.8;
        this.decay = Math.random() * 0.03 + 0.02;
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
        ctx.fillStyle = 'rgba(220, 220, 220, 0.3)';
        if ('filter' in ctx) {
          (ctx as any).filter = 'blur(2px)';
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
      const cy = canvas.height / 2;
      const radius = 64;
      
      currentVal += (targetVal - currentVal) * 0.12;
      valLabel.textContent = \`\${Math.round(currentVal)}%\`;
      
      const pressureRatio = currentVal / 100;
      const vibration = pressureRatio > 0.8 ? (Math.random() - 0.5) * 3 * pressureRatio : 0;
      
      const startAngle = Math.PI * 0.75;
      const endAngleLimit = Math.PI * 2.25;
      const activeAngle = startAngle + pressureRatio * (Math.PI * 1.5);
      
      ctx.save();
      ctx.strokeStyle = '#8b5a2b';
      ctx.lineWidth = 6;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.fillStyle = '#1e1610';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      ctx.save();
      ctx.strokeStyle = 'rgba(218, 165, 32, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 8, startAngle, endAngleLimit);
      ctx.stroke();
      
      ctx.strokeStyle = '#ff3c00';
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 8, startAngle + (Math.PI * 1.5) * 0.8, endAngleLimit);
      ctx.stroke();
      ctx.restore();
      
      if (pressureRatio > 0.1) {
        const spawnChance = pressureRatio > 0.8 ? 0.4 : 0.08;
        if (Math.random() < spawnChance) {
          const angle = pressureRatio > 0.8 ? -Math.PI / 2 + (Math.random() - 0.5) * 0.5 : -Math.PI / 4;
          steamParticles.push(new SteamPuff(cx + 40, cy - 40, angle));
        }
      }
      
      for (let i = steamParticles.length - 1; i >= 0; i--) {
        const p = steamParticles[i];
        p.update();
        if (p.alpha <= 0) {
          steamParticles.splice(i, 1);
        } else {
          p.draw();
        }
      }
      
      ctx.save();
      ctx.translate(cx + vibration, cy + vibration);
      ctx.rotate(activeAngle);
      
      ctx.strokeStyle = '#ff4500';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(radius - 12, 0);
      ctx.stroke();
      
      ctx.fillStyle = '#daa520';
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
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
  css: `/* Steam Pressure Boiler Gauge styles */
.steam-gauge-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #1b120a 0%, #030201 100%);
  border: 1px solid rgba(139, 90, 43, 0.2);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.steam-gauge-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.steam-gauge-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.steam-gauge-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
  margin-top: 36px;
}

.steam-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(218, 165, 32, 0.4);
  letter-spacing: 1px;
}

.steam-val {
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #ff4500;
  text-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
  margin-top: 2px;
}

.steam-gauge-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 8px;
}

.steam-gauge-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.steam-gauge-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff4500;
  border: 2px solid #1b120a;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 69, 0, 0.5);
  transition: transform 0.15s;
}

.steam-gauge-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#1b120a] to-[#030201] border border-amber-800/20 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="steam-gauge-sandbox-container">
  <div class="relative w-[180px] h-[180px] flex items-center justify-center">
    <canvas class="steam-gauge-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-20 mt-9">
      <span class="font-mono text-[7.5px] text-[#daa520]/40 tracking-wider">BOILER PRESSURE</span>
      <span class="steam-val font-sans text-xl font-extrabold text-[#ff4500] drop-shadow-[0_0_10px_rgba(255,69,0,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-2">
    <input type="range" class="steam-gauge-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff4500] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1b120a] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="70" />
  </div>
</div>`,
  prompt: 'Design a brass steampunk boiler circular gauge with a vibrating copper needle at high values and emitting expanding steam particles.'
};
