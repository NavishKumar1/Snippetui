/**
 * Component: Volcanic Lava Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'volcanic-lava-slider',
  name: 'Volcanic Lava Slider',
  category: 'sliders-and-ranges',
  tag: 'Premium',
  html: `<div class="volcanic-lava-slider-wrapper">
  <div class="lava-slider-track">
    <div class="lava-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="lava-slider-sparks"></div>
  <div class="lava-slider-thumb" style="left: 50%;">
    <span class="lava-core"></span>
  </div>
</div>`,
  js: `// Interactive dynamic volcanic lava sparks generated on drag
const lWrapper = document.querySelector('.volcanic-lava-slider-wrapper');
if (lWrapper) {
  const thumb = lWrapper.querySelector('.lava-slider-thumb');
  const fill = lWrapper.querySelector('.lava-slider-fill');
  const sparksContainer = lWrapper.querySelector('.lava-slider-sparks');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = lWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Spawn lava sparks
    if (isDragging && sparksContainer) {
      const spark = document.createElement('span');
      spark.className = 'lava-spark-particle';
      
      const size = 2 + Math.random() * 4;
      const thumbX = (percentage / 100) * rect.width;
      
      spark.style.width = \`\${size}px\`;
      spark.style.height = \`\${size}px\`;
      spark.style.left = \`\${thumbX}px\`;
      spark.style.top = \`\${10 + (Math.random() - 0.5) * 8}px\`;
      spark.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 35}px\`);
      spark.style.setProperty('--dy', \`\${-10 - Math.random() * 25}px\`);
      
      sparksContainer.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
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
    }
  });
  
  lWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const lWrapper = document.querySelector<HTMLDivElement>('.volcanic-lava-slider-wrapper');
if (lWrapper) {
  const thumb = lWrapper.querySelector<HTMLDivElement>('.lava-slider-thumb');
  const fill = lWrapper.querySelector<HTMLDivElement>('.lava-slider-fill');
  const sparksContainer = lWrapper.querySelector<HTMLDivElement>('.lava-slider-sparks');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = lWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (isDragging && sparksContainer) {
        const spark = document.createElement('span');
        spark.className = 'lava-spark-particle';
        const size = 2 + Math.random() * 4;
        const thumbX = (percentage / 100) * rect.width;
        
        spark.style.width = \`\${size}px\`;
        spark.style.height = \`\${size}px\`;
        spark.style.left = \`\${thumbX}px\`;
        spark.style.top = \`\${10 + (Math.random() - 0.5) * 8}px\`;
        spark.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 35}px\`);
        spark.style.setProperty('--dy', \`\${-10 - Math.random() * 25}px\`);
        
        sparksContainer.appendChild(spark);
        setTimeout(() => spark.remove(), 700);
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
    }
  });
}`,
  css: `/* Volcanic Lava Slider Styles */
.volcanic-lava-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.lava-slider-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 69, 0, 0.08);
  border-radius: 10px;
  position: relative;
}

.lava-slider-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff4500, #ffd700);
  border-radius: 10px;
  width: 50%;
  box-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
}

.lava-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  background: #ff4500;
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 15px #ff4500;
  transition: transform 0.15s ease;
}

.lava-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.25);
  background: #ffd700;
  box-shadow: 0 0 25px #ffd700;
}

.lava-core {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
}

/* Molten lava sparks */
.lava-slider-sparks {
  position: absolute;
  inset: -20px 0;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
}

.lava-spark-particle {
  position: absolute;
  border-radius: 50%;
  background: #ffd700;
  box-shadow: 0 0 8px #ff4500, 0 0 15px #ffd700;
  animation: spark-fly-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes spark-fly-up {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(0);
    opacity: 0;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-1.5 bg-red-950/10 rounded-full relative">
    <div class="absolute h-full bg-gradient-to-r from-red-500 to-amber-400 rounded-full w-1/2 shadow-[0_0_10px_rgba(255,69,0,0.5)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-red-500 rounded-full cursor-grab shadow-[0_0_15px_#ff4500]"></div>
</div>`,
  prompt: `Design a premium "Volcanic Lava Slider" component. On click and drag, the thumb shoots glowing hot orange/gold magma spark particles upward that disperse organically.`
};
