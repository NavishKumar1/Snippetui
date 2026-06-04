/**
 * Component: Bioluminescent Neural Pulse Loader
 * Category: loaders
 */

export const component = {
  id: 'biolume-neural-loader',
  name: 'Bioluminescent Neural Pulse Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="neural-loader-wrapper">
  <div class="neural-node node-center"></div>
  <div class="neural-node node-orbit orbit-a" style="--angle: 0deg;"></div>
  <div class="neural-node node-orbit orbit-b" style="--angle: 120deg;"></div>
  <div class="neural-node node-orbit orbit-c" style="--angle: 240deg;"></div>
  <div class="neural-synapse-lines">
    <span class="syn-line line-a"></span>
    <span class="syn-line line-b"></span>
    <span class="syn-line line-c"></span>
  </div>
</div>`,
  js: `// Neural node flashing acceleration on click
const nodeCenter = document.querySelector('.node-center');
if (nodeCenter) {
  nodeCenter.addEventListener('click', () => {
    const parent = nodeCenter.parentElement;
    const lines = parent.querySelectorAll('.syn-line');
    
    lines.forEach(line => {
      line.style.animationDuration = '0.3s';
      setTimeout(() => line.style.animationDuration = '', 1500);
    });
  });
}`,
  ts: `// TypeScript Implementation
const nodeCenter = document.querySelector<HTMLDivElement>('.node-center');
if (nodeCenter) {
  nodeCenter.addEventListener('click', () => {
    const parent = nodeCenter.parentElement;
    if (parent) {
      const lines = parent.querySelectorAll<HTMLSpanElement>('.syn-line');
      
      lines.forEach(line => {
        line.style.animationDuration = '0.3s';
        setTimeout(() => line.style.animationDuration = '', 1500);
      });
    }
  });
}`,
  css: `/* Bioluminescent Neural Pulse Loader Styles */
.neural-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.neural-node {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, #e6fffa 0%, #00fa9a 60%, transparent 100%);
  box-shadow: 
    0 0 8px #00fa9a,
    0 0 16px rgba(0, 250, 154, 0.6);
  z-index: 3;
}

.node-center {
  width: 16px;
  height: 16px;
  cursor: pointer;
  animation: neural-pulse-center 1.6s ease-in-out infinite alternate;
}

.node-orbit {
  width: 10px;
  height: 10px;
  animation: neural-orbit-node 3.5s linear infinite;
}

.orbit-a { --delay: 0s; }
.orbit-b { --delay: 1.16s; }
.orbit-c { --delay: 2.32s; }

.neural-synapse-lines {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.syn-line {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 1.5px;
  background: linear-gradient(90deg, #00fa9a 0%, transparent 100%);
  transform-origin: left center;
  opacity: 0.15;
}

.line-a { transform: rotate(0deg); width: 34px; animation: synapse-spark 1.16s linear infinite; }
.line-b { transform: rotate(120deg); width: 34px; animation: synapse-spark 1.16s linear infinite; animation-delay: 0.38s; }
.line-c { transform: rotate(240deg); width: 34px; animation: synapse-spark 1.16s linear infinite; animation-delay: 0.77s; }

@keyframes neural-pulse-center {
  0% { transform: scale(0.9); filter: brightness(1); }
  100% { transform: scale(1.25); filter: brightness(1.3); }
}

@keyframes neural-orbit-node {
  0% { transform: rotate(var(--angle)) translate(34px) rotate(0deg); }
  100% { transform: rotate(calc(var(--angle) + 360deg)) translate(34px) rotate(-360deg); }
}

@keyframes synapse-spark {
  0% { opacity: 0.15; background: linear-gradient(90deg, #00fa9a 0%, transparent 100%); }
  50% { opacity: 0.95; background: linear-gradient(90deg, #ffffff 30%, #00fa9a 100%); }
  100% { opacity: 0.15; background: linear-gradient(90deg, #00fa9a 0%, transparent 100%); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="w-4 h-4 rounded-full bg-gradient-to-r from-teal-200 to-emerald-400 shadow-[0_0_8px_#00fa9a] z-10 cursor-pointer animate-ping"></div>
</div>`,
  prompt: `Organic neural synaptic network loader. Glowing neural core fires bright green synapse electric signals outwards towards three orbiting nerve cells.`
};
