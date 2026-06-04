/**
 * Component: Acoustic Amplitude Transition
 * Category: page-transitions
 */

export const component = {
  id: 'acoustic-amplitude-transition',
  name: 'Acoustic Amplitude',
  category: 'page-transitions',
  tag: 'Stunning',
  html: `<div class="aa-trans-wrapper">
  <!-- Viewport Frame -->
  <div class="aa-viewport">
    <div class="aa-canvas-container">
      <canvas class="aa-scan-canvas"></canvas>
    </div>
    
    <!-- Page Alpha -->
    <div class="aa-page page-alpha active">
      <h4>PAGE ALPHA</h4>
      <p>Acoustic telemetry at rest. Ready for sweep.</p>
    </div>
    
    <!-- Page Beta -->
    <div class="aa-page page-beta">
      <h4>PAGE BETA</h4>
      <p>Oscillations parsed successfully. Core aligned.</p>
    </div>
  </div>
  
  <!-- Trigger Button -->
  <button class="btn-trigger-aa">ENGAGE ACOUSTIC SCAN</button>
</div>`,
  js: `// Equalizer amplitude scanning bar rendering on Canvas on active toggle
const aaWrapper = document.querySelector('.aa-trans-wrapper');
if (aaWrapper) {
  const trigger = aaWrapper.querySelector('.btn-trigger-aa');
  const pageA = aaWrapper.querySelector('.page-alpha');
  const pageB = aaWrapper.querySelector('.page-beta');
  const canvas = aaWrapper.querySelector('.aa-scan-canvas');
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
    
    // Deform Page Alpha smoothly
    pageA.style.transform = 'scale(0.9) skewX(-4deg)';
    pageA.style.opacity = '0';
    
    // Swap content mid-scan (500ms)
    setTimeout(() => {
      pageA.classList.remove('active');
      pageB.classList.add('active');
      pageB.style.transform = 'scale(0.9) skewX(4deg)';
      pageB.style.opacity = '0';
      
      setTimeout(() => {
        pageB.style.transform = 'scale(1) skewX(0deg)';
        pageB.style.opacity = '1';
      }, 50);
    }, 500);
    
    // Stop canvas scan
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
    }, 1100);
  });

  // Equalizer sweeping scan math model
  let scanX = -30;
  const numBars = 12;
  
  let animId;
  const draw = () => {
    if (!aaWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      const w = canvas.width;
      const h = canvas.height;
      
      // Slide scanner across
      scanX += w * 0.024;
      if (scanX > w + 40) {
        scanX = -30; // loop internally
      }
      
      // Draw sweeping vertical sound wave bars
      for (let i = 0; i < numBars; i++) {
        const barWidth = 3;
        const gap = 3;
        const x = scanX - (i * (barWidth + gap));
        
        if (x >= 0 && x < w) {
          // Sinusoidal height matching central focus
          const amplitude = 30 + Math.sin(x * 0.05 + scanX * 0.1) * 45;
          const barHeight = Math.max(10, amplitude * (1 - i / numBars));
          
          ctx.beginPath();
          ctx.rect(x, (h - barHeight) / 2, barWidth, barHeight);
          ctx.fillStyle = i < 4 ? '#00f2fe' : i < 8 ? '#ff0055' : 'rgba(255,255,255,0.2)';
          ctx.fill();
        }
      }
      
      // Glowing vertical scan line
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, h);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      scanX = -30; // reset
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const aaWrapper = document.querySelector<HTMLDivElement>('.aa-trans-wrapper');
if (aaWrapper) {
  const trigger = aaWrapper.querySelector<HTMLButtonElement>('.btn-trigger-aa');
  const pageA = aaWrapper.querySelector<HTMLDivElement>('.page-alpha');
  const pageB = aaWrapper.querySelector<HTMLDivElement>('.page-beta');
  const canvas = aaWrapper.querySelector<HTMLCanvasElement>('.aa-scan-canvas');
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
      
      pageA.style.transform = 'scale(0.9) skewX(-4deg)';
      pageA.style.opacity = '0';
      
      setTimeout(() => {
        pageA.classList.remove('active');
        pageB.classList.add('active');
        pageB.style.transform = 'scale(0.9) skewX(4deg)';
        pageB.style.opacity = '0';
        
        setTimeout(() => {
          pageB.style.transform = 'scale(1) skewX(0deg)';
          pageB.style.opacity = '1';
        }, 50);
      }, 500);
      
      setTimeout(() => {
        isOpen = false;
        
        setTimeout(() => {
          pageB.classList.remove('active');
          pageA.classList.add('active');
          pageA.style.transform = 'scale(1)';
          pageA.style.opacity = '1';
          isTransitioning = false;
        }, 2000);
      }, 1100);
    });
  }

  let scanX = -30;
  const numBars = 12;
  
  let animId: number;
  const draw = () => {
    if (!aaWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      const w = canvas.width;
      const h = canvas.height;
      
      scanX += w * 0.024;
      if (scanX > w + 40) {
        scanX = -30;
      }
      
      for (let i = 0; i < numBars; i++) {
        const barWidth = 3;
        const gap = 3;
        const x = scanX - (i * (barWidth + gap));
        
        if (x >= 0 && x < w) {
          const amplitude = 30 + Math.sin(x * 0.05 + scanX * 0.1) * 45;
          const barHeight = Math.max(10, amplitude * (1 - i / numBars));
          
          ctx.beginPath();
          ctx.rect(x, (h - barHeight) / 2, barWidth, barHeight);
          ctx.fillStyle = i < 4 ? '#00f2fe' : i < 8 ? '#ff0055' : 'rgba(255,255,255,0.2)';
          ctx.fill();
        }
      }
      
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, h);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      scanX = -30;
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Acoustic Amplitude Transition Styles */
.aa-trans-wrapper {
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: visible;
  box-sizing: border-box;
}

.aa-viewport {
  width: 280px;
  height: 180px;
  background: #04080c;
  border: 1.5px solid rgba(0, 242, 254, 0.2);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
}

.aa-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

.aa-scan-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Symmetrical pages */
.aa-page {
  position: absolute;
  inset: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.45s ease, transform 0.45s ease;
  z-index: 1;
}

.aa-page.active {
  opacity: 1;
  z-index: 2;
}

.page-alpha {
  background: radial-gradient(circle at center, #020b12 0%, #010408 100%);
}

.page-beta {
  background: radial-gradient(circle at center, #0f020c 0%, #060105 100%);
}

.aa-page h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: 0.1em;
}

.aa-page p {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  margin: 0;
}

.page-alpha h4 { text-shadow: 0 0 6px rgba(0, 242, 254, 0.35); color: #00f2fe; }
.page-beta h4 { text-shadow: 0 0 6px rgba(255, 0, 127, 0.35); color: #ff0055; }

/* Trigger Button */
.btn-trigger-aa {
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

.btn-trigger-aa:hover {
  background: #00f2fe;
  color: #04080c;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 242, 254, 0.4), 0 0 10px rgba(0, 242, 254, 0.3);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] flex flex-col items-center gap-5">
  <div class="w-[280px] h-[180px] bg-[#020b12] border border-cyan-400/25 rounded-xl flex items-center justify-center relative shadow-2xl overflow-hidden">
    <div class="text-center p-5 z-10 flex flex-col gap-2">
      <h4 class="text-sm font-bold text-cyan-400 tracking-widest">PAGE ALPHA</h4>
      <p class="text-[11px] text-gray-400">Acoustic telemetry at rest. Ready for sweep.</p>
    </div>
  </div>
  <button class="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-full font-bold text-xs tracking-wider">ENGAGE ACOUSTIC SCAN</button>
</div>`,
  prompt: `Design a premium "Acoustic Amplitude Transition" utility. Trigger sweeps a vertical equalizer scanner bar, rendering oscillating frequency waves inside a Canvas overlay that deforms Page Alpha before re-stabilizing Page Beta.`
};
