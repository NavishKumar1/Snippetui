/**
 * Component: Origami Fold Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'origami-fold-progress',
  name: 'Origami Fold Progress',
  category: 'progress-and-gauges',
  tag: 'Creative',
  html: `<div class="origami-progress-sandbox" id="origami-progress-sandbox-container">
  <div class="origami-wrapper">
    <canvas class="origami-canvas"></canvas>
    <div class="origami-info">
      <span class="origami-title">GEOMETRIC FOLDS</span>
      <span class="origami-val">0%</span>
    </div>
  </div>
  
  <div class="origami-controls">
    <input type="range" class="origami-slider" min="0" max="100" value="65" />
  </div>
</div>`,
  js: `// Origami Fold Progress Canvas Logic
const container = document.querySelector('.origami-progress-sandbox');
if (container) {
  const canvas = container.querySelector('.origami-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.origami-slider');
  const valLabel = container.querySelector('.origami-val');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  
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
    
    const nodesCount = 6;
    const paddingX = 30;
    const stepX = (w - paddingX * 2) / (nodesCount - 1);
    const nodeY = h / 2 + 10;
    const diamondSize = 16;
    
    // 1. Draw connecting folding creases
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 184, 0, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(paddingX, nodeY);
    for (let i = 1; i < nodesCount; i++) {
      ctx.lineTo(paddingX + i * stepX, nodeY);
    }
    ctx.stroke();
    ctx.restore();
    
    // 2. Draw active glowing folded connections
    const activeLimit = (currentVal / 100) * (nodesCount - 1);
    ctx.save();
    ctx.strokeStyle = '#ffb800'; // Amber/Gold crease
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(255, 184, 0, 0.4)';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(paddingX, nodeY);
    
    for (let i = 1; i < nodesCount; i++) {
      if (activeLimit >= i) {
        ctx.lineTo(paddingX + i * stepX, nodeY);
      } else if (activeLimit > i - 1) {
        const fraction = activeLimit - (i - 1);
        const prevX = paddingX + (i - 1) * stepX;
        const targetX = prevX + stepX * fraction;
        ctx.lineTo(targetX, nodeY);
        break;
      } else {
        break;
      }
    }
    ctx.stroke();
    ctx.restore();
    
    // 3. Draw faceted 3D origami diamonds
    for (let i = 0; i < nodesCount; i++) {
      const cx = paddingX + i * stepX;
      const nodeThreshold = (i / (nodesCount - 1)) * 100;
      const isActive = currentVal >= nodeThreshold;
      
      // Calculate fold unfold scale ratio
      let scale = 0.4;
      if (isActive) {
        scale = 1.0;
      } else {
        // Smoothly scale up as active progress approaches the node
        const prevThreshold = ((i - 1) / (nodesCount - 1)) * 100;
        if (currentVal > prevThreshold) {
          scale = 0.4 + 0.6 * ((currentVal - prevThreshold) / (nodeThreshold - prevThreshold));
        }
      }
      
      const size = diamondSize * scale;
      
      ctx.save();
      ctx.translate(cx, nodeY);
      
      // Shading facets (Left, Right, Top, Bottom) to create paper 3D look
      const half = size / 2;
      
      // Left Facet (Light Shaded Paper)
      ctx.fillStyle = isActive ? '#ffe082' : 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(-half, 0);
      ctx.lineTo(0, size);
      ctx.closePath();
      ctx.fill();
      
      // Right Facet (Dark Shaded Paper)
      ctx.fillStyle = isActive ? '#ffb800' : 'rgba(255, 255, 255, 0.02)';
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(half, 0);
      ctx.lineTo(0, size);
      ctx.closePath();
      ctx.fill();
      
      // Add crease overlay lines
      ctx.strokeStyle = isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.moveTo(-half, 0);
      ctx.lineTo(half, 0);
      ctx.stroke();
      
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
const container = document.querySelector('.origami-progress-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.origami-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.origami-slider') as HTMLInputElement;
  const valLabel = container.querySelector('.origami-val') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    
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
      
      const nodesCount = 6;
      const paddingX = 30;
      const stepX = (w - paddingX * 2) / (nodesCount - 1);
      const nodeY = h / 2 + 10;
      const diamondSize = 16;
      
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 184, 0, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(paddingX, nodeY);
      for (let i = 1; i < nodesCount; i++) {
        ctx.lineTo(paddingX + i * stepX, nodeY);
      }
      ctx.stroke();
      ctx.restore();
      
      const activeLimit = (currentVal / 100) * (nodesCount - 1);
      ctx.save();
      ctx.strokeStyle = '#ffb800';
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255, 184, 0, 0.4)';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(paddingX, nodeY);
      
      for (let i = 1; i < nodesCount; i++) {
        if (activeLimit >= i) {
          ctx.lineTo(paddingX + i * stepX, nodeY);
        } else if (activeLimit > i - 1) {
          const fraction = activeLimit - (i - 1);
          const prevX = paddingX + (i - 1) * stepX;
          const targetX = prevX + stepX * fraction;
          ctx.lineTo(targetX, nodeY);
          break;
        } else {
          break;
        }
      }
      ctx.stroke();
      ctx.restore();
      
      for (let i = 0; i < nodesCount; i++) {
        const cx = paddingX + i * stepX;
        const nodeThreshold = (i / (nodesCount - 1)) * 100;
        const isActive = currentVal >= nodeThreshold;
        
        let scale = 0.4;
        if (isActive) {
          scale = 1.0;
        } else {
          const prevThreshold = ((i - 1) / (nodesCount - 1)) * 100;
          if (currentVal > prevThreshold) {
            scale = 0.4 + 0.6 * ((currentVal - prevThreshold) / (nodeThreshold - prevThreshold));
          }
        }
        
        const size = diamondSize * scale;
        
        ctx.save();
        ctx.translate(cx, nodeY);
        const half = size / 2;
        
        ctx.fillStyle = isActive ? '#ffe082' : 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(-half, 0);
        ctx.lineTo(0, size);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = isActive ? '#ffb800' : 'rgba(255, 255, 255, 0.02)';
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(half, 0);
        ctx.lineTo(0, size);
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.moveTo(-half, 0);
        ctx.lineTo(half, 0);
        ctx.stroke();
        
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
  css: `/* Origami Fold Progress styles */
.origami-progress-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #120902 0%, #030100 100%);
  border: 1px solid rgba(255, 184, 0, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.origami-wrapper {
  position: relative;
  width: 280px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.origami-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.origami-info {
  position: absolute;
  top: 6px;
  left: 6px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
}

.origami-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.origami-val {
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #ffb800;
  text-shadow: 0 0 10px rgba(255, 184, 0, 0.5);
  margin-top: 2px;
}

.origami-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 24px;
}

.origami-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.origami-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffb800;
  border: 2px solid #120902;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(255, 184, 0, 0.5);
  transition: transform 0.15s;
}

.origami-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#120902] to-[#030100] border border-amber-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="origami-progress-sandbox-container">
  <div class="relative w-[280px] h-[100px] flex items-center justify-center">
    <canvas class="origami-canvas absolute inset-0"></canvas>
    <div class="absolute top-1.5 left-1.5 flex flex-col pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">GEOMETRIC FOLDS</span>
      <span class="origami-val font-sans text-sm font-extrabold text-[#ffb800] drop-shadow-[0_0_10px_rgba(255,184,0,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-6">
    <input type="range" class="origami-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ffb800] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#120902] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="65" />
  </div>
</div>`,
  prompt: 'Design a landscape origami folder paper-faceted diamond milestone progress bar component, expanding folding shaded paper nodes dynamically.'
};
