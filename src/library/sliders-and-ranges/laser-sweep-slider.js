/**
 * Component: Laser Sweep Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'laser-sweep-slider',
  name: 'Laser Sweep Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="laser-slider-wrapper">
  <div class="laser-track">
    <div class="laser-grid-mesh"></div>
    <div class="laser-fill" style="width: 50%;"></div>
    <div class="laser-beam" style="left: 50%;"></div>
    <div class="laser-glow-flare" style="left: 50%;"></div>
  </div>
  <div class="laser-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Laser scanning sweep sync with thumb coordinate on drag
const lWrapper = document.querySelector('.laser-slider-wrapper');
if (lWrapper) {
  const thumb = lWrapper.querySelector('.laser-thumb');
  const fill = lWrapper.querySelector('.laser-fill');
  const beam = lWrapper.querySelector('.laser-beam');
  const flare = lWrapper.querySelector('.laser-glow-flare');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = lWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\shortcode\`; // wait, let's keep clean string template syntax
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    beam.style.left = \`\${percentage}%\`;
    flare.style.left = \`\${percentage}%\`;
    
    if (isDragging) {
      beam.classList.add('scanning');
      flare.classList.add('scanning');
    }
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
    beam.classList.add('active');
    flare.classList.add('active');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
      beam.classList.remove('active', 'scanning');
      flare.classList.remove('active', 'scanning');
    }
  });
  
  lWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const lWrapper = document.querySelector<HTMLDivElement>('.laser-slider-wrapper');
if (lWrapper) {
  const thumb = lWrapper.querySelector<HTMLDivElement>('.laser-thumb');
  const fill = lWrapper.querySelector<HTMLDivElement>('.laser-fill');
  const beam = lWrapper.querySelector<HTMLDivElement>('.laser-beam');
  const flare = lWrapper.querySelector<HTMLDivElement>('.laser-glow-flare');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = lWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill && beam && flare) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      beam.style.left = \`\${percentage}%\`;
      flare.style.left = \`\${percentage}%\`;
      
      if (isDragging) {
        beam.classList.add('scanning');
        flare.classList.add('scanning');
      }
    }
  };
  
  if (thumb && beam && flare) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('active');
      beam.classList.add('active');
      flare.classList.add('active');
    });
  }
  
  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      if (thumb && beam && flare) {
        thumb.classList.remove('active');
        beam.classList.remove('active', 'scanning');
        flare.classList.remove('active', 'scanning');
      }
    }
  });
  
  lWrapper.addEventListener('click', (e: MouseEvent) => {
    if (thumb && e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  css: `/* Laser Sweep Slider Styles */
.laser-slider-wrapper {
  position: relative;
  width: 300px;
  height: 48px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.laser-track {
  width: 100%;
  height: 18px;
  background: #080204;
  border-radius: 4px;
  position: relative;
  border: 1px solid rgba(255, 0, 85, 0.15);
  box-shadow: inset 0 0 12px rgba(255, 0, 85, 0.08);
  overflow: hidden;
}

.laser-grid-mesh {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(90deg, rgba(255, 0, 85, 0.08) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 0, 85, 0.08) 1px, transparent 1px);
  background-size: 8px 6px;
  z-index: 1;
}

.laser-fill {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 0, 85, 0.05), rgba(255, 0, 85, 0.2));
  border-radius: 4px;
  width: 50%;
  z-index: 2;
  border-right: 1px solid rgba(255, 0, 85, 0.3);
}

.laser-beam {
  position: absolute;
  top: -4px;
  bottom: -4px;
  width: 3px;
  background: #ff0055;
  box-shadow: 0 0 8px #ff0055, 0 0 16px #ff0055, 0 0 32px #ff0055;
  transform: translateX(-50%);
  z-index: 4;
  pointer-events: none;
  opacity: 0.7;
  transition: opacity 0.3s, width 0.15s;
}

.laser-beam.active {
  opacity: 1;
  width: 4px;
}

.laser-beam.scanning {
  animation: laser-pulse 0.1s infinite alternate;
}

.laser-glow-flare {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(255, 0, 85, 0.12) 0%, transparent 70%);
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.laser-glow-flare.active {
  opacity: 1;
}

.laser-glow-flare.scanning {
  transform: translate(-50%, -50%) scale(1.1);
}

.laser-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 26px;
  background: #150005;
  border: 2px solid #ff0055;
  border-radius: 3px;
  z-index: 10;
  cursor: grab;
  box-shadow: 0 0 10px rgba(255, 0, 85, 0.4);
  transition: transform 0.15s ease, border-color 0.3s;
}

.laser-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.1);
  border-color: #ffffff;
  box-shadow: 0 0 15px #ffffff, 0 0 25px #ff0055;
}

@keyframes laser-pulse {
  0% { transform: translateX(-50%) scaleX(0.85); opacity: 0.9; }
  100% { transform: translateX(-50%) scaleX(1.15); opacity: 1; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-12 flex items-center select-none cursor-pointer">
  <div class="w-full h-[18px] bg-[#080204] border border-rose-500/20 rounded relative overflow-hidden">
    <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,63,94,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,63,94,0.08)_1px,transparent_1px)] bg-[size:8px_6px]"></div>
    <div class="absolute h-full bg-gradient-to-r from-rose-500/5 to-rose-500/20 w-1/2 border-r border-rose-500/30"></div>
    <div class="absolute top-[-4px] bottom-[-4px] w-[3px] bg-rose-500 shadow-[0_0_8px_#ff0055,0_0_16px_#ff0055] left-1/2 -translate-x-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-[26px] bg-rose-950 border-2 border-rose-500 rounded-sm cursor-grab shadow-[0_0_10px_rgba(255,0,85,0.4)]"></div>
</div>`,
  prompt: `Design a premium "Laser Sweep Slider" range selector. Track styled as a dark tactical HUD grid overlay. Dragging the thumb sweeps a high-intensity red scanline laser beam across the grid with realistic neon glows.`
};
