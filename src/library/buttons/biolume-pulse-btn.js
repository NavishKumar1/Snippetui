/**
 * Component: Bioluminescent Moss Pulse Button
 * Category: buttons
 */

export const component = {
  id: 'biolume-pulse-btn',
  name: 'Bioluminescent Moss Pulse',
  category: 'buttons',
  tag: 'Visual',
  html: `<button class="biolume-pulse-btn">
  <div class="biolume-spores"></div>
  <span class="biolume-text">HARVEST ENERGY</span>
</button>`,
  js: `// Interactive bioluminescent spores release on hover
const biolumeBtn = document.querySelector('.biolume-pulse-btn');
if (biolumeBtn) {
  const sporesContainer = biolumeBtn.querySelector('.biolume-spores');
  let sporesInterval = null;
  
  biolumeBtn.addEventListener('mouseenter', () => {
    sporesInterval = setInterval(() => {
      const spore = document.createElement('span');
      spore.className = 'moss-spore';
      
      const size = 3 + Math.random() * 5;
      const startX = Math.random() * 100;
      const driftY = 30 + Math.random() * 40;
      const driftX = (Math.random() - 0.5) * 20;
      
      spore.style.width = \`\${size}px\`;
      spore.style.height = \`\${size}px\`;
      spore.style.left = \`\${startX}%\`;
      
      spore.style.setProperty('--dx', \`\${driftX}px\`);
      spore.style.setProperty('--dy', \`-\${driftY}px\`);
      
      sporesContainer.appendChild(spore);
      
      setTimeout(() => {
        spore.remove();
      }, 1200);
    }, 180);
  });

  biolumeBtn.addEventListener('mouseleave', () => {
    clearInterval(sporesInterval);
  });
}`,
  ts: `// TypeScript Implementation
const biolumeBtn = document.querySelector<HTMLButtonElement>('.biolume-pulse-btn');
if (biolumeBtn) {
  const sporesContainer = biolumeBtn.querySelector<HTMLDivElement>('.biolume-spores');
  if (sporesContainer) {
    let sporesInterval: number | null = null;
    
    biolumeBtn.addEventListener('mouseenter', () => {
      sporesInterval = window.setInterval(() => {
        const spore = document.createElement('span');
        spore.className = 'moss-spore';
        
        const size = 3 + Math.random() * 5;
        const startX = Math.random() * 100;
        const driftY = 30 + Math.random() * 40;
        const driftX = (Math.random() - 0.5) * 20;
        
        spore.style.width = \`\${size}px\`;
        spore.style.height = \`\${size}px\`;
        spore.style.left = \`\${startX}%\`;
        
        spore.style.setProperty('--dx', \`\${driftX}px\`);
        spore.style.setProperty('--dy', \`-\${driftY}px\`);
        
        sporesContainer.appendChild(spore);
        
        setTimeout(() => {
          spore.remove();
        }, 1200);
      }, 180);
    });

    biolumeBtn.addEventListener('mouseleave', () => {
      if (sporesInterval) clearInterval(sporesInterval);
    });
  }
}`,
  css: `/* Bioluminescent Moss Pulse Button Styles */
.biolume-pulse-btn {
  position: relative;
  background: linear-gradient(135deg, #021a10 0%, #053320 100%);
  border: 1px solid rgba(0, 255, 127, 0.25);
  padding: 16px 36px;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 255, 127, 0.1),
    inset 0 0 15px rgba(0, 255, 127, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.biolume-spores {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* Organic glowing moss spore */
.moss-spore {
  position: absolute;
  bottom: -5px;
  border-radius: 50%;
  background: #39ff14;
  box-shadow: 
    0 0 8px #39ff14,
    0 0 15px rgba(57, 255, 20, 0.5);
  pointer-events: none;
  z-index: 2;
  animation: spore-drift-up 1.2s cubic-bezier(0.1, 0.7, 0.2, 1) forwards;
}

.biolume-text {
  position: relative;
  z-index: 3;
  color: #00ff80;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-shadow: 0 0 10px rgba(0, 255, 128, 0.4);
  transition: all 0.3s ease;
}

/* Hover organic moss breathing states */
.biolume-pulse-btn:hover {
  border-color: #39ff14;
  box-shadow: 
    0 8px 25px rgba(57, 255, 20, 0.25),
    0 0 15px rgba(0, 255, 127, 0.15),
    inset 0 0 20px rgba(57, 255, 20, 0.15);
  background: linear-gradient(135deg, #053320 0%, #084c30 100%);
  transform: translateY(-2px);
}

.biolume-pulse-btn:hover .biolume-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #39ff14;
}

.biolume-pulse-btn:active {
  transform: translateY(1px);
}

@keyframes spore-drift-up {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(0);
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-gradient-to-br from-[#021a10] to-[#053320] border border-[#00ff80]/25 px-9 py-4 rounded-full cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#39ff14] hover:shadow-[0_8px_25px_rgba(57,255,20,0.25)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#00ff80] font-bold text-xs tracking-[0.18em] [text-shadow:0_0_10px_rgba(0,255,128,0.4)]">HARVEST ENERGY</span>
</button>`,
  prompt: `Design a premium "Bioluminescent Moss Pulse Button" component. Colored in deep undersea green shades, organic light waves breathe softly. When hovered, glowing neon-green micro spores drift up and fade out from the capsule container.`
};
