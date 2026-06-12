/**
 * Component: Volcanic Magma Nav
 * Category: tabs-and-navs
 */

export const component = {
  id: 'volcanic-magma-nav',
  name: 'Volcanic Magma Nav',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="magma-nav-sandbox" id="magma-tabs-container">
  <div class="magma-nav">
    <div class="magma-lava-slider">
      <div class="lava-pulse"></div>
      <div class="lava-pulse"></div>
    </div>
    <button class="magma-tab-btn active" data-index="0">CRATER</button>
    <button class="magma-tab-btn" data-index="1">OBSIDIAN</button>
    <button class="magma-tab-btn" data-index="2">FISSURE</button>
  </div>
</div>`,
  js: `// Volcanic Magma active slider placement
const container = document.getElementById('magma-tabs-container');
if (container) {
  const buttons = container.querySelectorAll('.magma-tab-btn');
  const slider = container.querySelector('.magma-lava-slider');

  const updatePosition = () => {
    const active = container.querySelector('.magma-tab-btn.active');
    if (active) {
      slider.style.left = \`\${active.offsetLeft}px\`;
      slider.style.width = \`\${active.clientWidth}px\`;
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updatePosition();
    });
  });

  updatePosition();
  window.addEventListener('resize', updatePosition);
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('magma-tabs-container') as HTMLDivElement | null;
if (container) {
  const buttons = container.querySelectorAll('.magma-tab-btn');
  const slider = container.querySelector('.magma-lava-slider') as HTMLDivElement;

  const updatePosition = () => {
    const active = container.querySelector('.magma-tab-btn.active') as HTMLButtonElement | null;
    if (active) {
      slider.style.left = \`\${active.offsetLeft}px\`;
      slider.style.width = \`\${active.clientWidth}px\`;
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => (b as HTMLElement).classList.remove('active'));
      btn.classList.add('active');
      updatePosition();
    });
  });

  updatePosition();
  window.addEventListener('resize', updatePosition);
}`,
  css: `/* Volcanic Magma Nav styles */
.magma-nav-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #1b0a05 0%, #080302 100%);
  border: 1px solid rgba(249, 115, 22, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.magma-nav {
  position: relative;
  display: flex;
  background: rgba(10, 5, 2, 0.85);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
}

.magma-lava-slider {
  position: absolute;
  top: 4px;
  bottom: 4px;
  background: linear-gradient(135deg, #ff4500 0%, #ff8c00 100%);
  border-radius: 6px;
  z-index: 1;
  box-shadow: 0 0 20px rgba(255, 69, 0, 0.6), inset 0 0 6px rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.lava-pulse {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #ffffff;
  filter: blur(4px);
  opacity: 0.8;
  animation: lavaPulseAnim 2s infinite alternate;
}

.lava-pulse:nth-child(2) {
  animation-delay: 1s;
}

.magma-tab-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 24px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: rgba(249, 115, 22, 0.5);
  cursor: pointer;
  z-index: 2;
  transition: color 0.4s ease;
  letter-spacing: 1px;
}

.magma-tab-btn.active {
  color: #000000;
  font-weight: 900;
}

@keyframes lavaPulseAnim {
  0% { transform: scale(0.6); opacity: 0.3; }
  100% { transform: scale(1.4); opacity: 0.95; }
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#1b0a05] to-[#080302] border border-orange-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="magma-tabs-container">
  <div class="magma-nav relative flex bg-[#0a0502]/85 border border-orange-500/20 rounded-lg p-1 shadow-2xl">
    <div class="magma-lava-slider absolute top-1 bottom-1 bg-gradient-to-br from-red-600 to-orange-500 rounded z-10 shadow-[0_0_20px_rgba(255,69,0,0.6),inset_0_0_6px_rgba(255,255,255,0.3)] transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-around overflow-hidden">
      <div class="w-4 h-4 rounded-full bg-white blur-[4px] opacity-80 animate-[lavaPulseAnim_2s_infinite_alternate]"></div>
      <div class="w-4 h-4 rounded-full bg-white blur-[4px] opacity-80 animate-[lavaPulseAnim_2s_infinite_alternate] [animation-delay:1s]"></div>
    </div>
    <button class="magma-tab-btn active relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-black text-orange-500/50 cursor-pointer z-20 transition [&.active]:text-black" data-index="0">CRATER</button>
    <button class="magma-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-black text-orange-500/50 cursor-pointer z-20 transition [&.active]:text-black" data-index="1">OBSIDIAN</button>
    <button class="magma-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-black text-orange-500/50 cursor-pointer z-20 transition [&.active]:text-black" data-index="2">FISSURE</button>
  </div>
</div>`,
  prompt: 'Design a dark volcanic magma switcher menu panel with pulsing molten orange lava indicators sliding dynamically.'
};
