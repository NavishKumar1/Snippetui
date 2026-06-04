/**
 * Component: Bipolar Split Dual Range
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'bipolar-split-slider',
  name: 'Bipolar Split Slider',
  category: 'sliders-and-ranges',
  tag: 'Premium',
  html: `<div class="bipolar-slider-wrapper">
  <div class="bipolar-slider-track">
    <div class="bipolar-slider-fill-left" style="width: 0%; right: 50%;"></div>
    <div class="bipolar-slider-fill-right" style="width: 0%; left: 50%;"></div>
    <span class="bipolar-center-notch"></span>
  </div>
  <div class="bipolar-slider-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive dual left-right symmetrical fills dragging
const bpWrapper = document.querySelector('.bipolar-slider-wrapper');
if (bpWrapper) {
  const thumb = bpWrapper.querySelector('.bipolar-slider-thumb');
  const fillLeft = bpWrapper.querySelector('.bipolar-slider-fill-left');
  const fillRight = bpWrapper.querySelector('.bipolar-slider-fill-right');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = bpWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    
    if (percentage < 50) {
      // Left side dragging (cool blue)
      const widthLeft = 50 - percentage;
      fillLeft.style.width = \`\${widthLeft}%\`;
      fillRight.style.width = '0%';
      thumb.style.borderColor = '#00f2fe';
      thumb.style.boxShadow = '0 0 12px rgba(0, 242, 254, 0.6)';
    } else {
      // Right side dragging (hot red)
      const widthRight = percentage - 50;
      fillRight.style.width = \`\${widthRight}%\`;
      fillLeft.style.width = '0%';
      thumb.style.borderColor = '#ff007f';
      thumb.style.boxShadow = '0 0 12px rgba(255, 0, 127, 0.6)';
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
  
  bpWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const bpWrapper = document.querySelector<HTMLDivElement>('.bipolar-slider-wrapper');
if (bpWrapper) {
  const thumb = bpWrapper.querySelector<HTMLDivElement>('.bipolar-slider-thumb');
  const fillLeft = bpWrapper.querySelector<HTMLDivElement>('.bipolar-slider-fill-left');
  const fillRight = bpWrapper.querySelector<HTMLDivElement>('.bipolar-slider-fill-right');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = bpWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fillLeft && fillRight) {
      thumb.style.left = \`\${percentage}%\`;
      
      if (percentage < 50) {
        const widthLeft = 50 - percentage;
        fillLeft.style.width = \`\${widthLeft}%\`;
        fillRight.style.width = '0%';
        thumb.style.borderColor = '#00f2fe';
        thumb.style.boxShadow = '0 0 12px rgba(0, 242, 254, 0.6)';
      } else {
        const widthRight = percentage - 50;
        fillRight.style.width = \`\${widthRight}%\`;
        fillLeft.style.width = '0%';
        thumb.style.borderColor = '#ff007f';
        thumb.style.boxShadow = '0 0 12px rgba(255, 0, 127, 0.6)';
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
  css: `/* Bipolar Split Slider Styles */
.bipolar-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.bipolar-slider-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  position: relative;
}

.bipolar-slider-fill-left {
  position: absolute;
  height: 100%;
  background: #00f2fe;
  border-radius: 4px 0 0 4px;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
}

.bipolar-slider-fill-right {
  position: absolute;
  height: 100%;
  background: #ff007f;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 0 10px rgba(255, 0, 127, 0.5);
}

.bipolar-center-notch {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  z-index: 2;
}

.bipolar-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: #ffffff;
  border: 2.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  transition: transform 0.15s ease, border-color 0.3s;
}

.bipolar-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-1 bg-white/5 rounded-full relative">
    <div class="absolute h-full bg-cyan-400 rounded-l w-0 right-1/2"></div>
    <div class="absolute h-full bg-pink-500 rounded-r w-0 left-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-white/50 rounded-full cursor-grab shadow-md"></div>
</div>`,
  prompt: `Design a premium "Bipolar Split Slider". Expanding symmetrically left-right from a center notch, dragging the thumb left trails glowing neon blue and dragging right trails hot magenta.`
};
