/**
 * Component: Volcanic Firefly Drift 404
 * Category: error-404
 */

export const component = {
  id: 'volcanic-firefly-drift-404',
  name: 'Volcanic Firefly Drift 404',
  category: 'error-404',
  tag: 'Particles',
  html: `<div class="volcano-sandbox" id="volcano-drift-container">
  <canvas class="volcano-canvas" id="volcano-drift-canvas"></canvas>

  <div class="volcano-overlay">
    <div class="volcano-badge">THERMAL CRITICAL</div>
    <h1 class="volcano-title">404</h1>
    <h3 class="volcano-subtitle">SECTOR ERUPTION</h3>
    <p class="volcano-desc">The requested resource has disintegrated under extreme thermal conditions. Move your cursor to sweep the drifting ash embers.</p>
    <a href="#landing" class="volcano-btn">Evacuate Area</a>
  </div>
</div>`,
  js: `// Volcanic Firefly Drift 404
const container = document.getElementById('volcano-drift-container');
if (container) {
  const canvas = container.querySelector('#volcano-drift-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false, px: -1000, py: -1000 };
  let windX = 0;
  let windY = 0;

  // Embers simulation setup
  const embers = [];
  const emberCount = 130;

  class Ember {
    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : height + 10;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = -(Math.random() * 1.5 + 0.8);
      this.size = Math.random() * 2.5 + 0.8;
      this.alpha = Math.random() * 0.6 + 0.4;
      this.color = Math.random() > 0.4 ? '#ff6a00' : '#ff3c00'; // Orange or red
      this.life = 1.0;
      this.decay = Math.random() * 0.002 + 0.001;
    }

    update() {
      // Wind drift calculations
      this.x += this.vx + windX * 0.15;
      this.y += this.vy + windY * 0.15;

      // Slowly pull back velocities
      this.vx *= 0.98;

      // Decay ember life
      this.life -= this.decay;

      if (this.y < -10 || this.x < -10 || this.x > width + 10 || this.life <= 0) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = this.alpha * this.life;
      ctx.fillStyle = this.color;
      // Glowing embers
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate embers list
  for (let i = 0; i < emberCount; i++) {
    embers.push(new Ember());
  }

  // Mouse vector tracking
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mouse.active) {
      // Compute delta velocity for wind force
      windX = x - mouse.px;
      windY = y - mouse.py;
    }

    mouse.x = x;
    mouse.y = y;
    mouse.px = x;
    mouse.py = y;
    mouse.active = true;

    // Apply immediate local force to nearby embers
    embers.forEach(ember => {
      const dx = ember.x - x;
      const dy = ember.y - y;
      const dist = Math.hypot(dx, dy);

      if (dist < 100) {
        const force = (100 - dist) / 100;
        ember.vx += (dx / dist) * force * 5.0;
      }
    });
  };

  const handleMouseLeave = () => {
    mouse.active = false;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  // Tab suspension & IntersectionObserver check
  let visible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  const handleVisibility = () => {
    visible = !document.hidden;
  };
  document.addEventListener('visibilitychange', handleVisibility);

  let active = true;
  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    // Volcanic ash deep gradient backdrop
    ctx.fillStyle = '#060202';
    ctx.fillRect(0, 0, width, height);

    // Dynamic fire glows
    const thermalGlow = ctx.createRadialGradient(width / 2, height, 0, width / 2, height, height * 0.75);
    thermalGlow.addColorStop(0, 'rgba(255, 60, 0, 0.08)');
    thermalGlow.addColorStop(0.5, 'rgba(255, 106, 0, 0.03)');
    thermalGlow.addColorStop(1, 'rgba(6, 2, 2, 0)');
    ctx.fillStyle = thermalGlow;
    ctx.fillRect(0, 0, width, height);

    // Slowly decay dynamic wind gusts
    windX *= 0.95;
    windY *= 0.95;

    // Update & draw embers
    embers.forEach(ember => {
      ember.update();
      ember.draw();
    });
  };

  loop();

  // Cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  ts: `// Volcanic Firefly Drift 404 TS Definitions
interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  decay: number;
  reset(init?: boolean): void;
  update(): void;
  draw(): void;
}

const container = document.getElementById('volcano-drift-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#volcano-drift-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false, px: -1000, py: -1000 };
  let windX = 0;
  let windY = 0;

  const embers: EmberParticle[] = [];
  const emberCount = 130;

  class Ember implements EmberParticle {
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    size: number = 0;
    alpha: number = 0;
    color: string = '';
    life: number = 1.0;
    decay: number = 0;

    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : height + 10;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = -(Math.random() * 1.5 + 0.8);
      this.size = Math.random() * 2.5 + 0.8;
      this.alpha = Math.random() * 0.6 + 0.4;
      this.color = Math.random() > 0.4 ? '#ff6a00' : '#ff3c00';
      this.life = 1.0;
      this.decay = Math.random() * 0.002 + 0.001;
    }

    update() {
      this.x += this.vx + windX * 0.15;
      this.y += this.vy + windY * 0.15;
      this.vx *= 0.98;
      this.life -= this.decay;

      if (this.y < -10 || this.x < -10 || this.x > width + 10 || this.life <= 0) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = this.alpha * this.life;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < emberCount; i++) {
    embers.push(new Ember());
  }

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mouse.active) {
      windX = x - mouse.px;
      windY = y - mouse.py;
    }

    mouse.x = x;
    mouse.y = y;
    mouse.px = x;
    mouse.py = y;
    mouse.active = true;

    embers.forEach(ember => {
      const dx = ember.x - x;
      const dy = ember.y - y;
      const dist = Math.hypot(dx, dy);

      if (dist < 100) {
        const force = (100 - dist) / 100;
        ember.vx += (dx / dist) * force * 5.0;
      }
    });
  };

  const handleMouseLeave = () => {
    mouse.active = false;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  const resize = () => {
    width = canvas.width = container!.clientWidth;
    height = canvas.height = container!.clientHeight;
  };
  window.addEventListener('resize', resize);

  let visible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  const handleVisibility = () => {
    visible = !document.hidden;
  };
  document.addEventListener('visibilitychange', handleVisibility);

  let active = true;
  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    ctx.fillStyle = '#060202';
    ctx.fillRect(0, 0, width, height);

    const thermalGlow = ctx.createRadialGradient(width / 2, height, 0, width / 2, height, height * 0.75);
    thermalGlow.addColorStop(0, 'rgba(255, 60, 0, 0.08)');
    thermalGlow.addColorStop(0.5, 'rgba(255, 106, 0, 0.03)');
    thermalGlow.addColorStop(1, 'rgba(6, 2, 2, 0)');
    ctx.fillStyle = thermalGlow;
    ctx.fillRect(0, 0, width, height);

    windX *= 0.95;
    windY *= 0.95;

    embers.forEach(ember => {
      ember.update();
      ember.draw();
    });
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    container!.removeEventListener('mousemove', handleMouseMove);
    container!.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  css: `/* Volcanic Firefly Drift 404 Styles */
.volcano-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #060202;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.volcano-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.volcano-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(6, 2, 2, 0.5);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 106, 0, 0.1);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  pointer-events: auto;
}

.volcano-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(255, 60, 0, 0.08);
  border: 1px solid rgba(255, 60, 0, 0.2);
  color: #ff6a00;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.volcano-title {
  font-size: 110px;
  font-weight: 950;
  line-height: 0.9;
  letter-spacing: -2px;
  margin-bottom: 12px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255, 60, 0, 0.5);
}

.volcano-subtitle {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #ff6a00;
  margin-bottom: 12px;
}

.volcano-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #a0aec0;
  margin-bottom: 24px;
}

.volcano-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(255, 106, 0, 0.3);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.volcano-btn:hover {
  background: rgba(255, 60, 0, 0.06);
  border-color: #ff6a00;
  box-shadow: 0 0 15px rgba(255, 106, 0, 0.4);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#060202] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="volcano-drift-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="volcano-drift-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#060202]/50 backdrop-blur-[14px] border border-white/5 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
    <div class="inline-block px-[10px] py-[4px] rounded-[20px] bg-[#ff3c00]/8 border border-[#ff3c00]/20 text-[#ff6a00] text-[11px] font-extrabold tracking-[2px] mb-[16px]">THERMAL CRITICAL</div>
    <h1 class="text-[110px] font-black leading-none tracking-[-2px] mb-[12px] text-white" style="text-shadow: 0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(255, 60, 0, 0.5);">404</h1>
    <h3 class="text-[14px] font-extrabold tracking-[2px] text-[#ff6a00] mb-[12px]">SECTOR ERUPTION</h3>
    <p class="text-[13.5px] leading-relaxed text-[#a0aec0] mb-[24px]">The requested resource has disintegrated under extreme thermal conditions. Move your cursor to sweep the drifting ash embers.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[8px] bg-transparent border border-white/5 hover:bg-white/10 hover:border-[#ff6a00] hover:shadow-[0_0_15px_rgba(255,106,0,0.4)] hover:translate-y-[-1px] transition-all duration-200">Evacuate Area</a>
  </div>
</div>`
};
