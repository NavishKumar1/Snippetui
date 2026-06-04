/**
 * Component: Liquid Thermometer Range
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'liquid-thermometer-range',
  name: 'Liquid Range Slider',
  category: 'sliders-and-ranges',
  tag: 'Premium',
  html: `<div class="liquid-slider-wrapper">
  <div class="thermometer-track">
    <div class="thermometer-liquid-fill" style="width: 50%;"></div>
  </div>
  <div class="thermometer-droplet-thumb" style="left: 50%;">
    <span class="droplet-core"></span>
  </div>
  <span class="thermometer-value">50%</span>
</div>`,
  js: `// Interactive liquid range dragging with coordinate stretching
const sWrapper = document.querySelector('.liquid-slider-wrapper');
if (sWrapper) {
  const thumb = sWrapper.querySelector('.thermometer-droplet-thumb');
  const fill = sWrapper.querySelector('.thermometer-liquid-fill');
  const val = sWrapper.querySelector('.thermometer-value');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = sWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    val.textContent = \`\${Math.round(percentage)}%\`;
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('dragging');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
    
    // Stretch droplet during drag based on mouse movement speed
    thumb.style.transform = 'translate(-50%, -50%) scale(1.3, 0.8)';
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('dragging');
      // Snap droplet back to original circle shape
      thumb.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });
  
  // Click on track supports instant repositioning
  sWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const sWrapper = document.querySelector<HTMLDivElement>('.liquid-slider-wrapper');
if (sWrapper) {
  const thumb = sWrapper.querySelector<HTMLDivElement>('.thermometer-droplet-thumb');
  const fill = sWrapper.querySelector<HTMLDivElement>('.thermometer-liquid-fill');
  const val = sWrapper.querySelector<HTMLSpanElement>('.thermometer-value');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = sWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb) thumb.style.left = \`\${percentage}%\back\`;
    if (fill) fill.style.width = \`\${percentage}%\`;
    if (val) val.textContent = \`\${Math.round(percentage)}%\`;
  };
  
  if (thumb) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('dragging');
    });
  }
  
  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
    if (thumb) thumb.style.transform = 'translate(-50%, -50%) scale(1.3, 0.8)';
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      if (thumb) {
        thumb.classList.remove('dragging');
        thumb.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }
  });
}`,
  css: `/* Liquid Thermometer Range Styles */
.liquid-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.thermometer-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.thermometer-liquid-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff8c00, #ff0055);
  border-radius: 10px;
  width: 50%;
  box-shadow: 0 0 10px rgba(255, 55, 0, 0.4);
}

.thermometer-droplet-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 18px;
  height: 18px;
  background: #ff0055;
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 15px #ff0055;
  transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s;
}

.thermometer-droplet-thumb.dragging {
  cursor: grabbing;
  background: #ffd700;
  box-shadow: 0 0 25px #ffd700;
}

.droplet-core {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
}

.thermometer-value {
  position: absolute;
  right: -50px;
  color: #ff0055;
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  font-weight: 600;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-1.5 bg-white/10 rounded-full">
    <div class="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full w-1/2 shadow-[0_0_10px_rgba(255,55,0,0.4)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full cursor-grab shadow-[0_0_15px_#ff0055]"></div>
</div>`,
  prompt: `Design a premium "Liquid Thermometer Range" slider component. On click and drag, the thumb behaves like a molten droplet stretching horizontally during drag and snapping back to a glowing circle on release.`
};
