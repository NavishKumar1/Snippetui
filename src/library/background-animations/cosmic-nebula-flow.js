/**
 * Component: Cosmic Nebula Flow
 * Category: background-animations
 */

export const component = {
  id: 'cosmic-nebula-flow',
  name: 'Cosmic Nebula Flow',
  category: 'background-animations',
  tag: 'Premium',
  html: `<div class="nebula-flow-sandbox" id="nebula-flow-container">
  <canvas class="nebula-flow-canvas" id="nebula-flow-canvas-element"></canvas>

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
        <a href="#">Products</a>
        <a href="#">Docs</a>
        <button class="demo-signup-btn">Get Started</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>SaaS Flow</span> Cosmic Fluidity</div>
      <h1 class="demo-headline">Experience organic fluid vector fields in real-time</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Flow</button>
        <button class="demo-secondary-btn">Configure</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Cosmic Nebula Flow - Dynamic noise-field particle simulation
const container = document.getElementById('nebula-flow-container');
if (container) {
  const canvas = container.querySelector('#nebula-flow-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let mouse = { x: width / 2, y: height / 2, active: false, radius: 150 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
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

  // Layered trigonometric function to simulate 2D noise flow field
  const getFieldAngle = (x, y, time) => {
    const angle1 = Math.sin(x * 0.004 + time * 0.02) * Math.cos(y * 0.003 - time * 0.015);
    const angle2 = Math.cos(x * 0.002 - time * 0.01) * Math.sin(y * 0.005 + time * 0.025);
    return (angle1 + angle2) * Math.PI * 2;
  };

  class FlowParticle {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = 0;
      this.vy = 0;
      this.speed = Math.random() * 1.5 + 0.8;
      this.radius = Math.random() * 1.2 + 0.6;
      this.life = Math.random() * 150 + 100;
      this.maxLife = this.life;

      // Deep celestial palette: Indigo, Violet, Neon Cyan
      const r = Math.random();
      if (r < 0.4) {
        this.color = { r: 99, g: 102, b: 241 }; // Indigo
      } else if (r < 0.75) {
        this.color = { r: 168, g: 85, b: 247 }; // Purple
      } else {
        this.color = { r: 6, g: 182, b: 212 }; // Cyan
      }
    }

    update(time) {
      // Get base flow vector
      const angle = getFieldAngle(this.x, this.y, time);
      let targetVx = Math.cos(angle) * this.speed;
      let targetVy = Math.sin(angle) * this.speed;

      // Mouse influence: distort field or push particles
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Rotate particles around mouse
          const swirlAngle = Math.atan2(dy, dx) + Math.PI / 2;
          targetVx += Math.cos(swirlAngle) * force * 3.5;
          targetVy += Math.sin(swirlAngle) * force * 3.5;
        }
      }

      // Smooth interpolation towards target velocity
      this.vx += (targetVx - this.vx) * 0.1;
      this.vy += (targetVy - this.vy) * 0.1;

      this.x += this.vx;
      this.y += this.vy;
      this.life--;

      // Boundary check or life expiration
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.life <= 0) {
        this.reset();
      }
    }

    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.8;
      ctx.beginPath();
      ctx.fillStyle = \`rgba(\${this.color.r}, \${this.color.g}, \${this.color.b}, \${alpha})\`;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Create particle pool
  const particles = Array.from({ length: 280 }, () => new FlowParticle());

  let active = true;
  let frame = 0;
  const loop = () => {
    if (!active) return;

    // Fading trails to create flowing cosmic threads
    ctx.fillStyle = 'rgba(3, 2, 8, 0.08)';
    ctx.fillRect(0, 0, width, height);

    const time = frame * 0.05;
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
  ts: `// Cosmic Nebula Flow TypeScript Logic
const container = document.getElementById('nebula-flow-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#nebula-flow-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: width / 2, y: height / 2, active: false, radius: 150 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
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

  const getFieldAngle = (x: number, y: number, time: number): number => {
    const angle1 = Math.sin(x * 0.004 + time * 0.02) * Math.cos(y * 0.003 - time * 0.015);
    const angle2 = Math.cos(x * 0.002 - time * 0.01) * Math.sin(y * 0.005 + time * 0.025);
    return (angle1 + angle2) * Math.PI * 2;
  };

  interface ColorRGB {
    r: number;
    g: number;
    b: number;
  }

  class FlowParticle {
    x!: number;
    y!: number;
    vx!: number;
    vy!: number;
    speed!: number;
    radius!: number;
    life!: number;
    maxLife!: number;
    color!: ColorRGB;

    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = 0;
      this.vy = 0;
      this.speed = Math.random() * 1.5 + 0.8;
      this.radius = Math.random() * 1.2 + 0.6;
      this.life = Math.random() * 150 + 100;
      this.maxLife = this.life;

      const r = Math.random();
      if (r < 0.4) {
        this.color = { r: 99, g: 102, b: 241 };
      } else if (r < 0.75) {
        this.color = { r: 168, g: 85, b: 247 };
      } else {
        this.color = { r: 6, g: 182, b: 212 };
      }
    }

    update(time: number) {
      const angle = getFieldAngle(this.x, this.y, time);
      let targetVx = Math.cos(angle) * this.speed;
      let targetVy = Math.sin(angle) * this.speed;

      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const swirlAngle = Math.atan2(dy, dx) + Math.PI / 2;
          targetVx += Math.cos(swirlAngle) * force * 3.5;
          targetVy += Math.sin(swirlAngle) * force * 3.5;
        }
      }

      this.vx += (targetVx - this.vx) * 0.1;
      this.vy += (targetVy - this.vy) * 0.1;

      this.x += this.vx;
      this.y += this.vy;
      this.life--;

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.life <= 0) {
        this.reset();
      }
    }

    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.8;
      ctx.beginPath();
      ctx.fillStyle = \`rgba(\${this.color.r}, \${this.color.g}, \${this.color.b}, \${alpha})\`;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 280 }, () => new FlowParticle());

  let active = true;
  let frame = 0;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = 'rgba(3, 2, 8, 0.08)';
    ctx.fillRect(0, 0, width, height);

    const time = frame * 0.05;
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
  css: `/* Cosmic Nebula Flow styles */
.nebula-flow-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #030208;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.nebula-flow-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Create a beautiful 2D mathematical vector flow field that simulates layered glowing cosmic ribbons, reacting dynamically to mouse pointer position with fluid motion trails.'
};
