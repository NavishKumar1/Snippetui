/**
 * Component: Bipolar Split Gate Transition
 * Category: page-transitions
 */

export const component = {
  id: 'bipolar-split-transition',
  name: 'Bipolar Split Gate',
  category: 'page-transitions',
  tag: 'Stunning',
  html: `<div class="bp-trans-wrapper">
  <!-- Viewport Frame -->
  <div class="bp-viewport">
    <!-- Polarized Sliding Gates -->
    <div class="bp-gate gate-neg"></div>
    <div class="bp-gate gate-pos"></div>
    
    <!-- Page Alpha -->
    <div class="bp-page page-alpha active">
      <h4>PAGE ALPHA</h4>
      <p>Polarity matrices aligned. Ready for gate close.</p>
    </div>
    
    <!-- Page Beta -->
    <div class="bp-page page-beta">
      <h4>PAGE BETA</h4>
      <p>Decryption sequence complete. Polarity stable.</p>
    </div>
  </div>
  
  <!-- Trigger Button -->
  <button class="btn-trigger-bp">ENGAGE BIPOLAR SPLIT</button>
</div>`,
  js: `// Symmetrical split-polarity gate transitions on click
const bpTrans = document.querySelector('.bp-trans-wrapper');
if (bpTrans) {
  const trigger = bpTrans.querySelector('.btn-trigger-bp');
  const pageA = bpTrans.querySelector('.page-alpha');
  const pageB = bpTrans.querySelector('.page-beta');
  const gateNeg = bpTrans.querySelector('.gate-neg');
  const gatePos = bpTrans.querySelector('.gate-pos');
  
  let isTransitioning = false;
  
  trigger.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Symmetrically close cyan and pink gates
    gateNeg.classList.add('active');
    gatePos.classList.add('active');
    
    // Swap content mid-collision (500ms)
    setTimeout(() => {
      pageA.classList.remove('active');
      pageB.classList.add('active');
    }, 500);
    
    // Split gates open back
    setTimeout(() => {
      gateNeg.classList.remove('active');
      gatePos.classList.remove('active');
      
      // Delay reset for demo
      setTimeout(() => {
        pageB.classList.remove('active');
        pageA.classList.add('active');
        isTransitioning = false;
      }, 2000);
    }, 1050);
  });
}`,
  ts: `// TypeScript Implementation
const bpTrans = document.querySelector<HTMLDivElement>('.bp-trans-wrapper');
if (bpTrans) {
  const trigger = bpTrans.querySelector<HTMLButtonElement>('.btn-trigger-bp');
  const pageA = bpTrans.querySelector<HTMLDivElement>('.page-alpha');
  const pageB = bpTrans.querySelector<HTMLDivElement>('.page-beta');
  const gateNeg = bpTrans.querySelector<HTMLDivElement>('.gate-neg');
  const gatePos = bpTrans.querySelector<HTMLDivElement>('.gate-pos');
  
  let isTransitioning = false;
  
  if (trigger && pageA && pageB && gateNeg && gatePos) {
    trigger.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      gateNeg.classList.add('active');
      gatePos.classList.add('active');
      
      setTimeout(() => {
        pageA.classList.remove('active');
        pageB.classList.add('active');
      }, 500);
      
      setTimeout(() => {
        gateNeg.classList.remove('active');
        gatePos.classList.remove('active');
        
        setTimeout(() => {
          pageB.classList.remove('active');
          pageA.classList.add('active');
          isTransitioning = false;
        }, 2000);
      }, 1050);
    });
  }
}`,
  css: `/* Bipolar Split Gate Transition Styles */
.bp-trans-wrapper {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: visible;
  box-sizing: border-box;
}

.bp-viewport {
  width: 280px;
  height: 180px;
  background: #030306;
  border: 1.5px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
}

/* Symmetrical pages */
.bp-page {
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

.bp-page.active {
  opacity: 1;
  z-index: 2;
}

.page-alpha {
  background: radial-gradient(circle at center, #07171e 0%, #030a0d 100%);
}

.page-beta {
  background: radial-gradient(circle at center, #1b0a1a 0%, #0b040b 100%);
}

.bp-page h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: 0.1em;
}

.bp-page p {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  margin: 0;
}

.page-alpha h4 { text-shadow: 0 0 6px rgba(0, 242, 254, 0.4); color: #00f2fe; }
.page-beta h4 { text-shadow: 0 0 6px rgba(255, 0, 127, 0.4); color: #ff0055; }

/* Polarized sliding gate overlays */
.bp-gate {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
  box-shadow: inset 0 0 25px rgba(0,0,0,0.8);
}

.gate-neg {
  left: 0;
  background: #00f2fe;
  border-right: 2px solid #ffffff;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.5);
  transform: translateX(-100%);
}

.gate-pos {
  right: 0;
  background: #ff0055;
  border-left: 2px solid #ffffff;
  box-shadow: 0 0 15px rgba(255, 0, 85, 0.5);
  transform: translateX(100%);
}

.gate-neg.active {
  transform: translateX(0%);
}

.gate-pos.active {
  transform: translateX(0%);
}

/* Trigger Button */
.btn-trigger-bp {
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-trigger-bp:hover {
  background: #ffffff;
  color: #030306;
  border-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.25);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] flex flex-col items-center gap-5">
  <div class="w-[280px] h-[180px] bg-[#030306] border border-white/5 rounded-xl flex items-center justify-center relative shadow-2xl overflow-hidden">
    <div class="text-center p-5 z-10 flex flex-col gap-2">
      <h4 class="text-sm font-bold text-cyan-400 tracking-widest">PAGE ALPHA</h4>
      <p class="text-[11px] text-gray-400">Polarity matrices aligned. Ready for gate close.</p>
    </div>
  </div>
  <button class="border border-white/10 text-white px-6 py-3 rounded font-bold text-xs tracking-wider">ENGAGE BIPOLAR SPLIT</button>
</div>`,
  prompt: `Design a premium "Bipolar Split Gate Transition" utility. Polarized triggers symmetrically close left negative cyan and right positive magenta gates, merging in center before splits open to reveal Page Beta.`
};
