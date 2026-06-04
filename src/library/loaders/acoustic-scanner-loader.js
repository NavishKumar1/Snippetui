/**
 * Component: Acoustic Waveform Scanner Sonar Loader
 * Category: loaders
 */

export const component = {
  id: 'acoustic-scanner-loader',
  name: 'Acoustic Waveform Scanner Sonar',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="acoustic-scanner-wrapper">
  <div class="scanner-grid"></div>
  <div class="sonar-rings">
    <span class="sonar-ring ring-1"></span>
    <span class="sonar-ring ring-2"></span>
    <span class="sonar-ring ring-3"></span>
  </div>
  <div class="radar-scanline"></div>
</div>`,
  js: `// Sonar scan speed adjustment on click
const scanner = document.querySelector('.acoustic-scanner-wrapper');
if (scanner) {
  scanner.addEventListener('click', () => {
    const scanline = scanner.querySelector('.radar-scanline');
    if (scanline) {
      scanline.style.animationDuration = '0.75s';
      setTimeout(() => {
        scanline.style.animationDuration = '';
      }, 1500);
    }
  });
}`,
  ts: `// TypeScript Implementation
const scanner = document.querySelector<HTMLDivElement>('.acoustic-scanner-wrapper');
if (scanner) {
  scanner.addEventListener('click', () => {
    const scanline = scanner.querySelector<HTMLDivElement>('.radar-scanline');
    if (scanline) {
      scanline.style.animationDuration = '0.75s';
      setTimeout(() => {
        scanline.style.animationDuration = '';
      }, 1500);
    }
  });
}`,
  css: `/* Acoustic Waveform Scanner Sonar Loader Styles */
.acoustic-scanner-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid rgba(0, 242, 254, 0.15);
  background: #020408;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    0 0 15px rgba(0, 242, 254, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.scanner-grid {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(rgba(0, 242, 254, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 242, 254, 0.03) 1px, transparent 1px);
  background-size: 15px 15px;
  background-position: center;
  pointer-events: none;
  z-index: 1;
}

.sonar-rings {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
}

.sonar-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(0, 242, 254, 0.08);
}

.ring-1 { width: 40px; height: 40px; }
.ring-2 { width: 70px; height: 70px; }
.ring-3 { width: 100px; height: 100px; }

.radar-scanline {
  position: absolute;
  width: 50%;
  height: 50%;
  top: 0;
  left: 50%;
  background: linear-gradient(
    90deg,
    rgba(0, 242, 254, 0.15) 0%,
    rgba(0, 242, 254, 0.02) 60%,
    transparent 100%
  );
  transform-origin: left bottom;
  z-index: 3;
  pointer-events: none;
  animation: radar-sweep-scan 3s linear infinite;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.08);
}

@keyframes radar-sweep-scan {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] rounded-full border border-cyan-400/20 bg-slate-950 overflow-hidden flex items-center justify-center cursor-pointer">
  <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:15px_15px]"></div>
  <div class="w-[70px] h-[70px] rounded-full border border-cyan-400/10"></div>
</div>`,
  prompt: `Retro radar scanner loader. Concentric sonar lines are intersected by a rotating vector cyan scanline sweeps around inside a green-cyan grid console.`
};
