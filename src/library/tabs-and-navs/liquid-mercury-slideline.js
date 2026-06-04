/**
 * Component: Liquid Mercury Slideline
 * Category: tabs-and-navs
 */

export const component = {
  id: 'liquid-mercury-slideline',
  name: 'Liquid Mercury Slideline',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="mercury-tabs-sandbox" id="mercury-tabs-sandbox-container">
  <div class="mercury-nav">
    <canvas class="mercury-canvas"></canvas>
    <button class="mercury-tab-btn active" data-index="0">Home</button>
    <button class="mercury-tab-btn" data-index="1">Profile</button>
    <button class="mercury-tab-btn" data-index="2">Vault</button>
    <button class="mercury-tab-btn" data-index="3">System</button>
  </div>
</div>`,
  js: `// Liquid Mercury Canvas Sliding Tabs Indicator logic
const container = document.getElementById('mercury-tabs-sandbox-container');
if (container) {
  const canvas = container.querySelector('.mercury-canvas');
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.mercury-tab-btn');
  const nav = container.querySelector('.mercury-nav');
  
  let animId = null;
  
  // Easing coordinates for the fluid liquid indicator
  let currentX = 0;
  let currentWidth = 0;
  let targetX = 0;
  let targetWidth = 0;
  
  const resizeCanvas = () => {
    canvas.width = nav.clientWidth;
    canvas.height = nav.clientHeight;
    updateTargets();
    // Snap immediately on first load
    currentX = targetX;
    currentWidth = targetWidth;
  };
  
  const updateTargets = () => {
    const activeBtn = container.querySelector('.mercury-tab-btn.active');
    if (activeBtn) {
      targetX = activeBtn.offsetLeft;
      targetWidth = activeBtn.clientWidth;
    }
  };
  
  const animate = () => {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Easing formulas for the organic stretch slide
    const lerpSpeed = 0.16;
    currentX += (targetX - currentX) * lerpSpeed;
    
    // Stretch effect: make it wider while travelling, snap back on target arrival
    const distance = Math.abs(targetX - currentX);
    const stretchAmt = Math.min(distance * 0.45, 30);
    
    currentWidth += (targetWidth - currentWidth) * lerpSpeed;
    
    // Render the liquid mercury capsule blob
    const h = canvas.height;
    const paddingY = 6;
    const rx = currentX - stretchAmt * 0.1;
    const rw = currentWidth + stretchAmt * 1.1;
    const ry = paddingY;
    const rh = h - paddingY * 2;
    const radius = rh / 2;
    
    ctx.save();
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
    
    // Metallic chrome gradient
    const grad = ctx.createLinearGradient(rx, ry, rx + rw, ry + rh);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#00f2fe');
    grad.addColorStop(0.7, '#4facfe');
    grad.addColorStop(1, '#000000');
    
    ctx.fillStyle = grad;
    
    // Draw rounded capsule
    ctx.beginPath();
    ctx.roundRect(rx, ry, rw, rh, radius);
    ctx.fill();
    ctx.restore();
    
    animId = requestAnimationFrame(animate);
  };
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateTargets();
    });
  });
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  animate();
}`,
  ts: `// TypeScript Implementation
const container = document.getElementById('mercury-tabs-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.mercury-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.mercury-tab-btn');
  const nav = container.querySelector('.mercury-nav') as HTMLDivElement;
  
  if (ctx) {
    let animId: number;
    let currentX = 0;
    let currentWidth = 0;
    let targetX = 0;
    let targetWidth = 0;
    
    const resizeCanvas = () => {
      canvas.width = nav.clientWidth;
      canvas.height = nav.clientHeight;
      updateTargets();
      currentX = targetX;
      currentWidth = targetWidth;
    };
    
    const updateTargets = () => {
      const activeBtn = container.querySelector('.mercury-tab-btn.active') as HTMLButtonElement | null;
      if (activeBtn) {
        targetX = activeBtn.offsetLeft;
        targetWidth = activeBtn.clientWidth;
      }
    };
    
    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resizeCanvas);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const lerpSpeed = 0.16;
      currentX += (targetX - currentX) * lerpSpeed;
      
      const distance = Math.abs(targetX - currentX);
      const stretchAmt = Math.min(distance * 0.45, 30);
      
      currentWidth += (targetWidth - currentWidth) * lerpSpeed;
      
      const h = canvas.height;
      const paddingY = 6;
      const rx = currentX - stretchAmt * 0.1;
      const rw = currentWidth + stretchAmt * 1.1;
      const ry = paddingY;
      const rh = h - paddingY * 2;
      const radius = rh / 2;
      
      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
      
      const grad = ctx.createLinearGradient(rx, ry, rx + rw, ry + rh);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#00f2fe');
      grad.addColorStop(0.7, '#4facfe');
      grad.addColorStop(1, '#000000');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(rx, ry, rw, rh, radius);
      ctx.fill();
      ctx.restore();
      
      animId = requestAnimationFrame(animate);
    };
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateTargets();
      });
    });
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
  }
}`,
  css: `/* Liquid Mercury Slideline Tabs styles */
.mercury-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #050d11 0%, #010405 100%);
  border: 1px solid rgba(0, 242, 254, 0.12);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.mercury-nav {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  padding: 4px;
  gap: 4px;
  z-index: 1;
}

.mercury-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

.mercury-tab-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 20px;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  z-index: 2;
  transition: color 0.4s ease;
}

.mercury-tab-btn.active {
  color: #040810;
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#050d11] to-[#010405] border border-cyan-500/10 rounded-2xl flex items-center justify-center overflow-hidden" id="mercury-tabs-sandbox-container">
  <div class="mercury-nav relative flex bg-white/5 border border-white/5 rounded-full p-1 gap-1 z-10">
    <canvas class="mercury-canvas absolute top-0 left-0 pointer-events-none z-10"></canvas>
    <button class="mercury-tab-btn active relative bg-transparent border-none px-5 py-2.5 font-sans text-xs font-semibold text-white/50 cursor-pointer z-20 transition-colors duration-400 [&.active]:text-black" data-index="0">Home</button>
    <button class="mercury-tab-btn relative bg-transparent border-none px-5 py-2.5 font-sans text-xs font-semibold text-white/50 cursor-pointer z-20 transition-colors duration-400 [&.active]:text-black" data-index="1">Profile</button>
    <button class="mercury-tab-btn relative bg-transparent border-none px-5 py-2.5 font-sans text-xs font-semibold text-white/50 cursor-pointer z-20 transition-colors duration-400 [&.active]:text-black" data-index="2">Vault</button>
    <button class="mercury-tab-btn relative bg-transparent border-none px-5 py-2.5 font-sans text-xs font-semibold text-white/50 cursor-pointer z-20 transition-colors duration-400 [&.active]:text-black" data-index="3">System</button>
  </div>
</div>`,
  prompt: 'Design a liquid mercury tab selector bar component featuring stretching Canvas fluid indicator capsules behind active list selections.'
};
