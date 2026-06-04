/**
 * Component: Star Constellation Vector Card
 * Category: cards
 */

export const component = {
  id: 'star-constellation-card',
  name: 'Star Constellation Vector Card',
  category: 'cards',
  tag: 'Interactive',
  html: `<div class="star-constell-card">
  <svg class="constell-card-svg" width="100%" height="100%">
    <line class="constell-card-line cl-1" x1="20%" y1="25%" x2="50%" y2="50%" />
    <line class="constell-card-line cl-2" x1="80%" y1="70%" x2="50%" y2="50%" />
    <line class="constell-card-line cl-3" x1="50%" y1="15%" x2="50%" y2="50%" />
  </svg>
  
  <span class="constell-card-node c-node-1" style="left: 20%; top: 25%;"></span>
  <span class="constell-card-node c-node-2" style="left: 80%; top: 70%;"></span>
  <span class="constell-card-node c-node-3" style="left: 50%; top: 15%;"></span>
  <span class="constell-card-node cursor-card-node"></span>

  <div class="constell-card-content">
    <span class="constell-card-tag">ASTROMETRY METRICS</span>
    <h3 class="constell-card-title">Stellar Network</h3>
    <p class="constell-card-desc">Mapping quantum galactic coordinate grids, analyzing stellar gravity matrices, and tracking satellite routes.</p>
    <div class="constell-card-footer">
      <span class="constell-card-status">CONSTELLATIONS: 12 LOCKED</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Constellation line drawing to cursor coords inside card
const constellCard = document.querySelector('.star-constellation-card');
if (constellCard) {
  const line1 = constellCard.querySelector('.cl-1');
  const line2 = constellCard.querySelector('.cl-2');
  const line3 = constellCard.querySelector('.cl-3');
  const cursorNode = constellCard.querySelector('.cursor-card-node');
  const lines = [line1, line2, line3];
  
  constellCard.addEventListener('mousemove', (e) => {
    const rect = constellCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (cursorNode) {
      cursorNode.style.left = \`\${x}px\`;
      cursorNode.style.top = \`\${y}px\`;
      cursorNode.style.opacity = '1';
    }
    
    lines.forEach((line) => {
      if (line) {
        line.setAttribute('x2', \`\${x}px\`);
        line.setAttribute('y2', \`\${y}px\`);
        line.style.opacity = '0.55';
      }
    });
  });

  constellCard.addEventListener('mouseleave', () => {
    const rect = constellCard.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    
    if (cursorNode) cursorNode.style.opacity = '0';
    
    lines.forEach((line) => {
      if (line) {
        line.style.transition = 'all 0.5s ease';
        line.setAttribute('x2', \`\${cx}px\`);
        line.setAttribute('y2', \`\${cy}px\`);
        line.style.opacity = '0.15';
      }
    });
  });
  
  constellCard.addEventListener('mouseenter', () => {
    lines.forEach((line) => {
      if (line) line.style.transition = 'none';
    });
  });
}`,
  ts: `// TypeScript Implementation
const constellCard = document.querySelector<HTMLDivElement>('.star-constellation-card');
if (constellCard) {
  const line1 = constellCard.querySelector<SVGLineElement>('.cl-1');
  const line2 = constellCard.querySelector<SVGLineElement>('.cl-2');
  const line3 = constellCard.querySelector<SVGLineElement>('.cl-3');
  const cursorNode = constellCard.querySelector<HTMLSpanElement>('.cursor-card-node');
  const lines = [line1, line2, line3];
  
  constellCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = constellCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (cursorNode) {
      cursorNode.style.left = \`\${x}px\`;
      cursorNode.style.top = \`\${y}px\`;
      cursorNode.style.opacity = '1';
    }
    
    lines.forEach((line) => {
      if (line) {
        line.setAttribute('x2', \`\${x}px\`);
        line.setAttribute('y2', \`\${y}px\`);
        line.style.opacity = '0.55';
      }
    });
  });

  constellCard.addEventListener('mouseleave', () => {
    const rect = constellCard.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    
    if (cursorNode) cursorNode.style.opacity = '0';
    
    lines.forEach((line) => {
      if (line) {
        line.style.transition = 'all 0.5s ease';
        line.setAttribute('x2', \`\${cx}px\`);
        line.setAttribute('y2', \`\${cy}px\`);
        line.style.opacity = '0.15';
      }
    });
  });
  
  constellCard.addEventListener('mouseenter', () => {
    lines.forEach((line) => {
      if (line) line.style.transition = 'none';
    });
  });
}`,
  css: `/* Star Constellation Vector Card Styles */
.star-constell-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #020307;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.65),
    0 0 10px rgba(0, 242, 254, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.constell-card-svg {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* Glowing star vector lines */
.constell-card-line {
  stroke: #00f2fe;
  stroke-width: 1px;
  opacity: 0.15;
  stroke-dasharray: 2 2;
  transition: opacity 0.3s ease;
}

/* Cosmic star node points */
.constell-card-node {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 
    0 0 6px #00f2fe,
    0 0 12px #ffffff;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
  transition: all 0.3s ease;
}

.cursor-card-node {
  width: 6px;
  height: 6px;
  background: #00f2fe;
  opacity: 0;
}

.constell-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #020307 40%, rgba(2, 3, 7, 0.1) 100%);
}

.constell-card-tag {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.25);
}

.constell-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.constell-card-desc {
  color: #8fa0b5;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.constell-card-footer {
  border-top: 1px solid rgba(0, 242, 254, 0.25);
  padding-top: 15px;
}

.constell-card-status {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

/* Hover constellation linkage */
.star-constell-card:hover {
  border-color: rgba(0, 242, 254, 0.4);
  box-shadow: 
    0 20px 45px rgba(0, 242, 254, 0.25),
    0 0 20px rgba(0, 242, 254, 0.15),
    inset 0 0 10px rgba(0, 242, 254, 0.1);
  transform: translateY(-2px);
}

.star-constell-card:hover .constell-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}

.star-constell-card:hover .constell-card-node {
  transform: translate(-50%, -50%) scale(1.5);
}

.star-constell-card:active {
  transform: translateY(1px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#020307] rounded-2xl border border-white/10 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.65)] hover:border-[#00f2fe]/40 hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#00f2fe] tracking-widest mb-3">ASTROMETRY METRICS</div>
    <div class="font-bold text-2xl text-white mb-2.5">Stellar Network</div>
    <div class="text-xs text-[#8fa0b5] leading-relaxed mb-6">Mapping quantum galactic coordinate grids, analyzing stellar gravity matrices, and tracking satellite routes.</div>
    <div class="border-t border-white/10 pt-4 text-[#00f2fe] font-bold text-xs tracking-wider">
      CONSTELLATIONS: 12 LOCKED
    </div>
  </div>
</div>`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#020307] rounded-2xl border border-white/10 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.65)] hover:border-[#00f2fe]/40 hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#00f2fe] tracking-widest mb-3">ASTROMETRY METRICS</div>
    <div class="font-bold text-2xl text-white mb-2.5">Stellar Network</div>
    <div class="text-xs text-[#8fa0b5] leading-relaxed mb-6">Mapping quantum galactic coordinate grids, analyzing stellar gravity matrices, and tracking satellite routes.</div>
    <div class="border-t border-white/10 pt-4 text-[#00f2fe] font-bold text-xs tracking-wider">
      CONSTELLATIONS: 12 LOCKED
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Star Constellation Vector Card" component. Hollow star node points anchor in deep space. Tracking the cursor dynamically draws glowing neon-cyan vector connection lines linking all stars to the cursor point.`
};
