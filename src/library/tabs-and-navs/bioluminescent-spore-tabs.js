/**
 * Component: Bioluminescent Spore Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'bioluminescent-spore-tabs',
  name: 'Bioluminescent Spore Tabs',
  category: 'tabs-and-navs',
  tag: 'Creative',
  html: `<div class="spore-tabs-sandbox" id="spore-tabs-container">
  <div class="spore-nav">
    <canvas class="spore-canvas"></canvas>
    <button class="spore-tab-btn active" data-index="0">NUCLEUS</button>
    <button class="spore-tab-btn" data-index="1">ORGANELLE</button>
    <button class="spore-tab-btn" data-index="2">CYTOSOL</button>
  </div>
</div>`,
  js: `// Bioluminescent Spore canvas simulation
const container = document.getElementById('spore-tabs-container');
if (container) {
  const canvas = container.querySelector('.spore-canvas');
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.spore-tab-btn');
  const nav = container.querySelector('.spore-nav');
  
  let animId = null;
  let targetX = 0;
  let targetWidth = 0;
  let currentX = 0;
  let currentWidth = 0;
  
  const resize = () => {
    canvas.width = nav.clientWidth;
    canvas.height = nav.clientHeight;
    updateTargets();
    currentX = targetX;
    currentWidth = targetWidth;
  };

  const updateTargets = () => {
    const active = container.querySelector('.spore-tab-btn.active');
    if (active) {
      targetX = active.offsetLeft;
      targetWidth = active.clientWidth;
    }
  };

  // Particles array
  const spores = [];
  const sporeCount = 20;

  for (let i = 0; i < sporeCount; i++) {
    spores.push({
      x: Math.random() * 200,
      y: Math.random() * 30,
      r: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * Math.PI * 2
    });
  }

  const animate = () => {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // LERP targets
    const lerpSpeed = 0.08;
    currentX += (targetX - currentX) * lerpSpeed;
    currentWidth += (targetWidth - currentWidth) * lerpSpeed;

    // Draw main glowing bioluminescent blob
    const centerX = currentX + currentWidth / 2;
    const centerY = canvas.height / 2;

    const radGrad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, currentWidth * 0.6);
    radGrad.addColorStop(0, 'rgba(57, 255, 20, 0.45)');
    radGrad.addColorStop(0.5, 'rgba(57, 255, 20, 0.15)');
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.save();
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, currentWidth * 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Render floating spores drawn towards the active gravity well
    spores.forEach(spore => {
      // Magnetic pull towards the active container center
      const dx = centerX - spore.x;
      const dy = centerY - spore.y;
      spore.x += dx * 0.05 + spore.speedX;
      spore.y += dy * 0.05 + spore.speedY;

      // Pulse size organically
      spore.angle += 0.05;
      const pulseRadius = spore.r + Math.sin(spore.angle) * 0.8;

      ctx.save();
      ctx.beginPath();
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#39ff14';
      ctx.fillStyle = 'rgba(57, 255, 20, 0.95)';
      ctx.arc(spore.x, spore.y, pulseRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    animId = requestAnimationFrame(animate);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateTargets();
    });
  });

  resize();
  window.addEventListener('resize', resize);
  animate();
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('spore-tabs-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.spore-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.spore-tab-btn');
  const nav = container.querySelector('.spore-nav') as HTMLDivElement;
  
  if (ctx) {
    let animId: number;
    let targetX = 0;
    let targetWidth = 0;
    let currentX = 0;
    let currentWidth = 0;
    
    const resize = () => {
      canvas.width = nav.clientWidth;
      canvas.height = nav.clientHeight;
      updateTargets();
      currentX = targetX;
      currentWidth = targetWidth;
    };

    const updateTargets = () => {
      const active = container.querySelector('.spore-tab-btn.active') as HTMLButtonElement | null;
      if (active) {
        targetX = active.offsetLeft;
        targetWidth = active.clientWidth;
      }
    };

    interface Spore {
      x: number;
      y: number;
      r: number;
      speedX: number;
      speedY: number;
      angle: number;
    }

    const spores: Spore[] = [];
    const sporeCount = 20;

    for (let i = 0; i < sporeCount; i++) {
      spores.push({
        x: Math.random() * 200,
        y: Math.random() * 30,
        r: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.5,
        angle: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const lerpSpeed = 0.08;
      currentX += (targetX - currentX) * lerpSpeed;
      currentWidth += (targetWidth - currentWidth) * lerpSpeed;

      const centerX = currentX + currentWidth / 2;
      const centerY = canvas.height / 2;

      const radGrad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, currentWidth * 0.6);
      radGrad.addColorStop(0, 'rgba(57, 255, 20, 0.45)');
      radGrad.addColorStop(0.5, 'rgba(57, 255, 20, 0.15)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.save();
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentWidth * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      spores.forEach(spore => {
        const dx = centerX - spore.x;
        const dy = centerY - spore.y;
        spore.x += dx * 0.05 + spore.speedX;
        spore.y += dy * 0.05 + spore.speedY;

        spore.angle += 0.05;
        const pulseRadius = spore.r + Math.sin(spore.angle) * 0.8;

        ctx.save();
        ctx.beginPath();
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#39ff14';
        ctx.fillStyle = 'rgba(57, 255, 20, 0.95)';
        ctx.arc(spore.x, spore.y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => (b as HTMLElement).classList.remove('active'));
        btn.classList.add('active');
        updateTargets();
      });
    });

    resize();
    window.addEventListener('resize', resize);
    animate();
  }
}`,
  css: `/* Bioluminescent Spore Tabs style */
.spore-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #051405 0%, #010501 100%);
  border: 1px solid rgba(57, 255, 20, 0.12);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.spore-nav {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 30px;
  padding: 4px;
  gap: 4px;
  z-index: 1;
}

.spore-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

.spore-tab-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 24px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  z-index: 2;
  transition: color 0.4s ease;
  letter-spacing: 0.5px;
}

.spore-tab-btn.active {
  color: #39ff14;
  text-shadow: 0 0 10px rgba(57, 255, 20, 0.6);
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#051405] to-[#010501] border border-green-500/10 rounded-3xl flex items-center justify-center overflow-hidden" id="spore-tabs-container">
  <div class="spore-nav relative flex bg-white/[0.01] border border-white/[0.03] rounded-full p-1 gap-1 z-10">
    <canvas class="spore-canvas absolute top-0 left-0 pointer-events-none z-10"></canvas>
    <button class="spore-tab-btn active relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#39ff14]" data-index="0">NUCLEUS</button>
    <button class="spore-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#39ff14]" data-index="1">ORGANELLE</button>
    <button class="spore-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#39ff14]" data-index="2">CYTOSOL</button>
  </div>
</div>`,
  prompt: 'Design an organic bioluminescent spore selector navigation containing canvas floating pollen spores drawn magnetically towards active tabs.'
};
