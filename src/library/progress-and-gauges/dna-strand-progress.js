/**
 * Component: DNA Helix Strand Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'dna-strand-progress',
  name: 'DNA Helix Strand Progress',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="dna-progress-sandbox" id="dna-progress-sandbox-container">
  <div class="dna-progress-wrapper">
    <canvas class="dna-progress-canvas"></canvas>
    <div class="dna-progress-info">
      <span class="dna-label">SEQUENCE MATCH</span>
      <span class="dna-percent">0%</span>
    </div>
  </div>
  
  <div class="dna-progress-controls">
    <input type="range" class="dna-progress-slider" min="0" max="100" value="60" />
  </div>
</div>`,
  js: `// DNA Helix Strand Progress Canvas Animation Logic
const container = document.querySelector('.dna-progress-sandbox');
if (container) {
  const canvas = container.querySelector('.dna-progress-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.dna-progress-slider');
  const percentText = container.querySelector('.dna-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let rotationTime = 0;
  
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
    percentText.textContent = \`\${Math.round(currentVal)}%\`;
    
    rotationTime += 0.05;
    
    const pointsCount = 18;
    const paddingX = 20;
    const stepX = (w - paddingX * 2) / (pointsCount - 1);
    const amplitude = 22; // Wave height
    const frequency = 0.5; // Coils frequency
    
    const activeIndexLimit = (currentVal / 100) * pointsCount;
    
    // Draw connections (base pairs) first so nodes draw on top
    for (let i = 0; i < pointsCount; i++) {
      const x = paddingX + i * stepX;
      const angle = i * frequency + rotationTime;
      
      const y1 = h / 2 + Math.sin(angle) * amplitude;
      const y2 = h / 2 - Math.sin(angle) * amplitude;
      
      const isActive = i < activeIndexLimit;
      
      ctx.save();
      if (isActive) {
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
      }
      
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.stroke();
      ctx.restore();
    }
    
    // Draw Strand 1 nodes (Cyan/Aqua)
    for (let i = 0; i < pointsCount; i++) {
      const x = paddingX + i * stepX;
      const angle = i * frequency + rotationTime;
      const y = h / 2 + Math.sin(angle) * amplitude;
      const isActive = i < activeIndexLimit;
      
      ctx.save();
      if (isActive) {
        ctx.fillStyle = '#00f2fe';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f2fe';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      }
      
      ctx.beginPath();
      ctx.arc(x, y, isActive ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    
    // Draw Strand 2 nodes (Magenta/Purple)
    for (let i = 0; i < pointsCount; i++) {
      const x = paddingX + i * stepX;
      const angle = i * frequency + rotationTime;
      const y = h / 2 - Math.sin(angle) * amplitude;
      const isActive = i < activeIndexLimit;
      
      ctx.save();
      if (isActive) {
        ctx.fillStyle = '#9b51e0';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#9b51e0';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      }
      
      ctx.beginPath();
      ctx.arc(x, y, isActive ? 4 : 2.5, 0, Math.PI * 2);
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
const container = document.querySelector('.dna-progress-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.dna-progress-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.dna-progress-slider') as HTMLInputElement;
  const percentText = container.querySelector('.dna-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let rotationTime = 0;
    
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
      percentText.textContent = \`\${Math.round(currentVal)}%\`;
      rotationTime += 0.05;
      
      const pointsCount = 18;
      const paddingX = 20;
      const stepX = (w - paddingX * 2) / (pointsCount - 1);
      const amplitude = 22;
      const frequency = 0.5;
      
      const activeIndexLimit = (currentVal / 100) * pointsCount;
      
      for (let i = 0; i < pointsCount; i++) {
        const x = paddingX + i * stepX;
        const angle = i * frequency + rotationTime;
        
        const y1 = h / 2 + Math.sin(angle) * amplitude;
        const y2 = h / 2 - Math.sin(angle) * amplitude;
        
        const isActive = i < activeIndexLimit;
        
        ctx.save();
        if (isActive) {
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
        }
        
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();
        ctx.restore();
      }
      
      for (let i = 0; i < pointsCount; i++) {
        const x = paddingX + i * stepX;
        const angle = i * frequency + rotationTime;
        const y = h / 2 + Math.sin(angle) * amplitude;
        const isActive = i < activeIndexLimit;
        
        ctx.save();
        if (isActive) {
          ctx.fillStyle = '#00f2fe';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00f2fe';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        }
        
        ctx.beginPath();
        ctx.arc(x, y, isActive ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      for (let i = 0; i < pointsCount; i++) {
        const x = paddingX + i * stepX;
        const angle = i * frequency + rotationTime;
        const y = h / 2 - Math.sin(angle) * amplitude;
        const isActive = i < activeIndexLimit;
        
        ctx.save();
        if (isActive) {
          ctx.fillStyle = '#9b51e0';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#9b51e0';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        }
        
        ctx.beginPath();
        ctx.arc(x, y, isActive ? 4 : 2.5, 0, Math.PI * 2);
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
  css: `/* DNA Helix Strand Progress styles */
.dna-progress-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #04020a 0%, #010003 100%);
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

.dna-progress-wrapper {
  position: relative;
  width: 280px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dna-progress-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.dna-progress-info {
  position: absolute;
  top: 6px;
  left: 6px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
}

.dna-label {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.dna-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #00f2fe;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
  margin-top: 2px;
}

.dna-progress-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 24px;
}

.dna-progress-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.dna-progress-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00f2fe;
  border: 2px solid #04020a;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 242, 254, 0.5);
  transition: transform 0.15s;
}

.dna-progress-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#04020a] to-[#010003] border border-cyan-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="dna-progress-sandbox-container">
  <div class="relative w-[280px] h-[100px] flex items-center justify-center">
    <canvas class="dna-progress-canvas absolute inset-0"></canvas>
    <div class="absolute top-1.5 left-1.5 flex flex-col pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">SEQUENCE MATCH</span>
      <span class="dna-percent font-sans text-sm font-extrabold text-[#00f2fe] drop-shadow-[0_0_10px_rgba(0,242,254,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-6">
    <input type="range" class="dna-progress-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00f2fe] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#04020a] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="60" />
  </div>
</div>`,
  prompt: 'Design a landscape double-helix DNA strand progress bar component coiling in 3D perspective, lighting up connection bridges sequentially.'
};
