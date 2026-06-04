/**
 * Component: Cyber Glitch Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'cyber-glitch-slider',
  name: 'Cyber Glitch Slider',
  category: 'sliders-and-ranges',
  tag: 'Interactive',
  html: `<div class="cyber-glitch-slider-wrapper">
  <div class="glitch-slider-track">
    <div class="glitch-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="glitch-slider-thumb" style="left: 50%;">
    <span class="glitch-coordinate">V: 50%</span>
  </div>
</div>`,
  js: `// Interactive dynamic glitch matrix text coordinate updates
const gWrapper = document.querySelector('.cyber-glitch-slider-wrapper');
if (gWrapper) {
  const thumb = gWrapper.querySelector('.glitch-slider-thumb');
  const fill = gWrapper.querySelector('.glitch-slider-fill');
  const coord = gWrapper.querySelector('.glitch-coordinate');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = gWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    coord.textContent = \`V: \${Math.round(percentage)}%\`;
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
  
  gWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const gWrapper = document.querySelector<HTMLDivElement>('.cyber-glitch-slider-wrapper');
if (gWrapper) {
  const thumb = gWrapper.querySelector<HTMLDivElement>('.glitch-slider-thumb');
  const fill = gWrapper.querySelector<HTMLDivElement>('.glitch-slider-fill');
  const coord = gWrapper.querySelector<HTMLSpanElement>('.glitch-coordinate');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = gWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill && coord) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      coord.textContent = \`V: \${Math.round(percentage)}%\`;
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
  css: `/* Cyber Glitch Slider Styles */
.cyber-glitch-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.glitch-slider-track {
  width: 100%;
  height: 4px;
  background: rgba(0, 255, 0, 0.05);
  border-radius: 2px;
  position: relative;
  border: 1px solid rgba(0, 255, 0, 0.1);
}

.glitch-slider-fill {
  height: 100%;
  background: #00ff00;
  border-radius: 2px;
  width: 50%;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
}

.glitch-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: #020202;
  border: 2px solid #00ff00;
  border-radius: 4px;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 12px rgba(0, 255, 0, 0.4);
  transition: transform 0.15s ease;
}

.glitch-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.15) rotate(5deg);
  border-color: #ff007f;
  box-shadow: 0 0 15px #ff007f;
}

.glitch-coordinate {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  font-weight: 700;
  color: #00ff00;
  text-shadow: 0 0 4px #00ff00;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0.7;
}

.glitch-slider-thumb.active .glitch-coordinate {
  color: #ff007f;
  text-shadow: 0 0 4px #ff007f;
  opacity: 1;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-1 bg-green-500/5 rounded border border-green-500/10 relative">
    <div class="absolute h-full bg-green-500 rounded w-1/2 shadow-[0_0_10px_rgba(0,255,0,0.6)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black border-2 border-green-500 rounded cursor-grab shadow-[0_0_12px_rgba(0,255,0,0.4)]"></div>
</div>`,
  prompt: `Design a premium "Cyber Glitch Slider" component. Encased in a neon grid, dragging the thumb displays green matrix glitch lines and mini telemetry text coordinate skews.`
};
