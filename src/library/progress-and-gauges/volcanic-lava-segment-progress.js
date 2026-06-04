/**
 * Component: Volcanic Lava Segment Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'volcanic-lava-segment-progress',
  name: 'Volcanic Lava Segment Progress',
  category: 'progress-and-gauges',
  tag: 'Creative',
  html: `<div class="lava-progress-sandbox" id="lava-progress-sandbox-container">
  <div class="lava-progress-wrapper">
    <canvas class="lava-progress-canvas"></canvas>
    <div class="lava-progress-info">
      <span class="lava-percent-label">CORE TEMPERATURE</span>
      <span class="lava-percent">0%</span>
    </div>
  </div>
  
  <div class="lava-progress-controls">
    <input type="range" class="lava-progress-slider" min="0" max="100" value="65" />
  </div>
</div>`,
  js: `// Volcanic Lava Segment Progress Canvas Logic
const container = document.querySelector('.lava-progress-sandbox');
if (container) {
  const canvas = container.querySelector('.lava-progress-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.lava-progress-slider');
  const percentText = container.querySelector('.lava-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let ashParticles = [];
  let lavaHeatTime = 0;
  
  canvas.width = 300;
  canvas.height = 100;
  
  class Ash {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 0.8;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = -Math.random() * 0.8 - 0.5; // Upward drift
      this.alpha = 1.0;
      this.decay = Math.random() * 0.03 + 0.015;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#ff7f00';
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#ff3c00';
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
    percentText.textContent = \`\${Math.round(currentVal)}%\`;
    
    lavaHeatTime += 0.05;
    
    const segments = 10;
    const trackH = 16;
    const trackY = h - trackH - 24;
    const segGap = 6;
    const segW = (w - (segGap * (segments - 1))) / segments;
    
    // Draw volcanic rock segments
    for (let i = 0; i < segments; i++) {
      const segX = i * (segW + segGap);
      const segValStart = i * (100 / segments);
      const segValEnd = (i + 1) * (100 / segments);
      
      // Calculate fill amount for this specific segment
      let fillRatio = 0;
      if (currentVal >= segValEnd) {
        fillRatio = 1;
      } else if (currentVal > segValStart) {
        fillRatio = (currentVal - segValStart) / (100 / segments);
      }
      
      // 1. Draw segment background frame (rough dark basalt rock)
      ctx.save();
      ctx.fillStyle = '#181210';
      ctx.strokeStyle = '#2d2420';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(segX, trackY, segW, trackH, 4) : ctx.rect(segX, trackY, segW, trackH);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      
      // 2. Draw glowing active magma inside basalt
      if (fillRatio > 0) {
        const magmaW = segW * fillRatio;
        
        ctx.save();
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(segX + 1, trackY + 1, segW - 2, trackH - 2, 3) : ctx.rect(segX + 1, trackY + 1, segW - 2, trackH - 2);
        ctx.clip(); // Mask within segment bounds
        
        // Heat fluid waves gradient
        const grad = ctx.createLinearGradient(segX, 0, segX + segW, 0);
        const heatPulse = Math.sin(lavaHeatTime + i) * 20;
        
        grad.addColorStop(0, '#ff3c00'); // Molten red
        grad.addColorStop(0.5, '#ff8000'); // Heat orange
        grad.addColorStop(1, '#ffcc00'); // Boiling yellow
        
        ctx.fillStyle = grad;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff3c00';
        ctx.fillRect(segX, trackY, magmaW, trackH);
        
        // Bubbles inside magma
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.35;
        const bubbleX = segX + Math.abs(Math.sin(lavaHeatTime + i * 2)) * (segW - 6) + 3;
        const bubbleY = trackY + Math.abs(Math.cos(lavaHeatTime + i)) * (trackH - 6) + 3;
        ctx.beginPath();
        ctx.arc(bubbleX, bubbleY, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
        
        // Spawn sparks/ash at active segment threshold
        if (fillRatio > 0.1 && fillRatio < 0.95 && Math.random() < 0.22) {
          const spawnX = segX + magmaW;
          ashParticles.push(new Ash(spawnX, trackY + trackH / 2));
        }
      }
    }
    
    // Update and draw ash sparks
    for (let i = ashParticles.length - 1; i >= 0; i--) {
      const p = ashParticles[i];
      p.update();
      if (p.alpha <= 0 || p.y < 0) {
        ashParticles.splice(i, 1);
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
const container = document.querySelector('.lava-progress-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.lava-progress-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.lava-progress-slider') as HTMLInputElement;
  const percentText = container.querySelector('.lava-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let ashParticles: Ash[] = [];
    let lavaHeatTime = 0;
    
    canvas.width = 300;
    canvas.height = 100;
    
    class Ash {
      x: number; y: number; size: number; vx: number; vy: number; alpha: number; decay: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = -Math.random() * 0.8 - 0.5;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.03 + 0.015;
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
        ctx.fillStyle = '#ff7f00';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#ff3c00';
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
      percentText.textContent = \`\${Math.round(currentVal)}%\`;
      lavaHeatTime += 0.05;
      
      const segments = 10;
      const trackH = 16;
      const trackY = h - trackH - 24;
      const segGap = 6;
      const segW = (w - (segGap * (segments - 1))) / segments;
      
      for (let i = 0; i < segments; i++) {
        const segX = i * (segW + segGap);
        const segValStart = i * (100 / segments);
        const segValEnd = (i + 1) * (100 / segments);
        
        let fillRatio = 0;
        if (currentVal >= segValEnd) {
          fillRatio = 1;
        } else if (currentVal > segValStart) {
          fillRatio = (currentVal - segValStart) / (100 / segments);
        }
        
        ctx.save();
        ctx.fillStyle = '#181210';
        ctx.strokeStyle = '#2d2420';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if ('roundRect' in ctx) {
          (ctx as any).roundRect(segX, trackY, segW, trackH, 4);
        } else {
          ctx.rect(segX, trackY, segW, trackH);
        }
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        
        if (fillRatio > 0) {
          const magmaW = segW * fillRatio;
          
          ctx.save();
          ctx.beginPath();
          if ('roundRect' in ctx) {
            (ctx as any).roundRect(segX + 1, trackY + 1, segW - 2, trackH - 2, 3);
          } else {
            ctx.rect(segX + 1, trackY + 1, segW - 2, trackH - 2);
          }
          ctx.clip();
          
          const grad = ctx.createLinearGradient(segX, 0, segX + segW, 0);
          grad.addColorStop(0, '#ff3c00');
          grad.addColorStop(0.5, '#ff8000');
          grad.addColorStop(1, '#ffcc00');
          
          ctx.fillStyle = grad;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#ff3c00';
          ctx.fillRect(segX, trackY, magmaW, trackH);
          
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.35;
          const bubbleX = segX + Math.abs(Math.sin(lavaHeatTime + i * 2)) * (segW - 6) + 3;
          const bubbleY = trackY + Math.abs(Math.cos(lavaHeatTime + i)) * (trackH - 6) + 3;
          ctx.beginPath();
          ctx.arc(bubbleX, bubbleY, 1.5, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
          
          if (fillRatio > 0.1 && fillRatio < 0.95 && Math.random() < 0.22) {
            const spawnX = segX + magmaW;
            ashParticles.push(new Ash(spawnX, trackY + trackH / 2));
          }
        }
      }
      
      for (let i = ashParticles.length - 1; i >= 0; i--) {
        const p = ashParticles[i];
        p.update();
        if (p.alpha <= 0 || p.y < 0) {
          ashParticles.splice(i, 1);
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
  css: `/* Volcanic Lava Segment Progress styles */
.lava-progress-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #150602 0%, #030100 100%);
  border: 1px solid rgba(255, 60, 0, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.lava-progress-wrapper {
  position: relative;
  width: 300px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lava-progress-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.lava-progress-info {
  position: absolute;
  top: 6px;
  left: 6px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
}

.lava-percent-label {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.lava-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #ff3c00;
  text-shadow: 0 0 10px rgba(255, 60, 0, 0.5);
  margin-top: 2px;
}

.lava-progress-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 24px;
}

.lava-progress-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.lava-progress-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff3c00;
  border: 2px solid #150602;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 60, 0, 0.5);
  transition: transform 0.15s;
}

.lava-progress-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#150602] to-[#030100] border border-red-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="lava-progress-sandbox-container">
  <div class="relative w-[300px] h-[100px] flex items-center justify-center">
    <canvas class="lava-progress-canvas absolute inset-0"></canvas>
    <div class="absolute top-1.5 left-1.5 flex flex-col pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">CORE TEMPERATURE</span>
      <span class="lava-percent font-sans text-sm font-extrabold text-[#ff3c00] drop-shadow-[0_0_10px_rgba(255,60,0,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-6">
    <input type="range" class="lava-progress-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff3c00] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#150602] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="65" />
  </div>
</div>`,
  prompt: 'Design a segmented volcanic lava core progress bar component in a obsidian slate frame filling with bubbling orange fluid and spawning floating carbon sparks.'
};
