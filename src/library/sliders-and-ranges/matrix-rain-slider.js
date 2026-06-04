/**
 * Component: Matrix Rain Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'matrix-rain-slider',
  name: 'Matrix Rain Slider',
  category: 'sliders-and-ranges',
  tag: 'Premium',
  html: `<div class="matrix-rain-slider-wrapper">
  <div class="matrix-rain-track">
    <div class="matrix-stream-lines">
      <span class="m-rain line-1" style="--l: 15%; --d: 0s;"></span>
      <span class="m-rain line-2" style="--l: 40%; --d: 0.3s;"></span>
      <span class="m-rain line-3" style="--l: 65%; --d: 0.6s;"></span>
      <span class="m-rain line-4" style="--l: 85%; --d: 0.9s;"></span>
    </div>
    <div class="matrix-rain-fill" style="width: 50%;"></div>
  </div>
  <div class="matrix-rain-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive dynamic code rain speedup on drag
const mrWrapper = document.querySelector('.matrix-rain-slider-wrapper');
if (mrWrapper) {
  const thumb = mrWrapper.querySelector('.matrix-rain-thumb');
  const fill = mrWrapper.querySelector('.matrix-rain-fill');
  const rains = mrWrapper.querySelectorAll('.m-rain');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = mrWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Vary vertical falling velocity matching progress
    if (isDragging) {
      rains.forEach(rain => {
        rain.style.animationDuration = \`\${0.4 + (100 - percentage) * 0.015}s\`;
      });
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
      rains.forEach(rain => {
        rain.style.animationDuration = '1.8s';
      });
    }
  });
  
  mrWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const mrWrapper = document.querySelector<HTMLDivElement>('.matrix-rain-slider-wrapper');
if (mrWrapper) {
  const thumb = mrWrapper.querySelector<HTMLDivElement>('.matrix-rain-thumb');
  const fill = mrWrapper.querySelector<HTMLDivElement>('.matrix-rain-fill');
  const rains = mrWrapper.querySelectorAll<HTMLSpanElement>('.m-rain');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = mrWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (isDragging) {
        rains.forEach(rain => {
          rain.style.animationDuration = \`\${0.4 + (100 - percentage) * 0.015}s\`;
        });
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
      rains.forEach(rain => {
        rain.style.animationDuration = '1.8s';
      });
    }
  });
}`,
  css: `/* Matrix Rain Slider Styles */
.matrix-rain-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.matrix-rain-track {
  width: 100%;
  height: 12px;
  background: #020603;
  border-radius: 4px;
  position: relative;
  border: 1px solid rgba(0, 255, 70, 0.15);
  box-shadow: inset 0 0 10px rgba(0, 255, 70, 0.1);
  overflow: hidden;
}

.matrix-rain-fill {
  position: absolute;
  height: 100%;
  background: rgba(0, 255, 70, 0.15);
  border-radius: 4px;
  width: 50%;
  z-index: 2;
}

.matrix-rain-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 24px;
  background: #020205;
  border: 2px solid #00ff46;
  border-radius: 2px;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 10px #00ff46;
  transition: transform 0.15s ease;
}

.matrix-rain-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.15);
  border-color: #ffffff;
  box-shadow: 0 0 15px #ffffff;
}

/* Vertically falling matrix codes */
.matrix-stream-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.m-rain {
  position: absolute;
  top: -20px;
  left: var(--l);
  width: 2px;
  height: 15px;
  background: linear-gradient(to bottom, #00ff46, transparent);
  animation: rain-fall-slide 1.8s infinite linear;
  animation-delay: var(--d);
  opacity: 0.6;
}

@keyframes rain-fall-slide {
  0% { top: -20px; opacity: 0.8; }
  100% { top: 110%; opacity: 0.1; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-3 bg-[#020603] border border-green-500/20 rounded relative overflow-hidden">
    <div class="absolute h-full bg-green-500/20 w-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-6 bg-black border-2 border-green-400 rounded-sm cursor-grab shadow-[0_0_10px_#00ff46]"></div>
</div>`,
  prompt: `Design a premium "Matrix Rain Slider" component. Inside the track, digital green rain coordinates stream downwards, falling and accelerating snappily as you drag the thumb.`
};
