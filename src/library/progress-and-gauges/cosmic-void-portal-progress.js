/**
 * Component: Cosmic Void Portal Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'cosmic-void-portal-progress',
  name: 'Cosmic Void Portal Progress',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="void-portal-sandbox" id="void-portal-sandbox-container">
  <div class="void-portal-wrapper">
    <canvas class="void-portal-canvas"></canvas>
    <div class="void-portal-info">
      <span class="void-title">SINGULARITY FORCE</span>
      <span class="void-percent">0%</span>
    </div>
  </div>
  
  <div class="void-portal-controls">
    <input type="range" class="void-portal-slider" min="0" max="100" value="50" />
  </div>
</div>`,
  js: `// Cosmic Void Portal Progress Canvas Animation Logic
const canvas = document.querySelector('.void-portal-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.void-portal-slider');
  const percentText = document.querySelector('.void-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let stars = [];
  let portalRotation = 0;
  
  canvas.width = 160;
  canvas.height = 160;
  
  class PortalStar {
    constructor() {
      this.angle = Math.random() * Math.PI * 2;
      this.distance = Math.random() * 80 + 40;
      this.speed = Math.random() * 0.03 + 0.01;
      this.size = Math.random() * 1.8 + 0.5;
      this.color = Math.random() < 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(121, 40, 202, ';
    }
    
    update(force) {
      // Pull particles closer to center as gravity increases
      this.distance -= force * 1.2 + 0.1;
      this.angle += this.speed * (1.0 + force * 2.0);
      
      if (this.distance < 10) {
        this.distance = Math.random() * 40 + 60;
        this.angle = Math.random() * Math.PI * 2;
      }
    }
    
    draw(cx, cy) {
      const x = cx + Math.cos(this.angle) * this.distance;
      const y = cy + Math.sin(this.angle) * this.distance;
      const alpha = Math.min(1.0, (this.distance - 10) / 40);
      
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = this.color + alpha + ')';
      ctx.beginPath();
      ctx.arc(x, y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  
  // Initialize stars
  for (let i = 0; i < 60; i++) {
    stars.push(new PortalStar());
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
    
    const forceRatio = currentVal / 100;
    portalRotation += 0.02 + forceRatio * 0.05;
    
    // Draw spiral void backdrop
    ctx.save();
    const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 60);
    grad.addColorStop(0, '#000000'); // Event horizon center
    grad.addColorStop(0.3, 'rgba(121, 40, 202, 0.45)'); // Violet aura
    grad.addColorStop(0.8, 'rgba(0, 242, 254, 0.1)'); // Teal edge
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // Update and draw orbital stardust
    stars.forEach(star => {
      star.update(forceRatio);
      star.draw(cx, cy);
    });
    
    // Draw outer active accretion disc ring
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, 65, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(0, 242, 254, 0.6)';
    ctx.beginPath();
    ctx.arc(cx, cy, 65, -Math.PI / 2, -Math.PI / 2 + forceRatio * Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    
    animId = requestAnimationFrame(animate);
  };
  
  slider.addEventListener('input', () => {
    targetVal = parseInt(slider.value, 10);
  });
  
  animate();
}`,
  ts: `// TypeScript Implementation
const canvas = document.querySelector('.void-portal-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.void-portal-slider') as HTMLInputElement;
  const percentText = document.querySelector('.void-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let stars: PortalStar[] = [];
    let portalRotation = 0;
    
    canvas.width = 160;
    canvas.height = 160;
    
    class PortalStar {
      angle: number; distance: number; speed: number; size: number; color: string;
      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = Math.random() * 80 + 40;
        this.speed = Math.random() * 0.03 + 0.01;
        this.size = Math.random() * 1.8 + 0.5;
        this.color = Math.random() < 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(121, 40, 202, ';
      }
      
      update(force: number) {
        this.distance -= force * 1.2 + 0.1;
        this.angle += this.speed * (1.0 + force * 2.0);
        if (this.distance < 10) {
          this.distance = Math.random() * 40 + 60;
          this.angle = Math.random() * Math.PI * 2;
        }
      }
      
      draw(cx: number, cy: number) {
        if (!ctx) return;
        const x = cx + Math.cos(this.angle) * this.distance;
        const y = cy + Math.sin(this.angle) * this.distance;
        const alpha = Math.min(1.0, (this.distance - 10) / 40);
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color + alpha + ')';
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    for (let i = 0; i < 60; i++) {
      stars.push(new PortalStar());
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
      
      const forceRatio = currentVal / 100;
      portalRotation += 0.02 + forceRatio * 0.05;
      
      ctx.save();
      const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 60);
      grad.addColorStop(0, '#000000');
      grad.addColorStop(0.3, 'rgba(121, 40, 202, 0.45)');
      grad.addColorStop(0.8, 'rgba(0, 242, 254, 0.1)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      stars.forEach(star => {
        star.update(forceRatio);
        star.draw(cx, cy);
      });
      
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.6)';
      ctx.beginPath();
      ctx.arc(cx, cy, 65, -Math.PI / 2, -Math.PI / 2 + forceRatio * Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      
      animId = requestAnimationFrame(animate);
    };
    
    slider.addEventListener('input', () => {
      targetVal = parseInt(slider.value, 10);
    });
    
    animate();
  }
}`,
  css: `/* Cosmic Void Portal Progress styles */
.void-portal-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #05010a 0%, #000000 100%);
  border: 1px solid rgba(121, 40, 202, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.void-portal-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.void-portal-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.void-portal-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.void-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.void-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.6);
  margin-top: 2px;
}

.void-portal-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 14px;
}

.void-portal-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.void-portal-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00f2fe;
  border: 2px solid #05010a;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 242, 254, 0.5);
  transition: transform 0.15s;
}

.void-portal-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#05010a] to-[#000000] border border-purple-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="void-portal-sandbox-container">
  <div class="relative w-40 h-40 flex items-center justify-center">
    <canvas class="void-portal-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-20">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">SINGULARITY FORCE</span>
      <span class="void-percent font-sans text-2xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,242,254,0.6)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-3.5">
    <input type="range" class="void-portal-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00f2fe] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#05010a] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="50" />
  </div>
</div>`,
  prompt: 'Design a spherical wormhole singularity void portal progress dial with stardust particles spiraling into a deep black core.'
};
