/**
 * Component: Starlight Supernova Blast Glow
 * Category: text-animation
 */

export const component = {
  id: 'supernova-blast-text',
  name: 'Supernova Blast Glow',
  category: 'text-animation',
  tag: 'Extreme',
  html: `<div class="supernova-container" style="cursor: pointer;">
  <span class="supernova-text">SUPERNOVA</span>
  <div class="supernova-blast-wave"></div>
</div>`,
  js: `// Speed up supernova flash on click
const supernovaContainer = document.querySelector('.supernova-container');
if (supernovaContainer) {
  const wave = supernovaContainer.querySelector('.supernova-blast-wave');
  supernovaContainer.addEventListener('click', () => {
    wave.style.animation = 'none';
    wave.offsetHeight; // trigger reflow
    wave.style.animation = 'supernova-ring-wave 0.8s ease-out infinite';
  });
}`,
  ts: `// TypeScript Implementation
const supernovaContainer = document.querySelector<HTMLDivElement>('.supernova-container');
if (supernovaContainer) {
  const wave = supernovaContainer.querySelector<HTMLDivElement>('.supernova-blast-wave');
  if (wave) {
    supernovaContainer.addEventListener('click', () => {
      wave.style.animation = 'none';
      wave.offsetHeight; // trigger reflow
      wave.style.animation = 'supernova-ring-wave 0.8s ease-out infinite';
    });
  }
}`,
  css: `/* Starlight Supernova Blast Styles */
.supernova-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.supernova-text {
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  
  /* Reflective high-end solar flare gradient */
  background: radial-gradient(circle, #ffffff 10%, #ffe875 50%, #ff8c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Infinite pulse solar heat rays */
  animation: supernova-solar-pulse 2.2s infinite alternate ease-in-out;
  z-index: 5;
}

.supernova-blast-wave {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #ffe875;
  background: transparent;
  box-shadow: 0 0 15px #ff8c00, inset 0 0 15px #ff5100;
  pointer-events: none;
  z-index: 2;
  
  /* Infinite blast wave expansion loops */
  animation: supernova-ring-wave 2.2s infinite ease-out;
}

@keyframes supernova-solar-pulse {
  0% {
    filter: brightness(0.9) drop-shadow(0 0 5px rgba(255, 140, 0, 0.4));
    transform: scale(0.98);
  }
  100% {
    filter: brightness(1.2) drop-shadow(0 0 20px rgba(255, 232, 117, 0.85));
    transform: scale(1.02);
  }
}

@keyframes supernova-ring-wave {
  0% {
    width: 10px;
    height: 10px;
    opacity: 1;
    filter: blur(1px);
  }
  70% {
    opacity: 0.85;
  }
  100% {
    width: 260px;
    height: 120px;
    opacity: 0;
    filter: blur(8px);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex items-center justify-center p-[30px] cursor-pointer">
  <span class="font-extrabold text-[34px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-[#ffe875] to-[#ff8c00] filter drop-shadow-[0_0_15px_#ff8c00] animate-pulse">
    SUPERNOVA
  </span>
</div>`,
  prompt: `Design an epic "Starlight Supernova Blast Glow" text animation. Highly detailed white-yellow star-core lettering pulses actively while circular shockwave blast rings expand rapidly outwards from the center of the typography, repeating infinitely.`
};
