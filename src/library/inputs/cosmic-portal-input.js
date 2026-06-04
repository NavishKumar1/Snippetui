/**
 * Component: Cosmic Nebulous Portal Input
 * Category: inputs
 */

export const component = {
  id: 'cosmic-portal-input',
  name: 'Cosmic Nebulous Portal Input',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="cosmic-input-group">
  <input type="text" class="cosmic-input-field" placeholder=" " id="cosmic-input-demo" autocomplete="off">
  <div class="cosmic-nebula-bg"></div>
  <div class="cosmic-stars-emitter"></div>
  <label class="cosmic-input-label" for="cosmic-input-demo">ENTER SPACEWAY</label>
</div>`,
  js: `// Dynamic spawning of exploding supernova stars on keypresses
const cosmicInput = document.querySelector('.cosmic-input-field');
if (cosmicInput) {
  const emitter = cosmicInput.parentElement.querySelector('.cosmic-stars-emitter');
  
  cosmicInput.addEventListener('keydown', () => {
    if (!emitter) return;
    
    // Create 3 orbiting cosmic sparks
    for (let i = 0; i < 3; i++) {
      const spark = document.createElement('span');
      spark.className = 'cosmic-star-spark';
      
      const size = Math.random() * 5 + 4;
      const startX = Math.random() * 80 + 10;
      const startY = Math.random() * 40 + 30;
      
      spark.style.width = \`\${size}px\`;
      spark.style.height = \`\${size}px\`;
      spark.style.left = \`\${startX}%\`;
      spark.style.top = \`\${startY}%\`;
      
      // Multi-directional velocity
      const driftX = (Math.random() - 0.5) * 80;
      const driftY = (Math.random() - 0.5) * 50;
      spark.style.setProperty('--drift-x', \`\${driftX}px\`);
      spark.style.setProperty('--drift-y', \`\${driftY}px\`);
      
      spark.style.animation = 'supernova-burst 1s cubic-bezier(0.1, 0.8, 0.2, 1) forwards';
      
      emitter.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    }
  });
}`,
  ts: `// TypeScript Implementation
const cosmicInput = document.querySelector<HTMLInputElement>('.cosmic-input-field');
if (cosmicInput) {
  const parent = cosmicInput.parentElement;
  if (parent) {
    const emitter = parent.querySelector<HTMLDivElement>('.cosmic-stars-emitter');
    
    cosmicInput.addEventListener('keydown', () => {
      if (!emitter) return;
      
      for (let i = 0; i < 3; i++) {
        const spark = document.createElement('span');
        spark.className = 'cosmic-star-spark';
        
        const size = Math.random() * 5 + 4;
        const startX = Math.random() * 80 + 10;
        const startY = Math.random() * 40 + 30;
        
        spark.style.width = \`\${size}px\`;
        spark.style.height = \`\${size}px\`;
        spark.style.left = \`\${startX}%\`;
        spark.style.top = \`\${startY}%\`;
        
        const driftX = (Math.random() - 0.5) * 80;
        const driftY = (Math.random() - 0.5) * 50;
        spark.style.setProperty('--drift-x', \`\${driftX}px\`);
        spark.style.setProperty('--drift-y', \`\${driftY}px\`);
        
        spark.style.animation = 'supernova-burst 1s cubic-bezier(0.1, 0.8, 0.2, 1) forwards';
        
        emitter.appendChild(spark);
        setTimeout(() => spark.remove(), 1000);
      }
    });
  }
}`,
  css: `/* Cosmic Nebulous Portal Input Styles */
.cosmic-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.cosmic-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #020208;
  border: 1px solid rgba(138, 43, 226, 0.2);
  border-radius: 14px;
  color: #f1eeff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  z-index: 2;
  position: relative;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.cosmic-nebula-bg {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: radial-gradient(circle at 50% 120%, rgba(138, 43, 226, 0.2) 0%, rgba(0, 242, 254, 0.05) 50%, transparent 100%);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.cosmic-stars-emitter {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 14px;
  pointer-events: none;
  z-index: 3;
}

.cosmic-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(162, 140, 255, 0.5);
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  pointer-events: none;
  z-index: 4;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

.cosmic-star-spark {
  position: absolute;
  background: radial-gradient(circle, #ffffff 20%, #a28cff 60%, transparent 100%);
  border-radius: 50%;
  box-shadow: 0 0 6px #00f2fe, 0 0 12px #8a2be2;
  opacity: 0;
  pointer-events: none;
}

/* Interactions */
.cosmic-input-field:focus {
  border-color: rgba(138, 43, 226, 0.6);
  box-shadow: 
    0 8px 25px rgba(138, 43, 226, 0.25),
    0 0 15px rgba(0, 242, 254, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.08);
}

.cosmic-input-field:focus ~ .cosmic-nebula-bg {
  opacity: 1;
  animation: nebula-shifting-aurora 6s ease-in-out infinite alternate;
}

.cosmic-input-field:focus ~ .cosmic-input-label,
.cosmic-input-field:not(:placeholder-shown) ~ .cosmic-input-label {
  transform: translateY(-165%) scale(0.85);
  color: #a28cff;
  text-shadow: 0 0 8px rgba(162, 140, 255, 0.4);
  background: #020208;
  padding: 0 5px;
}

@keyframes nebula-shifting-aurora {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

@keyframes supernova-burst {
  0% {
    transform: translate(0, 0) scale(0) rotate(0deg);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--drift-x), var(--drift-y)) scale(1.2) rotate(180deg);
    opacity: 0;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="cosmic-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-[#020208] border border-violet-500/20 rounded-2xl text-purple-100 outline-none focus:border-violet-500/60 transition-all duration-300 relative z-10" />
  <label for="cosmic-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs font-bold tracking-widest text-violet-400/50 pointer-events-none transition-all duration-300 peer-focus:-translate-y-[165%] peer-focus:scale-85 peer-focus:text-violet-400 peer-focus:bg-[#020208] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-translate-y-[165%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-violet-400 peer-[:not(:placeholder-shown)]:bg-[#020208] peer-[:not(:placeholder-shown)]:px-1 z-20">
    ENTER SPACEWAY
  </label>
</div>`,
  prompt: `Deep celestial portal container. Focusing starts a morphing violet-blue cosmic nebulae in backplane. Typing spawns small glowing bright blue-purple supernova stars that blast outward and fade.`
};
