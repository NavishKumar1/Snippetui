/**
 * Component: Acoustic Amplitude Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'acoustic-amplitude-progress',
  name: 'Acoustic Amplitude Progress',
  category: 'progress-and-gauges',
  tag: 'Creative',
  html: `<div class="acoustic-amp-sandbox" id="acoustic-amp-sandbox-container">
  <div class="acoustic-amp-wrapper">
    <canvas class="acoustic-amp-canvas"></canvas>
    <div class="acoustic-amp-info">
      <span class="amp-title">DECIBEL POWER</span>
      <span class="amp-percent">0%</span>
    </div>
  </div>
  
  <div class="acoustic-amp-controls">
    <input type="range" class="acoustic-amp-slider" min="0" max="100" value="40" />
  </div>
</div>`,
  js: `// Acoustic Amplitude Progress Canvas Logic
const canvas = document.querySelector('.acoustic-amp-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.acoustic-amp-slider');
  const percentText = document.querySelector('.amp-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let time = 0;
  
  canvas.width = 240;
  canvas.height = 120;
  
  const animate = () => {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const w = canvas.width;
    const h = canvas.height;
    const midY = h / 2;
    
    currentVal += (targetVal - currentVal) * 0.12;
    percentText.textContent = \`\${Math.round(currentVal)}%\`;
    
    time += 0.05 + (currentVal / 100) * 0.08;
    
    // Sound wave configurations
    // Progress scales wave height (amplitude) and wave speed
    const maxAmp = 5 + (currentVal / 100) * 35;
    const waveCount = 3 + Math.floor((currentVal / 100) * 3);
    
    // Wave colors shifting from Blue-Teal to Magenta-Pink
    let hueStart = 190; // Cyan
    let hueEnd = 240;   // Royal blue
    
    if (currentVal > 50) {
      hueStart = 240; // Royal Blue
      hueEnd = 320;   // Magenta
    }
    
    for (let i = 0; i < waveCount; i++) {
      ctx.save();
      const pct = i / (waveCount - 1 || 1);
      const amp = maxAmp * (0.4 + 0.6 * Math.sin(pct * Math.PI));
      const freq = 0.015 + (1 - pct) * 0.015;
      const speedPhase = time * (1.2 - pct * 0.4);
      
      const waveHue = hueStart + (hueEnd - hueStart) * pct;
      const waveColor = \`hsla(\${waveHue}, 100%, 65%, \${0.18 + (1 - pct) * 0.32})\`;
      
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 1.5 + (1 - pct) * 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = waveColor;
      
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        // Apply capsule bubble boundary damping to waves (pinch at edges)
        const envelope = Math.sin((x / w) * Math.PI);
        const y = midY + Math.sin(x * freq + speedPhase) * amp * envelope;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.restore();
    }
    
    // Draw subtle container capsule border
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(10, 10, w - 20, h - 20, 16);
    ctx.stroke();
    
    // Draw linear progress tracking line at the bottom of the capsule
    const totalLineW = w - 40;
    const progressLineW = totalLineW * (currentVal / 100);
    
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(20, h - 22);
    ctx.lineTo(20 + totalLineW, h - 22);
    ctx.stroke();
    
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 242, 254, 0.8)';
    ctx.beginPath();
    ctx.moveTo(20, h - 22);
    ctx.lineTo(20 + progressLineW, h - 22);
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
const canvas = document.querySelector('.acoustic-amp-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.acoustic-amp-slider') as HTMLInputElement;
  const percentText = document.querySelector('.amp-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let time = 0;
    
    canvas.width = 240;
    canvas.height = 120;
    
    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;
      
      currentVal += (targetVal - currentVal) * 0.12;
      percentText.textContent = \`\${Math.round(currentVal)}%\`;
      time += 0.05 + (currentVal / 100) * 0.08;
      
      const maxAmp = 5 + (currentVal / 100) * 35;
      const waveCount = 3 + Math.floor((currentVal / 100) * 3);
      
      let hueStart = 190;
      let hueEnd = 240;
      
      if (currentVal > 50) {
        hueStart = 240;
        hueEnd = 320;
      }
      
      for (let i = 0; i < waveCount; i++) {
        ctx.save();
        const pct = i / (waveCount - 1 || 1);
        const amp = maxAmp * (0.4 + 0.6 * Math.sin(pct * Math.PI));
        const freq = 0.015 + (1 - pct) * 0.015;
        const speedPhase = time * (1.2 - pct * 0.4);
        
        const waveHue = hueStart + (hueEnd - hueStart) * pct;
        const waveColor = \`hsla(\${waveHue}, 100%, 65%, \${0.18 + (1 - pct) * 0.32})\`;
        
        ctx.strokeStyle = waveColor;
        ctx.lineWidth = 1.5 + (1 - pct) * 1.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = waveColor;
        
        ctx.beginPath();
        for (let x = 0; x < w; x++) {
          const envelope = Math.sin((x / w) * Math.PI);
          const y = midY + Math.sin(x * freq + speedPhase) * amp * envelope;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();
      }
      
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Use roundRect compatibility
      if (ctx.roundRect) {
        ctx.roundRect(10, 10, w - 20, h - 20, 16);
      } else {
        ctx.rect(10, 10, w - 20, h - 20);
      }
      ctx.stroke();
      
      const totalLineW = w - 40;
      const progressLineW = totalLineW * (currentVal / 100);
      
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(20, h - 22);
      ctx.lineTo(20 + totalLineW, h - 22);
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.8)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.8)';
      ctx.beginPath();
      ctx.moveTo(20, h - 22);
      ctx.lineTo(20 + progressLineW, h - 22);
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
  css: `/* Acoustic Amplitude Progress Styles */
.acoustic-amp-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #020813 0%, #000000 100%);
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

.acoustic-amp-wrapper {
  position: relative;
  width: 240px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.acoustic-amp-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.acoustic-amp-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.amp-title {
  font-family: monospace;
  font-size: 7px;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 1.5px;
}

.amp-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.6);
  margin-top: 1px;
}

.acoustic-amp-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 14px;
}

.acoustic-amp-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.acoustic-amp-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00f2fe;
  border: 2px solid #020813;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 242, 254, 0.6);
  transition: transform 0.15s;
}

.acoustic-amp-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#020813] to-[#000000] border border-cyan-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="acoustic-amp-sandbox-container">
  <div class="relative w-[240px] h-[120px] flex items-center justify-center">
    <canvas class="acoustic-amp-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-20">
      <span class="font-mono text-[7px] text-white/20 tracking-wider">DECIBEL POWER</span>
      <span class="amp-percent font-sans text-2xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,242,254,0.6)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-3.5">
    <input type="range" class="acoustic-amp-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00f2fe] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#020813] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="40" />
  </div>
</div>`,
  prompt: 'Design a capsule-shaped acoustic voice-print frequency progress bar with multiple sine-waves shifting in frequency and amplitude.'
};
