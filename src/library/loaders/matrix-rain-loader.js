/**
 * Component: Matrix Rain Stream Loader
 * Category: loaders
 */

export const component = {
  id: 'matrix-rain-loader',
  name: 'Matrix Rain Stream Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="matrix-loader-wrapper">
  <div class="matrix-stream stream-1" style="--left: 15%; --delay: 0s; --speed: 1.8s;"></div>
  <div class="matrix-stream stream-2" style="--left: 35%; --delay: 0.6s; --speed: 2.4s;"></div>
  <div class="matrix-stream stream-3" style="--left: 55%; --delay: 1.2s; --speed: 1.5s;"></div>
  <div class="matrix-stream stream-4" style="--left: 75%; --delay: 0.3s; --speed: 2.1s;"></div>
  <div class="matrix-stream stream-5" style="--left: 95%; --delay: 0.9s; --speed: 1.7s;"></div>
</div>`,
  js: `// Interaction trigger to speed up falling drops on click
const matrixWrapper = document.querySelector('.matrix-loader-wrapper');
if (matrixWrapper) {
  matrixWrapper.addEventListener('click', () => {
    const streams = matrixWrapper.querySelectorAll('.matrix-stream');
    streams.forEach(stream => {
      stream.style.setProperty('--speed', '0.6s');
      setTimeout(() => {
        stream.style.removeProperty('--speed');
      }, 1800);
    });
  });
}`,
  ts: `// TypeScript Implementation
const matrixWrapper = document.querySelector<HTMLDivElement>('.matrix-loader-wrapper');
if (matrixWrapper) {
  matrixWrapper.addEventListener('click', () => {
    const streams = matrixWrapper.querySelectorAll<HTMLDivElement>('.matrix-stream');
    streams.forEach(stream => {
      stream.style.setProperty('--speed', '0.6s');
      setTimeout(() => {
        stream.style.removeProperty('--speed');
      }, 1800);
    });
  });
}`,
  css: `/* Matrix Rain Stream Loader Styles */
.matrix-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  border: 1px solid rgba(0, 255, 65, 0.12);
  background: #010502;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.7),
    inset 0 0 10px rgba(0, 255, 65, 0.05);
  cursor: pointer;
}

.matrix-stream {
  position: absolute;
  top: -100%;
  left: var(--left);
  width: 1.5px;
  height: 80px;
  background: linear-gradient(180deg, #00ff41 0%, rgba(0, 255, 65, 0.2) 60%, transparent 100%);
  filter: drop-shadow(0 0 4px #00ff41);
  opacity: 0.85;
  animation: matrix-stream-fall var(--speed) linear infinite;
  animation-delay: var(--delay);
}

@keyframes matrix-stream-fall {
  0% { top: -100%; }
  100% { top: 100%; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] border border-green-500/20 bg-black rounded-lg overflow-hidden flex items-center justify-center">
  <div class="absolute w-[1.5px] h-20 bg-gradient-to-b from-[#00ff41] to-transparent shadow-[0_0_4px_#00ff41] animate-bounce"></div>
</div>`,
  prompt: `Hacker digital green matrix rain loader. Staggered code binary streams cascade down from the ceiling of an obsidian green chamber.`
};
