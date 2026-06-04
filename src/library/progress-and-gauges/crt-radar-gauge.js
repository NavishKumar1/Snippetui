/**
 * Component: CRT Radar Gauge
 * Category: progress-and-gauges
 */

export const component = {
  id: 'crt-radar-gauge',
  name: 'CRT Radar Gauge',
  category: 'progress-and-gauges',
  tag: 'Retro-SciFi',
  html: `<div class="crt-radar-sandbox" id="crt-radar-sandbox-container">
  <div class="crt-radar-wrapper">
    <div class="crt-scanlines"></div>
    <div class="crt-glare"></div>
    <canvas class="crt-radar-canvas"></canvas>
    <div class="crt-radar-info">
      <span class="crt-title">RADAR SEARCH</span>
      <span class="crt-percent">0%</span>
    </div>
  </div>
  
  <div class="crt-radar-controls">
    <input type="range" class="crt-radar-slider" min="0" max="100" value="75" />
  </div>
</div>`,
  js: `// CRT Radar Gauge Canvas Animation Logic
const canvas = document.querySelector('.crt-radar-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.crt-radar-slider');
  const percentText = document.querySelector('.crt-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let sweepAngle = 0;
  let blips = [];
  
  canvas.width = 170;
  canvas.height = 170;
  
  class RadarBlip {
    constructor(angle, distance) {
      this.angle = angle;
      this.distance = distance;
      this.alpha = 0;
      this.maxAlpha = Math.random() * 0.7 + 0.3;
      this.size = Math.random() * 3 + 2;
      this.pinged = false;
    }
    
    update(sweepAngle) {
      // Check if sweep passes this blip's angle
      const angleDiff = Math.abs((sweepAngle % (Math.PI * 2)) - this.angle);
      if (angleDiff < 0.05) {
        this.alpha = this.maxAlpha;
        this.pinged = true;
      } else {
        this.alpha -= 0.008; // slow phosphor decay
        if (this.alpha < 0) this.alpha = 0;
      }
    }
    
    draw(cx, cy) {
      if (this.alpha <= 0) return;
      const x = cx + Math.cos(this.angle) * this.distance;
      const y = cy + Math.sin(this.angle) * this.distance;
      
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#00ff66';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ff66';
      ctx.beginPath();
      ctx.arc(x, y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Secondary ring
      ctx.strokeStyle = '#00ff66';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(x, y, this.size * 2 * (1 - this.alpha), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
  
  // Seed initial static target blips
  for (let i = 0; i < 6; i++) {
    blips.push(new RadarBlip(Math.random() * Math.PI * 2, Math.random() * 45 + 15));
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
    
    // Sweep line moves
    sweepAngle += 0.025;
    
    // Draw radar reticle grid
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 255, 102, 0.08)';
    ctx.lineWidth = 1;
    
    // Concentric rings
    for (let r = 20; r <= 70; r += 25) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(cx - 75, cy);
    ctx.lineTo(cx + 75, cy);
    ctx.moveTo(cx, cy - 75);
    ctx.lineTo(cx, cy + 75);
    ctx.stroke();
    ctx.restore();
    
    // Draw sweeps matching currentVal
    const activeRadius = 70;
    
    // Draw outer progress arc
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 255, 102, 0.05)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, activeRadius + 5, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 3.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ff66';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, activeRadius + 5, -Math.PI / 2, -Math.PI / 2 + (currentVal / 100) * Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    
    // Draw radar sweep gradient beam
    ctx.save();
    const beamGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, activeRadius);
    beamGrad.addColorStop(0, 'rgba(0, 255, 102, 0.15)');
    beamGrad.addColorStop(1, 'rgba(0, 255, 102, 0.02)');
    
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, activeRadius, sweepAngle - 0.35, sweepAngle);
    ctx.closePath();
    ctx.fill();
    
    // Glowing sweep front edge line
    ctx.strokeStyle = 'rgba(0, 255, 102, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00ff66';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweepAngle) * activeRadius, cy + Math.sin(sweepAngle) * activeRadius);
    ctx.stroke();
    ctx.restore();
    
    // Update and draw radar targets
    blips.forEach(blip => {
      blip.update(sweepAngle);
      blip.draw(cx, cy);
    });
    
    animId = requestAnimationFrame(animate);
  };
  
  slider.addEventListener('input', () => {
    targetVal = parseInt(slider.value, 10);
  });
  
  animate();
}`,
  ts: `// TypeScript Implementation
const canvas = document.querySelector('.crt-radar-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.crt-radar-slider') as HTMLInputElement;
  const percentText = document.querySelector('.crt-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let sweepAngle = 0;
    let blips: RadarBlip[] = [];
    
    canvas.width = 170;
    canvas.height = 170;
    
    class RadarBlip {
      angle: number; distance: number; alpha: number; maxAlpha: number; size: number; pinged: boolean;
      constructor(angle: number, distance: number) {
        this.angle = angle;
        this.distance = distance;
        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.7 + 0.3;
        this.size = Math.random() * 3 + 2;
        this.pinged = false;
      }
      
      update(sweepAngle: number) {
        const angleDiff = Math.abs((sweepAngle % (Math.PI * 2)) - this.angle);
        if (angleDiff < 0.05) {
          this.alpha = this.maxAlpha;
          this.pinged = true;
        } else {
          this.alpha -= 0.008;
          if (this.alpha < 0) this.alpha = 0;
        }
      }
      
      draw(cx: number, cy: number) {
        if (!ctx || this.alpha <= 0) return;
        const x = cx + Math.cos(this.angle) * this.distance;
        const y = cy + Math.sin(this.angle) * this.distance;
        
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#00ff66';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff66';
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#00ff66';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, this.size * 2 * (1 - this.alpha), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
    
    for (let i = 0; i < 6; i++) {
      blips.push(new RadarBlip(Math.random() * Math.PI * 2, Math.random() * 45 + 15));
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
      sweepAngle += 0.025;
      
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.08)';
      ctx.lineWidth = 1;
      for (let r = 20; r <= 70; r += 25) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx - 75, cy); ctx.lineTo(cx + 75, cy);
      ctx.moveTo(cx, cy - 75); ctx.lineTo(cx, cy + 75);
      ctx.stroke();
      ctx.restore();
      
      const activeRadius = 70;
      
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.05)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, activeRadius + 5, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = '#00ff66';
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ff66';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(cx, cy, activeRadius + 5, -Math.PI / 2, -Math.PI / 2 + (currentVal / 100) * Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      const beamGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, activeRadius);
      beamGrad.addColorStop(0, 'rgba(0, 255, 102, 0.15)');
      beamGrad.addColorStop(1, 'rgba(0, 255, 102, 0.02)');
      
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, activeRadius, sweepAngle - 0.35, sweepAngle);
      ctx.closePath();
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00ff66';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * activeRadius, cy + Math.sin(sweepAngle) * activeRadius);
      ctx.stroke();
      ctx.restore();
      
      blips.forEach(blip => {
        blip.update(sweepAngle);
        blip.draw(cx, cy);
      });
      
      animId = requestAnimationFrame(animate);
    };
    
    slider.addEventListener('input', () => {
      targetVal = parseInt(slider.value, 10);
    });
    
    animate();
  }
}`,
  css: `/* CRT Radar Gauge Styles */
.crt-radar-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #021a08 0%, #000000 100%);
  border: 1px solid rgba(0, 255, 102, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.crt-radar-wrapper {
  position: relative;
  width: 170px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: inset 0 0 20px rgba(0, 255, 102, 0.2);
}

/* CRT monitor screen line effects */
.crt-scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%);
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 15;
  border-radius: 50%;
  opacity: 0.85;
}

.crt-glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%);
  pointer-events: none;
  z-index: 16;
  border-radius: 50%;
}

.crt-radar-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.crt-radar-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 12;
}

.crt-title {
  font-family: monospace;
  font-size: 7px;
  color: rgba(0, 255, 102, 0.35);
  letter-spacing: 2px;
}

.crt-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #00ff66;
  text-shadow: 0 0 10px rgba(0, 255, 102, 0.8);
  margin-top: 1px;
}

.crt-radar-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 10px;
}

.crt-radar-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(0, 255, 102, 0.05);
  border-radius: 2px;
  outline: none;
}

.crt-radar-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00ff66;
  border: 2px solid #021a08;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(0, 255, 102, 0.7);
  transition: transform 0.15s;
}

.crt-radar-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#021a08] to-[#000000] border border-[#00ff66]/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="crt-radar-sandbox-container">
  <div class="relative w-[170px] h-[170px] flex items-center justify-center rounded-full shadow-[inset_0_0_20px_rgba(0,255,102,0.2)] overflow-hidden">
    <div class="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-20 rounded-full opacity-85"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_50%)] pointer-events-none z-30 rounded-full"></div>
    <canvas class="crt-radar-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-10">
      <span class="font-mono text-[7px] text-[#00ff66]/35 tracking-widest">RADAR SEARCH</span>
      <span class="crt-percent font-sans text-2xl font-extrabold text-[#00ff66] drop-shadow-[0_0_10px_rgba(0,255,102,0.8)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-2.5">
    <input type="range" class="crt-radar-slider w-full h-1 bg-[#00ff66]/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00ff66] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#021a08] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="75" />
  </div>
</div>`,
  prompt: 'Design a circular CRT Radar screen progress component in deep phosphor-green with a scanline overlay, circular grid lines, radar beam sweep, and fading target blips.'
};
