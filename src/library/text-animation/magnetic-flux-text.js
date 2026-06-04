/**
 * Component: Magnetic Kinetic Flux
 * Category: text-animation
 */

export const component = {
  id: 'magnetic-flux-text',
  name: 'Magnetic Kinetic Flux',
  category: 'text-animation',
  tag: 'Particles',
  html: `<div class="magnetic-flux-container" style="cursor: pointer;">
  <span class="magnetic-flux-text">FLUX</span>
  <div class="magnetic-flux-swarm">
    <div class="flux-particle" style="--l: 20%; --t: 30%; --dx: 15px; --dy: -25px; --speed: 2s;"></div>
    <div class="flux-particle" style="--l: 75%; --t: 40%; --dx: -20px; --dy: 15px; --speed: 2.3s;"></div>
    <div class="flux-particle" style="--l: 45%; --t: 75%; --dx: 25px; --dy: 10px; --speed: 1.9s;"></div>
    <div class="flux-particle" style="--l: 30%; --t: 20%; --dx: -15px; --dy: -20px; --speed: 2.5s;"></div>
    <div class="flux-particle" style="--l: 70%; --t: 80%; --dx: 15px; --dy: 25px; --speed: 2.1s;"></div>
  </div>
</div>`,
  js: `// Speed up particles on click
const fluxContainer = document.querySelector('.magnetic-flux-container');
if (fluxContainer) {
  fluxContainer.addEventListener('mousedown', () => {
    fluxContainer.querySelectorAll('.flux-particle').forEach(particle => {
      particle.style.animationDuration = '0.5s';
      particle.style.background = '#ffd700';
    });
  });
  
  fluxContainer.addEventListener('mouseup', () => {
    fluxContainer.querySelectorAll('.flux-particle').forEach(particle => {
      particle.style.animationDuration = '';
      particle.style.background = '#00f2fe';
    });
  });
}`,
  ts: `// TypeScript Implementation
const fluxContainer = document.querySelector<HTMLDivElement>('.magnetic-flux-container');
if (fluxContainer) {
  fluxContainer.addEventListener('mousedown', () => {
    fluxContainer.querySelectorAll<HTMLDivElement>('.flux-particle').forEach(particle => {
      particle.style.animationDuration = '0.5s';
      particle.style.background = '#ffd700';
    });
  });
  
  fluxContainer.addEventListener('mouseup', () => {
    fluxContainer.querySelectorAll<HTMLDivElement>('.flux-particle').forEach(particle => {
      particle.style.animationDuration = '';
      particle.style.background = '#00f2fe';
    });
  });
}`,
  css: `/* Magnetic Kinetic Flux CSS */
.magnetic-flux-container {
  position: relative;
  display: inline-flex;
  padding: 30px;
}

.magnetic-flux-text {
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

.magnetic-flux-swarm {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

/* Floating iron filings */
.flux-particle {
  position: absolute;
  left: var(--l);
  top: var(--t);
  width: 4px;
  height: 4px;
  background: #00f2fe;
  border-radius: 50%;
  box-shadow: 0 0 6px #00f2fe, 0 0 12px #8a2be2;
  
  /* Constant flux orbit cycles */
  animation: flux-attract var(--speed) infinite alternate ease-in-out;
}

@keyframes flux-attract {
  0% {
    transform: translate(0, 0) scale(0.8);
    opacity: 0.3;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(1.4);
    opacity: 0.95;
    background: #ff007f;
    box-shadow: 0 0 8px #ff007f, 0 0 15px rgba(255, 0, 127, 0.6);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex p-[30px] cursor-pointer">
  <span class="font-extrabold text-[34px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-[#5b5c68]">
    FLUX
  </span>
</div>`,
  prompt: `Design a high-fidelity "Magnetic Kinetic Flux" text effect. Small, glowing filings/particles continuously orbit and cluster dynamically near the paths of heavy gray letters on infinite alternate loops.`
};
