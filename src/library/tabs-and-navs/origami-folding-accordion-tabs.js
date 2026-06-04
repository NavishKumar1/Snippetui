/**
 * Component: Origami Folding Accordion Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'origami-folding-accordion-tabs',
  name: 'Origami Folding Accordion Tabs',
  category: 'tabs-and-navs',
  tag: 'Luxury',
  html: `<div class="origami-accordion-sandbox" id="origami-accordion-container">
  <div class="origami-accordion">
    <div class="origami-item active" data-index="0">
      <button class="origami-header-btn">
        <span class="origami-num">01</span> SYSTEM STATUS
      </button>
      <div class="origami-content-wrapper">
        <div class="origami-content-inner">
          <p>Kernel loaded. Virtual sandbox active. Telemetry channels fully operational and reading consistent metrics.</p>
        </div>
      </div>
    </div>
    
    <div class="origami-item" data-index="1">
      <button class="origami-header-btn">
        <span class="origami-num">02</span> DATA ANALYTICS
      </button>
      <div class="origami-content-wrapper">
        <div class="origami-content-inner">
          <p>Stream channels open. Pipeline processes loading grid manifolds cleanly with zero latency overhead.</p>
        </div>
      </div>
    </div>
    
    <div class="origami-item" data-index="2">
      <button class="origami-header-btn">
        <span class="origami-num">03</span> ACCESS CONTROL
      </button>
      <div class="origami-content-wrapper">
        <div class="origami-content-inner">
          <p>Encrypted vault locked. Security firewalls active. Scoped document variables verified safe from outer DOM leak.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Origami Accordion folding triggers
const container = document.getElementById('origami-accordion-container');
if (container) {
  const items = container.querySelectorAll('.origami-item');

  items.forEach(item => {
    const btn = item.querySelector('.origami-header-btn');
    btn.addEventListener('click', () => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        return;
      }

      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('origami-accordion-container') as HTMLDivElement | null;
if (container) {
  const items = container.querySelectorAll('.origami-item');

  items.forEach(item => {
    const itemEl = item as HTMLDivElement;
    const btn = itemEl.querySelector('.origami-header-btn') as HTMLButtonElement;
    btn.addEventListener('click', () => {
      if (itemEl.classList.contains('active')) {
        itemEl.classList.remove('active');
        return;
      }

      items.forEach(i => (i as HTMLElement).classList.remove('active'));
      itemEl.classList.add('active');
    });
  });
}`,
  css: `/* Origami Folding Accordion Tabs styles */
.origami-accordion-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #1b160e 0%, #060503 100%);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.origami-accordion {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  perspective: 1000px;
}

.origami-item {
  border: 1.5px solid rgba(212, 175, 55, 0.2);
  background: #19140f;
  border-radius: 8px;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: border-color 0.4s;
}

.origami-item.active {
  border-color: #ffd700;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 12px rgba(212, 175, 55, 0.1);
}

.origami-header-btn {
  width: 100%;
  background: transparent;
  border: none;
  padding: 14px 18px;
  text-align: left;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 800;
  color: rgba(212, 175, 55, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: 0.5px;
  transition: all 0.3s;
}

.origami-header-btn:hover {
  color: #ffd700;
}

.origami-item.active .origami-header-btn {
  color: #ffd700;
  border-bottom: 1.5px dashed rgba(212, 175, 55, 0.25);
  background: rgba(212, 175, 55, 0.03);
}

.origami-num {
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  color: rgba(212, 175, 55, 0.4);
}

.origami-item.active .origami-num {
  color: #ffd700;
  text-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
}

/* 3D accordion crease fold wrapper */
.origami-content-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  transform-origin: top center;
  transform: rotateX(-90deg);
}

.origami-item.active .origami-content-wrapper {
  max-height: 80px;
  transform: rotateX(0deg);
}

.origami-content-inner {
  padding: 12px 18px;
  font-family: 'Inter', sans-serif;
  font-size: 9.5px;
  color: rgba(212, 175, 55, 0.7);
  line-height: 1.5;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#1b160e] to-[#060503] border border-[#d4af37]/15 rounded-3xl flex items-center justify-center p-4 box-border overflow-hidden" id="origami-accordion-container">
  <div class="origami-accordion w-[320px] flex flex-col gap-2 [perspective:1000px]">
    <div class="origami-item active border-1.5 border-[#d4af37]/20 bg-[#19140f] rounded-lg overflow-hidden [transform-style:preserve-3d] transition-all duration-400 [&.active]:border-[#ffd700] [&.active]:shadow-lg active-origami-item" data-index="0">
      <button class="origami-header-btn w-full bg-transparent border-none px-[18px] py-3.5 text-left font-sans text-[11px] font-extrabold text-[#d4af37]/60 hover:text-[#ffd700] cursor-pointer flex items-center gap-3 tracking-wider">
        <span class="origami-num font-mono text-[9px] text-[#d4af37]/40 active-num">01</span> SYSTEM STATUS
      </button>
      <div class="origami-content-wrapper max-h-0 overflow-hidden transition-[max-height,transform] duration-500 [transform-origin:top_center] -rotate-x-[90deg] [&.active]:max-h-20 [&.active]:rotate-x-0 active-content-wrapper">
        <div class="origami-content-inner px-[18px] py-3 font-sans text-[9.5px] text-[#d4af37]/70 leading-relaxed">
          <p>Kernel loaded. Virtual sandbox active. Telemetry channels fully operational and reading consistent metrics.</p>
        </div>
      </div>
    </div>
    
    <div class="origami-item border-1.5 border-[#d4af37]/20 bg-[#19140f] rounded-lg overflow-hidden [transform-style:preserve-3d] transition-all duration-400 [&.active]:border-[#ffd700] [&.active]:shadow-lg" data-index="1">
      <button class="origami-header-btn w-full bg-transparent border-none px-[18px] py-3.5 text-left font-sans text-[11px] font-extrabold text-[#d4af37]/60 hover:text-[#ffd700] cursor-pointer flex items-center gap-3 tracking-wider">
        <span class="origami-num font-mono text-[9px] text-[#d4af37]/40">02</span> DATA ANALYTICS
      </button>
      <div class="origami-content-wrapper max-h-0 overflow-hidden transition-[max-height,transform] duration-500 [transform-origin:top_center] -rotate-x-[90deg] [&.active]:max-h-20 [&.active]:rotate-x-0">
        <div class="origami-content-inner px-[18px] py-3 font-sans text-[9.5px] text-[#d4af37]/70 leading-relaxed">
          <p>Stream channels open. Pipeline processes loading grid manifolds cleanly with zero latency overhead.</p>
        </div>
      </div>
    </div>
    
    <div class="origami-item border-1.5 border-[#d4af37]/20 bg-[#19140f] rounded-lg overflow-hidden [transform-style:preserve-3d] transition-all duration-400 [&.active]:border-[#ffd700] [&.active]:shadow-lg" data-index="2">
      <button class="origami-header-btn w-full bg-transparent border-none px-[18px] py-3.5 text-left font-sans text-[11px] font-extrabold text-[#d4af37]/60 hover:text-[#ffd700] cursor-pointer flex items-center gap-3 tracking-wider">
        <span class="origami-num font-mono text-[9px] text-[#d4af37]/40">03</span> ACCESS CONTROL
      </button>
      <div class="origami-content-wrapper max-h-0 overflow-hidden transition-[max-height,transform] duration-500 [transform-origin:top_center] -rotate-x-[90deg] [&.active]:max-h-20 [&.active]:rotate-x-0">
        <div class="origami-content-inner px-[18px] py-3 font-sans text-[9.5px] text-[#d4af37]/70 leading-relaxed">
          <p>Encrypted vault locked. Security firewalls active. Scoped document variables verified safe from outer DOM leak.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  prompt: 'Design a vertical origami folded paper accordion tab panel layout in luxury gold tones with 3D folding sweeps.'
};
component.html = component.html.replace('class="origami-item active"', 'class="origami-item active"');
component.tailwind = component.tailwind.replaceAll('class="origami-content-wrapper max-h-0 overflow-hidden transition-[max-height,transform] duration-500 [transform-origin:top_center] -rotate-x-[90deg] [&.active]:max-h-20 [&.active]:rotate-x-0"', 'class="origami-content-wrapper max-h-0 overflow-hidden transition-all duration-500 -rotate-x-[90deg] [transform-origin:top_center]"');
component.tailwind = component.tailwind.replace('class="origami-num font-mono text-[9px] text-[#d4af37]/40 active-num"', 'class="origami-num font-mono text-[9px] text-[#d4af37]/40"');
component.tailwind = component.tailwind.replace('class="origami-item active border-1.5 border-[#d4af37]/20 bg-[#19140f] rounded-lg overflow-hidden [transform-style:preserve-3d] transition-all duration-400 [&.active]:border-[#ffd700] [&.active]:shadow-lg active-origami-item"', 'class="origami-item active border-1.5 border-[#d4af37]/20 bg-[#19140f] rounded-lg overflow-hidden [transform-style:preserve-3d] transition-all duration-400"');
