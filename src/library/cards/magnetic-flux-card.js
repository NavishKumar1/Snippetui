/**
 * Component: Magnetic Flux Fields Card
 * Category: cards
 */

export const component = {
  id: 'magnetic-flux-card',
  name: 'Magnetic Flux Fields Card',
  category: 'cards',
  tag: 'Interactive',
  html: `<div class="magnetic-flux-card">
  <div class="flux-card-grid-container">
    <span class="flux-card-line fcl-1"></span>
    <span class="flux-card-line fcl-2"></span>
    <span class="flux-card-line fcl-3"></span>
    <span class="flux-card-line fcl-4"></span>
    <span class="flux-card-line fcl-5"></span>
  </div>
  <div class="flux-card-content">
    <span class="flux-card-tag">PHYSICS ENGINE</span>
    <h3 class="flux-card-title">Flux Field</h3>
    <p class="flux-card-desc">Simulating electromagnetic coordinate wave lines, dynamic magnetic field vector warp shifts, and grid magnetic attraction loops.</p>
    <div class="flux-card-footer">
      <span class="flux-card-status">FIELD ALIGNED</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Magnetic Flux coordinate attraction inside card
const fluxCard = document.querySelector('.magnetic-flux-card');
if (fluxCard) {
  const lines = fluxCard.querySelectorAll('.flux-card-line');
  
  fluxCard.addEventListener('mousemove', (e) => {
    const rect = fluxCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Distort lines toward cursor coordinates
    lines.forEach((line, idx) => {
      const lineLeft = rect.width * (0.16 + (idx * 0.16));
      const dist = x - lineLeft;
      const pull = Math.max(-25, Math.min(25, dist * 0.2));
      
      line.style.transform = \`translateX(\${pull}px) scaleX(1.8)\`;
      line.style.background = '#00f2fe';
      line.style.boxShadow = '0 0 10px #00f2fe';
    });
  });

  fluxCard.addEventListener('mouseleave', () => {
    // Return flux lines to parallel states
    lines.forEach((line) => {
      line.style.transform = 'translateX(0px) scaleX(1)';
      line.style.background = 'rgba(255, 255, 255, 0.08)';
      line.style.boxShadow = 'none';
      line.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });
  
  fluxCard.addEventListener('mouseenter', () => {
    lines.forEach((line) => {
      line.style.transition = 'none';
    });
  });
}`,
  ts: `// TypeScript Implementation
const fluxCard = document.querySelector<HTMLDivElement>('.magnetic-flux-card');
if (fluxCard) {
  const lines = fluxCard.querySelectorAll<HTMLSpanElement>('.flux-card-line');
  
  fluxCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = fluxCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    lines.forEach((line, idx) => {
      const lineLeft = rect.width * (0.16 + (idx * 0.16));
      const dist = x - lineLeft;
      const pull = Math.max(-25, Math.min(25, dist * 0.2));
      
      line.style.transform = \`translateX(\${pull}px) scaleX(1.8)\`;
      line.style.background = '#00f2fe';
      line.style.boxShadow = '0 0 10px #00f2fe';
    });
  });

  fluxCard.addEventListener('mouseleave', () => {
    lines.forEach((line) => {
      line.style.transform = 'translateX(0px) scaleX(1)';
      line.style.background = 'rgba(255, 255, 255, 0.08)';
      line.style.boxShadow = 'none';
      line.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });
  
  fluxCard.addEventListener('mouseenter', () => {
    lines.forEach((line) => {
      line.style.transition = 'none';
    });
  });
}`,
  css: `/* Magnetic Flux Fields Card Styles */
.magnetic-flux-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #030308;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.65),
    0 0 10px rgba(0, 242, 254, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.flux-card-grid-container {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  display: flex;
  justify-content: space-around;
  padding: 0 25px;
}

/* Parallel geometric flux lines */
.flux-card-line {
  display: block;
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;
}

.flux-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #030308 50%, rgba(3, 3, 8, 0.1) 100%);
}

.flux-card-tag {
  color: #c8d6e5;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
}

.flux-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.flux-card-desc {
  color: #8fa0b5;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.flux-card-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 15px;
}

.flux-card-status {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(0, 242, 254, 0.3);
}

/* Hover organic field lines alignment */
.magnetic-flux-card:hover {
  border-color: rgba(0, 242, 254, 0.45);
  box-shadow: 
    0 20px 45px rgba(0, 242, 254, 0.25),
    0 0 20px rgba(0, 242, 254, 0.15),
    inset 0 0 10px rgba(0, 242, 254, 0.1);
  transform: translateY(-2px);
}

.magnetic-flux-card:hover .flux-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#030308] rounded-2xl border border-white/10 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.65)] hover:border-[#00f2fe]/45 hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-slate-300 tracking-widest mb-3">PHYSICS ENGINE</div>
    <div class="font-bold text-2xl text-white mb-2.5">Flux Field</div>
    <div class="text-xs text-slate-500 leading-relaxed mb-6">Simulating electromagnetic coordinate wave lines, dynamic magnetic field vector warp shifts, and grid magnetic attraction loops.</div>
    <div class="border-t border-white/10 pt-4 text-[#00f2fe] font-bold text-xs tracking-wider">
      FIELD ALIGNED
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Magnetic Flux Fields Card" component. Parallel vector coordinate grid lines curve and warp organically around user's cursor position tracking on hover, glowing in blue.`
};
