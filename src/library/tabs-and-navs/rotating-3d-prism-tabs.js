/**
 * Component: Rotating 3D Prism Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'rotating-3d-prism-tabs',
  name: 'Rotating 3D Prism Tabs',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="prism-sandbox" id="prism-tabs-container">
  <div class="prism-nav-layout">
    <!-- Buttons to trigger rotation -->
    <div class="prism-controls">
      <button class="prism-btn active" data-index="0" data-deg="0">ALPHA</button>
      <button class="prism-btn" data-index="1" data-deg="120">BETA</button>
      <button class="prism-btn" data-index="2" data-deg="240">GAMMA</button>
    </div>

    <!-- 3D Prism Space -->
    <div class="prism-viewport">
      <div class="prism-cube" id="rotating-prism-element">
        <!-- Face Alpha -->
        <div class="prism-face face-alpha">
          <div class="face-glow-border"></div>
          <div class="face-content">
            <span class="face-title">ALPHA_NODE</span>
            <span class="face-desc">SYS_STATUS: READY</span>
          </div>
        </div>
        
        <!-- Face Beta -->
        <div class="prism-face face-beta">
          <div class="face-glow-border"></div>
          <div class="face-content">
            <span class="face-title">BETA_NODE</span>
            <span class="face-desc">DB_PING: 12ms</span>
          </div>
        </div>

        <!-- Face Gamma -->
        <div class="prism-face face-gamma">
          <div class="face-glow-border"></div>
          <div class="face-content">
            <span class="face-title">GAMMA_NODE</span>
            <span class="face-desc">LNK_LOCK: ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Rotating 3D Prism Tabs logic
const container = document.getElementById('prism-tabs-container');
if (container) {
  const buttons = container.querySelectorAll('.prism-btn');
  const prism = container.querySelector('#rotating-prism-element');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const deg = btn.getAttribute('data-deg');
      // Rotate the entire prism container to bring the selected face to the front
      prism.style.transform = \`rotateY(-\${deg}deg)\`;
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('prism-tabs-container') as HTMLDivElement | null;
if (container) {
  const buttons = container.querySelectorAll('.prism-btn');
  const prism = container.querySelector('#rotating-prism-element') as HTMLDivElement;

  buttons.forEach(btn => {
    const btnEl = btn as HTMLButtonElement;
    btnEl.addEventListener('click', () => {
      buttons.forEach(b => (b as HTMLElement).classList.remove('active'));
      btnEl.classList.add('active');

      const degAttr = btnEl.getAttribute('data-deg') || '0';
      if (prism) {
        prism.style.transform = \`rotateY(-\${degAttr}deg)\`;
      }
    });
  });
}`,
  css: `/* Rotating 3D Prism Tabs styles */
.prism-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #0c0816 0%, #030206 100%);
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.prism-nav-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  perspective: 600px;
}

.prism-controls {
  display: flex;
  background: rgba(18, 12, 36, 0.8);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
}

.prism-btn {
  background: transparent;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.4);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.prism-btn:hover {
  color: #ffffff;
}

.prism-btn.active {
  color: #a78bfa;
  background: rgba(139, 92, 246, 0.1);
  box-shadow: inset 0 0 8px rgba(139, 92, 246, 0.2);
}

/* 3D Prism Viewport */
.prism-viewport {
  width: 150px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
}

.prism-cube {
  position: relative;
  width: 140px;
  height: 70px;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
  transform: rotateY(0deg);
}

.prism-face {
  position: absolute;
  inset: 0;
  background: rgba(15, 10, 30, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

/* 3-Sided Prism Face Placements (translateZ = width / (2 * tan(180/3)) = 70 / (2 * 1.732) = ~40.4px) */
.face-alpha {
  transform: rotateY(0deg) translateZ(44px);
  border-color: rgba(167, 139, 250, 0.3);
}
.face-alpha .face-glow-border {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, transparent 100%);
}

.face-beta {
  transform: rotateY(120deg) translateZ(44px);
  border-color: rgba(0, 242, 254, 0.3);
}
.face-beta .face-glow-border {
  background: linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, transparent 100%);
}

.face-gamma {
  transform: rotateY(240deg) translateZ(44px);
  border-color: rgba(0, 255, 102, 0.3);
}
.face-gamma .face-glow-border {
  background: linear-gradient(135deg, rgba(0, 255, 102, 0.2) 0%, transparent 100%);
}

.face-glow-border {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.3;
}

.face-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transform: translateZ(10px);
}

.face-title {
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.face-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 8px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#0c0816] to-[#030206] border border-violet-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="prism-tabs-container">
  <div class="flex flex-col items-center gap-6 [perspective:600px]">
    
    <!-- Buttons to trigger rotation -->
    <div class="flex bg-[#120c24]/80 border border-violet-500/20 rounded-xl p-1 gap-1">
      <button class="bg-transparent border-none font-sans text-[11px] font-extrabold text-white/40 hover:text-white px-4 py-2 cursor-pointer rounded-lg transition [&.active]:text-violet-300 [&.active]:bg-violet-500/10 prism-btn active" data-index="0" data-deg="0">ALPHA</button>
      <button class="bg-transparent border-none font-sans text-[11px] font-extrabold text-white/40 hover:text-white px-4 py-2 cursor-pointer rounded-lg transition [&.active]:text-[#00f2fe] [&.active]:bg-[#00f2fe]/10 prism-btn" data-index="1" data-deg="120">BETA</button>
      <button class="bg-transparent border-none font-sans text-[11px] font-extrabold text-white/40 hover:text-white px-4 py-2 cursor-pointer rounded-lg transition [&.active]:text-emerald-300 [&.active]:bg-emerald-500/10 prism-btn" data-index="2" data-deg="240">GAMMA</button>
    </div>

    <!-- 3D Prism Space -->
    <div class="w-[150px] h-20 flex items-center justify-center [transform-style:preserve-3d]">
      <div class="relative w-[140px] h-[70px] [transform-style:preserve-3d] transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]" id="rotating-prism-element" style="transform: rotateY(0deg);">
        
        <!-- Face Alpha -->
        <div class="absolute inset-0 bg-[#0f0a1e]/85 border border-violet-500/30 rounded-xl flex items-center justify-center [backface-visibility:hidden] [transform-style:preserve-3d] shadow-2xl [transform:rotateY(0deg)_translateZ(44px)]">
          <div class="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent pointer-events-none opacity-30"></div>
          <div class="flex flex-col items-center gap-1.5 [transform:translateZ(10px)]">
            <span class="font-mono text-[11px] font-extrabold text-white tracking-wide">ALPHA_NODE</span>
            <span class="font-sans text-[8px] font-bold text-white/40">SYS_STATUS: READY</span>
          </div>
        </div>
        
        <!-- Face Beta -->
        <div class="absolute inset-0 bg-[#0f0a1e]/85 border border-cyan-500/30 rounded-xl flex items-center justify-center [backface-visibility:hidden] [transform-style:preserve-3d] shadow-2xl [transform:rotateY(120deg)_translateZ(44px)]">
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent pointer-events-none opacity-30"></div>
          <div class="flex flex-col items-center gap-1.5 [transform:translateZ(10px)]">
            <span class="font-mono text-[11px] font-extrabold text-white tracking-wide">BETA_NODE</span>
            <span class="font-sans text-[8px] font-bold text-white/40">DB_PING: 12ms</span>
          </div>
        </div>

        <!-- Face Gamma -->
        <div class="absolute inset-0 bg-[#0f0a1e]/85 border border-emerald-500/30 rounded-xl flex items-center justify-center [backface-visibility:hidden] [transform-style:preserve-3d] shadow-2xl [transform:rotateY(240deg)_translateZ(44px)]">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent pointer-events-none opacity-30"></div>
          <div class="flex flex-col items-center gap-1.5 [transform:translateZ(10px)]">
            <span class="font-mono text-[11px] font-extrabold text-white tracking-wide">GAMMA_NODE</span>
            <span class="font-sans text-[8px] font-bold text-white/40">LNK_LOCK: ACTIVE</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>`,
  prompt: 'Design a highly creative floating glassmorphic rotating 3D prism navigation component.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
component.html = component.html.replace('class="prism-btn active"', 'class="prism-btn active"');
