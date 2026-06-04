/**
 * Component: Magnetic Compass Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'magnetic-compass-slider',
  name: 'Magnetic Compass Slider',
  category: 'sliders-and-ranges',
  tag: 'Premium',
  html: `<div class="compass-slider-wrapper">
  <div class="compass-dial">
    <div class="compass-ring"></div>
    <div class="compass-needle" style="transform: translate(-50%, -50%) rotate(0deg);"></div>
    <div class="compass-pivot"></div>
  </div>
  <div class="compass-track-container">
    <div class="compass-track">
      <div class="compass-fill" style="width: 50%;"></div>
    </div>
    <div class="compass-thumb" style="left: 50%;"></div>
  </div>
</div>`,
  js: `// Compass needle tracking thumb position on drag
const cWrapper = document.querySelector('.compass-slider-wrapper');
if (cWrapper) {
  const thumb = cWrapper.querySelector('.compass-thumb');
  const fill = cWrapper.querySelector('.compass-fill');
  const needle = cWrapper.querySelector('.compass-needle');
  const dial = cWrapper.querySelector('.compass-dial');
  const trackContainer = cWrapper.querySelector('.compass-track-container');
  
  let isDragging = false;
  
  const updateCompass = () => {
    const dialRect = dial.getBoundingClientRect();
    const dialX = dialRect.left + dialRect.width / 2;
    const dialY = dialRect.top + dialRect.height / 2;
    
    const thumbRect = thumb.getBoundingClientRect();
    const thumbX = thumbRect.left + thumbRect.width / 2;
    const thumbY = thumbRect.top + thumbRect.height / 2;
    
    const dx = thumbX - dialX;
    const dy = thumbY - dialY;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = angleRad * (180 / Math.PI);
    
    needle.style.transform = \`translate(-50%, -50%) rotate(\${angleDeg}deg)\`;
  };
  
  const updateSlider = (clientX) => {
    const rect = trackContainer.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    updateCompass();
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
    dial.classList.add('active');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
      dial.classList.remove('active');
    }
  });
  
  trackContainer.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
  
  // Initial compass angle alignment
  setTimeout(updateCompass, 100);
}`,
  ts: `// TypeScript Implementation
const cWrapper = document.querySelector<HTMLDivElement>('.compass-slider-wrapper');
if (cWrapper) {
  const thumb = cWrapper.querySelector<HTMLDivElement>('.compass-thumb');
  const fill = cWrapper.querySelector<HTMLDivElement>('.compass-fill');
  const needle = cWrapper.querySelector<HTMLDivElement>('.compass-needle');
  const dial = cWrapper.querySelector<HTMLDivElement>('.compass-dial');
  const trackContainer = cWrapper.querySelector<HTMLDivElement>('.compass-track-container');
  
  let isDragging = false;
  
  const updateCompass = () => {
    if (!dial || !thumb || !needle) return;
    const dialRect = dial.getBoundingClientRect();
    const dialX = dialRect.left + dialRect.width / 2;
    const dialY = dialRect.top + dialRect.height / 2;
    
    const thumbRect = thumb.getBoundingClientRect();
    const thumbX = thumbRect.left + thumbRect.width / 2;
    const thumbY = thumbRect.top + thumbRect.height / 2;
    
    const dx = thumbX - dialX;
    const dy = thumbY - dialY;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = angleRad * (180 / Math.PI);
    
    needle.style.transform = \`translate(-50%, -50%) rotate(\${angleDeg}deg)\`;
  };
  
  const updateSlider = (clientX: number) => {
    if (!trackContainer || !thumb || !fill) return;
    const rect = trackContainer.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    updateCompass();
  };
  
  if (thumb && dial && trackContainer) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('active');
      dial.classList.add('active');
    });
    
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });
    
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        thumb.classList.remove('active');
        dial.classList.remove('active');
      }
    });
    
    trackContainer.addEventListener('click', (e: MouseEvent) => {
      if (e.target !== thumb) {
        updateSlider(e.clientX);
      }
    });
  }
  
  setTimeout(updateCompass, 100);
}`,
  css: `/* Magnetic Compass Slider Styles */
.compass-slider-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 360px;
  height: 60px;
  background: rgba(18, 14, 10, 0.4);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  user-select: none;
}

.compass-dial {
  position: relative;
  width: 44px;
  height: 44px;
  background: radial-gradient(circle, #251d16, #120e0a);
  border: 2px solid #d4af37;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.3), inset 0 2px 4px rgba(0,0,0,0.8);
  transition: box-shadow 0.3s, transform 0.3s;
}

.compass-dial.active {
  box-shadow: 0 0 18px rgba(212, 175, 55, 0.6), inset 0 2px 4px rgba(0,0,0,0.8);
  transform: scale(1.05);
}

.compass-ring {
  position: absolute;
  inset: 2px;
  border: 1px dashed rgba(212, 175, 55, 0.3);
  border-radius: 50%;
}

.compass-needle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 4px;
  background: linear-gradient(90deg, #e03131 50%, #ffffff 50%);
  clip-path: polygon(0 50%, 50% 0, 100% 50%, 50% 100%);
  transform-origin: center center;
  transition: transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1.2);
  z-index: 2;
}

.compass-pivot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: #d4af37;
  border-radius: 50%;
  z-index: 3;
  box-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

.compass-track-container {
  position: relative;
  flex: 1;
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.compass-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  position: relative;
}

.compass-fill {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, #d4af37, #f3e5ab);
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
}

.compass-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: #120e0a;
  border: 2px solid #d4af37;
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
  transition: transform 0.15s ease, border-color 0.3s;
}

.compass-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  border-color: #ffffff;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex items-center gap-5 w-[360px] h-[60px] bg-amber-950/20 border border-amber-500/10 rounded-xl px-4 py-2 shadow-2xl select-none">
  <div class="relative w-11 h-11 bg-radial from-amber-900 to-amber-950 border-2 border-amber-500 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]">
    <div class="absolute inset-[2px] border border-dashed border-amber-500/30 rounded-full"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-red-500 to-white clip-polygon" style="clip-path: polygon(0 50%, 50% 0, 100% 50%, 50% 100%);"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
  </div>
  <div class="relative flex-1 h-6 flex items-center cursor-pointer">
    <div class="w-full h-1.5 bg-white/5 rounded-full relative">
      <div class="absolute h-full bg-gradient-to-r from-amber-500 to-yellow-200 rounded-full w-1/2 shadow-[0_0_8px_rgba(212,175,55,0.4)]"></div>
    </div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-950 border-2 border-amber-500 rounded-full cursor-grab shadow-[0_0_10px_rgba(212,175,55,0.4)]"></div>
  </div>
</div>`,
  prompt: `Design a premium "Magnetic Compass Slider" range selector. Features an authentic, vector compass dial with a realistic double-pointed needle that dynamically rotates to point directly towards the draggable slider thumb.`
};
