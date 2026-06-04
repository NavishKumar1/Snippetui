/**
 * Component: Ether Smoke Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'ether-smoke-tabs',
  name: 'Ether Smoke Tabs',
  category: 'tabs-and-navs',
  tag: 'Luxury',
  html: `<div class="ether-tabs-sandbox" id="ether-tabs-container">
  <div class="ether-nav">
    <canvas class="ether-canvas"></canvas>
    <button class="ether-tab-btn active" data-index="0">NATIVE</button>
    <button class="ether-tab-btn" data-index="1">CLOUDS</button>
    <button class="ether-tab-btn" data-index="2">ETHER</button>
  </div>
</div>`,
  js: `// Ethereal particle smoke layout simulator
const container = document.getElementById('ether-tabs-container');
if (container) {
  const canvas = container.querySelector('.ether-canvas');
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.ether-tab-btn');
  const nav = container.querySelector('.ether-nav');
  
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
    const active = container.querySelector('.ether-tab-btn.active');
    if (active) {
      targetX = active.offsetLeft;
      targetWidth = active.clientWidth;
    }
  };

  // Colored mist particle definitions
  const particles = [];
  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * 200,
      y: Math.random() * 35,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 8 + 4,
      alpha: Math.random() * 0.3 + 0.1,
      color: Math.random() > 0.5 ? '#8a2be2' : '#da70d6'
    });
  }

  const animate = () => {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const lerpSpeed = 0.07;
    currentX += (targetX - currentX) * lerpSpeed;
    currentWidth += (targetWidth - currentWidth) * lerpSpeed;

    const centerX = currentX + currentWidth / 2;
    const centerY = canvas.height / 2;

    // Render ethereal mist particles gathering inside active zone
    particles.forEach(p => {
      // Guide velocity to drift towards selected center point
      const dx = centerX - p.x;
      const dy = centerY - p.y;
      
      p.x += dx * 0.04 + p.vx;
      p.y += dy * 0.04 + p.vy;

      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.filter = 'blur(6px)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
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
const container = document.getElementById('ether-tabs-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.ether-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.ether-tab-btn');
  const nav = container.querySelector('.ether-nav') as HTMLDivElement;
  
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
      const active = container.querySelector('.ether-tab-btn.active') as HTMLButtonElement | null;
      if (active) {
        targetX = active.offsetLeft;
        targetWidth = active.clientWidth;
      }
    };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * 200,
        y: Math.random() * 35,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 8 + 4,
        alpha: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? '#8a2be2' : '#da70d6'
      });
    }

    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const lerpSpeed = 0.07;
      currentX += (targetX - currentX) * lerpSpeed;
      currentWidth += (targetWidth - currentWidth) * lerpSpeed;

      const centerX = currentX + currentWidth / 2;
      const centerY = canvas.height / 2;

      particles.forEach(p => {
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        
        p.x += dx * 0.04 + p.vx;
        p.y += dy * 0.04 + p.vy;

        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.filter = 'blur(6px)';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
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
  css: `/* Ether Smoke Tabs styles */
.ether-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #0f0514 0%, #040106 100%);
  border: 1px solid rgba(138, 43, 226, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.ether-nav {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 30px;
  padding: 4px;
  gap: 4px;
  z-index: 1;
}

.ether-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

.ether-tab-btn {
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

.ether-tab-btn.active {
  color: #da70d6;
  text-shadow: 0 0 10px rgba(218, 112, 214, 0.6);
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#0f0514] to-[#040106] border border-purple-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="ether-tabs-container">
  <div class="ether-nav relative flex bg-white/[0.01] border border-white/[0.03] rounded-full p-1 gap-1 z-10">
    <canvas class="ether-canvas absolute top-0 left-0 pointer-events-none z-10"></canvas>
    <button class="ether-tab-btn active relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#da70d6]" data-index="0">NATIVE</button>
    <button class="ether-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#da70d6]" data-index="1">CLOUDS</button>
    <button class="ether-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#da70d6]" data-index="2">ETHER</button>
  </div>
</div>`,
  prompt: 'Design a dark ethereal gas selector bar navigation with floating purple smoke clouds dynamic sliding.'
};
component.html = component.html.replace('class="ether-tab-btn active"', 'class="ether-tab-btn active"');
