/**
 * Component: Retro Arcade CRT Card
 * Category: cards
 */

export const component = {
  id: 'retro-arcade-card',
  name: 'Retro Arcade CRT',
  category: 'cards',
  tag: 'Aesthetic',
  html: `<div class="retro-arcade-card">
  <div class="crt-bezel-frame">
    <div class="crt-screen-overlay">
      <div class="crt-matrix-grid"></div>
      <div class="crt-glitch-bar"></div>
    </div>
  </div>
  <div class="arcade-card-interior">
    <span class="arcade-score">HIGH SCORE: 99999</span>
    <h3 class="arcade-title">Retro Console</h3>
    <p class="arcade-desc">Simulating vintage analog cathode ray tubes with scanlines and magnetic color shifts.</p>
  </div>
</div>`,
  js: `// Interactive 3D tilt screen parallax on hover
const arcadeCard = document.querySelector('.retro-arcade-card');
if (arcadeCard) {
  const bezel = arcadeCard.querySelector('.crt-bezel-frame');
  
  arcadeCard.addEventListener('mousemove', (e) => {
    const rect = arcadeCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const tiltX = -(y / rect.height) * 20; // max 10deg
    const tiltY = (x / rect.width) * 20;
    
    if (bezel) {
      bezel.style.transform = \`rotateX(\${tiltX}deg) rotateY(\${tiltY}deg) scale(1.05)\`;
    }
  });

  arcadeCard.addEventListener('mouseleave', () => {
    if (bezel) {
      bezel.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
  });
}`,
  ts: `// TypeScript Implementation
const arcadeCard = document.querySelector<HTMLDivElement>('.retro-arcade-card');
if (arcadeCard) {
  const bezel = arcadeCard.querySelector<HTMLDivElement>('.crt-bezel-frame');
  
  arcadeCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = arcadeCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const tiltX = -(y / rect.height) * 20;
    const tiltY = (x / rect.width) * 20;
    
    if (bezel) {
      bezel.style.transform = \`rotateX(\${tiltX}deg) rotateY(\${tiltY}deg) scale(1.05)\`;
    }
  });

  arcadeCard.addEventListener('mouseleave', () => {
    if (bezel) {
      bezel.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
  });
}`,
  css: `/* Retro Arcade CRT Card Styles */
.retro-arcade-card {
  position: relative;
  width: 320px;
  height: 220px;
  background: #020202;
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.9);
  perspective: 600px;
  cursor: pointer;
  transition: border-color 0.4s ease;
}

.retro-arcade-card:hover {
  border-color: rgba(255, 0, 127, 0.35);
}

/* CRT monitor cabinet bezel */
.crt-bezel-frame {
  position: absolute;
  inset: 10px 10px 80px 10px;
  background: #111115;
  border: 3px solid #22222a;
  border-radius: 12px;
  z-index: 1;
  overflow: hidden;
  box-shadow: 
    inset 0 0 15px rgba(0,0,0,0.8),
    0 4px 10px rgba(0,0,0,0.5);
  transform-style: preserve-3d;
  transition: transform 0.25s cubic-bezier(0.1, 0.8, 0.3, 1);
}

.crt-screen-overlay {
  position: absolute;
  inset: 4px;
  background: #031c12;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.2);
}

/* Vector CRT Grid Lines scrolling */
.crt-matrix-grid {
  position: absolute;
  inset: -100px;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 15px 15px;
  transform: rotateX(25deg);
  animation: grid-scroll-crt 6s infinite linear;
}

@keyframes grid-scroll-crt {
  from { background-position: 0 0; }
  to { background-position: 0 100px; }
}

/* CRT Screen Scanline Flickering overlay */
.crt-screen-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  z-index: 5;
  pointer-events: none;
}

/* Moving glitch line */
.crt-glitch-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(0, 255, 255, 0.3);
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.8);
  top: 0;
  animation: glitch-bar-move 4s infinite linear;
  z-index: 4;
}

@keyframes glitch-bar-move {
  0% { top: 0%; }
  100% { top: 100%; }
}

/* Internal text styling */
.arcade-card-interior {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.arcade-score {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  color: #ff007f;
  text-shadow: 0 0 5px rgba(255, 0, 127, 0.5);
  letter-spacing: 0.1em;
}

.arcade-title {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.arcade-desc {
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.5;
  margin: 0;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] h-[220px] bg-[#020202] rounded-2xl border border-cyan-500/10 overflow-hidden flex flex-col justify-end p-6 shadow-2xl">
  <div class="relative z-10 flex flex-col items-start gap-2">
    <span class="text-[9px] font-mono font-bold text-pink-500">HIGH SCORE: 99999</span>
    <h3 class="text-lg font-bold text-white">Retro Console</h3>
    <p class="text-xs text-gray-400">Simulating vintage analog cathode ray tubes with scanlines and magnetic color shifts.</p>
  </div>
</div>`,
  prompt: `Design a premium "Retro Arcade CRT Card" component. Featuring a thick dark bezel screen mask. On hover, the inner vector console screen tilts in full 3D coordinate space, displaying matrix coordinate grids, scanlines, and light scan ripples.`
};
