/**
 * Component: Bioluminescent Organism Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'biolume-spore-slider',
  name: 'Biolume Spore Slider',
  category: 'sliders-and-ranges',
  tag: 'Creative',
  html: `<div class="biolume-slider-wrapper">
  <div class="biolume-slider-track">
    <div class="biolume-field-grid">
      <span class="biolume-spore spore-1" style="left: 15%;"></span>
      <span class="biolume-spore spore-2" style="left: 35%;"></span>
      <span class="biolume-spore spore-3" style="left: 55%;"></span>
      <span class="biolume-spore spore-4" style="left: 75%;"></span>
      <span class="biolume-spore spore-5" style="left: 90%;"></span>
    </div>
    <div class="biolume-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="biolume-slider-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive dynamic spore lighting on drag
const bWrapper = document.querySelector('.biolume-slider-wrapper');
if (bWrapper) {
  const thumb = bWrapper.querySelector('.biolume-slider-thumb');
  const fill = bWrapper.querySelector('.biolume-slider-fill');
  const spores = bWrapper.querySelectorAll('.biolume-spore');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = bWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Light up spores near active percentage
    spores.forEach((spore, idx) => {
      const sporePos = 15 + idx * 20; // approximate
      const diff = Math.abs(percentage - sporePos);
      
      if (diff < 15) {
        spore.style.background = '#00f2fe';
        spore.style.boxShadow = '0 0 12px #00f2fe, 0 0 20px #8a2be2';
        spore.style.transform = 'translate(-50%, -50%) scale(1.4)';
      } else {
        spore.style.background = 'rgba(255, 255, 255, 0.15)';
        spore.style.boxShadow = 'none';
        spore.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    });
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
  
  bWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const bWrapper = document.querySelector<HTMLDivElement>('.biolume-slider-wrapper');
if (bWrapper) {
  const thumb = bWrapper.querySelector<HTMLDivElement>('.biolume-slider-thumb');
  const fill = bWrapper.querySelector<HTMLDivElement>('.biolume-slider-fill');
  const spores = bWrapper.querySelectorAll<HTMLSpanElement>('.biolume-spore');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = bWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      spores.forEach((spore, idx) => {
        const sporePos = 15 + idx * 20;
        const diff = Math.abs(percentage - sporePos);
        
        if (diff < 15) {
          spore.style.background = '#00f2fe';
          spore.style.boxShadow = '0 0 12px #00f2fe, 0 0 20px #8a2be2';
          spore.style.transform = 'translate(-50%, -50%) scale(1.4)';
        } else {
          spore.style.background = 'rgba(255, 255, 255, 0.15)';
          spore.style.boxShadow = 'none';
          spore.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      });
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
  css: `/* Biolume Spore Slider Styles */
.biolume-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.biolume-slider-track {
  width: 100%;
  height: 6px;
  background: rgba(138, 43, 226, 0.05);
  border-radius: 10px;
  position: relative;
  border: 1px solid rgba(138, 43, 226, 0.1);
}

.biolume-slider-fill {
  height: 100%;
  background: rgba(0, 242, 254, 0.2);
  border-radius: 10px;
  width: 50%;
}

.biolume-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: #020205;
  border: 2px solid #00f2fe;
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
  transition: transform 0.15s ease;
}

.biolume-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  border-color: #8a2be2;
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.8);
}

/* Bioluminescent biological spores floating inside the track */
.biolume-field-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.biolume-spore {
  position: absolute;
  top: 50%;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 3;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-1.5 bg-violet-950/10 rounded-full border border-violet-500/10 relative overflow-hidden">
    <div class="absolute h-full bg-cyan-500/20 w-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-cyan-400 rounded-full cursor-grab shadow-[0_0_10px_rgba(0,242,254,0.5)]"></div>
</div>`,
  prompt: `Design a premium "Biolume Spore Slider" component. Encased in dark cybernetic moss, dragging the thumb lights up biological spore node points in bright cyan/purple glows as it passes.`
};
