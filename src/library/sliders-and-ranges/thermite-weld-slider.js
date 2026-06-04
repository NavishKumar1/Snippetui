/**
 * Component: Thermite Weld Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'thermite-weld-slider',
  name: 'Thermite Weld Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="thermite-slider-wrapper">
  <div class="thermite-slider-track">
    <div class="thermite-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="thermite-slider-sparks"></div>
  <div class="thermite-slider-thumb" style="left: 50%;">
    <span class="thermite-core"></span>
  </div>
</div>`,
  js: `// Interactive dynamic welding flares generated on drag
const tWrapper = document.querySelector('.thermite-slider-wrapper');
if (tWrapper) {
  const thumb = tWrapper.querySelector('.thermite-slider-thumb');
  const fill = tWrapper.querySelector('.thermite-slider-fill');
  const sparksContainer = tWrapper.querySelector('.thermite-slider-sparks');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = tWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Spawn blinding white sparks
    if (isDragging && sparksContainer) {
      for (let i = 0; i < 2; i++) {
        const spark = document.createElement('span');
        spark.className = 'thermite-spark-particle';
        
        const size = 1.5 + Math.random() * 3.5;
        const thumbX = (percentage / 100) * rect.width;
        
        spark.style.width = \`\${size}px\`;
        spark.style.height = \`\${size}px\`;
        spark.style.left = \`\${thumbX}px\`;
        spark.style.top = \`\${10 + (Math.random() - 0.5) * 8}px\`;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 25 + Math.random() * 45;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed - 15; // upward tendency
        
        spark.style.setProperty('--dx', \`\${dx}px\`);
        spark.style.setProperty('--dy', \`\${dy}px\`);
        
        const colors = ['#ffffff', '#ffd700', '#ff4500'];
        spark.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        sparksContainer.appendChild(spark);
        setTimeout(() => spark.remove(), 800);
      }
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
  
  tWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const tWrapper = document.querySelector<HTMLDivElement>('.thermite-slider-wrapper');
if (tWrapper) {
  const thumb = tWrapper.querySelector<HTMLDivElement>('.thermite-slider-thumb');
  const fill = tWrapper.querySelector<HTMLDivElement>('.thermite-slider-fill');
  const sparksContainer = tWrapper.querySelector<HTMLDivElement>('.thermite-slider-sparks');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = tWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (isDragging && sparksContainer) {
        for (let i = 0; i < 2; i++) {
          const spark = document.createElement('span');
          spark.className = 'thermite-spark-particle';
          const size = 1.5 + Math.random() * 3.5;
          const thumbX = (percentage / 100) * rect.width;
          
          spark.style.width = \`\${size}px\`;
          spark.style.height = \`\${size}px\`;
          spark.style.left = \`\${thumbX}px\`;
          spark.style.top = \`\${10 + (Math.random() - 0.5) * 8}px\`;
          
          const angle = Math.random() * Math.PI * 2;
          const speed = 25 + Math.random() * 45;
          const dx = Math.cos(angle) * speed;
          const dy = Math.sin(angle) * speed - 15;
          
          spark.style.setProperty('--dx', \`\${dx}px\`);
          spark.style.setProperty('--dy', \`\${dy}px\`);
          
          const colors = ['#ffffff', '#ffd700', '#ff4500'];
          spark.style.background = colors[Math.floor(Math.random() * colors.length)];
          
          sparksContainer.appendChild(spark);
          setTimeout(() => spark.remove(), 800);
        }
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
  css: `/* Thermite Weld Slider Styles */
.thermite-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.thermite-slider-track {
  width: 100%;
  height: 8px;
  background: #111116;
  border-radius: 4px;
  position: relative;
  border: 1.5px solid #22222b;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
}

.thermite-slider-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff4500, #ffffff);
  border-radius: 4px;
  width: 50%;
  box-shadow: 0 0 15px rgba(255, 69, 0, 0.6);
}

.thermite-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, #444, #111);
  border: 2px solid #ff4500;
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 12px rgba(255, 69, 0, 0.6);
  transition: transform 0.15s ease;
}

.thermite-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  border-color: #ffffff;
  box-shadow: 0 0 25px #ffffff, 0 0 35px #ff4500;
}

.thermite-core {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 8px #ffffff;
}

/* Welding flares */
.thermite-slider-sparks {
  position: absolute;
  inset: -30px 0;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
}

.thermite-spark-particle {
  position: absolute;
  border-radius: 50%;
  animation: spark-fly-burst 0.8s cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
}

@keyframes spark-fly-burst {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(0);
    opacity: 0;
    filter: blur(1px);
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-6 flex items-center select-none cursor-pointer">
  <div class="w-full h-2 bg-[#111116] border border-[#22222b] rounded relative overflow-hidden">
    <div class="absolute h-full bg-gradient-to-r from-red-500 to-white rounded w-1/2 shadow-[0_0_15px_rgba(255,69,0,0.6)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-black border-2 border-red-500 rounded-full cursor-grab shadow-[0_0_12px_rgba(255,69,0,0.6)]"></div>
</div>`,
  prompt: `Design a premium "Thermite Weld Slider" component. Encased in a rough iron track, dragging the thumb triggers blinding white-hot metal spark flares shooting outward.`
};
