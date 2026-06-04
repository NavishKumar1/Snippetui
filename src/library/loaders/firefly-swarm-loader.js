/**
 * Component: Firefly Swarm Loader
 * Category: loaders
 */

export const component = {
  id: 'firefly-swarm-loader',
  name: 'Firefly Swarm Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="firefly-loader-wrapper">
  <div class="firefly-center-core"></div>
  <div class="firefly-swarm">
    <span class="firefly-node fly-1"></span>
    <span class="firefly-node fly-2"></span>
    <span class="firefly-node fly-3"></span>
    <span class="firefly-node fly-4"></span>
  </div>
</div>`,
  js: `// Fast rotation of swarms on click trigger
const centralCore = document.querySelector('.firefly-center-core');
if (centralCore) {
  centralCore.addEventListener('click', () => {
    const swarms = centralCore.parentElement.querySelectorAll('.firefly-node');
    swarms.forEach(fly => {
      fly.style.animationDuration = '0.8s';
      setTimeout(() => fly.style.animationDuration = '', 2000);
    });
  });
}`,
  ts: `// TypeScript Implementation
const centralCore = document.querySelector<HTMLDivElement>('.firefly-center-core');
if (centralCore) {
  centralCore.addEventListener('click', () => {
    const parent = centralCore.parentElement;
    if (parent) {
      const swarms = parent.querySelectorAll<HTMLSpanElement>('.firefly-node');
      swarms.forEach(fly => {
        fly.style.animationDuration = '0.8s';
        setTimeout(() => fly.style.animationDuration = '', 2000);
      });
    }
  });
}`,
  css: `/* Firefly Swarm Loader Styles */
.firefly-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.firefly-center-core {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffe699 0%, #fdb813 60%, transparent 100%);
  box-shadow: 
    0 0 10px #fdb813,
    0 0 20px rgba(253, 184, 19, 0.8);
  z-index: 5;
  cursor: pointer;
  animation: firefly-pulse-core 2s ease-in-out infinite alternate;
}

.firefly-swarm {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.firefly-node {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 6px #fdb813, 0 0 12px #fdb813;
}

.fly-1 { animation: firefly-orbit-1 2s linear infinite; }
.fly-2 { animation: firefly-orbit-2 2.4s linear infinite; }
.fly-3 { animation: firefly-orbit-3 1.8s linear infinite; }
.fly-4 { animation: firefly-orbit-4 2.8s linear infinite; }

@keyframes firefly-pulse-core {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.15); opacity: 1; }
}

@keyframes firefly-orbit-1 {
  0% { transform: rotate(0deg) translate(30px) rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) translate(35px) rotate(-180deg) scale(0.7); }
  100% { transform: rotate(360deg) translate(30px) rotate(-360deg) scale(1); }
}

@keyframes firefly-orbit-2 {
  0% { transform: rotate(90deg) translate(32px) rotate(-90deg) scale(0.8); }
  50% { transform: rotate(270deg) translate(28px) rotate(-270deg) scale(1.1); }
  100% { transform: rotate(450deg) translate(32px) rotate(-450deg) scale(0.8); }
}

@keyframes firefly-orbit-3 {
  0% { transform: rotate(180deg) translate(28px) rotate(-180deg) scale(1); }
  50% { transform: rotate(360deg) translate(34px) rotate(-360deg) scale(0.6); }
  100% { transform: rotate(540deg) translate(28px) scale(1); }
}

@keyframes firefly-orbit-4 {
  0% { transform: rotate(270deg) translate(34px) rotate(-270deg) scale(0.7); }
  50% { transform: rotate(450deg) translate(30px) rotate(-450deg) scale(1.2); }
  100% { transform: rotate(630deg) translate(34px) scale(0.7); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-500 shadow-[0_0_10px_#fdb813] z-10 cursor-pointer animate-ping"></div>
</div>`,
  prompt: `Frosted glass capsule chamber. Glowing yellow firefly core in the center is orbited dynamically by four glowing golden firefly stars in physics-based paths.`
};
