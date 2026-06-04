/**
 * Component: Gravity Magnet Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'gravity-magnet-slider',
  name: 'Gravity Magnet Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="magnetic-slider-wrapper">
  <div class="magnetic-track">
    <span class="magnetic-notch notch-0" style="left: 0%;"></span>
    <span class="magnetic-notch notch-25" style="left: 25%;"></span>
    <span class="magnetic-notch notch-50" style="left: 50%;"></span>
    <span class="magnetic-notch notch-75" style="left: 75%;"></span>
    <span class="magnetic-notch notch-100" style="left: 100%;"></span>
  </div>
  <div class="magnetic-fill" style="width: 50%;"></div>
  <div class="magnetic-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive magnetic notch snapping logic
const mWrapper = document.querySelector('.magnetic-slider-wrapper');
if (mWrapper) {
  const thumb = mWrapper.querySelector('.magnetic-thumb');
  const fill = mWrapper.querySelector('.magnetic-fill');
  const notches = [0, 25, 50, 75, 100];
  
  let isDragging = false;
  
  const updateSlider = (clientX, snap = false) => {
    const rect = mWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (snap) {
      // Find nearest magnetic notch to snap to
      const nearest = notches.reduce((prev, curr) => {
        return Math.abs(curr - percentage) < Math.abs(prev - percentage) ? curr : prev;
      });
      percentage = nearest;
      thumb.style.transition = 'left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      fill.style.transition = 'width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    } else {
      thumb.style.transition = 'none';
      fill.style.transition = 'none';
    }
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', (e) => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
      updateSlider(e.clientX, true); // Snap on release
    }
  });
  
  mWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX, true);
    }
  });
}`,
  ts: `// TypeScript Implementation
const mWrapper = document.querySelector<HTMLDivElement>('.magnetic-slider-wrapper');
if (mWrapper) {
  const thumb = mWrapper.querySelector<HTMLDivElement>('.magnetic-thumb');
  const fill = mWrapper.querySelector<HTMLDivElement>('.magnetic-fill');
  const notches = [0, 25, 50, 75, 100];
  
  let isDragging = false;
  
  const updateSlider = (clientX: number, snap = false) => {
    const rect = mWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      if (snap) {
        const nearest = notches.reduce((prev, curr) => {
          return Math.abs(curr - percentage) < Math.abs(prev - percentage) ? curr : prev;
        });
        percentage = nearest;
        thumb.style.transition = 'left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        fill.style.transition = 'width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      } else {
        thumb.style.transition = 'none';
        fill.style.transition = 'none';
      }
      
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
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
  
  document.addEventListener('mouseup', (e: MouseEvent) => {
    if (isDragging) {
      isDragging = false;
      if (thumb) thumb.classList.remove('active');
      updateSlider(e.clientX, true);
    }
  });
}`,
  css: `/* Gravity Magnet Slider Styles */
.magnetic-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.magnetic-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  position: relative;
}

.magnetic-fill {
  position: absolute;
  height: 4px;
  background: #00f2fe;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
}

.magnetic-notch {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  z-index: 2;
  transition: all 0.3s;
}

.magnetic-slider-wrapper:hover .magnetic-notch {
  background: rgba(0, 242, 254, 0.3);
  box-shadow: 0 0 6px rgba(0, 242, 254, 0.5);
}

.magnetic-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: #ffffff;
  border: 2.5px solid #00f2fe;
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
  transition: transform 0.15s ease, border-color 0.3s;
}

.magnetic-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  border-color: #8a2be2;
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.6);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-1 bg-white/5 rounded-full relative">
    <div class="absolute h-full bg-cyan-400 rounded-full w-1/2 shadow-[0_0_10px_rgba(0,242,254,0.5)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[2.5px] border-cyan-400 rounded-full cursor-grab shadow-[0_0_10px_rgba(0,242,254,0.4)]"></div>
</div>`,
  prompt: `Design a premium "Gravity Magnet Slider" range selector. Composed of translucent glass, as you drag the thumb snappily snaps to several vertical notches across the track with organic spring-back bounce motions.`
};
