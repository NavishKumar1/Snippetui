/**
 * Component: Supernova Blast Page Transition
 * Category: page-transitions
 */

export const component = {
  id: 'supernova-blast-transition',
  name: 'Supernova Blast Transition',
  category: 'page-transitions',
  tag: 'Stunning',
  html: `<div class="sn-trans-wrapper">
  <!-- Viewport Frame -->
  <div class="sn-viewport">
    <div class="sn-canvas-container">
      <canvas class="sn-blast-canvas"></canvas>
    </div>
    
    <!-- Page Alpha -->
    <div class="sn-page page-alpha active">
      <h4>PAGE ALPHA</h4>
      <p>Universal expansion stable. Transition unengaged.</p>
    </div>
    
    <!-- Page Beta -->
    <div class="sn-page page-beta">
      <h4>PAGE BETA</h4>
      <p>Stellar explosion cleared. Page Beta materialised.</p>
    </div>
  </div>
  
  <!-- Trigger Button -->
  <button class="btn-trigger-sn">ENGAGE SUPERNOVA</button>
</div>`,
  js: `// Stellar supernova blast particles drawn on Canvas on active transition
const snTrans = document.querySelector('.sn-trans-wrapper');
if (snTrans) {
  const trigger = snTrans.querySelector('.btn-trigger-sn');
  const pageA = snTrans.querySelector('.page-alpha');
  const pageB = snTrans.querySelector('.page-beta');
  const canvas = snTrans.querySelector('.sn-blast-canvas');
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
    
    // Collapse Page Alpha to center
    pageA.style.transform = 'scale(0) rotate(180deg)';
    pageA.style.opacity = '0';
    
    // Launch stellar spark explosion particles
    for (let i = 0; i < 45; i++) {
      spawnExplosionSpark();
    }
    
    // Swap content mid-blast (550ms)
    setTimeout(() => {
      pageA.classList.remove('active');
      pageB.classList.add('active');
      pageB.style.transform = 'scale(1.5) rotate(-180deg)';
      pageB.style.opacity = '0';
      
      setTimeout(() => {
        pageB.style.transform = 'scale(1) rotate(0deg)';
        pageB.style.opacity = '1';
      }, 50);
    }, 550);
    
    // Fade stargate canvas
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
  const sparks = [];
  const colors = ['#ffffff', '#ffd700', '#ff8800', '#ff0055', '#da77f2'];

  const spawnExplosionSpark = () => {
    const w = canvas.width;
    const h = canvas.height;
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    
    sparks.push({
      x: w / 2,
      y: h / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1.5 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.015 + Math.random() * 0.018
    });
  };

  let animId;
  const draw = () => {
    if (!snTrans.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    sparks.forEach((s, idx) => {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.95;
      s.vy *= 0.95;
      
      s.alpha -= s.decay;
      if (s.alpha <= 0) {
        sparks.splice(idx, 1);
        return;
      }
      
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const snTrans = document.querySelector<HTMLDivElement>('.sn-trans-wrapper');
if (snTrans) {
  const trigger = snTrans.querySelector<HTMLButtonElement>('.btn-trigger-sn');
  const pageA = snTrans.querySelector<HTMLDivElement>('.page-alpha');
  const pageB = snTrans.querySelector<HTMLDivElement>('.page-beta');
  const canvas = snTrans.querySelector<HTMLCanvasElement>('.sn-blast-canvas');
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
      
      pageA.style.transform = 'scale(0) rotate(180deg)';
      pageA.style.opacity = '0';
      
      for (let i = 0; i < 45; i++) {
        spawnExplosionSpark();
      }
      
      setTimeout(() => {
        pageA.classList.remove('active');
        pageB.classList.add('active');
        pageB.style.transform = 'scale(1.5) rotate(-180deg)';
        pageB.style.opacity = '0';
        
        setTimeout(() => {
          pageB.style.transform = 'scale(1) rotate(0deg)';
          pageB.style.opacity = '1';
        }, 50);
      }, 550);
      
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

  interface BlastSpark {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
  }

  const sparks: BlastSpark[] = [];
  const colors = ['#ffffff', '#ffd700', '#ff8800', '#ff0055', '#da77f2'];

  const spawnExplosionSpark = () => {
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    
    sparks.push({
      x: w / 2,
      y: h / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1.5 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.015 + Math.random() * 0.018
    });
  };

  let animId: number;
  const draw = () => {
    if (!snTrans.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    sparks.forEach((s, idx) => {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.95;
      s.vy *= 0.95;
      
      s.alpha -= s.decay;
      if (s.alpha <= 0) {
        sparks.splice(idx, 1);
        return;
      }
      
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Supernova Blast Page Transition Styles */
.sn-trans-wrapper {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: visible;
  box-sizing: border-box;
}

.sn-viewport {
  width: 280px;
  height: 180px;
  background: #090212;
  border: 1.5px solid rgba(218, 119, 242, 0.15);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
}

.sn-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

.sn-blast-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Symmetrical pages */
.sn-page {
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

.sn-page.active {
  opacity: 1;
  z-index: 2;
}

.page-alpha {
  background: radial-gradient(circle at center, #0d041c 0%, #05010a 100%);
  transform: scale(1) rotate(0deg);
}

.page-beta {
  background: radial-gradient(circle at center, #1b0f02 0%, #080400 100%);
  transform: scale(1.5) rotate(-180deg);
}

.sn-page h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: 0.1em;
}

.sn-page p {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  margin: 0;
}

.page-alpha h4 { text-shadow: 0 0 6px rgba(218, 119, 242, 0.35); }
.page-beta h4 { text-shadow: 0 0 6px rgba(255, 136, 0, 0.35); color: #ffd700; }

/* Trigger Button */
.btn-trigger-sn {
  background: transparent;
  border: 1.5px solid #ff8800;
  color: #ff8800;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 12px 24px;
  border-radius: 100px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 136, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-trigger-sn:hover {
  background: #ff8800;
  color: #0d041c;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 136, 0, 0.4), 0 0 10px rgba(255, 136, 0, 0.3);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] flex flex-col items-center gap-5">
  <div class="w-[280px] h-[180px] bg-[#090212] border border-fuchsia-500/25 rounded-xl flex items-center justify-center relative shadow-2xl overflow-hidden">
    <div class="text-center p-5 z-10 flex flex-col gap-2">
      <h4 class="text-sm font-bold text-white tracking-widest">PAGE ALPHA</h4>
      <p class="text-[11px] text-gray-400">Universal expansion stable. Transition unengaged.</p>
    </div>
  </div>
  <button class="border border-orange-500 text-orange-500 px-6 py-3 rounded-full font-bold text-xs tracking-wider">ENGAGE SUPERNOVA</button>
</div>`,
  prompt: `Design a premium "Supernova Blast Page Transition" utility. Triggering collapses Page Alpha down into a single point, which explodes in a brilliant golden-white solar starburst Canvas particle shower to materialize Page Beta.`
};
