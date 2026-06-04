/**
 * Component: Cyber Scrambler Page Transition
 * Category: page-transitions
 */

export const component = {
  id: 'cyber-scrambler-transition',
  name: 'Cyber Scrambler Transition',
  category: 'page-transitions',
  tag: 'Stunning',
  html: `<div class="cyber-trans-wrapper">
  <!-- Viewport Frame -->
  <div class="cyber-trans-viewport">
    <div class="cyber-trans-scanlines"></div>
    
    <!-- Three sliding column gates -->
    <div class="cyber-col col-1">
      <div class="col-inner">
        <span class="scrambler-text">BOOT_SYSTEM</span>
      </div>
    </div>
    <div class="cyber-col col-2">
      <div class="col-inner">
        <span class="scrambler-text">DECRYPTING</span>
      </div>
    </div>
    <div class="cyber-col col-3">
      <div class="col-inner">
        <span class="scrambler-text">SUCCESS_R</span>
      </div>
    </div>
    
    <!-- Page Alpha -->
    <div class="cyber-page page-alpha active">
      <h4>PAGE ALPHA</h4>
      <p>> Security clearance optimal. Ready.</p>
    </div>
    
    <!-- Page Beta -->
    <div class="cyber-page page-beta">
      <h4>PAGE BETA</h4>
      <p>> Core stack decrypted. Access granted.</p>
    </div>
  </div>
  
  <!-- Trigger Button -->
  <button class="btn-trigger-cyber">ENGAGE SCRAMBLER</button>
</div>`,
  js: `// Digital scrambler column sliding transitions on click
const cyWrapper = document.querySelector('.cyber-trans-wrapper');
if (cyWrapper) {
  const trigger = cyWrapper.querySelector('.btn-trigger-cyber');
  const pageA = cyWrapper.querySelector('.page-alpha');
  const pageB = cyWrapper.querySelector('.page-beta');
  const cols = cyWrapper.querySelectorAll('.cyber-col');
  const scramblers = cyWrapper.querySelectorAll('.scrambler-text');
  
  let isTransitioning = false;
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$';
  
  trigger.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Slide columns into view and trigger text scrambles
    cols.forEach((col, idx) => {
      col.classList.add('active');
      
      const txtSpan = scramblers[idx];
      const origText = txtSpan.textContent;
      
      let count = 0;
      const interval = setInterval(() => {
        txtSpan.textContent = origText
          .split('')
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join('');
        count++;
        if (count >= 15) {
          clearInterval(interval);
          txtSpan.textContent = origText;
        }
      }, 40);
    });
    
    // Halfway through (400ms), swap page displays
    setTimeout(() => {
      pageA.classList.remove('active');
      pageB.classList.add('active');
    }, 450);
    
    // Slide columns out of view
    setTimeout(() => {
      cols.forEach(col => {
        col.classList.remove('active');
      });
      
      // Delay reset for demo
      setTimeout(() => {
        pageB.classList.remove('active');
        pageA.classList.add('active');
        isTransitioning = false;
      }, 2000);
    }, 950);
  });
}`,
  ts: `// TypeScript Implementation
const cyWrapper = document.querySelector<HTMLDivElement>('.cyber-trans-wrapper');
if (cyWrapper) {
  const trigger = cyWrapper.querySelector<HTMLButtonElement>('.btn-trigger-cyber');
  const pageA = cyWrapper.querySelector<HTMLDivElement>('.page-alpha');
  const pageB = cyWrapper.querySelector<HTMLDivElement>('.page-beta');
  const cols = cyWrapper.querySelectorAll<HTMLDivElement>('.cyber-col');
  const scramblers = cyWrapper.querySelectorAll<HTMLSpanElement>('.scrambler-text');
  
  let isTransitioning = false;
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$';
  
  if (trigger && pageA && pageB) {
    trigger.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      cols.forEach((col, idx) => {
        col.classList.add('active');
        
        const txtSpan = scramblers[idx];
        if (!txtSpan) return;
        const origText = txtSpan.textContent || '';
        
        let count = 0;
        const interval = setInterval(() => {
          txtSpan.textContent = origText
            .split('')
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join('');
          count++;
          if (count >= 15) {
            clearInterval(interval);
            txtSpan.textContent = origText;
          }
        }, 40);
      });
      
      setTimeout(() => {
        pageA.classList.remove('active');
        pageB.classList.add('active');
      }, 450);
      
      setTimeout(() => {
        cols.forEach(col => {
          col.classList.remove('active');
        });
        
        setTimeout(() => {
          pageB.classList.remove('active');
          pageA.classList.add('active');
          isTransitioning = false;
        }, 2000);
      }, 950);
    });
  }
}`,
  css: `/* Cyber Scrambler Page Transition Styles */
.cyber-trans-wrapper {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: visible;
  box-sizing: border-box;
}

.cyber-trans-viewport {
  width: 280px;
  height: 180px;
  background: #020603;
  border: 1.5px solid rgba(0, 255, 70, 0.25);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
}

.cyber-trans-scanlines {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.35) 50%);
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 10;
}

/* Symmetrical pages */
.cyber-page {
  position: absolute;
  inset: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  opacity: 0;
  z-index: 1;
}

.cyber-page.active {
  opacity: 1;
  z-index: 2;
}

.page-alpha {
  background: radial-gradient(circle at center, #020904 0%, #010301 100%);
}

.page-beta {
  background: radial-gradient(circle at center, #0b020a 0%, #040104 100%);
}

.cyber-page h4 {
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  font-weight: 900;
  color: #00ff46;
  margin: 0 0 8px 0;
  letter-spacing: 0.1em;
  text-shadow: 0 0 4px rgba(0, 255, 70, 0.6);
}

.cyber-page p {
  font-family: 'Courier New', Courier, monospace;
  font-size: 11px;
  color: rgba(0, 255, 70, 0.7);
  line-height: 1.5;
  margin: 0;
}

.page-beta h4 {
  color: #ff0055;
  text-shadow: 0 0 4px rgba(255, 0, 85, 0.6);
}

.page-beta p {
  color: rgba(255, 0, 85, 0.75);
}

/* 3 sliding column gates */
.cyber-col {
  position: absolute;
  top: -100%;
  width: 33.33%;
  height: 100%;
  background: #020204;
  border-left: 1px solid rgba(0, 255, 70, 0.35);
  border-right: 1px solid rgba(0, 255, 70, 0.35);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}

.col-1 { left: 0%; transform: translateY(-20%); }
.col-2 { left: 33.33%; transform: translateY(120%); top: 100%; }
.col-3 { left: 66.66%; transform: translateY(-20%); }

.cyber-col.active {
  transform: translateY(100%);
}

.col-2.active {
  transform: translateY(-100%);
}

.col-inner {
  font-family: 'Courier New', Courier, monospace;
  font-size: 8px;
  font-weight: bold;
  color: #00ff46;
  text-shadow: 0 0 4px #00ff46;
  white-space: nowrap;
  transform: rotate(-90deg);
}

/* Trigger Button */
.btn-trigger-cyber {
  background: transparent;
  border: 1.5px solid #00ff46;
  color: #00ff46;
  font-family: 'Courier New', Courier, monospace;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 255, 70, 0.15);
  text-shadow: 0 0 4px rgba(0, 255, 70, 0.5);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-trigger-cyber:hover {
  background: #00ff46;
  color: #020603;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 70, 0.4), 0 0 10px rgba(0, 255, 70, 0.3);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] flex flex-col items-center gap-5">
  <div class="w-[280px] h-[180px] bg-[#020603] border border-green-500/25 rounded relative shadow-2xl overflow-hidden">
    <div class="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[size:100%_4px] pointer-events-none z-10"></div>
    <div class="text-center p-5 z-10 flex flex-col gap-2">
      <h4 class="text-sm font-bold text-green-400 tracking-widest font-mono">PAGE ALPHA</h4>
      <p class="text-[11px] text-green-500 font-mono">> Security clearance optimal. Ready.</p>
    </div>
  </div>
  <button class="border border-green-500 text-green-500 px-6 py-3 rounded font-bold text-xs tracking-wider font-mono">ENGAGE SCRAMBLER</button>
</div>`,
  prompt: `Design a premium "Cyber Scrambler Page Transition" utility. Triggering splits the screen into three vertical columns sliding up and down in opposite directions with rapid digital scrambled character overlays.`
};
