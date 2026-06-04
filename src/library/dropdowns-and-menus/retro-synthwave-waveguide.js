/**
 * Component: Retro Synthwave Waveguide
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'retro-synthwave-waveguide',
  name: 'Retro Synthwave Waveguide',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="sw-waveguide-wrapper">
  <!-- Retro Trigger -->
  <button class="sw-trigger">
    <span>INITIATE OUTRUN</span>
    <span class="sw-indicator">▲</span>
  </button>
  
  <!-- Synthwave backdrop dropdown menu panel -->
  <div class="sw-menu">
    <!-- Rising neon sun behind grid -->
    <div class="sw-synth-sun"></div>
    <div class="sw-synth-grid"></div>
    
    <div class="sw-contents">
      <div class="sw-item" style="--i: 0;">
        <span class="sw-bullet"></span>
        <span>Grid Rider</span>
      </div>
      <div class="sw-item" style="--i: 1;">
        <span class="sw-bullet"></span>
        <span>Laser Horizon</span>
      </div>
      <div class="sw-item" style="--i: 2;">
        <span class="sw-bullet"></span>
        <span>Neon Sunset</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Synthwave outrun grid scrolling speed-up on active toggle
const swWrapper = document.querySelector('.sw-waveguide-wrapper');
if (swWrapper) {
  const trigger = swWrapper.querySelector('.sw-trigger');
  const items = swWrapper.querySelectorAll('.sw-item');
  
  trigger.addEventListener('click', () => {
    swWrapper.classList.toggle('active');
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('span:nth-child(2)').textContent;
      trigger.querySelector('span').textContent = text.toUpperCase();
      swWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!swWrapper.contains(e.target)) {
      swWrapper.classList.remove('active');
    }
  });
}`,
  ts: `// TypeScript Implementation
const swWrapper = document.querySelector<HTMLDivElement>('.sw-waveguide-wrapper');
if (swWrapper) {
  const trigger = swWrapper.querySelector<HTMLButtonElement>('.sw-trigger');
  const items = swWrapper.querySelectorAll<HTMLDivElement>('.sw-item');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      swWrapper.classList.toggle('active');
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
      swWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (swWrapper && !swWrapper.contains(e.target as Node)) {
      swWrapper.classList.remove('active');
    }
  });
}`,
  css: `/* Retro Synthwave Waveguide Styles */
.sw-waveguide-wrapper {
  position: relative;
  width: 270px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
}

.sw-trigger {
  width: 100%;
  padding: 14px 20px;
  background: #0d0214;
  border: 1.5px solid #ff007f;
  border-radius: 4px;
  color: #ff007f;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 0, 127, 0.1);
  text-shadow: 0 0 4px rgba(255, 0, 127, 0.5);
  transition: all 0.3s;
}

.sw-trigger:hover {
  border-color: #00f2fe;
  color: #00f2fe;
  box-shadow: 0 0 15px rgba(0, 242, 354, 0.3);
  text-shadow: 0 0 4px rgba(0, 242, 254, 0.5);
}

.sw-indicator {
  font-size: 8px;
  transition: transform 0.4s;
}

.sw-waveguide-wrapper.active .sw-indicator {
  transform: rotate(180deg);
}

/* Synthwave Outrun dropdown menu panel */
.sw-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  height: 180px;
  background: #0d0214;
  border: 1.5px solid rgba(255, 0, 127, 0.25);
  border-radius: 6px;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
  overflow: hidden;
}

.sw-waveguide-wrapper.active .sw-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  border-color: #ff007f;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 0, 127, 0.15);
}

/* Giant rising sun backdrop */
.sw-synth-sun {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%) translateY(40px);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(0deg, #ff007f, #ffd700);
  box-shadow: 0 0 20px #ff007f;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1;
}

.sw-waveguide-wrapper.active .sw-synth-sun {
  transform: translateX(-50%) translateY(-10px);
}

/* Wireframe grid backdrop perspective scrolling */
.sw-synth-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 0, 127, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 127, 0.08) 1px, transparent 1px);
  background-size: 100% 12px, 20px 100%;
  perspective: 120px;
  transform: rotateX(45deg);
  transform-origin: bottom center;
  z-index: 2;
  pointer-events: none;
  opacity: 0.8;
}

.sw-contents {
  position: relative;
  z-index: 3;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
}

/* Vertical wireframe column slide */
.sw-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 3px;
  background: rgba(13, 2, 20, 0.85);
  border: 1px solid rgba(255, 0, 127, 0.1);
  margin-bottom: 6px;
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, color 0.2s;
  transition-delay: calc(var(--i) * 0.06s);
}

.sw-waveguide-wrapper.active .sw-item {
  opacity: 1;
  transform: translateY(0);
}

.sw-bullet {
  width: 5px;
  height: 5px;
  background: #ff007f;
  border-radius: 50%;
  box-shadow: 0 0 6px #ff007f;
  transition: all 0.3s;
}

.sw-item:hover {
  border-color: #00f2fe;
  color: #00f2fe;
  background: rgba(0, 242, 254, 0.06);
}

.sw-item:hover .sw-bullet {
  background: #00f2fe;
  box-shadow: 0 0 8px #00f2fe, 0 0 16px #00f2fe;
  transform: scale(1.3);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[270px] font-sans select-none">
  <button class="w-full px-5 py-3.5 bg-[#0d0214] border border-pink-500 rounded text-pink-500 font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:border-cyan-400 hover:text-cyan-400 transition-all">
    <span>INITIATE OUTRUN</span>
    <span class="text-[8px]">▲</span>
  </button>
</div>`,
  prompt: `Design a premium "Retro Synthwave Waveguide" menu. Set inside outrun neon frames, opening the dropdown triggers a giant glowing sun to rise in the background behind vertical wireframe columns.`
};
