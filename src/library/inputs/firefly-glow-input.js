/**
 * Component: Firefly Jar Glow Input
 * Category: inputs
 */

export const component = {
  id: 'firefly-glow-input',
  name: 'Firefly Jar Glow Input',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="firefly-input-group">
  <input type="text" class="firefly-input-field" placeholder=" " id="firefly-input-demo" autocomplete="off">
  <div class="firefly-glow-container"></div>
  <label class="firefly-input-label" for="firefly-input-demo">CAPTURE ENERGY</label>
</div>`,
  js: `// Dynamic spawning of glowing golden fireflies on keypresses
const fireflyInput = document.querySelector('.firefly-input-field');
if (fireflyInput) {
  const container = fireflyInput.parentElement.querySelector('.firefly-glow-container');
  
  fireflyInput.addEventListener('keydown', () => {
    if (!container) return;
    
    // Spawn 2 fireflies per keystroke
    for (let i = 0; i < 2; i++) {
      const fly = document.createElement('span');
      fly.className = 'firefly-spark';
      
      const size = Math.random() * 4 + 3;
      const startX = Math.random() * 80 + 10;
      const startY = Math.random() * 40 + 40;
      
      fly.style.width = \`\${size}px\`;
      fly.style.height = \`\${size}px\`;
      fly.style.left = \`\${startX}%\`;
      fly.style.top = \`\${startY}%\`;
      
      // Random drift animation offsets
      const driftX = (Math.random() - 0.5) * 60;
      const driftY = -Math.random() * 40 - 20;
      fly.style.setProperty('--drift-x', \`\${driftX}px\`);
      fly.style.setProperty('--drift-y', \`\${driftY}px\`);
      
      fly.style.animation = 'firefly-drift-rise 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';
      
      container.appendChild(fly);
      setTimeout(() => fly.remove(), 1200);
    }
  });
}`,
  ts: `// TypeScript Implementation
const fireflyInput = document.querySelector<HTMLInputElement>('.firefly-input-field');
if (fireflyInput) {
  const parent = fireflyInput.parentElement;
  if (parent) {
    const container = parent.querySelector<HTMLDivElement>('.firefly-glow-container');
    
    fireflyInput.addEventListener('keydown', () => {
      if (!container) return;
      
      for (let i = 0; i < 2; i++) {
        const fly = document.createElement('span');
        fly.className = 'firefly-spark';
        
        const size = Math.random() * 4 + 3;
        const startX = Math.random() * 80 + 10;
        const startY = Math.random() * 40 + 40;
        
        fly.style.width = \`\${size}px\`;
        fly.style.height = \`\${size}px\`;
        fly.style.left = \`\${startX}%\`;
        fly.style.top = \`\${startY}%\`;
        
        const driftX = (Math.random() - 0.5) * 60;
        const driftY = -Math.random() * 40 - 20;
        fly.style.setProperty('--drift-x', \`\${driftX}px\`);
        fly.style.setProperty('--drift-y', \`\${driftY}px\`);
        
        fly.style.animation = 'firefly-drift-rise 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';
        
        container.appendChild(fly);
        setTimeout(() => fly.remove(), 1200);
      }
    });
  }
}`,
  css: `/* Firefly Jar Glow Input Styles */
.firefly-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.firefly-input-field {
  width: 100%;
  padding: 16px 18px;
  background: rgba(18, 16, 10, 0.7);
  border: 1px solid rgba(253, 184, 19, 0.15);
  border-radius: 12px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  z-index: 2;
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.firefly-glow-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 12px;
  pointer-events: none;
  z-index: 3;
}

.firefly-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(253, 184, 19, 0.6);
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  pointer-events: none;
  z-index: 4;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

.firefly-spark {
  position: absolute;
  background: radial-gradient(circle, #ffe699 10%, #fdb813 60%, transparent 100%);
  border-radius: 50%;
  box-shadow: 0 0 8px #fdb813, 0 0 16px rgba(253, 184, 19, 0.8);
  opacity: 0;
  pointer-events: none;
}

/* Interactions */
.firefly-input-field:focus {
  border-color: rgba(253, 184, 19, 0.6);
  background: rgba(25, 21, 12, 0.85);
  box-shadow: 
    0 8px 30px rgba(253, 184, 19, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.firefly-input-field:focus ~ .firefly-input-label,
.firefly-input-field:not(:placeholder-shown) ~ .firefly-input-label {
  transform: translateY(-165%) scale(0.85);
  color: #fdb813;
  text-shadow: 0 0 8px rgba(253, 184, 19, 0.4);
  padding: 0 4px;
}

@keyframes firefly-drift-rise {
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }
  20% {
    opacity: 0.95;
    transform: translate(calc(var(--drift-x) * 0.2), calc(var(--drift-y) * 0.2)) scale(1.1);
  }
  100% {
    transform: translate(var(--drift-x), var(--drift-y)) scale(0.2);
    opacity: 0;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="firefly-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-yellow-950/20 border border-yellow-500/20 rounded-xl text-white outline-none focus:border-yellow-500/60 focus:bg-yellow-950/30 transition-all duration-300 relative z-10 backdrop-blur-md" />
  <label for="firefly-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs font-bold tracking-widest text-yellow-500/60 pointer-events-none transition-all duration-300 peer-focus:-translate-y-[165%] peer-focus:scale-85 peer-focus:text-yellow-500 peer-[:not(:placeholder-shown)]:-translate-y-[165%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-yellow-500 z-20">
    CAPTURE ENERGY
  </label>
</div>`,
  prompt: `Frosted obsidian amber input glass jar. Focused state pulses amber light. Keystrokes generate pairs of luminous golden fireflies that drift upwards inside and fade away with warm glows.`
};
