/**
 * Component: DNA Helix Genetic Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'dna-helix-slider',
  name: 'DNA Helix Slider',
  category: 'sliders-and-ranges',
  tag: 'Creative',
  html: `<div class="dna-slider-wrapper">
  <div class="dna-slider-track">
    <div class="dna-slider-viewport">
      <div class="dna-slider-strand">
        <span class="dna-bead" style="--left: 10%; --h: -8px; --d: 0s;"></span>
        <span class="dna-bead" style="--left: 30%; --h: 8px; --d: 0.3s;"></span>
        <span class="dna-bead" style="--left: 50%; --h: -8px; --d: 0.6s;"></span>
        <span class="dna-bead" style="--left: 70%; --h: 8px; --d: 0.9s;"></span>
        <span class="dna-bead" style="--left: 90%; --h: -8px; --d: 1.2s;"></span>
      </div>
    </div>
    <div class="dna-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="dna-slider-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive coiling helix speedup on dragging
const dWrapper = document.querySelector('.dna-slider-wrapper');
if (dWrapper) {
  const thumb = dWrapper.querySelector('.dna-slider-thumb');
  const fill = dWrapper.querySelector('.dna-slider-fill');
  const beads = dWrapper.querySelectorAll('.dna-bead');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = dWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\back\`;
    fill.style.width = \`\${percentage}%\`;
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
    
    beads.forEach(bead => {
      bead.style.animationDuration = '0.5s';
    });
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
      
      beads.forEach(bead => {
        bead.style.animationDuration = '1.5s';
      });
    }
  });
  
  dWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const dWrapper = document.querySelector<HTMLDivElement>('.dna-slider-wrapper');
if (dWrapper) {
  const thumb = dWrapper.querySelector<HTMLDivElement>('.dna-slider-thumb');
  const fill = dWrapper.querySelector<HTMLDivElement>('.dna-slider-fill');
  const beads = dWrapper.querySelectorAll<HTMLSpanElement>('.dna-bead');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = dWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
    }
  };
  
  if (thumb) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('active');
      beads.forEach(bead => {
        bead.style.animationDuration = '0.5s';
      });
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
      beads.forEach(bead => {
        bead.style.animationDuration = '1.5s';
      });
    }
  });
}`,
  css: `/* DNA Helix Slider Styles */
.dna-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.dna-slider-track {
  width: 100%;
  height: 8px;
  background: rgba(0, 242, 254, 0.05);
  border-radius: 4px;
  position: relative;
  border: 1px solid rgba(0, 242, 254, 0.1);
}

.dna-slider-viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 4px;
}

.dna-slider-strand {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.dna-bead {
  position: absolute;
  top: 50%;
  left: var(--left);
  width: 5px;
  height: 5px;
  background: #00f2fe;
  border-radius: 50%;
  box-shadow: 0 0 6px #00f2fe;
  transform: translateY(var(--h)) scale(0.8);
  animation: bead-coil-oscillate 1.5s infinite ease-in-out alternate;
  animation-delay: var(--d);
}

@keyframes bead-coil-oscillate {
  0% {
    transform: translateY(var(--h)) scale(0.6);
    opacity: 0.4;
  }
  100% {
    transform: translateY(calc(-1 * var(--h))) scale(1.2);
    opacity: 1;
    background: #ff007f;
    box-shadow: 0 0 8px #ff007f;
  }
}

.dna-slider-fill {
  position: absolute;
  height: 100%;
  background: rgba(0, 242, 254, 0.2);
  border-radius: 4px;
  width: 50%;
}

.dna-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: #020205;
  border: 2.5px solid #00f2fe;
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 12px rgba(0, 242, 254, 0.5);
  transition: transform 0.15s ease;
}

.dna-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.25);
  border-color: #ff007f;
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.8);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-2 bg-cyan-950/10 rounded border border-cyan-500/10 relative overflow-hidden">
    <div class="absolute h-full bg-cyan-500/20 w-1/2"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-[2.5px] border-cyan-400 rounded-full cursor-grab shadow-[0_0_12px_rgba(0,242,254,0.5)]"></div>
</div>`,
  prompt: `Design a premium "DNA Helix Slider" component. Inside the translucent track, double-stranded genetic coiling nodes float and spin, coiling and oscillating faster when dragging the thumb.`
};
