/**
 * Component: Laser Cutter Tracer Input
 * Category: inputs
 */

export const component = {
  id: 'laser-slash-input',
  name: 'Laser Cutter Tracer Input',
  category: 'inputs',
  tag: 'Interactive',
  html: `<div class="laser-inp-group">
  <span class="laser-inp-track"></span>
  <span class="laser-inp-pointer"></span>
  <input type="text" class="laser-cutter-input-field" placeholder=" " id="laser-input-demo" autocomplete="off">
  <label class="laser-inp-label" for="laser-input-demo">SERIAL KEY</label>
</div>`,
  js: `// Laser cutter slash hover/focus activation
const laserInp = document.querySelector('.laser-cutter-input-field');
if (laserInp) {
  const pointer = laserInp.parentElement.querySelector('.laser-inp-pointer');
  
  laserInp.addEventListener('focus', () => {
    if (pointer) {
      pointer.style.animationPlayState = 'running';
    }
  });

  laserInp.addEventListener('blur', () => {
    if (pointer) {
      pointer.style.animationPlayState = 'paused';
    }
  });
}`,
  ts: `// TypeScript Implementation
const laserInp = document.querySelector<HTMLInputElement>('.laser-cutter-input-field');
if (laserInp) {
  const parent = laserInp.parentElement;
  if (parent) {
    const pointer = parent.querySelector<HTMLSpanElement>('.laser-inp-pointer');
    
    if (pointer) {
      laserInp.addEventListener('focus', () => {
        pointer.style.animationPlayState = 'running';
      });

      laserInp.addEventListener('blur', () => {
        pointer.style.animationPlayState = 'paused';
      });
    }
  }
}`,
  css: `/* Laser Cutter Tracer Input Styles */
.laser-inp-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.laser-inp-track {
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-radius: 4px;
  z-index: 1;
  pointer-events: none;
  transition: all 0.3s ease;
}

/* High-intensity sweeping laser pointer spark */
.laser-inp-pointer {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 
    0 0 8px #ff3300,
    0 0 16px #ff3300,
    0 0 30px #ff0000;
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  /* Complex coordinate path tracing the border of the input */
  animation: laser-inp-orbit 2.5s infinite linear;
  animation-play-state: paused;
}

.laser-cutter-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #101216;
  border: 1px solid rgba(255, 51, 0, 0.15);
  border-radius: 4px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  outline: none;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    0 0 8px rgba(255, 51, 0, 0.05);
  z-index: 2;
  position: relative;
  transition: all 0.3s ease;
}

.laser-inp-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff3300;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  pointer-events: none;
  z-index: 3;
  text-shadow: 0 0 5px rgba(255, 51, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Focus laser scanner sweeps */
.laser-cutter-input-field:focus {
  border-color: rgba(255, 51, 0, 0.45);
  box-shadow: 
    0 8px 25px rgba(255, 51, 0, 0.25),
    0 0 15px rgba(255, 51, 0, 0.1),
    inset 0 0 10px rgba(255, 51, 0, 0.15);
}

.laser-cutter-input-field:focus ~ .laser-inp-pointer {
  opacity: 1;
}

.laser-cutter-input-field:focus ~ .laser-inp-track {
  animation: laser-inp-track-glow 1.5s infinite alternate ease-in-out;
}

.laser-cutter-input-field:focus + .laser-inp-label,
.laser-cutter-input-field:not(:placeholder-shown) + .laser-inp-label {
  transform: translateY(-170%) scale(0.85);
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #ff3300;
  background-color: #101216;
  padding: 0 6px;
  z-index: 10;
}

/* Border tracing laser path keyframes for 260px x 50px input */
@keyframes laser-inp-orbit {
  0% { top: 0px; left: 0px; }
  25% { top: 0px; left: 100%; transform: translateX(-6px); }
  50% { top: 100%; left: 100%; transform: translate(-6px, -6px); }
  75% { top: 100%; left: 0px; transform: translateY(-6px); }
  100% { top: 0px; left: 0px; }
}

@keyframes laser-inp-track-glow {
  0% { border-color: rgba(255, 51, 0, 0.2); box-shadow: inset 0 0 5px rgba(255, 51, 0, 0.1); }
  100% { border-color: rgba(255, 51, 0, 0.6); box-shadow: inset 0 0 12px rgba(255, 51, 0, 0.3); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="laser-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-[#101216] border border-red-500/15 rounded text-white font-bold text-sm tracking-wider outline-none focus:border-red-500/45 focus:shadow-[0_8px_25px_rgba(255,51,0,0.25)] transition-all duration-300 relative z-10" />
  <label for="laser-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs text-[#ff3300] font-bold tracking-widest pointer-events-none transition-all duration-300 peer-focus:-translate-y-[170%] peer-focus:scale-85 peer-focus:text-white peer-focus:bg-[#101216] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-translate-y-[170%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:bg-[#101216] peer-[:not(:placeholder-shown)]:px-1.5 z-20">
    SERIAL KEY
  </label>
</div>`,
  prompt: `Design a premium "Laser Cutter Tracer Input" component. Hollow titanium boundaries sweep a high-intensity red laser spark dot tracing paths organically on focus, leaving white-hot glowing paths.`
};
