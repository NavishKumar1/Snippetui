/**
 * Component: Bipolar Split Sidebar
 * Category: tabs-and-navs
 */

export const component = {
  id: 'bipolar-split-sidebar',
  name: 'Bipolar Split Sidebar',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="bipolar-sidebar-sandbox" id="bipolar-sidebar-container">
  <div class="bipolar-sidebar">
    <!-- Left panel -->
    <div class="sidebar-panel left-panel">
      <div class="panel-header">SYSTEM</div>
      <div class="tab-list">
        <button class="bipolar-tab active" data-target="core" data-side="left">
          <span class="glow-dot"></span> CORE_SYS
        </button>
        <button class="bipolar-tab" data-target="nodes" data-side="left">
          <span class="glow-dot"></span> NODE_NET
        </button>
      </div>
    </div>

    <!-- Center splitting line / gate mechanism -->
    <div class="sidebar-gate">
      <div class="gate-line"></div>
      <div class="gate-clamp" id="bipolar-gate-clamp">
        <div class="clamp-energy"></div>
      </div>
    </div>

    <!-- Right panel -->
    <div class="sidebar-panel right-panel">
      <div class="panel-header">METRICS</div>
      <div class="tab-list">
        <button class="bipolar-tab" data-target="flux" data-side="right">
          FLUX_CAP <span class="glow-dot"></span>
        </button>
        <button class="bipolar-tab" data-target="optics" data-side="right">
          OPTC_LNK <span class="glow-dot"></span>
        </button>
      </div>
    </div>
  </div>
  <div class="bipolar-status-screen">
    ACTIVE SECTOR: <span id="bipolar-sector-val">CORE_SYS</span>
  </div>
</div>`,
  js: `// Bipolar Split Sidebar selection and clamping logic
const container = document.getElementById('bipolar-sidebar-container');
if (container) {
  const tabs = container.querySelectorAll('.bipolar-tab');
  const clamp = container.querySelector('#bipolar-gate-clamp');
  const sectorVal = container.querySelector('#bipolar-sector-val');

  const positions = {
    'core': { top: '38px', color: '#00f2fe', text: 'CORE_SYS' },
    'nodes': { top: '82px', color: '#00f2fe', text: 'NODE_NET' },
    'flux': { top: '38px', color: '#ff007f', text: 'FLUX_CAP' },
    'optics': { top: '82px', color: '#ff007f', text: 'OPTC_LNK' }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-target');
      const side = tab.getAttribute('data-side');
      const config = positions[target];

      if (config) {
        // Move clamp vertically and transition its energy color
        clamp.style.top = config.top;
        clamp.style.setProperty('--clamp-color', config.color);
        clamp.style.setProperty('--clamp-glow', side === 'left' ? '-10px' : '10px');
        
        // Dynamic scaling snap effect
        clamp.style.transform = 'translate(-50%, -50%) scale(1.3)';
        setTimeout(() => {
          clamp.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);

        sectorVal.textContent = config.text;
        sectorVal.style.color = config.color;
      }
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('bipolar-sidebar-container') as HTMLDivElement | null;
if (container) {
  const tabs = container.querySelectorAll('.bipolar-tab');
  const clamp = container.querySelector('#bipolar-gate-clamp') as HTMLDivElement;
  const sectorVal = container.querySelector('#bipolar-sector-val') as HTMLSpanElement;

  interface PositionConfig {
    top: string;
    color: string;
    text: string;
  }

  const positions: Record<string, PositionConfig> = {
    'core': { top: '38px', color: '#00f2fe', text: 'CORE_SYS' },
    'nodes': { top: '82px', color: '#00f2fe', text: 'NODE_NET' },
    'flux': { top: '38px', color: '#ff007f', text: 'FLUX_CAP' },
    'optics': { top: '82px', color: '#ff007f', text: 'OPTC_LNK' }
  };

  tabs.forEach(tab => {
    const tabEl = tab as HTMLButtonElement;
    tabEl.addEventListener('click', () => {
      tabs.forEach(t => (t as HTMLElement).classList.remove('active'));
      tabEl.classList.add('active');

      const target = tabEl.getAttribute('data-target') || 'core';
      const side = tabEl.getAttribute('data-side') || 'left';
      const config = positions[target];

      if (config) {
        clamp.style.top = config.top;
        clamp.style.setProperty('--clamp-color', config.color);
        clamp.style.setProperty('--clamp-glow', side === 'left' ? '-10px' : '10px');
        
        clamp.style.transform = 'translate(-50%, -50%) scale(1.3)';
        setTimeout(() => {
          clamp.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);

        sectorVal.textContent = config.text;
        sectorVal.style.color = config.color;
      }
    });
  });
}`,
  css: `/* Bipolar Split Sidebar styles */
.bipolar-sidebar-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #0b0713 0%, #030106 100%);
  border: 1px solid rgba(255, 0, 127, 0.15);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  gap: 16px;
}

.bipolar-sidebar {
  display: flex;
  align-items: stretch;
  width: 320px;
  height: 140px;
  background: rgba(15, 8, 25, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  overflow: relative;
}

.sidebar-panel {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.left-panel {
  border-radius: 14px 0 0 14px;
}

.right-panel {
  border-radius: 0 14px 14px 0;
  align-items: flex-end;
}

.panel-header {
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.3);
}

.tab-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.bipolar-tab {
  background: transparent;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
}

.left-panel .bipolar-tab {
  justify-content: flex-start;
  border-left: 2px solid transparent;
}

.right-panel .bipolar-tab {
  justify-content: flex-end;
  border-right: 2px solid transparent;
}

.bipolar-tab:hover {
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.02);
}

.left-panel .bipolar-tab.active {
  color: #00f2fe;
  background: rgba(0, 242, 254, 0.05);
  border-left-color: #00f2fe;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.4);
}

.right-panel .bipolar-tab.active {
  color: #ff007f;
  background: rgba(255, 0, 127, 0.05);
  border-right-color: #ff007f;
  text-shadow: 0 0 8px rgba(255, 0, 127, 0.4);
}

.glow-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.bipolar-tab.active .glow-dot {
  opacity: 1;
  box-shadow: 0 0 6px currentColor;
}

/* Center Gate mechanism */
.sidebar-gate {
  position: relative;
  width: 2px;
  background: rgba(255, 255, 255, 0.06);
}

.gate-line {
  position: absolute;
  inset: 0;
}

.gate-clamp {
  --clamp-color: #00f2fe;
  --clamp-glow: -10px;
  position: absolute;
  top: 38px;
  left: 50%;
  width: 10px;
  height: 24px;
  background: #110920;
  border: 1.5px solid var(--clamp-color);
  border-radius: 5px;
  transform: translate(-50%, -50%);
  transition: top 0.5s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.5s ease, transform 0.2s ease;
  z-index: 5;
}

.clamp-energy {
  position: absolute;
  inset: 2px;
  background: var(--clamp-color);
  border-radius: 2px;
  opacity: 0.8;
  box-shadow: 0 0 10px var(--clamp-color), var(--clamp-glow) 0 15px var(--clamp-color);
  transition: background-color 0.5s ease, box-shadow 0.5s ease;
}

.bipolar-status-screen {
  font-family: 'Fira Code', monospace;
  font-size: 9.5px;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
}

#bipolar-sector-val {
  color: #00f2fe;
  font-weight: 800;
  transition: color 0.5s ease;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#0b0713] to-[#030106] border border-pink-500/15 rounded-3xl flex flex-col items-center justify-center overflow-hidden gap-4" id="bipolar-sidebar-container">
  <div class="relative flex items-stretch w-80 h-[140px] bg-[#150819]/65 border border-white/5 rounded-2xl">
    
    <!-- Left panel -->
    <div class="flex-1 p-3 flex flex-col gap-2.5 rounded-l-2xl">
      <div class="font-mono text-[9px] font-extrabold tracking-widest text-white/30">SYSTEM</div>
      <div class="flex flex-col gap-2 w-full">
        <button class="bipolar-tab active w-full bg-transparent border-none font-sans text-[11px] font-bold text-white/40 hover:text-white/80 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2 transition-all duration-300 border-l-2 border-transparent [&.active]:text-[#00f2fe] [&.active]:bg-cyan-500/5 [&.active]:border-cyan-400" data-target="core" data-side="left">
          <span class="w-1 h-1 rounded-full bg-current opacity-30 transition-opacity duration-300 [&.active]:opacity-100"></span> CORE_SYS
        </button>
        <button class="bipolar-tab w-full bg-transparent border-none font-sans text-[11px] font-bold text-white/40 hover:text-white/80 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2 transition-all duration-300 border-l-2 border-transparent [&.active]:text-[#00f2fe] [&.active]:bg-cyan-500/5 [&.active]:border-cyan-400" data-target="nodes" data-side="left">
          <span class="w-1 h-1 rounded-full bg-current opacity-30 transition-opacity duration-300 [&.active]:opacity-100"></span> NODE_NET
        </button>
      </div>
    </div>

    <!-- Center splitting line / gate mechanism -->
    <div class="relative w-[2px] bg-white/5">
      <div class="absolute inset-0"></div>
      <div class="gate-clamp absolute top-[38px] left-1/2 w-2.5 h-6 bg-[#110920] border-1.5 border-cyan-400 rounded-md -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-10" id="bipolar-gate-clamp" style="--clamp-color: #00f2fe; --clamp-glow: -10px;">
        <div class="absolute inset-[2px] bg-[var(--clamp-color)] rounded-[2px] opacity-80 shadow-[0_0_10px_var(--clamp-color)] transition-colors duration-500"></div>
      </div>
    </div>

    <!-- Right panel -->
    <div class="flex-1 p-3 flex flex-col gap-2.5 rounded-r-2xl items-end">
      <div class="font-mono text-[9px] font-extrabold tracking-widest text-white/30">METRICS</div>
      <div class="flex flex-col gap-2 w-full items-end">
        <button class="bipolar-tab w-full bg-transparent border-none font-sans text-[11px] font-bold text-white/40 hover:text-white/80 px-3 py-2 rounded-md cursor-pointer flex items-center justify-end gap-2 transition-all duration-300 border-r-2 border-transparent [&.active]:text-[#ff007f] [&.active]:bg-pink-500/5 [&.active]:border-pink-500" data-target="flux" data-side="right">
          FLUX_CAP <span class="w-1 h-1 rounded-full bg-current opacity-30 transition-opacity duration-300 [&.active]:opacity-100"></span>
        </button>
        <button class="bipolar-tab w-full bg-transparent border-none font-sans text-[11px] font-bold text-white/40 hover:text-white/80 px-3 py-2 rounded-md cursor-pointer flex items-center justify-end gap-2 transition-all duration-300 border-r-2 border-transparent [&.active]:text-[#ff007f] [&.active]:bg-pink-500/5 [&.active]:border-pink-500" data-target="optics" data-side="right">
          OPTC_LNK <span class="w-1 h-1 rounded-full bg-current opacity-30 transition-opacity duration-300 [&.active]:opacity-100"></span>
        </button>
      </div>
    </div>

  </div>
  <div class="font-mono text-[9.5px] text-white/30 tracking-wider">
    ACTIVE SECTOR: <span id="bipolar-sector-val" class="text-cyan-400 font-extrabold transition-colors duration-500">CORE_SYS</span>
  </div>
</div>`,
  prompt: 'Design a bipolar split sidebar panel navigation with a centering electromagnetic clamp active indicator slider.'
};
