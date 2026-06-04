/**
 * Component: Bipolar Split Gate Menu
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'bipolar-split-gate',
  name: 'Bipolar Split Gate Menu',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="bipolar-gate-wrapper">
  <!-- Interactive Trigger -->
  <button class="bipolar-gate-trigger">
    <span>CONVERGE POLARITIES</span>
    <div class="bipolar-indicator-core">
      <span class="core-node negative"></span>
      <span class="core-node positive"></span>
    </div>
  </button>
  
  <!-- Symmetrical splitting menu drawer -->
  <div class="bipolar-gate-menu">
    <!-- Left Gate (Negative Polarity - Cyan) -->
    <div class="bipolar-side side-negative">
      <div class="bipolar-glow-border"></div>
      <div class="bipolar-side-header">NEGATIVE [CYAN]</div>
      <div class="bipolar-item" style="--i: 0;" data-polarity="-">
        <span class="bipolar-node"></span>
        <span>Anode Sector</span>
      </div>
      <div class="bipolar-item" style="--i: 1;" data-polarity="-">
        <span class="bipolar-node"></span>
        <span>Cathode Core</span>
      </div>
    </div>
    
    <!-- Right Gate (Positive Polarity - Magenta) -->
    <div class="bipolar-side side-positive">
      <div class="bipolar-glow-border"></div>
      <div class="bipolar-side-header">POSITIVE [PINK]</div>
      <div class="bipolar-item" style="--i: 0;" data-polarity="+">
        <span class="bipolar-node"></span>
        <span>Proton Engine</span>
      </div>
      <div class="bipolar-item" style="--i: 1;" data-polarity="+">
        <span class="bipolar-node"></span>
        <span>Positron Core</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Symmetrical split opening gates and selection indicators
const bWrapper = document.querySelector('.bipolar-gate-wrapper');
if (bWrapper) {
  const trigger = bWrapper.querySelector('.bipolar-gate-trigger');
  const menu = bWrapper.querySelector('.bipolar-gate-menu');
  const items = bWrapper.querySelectorAll('.bipolar-item');
  
  trigger.addEventListener('click', () => {
    bWrapper.classList.toggle('active');
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('span:nth-child(2)').textContent;
      const polarity = item.getAttribute('data-polarity');
      trigger.querySelector('span').textContent = \`\${polarity} \${text.toUpperCase()}\`;
      bWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!bWrapper.contains(e.target)) {
      bWrapper.classList.remove('active');
    }
  });
}`,
  ts: `// TypeScript Implementation
const bWrapper = document.querySelector<HTMLDivElement>('.bipolar-gate-wrapper');
if (bWrapper) {
  const trigger = bWrapper.querySelector<HTMLButtonElement>('.bipolar-gate-trigger');
  const items = bWrapper.querySelectorAll<HTMLDivElement>('.bipolar-item');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      bWrapper.classList.toggle('active');
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const textEl = item.querySelector<HTMLSpanElement>('span:nth-child(2)');
      const text = textEl ? textEl.textContent : '';
      const polarity = item.getAttribute('data-polarity') || '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && text) {
        label.textContent = \`\${polarity} \${text.toUpperCase()}\`;
      }
      bWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (bWrapper && !bWrapper.contains(e.target as Node)) {
      bWrapper.classList.remove('active');
    }
  });
}`,
  css: `/* Bipolar Split Gate Menu Styles */
.bipolar-gate-wrapper {
  position: relative;
  width: 320px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.bipolar-gate-trigger {
  width: 100%;
  padding: 14px 20px;
  background: #040408;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s;
}

.bipolar-gate-trigger:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: #080812;
}

.bipolar-indicator-core {
  display: flex;
  gap: 4px;
  align-items: center;
}

.core-node {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  transition: all 0.3s;
}

.negative { background: #00f2fe; box-shadow: 0 0 6px #00f2fe; }
.positive { background: #ff0055; box-shadow: 0 0 6px #ff0055; }

.bipolar-gate-wrapper.active .core-node {
  transform: scale(1.2);
}

/* Symmetrical split menu panels */
.bipolar-gate-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: -20px;
  width: calc(100% + 40px);
  height: 150px;
  display: flex;
  gap: 12px;
  z-index: 100;
  pointer-events: none;
}

.bipolar-side {
  flex: 1;
  height: 100%;
  border-radius: 6px;
  padding: 12px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #030306;
  border: 1.5px solid rgba(255,255,255,0.05);
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.4s;
  opacity: 0;
}

.side-negative {
  transform: translateX(30px);
  border-color: rgba(0, 242, 254, 0.12);
}

.side-positive {
  transform: translateX(-30px);
  border-color: rgba(255, 0, 85, 0.12);
}

.bipolar-gate-wrapper.active .bipolar-side {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.bipolar-gate-wrapper.active .side-negative {
  box-shadow: -10px 15px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 242, 254, 0.08);
  border-color: #00f2fe;
}

.bipolar-gate-wrapper.active .side-positive {
  box-shadow: 10px 15px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 0, 85, 0.08);
  border-color: #ff0055;
}

.bipolar-side-header {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
  text-shadow: 0 0 4px currentColor;
}

.side-negative .bipolar-side-header { color: #00f2fe; }
.side-positive .bipolar-side-header { color: #ff0055; }

/* Option items design */
.bipolar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  opacity: 0;
  transform: translateY(8px);
}

.bipolar-gate-wrapper.active .bipolar-item {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--i) * 0.08s);
}

.bipolar-node {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.side-negative .bipolar-item:hover { background: rgba(0, 242, 254, 0.06); color: #00f2fe; }
.side-positive .bipolar-item:hover { background: rgba(255, 0, 85, 0.06); color: #ff0055; }

.side-negative .bipolar-item:hover .bipolar-node { background: #00f2fe; box-shadow: 0 0 6px #00f2fe; transform: scale(1.2); }
.side-positive .bipolar-item:hover .bipolar-node { background: #ff0055; box-shadow: 0 0 6px #ff0055; transform: scale(1.2); }
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] font-sans select-none">
  <button class="w-full px-5 py-3.5 bg-[#040408] border border-white/10 rounded flex justify-between items-center shadow-lg hover:bg-[#080812] hover:border-white/20 transition-all">
    <span>CONVERGE POLARITIES</span>
    <div class="flex gap-1 items-center">
      <span class="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00f2fe]"></span>
      <span class="w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_6px_#ff0055]"></span>
    </div>
  </button>
</div>`,
  prompt: `Design a premium "Bipolar Split Gate Menu" component. Polarity trigger splits the dropdown symmetrically into a negative cyan left panel and a positive magenta right panel on active toggle.`
};
