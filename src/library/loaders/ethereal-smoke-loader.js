/**
 * Component: Ethereal Smoke Vortex Loader
 * Category: loaders
 */

export const component = {
  id: 'ethereal-smoke-loader',
  name: 'Ethereal Smoke Vortex Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="smoke-loader-wrapper">
  <div class="smoke-vortex-ring ring-1"></div>
  <div class="smoke-vortex-ring ring-2"></div>
  <div class="smoke-vortex-ring ring-3"></div>
</div>`,
  js: `// Ring scaling triggers on hover states
const smokeWrapper = document.querySelector('.smoke-loader-wrapper');
if (smokeWrapper) {
  smokeWrapper.addEventListener('mouseenter', () => {
    const rings = smokeWrapper.querySelectorAll('.smoke-vortex-ring');
    rings.forEach(ring => {
      ring.style.transform = 'scale(0.85)';
    });
  });
  smokeWrapper.addEventListener('mouseleave', () => {
    const rings = smokeWrapper.querySelectorAll('.smoke-vortex-ring');
    rings.forEach(ring => {
      ring.style.transform = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const smokeWrapper = document.querySelector<HTMLDivElement>('.smoke-loader-wrapper');
if (smokeWrapper) {
  smokeWrapper.addEventListener('mouseenter', () => {
    const rings = smokeWrapper.querySelectorAll<HTMLDivElement>('.smoke-vortex-ring');
    rings.forEach(ring => {
      ring.style.transform = 'scale(0.85)';
    });
  });
  smokeWrapper.addEventListener('mouseleave', () => {
    const rings = smokeWrapper.querySelectorAll<HTMLDivElement>('.smoke-vortex-ring');
    rings.forEach(ring => {
      ring.style.transform = '';
    });
  });
}`,
  css: `/* Ethereal Smoke Vortex Loader Styles */
.smoke-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.smoke-vortex-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
  pointer-events: none;
  mix-blend-mode: screen;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ring-1 {
  width: 90px;
  height: 90px;
  border-top-color: rgba(99, 102, 241, 0.4);
  border-bottom-color: rgba(147, 197, 253, 0.3);
  filter: blur(4px);
  animation: smoke-swirl-clockwise 2.2s ease-in-out infinite;
}

.ring-2 {
  width: 70px;
  height: 70px;
  border-left-color: rgba(138, 43, 226, 0.4);
  border-right-color: rgba(0, 242, 254, 0.3);
  filter: blur(5px);
  animation: smoke-swirl-counter 2.8s ease-in-out infinite;
}

.ring-3 {
  width: 50px;
  height: 50px;
  border-top-color: rgba(255, 0, 127, 0.35);
  border-left-color: rgba(162, 140, 255, 0.3);
  filter: blur(3px);
  animation: smoke-swirl-clockwise 1.6s ease-in-out infinite;
}

@keyframes smoke-swirl-clockwise {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes smoke-swirl-counter {
  0% { transform: rotate(360deg) scale(1); }
  50% { transform: rotate(180deg) scale(0.9); }
  100% { transform: rotate(0deg) scale(1); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="absolute w-[90px] h-[90px] rounded-full border border-indigo-500/40 blur-[4px] animate-spin"></div>
  <div class="absolute w-[70px] h-[70px] rounded-full border border-purple-500/40 blur-[5px] animate-reverse-spin"></div>
</div>`,
  prompt: `Ethereal smoke vortex loader. Concentric swirling wisps of sapphire, violet, and deep indigo organic smoke flows rotate clockwise and counter-clockwise in fluid streams.`
};
