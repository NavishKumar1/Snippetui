/**
 * Component: Cosmic Nebula Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'cosmic-nebula-slider',
  name: 'Cosmic Nebula Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="cosmic-nebula-slider-wrapper">
  <div class="nebula-slider-track">
    <div class="nebula-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="nebula-slider-sparks"></div>
  <div class="nebula-slider-thumb" style="left: 50%;">
    <span class="nebula-spark-core"></span>
  </div>
</div>`,
  js: `// Interactive dynamic nebula star sparkles generated on drag
const nWrapper = document.querySelector('.cosmic-nebula-slider-wrapper');
if (nWrapper) {
  const thumb = nWrapper.querySelector('.nebula-slider-thumb');
  const fill = nWrapper.querySelector('.nebula-slider-fill');
  const sparksContainer = nWrapper.querySelector('.nebula-slider-sparks');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = nWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Spawn a spark during movement
    if (isDragging && sparksContainer) {
      const spark = document.createElement('span');
      spark.className = 'nebula-spark-particle';
      
      const size = 3 + Math.random() * 4;
      // Get thumb pixel coordinate
      const thumbX = (percentage / 100) * rect.width;
      
      spark.style.width = \`\${size}px\`;
      spark.style.height = \`\${size}px\`;
      spark.style.left = \`\${thumbX}px\`;
      spark.style.top = \`\${10 + (Math.random() - 0.5) * 12}px\`;
      spark.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 20}px\`);
      spark.style.setProperty('--dy', \`\${5 + Math.random() * 20}px\`);
      
      sparksContainer.appendChild(spark);
      setTimeout(() => spark.remove(), 800);
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
  
  nWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const nWrapper = document.querySelector<HTMLDivElement>('.cosmic-nebula-slider-wrapper');
if (nWrapper) {
  const thumb = nWrapper.querySelector<HTMLDivElement>('.nebula-slider-thumb');
  const fill = nWrapper.querySelector<HTMLDivElement>('.nebula-slider-fill');
  const sparksContainer = nWrapper.querySelector<HTMLDivElement>('.nebula-slider-sparks');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = nWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (isDragging && sparksContainer) {
        const spark = document.createElement('span');
        spark.className = 'nebula-spark-particle';
        const size = 3 + Math.random() * 4;
        const thumbX = (percentage / 100) * rect.width;
        
        spark.style.width = \`\${size}px\`;
        spark.style.height = \`\${size}px\`;
        spark.style.left = \`\${thumbX}px\`;
        spark.style.top = \`\${10 + (Math.random() - 0.5) * 12}px\`;
        spark.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 20}px\`);
        spark.style.setProperty('--dy', \`\${5 + Math.random() * 20}px\`);
        
        sparksContainer.appendChild(spark);
        setTimeout(() => spark.remove(), 800);
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
  css: `/* Cosmic Nebula Slider Styles */
.cosmic-nebula-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.nebula-slider-track {
  width: 100%;
  height: 6px;
  background: rgba(138, 43, 226, 0.08);
  border-radius: 10px;
  position: relative;
}

.nebula-slider-fill {
  height: 100%;
  background: linear-gradient(90deg, #8a2be2, #00f2fe);
  border-radius: 10px;
  width: 50%;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
}

.nebula-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  background: radial-gradient(circle at center, #ffffff, #00f2fe);
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.6);
  transition: transform 0.15s ease;
}

.nebula-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.25);
  box-shadow: 
    0 0 25px rgba(0, 242, 254, 0.8),
    0 0 35px rgba(138, 43, 226, 0.8);
}

.nebula-spark-core {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
}

/* Stellar sparks trailing canvas */
.nebula-slider-sparks {
  position: absolute;
  inset: -10px 0;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
}

.nebula-spark-particle {
  position: absolute;
  border-radius: 50%;
  background: #00f2fe;
  box-shadow: 0 0 8px #00f2fe, 0 0 15px #8a2be2;
  animation: spark-fall-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes spark-fall-fade {
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
  <div class="w-full h-1.5 bg-violet-950/10 rounded-full relative">
    <div class="absolute h-full bg-gradient-to-r from-violet-600 to-cyan-400 rounded-full w-1/2 shadow-[0_0_10px_rgba(0,242,254,0.4)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-gradient-to-br from-white to-cyan-400 rounded-full cursor-grab shadow-[0_0_15px_rgba(0,242,254,0.6)]"></div>
</div>`,
  prompt: `Design a premium "Cosmic Nebula Slider" component. Encased in outer space indigo, dragging the thumb trails gorgeous colored stardust sparks and gas clouds behind it.`
};
