/**
 * Component: Volcanic Molten Fireball Orbit Loader
 * Category: loaders
 */

export const component = {
  id: 'volcanic-fireball-loader',
  name: 'Volcanic Molten Fireball Orbit',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="fireball-loader-wrapper">
  <div class="fireball-crater"></div>
  <div class="fireball-orbits">
    <span class="fireball fb-1"></span>
    <span class="fireball fb-2"></span>
  </div>
</div>`,
  js: `// Ring rotation acceleration on click trigger
const centralCrater = document.querySelector('.fireball-crater');
if (centralCrater) {
  centralCrater.addEventListener('click', () => {
    const fireballs = centralCrater.parentElement.querySelectorAll('.fireball');
    fireballs.forEach(fb => {
      fb.style.animationDuration = '0.4s';
      setTimeout(() => fb.style.animationDuration = '', 1600);
    });
  });
}`,
  ts: `// TypeScript Implementation
const centralCrater = document.querySelector<HTMLDivElement>('.fireball-crater');
if (centralCrater) {
  centralCrater.addEventListener('click', () => {
    const parent = centralCrater.parentElement;
    if (parent) {
      const fireballs = parent.querySelectorAll<HTMLSpanElement>('.fireball');
      fireballs.forEach(fb => {
        fb.style.animationDuration = '0.4s';
        setTimeout(() => fb.style.animationDuration = '', 1600);
      });
    }
  });
}`,
  css: `/* Volcanic Molten Fireball Orbit Loader Styles */
.fireball-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fireball-crater {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 0%, #ff4500 60%, transparent 100%);
  box-shadow: 
    0 0 10px #ff4500,
    0 0 20px rgba(255, 69, 0, 0.8);
  z-index: 5;
  cursor: pointer;
  animation: crater-pulse-breathing 1.8s ease-in-out infinite alternate;
}

.fireball-orbits {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.fireball {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 
    0 0 8px #ff4500,
    0 0 16px rgba(255, 69, 0, 0.8);
}

.fb-1 { animation: fireball-orbit-spin-1 1s linear infinite; }
.fb-2 { animation: fireball-orbit-spin-2 1s linear infinite; }

@keyframes crater-pulse-breathing {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.2); opacity: 1; }
}

@keyframes fireball-orbit-spin-1 {
  0% { transform: rotate(0deg) translate(32px); }
  100% { transform: rotate(360deg) translate(32px); }
}

@keyframes fireball-orbit-spin-2 {
  0% { transform: rotate(180deg) translate(32px); }
  100% { transform: rotate(540deg) translate(32px); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="w-[22px] h-[22px] rounded-full bg-gradient-to-r from-white to-red-500 shadow-[0_0_10px_#ff4500] z-10 cursor-pointer animate-ping"></div>
</div>`,
  prompt: `Molten volcanic orbit loader. Central glowing magma node is orbited at extremely high speeds by two fireballs with trailing lava sparks.`
};
