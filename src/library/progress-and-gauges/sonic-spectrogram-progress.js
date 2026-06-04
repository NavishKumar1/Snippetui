/**
 * Component: Sonic Spectrogram Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'sonic-spectrogram-progress',
  name: 'Sonic Spectrogram Progress',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="sonic-spectrogram-sandbox" id="sonic-spectrogram-sandbox-container">
  <div class="sonic-wrapper">
    <canvas class="sonic-canvas"></canvas>
    <div class="sonic-info">
      <span class="sonic-title">SPECTRAL ENERGY</span>
      <span class="sonic-val">0%</span>
    </div>
  </div>
  
  <div class="sonic-controls">
    <input type="range" class="sonic-slider" min="0" max="100" value="70" />
  </div>
</div>`,
  js: `// Sonic Spectrogram Progress Canvas Animation Logic
const container = document.querySelector('.sonic-spectrogram-sandbox');
if (container) {
  const canvas = container.querySelector('.sonic-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.sonic-slider');
  const valLabel = container.querySelector('.sonic-val');
  
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
    currentVal += (targetVal - currentVal) * 0.12;
    valLabel.textContent = \`\${Math.round(currentVal)}%\`;
    
    time += 0.15;
    
    const barWidth = 4;
    const barGap = 3;
    const totalBars = Math.floor(w / (barWidth + barGap));
    const activeThreshold = (currentVal / 100) * totalBars;
    
    for (let i = 0; i < totalBars; i++) {
      const x = i * (barWidth + barGap);
      const isActive = i < activeThreshold;
      
      // Calculate dynamic wave amplitude using sine math combined with noise
      const waveFreq = 0.18;
      const noise = Math.sin(i * waveFreq - time) * Math.cos(i * waveFreq * 0.5 + time * 0.5);
      const baseHeight = 15;
      
      // Active bars get taller, dancing animation
      const amp = isActive ? 45 + Math.sin(time + i) * 10 : 8;
      const barHeight = Math.max(5, baseHeight + Math.abs(noise) * amp);
      
      // Center vertically or draw from bottom? Drawing from bottom is standard spectrogram style
      const y = h - barHeight;
      
      ctx.save();
      if (isActive) {
        // Vibrant neon purple-to-blue-pink spectral gradient
        const grad = ctx.createLinearGradient(0, y, 0, h);
        grad.addColorStop(0, '#ff007f'); // Neon pink peak
        grad.addColorStop(0.5, '#7928ca'); // Dark violet
        grad.addColorStop(1, '#00f2fe'); // Neon blue base
        
        ctx.fillStyle = grad;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(121, 40, 202, 0.4)';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      }
      
      // Rounded capsule bar design
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, barWidth, barHeight, 2);
      } else {
        ctx.rect(x, y, barWidth, barHeight);
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
}`,
  ts: `// TypeScript Implementation
const container = document.querySelector('.sonic-spectrogram-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.sonic-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.sonic-slider') as HTMLInputElement;
  const valLabel = container.querySelector('.sonic-val') as HTMLSpanElement;
  
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
      
      currentVal += (targetVal - currentVal) * 0.12;
      valLabel.textContent = \`\${Math.round(currentVal)}%\`;
      time += 0.15;
      
      const barWidth = 4;
      const barGap = 3;
      const totalBars = Math.floor(w / (barWidth + barGap));
      const activeThreshold = (currentVal / 100) * totalBars;
      
      for (let i = 0; i < totalBars; i++) {
        const x = i * (barWidth + barGap);
        const isActive = i < activeThreshold;
        
        const waveFreq = 0.18;
        const noise = Math.sin(i * waveFreq - time) * Math.cos(i * waveFreq * 0.5 + time * 0.5);
        const baseHeight = 15;
        
        const amp = isActive ? 45 + Math.sin(time + i) * 10 : 8;
        const barHeight = Math.max(5, baseHeight + Math.abs(noise) * amp);
        const y = h - barHeight;
        
        ctx.save();
        if (isActive) {
          const grad = ctx.createLinearGradient(0, y, 0, h);
          grad.addColorStop(0, '#ff007f');
          grad.addColorStop(0.5, '#7928ca');
          grad.addColorStop(1, '#00f2fe');
          
          ctx.fillStyle = grad;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(121, 40, 202, 0.4)';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        }
        
        ctx.beginPath();
        if ('roundRect' in ctx) {
          (ctx as any).roundRect(x, y, barWidth, barHeight, 2);
        } else {
          ctx.rect(x, y, barWidth, barHeight);
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
  css: `/* Sonic Spectrogram Progress styles */
.sonic-spectrogram-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #0a0312 0%, #020105 100%);
  border: 1px solid rgba(121, 40, 202, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.sonic-wrapper {
  position: relative;
  width: 280px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sonic-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.sonic-info {
  position: absolute;
  top: 6px;
  left: 6px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
}

.sonic-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.sonic-val {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ff007f;
  text-shadow: 0 0 10px rgba(255, 0, 127, 0.5);
  margin-top: 2px;
}

.sonic-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 24px;
}

.sonic-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.sonic-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff007f;
  border: 2px solid #0a0312;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 0, 127, 0.5);
  transition: transform 0.15s;
}

.sonic-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#0a0312] to-[#020105] border border-purple-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="sonic-spectrogram-sandbox-container">
  <div class="relative w-[280px] h-[100px] flex items-center justify-center">
    <canvas class="sonic-canvas absolute inset-0"></canvas>
    <div class="absolute top-1.5 left-1.5 flex flex-col pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">SPECTRAL ENERGY</span>
      <span class="sonic-val font-sans text-sm font-extrabold text-[#ff007f] drop-shadow-[0_0_10px_rgba(255,0,127,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-6">
    <input type="range" class="sonic-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff007f] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0a0312] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="70" />
  </div>
</div>`,
  prompt: 'Design a landscape spectral analyzer frequency equalizer progress bar component that lights up and dances dynamically using custom canvas peaks.'
};
