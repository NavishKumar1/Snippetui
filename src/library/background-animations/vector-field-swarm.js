/**
 * Component: Vector Field Swarm
 * Category: background-animations
 */

export const component = {
  id: 'vector-field-swarm',
  name: 'Vector Field Swarm',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="vector-swarm-sandbox" id="vector-swarm-container">
  <canvas class="vector-swarm-canvas" id="vector-swarm-canvas-element"></canvas>

  <!-- Branded Demo Mockup Overlay -->
  <div class="demo-overlay-content">
    <header class="demo-nav">
      <div class="demo-logo">
        <svg class="demo-logo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <span>SnippetUI</span>
      </div>
      <nav class="demo-links">
        <a href="#">Vectors</a>
        <a href="#">API</a>
        <button class="demo-signup-btn">Calibrate Field</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>Mathematical Model</span> Vector Swarm</div>
      <h1 class="demo-headline">Particles flowing along complex dynamical vector equations</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Toggle Fields</button>
        <button class="demo-secondary-btn">Reset Swarm</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Vector Field Swarm - Trigonometric velocity grid with flowing neon particle trails
const container = document.getElementById('vector-swarm-container');
if (container) {
  const canvas = container.querySelector('#vector-swarm-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let mouse = { x: -1000, y: -1000, active: false, vx: 0, vy: 0, lastX: 0, lastY: 0 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;
    
    if (mouse.active) {
      mouse.vx = curX - mouse.lastX;
      mouse.vy = curY - mouse.lastY;
    }
    mouse.x = curX;
    mouse.y = curY;
    mouse.lastX = curX;
    mouse.lastY = curY;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Handle resizing
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  // Field mathematical functions
  const getFieldVelocity = (x, y, time) => {
    // Vector equation combining trigonometric wave scales
    const vx = Math.sin(y * 0.006 + time) * 1.5;
    const vy = Math.cos(x * 0.006 - time * 0.8) * 1.5;
    return { x: vx, y: vy };
  };

  class SwarmParticle {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.radius = Math.random() * 1.0 + 0.5;
      this.life = Math.random() * 180 + 60;
      this.maxLife = this.life;
      this.color = Math.random() < 0.5 ? '#f43f5e' : '#3b82f6'; // Rose & Blue
    }

    update(time) {
      const vel = getFieldVelocity(this.x, this.y, time);

      // Force particles along the vector field
      this.vx += (vel.x - this.vx) * 0.08;
      this.vy += (vel.y - this.vy) * 0.08;

      // Mouse drag force injection
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.vx += mouse.vx * force * 0.25;
          this.vy += mouse.vy * force * 0.25;
        }
      }

      this.x += this.vx;
      this.y += this.vy;
      this.life--;

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.life <= 0) {
        this.reset();
      }
    }

    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.7;
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.globalAlpha = alpha;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 260 }, () => new SwarmParticle());

  let active = true;
  let frame = 0;
  const loop = () => {
    if (!active) return;

    // Volumetric trailing fill
    ctx.fillStyle = 'rgba(2, 1, 5, 0.12)';
    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = 1.0;
    const time = frame * 0.015;

    // Draw mathematical vector grid lines in low opacity background
    const step = 45;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';
    ctx.lineWidth = 1.0;
    for (let x = step / 2; x < width; x += step) {
      for (let y = step / 2; y < height; y += step) {
        const vel = getFieldVelocity(x, y, time);
        const len = 12;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vel.x * len, y + vel.y * len);
        ctx.stroke();
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update(time);
      p.draw();
    });

    frame++;
    requestAnimationFrame(loop);
  };
  loop();

  // Scoped cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  ts: `// Vector Field Swarm TypeScript Logic
const container = document.getElementById('vector-swarm-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#vector-swarm-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false, vx: 0, vy: 0, lastX: 0, lastY: 0 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;
    
    if (mouse.active) {
      mouse.vx = curX - mouse.lastX;
      mouse.vy = curY - mouse.lastY;
    }
    mouse.x = curX;
    mouse.y = curY;
    mouse.lastX = curX;
    mouse.lastY = curY;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  interface Vector {
    x: number;
    y: number;
  }

  const getFieldVelocity = (x: number, y: number, time: number): Vector => {
    const vx = Math.sin(y * 0.006 + time) * 1.5;
    const vy = Math.cos(x * 0.006 - time * 0.8) * 1.5;
    return { x: vx, y: vy };
  };

  class SwarmParticle {
    x!: number;
    y!: number;
    vx!: number;
    vy!: number;
    radius!: number;
    life!: number;
    maxLife!: number;
    color!: string;

    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.radius = Math.random() * 1.0 + 0.5;
      this.life = Math.random() * 180 + 60;
      this.maxLife = this.life;
      this.color = Math.random() < 0.5 ? '#f43f5e' : '#3b82f6';
    }

    update(time: number) {
      const vel = getFieldVelocity(this.x, this.y, time);

      this.vx += (vel.x - this.vx) * 0.08;
      this.vy += (vel.y - this.vy) * 0.08;

      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.vx += mouse.vx * force * 0.25;
          this.vy += mouse.vy * force * 0.25;
        }
      }

      this.x += this.vx;
      this.y += this.vy;
      this.life--;

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.life <= 0) {
        this.reset();
      }
    }

    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.7;
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.globalAlpha = alpha;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 260 }, () => new SwarmParticle());

  let active = true;
  let frame = 0;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = 'rgba(2, 1, 5, 0.12)';
    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = 1.0;
    const time = frame * 0.015;

    const step = 45;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';
    ctx.lineWidth = 1.0;
    for (let x = step / 2; x < width; x += step) {
      for (let y = step / 2; y < height; y += step) {
        const vel = getFieldVelocity(x, y, time);
        const len = 12;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vel.x * len, y + vel.y * len);
        ctx.stroke();
      }
    }

    particles.forEach(p => {
      p.update(time);
      p.draw();
    });

    frame++;
    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Vector Field Swarm styles */
.vector-swarm-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #020105;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.vector-swarm-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Create an analytical vector grid field with particles flowing along trigonometric velocity equations perturbed by cursor drag speeds.'
};
