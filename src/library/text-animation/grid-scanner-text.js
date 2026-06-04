/**
 * Component: Cyber Laser Grid Scan
 * Category: text-animation
 */

export const component = {
  id: 'grid-scanner-text',
  name: 'Cyber Grid Scan',
  category: 'text-animation',
  tag: 'Laser Grid',
  html: `<div class="grid-scanner-container" style="cursor: pointer;">
  <span class="grid-scanner-text" data-text="SCANNER">SCANNER</span>
  <div class="grid-scanner-beam"></div>
</div>`,
  js: `// Speed up scan on click
const scanContainer = document.querySelector('.grid-scanner-container');
if (scanContainer) {
  const beam = scanContainer.querySelector('.grid-scanner-beam');
  scanContainer.addEventListener('click', () => {
    beam.style.animation = 'none';
    beam.offsetHeight; // trigger reflow
    beam.style.animation = 'grid-scanner-wave 1s infinite alternate ease-in-out';
  });
}`,
  ts: `// TypeScript Implementation
const scanContainer = document.querySelector<HTMLDivElement>('.grid-scanner-container');
if (scanContainer) {
  const beam = scanContainer.querySelector<HTMLDivElement>('.grid-scanner-beam');
  if (beam) {
    scanContainer.addEventListener('click', () => {
      beam.style.animation = 'none';
      beam.offsetHeight; // trigger reflow
      beam.style.animation = 'grid-scanner-wave 1s infinite alternate ease-in-out';
    });
  }
}`,
  css: `/* Cyber Laser Grid Scan Styles */
.grid-scanner-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.grid-scanner-text {
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  
  /* Cyber matrix grid projection background inside text fill */
  background: 
    linear-gradient(rgba(0, 242, 254, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 242, 254, 0.15) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 242, 254, 0.15) 100%), #0d0d15;
  background-size: 8px 8px, 8px 8px, 100% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  filter: drop-shadow(0px 2px 8px rgba(0, 242, 254, 0.35));
  animation: grid-scanner-flicker 4s infinite linear alternate;
}

.grid-scanner-beam {
  position: absolute;
  left: 15%;
  right: 15%;
  height: 2px;
  background: #00f2fe;
  box-shadow: 0 0 10px #00f2fe, 0 0 20px #8a2be2;
  pointer-events: none;
  z-index: 10;
  
  /* Infinite horizontal scan loops */
  animation: grid-scanner-wave 2.2s infinite alternate ease-in-out;
}

@keyframes grid-scanner-wave {
  0% {
    top: 20%;
    opacity: 0.6;
  }
  100% {
    top: 80%;
    opacity: 1;
  }
}

@keyframes grid-scanner-flicker {
  0%, 100% {
    filter: drop-shadow(0px 2px 8px rgba(0, 242, 254, 0.3));
  }
  50% {
    filter: drop-shadow(0px 2px 14px rgba(0, 242, 254, 0.6));
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex items-center justify-center p-6 cursor-pointer">
  <span class="font-extrabold text-[34px] tracking-widest uppercase text-white drop-shadow-[0_2px_8px_rgba(0,242,254,0.35)]">
    SCANNER
  </span>
</div>`,
  prompt: `Design a high-end "Cyber Laser Grid Scan" text animation. The text fill consists of a custom blue cyber-matrix grid line project. A thin vertical laser beam line sweeps up and down continuously across the letters, loop repeating in a cool hacker HUD aesthetic.`
};
