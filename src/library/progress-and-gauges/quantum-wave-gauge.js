/**
 * Component: Quantum Wave Gauge
 * Category: progress-and-gauges
 */

export const component = {
  id: 'quantum-wave-gauge',
  name: 'Quantum Wave Gauge',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="quantum-wave-sandbox" id="quantum-wave-sandbox-container">
  <div class="quantum-wave-container">
    <canvas class="quantum-wave-canvas"></canvas>
    <div class="quantum-wave-label">
      <span class="quantum-percent">0%</span>
      <span class="quantum-status">QUANTUM CORE</span>
    </div>
  </div>
  
  <div class="quantum-wave-controls">
    <input type="range" class="quantum-wave-slider" min="0" max="100" value="65" />
  </div>
</div>`,
  js: `// Quantum Wave Gauge Canvas Animation Logic
const container = document.querySelector('.quantum-wave-sandbox');
if (container) {
  const canvas = container.querySelector('.quantum-wave-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.quantum-wave-slider');
  const percentText = container.querySelector('.quantum-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let waveTime = 0;
  
  canvas.width = 160;
  canvas.height = 160;
  
  const animate = () => {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 64;
    
    // Smooth value interpolation
    currentVal += (targetVal - currentVal) * 0.1;
    percentText.textContent = \`\${Math.round(currentVal)}%\`;
    
    // Increment wave phase
    waveTime += 0.08;
    
    // 1. Draw static outer ambient track
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    
    // 2. Draw outer active circular progress indicator
    const angleOffset = -Math.PI / 2;
    const endAngle = angleOffset + (currentVal / 100) * Math.PI * 2;
    ctx.save();
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(0, 242, 254, 0.5)';
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, angleOffset, endAngle);
    ctx.stroke();
    ctx.restore();
    
    // 3. Draw liquid wave inside the circular clip area
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip(); // Mask wave inside the circle
    
    // Background fill of inner orb
    ctx.fillStyle = '#060a12';
    ctx.fill();
    
    // Waves calculation
    const fillHeight = radius * 2 * (currentVal / 100);
    const waveY = cy + radius - fillHeight;
    
    // Draw back wave (deep indigo-blue)
    ctx.fillStyle = 'rgba(0, 75, 150, 0.5)';
    ctx.beginPath();
    ctx.moveTo(cx - radius, cy + radius);
    for (let x = cx - radius; x <= cx + radius; x++) {
      const angle = (x / radius) * Math.PI * 1.5 + waveTime;
      const y = waveY + Math.sin(angle) * 4;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(cx + radius, cy + radius);
    ctx.closePath();
    ctx.fill();
    
    // Draw front wave (bright aqua/cyan neon)
    ctx.fillStyle = 'rgba(0, 242, 254, 0.8)';
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(0, 242, 254, 0.6)';
    ctx.beginPath();
    ctx.moveTo(cx - radius, cy + radius);
    for (let x = cx - radius; x <= cx + radius; x++) {
      const angle = (x / radius) * Math.PI * 1.5 - waveTime;
      const y = waveY + Math.cos(angle) * 5;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(cx + radius, cy + radius);
    ctx.closePath();
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
const container = document.querySelector('.quantum-wave-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.quantum-wave-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.quantum-wave-slider') as HTMLInputElement;
  const percentText = container.querySelector('.quantum-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let waveTime = 0;
    
    canvas.width = 160;
    canvas.height = 160;
    
    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 64;
      
      currentVal += (targetVal - currentVal) * 0.1;
      percentText.textContent = \`\${Math.round(currentVal)}%\`;
      waveTime += 0.08;
      
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      
      const angleOffset = -Math.PI / 2;
      const endAngle = angleOffset + (currentVal / 100) * Math.PI * 2;
      ctx.save();
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.5)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 8, angleOffset, endAngle);
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();
      
      ctx.fillStyle = '#060a12';
      ctx.fill();
      
      const fillHeight = radius * 2 * (currentVal / 100);
      const waveY = cy + radius - fillHeight;
      
      ctx.fillStyle = 'rgba(0, 75, 150, 0.5)';
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy + radius);
      for (let x = cx - radius; x <= cx + radius; x++) {
        const angle = (x / radius) * Math.PI * 1.5 + waveTime;
        const y = waveY + Math.sin(angle) * 4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(cx + radius, cy + radius);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = 'rgba(0, 242, 254, 0.8)';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.6)';
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy + radius);
      for (let x = cx - radius; x <= cx + radius; x++) {
        const angle = (x / radius) * Math.PI * 1.5 - waveTime;
        const y = waveY + Math.cos(angle) * 5;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(cx + radius, cy + radius);
      ctx.closePath();
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
  css: `/* Quantum Wave Gauge styles */
.quantum-wave-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #020710 0%, #000205 100%);
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

.quantum-wave-container {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantum-wave-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.quantum-wave-label {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.quantum-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.6);
}

.quantum-status {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(0, 242, 254, 0.45);
  letter-spacing: 1.5px;
  margin-top: 2px;
}

.quantum-wave-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 14px;
}

.quantum-wave-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.quantum-wave-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00f2fe;
  border: 2px solid #020710;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 242, 254, 0.5);
  transition: transform 0.15s;
}

.quantum-wave-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#020710] to-[#000205] border border-[#00f2fe]/15 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="quantum-wave-sandbox-container">
  <div class="relative w-40 h-40 flex items-center justify-center">
    <canvas class="quantum-wave-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-20">
      <span class="quantum-percent font-sans text-2xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,242,254,0.6)]">0%</span>
      <span class="font-mono text-[7.5px] text-[#00f2fe]/45 tracking-widest mt-0.5">QUANTUM CORE</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-3.5">
    <input type="range" class="quantum-wave-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00f2fe] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#020710] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="65" />
  </div>
</div>`,
  prompt: 'Design a high-tech radial quantum core progress dial component enclosing bright turquoise canvas sinewaves that slosh realistically inside a circular viewport.'
};
