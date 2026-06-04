/**
 * Component: Liquid Jelly Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'liquid-jelly-slider',
  name: 'Liquid Jelly Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="jelly-slider-wrapper">
  <div class="jelly-slider-track">
    <div class="jelly-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="jelly-slider-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive gooey jelly squishing on dragging
const jWrapper = document.querySelector('.jelly-slider-wrapper');
if (jWrapper) {
  const thumb = jWrapper.querySelector('.jelly-slider-thumb');
  const fill = jWrapper.querySelector('.jelly-slider-fill');
  
  let isDragging = false;
  let lastX = 0;
  
  const updateSlider = (clientX) => {
    const rect = jWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Squish jelly thumb during drag based on mouse speed velocity
    const speed = Math.abs(clientX - lastX);
    const squishFactor = Math.min(1.5, 1 + speed * 0.05);
    const stretchY = 1 / squishFactor;
    
    thumb.style.transform = \`translate(-50%, -50%) scale(\${squishFactor}, \${stretchY})\`;
    lastX = clientX;
  };
  
  thumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
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
      thumb.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });
  
  jWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const jWrapper = document.querySelector<HTMLDivElement>('.jelly-slider-wrapper');
if (jWrapper) {
  const thumb = jWrapper.querySelector<HTMLDivElement>('.jelly-slider-thumb');
  const fill = jWrapper.querySelector<HTMLDivElement>('.jelly-slider-fill');
  
  let isDragging = false;
  let lastX = 0;
  
  const updateSlider = (clientX: number) => {
    const rect = jWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      const speed = Math.abs(clientX - lastX);
      const squishFactor = Math.min(1.5, 1 + speed * 0.05);
      const stretchY = 1 / squishFactor;
      
      thumb.style.transform = \`translate(-50%, -50%) scale(\${squishFactor}, \${stretchY})\`;
      lastX = clientX;
    }
  };
  
  if (thumb) {
    thumb.addEventListener('mousedown', (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
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
      if (thumb) {
        thumb.classList.remove('active');
        thumb.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }
  });
}`,
  css: `/* Liquid Jelly Slider Styles */
.jelly-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.jelly-slider-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 0, 127, 0.08);
  border-radius: 10px;
  position: relative;
}

.jelly-slider-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff007f, #ffd700);
  border-radius: 10px;
  width: 50%;
  box-shadow: 0 0 10px rgba(255, 0, 127, 0.4);
}

.jelly-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 16px;
  height: 16px;
  background: #ff007f;
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 15px #ff007f;
  transition: transform 0.1s cubic-bezier(0.25, 0.8, 0.25, 1.4);
}

.jelly-slider-thumb.active {
  cursor: grabbing;
  background: #ffd700;
  box-shadow: 0 0 25px #ffd700;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-1.5 bg-pink-500/10 rounded-full relative">
    <div class="absolute h-full bg-gradient-to-r from-pink-500 to-amber-400 rounded-full w-1/2 shadow-[0_0_10px_rgba(255,0,127,0.4)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full cursor-grab shadow-[0_0_15px_#ff007f]"></div>
</div>`,
  prompt: `Design a premium "Liquid Jelly Slider" range selector. Dragging the thumb squishes and deforms it horizontally and vertically based on cursor velocity, snapping back organically.`
};
