/**
 * Component: Laser Slash Border Card
 * Category: cards
 */

export const component = {
  id: 'laser-slash-card',
  name: 'Laser Slash Border Card',
  category: 'cards',
  tag: 'Interactive',
  html: `<div class="laser-slash-card">
  <span class="laser-card-track"></span>
  <span class="laser-card-pointer"></span>
  <div class="laser-card-content">
    <span class="laser-card-tag">INDUSTRIAL LASERS</span>
    <h3 class="laser-card-title">Precision Carver</h3>
    <p class="laser-card-desc">Controlling automated micro-drilling pathways, sub-micron coordinate cutting grids, and thermal beam lenses.</p>
    <div class="laser-card-footer">
      <span class="laser-card-status">BEAM INTENSITY: 94%</span>
    </div>
  </div>
</div>`,
  js: `// Laser cutter slash hover activation
const laserCard = document.querySelector('.laser-slash-card');
if (laserCard) {
  const pointer = laserCard.querySelector('.laser-card-pointer');
  
  laserCard.addEventListener('mouseenter', () => {
    if (pointer) {
      pointer.style.animationPlayState = 'running';
    }
  });

  laserCard.addEventListener('mouseleave', () => {
    if (pointer) {
      pointer.style.animationPlayState = 'paused';
    }
  });
}`,
  ts: `// TypeScript Implementation
const laserCard = document.querySelector<HTMLDivElement>('.laser-slash-card');
if (laserCard) {
  const pointer = laserCard.querySelector<HTMLSpanElement>('.laser-card-pointer');
  
  laserCard.addEventListener('mouseenter', () => {
    if (pointer) {
      pointer.style.animationPlayState = 'running';
    }
  });

  laserCard.addEventListener('mouseleave', () => {
    if (pointer) {
      pointer.style.animationPlayState = 'paused';
    }
  });
}`,
  css: `/* Laser Slash Border Card Styles */
.laser-slash-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #0f1115;
  border-radius: 8px;
  border: 1px solid rgba(255, 51, 0, 0.15);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.6),
    0 0 10px rgba(255, 51, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Glowing cutter line boundary */
.laser-card-track {
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-radius: 8px;
  z-index: 1;
  pointer-events: none;
  transition: all 0.3s ease;
}

/* High-intensity sweeping laser pointer spark */
.laser-card-pointer {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 
    0 0 10px #ff3300,
    0 0 20px #ff3300,
    0 0 35px #ff0000;
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  /* Complex coordinate path tracing the border of the card */
  animation: laser-card-orbit 4s infinite linear;
  animation-play-state: paused;
}

.laser-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
}

.laser-card-tag {
  color: #ff3300;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  text-shadow: 0 0 5px rgba(255, 51, 0, 0.3);
}

.laser-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.laser-card-desc {
  color: #8fa0b5;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.laser-card-footer {
  border-top: 1px solid rgba(255, 51, 0, 0.2);
  padding-top: 15px;
}

.laser-card-status {
  color: #ff3300;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(255, 51, 0, 0.3);
}

/* Hover visual transformations */
.laser-slash-card:hover {
  border-color: rgba(255, 51, 0, 0.45);
  box-shadow: 
    0 20px 45px rgba(255, 51, 0, 0.25),
    0 0 20px rgba(255, 51, 0, 0.1),
    inset 0 0 15px rgba(255, 51, 0, 0.15);
  transform: translateY(-2px);
}

.laser-slash-card:hover .laser-card-pointer {
  opacity: 1;
}

.laser-slash-card:hover .laser-card-track {
  animation: laser-card-track-glow 1.5s infinite alternate ease-in-out;
}

.laser-slash-card:hover .laser-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #ff3300;
}

.laser-slash-card:active {
  transform: translateY(1px);
}

/* Border tracing laser path keyframes for 300px x 380px card */
@keyframes laser-card-orbit {
  0% { top: 0px; left: 0px; }
  25% { top: 0px; left: 100%; transform: translateX(-8px); }
  50% { top: 100%; left: 100%; transform: translate(-8px, -8px); }
  75% { top: 100%; left: 0px; transform: translateY(-8px); }
  100% { top: 0px; left: 0px; }
}

@keyframes laser-card-track-glow {
  0% { border-color: rgba(255, 51, 0, 0.2); box-shadow: inset 0 0 5px rgba(255, 51, 0, 0.1); }
  100% { border-color: rgba(255, 51, 0, 0.6); box-shadow: inset 0 0 15px rgba(255, 51, 0, 0.3); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#0f1115] rounded-lg border border-red-500/15 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-[#ff3300]/45 hover:shadow-[0_20px_45px_rgba(255,51,0,0.25)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#ff3300] tracking-widest mb-3">INDUSTRIAL LASERS</div>
    <div class="font-bold text-2xl text-white mb-2.5">Precision Carver</div>
    <div class="text-xs text-[#8fa0b5] leading-relaxed mb-6">Controlling automated micro-drilling pathways, sub-micron coordinate cutting grids, and thermal beam lenses.</div>
    <div class="border-t border-[#ff3300]/20 pt-4 text-[#ff3300] font-bold text-xs tracking-wider">
      BEAM INTENSITY: 94%
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Laser Slash Border Card" component. Outlined in industrial titanium casing, a bright red laser spark orbits precision paths along outer card borders on hover, leaving a glowing white-hot cut track behind.`
};
