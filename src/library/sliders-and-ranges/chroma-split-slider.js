/**
 * Component: Chroma Split Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'chroma-split-slider',
  name: 'Chroma Split Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="chroma-slider-wrapper">
  <div class="chroma-track">
    <div class="chroma-fill" style="width: 50%;"></div>
  </div>
  <div class="chroma-thumb-container" style="left: 50%;">
    <div class="chroma-thumb-channel chroma-r"></div>
    <div class="chroma-thumb-channel chroma-c"></div>
    <div class="chroma-thumb-channel chroma-w"></div>
  </div>
</div>`,
  js: `// RGB chromatic aberration splitting based on cursor velocity
const chWrapper = document.querySelector('.chroma-slider-wrapper');
if (chWrapper) {
  const container = chWrapper.querySelector('.chroma-thumb-container');
  const fill = chWrapper.querySelector('.chroma-fill');
  const thumbR = chWrapper.querySelector('.chroma-r');
  const thumbC = chWrapper.querySelector('.chroma-c');
  const thumbW = chWrapper.querySelector('.chroma-w');
  
  let isDragging = false;
  let lastX = 0;
  let velocity = 0;
  let currentOffset = 0;
  
  const updateSlider = (clientX) => {
    const rect = chWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    container.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Calculate velocity based on drag speed
    const dx = clientX - lastX;
    velocity = dx * 0.45;
    lastX = clientX;
  };
  
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    container.classList.add('active');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      container.classList.remove('active');
    }
  });
  
  chWrapper.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      updateSlider(e.clientX);
    }
  });
  
  // Continuous spring animation for chromatic splits
  let animId;
  const updatePhys = () => {
    if (!chWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    // Bring offset back to 0 with spring damping
    currentOffset += (velocity - currentOffset) * 0.15;
    velocity *= 0.85;
    
    const offsetLimit = Math.max(-12, Math.min(12, currentOffset));
    
    thumbR.style.transform = \`translate(-50%, -50%) translateX(\${-offsetLimit}px)\`;
    thumbC.style.transform = \`translate(-50%, -50%) translateX(\${offsetLimit}px)\`;
    
    animId = requestAnimationFrame(updatePhys);
  };
  
  updatePhys();
}`,
  ts: `// TypeScript Implementation
const chWrapper = document.querySelector<HTMLDivElement>('.chroma-slider-wrapper');
if (chWrapper) {
  const container = chWrapper.querySelector<HTMLDivElement>('.chroma-thumb-container');
  const fill = chWrapper.querySelector<HTMLDivElement>('.chroma-fill');
  const thumbR = chWrapper.querySelector<HTMLDivElement>('.chroma-r');
  const thumbC = chWrapper.querySelector<HTMLDivElement>('.chroma-c');
  const thumbW = chWrapper.querySelector<HTMLDivElement>('.chroma-w');
  
  let isDragging = false;
  let lastX = 0;
  let velocity = 0;
  let currentOffset = 0;
  
  const updateSlider = (clientX: number) => {
    if (!chWrapper || !container || !fill) return;
    const rect = chWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    container.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    const dx = clientX - lastX;
    velocity = dx * 0.45;
    lastX = clientX;
  };
  
  if (container) {
    container.addEventListener('mousedown', (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      container.classList.add('active');
    });
  }
  
  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      if (container) container.classList.remove('active');
    }
  });
  
  chWrapper.addEventListener('click', (e: MouseEvent) => {
    if (container && !container.contains(e.target as Node)) {
      updateSlider(e.clientX);
    }
  });
  
  let animId: number;
  const updatePhys = () => {
    if (!chWrapper.isConnected || !thumbR || !thumbC) {
      cancelAnimationFrame(animId);
      return;
    }
    
    currentOffset += (velocity - currentOffset) * 0.15;
    velocity *= 0.85;
    
    const offsetLimit = Math.max(-12, Math.min(12, currentOffset));
    
    thumbR.style.transform = \`translate(-50%, -50%) translateX(\${-offsetLimit}px)\`;
    thumbC.style.transform = \`translate(-50%, -50%) translateX(\${offsetLimit}px)\`;
    
    animId = requestAnimationFrame(updatePhys);
  };
  
  updatePhys();
}`,
  css: `/* Chroma Split Slider Styles */
.chroma-slider-wrapper {
  position: relative;
  width: 300px;
  height: 48px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.chroma-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.chroma-fill {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, #ff0055, #00ffcc);
  border-radius: 4px;
  width: 50%;
}

.chroma-thumb-container {
  position: absolute;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  z-index: 10;
  cursor: grab;
  overflow: visible;
}

.chroma-thumb-channel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: transform 0.05s linear;
}

.chroma-r {
  background: #ff0055;
  mix-blend-mode: screen;
  box-shadow: 0 0 8px rgba(255, 0, 85, 0.8);
}

.chroma-c {
  background: #00ffcc;
  mix-blend-mode: screen;
  box-shadow: 0 0 8px rgba(0, 255, 204, 0.8);
}

.chroma-w {
  background: #ffffff;
  width: 10px;
  height: 10px;
  box-shadow: 0 0 6px rgba(255,255,255,0.9);
  z-index: 2;
}

.chroma-thumb-container.active {
  cursor: grabbing;
}

.chroma-thumb-container.active .chroma-w {
  transform: translate(-50%, -50%) scale(1.2);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-12 flex items-center select-none cursor-pointer">
  <div class="w-full h-1.5 bg-white/5 border border-white/5 rounded-full relative">
    <div class="absolute h-full bg-gradient-to-r from-rose-500 to-cyan-400 rounded-full w-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-y-1/2 w-6 h-6 cursor-grab">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-rose-500 rounded-full mix-blend-screen opacity-90 -translate-x-1"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-cyan-400 rounded-full mix-blend-screen opacity-90 translate-x-1"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full z-10 shadow-[0_0_6px_rgba(255,255,255,0.9)]"></div>
  </div>
</div>`,
  prompt: `Design a premium "Chroma Split Slider" range selector. Features three sub-pixel layers (Red, Cyan, and White) that overlap perfectly, but split into chromatic aberration channels based on cursor drag speed.`
};
