/**
 * Component: Cyber Grid Radial Gauge
 * Category: progress-and-gauges
 */

export const component = {
  id: 'cyber-grid-radial-gauge',
  name: 'Cyber Grid Radial Gauge',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="cyber-grid-sandbox" id="cyber-grid-sandbox-container">
  <div class="cyber-grid-container">
    <canvas class="cyber-grid-canvas"></canvas>
    <div class="cyber-grid-label">
      <span class="cyber-percent">0%</span>
      <span class="cyber-status">GRID OVERDRIVE</span>
    </div>
  </div>
  
  <div class="cyber-grid-controls">
    <input type="range" class="cyber-grid-slider" min="0" max="100" value="75" />
  </div>
</div>`,
  js: `// Cyber Grid Radial Gauge Canvas Logic
const container = document.querySelector('.cyber-grid-sandbox');
if (container) {
  const canvas = container.querySelector('.cyber-grid-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.cyber-grid-slider');
  const percentText = container.querySelector('.cyber-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  
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
    const radius = 56;
    
    // Smooth value interpolation
    currentVal += (targetVal - currentVal) * 0.12;
    percentText.textContent = \`\${Math.round(currentVal)}%\`;
    
    const startAngle = Math.PI * 0.75; // Left-bottom diagonal start
    const endAngleLimit = Math.PI * 2.25; // Right-bottom diagonal end
    const activeEndAngle = startAngle + (currentVal / 100) * (Math.PI * 1.5);
    
    // 1. Draw outer ambient wireframe tick segments (dashed radial look)
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 0, 127, 0.08)';
    ctx.lineWidth = 6;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, startAngle, endAngleLimit);
    ctx.stroke();
    ctx.restore();
    
    // 2. Draw active wireframe segment
    ctx.save();
    ctx.strokeStyle = '#ff007f'; // Hot pink laser color
    ctx.lineWidth = 6;
    ctx.setLineDash([4, 4]);
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff007f';
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, startAngle, activeEndAngle);
    ctx.stroke();
    ctx.restore();
    
    // 3. Draw cyber grid perspective lines inside circular clipping zone
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();
    
    // Dark grid background
    ctx.fillStyle = '#06010a';
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    
    // Perspective Grid Lines (drawing wireframe loops)
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)'; // Cyan grids
    ctx.lineWidth = 1.0;
    
    // Vertical perspective lines converging to horizon
    const horizonY = cy - 20;
    for (let x = cx - radius; x <= cx + radius; x += 12) {
      ctx.beginPath();
      ctx.moveTo(x, cy + radius);
      ctx.lineTo(cx + (x - cx) * 0.25, horizonY);
      ctx.stroke();
    }
    
    // Horizontal lines scrolling
    const scrollOffset = (Date.now() * 0.015) % 12;
    for (let y = horizonY; y <= cy + radius; y += 8) {
      ctx.beginPath();
      ctx.moveTo(cx - radius, y + scrollOffset);
      ctx.lineTo(cx + radius, y + scrollOffset);
      ctx.stroke();
    }
    
    ctx.restore();
    
    // 4. Glowing pointer needle aligned with progress angle
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(activeEndAngle);
    
    // Draw glowing needle line
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00f2fe';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius - 2, 0);
    ctx.stroke();
    
    // Needle tip glow
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(radius - 2, 0, 3, 0, Math.PI * 2);
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
const container = document.querySelector('.cyber-grid-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.cyber-grid-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.cyber-grid-slider') as HTMLInputElement;
  const percentText = container.querySelector('.cyber-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    
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
      const radius = 56;
      
      currentVal += (targetVal - currentVal) * 0.12;
      percentText.textContent = \`\${Math.round(currentVal)}%\`;
      
      const startAngle = Math.PI * 0.75;
      const endAngleLimit = Math.PI * 2.25;
      const activeEndAngle = startAngle + (currentVal / 100) * (Math.PI * 1.5);
      
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.08)';
      ctx.lineWidth = 6;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 8, startAngle, endAngleLimit);
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 6;
      ctx.setLineDash([4, 4]);
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff007f';
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 8, startAngle, activeEndAngle);
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();
      
      ctx.fillStyle = '#06010a';
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
      ctx.lineWidth = 1.0;
      
      const horizonY = cy - 20;
      for (let x = cx - radius; x <= cx + radius; x += 12) {
        ctx.beginPath();
        ctx.moveTo(x, cy + radius);
        ctx.lineTo(cx + (x - cx) * 0.25, horizonY);
        ctx.stroke();
      }
      
      const scrollOffset = (Date.now() * 0.015) % 12;
      for (let y = horizonY; y <= cy + radius; y += 8) {
        ctx.beginPath();
        ctx.moveTo(cx - radius, y + scrollOffset);
        ctx.lineTo(cx + radius, y + scrollOffset);
        ctx.stroke();
      }
      
      ctx.restore();
      
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(activeEndAngle);
      
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f2fe';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius - 2, 0);
      ctx.stroke();
      
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(radius - 2, 0, 3, 0, Math.PI * 2);
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
  css: `/* Cyber Grid Radial Gauge styles */
.cyber-grid-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #0e0214 0%, #030006 100%);
  border: 1px solid rgba(255, 0, 127, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.cyber-grid-container {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cyber-grid-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.cyber-grid-label {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
  margin-top: 32px; /* Pull down into the gauge center */
}

.cyber-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.6);
}

.cyber-status {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 0, 127, 0.55);
  letter-spacing: 1.5px;
  margin-top: 2px;
}

.cyber-grid-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 14px;
}

.cyber-grid-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.cyber-grid-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff007f;
  border: 2px solid #0e0214;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 0, 127, 0.5);
  transition: transform 0.15s;
}

.cyber-grid-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#0e0214] to-[#030006] border border-pink-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="cyber-grid-sandbox-container">
  <div class="relative w-40 h-40 flex items-center justify-center">
    <canvas class="cyber-grid-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-20 mt-8">
      <span class="cyber-percent font-sans text-2xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,242,254,0.6)]">0%</span>
      <span class="font-mono text-[7.5px] text-pink-500/55 tracking-widest mt-0.5">GRID OVERDRIVE</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-3.5">
    <input type="range" class="cyber-grid-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff007f] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0e0214] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="75" />
  </div>
</div>`,
  prompt: 'Design a synthwave cyber grid perspective radial speed dial component outlining neon hot-pink wireframe dash arcs and pointing a bright cyan laser needle.'
};
