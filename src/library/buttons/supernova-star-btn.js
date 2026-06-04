/**
 * Component: Supernova Shockwave Star Button
 * Category: buttons
 */

export const component = {
  id: 'supernova-star-btn',
  name: 'Supernova Shockwave Star',
  category: 'buttons',
  tag: 'Interactive',
  html: `<div class="supernova-btn-container">
  <button class="supernova-star-btn">
    <span class="supernova-text">IGNITE STAR</span>
    <span class="supernova-shockwave"></span>
  </button>
</div>`,
  js: `// Interactive Supernova Click implosion & shockwave star burst
const supernovaBtn = document.querySelector('.supernova-star-btn');
if (supernovaBtn) {
  const shockwave = supernovaBtn.querySelector('.supernova-shockwave');
  
  supernovaBtn.addEventListener('click', () => {
    // 1. Trigger circular chromatic shockwave ring expansion
    if (shockwave) {
      shockwave.style.animation = 'none';
      shockwave.offsetHeight; // trigger reflow
      shockwave.style.animation = 'supernova-blast-expand 0.7s cubic-bezier(0.1, 0.8, 0.2, 1)';
    }
    
    // 2. Spawn 12 flying hyper-velocity stardust sparks
    for (let i = 0; i < 12; i++) {
      const spark = document.createElement('span');
      spark.className = 'supernova-spark';
      
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 60 + Math.random() * 80;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;
      
      spark.style.setProperty('--sdx', \`\${dx}px\`);
      spark.style.setProperty('--sdy', \`\${dy}px\`);
      
      // Center the sparks on click location inside button
      spark.style.left = '50%';
      spark.style.top = '50%';
      
      const sparkColors = ['#ff00ff', '#00ffff', '#ffff00', '#ffffff'];
      const randColor = sparkColors[Math.floor(Math.random() * sparkColors.length)];
      spark.style.background = randColor;
      spark.style.boxShadow = \`0 0 10px \${randColor}\`;
      
      supernovaBtn.appendChild(spark);
      
      setTimeout(() => {
        spark.remove();
      }, 700);
    }
  });
}`,
  ts: `// TypeScript Implementation
const supernovaBtn = document.querySelector<HTMLButtonElement>('.supernova-star-btn');
if (supernovaBtn) {
  const shockwave = supernovaBtn.querySelector<HTMLSpanElement>('.supernova-shockwave');
  
  supernovaBtn.addEventListener('click', () => {
    if (shockwave) {
      shockwave.style.animation = 'none';
      shockwave.offsetHeight; // trigger reflow
      shockwave.style.animation = 'supernova-blast-expand 0.7s cubic-bezier(0.1, 0.8, 0.2, 1)';
    }
    
    for (let i = 0; i < 12; i++) {
      const spark = document.createElement('span');
      spark.className = 'supernova-spark';
      
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 60 + Math.random() * 80;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;
      
      spark.style.setProperty('--sdx', \`\${dx}px\`);
      spark.style.setProperty('--sdy', \`\${dy}px\`);
      
      spark.style.left = '50%';
      spark.style.top = '50%';
      
      const sparkColors = ['#ff00ff', '#00ffff', '#ffff00', '#ffffff'];
      const randColor = sparkColors[Math.floor(Math.random() * sparkColors.length)];
      spark.style.background = randColor;
      spark.style.boxShadow = \`0 0 10px \${randColor}\`;
      
      supernovaBtn.appendChild(spark);
      
      setTimeout(() => {
        spark.remove();
      }, 700);
    }
  });
}`,
  css: `/* Supernova Shockwave Star Button Styles */
.supernova-btn-container {
  position: relative;
  display: inline-block;
}

.supernova-star-btn {
  position: relative;
  background: #050209;
  border: 1px solid rgba(255, 0, 255, 0.25);
  padding: 16px 36px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  overflow: visible; /* Let shockwave run free */
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(255, 0, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.supernova-text {
  position: relative;
  z-index: 3;
  color: #ff00ff;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-shadow: 
    0 0 8px rgba(255, 0, 255, 0.4),
    0 0 15px rgba(0, 242, 254, 0.2);
  transition: all 0.3s ease;
}

/* Expanding cosmic ring */
.supernova-shockwave {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 2px solid #00ffff;
  border-radius: 4px;
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

/* High-velocity stardust sparks */
.supernova-spark {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: none;
  z-index: 10;
  animation: supernova-spark-flight 0.7s cubic-bezier(0.1, 0.8, 0.25, 1) forwards;
}

/* Hover active loops */
.supernova-star-btn:hover {
  border-color: #00ffff;
  box-shadow: 
    0 8px 25px rgba(0, 242, 254, 0.3),
    0 0 15px rgba(255, 0, 255, 0.2),
    inset 0 0 10px rgba(0, 242, 254, 0.15);
  transform: translateY(-2px);
}

.supernova-star-btn:hover .supernova-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00ffff,
    0 0 25px #ff00ff;
}

.supernova-star-btn:active {
  transform: translateY(1px) scale(0.95);
  transition: transform 0.1s ease;
}

@keyframes supernova-blast-expand {
  0% {
    transform: translate(-50%, -50%) scale(0.95);
    border-color: #00ffff;
    box-shadow: 0 0 10px #00ffff;
    opacity: 1;
  }
  50% {
    border-color: #ff00ff;
    box-shadow: 0 0 25px #ff00ff, 0 0 50px rgba(255, 0, 255, 0.5);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.6);
    border-color: transparent;
    opacity: 0;
  }
}

@keyframes supernova-spark-flight {
  0% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--sdx)), calc(-50% + var(--sdy))) scale(0);
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-block">
  <button class="relative bg-[#050209] border border-fuchsia-500/25 px-9 py-4 rounded cursor-pointer overflow-visible shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_8px_25px_rgba(0,242,254,0.3)] hover:-translate-y-0.5 active:translate-y-0.25 active:scale-95 transition-all duration-300">
    <span class="relative z-10 text-fuchsia-500 font-bold text-xs tracking-[0.2em] [text-shadow:0_0_8px_rgba(255,0,255,0.4)]">IGNITE STAR</span>
  </button>
</div>`,
  prompt: `Design a premium "Supernova Shockwave Star Button" component. Set in a black cosmic casing, hovering lights text in cyan/magenta neon. When clicked, a high-velocity spark shower bursts outward from the button core accompanied by an expanding, glowing shockwave boundary.`
};
