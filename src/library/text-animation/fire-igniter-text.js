/**
 * Component: Volcanic Flame Igniter
 * Category: text-animation
 */

export const component = {
  id: 'fire-igniter-text',
  name: 'Volcanic Flame Igniter',
  category: 'text-animation',
  tag: 'Fire',
  html: `<div class="fire-igniter-container" style="cursor: pointer;">
  <span class="fire-igniter-text">IGNITE</span>
  <div class="fire-flicker-overlay"></div>
</div>`,
  js: `// Speed up flicker on click
const fireContainer = document.querySelector('.fire-igniter-container');
if (fireContainer) {
  const text = fireContainer.querySelector('.fire-igniter-text');
  fireContainer.addEventListener('mousedown', () => {
    text.style.animationDuration = '0.3s';
  });
  fireContainer.addEventListener('mouseup', () => {
    text.style.animationDuration = '0.9s';
  });
}`,
  ts: `// TypeScript Implementation
const fireContainer = document.querySelector<HTMLDivElement>('.fire-igniter-container');
if (fireContainer) {
  const text = fireContainer.querySelector<HTMLSpanElement>('.fire-igniter-text');
  if (text) {
    fireContainer.addEventListener('mousedown', () => {
      text.style.animationDuration = '0.3s';
    });
    fireContainer.addEventListener('mouseup', () => {
      text.style.animationDuration = '0.9s';
    });
  }
}`,
  css: `/* Volcanic Flame Igniter CSS */
.fire-igniter-container {
  position: relative;
  display: inline-flex;
  padding: 24px;
}

.fire-igniter-text {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffffff;
  
  /* Fire heat glow shadow */
  text-shadow: 
    0 0 4px #ffffff,
    0 -4px 8px #ffcc00,
    2px -8px 12px #ff6600,
    -2px -15px 20px #ff0000;
  
  /* Constant fire flicker loop */
  animation: fire-igniter-flicker 0.9s infinite alternate ease-in-out;
}

@keyframes fire-igniter-flicker {
  0% {
    text-shadow: 
      0 0 4px #ffffff,
      0 -4px 8px #ffcc00,
      2px -8px 12px #ff6600,
      -2px -15px 20px #ff0000;
    transform: skewX(-0.5deg) scale(0.98);
  }
  50% {
    text-shadow: 
      0 0 3px #ffffff,
      1px -6px 10px #ffcc00,
      -1px -10px 14px #ff6600,
      2px -18px 24px #ff0000;
    transform: skewX(0.5deg) scale(1.01);
  }
  100% {
    text-shadow: 
      0 0 5px #ffffff,
      -1px -3px 6px #ffcc00,
      2px -7px 11px #ff6600,
      -2px -13px 18px #ff0000;
    transform: skewX(0deg) scale(0.99);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex p-6 cursor-pointer">
  <span class="font-black text-[36px] uppercase tracking-widest text-white drop-shadow-[0_0_12px_#ff6600]">
    IGNITE
  </span>
</div>`,
  prompt: `Design a high-fidelity "Volcanic Flame Igniter" text effect. The bold white letters flickers and sway dynamically on infinite loop cycles, casting realistic glowing red, orange and yellow fire outlines that rise behind the text.`
};
