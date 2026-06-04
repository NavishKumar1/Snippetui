/**
 * Component: Aurora Borealis Ribbon Gauge
 * Category: progress-and-gauges
 */

export const component = {
  id: 'aurora-borealis-ribbon-gauge',
  name: 'Aurora Borealis Ribbon Gauge',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="aurora-ribbon-sandbox" id="aurora-ribbon-sandbox-container">
  <div class="aurora-wrapper">
    <canvas class="aurora-canvas"></canvas>
    <div class="aurora-info">
      <span class="aurora-title">AURORA CURTAIN</span>
      <span class="aurora-val">0%</span>
    </div>
  </div>
  
  <div class="aurora-controls">
    <input type="range" class="aurora-slider" min="0" max="100" value="65" />
  </div>
</div>`,
  js: `// Aurora Borealis Ribbon Gauge Canvas Animation Logic
const canvas = document.querySelector('.aurora-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.aurora-slider');
  const valLabel = document.querySelector('.aurora-val');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let time = 0;
  
  canvas.width = 280;
  canvas.height = 100;
  
  const animate = () => {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const w = canvas.width;
    const h = canvas.height;
    
    // Smooth value interpolation
    currentVal += (targetVal - currentVal) * 0.1;
    valLabel.textContent = \`\${Math.round(currentVal)}%\`;
    
    time += 0.02;
    
    const fillWidth = w * (currentVal / 100);
    
    // Draw background empty path
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, h / 2 + 10);
    ctx.lineTo(w, h / 2 + 10);
    ctx.stroke();
    ctx.restore();
    
    // Draw waving glowing Aurora ribbons inside the active region
    if (fillWidth > 2) {
      ctx.save();
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00ff66';
      
      // We will draw multiple layered waves with opacity to simulate the aurora curtains
      const layers = 3;
      for (let l = 0; l < layers; l++) {
        ctx.beginPath();
        const alpha = 0.2 + (l / layers) * 0.4;
        
        // Green-to-magenta gradient shifting procedurally
        const colorOffset = Math.sin(time + l) * 30;
        ctx.strokeStyle = l === 0 ? \`rgba(0, 255, 102, \${alpha})\` : (l === 1 ? \`rgba(0, 242, 254, \${alpha})\` : \`rgba(255, 0, 127, \${alpha})\`);
        
        ctx.moveTo(0, h / 2 + 10);
        for (let x = 0; x <= fillWidth; x += 4) {
          const waveFreq = 0.025;
          const amp = 10 + l * 4;
          const y = h / 2 + 10 + Math.sin(x * waveFreq - time * 2 + l) * Math.cos(x * waveFreq * 0.5 + time) * amp;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
      
      // Draw a bright guiding lead spark node at the edge of the aurora ribbon
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ff66';
      ctx.beginPath();
      const waveFreq = 0.025;
      const leadingY = h / 2 + 10 + Math.sin(fillWidth * waveFreq - time * 2) * Math.cos(fillWidth * waveFreq * 0.5 + time) * 10;
      ctx.arc(fillWidth, leadingY, 4, 0, Math.PI * 2);
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
const canvas = document.querySelector('.aurora-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.aurora-slider') as HTMLInputElement;
  const valLabel = document.querySelector('.aurora-val') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let time = 0;
    
    canvas.width = 280;
    canvas.height = 100;
    
    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      
      currentVal += (targetVal - currentVal) * 0.1;
      valLabel.textContent = \`\${Math.round(currentVal)}%\`;
      time += 0.02;
      
      const fillWidth = w * (currentVal / 100);
      
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, h / 2 + 10);
      ctx.lineTo(w, h / 2 + 10);
      ctx.stroke();
      ctx.restore();
      
      if (fillWidth > 2) {
        ctx.save();
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff66';
        
        const layers = 3;
        for (let l = 0; l < layers; l++) {
          ctx.beginPath();
          const alpha = 0.2 + (l / layers) * 0.4;
          ctx.strokeStyle = l === 0 ? \`rgba(0, 255, 102, \${alpha})\` : (l === 1 ? \`rgba(0, 242, 254, \${alpha})\` : \`rgba(255, 0, 127, \${alpha})\`);
          
          ctx.moveTo(0, h / 2 + 10);
          for (let x = 0; x <= fillWidth; x += 4) {
            const waveFreq = 0.025;
            const amp = 10 + l * 4;
            const y = h / 2 + 10 + Math.sin(x * waveFreq - time * 2 + l) * Math.cos(x * waveFreq * 0.5 + time) * amp;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.restore();
        
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff66';
        ctx.beginPath();
        const waveFreq = 0.025;
        const leadingY = h / 2 + 10 + Math.sin(fillWidth * waveFreq - time * 2) * Math.cos(fillWidth * waveFreq * 0.5 + time) * 10;
        ctx.arc(fillWidth, leadingY, 4, 0, Math.PI * 2);
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
  css: `/* Aurora Borealis Ribbon Gauge styles */
.aurora-ribbon-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #010c08 0%, #000201 100%);
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

.aurora-wrapper {
  position: relative;
  width: 280px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aurora-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.aurora-info {
  position: absolute;
  top: 6px;
  left: 6px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
}

.aurora-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.aurora-val {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #00ff66;
  text-shadow: 0 0 10px rgba(0, 255, 102, 0.5);
  margin-top: 2px;
}

.aurora-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 24px;
}

.aurora-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.aurora-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00ff66;
  border: 2px solid #010c08;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 255, 102, 0.5);
  transition: transform 0.15s;
}

.aurora-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#010c08] to-[#000201] border border-green-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="aurora-ribbon-sandbox-container">
  <div class="relative w-[280px] h-[100px] flex items-center justify-center">
    <canvas class="aurora-canvas absolute inset-0"></canvas>
    <div class="absolute top-1.5 left-1.5 flex flex-col pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">AURORA CURTAIN</span>
      <span class="aurora-val font-sans text-sm font-extrabold text-[#00ff66] drop-shadow-[0_0_10px_rgba(0,255,102,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-6">
    <input type="range" class="aurora-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00ff66] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#010c08] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="65" />
  </div>
</div>`,
  prompt: 'Design a waving aurora borealis ribbon progress bar component with glowing layered waves shifting from green to violet.'
};
