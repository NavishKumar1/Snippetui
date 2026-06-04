/**
 * Component: Cyberpunk Glitch HUD Loader
 * Category: loaders
 */

export const component = {
  id: 'cyber-glitch-loader',
  name: 'Cyberpunk Glitch HUD Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="cyber-loader-wrapper">
  <div class="cyber-hud-ring outer-ring"></div>
  <div class="cyber-hud-ring inner-ring"></div>
  <div class="cyber-hud-center">
    <span class="cyber-loading-text">LOAD</span>
    <span class="cyber-percent">00</span>
  </div>
</div>`,
  js: `// Interactive dynamic numeric increment loops
const cyberPercent = document.querySelector('.cyber-percent');
if (cyberPercent) {
  let val = 0;
  const timer = setInterval(() => {
    val = (val + Math.floor(Math.random() * 8) + 2) % 101;
    cyberPercent.textContent = val < 10 ? '0' + val : val;
  }, 180);
}`,
  ts: `// TypeScript Implementation
const cyberPercent = document.querySelector<HTMLSpanElement>('.cyber-percent');
if (cyberPercent) {
  let val = 0;
  const timer = setInterval(() => {
    val = (val + Math.floor(Math.random() * 8) + 2) % 101;
    cyberPercent.textContent = val < 10 ? '0' + val : val.toString();
  }, 180);
}`,
  css: `/* Cyberpunk Glitch HUD Loader Styles */
.cyber-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  font-family: 'Courier New', monospace;
}

.cyber-hud-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px dashed transparent;
  pointer-events: none;
}

.outer-ring {
  width: 90px;
  height: 90px;
  border-top-color: #ff007f;
  border-bottom-color: #ff007f;
  box-shadow: 0 0 10px rgba(255, 0, 127, 0.4);
  animation: cyber-spin-clockwise 3s linear infinite;
}

.inner-ring {
  width: 70px;
  height: 70px;
  border-left-color: #00f2fe;
  border-right-color: #00f2fe;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
  animation: cyber-spin-counter 2s linear infinite;
}

.cyber-hud-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 5px #00f2fe;
}

.cyber-loading-text {
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #ff007f;
  animation: cyber-text-glitch 1.5s steps(2) infinite;
}

.cyber-percent {
  font-size: 20px;
  font-weight: 900;
  color: #00f2fe;
}

@keyframes cyber-spin-clockwise {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes cyber-spin-counter {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}

@keyframes cyber-text-glitch {
  0%, 100% { opacity: 1; transform: skew(0deg); }
  20% { opacity: 0.8; transform: skew(-5deg); filter: hue-rotate(90deg); }
  40% { opacity: 1; transform: skew(5deg); }
  60% { opacity: 0.5; transform: skew(0deg); filter: blur(0.5px); }
  80% { opacity: 0.9; transform: skew(-3deg); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center font-mono">
  <div class="absolute w-[90px] h-[90px] rounded-full border-2 border-dashed border-transparent border-t-[#ff007f] border-b-[#ff007f] shadow-[0_0_10px_rgba(255,0,127,0.4)] animate-spin"></div>
  <div class="absolute w-[70px] h-[70px] rounded-full border-2 border-dashed border-transparent border-l-[#00f2fe] border-r-[#00f2fe] shadow-[0_0_10px_rgba(0,242,254,0.4)] animate-reverse-spin"></div>
</div>`,
  prompt: `Neon HUD cyberpunk ring loader. Rotating pink/cyan dashed vector lines. Inner matrix digital percentage counter increments dynamically with CRT scanning glitches.`
};
