/**
 * Component: Volcanic Magma Pulse Input
 * Category: inputs
 */

export const component = {
  id: 'volcanic-magma-input',
  name: 'Volcanic Magma Pulse Input',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="magma-input-group">
  <input type="text" class="magma-input-field" placeholder=" " id="magma-input-demo" autocomplete="off">
  <span class="magma-border-flow"></span>
  <label class="magma-input-label" for="magma-input-demo">CRITICAL CORE</label>
</div>`,
  js: `// Dynamic magma lava-flows along borders on keydown
const magmaInput = document.querySelector('.magma-input-field');
if (magmaInput) {
  const border = magmaInput.parentElement.querySelector('.magma-border-flow');
  
  magmaInput.addEventListener('keydown', () => {
    if (border) {
      border.style.animation = 'none';
      border.offsetHeight; // trigger reflow
      border.style.animation = 'magma-wave-burst 0.5s ease-out';
    }
  });
}`,
  ts: `// TypeScript Implementation
const magmaInput = document.querySelector<HTMLInputElement>('.magma-input-field');
if (magmaInput) {
  const parent = magmaInput.parentElement;
  if (parent) {
    const border = parent.querySelector<HTMLSpanElement>('.magma-border-flow');
    if (border) {
      magmaInput.addEventListener('keydown', () => {
        border.style.animation = 'none';
        border.offsetHeight; // trigger reflow
        border.style.animation = 'magma-wave-burst 0.5s ease-out';
      });
    }
  }
}`,
  css: `/* Volcanic Magma Pulse Input Styles */
.magma-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.magma-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #0f0b09;
  border: 1px solid rgba(255, 68, 0, 0.15);
  border-radius: 8px;
  color: #ffebd6;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  outline: none;
  z-index: 2;
  position: relative;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.7),
    inset 0 1px 2px rgba(255, 68, 0, 0.05);
  transition: all 0.3s ease;
}

.magma-border-flow {
  position: absolute;
  inset: -1px;
  border-radius: 9px;
  background: transparent;
  z-index: 1;
  pointer-events: none;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.magma-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #9c6c5a;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  pointer-events: none;
  z-index: 3;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Focused & Active Actions */
.magma-input-field:focus {
  background: #17100c;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(255, 68, 0, 0.15);
}

.magma-input-field:focus ~ .magma-border-flow {
  background: linear-gradient(135deg, #ff4500 0%, #ff8c00 50%, #ff3300 100%);
  filter: drop-shadow(0 0 8px rgba(255, 68, 0, 0.6));
}

.magma-input-field:focus ~ .magma-input-label,
.magma-input-field:not(:placeholder-shown) ~ .magma-input-label {
  transform: translateY(-165%) scale(0.85);
  color: #ff5500;
  text-shadow: 0 0 8px rgba(255, 68, 0, 0.4);
  background: #0f0b09;
  padding: 0 5px;
}

@keyframes magma-wave-burst {
  0% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.03); filter: brightness(1.6) contrast(1.2); }
  100% { transform: scale(1); filter: brightness(1); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="magma-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-[#0f0b09] border border-orange-600/20 rounded-lg text-orange-100 outline-none focus:bg-[#17100c] focus:border-transparent transition-all duration-300 relative z-10" />
  <span class="absolute inset-[-1px] rounded-[9px] pointer-events-none opacity-70 transition-all duration-300 peer-focus:bg-gradient-to-r peer-focus:from-orange-600 peer-focus:to-amber-500 peer-focus:shadow-[0_0_8px_rgba(239,68,68,0.6)] z-0"></span>
  <label for="magma-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs font-bold tracking-widest text-stone-500 pointer-events-none transition-all duration-300 peer-focus:-translate-y-[165%] peer-focus:scale-85 peer-focus:text-orange-500 peer-focus:bg-[#0f0b09] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-translate-y-[165%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-orange-500 peer-[:not(:placeholder-shown)]:bg-[#0f0b09] peer-[:not(:placeholder-shown)]:px-1 z-20">
    CRITICAL CORE
  </label>
</div>`,
  prompt: `Deep volcanic carbon rock input. Focus spawns glowing red-hot crackled lava borders that slowly breathe. Typing triggers sudden thermal ripples that flare bright orange along boundaries.`
};
