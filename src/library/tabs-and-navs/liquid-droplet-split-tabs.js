/**
 * Component: Liquid Droplet Split Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'liquid-droplet-split-tabs',
  name: 'Liquid Droplet Split Tabs',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="liquid-droplet-sandbox" id="liquid-droplet-container">
  <!-- SVG Gooey Filter -->
  <svg class="goo-svg" width="0" height="0">
    <defs>
      <filter id="gooey-droplet-filter">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>

  <div class="droplet-nav-wrapper">
    <!-- Gooey Droplets Container -->
    <div class="droplets-goo-container">
      <div class="droplet-bubble main-bubble" id="droplet-active-bubble"></div>
      <div class="droplet-bubble target-bubble" id="droplet-target-bubble"></div>
    </div>
    
    <div class="droplet-tabs">
      <button class="droplet-tab active" data-index="0">ALPHA</button>
      <button class="droplet-tab" data-index="1">BETA</button>
      <button class="droplet-tab" data-index="2">GAMMA</button>
    </div>
  </div>
</div>`,
  js: `// Liquid Droplet Split Tabs lava-lamp flow logic
const container = document.getElementById('liquid-droplet-container');
if (container) {
  const tabs = container.querySelectorAll('.droplet-tab');
  const mainBubble = container.querySelector('#droplet-active-bubble');
  const targetBubble = container.querySelector('#droplet-target-bubble');

  function positionBubble(bubble, tab, instant = false) {
    const parentRect = tab.parentElement.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const left = tabRect.left - parentRect.left + (tabRect.width / 2) - 24; // 24px is half bubble width (48px)

    if (instant) {
      bubble.style.transition = 'none';
      bubble.style.left = \`\${left}px\`;
    } else {
      bubble.style.transition = 'left 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      bubble.style.left = \`\${left}px\`;
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 1. Move target bubble to the destination tab immediately to appear under it
      positionBubble(targetBubble, tab, true);
      targetBubble.style.transform = 'scale(0.8)';
      targetBubble.style.opacity = '1';

      // 2. Animate main bubble stretching/flowing to target
      mainBubble.style.transform = 'scaleX(1.4) scaleY(0.8)';
      positionBubble(mainBubble, tab, false);

      // 3. After split/flow finishes, snap back into spherical droplet
      setTimeout(() => {
        mainBubble.style.transform = 'scale(1)';
        targetBubble.style.opacity = '0';
        targetBubble.style.transform = 'scale(0)';
      }, 550);
    });
  });

  // Initial layout
  setTimeout(() => {
    const activeTab = container.querySelector('.droplet-tab.active');
    if (activeTab) {
      positionBubble(mainBubble, activeTab, true);
      targetBubble.style.opacity = '0';
      targetBubble.style.transform = 'scale(0)';
    }
  }, 100);
}
`,
  ts: `// TypeScript implementation
const container = document.getElementById('liquid-droplet-container') as HTMLDivElement | null;
if (container) {
  const tabs = container.querySelectorAll('.droplet-tab');
  const mainBubble = container.querySelector('#droplet-active-bubble') as HTMLDivElement;
  const targetBubble = container.querySelector('#droplet-target-bubble') as HTMLDivElement;

  function positionBubble(bubble: HTMLDivElement, tab: HTMLElement, instant = false) {
    const parent = tab.parentElement;

    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const left = tabRect.left - parentRect.left + (tabRect.width / 2) - 24;

    if (instant) {
      bubble.style.transition = 'none';
      bubble.style.left = \`\${left}px\`;
    } else {
      bubble.style.transition = 'left 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      bubble.style.left = \`\${left}px\`;
    }
  }

  tabs.forEach((tab) => {
    const tabEl = tab as HTMLElement;
    tabEl.addEventListener('click', () => {
      if (tabEl.classList.contains('active')) return;

      tabs.forEach(t => (t as HTMLElement).classList.remove('active'));
      tabEl.classList.add('active');

      positionBubble(targetBubble, tabEl, true);
      targetBubble.style.transform = 'scale(0.8)';
      targetBubble.style.opacity = '1';

      mainBubble.style.transform = 'scaleX(1.4) scaleY(0.8)';
      positionBubble(mainBubble, tabEl, false);

      setTimeout(() => {
        mainBubble.style.transform = 'scale(1)';
        targetBubble.style.opacity = '0';
        targetBubble.style.transform = 'scale(0)';
      }, 550);
    });
  });

  setTimeout(() => {
    const activeTab = container.querySelector('.droplet-tab.active') as HTMLElement;
    if (activeTab) {
      positionBubble(mainBubble, activeTab, true);
      targetBubble.style.opacity = '0';
      targetBubble.style.transform = 'scale(0)';
    }
  }, 100);
}`,
  css: `/* Liquid Droplet Split Tabs styles */
.liquid-droplet-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #050d14 0%, #010406 100%);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.droplet-nav-wrapper {
  position: relative;
  width: 320px;
  height: 54px;
}

/* Apply gooey filter here */
.droplets-goo-container {
  position: absolute;
  inset: 0;
  filter: url(#gooey-droplet-filter);
  pointer-events: none;
}

.droplet-bubble {
  position: absolute;
  top: 3px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.4);
}

.main-bubble {
  z-index: 1;
}

.target-bubble {
  z-index: 2;
  opacity: 0;
  transform: scale(0);
}

.droplet-tabs {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  z-index: 5;
}

.droplet-tab {
  background: transparent;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.4);
  width: 72px;
  height: 38px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.4s ease;
}

.droplet-tab.active {
  color: #010406;
}

.droplet-tab:hover:not(.active) {
  color: rgba(255, 255, 255, 0.85);
}

.goo-svg {
  position: absolute;
  width: 0;
  height: 0;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#050d14] to-[#010406] border border-cyan-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="liquid-droplet-container">
  <!-- SVG Gooey Filter -->
  <svg class="absolute w-0 h-0" width="0" height="0">
    <defs>
      <filter id="gooey-droplet-filter-tw">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>

  <div class="relative w-80 h-[54px]">
    <!-- Gooey Droplets Container -->
    <div class="absolute inset-0 [filter:url(#gooey-droplet-filter-tw)] pointer-events-none">
      <div class="absolute top-[3px] w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(0,242,254,0.4)] z-10 transition-all duration-600 main-bubble" id="droplet-active-bubble"></div>
      <div class="absolute top-[3px] w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(0,242,254,0.4)] z-20 transition-all duration-600 target-bubble opacity-0 scale-0" id="droplet-target-bubble"></div>
    </div>
    
    <div class="absolute inset-0 flex justify-between items-center px-3 z-30">
      <button class="bg-transparent border-none font-sans text-[11.5px] font-extrabold text-white/40 hover:text-white/80 w-[72px] h-[38px] cursor-pointer flex items-center justify-center transition-colors duration-400 [&.active]:text-[#010406] droplet-tab active" data-index="0">ALPHA</button>
      <button class="bg-transparent border-none font-sans text-[11.5px] font-extrabold text-white/40 hover:text-white/80 w-[72px] h-[38px] cursor-pointer flex items-center justify-center transition-colors duration-400 [&.active]:text-[#010406] droplet-tab" data-index="1">BETA</button>
      <button class="bg-transparent border-none font-sans text-[11.5px] font-extrabold text-white/40 hover:text-white/80 w-[72px] h-[38px] cursor-pointer flex items-center justify-center transition-colors duration-400 [&.active]:text-[#010406] droplet-tab" data-index="2">GAMMA</button>
    </div>
  </div>
</div>`,
  prompt: 'Design a highly creative horizontal tab bar featuring a liquid bubble droplet splitting and flowing gooey active indicator.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
