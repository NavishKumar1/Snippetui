/**
 * Component: Molten Thermite Weld Button
 * Category: buttons
 */

export const component = {
  id: 'thermite-weld-btn',
  name: 'Molten Thermite Weld',
  category: 'buttons',
  tag: 'Visual',
  html: `<button class="thermite-weld-btn">
  <div class="thermite-spark-waterfall"></div>
  <span class="thermite-text">FUSE CONNECTION</span>
</button>`,
  js: `// Interactive Thermite Weld cascading sparks on hover
const weldBtn = document.querySelector('.thermite-weld-btn');
if (weldBtn) {
  const waterfall = weldBtn.querySelector('.thermite-spark-waterfall');
  let sparksInterval = null;
  
  weldBtn.addEventListener('mouseenter', () => {
    sparksInterval = setInterval(() => {
      // Spawn cascading sparks
      const spark = document.createElement('span');
      spark.className = 'weld-spark';
      
      const size = 3 + Math.random() * 4;
      const startX = Math.random() * 100;
      const fallY = 40 + Math.random() * 50;
      const driftX = (Math.random() - 0.5) * 15;
      
      spark.style.width = \`\${size}px\`;
      spark.style.height = \`\${size}px\`;
      spark.style.left = \`\${startX}%\`;
      
      spark.style.setProperty('--dx', \`\${driftX}px\`);
      spark.style.setProperty('--dy', \`\${fallY}px\`);
      
      waterfall.appendChild(spark);
      
      setTimeout(() => {
        spark.remove();
      }, 1000);
    }, 120);
  });

  weldBtn.addEventListener('mouseleave', () => {
    clearInterval(sparksInterval);
  });
}`,
  ts: `// TypeScript Implementation
const weldBtn = document.querySelector<HTMLButtonElement>('.thermite-weld-btn');
if (weldBtn) {
  const waterfall = weldBtn.querySelector<HTMLDivElement>('.thermite-spark-waterfall');
  if (waterfall) {
    let sparksInterval: number | null = null;
    
    weldBtn.addEventListener('mouseenter', () => {
      sparksInterval = window.setInterval(() => {
        const spark = document.createElement('span');
        spark.className = 'weld-spark';
        
        const size = 3 + Math.random() * 4;
        const startX = Math.random() * 100;
        const fallY = 40 + Math.random() * 50;
        const driftX = (Math.random() - 0.5) * 15;
        
        spark.style.width = \`\${size}px\`;
        spark.style.height = \`\${size}px\`;
        spark.style.left = \`\${startX}%\`;
        
        spark.style.setProperty('--dx', \`\${driftX}px\`);
        spark.style.setProperty('--dy', \`\${fallY}px\`);
        
        waterfall.appendChild(spark);
        
        setTimeout(() => {
          spark.remove();
        }, 1000);
      }, 120);
    });

    weldBtn.addEventListener('mouseleave', () => {
      if (sparksInterval) clearInterval(sparksInterval);
    });
  }
}`,
  css: `/* Molten Thermite Weld Button Styles */
.thermite-weld-btn {
  position: relative;
  background: #110c08;
  border: 1px solid #ff5500;
  padding: 16px 36px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    0 0 10px rgba(255, 85, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.thermite-spark-waterfall {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* Cascading golden welding spark */
.weld-spark {
  position: absolute;
  top: -5px;
  border-radius: 50%;
  background: #ffcc00;
  box-shadow: 
    0 0 6px #ff8800,
    0 0 12px #ffcc00;
  pointer-events: none;
  z-index: 2;
  animation: spark-cascade-down 1s cubic-bezier(0.2, 0.6, 0.4, 1) forwards;
}

.thermite-text {
  position: relative;
  z-index: 3;
  color: #ffaa00;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-shadow: 0 0 8px rgba(255, 170, 0, 0.4);
  transition: all 0.3s ease;
}

/* Hover thermal heat bloom */
.thermite-weld-btn:hover {
  border-color: #ffcc00;
  box-shadow: 
    0 8px 25px rgba(255, 85, 0, 0.35),
    0 0 20px rgba(255, 204, 0, 0.2),
    inset 0 0 15px rgba(255, 85, 0, 0.2);
  background: #19120b;
  transform: translateY(-2px);
}

.thermite-weld-btn:hover .thermite-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #ff5500,
    0 0 25px #ffcc00;
}

.thermite-weld-btn:active {
  transform: translateY(1px);
}

@keyframes spark-cascade-down {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.9;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(0);
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#110c08] border border-[#ff5500] px-9 py-4 rounded cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:border-[#ffcc00] hover:shadow-[0_8px_25px_rgba(255,85,0,0.35)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#ffaa00] font-bold text-xs tracking-[0.18em] [text-shadow:0_0_8px_rgba(255,170,0,0.4)]">FUSE CONNECTION</span>
</button>`,
  prompt: `Design a premium "Molten Thermite Weld Button" component. Solid raw steel casing glows with warm thermite embers. Hovering cascades high-velocity spark showers downwards while heating the text into a bright, white-hot molten weld.`
};
