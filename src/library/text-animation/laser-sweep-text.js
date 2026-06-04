/**
 * Component: Laser Beam Sweep Reveal
 * Category: text-animation
 */

export const component = {
  id: 'laser-sweep-text',
  name: 'Laser Beam Sweep',
  category: 'text-animation',
  tag: 'Laser',
  html: `<div class="laser-sweep-container" style="cursor: pointer;">
  <span class="laser-sweep-text" data-text="LASER BEAM">LASER BEAM</span>
  <div class="laser-sweep-line"></div>
</div>`,
  js: `// Speed up sweep on click
const laserContainer = document.querySelector('.laser-sweep-container');
if (laserContainer) {
  const line = laserContainer.querySelector('.laser-sweep-line');
  laserContainer.addEventListener('click', () => {
    line.style.animation = 'none';
    line.offsetHeight; // trigger reflow
    line.style.animation = 'laser-line-sweep 1.2s ease-in-out infinite';
  });
}`,
  ts: `// TypeScript Implementation
const laserContainer = document.querySelector<HTMLDivElement>('.laser-sweep-container');
if (laserContainer) {
  const line = laserContainer.querySelector<HTMLDivElement>('.laser-sweep-line');
  if (line) {
    laserContainer.addEventListener('click', () => {
      line.style.animation = 'none';
      line.offsetHeight; // trigger reflow
      line.style.animation = 'laser-line-sweep 1.2s ease-in-out infinite';
    });
  }
}`,
  css: `/* Laser Beam Sweep Styles */
.laser-sweep-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.laser-sweep-text {
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.15);
  background: linear-gradient(90deg, transparent 0%, #00f2fe 50%, transparent 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: laser-text-reflect 2.2s ease-in-out infinite alternate;
}

.laser-sweep-line {
  position: absolute;
  top: 15%;
  bottom: 15%;
  width: 3px;
  background: #00f2fe;
  box-shadow: 0 0 8px #00f2fe, 0 0 16px #4facfe, 0 0 25px #8a2be2;
  border-radius: 4px;
  pointer-events: none;
  animation: laser-line-sweep 2.2s ease-in-out infinite alternate;
}

@keyframes laser-text-reflect {
  0% {
    background-position: 200% center;
    color: rgba(255, 255, 255, 0.15);
  }
  100% {
    background-position: -200% center;
    color: rgba(255, 255, 255, 0.25);
  }
}

@keyframes laser-line-sweep {
  0% {
    left: 0%;
    opacity: 0;
  }
  15%, 85% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex items-center justify-center p-5 cursor-pointer">
  <span class="font-extrabold text-[34px] tracking-widest uppercase text-white/20 animate-pulse">
    LASER BEAM
  </span>
</div>`,
  prompt: `Design a high-fidelity "Laser Beam Sweep Reveal" text animation. A vertical glowing neon-blue laser beam line constantly sweeps horizontally across the text, casting a high-contrast cyan light reflection and reveal trace on the bold letters as it sweeps, looping infinitely.`
};
