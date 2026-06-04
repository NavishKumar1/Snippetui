/**
 * Component: Glossy Physics Balls
 * Category: background-animations
 */

export const component = {
  id: 'glossy-physics-balls',
  name: 'Glossy Physics Balls',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="physics-balls-container" id="physics-balls-sandbox">
  <canvas class="physics-canvas" id="physics-balls-canvas"></canvas>

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
        <a href="#">Features</a>
        <a href="#">About</a>
        <button class="demo-signup-btn">Sign up</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>NEW</span> Just shipped v2.0</div>
      <h1 class="demo-headline">Interactive physics elements at your fingertips!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Glossy Physics Balls 2D elastic collision physics engine
const container = document.getElementById('physics-balls-sandbox');
if (container) {
  const canvas = container.querySelector('#physics-balls-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Track cursor position and velocity delta
  let mouse = { x: -1000, y: -1000, lastX: -1000, lastY: -1000, vx: 0, vy: 0, radius: 60 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;

    if (mouse.lastX !== -1000) {
      mouse.vx = curX - mouse.lastX;
      mouse.vy = curY - mouse.lastY;
    }
    mouse.x = curX;
    mouse.y = curY;
    mouse.lastX = curX;
    mouse.lastY = curY;
  });

  container.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.vx = 0;
    mouse.vy = 0;
  });

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  const colors = [
    { base: '#3b82f6', specular: '#93c5fd', border: '#1d3b73' }, // Premium Royal Blue
    { base: '#6366f1', specular: '#c7d2fe', border: '#312e81' }, // Premium Indigo/Violet
    { base: '#d1d5db', specular: '#ffffff', border: '#4b5563' }, // Glossy Silver/White
    { base: '#1f2937', specular: '#9ca3af', border: '#030712' }  // Sleek Dark Obsidian/Black
  ];

  class Ball {
    constructor() {
      this.radius = Math.random() * 16 + 14;
      this.mass = this.radius;
      this.x = Math.random() * (width - this.radius * 2) + this.radius;
      this.y = Math.random() * (height - this.radius * 2) + this.radius;
      this.vx = (Math.random() - 0.5) * 3;
      this.vy = (Math.random() - 0.5) * 3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      // Wall boundaries bounce
      if (this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx *= -0.85;
      }
      if (this.x + this.radius > width) {
        this.x = width - this.radius;
        this.vx *= -0.85;
      }
      if (this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy *= -0.85;
      }
      if (this.y + this.radius > height) {
        this.y = height - this.radius;
        this.vy *= -0.85;
      }

      // Cursor interaction force
      if (mouse.x !== -1000) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const minDist = this.radius + mouse.radius;

        if (dist < minDist) {
          const force = (minDist - dist) / minDist;
          const angle = Math.atan2(dy, dx);
          
          // Scatter particles dynamically based on cursor sweep velocity
          const pushX = Math.cos(angle) * force * 5;
          const pushY = Math.sin(angle) * force * 5;
          
          this.vx += pushX + mouse.vx * 0.12;
          this.vy += pushY + mouse.vy * 0.12;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      // Gentle friction/dampening
      this.vx *= 0.985;
      this.vy *= 0.985;
    }

    draw() {
      ctx.beginPath();
      // Volumetric 3D glossy gradient bubble highlight shading
      const grad = ctx.createRadialGradient(
        this.x - this.radius * 0.35, this.y - this.radius * 0.35, 0,
        this.x, this.y, this.radius
      );
      grad.addColorStop(0, this.color.specular);
      grad.addColorStop(0.25, this.color.base);
      grad.addColorStop(1, this.color.border);

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 6;

      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = 'transparent'; // Reset shadows
    }
  }

  const balls = Array.from({ length: 28 }, () => new Ball());

  // Ball-to-ball elastic collision resolution
  function resolveCollisions() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const b1 = balls[i];
        const b2 = balls[j];

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const dist = Math.hypot(dx, dy);
        const minDist = b1.radius + b2.radius;

        if (dist < minDist) {
          // 1. Separate overlapping balls to prevent clipping
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;

          b1.x -= nx * overlap * 0.5;
          b1.y -= ny * overlap * 0.5;
          b2.x += nx * overlap * 0.5;
          b2.y += ny * overlap * 0.5;

          // 2. Elastic 2D vector physics bounce
          const kx = b1.vx - b2.vx;
          const ky = b1.vy - b2.vy;
          const p = 2 * (nx * kx + ny * ky) / (b1.mass + b2.mass);

          b1.vx -= p * b2.mass * nx;
          b1.vy -= p * b2.mass * ny;
          b2.vx += p * b1.mass * nx;
          b2.vy += p * b1.mass * ny;
        }
      }
    }
  }

  let active = true;
  const loop = () => {
    if (!active) return;
    ctx.fillStyle = '#08080d';
    ctx.fillRect(0, 0, width, height);

    // Decay cursor speeds to avoid infinite accelerations
    mouse.vx *= 0.8;
    mouse.vy *= 0.8;

    resolveCollisions();

    balls.forEach(ball => {
      ball.update();
      ball.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('physics-balls-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#physics-balls-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, lastX: -1000, lastY: -1000, vx: 0, vy: 0, radius: 60 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;

    if (mouse.lastX !== -1000) {
      mouse.vx = curX - mouse.lastX;
      mouse.vy = curY - mouse.lastY;
    }
    mouse.x = curX;
    mouse.y = curY;
    mouse.lastX = curX;
    mouse.lastY = curY;
  });

  container.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.vx = 0;
    mouse.vy = 0;
  });

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  const colors = [
    { base: '#3b82f6', specular: '#93c5fd', border: '#1d3b73' },
    { base: '#6366f1', specular: '#c7d2fe', border: '#312e81' },
    { base: '#d1d5db', specular: '#ffffff', border: '#4b5563' },
    { base: '#1f2937', specular: '#9ca3af', border: '#030712' }
  ];

  class Ball {
    radius!: number;
    mass!: number;
    x!: number;
    y!: number;
    vx!: number;
    vy!: number;
    color!: { base: string; specular: string; border: string };

    constructor() {
      this.radius = Math.random() * 16 + 14;
      this.mass = this.radius;
      this.x = Math.random() * (width - this.radius * 2) + this.radius;
      this.y = Math.random() * (height - this.radius * 2) + this.radius;
      this.vx = (Math.random() - 0.5) * 3;
      this.vy = (Math.random() - 0.5) * 3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      if (this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx *= -0.85;
      }
      if (this.x + this.radius > width) {
        this.x = width - this.radius;
        this.vx *= -0.85;
      }
      if (this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy *= -0.85;
      }
      if (this.y + this.radius > height) {
        this.y = height - this.radius;
        this.vy *= -0.85;
      }

      if (mouse.x !== -1000) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const minDist = this.radius + mouse.radius;

        if (dist < minDist) {
          const force = (minDist - dist) / minDist;
          const angle = Math.atan2(dy, dx);
          
          const pushX = Math.cos(angle) * force * 5;
          const pushY = Math.sin(angle) * force * 5;
          
          this.vx += pushX + mouse.vx * 0.12;
          this.vy += pushY + mouse.vy * 0.12;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      this.vx *= 0.985;
      this.vy *= 0.985;
    }

    draw() {
      ctx.beginPath();
      const grad = ctx.createRadialGradient(
        this.x - this.radius * 0.35, this.y - this.radius * 0.35, 0,
        this.x, this.y, this.radius
      );
      grad.addColorStop(0, this.color.specular);
      grad.addColorStop(0.25, this.color.base);
      grad.addColorStop(1, this.color.border);

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 6;

      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = 'transparent';
    }
  }

  const balls = Array.from({ length: 28 }, () => new Ball());

  function resolveCollisions() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const b1 = balls[i];
        const b2 = balls[j];

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const dist = Math.hypot(dx, dy);
        const minDist = b1.radius + b2.radius;

        if (dist < minDist) {
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;

          b1.x -= nx * overlap * 0.5;
          b1.y -= ny * overlap * 0.5;
          b2.x += nx * overlap * 0.5;
          b2.y += ny * overlap * 0.5;

          const kx = b1.vx - b2.vx;
          const ky = b1.vy - b2.vy;
          const p = 2 * (nx * kx + ny * ky) / (b1.mass + b2.mass);

          b1.vx -= p * b2.mass * nx;
          b1.vy -= p * b2.mass * ny;
          b2.vx += p * b1.mass * nx;
          b2.vy += p * b1.mass * ny;
        }
      }
    }
  }

  let active = true;
  const loop = () => {
    if (!active) return;
    ctx.fillStyle = '#08080d';
    ctx.fillRect(0, 0, width, height);

    mouse.vx *= 0.8;
    mouse.vy *= 0.8;

    resolveCollisions();

    balls.forEach(ball => {
      ball.update();
      ball.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Glossy Physics Balls styles */
.physics-balls-container {
  position: relative;
  width: 100%;
  height: 480px;
  background: #08080d;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.physics-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<div class="relative w-full h-[480px] bg-[#08080d] rounded-[24px] overflow-hidden" id="physics-balls-sandbox">
  <canvas class="w-full h-full block" id="physics-balls-canvas"></canvas>

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
        <a href="#">Features</a>
        <a href="#">About</a>
        <button class="demo-signup-btn">Sign up</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>NEW</span> Just shipped v2.0</div>
      <h1 class="demo-headline">Interactive physics elements at your fingertips!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design a highly creative glossy 3D floating glass physics balls background animation reacting elastically to cursor collisions.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
