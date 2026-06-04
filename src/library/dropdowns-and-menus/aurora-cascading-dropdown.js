/**
 * Component: Aurora Cascading Dropdown
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'aurora-cascading-dropdown',
  name: 'Aurora Cascading Dropdown',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="aurora-dropdown-wrapper">
  <button class="aurora-dropdown-trigger">
    <span>SELECT SYSTEM</span>
    <span class="aurora-chevron">▼</span>
  </button>
  <div class="aurora-dropdown-menu">
    <div class="aurora-backdrop"></div>
    <div class="aurora-dropdown-item" style="--i: 0;">
      <span class="item-icon">🌌</span>
      <span class="item-text">Cosmic Telemetry</span>
    </div>
    <div class="aurora-dropdown-item" style="--i: 1;">
      <span class="item-icon">⚛️</span>
      <span class="item-text">Quantum Core</span>
    </div>
    <div class="aurora-dropdown-item" style="--i: 2;">
      <span class="item-icon">🧬</span>
      <span class="item-text">Genetic Sequencer</span>
    </div>
    <div class="aurora-dropdown-item" style="--i: 3;">
      <span class="item-icon">⚡</span>
      <span class="item-text">Neural Synapse</span>
    </div>
  </div>
</div>`,
  js: `// Interactive toggle and sequential delay calculation on cascade open
const aWrapper = document.querySelector('.aurora-dropdown-wrapper');
if (aWrapper) {
  const trigger = aWrapper.querySelector('.aurora-dropdown-trigger');
  const menu = aWrapper.querySelector('.aurora-dropdown-menu');
  const items = aWrapper.querySelectorAll('.aurora-dropdown-item');
  
  trigger.addEventListener('click', () => {
    aWrapper.classList.toggle('active');
  });

  // Optional: Select item functionality
  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('.item-text').textContent;
      trigger.querySelector('span').textContent = text;
      aWrapper.classList.remove('active');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!aWrapper.contains(e.target)) {
      aWrapper.classList.remove('active');
    }
  });
}`,
  ts: `// TypeScript Implementation
const aWrapper = document.querySelector<HTMLDivElement>('.aurora-dropdown-wrapper');
if (aWrapper) {
  const trigger = aWrapper.querySelector<HTMLButtonElement>('.aurora-dropdown-trigger');
  const items = aWrapper.querySelectorAll<HTMLDivElement>('.aurora-dropdown-item');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      aWrapper.classList.toggle('active');
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const textEl = item.querySelector<HTMLSpanElement>('.item-text');
      const text = textEl ? textEl.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && text) {
        label.textContent = text;
      }
      aWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (aWrapper && !aWrapper.contains(e.target as Node)) {
      aWrapper.classList.remove('active');
    }
  });
}`,
  css: `/* Aurora Cascading Dropdown Styles */
.aurora-dropdown-wrapper {
  position: relative;
  width: 260px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.aurora-dropdown-trigger {
  width: 100%;
  padding: 14px 20px;
  background: rgba(10, 10, 15, 0.7);
  border: 1.5px solid rgba(0, 242, 254, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

.aurora-dropdown-trigger:hover {
  border-color: rgba(0, 242, 254, 0.5);
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.15);
}

.aurora-chevron {
  font-size: 8px;
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease;
}

.aurora-dropdown-wrapper.active .aurora-chevron {
  transform: rotate(180deg);
}

.aurora-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(10, 10, 15, 0.6);
  border: 1.5px solid rgba(255, 0, 127, 0.15);
  border-radius: 14px;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 100;
  backdrop-filter: blur(20px);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.aurora-dropdown-wrapper.active .aurora-dropdown-menu {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
  border-color: rgba(0, 242, 254, 0.25);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 0, 127, 0.05);
}

/* Beautiful moving aurora background inside the dropdown menu */
.aurora-backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 10% 20%, rgba(0, 242, 254, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(255, 0, 127, 0.15) 0%, transparent 40%);
  filter: blur(10px);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s;
}

.aurora-dropdown-wrapper.active .aurora-backdrop {
  opacity: 1;
  animation: aurora-move 8s infinite alternate ease-in-out;
}

/* Cascade Animation for items */
.aurora-dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0;
  transform: translateX(-15px);
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s, color 0.2s;
  transition-delay: calc(var(--i) * 0.06s);
}

.aurora-dropdown-wrapper.active .aurora-dropdown-item {
  opacity: 1;
  transform: translateX(0);
}

.aurora-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-icon {
  font-size: 14px;
}

@keyframes aurora-move {
  0% { transform: scale(1) translate(0, 0); }
  50% { transform: scale(1.1) translate(-10px, 10px); }
  100% { transform: scale(1) translate(10px, -10px); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] font-sans">
  <button class="w-full px-5 py-3.5 bg-black/70 border border-cyan-400/20 rounded-xl text-white font-semibold text-xs tracking-wider flex justify-between items-center shadow-lg hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all">
    <span>SELECT SYSTEM</span>
    <span class="text-white/50 text-[8px]">▼</span>
  </button>
</div>`,
  prompt: `Design a premium "Aurora Cascading Dropdown" menu. Featuring glassmorphism structures, opening triggers a smooth cascade delay wave on the menu options, leaving a flowing cyan-to-magenta aurora backdrop.`
};
