/**
 * Component: Holographic Ticket Input
 * Category: inputs
 */

export const component = {
  id: 'holo-ticket-input',
  name: 'Holographic Ticket Input',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="holo-input-group">
  <div class="holo-ticket-container">
    <input type="text" class="holo-input-field" placeholder=" " id="holo-input-demo" autocomplete="off">
    <div class="holo-shimmer-layer"></div>
    <label class="holo-input-label" for="holo-input-demo">ACCESS PASSCODE</label>
    <div class="ticket-perforations">
      <span class="perf perf-left"></span>
      <span class="perf perf-right"></span>
    </div>
  </div>
</div>`,
  js: `// Dynamic Holographic color sweep tracking mouse coordinates
const holoInput = document.querySelector('.holo-input-field');
if (holoInput) {
  const container = holoInput.parentElement;
  const shimmer = container.querySelector('.holo-shimmer-layer');
  
  container.addEventListener('mousemove', (e) => {
    if (!shimmer) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    shimmer.style.setProperty('--x', \`\${percentX}%\`);
    shimmer.style.setProperty('--y', \`\${percentY}%\`);
  });
  
  // Highlight flash on typing
  holoInput.addEventListener('keydown', () => {
    if (shimmer) {
      shimmer.style.animation = 'none';
      shimmer.offsetHeight; // trigger reflow
      shimmer.style.animation = 'holo-glint-flash 0.5s ease-out forwards';
    }
  });
}`,
  ts: `// TypeScript Implementation
const holoInput = document.querySelector<HTMLInputElement>('.holo-input-field');
if (holoInput) {
  const parent = holoInput.parentElement;
  if (parent) {
    const shimmer = parent.querySelector<HTMLDivElement>('.holo-shimmer-layer');
    
    parent.addEventListener('mousemove', (e) => {
      if (!shimmer) return;
      
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      
      shimmer.style.setProperty('--x', \`\${percentX}%\`);
      shimmer.style.setProperty('--y', \`\${percentY}%\`);
    });
    
    holoInput.addEventListener('keydown', () => {
      if (shimmer) {
        shimmer.style.animation = 'none';
        shimmer.offsetHeight; // trigger reflow
        shimmer.style.animation = 'holo-glint-flash 0.5s ease-out forwards';
      }
    });
  }
}`,
  css: `/* Holographic Ticket Input Styles */
.holo-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.holo-ticket-container {
  position: relative;
  width: 100%;
  background: #0d0c10;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
}

.holo-input-field {
  width: 100%;
  padding: 16px 24px;
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  outline: none;
  z-index: 2;
  position: relative;
}

.holo-shimmer-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(255, 0, 128, 0.15) 0%,
    rgba(0, 242, 254, 0.15) 40%,
    rgba(255, 255, 255, 0.05) 80%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
  transition: background 0.1s ease;
  opacity: 0.7;
}

.holo-input-label {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: #7b7887;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.15em;
  pointer-events: none;
  z-index: 3;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Perforation ticks left/right */
.ticket-perforations {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 4;
}

.perf {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #111116; /* Matches the workspace canvas backdrop */
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.15);
}

.perf-left {
  left: -7px;
}

.perf-right {
  right: -7px;
}

/* Interactions */
.holo-ticket-container:hover {
  border-color: rgba(0, 242, 254, 0.4);
}

.holo-input-field:focus {
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.1);
}

.holo-input-field:focus ~ .holo-input-label,
.holo-input-field:not(:placeholder-shown) ~ .holo-input-label {
  transform: translateY(-165%) scale(0.85);
  color: #00f2fe;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.5);
  background: #0d0c10;
  padding: 0 4px;
  z-index: 10;
}

@keyframes holo-glint-flash {
  0% {
    filter: brightness(1);
    opacity: 0.7;
  }
  50% {
    filter: brightness(2.5) contrast(1.5);
    opacity: 1;
  }
  100% {
    filter: brightness(1);
    opacity: 0.7;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <div class="relative w-full bg-[#0d0c10] border border-dashed border-white/10 rounded-xl overflow-hidden group hover:border-cyan-400/40">
    <input type="text" placeholder=" " id="holo-input-demo" autocomplete="off"
      class="peer w-full px-6 py-4 bg-transparent text-white font-bold tracking-wide outline-none relative z-10" />
    <label for="holo-input-demo"
      class="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-black tracking-widest text-[#7b7887] pointer-events-none transition-all duration-300 peer-focus:-translate-y-[165%] peer-focus:scale-85 peer-focus:text-cyan-400 peer-focus:bg-[#0d0c10] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-translate-y-[165%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-cyan-400 peer-[:not(:placeholder-shown)]:bg-[#0d0c10] peer-[:not(:placeholder-shown)]:px-1 z-20">
      ACCESS PASSCODE
    </label>
    <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#111116] rounded-full border border-dashed border-white/10 left-[-7px] z-30"></div>
    <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#111116] rounded-full border border-dashed border-white/10 right-[-7px] z-30"></div>
  </div>
</div>`,
  prompt: `Perforated boarding ticket pass frame. Hovering rotates holographic reflections shifting green-pink-blue colors according to cursor offsets. Keydowns spark bright horizontal prismatic sweeps.`
};
