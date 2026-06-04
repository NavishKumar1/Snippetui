/**
 * Component: Luxury Silk Scroll Transition
 * Category: page-transitions
 */

export const component = {
  id: 'luxury-silk-scroll-transition',
  name: 'Luxury Silk Scroll',
  category: 'page-transitions',
  tag: 'Creative',
  html: `<div class="silk-trans-wrapper">
  <!-- Viewport Frame -->
  <div class="silk-viewport">
    <!-- Sweeping Silk Sheet -->
    <div class="silk-curtain">
      <div class="silk-gold-fringe"></div>
    </div>
    
    <!-- Page Alpha -->
    <div class="silk-page page-alpha active">
      <span class="silk-seal">⚜️</span>
      <h4>PAGE ALPHA</h4>
      <p>Sovereign archives sealed. Transition unengaged.</p>
    </div>
    
    <!-- Page Beta -->
    <div class="silk-page page-beta">
      <span class="silk-seal">👑</span>
      <h4>PAGE BETA</h4>
      <p>Gateways opened. Royal parameters initialized.</p>
    </div>
  </div>
  
  <!-- Trigger Button -->
  <button class="btn-trigger-silk">ENGAGE SILK SCROLL</button>
</div>`,
  js: `// Heavy silk curtain slide transition trigger and delay timers
const skWrapper = document.querySelector('.silk-trans-wrapper');
if (skWrapper) {
  const trigger = skWrapper.querySelector('.btn-trigger-silk');
  const pageA = skWrapper.querySelector('.page-alpha');
  const pageB = skWrapper.querySelector('.page-beta');
  const curtain = skWrapper.querySelector('.silk-curtain');
  
  let isTransitioning = false;
  
  trigger.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Slide heavy silk curtain down across view
    curtain.classList.add('active');
    
    // Swap content behind solid silk cover (550ms)
    setTimeout(() => {
      pageA.classList.remove('active');
      pageB.classList.add('active');
    }, 550);
    
    // Retract curtain down out of view
    setTimeout(() => {
      curtain.classList.remove('active');
      
      // Delay reset for demo
      setTimeout(() => {
        pageB.classList.remove('active');
        pageA.classList.add('active');
        isTransitioning = false;
      }, 2000);
    }, 1100);
  });
}`,
  ts: `// TypeScript Implementation
const skWrapper = document.querySelector<HTMLDivElement>('.silk-trans-wrapper');
if (skWrapper) {
  const trigger = skWrapper.querySelector<HTMLButtonElement>('.btn-trigger-silk');
  const pageA = skWrapper.querySelector<HTMLDivElement>('.page-alpha');
  const pageB = skWrapper.querySelector<HTMLDivElement>('.page-beta');
  const curtain = skWrapper.querySelector<HTMLDivElement>('.silk-curtain');
  
  let isTransitioning = false;
  
  if (trigger && pageA && pageB && curtain) {
    trigger.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      curtain.classList.add('active');
      
      setTimeout(() => {
        pageA.classList.remove('active');
        pageB.classList.add('active');
      }, 550);
      
      setTimeout(() => {
        curtain.classList.remove('active');
        
        setTimeout(() => {
          pageB.classList.remove('active');
          pageA.classList.add('active');
          isTransitioning = false;
        }, 2000);
      }, 1100);
    });
  }
}`,
  css: `/* Luxury Silk Scroll Transition Styles */
.silk-trans-wrapper {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: visible;
  box-sizing: border-box;
}

.silk-viewport {
  width: 280px;
  height: 180px;
  background: #090705;
  border: 1.5px solid #d4af37;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
}

/* Velvet pages */
.silk-page {
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

.silk-page.active {
  opacity: 1;
  z-index: 2;
}

.page-alpha {
  background: radial-gradient(circle at center, #1a140f 0%, #0d0a07 100%);
}

.page-beta {
  background: radial-gradient(circle at center, #0f0b1a 0%, #07050d 100%);
}

.silk-seal {
  font-size: 16px;
  text-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
  margin-bottom: 8px;
}

.silk-page h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #d4af37;
  margin: 0 0 8px 0;
  letter-spacing: 0.1em;
  text-shadow: 0 0 4px rgba(212, 175, 55, 0.4);
}

.silk-page p {
  font-size: 11px;
  color: #f3e5ab;
  line-height: 1.5;
  margin: 0;
}

.page-beta h4 {
  color: #ffd700;
  text-shadow: 0 0 6px #ffd700;
}

/* Sweeping silk curtain overlay */
.silk-curtain {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #120e0a 0%, #050403 100%);
  z-index: 10;
  pointer-events: none;
  transition: transform 0.55s cubic-bezier(0.77, 0, 0.175, 1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.8);
}

.silk-gold-fringe {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #d4af37, #ffd700, #d4af37);
  box-shadow: 0 0 8px #ffd700;
}

.silk-curtain.active {
  transform: translateY(100%);
}

/* Trigger Button */
.btn-trigger-silk {
  background: radial-gradient(circle at center, #1b1612 0%, #0d0a08 100%);
  border: 1.5px solid #d4af37;
  color: #d4af37;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.15);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-trigger-silk:hover {
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
  transform: translateY(-2px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] flex flex-col items-center gap-5">
  <div class="w-[280px] h-[180px] bg-[#090705] border border-amber-500 rounded-lg flex items-center justify-center relative shadow-2xl overflow-hidden">
    <div class="text-center p-5 z-10 flex flex-col gap-2">
      <h4 class="text-sm font-bold text-amber-500 tracking-widest">PAGE ALPHA</h4>
      <p class="text-[11px] text-amber-200">Sovereign archives sealed. Transition unengaged.</p>
    </div>
  </div>
  <button class="bg-[#0d0a08] border border-amber-500 text-amber-500 px-6 py-3 rounded font-bold text-xs tracking-wider">ENGAGE SILK SCROLL</button>
</div>`,
  prompt: `Design a premium "Luxury Silk Scroll Transition" utility. Triggering sweeps a heavy black silk fabric drape styled with gold-foil shimmers across the screen, covering Page Alpha and rolling open Page Beta.`
};
