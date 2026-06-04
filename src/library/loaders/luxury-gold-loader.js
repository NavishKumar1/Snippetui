/**
 * Component: Luxury Gold Specular Gear Loader
 * Category: loaders
 */

export const component = {
  id: 'luxury-gold-loader',
  name: 'Luxury Gold Specular Gear Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="gold-gear-wrapper">
  <div class="gold-gear gear-large">
    <div class="gear-teeth"></div>
    <div class="gear-core"></div>
  </div>
  <div class="gold-gear gear-small">
    <div class="gear-teeth"></div>
    <div class="gear-core"></div>
  </div>
  <div class="gold-gear-sweep"></div>
</div>`,
  js: `// Interactive dynamic glint sweep on click
const gearWrapper = document.querySelector('.gold-gear-wrapper');
if (gearWrapper) {
  gearWrapper.addEventListener('click', () => {
    const sweep = gearWrapper.querySelector('.gold-gear-sweep');
    if (sweep) {
      sweep.style.animation = 'none';
      sweep.offsetHeight; // trigger reflow
      sweep.style.animation = 'gold-gear-flare 0.8s ease-out forwards';
    }
  });
}`,
  ts: `// TypeScript Implementation
const gearWrapper = document.querySelector<HTMLDivElement>('.gold-gear-wrapper');
if (gearWrapper) {
  gearWrapper.addEventListener('click', () => {
    const sweep = gearWrapper.querySelector<HTMLDivElement>('.gold-gear-sweep');
    if (sweep) {
      sweep.style.animation = 'none';
      sweep.offsetHeight; // trigger reflow
      sweep.style.animation = 'gold-gear-flare 0.8s ease-out forwards';
    }
  });
}`,
  css: `/* Luxury Gold Specular Gear Loader Styles */
.gold-gear-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.gold-gear {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);
}

.gear-large {
  width: 54px;
  height: 54px;
  top: 25px;
  left: 25px;
  animation: gear-spin-right 4s linear infinite;
}

.gear-small {
  width: 38px;
  height: 38px;
  bottom: 25px;
  right: 25px;
  animation: gear-spin-left 2.82s linear infinite;
}

.gear-core {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #110d05;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.6);
  z-index: 2;
}

.gear-teeth {
  position: absolute;
  inset: -6px;
  background: repeating-conic-gradient(
    from 0deg,
    transparent 0deg 15deg,
    #b38728 15deg 30deg
  );
  border-radius: 50%;
  z-index: 1;
}

.gold-gear-sweep {
  position: absolute;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  left: -200%;
  pointer-events: none;
  animation: gold-gear-flare 3.5s ease-in-out infinite;
}

@keyframes gear-spin-right {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes gear-spin-left {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@keyframes gold-gear-flare {
  0% { left: -200%; }
  30%, 100% { left: 200%; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center overflow-hidden">
  <div class="absolute w-[54px] h-[54px] rounded-full bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#aa771c] top-[25px] left-[25px] animate-spin flex items-center justify-center">
    <div class="w-[18px] h-[18px] rounded-full bg-[#110d05]"></div>
  </div>
</div>`,
  prompt: `Luxury specular golden mechanical loader. Interlocked precision brass clockwork gears rotate synchronously. Diagonal shiny specular lighting flares sweep continuously across metal facets.`
};
