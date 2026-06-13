/**
 * Component: Ethereal Smoke Veil 404
 * Category: error-404
 */

export const component = {
  id: 'ethereal-smoke-veil-404',
  name: 'Ethereal Smoke Veil 404',
  category: 'error-404',
  tag: 'Fluid',
  html: `<div class="smoke-sandbox" id="smoke-veil-container">
  <canvas class="smoke-canvas" id="smoke-veil-canvas"></canvas>

  <div class="smoke-overlay">
    <div class="smoke-badge">ETHEREAL VOID</div>
    <h1 class="smoke-title" id="smoke-display-title">404</h1>
    <h3 class="smoke-subtitle">LOST IN THE SHADOWS</h3>
    <p class="smoke-desc">The destination page has dissolved into the dark ether. Move your pointer to sweep away the smoke veil and reveal the portal.</p>
    <a href="#landing" class="smoke-btn">Disperse Ether</a>
  </div>
</div>`,
  js: `// Ethereal Smoke Veil 404
const container = document.getElementById('smoke-veil-container');
if (container) {
  const canvas = container.querySelector('#smoke-veil-canvas');
  const ctx = canvas.getContext('2d');
  const title = container.querySelector('#smoke-display-title');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, px: -1000, py: -1000, active: false };

  // Particles
  const particles = [];
  const maxParticles = 240;

  class SmokeParticle {
    constructor(isFromMouse = false) {
      this.reset(isFromMouse);
    }

    reset(isFromMouse) {
      if (isFromMouse && mouse.active) {
        this.x = mouse.x + (Math.random() - 0.5) * 20;
        this.y = mouse.y + (Math.random() - 0.5) * 20;
      } else {
        // Center or random spawn
        if (Math.random() > 0.4) {
          this.x = width / 2 + (Math.random() - 0.5) * 100;
          this.y = height / 2 + (Math.random() - 0.5) * 100;
        } else {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
        }
      }
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4 - 0.3; // Slight upward drift
      this.size = Math.random() * 25 + 15;
      this.maxLife = Math.random() * 150 + 100;
      this.life = this.maxLife;
      this.alpha = Math.random() * 0.12 + 0.03;
      // Soft smoke colors: white, teal, light purple
      const colors = ['#ffffff', '#a5f3fc', '#e9d5ff', '#818cf8'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.life--;
      if (this.life <= 0) {
        this.reset(false);
      }

      // Add velocity
      this.x += this.vx;
      this.y += this.vy;

      // Friction
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Mouse interactive push/drag force
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          // Vector from previous mouse position to add swirl
          const mdx = mouse.x - mouse.px;
          const mdy = mouse.y - mouse.py;
          
          this.vx += (dx / dist) * force * 0.8 + mdx * force * 0.15;
          this.vy += (dy / dist) * force * 0.8 + mdy * force * 0.15;
        }
      }

      // Border bounds wrapping
      if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
        this.reset(true);
      }
    }

    draw() {
      const lifeRatio = this.life / this.maxLife;
      const currentAlpha = Math.sin(lifeRatio * Math.PI) * this.alpha;

      ctx.save();
      ctx.globalAlpha = currentAlpha;
      ctx.globalCompositeOperation = 'screen';
      
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, 'transparent');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new SmokeParticle(false));
  }

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouse.px = mouse.x;
    mouse.py = mouse.y;
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
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

    // Clear background
    ctx.fillStyle = '#06050b';
    ctx.fillRect(0, 0, width, height);

    // Dynamic scale factor for overlay title blur based on mouse movement/proximity
    let blurVal = 8;
    if (mouse.active) {
      const centerX = width / 2;
      const centerY = height / 2;
      const dist = Math.hypot(mouse.x - centerX, mouse.y - centerY);
      blurVal = Math.min(18, dist / 22);
    }
    title.style.filter = 'blur(' + blurVal + 'px)';

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Slow update mouse prev positions
    mouse.px += (mouse.x - mouse.px) * 0.1;
    mouse.py += (mouse.y - mouse.py) * 0.1;
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
  ts: `// Ethereal Smoke Veil 404 TS Definitions
interface SmokePart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  alpha: number;
  color: string;
  update(): void;
  draw(): void;
  reset(isFromMouse: boolean): void;
}

const container = document.getElementById('smoke-veil-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#smoke-veil-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const title = container.querySelector('#smoke-display-title') as HTMLHeadingElement;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, px: -1000, py: -1000, active: false };
  const particles: SmokePart[] = [];
  const maxParticles = 240;

  class SmokeParticle implements SmokePart {
    x!: number;
    y!: number;
    vx!: number;
    vy!: number;
    size!: number;
    life!: number;
    maxLife!: number;
    alpha!: number;
    color!: string;

    constructor(isFromMouse = false) {
      this.reset(isFromMouse);
    }

    reset(isFromMouse: boolean) {
      if (isFromMouse && mouse.active) {
        this.x = mouse.x + (Math.random() - 0.5) * 20;
        this.y = mouse.y + (Math.random() - 0.5) * 20;
      } else {
        if (Math.random() > 0.4) {
          this.x = width / 2 + (Math.random() - 0.5) * 100;
          this.y = height / 2 + (Math.random() - 0.5) * 100;
        } else {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
        }
      }
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4 - 0.3;
      this.size = Math.random() * 25 + 15;
      this.maxLife = Math.random() * 150 + 100;
      this.life = this.maxLife;
      this.alpha = Math.random() * 0.12 + 0.03;
      const colors = ['#ffffff', '#a5f3fc', '#e9d5ff', '#818cf8'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.life--;
      if (this.life <= 0) {
        this.reset(false);
      }

      this.x += this.vx;
      this.y += this.vy;

      this.vx *= 0.98;
      this.vy *= 0.98;

      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          const mdx = mouse.x - mouse.px;
          const mdy = mouse.y - mouse.py;
          
          this.vx += (dx / dist) * force * 0.8 + mdx * force * 0.15;
          this.vy += (dy / dist) * force * 0.8 + mdy * force * 0.15;
        }
      }

      if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
        this.reset(true);
      }
    }

    draw() {
      const lifeRatio = this.life / this.maxLife;
      const currentAlpha = Math.sin(lifeRatio * Math.PI) * this.alpha;

      ctx.save();
      ctx.globalAlpha = currentAlpha;
      ctx.globalCompositeOperation = 'screen';
      
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, 'transparent');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new SmokeParticle(false));
  }

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container!.getBoundingClientRect();
    mouse.px = mouse.x;
    mouse.py = mouse.y;
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
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

    ctx.fillStyle = '#06050b';
    ctx.fillRect(0, 0, width, height);

    let blurVal = 8;
    if (mouse.active) {
      const centerX = width / 2;
      const centerY = height / 2;
      const dist = Math.hypot(mouse.x - centerX, mouse.y - centerY);
      blurVal = Math.min(18, dist / 22);
    }
    title.style.filter = 'blur(' + blurVal + 'px)';

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    mouse.px += (mouse.x - mouse.px) * 0.1;
    mouse.py += (mouse.y - mouse.py) * 0.1;
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
  css: `/* Ethereal Smoke Veil 404 Styles */
.smoke-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #06050b;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.smoke-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.smoke-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 32px;
  background: rgba(6, 5, 11, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
  pointer-events: auto;
}

.smoke-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 30px;
  background: rgba(165, 243, 252, 0.05);
  border: 1px solid rgba(165, 243, 252, 0.15);
  color: #a5f3fc;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 3px;
  margin-bottom: 18px;
}

.smoke-title {
  font-size: 130px;
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -4px;
  margin-bottom: 12px;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(165, 243, 252, 0.45);
  transition: filter 0.15s ease-out;
  will-change: filter;
}

.smoke-subtitle {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #c084fc;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.smoke-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #cbd5e1;
  margin-bottom: 24px;
}

.smoke-btn {
  display: inline-block;
  padding: 10px 26px;
  border-radius: 30px;
  background: transparent;
  border: 1px solid rgba(192, 132, 252, 0.35);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.smoke-btn:hover {
  background: rgba(192, 132, 252, 0.08);
  border-color: #c084fc;
  box-shadow: 0 0 20px rgba(192, 132, 252, 0.4);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#06050b] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="smoke-veil-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="smoke-veil-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[32px] bg-[#06050b]/40 backdrop-blur-[16px] border border-white/3 rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.7)]">
    <div class="inline-block px-[12px] py-[4px] rounded-[30px] bg-[#a5f3fc]/5 border border-[#a5f3fc]/15 text-[#a5f3fc] text-[10px] font-extrabold tracking-[3px] mb-[18px]">ETHEREAL VOID</div>
    <h1 class="text-[130px] font-black leading-[0.9] tracking-[-4px] mb-[12px] text-white transition-[filter] duration-150 ease-out will-change-[filter]" id="smoke-display-title" style="text-shadow: 0 0 20px rgba(165, 243, 252, 0.45);">404</h1>
    <h3 class="text-[14px] font-extrabold tracking-[2px] text-[#c084fc] mb-[12px] uppercase">LOST IN THE SHADOWS</h3>
    <p class="text-[13.5px] leading-relaxed text-[#cbd5e1] mb-[24px]">The destination page has dissolved into the dark ether. Move your pointer to sweep away the smoke veil and reveal the portal.</p>
    <a href="#landing" class="inline-block px-[26px] py-[10px] rounded-[30px] bg-transparent border border-[#c084fc]/35 text-white text-[13px] font-bold hover:bg-[#c084fc]/8 hover:border-[#c084fc] hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] hover:translate-y-[-1px] transition-all duration-200">Disperse Ether</a>
  </div>
</div>`
};
