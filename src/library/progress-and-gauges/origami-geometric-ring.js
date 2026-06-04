/**
 * Component: Origami Geometric Ring
 * Category: progress-and-gauges
 */

export const component = {
  id: 'origami-geometric-ring',
  name: 'Origami Geometric Ring',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="origami-geometric-sandbox" id="origami-geometric-sandbox-container">
  <div class="origami-geometric-wrapper">
    <canvas class="origami-geometric-canvas"></canvas>
    <div class="origami-geometric-info">
      <span class="origami-title">ORIGAMI FACETS</span>
      <span class="origami-percent">0%</span>
    </div>
  </div>
  
  <div class="origami-geometric-controls">
    <input type="range" class="origami-geometric-slider" min="0" max="100" value="50" />
  </div>
</div>`,
  js: `// Origami Geometric Ring Canvas Logic
const canvas = document.querySelector('.origami-geometric-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.origami-geometric-slider');
  const percentText = document.querySelector('.origami-percent');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  
  canvas.width = 180;
  canvas.height = 180;
  
  const facetCount = 12;
  const radius = 58;
  const facetWidth = 24;
  
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
    
    const activeFacets = (currentVal / 100) * facetCount;
    
    // Draw all facets
    for (let i = 0; i < facetCount; i++) {
      ctx.save();
      
      const angle = (i / facetCount) * Math.PI * 2 - Math.PI / 2;
      const nextAngle = ((i + 1) / facetCount) * Math.PI * 2 - Math.PI / 2;
      
      // Calculate coordinates for triangle facet corners
      const outerX1 = cx + Math.cos(angle) * radius;
      const outerY1 = cy + Math.sin(angle) * radius;
      const outerX2 = cx + Math.cos(nextAngle) * radius;
      const outerY2 = cy + Math.sin(nextAngle) * radius;
      
      const innerRadius = radius - facetWidth;
      const innerX = cx + Math.cos((angle + nextAngle) / 2) * innerRadius;
      const innerY = cy + Math.sin((angle + nextAngle) / 2) * innerRadius;
      
      // Calculate dynamic fold ratio for 3D unfolding fold effect
      const facetProgress = Math.max(0, Math.min(1, activeFacets - i));
      
      if (facetProgress > 0) {
        // Shift inner coordinate outwards to represent unfolding expansion
        const currentInnerRadius = innerRadius + (1 - facetProgress) * facetWidth * 0.8;
        const currentInnerX = cx + Math.cos((angle + nextAngle) / 2) * currentInnerRadius;
        const currentInnerY = cy + Math.sin((angle + nextAngle) / 2) * currentInnerRadius;
        
        // Dynamic origami color shading
        // As it folds/unfolds, light angle creates gradients
        const shadeRatio = 0.3 + facetProgress * 0.7;
        const hue = 280; // Violet/Indigo theme
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = \`hsla(\${hue}, 80%, 50%, \${0.2 * facetProgress})\`;
        
        // 1st facet triangle half
        const grad1 = ctx.createLinearGradient(outerX1, outerY1, currentInnerX, currentInnerY);
        grad1.addColorStop(0, \`hsla(\${hue}, 80%, \${45 * shadeRatio}%, \${facetProgress})\`);
        grad1.addColorStop(1, \`hsla(\${hue + 20}, 90%, \${60 * shadeRatio}%, \${facetProgress})\`);
        
        ctx.fillStyle = grad1;
        ctx.beginPath();
        ctx.moveTo(outerX1, outerY1);
        ctx.lineTo(currentInnerX, currentInnerY);
        ctx.lineTo(cx + Math.cos((angle + nextAngle) / 2) * radius, cy + Math.sin((angle + nextAngle) / 2) * radius);
        ctx.closePath();
        ctx.fill();
        
        // 2nd facet triangle half to create 3D origami crease peak
        const grad2 = ctx.createLinearGradient(outerX2, outerY2, currentInnerX, currentInnerY);
        grad2.addColorStop(0, \`hsla(\${hue - 15}, 80%, \${35 * shadeRatio}%, \${facetProgress})\`);
        grad2.addColorStop(1, \`hsla(\${hue + 15}, 90%, \${55 * shadeRatio}%, \${facetProgress})\`);
        
        ctx.fillStyle = grad2;
        ctx.beginPath();
        ctx.moveTo(outerX2, outerY2);
        ctx.lineTo(currentInnerX, currentInnerY);
        ctx.lineTo(cx + Math.cos((angle + nextAngle) / 2) * radius, cy + Math.sin((angle + nextAngle) / 2) * radius);
        ctx.closePath();
        ctx.fill();
        
        // Origami thin white highlight crease line
        ctx.strokeStyle = \`rgba(255, 255, 255, \${0.15 * facetProgress})\`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(currentInnerX, currentInnerY);
        ctx.lineTo(cx + Math.cos((angle + nextAngle) / 2) * radius, cy + Math.sin((angle + nextAngle) / 2) * radius);
        ctx.stroke();
      } else {
        // Draw inactive facet placeholder lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(outerX1, outerY1);
        ctx.lineTo(innerX, innerY);
        ctx.lineTo(outerX2, outerY2);
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
const canvas = document.querySelector('.origami-geometric-canvas') as HTMLCanvasElement | null;
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const slider = document.querySelector('.origami-geometric-slider') as HTMLInputElement;
  const percentText = document.querySelector('.origami-percent') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    
    canvas.width = 180;
    canvas.height = 180;
    
    const facetCount = 12;
    const radius = 58;
    const facetWidth = 24;
    
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
      
      const activeFacets = (currentVal / 100) * facetCount;
      
      for (let i = 0; i < facetCount; i++) {
        ctx.save();
        const angle = (i / facetCount) * Math.PI * 2 - Math.PI / 2;
        const nextAngle = ((i + 1) / facetCount) * Math.PI * 2 - Math.PI / 2;
        
        const outerX1 = cx + Math.cos(angle) * radius;
        const outerY1 = cy + Math.sin(angle) * radius;
        const outerX2 = cx + Math.cos(nextAngle) * radius;
        const outerY2 = cy + Math.sin(nextAngle) * radius;
        
        const innerRadius = radius - facetWidth;
        const innerX = cx + Math.cos((angle + nextAngle) / 2) * innerRadius;
        const innerY = cy + Math.sin((angle + nextAngle) / 2) * innerRadius;
        
        const facetProgress = Math.max(0, Math.min(1, activeFacets - i));
        
        if (facetProgress > 0) {
          const currentInnerRadius = innerRadius + (1 - facetProgress) * facetWidth * 0.8;
          const currentInnerX = cx + Math.cos((angle + nextAngle) / 2) * currentInnerRadius;
          const currentInnerY = cy + Math.sin((angle + nextAngle) / 2) * currentInnerRadius;
          
          const shadeRatio = 0.3 + facetProgress * 0.7;
          const hue = 280;
          
          ctx.shadowBlur = 8;
          ctx.shadowColor = \`hsla(\${hue}, 80%, 50%, \${0.2 * facetProgress})\`;
          
          const grad1 = ctx.createLinearGradient(outerX1, outerY1, currentInnerX, currentInnerY);
          grad1.addColorStop(0, \`hsla(\${hue}, 80%, \${45 * shadeRatio}%, \${facetProgress})\`);
          grad1.addColorStop(1, \`hsla(\${hue + 20}, 90%, \${60 * shadeRatio}%, \${facetProgress})\`);
          
          ctx.fillStyle = grad1;
          ctx.beginPath();
          ctx.moveTo(outerX1, outerY1);
          ctx.lineTo(currentInnerX, currentInnerY);
          ctx.lineTo(cx + Math.cos((angle + nextAngle) / 2) * radius, cy + Math.sin((angle + nextAngle) / 2) * radius);
          ctx.closePath();
          ctx.fill();
          
          const grad2 = ctx.createLinearGradient(outerX2, outerY2, currentInnerX, currentInnerY);
          grad2.addColorStop(0, \`hsla(\${hue - 15}, 80%, \${35 * shadeRatio}%, \${facetProgress})\`);
          grad2.addColorStop(1, \`hsla(\${hue + 15}, 90%, \${55 * shadeRatio}%, \${facetProgress})\`);
          
          ctx.fillStyle = grad2;
          ctx.beginPath();
          ctx.moveTo(outerX2, outerY2);
          ctx.lineTo(currentInnerX, currentInnerY);
          ctx.lineTo(cx + Math.cos((angle + nextAngle) / 2) * radius, cy + Math.sin((angle + nextAngle) / 2) * radius);
          ctx.closePath();
          ctx.fill();
          
          ctx.strokeStyle = \`rgba(255, 255, 255, \${0.15 * facetProgress})\`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(currentInnerX, currentInnerY);
          ctx.lineTo(cx + Math.cos((angle + nextAngle) / 2) * radius, cy + Math.sin((angle + nextAngle) / 2) * radius);
          ctx.stroke();
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(outerX1, outerY1);
          ctx.lineTo(innerX, innerY);
          ctx.lineTo(outerX2, outerY2);
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
  css: `/* Origami Geometric Ring Styles */
.origami-geometric-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #0e051a 0%, #000000 100%);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.origami-geometric-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.origami-geometric-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.origami-geometric-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.origami-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.origami-percent {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
  margin-top: 2px;
}

.origami-geometric-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 8px;
}

.origami-geometric-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.origami-geometric-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a855f7;
  border: 2px solid #0e051a;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(168, 85, 247, 0.7);
  transition: transform 0.15s;
}

.origami-geometric-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#0e051a] to-[#000000] border border-purple-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="origami-geometric-sandbox-container">
  <div class="relative w-[180px] h-[180px] flex items-center justify-center">
    <canvas class="origami-geometric-canvas absolute inset-0"></canvas>
    <div class="relative flex flex-col items-center pointer-events-none z-20">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">ORIGAMI FACETS</span>
      <span class="origami-percent font-sans text-2xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-2">
    <input type="range" class="origami-geometric-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#a855f7] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0e051a] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="50" />
  </div>
</div>`,
  prompt: 'Design a modular origami geometric ring showing polygonal shaded facets folding and unfolding with clean creased lines and 3D shadows.'
};
