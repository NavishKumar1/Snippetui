/**
 * Component: Magnetic Flux Grid Button
 * Category: buttons
 */

export const component = {
  id: 'magnetic-flux-btn',
  name: 'Magnetic Flux Grid',
  category: 'buttons',
  tag: 'Interactive',
  html: `<button class="magnetic-flux-btn">
  <div class="flux-grid-container">
    <span class="flux-line flux-line-1"></span>
    <span class="flux-line flux-line-2"></span>
    <span class="flux-line flux-line-3"></span>
    <span class="flux-line flux-line-4"></span>
  </div>
  <span class="flux-text">ALIGN MAGNETIC FIELD</span>
</button>`,
  js: `// Interactive Magnetic Flux coordinate attraction
const fluxBtn = document.querySelector('.magnetic-flux-btn');
if (fluxBtn) {
  const lines = fluxBtn.querySelectorAll('.flux-line');
  
  fluxBtn.addEventListener('mousemove', (e) => {
    const rect = fluxBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Distort lines toward cursor coordinates
    lines.forEach((line, idx) => {
      const lineLeft = rect.width * (0.2 + (idx * 0.2));
      const dist = x - lineLeft;
      const pull = Math.max(-15, Math.min(15, dist * 0.15));
      
      line.style.transform = \`translateX(\${pull}px) scaleX(1.5)\`;
      line.style.background = '#00f2fe';
      line.style.boxShadow = '0 0 10px #00f2fe';
    });
  });

  fluxBtn.addEventListener('mouseleave', () => {
    // Return flux lines to absolute parallel states
    lines.forEach((line) => {
      line.style.transform = 'translateX(0px) scaleX(1)';
      line.style.background = 'rgba(255, 255, 255, 0.12)';
      line.style.boxShadow = 'none';
      line.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });
  
  fluxBtn.addEventListener('mouseenter', () => {
    lines.forEach((line) => {
      line.style.transition = 'none';
    });
  });
}`,
  ts: `// TypeScript Implementation
const fluxBtn = document.querySelector<HTMLButtonElement>('.magnetic-flux-btn');
if (fluxBtn) {
  const lines = fluxBtn.querySelectorAll<HTMLSpanElement>('.flux-line');
  
  fluxBtn.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = fluxBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    lines.forEach((line, idx) => {
      const lineLeft = rect.width * (0.2 + (idx * 0.2));
      const dist = x - lineLeft;
      const pull = Math.max(-15, Math.min(15, dist * 0.15));
      
      line.style.transform = \`translateX(\${pull}px) scaleX(1.5)\`;
      line.style.background = '#00f2fe';
      line.style.boxShadow = '0 0 10px #00f2fe';
    });
  });

  fluxBtn.addEventListener('mouseleave', () => {
    lines.forEach((line) => {
      line.style.transform = 'translateX(0px) scaleX(1)';
      line.style.background = 'rgba(255, 255, 255, 0.12)';
      line.style.boxShadow = 'none';
      line.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });
  
  fluxBtn.addEventListener('mouseenter', () => {
    lines.forEach((line) => {
      line.style.transition = 'none';
    });
  });
}`,
  css: `/* Magnetic Flux Grid Button Styles */
.magnetic-flux-btn {
  position: relative;
  background: #030307;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 16px 36px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    0 0 10px rgba(0, 242, 254, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.flux-grid-container {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  display: flex;
  justify-content: space-around;
  padding: 0 15px;
}

/* Parallel geometric flux lines */
.flux-line {
  display: block;
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, 0.12);
  transition: all 0.2s ease;
}

.flux-text {
  position: relative;
  z-index: 3;
  color: #c8d6e5;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease;
}

/* Hover organic field lines alignment */
.magnetic-flux-btn:hover {
  border-color: rgba(0, 242, 254, 0.4);
  box-shadow: 
    0 8px 25px rgba(0, 242, 254, 0.25),
    0 0 15px rgba(0, 242, 254, 0.15),
    inset 0 0 10px rgba(0, 242, 254, 0.1);
  transform: translateY(-2px);
}

.magnetic-flux-btn:hover .flux-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}

.magnetic-flux-btn:active {
  transform: translateY(1px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#030307] border border-white/10 px-9 py-4 rounded-lg cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:border-[#00f2fe]/40 hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-slate-300 font-bold text-xs tracking-[0.18em]">ALIGN MAGNETIC FIELD</span>
</button>`,
  prompt: `Design a premium "Magnetic Flux Grid Button" component. Hollow dark indigo layout spans parallel vertical vector field lines. Hovering pulls the lines organically toward the user's cursor coordinate, glowing intensely in blue.`
};
