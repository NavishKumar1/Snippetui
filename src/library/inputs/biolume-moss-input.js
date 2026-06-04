/**
 * Component: Bioluminescent Moss Pulse Input
 * Category: inputs
 */

export const component = {
  id: 'biolume-moss-input',
  name: 'Bioluminescent Moss Pulse Input',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="moss-input-group">
  <input type="text" class="moss-input-field" placeholder=" " id="moss-input-demo" autocomplete="off">
  <div class="moss-biolume-field"></div>
  <div class="moss-spore-container"></div>
  <label class="moss-input-label" for="moss-input-demo">BIOME INTEGRATION</label>
</div>`,
  js: `// Spawning bioluminescent floating spores on keydowns
const mossInput = document.querySelector('.moss-input-field');
if (mossInput) {
  const spores = mossInput.parentElement.querySelector('.moss-spore-container');
  
  mossInput.addEventListener('keydown', () => {
    if (!spores) return;
    
    // Spawn 2 light spores
    for (let i = 0; i < 2; i++) {
      const spore = document.createElement('span');
      spore.className = 'moss-spore-particle';
      
      const size = Math.random() * 5 + 3;
      const startX = Math.random() * 80 + 10;
      const startY = Math.random() * 30 + 50;
      
      spore.style.width = \`\${size}px\`;
      spore.style.height = \`\${size}px\`;
      spore.style.left = \`\${startX}%\`;
      spore.style.top = \`\${startY}%\`;
      
      // Floating offset
      const driftX = (Math.random() - 0.5) * 50;
      const driftY = -Math.random() * 30 - 30;
      spore.style.setProperty('--drift-x', \`\${driftX}px\`);
      spore.style.setProperty('--drift-y', \`\${driftY}px\`);
      
      spore.style.animation = 'spore-float-drift 1.4s ease-out forwards';
      
      spores.appendChild(spore);
      setTimeout(() => spore.remove(), 1400);
    }
  });
}`,
  ts: `// TypeScript Implementation
const mossInput = document.querySelector<HTMLInputElement>('.moss-input-field');
if (mossInput) {
  const parent = mossInput.parentElement;
  if (parent) {
    const spores = parent.querySelector<HTMLDivElement>('.moss-spore-container');
    
    mossInput.addEventListener('keydown', () => {
      if (!spores) return;
      
      for (let i = 0; i < 2; i++) {
        const spore = document.createElement('span');
        spore.className = 'moss-spore-particle';
        
        const size = Math.random() * 5 + 3;
        const startX = Math.random() * 80 + 10;
        const startY = Math.random() * 30 + 50;
        
        spore.style.width = \`\${size}px\`;
        spore.style.height = \`\${size}px\`;
        spore.style.left = \`\${startX}%\`;
        spore.style.top = \`\${startY}%\`;
        
        const driftX = (Math.random() - 0.5) * 50;
        const driftY = -Math.random() * 30 - 30;
        spore.style.setProperty('--drift-x', \`\${driftX}px\`);
        spore.style.setProperty('--drift-y', \`\${driftY}px\`);
        
        spore.style.animation = 'spore-float-drift 1.4s ease-out forwards';
        
        spores.appendChild(spore);
        setTimeout(() => spore.remove(), 1400);
      }
    });
  }
}`,
  css: `/* Bioluminescent Moss Pulse Input Styles */
.moss-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.moss-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #030a08;
  border: 1px solid rgba(0, 255, 127, 0.12);
  border-radius: 10px;
  color: #d1f7ec;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  z-index: 2;
  position: relative;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(0, 255, 127, 0.05);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.moss-biolume-field {
  position: absolute;
  inset: -1px;
  border-radius: 11px;
  background: transparent;
  z-index: 1;
  pointer-events: none;
  opacity: 0.5;
  transition: all 0.4s ease;
}

.moss-spore-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 10px;
  pointer-events: none;
  z-index: 3;
}

.moss-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 255, 127, 0.4);
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  pointer-events: none;
  z-index: 4;
  transition: all 0.3s ease;
  transform-origin: left top;
}

.moss-spore-particle {
  position: absolute;
  background: radial-gradient(circle, #e6fff2 10%, #00ffd0 60%, transparent 100%);
  border-radius: 50%;
  box-shadow: 0 0 6px #00ffd0, 0 0 12px rgba(0, 255, 208, 0.7);
  opacity: 0;
  pointer-events: none;
}

/* Interactions */
.moss-input-field:focus {
  border-color: rgba(0, 255, 208, 0.5);
  box-shadow: 
    0 8px 30px rgba(0, 255, 127, 0.15),
    0 0 15px rgba(0, 255, 208, 0.1),
    inset 0 1px 1px rgba(0, 255, 127, 0.1);
}

.moss-input-field:focus ~ .moss-biolume-field {
  background: linear-gradient(135deg, #00ff7f 0%, #00ffd0 50%, #00ffd0 100%);
  filter: drop-shadow(0 0 6px rgba(0, 255, 208, 0.4));
}

.moss-input-field:focus ~ .moss-input-label,
.moss-input-field:not(:placeholder-shown) ~ .moss-input-label {
  transform: translateY(-165%) scale(0.85);
  color: #00ffd0;
  text-shadow: 0 0 6px rgba(0, 255, 208, 0.4);
  background: #030a08;
  padding: 0 4px;
}

@keyframes spore-float-drift {
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }
  20% {
    opacity: 0.9;
    transform: translate(calc(var(--drift-x) * 0.25), calc(var(--drift-y) * 0.25)) scale(1.1);
  }
  100% {
    transform: translate(var(--drift-x), var(--drift-y)) scale(0.3);
    opacity: 0;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="moss-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-[#030a08] border border-emerald-500/20 rounded-xl text-emerald-100 outline-none focus:border-emerald-400 transition-all duration-300 relative z-10" />
  <label for="moss-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs font-bold tracking-widest text-emerald-500/40 pointer-events-none transition-all duration-300 peer-focus:-translate-y-[165%] peer-focus:scale-85 peer-focus:text-emerald-400 peer-focus:bg-[#030a08] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-translate-y-[165%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-emerald-400 peer-[:not(:placeholder-shown)]:bg-[#030a08] peer-[:not(:placeholder-shown)]:px-1 z-20">
    BIOME INTEGRATION
  </label>
</div>`,
  prompt: `Bioluminescent dark jungle theme casing. Focus spawns growing green-cyan moss node grids along outlines. Typing generates slow-drifting neon cyan glowing spores floating upward.`
};
