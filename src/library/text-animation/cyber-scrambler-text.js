/**
 * Component: Cyber Glitch Scrambler
 * Category: text-animation
 */

export const component = {
  id: 'cyber-scrambler-text',
  name: 'Cyber Glitch Scrambler',
  category: 'text-animation',
  tag: 'Glitch',
  html: `<div class="cyber-scrambler-container" style="cursor: pointer;">
  <span class="cyber-scrambler-text" data-text="SYSTEM HALT">SYSTEM HALT</span>
</div>`,
  js: `// Speed up glitching on click
const scramblerContainer = document.querySelector('.cyber-scrambler-container');
if (scramblerContainer) {
  const text = scramblerContainer.querySelector('.cyber-scrambler-text');
  scramblerContainer.addEventListener('click', () => {
    text.style.animation = 'none';
    text.offsetHeight; // trigger reflow
    text.style.animation = 'cyber-scrambler-glitch 0.4s infinite alternate';
  });
}`,
  ts: `// TypeScript Implementation
const scramblerContainer = document.querySelector<HTMLDivElement>('.cyber-scrambler-container');
if (scramblerContainer) {
  const text = scramblerContainer.querySelector<HTMLSpanElement>('.cyber-scrambler-text');
  if (text) {
    scramblerContainer.addEventListener('click', () => {
      text.style.animation = 'none';
      text.offsetHeight; // trigger reflow
      text.style.animation = 'cyber-scrambler-glitch 0.4s infinite alternate';
    });
  }
}`,
  css: `/* Cyber Scrambler Glitch Styles */
.cyber-scrambler-container {
  position: relative;
  display: inline-flex;
  padding: 24px;
}

.cyber-scrambler-text {
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  letter-spacing: 0.06em;
  color: #ffffff;
  position: relative;
  text-transform: uppercase;
  text-shadow: 
    0.05em 0 0 rgba(255, 0, 80, 0.75), 
    -0.05em -0.025em 0 rgba(0, 242, 254, 0.75);
  
  /* Continuous segment glitching loop */
  animation: cyber-scrambler-glitch 1.2s infinite alternate ease-in-out;
}

@keyframes cyber-scrambler-glitch {
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 80, 0.75), -0.05em -0.025em 0 rgba(0, 242, 254, 0.75);
    transform: skewX(-2deg);
  }
  20% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 80, 0.75), 0.025em 0.025em 0 rgba(0, 242, 254, 0.75);
    transform: skewX(2deg);
  }
  40% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 80, 0.75), 0.05em 0 0 rgba(0, 242, 254, 0.75);
    transform: skewY(-1deg);
  }
  60% {
    text-shadow: -0.025em 0 0 rgba(255, 0, 80, 0.75), -0.025em -0.025em 0 rgba(0, 242, 254, 0.75);
    transform: skewY(1deg);
  }
  80% {
    text-shadow: 0.05em 0.025em 0 rgba(255, 0, 80, 0.75), -0.05em 0 0 rgba(0, 242, 254, 0.75);
    transform: scale(0.98);
  }
  100% {
    text-shadow: -0.025em -0.05em 0 rgba(255, 0, 80, 0.75), 0.025em -0.025em 0 rgba(0, 242, 254, 0.75);
    transform: scale(1.02);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex p-6 cursor-pointer">
  <span class="font-extrabold text-[34px] tracking-widest uppercase text-white drop-shadow-[0_0_8px_rgba(255,0,80,0.5)] animate-pulse">
    SYSTEM HALT
  </span>
</div>`,
  prompt: `Design a high-fidelity "Cyber Glitch Scrambler" text effect. The clean sans-serif white text constantly skews, glitches and shifts segments horizontally, flashing red-hot pink and cyan outlines dynamically, loop repeating infinitely.`
};
