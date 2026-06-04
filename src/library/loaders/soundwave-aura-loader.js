/**
 * Component: Volumetric Soundwave Aura Loader
 * Category: loaders
 */

export const component = {
  id: 'soundwave-aura-loader',
  name: 'Volumetric Soundwave Aura Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="soundwave-loader-wrapper">
  <div class="soundwave-aura-circle circle-outer"></div>
  <div class="soundwave-aura-circle circle-mid"></div>
  <div class="soundwave-aura-circle circle-inner"></div>
  <div class="soundwave-equalizer">
    <span class="eq-bar bar-1"></span>
    <span class="eq-bar bar-2"></span>
    <span class="eq-bar bar-3"></span>
    <span class="eq-bar bar-4"></span>
    <span class="eq-bar bar-5"></span>
  </div>
</div>`,
  js: `// Equalizer amplitude adjustments on mouse proximity
const soundWrapper = document.querySelector('.soundwave-loader-wrapper');
if (soundWrapper) {
  const bars = soundWrapper.querySelectorAll('.eq-bar');
  soundWrapper.addEventListener('mouseenter', () => {
    bars.forEach(bar => {
      bar.style.animationDuration = '0.4s';
    });
  });
  soundWrapper.addEventListener('mouseleave', () => {
    bars.forEach(bar => {
      bar.style.animationDuration = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const soundWrapper = document.querySelector<HTMLDivElement>('.soundwave-loader-wrapper');
if (soundWrapper) {
  const bars = soundWrapper.querySelectorAll<HTMLSpanElement>('.eq-bar');
  soundWrapper.addEventListener('mouseenter', () => {
    bars.forEach(bar => {
      bar.style.animationDuration = '0.4s';
    });
  });
  soundWrapper.addEventListener('mouseleave', () => {
    bars.forEach(bar => {
      bar.style.animationDuration = '';
    });
  });
}`,
  css: `/* Volumetric Soundwave Aura Loader Styles */
.soundwave-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.soundwave-aura-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
  pointer-events: none;
}

.circle-outer {
  width: 100px;
  height: 100px;
  border-color: rgba(0, 242, 254, 0.1);
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.05);
  animation: soundwave-ripple 2.4s linear infinite;
}

.circle-mid {
  width: 80px;
  height: 80px;
  border-color: rgba(162, 140, 255, 0.15);
  box-shadow: 0 0 20px rgba(162, 140, 255, 0.08);
  animation: soundwave-ripple 2.4s linear infinite;
  animation-delay: 0.8s;
}

.circle-inner {
  width: 60px;
  height: 60px;
  border-color: rgba(255, 0, 127, 0.2);
  box-shadow: 0 0 25px rgba(255, 0, 127, 0.12);
  animation: soundwave-ripple 2.4s linear infinite;
  animation-delay: 1.6s;
}

.soundwave-equalizer {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 44px;
  height: 28px;
  z-index: 2;
}

.eq-bar {
  width: 4px;
  height: 4px;
  background: linear-gradient(180deg, #ff007f 0%, #a28cff 50%, #00f2fe 100%);
  border-radius: 2px;
}

.bar-1 { animation: soundwave-bounce 0.8s ease-in-out infinite alternate; }
.bar-2 { animation: soundwave-bounce 0.8s ease-in-out infinite alternate; animation-delay: 0.15s; }
.bar-3 { animation: soundwave-bounce 0.8s ease-in-out infinite alternate; animation-delay: 0.3s; }
.bar-4 { animation: soundwave-bounce 0.8s ease-in-out infinite alternate; animation-delay: 0.45s; }
.bar-5 { animation: soundwave-bounce 0.8s ease-in-out infinite alternate; animation-delay: 0.6s; }

@keyframes soundwave-ripple {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(1.3); opacity: 0; }
}

@keyframes soundwave-bounce {
  0% { height: 4px; }
  100% { height: 26px; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="absolute w-[100px] h-[100px] rounded-full border border-cyan-400/10 animate-ping"></div>
  <div class="flex items-end justify-between w-11 h-7">
    <div class="w-1 h-1 bg-[#ff007f] rounded-full animate-bounce"></div>
    <div class="w-1 h-3 bg-[#a28cff] rounded-full animate-bounce [animation-delay:0.2s]"></div>
    <div class="w-1 h-5 bg-[#00f2fe] rounded-full animate-bounce [animation-delay:0.4s]"></div>
  </div>
</div>`,
  prompt: `Circular audio waveform loader. Concentric light layers pulse outward into fading halos while volumetric pink-cyan frequency equalizer bars dance in rhythmic frequencies.`
};
