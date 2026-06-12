/**
 * Component: Luxury Gold Shimmer Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'luxury-gold-shimmer-tabs',
  name: 'Luxury Gold Shimmer Tabs',
  category: 'tabs-and-navs',
  tag: 'Luxury',
  html: `<div class="gold-tabs-sandbox" id="gold-tabs-container">
  <div class="gold-nav">
    <div class="gold-shimmer-slider"></div>
    <button class="gold-tab-btn active" data-index="0">ROYAL</button>
    <button class="gold-tab-btn" data-index="1">CROWN</button>
    <button class="gold-tab-btn" data-index="2">PALACE</button>
  </div>
</div>`,
  js: `// Luxury Gold Shimmer slider animation
const container = document.getElementById('gold-tabs-container');
if (container) {
  const buttons = container.querySelectorAll('.gold-tab-btn');
  const slider = container.querySelector('.gold-shimmer-slider');

  const updateSlider = () => {
    const active = container.querySelector('.gold-tab-btn.active');
    if (active) {
      slider.style.left = \`\${active.offsetLeft}px\`;
      slider.style.width = \`\${active.clientWidth}px\`;
      
      // Trigger a brilliant golden sweep animation
      slider.classList.remove('sweep');
      void slider.offsetWidth; // Force reflow
      slider.classList.add('sweep');
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateSlider();
    });
  });

  updateSlider();
  window.addEventListener('resize', updateSlider);
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('gold-tabs-container') as HTMLDivElement | null;
if (container) {
  const buttons = container.querySelectorAll('.gold-tab-btn');
  const slider = container.querySelector('.gold-shimmer-slider') as HTMLDivElement;

  const updateSlider = () => {
    const active = container.querySelector('.gold-tab-btn.active') as HTMLButtonElement | null;
    if (active) {
      slider.style.left = \`\${active.offsetLeft}px\`;
      slider.style.width = \`\${active.clientWidth}px\`;
      
      slider.classList.remove('sweep');
      void slider.offsetWidth;
      slider.classList.add('sweep');
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => (b as HTMLElement).classList.remove('active'));
      btn.classList.add('active');
      updateSlider();
    });
  });

  updateSlider();
  window.addEventListener('resize', updateSlider);
}`,
  css: `/* Luxury Gold Shimmer Tabs styles */
.gold-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #151006 0%, #050401 100%);
  border: 1px solid rgba(212, 175, 55, 0.18);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.gold-nav {
  position: relative;
  display: flex;
  background: rgba(20, 15, 10, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 100px;
  padding: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 12px rgba(212, 175, 55, 0.05);
}

.gold-shimmer-slider {
  position: absolute;
  top: 4px;
  bottom: 4px;
  background: linear-gradient(135deg, #ffd700 0%, #b8860b 100%);
  border-radius: 100px;
  z-index: 1;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4), inset 0 0 4px rgba(255, 255, 255, 0.6);
  transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
}

/* Gold Sweep effect */
.gold-shimmer-slider::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  transform: translateX(-100%) skewX(-20deg);
}

.gold-shimmer-slider.sweep::after {
  animation: goldSweepEffect 0.6s ease-out forwards;
}

.gold-tab-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 26px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: rgba(212, 175, 55, 0.5);
  cursor: pointer;
  z-index: 2;
  transition: color 0.4s ease;
  letter-spacing: 1px;
}

.gold-tab-btn.active {
  color: #070502;
}

@keyframes goldSweepEffect {
  0% { transform: translateX(-100%) skewX(-20deg); }
  100% { transform: translateX(200%) skewX(-20deg); }
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#151006] to-[#050401] border border-[#d4af37]/18 rounded-3xl flex items-center justify-center overflow-hidden" id="gold-tabs-container">
  <div class="gold-nav relative flex bg-[#140f0a]/60 border border-[#d4af37]/25 rounded-full p-1 shadow-2xl">
    <div class="gold-shimmer-slider absolute top-1 bottom-1 bg-gradient-to-br from-yellow-400 to-amber-700 rounded-full z-10 shadow-[0_0_15px_rgba(212,175,55,0.4),inset_0_0_4px_rgba(255,255,255,0.6)] transition-all duration-[450ms] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)] after:-translate-x-full after:-skew-x-[20deg] [&.sweep]:after:animate-[goldSweepEffect_0.6s_ease-out_forwards]"></div>
    <button class="gold-tab-btn active relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-extrabold text-[#d4af37]/50 cursor-pointer z-20 transition [&.active]:text-[#070502]" data-index="0">ROYAL</button>
    <button class="gold-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-extrabold text-[#d4af37]/50 cursor-pointer z-20 transition [&.active]:text-[#070502]" data-index="1">CROWN</button>
    <button class="gold-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-extrabold text-[#d4af37]/50 cursor-pointer z-20 transition [&.active]:text-[#070502]" data-index="2">PALACE</button>
  </div>
</div>`,
  prompt: 'Design a luxury gold segmented navigation switcher featuring light sweep shimmer flares sliding smoothly.'
};
