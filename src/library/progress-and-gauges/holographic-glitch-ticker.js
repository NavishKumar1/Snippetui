/**
 * Component: Holographic Glitch Ticker Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'holographic-glitch-ticker',
  name: 'Holographic Glitch Ticker Progress',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="holo-glitch-sandbox" id="holo-glitch-sandbox-container">
  <div class="holo-glitch-wrapper">
    <canvas class="holo-glitch-canvas"></canvas>
    <div class="holo-glitch-info">
      <span class="holo-title">HOLO MATRIX STATUS</span>
      <span class="holo-val">0%</span>
    </div>
  </div>
  
  <div class="holo-glitch-controls">
    <input type="range" class="holo-glitch-slider" min="0" max="100" value="65" />
  </div>
</div>`,
  js: `// Holographic Glitch Ticker Progress Canvas Animation Logic
const canvas = document.querySelector('.holo-glitch-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.holo-glitch-slider');
  const valLabel = document.querySelector('.holo-val');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let glitchTime = 0;
  
  canvas.width = 280;
  canvas.height = 80;
  
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
    valLabel.textContent = \`\${Math.round(currentVal)}%\`;
    
    glitchTime++;
    
    const barH = 16;
    const barY = h / 2 - barH / 2 + 12;
    const activeW = w * (currentVal / 100);
    
    // Determine if we should trigger a glitch slice shift (every ~100 frames, lasting 5 frames)
    const isGlitch = (glitchTime % 120 > 115) || (Math.random() < 0.02);
    const glitchOffset = isGlitch ? (Math.random() - 0.5) * 14 : 0;
    
    // 1. Draw static background channel track
    ctx.save();
    ctx.fillStyle = 'rgba(0, 242, 254, 0.03)';
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.1)';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, barY, w, barH, 4) : ctx.rect(0, barY, w, barH);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    
    // 2. Draw glowing active holographic ticker
    if (activeW > 2) {
      ctx.save();
      // Apply split channel chromatic aberration if glitch is active
      if (isGlitch) {
        // Red offset
        ctx.fillStyle = 'rgba(255, 0, 80, 0.7)';
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(glitchOffset, barY - 1, activeW, barH + 2, 4) : ctx.rect(glitchOffset, barY - 1, activeW, barH + 2);
        ctx.fill();
        
        // Blue/Teal offset
        ctx.fillStyle = 'rgba(0, 242, 254, 0.7)';
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(-glitchOffset, barY + 1, activeW, barH - 2, 4) : ctx.rect(-glitchOffset, barY + 1, activeW, barH - 2);
        ctx.fill();
      } else {
        // Normal clean high-tech cyan gradient fill
        const grad = ctx.createLinearGradient(0, 0, activeW, 0);
        grad.addColorStop(0, 'rgba(0, 120, 255, 0.8)');
        grad.addColorStop(1, '#00f2fe');
        
        ctx.fillStyle = grad;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00f2fe';
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(0, barY, activeW, barH, 4) : ctx.rect(0, barY, activeW, barH);
        ctx.fill();
      }
      ctx.restore();
      
      // 3. Holographic radials/laser grid scan line overlay
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 0.5;
      const gridW = 6;
      for (let g = 0; g < activeW; g += gridW) {
        ctx.beginPath();
        ctx.moveTo(g, barY);
        ctx.lineTo(g, barY + barH);
        ctx.stroke();
      }
      ctx.restore();
    }
    
    animId = requestAnimationFrame(animate);
  };
  
  slider.addEventListener('input', () => {
    targetVal = parseInt(slider.value, 10);
  });
  
  animate();
}`,
  ts: `// TypeScript Implementation
const canvas = document.querySelector('.holo-glitch-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.holo-glitch-slider') as HTMLInputElement;
  const valLabel = document.querySelector('.holo-val') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let glitchTime = 0;
    
    canvas.width = 280;
    canvas.height = 80;
    
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
      glitchTime++;
      
      const barH = 16;
      const barY = h / 2 - barH / 2 + 12;
      const activeW = w * (currentVal / 100);
      
      const isGlitch = (glitchTime % 120 > 115) || (Math.random() < 0.02);
      const glitchOffset = isGlitch ? (Math.random() - 0.5) * 14 : 0;
      
      ctx.save();
      ctx.fillStyle = 'rgba(0, 242, 254, 0.03)';
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.1)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      if ('roundRect' in ctx) {
        (ctx as any).roundRect(0, barY, w, barH, 4);
      } else {
        ctx.rect(0, barY, w, barH);
      }
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      
      if (activeW > 2) {
        ctx.save();
        if (isGlitch) {
          ctx.fillStyle = 'rgba(255, 0, 80, 0.7)';
          ctx.beginPath();
          if ('roundRect' in ctx) {
            (ctx as any).roundRect(glitchOffset, barY - 1, activeW, barH + 2, 4);
          } else {
            ctx.rect(glitchOffset, barY - 1, activeW, barH + 2);
          }
          ctx.fill();
          
          ctx.fillStyle = 'rgba(0, 242, 254, 0.7)';
          ctx.beginPath();
          if ('roundRect' in ctx) {
            (ctx as any).roundRect(-glitchOffset, barY + 1, activeW, barH - 2, 4);
          } else {
            ctx.rect(-glitchOffset, barY + 1, activeW, barH - 2);
          }
          ctx.fill();
        } else {
          const grad = ctx.createLinearGradient(0, 0, activeW, 0);
          grad.addColorStop(0, 'rgba(0, 120, 255, 0.8)');
          grad.addColorStop(1, '#00f2fe');
          
          ctx.fillStyle = grad;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#00f2fe';
          ctx.beginPath();
          if ('roundRect' in ctx) {
            (ctx as any).roundRect(0, barY, activeW, barH, 4);
          } else {
            ctx.rect(0, barY, activeW, barH);
          }
          ctx.fill();
        }
        ctx.restore();
        
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 0.5;
        const gridW = 6;
        for (let g = 0; g < activeW; g += gridW) {
          ctx.beginPath();
          ctx.moveTo(g, barY);
          ctx.lineTo(g, barY + barH);
          ctx.stroke();
        }
        ctx.restore();
      }
      
      animId = requestAnimationFrame(animate);
    };
    
    slider.addEventListener('input', () => {
      targetVal = parseInt(slider.value, 10);
    });
    
    animate();
  }
}`,
  css: `/* Holographic Glitch Ticker Progress styles */
.holo-glitch-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #020712 0%, #000103 100%);
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

.holo-glitch-wrapper {
  position: relative;
  width: 280px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.holo-glitch-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.holo-glitch-info {
  position: absolute;
  top: -12px;
  left: 6px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
}

.holo-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.holo-val {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #00f2fe;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
  margin-top: 2px;
}

.holo-glitch-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 32px;
}

.holo-glitch-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.holo-glitch-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00f2fe;
  border: 2px solid #020712;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 242, 254, 0.5);
  transition: transform 0.15s;
}

.holo-glitch-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#020712] to-[#000103] border border-cyan-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="holo-glitch-sandbox-container">
  <div class="relative w-[280px] h-[80px] flex items-center justify-center">
    <canvas class="holo-glitch-canvas absolute inset-0"></canvas>
    <div class="absolute -top-3 left-1.5 flex flex-col pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">HOLO MATRIX STATUS</span>
      <span class="holo-val font-sans text-sm font-extrabold text-[#00f2fe] drop-shadow-[0_0_10px_rgba(0,242,254,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-8">
    <input type="range" class="holo-glitch-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00f2fe] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#020712] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="65" />
  </div>
</div>`,
  prompt: 'Design a landscape holographic glitch bar component with periodic vertical splits and RGB chromatic aberration.'
};
