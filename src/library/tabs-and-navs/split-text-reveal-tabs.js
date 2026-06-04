/**
 * Component: Split Text Reveal Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'split-text-reveal-tabs',
  name: 'Split Text Reveal Tabs',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="split-nav-sandbox" id="split-reveal-container">
  <div class="split-nav">
    <button class="split-tab-btn active" data-index="0">
      <span class="btn-split-wrap">
        <span class="split-top">DASHBOARD</span>
        <span class="split-bottom">DASHBOARD</span>
        <span class="split-reveal-text">SYS_CENTER</span>
      </span>
    </button>
    
    <button class="split-tab-btn" data-index="1">
      <span class="btn-split-wrap">
        <span class="split-top">COMPILER</span>
        <span class="split-bottom">COMPILER</span>
        <span class="split-reveal-text">CODE_CORE</span>
      </span>
    </button>
    
    <button class="split-tab-btn" data-index="2">
      <span class="btn-split-wrap">
        <span class="split-top">DATABASE</span>
        <span class="split-bottom">DATABASE</span>
        <span class="split-reveal-text">DATA_GRID</span>
      </span>
    </button>
  </div>
</div>`,
  js: `// Split Text Reveal Tabs interaction
const container = document.getElementById('split-reveal-container');
if (container) {
  const buttons = container.querySelectorAll('.split-tab-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('split-reveal-container') as HTMLDivElement | null;
if (container) {
  const buttons = container.querySelectorAll('.split-tab-btn');

  buttons.forEach(btn => {
    const btnEl = btn as HTMLButtonElement;
    btnEl.addEventListener('click', () => {
      buttons.forEach(b => (b as HTMLElement).classList.remove('active'));
      btnEl.classList.add('active');
    });
  });
}`,
  css: `/* Split Text Reveal Tabs styles */
.split-nav-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #0b0f10 0%, #030405 100%);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.split-nav {
  display: flex;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 6px;
  gap: 8px;
}

.split-tab-btn {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px 18px;
  overflow: hidden;
}

.btn-split-wrap {
  position: relative;
  display: block;
  width: 90px;
  height: 28px;
}

/* Split text layers */
.split-top, .split-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.45);
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), color 0.3s;
}

.split-top {
  top: 0;
  display: flex;
  align-items: flex-end;
}

.split-bottom {
  top: 50%;
  display: flex;
  align-items: flex-start;
}

/* Align text inner offsets */
.split-top::before, .split-bottom::before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
}

.split-top::before {
  bottom: -14px; /* offset downward to align halfway */
}

.split-bottom::before {
  top: -14px; /* offset upward to align halfway */
}

/* Hidden subtext revealed inside */
.split-reveal-text {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%) scale(0.6);
  opacity: 0;
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  font-weight: 700;
  color: #00f2fe;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.5);
  text-align: center;
  transition: all 0.45s cubic-bezier(0.19, 1, 0.22, 1);
}

/* Split Hover/Active trigger animations */
.split-tab-btn:hover .split-top,
.split-tab-btn.active .split-top {
  transform: translateY(-8px);
  color: #00f2fe;
}

.split-tab-btn:hover .split-bottom,
.split-tab-btn.active .split-bottom {
  transform: translateY(8px);
  color: #00f2fe;
}

.split-tab-btn:hover .split-reveal-text,
.split-tab-btn.active .split-reveal-text {
  opacity: 1;
  transform: translateY(-50%) scale(1.0);
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#0b0f10] to-[#030405] border border-cyan-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="split-reveal-container">
  <div class="split-nav flex bg-white/[0.01] border border-white/[0.04] rounded-xl p-1.5 gap-2">
    <button class="split-tab-btn active relative bg-transparent border-none cursor-pointer px-4.5 py-2 overflow-hidden active-split-btn" data-index="0">
      <span class="btn-split-wrap relative block w-[90px] h-7">
        <span class="split-top absolute left-0 w-full h-[50%] font-sans text-[11px] font-extrabold tracking-wider overflow-hidden text-white/45 top-0 flex items-end [transform-origin:bottom_center] transition-all duration-400 hover:-translate-y-2 hover:text-[#00f2fe] [&.active]:-translate-y-2 [&.active]:text-[#00f2fe]" data-text="DASHBOARD">DASHBOARD</span>
        <span class="split-bottom absolute left-0 w-full h-[50%] font-sans text-[11px] font-extrabold tracking-wider overflow-hidden text-white/45 top-2/4 flex items-start [transform-origin:top_center] transition-all duration-400 hover:translate-y-2 hover:text-[#00f2fe] [&.active]:translate-y-2 [&.active]:text-[#00f2fe]" data-text="DASHBOARD">DASHBOARD</span>
        <span class="split-reveal-text absolute top-2/4 left-0 w-full -translate-y-2/4 scale-[0.6] opacity-0 font-mono text-[9px] font-bold text-cyan-400 text-shadow-[0_0_8px_rgba(0,242,254,0.5)] text-center transition-all duration-[450ms] hover:opacity-100 hover:scale-100 active-reveal-text">SYS_CENTER</span>
      </span>
    </button>
    
    <button class="split-tab-btn relative bg-transparent border-none cursor-pointer px-4.5 py-2 overflow-hidden" data-index="1">
      <span class="btn-split-wrap relative block w-[90px] h-7">
        <span class="split-top absolute left-0 w-full h-[50%] font-sans text-[11px] font-extrabold tracking-wider overflow-hidden text-white/45 top-0 flex items-end [transform-origin:bottom_center] transition-all duration-400 hover:-translate-y-2 hover:text-[#00f2fe] [&.active]:-translate-y-2 [&.active]:text-[#00f2fe]" data-text="COMPILER">COMPILER</span>
        <span class="split-bottom absolute left-0 w-full h-[50%] font-sans text-[11px] font-extrabold tracking-wider overflow-hidden text-white/45 top-2/4 flex items-start [transform-origin:top_center] transition-all duration-400 hover:translate-y-2 hover:text-[#00f2fe] [&.active]:translate-y-2 [&.active]:text-[#00f2fe]" data-text="COMPILER">COMPILER</span>
        <span class="split-reveal-text absolute top-2/4 left-0 w-full -translate-y-2/4 scale-[0.6] opacity-0 font-mono text-[9px] font-bold text-cyan-400 text-shadow-[0_0_8px_rgba(0,242,254,0.5)] text-center transition-all duration-[450ms] hover:opacity-100 hover:scale-100">CODE_CORE</span>
      </span>
    </button>
    
    <button class="split-tab-btn relative bg-transparent border-none cursor-pointer px-4.5 py-2 overflow-hidden" data-index="2">
      <span class="btn-split-wrap relative block w-[90px] h-7">
        <span class="split-top absolute left-0 w-full h-[50%] font-sans text-[11px] font-extrabold tracking-wider overflow-hidden text-white/45 top-0 flex items-end [transform-origin:bottom_center] transition-all duration-400 hover:-translate-y-2 hover:text-[#00f2fe] [&.active]:-translate-y-2 [&.active]:text-[#00f2fe]" data-text="DATABASE">DATABASE</span>
        <span class="split-bottom absolute left-0 w-full h-[50%] font-sans text-[11px] font-extrabold tracking-wider overflow-hidden text-white/45 top-2/4 flex items-start [transform-origin:top_center] transition-all duration-400 hover:translate-y-2 hover:text-[#00f2fe] [&.active]:translate-y-2 [&.active]:text-[#00f2fe]" data-text="DATABASE">DATABASE</span>
        <span class="split-reveal-text absolute top-2/4 left-0 w-full -translate-y-2/4 scale-[0.6] opacity-0 font-mono text-[9px] font-bold text-cyan-400 text-shadow-[0_0_8px_rgba(0,242,254,0.5)] text-center transition-all duration-[450ms] hover:opacity-100 hover:scale-100">DATA_GRID</span>
      </span>
    </button>
  </div>
</div>`,
  prompt: 'Design a high-tech minimal tab bar navigation component with letters splitting vertically to reveal code variables underneath.'
};
// Add data-text attribute updates dynamically to resolve tailwind text alignments
component.html = component.html.replace('class="split-tab-btn active"', 'class="split-tab-btn active"');
component.tailwind = component.tailwind.replace('class="split-reveal-text absolute top-2/4 left-0 w-full -translate-y-2/4 scale-[0.6] opacity-0 font-mono text-[9px] font-bold text-cyan-400 text-shadow-[0_0_8px_rgba(0,242,254,0.5)] text-center transition-all duration-[450ms] hover:opacity-100 hover:scale-100 active-reveal-text"', 'class="split-reveal-text absolute top-2/4 left-0 w-full -translate-y-2/4 scale-[0.6] opacity-0 font-mono text-[9px] font-bold text-cyan-400 text-shadow-[0_0_8px_rgba(0,242,254,0.5)] text-center transition-all duration-[450ms]"');
component.tailwind = component.tailwind.replaceAll('class="split-top absolute left-0 w-full h-[50%] font-sans text-[11px] font-extrabold tracking-wider overflow-hidden text-white/45 top-0 flex items-end [transform-origin:bottom_center] transition-all duration-400 hover:-translate-y-2 hover:text-[#00f2fe] [&.active]:-translate-y-2 [&.active]:text-[#00f2fe]"', 'class="split-top absolute left-0 w-full h-[50%] font-sans text-[11px] font-extrabold tracking-wider overflow-hidden text-white/45 top-0 flex items-end before:content-[attr(data-text)] before:absolute before:-bottom-[14px] before:left-0 before:w-full before:text-center"');
component.tailwind = component.tailwind.replaceAll('class="split-bottom absolute left-0 w-full h-[50%] font-sans text-[11px] font-extrabold tracking-wider overflow-hidden text-white/45 top-2/4 flex items-start [transform-origin:top_center] transition-all duration-400 hover:translate-y-2 hover:text-[#00f2fe] [&.active]:translate-y-2 [&.active]:text-[#00f2fe]"', 'class="split-bottom absolute left-0 w-full h-[50%] font-sans text-[11px] font-extrabold tracking-wider overflow-hidden text-white/45 top-2/4 flex items-start before:content-[attr(data-text)] before:absolute before:-top-[14px] before:left-0 before:w-full before:text-center"');
