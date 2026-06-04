/**
 * Component: Laser Welding Sweep Loader
 * Category: loaders
 */

export const component = {
  id: 'laser-sweep-loader',
  name: 'Laser Welding Sweep Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="laser-loader-wrapper">
  <div class="laser-ring-base"></div>
  <div class="laser-glow-trail"></div>
  <div class="laser-head"></div>
</div>`,
  js: `// Laser speed multiplier on click trigger
const laserHead = document.querySelector('.laser-head');
if (laserHead) {
  laserHead.addEventListener('click', () => {
    const parent = laserHead.parentElement;
    const trail = parent.querySelector('.laser-glow-trail');
    
    laserHead.style.animationDuration = '0.4s';
    if (trail) trail.style.animationDuration = '0.4s';
    
    setTimeout(() => {
      laserHead.style.animationDuration = '';
      if (trail) trail.style.animationDuration = '';
    }, 1600);
  });
}`,
  ts: `// TypeScript Implementation
const laserHead = document.querySelector<HTMLDivElement>('.laser-head');
if (laserHead) {
  laserHead.addEventListener('click', () => {
    const parent = laserHead.parentElement;
    if (parent) {
      const trail = parent.querySelector<HTMLDivElement>('.laser-glow-trail');
      
      laserHead.style.animationDuration = '0.4s';
      if (trail) trail.style.animationDuration = '0.4s';
      
      setTimeout(() => {
        laserHead.style.animationDuration = '';
        if (trail) trail.style.animationDuration = '';
      }, 1600);
    }
  });
}`,
  css: `/* Laser Welding Sweep Loader Styles */
.laser-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.laser-ring-base {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 69, 0, 0.1);
}

.laser-glow-trail {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1.5px solid transparent;
  border-top-color: #ff3300;
  border-right-color: rgba(255, 69, 0, 0.4);
  filter: blur(1.5px);
  animation: laser-spin-head 1.1s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
}

.laser-head {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 
    0 0 10px #ff3300,
    0 0 20px rgba(255, 51, 0, 0.8);
  animation: laser-spin-head 1.1s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  z-index: 5;
  cursor: pointer;
}

@keyframes laser-spin-head {
  0% { transform: rotate(0deg) translate(35px); }
  100% { transform: rotate(360deg) translate(35px); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="absolute w-[70px] h-[70px] rounded-full border border-red-500/10"></div>
  <div class="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ff3300] animate-spin" style="transform-origin: center; transform: translate(35px)"></div>
</div>`,
  prompt: `Laser welding precision ring loader. High-intensity bright white laser head orbits at high speeds leaving glowing red-orange hot metal trails around the frame.`
};
