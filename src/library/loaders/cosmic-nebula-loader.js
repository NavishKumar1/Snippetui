/**
 * Component: Cosmic Nebula Portal Ring Loader
 * Category: loaders
 */

export const component = {
  id: 'cosmic-nebula-loader',
  name: 'Cosmic Nebula Portal Ring',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="nebula-loader-wrapper">
  <div class="nebula-cloud"></div>
  <div class="nebula-ring outer-ring"></div>
  <div class="nebula-ring inner-ring"></div>
</div>`,
  js: `// Double rotation speed on hover states
const nebulaWrapper = document.querySelector('.nebula-loader-wrapper');
if (nebulaWrapper) {
  nebulaWrapper.addEventListener('mouseenter', () => {
    const rings = nebulaWrapper.querySelectorAll('.nebula-ring');
    rings.forEach(ring => {
      ring.style.animationDuration = '1s';
    });
  });
  
  nebulaWrapper.addEventListener('mouseleave', () => {
    const rings = nebulaWrapper.querySelectorAll('.nebula-ring');
    rings.forEach(ring => {
      ring.style.animationDuration = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const nebulaWrapper = document.querySelector<HTMLDivElement>('.nebula-loader-wrapper');
if (nebulaWrapper) {
  nebulaWrapper.addEventListener('mouseenter', () => {
    const rings = nebulaWrapper.querySelectorAll<HTMLDivElement>('.nebula-ring');
    rings.forEach(ring => {
      ring.style.animationDuration = '1s';
    });
  });
  
  nebulaWrapper.addEventListener('mouseleave', () => {
    const rings = nebulaWrapper.querySelectorAll<HTMLDivElement>('.nebula-ring');
    rings.forEach(ring => {
      ring.style.animationDuration = '';
    });
  });
}`,
  css: `/* Cosmic Nebula Portal Ring Loader Styles */
.nebula-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nebula-cloud {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, rgba(162, 140, 255, 0.4) 0%, rgba(0, 242, 254, 0.2) 60%, transparent 100%);
  filter: blur(8px);
  z-index: 1;
  animation: nebula-cloud-pulse 4s ease-in-out infinite alternate;
}

.nebula-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid transparent;
  pointer-events: none;
  z-index: 2;
}

.outer-ring {
  width: 80px;
  height: 80px;
  border-top-color: rgba(162, 140, 255, 0.4);
  border-bottom-color: rgba(162, 140, 255, 0.4);
  box-shadow: 0 0 10px rgba(162, 140, 255, 0.2);
  animation: nebula-spin-clockwise 3s linear infinite;
}

.inner-ring {
  width: 60px;
  height: 60px;
  border-left-color: rgba(0, 242, 254, 0.4);
  border-right-color: rgba(0, 242, 254, 0.4);
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
  animation: nebula-spin-counter 2s linear infinite;
}

@keyframes nebula-cloud-pulse {
  0% { transform: scale(0.85); opacity: 0.6; }
  100% { transform: scale(1.15); opacity: 1; }
}

@keyframes nebula-spin-clockwise {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes nebula-spin-counter {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="absolute w-[80px] h-[80px] rounded-full border border-purple-500/20 animate-spin"></div>
  <div class="absolute w-[60px] h-[60px] rounded-full border border-cyan-400/20 animate-reverse-spin"></div>
</div>`,
  prompt: `Celestial nebula loader portal. Renders shifting violet-blue interstellar clouds enclosed inside concentric glowing coordinates rings spinning in alternate axes.`
};
