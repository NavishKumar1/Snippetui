/**
 * Component: Liquid Gradient Border Input
 * Category: inputs
 */

export const component = {
  id: 'liquid-gradient-input',
  name: 'Liquid Gradient Border Input',
  category: 'inputs',
  tag: 'Responsive',
  html: `<div class="liquid-input-group">
  <input type="text" class="liquid-input-field" placeholder=" " id="liquid-input-demo">
  <span class="liquid-input-border-flow"></span>
  <label class="liquid-input-label" for="liquid-input-demo">Username</label>
</div>`,
  js: `// Interactive Ripple on keypress
const liquidInput = document.querySelector('.liquid-input-field');
if (liquidInput) {
  liquidInput.addEventListener('keydown', () => {
    // Generate organic border pulses on keypresses
    const border = liquidInput.parentElement.querySelector('.liquid-input-border-flow');
    if (border) {
      border.style.animation = 'none';
      border.offsetHeight; // trigger reflow
      border.style.animation = 'liquid-border-pulse 0.4s ease-out';
    }
  });
}`,
  ts: `// TypeScript Implementation
const liquidInput = document.querySelector<HTMLInputElement>('.liquid-input-field');
if (liquidInput) {
  liquidInput.addEventListener('keydown', () => {
    const parent = liquidInput.parentElement;
    if (parent) {
      const border = parent.querySelector<HTMLSpanElement>('.liquid-input-border-flow');
      if (border) {
        border.style.animation = 'none';
        border.offsetHeight; // trigger reflow
        border.style.animation = 'liquid-border-pulse 0.4s ease-out';
      }
    }
  });
}`,
  css: `/* Liquid Gradient Border Input Styles */
.liquid-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.liquid-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #09090f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  z-index: 2;
  position: relative;
  transition: all 0.3s ease;
}

/* Backplane flowing border gradient overlay */
.liquid-input-border-flow {
  position: absolute;
  inset: -1px;
  border-radius: 11px;
  background: transparent;
  z-index: 1;
  pointer-events: none;
  transition: background 0.3s ease;
}

.liquid-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #5d677a;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  pointer-events: none;
  z-index: 3;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Focus and active styles */
.liquid-input-field:focus {
  border-color: transparent;
}

.liquid-input-field:focus ~ .liquid-input-border-flow {
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #ff007f 100%);
}

.liquid-input-field:focus ~ .liquid-input-label,
.liquid-input-field:not(:placeholder-shown) ~ .liquid-input-label {
  transform: translateY(-170%) scale(0.85);
  color: #00f2fe;
  background-color: #09090f;
  padding: 0 6px;
  z-index: 4;
}

@keyframes liquid-border-pulse {
  0% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.02); filter: brightness(1.3); }
  100% { transform: scale(1); filter: brightness(1); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="liquid-input-demo"
    class="peer w-full px-[18px] py-4 bg-[#09090f] border border-white/8 rounded-[10px] text-white outline-none focus:border-transparent transition-all duration-300 relative z-10" />
  <label for="liquid-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-sm text-slate-500 font-bold pointer-events-none transition-all duration-300 peer-focus:-translate-y-[170%] peer-focus:scale-85 peer-focus:text-[#00f2fe] peer-focus:bg-[#09090f] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-translate-y-[170%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#00f2fe] peer-[:not(:placeholder-shown)]:bg-[#09090f] peer-[:not(:placeholder-shown)]:px-1.5 z-20">
    Username
  </label>
</div>`,
  prompt: `Design a premium "Liquid Gradient Border Input" component. Focused state activates a rich, shifting cyan-magenta gradient flowing border trace. Typing triggers subtle organic scale-pulse reflows.`
};
