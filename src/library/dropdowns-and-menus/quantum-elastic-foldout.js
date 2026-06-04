/**
 * Component: Quantum Elastic Foldout
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'quantum-elastic-foldout',
  name: 'Quantum Elastic Foldout',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="quantum-foldout-wrapper">
  <!-- Interactive Trigger -->
  <button class="quantum-foldout-trigger">
    <span>QUANTUM TELEPORT</span>
    <span class="quantum-indicator">⚿</span>
  </button>
  
  <!-- Elastic stretching content box -->
  <div class="quantum-foldout-menu">
    <div class="quantum-item" style="--i: 1;">
      <span class="q-node"></span>
      <span>Dimensional Warp</span>
    </div>
    <div class="quantum-item" style="--i: 2;">
      <span class="q-node"></span>
      <span>Planck Scale</span>
    </div>
    <div class="quantum-item" style="--i: 3;">
      <span class="q-node"></span>
      <span>Superposition</span>
    </div>
  </div>
</div>`,
  js: `// Spring-loaded rubber-band bounce animation on dropdown open
const qWrapper = document.querySelector('.quantum-foldout-wrapper');
if (qWrapper) {
  const trigger = qWrapper.querySelector('.quantum-foldout-trigger');
  const menu = qWrapper.querySelector('.quantum-foldout-menu');
  const items = qWrapper.querySelectorAll('.quantum-item');
  
  trigger.addEventListener('click', () => {
    qWrapper.classList.toggle('active');
    
    if (qWrapper.classList.contains('active')) {
      // Trigger temporary high-frequency rubber band deformation
      menu.classList.add('stretching');
      setTimeout(() => {
        menu.classList.remove('stretching');
      }, 700);
    }
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const label = item.querySelector('span:nth-child(2)').textContent;
      trigger.querySelector('span').textContent = label.toUpperCase();
      qWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!qWrapper.contains(e.target)) {
      qWrapper.classList.remove('active');
    }
  });
}`,
  ts: `// TypeScript Implementation
const qWrapper = document.querySelector<HTMLDivElement>('.quantum-foldout-wrapper');
if (qWrapper) {
  const trigger = qWrapper.querySelector<HTMLButtonElement>('.quantum-foldout-trigger');
  const menu = qWrapper.querySelector<HTMLDivElement>('.quantum-foldout-menu');
  const items = qWrapper.querySelectorAll<HTMLDivElement>('.quantum-item');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      qWrapper.classList.toggle('active');
      
      if (menu && qWrapper.classList.contains('active')) {
        menu.classList.add('stretching');
        setTimeout(() => {
          menu.classList.remove('stretching');
        }, 700);
      }
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const labelEl = item.querySelector<HTMLSpanElement>('span:nth-child(2)');
      const label = labelEl ? labelEl.textContent : '';
      const labelContainer = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (labelContainer && label) {
        labelContainer.textContent = label.toUpperCase();
      }
      qWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (qWrapper && !qWrapper.contains(e.target as Node)) {
      qWrapper.classList.remove('active');
    }
  });
}`,
  css: `/* Quantum Elastic Foldout Styles */
.quantum-foldout-wrapper {
  position: relative;
  width: 260px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.quantum-foldout-trigger {
  width: 100%;
  padding: 14px 20px;
  background: rgba(18, 10, 36, 0.65);
  border: 1.5px solid rgba(138, 43, 226, 0.25);
  border-radius: 12px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3), 0 0 10px rgba(138, 43, 226, 0.15);
  transition: all 0.3s;
}

.quantum-foldout-trigger:hover {
  border-color: rgba(138, 43, 226, 0.6);
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.4);
}

.quantum-indicator {
  font-size: 13px;
  color: #c084fc;
  text-shadow: 0 0 4px #c084fc;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.quantum-foldout-wrapper.active .quantum-indicator {
  transform: rotate(90deg) scale(1.2);
}

/* Elastic foldout panel menu container */
.quantum-foldout-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(10, 5, 20, 0.7);
  border: 1.5px solid rgba(138, 43, 226, 0.2);
  border-radius: 14px;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 100;
  backdrop-filter: blur(20px);
  pointer-events: none;
  opacity: 0;
  transform: scaleY(0) translateY(-20px);
  transform-origin: top center;
  transition: opacity 0.5s, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.quantum-foldout-wrapper.active .quantum-foldout-menu {
  opacity: 1;
  transform: scaleY(1) translateY(0);
  pointer-events: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(138, 43, 226, 0.15);
}

/* Temporary CSS spring squish deformation during open cascade */
.quantum-foldout-menu.stretching {
  animation: elastic-stretch 0.65s cubic-bezier(0.25, 0.8, 0.25, 1.4) forwards;
}

.quantum-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12.5px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.q-node {
  width: 6px;
  height: 6px;
  background: rgba(192, 132, 252, 0.2);
  border: 1px solid rgba(192, 132, 252, 0.4);
  border-radius: 50%;
  transition: all 0.3s;
}

.quantum-item:hover {
  background: rgba(138, 43, 226, 0.1);
  color: #ffffff;
}

.quantum-item:hover .q-node {
  background: #c084fc;
  box-shadow: 0 0 8px #c084fc;
  transform: scale(1.2);
}

@keyframes elastic-stretch {
  0% { transform: scaleY(0.4) scaleX(1.15) translateY(-10px); }
  40% { transform: scaleY(1.22) scaleX(0.85) translateY(5px); }
  65% { transform: scaleY(0.9) scaleX(1.05) translateY(-2px); }
  85% { transform: scaleY(1.03) scaleX(0.98) translateY(1px); }
  100% { transform: scaleY(1) scaleX(1) translateY(0); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] font-sans select-none">
  <button class="w-full px-5 py-3.5 bg-[#120a24]/65 border border-purple-500/25 rounded-xl text-white font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:border-purple-500/60 transition-all">
    <span>QUANTUM TELEPORT</span>
    <span class="text-purple-400">⚿</span>
  </button>
</div>`,
  prompt: `Design a premium "Quantum Elastic Foldout" menu. Clicking the glass trigger stretches and deforms the dropdown menu panel downwards with organic rubber-band elastic bounce motions.`
};
