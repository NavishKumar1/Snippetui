/**
 * Component: Ethereal Smoke Aura Beacon Loader
 * Category: loaders
 */

export const component = {
  id: 'smoke-aura-loader',
  name: 'Ethereal Smoke Aura Beacon',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="smoke-aura-wrapper">
  <div class="aura-beacon"></div>
  <div class="aura-smoke-waves">
    <span class="smoke-wisp wisp-1"></span>
    <span class="smoke-wisp wisp-2"></span>
  </div>
</div>`,
  js: `// Interactive height expansion on hover
const beaconWrapper = document.querySelector('.smoke-aura-wrapper');
if (beaconWrapper) {
  beaconWrapper.addEventListener('mouseenter', () => {
    const beacon = beaconWrapper.querySelector('.aura-beacon');
    if (beacon) beacon.style.transform = 'scaleY(1.3)';
  });
  
  beaconWrapper.addEventListener('mouseleave', () => {
    const beacon = beaconWrapper.querySelector('.aura-beacon');
    if (beacon) beacon.style.transform = '';
  });
}`,
  ts: `// TypeScript Implementation
const beaconWrapper = document.querySelector<HTMLDivElement>('.smoke-aura-wrapper');
if (beaconWrapper) {
  beaconWrapper.addEventListener('mouseenter', () => {
    const beacon = beaconWrapper.querySelector<HTMLDivElement>('.aura-beacon');
    if (beacon) beacon.style.transform = 'scaleY(1.3)';
  });
  
  beaconWrapper.addEventListener('mouseleave', () => {
    const beacon = beaconWrapper.querySelector<HTMLDivElement>('.aura-beacon');
    if (beacon) beacon.style.transform = '';
  });
}`,
  css: `/* Ethereal Smoke Aura Beacon Loader Styles */
.smoke-aura-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aura-beacon {
  width: 4px;
  height: 50px;
  border-radius: 2px;
  background: linear-gradient(180deg, #00f2fe 0%, #00ffd0 100%);
  box-shadow: 
    0 0 10px #00f2fe,
    0 0 20px rgba(0, 242, 254, 0.6);
  z-index: 3;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.aura-smoke-waves {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.smoke-wisp {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(0, 242, 254, 0.2);
  filter: blur(4px);
  opacity: 0;
}

.wisp-1 { left: 40%; animation: wisp-rise-up 2.2s linear infinite; }
.wisp-2 { left: 48%; animation: wisp-rise-up 2.2s linear infinite; animation-delay: 1.1s; }

@keyframes wisp-rise-up {
  0% { bottom: 10%; transform: scale(0.6) translateX(0); opacity: 0; }
  10% { opacity: 0.85; }
  50% { transform: scale(1.1) translateX(8px); }
  90% { opacity: 0.85; }
  100% { bottom: 90%; transform: scale(0.5) translateX(-8px); opacity: 0; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="w-1 h-[50px] rounded bg-gradient-to-b from-cyan-400 to-emerald-400 shadow-[0_0_10px_cyan]"></div>
</div>`,
  prompt: `Ethereal beacon aura loader. A vertical glowing cyan columns stands in backplane while faint translucent emerald wisps of smoke float upwards.`
};
