/**
 * Component: Scroll Stack Transition
 * Category: page-transitions
 */

export const component = {
  id: 'scroll-stack-transition',
  name: 'Scroll Stack Transition',
  category: 'page-transitions',
  tag: 'Stunning',
  html: `<div class="stack-transition-wrapper">
  <!-- Viewport Frame container -->
  <div class="stack-viewport">
    <!-- Page Alpha (Front Card) -->
    <div class="stack-page page-alpha active">
      <div class="page-card-accent alpha-accent"></div>
      <h4>PAGE ALPHA</h4>
      <p>Telemetry nodes synchronized. Transition unengaged.</p>
    </div>
    
    <!-- Page Beta (Stacked Card Behind/Above) -->
    <div class="stack-page page-beta">
      <div class="page-card-accent beta-accent"></div>
      <h4>PAGE BETA</h4>
      <p>Superheat core active. Convergence completed.</p>
    </div>
  </div>
  
  <!-- Trigger Button -->
  <button class="btn-trigger-stack">ENGAGE SCROLL STACK</button>
</div>`,
  js: `// Spring-driven 3D card scroll stack layering transition
const sWrapper = document.querySelector('.stack-transition-wrapper');
if (sWrapper) {
  const trigger = sWrapper.querySelector('.btn-trigger-stack');
  const pageA = sWrapper.querySelector('.page-alpha');
  const pageB = sWrapper.querySelector('.page-beta');
  
  let isTransitioning = false;
  
  trigger.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Page Alpha moves back in 3D space and slides down out
    pageA.style.transform = 'translateZ(-150px) translateY(120%) rotateX(-15deg)';
    pageA.style.opacity = '0';
    
    // Page Beta cascades down from top with spring bounce
    pageB.style.transform = 'translateZ(0px) translateY(0%) rotateX(0deg)';
    pageB.style.opacity = '1';
    pageB.classList.add('active');
    
    setTimeout(() => {
      // Reset transition smoothly after 2.5s for demonstration
      setTimeout(() => {
        pageA.style.transition = 'none';
        pageB.style.transition = 'none';
        
        pageA.style.transform = 'translateZ(0px) translateY(0%) rotateX(0deg)';
        pageA.style.opacity = '1';
        pageA.classList.add('active');
        
        pageB.style.transform = 'translateZ(100px) translateY(-120%) rotateX(15deg)';
        pageB.style.opacity = '0';
        pageB.classList.remove('active');
        
        setTimeout(() => {
          pageA.style.transition = 'all 0.85s cubic-bezier(0.25, 1, 0.2, 1.1)';
          pageB.style.transition = 'all 0.85s cubic-bezier(0.25, 1, 0.2, 1.1)';
          isTransitioning = false;
        }, 50);
      }, 2000);
    }, 850);
  });
}`,
  ts: `// TypeScript Implementation
const sWrapper = document.querySelector<HTMLDivElement>('.stack-transition-wrapper');
if (sWrapper) {
  const trigger = sWrapper.querySelector<HTMLButtonElement>('.btn-trigger-stack');
  const pageA = sWrapper.querySelector<HTMLDivElement>('.page-alpha');
  const pageB = sWrapper.querySelector<HTMLDivElement>('.page-beta');
  
  let isTransitioning = false;
  
  if (trigger && pageA && pageB) {
    trigger.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      pageA.style.transform = 'translateZ(-150px) translateY(120%) rotateX(-15deg)';
      pageA.style.opacity = '0';
      
      pageB.style.transform = 'translateZ(0px) translateY(0%) rotateX(0deg)';
      pageB.style.opacity = '1';
      pageB.classList.add('active');
      
      setTimeout(() => {
        setTimeout(() => {
          pageA.style.transition = 'none';
          pageB.style.transition = 'none';
          
          pageA.style.transform = 'translateZ(0px) translateY(0%) rotateX(0deg)';
          pageA.style.opacity = '1';
          pageA.classList.add('active');
          
          pageB.style.transform = 'translateZ(100px) translateY(-120%) rotateX(15deg)';
          pageB.style.opacity = '0';
          pageB.classList.remove('active');
          
          setTimeout(() => {
            pageA.style.transition = 'all 0.85s cubic-bezier(0.25, 1, 0.2, 1.1)';
            pageB.style.transition = 'all 0.85s cubic-bezier(0.25, 1, 0.2, 1.1)';
            isTransitioning = false;
          }, 50);
        }, 2000);
      }, 850);
    });
  }
}`,
  css: `/* Scroll Stack Page Transition Styles */
.stack-transition-wrapper {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: visible;
  box-sizing: border-box;
}

.stack-viewport {
  width: 280px;
  height: 180px;
  background: #040508;
  border: 1.5px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  perspective: 800px;
  transform-style: preserve-3d;
}

/* Individual page deck cards */
.stack-page {
  position: absolute;
  inset: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  backface-visibility: hidden;
  transition: all 0.85s cubic-bezier(0.25, 1, 0.2, 1.1);
  transform-style: preserve-3d;
}

.page-alpha {
  background: radial-gradient(circle at center, #0c0f16 0%, #050609 100%);
  transform: translateZ(0px) translateY(0%) rotateX(0deg);
  opacity: 1;
  z-index: 2;
}

.page-beta {
  background: radial-gradient(circle at center, #1b0a1a 0%, #0b040b 100%);
  transform: translateZ(100px) translateY(-120%) rotateX(15deg);
  opacity: 0;
  z-index: 3;
}

.page-card-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
}

.alpha-accent {
  background: linear-gradient(90deg, #00f2fe, #8a2be2);
}

.beta-accent {
  background: linear-gradient(90deg, #ff007f, #ffd700);
}

.stack-page h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: 0.1em;
}

.stack-page p {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  margin: 0;
}

.page-alpha h4 { text-shadow: 0 0 8px rgba(0, 242, 254, 0.35); }
.page-beta h4 { text-shadow: 0 0 8px rgba(255, 0, 127, 0.35); }

/* Trigger Button */
.btn-trigger-stack {
  background: #ffffff;
  border: 1.5px solid #ffffff;
  color: #000000;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 12px 24px;
  border-radius: 100px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.15);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-trigger-stack:hover {
  background: transparent;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.25);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] flex flex-col items-center gap-5">
  <div class="w-[280px] h-[180px] bg-black border border-white/5 rounded-xl flex items-center justify-center relative shadow-2xl overflow-hidden" style="perspective: 800px;">
    <div class="text-center p-5 z-10 flex flex-col gap-2">
      <h4 class="text-sm font-bold text-white tracking-widest">PAGE ALPHA</h4>
      <p class="text-[11px] text-gray-400">Telemetry nodes synchronized. Transition unengaged.</p>
    </div>
  </div>
  <button class="bg-white border border-white px-6 py-3 rounded-full text-black font-bold text-xs tracking-wider">ENGAGE SCROLL STACK</button>
</div>`,
  prompt: `Design a premium "Scroll Stack Transition" utility. Opening collapses the current Page Alpha backwards in 3D space and slides it out, while Page Beta slides in from the top with high-inertia card deck physics.`
};
