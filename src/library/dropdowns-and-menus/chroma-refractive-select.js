/**
 * Component: Chroma Refractive Select
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'chroma-refractive-select',
  name: 'Chroma Refractive Select',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="refractive-select-wrapper">
  <!-- Crystal Plate Trigger -->
  <button class="refractive-trigger">
    <span>CRYSTAL QUARTZ</span>
    <span class="refractive-icon">◈</span>
  </button>
  
  <!-- Splitting spectrum menu panel -->
  <div class="refractive-menu">
    <div class="refractive-spectrum-line"></div>
    <div class="refractive-contents">
      <div class="refractive-item" style="--i: 0;">
        <span class="refractive-label">Spectra Channel A</span>
      </div>
      <div class="refractive-item" style="--i: 1;">
        <span class="refractive-label">Refract Module B</span>
      </div>
      <div class="refractive-item" style="--i: 2;">
        <span class="refractive-label">Quartz Prism C</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Refractive coordinate light splitting following coordinates on hover
const rWrapper = document.querySelector('.refractive-select-wrapper');
if (rWrapper) {
  const trigger = rWrapper.querySelector('.refractive-trigger');
  const menu = rWrapper.querySelector('.refractive-menu');
  const items = rWrapper.querySelectorAll('.refractive-item');
  
  trigger.addEventListener('click', () => {
    rWrapper.classList.toggle('active');
  });

  items.forEach(item => {
    // Select option logic
    item.addEventListener('click', () => {
      const text = item.querySelector('.refractive-label').textContent;
      trigger.querySelector('span').textContent = text.toUpperCase();
      rWrapper.classList.remove('active');
    });

    // Custom refractive light angle shifting relative to hover coordinate
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      item.style.setProperty('--x', \`\${x}px\`);
      item.style.setProperty('--y', \`\${y}px\`);
    });
  });

  document.addEventListener('click', (e) => {
    if (!rWrapper.contains(e.target)) {
      rWrapper.classList.remove('active');
    }
  });
}`,
  ts: `// TypeScript Implementation
const rWrapper = document.querySelector<HTMLDivElement>('.refractive-select-wrapper');
if (rWrapper) {
  const trigger = rWrapper.querySelector<HTMLButtonElement>('.refractive-trigger');
  const items = rWrapper.querySelectorAll<HTMLDivElement>('.refractive-item');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      rWrapper.classList.toggle('active');
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const labelEl = item.querySelector<HTMLSpanElement>('.refractive-label');
      const text = labelEl ? labelEl.textContent : '';
      const triggerLabel = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (triggerLabel && text) {
        triggerLabel.textContent = text.toUpperCase();
      }
      rWrapper.classList.remove('active');
    });

    item.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      item.style.setProperty('--x', \`\${x}px\`);
      item.style.setProperty('--y', \`\${y}px\`);
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (rWrapper && !rWrapper.contains(e.target as Node)) {
      rWrapper.classList.remove('active');
    }
  });
}`,
  css: `/* Chroma Refractive Select Styles */
.refractive-select-wrapper {
  position: relative;
  width: 270px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.refractive-trigger {
  width: 100%;
  padding: 16px 22px;
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.refractive-trigger:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.03);
}

.refractive-icon {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  transition: transform 0.4s;
}

.refractive-select-wrapper.active .refractive-icon {
  transform: rotate(180deg) scale(1.15);
  color: #ffffff;
}

/* Prismatic refractive split dropdown panel */
.refractive-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(10, 10, 12, 0.85);
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 100;
  backdrop-filter: blur(25px);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.refractive-select-wrapper.active .refractive-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
}

/* Splitting prism spectrum line across the top border */
.refractive-spectrum-line {
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, #ff0055, #ffd700, #00ffcc, #00f2fe, #8a2be2, #ff0055);
  background-size: 400% 100%;
  animation: spectrum-glide 8s infinite linear;
}

.refractive-contents {
  padding: 6px;
  display: flex;
  flex-direction: column;
}

/* Individual option refractive spotlight hover */
.refractive-item {
  position: relative;
  padding: 14px 18px;
  cursor: pointer;
  border-radius: 3px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--i) * 0.06s);
}

.refractive-select-wrapper.active .refractive-item {
  opacity: 1;
  transform: translateY(0);
}

.refractive-label {
  position: relative;
  z-index: 2;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 600;
  transition: color 0.3s;
}

/* spotlight pointer follower grid */
.refractive-item::before {
  content: '';
  position: absolute;
  top: var(--y, 0px);
  left: var(--x, 0px);
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.3s;
}

.refractive-item:hover::before {
  opacity: 1;
}

/* Prismatic chromatic border outline inside active elements */
.refractive-item::after {
  content: '';
  position: absolute;
  inset: 0;
  border-left: 2px solid transparent;
  z-index: 3;
  transition: border-color 0.3s;
}

.refractive-item:hover::after {
  border-color: #00ffcc;
  animation: spectrum-border-pulse 4s infinite linear;
}

.refractive-item:hover .refractive-label {
  color: #ffffff;
}

@keyframes spectrum-glide {
  0% { background-position: 0% 50%; }
  100% { background-position: 400% 50%; }
}

@keyframes spectrum-border-pulse {
  0% { border-color: #ff0055; }
  25% { border-color: #ffd700; }
  50% { border-color: #00ffcc; }
  75% { border-color: #00f2fe; }
  100% { border-color: #ff0055; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[270px] font-sans select-none">
  <button class="w-full px-5 py-4 bg-white/5 border border-white/10 rounded text-white font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:bg-white/10 hover:border-white/20 transition-all">
    <span>CRYSTAL QUARTZ</span>
    <span class="text-white/40">◈</span>
  </button>
</div>`,
  prompt: `Design a premium "Chroma Refractive Select" menu. A crystal quartz panel selector, opening projects a rotating spectrum line. Options support coordinates refractive blur spotlight follower relative to mouse hover.`
};
