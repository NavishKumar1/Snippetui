/**
 * Component: Retro Synthwave Laser Grid Input
 * Category: inputs
 */

export const component = {
  id: 'retro-synthwave-input',
  name: 'Retro Synthwave Laser Grid Input',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="synthwave-input-group">
  <input type="text" class="synthwave-input-field" placeholder=" " id="synthwave-input-demo" autocomplete="off">
  <div class="synthwave-grid-backdrop">
    <div class="synthwave-horizon"></div>
    <div class="synthwave-laser-scan"></div>
  </div>
  <label class="synthwave-input-label" for="synthwave-input-demo">OUTRUN OVERDRIVE</label>
</div>`,
  js: `// Interactive Laser Scan triggering on focus and keystroke
const synthInput = document.querySelector('.synthwave-input-field');
if (synthInput) {
  const scan = synthInput.parentElement.querySelector('.synthwave-laser-scan');
  
  const triggerLaser = () => {
    if (scan) {
      scan.style.animation = 'none';
      scan.offsetHeight; // trigger reflow
      scan.style.animation = 'synth-laser-sweep 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
    }
  };
  
  synthInput.addEventListener('focus', triggerLaser);
  synthInput.addEventListener('keydown', triggerLaser);
}`,
  ts: `// TypeScript Implementation
const synthInput = document.querySelector<HTMLInputElement>('.synthwave-input-field');
if (synthInput) {
  const parent = synthInput.parentElement;
  if (parent) {
    const scan = parent.querySelector<HTMLDivElement>('.synthwave-laser-scan');
    
    const triggerLaser = () => {
      if (scan) {
        scan.style.animation = 'none';
        scan.offsetHeight; // trigger reflow
        scan.style.animation = 'synth-laser-sweep 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
      }
    };
    
    synthInput.addEventListener('focus', triggerLaser);
    synthInput.addEventListener('keydown', triggerLaser);
  }
}`,
  css: `/* Retro Synthwave Laser Grid Input Styles */
.synthwave-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.synthwave-input-field {
  width: 100%;
  padding: 16px 18px;
  background: rgba(10, 3, 15, 0.8);
  border: 1px solid rgba(255, 0, 127, 0.2);
  border-radius: 6px;
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  outline: none;
  z-index: 2;
  position: relative;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 0, 127, 0.1);
  transition: all 0.3s ease;
}

.synthwave-grid-backdrop {
  position: absolute;
  inset: 0;
  border-radius: 6px;
  background: 
    linear-gradient(rgba(255, 0, 127, 0) 60%, rgba(255, 0, 127, 0.08) 100%),
    linear-gradient(90deg, rgba(0, 242, 254, 0.05) 1px, transparent 1px),
    linear-gradient(0deg, rgba(0, 242, 254, 0.05) 1px, transparent 1px);
  background-size: 100% 100%, 15px 15px, 15px 15px;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.synthwave-horizon {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #ff007f;
  box-shadow: 0 0 8px #ff007f;
}

.synthwave-laser-scan {
  position: absolute;
  top: -10px;
  width: 100%;
  height: 2px;
  background: #ff007f;
  box-shadow: 0 0 10px #ff007f, 0 0 20px #ff007f;
  opacity: 0;
  pointer-events: none;
}

.synthwave-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff007f;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  pointer-events: none;
  z-index: 3;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Interactions */
.synthwave-input-field:focus {
  border-color: #ff007f;
  box-shadow: 
    0 8px 25px rgba(255, 0, 127, 0.25),
    0 0 15px rgba(0, 242, 254, 0.15),
    inset 0 1px 1px rgba(255, 0, 127, 0.2);
}

.synthwave-input-field:focus ~ .synthwave-grid-backdrop {
  opacity: 1;
  background-size: 100% 100%, 20px 20px, 20px 20px;
}

.synthwave-input-field:focus ~ .synthwave-input-label,
.synthwave-input-field:not(:placeholder-shown) ~ .synthwave-input-label {
  transform: translateY(-170%) scale(0.85);
  color: #00f2fe;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.5);
  background: #0a030f;
  padding: 0 4px;
  z-index: 10;
}

@keyframes synth-laser-sweep {
  0% {
    top: 0%;
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0.2;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="synthwave-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-purple-950/20 border border-pink-500/20 rounded text-cyan-400 font-bold tracking-wide outline-none focus:border-pink-500 transition-all duration-300 relative z-10" />
  <label for="synthwave-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs font-black tracking-widest text-pink-500 pointer-events-none transition-all duration-300 peer-focus:-translate-y-[170%] peer-focus:scale-85 peer-focus:text-cyan-400 peer-focus:bg-purple-950/40 peer-focus:px-1 peer-[:not(:placeholder-shown)]:-translate-y-[170%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-cyan-400 peer-[:not(:placeholder-shown)]:bg-purple-950/40 peer-[:not(:placeholder-shown)]:px-1 z-20">
    OUTRUN OVERDRIVE
  </label>
</div>`,
  prompt: `Outrun styled 80s synthwave retro-console. Perspective glowing wireframe grids inside backplane. Focus sweeps neon-pink hot laser bars downward and keydowns trigger neon-cyan track pulses.`
};
