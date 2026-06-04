/**
 * Component: Bioluminescent Moss Dropdown
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'bioluminescent-moss-dropdown',
  name: 'Bioluminescent Moss Dropdown',
  category: 'dropdowns-and-menus',
  tag: 'Premium',
  html: `<div class="moss-dropdown-wrapper">
  <!-- Organic Glass Trigger -->
  <button class="moss-dropdown-trigger">
    <span class="moss-pulse"></span>
    <span>ORGANIC TELEMETRY</span>
    <span class="moss-chevron">⤸</span>
  </button>
  
  <!-- Dropping Spore Node List -->
  <div class="moss-dropdown-menu">
    <div class="moss-spore-container">
      <span class="moss-spore ms-1"></span>
      <span class="moss-spore ms-2"></span>
      <span class="moss-spore ms-3"></span>
    </div>
    
    <div class="moss-item" style="--d: 0.05s;">
      <span class="moss-node-glow"></span>
      <span class="moss-item-text">Oceanic Trench</span>
    </div>
    <div class="moss-item" style="--d: 0.1s;">
      <span class="moss-node-glow"></span>
      <span class="moss-item-text">Abyssal Plains</span>
    </div>
    <div class="moss-item" style="--d: 0.15s;">
      <span class="moss-node-glow"></span>
      <span class="moss-item-text">Hydrothermal Vents</span>
    </div>
  </div>
</div>`,
  js: `// Bioluminescent spore pulsing and node expansion on toggled click
const msWrapper = document.querySelector('.moss-dropdown-wrapper');
if (msWrapper) {
  const trigger = msWrapper.querySelector('.moss-dropdown-trigger');
  const menu = msWrapper.querySelector('.moss-dropdown-menu');
  const items = msWrapper.querySelectorAll('.moss-item');
  
  trigger.addEventListener('click', () => {
    msWrapper.classList.toggle('active');
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('.moss-item-text').textContent;
      trigger.querySelector('span:nth-child(2)').textContent = text.toUpperCase();
      msWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!msWrapper.contains(e.target)) {
      msWrapper.classList.remove('active');
    }
  });
}`,
  ts: `// TypeScript Implementation
const msWrapper = document.querySelector<HTMLDivElement>('.moss-dropdown-wrapper');
if (msWrapper) {
  const trigger = msWrapper.querySelector<HTMLButtonElement>('.moss-dropdown-trigger');
  const items = msWrapper.querySelectorAll<HTMLDivElement>('.moss-item');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      msWrapper.classList.toggle('active');
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const textEl = item.querySelector<HTMLSpanElement>('.moss-item-text');
      const text = textEl ? textEl.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span:nth-child(2)') : null;
      if (label && text) {
        label.textContent = text.toUpperCase();
      }
      msWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (msWrapper && !msWrapper.contains(e.target as Node)) {
      msWrapper.classList.remove('active');
    }
  });
}`,
  css: `/* Bioluminescent Moss Dropdown Styles */
.moss-dropdown-wrapper {
  position: relative;
  width: 270px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.moss-dropdown-trigger {
  width: 100%;
  padding: 14px 20px;
  background: rgba(4, 18, 15, 0.7);
  border: 1.5px solid rgba(16, 185, 129, 0.25);
  border-radius: 9999px;
  color: #a3e635;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3), 0 0 10px rgba(16, 185, 129, 0.15);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.moss-dropdown-trigger:hover {
  border-color: #a3e635;
  box-shadow: 0 0 20px rgba(163, 230, 53, 0.4), inset 0 0 8px rgba(163, 230, 53, 0.1);
}

.moss-pulse {
  width: 8px;
  height: 8px;
  background: #a3e635;
  border-radius: 50%;
  box-shadow: 0 0 8px #a3e635;
  animation: moss-dot-pulse 1.6s infinite ease-in-out;
}

.moss-chevron {
  font-size: 11px;
  color: rgba(163, 230, 53, 0.5);
  transition: transform 0.4s;
}

.moss-dropdown-wrapper.active .moss-chevron {
  transform: rotate(180deg) scale(1.1);
  color: #a3e635;
}

.moss-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(3, 12, 10, 0.75);
  border: 1.5px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  overflow: visible;
  z-index: 100;
  backdrop-filter: blur(16px);
  pointer-events: none;
  opacity: 0;
  transform: scale(0.92) translateY(-10px);
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.moss-dropdown-wrapper.active .moss-dropdown-menu {
  opacity: 1;
  transform: scale(1) translateY(0);
  pointer-events: auto;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 0 0 25px rgba(16, 185, 129, 0.15);
  border-color: rgba(163, 230, 53, 0.35);
}

/* Floating spores inside open menu */
.moss-spore-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: 20px;
}

.moss-spore {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #a3e635;
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 6px #a3e635;
}

.moss-dropdown-wrapper.active .moss-spore {
  opacity: 0.6;
}

.ms-1 { top: 70%; left: 15%; animation: spore-float 3s infinite linear; }
.ms-2 { top: 30%; left: 80%; animation: spore-float 4.2s infinite linear 0.5s; }
.ms-3 { top: 80%; left: 65%; animation: spore-float 3.5s infinite linear 1s; }

/* Moss item design */
.moss-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  color: rgba(163, 230, 53, 0.65);
  font-size: 12.5px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, color 0.3s;
  transition-delay: var(--d);
}

.moss-dropdown-wrapper.active .moss-item {
  opacity: 1;
  transform: translateY(0);
}

.moss-node-glow {
  width: 6px;
  height: 6px;
  background: rgba(16, 185, 129, 0.3);
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.2);
  transition: all 0.3s;
}

.moss-item:hover {
  background: rgba(163, 230, 53, 0.08);
  color: #ffffff;
}

.moss-item:hover .moss-node-glow {
  background: #a3e635;
  box-shadow: 0 0 10px #a3e635, 0 0 20px #10b981;
  transform: scale(1.3);
}

@keyframes moss-dot-pulse {
  0% { transform: scale(0.9); opacity: 0.7; box-shadow: 0 0 4px #a3e635; }
  50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 12px #a3e635, 0 0 20px #10b981; }
  100% { transform: scale(0.9); opacity: 0.7; box-shadow: 0 0 4px #a3e635; }
}

@keyframes spore-float {
  0% { transform: translateY(0) scale(0.8); opacity: 0; }
  50% { opacity: 0.7; }
  100% { transform: translateY(-40px) scale(1.1); opacity: 0; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[270px] font-sans select-none">
  <button class="w-full px-5 py-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-full text-lime-400 font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:border-lime-400 hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all">
    <span class="w-2 h-2 bg-lime-400 rounded-full shadow-[0_0_8px_#a3e635]"></span>
    <span>ORGANIC TELEMETRY</span>
    <span class="text-xs">⤸</span>
  </button>
</div>`,
  prompt: `Design a premium "Bioluminescent Moss Dropdown" menu. Toggling the translucent moss glass selector triggers biological item capsules to grow down, glowing in neon-teal spore pulses when hovered.`
};
