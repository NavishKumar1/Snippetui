/**
 * Component: Cyberpunk Glitch Scan Button
 * Category: buttons
 */

export const component = {
  id: 'cyber-glitch-btn',
  name: 'Cyberpunk Glitch Scan',
  category: 'buttons',
  tag: 'Glitch',
  html: `<button class="cyber-glitch-button" data-text="TERMINATE">
  <span class="cyber-glitch-line"></span>
  <span class="cyber-glitch-label">TERMINATE</span>
</button>`,
  js: `// Trigger instant audio-click glitch on hover
const cyberBtn = document.querySelector('.cyber-glitch-button');
if (cyberBtn) {
  cyberBtn.addEventListener('click', () => {
    cyberBtn.style.animation = 'none';
    cyberBtn.offsetHeight; // trigger reflow
    cyberBtn.style.animation = 'cyber-button-shake 0.3s linear';
  });
}`,
  ts: `// TypeScript Implementation
const cyberBtn = document.querySelector<HTMLButtonElement>('.cyber-glitch-button');
if (cyberBtn) {
  cyberBtn.addEventListener('click', () => {
    cyberBtn.style.animation = 'none';
    cyberBtn.offsetHeight; // trigger reflow
    cyberBtn.style.animation = 'cyber-button-shake 0.3s linear';
  });
}`,
  css: `/* Cyberpunk Glitch Button Styles */
.cyber-glitch-button {
  background: transparent;
  border: 1px solid #ff007f;
  padding: 14px 32px;
  border-radius: 4px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(255, 0, 127, 0.2);
  transition: all 0.2s ease;
}

.cyber-glitch-label {
  position: relative;
  z-index: 5;
}

.cyber-glitch-button::before {
  content: 'TERMINATE';
  position: absolute;
  inset: 0;
  background: #ff007f;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 2;
}

/* Glowing green scan line */
.cyber-glitch-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #00f2fe;
  box-shadow: 0 0 10px #00f2fe;
  top: -10px;
  opacity: 0;
  z-index: 10;
}

.cyber-glitch-button:hover {
  border-color: #00f2fe;
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
}

.cyber-glitch-button:hover::before {
  transform: translateY(0);
}

.cyber-glitch-button:hover .cyber-glitch-line {
  animation: cyber-scan-loop 1.5s infinite linear;
}

@keyframes cyber-scan-loop {
  0% {
    top: 0%;
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@keyframes cyber-button-shake {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-3px, 2px); }
  40% { transform: translate(3px, -2px) skewX(2deg); }
  60% { transform: translate(-2px, -2px) skewX(-2deg); }
  80% { transform: translate(2px, 1px); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="bg-transparent border border-[#ff007f] px-8 py-3.5 rounded text-white font-bold text-xs tracking-[0.15em] cursor-pointer hover:border-[#00f2fe] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all duration-300">
  TERMINATE
</button>`,
  prompt: `Design a premium "Cyberpunk Glitch Scan Button" component. A rectangular digital border button glows in hot-pink and cyan. Hovering triggers a vertical green scan line traversing the face while a satisfying, instant coordinate glitch shake triggers upon click.`
};
