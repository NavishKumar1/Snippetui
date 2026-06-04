/**
 * Component: Bioluminescent Synapse Impulse Loader
 * Category: loaders
 */

export const component = {
  id: 'biolume-synapse-loader',
  name: 'Bioluminescent Synapse Impulse',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="synapse-loader-wrapper">
  <div class="synapse-nodes">
    <span class="syn-node node-left"></span>
    <span class="syn-node node-right"></span>
  </div>
  <div class="synapse-channel">
    <span class="synapse-charge charge-left"></span>
    <span class="synapse-charge charge-right"></span>
  </div>
</div>`,
  js: `// Double synapse pulse speed on click trigger
const synapseWrapper = document.querySelector('.synapse-loader-wrapper');
if (synapseWrapper) {
  synapseWrapper.addEventListener('click', () => {
    const charges = synapseWrapper.querySelectorAll('.synapse-charge');
    charges.forEach(charge => {
      charge.style.animationDuration = '0.5s';
      setTimeout(() => {
        charge.style.animationDuration = '';
      }, 2000);
    });
  });
}`,
  ts: `// TypeScript Implementation
const synapseWrapper = document.querySelector<HTMLDivElement>('.synapse-loader-wrapper');
if (synapseWrapper) {
  synapseWrapper.addEventListener('click', () => {
    const charges = synapseWrapper.querySelectorAll<HTMLSpanElement>('.synapse-charge');
    charges.forEach(charge => {
      charge.style.animationDuration = '0.5s';
      setTimeout(() => {
        charge.style.animationDuration = '';
      }, 2000);
    });
  });
}`,
  css: `/* Bioluminescent Synapse Impulse Loader Styles */
.synapse-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.synapse-nodes {
  position: absolute;
  width: 74px;
  display: flex;
  justify-content: space-between;
  z-index: 3;
}

.syn-node {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle, #e6fff2 0%, #00ffd0 60%, transparent 100%);
  box-shadow: 
    0 0 8px #00ffd0,
    0 0 16px rgba(0, 255, 208, 0.7);
  animation: node-flash-breathing 1.2s ease-in-out infinite alternate;
}

.node-right { animation-delay: 0.6s; }

.synapse-channel {
  position: absolute;
  width: 62px;
  height: 1.5px;
  background: rgba(0, 255, 208, 0.15);
  display: flex;
  align-items: center;
  z-index: 1;
}

.synapse-charge {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 8px #00ffd0, 0 0 16px #00ffd0;
  opacity: 0;
}

.charge-left { animation: synapse-shoot-left 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) infinite; }
.charge-right { animation: synapse-shoot-right 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) infinite; animation-delay: 0.6s; }

@keyframes node-flash-breathing {
  0% { transform: scale(0.9); opacity: 0.7; }
  100% { transform: scale(1.2); opacity: 1; }
}

@keyframes synapse-shoot-left {
  0% { left: 0; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

@keyframes synapse-shoot-right {
  0% { right: 0; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { right: 100%; opacity: 0; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center cursor-pointer">
  <div class="w-[74px] flex justify-between">
    <div class="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#00ffd0] animate-pulse"></div>
    <div class="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#00ffd0] animate-pulse [animation-delay:0.6s]"></div>
  </div>
</div>`,
  prompt: `Organic synaptic neural impulse loader. Twin bioluminescent teal synapse nodes fire electric impulse charge sparks back-and-forth along a fiber path.`
};
