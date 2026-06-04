/**
 * Component: Liquid Wave Sweep Transition
 * Category: page-transitions
 */

export const component = {
  id: 'liquid-wave-sweep-transition',
  name: 'Liquid Wave Sweep',
  category: 'page-transitions',
  tag: 'Stunning',
  html: `<div class="wave-transition-wrapper">
  <!-- Viewport Frame -->
  <div class="wave-viewport">
    <!-- Fluid sweeping wall -->
    <div class="wave-sweep-bar"></div>
    
    <!-- Page Alpha -->
    <div class="wave-page page-alpha active">
      <div class="wave-accent-dot alpha-dot"></div>
      <h4>PAGE ALPHA</h4>
      <p>Fluid systems at rest. Transition unengaged.</p>
    </div>
    
    <!-- Page Beta -->
    <div class="wave-page page-beta">
      <div class="wave-accent-dot beta-dot"></div>
      <h4>PAGE BETA</h4>
      <p>Telemetry washed. Page Beta initialized.</p>
    </div>
  </div>
  
  <!-- Trigger Button -->
  <button class="btn-trigger-wave">ENGAGE WAVE SWEEP</button>
</div>`,
  js: `// Fluid neon wave sweep transition trigger and state toggles
const wWrapper = document.querySelector('.wave-transition-wrapper');
if (wWrapper) {
  const trigger = wWrapper.querySelector('.btn-trigger-wave');
  const pageA = wWrapper.querySelector('.page-alpha');
  const pageB = wWrapper.querySelector('.page-beta');
  const sweepBar = wWrapper.querySelector('.wave-sweep-bar');
  
  let isTransitioning = false;
  
  trigger.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Animate fluid wave sweep bar across the screen
    sweepBar.classList.add('sweeping');
    
    // Halfway through the sweep (450ms), swap page states
    setTimeout(() => {
      pageA.classList.remove('active');
      pageB.classList.add('active');
    }, 450);
    
    // Reset after full sweep completed
    setTimeout(() => {
      sweepBar.classList.remove('sweeping');
      
      // Delay reset for demo
      setTimeout(() => {
        pageB.classList.remove('active');
        pageA.classList.add('active');
        isTransitioning = false;
      }, 2000);
    }, 1000);
  });
}`,
  ts: `// TypeScript Implementation
const wWrapper = document.querySelector<HTMLDivElement>('.wave-transition-wrapper');
if (wWrapper) {
  const trigger = wWrapper.querySelector<HTMLButtonElement>('.btn-trigger-wave');
  const pageA = wWrapper.querySelector<HTMLDivElement>('.page-alpha');
  const pageB = wWrapper.querySelector<HTMLDivElement>('.page-beta');
  const sweepBar = wWrapper.querySelector<HTMLDivElement>('.wave-sweep-bar');
  
  let isTransitioning = false;
  
  if (trigger && pageA && pageB && sweepBar) {
    trigger.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      sweepBar.classList.add('sweeping');
      
      setTimeout(() => {
        pageA.classList.remove('active');
        pageB.classList.add('active');
      }, 450);
      
      setTimeout(() => {
        sweepBar.classList.remove('sweeping');
        
        setTimeout(() => {
          pageB.classList.remove('active');
          pageA.classList.add('active');
          isTransitioning = false;
        }, 2000);
      }, 1000);
    });
  }
}`,
  css: `/* Liquid Wave Sweep Transition Styles */
.wave-transition-wrapper {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: visible;
  box-sizing: border-box;
}

.wave-viewport {
  width: 280px;
  height: 180px;
  background: #020608;
  border: 1.5px solid rgba(0, 242, 254, 0.15);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
}

/* Symmetrical pages */
.wave-page {
  position: absolute;
  inset: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.wave-page.active {
  opacity: 1;
  z-index: 2;
}

.page-alpha {
  background: radial-gradient(circle at center, #020b0f 0%, #010406 100%);
}

.page-beta {
  background: radial-gradient(circle at center, #0f020b 0%, #060105 100%);
}

.wave-accent-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-bottom: 12px;
}

.alpha-dot { background: #00f2fe; box-shadow: 0 0 8px #00f2fe; }
.beta-dot { background: #ff0055; box-shadow: 0 0 8px #ff0055; }

.wave-page h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: 0.1em;
}

.wave-page p {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  margin: 0;
}

.page-alpha h4 { text-shadow: 0 0 6px rgba(0, 242, 254, 0.3); }
.page-beta h4 { text-shadow: 0 0 6px rgba(255, 0, 127, 0.3); }

/* Sweeping liquid wave overlay */
.wave-sweep-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -40px;
  width: 30px;
  background: linear-gradient(90deg, transparent, #00f2fe, #ffffff, #ff0055, transparent);
  box-shadow: 0 0 30px rgba(0, 242, 254, 0.8), 0 0 60px rgba(255, 0, 85, 0.8);
  filter: blur(8px);
  z-index: 5;
  pointer-events: none;
  opacity: 0;
  transform: skewX(-15deg);
}

.wave-sweep-bar.sweeping {
  opacity: 1;
  animation: liquid-sweep-motion 0.9s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

@keyframes liquid-sweep-motion {
  0% { left: -40px; }
  100% { left: calc(100% + 40px); }
}

/* Trigger Button */
.btn-trigger-wave {
  background: transparent;
  border: 1.5px solid #00f2fe;
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 12px 24px;
  border-radius: 100px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 242, 254, 0.15);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-trigger-wave:hover {
  background: #00f2fe;
  color: #020608;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 242, 254, 0.4), 0 0 10px rgba(0, 242, 254, 0.3);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] flex flex-col items-center gap-5">
  <div class="w-[280px] h-[180px] bg-[#020608] border border-cyan-400/25 rounded-xl flex items-center justify-center relative shadow-2xl overflow-hidden">
    <div class="text-center p-5 z-10 flex flex-col gap-2">
      <h4 class="text-sm font-bold text-white tracking-widest">PAGE ALPHA</h4>
      <p class="text-[11px] text-gray-400">Fluid systems at rest. Transition unengaged.</p>
    </div>
  </div>
  <button class="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-full font-bold text-xs tracking-wider">ENGAGE WAVE SWEEP</button>
</div>`,
  prompt: `Design a premium "Liquid Wave Sweep Transition" utility. Triggering the process animates a fluid neon-teal liquid wave gradient sweeping horizontally, washing away Page Alpha and fading in Page Beta.`
};
