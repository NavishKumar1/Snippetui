/**
 * Component: Luxury Filigree Gate Menu
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'luxury-filigree-gate-menu',
  name: 'Luxury Filigree Gate Menu',
  category: 'dropdowns-and-menus',
  tag: 'Creative',
  html: `<div class="luxury-gate-wrapper">
  <!-- Trigger Button -->
  <button class="luxury-gate-trigger">
    <span>ACCEDE DIRECTORY</span>
    <span class="gate-icon">⚜️</span>
  </button>
  
  <!-- Velvet & Gold Gate Panels -->
  <div class="luxury-gate-menu">
    <div class="gate-left">
      <div class="gate-pattern left-pattern"></div>
    </div>
    <div class="gate-right">
      <div class="gate-pattern right-pattern"></div>
    </div>
    
    <!-- Secret Option Contents -->
    <div class="gate-contents">
      <div class="luxury-item" style="--d: 0.1s;">
        <span class="luxury-item-num">01</span>
        <span class="luxury-item-name">Royal Vault</span>
      </div>
      <div class="luxury-item" style="--d: 0.2s;">
        <span class="luxury-item-num">02</span>
        <span class="luxury-item-name">Elite Archives</span>
      </div>
      <div class="luxury-item" style="--d: 0.3s;">
        <span class="luxury-item-num">03</span>
        <span class="luxury-item-name">Grand Gallery</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Splitting gates open and close transitions
const gWrapper = document.querySelector('.luxury-gate-wrapper');
if (gWrapper) {
  const trigger = gWrapper.querySelector('.luxury-gate-trigger');
  const menu = gWrapper.querySelector('.luxury-gate-menu');
  const items = gWrapper.querySelectorAll('.luxury-item');
  
  trigger.addEventListener('click', () => {
    gWrapper.classList.toggle('active');
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.luxury-item-name').textContent;
      trigger.querySelector('span').textContent = name.toUpperCase();
      gWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!gWrapper.contains(e.target)) {
      gWrapper.classList.remove('active');
    }
  });
}`,
  ts: `// TypeScript Implementation
const gWrapper = document.querySelector<HTMLDivElement>('.luxury-gate-wrapper');
if (gWrapper) {
  const trigger = gWrapper.querySelector<HTMLButtonElement>('.luxury-gate-trigger');
  const items = gWrapper.querySelectorAll<HTMLDivElement>('.luxury-item');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      gWrapper.classList.toggle('active');
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const nameEl = item.querySelector<HTMLSpanElement>('.luxury-item-name');
      const name = nameEl ? nameEl.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && name) {
        label.textContent = name.toUpperCase();
      }
      gWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (gWrapper && !gWrapper.contains(e.target as Node)) {
      gWrapper.classList.remove('active');
    }
  });
}`,
  css: `/* Luxury Filigree Gate Menu Styles */
.luxury-gate-wrapper {
  position: relative;
  width: 280px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.luxury-gate-trigger {
  width: 100%;
  padding: 16px 24px;
  background: radial-gradient(circle at center, #1b1612 0%, #0d0a08 100%);
  border: 1.5px solid #d4af37;
  border-radius: 4px;
  color: #d4af37;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(212, 175, 55, 0.1);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.luxury-gate-trigger:hover {
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.35), inset 0 0 15px rgba(212, 175, 55, 0.2);
  letter-spacing: 0.14em;
  transform: translateY(-1px);
}

.gate-icon {
  font-size: 12px;
  text-shadow: 0 0 4px #d4af37;
  transition: transform 0.4s ease;
}

.luxury-gate-wrapper.active .gate-icon {
  transform: rotate(360deg);
}

.luxury-gate-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  height: 180px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 100;
  display: flex;
  pointer-events: none;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  border: 1.5px solid rgba(212, 175, 55, 0.15);
}

/* Left and Right gate panels */
.gate-left, .gate-right {
  flex: 0 0 50%;
  height: 100%;
  background: radial-gradient(circle at center, #1b1612 0%, #0d0a08 100%);
  position: relative;
  z-index: 5;
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
  display: flex;
  align-items: center;
}

.gate-left {
  border-right: 1px solid #d4af37;
  justify-content: flex-end;
}

.gate-right {
  border-left: 1px solid #d4af37;
  justify-content: flex-start;
}

/* Gorgeous custom CSS gold filigree borders inside the gates */
.gate-pattern {
  width: 24px;
  height: 96px;
  opacity: 0.55;
  transition: opacity 0.3s;
}

.left-pattern {
  border-right: 2.5px solid #d4af37;
  border-top: 2.5px solid #d4af37;
  border-bottom: 2.5px solid #d4af37;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-right: 12px;
}

.right-pattern {
  border-left: 2.5px solid #d4af37;
  border-top: 2.5px solid #d4af37;
  border-bottom: 2.5px solid #d4af37;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  margin-left: 12px;
}

/* Secrets behind the split gates */
.gate-contents {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, #0e0907 0%, #050302 100%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.luxury-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.luxury-item-num {
  font-size: 10px;
  font-weight: 700;
  color: rgba(212, 175, 55, 0.4);
}

.luxury-item-name {
  font-size: 13px;
  font-weight: 600;
  color: #f5ecc8;
  text-shadow: 0 0 2px rgba(245, 236, 200, 0.2);
  transition: all 0.2s;
}

.luxury-item:hover .luxury-item-name {
  color: #ffd700;
  text-shadow: 0 0 6px #ffd700;
  transform: translateX(4px);
}

/* Opened/Active animations */
.luxury-gate-wrapper.active .luxury-gate-menu {
  pointer-events: auto;
  border-color: rgba(212, 175, 55, 0.4);
}

.luxury-gate-wrapper.active .gate-left {
  transform: translateX(-100%);
}

.luxury-gate-wrapper.active .gate-right {
  transform: translateX(100%);
}

.luxury-gate-wrapper.active .luxury-item {
  opacity: 1;
  transform: translateY(0);
  transition-delay: var(--d);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[280px] font-sans select-none">
  <button class="w-full px-6 py-4 bg-gradient-to-b from-[#1b1612] to-[#0d0a08] border border-amber-500 rounded text-amber-500 font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] transition-all">
    <span>ACCEDE DIRECTORY</span>
    <span class="text-xs">⚜️</span>
  </button>
</div>`,
  prompt: `Design a premium "Luxury Filigree Gate Menu" component. Styled with obsidian textures and rich gold filigree borders, opening the dropdown splits the panels left-to-right like a double velvet curtain door to reveal gold-foiled contents inside.`
};
