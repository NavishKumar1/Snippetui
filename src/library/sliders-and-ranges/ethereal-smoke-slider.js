/**
 * Component: Ethereal Vapor Smoke Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'ethereal-smoke-slider',
  name: 'Ethereal Smoke Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="ethereal-smoke-slider-wrapper">
  <div class="smoke-slider-track">
    <div class="smoke-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="smoke-slider-canvas"></div>
  <div class="smoke-slider-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive dynamic gaseous smoke wisps generated on drag
const smWrapper = document.querySelector('.ethereal-smoke-slider-wrapper');
if (smWrapper) {
  const thumb = smWrapper.querySelector('.smoke-slider-thumb');
  const fill = smWrapper.querySelector('.smoke-slider-fill');
  const canvas = smWrapper.querySelector('.smoke-slider-canvas');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = smWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Spawn smoke wisps
    if (isDragging && canvas) {
      const wisp = document.createElement('span');
      wisp.className = 'smoke-slider-wisp';
      
      const size = 15 + Math.random() * 20;
      const thumbX = (percentage / 100) * rect.width;
      
      wisp.style.width = \`\${size}px\`;
      wisp.style.height = \`\${size}px\`;
      wisp.style.left = \`\${thumbX}px\`;
      wisp.style.top = \`\${10 + (Math.random() - 0.5) * 8}px\`;
      
      wisp.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 20}px\`);
      wisp.style.setProperty('--dy', \`\${-30 - Math.random() * 20}px\`);
      
      const colors = ['rgba(0, 242, 254, 0.35)', 'rgba(138, 43, 226, 0.35)'];
      wisp.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      canvas.appendChild(wisp);
      setTimeout(() => wisp.remove(), 1000);
    }
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
    }
  });
  
  smWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const smWrapper = document.querySelector<HTMLDivElement>('.ethereal-smoke-slider-wrapper');
if (smWrapper) {
  const thumb = smWrapper.querySelector<HTMLDivElement>('.smoke-slider-thumb');
  const fill = smWrapper.querySelector<HTMLDivElement>('.smoke-slider-fill');
  const canvas = smWrapper.querySelector<HTMLDivElement>('.smoke-slider-canvas');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = smWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (isDragging && canvas) {
        const wisp = document.createElement('span');
        wisp.className = 'smoke-slider-wisp';
        const size = 15 + Math.random() * 20;
        const thumbX = (percentage / 100) * rect.width;
        
        wisp.style.width = \`\${size}px\`;
        wisp.style.height = \`\${size}px\`;
        wisp.style.left = \`\${thumbX}px\`;
        wisp.style.top = \`\${10 + (Math.random() - 0.5) * 8}px\`;
        wisp.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 20}px\`);
        wisp.style.setProperty('--dy', \`\${-30 - Math.random() * 20}px\`);
        
        const colors = ['rgba(0, 242, 254, 0.35)', 'rgba(138, 43, 226, 0.35)'];
        wisp.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        canvas.appendChild(wisp);
        setTimeout(() => wisp.remove(), 1000);
      }
    }
  };
  
  if (thumb) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('active');
    });
  }
  
  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      if (thumb) thumb.classList.remove('active');
    }
  });
}`,
  css: `/* Ethereal Vapor Smoke Slider Styles */
.ethereal-smoke-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.smoke-slider-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  position: relative;
}

.smoke-slider-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 242, 254, 0.5), rgba(138, 43, 226, 0.5));
  border-radius: 10px;
  width: 50%;
}

.smoke-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: rgba(13, 13, 21, 0.95);
  border: 1.5px solid rgba(0, 242, 254, 0.3);
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
  transition: transform 0.15s ease;
}

.smoke-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  border-color: rgba(138, 43, 226, 0.6);
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.8);
}

/* Smoke particles layer */
.smoke-slider-canvas {
  position: absolute;
  inset: -30px 0;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
}

.smoke-slider-wisp {
  position: absolute;
  border-radius: 50%;
  filter: blur(8px);
  transform: translate(-50%, -50%) scale(0.5);
  animation: smoke-drift-fade-out 1s cubic-bezier(0.1, 0.8, 0.25, 1) forwards;
}

@keyframes smoke-drift-fade-out {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.8;
  }
  100% {
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(2.2);
    opacity: 0;
    filter: blur(14px);
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-1.5 bg-white/5 rounded-full relative">
    <div class="absolute h-full bg-gradient-to-r from-cyan-400/50 to-violet-500/50 rounded-full w-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0d0d15]/95 border border-cyan-400/30 rounded-full cursor-grab shadow-[0_0_10px_rgba(0,242,254,0.4)]"></div>
</div>`,
  prompt: `Design a premium "Ethereal Vapor Smoke Slider". Dragging releases beautiful curls of colored smoke wisps that rise and dissipate from the active thumb position.`
};
