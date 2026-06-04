/**
 * Component: Sonic Waveguide Nav
 * Category: tabs-and-navs
 */

export const component = {
  id: 'sonic-waveguide-nav',
  name: 'Sonic Waveguide Nav',
  category: 'tabs-and-navs',
  tag: 'Creative',
  html: `<div class="sonic-tabs-sandbox" id="sonic-tabs-container">
  <div class="sonic-nav">
    <canvas class="sonic-canvas"></canvas>
    <button class="sonic-tab-btn active" data-index="0">AMPLITUDE</button>
    <button class="sonic-tab-btn" data-index="1">FREQUENCY</button>
    <button class="sonic-tab-btn" data-index="2">RESONANCE</button>
  </div>
</div>`,
  js: `// Sonic Waveguide active equalizer line simulator
const container = document.getElementById('sonic-tabs-container');
if (container) {
  const canvas = container.querySelector('.sonic-canvas');
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.sonic-tab-btn');
  const nav = container.querySelector('.sonic-nav');
  
  let animId = null;
  let targetX = 0;
  let targetWidth = 0;
  let currentX = 0;
  let currentWidth = 0;
  
  // Wave coordinates
  let waveTime = 0;
  let activePulse = 0;

  const resize = () => {
    canvas.width = nav.clientWidth;
    canvas.height = nav.clientHeight;
    updateTargets();
    currentX = targetX;
    currentWidth = targetWidth;
  };

  const updateTargets = () => {
    const active = container.querySelector('.sonic-tab-btn.active');
    if (active) {
      targetX = active.offsetLeft;
      targetWidth = active.clientWidth;
    }
  };

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

    const centerY = canvas.height - 2;
    waveTime += 0.15;
    
    if (activePulse > 0.05) {
      activePulse *= 0.94; // Decay pulse impact
    }

    ctx.save();
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    
    // Draw glowing sound wave trail
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      // Calculate sine wave modulation centered around the active slider block
      const distance = Math.abs(x - (currentX + currentWidth / 2));
      const factor = Math.max(0, 1 - distance / (currentWidth * 1.5));
      const yOffset = Math.sin(x * 0.06 - waveTime) * (14 * factor * (1 + activePulse * 2.5));
      
      if (x === 0) {
        ctx.moveTo(x, centerY + yOffset);
      } else {
        ctx.lineTo(x, centerY + yOffset);
      }
    }
    
    const grad = ctx.createLinearGradient(currentX, 0, currentX + currentWidth, 0);
    grad.addColorStop(0, 'rgba(236, 72, 153, 0.4)');
    grad.addColorStop(0.5, '#ec4899');
    grad.addColorStop(1, 'rgba(236, 72, 153, 0.4)');
    
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#ec4899';
    ctx.strokeStyle = grad;
    ctx.stroke();
    ctx.restore();

    animId = requestAnimationFrame(animate);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePulse = 1.0; // Trigger equalizer wave spike
      updateTargets();
    });
  });

  resize();
  window.addEventListener('resize', resize);
  animate();
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('sonic-tabs-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.sonic-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.sonic-tab-btn');
  const nav = container.querySelector('.sonic-nav') as HTMLDivElement;
  
  if (ctx) {
    let animId: number;
    let targetX = 0;
    let targetWidth = 0;
    let currentX = 0;
    let currentWidth = 0;
    let waveTime = 0;
    let activePulse = 0;

    const resize = () => {
      canvas.width = nav.clientWidth;
      canvas.height = nav.clientHeight;
      updateTargets();
      currentX = targetX;
      currentWidth = targetWidth;
    };

    const updateTargets = () => {
      const active = container.querySelector('.sonic-tab-btn.active') as HTMLButtonElement | null;
      if (active) {
        targetX = active.offsetLeft;
        targetWidth = active.clientWidth;
      }
    };

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

      const centerY = canvas.height - 2;
      waveTime += 0.15;
      
      if (activePulse > 0.05) {
        activePulse *= 0.94;
      }

      ctx.save();
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const distance = Math.abs(x - (currentX + currentWidth / 2));
        const factor = Math.max(0, 1 - distance / (currentWidth * 1.5));
        const yOffset = Math.sin(x * 0.06 - waveTime) * (14 * factor * (1 + activePulse * 2.5));
        
        if (x === 0) {
          ctx.moveTo(x, centerY + yOffset);
        } else {
          ctx.lineTo(x, centerY + yOffset);
        }
      }
      
      const grad = ctx.createLinearGradient(currentX, 0, currentX + currentWidth, 0);
      grad.addColorStop(0, 'rgba(236, 72, 153, 0.4)');
      grad.addColorStop(0.5, '#ec4899');
      grad.addColorStop(1, 'rgba(236, 72, 153, 0.4)');
      
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ec4899';
      ctx.strokeStyle = grad;
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(animate);
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => (b as HTMLElement).classList.remove('active'));
        btn.classList.add('active');
        activePulse = 1.0;
        updateTargets();
      });
    });

    resize();
    window.addEventListener('resize', resize);
    animate();
  }
}`,
  css: `/* Sonic Waveguide Nav style */
.sonic-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #14050e 0%, #050103 100%);
  border: 1px solid rgba(236, 72, 153, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.sonic-nav {
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 8px 8px 18px 8px; /* Bottom padding leaves space for sound waves */
  gap: 4px;
  z-index: 1;
}

.sonic-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.sonic-tab-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 24px;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  z-index: 2;
  transition: color 0.4s ease;
  letter-spacing: 0.5px;
}

.sonic-tab-btn.active {
  color: #ec4899;
  text-shadow: 0 0 10px rgba(236, 72, 153, 0.6);
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#14050e] to-[#050103] border border-pink-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="sonic-tabs-container">
  <div class="sonic-nav relative flex bg-white/[0.01] border border-white/[0.03] rounded-lg p-2 pb-5.5 gap-1 z-10">
    <canvas class="sonic-canvas absolute top-0 left-0 w-full h-full pointer-events-none z-10"></canvas>
    <button class="sonic-tab-btn active relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#ec4899]" data-index="0">AMPLITUDE</button>
    <button class="sonic-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#ec4899]" data-index="1">FREQUENCY</button>
    <button class="sonic-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#ec4899]" data-index="2">RESONANCE</button>
  </div>
</div>`,
  prompt: 'Design a high-frequency horizontal sound equalizer spectrum waveguide tab bar component.'
};
component.html = component.html.replace('class="sonic-tab-btn active"', 'class="sonic-tab-btn active"');
