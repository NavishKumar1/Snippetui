/**
 * Component: Retro Synthwave Laser Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'retro-synthwave-slider',
  name: 'Retro Synthwave Slider',
  category: 'sliders-and-ranges',
  tag: 'Aesthetic',
  html: `<div class="retro-synthwave-slider-wrapper">
  <div class="synthwave-slider-track">
    <div class="synthwave-slider-grid"></div>
    <div class="synthwave-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="synthwave-slider-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive dynamic grid acceleration on drag
const syWrapper = document.querySelector('.retro-synthwave-slider-wrapper');
if (syWrapper) {
  const thumb = syWrapper.querySelector('.synthwave-slider-thumb');
  const fill = syWrapper.querySelector('.synthwave-slider-fill');
  const grid = syWrapper.querySelector('.synthwave-slider-grid');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = syWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    if (isDragging && grid) {
      grid.style.animationDuration = '0.4s';
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
      if (grid) {
        grid.style.animationDuration = '1.5s';
      }
    }
  });
  
  syWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const syWrapper = document.querySelector<HTMLDivElement>('.retro-synthwave-slider-wrapper');
if (syWrapper) {
  const thumb = syWrapper.querySelector<HTMLDivElement>('.synthwave-slider-thumb');
  const fill = syWrapper.querySelector<HTMLDivElement>('.synthwave-slider-fill');
  const grid = syWrapper.querySelector<HTMLDivElement>('.synthwave-slider-grid');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = syWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (isDragging && grid) {
        grid.style.animationDuration = '0.4s';
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
      if (grid) {
        grid.style.animationDuration = '1.5s';
      }
    }
  });
}`,
  css: `/* Retro Synthwave Laser Slider Styles */
.retro-synthwave-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.synthwave-slider-track {
  width: 100%;
  height: 12px;
  background: #0d0115;
  border: 1px solid #ff007f;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 0 10px rgba(255, 0, 127, 0.4),
    inset 0 0 10px rgba(255, 0, 127, 0.3);
  perspective: 80px;
}

/* Perspective scrolling grid lines */
.synthwave-slider-grid {
  position: absolute;
  inset: -100px;
  background-image: 
    linear-gradient(to right, rgba(255, 0, 127, 0.25) 1.5px, transparent 1.5px),
    linear-gradient(to bottom, rgba(255, 0, 127, 0.25) 1.5px, transparent 1.5px);
  background-size: 15px 15px;
  transform: rotateX(65deg);
  animation: grid-scroll-slide 1.5s infinite linear;
}

@keyframes grid-scroll-slide {
  from { transform: rotateX(65deg) translateY(0); }
  to { transform: rotateX(65deg) translateY(15px); }
}

.synthwave-slider-fill {
  position: absolute;
  height: 100%;
  background: rgba(0, 255, 255, 0.15);
  border-radius: 4px;
  width: 50%;
  z-index: 2;
}

.synthwave-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 24px;
  background: #020205;
  border: 2px solid #00ffff;
  border-radius: 2px;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 10px #00ffff;
  transition: transform 0.15s ease;
}

.synthwave-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.15);
  border-color: #ff007f;
  box-shadow: 0 0 15px #ff007f;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-3 bg-[#0d0115] border border-pink-500 rounded relative overflow-hidden shadow-[0_0_10px_rgba(255,0,127,0.4)]">
    <div class="absolute h-full bg-cyan-400/20 w-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-6 bg-black border-2 border-cyan-400 rounded-sm cursor-grab shadow-[0_0_10px_#00ffff]"></div>
</div>`,
  prompt: `Design a premium "Retro Synthwave Laser Slider" component. Encased in a pink coordinate grid track, dragging the thumb accelerates the scrolling speed of the grid and glows in hot pink/cyan neon tubes.`
};
