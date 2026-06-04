/**
 * Component: DNA Helix Page Transition
 * Category: page-transitions
 */

export const component = {
  id: 'dna-helix-transition',
  name: 'DNA Helix Transition',
  category: 'page-transitions',
  tag: 'Stunning',
  html: `<div class="dna-trans-wrapper">
  <!-- Viewport Frame -->
  <div class="dna-trans-viewport">
    <div class="dna-trans-canvas-container">
      <canvas class="dna-trans-canvas"></canvas>
    </div>
    
    <!-- Page Alpha -->
    <div class="dna-page page-alpha active">
      <h4>PAGE ALPHA</h4>
      <p>Genetic sequencer calibrated. Ready for drop.</p>
    </div>
    
    <!-- Page Beta -->
    <div class="dna-page page-beta">
      <h4>PAGE BETA</h4>
      <p>Double-helix splits completed. Sequence converged.</p>
    </div>
  </div>
  
  <!-- Trigger Button -->
  <button class="btn-trigger-dna">ENGAGE GENESIS SPLIT</button>
</div>`,
  js: `// Twin-helix coiling and splitting canvas transition on click
const dnWrapper = document.querySelector('.dna-trans-wrapper');
if (dnWrapper) {
  const trigger = dnWrapper.querySelector('.btn-trigger-dna');
  const pageA = dnWrapper.querySelector('.page-alpha');
  const pageB = dnWrapper.querySelector('.page-beta');
  const canvas = dnWrapper.querySelector('.dna-trans-canvas');
  const ctx = canvas.getContext('2d');
  
  let isTransitioning = false;
  let isOpen = false;
  
  const resizeCanvas = () => {
    canvas.width = canvas.parentElement.clientWidth || 280;
    canvas.height = canvas.parentElement.clientHeight || 180;
  };
  resizeCanvas();
  
  trigger.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    
    resizeCanvas();
    isOpen = true;
    
    // Scale Page Alpha slightly
    pageA.style.transform = 'scale(0.95)';
    pageA.style.opacity = '0';
    
    // Swap content halfway (600ms)
    setTimeout(() => {
      pageA.classList.remove('active');
      pageB.classList.add('active');
      pageB.style.transform = 'scale(0.95)';
      pageB.style.opacity = '0';
      
      setTimeout(() => {
        pageB.style.transform = 'scale(1)';
        pageB.style.opacity = '1';
      }, 50);
    }, 600);
    
    // Fade out DNA sequence
    setTimeout(() => {
      isOpen = false;
      
      // Delay reset for demo
      setTimeout(() => {
        pageB.classList.remove('active');
        pageA.classList.add('active');
        pageA.style.transform = 'scale(1)';
        pageA.style.opacity = '1';
        isTransitioning = false;
      }, 2000);
    }, 1400);
  });

  // 3D DNA model maths
  let angle = 0;
  const nodes = 12;
  
  let animId;
  const draw = () => {
    if (!dnWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      angle += 0.045;
      const w = canvas.width;
      const h = canvas.height;
      
      // Splitting progress widening factor based on time
      const splitWidth = Math.min(60, (angle * 8));
      
      for (let i = 0; i < nodes; i++) {
        // Vertical axis placement
        const y = (i / (nodes - 1)) * (h - 20) + 10;
        
        const strand1Angle = angle + (i * 0.5);
        const strand2Angle = strand1Angle + Math.PI;
        
        // Horizontal projection + splitting gap widening outwards
        const x1 = w / 2 - splitWidth + Math.sin(strand1Angle) * 20;
        const x2 = w / 2 + splitWidth + Math.sin(strand2Angle) * 20;
        
        const z1 = Math.cos(strand1Angle);
        const z2 = Math.cos(strand2Angle);
        
        const size1 = 2 + (z1 + 1) * 1.5;
        const size2 = 2 + (z2 + 1) * 1.5;
        
        // Draw links between base pairs (hydrogen bonds breaking)
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Strand 1 (Teal)
        ctx.beginPath();
        ctx.arc(x1, y, size1, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 4;
        ctx.fill();
        
        // Strand 2 (Magenta)
        ctx.beginPath();
        ctx.arc(x2, y, size2, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0055';
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    } else {
      angle = 0; // reset
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const dnWrapper = document.querySelector<HTMLDivElement>('.dna-trans-wrapper');
if (dnWrapper) {
  const trigger = dnWrapper.querySelector<HTMLButtonElement>('.btn-trigger-dna');
  const pageA = dnWrapper.querySelector<HTMLDivElement>('.page-alpha');
  const pageB = dnWrapper.querySelector<HTMLDivElement>('.page-beta');
  const canvas = dnWrapper.querySelector<HTMLCanvasElement>('.dna-trans-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  
  let isTransitioning = false;
  let isOpen = false;
  
  const resizeCanvas = () => {
    if (canvas) {
      canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : 280;
      canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : 180;
    }
  };
  resizeCanvas();
  
  if (trigger && pageA && pageB) {
    trigger.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      resizeCanvas();
      isOpen = true;
      
      pageA.style.transform = 'scale(0.95)';
      pageA.style.opacity = '0';
      
      setTimeout(() => {
        pageA.classList.remove('active');
        pageB.classList.add('active');
        pageB.style.transform = 'scale(0.95)';
        pageB.style.opacity = '0';
        
        setTimeout(() => {
          pageB.style.transform = 'scale(1)';
          pageB.style.opacity = '1';
        }, 50);
      }, 600);
      
      setTimeout(() => {
        isOpen = false;
        
        setTimeout(() => {
          pageB.classList.remove('active');
          pageA.classList.add('active');
          pageA.style.transform = 'scale(1)';
          pageA.style.opacity = '1';
          isTransitioning = false;
        }, 2000);
      }, 1400);
    });
  }

  let angle = 0;
  const nodes = 12;
  
  let animId: number;
  const draw = () => {
    if (!dnWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      angle += 0.045;
      const w = canvas.width;
      const h = canvas.height;
      const splitWidth = Math.min(60, (angle * 8));
      
      for (let i = 0; i < nodes; i++) {
        const y = (i / (nodes - 1)) * (h - 20) + 10;
        const strand1Angle = angle + (i * 0.5);
        const strand2Angle = strand1Angle + Math.PI;
        
        const x1 = w / 2 - splitWidth + Math.sin(strand1Angle) * 20;
        const x2 = w / 2 + splitWidth + Math.sin(strand2Angle) * 20;
        
        const z1 = Math.cos(strand1Angle);
        const z2 = Math.cos(strand2Angle);
        
        const size1 = 2 + (z1 + 1) * 1.5;
        const size2 = 2 + (z2 + 1) * 1.5;
        
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(x1, y, size1, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 4;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x2, y, size2, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0055';
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    } else {
      angle = 0;
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* DNA Helix Page Transition Styles */
.dna-trans-wrapper {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: visible;
  box-sizing: border-box;
}

.dna-trans-viewport {
  width: 280px;
  height: 180px;
  background: #020408;
  border: 1.5px solid rgba(0, 242, 254, 0.2);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
}

.dna-trans-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

.dna-trans-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Symmetrical pages */
.dna-page {
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

.dna-page.active {
  opacity: 1;
  z-index: 2;
}

.page-alpha {
  background: radial-gradient(circle at center, #02090f 0%, #010305 100%);
}

.page-beta {
  background: radial-gradient(circle at center, #0c020b 0%, #040104 100%);
}

.dna-page h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: 0.1em;
}

.dna-page p {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  margin: 0;
}

.page-alpha h4 { text-shadow: 0 0 6px rgba(0, 242, 254, 0.35); }
.page-beta h4 { text-shadow: 0 0 6px rgba(255, 0, 127, 0.35); color: #ff0055; }

/* Trigger Button */
.btn-trigger-dna {
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

.btn-trigger-dna:hover {
  background: #00f2fe;
  color: #020408;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 242, 254, 0.4), 0 0 10px rgba(0, 242, 254, 0.3);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] flex flex-col items-center gap-5">
  <div class="w-[280px] h-[180px] bg-[#020408] border border-cyan-400/25 rounded-xl flex items-center justify-center relative shadow-2xl overflow-hidden">
    <div class="text-center p-5 z-10 flex flex-col gap-2">
      <h4 class="text-sm font-bold text-white tracking-widest">PAGE ALPHA</h4>
      <p class="text-[11px] text-gray-400">Genetic sequencer calibrated. Ready for drop.</p>
    </div>
  </div>
  <button class="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-full font-bold text-xs tracking-wider">ENGAGE GENESIS SPLIT</button>
</div>`,
  prompt: `Design a premium "DNA Helix Page Transition" utility. Triggering splits the viewport along a vertical double helix seam, with a coiling 3D DNA strand drawing and dividing base pairs on Canvas.`
};
