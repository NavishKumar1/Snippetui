/**
 * Component: Star Constellation Transition
 * Category: page-transitions
 */

export const component = {
  id: 'star-constellation-transition',
  name: 'Star Constellation',
  category: 'page-transitions',
  tag: 'Stunning',
  html: `<div class="star-trans-wrapper">
  <!-- Viewport Frame -->
  <div class="star-viewport">
    <div class="star-canvas-container">
      <canvas class="star-gateway-canvas"></canvas>
    </div>
    
    <!-- Page Alpha -->
    <div class="star-page page-alpha active">
      <h4>PAGE ALPHA</h4>
      <p>Stellar alignments stable. Ready for transition.</p>
    </div>
    
    <!-- Page Beta -->
    <div class="star-page page-beta">
      <h4>PAGE BETA</h4>
      <p>Gateway crossed. System coordinates established.</p>
    </div>
  </div>
  
  <!-- Trigger Button -->
  <button class="btn-trigger-star">ENGAGE CONSTELLATION</button>
</div>`,
  js: `// Cosmic stargate constellations drawn on Canvas on active transition
const stWrapper = document.querySelector('.star-trans-wrapper');
if (stWrapper) {
  const trigger = stWrapper.querySelector('.btn-trigger-star');
  const pageA = stWrapper.querySelector('.page-alpha');
  const pageB = stWrapper.querySelector('.page-beta');
  const canvas = stWrapper.querySelector('.star-gateway-canvas');
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
    
    // Collapse Page Alpha slightly
    pageA.style.transform = 'scale(0.85) rotate(-5deg)';
    pageA.style.opacity = '0';
    
    // Spawn heavy particle constellation
    generateConstellation();
    
    // Swap pages halfway (600ms)
    setTimeout(() => {
      pageA.classList.remove('active');
      pageB.classList.add('active');
      pageB.style.transform = 'scale(0.85) rotate(5deg)';
      pageB.style.opacity = '0';
      
      setTimeout(() => {
        pageB.style.transform = 'scale(1) rotate(0deg)';
        pageB.style.opacity = '1';
      }, 50);
    }, 600);
    
    // Fade out stargate canvas
    setTimeout(() => {
      isOpen = false;
      
      // Delay reset for demo
      setTimeout(() => {
        pageB.classList.remove('active');
        pageA.classList.add('active');
        pageA.style.transform = 'scale(1) rotate(0deg)';
        pageA.style.opacity = '1';
        isTransitioning = false;
      }, 2000);
    }, 1400);
  });

  // Particle System
  const stars = [];
  const numStars = 18;
  
  const generateConstellation = () => {
    stars.length = 0;
    const w = canvas.width;
    const h = canvas.height;
    
    for (let i = 0; i < numStars; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 80;
      stars.push({
        x: w / 2 + Math.cos(angle) * dist,
        y: h / 2 + Math.sin(angle) * dist,
        size: 1.5 + Math.random() * 2,
        vx: -1 + Math.random() * 2,
        vy: -1 + Math.random() * 2,
        alpha: 0
      });
    }
  };

  let animId;
  const draw = () => {
    if (!stWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      // Draw spinning connection lines between nodes
      ctx.lineWidth = 0.8;
      
      stars.forEach((s1, i) => {
        // Move stars slightly
        s1.x += s1.vx;
        s1.y += s1.vy;
        
        if (s1.alpha < 1) s1.alpha += 0.05;
        
        stars.forEach((s2, j) => {
          if (i === j) return;
          const dx = s2.x - s1.x;
          const dy = s2.y - s1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 75) {
            const edgeAlpha = (1 - dist / 75) * 0.25 * s1.alpha;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = \`rgba(212, 175, 55, \${edgeAlpha})\`;
            ctx.stroke();
          }
        });
        
        ctx.save();
        ctx.globalAlpha = s1.alpha;
        ctx.beginPath();
        ctx.arc(s1.x, s1.y, s1.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffd700';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const stWrapper = document.querySelector<HTMLDivElement>('.star-trans-wrapper');
if (stWrapper) {
  const trigger = stWrapper.querySelector<HTMLButtonElement>('.btn-trigger-star');
  const pageA = stWrapper.querySelector<HTMLDivElement>('.page-alpha');
  const pageB = stWrapper.querySelector<HTMLDivElement>('.page-beta');
  const canvas = stWrapper.querySelector<HTMLCanvasElement>('.star-gateway-canvas');
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
      
      pageA.style.transform = 'scale(0.85) rotate(-5deg)';
      pageA.style.opacity = '0';
      
      generateConstellation();
      
      setTimeout(() => {
        pageA.classList.remove('active');
        pageB.classList.add('active');
        pageB.style.transform = 'scale(0.85) rotate(5deg)';
        pageB.style.opacity = '0';
        
        setTimeout(() => {
          pageB.style.transform = 'scale(1) rotate(0deg)';
          pageB.style.opacity = '1';
        }, 50);
      }, 600);
      
      setTimeout(() => {
        isOpen = false;
        
        setTimeout(() => {
          pageB.classList.remove('active');
          pageA.classList.add('active');
          pageA.style.transform = 'scale(1) rotate(0deg)';
          pageA.style.opacity = '1';
          isTransitioning = false;
        }, 2000);
      }, 1400);
    });
  }

  interface ConstellationStar {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
  }

  const stars: ConstellationStar[] = [];
  const numStars = 18;
  
  const generateConstellation = () => {
    if (!canvas) return;
    stars.length = 0;
    const w = canvas.width;
    const h = canvas.height;
    
    for (let i = 0; i < numStars; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 80;
      stars.push({
        x: w / 2 + Math.cos(angle) * dist,
        y: h / 2 + Math.sin(angle) * dist,
        size: 1.5 + Math.random() * 2,
        vx: -1 + Math.random() * 2,
        vy: -1 + Math.random() * 2,
        alpha: 0
      });
    }
  };

  let animId: number;
  const draw = () => {
    if (!stWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      ctx.lineWidth = 0.8;
      
      stars.forEach((s1, i) => {
        s1.x += s1.vx;
        s1.y += s1.vy;
        
        if (s1.alpha < 1) s1.alpha += 0.05;
        
        stars.forEach((s2, j) => {
          if (i === j) return;
          const dx = s2.x - s1.x;
          const dy = s2.y - s1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 75) {
            const edgeAlpha = (1 - dist / 75) * 0.25 * s1.alpha;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = \`rgba(212, 175, 55, \${edgeAlpha})\`;
            ctx.stroke();
          }
        });
        
        ctx.save();
        ctx.globalAlpha = s1.alpha;
        ctx.beginPath();
        ctx.arc(s1.x, s1.y, s1.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffd700';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Star Constellation Transition Styles */
.star-trans-wrapper {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: visible;
  box-sizing: border-box;
}

.star-viewport {
  width: 280px;
  height: 180px;
  background: #020105;
  border: 1.5px solid rgba(212, 175, 55, 0.15);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
}

.star-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

.star-gateway-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Viewport pages */
.star-page {
  position: absolute;
  inset: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.star-page.active {
  opacity: 1;
  z-index: 2;
}

.page-alpha {
  background: radial-gradient(circle at center, #05040a 0%, #010002 100%);
}

.page-beta {
  background: radial-gradient(circle at center, #0c0802 0%, #030200 100%);
}

.star-page h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: 0.1em;
}

.star-page p {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  margin: 0;
}

.page-alpha h4 { text-shadow: 0 0 6px rgba(138, 43, 226, 0.4); }
.page-beta h4 { text-shadow: 0 0 6px rgba(212, 175, 55, 0.4); color: #ffd700; }

/* Trigger Button */
.btn-trigger-star {
  background: transparent;
  border: 1.5px solid #ffd700;
  color: #ffd700;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 12px 24px;
  border-radius: 100px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.15);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-trigger-star:hover {
  background: #ffd700;
  color: #020105;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4), 0 0 10px rgba(212, 175, 55, 0.3);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] flex flex-col items-center gap-5">
  <div class="w-[280px] h-[180px] bg-[#020105] border border-amber-500/25 rounded-xl flex items-center justify-center relative shadow-2xl overflow-hidden">
    <div class="text-center p-5 z-10 flex flex-col gap-2">
      <h4 class="text-sm font-bold text-white tracking-widest">PAGE ALPHA</h4>
      <p class="text-[11px] text-gray-400">Stellar alignments stable. Ready for transition.</p>
    </div>
  </div>
  <button class="border border-amber-500 text-amber-500 px-6 py-3 rounded-full font-bold text-xs tracking-wider">ENGAGE CONSTELLATION</button>
</div>`,
  prompt: `Design a premium "Star Constellation Transition" utility. Collapses the current page into a center point, which bursts into a spinning stargate of connected Canvas lines before rendering Page Beta.`
};
