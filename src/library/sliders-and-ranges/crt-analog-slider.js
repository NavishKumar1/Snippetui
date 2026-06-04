/**
 * Component: CRT Analog Vector Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'crt-analog-slider',
  name: 'CRT Analog Slider',
  category: 'sliders-and-ranges',
  tag: 'Aesthetic',
  html: `<div class="crt-slider-wrapper">
  <div class="crt-slider-track">
    <div class="crt-raster-grid"></div>
    <div class="crt-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="crt-slider-thumb" style="left: 50%;">
    <span class="crt-scan-line"></span>
  </div>
</div>`,
  js: `// Interactive dynamic analog scanline flickering on drag
const cWrapper = document.querySelector('.crt-slider-wrapper');
if (cWrapper) {
  const thumb = cWrapper.querySelector('.crt-slider-thumb');
  const fill = cWrapper.querySelector('.crt-slider-fill');
  const scanline = cWrapper.querySelector('.crt-scan-line');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = cWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Trigger intense flicker on drag
    if (isDragging && scanline) {
      scanline.style.opacity = Math.random() > 0.3 ? '1' : '0.4';
    }
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
    if (scanline) scanline.classList.add('flickering');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
      if (scanline) {
        scanline.classList.remove('flickering');
        scanline.style.opacity = '0.8';
      }
    }
  });
  
  cWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const cWrapper = document.querySelector<HTMLDivElement>('.crt-slider-wrapper');
if (cWrapper) {
  const thumb = cWrapper.querySelector<HTMLDivElement>('.crt-slider-thumb');
  const fill = cWrapper.querySelector<HTMLDivElement>('.crt-slider-fill');
  const scanline = cWrapper.querySelector<HTMLSpanElement>('.crt-scan-line');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = cWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (isDragging && scanline) {
        scanline.style.opacity = Math.random() > 0.3 ? '1' : '0.4';
      }
    }
  };
  
  if (thumb) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('active');
      if (scanline) scanline.classList.add('flickering');
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
      if (scanline) {
        scanline.classList.remove('flickering');
        scanline.style.opacity = '0.8';
      }
    }
  });
}`,
  css: `/* CRT Analog Slider Styles */
.crt-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.crt-slider-track {
  width: 100%;
  height: 10px;
  background: #051a10;
  border-radius: 4px;
  position: relative;
  border: 1.5px solid #112a1d;
  box-shadow: inset 0 0 10px rgba(0,255,255,0.2);
  overflow: hidden;
}

/* Cathode screen grid mesh overlay */
.crt-raster-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 6px 6px;
  pointer-events: none;
  z-index: 1;
}

.crt-slider-fill {
  position: absolute;
  height: 100%;
  background: rgba(0, 255, 255, 0.15);
  border-radius: 4px;
  width: 50%;
  z-index: 2;
}

.crt-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 22px;
  background: #020202;
  border: 2px solid #00f2fe;
  border-radius: 2px;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 8px rgba(0, 242, 254, 0.6);
  transition: transform 0.15s ease;
}

.crt-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.15);
  border-color: #ffd700;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.8);
}

.crt-scan-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 16px;
  background: #ffffff;
  box-shadow: 0 0 8px #ffffff;
  opacity: 0.8;
}

.crt-scan-line.flickering {
  animation: crt-scan-flicker 0.1s infinite alternate;
}

@keyframes crt-scan-flicker {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-2.5 bg-[#051a10] border border-[#112a1d] rounded relative overflow-hidden">
    <div class="absolute h-full bg-cyan-500/20 w-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-[22px] bg-black border-2 border-cyan-400 rounded-sm cursor-grab shadow-[0_0_8px_rgba(0,242,254,0.6)]"></div>
</div>`,
  prompt: `Design a premium "CRT Analog Slider" component. Encased in a heavy bezel CRT grid track, dragging the thumb sweeps a flickering green analog scanline vector with static pixels noise.`
};
