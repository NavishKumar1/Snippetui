/**
 * Component: Origami Geometric Flip Transition
 * Category: page-transitions
 */

export const component = {
  id: 'origami-geometric-transition',
  name: 'Origami Geometric Flip',
  category: 'page-transitions',
  tag: 'Creative',
  html: `<div class="origami-trans-wrapper">
  <!-- Viewport Frame -->
  <div class="origami-trans-viewport">
    <!-- Origami folding overlays -->
    <div class="origami-trans-overlay fold-left"></div>
    <div class="origami-trans-overlay fold-right"></div>
    
    <!-- Page Alpha -->
    <div class="origami-page page-alpha active">
      <h4>PAGE ALPHA</h4>
      <p>Polygonal structures flat. Transition unengaged.</p>
    </div>
    
    <!-- Page Beta -->
    <div class="origami-page page-beta">
      <h4>PAGE BETA</h4>
      <p>Folding sequence completed. Page Beta converged.</p>
    </div>
  </div>
  
  <!-- Trigger Button -->
  <button class="btn-trigger-origami">ENGAGE ORIGAMI FLIP</button>
</div>`,
  js: `// Origami paper-folding vertical flip overlay animations on click
const ogWrapper = document.querySelector('.origami-trans-wrapper');
if (ogWrapper) {
  const trigger = ogWrapper.querySelector('.btn-trigger-origami');
  const pageA = ogWrapper.querySelector('.page-alpha');
  const pageB = ogWrapper.querySelector('.page-beta');
  const foldL = ogWrapper.querySelector('.fold-left');
  const foldR = ogWrapper.querySelector('.fold-right');
  
  let isTransitioning = false;
  
  trigger.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Fold left and right flaps open/closed in 3D perspective
    foldL.classList.add('active');
    foldR.classList.add('active');
    
    pageA.style.transform = 'scale(0.8) rotateY(-45deg)';
    pageA.style.opacity = '0';
    
    // Swap content mid-fold (500ms)
    setTimeout(() => {
      pageA.classList.remove('active');
      pageB.classList.add('active');
      pageB.style.transform = 'scale(0.8) rotateY(45deg)';
      pageB.style.opacity = '0';
      
      setTimeout(() => {
        pageB.style.transform = 'scale(1) rotateY(0deg)';
        pageB.style.opacity = '1';
      }, 50);
    }, 500);
    
    // Open flaps back
    setTimeout(() => {
      foldL.classList.remove('active');
      foldR.classList.remove('active');
      
      // Delay reset for demo
      setTimeout(() => {
        pageB.classList.remove('active');
        pageA.classList.add('active');
        pageA.style.transform = 'scale(1) rotateY(0deg)';
        pageA.style.opacity = '1';
        isTransitioning = false;
      }, 2000);
    }, 1000);
  });
}`,
  ts: `// TypeScript Implementation
const ogWrapper = document.querySelector<HTMLDivElement>('.origami-trans-wrapper');
if (ogWrapper) {
  const trigger = ogWrapper.querySelector<HTMLButtonElement>('.btn-trigger-origami');
  const pageA = ogWrapper.querySelector<HTMLDivElement>('.page-alpha');
  const pageB = ogWrapper.querySelector<HTMLDivElement>('.page-beta');
  const foldL = ogWrapper.querySelector<HTMLDivElement>('.fold-left');
  const foldR = ogWrapper.querySelector<HTMLDivElement>('.fold-right');
  
  let isTransitioning = false;
  
  if (trigger && pageA && pageB && foldL && foldR) {
    trigger.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      foldL.classList.add('active');
      foldR.classList.add('active');
      
      pageA.style.transform = 'scale(0.8) rotateY(-45deg)';
      pageA.style.opacity = '0';
      
      setTimeout(() => {
        pageA.classList.remove('active');
        pageB.classList.add('active');
        pageB.style.transform = 'scale(0.8) rotateY(45deg)';
        pageB.style.opacity = '0';
        
        setTimeout(() => {
          pageB.style.transform = 'scale(1) rotateY(0deg)';
          pageB.style.opacity = '1';
        }, 50);
      }, 500);
      
      setTimeout(() => {
        foldL.classList.remove('active');
        foldR.classList.remove('active');
        
        setTimeout(() => {
          pageB.classList.remove('active');
          pageA.classList.add('active');
          pageA.style.transform = 'scale(1) rotateY(0deg)';
          pageA.style.opacity = '1';
          isTransitioning = false;
        }, 2000);
      }, 1000);
    });
  }
}`,
  css: `/* Origami Geometric Flip Transition Styles */
.origami-trans-wrapper {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: visible;
  box-sizing: border-box;
}

.origami-trans-viewport {
  width: 280px;
  height: 180px;
  background: #0d0f12;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Symmetrical pages */
.origami-page {
  position: absolute;
  inset: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.origami-page.active {
  opacity: 1;
  z-index: 2;
}

.page-alpha {
  background: radial-gradient(circle at center, #15181d 0%, #080a0d 100%);
  transform: scale(1) rotateY(0deg);
}

.page-beta {
  background: radial-gradient(circle at center, #1e1315 0%, #0a0607 100%);
  transform: scale(0.8) rotateY(45deg);
}

.origami-page h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: 0.1em;
}

.origami-page p {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  margin: 0;
}

.page-alpha h4 { text-shadow: 0 0 6px rgba(255,255,255,0.25); }
.page-beta h4 { text-shadow: 0 0 6px rgba(255, 0, 85, 0.35); color: #ff0055; }

/* 3D paper flaps folding in */
.origami-trans-overlay {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: #11151a;
  z-index: 10;
  box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
  pointer-events: none;
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}

.fold-left {
  left: 0;
  transform-origin: left center;
  transform: rotateY(-90deg);
  border-right: 1.5px solid rgba(255, 255, 255, 0.15);
}

.fold-right {
  right: 0;
  transform-origin: right center;
  transform: rotateY(90deg);
  border-left: 1.5px solid rgba(255, 255, 255, 0.15);
}

.fold-left.active {
  transform: rotateY(0deg);
}

.fold-right.active {
  transform: rotateY(0deg);
}

/* Trigger Button */
.btn-trigger-origami {
  background: transparent;
  border: 1.5px solid #ffffff;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-trigger-origami:hover {
  background: #ffffff;
  color: #0d0f12;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.25);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] flex flex-col items-center gap-5">
  <div class="w-[280px] h-[180px] bg-[#0d0f12] border border-white/5 rounded-xl flex items-center justify-center relative shadow-2xl overflow-hidden" style="perspective: 1000px;">
    <div class="text-center p-5 z-10 flex flex-col gap-2">
      <h4 class="text-sm font-bold text-white tracking-widest">PAGE ALPHA</h4>
      <p class="text-[11px] text-gray-400">Polygonal structures flat. Transition unengaged.</p>
    </div>
  </div>
  <button class="border border-white text-white px-6 py-3 rounded font-bold text-xs tracking-wider">ENGAGE ORIGAMI FLIP</button>
</div>`,
  prompt: `Design a premium "Origami Geometric Flip Transition" utility. Folding triggered panels close left and right origami gates symmetrically in 3D perspective before materializing Page Beta.`
};
