/**
 * Component: Liquid Mercury Slideline Gauge
 * Category: progress-and-gauges
 */

export const component = {
  id: 'liquid-mercury-slideline-gauge',
  name: 'Liquid Mercury Slideline Gauge',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="mercury-slideline-sandbox" id="mercury-slideline-sandbox-container">
  <div class="mercury-wrapper">
    <canvas class="mercury-canvas"></canvas>
    <div class="mercury-info">
      <span class="mercury-title">QUICKSILVER LEVEL</span>
      <span class="mercury-val">0%</span>
    </div>
  </div>
  
  <div class="mercury-controls">
    <input type="range" class="mercury-slider" min="0" max="100" value="60" />
  </div>
</div>`,
  js: `// Liquid Mercury Slideline Gauge Canvas Animation Logic
const canvas = document.querySelector('.mercury-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.mercury-slider');
  const valLabel = document.querySelector('.mercury-val');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let wobbleTime = 0;
  
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
    
    // Smooth value LERP
    currentVal += (targetVal - currentVal) * 0.12;
    valLabel.textContent = \`\${Math.round(currentVal)}%\`;
    
    wobbleTime += 0.08;
    
    const barH = 18;
    const barY = h / 2 - barH / 2 + 12;
    const activeW = w * (currentVal / 100);
    
    // 1. Draw outer glass tube frame
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, barY, w, barH, 9) : ctx.rect(0, barY, w, barH);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    
    // 2. Draw metallic mercury level with spring elasticity at the tip
    if (activeW > 6) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(1, barY + 1, activeW - 2, barH - 2, 8) : ctx.rect(1, barY + 1, activeW - 2, barH - 2);
      ctx.clip();
      
      // Metallic Chrome gradient fill
      const grad = ctx.createLinearGradient(0, barY, 0, barY + barH);
      grad.addColorStop(0, '#ffffff'); // Chrome shine
      grad.addColorStop(0.3, '#d0d3d4'); // Silver metallic
      grad.addColorStop(0.7, '#85929e'); // Shadowed metal
      grad.addColorStop(1, '#566573');
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, barY, activeW, barH);
      
      // Procedural reflection highlights (metallic lines)
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, barY + 4);
      ctx.lineTo(activeW, barY + 4); // Continuous horizontal glare line
      ctx.stroke();
      
      ctx.restore();
      
      // 3. Spring liquid drop shape at the active leading edge
      ctx.save();
      const edgeX = activeW - 1;
      const wobble = Math.sin(wobbleTime) * (1.5 + Math.abs(targetVal - currentVal) * 0.2);
      
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#d0d3d4';
      ctx.beginPath();
      // Elastic oval drop
      ctx.ellipse(edgeX - 1, barY + barH / 2, 4 + wobble, 6 - wobble, 0, 0, Math.PI * 2);
      ctx.fill();
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
const canvas = document.querySelector('.mercury-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.mercury-slider') as HTMLInputElement;
  const valLabel = document.querySelector('.mercury-val') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let wobbleTime = 0;
    
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
      wobbleTime += 0.08;
      
      const barH = 18;
      const barY = h / 2 - barH / 2 + 12;
      const activeW = w * (currentVal / 100);
      
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if ('roundRect' in ctx) {
        (ctx as any).roundRect(0, barY, w, barH, 9);
      } else {
        ctx.rect(0, barY, w, barH);
      }
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      
      if (activeW > 6) {
        ctx.save();
        ctx.beginPath();
        if ('roundRect' in ctx) {
          (ctx as any).roundRect(1, barY + 1, activeW - 2, barH - 2, 8);
        } else {
          ctx.rect(1, barY + 1, activeW - 2, barH - 2);
        }
        ctx.clip();
        
        const grad = ctx.createLinearGradient(0, barY, 0, barY + barH);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, '#d0d3d4');
        grad.addColorStop(0.7, '#85929e');
        grad.addColorStop(1, '#566573');
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, barY, activeW, barH);
        
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, barY + 4);
        ctx.lineTo(activeW, barY + 4);
        ctx.stroke();
        
        ctx.restore();
        
        ctx.save();
        const edgeX = activeW - 1;
        const wobble = Math.sin(wobbleTime) * (1.5 + Math.abs(targetVal - currentVal) * 0.2);
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#d0d3d4';
        ctx.beginPath();
        if ('ellipse' in ctx) {
          ctx.ellipse(edgeX - 1, barY + barH / 2, 4 + wobble, 6 - wobble, 0, 0, Math.PI * 2);
        } else {
          ctx.arc(edgeX - 1, barY + barH / 2, 5, 0, Math.PI * 2);
        }
        ctx.fill();
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
  css: `/* Liquid Mercury Slideline Gauge styles */
.mercury-slideline-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #0f151c 0%, #000102 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.mercury-wrapper {
  position: relative;
  width: 280px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mercury-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.mercury-info {
  position: absolute;
  top: -12px;
  left: 6px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
}

.mercury-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.mercury-val {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}

.mercury-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 32px;
}

.mercury-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.mercury-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #0f151c;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
  transition: transform 0.15s;
}

.mercury-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#0f151c] to-[#000102] border border-white/5 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="mercury-slideline-sandbox-container">
  <div class="relative w-[280px] h-[80px] flex items-center justify-center">
    <canvas class="mercury-canvas absolute inset-0"></canvas>
    <div class="absolute -top-3 left-1.5 flex flex-col pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">QUICKSILVER LEVEL</span>
      <span class="mercury-val font-sans text-sm font-extrabold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-8">
    <input type="range" class="mercury-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0f151c] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="60" />
  </div>
</div>`,
  prompt: 'Design a quicksilver liquid mercury slide progress bar component displaying reflections and high-fidelity elastic drops.'
};
