/**
 * Component: Cosmic Gravitational Vortex Loader
 * Category: loaders
 */

export const component = {
  id: 'cosmic-vortex-loader',
  name: 'Cosmic Gravitational Vortex',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="cosmic-loader-wrapper">
  <div class="vortex-blackhole"></div>
  <div class="vortex-accretion-disk"></div>
  <div class="vortex-particles">
    <span class="vortex-star star-1"></span>
    <span class="vortex-star star-2"></span>
    <span class="vortex-star star-3"></span>
    <span class="vortex-star star-4"></span>
  </div>
</div>`,
  js: `// Interactive gravitational pull coordinates on mouseover
const cosmicWrapper = document.querySelector('.cosmic-loader-wrapper');
if (cosmicWrapper) {
  cosmicWrapper.addEventListener('mousemove', (e) => {
    const disk = cosmicWrapper.querySelector('.vortex-accretion-disk');
    if (!disk) return;
    
    const rect = cosmicWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    disk.style.transform = \`rotate(var(--rotation, 0deg)) translate(\${x * 0.15}px, \${y * 0.15}px)\`;
  });
  
  cosmicWrapper.addEventListener('mouseleave', () => {
    const disk = cosmicWrapper.querySelector('.vortex-accretion-disk');
    if (disk) disk.style.transform = 'none';
  });
}`,
  ts: `// TypeScript Implementation
const cosmicWrapper = document.querySelector<HTMLDivElement>('.cosmic-loader-wrapper');
if (cosmicWrapper) {
  cosmicWrapper.addEventListener('mousemove', (e) => {
    const disk = cosmicWrapper.querySelector<HTMLDivElement>('.vortex-accretion-disk');
    if (!disk) return;
    
    const rect = cosmicWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    disk.style.transform = \`rotate(var(--rotation, 0deg)) translate(\${x * 0.15}px, \${y * 0.15}px)\`;
  });
  
  cosmicWrapper.addEventListener('mouseleave', () => {
    const disk = cosmicWrapper.querySelector<HTMLDivElement>('.vortex-accretion-disk');
    if (disk) disk.style.transform = 'none';
  });
}`,
  css: `/* Cosmic Gravitational Vortex Loader Styles */
.cosmic-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: pointer;
}

.vortex-blackhole {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #000000;
  box-shadow: 
    0 0 15px rgba(0, 0, 0, 1),
    0 0 25px rgba(138, 43, 226, 0.8),
    0 0 45px rgba(0, 242, 254, 0.4);
  z-index: 3;
}

.vortex-accretion-disk {
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #8a2be2;
  border-bottom-color: #00f2fe;
  filter: blur(2px);
  z-index: 2;
  animation: vortex-spin-disk 2.5s linear infinite;
}

.vortex-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.vortex-star {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 8px #fff, 0 0 15px #00f2fe;
}

/* Spiral-in orbits */
.star-1 { animation: spiral-in-1 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite; }
.star-2 { animation: spiral-in-2 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite; animation-delay: 0.55s; }
.star-3 { animation: spiral-in-3 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite; animation-delay: 1.1s; }
.star-4 { animation: spiral-in-4 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite; animation-delay: 1.65s; }

@keyframes vortex-spin-disk {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spiral-in-1 {
  0% { transform: rotate(0deg) translate(50px) scale(1); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.8; }
  100% { transform: rotate(540deg) translate(0px) scale(0); opacity: 0; }
}
@keyframes spiral-in-2 {
  0% { transform: rotate(90deg) translate(50px) scale(1); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.8; }
  100% { transform: rotate(630deg) translate(0px) scale(0); opacity: 0; }
}
@keyframes spiral-in-3 {
  0% { transform: rotate(180deg) translate(50px) scale(1); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.8; }
  100% { transform: rotate(720deg) translate(0px) scale(0); opacity: 0; }
}
@keyframes spiral-in-4 {
  0% { transform: rotate(270deg) translate(50px) scale(1); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.8; }
  100% { transform: rotate(810deg) translate(0px) scale(0); opacity: 0; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] height-[120px] flex items-center justify-center cursor-pointer">
  <div class="w-[30px] h-[30px] rounded-full bg-black shadow-[0_0_15px_black,0_0_25px_rgba(138,43,226,0.8),0_0_45px_rgba(0,242,254,0.4)] z-10"></div>
  <div class="absolute w-[90px] h-[90px] rounded-full border-2 border-transparent border-t-purple-600 border-b-cyan-400 blur-[2px] animate-spin z-0"></div>
</div>`,
  prompt: `Mesmerizing space cosmic portal loader. Central dark singularity wrapped in rotating neon-purple and cyan accretion layers. Orbiting white stars continuously spiral inward and disappear.`
};
