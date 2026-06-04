/**
 * Component: Acoustic Wave Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'acoustic-wave-slider',
  name: 'Acoustic Wave Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="acoustic-slider-wrapper">
  <div class="acoustic-wave-equalizer">
    <span class="acoustic-bar"></span>
    <span class="acoustic-bar"></span>
    <span class="acoustic-bar"></span>
    <span class="acoustic-bar"></span>
    <span class="acoustic-bar"></span>
    <span class="acoustic-bar"></span>
    <span class="acoustic-bar"></span>
  </div>
  <div class="acoustic-slider-track">
    <div class="acoustic-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="acoustic-slider-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive dynamic audio frequency oscillation on drag
const aWrapper = document.querySelector('.acoustic-slider-wrapper');
if (aWrapper) {
  const thumb = aWrapper.querySelector('.acoustic-slider-thumb');
  const fill = aWrapper.querySelector('.acoustic-slider-fill');
  const bars = aWrapper.querySelectorAll('.acoustic-bar');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = aWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Vary bar amplitudes vigorously during drag
    if (isDragging) {
      bars.forEach(bar => {
        bar.style.transform = \`scaleY(\${1.5 + Math.random() * 2.2})\`;
      });
    }
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
    aWrapper.classList.add('dragging-active');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
      aWrapper.classList.remove('dragging-active');
      
      // Reset waves
      bars.forEach(bar => {
        bar.style.transform = 'none';
      });
    }
  });
  
  aWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const aWrapper = document.querySelector<HTMLDivElement>('.acoustic-slider-wrapper');
if (aWrapper) {
  const thumb = aWrapper.querySelector<HTMLDivElement>('.acoustic-slider-thumb');
  const fill = aWrapper.querySelector<HTMLDivElement>('.acoustic-slider-fill');
  const bars = aWrapper.querySelectorAll<HTMLSpanElement>('.acoustic-bar');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = aWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (isDragging) {
        bars.forEach(bar => {
          bar.style.transform = \`scaleY(\${1.5 + Math.random() * 2.2})\`;
        });
      }
    }
  };
  
  if (thumb) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('active');
      aWrapper.classList.add('dragging-active');
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
      aWrapper.classList.remove('dragging-active');
      bars.forEach(bar => {
        bar.style.transform = 'none';
      });
    }
  });
}`,
  css: `/* Acoustic Wave Slider Styles */
.acoustic-slider-wrapper {
  position: relative;
  width: 300px;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  user-select: none;
  cursor: pointer;
  overflow: visible;
  padding-bottom: 8px;
  box-sizing: border-box;
}

.acoustic-slider-track {
  width: 100%;
  height: 4px;
  background: rgba(16, 185, 129, 0.08);
  border-radius: 4px;
  position: relative;
}

.acoustic-slider-fill {
  position: absolute;
  height: 100%;
  background: #10b981;
  border-radius: 4px;
  width: 50%;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
}

.acoustic-slider-thumb {
  position: absolute;
  bottom: 2px;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: #ffffff;
  border: 2px solid #10b981;
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
  transition: transform 0.15s ease;
}

.acoustic-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  border-color: #ffd700;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
}

/* Oscillating Frequency waves on drag */
.acoustic-wave-equalizer {
  position: absolute;
  bottom: 16px;
  left: 10px;
  right: 10px;
  height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  pointer-events: none;
  opacity: 0.15;
  transition: opacity 0.3s;
}

.acoustic-slider-wrapper:hover .acoustic-wave-equalizer,
.acoustic-slider-wrapper.dragging-active .acoustic-wave-equalizer {
  opacity: 0.85;
}

.acoustic-bar {
  width: calc(100% / 7 - 4px);
  height: 3px;
  background: #10b981;
  border-radius: 2px 2px 0 0;
  transform-origin: bottom center;
  transition: transform 0.1s ease;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-12 flex flex-col justify-end pb-2 select-none cursor-pointer">
  <div class="w-full h-1 bg-emerald-500/10 rounded-full relative">
    <div class="absolute h-full bg-emerald-500 rounded w-1/2 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
  </div>
  <div class="absolute bottom-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-emerald-500 rounded-full cursor-grab shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
</div>`,
  prompt: `Design a premium "Acoustic Wave Slider". Hovering and dragging triggers high-fidelity emerald sound equalizer waves to ripple upwards from the track.`
};
