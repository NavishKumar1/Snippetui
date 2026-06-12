/**
 * Component: Origami Folding Folders
 * Category: tabs-and-navs
 */

export const component = {
  id: 'origami-folding-folders',
  name: 'Origami Folding Folders',
  category: 'tabs-and-navs',
  tag: 'Luxury',
  html: `<div class="origami-tabs-sandbox" id="origami-tabs-sandbox-container">
  <div class="origami-folder-nav">
    <button class="origami-folder-tab active" data-target="info">
      <span class="tab-face">Info</span>
      <span class="tab-shadow"></span>
    </button>
    <button class="origami-folder-tab" data-target="data">
      <span class="tab-face">Data</span>
      <span class="tab-shadow"></span>
    </button>
    <button class="origami-folder-tab" data-target="logs">
      <span class="tab-face">Logs</span>
      <span class="tab-shadow"></span>
    </button>
  </div>
  
  <div class="origami-folder-body">
    <div class="folder-pane active" id="pane-info">
      <h3>System Directory</h3>
      <p>Unfolding folder nodes. Geometric structures verified. System parameters stable.</p>
    </div>
    <div class="folder-pane" id="pane-data">
      <h3>Database Matrix</h3>
      <p>Data streams active. Vector dimensions mapped to 3D grid manifolds cleanly.</p>
    </div>
    <div class="folder-pane" id="pane-logs">
      <h3>Transaction Logs</h3>
      <p>HMR reload safe. Parity database registered. Zero compiler faults detected.</p>
    </div>
  </div>
</div>`,
  js: `// Origami Folding Folders Tab switcher logic
const container = document.getElementById('origami-tabs-sandbox-container');
if (container) {
  const tabs = container.querySelectorAll('.origami-folder-tab');
  const panes = container.querySelectorAll('.folder-pane');
  const body = container.querySelector('.origami-folder-body');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      
      const target = tab.getAttribute('data-target');
      
      // 1. Switch active tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // 2. Play 3D folding shock bounce on the folder body
      body.classList.remove('fold-pulse');
      void body.offsetWidth; // Force reflow
      body.classList.add('fold-pulse');
      
      // 3. Switch active panes
      panes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === \`pane-\${target}\`) {
          pane.classList.add('active');
        }
      });
    });
  });
}`,
  ts: `// TypeScript Implementation
const container = document.getElementById('origami-tabs-sandbox-container') as HTMLDivElement | null;
if (container) {
  const tabs = container.querySelectorAll('.origami-folder-tab');
  const panes = container.querySelectorAll('.folder-pane');
  const body = container.querySelector('.origami-folder-body') as HTMLDivElement;
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      
      const target = tab.getAttribute('data-target');
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      body.classList.remove('fold-pulse');
      void body.offsetWidth;
      body.classList.add('fold-pulse');
      
      panes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === \`pane-\${target}\`) {
          pane.classList.add('active');
        }
      });
    });
  });
}`,
  css: `/* Origami Folding Folders Tab styles */
.origami-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #14110b 0%, #050402 100%);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}

/* Folder tab row in 3D Perspective */
.origami-folder-nav {
  display: flex;
  gap: 8px;
  perspective: 600px;
  z-index: 2;
  margin-bottom: -1px; /* Align border seam with body */
}

.origami-folder-tab {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tab-face {
  display: block;
  background: #18140e;
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  padding: 8px 18px;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: rgba(212, 175, 55, 0.55);
  transform-origin: bottom center;
  transform: rotateX(-24deg); /* Tilted backwards by default */
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.origami-folder-tab:hover .tab-face {
  color: #ffd700;
  border-color: rgba(212, 175, 55, 0.5);
  transform: rotateX(-12deg);
}

.origami-folder-tab.active .tab-face {
  background: #1f1a12;
  color: #ffd700;
  border-color: #ffd700;
  transform: rotateX(0deg) translateZ(4px); /* Unfolds forward */
}

.tab-shadow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.3);
  transform: rotateX(90deg);
  opacity: 0.8;
  pointer-events: none;
}

/* Folding body panel */
.origami-folder-body {
  width: 280px;
  height: 110px;
  background: #1f1a12;
  border: 1px solid #ffd700;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  z-index: 1;
  transform-origin: top center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 3D bounce on folder click */
.origami-folder-body.fold-pulse {
  animation: bodyFoldBounce 0.5s ease-out;
}

.folder-pane {
  display: none;
  text-align: center;
  animation: paneFadeIn 0.4s ease-out forwards;
}

.folder-pane.active {
  display: block;
}

.folder-pane h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #ffd700;
  margin: 0 0 6px 0;
  letter-spacing: 1px;
}

.folder-pane p {
  font-family: 'Inter', sans-serif;
  font-size: 9.5px;
  color: rgba(212, 175, 55, 0.7);
  line-height: 1.4;
  margin: 0;
}

@keyframes bodyFoldBounce {
  0% { transform: rotateX(0deg); }
  30% { transform: rotateX(-12deg); }
  65% { transform: rotateX(4deg); }
  100% { transform: rotateX(0deg); }
}

@keyframes paneFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#14110b] to-[#050402] border border-[#d4af37]/15 rounded-2xl flex flex-col items-center justify-center p-5 box-border overflow-hidden" id="origami-tabs-sandbox-container">
  <div class="origami-folder-nav flex gap-2 [perspective:600px] z-10 -mb-[1px]">
    <button class="origami-folder-tab active relative bg-transparent border-none cursor-pointer p-0 [transform-style:preserve-3d] transition-transform duration-400" data-target="info">
      <span class="tab-face block bg-[#18140e] border border-[#d4af37]/25 border-b-0 rounded-t-lg px-4.5 py-2 font-sans text-[11px] font-bold text-[#d4af37]/55 [transform-origin:bottom_center] -rotate-x-[24deg] transition-all duration-400 hover:text-[#ffd700] hover:border-[#d4af37]/50 hover:-rotate-x-[12deg] [&.active]:bg-[#1f1a12] [&.active]:text-[#ffd700] [&.active]:border-[#ffd700] [&.active]:rotate-x-0 [&.active]:translate-z-1 active-tab-face">Info</span>
    </button>
    <button class="origami-folder-tab relative bg-transparent border-none cursor-pointer p-0 [transform-style:preserve-3d] transition-transform duration-400" data-target="data">
      <span class="tab-face block bg-[#18140e] border border-[#d4af37]/25 border-b-0 rounded-t-lg px-4.5 py-2 font-sans text-[11px] font-bold text-[#d4af37]/55 [transform-origin:bottom_center] -rotate-x-[24deg] transition-all duration-400 hover:text-[#ffd700] hover:border-[#d4af37]/50 hover:-rotate-x-[12deg] [&.active]:bg-[#1f1a12] [&.active]:text-[#ffd700] [&.active]:border-[#ffd700] [&.active]:rotate-x-0 [&.active]:translate-z-1 active-tab-face">Data</span>
    </button>
    <button class="origami-folder-tab relative bg-transparent border-none cursor-pointer p-0 [transform-style:preserve-3d] transition-transform duration-400" data-target="logs">
      <span class="tab-face block bg-[#18140e] border border-[#d4af37]/25 border-b-0 rounded-t-lg px-4.5 py-2 font-sans text-[11px] font-bold text-[#d4af37]/55 [transform-origin:bottom_center] -rotate-x-[24deg] transition-all duration-400 hover:text-[#ffd700] hover:border-[#d4af37]/50 hover:-rotate-x-[12deg] [&.active]:bg-[#1f1a12] [&.active]:text-[#ffd700] [&.active]:border-[#ffd700] [&.active]:rotate-x-0 [&.active]:translate-z-1 active-tab-face">Logs</span>
    </button>
  </div>
  
  <div class="origami-folder-body w-[280px] h-[110px] bg-[#1f1a12] border border-[#ffd700] rounded-lg p-4 box-border z-0 [transform-origin:top_center] shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_0_10px_rgba(0,0,0,0.3)] flex items-center justify-center [&.fold-pulse]:animate-[bodyFoldBounce_0.5s_ease-out]">
    <div class="folder-pane active hidden text-center [&.active]:block animate-[paneFadeIn_0.4s_ease-out_forwards]" id="pane-info">
      <h3 class="font-sans text-xs font-bold text-[#ffd700] tracking-wider mb-1.5">System Directory</h3>
      <p class="font-sans text-[9.5px] text-[#d4af37]/70 leading-relaxed">Unfolding folder nodes. Geometric structures verified. System parameters stable.</p>
    </div>
    <div class="folder-pane hidden text-center [&.active]:block animate-[paneFadeIn_0.4s_ease-out_forwards]" id="pane-data">
      <h3 class="font-sans text-xs font-bold text-[#ffd700] tracking-wider mb-1.5">Database Matrix</h3>
      <p class="font-sans text-[9.5px] text-[#d4af37]/70 leading-relaxed">Data streams active. Vector dimensions mapped to 3D grid manifolds cleanly.</p>
    </div>
    <div class="folder-pane hidden text-center [&.active]:block animate-[paneFadeIn_0.4s_ease-out_forwards]" id="pane-logs">
      <h3 class="font-sans text-xs font-bold text-[#ffd700] tracking-wider mb-1.5">Transaction Logs</h3>
      <p class="font-sans text-[9.5px] text-[#d4af37]/70 leading-relaxed">HMR reload safe. Parity database registered. Zero compiler faults detected.</p>
    </div>
  </div>
</div>`,
  prompt: 'Design a luxury 3D paper folders tab selection component utilizing active tab unfolding rotations and folder-pane content transitions.'
};
// Add CSS hook to fix class trigger in tailwind template
