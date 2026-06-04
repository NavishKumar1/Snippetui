/**
 * Component: Bipolar Polarized Magnetic Gauge
 * Category: progress-and-gauges
 */

export const component = {
  id: 'magnetic-polar-gauge',
  name: 'Bipolar Polarized Magnetic Gauge',
  category: 'progress-and-gauges',
  tag: 'Creative',
  html: `<div class="magnetic-polar-sandbox" id="magnetic-polar-sandbox-container">
  <div class="magnetic-wrapper">
    <canvas class="magnetic-canvas"></canvas>
    <div class="magnetic-info">
      <span class="magnetic-title">MAGNETIC POLARIZATION</span>
      <span class="magnetic-val">0%</span>
    </div>
  </div>
  
  <div class="magnetic-controls">
    <input type="range" class="magnetic-slider" min="0" max="100" value="65" />
  </div>
</div>`,
  js: `// Bipolar Polarized Magnetic Gauge Canvas Animation Logic
const container = document.querySelector('.magnetic-polar-sandbox');
if (container) {
  const canvas = container.querySelector('.magnetic-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.magnetic-slider');
  const valLabel = container.querySelector('.magnetic-val');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let filings = [];
  
  canvas.width = 240;
  canvas.height = 140;
  
  const cx = canvas.width / 2;
  const cy = canvas.height - 20;
  const radius = 80;
  
  class IronFiling {
    constructor() {
      // Spawn filings randomly in a semicircle zone
      const angle = Math.PI + Math.random() * Math.PI;
      const r = radius - 15 + Math.random() * 30;
      this.x = cx + Math.cos(angle) * r;
      this.y = cy + Math.sin(angle) * r;
      this.targetX = this.x;
      this.targetY = this.y;
      this.size = Math.random() * 1.5 + 0.8;
      this.alpha = Math.random() * 0.4 + 0.3;
    }
    
    update(needleAngle) {
      // filings are attracted to the magnet needle tip!
      const targetAngle = needleAngle;
      const angle = Math.atan2(this.y - cy, this.x - cx);
      const angleDiff = targetAngle - angle;
      
      // Calculate gravity/magnetic attraction pull based on proximity to needle angle
      const proximity = Math.exp(-Math.pow(angleDiff * 2.5, 2)); // Attract closer ones strongly
      
      const anglePull = angle + angleDiff * proximity * 0.12;
      const originalDist = Math.hypot(this.x - cx, this.y - cy);
      
      // Pull slightly closer to active track radius
      const targetDist = originalDist + (radius - originalDist) * proximity * 0.25;
      
      this.targetX = cx + Math.cos(anglePull) * targetDist;
      this.targetY = cy + Math.sin(anglePull) * targetDist;
      
      // Interpolate coordinates
      this.x += (this.targetX - this.x) * 0.08;
      this.y += (this.targetY - this.y) * 0.08;
      
      // Increase opacity when attracted
      this.alpha = 0.35 + proximity * 0.65;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#00f2fe';
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#00f2fe';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  
  // Initialize iron filings
  for (let i = 0; i < 80; i++) {
    filings.push(new IronFiling());
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
    
    const startAngle = Math.PI;
    const endAngleLimit = Math.PI * 2;
    const activeAngle = startAngle + (currentVal / 100) * Math.PI;
    
    // 1. Draw split polar regions (+ / - poles)
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngleLimit);
    ctx.stroke();
    ctx.restore();
    
    // 2. Draw attraction field vector lines (magnetic curves)
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
    ctx.lineWidth = 1.0;
    
    // Draw 3 loop waves representing magnetic flux fields
    for (let f = 1; f <= 3; f++) {
      ctx.beginPath();
      const rOffset = f * 18;
      ctx.arc(cx - radius / 2, cy, rOffset, 0, Math.PI, true);
      ctx.arc(cx + radius / 2, cy, rOffset, 0, Math.PI, true);
      ctx.stroke();
    }
    ctx.restore();
    
    // Update and draw filings
    filings.forEach(filing => {
      filing.update(activeAngle);
      filing.draw();
    });
    
    // 3. Draw polarized needle
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(activeAngle);
    
    // Positive end (Red laser)
    ctx.strokeStyle = '#ff3d00';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#ff3d00';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius - 5, 0);
    ctx.stroke();
    
    // Active cap
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
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
const container = document.querySelector('.magnetic-polar-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.magnetic-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.magnetic-slider') as HTMLInputElement;
  const valLabel = container.querySelector('.magnetic-val') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let filings: IronFiling[] = [];
    
    const cx = canvas.width / 2;
    const cy = canvas.height - 20;
    const radius = 80;
    
    canvas.width = 240;
    canvas.height = 140;
    
    class IronFiling {
      x: number; y: number; targetX: number; targetY: number; size: number; alpha: number;
      constructor() {
        const angle = Math.PI + Math.random() * Math.PI;
        const r = radius - 15 + Math.random() * 30;
        this.x = cx + Math.cos(angle) * r;
        this.y = cy + Math.sin(angle) * r;
        this.targetX = this.x;
        this.targetY = this.y;
        this.size = Math.random() * 1.5 + 0.8;
        this.alpha = Math.random() * 0.4 + 0.3;
      }
      
      update(needleAngle: number) {
        const targetAngle = needleAngle;
        const angle = Math.atan2(this.y - cy, this.x - cx);
        const angleDiff = targetAngle - angle;
        const proximity = Math.exp(-Math.pow(angleDiff * 2.5, 2));
        
        const anglePull = angle + angleDiff * proximity * 0.12;
        const originalDist = Math.hypot(this.x - cx, this.y - cy);
        const targetDist = originalDist + (radius - originalDist) * proximity * 0.25;
        
        this.targetX = cx + Math.cos(anglePull) * targetDist;
        this.targetY = cy + Math.sin(anglePull) * targetDist;
        
        this.x += (this.targetX - this.x) * 0.08;
        this.y += (this.targetY - this.y) * 0.08;
        this.alpha = 0.35 + proximity * 0.65;
      }
      
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#00f2fe';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#00f2fe';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    for (let i = 0; i < 80; i++) {
      filings.push(new IronFiling());
    }
    
    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      currentVal += (targetVal - currentVal) * 0.12;
      valLabel.textContent = \`\${Math.round(currentVal)}%\`;
      
      const startAngle = Math.PI;
      const endAngleLimit = Math.PI * 2;
      const activeAngle = startAngle + (currentVal / 100) * Math.PI;
      
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngleLimit);
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
      ctx.lineWidth = 1.0;
      
      for (let f = 1; f <= 3; f++) {
        ctx.beginPath();
        const rOffset = f * 18;
        ctx.arc(cx - radius / 2, cy, rOffset, 0, Math.PI, true);
        ctx.arc(cx + radius / 2, cy, rOffset, 0, Math.PI, true);
        ctx.stroke();
      }
      ctx.restore();
      
      filings.forEach(filing => {
        filing.update(activeAngle);
        filing.draw();
      });
      
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(activeAngle);
      
      ctx.strokeStyle = '#ff3d00';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ff3d00';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius - 5, 0);
      ctx.stroke();
      
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
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
  css: `/* Bipolar Polarized Magnetic Gauge styles */
.magnetic-polar-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #02070e 0%, #000102 100%);
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

.magnetic-wrapper {
  position: relative;
  width: 240px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.magnetic-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.magnetic-info {
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.magnetic-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.magnetic-val {
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #ff3d00;
  text-shadow: 0 0 10px rgba(255, 61, 0, 0.5);
  margin-top: 1px;
}

.magnetic-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 14px;
}

.magnetic-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.magnetic-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff3d00;
  border: 2px solid #02070e;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 61, 0, 0.5);
  transition: transform 0.15s;
}

.magnetic-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#02070e] to-[#000102] border border-cyan-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="magnetic-polar-sandbox-container">
  <div class="relative w-[240px] h-[140px] flex items-center justify-center">
    <canvas class="magnetic-canvas absolute inset-0"></canvas>
    <div class="absolute bottom-0 flex flex-col items-center pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">MAGNETIC POLARIZATION</span>
      <span class="magnetic-val font-sans text-lg font-extrabold text-[#ff3d00] drop-shadow-[0_0_10px_rgba(255,61,0,0.5)] mt-px">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-3.5">
    <input type="range" class="magnetic-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff3d00] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#02070e] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="65" />
  </div>
</div>`,
  prompt: 'Design a semi-circular magnetic polarization gauge with a polarized red needle tip attracting glowing iron filing particles along attraction force lines.'
};
