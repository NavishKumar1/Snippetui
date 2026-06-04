/**
 * Component: Biolume Fluid Swarm
 * Category: background-animations
 */

export const component = {
  id: 'biolume-fluid-swarm',
  name: 'Biolume Fluid Swarm',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="biolume-sandbox" id="biolume-sandbox-container">
  <canvas class="biolume-canvas" id="biolume-canvas-element"></canvas>

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
        <a href="#">Technology</a>
        <a href="#">Research</a>
        <button class="demo-signup-btn">Launch Console</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>Bioluminescent</span> Swarm Physics</div>
      <h1 class="demo-headline">Immerse users in organic, fluid-like micro-particle behaviors</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Swarm</button>
        <button class="demo-secondary-btn">View Documentation</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Biolume Fluid Swarm Simulation (Boids Flocking + Fluid Trails)
const container = document.getElementById('biolume-sandbox-container');
if (container) {
  const canvas = container.querySelector('#biolume-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let mouse = { x: -1000, y: -1000, active: false };

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

  // Swarm Boid class
  class BiolumeBoid {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4;
      this.radius = Math.random() * 2 + 1.2;
      this.maxSpeed = Math.random() * 2 + 3.0;
      this.maxForce = 0.12;
      
      // Beautiful ocean bioluminescent shades (cyan, emerald, blue)
      const r = Math.random();
      if (r < 0.45) {
        this.color = '#00f2fe'; // Neon Cyan
      } else if (r < 0.8) {
        this.color = '#10b981'; // Emerald Green
      } else {
        this.color = '#3b82f6'; // Bright Blue
      }
    }

    update(boids) {
      // 1. Swarm Flocking Behaviors
      let alignmentX = 0, alignmentY = 0;
      let cohesionX = 0, cohesionY = 0;
      let separationX = 0, separationY = 0;
      let totalNeighbors = 0;

      const perceptionRadius = 60;
      const separationRadius = 24;

      boids.forEach(other => {
        if (other === this) return;
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < perceptionRadius) {
          alignmentX += other.vx;
          alignmentY += other.vy;

          cohesionX += other.x;
          cohesionY += other.y;

          totalNeighbors++;

          if (dist < separationRadius) {
            // Push away
            separationX -= dx / (dist * dist + 0.1);
            separationY -= dy / (dist * dist + 0.1);
          }
        }
      });

      if (totalNeighbors > 0) {
        // Average alignment
        alignmentX /= totalNeighbors;
        alignmentY /= totalNeighbors;
        const alignMag = Math.hypot(alignmentX, alignmentY);
        if (alignMag > 0) {
          alignmentX = (alignmentX / alignMag) * this.maxSpeed - this.vx;
          alignmentY = (alignmentY / alignMag) * this.maxSpeed - this.vy;
        }

        // Average cohesion
        cohesionX /= totalNeighbors;
        cohesionY /= totalNeighbors;
        let steerX = cohesionX - this.x;
        let steerY = cohesionY - this.y;
        const steerMag = Math.hypot(steerX, steerY);
        if (steerMag > 0) {
          steerX = (steerX / steerMag) * this.maxSpeed - this.vx;
          steerY = (steerY / steerMag) * this.maxSpeed - this.vy;
        }

        // Apply forces
        this.vx += (alignmentX * 0.4 + steerX * 0.25 + separationX * 1.5) * this.maxForce;
        this.vy += (alignmentY * 0.4 + steerY * 0.25 + separationY * 1.5) * this.maxForce;
      }

      // 2. Mouse Attraction
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          // Volumetric pull
          const pull = (220 - dist) / 220;
          this.vx += (dx / dist) * pull * 0.25;
          this.vy += (dy / dist) * pull * 0.25;
        }
      }

      // Apply coordinates shift
      this.x += this.vx;
      this.y += this.vy;

      // Speed Clamping
      const speed = Math.hypot(this.vx, this.vy);
      if (speed > this.maxSpeed) {
        this.vx = (this.vx / speed) * this.maxSpeed;
        this.vy = (this.vy / speed) * this.maxSpeed;
      }

      // Boundary wraps
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
    }

    draw() {
      // Draw boid as a miniature glowing comet
      const speed = Math.hypot(this.vx, this.vy);
      const angle = Math.atan2(this.vy, this.vx);

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(angle);

      // Core particle
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();

      // Tail trail representation
      ctx.beginPath();
      const grad = ctx.createLinearGradient(0, 0, -speed * 3.5, 0);
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.radius * 1.5;
      ctx.moveTo(0, 0);
      ctx.lineTo(-speed * 3.5, 0);
      ctx.stroke();

      ctx.restore();
    }
  }

  // 120 flocking boids
  const boids = Array.from({ length: 120 }, () => new BiolumeBoid());

  let active = true;
  const loop = () => {
    if (!active) return;

    // Organic trailing: clear slightly transparent to maintain comet trails
    ctx.fillStyle = 'rgba(3, 4, 8, 0.09)';
    ctx.fillRect(0, 0, width, height);

    boids.forEach(b => {
      b.update(boids);
      b.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  ts: `// Biolume Fluid Swarm TypeScript Logic
const container = document.getElementById('biolume-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#biolume-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

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

  class BiolumeBoid {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    maxSpeed: number;
    maxForce: number;
    color: string;

    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4;
      this.radius = Math.random() * 2 + 1.2;
      this.maxSpeed = Math.random() * 2 + 3.0;
      this.maxForce = 0.12;
      
      const r = Math.random();
      if (r < 0.45) {
        this.color = '#00f2fe';
      } else if (r < 0.8) {
        this.color = '#10b981';
      } else {
        this.color = '#3b82f6';
      }
    }

    update(boids: BiolumeBoid[]) {
      let alignmentX = 0, alignmentY = 0;
      let cohesionX = 0, cohesionY = 0;
      let separationX = 0, separationY = 0;
      let totalNeighbors = 0;

      const perceptionRadius = 60;
      const separationRadius = 24;

      boids.forEach(other => {
        if (other === this) return;
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < perceptionRadius) {
          alignmentX += other.vx;
          alignmentY += other.vy;
          cohesionX += other.x;
          cohesionY += other.y;
          totalNeighbors++;

          if (dist < separationRadius) {
            separationX -= dx / (dist * dist + 0.1);
            separationY -= dy / (dist * dist + 0.1);
          }
        }
      });

      if (totalNeighbors > 0) {
        alignmentX /= totalNeighbors;
        alignmentY /= totalNeighbors;
        const alignMag = Math.hypot(alignmentX, alignmentY);
        if (alignMag > 0) {
          alignmentX = (alignmentX / alignMag) * this.maxSpeed - this.vx;
          alignmentY = (alignmentY / alignMag) * this.maxSpeed - this.vy;
        }

        cohesionX /= totalNeighbors;
        cohesionY /= totalNeighbors;
        let steerX = cohesionX - this.x;
        let steerY = cohesionY - this.y;
        const steerMag = Math.hypot(steerX, steerY);
        if (steerMag > 0) {
          steerX = (steerX / steerMag) * this.maxSpeed - this.vx;
          steerY = (steerY / steerMag) * this.maxSpeed - this.vy;
        }

        this.vx += (alignmentX * 0.4 + steerX * 0.25 + separationX * 1.5) * this.maxForce;
        this.vy += (alignmentY * 0.4 + steerY * 0.25 + separationY * 1.5) * this.maxForce;
      }

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          const pull = (220 - dist) / 220;
          this.vx += (dx / dist) * pull * 0.25;
          this.vy += (dy / dist) * pull * 0.25;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      const speed = Math.hypot(this.vx, this.vy);
      if (speed > this.maxSpeed) {
        this.vx = (this.vx / speed) * this.maxSpeed;
        this.vy = (this.vy / speed) * this.maxSpeed;
      }

      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
    }

    draw() {
      const speed = Math.hypot(this.vx, this.vy);
      const angle = Math.atan2(this.vy, this.vx);

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      const grad = ctx.createLinearGradient(0, 0, -speed * 3.5, 0);
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.radius * 1.5;
      ctx.moveTo(0, 0);
      ctx.lineTo(-speed * 3.5, 0);
      ctx.stroke();

      ctx.restore();
    }
  }

  const boids = Array.from({ length: 120 }, () => new BiolumeBoid());

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = 'rgba(3, 4, 8, 0.09)';
    ctx.fillRect(0, 0, width, height);

    boids.forEach(b => {
      b.update(boids);
      b.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Biolume Fluid Swarm Styles */
.biolume-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #030408;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.biolume-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design a highly premium organic bioluminescent fluid swarm background animation simulating self-propelled boids flocking behavior, long motion trailing, and pointer vector attraction.'
};
