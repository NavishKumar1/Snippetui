/**
 * Component: Mechanical Lever Switchboard
 * Category: tabs-and-navs
 */

export const component = {
  id: 'mechanical-lever-switchboard',
  name: 'Mechanical Lever Switchboard',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="switchboard-sandbox" id="switchboard-container">
  <div class="switchboard-plate">
    <div class="switchboard-header">NODE_ENGAGE_BOARD</div>
    
    <div class="levers-row">
      <!-- Lever 1 (REACTOR) -->
      <div class="lever-slot active" data-index="0" data-color="#00ff66">
        <div class="lever-led"></div>
        <div class="lever-track">
          <div class="lever-handle" id="lever-handle-0">
            <div class="lever-arm"></div>
            <div class="lever-knob"></div>
          </div>
        </div>
        <span class="lever-label">REACTOR</span>
      </div>

      <!-- Lever 2 (THRUSTER) -->
      <div class="lever-slot" data-index="1" data-color="#00f2fe">
        <div class="lever-led"></div>
        <div class="lever-track">
          <div class="lever-handle" id="lever-handle-1">
            <div class="lever-arm"></div>
            <div class="lever-knob"></div>
          </div>
        </div>
        <span class="lever-label">THRUSTER</span>
      </div>

      <!-- Lever 3 (SHIELD) -->
      <div class="lever-slot" data-index="2" data-color="#ff007f">
        <div class="lever-led"></div>
        <div class="lever-track">
          <div class="lever-handle" id="lever-handle-2">
            <div class="lever-arm"></div>
            <div class="lever-knob"></div>
          </div>
        </div>
        <span class="lever-label">SHIELD</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Mechanical Lever Switchboard rotation & bounce simulation
const container = document.getElementById('switchboard-container');
if (container) {
  const slots = container.querySelectorAll('.lever-slot');
  const handles = [
    container.querySelector('#lever-handle-0'),
    container.querySelector('#lever-handle-1'),
    container.querySelector('#lever-handle-2')
  ];

  slots.forEach((slot, idx) => {
    slot.addEventListener('click', () => {
      if (slot.classList.contains('active')) return;

      slots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');

      // Flip handle with spring-loaded physical bounce
      const handle = handles[idx];
      if (handle) {
        handle.style.transform = 'rotateX(40deg) scaleY(1.15)';
        setTimeout(() => {
          handle.style.transform = 'rotateX(40deg) scaleY(1)';
        }, 150);
      }

      // Return others to original upper position
      handles.forEach((h, hIdx) => {
        if (hIdx !== idx && h) {
          h.style.transform = 'rotateX(-25deg)';
        }
      });
    });
  });

  // Init position
  handles.forEach((h, hIdx) => {
    if (h) {
      if (hIdx === 0) h.style.transform = 'rotateX(40deg)';
      else h.style.transform = 'rotateX(-25deg)';
    }
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('switchboard-container') as HTMLDivElement | null;
if (container) {
  const slots = container.querySelectorAll('.lever-slot');
  const handles = [
    container.querySelector('#lever-handle-0') as HTMLDivElement,
    container.querySelector('#lever-handle-1') as HTMLDivElement,
    container.querySelector('#lever-handle-2') as HTMLDivElement
  ];

  slots.forEach((slot, idx) => {
    const slotEl = slot as HTMLDivElement;
    slotEl.addEventListener('click', () => {
      if (slotEl.classList.contains('active')) return;

      slots.forEach(s => (s as HTMLElement).classList.remove('active'));
      slotEl.classList.add('active');

      const handle = handles[idx];
      if (handle) {
        handle.style.transform = 'rotateX(40deg) scaleY(1.15)';
        setTimeout(() => {
          handle.style.transform = 'rotateX(40deg) scaleY(1)';
        }, 150);
      }

      handles.forEach((h, hIdx) => {
        if (hIdx !== idx && h) {
          h.style.transform = 'rotateX(-25deg)';
        }
      });
    });
  });

  handles.forEach((h, hIdx) => {
    if (h) {
      if (hIdx === 0) h.style.transform = 'rotateX(40deg)';
      else h.style.transform = 'rotateX(-25deg)';
    }
  });
}`,
  css: `/* Mechanical Lever Switchboard styles */
.switchboard-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #090b0d 0%, #020304 100%);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.switchboard-plate {
  width: 320px;
  background: linear-gradient(135deg, #11141a 0%, #0a0c10 100%);
  border: 2px solid #1a1e26;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: inset 0 2px 10px rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.7);
}

.switchboard-header {
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.03);
  padding-bottom: 8px;
  text-align: center;
}

.levers-row {
  display: flex;
  justify-content: space-around;
  perspective: 800px;
}

.lever-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  width: 60px;
}

.lever-led {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1e242d;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.8);
  transition: background 0.4s ease, box-shadow 0.4s ease;
}

.lever-track {
  position: relative;
  width: 14px;
  height: 64px;
  background: #06070a;
  border: 1.5px solid #1c222b;
  border-radius: 7px;
  box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  transform-style: preserve-3d;
}

.lever-handle {
  position: absolute;
  top: calc(50% - 15px);
  width: 8px;
  height: 30px;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center center;
}

.lever-arm {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #5c697d 0%, #3e4857 100%);
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

.lever-knob {
  position: absolute;
  bottom: -4px;
  left: -3px;
  width: 14px;
  height: 10px;
  background: linear-gradient(135deg, #1b2029 0%, #0d1014 100%);
  border: 1px solid #2e3646;
  border-radius: 3px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.lever-label {
  font-family: 'Outfit', sans-serif;
  font-size: 8px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

/* Active Lever highlights */
.lever-slot.active[data-index="0"] .lever-led { background: #00ff66; box-shadow: 0 0 10px #00ff66; }
.lever-slot.active[data-index="0"] .lever-knob { background: #00ff66; border-color: #ffffff; }
.lever-slot.active[data-index="0"] .lever-label { color: #00ff66; }

.lever-slot.active[data-index="1"] .lever-led { background: #00f2fe; box-shadow: 0 0 10px #00f2fe; }
.lever-slot.active[data-index="1"] .lever-knob { background: #00f2fe; border-color: #ffffff; }
.lever-slot.active[data-index="1"] .lever-label { color: #00f2fe; }

.lever-slot.active[data-index="2"] .lever-led { background: #ff007f; box-shadow: 0 0 10px #ff007f; }
.lever-slot.active[data-index="2"] .lever-knob { background: #ff007f; border-color: #ffffff; }
.lever-slot.active[data-index="2"] .lever-label { color: #ff007f; }
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#090b0d] to-[#020304] border border-cyan-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="switchboard-container">
  <div class="w-[320px] bg-gradient-to-br from-[#11141a] to-[#0a0c10] border-2 border-[#1a1e26] rounded-2xl p-4 flex flex-col gap-5 shadow-2xl">
    <div class="font-mono text-[9px] font-extrabold text-white/25 tracking-widest border-b border-white/5 pb-2 text-center">NODE_ENGAGE_BOARD</div>
    
    <div class="flex justify-around [perspective:800px] levers-row">
      
      <!-- Lever 1 (REACTOR) -->
      <div class="flex flex-col items-center gap-3 cursor-pointer w-[60px] lever-slot active" data-index="0" data-color="#00ff66">
        <div class="w-1.5 h-1.5 rounded-full bg-[#1e242d] transition-all duration-400 lever-led"></div>
        <div class="relative w-3.5 h-16 bg-[#06070a] border border-[#1c222b] rounded-full shadow-[inset_0_3px_10px_rgba(0,0,0,0.9)] flex justify-center [transform-style:preserve-3d]">
          <div class="absolute top-[calc(50%-15px)] w-2 h-7.5 [transform-style:preserve-3d] transition-transform duration-400 ease-out origin-center lever-handle" id="lever-handle-0">
            <div class="absolute inset-0 bg-gradient-to-r from-[#5c697d] to-[#3e4857] rounded shadow-md"></div>
            <div class="absolute -bottom-1 -left-[3px] w-3.5 h-2.5 bg-gradient-to-br from-[#1b2029] to-[#0d1014] border border-[#2e3646] rounded shadow-lg transition-all duration-400 lever-knob"></div>
          </div>
        </div>
        <span class="font-sans text-[8px] font-black text-white/30 tracking-wide transition-colors duration-300 lever-label">REACTOR</span>
      </div>

      <!-- Lever 2 (THRUSTER) -->
      <div class="flex flex-col items-center gap-3 cursor-pointer w-[60px] lever-slot" data-index="1" data-color="#00f2fe">
        <div class="w-1.5 h-1.5 rounded-full bg-[#1e242d] transition-all duration-400 lever-led"></div>
        <div class="relative w-3.5 h-16 bg-[#06070a] border border-[#1c222b] rounded-full shadow-[inset_0_3px_10px_rgba(0,0,0,0.9)] flex justify-center [transform-style:preserve-3d]">
          <div class="absolute top-[calc(50%-15px)] w-2 h-7.5 [transform-style:preserve-3d] transition-transform duration-400 ease-out origin-center lever-handle" id="lever-handle-1">
            <div class="absolute inset-0 bg-gradient-to-r from-[#5c697d] to-[#3e4857] rounded shadow-md"></div>
            <div class="absolute -bottom-1 -left-[3px] w-3.5 h-2.5 bg-gradient-to-br from-[#1b2029] to-[#0d1014] border border-[#2e3646] rounded shadow-lg transition-all duration-400 lever-knob"></div>
          </div>
        </div>
        <span class="font-sans text-[8px] font-black text-white/30 tracking-wide transition-colors duration-300 lever-label">THRUSTER</span>
      </div>

      <!-- Lever 3 (SHIELD) -->
      <div class="flex flex-col items-center gap-3 cursor-pointer w-[60px] lever-slot" data-index="2" data-color="#ff007f">
        <div class="w-1.5 h-1.5 rounded-full bg-[#1e242d] transition-all duration-400 lever-led"></div>
        <div class="relative w-3.5 h-16 bg-[#06070a] border border-[#1c222b] rounded-full shadow-[inset_0_3px_10px_rgba(0,0,0,0.9)] flex justify-center [transform-style:preserve-3d]">
          <div class="absolute top-[calc(50%-15px)] w-2 h-7.5 [transform-style:preserve-3d] transition-transform duration-400 ease-out origin-center lever-handle" id="lever-handle-2">
            <div class="absolute inset-0 bg-gradient-to-r from-[#5c697d] to-[#3e4857] rounded shadow-md"></div>
            <div class="absolute -bottom-1 -left-[3px] w-3.5 h-2.5 bg-gradient-to-br from-[#1b2029] to-[#0d1014] border border-[#2e3646] rounded shadow-lg transition-all duration-400 lever-knob"></div>
          </div>
        </div>
        <span class="font-sans text-[8px] font-black text-white/30 tracking-wide transition-colors duration-300 lever-label">SHIELD</span>
      </div>

    </div>
  </div>
</div>`,
  prompt: 'Design a highly creative 3D mechanical lever switchboard cockpit controls navigation component.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
component.html = component.html.replace('class="lever-slot active"', 'class="lever-slot active"');
