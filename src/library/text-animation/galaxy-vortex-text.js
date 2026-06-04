/**
 * Component: Galactic Vortex Nebulae
 * Category: text-animation
 */

export const component = {
  id: 'galaxy-vortex-text',
  name: 'Galactic Vortex Nebula',
  category: 'text-animation',
  tag: '3D Orbit',
  html: `<div class="galaxy-vortex-container" style="cursor: pointer;">
  <span class="galaxy-vortex-text" data-text="GALAXY">GALAXY</span>
  <div class="galaxy-starfield"></div>
</div>`,
  js: `// Speed up spin on click
const galaxyContainer = document.querySelector('.galaxy-vortex-container');
if (galaxyContainer) {
  const text = galaxyContainer.querySelector('.galaxy-vortex-text');
  galaxyContainer.addEventListener('mousedown', () => {
    text.style.animationDuration = '1.5s';
  });
  galaxyContainer.addEventListener('mouseup', () => {
    text.style.animationDuration = '6s';
  });
}`,
  ts: `// TypeScript Implementation
const galaxyContainer = document.querySelector<HTMLDivElement>('.galaxy-vortex-container');
if (galaxyContainer) {
  const text = galaxyContainer.querySelector<HTMLSpanElement>('.galaxy-vortex-text');
  if (text) {
    galaxyContainer.addEventListener('mousedown', () => {
      text.style.animationDuration = '1.5s';
    });
    galaxyContainer.addEventListener('mouseup', () => {
      text.style.animationDuration = '6s';
    });
  }
}`,
  css: `/* Galactic Vortex Styles */
.galaxy-vortex-container {
  position: relative;
  display: inline-flex;
  padding: 30px;
  perspective: 500px;
}

.galaxy-vortex-text {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  
  /* Cosmic periwinkle per-letter gradient */
  background: linear-gradient(135deg, #ffffff 20%, #8ec5fc 60%, #e0c3fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* 3D galactic orbit loop repeating */
  animation: galaxy-vortex-spin 6s infinite linear;
  filter: drop-shadow(0 0 10px rgba(142, 197, 252, 0.45));
}

@keyframes galaxy-vortex-spin {
  0% {
    transform: rotate3d(0.5, 1, 0.2, 0deg) scale(0.95);
  }
  50% {
    transform: rotate3d(0.5, 1, 0.2, 180deg) scale(1.05);
    filter: drop-shadow(0 0 20px rgba(224, 195, 252, 0.6));
  }
  100% {
    transform: rotate3d(0.5, 1, 0.2, 360deg) scale(0.95);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex p-6 [perspective:500px] cursor-pointer">
  <span class="font-extrabold text-[36px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-br from-white via-[#8ec5fc] to-[#e0c3fc] filter drop-shadow-[0_0_10px_rgba(142,197,252,0.45)]">
    GALAXY
  </span>
</div>`,
  prompt: `Design an ultra-premium "Galactic Vortex Nebula" text effect. The periwinkle metallic typography rotates smoothly in 3D perspective around a deep space central orbit on an infinite loop, casting glowing stellar shadows.`
};
