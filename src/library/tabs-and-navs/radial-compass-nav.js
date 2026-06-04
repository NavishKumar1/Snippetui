/**
 * Component: Radial Compass Nav
 * Category: tabs-and-navs
 */

export const component = {
  id: 'radial-compass-nav',
  name: 'Radial Compass Nav',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="radial-nav-sandbox" id="radial-nav-container">
  <div class="compass-wrapper">
    <div class="compass-dial">
      <div class="compass-ringouter"></div>
      <div class="compass-ringinner"></div>
      
      <button class="compass-node active" data-deg="0" data-index="0">N</button>
      <button class="compass-node" data-deg="90" data-index="1">E</button>
      <button class="compass-node" data-deg="180" data-index="2">S</button>
      <button class="compass-node" data-deg="270" data-index="3">W</button>
    </div>
    <div class="compass-crosshair"></div>
    <div class="compass-display">HEADING: <span id="compass-val">0°</span></div>
  </div>
</div>`,
  js: `// Radial Compass Navigation dial rotation logic
const container = document.getElementById('radial-nav-container');
if (container) {
  const dial = container.querySelector('.compass-dial');
  const nodes = container.querySelectorAll('.compass-node');
  const val = container.querySelector('#compass-val');

  nodes.forEach(node => {
    node.style.transform = \`rotate(\${node.getAttribute('data-deg')}deg) translateY(-60px) rotate(-\${node.getAttribute('data-deg')}deg)\`;

    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const deg = parseInt(node.getAttribute('data-deg'));
      
      // Rotate dial in opposing direction to put the active item at the top (0 deg position)
      dial.style.transform = \`rotate(-\${deg}deg)\`;

      // Update readout value
      val.textContent = \`\${deg}°\`;
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('radial-nav-container') as HTMLDivElement | null;
if (container) {
  const dial = container.querySelector('.compass-dial') as HTMLDivElement;
  const nodes = container.querySelectorAll('.compass-node');
  const val = container.querySelector('#compass-val') as HTMLSpanElement;

  nodes.forEach(node => {
    const nodeEl = node as HTMLButtonElement;
    const degAttr = nodeEl.getAttribute('data-deg') || '0';
    nodeEl.style.transform = \`rotate(\${degAttr}deg) translateY(-60px) rotate(-\${degAttr}deg)\`;

    nodeEl.addEventListener('click', () => {
      nodes.forEach(n => (n as HTMLElement).classList.remove('active'));
      nodeEl.classList.add('active');

      const deg = parseInt(degAttr);
      dial.style.transform = \`rotate(-\${deg}deg)\`;
      val.textContent = \`\${deg}°\`;
    });
  });
}`,
  css: `/* Radial Compass Nav styles */
.radial-nav-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #060b0e 0%, #020405 100%);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.compass-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.compass-dial {
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 1px solid rgba(0, 242, 254, 0.15);
  transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
  transform-style: preserve-3d;
}

.compass-ringouter {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1.5px dashed rgba(0, 242, 254, 0.35);
  animation: compassRotate 12s linear infinite;
}

.compass-ringinner {
  position: absolute;
  inset: 12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.compass-node {
  position: absolute;
  top: calc(50% - 14px);
  left: calc(50% - 14px);
  width: 28px;
  height: 28px;
  background: #0d1216;
  border: 1.5px solid rgba(0, 242, 254, 0.2);
  color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.compass-node.active {
  background: #00f2fe;
  color: #020405;
  border-color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.6);
  font-weight: 900;
}

.compass-crosshair {
  position: absolute;
  top: 10px;
  width: 2px;
  height: 12px;
  background: #00f2fe;
  box-shadow: 0 0 8px #00f2fe;
  pointer-events: none;
}

.compass-display {
  position: absolute;
  bottom: -32px;
  font-family: 'Fira Code', monospace;
  font-size: 10px;
  color: rgba(0, 242, 254, 0.7);
  letter-spacing: 0.5px;
}

@keyframes compassRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#060b0e] to-[#020405] border border-cyan-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="radial-nav-container">
  <div class="relative w-40 h-40 flex items-center justify-center">
    <div class="compass-dial absolute w-[140px] h-[140px] rounded-full border border-cyan-500/15 transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] [transform-style:preserve-3d]">
      <div class="absolute inset-[-6px] rounded-full border-1.5 border-dashed border-cyan-400/35 animate-[spin_12s_linear_infinite]"></div>
      <div class="absolute inset-[12px] rounded-full border border-white/3"></div>
      
      <button class="compass-node active absolute top-[calc(50%-14px)] left-[calc(50%-14px)] w-7 h-7 bg-[#0d1216] border-1.5 border-cyan-500/20 text-white/50 hover:text-white rounded-full font-sans text-[11px] font-extrabold flex items-center justify-center cursor-pointer z-20 transition [&.active]:bg-cyan-400 [&.active]:text-[#020405] [&.active]:border-white [&.active]:shadow-[0_0_15px_rgba(0,242,254,0.6)]" data-deg="0" data-index="0">N</button>
      <button class="compass-node absolute top-[calc(50%-14px)] left-[calc(50%-14px)] w-7 h-7 bg-[#0d1216] border-1.5 border-cyan-500/20 text-white/50 hover:text-white rounded-full font-sans text-[11px] font-extrabold flex items-center justify-center cursor-pointer z-20 transition [&.active]:bg-cyan-400 [&.active]:text-[#020405] [&.active]:border-white [&.active]:shadow-[0_0_15px_rgba(0,242,254,0.6)]" data-deg="90" data-index="1">E</button>
      <button class="compass-node absolute top-[calc(50%-14px)] left-[calc(50%-14px)] w-7 h-7 bg-[#0d1216] border-1.5 border-cyan-500/20 text-white/50 hover:text-white rounded-full font-sans text-[11px] font-extrabold flex items-center justify-center cursor-pointer z-20 transition [&.active]:bg-cyan-400 [&.active]:text-[#020405] [&.active]:border-white [&.active]:shadow-[0_0_15px_rgba(0,242,254,0.6)]" data-deg="180" data-index="2">S</button>
      <button class="compass-node absolute top-[calc(50%-14px)] left-[calc(50%-14px)] w-7 h-7 bg-[#0d1216] border-1.5 border-cyan-500/20 text-white/50 hover:text-white rounded-full font-sans text-[11px] font-extrabold flex items-center justify-center cursor-pointer z-20 transition [&.active]:bg-cyan-400 [&.active]:text-[#020405] [&.active]:border-white [&.active]:shadow-[0_0_15px_rgba(0,242,254,0.6)]" data-deg="270" data-index="3">W</button>
    </div>
    <div class="absolute top-2.5 w-[2px] h-3 bg-cyan-400 shadow-[0_0_8px_#00f2fe] pointer-events-none"></div>
    <div class="absolute -bottom-8 font-mono text-[10px] text-cyan-400/70 tracking-wide">HEADING: <span id="compass-val">0°</span></div>
  </div>
</div>`,
  prompt: 'Design a highly creative rotating mechanical compass radial dial tab bar navigator component.'
};
component.html = component.html.replace('class="compass-node active"', 'class="compass-node active"');
