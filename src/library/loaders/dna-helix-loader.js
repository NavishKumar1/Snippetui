/**
 * Component: DNA Helix Rotation Loader
 * Category: loaders
 */

export const component = {
  id: 'dna-helix-loader',
  name: 'DNA Helix Rotation Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="dna-loader-wrapper">
  <div class="dna-helix-node node-1" style="--delay: 0s; --y-offset: -30px;"></div>
  <div class="dna-helix-node node-2" style="--delay: 0.2s; --y-offset: -15px;"></div>
  <div class="dna-helix-node node-3" style="--delay: 0.4s; --y-offset: 0px;"></div>
  <div class="dna-helix-node node-4" style="--delay: 0.6s; --y-offset: 15px;"></div>
  <div class="dna-helix-node node-5" style="--delay: 0.8s; --y-offset: 30px;"></div>
</div>`,
  js: `// Double helix interactivity triggers hover expansions
const dnaNodes = document.querySelectorAll('.dna-helix-node');
dnaNodes.forEach(node => {
  node.addEventListener('mouseenter', () => {
    node.style.transform = 'scale(1.5)';
  });
  node.addEventListener('mouseleave', () => {
    node.style.transform = 'none';
  });
});`,
  ts: `// TypeScript Implementation
const dnaNodes = document.querySelectorAll<HTMLDivElement>('.dna-helix-node');
dnaNodes.forEach(node => {
  node.addEventListener('mouseenter', () => {
    node.style.transform = 'scale(1.5)';
  });
  node.addEventListener('mouseleave', () => {
    node.style.transform = 'none';
  });
});`,
  css: `/* DNA Helix Rotation Loader Styles */
.dna-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dna-helix-node {
  position: relative;
  width: 50px;
  height: 6px;
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: auto;
  transition: transform 0.2s ease;
}

.dna-helix-node::before,
.dna-helix-node::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
}

/* Interlaced connecting base bar */
.dna-helix-node::before {
  left: 0;
  background: #00f2fe;
  box-shadow: 0 0 8px #00f2fe;
  animation: dna-strand-spin 1.8s ease-in-out infinite;
  animation-delay: var(--delay);
}

.dna-helix-node::after {
  right: 0;
  background: #a28cff;
  box-shadow: 0 0 8px #a28cff;
  animation: dna-strand-spin-reverse 1.8s ease-in-out infinite;
  animation-delay: var(--delay);
}

/* Bridge connector line */
.dna-helix-node::before {
  content: '';
  left: 0;
  width: 100%;
  height: 1.5px;
  background: linear-gradient(90deg, rgba(0, 242, 254, 0.4) 0%, rgba(162, 140, 255, 0.4) 100%);
  animation: dna-bridge-spin 1.8s ease-in-out infinite;
  animation-delay: var(--delay);
  z-index: -1;
}

@keyframes dna-strand-spin {
  0% { transform: scale(1) translateX(0); z-index: 2; }
  25% { transform: scale(1.3) translateX(25px); }
  50% { transform: scale(1) translateX(50px); z-index: 1; }
  75% { transform: scale(0.7) translateX(25px); }
  100% { transform: scale(1) translateX(0); z-index: 2; }
}

@keyframes dna-strand-spin-reverse {
  0% { transform: scale(1) translateX(0); z-index: 1; }
  25% { transform: scale(0.7) translateX(-25px); }
  50% { transform: scale(1) translateX(-50px); z-index: 2; }
  75% { transform: scale(1.3) translateX(-25px); }
  100% { transform: scale(1) translateX(0); z-index: 1; }
}

@keyframes dna-bridge-spin {
  0%, 100% { transform: scaleX(1); opacity: 0.8; }
  25%, 75% { transform: scaleX(0); opacity: 0.1; }
  50% { transform: scaleX(1); opacity: 0.8; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex flex-col items-center justify-center">
  <div class="relative w-[50px] h-1.5 my-1 flex justify-between items-center">
    <div class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan] animate-pulse"></div>
    <div class="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_indigo] animate-pulse"></div>
  </div>
</div>`,
  prompt: `3D perspective rotating DNA double-helix loader. Cyan and violet node strings spin, crossing over each other seamlessly, connected by thin luminous bar threads.`
};
