/**
 * Component: Bipolar Polarized Gate Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'bipolar-polarized-gate-tabs',
  name: 'Bipolar Polarized Gate Tabs',
  category: 'tabs-and-navs',
  tag: 'Creative',
  html: `<div class="bipolar-tabs-sandbox" id="bipolar-tabs-sandbox-container">
  <div class="bipolar-nav">
    <div class="polarized-gate positive-gate"></div>
    <div class="polarized-gate negative-gate"></div>
    <div class="polarized-shockwave"></div>
    
    <button class="bipolar-tab-btn active">Alpha</button>
    <button class="bipolar-tab-btn">Beta</button>
    <button class="bipolar-tab-btn">Gamma</button>
    <button class="bipolar-tab-btn">Delta</button>
  </div>
</div>`,
  js: `// Bipolar Polarized Gate Tabs interaction logic
const container = document.getElementById('bipolar-tabs-sandbox-container');
if (container) {
  const buttons = container.querySelectorAll('.bipolar-tab-btn');
  const posGate = container.querySelector('.positive-gate');
  const negGate = container.querySelector('.negative-gate');
  const shockwave = container.querySelector('.polarized-shockwave');
  const nav = container.querySelector('.bipolar-nav');
  
  const updateGates = () => {
    const activeBtn = container.querySelector('.bipolar-tab-btn.active');
    if (activeBtn) {
      const left = activeBtn.offsetLeft;
      const width = activeBtn.clientWidth;
      
      // Update gate positions
      posGate.style.left = \`\${left}px\`;
      posGate.style.width = \`\${width}px\`;
      
      negGate.style.left = \`\${left}px\`;
      negGate.style.width = \`\${width}px\`;
      
      // Trigger shockwave flash
      shockwave.style.left = \`\${left}px\`;
      shockwave.style.width = \`\${width}px\`;
      
      shockwave.classList.remove('trigger');
      void shockwave.offsetWidth; // Force reflow
      shockwave.classList.add('trigger');
    }
  };
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateGates();
    });
  });
  
  updateGates();
  window.addEventListener('resize', updateGates);
}`,
  ts: `// TypeScript Implementation
const container = document.getElementById('bipolar-tabs-sandbox-container') as HTMLDivElement | null;
if (container) {
  const buttons = container.querySelectorAll('.bipolar-tab-btn');
  const posGate = container.querySelector('.positive-gate') as HTMLDivElement;
  const negGate = container.querySelector('.negative-gate') as HTMLDivElement;
  const shockwave = container.querySelector('.polarized-shockwave') as HTMLDivElement;
  
  const updateGates = () => {
    const activeBtn = container.querySelector('.bipolar-tab-btn.active') as HTMLButtonElement | null;
    if (activeBtn) {
      const left = activeBtn.offsetLeft;
      const width = activeBtn.clientWidth;
      
      posGate.style.left = \`\${left}px\`;
      posGate.style.width = \`\${width}px\`;
      
      negGate.style.left = \`\${left}px\`;
      negGate.style.width = \`\${width}px\`;
      
      shockwave.style.left = \`\${left}px\`;
      shockwave.style.width = \`\${width}px\`;
      
      shockwave.classList.remove('trigger');
      void shockwave.offsetWidth;
      shockwave.classList.add('trigger');
    }
  };
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateGates();
    });
  });
  
  updateGates();
  window.addEventListener('resize', updateGates);
}`,
  css: `/* Bipolar Polarized Gate Tabs styles */
.bipolar-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #0e0511 0%, #030105 100%);
  border: 1px solid rgba(236, 72, 153, 0.12);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.bipolar-nav {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  padding: 6px;
  gap: 6px;
  z-index: 1;
}

/* Symmetrical Polarized Forcefield gates */
.polarized-gate {
  position: absolute;
  top: 6px;
  bottom: 6px;
  border-radius: 4px;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: screen;
  transition: all 0.45s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Positive Gate: Cyan sliding from Left */
.positive-gate {
  border-left: 2px solid #00f2fe;
  background: linear-gradient(90deg, rgba(0, 242, 254, 0.06), transparent);
  box-shadow: -4px 0 10px rgba(0, 242, 254, 0.3);
}

/* Negative Gate: Magenta sliding from Right */
.negative-gate {
  border-right: 2px solid #ec4899;
  background: linear-gradient(-90deg, rgba(236, 72, 153, 0.06), transparent);
  box-shadow: 4px 0 10px rgba(236, 72, 153, 0.3);
}

/* Polarized Border Clash Shockwave line */
.polarized-shockwave {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #a855f7, #ffffff, #a855f7, transparent);
  pointer-events: none;
  z-index: 3;
  opacity: 0;
  transition: all 0.45s cubic-bezier(0.25, 1, 0.5, 1);
}

.polarized-shockwave.trigger {
  animation: bipolarShock 0.5s ease-out;
}

.bipolar-tab-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 22px;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s;
}

.bipolar-tab-btn.active {
  color: #ffffff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

@keyframes bipolarShock {
  0% { opacity: 0; transform: scaleX(0.1); }
  50% { opacity: 1; transform: scaleX(1); }
  100% { opacity: 0; transform: scaleX(1.2); }
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#0e0511] to-[#030105] border border-pink-500/10 rounded-2xl flex items-center justify-center overflow-hidden" id="bipolar-tabs-sandbox-container">
  <div class="bipolar-nav relative flex bg-white/[0.01] border border-white/[0.04] rounded-lg p-1.5 gap-1.5 z-10">
    <div class="polarized-gate positive-gate absolute top-1.5 bottom-1.5 border-l-2 border-cyan-400 bg-gradient-to-r from-cyan-400/5 to-transparent rounded shadow-[-4px_0_10px_rgba(0,242,254,0.3)] pointer-events-none z-10 mix-blend-screen transition-all duration-[450ms]"></div>
    <div class="polarized-gate negative-gate absolute top-1.5 bottom-1.5 border-r-2 border-pink-500 bg-gradient-to-l from-pink-500/5 to-transparent rounded shadow-[4px_0_10px_rgba(236,72,153,0.3)] pointer-events-none z-10 mix-blend-screen transition-all duration-[450ms]"></div>
    <div class="polarized-shockwave absolute bottom-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent pointer-events-none z-30 opacity-0 transition-all duration-[450ms] [&.trigger]:animate-[bipolarShock_0.5s_ease-out]"></div>
    
    <button class="bipolar-tab-btn active relative bg-transparent border-none px-5 py-2.5 font-sans text-xs font-semibold text-white/40 cursor-pointer z-20 transition hover:text-white [&.active]:text-white [&.active]:text-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Alpha</button>
    <button class="bipolar-tab-btn relative bg-transparent border-none px-5 py-2.5 font-sans text-xs font-semibold text-white/40 cursor-pointer z-20 transition hover:text-white [&.active]:text-white [&.active]:text-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Beta</button>
    <button class="bipolar-tab-btn relative bg-transparent border-none px-5 py-2.5 font-sans text-xs font-semibold text-white/40 cursor-pointer z-20 transition hover:text-white [&.active]:text-white [&.active]:text-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Gamma</button>
    <button class="bipolar-tab-btn relative bg-transparent border-none px-5 py-2.5 font-sans text-xs font-semibold text-white/40 cursor-pointer z-20 transition hover:text-white [&.active]:text-white [&.active]:text-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Delta</button>
  </div>
</div>`,
  prompt: 'Design a bipolar polarized gate tab component where opposing cyan and magenta border bars slide and clash together on selected options.'
};
