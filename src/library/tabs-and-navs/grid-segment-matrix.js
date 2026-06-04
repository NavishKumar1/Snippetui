/**
 * Component: Grid Segment Matrix
 * Category: tabs-and-navs
 */

export const component = {
  id: 'grid-segment-matrix',
  name: 'Grid Segment Matrix',
  category: 'tabs-and-navs',
  tag: 'Creative',
  html: `<div class="grid-matrix-sandbox" id="grid-matrix-container">
  <div class="matrix-layout">
    <!-- Quadrant A1 -->
    <div class="matrix-cell active" data-cell="a1" data-color="#00ff66">
      <div class="cell-border-corner top-left"></div>
      <div class="cell-border-corner top-right"></div>
      <div class="cell-border-corner bottom-left"></div>
      <div class="cell-border-corner bottom-right"></div>
      <div class="cell-glitch"></div>
      <div class="cell-header">SECTOR_A1</div>
      <div class="cell-title">PWR_GRID</div>
      <div class="cell-status">OPERATIONAL</div>
    </div>
    
    <!-- Quadrant A2 -->
    <div class="matrix-cell" data-cell="a2" data-color="#00f2fe">
      <div class="cell-border-corner top-left"></div>
      <div class="cell-border-corner top-right"></div>
      <div class="cell-border-corner bottom-left"></div>
      <div class="cell-border-corner bottom-right"></div>
      <div class="cell-glitch"></div>
      <div class="cell-header">SECTOR_A2</div>
      <div class="cell-title">SYS_TEMP</div>
      <div class="cell-status">OPTIMAL</div>
    </div>

    <!-- Quadrant B1 -->
    <div class="matrix-cell" data-cell="b1" data-color="#ffb700">
      <div class="cell-border-corner top-left"></div>
      <div class="cell-border-corner top-right"></div>
      <div class="cell-border-corner bottom-left"></div>
      <div class="cell-border-corner bottom-right"></div>
      <div class="cell-glitch"></div>
      <div class="cell-header">SECTOR_B1</div>
      <div class="cell-title">NET_BAND</div>
      <div class="cell-status">SECURE</div>
    </div>

    <!-- Quadrant B2 -->
    <div class="matrix-cell" data-cell="b2" data-color="#ff007f">
      <div class="cell-border-corner top-left"></div>
      <div class="cell-border-corner top-right"></div>
      <div class="cell-border-corner bottom-left"></div>
      <div class="cell-border-corner bottom-right"></div>
      <div class="cell-glitch"></div>
      <div class="cell-header">SECTOR_B2</div>
      <div class="cell-title">MEM_BUFF</div>
      <div class="cell-status">STABLE</div>
    </div>
  </div>

  <div class="matrix-monitor">
    <div class="monitor-glow" id="matrix-monitor-glow"></div>
    <div class="monitor-text">
      MONITOR: <span id="matrix-active-label" style="color: #00ff66;">PWR_GRID</span>
    </div>
  </div>
</div>`,
  js: `// Grid Segment Matrix navigation and interaction logic
const container = document.getElementById('grid-matrix-container');
if (container) {
  const cells = container.querySelectorAll('.matrix-cell');
  const monitorLabel = container.querySelector('#matrix-active-label');
  const monitorGlow = container.querySelector('#matrix-monitor-glow');

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      cells.forEach(c => c.classList.remove('active'));
      cell.classList.add('active');

      const title = cell.querySelector('.cell-title').textContent;
      const color = cell.getAttribute('data-color');

      monitorLabel.textContent = title;
      monitorLabel.style.color = color;
      
      // Update monitor ambient background pulse
      monitorGlow.style.background = color;
      monitorGlow.style.opacity = '0.12';

      // Snap micro-animation
      cell.style.transform = 'scale(0.96)';
      setTimeout(() => {
        cell.style.transform = 'scale(1)';
      }, 150);
    });
  });
}
`,
  ts: `// TypeScript implementation
const container = document.getElementById('grid-matrix-container') as HTMLDivElement | null;
if (container) {
  const cells = container.querySelectorAll('.matrix-cell');
  const monitorLabel = container.querySelector('#matrix-active-label') as HTMLSpanElement;
  const monitorGlow = container.querySelector('#matrix-monitor-glow') as HTMLDivElement;

  cells.forEach(cell => {
    const cellEl = cell as HTMLDivElement;

    cellEl.addEventListener('click', () => {
      cells.forEach(c => (c as HTMLElement).classList.remove('active'));
      cellEl.classList.add('active');

      const titleEl = cellEl.querySelector('.cell-title') as HTMLDivElement;
      const title = titleEl ? titleEl.textContent || '' : '';
      const color = cellEl.getAttribute('data-color') || '#00ff66';

      if (monitorLabel) {
        monitorLabel.textContent = title;
        monitorLabel.style.color = color;
      }
      if (monitorGlow) {
        monitorGlow.style.background = color;
        monitorGlow.style.opacity = '0.12';
      }

      cellEl.style.transform = 'scale(0.96)';
      setTimeout(() => {
        cellEl.style.transform = 'scale(1)';
      }, 150);
    });
  });
}`,
  css: `/* Grid Segment Matrix styles */
.grid-matrix-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #060e0a 0%, #010402 100%);
  border: 1px solid rgba(0, 255, 102, 0.12);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  gap: 12px;
  padding: 12px;
}

.matrix-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 280px;
}

.matrix-cell {
  position: relative;
  height: 64px;
  background: rgba(10, 20, 15, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.cell-border-corner {
  position: absolute;
  width: 4px;
  height: 4px;
  border: 1px solid transparent;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cell-border-corner.top-left { top: 2px; left: 2px; border-width: 1px 0 0 1px; }
.cell-border-corner.top-right { top: 2px; right: 2px; border-width: 1px 1px 0 0; }
.cell-border-corner.bottom-left { bottom: 2px; left: 2px; border-width: 0 0 1px 1px; }
.cell-border-corner.bottom-right { bottom: 2px; right: 2px; border-width: 0 1px 1px 0; }

.matrix-cell:hover {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.08);
}

.matrix-cell.active {
  background: rgba(0, 255, 102, 0.03);
  box-shadow: inset 0 0 12px rgba(0, 255, 102, 0.05);
}

/* Dynamically color active state corners */
.matrix-cell.active[data-cell="a1"] { border-color: rgba(0, 255, 102, 0.3); }
.matrix-cell.active[data-cell="a1"] .cell-border-corner { border-color: #00ff66; opacity: 1; }
.matrix-cell.active[data-cell="a1"] .cell-header { color: #00ff66; }

.matrix-cell.active[data-cell="a2"] { border-color: rgba(0, 242, 254, 0.3); background: rgba(0, 242, 254, 0.03); }
.matrix-cell.active[data-cell="a2"] .cell-border-corner { border-color: #00f2fe; opacity: 1; }
.matrix-cell.active[data-cell="a2"] .cell-header { color: #00f2fe; }

.matrix-cell.active[data-cell="b1"] { border-color: rgba(255, 183, 0, 0.3); background: rgba(255, 183, 0, 0.03); }
.matrix-cell.active[data-cell="b1"] .cell-border-corner { border-color: #ffb700; opacity: 1; }
.matrix-cell.active[data-cell="b1"] .cell-header { color: #ffb700; }

.matrix-cell.active[data-cell="b2"] { border-color: rgba(255, 0, 127, 0.3); background: rgba(255, 0, 127, 0.03); }
.matrix-cell.active[data-cell="b2"] .cell-border-corner { border-color: #ff007f; opacity: 1; }
.matrix-cell.active[data-cell="b2"] .cell-header { color: #ff007f; }

.cell-header {
  font-family: 'Fira Code', monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.cell-title {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.cell-status {
  font-family: 'Fira Code', monospace;
  font-size: 7px;
  color: rgba(255, 255, 255, 0.4);
}

.matrix-monitor {
  position: relative;
  width: 280px;
  height: 32px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.monitor-glow {
  position: absolute;
  inset: 0;
  background: #00ff66;
  opacity: 0.05;
  filter: blur(10px);
  transition: background 0.4s ease, opacity 0.4s ease;
}

.monitor-text {
  font-family: 'Fira Code', monospace;
  font-size: 9.5px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.5px;
  z-index: 2;
}

#matrix-active-label {
  font-weight: 800;
  transition: color 0.4s ease;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#060e0a] to-[#010402] border border-emerald-500/15 rounded-3xl flex flex-col items-center justify-center overflow-hidden gap-3 p-3" id="grid-matrix-container">
  <div class="grid grid-cols-2 gap-2.5 w-[280px]">
    
    <!-- Quadrant A1 -->
    <div class="matrix-cell active relative h-16 bg-[#0a140f]/65 border border-white/5 hover:bg-white/5 hover:border-white/10 rounded-lg p-2 flex flex-col justify-between cursor-pointer transition-all duration-300 [&.active]:bg-emerald-500/[0.03] [&.active]:border-emerald-500/30" data-cell="a1" data-color="#00ff66">
      <div class="absolute w-1 h-1 border border-emerald-400 border-r-0 border-b-0 top-0.5 left-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-emerald-400 border-l-0 border-b-0 top-0.5 right-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-emerald-400 border-r-0 border-t-0 bottom-0.5 left-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-emerald-400 border-l-0 border-t-0 bottom-0.5 right-0.5 opacity-0 [&.active]:opacity-100"></div>
      
      <div class="font-mono text-[7.5px] text-white/30 tracking-wide [&.active]:text-emerald-400">SECTOR_A1</div>
      <div class="font-sans text-[13px] font-extrabold text-white tracking-wide cell-title">PWR_GRID</div>
      <div class="font-mono text-[7px] text-white/40">OPERATIONAL</div>
    </div>
    
    <!-- Quadrant A2 -->
    <div class="matrix-cell relative h-16 bg-[#0a140f]/65 border border-white/5 hover:bg-white/5 hover:border-white/10 rounded-lg p-2 flex flex-col justify-between cursor-pointer transition-all duration-300 [&.active]:bg-cyan-500/[0.03] [&.active]:border-cyan-500/30" data-cell="a2" data-color="#00f2fe">
      <div class="absolute w-1 h-1 border border-cyan-400 border-r-0 border-b-0 top-0.5 left-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-cyan-400 border-l-0 border-b-0 top-0.5 right-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-cyan-400 border-r-0 border-t-0 bottom-0.5 left-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-cyan-400 border-l-0 border-t-0 bottom-0.5 right-0.5 opacity-0 [&.active]:opacity-100"></div>
      
      <div class="font-mono text-[7.5px] text-white/30 tracking-wide [&.active]:text-cyan-400">SECTOR_A2</div>
      <div class="font-sans text-[13px] font-extrabold text-white tracking-wide cell-title">SYS_TEMP</div>
      <div class="font-mono text-[7px] text-white/40">OPTIMAL</div>
    </div>

    <!-- Quadrant B1 -->
    <div class="matrix-cell relative h-16 bg-[#0a140f]/65 border border-white/5 hover:bg-white/5 hover:border-white/10 rounded-lg p-2 flex flex-col justify-between cursor-pointer transition-all duration-300 [&.active]:bg-yellow-500/[0.03] [&.active]:border-yellow-500/30" data-cell="b1" data-color="#ffb700">
      <div class="absolute w-1 h-1 border border-yellow-400 border-r-0 border-b-0 top-0.5 left-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-yellow-400 border-l-0 border-b-0 top-0.5 right-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-yellow-400 border-r-0 border-t-0 bottom-0.5 left-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-yellow-400 border-l-0 border-t-0 bottom-0.5 right-0.5 opacity-0 [&.active]:opacity-100"></div>
      
      <div class="font-mono text-[7.5px] text-white/30 tracking-wide [&.active]:text-yellow-400">SECTOR_B1</div>
      <div class="font-sans text-[13px] font-extrabold text-white tracking-wide cell-title">NET_BAND</div>
      <div class="font-mono text-[7px] text-white/40">SECURE</div>
    </div>

    <!-- Quadrant B2 -->
    <div class="matrix-cell relative h-16 bg-[#0a140f]/65 border border-white/5 hover:bg-white/5 hover:border-white/10 rounded-lg p-2 flex flex-col justify-between cursor-pointer transition-all duration-300 [&.active]:bg-pink-500/[0.03] [&.active]:border-pink-500/30" data-cell="b2" data-color="#ff007f">
      <div class="absolute w-1 h-1 border border-pink-500 border-r-0 border-b-0 top-0.5 left-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-pink-500 border-l-0 border-b-0 top-0.5 right-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-pink-500 border-r-0 border-t-0 bottom-0.5 left-0.5 opacity-0 [&.active]:opacity-100"></div>
      <div class="absolute w-1 h-1 border border-pink-500 border-l-0 border-t-0 bottom-0.5 right-0.5 opacity-0 [&.active]:opacity-100"></div>
      
      <div class="font-mono text-[7.5px] text-white/30 tracking-wide [&.active]:text-pink-500">SECTOR_B2</div>
      <div class="font-sans text-[13px] font-extrabold text-white tracking-wide cell-title">MEM_BUFF</div>
      <div class="font-mono text-[7px] text-white/40">STABLE</div>
    </div>

  </div>

  <div class="relative w-[280px] h-8 bg-black/40 border border-white/5 rounded-md flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-[#00ff66] opacity-5 blur-md transition-all duration-500" id="matrix-monitor-glow"></div>
    <div class="font-mono text-[9.5px] text-white/40 tracking-wider z-10">
      MONITOR: <span id="matrix-active-label" class="text-[#00ff66] font-extrabold transition-colors duration-400">PWR_GRID</span>
    </div>
  </div>
</div>`,
  prompt: 'Design a highly creative 2x2 grid matrix dashboard menu selector with responsive corner glow frames and click states.'
};
