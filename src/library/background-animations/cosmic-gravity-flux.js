/**
 * Component: Cosmic Gravity Flux
 * Category: background-animations
 */

export const component = {
  id: 'cosmic-gravity-flux',
  name: 'Cosmic Gravity Flux',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="cosmic-sandbox" id="cosmic-sandbox-container">
  <canvas class="cosmic-canvas" id="cosmic-canvas-element"></canvas>

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
        <a href="#">Enterprise</a>
        <a href="#">Showcase</a>
        <button class="demo-signup-btn">Explore Now</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>Billion Dollar Look</span> Ultra-premium physics</div>
      <h1 class="demo-headline">Warp space-time with dynamic gravitational fluid dynamics</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Warp</button>
        <button class="demo-secondary-btn">Read Specs</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Cosmic Gravity Flux Nebula Particle Physics
const container = document.getElementById('cosmic-sandbox-container');
if (container) {
  const canvas = container.querySelector('#cosmic-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let mouse = { x: width / 2, y: height / 2, lastX: width / 2, lastY: height / 2, vx: 0, vy: 0, active: false };
  let gravityCenter = { x: width / 2, y: height / 2 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
    
    // Smoothly drag gravity center to mouse position
    gravityCenter.x += (mouse.x - gravityCenter.x) * 0.12;
    gravityCenter.y += (mouse.y - gravityCenter.y) * 0.12;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Handle resizing
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    if (!mouse.active) {
      gravityCenter.x = width / 2;
      gravityCenter.y = height / 2;
    }
  };
  window.addEventListener('resize', resize);

  class CosmicParticle {
    constructor() {
      this.reset();
      // Start at random positions
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = gravityCenter.x + (Math.random() - 0.5) * 50;
      this.y = gravityCenter.y + (Math.random() - 0.5) * 50;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = Math.random() * 1.5 + 0.5;
      
      // Volumetric colors: neon cyan, magenta, violet
      const r = Math.random();
      if (r < 0.35) {
        this.color = { r: 0, g: 242, b: 254 }; // Cyan
      } else if (r < 0.7) {
        this.color = { r: 236, g: 72, b: 153 }; // Pink/Magenta
      } else {
        this.color = { r: 139, g: 92, b: 246 }; // Violet
      }
      this.life = Math.random() * 200 + 100;
      this.maxLife = this.life;
    }

    update() {
      const dx = gravityCenter.x - this.x;
      const dy = gravityCenter.y - this.y;
      const dist = Math.hypot(dx, dy);
      
      if (dist < 5) {
        this.reset();
        return;
      }

      // Gravitational attraction force (inverse square law approximation)
      const force = Math.min(100 / (dist * dist + 1000), 0.4);
      
      // Pull towards gravity center
      this.vx += (dx / dist) * force + (Math.random() - 0.5) * 0.05;
      this.vy += (dy / dist) * force + (Math.random() - 0.5) * 0.05;

      // Add a slight tangential orbit force
      const orbitDirX = -dy / dist;
      const orbitDirY = dx / dist;
      const orbitStrength = 0.08;
      this.vx += orbitDirX * orbitStrength;
      this.vy += orbitDirY * orbitStrength;

      // Drag friction
      this.vx *= 0.98;
      this.vy *= 0.98;

      this.x += this.vx;
      this.y += this.vy;
      this.life--;

      if (this.life <= 0) {
        this.reset();
      }
    }

    draw() {
      const speed = Math.hypot(this.vx, this.vy);
      const alpha = Math.min(this.life / 100, 1.0) * (speed / 3 + 0.2);
      ctx.beginPath();
      ctx.fillStyle = \`rgba(\${this.color.r}, \${this.color.g}, \${this.color.b}, \${alpha * 0.75})\`;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Optimize particle count for high-performance rendering (e.g., 220 particles)
  const particles = Array.from({ length: 220 }, () => new CosmicParticle());

  // Scoped Render Loop
  let active = true;
  const loop = () => {
    if (!active) return;

    // Fading background creates beautiful motion trails
    ctx.fillStyle = 'rgba(5, 5, 8, 0.12)';
    ctx.fillRect(0, 0, width, height);

    if (!mouse.active) {
      // Idle gravitational oscillation
      const time = Date.now() * 0.001;
      gravityCenter.x = width / 2 + Math.sin(time) * 120;
      gravityCenter.y = height / 2 + Math.cos(time * 0.8) * 80;
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  // Scoped cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  ts: `// Cosmic Gravity Flux TypeScript Logic
const container = document.getElementById('cosmic-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#cosmic-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: width / 2, y: height / 2, lastX: width / 2, lastY: height / 2, vx: 0, vy: 0, active: false };
  const gravityCenter = { x: width / 2, y: height / 2 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
    gravityCenter.x += (mouse.x - gravityCenter.x) * 0.12;
    gravityCenter.y += (mouse.y - gravityCenter.y) * 0.12;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    if (!mouse.active) {
      gravityCenter.x = width / 2;
      gravityCenter.y = height / 2;
    }
  };
  window.addEventListener('resize', resize);

  interface ColorRGB {
    r: number;
    g: number;
    b: number;
  }

  class CosmicParticle {
    x!: number;
    y!: number;
    vx!: number;
    vy!: number;
    radius!: number;
    color!: ColorRGB;
    life!: number;
    maxLife!: number;

    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = gravityCenter.x + (Math.random() - 0.5) * 50;
      this.y = gravityCenter.y + (Math.random() - 0.5) * 50;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = Math.random() * 1.5 + 0.5;
      
      const r = Math.random();
      if (r < 0.35) {
        this.color = { r: 0, g: 242, b: 254 };
      } else if (r < 0.7) {
        this.color = { r: 236, g: 72, b: 153 };
      } else {
        this.color = { r: 139, g: 92, b: 246 };
      }
      this.life = Math.random() * 200 + 100;
      this.maxLife = this.life;
    }

    update() {
      const dx = gravityCenter.x - this.x;
      const dy = gravityCenter.y - this.y;
      const dist = Math.hypot(dx, dy);
      
      if (dist < 5) {
        this.reset();
        return;
      }

      const force = Math.min(100 / (dist * dist + 1000), 0.4);
      this.vx += (dx / dist) * force + (Math.random() - 0.5) * 0.05;
      this.vy += (dy / dist) * force + (Math.random() - 0.5) * 0.05;

      const orbitDirX = -dy / dist;
      const orbitDirY = dx / dist;
      const orbitStrength = 0.08;
      this.vx += orbitDirX * orbitStrength;
      this.vy += orbitDirY * orbitStrength;

      this.vx *= 0.98;
      this.vy *= 0.98;

      this.x += this.vx;
      this.y += this.vy;
      this.life--;

      if (this.life <= 0) {
        this.reset();
      }
    }

    draw() {
      const speed = Math.hypot(this.vx, this.vy);
      const alpha = Math.min(this.life / 100, 1.0) * (speed / 3 + 0.2);
      ctx.beginPath();
      ctx.fillStyle = \`rgba(\${this.color.r}, \${this.color.g}, \${this.color.b}, \${alpha * 0.75})\`;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 220 }, () => new CosmicParticle());

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = 'rgba(5, 5, 8, 0.12)';
    ctx.fillRect(0, 0, width, height);

    if (!mouse.active) {
      const time = Date.now() * 0.001;
      gravityCenter.x = width / 2 + Math.sin(time) * 120;
      gravityCenter.y = height / 2 + Math.cos(time * 0.8) * 80;
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Cosmic Gravity Flux Styles */
.cosmic-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #050508;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.cosmic-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design a highly premium volumetric gravity flux cosmic nebula background animation with pointer gravity orbit attraction, motion trails, and vibrant violet-cyan color interpolation.'
};
