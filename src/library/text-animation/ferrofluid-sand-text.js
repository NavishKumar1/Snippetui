/**
 * Component: Magnetic Sand / Ferrofluid Particles
 * Category: text-animation
 */

export const component = {
  id: 'ferrofluid-sand-text',
  name: 'Magnetic Ferrofluid Sand',
  category: 'text-animation',
  tag: 'Particles',
  html: `<div class="ferrofluid-container" style="cursor: pointer;">
  <span class="ferrofluid-text">MAGNETIC</span>
  <div class="magnetic-dust-field">
    <div class="dust-particle" style="--l: 10%; --t: 20%; --speed: 2s; --dx: 15px; --dy: -25px;"></div>
    <div class="dust-particle" style="--l: 85%; --t: 40%; --speed: 2.2s; --dx: -15px; --dy: 20px;"></div>
    <div class="dust-particle" style="--l: 45%; --t: 70%; --speed: 1.8s; --dx: 25px; --dy: 15px;"></div>
    <div class="dust-particle" style="--l: 30%; --t: 10%; --speed: 2.5s; --dx: -20px; --dy: -20px;"></div>
    <div class="dust-particle" style="--l: 70%; --t: 80%; --speed: 2.1s; --dx: 10px; --dy: 30px;"></div>
  </div>
</div>`,
  js: `// Magnify dust attraction on click
const magneticContainer = document.querySelector('.ferrofluid-container');
if (magneticContainer) {
  magneticContainer.addEventListener('mousedown', () => {
    magneticContainer.querySelectorAll('.dust-particle').forEach(dust => {
      dust.style.animationDuration = '0.5s';
      dust.style.background = '#00f2fe';
    });
  });
  
  magneticContainer.addEventListener('mouseup', () => {
    magneticContainer.querySelectorAll('.dust-particle').forEach(dust => {
      dust.style.animationDuration = '';
      dust.style.background = '#ff007f';
    });
  });
}`,
  ts: `// TypeScript Implementation
const magneticContainer = document.querySelector<HTMLDivElement>('.ferrofluid-container');
if (magneticContainer) {
  magneticContainer.addEventListener('mousedown', () => {
    magneticContainer.querySelectorAll<HTMLDivElement>('.dust-particle').forEach(dust => {
      dust.style.animationDuration = '0.5s';
      dust.style.background = '#00f2fe';
    });
  });
  
  magneticContainer.addEventListener('mouseup', () => {
    magneticContainer.querySelectorAll<HTMLDivElement>('.dust-particle').forEach(dust => {
      dust.style.animationDuration = '';
      dust.style.background = '#ff007f';
    });
  });
}`,
  css: `/* Magnetic Sand / Ferrofluid CSS */
.ferrofluid-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.ferrofluid-text {
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  letter-spacing: 0.08em;
  color: #ffffff;
  text-transform: uppercase;
  background: linear-gradient(180deg, #ffffff 40%, #5b5c68 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 10px rgba(0,0,0,0.8));
}

.magnetic-dust-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

/* Floating magnetic iron filings */
.dust-particle {
  position: absolute;
  left: var(--l);
  top: var(--t);
  width: 4px;
  height: 4px;
  background: #ff007f;
  border-radius: 50%;
  box-shadow: 0 0 6px #ff007f, 0 0 12px #8a2be2;
  
  /* Continuous magnet attraction orbit cycles */
  animation: ferrofluid-attract var(--speed) infinite alternate ease-in-out;
}

@keyframes ferrofluid-attract {
  0% {
    transform: translate(0, 0) scale(0.8);
    opacity: 0.3;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(1.4);
    opacity: 0.95;
    background: #00f2fe;
    box-shadow: 0 0 8px #00f2fe, 0 0 15px rgba(0, 242, 254, 0.6);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex items-center justify-center p-[30px] cursor-pointer">
  <span class="font-extrabold text-[34px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-[#5b5c68]">
    MAGNETIC
  </span>
</div>`,
  prompt: `Design a high-fidelity "Magnetic Sand / Ferrofluid Particles" text effect. Small, glowing metallic filings/particles continuously orbit and cluster dynamically near the paths of heavy gray letters on infinite loop cycles.`
};
