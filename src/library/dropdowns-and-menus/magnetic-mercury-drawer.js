/**
 * Component: Magnetic Mercury Drawer
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'magnetic-mercury-drawer',
  name: 'Magnetic Mercury Drawer',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="mercury-drawer-wrapper">
  <!-- Master SVG gooey filters injection -->
  <svg class="mercury-svg" style="position: absolute; width: 0; height: 0;">
    <defs>
      <filter id="mercury-gooey-effect">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>

  <!-- Mercury Liquid Trigger -->
  <button class="mercury-trigger">
    <div class="mercury-core-glow"></div>
    <span>TELEMETRY STACK</span>
    <span class="mercury-indicator">▼</span>
  </button>
  
  <!-- Dropping Liquid Options Drawer -->
  <div class="mercury-menu-container">
    <div class="mercury-menu">
      <div class="mercury-item" style="--i: 0;">
        <span class="mercury-dot"></span>
        <span>Liquid Matrix A</span>
      </div>
      <div class="mercury-item" style="--i: 1;">
        <span class="mercury-dot"></span>
        <span>Mercury Flow B</span>
      </div>
      <div class="mercury-item" style="--i: 2;">
        <span class="mercury-dot"></span>
        <span>Ferrofluid Core C</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Mercury molten droplets fusion toggling
const mWrapper = document.querySelector('.mercury-drawer-wrapper');
if (mWrapper) {
  const trigger = mWrapper.querySelector('.mercury-trigger');
  const items = mWrapper.querySelectorAll('.mercury-item');
  
  trigger.addEventListener('click', () => {
    mWrapper.classList.toggle('active');
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('span:nth-child(2)').textContent;
      trigger.querySelector('span').textContent = text.toUpperCase();
      mWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!mWrapper.contains(e.target)) {
      mWrapper.classList.remove('active');
    }
  });
}`,
  ts: `// TypeScript Implementation
const mWrapper = document.querySelector<HTMLDivElement>('.mercury-drawer-wrapper');
if (mWrapper) {
  const trigger = mWrapper.querySelector<HTMLButtonElement>('.mercury-trigger');
  const items = mWrapper.querySelectorAll<HTMLDivElement>('.mercury-item');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      mWrapper.classList.toggle('active');
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const labelEl = item.querySelector<HTMLSpanElement>('span:nth-child(2)');
      const text = labelEl ? labelEl.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && text) {
        label.textContent = text.toUpperCase();
      }
      mWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (mWrapper && !mWrapper.contains(e.target as Node)) {
      mWrapper.classList.remove('active');
    }
  });
}`,
  css: `/* Magnetic Mercury Drawer Styles */
.mercury-drawer-wrapper {
  position: relative;
  width: 270px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.mercury-trigger {
  width: 100%;
  padding: 16px 22px;
  background: #020204;
  border: 1.5px solid #00f2fe;
  border-radius: 9999px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  display: flex;
  justify-between: space-between; /* Wait, justify-content is correct */
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.25), inset 0 0 10px rgba(0, 242, 254, 0.15);
  position: relative;
  overflow: hidden;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mercury-trigger:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 25px rgba(0, 242, 254, 0.45);
}

.mercury-core-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transform: skewX(-25deg);
  transition: left 0.7s;
}

.mercury-trigger:hover .mercury-core-glow {
  left: 150%;
}

.mercury-indicator {
  font-size: 8px;
  color: #00f2fe;
  transition: transform 0.4s ease;
}

.mercury-drawer-wrapper.active .mercury-indicator {
  transform: rotate(180deg);
}

/* Master liquid filter mapping overlay */
.mercury-menu-container {
  filter: url('#mercury-gooey-effect');
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding-top: 10px;
  z-index: 5;
  pointer-events: none;
}

.mercury-menu {
  display: flex;
  flex-direction: column;
  background: #020204;
  border-radius: 20px;
  padding: 8px;
  transform: scaleY(0);
  transform-origin: top center;
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}

.mercury-drawer-wrapper.active .mercury-menu-container {
  pointer-events: auto;
}

.mercury-drawer-wrapper.active .mercury-menu {
  transform: scaleY(1);
}

/* molten mercury options */
.mercury-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: #050508;
  border-radius: 14px;
  margin-bottom: 4px;
  opacity: 0;
  transform: translateY(-20px) scale(0.85);
  transition: opacity 0.5s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, color 0.3s;
  transition-delay: calc(var(--i) * 0.05s);
}

.mercury-drawer-wrapper.active .mercury-item {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.mercury-dot {
  width: 8px;
  height: 8px;
  background: #00f2fe;
  border-radius: 50%;
  box-shadow: 0 0 6px #00f2fe;
  transition: transform 0.3s;
}

.mercury-item:hover {
  background: rgba(0, 242, 254, 0.08);
  color: #00f2fe;
}

.mercury-item:hover .mercury-dot {
  transform: scale(1.3);
  background: #ffffff;
  box-shadow: 0 0 10px #ffffff;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[270px] font-sans select-none">
  <button class="w-full px-5 py-4 bg-[#020204] border border-cyan-400 rounded-full text-white font-bold text-xs tracking-wider flex justify-between items-center shadow-[0_0_15px_rgba(0,242,254,0.25)] hover:shadow-[0_0_25px_rgba(0,242,254,0.45)] transition-all">
    <span>TELEMETRY STACK</span>
    <span class="text-cyan-400 text-[8px]">▼</span>
  </button>
</div>`,
  prompt: `Design a premium "Magnetic Mercury Drawer" menu. Liquid metal droplets slide down and organically fuse together under a customized SVG gooey Gaussian filter to form a sleek black molten mercury option list.`
};
