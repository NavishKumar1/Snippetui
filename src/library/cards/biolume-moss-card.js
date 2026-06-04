/**
 * Component: Bioluminescent Moss Card
 * Category: cards
 */

export const component = {
  id: 'biolume-moss-card',
  name: 'Bioluminescent Moss Card',
  category: 'cards',
  tag: 'Visual',
  html: `<div class="biolume-moss-card">
  <div class="biolume-card-spores"></div>
  <div class="biolume-card-content">
    <span class="biolume-card-tag">BOTANICAL LABS</span>
    <h3 class="biolume-card-title">Moss Organism</h3>
    <p class="biolume-card-desc">Tracking active photosynthesis frequencies, light energy emission yields, and carbon absorption index levels.</p>
    <div class="biolume-card-footer">
      <span class="biolume-card-status">SYNTHESIS: 100%</span>
    </div>
  </div>
</div>`,
  js: `// Interactive moss spores release on card hover
const biolumeCard = document.querySelector('.biolume-moss-card');
if (biolumeCard) {
  const sporesContainer = biolumeCard.querySelector('.biolume-card-spores');
  let sporesInterval = null;
  
  biolumeCard.addEventListener('mouseenter', () => {
    sporesInterval = setInterval(() => {
      const spore = document.createElement('span');
      spore.className = 'moss-card-spore';
      
      const size = 3 + Math.random() * 5;
      const startX = Math.random() * 100;
      const driftY = 40 + Math.random() * 60;
      const driftX = (Math.random() - 0.5) * 30;
      
      spore.style.width = \`\${size}px\`;
      spore.style.height = \`\${size}px\`;
      spore.style.left = \`\${startX}%\`;
      
      spore.style.setProperty('--mdx', \`\${driftX}px\`);
      spore.style.setProperty('--mdy', \`-\${driftY}px\`);
      
      sporesContainer.appendChild(spore);
      
      setTimeout(() => {
        spore.remove();
      }, 1500);
    }, 200);
  });

  biolumeCard.addEventListener('mouseleave', () => {
    clearInterval(sporesInterval);
  });
}`,
  ts: `// TypeScript Implementation
const biolumeCard = document.querySelector<HTMLDivElement>('.biolume-moss-card');
if (biolumeCard) {
  const sporesContainer = biolumeCard.querySelector<HTMLDivElement>('.biolume-card-spores');
  if (sporesContainer) {
    let sporesInterval: number | null = null;
    
    biolumeCard.addEventListener('mouseenter', () => {
      sporesInterval = window.setInterval(() => {
        const spore = document.createElement('span');
        spore.className = 'moss-card-spore';
        
        const size = 3 + Math.random() * 5;
        const startX = Math.random() * 100;
        const driftY = 40 + Math.random() * 60;
        const driftX = (Math.random() - 0.5) * 30;
        
        spore.style.width = \`\${size}px\`;
        spore.style.height = \`\${size}px\`;
        spore.style.left = \`\${startX}%\`;
        
        spore.style.setProperty('--mdx', \`\${driftX}px\`);
        spore.style.setProperty('--mdy', \`-\${driftY}px\`);
        
        sporesContainer.appendChild(spore);
        
        setTimeout(() => {
          spore.remove();
        }, 1500);
      }, 200);
    });

    biolumeCard.addEventListener('mouseleave', () => {
      if (sporesInterval) clearInterval(sporesInterval);
    });
  }
}`,
  css: `/* Bioluminescent Moss Card Styles */
.biolume-moss-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: linear-gradient(135deg, #02140d 0%, #042519 100%);
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 127, 0.2);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.5),
    0 0 15px rgba(0, 255, 127, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.biolume-card-spores {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* Organic glowing moss spore */
.moss-card-spore {
  position: absolute;
  bottom: -10px;
  border-radius: 50%;
  background: #39ff14;
  box-shadow: 
    0 0 10px #39ff14,
    0 0 20px rgba(57, 255, 20, 0.5);
  pointer-events: none;
  z-index: 2;
  animation: moss-spore-drift 1.5s cubic-bezier(0.1, 0.7, 0.3, 1) forwards;
}

.biolume-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #02140d 40%, rgba(2, 20, 13, 0.2) 100%);
}

.biolume-card-tag {
  color: #00ff80;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  text-shadow: 0 0 8px rgba(0, 255, 128, 0.3);
}

.biolume-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.biolume-card-desc {
  color: #92af9d;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.biolume-card-footer {
  border-top: 1px solid rgba(0, 255, 128, 0.15);
  padding-top: 15px;
}

.biolume-card-status {
  color: #39ff14;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(57, 255, 20, 0.3);
}

/* Hover organic moss breathing states */
.biolume-moss-card:hover {
  border-color: #39ff14;
  box-shadow: 
    0 20px 45px rgba(57, 255, 20, 0.22),
    0 0 20px rgba(0, 255, 127, 0.15),
    inset 0 0 20px rgba(57, 255, 20, 0.15);
  background: linear-gradient(135deg, #042519 0%, #063c29 100%);
  transform: translateY(-2px);
}

.biolume-moss-card:hover .biolume-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #39ff14;
}

@keyframes moss-spore-drift {
  0% {
    transform: translate(0, 0) scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: translate(var(--mdx), var(--mdy)) scale(0);
    opacity: 0;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-gradient-to-br from-[#02140d] to-[#042519] rounded-2xl border border-[#00ff80]/20 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-[#39ff14] hover:shadow-[0_20px_45px_rgba(57,255,20,0.22)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#00ff80] tracking-widest mb-3">BOTANICAL LABS</div>
    <div class="font-bold text-2xl text-white mb-2.5">Moss Organism</div>
    <div class="text-xs text-[#92af9d] leading-relaxed mb-6">Tracking active photosynthesis frequencies, light energy emission yields, and carbon absorption index levels.</div>
    <div class="border-t border-[#00ff80]/15 pt-4 text-[#39ff14] font-bold text-xs tracking-wider">
      SYNTHESIS: 100%
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Bioluminescent Moss Card" component. Set in a deep bio-green environment, organic moss textures breathe. When hovered, glowing neon-green micro spores float upward and fade out from the card face.`
};
