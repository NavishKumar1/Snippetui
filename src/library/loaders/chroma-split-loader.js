/**
 * Component: Chromatic Aberration Split Loader
 * Category: loaders
 */

export const component = {
  id: 'chroma-split-loader',
  name: 'Chromatic Aberration Split Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="chroma-loader-wrapper">
  <div class="chroma-spinner chroma-r"></div>
  <div class="chroma-spinner chroma-g"></div>
  <div class="chroma-spinner chroma-b"></div>
</div>`,
  js: `// Double the rotation speed on mouse hover
const chromaWrapper = document.querySelector('.chroma-loader-wrapper');
if (chromaWrapper) {
  const spinners = chromaWrapper.querySelectorAll('.chroma-spinner');
  
  chromaWrapper.addEventListener('mouseenter', () => {
    spinners.forEach(spin => {
      spin.style.animationDuration = '0.5s';
    });
  });
  
  chromaWrapper.addEventListener('mouseleave', () => {
    spinners.forEach(spin => {
      spin.style.animationDuration = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const chromaWrapper = document.querySelector<HTMLDivElement>('.chroma-loader-wrapper');
if (chromaWrapper) {
  const spinners = chromaWrapper.querySelectorAll<HTMLDivElement>('.chroma-spinner');
  
  chromaWrapper.addEventListener('mouseenter', () => {
    spinners.forEach(spin => {
      spin.style.animationDuration = '0.5s';
    });
  });
  
  chromaWrapper.addEventListener('mouseleave', () => {
    spinners.forEach(spin => {
      spin.style.animationDuration = '';
    });
  });
}`,
  css: `/* Chromatic Aberration Split Loader Styles */
.chroma-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  mix-blend-mode: screen;
}

.chroma-spinner {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 4px solid transparent;
  border-radius: 50%;
  animation: chroma-spin-offset 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.chroma-r {
  border-top-color: #ff007f;
  box-shadow: 0 0 10px rgba(255, 0, 127, 0.4);
  transform: translate3d(-2px, -1px, 0);
  animation-delay: 0s;
}

.chroma-g {
  border-top-color: #00ffd0;
  box-shadow: 0 0 10px rgba(0, 255, 208, 0.4);
  transform: translate3d(2px, 1px, 0);
  animation-delay: 0.1s;
}

.chroma-b {
  border-top-color: #ffd700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
  transform: translate3d(0, 2px, 0);
  animation-delay: 0.2s;
}

@keyframes chroma-spin-offset {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.15); }
  100% { transform: rotate(360deg) scale(1); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="absolute w-[50px] h-[50px] rounded-full border-4 border-transparent border-t-[#ff007f] shadow-[0_0_10px_rgba(255,0,127,0.4)] animate-spin"></div>
</div>`,
  prompt: `Chromatic split ring loader. Rotating technological spinner split into red, cyan, and yellow chromatic aberration offset channels on fast active spins.`
};
