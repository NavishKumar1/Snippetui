/**
 * Component: Vertical Cyber Sidebar
 * Category: tabs-and-navs
 */

export const component = {
  id: 'vertical-cyber-sidebar',
  name: 'Vertical Cyber Sidebar',
  category: 'tabs-and-navs',
  tag: 'Creative',
  html: `<div class="sidebar-sandbox" id="cyber-sidebar-container">
  <div class="cyber-sidebar">
    <div class="sidebar-brand">NODE_CONTROL</div>
    
    <div class="sidebar-nav-list">
      <button class="sidebar-tab active" data-index="0">
        <span class="tab-indicator"></span>
        <span class="tab-icon">⚡</span> OVERVIEW
      </button>
      <button class="sidebar-tab" data-index="1">
        <span class="tab-indicator"></span>
        <span class="tab-icon">📁</span> ARCHIVE
      </button>
      <button class="sidebar-tab" data-index="2">
        <span class="tab-indicator"></span>
        <span class="tab-icon">📶</span> NETWORK
      </button>
      <button class="sidebar-tab" data-index="3">
        <span class="tab-indicator"></span>
        <span class="tab-icon">🛠️</span> ENGINE
      </button>
    </div>
    
    <div class="sidebar-status">
      <div class="status-gauge">
        <div class="gauge-fill"></div>
      </div>
      <div class="status-label">MEM_LOAD: 34.2%</div>
    </div>
  </div>
</div>`,
  js: `// Vertical Cyber Sidebar selection logic
const container = document.getElementById('cyber-sidebar-container');
if (container) {
  const tabs = container.querySelectorAll('.sidebar-tab');
  const fill = container.querySelector('.gauge-fill');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Randomise meme gauge fill on tab switch
      const randomPct = Math.floor(Math.random() * 60) + 20;
      fill.style.width = \`\${randomPct}%\`;
      container.querySelector('.status-label').textContent = \`MEM_LOAD: \${randomPct}.2%\`;
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('cyber-sidebar-container') as HTMLDivElement | null;
if (container) {
  const tabs = container.querySelectorAll('.sidebar-tab');
  const fill = container.querySelector('.gauge-fill') as HTMLDivElement;
  const label = container.querySelector('.status-label') as HTMLDivElement;

  tabs.forEach(tab => {
    const tabEl = tab as HTMLButtonElement;
    tabEl.addEventListener('click', () => {
      tabs.forEach(t => (t as HTMLElement).classList.remove('active'));
      tabEl.classList.add('active');

      const randomPct = Math.floor(Math.random() * 60) + 20;
      fill.style.width = \`\${randomPct}%\`;
      label.textContent = \`MEM_LOAD: \${randomPct}.2%\`;
    });
  });
}`,
  css: `/* Vertical Cyber Sidebar styles */
.sidebar-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #070e11 0%, #020405 100%);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.cyber-sidebar {
  width: 220px;
  background: rgba(10, 15, 20, 0.85);
  border: 1.5px solid rgba(0, 242, 254, 0.25);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
}

.sidebar-brand {
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  font-weight: 800;
  color: #00f2fe;
  letter-spacing: 1px;
  border-bottom: 1.5px dashed rgba(0, 242, 254, 0.25);
  padding-bottom: 8px;
  text-align: center;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.4);
}

.sidebar-nav-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar-tab {
  position: relative;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  padding: 10px 14px;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s;
}

.sidebar-tab:hover {
  background: rgba(255, 255, 255, 0.02);
  color: #ffffff;
}

.sidebar-tab.active {
  background: rgba(0, 242, 254, 0.06);
  border: 1px solid rgba(0, 242, 254, 0.2);
  color: #00f2fe;
}

.tab-indicator {
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 3px;
  background: #00f2fe;
  border-radius: 0 3px 3px 0;
  opacity: 0;
  transition: opacity 0.3s;
}

.sidebar-tab.active .tab-indicator {
  opacity: 1;
  box-shadow: 0 0 8px #00f2fe;
}

.tab-icon {
  font-size: 12px;
}

.sidebar-status {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px dashed rgba(255,255,255,0.06);
  padding-top: 12px;
}

.status-gauge {
  height: 4px;
  background: rgba(255,255,255,0.05);
  border-radius: 2px;
  overflow: hidden;
}

.gauge-fill {
  width: 34.2%;
  height: 100%;
  background: #00f2fe;
  box-shadow: 0 0 8px #00f2fe;
  transition: width 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.status-label {
  font-family: 'Fira Code', monospace;
  font-size: 8.5px;
  color: rgba(255, 255, 255, 0.4);
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#070e11] to-[#020405] border border-cyan-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="cyber-sidebar-container">
  <div class="cyber-sidebar w-[220px] bg-[#0a0f14]/85 border border-cyan-400/25 rounded-xl p-4 flex flex-col gap-5 shadow-2xl">
    <div class="sidebar-brand font-mono text-[11px] font-extrabold text-[#00f2fe] tracking-wider border-b border-dashed border-cyan-400/25 pb-2 text-center text-shadow-[0_0_8px_rgba(0,242,254,0.4)]">NODE_CONTROL</div>
    
    <div class="sidebar-nav-list flex flex-col gap-1.5">
      <button class="sidebar-tab active relative bg-transparent border-none text-white/50 hover:text-white font-sans text-[11px] font-bold px-3.5 py-2.5 text-left cursor-pointer rounded-md flex items-center gap-3 transition [&.active]:bg-cyan-500/5 [&.active]:border [&.active]:border-cyan-500/20 [&.active]:text-[#00f2fe] active-sidebar-tab" data-index="0">
        <span class="tab-indicator absolute left-0 top-[6px] bottom-[6px] w-[3px] bg-[#00f2fe] rounded-r opacity-0 transition-opacity duration-300 active-indicator"></span>
        <span class="tab-icon text-xs">⚡</span> OVERVIEW
      </button>
      <button class="sidebar-tab relative bg-transparent border-none text-white/50 hover:text-white font-sans text-[11px] font-bold px-3.5 py-2.5 text-left cursor-pointer rounded-md flex items-center gap-3 transition [&.active]:bg-cyan-500/5 [&.active]:border [&.active]:border-cyan-500/20 [&.active]:text-[#00f2fe]" data-index="1">
        <span class="tab-indicator absolute left-0 top-[6px] bottom-[6px] w-[3px] bg-[#00f2fe] rounded-r opacity-0 transition-opacity duration-300"></span>
        <span class="tab-icon text-xs">📁</span> ARCHIVE
      </button>
      <button class="sidebar-tab relative bg-transparent border-none text-white/50 hover:text-white font-sans text-[11px] font-bold px-3.5 py-2.5 text-left cursor-pointer rounded-md flex items-center gap-3 transition [&.active]:bg-cyan-500/5 [&.active]:border [&.active]:border-cyan-500/20 [&.active]:text-[#00f2fe]" data-index="2">
        <span class="tab-indicator absolute left-0 top-[6px] bottom-[6px] w-[3px] bg-[#00f2fe] rounded-r opacity-0 transition-opacity duration-300"></span>
        <span class="tab-icon text-xs">📶</span> NETWORK
      </button>
      <button class="sidebar-tab relative bg-transparent border-none text-white/50 hover:text-white font-sans text-[11px] font-bold px-3.5 py-2.5 text-left cursor-pointer rounded-md flex items-center gap-3 transition [&.active]:bg-cyan-500/5 [&.active]:border [&.active]:border-cyan-500/20 [&.active]:text-[#00f2fe]" data-index="3">
        <span class="tab-indicator absolute left-0 top-[6px] bottom-[6px] w-[3px] bg-[#00f2fe] rounded-r opacity-0 transition-opacity duration-300"></span>
        <span class="tab-icon text-xs">🛠️</span> ENGINE
      </button>
    </div>
    
    <div class="sidebar-status flex flex-col gap-1.5 border-t border-dashed border-white/5 pt-3">
      <div class="status-gauge h-1 bg-white/5 rounded overflow-hidden">
        <div class="gauge-fill w-[34.2%] h-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe] transition-all duration-500 ease-out"></div>
      </div>
      <div class="status-label font-mono text-[8.5px] text-white/40">MEM_LOAD: 34.2%</div>
    </div>
  </div>
</div>`,
  prompt: 'Design a high-tech vertical command sidebar navigation selector featuring indicator glow bars.'
};
component.tailwind = component.tailwind.replace('class="sidebar-tab active relative bg-transparent border-none px-3.5 py-2.5 text-left cursor-pointer rounded-md flex items-center gap-3 transition [&.active]:bg-cyan-500/5 [&.active]:border [&.active]:border-cyan-500/20 [&.active]:text-[#00f2fe] active-sidebar-tab"', 'class="sidebar-tab active relative bg-transparent border-none px-3.5 py-2.5 text-left cursor-pointer rounded-md flex items-center gap-3 transition [&.active]:bg-cyan-500/5 [&.active]:border [&.active]:border-cyan-500/20 [&.active]:text-[#00f2fe]"');
component.tailwind = component.tailwind.replace('class="tab-indicator absolute left-0 top-[6px] bottom-[6px] w-[3px] bg-[#00f2fe] rounded-r opacity-0 transition-opacity duration-300 active-indicator"', 'class="tab-indicator absolute left-0 top-[6px] bottom-[6px] w-[3px] bg-[#00f2fe] rounded-r transition-opacity duration-300"');
