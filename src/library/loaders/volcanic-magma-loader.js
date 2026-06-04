/**
 * Component: Volcanic Magma Ring Loader
 * Category: loaders
 */

export const component = {
  id: 'volcanic-magma-loader',
  name: 'Volcanic Magma Ring Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="magma-loader-wrapper">
  <div class="magma-rock-ring">
    <span class="magma-bubble bub-1"></span>
    <span class="magma-bubble bub-2"></span>
    <span class="magma-bubble bub-3"></span>
  </div>
</div>`,
  js: `// Ring rotation acceleration on hover
const magmaRock = document.querySelector('.magma-rock-ring');
if (magmaRock) {
  magmaRock.addEventListener('mouseenter', () => {
    magmaRock.style.animationDuration = '1.5s';
  });
  magmaRock.addEventListener('mouseleave', () => {
    magmaRock.style.animationDuration = '';
  });
}`,
  ts: `// TypeScript Implementation
const magmaRock = document.querySelector<HTMLDivElement>('.magma-rock-ring');
if (magmaRock) {
  magmaRock.addEventListener('mouseenter', () => {
    magmaRock.style.animationDuration = '1.5s';
  });
  magmaRock.addEventListener('mouseleave', () => {
    magmaRock.style.animationDuration = '';
  });
}`,
  css: `/* Volcanic Magma Ring Loader Styles */
.magma-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.magma-rock-ring {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 4px solid #1c1512;
  box-shadow: 
    0 0 10px rgba(0,0,0,0.8),
    inset 0 0 15px rgba(255, 69, 0, 0.4),
    0 0 15px rgba(255, 69, 0, 0.4);
  animation: magma-spin-ring 3.5s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

.magma-bubble {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 10%, #ff4500 70%, transparent 100%);
  box-shadow: 0 0 8px #ff4500, 0 0 16px rgba(255, 69, 0, 0.8);
}

.bub-1 { top: -6px; left: 50%; transform: translateX(-50%); animation: magma-erupt-1 1.2s ease-in-out infinite alternate; }
.bub-2 { bottom: -6px; left: 30%; animation: magma-erupt-2 1.2s ease-in-out infinite alternate; animation-delay: 0.4s; }
.bub-3 { right: -6px; top: 30%; animation: magma-erupt-3 1.2s ease-in-out infinite alternate; animation-delay: 0.8s; }

@keyframes magma-spin-ring {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes magma-erupt-1 {
  0% { transform: translateX(-50%) scale(0.6); opacity: 0.4; }
  100% { transform: translateX(-50%) scale(1.4) translateY(-4px); opacity: 1; }
}

@keyframes magma-erupt-2 {
  0% { transform: scale(0.6); opacity: 0.4; }
  100% { transform: scale(1.4) translateY(4px) translateX(-2px); opacity: 1; }
}

@keyframes magma-erupt-3 {
  0% { transform: scale(0.6); opacity: 0.4; }
  100% { transform: scale(1.4) translateX(4px) translateY(-2px); opacity: 1; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="relative w-[70px] h-[70px] rounded-full border-4 border-amber-950 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-spin"></div>
</div>`,
  prompt: `Bubbling volcanic magma loader. Crackled carbon rock circular ring rotates, and bright red-orange liquid magma spheres bubble and erupt along outlines.`
};
