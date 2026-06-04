/**
 * Component: Chroma Oil-Slick Vortex Button
 * Category: buttons
 */

export const component = {
  id: 'chroma-vortex-btn',
  name: 'Chroma Oil-Slick Vortex',
  category: 'buttons',
  tag: 'Aesthetic',
  html: `<button class="chroma-vortex-btn">
  <div class="vortex-background"></div>
  <span class="vortex-text">ACTIVATE VORTEX</span>
</button>`,
  js: `// Interactive Vortex Speedup on Hover
const vortexBtn = document.querySelector('.chroma-vortex-btn');
if (vortexBtn) {
  const bg = vortexBtn.querySelector('.vortex-background');
  
  vortexBtn.addEventListener('mouseenter', () => {
    if (bg) {
      bg.style.animationPlayState = 'running';
      bg.style.animationDuration = '2s';
    }
  });

  vortexBtn.addEventListener('mouseleave', () => {
    if (bg) {
      bg.style.animationDuration = '8s';
    }
  });
}`,
  ts: `// TypeScript Implementation
const vortexBtn = document.querySelector<HTMLButtonElement>('.chroma-vortex-btn');
if (vortexBtn) {
  const bg = vortexBtn.querySelector<HTMLDivElement>('.vortex-background');
  
  vortexBtn.addEventListener('mouseenter', () => {
    if (bg) {
      bg.style.animationPlayState = 'running';
      bg.style.animationDuration = '2s';
    }
  });

  vortexBtn.addEventListener('mouseleave', () => {
    if (bg) {
      bg.style.animationDuration = '8s';
    }
  });
}`,
  css: `/* Chroma Oil-Slick Vortex Button Styles */
.chroma-vortex-btn {
  position: relative;
  background: #020205;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 16px 36px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Iridescent vortex swirl background */
.vortex-background {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 180deg,
    #ff0055,
    #00ffcc,
    #0099ff,
    #ffcc00,
    #ff0055
  );
  filter: blur(20px);
  opacity: 0.2;
  z-index: 1;
  transform-origin: center center;
  animation: vortex-rotate-loop 8s infinite linear;
  transition: opacity 0.3s ease;
}

.vortex-text {
  position: relative;
  z-index: 3;
  color: #e2e8f0;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease;
}

/* Hover dynamic visual shifts */
.chroma-vortex-btn:hover {
  border-color: rgba(255, 255, 255, 0.45);
  box-shadow: 
    0 12px 30px rgba(0, 255, 204, 0.15),
    0 0 20px rgba(255, 0, 85, 0.1),
    inset 0 0 15px rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.chroma-vortex-btn:hover .vortex-background {
  opacity: 0.65;
}

.chroma-vortex-btn:hover .vortex-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px rgba(255, 255, 255, 0.5),
    0 0 15px rgba(0, 255, 204, 0.4);
}

.chroma-vortex-btn:active {
  transform: translateY(1px);
}

@keyframes vortex-rotate-loop {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#020205] border border-white/15 px-9 py-4 rounded-lg cursor-pointer overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-white/45 hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-slate-200 font-bold text-xs tracking-[0.15em]">ACTIVATE VORTEX</span>
</button>`,
  prompt: `Design a premium "Chroma Oil-Slick Vortex Button" component. A rounded dark glass casing outlines a spinning iridescent rainbow fluid vortex in the background. Hovering accelerates the swirl orbits, generating shifting chromatic oil shades.`
};
