/**
 * Component: Origami Geometric Fold Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'origami-fold-slider',
  name: 'Origami Fold Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="origami-slider-wrapper">
  <div class="origami-slider-track">
    <div class="origami-mesh-container">
      <span class="origami-facet facet-1" style="--l: 15%; --d: 0s;"></span>
      <span class="origami-facet facet-2" style="--l: 45%; --d: 0.2s;"></span>
      <span class="origami-facet facet-3" style="--l: 75%; --d: 0.4s;"></span>
    </div>
    <div class="origami-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="origami-slider-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive dynamic geometric folding shifts on drag
const oWrapper = document.querySelector('.origami-slider-wrapper');
if (oWrapper) {
  const thumb = oWrapper.querySelector('.origami-slider-thumb');
  const fill = oWrapper.querySelector('.origami-slider-fill');
  const facets = oWrapper.querySelectorAll('.origami-facet');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = oWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Adjust origami mesh scaling dynamically
    if (isDragging) {
      facets.forEach((facet, idx) => {
        const factor = Math.abs((percentage - (15 + idx * 30)) / 30);
        const scaleY = Math.max(0.2, Math.min(1.5, 1.5 - factor));
        facet.style.transform = \`translate(-50%, -50%) rotate(45deg) scaleY(\${scaleY})\`;
      });
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
      
      // Reset mesh
      facets.forEach(facet => {
        facet.style.transform = 'translate(-50%, -50%) rotate(45deg) scaleY(1)';
      });
    }
  });
  
  oWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const oWrapper = document.querySelector<HTMLDivElement>('.origami-slider-wrapper');
if (oWrapper) {
  const thumb = oWrapper.querySelector<HTMLDivElement>('.origami-slider-thumb');
  const fill = oWrapper.querySelector<HTMLDivElement>('.origami-slider-fill');
  const facets = oWrapper.querySelectorAll<HTMLSpanElement>('.origami-facet');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = oWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (isDragging) {
        facets.forEach((facet, idx) => {
          const factor = Math.abs((percentage - (15 + idx * 30)) / 30);
          const scaleY = Math.max(0.2, Math.min(1.5, 1.5 - factor));
          facet.style.transform = \`translate(-50%, -50%) rotate(45deg) scaleY(\${scaleY})\`;
        });
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
      facets.forEach(facet => {
        facet.style.transform = 'translate(-50%, -50%) rotate(45deg) scaleY(1)';
      });
    }
  });
}`,
  css: `/* Origami Fold Slider Styles */
.origami-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.origami-slider-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  position: relative;
}

.origami-slider-fill {
  position: absolute;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  width: 50%;
}

.origami-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 14px;
  height: 14px;
  background: #ffffff;
  border: 2px solid #8a2be2;
  border-radius: 2px;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.4);
  transition: transform 0.15s ease;
}

.origami-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) rotate(135deg) scale(1.2);
  border-color: #ff007f;
  box-shadow: 0 0 15px rgba(255, 0, 127, 0.6);
}

/* Geometric Origami folding facets in background */
.origami-mesh-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.origami-facet {
  position: absolute;
  top: 50%;
  left: var(--l);
  width: 14px;
  height: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -50%) rotate(45deg) scaleY(1);
  border-radius: 1px;
  transition: transform 0.1s ease, background 0.3s;
}

.origami-slider-wrapper:hover .origami-facet {
  background: rgba(138, 43, 226, 0.05);
  border-color: rgba(138, 43, 226, 0.2);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-1.5 bg-white/5 rounded relative">
    <div class="absolute h-full bg-white/10 rounded w-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-violet-600 rotate-45 rounded-sm cursor-grab shadow-[0_0_10px_rgba(138,43,226,0.4)]"></div>
</div>`,
  prompt: `Design a premium "Origami Fold Slider" component. Moving the thumb folds/unfolds dimensional geometric triangular meshes across the track.`
};
