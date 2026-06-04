/**
 * Component: Glitch Ghost Cyber Echo
 * Category: text-animation
 */

export const component = {
  id: 'cyber-echo-text',
  name: 'Glitch Ghost Cyber Echo',
  category: 'text-animation',
  tag: 'Echo',
  html: `<div class="cyber-echo-container">
  <span class="cyber-echo-main" data-text="CYBER ECHO">CYBER ECHO</span>
</div>`,
  js: `// Dynamically intensify echo trails on hover
const echoContainer = document.querySelector('.cyber-echo-container');
if (echoContainer) {
  echoContainer.addEventListener('mouseenter', () => {
    const mainText = echoContainer.querySelector('.cyber-echo-main');
    if (mainText) {
      mainText.style.setProperty('--echo-speed', '0.5s');
      mainText.style.setProperty('--echo-spread', '1.5');
    }
  });
  echoContainer.addEventListener('mouseleave', () => {
    const mainText = echoContainer.querySelector('.cyber-echo-main');
    if (mainText) {
      mainText.style.setProperty('--echo-speed', '1.5s');
      mainText.style.setProperty('--echo-spread', '1');
    }
  });
}`,
  ts: `// TypeScript Implementation
const echoContainer = document.querySelector<HTMLDivElement>('.cyber-echo-container');
if (echoContainer) {
  echoContainer.addEventListener('mouseenter', () => {
    const mainText = echoContainer.querySelector<HTMLSpanElement>('.cyber-echo-main');
    if (mainText) {
      mainText.style.setProperty('--echo-speed', '0.5s');
      mainText.style.setProperty('--echo-spread', '1.5');
    }
  });
  echoContainer.addEventListener('mouseleave', () => {
    const mainText = echoContainer.querySelector<HTMLSpanElement>('.cyber-echo-main');
    if (mainText) {
      mainText.style.setProperty('--echo-speed', '1.5s');
      mainText.style.setProperty('--echo-spread', '1');
    }
  });
}`,
  css: `/* Glitch Ghost Cyber Echo Styles */
.cyber-echo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: pointer;
}

.cyber-echo-main {
  --echo-speed: 1.5s;
  --echo-spread: 1;
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffffff;
  position: relative;
  user-select: none;
  
  /* Text Shadow Base */
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
}

.cyber-echo-main::before,
.cyber-echo-main::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.45;
  background: transparent;
  pointer-events: none;
}

/* Red offset ghost echo */
.cyber-echo-main::before {
  color: #ff007f;
  animation: cyber-ghost-trail-left var(--echo-speed) infinite alternate ease-in-out;
  z-index: -1;
}

/* Cyan offset ghost echo */
.cyber-echo-main::after {
  color: #00f2fe;
  animation: cyber-ghost-trail-right var(--echo-speed) infinite alternate ease-in-out;
  z-index: -2;
}

@keyframes cyber-ghost-trail-left {
  0% {
    transform: translateX(0) scale(1);
    filter: blur(0.5px);
    opacity: 0.2;
  }
  100% {
    transform: translateX(calc(-10px * var(--echo-spread))) scale(1.02);
    filter: blur(2px);
    opacity: 0.55;
  }
}

@keyframes cyber-ghost-trail-right {
  0% {
    transform: translateX(0) scale(1);
    filter: blur(0.5px);
    opacity: 0.2;
  }
  100% {
    transform: translateX(calc(10px * var(--echo-spread))) scale(1.02);
    filter: blur(2px);
    opacity: 0.55;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex items-center justify-center p-6 cursor-pointer">
  <span class="font-extrabold text-[34px] tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">
    CYBER ECHO
  </span>
</div>`,
  prompt: `Design a high-end "Glitch Ghost Cyber Echo" typography animation. Text is bold white sans-serif. Multi-layered cyan and hot-pink ghost echo layers slide horizontally left and right on alternate cycles, leaving trailing glowing glass offsets that fade and blur gracefully.`
};
