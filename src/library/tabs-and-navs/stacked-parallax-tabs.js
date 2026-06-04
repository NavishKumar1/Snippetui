/**
 * Component: Stacked Parallax Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'stacked-parallax-tabs',
  name: 'Stacked Parallax Tabs',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="parallax-sandbox" id="parallax-tabs-container">
  <div class="parallax-scene" id="parallax-perspective-scene">
    <!-- Panel 1 (Security) -->
    <div class="parallax-card active" data-index="0" data-color="#ff007f" style="--card-z: 40px; --card-fade: 1;">
      <div class="card-glow-edge"></div>
      <div class="card-main">
        <div class="card-top">
          <span class="card-badge">SEC_01</span>
          <span class="card-status-dot pulse-magenta"></span>
        </div>
        <div class="card-body">
          <h3>ENCRYPTION</h3>
          <p>QUANTUM_KEY: SECURE</p>
        </div>
      </div>
    </div>

    <!-- Panel 2 (Analytics) -->
    <div class="parallax-card" data-index="1" data-color="#00f2fe" style="--card-z: -20px; --card-fade: 0.5;">
      <div class="card-glow-edge"></div>
      <div class="card-main">
        <div class="card-top">
          <span class="card-badge">ANL_02</span>
          <span class="card-status-dot pulse-cyan"></span>
        </div>
        <div class="card-body">
          <h3>DATALOGS</h3>
          <p>FLOW_RATE: 432 gb/s</p>
        </div>
      </div>
    </div>

    <!-- Panel 3 (Network) -->
    <div class="parallax-card" data-index="2" data-color="#00ff66" style="--card-z: -40px; --card-fade: 0.35;">
      <div class="card-glow-edge"></div>
      <div class="card-main">
        <div class="card-top">
          <span class="card-badge">NET_03</span>
          <span class="card-status-dot pulse-emerald"></span>
        </div>
        <div class="card-body">
          <h3>BEACON</h3>
          <p>NODE_PING: 8ms</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Stacked Parallax Tabs depth swapping & mouse tracking logic
const container = document.getElementById('parallax-tabs-container');
if (container) {
  const cards = container.querySelectorAll('.parallax-card');
  const scene = container.querySelector('#parallax-perspective-scene');

  // Depth configs for index re-ordering
  const depthLayouts = [
    [ { z: '40px', fade: 1 }, { z: '-20px', fade: 0.5 }, { z: '-40px', fade: 0.35 } ], // Card 0 active
    [ { z: '-20px', fade: 0.5 }, { z: '40px', fade: 1 }, { z: '-40px', fade: 0.35 } ], // Card 1 active
    [ { z: '-40px', fade: 0.35 }, { z: '-20px', fade: 0.5 }, { z: '40px', fade: 1 } ]  // Card 2 active
  ];

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const config = depthLayouts[idx];
      cards.forEach((c, cIdx) => {
        c.style.setProperty('--card-z', config[cIdx].z);
        c.style.setProperty('--card-fade', config[cIdx].fade);
      });
    });
  });

  // Reactive Mouse Parallax Tilt
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);

    // Dynamic rotation tilt
    const tiltX = (y / (rect.height / 2)) * -12;
    const tiltY = (x / (rect.width / 2)) * 12;

    scene.style.transform = \`rotateX(\${15 + tiltX}deg) rotateY(\${-20 + tiltY}deg)\`;
  });

  container.addEventListener('mouseleave', () => {
    // Smooth reset to default tilt
    scene.style.transform = 'rotateX(15deg) rotateY(-20deg)';
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('parallax-tabs-container') as HTMLDivElement | null;
if (container) {
  const cards = container.querySelectorAll('.parallax-card');
  const scene = container.querySelector('#parallax-perspective-scene') as HTMLDivElement;

  const depthLayouts = [
    [ { z: '40px', fade: 1 }, { z: '-20px', fade: 0.5 }, { z: '-40px', fade: 0.35 } ],
    [ { z: '-20px', fade: 0.5 }, { z: '40px', fade: 1 }, { z: '-40px', fade: 0.35 } ],
    [ { z: '-40px', fade: 0.35 }, { z: '-20px', fade: 0.5 }, { z: '40px', fade: 1 } ]
  ];

  cards.forEach((card, idx) => {
    const cardEl = card as HTMLDivElement;
    cardEl.addEventListener('click', () => {
      cards.forEach(c => (c as HTMLElement).classList.remove('active'));
      cardEl.classList.add('active');

      const config = depthLayouts[idx];
      cards.forEach((c, cIdx) => {
        const cEl = c as HTMLDivElement;
        cEl.style.setProperty('--card-z', config[cIdx].z);
        cEl.style.setProperty('--card-fade', config[cIdx].fade.toString());
      });
    });
  });

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);

    const tiltX = (y / (rect.height / 2)) * -12;
    const tiltY = (x / (rect.width / 2)) * 12;

    if (scene) {
      scene.style.transform = \`rotateX(\${15 + tiltX}deg) rotateY(\${-20 + tiltY}deg)\`;
    }
  });

  container.addEventListener('mouseleave', () => {
    if (scene) scene.style.transform = 'rotateX(15deg) rotateY(-20deg)';
  });
}`,
  css: `/* Stacked Parallax Tabs styles */
.parallax-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #07090d 0%, #010203 100%);
  border: 1px solid rgba(0, 242, 254, 0.12);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  perspective: 1000px;
}

.parallax-scene {
  position: relative;
  width: 320px;
  height: 160px;
  display: flex;
  gap: 16px;
  transform: rotateX(15deg) rotateY(-20deg);
  transform-style: preserve-3d;
  transition: transform 0.2s ease-out;
}

.parallax-card {
  --card-z: -20px;
  --card-fade: 0.5;
  position: relative;
  flex: 1;
  height: 100%;
  background: rgba(10, 15, 25, 0.7);
  border: 1.5px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  cursor: pointer;
  transform: translateZ(var(--card-z));
  opacity: var(--card-fade);
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s ease, border-color 0.5s ease;
  transform-style: preserve-3d;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.card-glow-edge {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
  opacity: 0.3;
}

.card-main {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  transform: translateZ(15px);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-badge {
  font-family: 'Fira Code', monospace;
  font-size: 8px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.5px;
}

.card-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.pulse-magenta { color: #ff007f; box-shadow: 0 0 8px #ff007f; }
.pulse-cyan { color: #00f2fe; box-shadow: 0 0 8px #00f2fe; }
.pulse-emerald { color: #00ff66; box-shadow: 0 0 8px #00ff66; }

.card-body h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 4px 0;
  letter-spacing: 0.5px;
}

.card-body p {
  font-family: 'Fira Code', monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

/* Hover highlights */
.parallax-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
}

/* Active Depth states */
.parallax-card.active[data-index="0"] { border-color: rgba(255, 0, 127, 0.35); }
.parallax-card.active[data-index="1"] { border-color: rgba(0, 242, 254, 0.35); }
.parallax-card.active[data-index="2"] { border-color: rgba(0, 255, 102, 0.35); }

.parallax-card.active .card-badge {
  color: #ffffff;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#07090d] to-[#010203] border border-cyan-500/12 rounded-3xl flex items-center justify-center overflow-hidden [perspective:1000px]" id="parallax-tabs-container">
  <div class="relative w-[320px] h-[160px] flex gap-4 [transform:rotateX(15deg)_rotateY(-20deg)] [transform-style:preserve-3d] transition-transform duration-200 ease-out" id="parallax-perspective-scene">
    
    <!-- Panel 1 (Security) -->
    <div class="relative flex-1 h-full bg-[#0a0f19]/70 border border-white/5 rounded-2xl cursor-pointer shadow-2xl transition-all duration-[500ms] ease-out [transform-style:preserve-3d] [&.active]:border-pink-500/35 active parallax-card" data-index="0" data-color="#ff007f" style="transform: translateZ(40px); opacity: 1;">
      <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-30"></div>
      <div class="p-4 h-full flex flex-col justify-between box-border [transform:translateZ(15px)] card-main">
        <div class="flex justify-between items-center">
          <span class="font-mono text-[8px] font-black text-white/35 tracking-wider card-badge">SEC_01</span>
          <span class="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ff007f]"></span>
        </div>
        <div>
          <h3 class="font-sans text-[13px] font-extrabold text-white tracking-wide m-0 mb-1">ENCRYPTION</h3>
          <p class="font-mono text-[7.5px] text-white/40 m-0">QUANTUM_KEY: SECURE</p>
        </div>
      </div>
    </div>

    <!-- Panel 2 (Analytics) -->
    <div class="relative flex-1 h-full bg-[#0a0f19]/70 border border-white/5 rounded-2xl cursor-pointer shadow-2xl transition-all duration-[500ms] ease-out [transform-style:preserve-3d] [&.active]:border-cyan-500/35 parallax-card" data-index="1" data-color="#00f2fe" style="transform: translateZ(-20px); opacity: 0.5;">
      <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-30"></div>
      <div class="p-4 h-full flex flex-col justify-between box-border [transform:translateZ(15px)] card-main">
        <div class="flex justify-between items-center">
          <span class="font-mono text-[8px] font-black text-white/35 tracking-wider card-badge">ANL_02</span>
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]"></span>
        </div>
        <div>
          <h3 class="font-sans text-[13px] font-extrabold text-white tracking-wide m-0 mb-1">DATALOGS</h3>
          <p class="font-mono text-[7.5px] text-white/40 m-0">FLOW_RATE: 432 gb/s</p>
        </div>
      </div>
    </div>

    <!-- Panel 3 (Network) -->
    <div class="relative flex-1 h-full bg-[#0a0f19]/70 border border-white/5 rounded-2xl cursor-pointer shadow-2xl transition-all duration-[500ms] ease-out [transform-style:preserve-3d] [&.active]:border-emerald-500/35 parallax-card" data-index="2" data-color="#00ff66" style="transform: translateZ(-40px); opacity: 0.35;">
      <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-30"></div>
      <div class="p-4 h-full flex flex-col justify-between box-border [transform:translateZ(15px)] card-main">
        <div class="flex justify-between items-center">
          <span class="font-mono text-[8px] font-black text-white/35 tracking-wider card-badge">NET_03</span>
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00ff66]"></span>
        </div>
        <div>
          <h3 class="font-sans text-[13px] font-extrabold text-white tracking-wide m-0 mb-1">BEACON</h3>
          <p class="font-mono text-[7.5px] text-white/40 m-0">NODE_PING: 8ms</p>
        </div>
      </div>
    </div>

  </div>
</div>`,
  prompt: 'Design a highly creative glassmorphic 3D perspective stacked parallax HUD cards navigation component.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
component.html = component.html.replace('class="parallax-card active"', 'class="parallax-card active"');
