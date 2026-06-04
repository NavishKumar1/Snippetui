/**
 * Component: Liquid Thermometer Select
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'liquid-thermometer-select',
  name: 'Liquid Thermometer Select',
  category: 'dropdowns-and-menus',
  tag: 'Creative',
  html: `<div class="thermo-select-wrapper">
  <!-- Thermometer capillary and bulb select -->
  <div class="thermo-sidebar">
    <div class="thermo-tube">
      <div class="thermo-mercury-fill" style="height: 25%;"></div>
    </div>
    <div class="thermo-bulb"></div>
  </div>
  
  <div class="thermo-main-container">
    <button class="thermo-trigger">
      <span>TEMPERATURE TELEMETRY</span>
      <span class="thermo-indicator">▼</span>
    </button>
    
    <div class="thermo-menu">
      <div class="thermo-item" style="--i: 0; --pct: 50%;" data-heat="50%">
        <span class="thermo-bullet"></span>
        <span>Mild Room [22°C]</span>
      </div>
      <div class="thermo-item" style="--i: 1; --pct: 75%;" data-heat="75%">
        <span class="thermo-bullet"></span>
        <span>Boiling Forge [100°C]</span>
      </div>
      <div class="thermo-item" style="--i: 2; --pct: 100%;" data-heat="100%">
        <span class="thermo-bullet"></span>
        <span>Core Superheat [350°C]</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Mercury liquid level filling up capillary based on active selection hover
const tWrapper = document.querySelector('.thermo-select-wrapper');
if (tWrapper) {
  const trigger = tWrapper.querySelector('.thermo-trigger');
  const items = tWrapper.querySelectorAll('.thermo-item');
  const fill = tWrapper.querySelector('.thermo-mercury-fill');
  
  trigger.addEventListener('click', () => {
    tWrapper.classList.toggle('active');
    
    if (tWrapper.classList.contains('active')) {
      fill.style.height = '60%'; // average default open height
    } else {
      fill.style.height = '25%'; // resting bulb level
    }
  });

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const heat = item.getAttribute('data-heat');
      fill.style.height = heat;
    });

    item.addEventListener('mouseleave', () => {
      if (tWrapper.classList.contains('active')) {
        fill.style.height = '60%';
      }
    });

    item.addEventListener('click', () => {
      const text = item.querySelector('span:nth-child(2)').textContent;
      trigger.querySelector('span').textContent = text.toUpperCase();
      const heat = item.getAttribute('data-heat');
      fill.style.height = heat;
      tWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!tWrapper.contains(e.target)) {
      tWrapper.classList.remove('active');
      fill.style.height = '25%';
    }
  });
}`,
  ts: `// TypeScript Implementation
const tWrapper = document.querySelector<HTMLDivElement>('.thermo-select-wrapper');
if (tWrapper) {
  const trigger = tWrapper.querySelector<HTMLButtonElement>('.thermo-trigger');
  const items = tWrapper.querySelectorAll<HTMLDivElement>('.thermo-item');
  const fill = tWrapper.querySelector<HTMLDivElement>('.thermo-mercury-fill');
  
  if (trigger && fill) {
    trigger.addEventListener('click', () => {
      tWrapper.classList.toggle('active');
      
      if (tWrapper.classList.contains('active')) {
        fill.style.height = '60%';
      } else {
        fill.style.height = '25%';
      }
    });
  }

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const heat = item.getAttribute('data-heat') || '60%';
      if (fill) fill.style.height = heat;
    });

    item.addEventListener('mouseleave', () => {
      if (tWrapper.classList.contains('active') && fill) {
        fill.style.height = '60%';
      }
    });

    item.addEventListener('click', () => {
      const textEl = item.querySelector<HTMLSpanElement>('span:nth-child(2)');
      const text = textEl ? textEl.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && text) {
        label.textContent = text.toUpperCase();
      }
      const heat = item.getAttribute('data-heat') || '25%';
      if (fill) fill.style.height = heat;
      tWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (tWrapper && !tWrapper.contains(e.target as Node)) {
      tWrapper.classList.remove('active');
      if (fill) fill.style.height = '25%';
    }
  });
}`,
  css: `/* Liquid Thermometer Select Styles */
.thermo-select-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 320px;
  height: 52px;
  overflow: visible;
  user-select: none;
  font-family: 'Outfit', sans-serif;
  box-sizing: border-box;
}

/* Side glass thermometer graphic */
.thermo-sidebar {
  width: 24px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 6px;
}

.thermo-tube {
  width: 6px;
  height: 140px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
}

.thermo-mercury-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(0deg, #ff0055, #ffaa00);
  height: 25%;
  border-radius: 9999px;
  box-shadow: 0 0 10px rgba(255, 0, 85, 0.6);
  transition: height 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.thermo-bulb {
  width: 16px;
  height: 16px;
  background: #ff0055;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 12px #ff0055, inset 0 1px 3px rgba(255,255,255,0.4);
  margin-top: -2px;
  z-index: 2;
}

.thermo-main-container {
  flex: 1;
  position: relative;
}

.thermo-trigger {
  width: 100%;
  padding: 14px 20px;
  background: rgba(18, 10, 10, 0.7);
  border: 1.5px solid rgba(255, 0, 85, 0.25);
  border-radius: 12px;
  color: #ff5500;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.thermo-trigger:hover {
  border-color: rgba(255, 0, 85, 0.55);
  box-shadow: 0 0 18px rgba(255, 0, 85, 0.2);
}

.thermo-indicator {
  font-size: 8px;
  color: #ff0055;
  transition: transform 0.4s;
}

.thermo-select-wrapper.active .thermo-indicator {
  transform: rotate(180deg);
}

/* Temperature dropdown panel */
.thermo-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(10, 6, 6, 0.75);
  border: 1.5px solid rgba(255, 0, 85, 0.15);
  border-radius: 14px;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 100;
  backdrop-filter: blur(20px);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
}

.thermo-select-wrapper.active .thermo-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  border-color: rgba(255, 0, 85, 0.35);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
}

.thermo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s, color 0.2s;
  transition-delay: calc(var(--i) * 0.05s);
}

.thermo-select-wrapper.active .thermo-item {
  opacity: 1;
  transform: translateY(0);
}

.thermo-bullet {
  width: 5px;
  height: 5px;
  background: rgba(255, 0, 85, 0.3);
  border-radius: 50%;
  transition: all 0.3s;
}

.thermo-item:hover {
  background: rgba(255, 0, 85, 0.06);
  color: #ff5500;
  text-shadow: 0 0 3px rgba(255, 85, 0, 0.3);
}

.thermo-item:hover .thermo-bullet {
  background: #ff5500;
  box-shadow: 0 0 8px #ff5500, 0 0 16px #ff0055;
  transform: scale(1.3);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] font-sans flex items-start gap-4 select-none">
  <div class="w-6 h-[180px] flex flex-col items-center relative mt-1.5">
    <div class="w-1.5 h-[140px] bg-white/5 border border-white/10 rounded-full relative overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
      <div class="absolute bottom-0 w-full bg-gradient-to-t from-rose-500 to-amber-500 h-1/4 rounded-full shadow-[0_0_10px_rgba(255,0,85,0.6)]"></div>
    </div>
    <div class="w-4 h-4 bg-rose-500 rounded-full border border-white/10 shadow-[0_0_12px_#ff0055] -mt-0.5 z-10"></div>
  </div>
  <div class="flex-1 relative">
    <button class="w-full px-5 py-3.5 bg-rose-950/20 border border-rose-500/25 rounded-xl text-rose-400 font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:border-rose-500/60 transition-all">
      <span>TEMPERATURE TELEMETRY</span>
      <span class="text-[8px]">▼</span>
    </button>
  </div>
</div>`,
  prompt: `Design a premium "Liquid Thermometer Select" menu. Capitalizing on a vintage glass capillary side tube, expanding the panel shoots molten hot mercury fill up the tube to map active hover selections.`
};
