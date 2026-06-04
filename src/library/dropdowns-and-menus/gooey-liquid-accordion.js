/**
 * Component: Gooey Liquid Accordion
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'gooey-liquid-accordion',
  name: 'Gooey Accordion',
  category: 'dropdowns-and-menus',
  tag: 'Creative',
  html: `<div class="gooey-accordion-wrapper">
  <!-- Master SVG filters injection -->
  <svg class="gooey-svg-filter" style="position: absolute; width: 0; height: 0;">
    <defs>
      <filter id="gooey-accordion-effect">
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
  
  <div class="gooey-accordion-container">
    <div class="gooey-accordion-item">
      <button class="gooey-accordion-trigger">
        <span>CORE METRICS</span>
        <span class="chevron-indicator">▼</span>
      </button>
      <div class="gooey-accordion-content">
        <p>Subsystem core active at 100% telemetry density. Visual systems and refractive elements are operational.</p>
      </div>
    </div>
  </div>
</div>`,
  js: `// Interactive gooey liquid expansion
const gooWrapper = document.querySelector('.gooey-accordion-wrapper');
if (gooWrapper) {
  const trigger = gooWrapper.querySelector('.gooey-accordion-trigger');
  const container = gooWrapper.querySelector('.gooey-accordion-container');
  const chevron = gooWrapper.querySelector('.chevron-indicator');
  
  trigger.addEventListener('click', () => {
    container.classList.toggle('expanded');
    
    if (container.classList.contains('expanded')) {
      chevron.style.transform = 'rotate(180deg)';
    } else {
      chevron.style.transform = 'rotate(0deg)';
    }
  });
}`,
  ts: `// TypeScript Implementation
const gooWrapper = document.querySelector<HTMLDivElement>('.gooey-accordion-wrapper');
if (gooWrapper) {
  const trigger = gooWrapper.querySelector<HTMLButtonElement>('.gooey-accordion-trigger');
  const container = gooWrapper.querySelector<HTMLDivElement>('.gooey-accordion-container');
  const chevron = gooWrapper.querySelector<HTMLSpanElement>('.chevron-indicator');
  
  if (trigger && container) {
    trigger.addEventListener('click', () => {
      container.classList.toggle('expanded');
      
      if (chevron) {
        if (container.classList.contains('expanded')) {
          chevron.style.transform = 'rotate(180deg)';
        } else {
          chevron.style.transform = 'rotate(0deg)';
        }
      }
    });
  }
}`,
  css: `/* Gooey Liquid Accordion Styles */
.gooey-accordion-wrapper {
  position: relative;
  width: 280px;
  overflow: visible;
  padding: 10px;
  box-sizing: border-box;
}

/* Appling the master gooey SVG filter mapping */
.gooey-accordion-container {
  filter: url('#gooey-accordion-effect');
  display: flex;
  flex-direction: column;
  background: transparent;
}

.gooey-accordion-item {
  background: rgba(13, 13, 21, 0.95);
  border: 1.5px solid rgba(0, 242, 254, 0.25);
  border-radius: 12px;
  margin-bottom: 0px;
  transition: all 0.4s ease;
  overflow: hidden;
}

.gooey-accordion-trigger {
  width: 100%;
  padding: 16px 20px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  z-index: 5;
}

.chevron-indicator {
  font-size: 10px;
  color: var(--accent-cyan);
  transition: transform 0.3s ease;
}

.gooey-accordion-content {
  max-height: 0px;
  opacity: 0;
  padding: 0 20px;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s, opacity 0.3s;
  overflow: hidden;
  box-sizing: border-box;
}

.gooey-accordion-content p {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Expanded state stretching boundary box */
.gooey-accordion-container.expanded .gooey-accordion-content {
  max-height: 100px;
  opacity: 1;
  padding-bottom: 20px;
}

.gooey-accordion-container.expanded .gooey-accordion-item {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.15);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[280px] p-2.5">
  <div class="flex flex-col bg-transparent">
    <div class="bg-[#0d0d15]/95 border border-cyan-400/30 rounded-xl overflow-hidden">
      <button class="w-full px-5 py-4 text-left text-white font-bold text-xs tracking-wider flex justify-between items-center">
        <span>CORE METRICS</span>
        <span class="text-cyan-400 text-[10px]">▼</span>
      </button>
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Gooey Liquid Accordion" menu. Expanding the panel applies a customized SVG Gaussian blur and contrast matrix, making the borders stretch, morph, and fuse organically like dynamic warm wax.`
};
