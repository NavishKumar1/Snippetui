/**
 * Component: Chroma Light Refraction Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'chroma-refraction-slider',
  name: 'Chroma Refraction Slider',
  category: 'sliders-and-ranges',
  tag: 'Premium',
  html: `<div class="chroma-refraction-slider-wrapper">
  <div class="chroma-slider-spectrum"></div>
  <div class="chroma-slider-track">
    <div class="chroma-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="chroma-slider-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive refraction coordinates shifts on hover and drag
const crWrapper = document.querySelector('.chroma-refraction-slider-wrapper');
if (crWrapper) {
  const thumb = crWrapper.querySelector('.chroma-slider-thumb');
  const fill = crWrapper.querySelector('.chroma-slider-fill');
  const spectrum = crWrapper.querySelector('.chroma-slider-spectrum');
  
  let isDragging = false;
  
  const updateSlider = (clientX, e) => {
    const rect = crWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    if (e && spectrum) {
      // Calculate cursor coordinates offset inside wrapper to tilt spectrum
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      spectrum.style.setProperty('--rx', \`\${x * 40}px\`);
      spectrum.style.setProperty('--ry', \`\${y * 20}px\`);
    }
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
    if (spectrum) spectrum.style.opacity = '0.95';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX, e);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
      if (spectrum) {
        spectrum.style.opacity = '0';
        spectrum.style.setProperty('--rx', '0px');
        spectrum.style.setProperty('--ry', '0px');
      }
    }
  });
  
  crWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX, e);
    }
  });
}`,
  ts: `// TypeScript Implementation
const crWrapper = document.querySelector<HTMLDivElement>('.chroma-refraction-slider-wrapper');
if (crWrapper) {
  const thumb = crWrapper.querySelector<HTMLDivElement>('.chroma-slider-thumb');
  const fill = crWrapper.querySelector<HTMLDivElement>('.chroma-slider-fill');
  const spectrum = crWrapper.querySelector<HTMLDivElement>('.chroma-slider-spectrum');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number, e?: MouseEvent) => {
    const rect = crWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (e && spectrum) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        spectrum.style.setProperty('--rx', \`\${x * 40}px\`);
        spectrum.style.setProperty('--ry', \`\${y * 20}px\`);
      }
    }
  };
  
  if (thumb) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('active');
      if (spectrum) spectrum.style.opacity = '0.95';
    });
  }
  
  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX, e);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      if (thumb) thumb.classList.remove('active');
      if (spectrum) {
        spectrum.style.opacity = '0';
        spectrum.style.setProperty('--rx', '0px');
        spectrum.style.setProperty('--ry', '0px');
      }
    }
  });
}`,
  css: `/* Chroma Refraction Slider Styles */
.chroma-refraction-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.chroma-slider-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  position: relative;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.chroma-slider-fill {
  position: absolute;
  height: 100%;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  width: 50%;
}

.chroma-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  z-index: 5;
  cursor: grab;
  box-shadow: 
    0 10px 20px -5px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.05);
  transition: transform 0.15s ease;
}

.chroma-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  border-color: rgba(255, 255, 255, 0.35);
}

/* Translucent split laser spectrum shadow background */
.chroma-slider-spectrum {
  position: absolute;
  inset: -1px;
  border-radius: 4px;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  box-shadow: 
    calc(-3px + var(--rx, 0px)) calc(-2px + var(--ry, 0px)) 10px rgba(0, 255, 255, 0.8),
    calc(3px + var(--rx, 0px)) calc(2px + var(--ry, 0px)) 10px rgba(255, 0, 127, 0.8),
    calc(0px + var(--rx, 0px)) calc(3px + var(--ry, 0px)) 12px rgba(255, 215, 0, 0.6);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-1.5 bg-white/5 rounded relative">
    <div class="absolute h-full bg-white/10 rounded w-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/5 border border-white/10 rounded cursor-grab shadow-lg"></div>
</div>`,
  prompt: `Design a premium "Chroma Refraction Slider" component. Made of translucent quartz crystal, dragging the thumb refracts a laser light beam into a dynamic rainbow spectrum behind its borders, shifting angle according to mouse coordinates.`
};
