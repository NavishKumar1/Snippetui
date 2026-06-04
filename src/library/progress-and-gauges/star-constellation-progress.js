/**
 * Component: Star Constellation Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'star-constellation-progress',
  name: 'Star Constellation Progress',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="star-progress-sandbox" id="star-progress-sandbox-container">
  <div class="star-progress-wrapper">
    <canvas class="star-progress-canvas"></canvas>
    <div class="star-progress-info">
      <span class="star-val-title">STELLAR COORD</span>
      <span class="star-val-text">0%</span>
    </div>
  </div>
  
  <div class="star-progress-controls">
    <input type="range" class="star-progress-slider" min="0" max="100" value="55" />
  </div>
</div>`,
  js: `// Star Constellation Progress Canvas Animation Logic
const container = document.querySelector('.star-progress-sandbox');
if (container) {
  const canvas = container.querySelector('.star-progress-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.star-progress-slider');
  const valLabel = container.querySelector('.star-val-text');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let starFlares = [];
  
  canvas.width = 300;
  canvas.height = 140;
  
  // Coordinates for the 5 constellation stars (0%, 25%, 50%, 75%, 100%)
  const milestones = [
    { x: 30,  y: 100, threshold: 0 },
    { x: 90,  y: 40,  threshold: 25 },
    { x: 150, y: 90,  threshold: 50 },
    { x: 210, y: 30,  threshold: 75 },
    { x: 270, y: 80,  threshold: 100 }
  ];
  
  class Spark {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.alpha = 1;
      this.decay = Math.random() * 0.04 + 0.02;
      this.size = Math.random() * 1.5 + 0.8;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#6366f1';
      ctx.fillStyle = '#ffffff';
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
    
    currentVal += (targetVal - currentVal) * 0.12;
    valLabel.textContent = \`\${Math.round(currentVal)}%\`;
    
    // 1. Draw connecting constellation lines
    ctx.save();
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    
    // Ambient background path (uncompleted)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(milestones[0].x, milestones[0].y);
    for (let i = 1; i < milestones.length; i++) {
      ctx.lineTo(milestones[i].x, milestones[i].y);
    }
    ctx.stroke();
    
    // Active glowing completed path
    ctx.strokeStyle = '#6366f1';
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(99, 102, 241, 0.6)';
    ctx.beginPath();
    ctx.moveTo(milestones[0].x, milestones[0].y);
    
    for (let i = 1; i < milestones.length; i++) {
      const prev = milestones[i - 1];
      const curr = milestones[i];
      
      if (currentVal >= curr.threshold) {
        // Draw full segment
        ctx.lineTo(curr.x, curr.y);
      } else if (currentVal > prev.threshold) {
        // Draw partial segment matching progress fraction between two milestones
        const fraction = (currentVal - prev.threshold) / (curr.threshold - prev.threshold);
        const segmentX = prev.x + (curr.x - prev.x) * fraction;
        const segmentY = prev.y + (curr.y - prev.y) * fraction;
        ctx.lineTo(segmentX, segmentY);
        break;
      } else {
        break;
      }
    }
    ctx.stroke();
    ctx.restore();
    
    // 2. Draw star nodes
    milestones.forEach((star) => {
      const isActive = currentVal >= star.threshold;
      
      ctx.save();
      if (isActive) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00f2fe';
        ctx.fillStyle = '#ffffff';
        
        // Spawn sparks continuously from unlocked milestones
        if (Math.random() < 0.08) {
          starFlares.push(new Spark(star.x, star.y));
        }
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      }
      
      // Draw star shape or circles
      ctx.beginPath();
      ctx.arc(star.x, star.y, isActive ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fill();
      
      if (isActive) {
        // Draw circular target rings
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, 10 + Math.sin(Date.now() * 0.005) * 2, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    });
    
    // Update and draw Sparks
    for (let i = starFlares.length - 1; i >= 0; i--) {
      const sp = starFlares[i];
      sp.update();
      if (sp.alpha <= 0) {
        starFlares.splice(i, 1);
      } else {
        sp.draw();
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
const container = document.querySelector('.star-progress-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.star-progress-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.star-progress-slider') as HTMLInputElement;
  const valLabel = container.querySelector('.star-val-text') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let starFlares: Spark[] = [];
    
    canvas.width = 300;
    canvas.height = 140;
    
    const milestones = [
      { x: 30,  y: 100, threshold: 0 },
      { x: 90,  y: 40,  threshold: 25 },
      { x: 150, y: 90,  threshold: 50 },
      { x: 210, y: 30,  threshold: 75 },
      { x: 270, y: 80,  threshold: 100 }
    ];
    
    class Spark {
      x: number; y: number; vx: number; vy: number; alpha: number; decay: number; size: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.alpha = 1;
        this.decay = Math.random() * 0.04 + 0.02;
        this.size = Math.random() * 1.5 + 0.8;
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
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#6366f1';
        ctx.fillStyle = '#ffffff';
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
      currentVal += (targetVal - currentVal) * 0.12;
      valLabel.textContent = \`\${Math.round(currentVal)}%\`;
      
      ctx.save();
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.moveTo(milestones[0].x, milestones[0].y);
      for (let i = 1; i < milestones.length; i++) {
        ctx.lineTo(milestones[i].x, milestones[i].y);
      }
      ctx.stroke();
      
      ctx.strokeStyle = '#6366f1';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(99, 102, 241, 0.6)';
      ctx.beginPath();
      ctx.moveTo(milestones[0].x, milestones[0].y);
      
      for (let i = 1; i < milestones.length; i++) {
        const prev = milestones[i - 1];
        const curr = milestones[i];
        
        if (currentVal >= curr.threshold) {
          ctx.lineTo(curr.x, curr.y);
        } else if (currentVal > prev.threshold) {
          const fraction = (currentVal - prev.threshold) / (curr.threshold - prev.threshold);
          const segmentX = prev.x + (curr.x - prev.x) * fraction;
          const segmentY = prev.y + (curr.y - prev.y) * fraction;
          ctx.lineTo(segmentX, segmentY);
          break;
        } else {
          break;
        }
      }
      ctx.stroke();
      ctx.restore();
      
      milestones.forEach((star) => {
        const isActive = currentVal >= star.threshold;
        ctx.save();
        if (isActive) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#00f2fe';
          ctx.fillStyle = '#ffffff';
          if (Math.random() < 0.08) {
            starFlares.push(new Spark(star.x, star.y));
          }
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, isActive ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        
        if (isActive) {
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
          ctx.beginPath();
          ctx.arc(star.x, star.y, 10 + Math.sin(Date.now() * 0.005) * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      });
      
      for (let i = starFlares.length - 1; i >= 0; i--) {
        const sp = starFlares[i];
        sp.update();
        if (sp.alpha <= 0) {
          starFlares.splice(i, 1);
        } else {
          sp.draw();
        }
      }
      
      animId = requestAnimationFrame(animate);
    };
    
    animate();
  }
}`,
  css: `/* Star Constellation Progress styles */
.star-progress-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #02040b 0%, #000103 100%);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

/* Simulated Space background glow */
.star-progress-sandbox::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, rgba(0, 0, 0, 0) 60%);
  pointer-events: none;
  z-index: 1;
}

.star-progress-wrapper {
  position: relative;
  width: 300px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.star-progress-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.star-progress-info {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}

.star-val-title {
  font-family: monospace;
  font-size: 8px;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 1.5px;
}

.star-val-text {
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(99, 102, 241, 0.6);
  margin-top: 2px;
}

.star-progress-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 14px;
  z-index: 2;
}

.star-progress-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.star-progress-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #6366f1;
  border: 2px solid #02040b;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(99, 102, 241, 0.5);
  transition: transform 0.15s;
}

.star-progress-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#02040b] to-[#000103] border border-indigo-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden after:content-[''] after:absolute after:-inset-[50%] after:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,rgba(0,0,0,0)_60%)] after:pointer-events-none after:z-10" id="star-progress-sandbox-container">
  <div class="relative w-[300px] h-[140px] flex items-center justify-center z-20">
    <canvas class="star-progress-canvas absolute inset-0"></canvas>
    <div class="absolute top-2.5 left-2.5 flex flex-col pointer-events-none">
      <span class="font-mono text-[8px] text-white/30 tracking-widest">STELLAR COORD</span>
      <span class="star-val-text font-sans text-base font-extrabold text-white drop-shadow-[0_0_10px_rgba(99,102,241,0.6)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-3.5 z-20">
    <input type="range" class="star-progress-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6366f1] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#02040b] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="55" />
  </div>
</div>`,
  prompt: 'Design a space star constellation progress tracker gauge component rendering glowing active lines linking locked nodes as the percentage reaches milestone coordinates.'
};
