/**
 * Component: Bioluminescent Neural Pathway Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'biolume-neural-pathway',
  name: 'Bioluminescent Neural Pathway Progress',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="neural-path-sandbox" id="neural-path-sandbox-container">
  <div class="neural-wrapper">
    <canvas class="neural-canvas"></canvas>
    <div class="neural-info">
      <span class="neural-title">SYNAPSE CONNECTION</span>
      <span class="neural-val">0%</span>
    </div>
  </div>
  
  <div class="neural-controls">
    <input type="range" class="neural-slider" min="0" max="100" value="55" />
  </div>
</div>`,
  js: `// Bioluminescent Neural Pathway Progress Canvas Animation Logic
const canvas = document.querySelector('.neural-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.neural-slider');
  const valLabel = document.querySelector('.neural-val');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let pulsePoints = [];
  
  canvas.width = 280;
  canvas.height = 100;
  
  // Coordinate points representing the brain synapse hubs
  const synapseHubs = [
    { x: 30,  y: 70,  threshold: 0 },
    { x: 80,  y: 35,  threshold: 20 },
    { x: 130, y: 75,  threshold: 40 },
    { x: 170, y: 30,  threshold: 60 },
    { x: 215, y: 65,  threshold: 80 },
    { x: 255, y: 35,  threshold: 100 }
  ];
  
  class NeuroPulse {
    constructor(startX, startY, targetX, targetY) {
      this.x = startX;
      this.y = startY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.progress = 0;
      this.speed = Math.random() * 0.04 + 0.02;
    }
    
    update() {
      this.progress += this.speed;
      this.x = this.x + (this.targetX - this.x) * this.progress;
      this.y = this.y + (this.targetY - this.y) * this.progress;
    }
    
    draw() {
      ctx.save();
      ctx.fillStyle = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f2fe';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
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
    
    // Smooth value interpolation
    currentVal += (targetVal - currentVal) * 0.12;
    valLabel.textContent = \`\${Math.round(currentVal)}%\`;
    
    // 1. Draw static pathway connections
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(synapseHubs[0].x, synapseHubs[0].y);
    for (let i = 1; i < synapseHubs.length; i++) {
      ctx.lineTo(synapseHubs[i].x, synapseHubs[i].y);
    }
    ctx.stroke();
    ctx.restore();
    
    // 2. Draw glowing active pathway connections
    ctx.save();
    ctx.strokeStyle = '#00f2fe';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00f2fe';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(synapseHubs[0].x, synapseHubs[0].y);
    
    for (let i = 1; i < synapseHubs.length; i++) {
      const prev = synapseHubs[i - 1];
      const curr = synapseHubs[i];
      
      if (currentVal >= curr.threshold) {
        ctx.lineTo(curr.x, curr.y);
      } else if (currentVal > prev.threshold) {
        const ratio = (currentVal - prev.threshold) / (curr.threshold - prev.threshold);
        const segmentX = prev.x + (curr.x - prev.x) * ratio;
        const segmentY = prev.y + (curr.y - prev.y) * ratio;
        ctx.lineTo(segmentX, segmentY);
        break;
      } else {
        break;
      }
    }
    ctx.stroke();
    ctx.restore();
    
    // 3. Draw active neural synapse nodes
    synapseHubs.forEach((hub, idx) => {
      const isActive = currentVal >= hub.threshold;
      
      ctx.save();
      if (isActive) {
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00f2fe';
        
        // Spawn active bio-chemical transmitter pulses along pathways
        if (idx > 0 && Math.random() < 0.015) {
          const prev = synapseHubs[idx - 1];
          pulsePoints.push(new NeuroPulse(prev.x, prev.y, hub.x, hub.y));
        }
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      }
      
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, isActive ? 5.5 : 3.5, 0, Math.PI * 2);
      ctx.fill();
      if (isActive) ctx.stroke();
      ctx.restore();
    });
    
    // Update and draw neurotransmitter pulses
    for (let i = pulsePoints.length - 1; i >= 0; i--) {
      const p = pulsePoints[i];
      p.update();
      if (p.progress >= 1.0) {
        pulsePoints.splice(i, 1);
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
const canvas = document.querySelector('.neural-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.neural-slider') as HTMLInputElement;
  const valLabel = document.querySelector('.neural-val') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let pulsePoints: NeuroPulse[] = [];
    
    canvas.width = 280;
    canvas.height = 100;
    
    const synapseHubs = [
      { x: 30,  y: 70,  threshold: 0 },
      { x: 80,  y: 35,  threshold: 20 },
      { x: 130, y: 75,  threshold: 40 },
      { x: 170, y: 30,  threshold: 60 },
      { x: 215, y: 65,  threshold: 80 },
      { x: 255, y: 35,  threshold: 100 }
    ];
    
    class NeuroPulse {
      x: number; y: number; targetX: number; targetY: number; progress: number; speed: number;
      constructor(startX: number, startY: number, targetX: number, targetY: number) {
        this.x = startX;
        this.y = startY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.progress = 0;
        this.speed = Math.random() * 0.04 + 0.02;
      }
      
      update() {
        this.progress += this.speed;
        this.x = this.x + (this.targetX - this.x) * this.progress;
        this.y = this.y + (this.targetY - this.y) * this.progress;
      }
      
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.fillStyle = '#00f2fe';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f2fe';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
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
      
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(synapseHubs[0].x, synapseHubs[0].y);
      for (let i = 1; i < synapseHubs.length; i++) {
        ctx.lineTo(synapseHubs[i].x, synapseHubs[i].y);
      }
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      ctx.strokeStyle = '#00f2fe';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f2fe';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(synapseHubs[0].x, synapseHubs[0].y);
      
      for (let i = 1; i < synapseHubs.length; i++) {
        const prev = synapseHubs[i - 1];
        const curr = synapseHubs[i];
        
        if (currentVal >= curr.threshold) {
          ctx.lineTo(curr.x, curr.y);
        } else if (currentVal > prev.threshold) {
          const ratio = (currentVal - prev.threshold) / (curr.threshold - prev.threshold);
          const segmentX = prev.x + (curr.x - prev.x) * ratio;
          const segmentY = prev.y + (curr.y - prev.y) * ratio;
          ctx.lineTo(segmentX, segmentY);
          break;
        } else {
          break;
        }
      }
      ctx.stroke();
      ctx.restore();
      
      synapseHubs.forEach((hub, idx) => {
        const isActive = currentVal >= hub.threshold;
        ctx.save();
        if (isActive) {
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#00f2fe';
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#00f2fe';
          if (idx > 0 && Math.random() < 0.015) {
            const prev = synapseHubs[idx - 1];
            pulsePoints.push(new NeuroPulse(prev.x, prev.y, hub.x, hub.y));
          }
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        }
        
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, isActive ? 5.5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        if (isActive) ctx.stroke();
        ctx.restore();
      });
      
      for (let i = pulsePoints.length - 1; i >= 0; i--) {
        const p = pulsePoints[i];
        p.update();
        if (p.progress >= 1.0) {
          pulsePoints.splice(i, 1);
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
  css: `/* Bioluminescent Neural Pathway Progress styles */
.neural-path-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #02070f 0%, #000103 100%);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.neural-wrapper {
  position: relative;
  width: 280px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.neural-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.neural-info {
  position: absolute;
  top: 6px;
  left: 6px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
}

.neural-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.neural-val {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #00f2fe;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
  margin-top: 2px;
}

.neural-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 24px;
}

.neural-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.neural-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00f2fe;
  border: 2px solid #02070f;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 242, 254, 0.5);
  transition: transform 0.15s;
}

.neural-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#02070f] to-[#000103] border border-cyan-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="neural-path-sandbox-container">
  <div class="relative w-[280px] h-[100px] flex items-center justify-center">
    <canvas class="neural-canvas absolute inset-0"></canvas>
    <div class="absolute top-1.5 left-1.5 flex flex-col pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">SYNAPSE CONNECTION</span>
      <span class="neural-val font-sans text-sm font-extrabold text-[#00f2fe] drop-shadow-[0_0_10px_rgba(0,242,254,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-6">
    <input type="range" class="neural-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00f2fe] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#02070f] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="55" />
  </div>
</div>`,
  prompt: 'Design a landscape bioluminescent neural pathways progress network component lighting up brain synapses and firing neurotransmitter pulses.'
};
