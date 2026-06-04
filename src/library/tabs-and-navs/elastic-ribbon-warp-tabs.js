/**
 * Component: Elastic Ribbon Warp Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'elastic-ribbon-warp-tabs',
  name: 'Elastic Ribbon Warp Tabs',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="elastic-tabs-sandbox" id="elastic-tabs-container">
  <div class="elastic-tabs-nav">
    <!-- Active slide indicator -->
    <div class="elastic-indicator" id="elastic-nav-indicator"></div>
    
    <button class="elastic-tab active" data-index="0">OVERVIEW</button>
    <button class="elastic-tab" data-index="1">REPORTS</button>
    <button class="elastic-tab" data-index="2">VAULT</button>
    <button class="elastic-tab" data-index="3">CONFIG</button>
  </div>
</div>`,
  js: `// Elastic Ribbon Warp Tabs transition mechanics
const container = document.getElementById('elastic-tabs-container');
if (container) {
  const tabs = container.querySelectorAll('.elastic-tab');
  const indicator = container.querySelector('#elastic-nav-indicator');

  let activeIndex = 0;

  function updateIndicator(targetTab, animate = true) {
    const parentRect = targetTab.parentElement.getBoundingClientRect();
    const tabRect = targetTab.getBoundingClientRect();

    const left = tabRect.left - parentRect.left;
    const width = tabRect.width;

    if (!animate) {
      indicator.style.transition = 'none';
      indicator.style.left = \`\${left}px\`;
      indicator.style.width = \`\${width}px\`;
      return;
    }

    const currentLeft = parseFloat(indicator.style.left || 0);
    const direction = left > currentLeft ? 'right' : 'left';

    indicator.style.transition = 'left 0.35s cubic-bezier(0.25, 1, 0.5, 1), width 0.25s cubic-bezier(0.25, 1, 0.5, 1)';

    if (direction === 'right') {
      // Stretch right edge first, then pull left edge
      indicator.style.width = \`\${left - currentLeft + width}px\`;
      setTimeout(() => {
        indicator.style.left = \`\${left}px\`;
        indicator.style.width = \`\${width}px\`;
      }, 120);
    } else {
      // Stretch left edge first, then pull right edge
      const stretchWidth = currentLeft - left + parseFloat(indicator.style.width || width);
      indicator.style.left = \`\${left}px\`;
      indicator.style.width = \`\${stretchWidth}px\`;
      setTimeout(() => {
        indicator.style.width = \`\${width}px\`;
      }, 120);
    }
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      updateIndicator(tab, true);
      activeIndex = idx;
    });
  });

  // Initial layout set
  setTimeout(() => {
    const activeTab = container.querySelector('.elastic-tab.active');
    if (activeTab) updateIndicator(activeTab, false);
  }, 100);
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('elastic-tabs-container') as HTMLDivElement | null;
if (container) {
  const tabs = container.querySelectorAll('.elastic-tab');
  const indicator = container.querySelector('#elastic-nav-indicator') as HTMLDivElement;

  function updateIndicator(targetTab: HTMLElement, animate = true) {
    const parent = targetTab.parentElement;
    if (!parent || !indicator) return;

    const parentRect = parent.getBoundingClientRect();
    const tabRect = targetTab.getBoundingClientRect();

    const left = tabRect.left - parentRect.left;
    const width = tabRect.width;

    if (!animate) {
      indicator.style.transition = 'none';
      indicator.style.left = \`\${left}px\`;
      indicator.style.width = \`\${width}px\`;
      return;
    }

    const currentLeft = parseFloat(indicator.style.left || '0');
    const direction = left > currentLeft ? 'right' : 'left';

    indicator.style.transition = 'left 0.35s cubic-bezier(0.25, 1, 0.5, 1), width 0.25s cubic-bezier(0.25, 1, 0.5, 1)';

    if (direction === 'right') {
      indicator.style.width = \`\${left - currentLeft + width}px\`;
      setTimeout(() => {
        indicator.style.left = \`\${left}px\`;
        indicator.style.width = \`\${width}px\`;
      }, 120);
    } else {
      const stretchWidth = currentLeft - left + parseFloat(indicator.style.width || \`\${width}\`);
      indicator.style.left = \`\${left}px\`;
      indicator.style.width = \`\${stretchWidth}px\`;
      setTimeout(() => {
        indicator.style.width = \`\${width}px\`;
      }, 120);
    }
  }

  tabs.forEach((tab) => {
    const tabEl = tab as HTMLElement;
    tabEl.addEventListener('click', () => {
      tabs.forEach(t => (t as HTMLElement).classList.remove('active'));
      tabEl.classList.add('active');
      updateIndicator(tabEl, true);
    });
  });

  setTimeout(() => {
    const activeTab = container.querySelector('.elastic-tab.active') as HTMLElement;
    if (activeTab) updateIndicator(activeTab, false);
  }, 100);
}`,
  css: `/* Elastic Ribbon Warp Tabs styles */
.elastic-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #0a0614 0%, #030107 100%);
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.elastic-tabs-nav {
  position: relative;
  display: flex;
  background: rgba(18, 12, 36, 0.85);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  gap: 4px;
}

.elastic-tab {
  position: relative;
  background: transparent;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  padding: 10px 18px;
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s ease;
  border-radius: 8px;
}

.elastic-tab.active {
  color: #a78bfa;
}

.elastic-tab:hover {
  color: #ffffff;
}

.elastic-indicator {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  width: 0;
  background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0 0 15px rgba(124, 58, 237, 0.5);
  pointer-events: none;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#0a0614] to-[#030107] border border-violet-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="elastic-tabs-container">
  <div class="relative flex bg-[#120c24]/85 border border-violet-500/20 rounded-xl p-1.5 shadow-2xl gap-1">
    
    <!-- Active slide indicator -->
    <div class="absolute top-1.5 bottom-1.5 left-1.5 bg-gradient-to-br from-violet-600 to-violet-400 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.5)] pointer-events-none z-10" id="elastic-nav-indicator"></div>
    
    <button class="relative bg-transparent border-none font-sans text-[11.5px] font-bold text-white/40 hover:text-white px-4.5 py-2.5 cursor-pointer rounded-lg transition-colors duration-300 z-20 [&.active]:text-violet-300 elastic-tab active" data-index="0">OVERVIEW</button>
    <button class="relative bg-transparent border-none font-sans text-[11.5px] font-bold text-white/40 hover:text-white px-4.5 py-2.5 cursor-pointer rounded-lg transition-colors duration-300 z-20 [&.active]:text-violet-300 elastic-tab" data-index="1">REPORTS</button>
    <button class="relative bg-transparent border-none font-sans text-[11.5px] font-bold text-white/40 hover:text-white px-4.5 py-2.5 cursor-pointer rounded-lg transition-colors duration-300 z-20 [&.active]:text-violet-300 elastic-tab" data-index="2">VAULT</button>
    <button class="relative bg-transparent border-none font-sans text-[11.5px] font-bold text-white/40 hover:text-white px-4.5 py-2.5 cursor-pointer rounded-lg transition-colors duration-300 z-20 [&.active]:text-violet-300 elastic-tab" data-index="3">CONFIG</button>
  </div>
</div>`,
  prompt: 'Design a highly creative horizontal navigation tab bar featuring a warping rubber-band elastic ribbon active indicator.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
