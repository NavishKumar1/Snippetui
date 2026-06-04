/**
 * Component: Luxury Gold Filigree Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'luxury-gold-slider',
  name: 'Luxury Gold Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="luxury-gold-slider-wrapper">
  <div class="gold-slider-track">
    <div class="gold-slider-fill" style="width: 50%;"></div>
  </div>
  <div class="gold-slider-sparks"></div>
  <div class="gold-slider-thumb" style="left: 50%;">
    <span class="gold-core"></span>
  </div>
</div>`,
  js: `// Interactive dynamic gold shimmers generated on drag
const gdWrapper = document.querySelector('.luxury-gold-slider-wrapper');
if (gdWrapper) {
  const thumb = gdWrapper.querySelector('.gold-slider-thumb');
  const fill = gdWrapper.querySelector('.gold-slider-fill');
  const sparksContainer = gdWrapper.querySelector('.gold-slider-sparks');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = gdWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Spawn gold sparks
    if (isDragging && sparksContainer) {
      const spark = document.createElement('span');
      spark.className = 'gold-spark-particle';
      
      const size = 2 + Math.random() * 3;
      const thumbX = (percentage / 100) * rect.width;
      
      spark.style.width = \`\${size}px\`;
      spark.style.height = \`\${size}px\`;
      spark.style.left = \`\${thumbX}px\`;
      spark.style.top = \`\${10 + (Math.random() - 0.5) * 8}px\`;
      spark.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 25}px\`);
      spark.style.setProperty('--dy', \`\${5 + Math.random() * 20}px\`);
      
      sparksContainer.appendChild(spark);
      setTimeout(() => spark.remove(), 900);
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
  
  gdWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
}`,
  ts: `// TypeScript Implementation
const gdWrapper = document.querySelector<HTMLDivElement>('.luxury-gold-slider-wrapper');
if (gdWrapper) {
  const thumb = gdWrapper.querySelector<HTMLDivElement>('.gold-slider-thumb');
  const fill = gdWrapper.querySelector<HTMLDivElement>('.gold-slider-fill');
  const sparksContainer = gdWrapper.querySelector<HTMLDivElement>('.gold-slider-sparks');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    const rect = gdWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    if (thumb && fill) {
      thumb.style.left = \`\${percentage}%\`;
      fill.style.width = \`\${percentage}%\`;
      
      if (isDragging && sparksContainer) {
        const spark = document.createElement('span');
        spark.className = 'gold-spark-particle';
        const size = 2 + Math.random() * 3;
        const thumbX = (percentage / 100) * rect.width;
        
        spark.style.width = \`\${size}px\`;
        spark.style.height = \`\${size}px\`;
        spark.style.left = \`\${thumbX}px\`;
        spark.style.top = \`\${10 + (Math.random() - 0.5) * 8}px\`;
        spark.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 25}px\`);
        spark.style.setProperty('--dy', \`\${5 + Math.random() * 20}px\`);
        
        sparksContainer.appendChild(spark);
        setTimeout(() => spark.remove(), 900);
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
  css: `/* Luxury Gold Slider Styles */
.luxury-gold-slider-wrapper {
  position: relative;
  width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.gold-slider-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 215, 0, 0.05);
  border-radius: 10px;
  position: relative;
  border: 1px solid rgba(255, 215, 0, 0.15);
}

.gold-slider-fill {
  height: 100%;
  background: linear-gradient(90deg, #b8860b, #ffd700);
  border-radius: 10px;
  width: 50%;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
}

.gold-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #ffd700, #b8860b);
  border-radius: 50%;
  z-index: 5;
  cursor: grab;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
  transition: transform 0.15s ease;
  border: 1px solid #ffffff;
}

.gold-slider-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: 
    0 0 25px rgba(255, 215, 0, 0.8),
    0 0 35px rgba(255, 255, 255, 0.4);
}

.gold-core {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
}

/* Gold sparks trailing canvas */
.gold-slider-sparks {
  position: absolute;
  inset: -15px 0;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
}

.gold-spark-particle {
  position: absolute;
  border-radius: 50%;
  background: #ffd700;
  box-shadow: 0 0 6px #ffd700, 0 0 12px #ffffff;
  animation: spark-sink-fade 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes spark-sink-fade {
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
  <div class="w-full h-1.5 bg-yellow-950/10 rounded-full border border-yellow-500/20 relative">
    <div class="absolute h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full w-1/2 shadow-[0_0_10px_rgba(255,215,0,0.4)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-yellow-300 to-amber-500 border border-white rounded-full cursor-grab shadow-[0_0_15px_rgba(255,215,0,0.6)]"></div>
</div>`,
  prompt: `Design a premium "Luxury Gold Slider" component. Encased in polished gold borders, dragging the thumb trails gorgeous metallic gold leaf particle shimmers.`
};
