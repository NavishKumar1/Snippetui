/**
 * Component: Gooey Dripping Slime
 * Category: progress-and-gauges
 */

export const component = {
  id: 'gooey-dripping-slime',
  name: 'Gooey Dripping Slime',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="slime-dripping-sandbox" id="slime-dripping-sandbox-container">
  <div class="slime-dripping-wrapper">
    <canvas class="slime-dripping-canvas"></canvas>
    <div class="slime-dripping-info">
      <span class="slime-title">BIO-SLIME FLOW</span>
      <span class="slime-percent">0%</span>
    </div>
  </div>
  
  <div class="slime-dripping-controls">
    <input type="range" class="slime-dripping-slider" min="0" max="100" value="30" />
  </div>
</div>`,
  js: `// Gooey Dripping Slime Canvas Animation Logic
const canvas = document.querySelector('.slime-dripping-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.slime-dripping-slider');
  const percentText = document.querySelector('.slime-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let time = 0;
  let drips = [];
  let puddleY = 0;
  let puddleHeightVel = 0;
  let puddleHeightElastic = 0;
  
  canvas.width = 160;
  canvas.height = 180;
  
  class SlimeDrip {
    constructor(x, y) {
      this.x = x;
      this.startY = y;
      this.y = y;
      this.vy = 0;
      this.gravity = 0.15;
      this.size = Math.random() * 4 + 4;
      this.stretch = 0;
      this.snapped = false;
      this.snapLimit = Math.random() * 45 + 30;
    }
    
    update(puddleActualY) {
      if (!this.snapped) {
        // Stretching phase
        this.stretch += 0.8;
        this.y = this.startY + this.stretch;
        
        if (this.stretch >= this.snapLimit) {
          this.snapped = true;
          this.vy = 1;
        }
      } else {
        // Free fall phase
        this.vy += this.gravity;
        this.y += this.vy;
      }
      
      // Check collision with bottom puddle
      if (this.y >= puddleActualY) {
        return true; // Collided
      }
      return false;
    }
    
    draw() {
      ctx.save();
      ctx.fillStyle = '#39ff14';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#39ff14';
      ctx.beginPath();
      
      if (!this.snapped) {
        // Draw standard metaball stretch teardrop
        const topRadius = this.size * 0.7;
        const bottomRadius = this.size * (1.0 + (this.stretch / this.snapLimit) * 0.3);
        
        ctx.moveTo(this.x - topRadius, this.startY);
        // Bezier curves to show the organic viscous connecting neck
        ctx.bezierCurveTo(
          this.x - topRadius, this.startY + this.stretch * 0.4,
          this.x - bottomRadius, this.y - this.size,
          this.x - bottomRadius, this.y
        );
        ctx.arc(this.x, this.y, bottomRadius, Math.PI, 0, true);
        ctx.bezierCurveTo(
          this.x + bottomRadius, this.y - this.size,
          this.x + topRadius, this.startY + this.stretch * 0.4,
          this.x + topRadius, this.startY
        );
      } else {
        // Draw falling drop teardrop shape
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      }
      
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
    const h = canvas.height;
    
    currentVal += (targetVal - currentVal) * 0.12;
    percentText.textContent = \`\${Math.round(currentVal)}%\`;
    
    time += 0.04;
    
    // Slime levels
    const reservoirY = 30;
    const maxPuddleMaxY = 40; // max thickness
    const destPuddleY = h - 20 - (currentVal / 100) * maxPuddleMaxY;
    
    // Elastic spring physics for bottom puddle bouncing
    const diff = destPuddleY - puddleY;
    puddleHeightVel += diff * 0.08;
    puddleHeightVel *= 0.85; // damping
    puddleY += puddleHeightVel;
    
    // 1. Draw top hanging slime ceiling
    ctx.save();
    ctx.fillStyle = '#39ff14';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#39ff14';
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(15, reservoirY);
    
    // Dynamic wavy ceiling representing thick fluid
    for (let x = 15; x <= canvas.width - 15; x += 10) {
      const yWave = reservoirY + Math.sin(time + x * 0.05) * 3;
      ctx.lineTo(x, yWave);
    }
    
    ctx.lineTo(canvas.width - 15, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    
    // 2. Active drippers spawning
    if (currentVal > 5) {
      const spawnChance = 0.02 + (currentVal / 100) * 0.06;
      if (Math.random() < spawnChance && drips.length < 4) {
        const spawnX = Math.random() * (canvas.width - 50) + 25;
        drips.push(new SlimeDrip(spawnX, reservoirY));
      }
    }
    
    // Update and draw active drops
    for (let i = drips.length - 1; i >= 0; i--) {
      const drip = drips[i];
      const collided = drip.update(puddleY);
      
      if (collided) {
        // Add velocity splash impact to puddle physics
        puddleHeightVel += drip.size * 0.7;
        drips.splice(i, 1);
      } else {
        drip.draw();
      }
    }
    
    // 3. Draw bottom puddle liquid
    ctx.save();
    ctx.fillStyle = '#39ff14';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#39ff14';
    ctx.beginPath();
    
    const puddleL = 15;
    const puddleR = canvas.width - 15;
    
    ctx.moveTo(puddleL, h);
    ctx.lineTo(puddleL, puddleY);
    
    // Draw wavy elastic gooey surface
    for (let x = puddleL; x <= puddleR; x += 5) {
      const wave = Math.sin(time * 2 + x * 0.08) * (1.5 + puddleHeightVel * 0.2);
      ctx.lineTo(x, puddleY + wave);
    }
    
    ctx.lineTo(puddleR, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    
    // Draw glass container profile outline
    ctx.save();
    ctx.strokeStyle = 'rgba(57, 255, 20, 0.1)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(10, 10, canvas.width - 20, h - 20, 20);
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
const canvas = document.querySelector('.slime-dripping-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.slime-dripping-slider') as HTMLInputElement;
  const percentText = document.querySelector('.slime-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let time = 0;
    let drips: SlimeDrip[] = [];
    let puddleY = 0;
    let puddleHeightVel = 0;
    
    canvas.width = 160;
    canvas.height = 180;
    
    class SlimeDrip {
      x: number; startY: number; y: number; vy: number; gravity: number; size: number; stretch: number; snapped: boolean; snapLimit: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.startY = y;
        this.y = y;
        this.vy = 0;
        this.gravity = 0.15;
        this.size = Math.random() * 4 + 4;
        this.stretch = 0;
        this.snapped = false;
        this.snapLimit = Math.random() * 45 + 30;
      }
      
      update(puddleActualY: number): boolean {
        if (!this.snapped) {
          this.stretch += 0.8;
          this.y = this.startY + this.stretch;
          if (this.stretch >= this.snapLimit) {
            this.snapped = true;
            this.vy = 1;
          }
        } else {
          this.vy += this.gravity;
          this.y += this.vy;
        }
        return this.y >= puddleActualY;
      }
      
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.fillStyle = '#39ff14';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#39ff14';
        ctx.beginPath();
        
        if (!this.snapped) {
          const topRadius = this.size * 0.7;
          const bottomRadius = this.size * (1.0 + (this.stretch / this.snapLimit) * 0.3);
          ctx.moveTo(this.x - topRadius, this.startY);
          ctx.bezierCurveTo(
            this.x - topRadius, this.startY + this.stretch * 0.4,
            this.x - bottomRadius, this.y - this.size,
            this.x - bottomRadius, this.y
          );
          ctx.arc(this.x, this.y, bottomRadius, Math.PI, 0, true);
          ctx.bezierCurveTo(
            this.x + bottomRadius, this.y - this.size,
            this.x + topRadius, this.startY + this.stretch * 0.4,
            this.x + topRadius, this.startY
          );
        } else {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        }
        
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
      const h = canvas.height;
      
      currentVal += (targetVal - currentVal) * 0.12;
      percentText.textContent = \`\${Math.round(currentVal)}%\`;
      time += 0.04;
      
      const reservoirY = 30;
      const maxPuddleMaxY = 40;
      const destPuddleY = h - 20 - (currentVal / 100) * maxPuddleMaxY;
      
      const diff = destPuddleY - puddleY;
      puddleHeightVel += diff * 0.08;
      puddleHeightVel *= 0.85;
      puddleY += puddleHeightVel;
      
      ctx.save();
      ctx.fillStyle = '#39ff14';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#39ff14';
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(15, reservoirY);
      
      for (let x = 15; x <= canvas.width - 15; x += 10) {
        const yWave = reservoirY + Math.sin(time + x * 0.05) * 3;
        ctx.lineTo(x, yWave);
      }
      ctx.lineTo(canvas.width - 15, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      
      if (currentVal > 5) {
        const spawnChance = 0.02 + (currentVal / 100) * 0.06;
        if (Math.random() < spawnChance && drips.length < 4) {
          const spawnX = Math.random() * (canvas.width - 50) + 25;
          drips.push(new SlimeDrip(spawnX, reservoirY));
        }
      }
      
      for (let i = drips.length - 1; i >= 0; i--) {
        const drip = drips[i];
        const collided = drip.update(puddleY);
        if (collided) {
          puddleHeightVel += drip.size * 0.7;
          drips.splice(i, 1);
        } else {
          drip.draw();
        }
      }
      
      ctx.save();
      ctx.fillStyle = '#39ff14';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#39ff14';
      ctx.beginPath();
      
      const puddleL = 15;
      const puddleR = canvas.width - 15;
      ctx.moveTo(puddleL, h);
      ctx.lineTo(puddleL, puddleY);
      
      for (let x = puddleL; x <= puddleR; x += 5) {
        const wave = Math.sin(time * 2 + x * 0.08) * (1.5 + puddleHeightVel * 0.2);
        ctx.lineTo(x, puddleY + wave);
      }
      ctx.lineTo(puddleR, h);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      
      ctx.save();
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.1)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(10, 10, canvas.width - 20, h - 20, 20);
      } else {
        ctx.rect(10, 10, canvas.width - 20, h - 20);
      }
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
  css: `/* Gooey Dripping Slime Styles */
.slime-dripping-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #051405 0%, #000000 100%);
  border: 1px solid rgba(57, 255, 20, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.slime-dripping-wrapper {
  position: relative;
  width: 160px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slime-dripping-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.slime-dripping-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.slime-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 1.5px;
}

.slime-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(57, 255, 20, 0.6);
  margin-top: 1px;
}

.slime-dripping-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 8px;
}

.slime-dripping-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.slime-dripping-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #39ff14;
  border: 2px solid #051405;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(57, 255, 20, 0.6);
  transition: transform 0.15s;
}

.slime-dripping-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#051405] to-[#000000] border border-green-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="slime-dripping-sandbox-container">
  <div class="relative w-40 h-[180px] flex items-center justify-center">
    <canvas class="slime-dripping-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-20">
      <span class="font-mono text-[7.5px] text-white/20 tracking-widest">BIO-SLIME FLOW</span>
      <span class="slime-percent font-sans text-2xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(57,255,20,0.6)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-2">
    <input type="range" class="slime-dripping-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#39ff14] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#051405] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="30" />
  </div>
</div>`,
  prompt: 'Design a glass capsule showing highly gooey and viscous neon-green biochemical slime dripping, stretching and splashing with puddle spring wave ripples.'
};
