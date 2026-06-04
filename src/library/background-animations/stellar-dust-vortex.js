/**
 * Component: Stellar Dust Vortex
 * Category: background-animations
 */

export const component = {
  id: 'stellar-dust-vortex',
  name: 'Stellar Dust Vortex',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="dust-vortex-sandbox" id="dust-vortex-container">
  <canvas class="dust-vortex-canvas" id="dust-vortex-canvas-element"></canvas>

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
        <a href="#">Cosmos</a>
        <a href="#">Engine</a>
        <button class="demo-signup-btn">Calibrate View</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>3D Projection</span> Dust Vortex</div>
      <h1 class="demo-headline">Explore three-dimensional space-time spiral arm physics</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Tilt Perspective</button>
        <button class="demo-secondary-btn">Add Density</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Stellar Dust Vortex - 3D spiral galaxy projection tilting with mouse coordinates
const container = document.getElementById('dust-vortex-container');
if (container) {
  const canvas = container.querySelector('#dust-vortex-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    // Normalize coordinates around center [-1, 1]
    mouse.targetX = ((e.clientX - rect.left) / width - 0.5) * 2;
    mouse.targetY = ((e.clientY - rect.top) / height - 0.5) * 2;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.targetX = 0;
    mouse.targetY = 0;
  });

  // Handle resizing
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  const focalLength = 320;
  
  class StellarParticle {
    constructor() {
      this.reset();
      // Randomize initial positions along rotation phase
      this.angle = Math.random() * Math.PI * 2;
    }

    reset() {
      // Create spiral galaxy arm geometry
      const arm = Math.floor(Math.random() * 3); // 3-armed spiral
      const armOffset = (arm * Math.PI * 2) / 3;

      // Distance from core (logarithmic distribution)
      const u = Math.random();
      this.radius = Math.pow(u, 2) * 280 + 10; 
      this.angle = this.radius * 0.015 + armOffset + (Math.random() - 0.5) * 0.25;

      // Z coordinates for volumetric height thickness
      this.z = (Math.random() - 0.5) * (45 - this.radius * 0.1); 

      this.speed = Math.random() * 0.008 + 0.004;
      
      // Color interpolation: bright orange cores, cyan arms, violet fringes
      if (this.radius < 50) {
        this.color = { r: 251, g: 146, b: 60 }; // Orange Core
      } else if (this.radius < 180) {
        this.color = { r: 56, g: 189, b: 248 }; // Sky Blue Arms
      } else {
        this.color = { r: 139, g: 92, b: 246 }; // Violet Fringes
      }
    }

    update(tiltX, tiltY) {
      // Orbit
      this.angle += this.speed;

      // 3D coordinates relative to center
      let cx = Math.cos(this.angle) * this.radius;
      let cy = Math.sin(this.angle) * this.radius;
      let cz = this.z;

      // Apply 3D tilt rotations based on cursor
      // Pitch rotation around X axis (Y and Z shift)
      const cosP = Math.cos(tiltY * 0.6);
      const sinP = Math.sin(tiltY * 0.6);
      const y1 = cy * cosP - cz * sinP;
      const z1 = cz * cosP + cy * sinP;

      // Yaw rotation around Y axis (X and Z shift)
      const cosY = Math.cos(tiltX * 0.6);
      const sinY = Math.sin(tiltX * 0.6);
      const x2 = cx * cosY - z1 * sinY;
      const z2 = z1 * cosY + cx * sinY;

      this.rotatedX = x2;
      this.rotatedY = y1;
      this.rotatedZ = z2;
    }

    draw() {
      // Perspective projection
      const scale = focalLength / (focalLength + this.rotatedZ);
      const px = width / 2 + this.rotatedX * scale;
      const py = height / 2 + this.rotatedY * scale;

      if (px < 0 || px > width || py < 0 || py > height) return;

      const dotRadius = Math.max(0.4, scale * (Math.random() * 1.2 + 0.6));
      const alpha = Math.min(1.0, scale * 0.7);

      ctx.beginPath();
      ctx.fillStyle = \`rgba(\${this.color.r}, \${this.color.g}, \${this.color.b}, \${alpha})\`;
      ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Optimize particle count (380 particles)
  const particles = Array.from({ length: 380 }, () => new StellarParticle());

  let active = true;
  let tiltX = 0;
  let tiltY = 0.45; // default tilt

  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#030206';
    ctx.fillRect(0, 0, width, height);

    // Smoothly LERP tilt coordinates
    tiltX += (mouse.targetX - tiltX) * 0.08;
    tiltY += (mouse.targetY + 0.45 - tiltY) * 0.08; // Offset base tilt

    // Update and draw all particles
    // Sort particles by rotatedZ for painter's depth ordering algorithm (back to front)
    particles.forEach(p => p.update(tiltX, tiltY));
    particles.sort((a, b) => b.rotatedZ - a.rotatedZ);
    particles.forEach(p => p.draw());

    requestAnimationFrame(loop);
  };
  loop();

  // Scoped cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  ts: `// Stellar Dust Vortex TypeScript Logic
const container = document.getElementById('dust-vortex-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#dust-vortex-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.targetX = ((e.clientX - rect.left) / width - 0.5) * 2;
    mouse.targetY = ((e.clientY - rect.top) / height - 0.5) * 2;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.targetX = 0;
    mouse.targetY = 0;
  });

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  const focalLength = 320;

  interface ColorRGB {
    r: number;
    g: number;
    b: number;
  }

  class StellarParticle {
    radius!: number;
    angle!: number;
    z!: number;
    speed!: number;
    color!: ColorRGB;
    rotatedX!: number;
    rotatedY!: number;
    rotatedZ!: number;

    constructor() {
      this.reset();
      this.angle = Math.random() * Math.PI * 2;
    }

    reset() {
      const arm = Math.floor(Math.random() * 3);
      const armOffset = (arm * Math.PI * 2) / 3;

      const u = Math.random();
      this.radius = Math.pow(u, 2) * 280 + 10;
      this.angle = this.radius * 0.015 + armOffset + (Math.random() - 0.5) * 0.25;
      this.z = (Math.random() - 0.5) * (45 - this.radius * 0.1);
      this.speed = Math.random() * 0.008 + 0.004;

      if (this.radius < 50) {
        this.color = { r: 251, g: 146, b: 60 };
      } else if (this.radius < 180) {
        this.color = { r: 56, g: 189, b: 248 };
      } else {
        this.color = { r: 139, g: 92, b: 246 };
      }
    }

    update(tiltX: number, tiltY: number) {
      this.angle += this.speed;

      const cx = Math.cos(this.angle) * this.radius;
      const cy = Math.sin(this.angle) * this.radius;
      const cz = this.z;

      const cosP = Math.cos(tiltY * 0.6);
      const sinP = Math.sin(tiltY * 0.6);
      const y1 = cy * cosP - cz * sinP;
      const z1 = cz * cosP + cy * sinP;

      const cosY = Math.cos(tiltX * 0.6);
      const sinY = Math.sin(tiltX * 0.6);
      const x2 = cx * cosY - z1 * sinY;
      const z2 = z1 * cosY + cx * sinY;

      this.rotatedX = x2;
      this.rotatedY = y1;
      this.rotatedZ = z2;
    }

    draw() {
      const scale = focalLength / (focalLength + this.rotatedZ);
      const px = width / 2 + this.rotatedX * scale;
      const py = height / 2 + this.rotatedY * scale;

      if (px < 0 || px > width || py < 0 || py > height) return;

      const dotRadius = Math.max(0.4, scale * (Math.random() * 1.2 + 0.6));
      const alpha = Math.min(1.0, scale * 0.7);

      ctx.beginPath();
      ctx.fillStyle = \`rgba(\${this.color.r}, \${this.color.g}, \${this.color.b}, \${alpha})\`;
      ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles: StellarParticle[] = Array.from({ length: 380 }, () => new StellarParticle());

  let active = true;
  let tiltX = 0;
  let tiltY = 0.45;

  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#030206';
    ctx.fillRect(0, 0, width, height);

    tiltX += (mouse.targetX - tiltX) * 0.08;
    tiltY += (mouse.targetY + 0.45 - tiltY) * 0.08;

    particles.forEach(p => p.update(tiltX, tiltY));
    particles.sort((a, b) => b.rotatedZ - a.rotatedZ);
    particles.forEach(p => p.draw());

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Stellar Dust Vortex styles */
.dust-vortex-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #030206;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.dust-vortex-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design a highly premium 3D projected galaxy spiral arm particle system that tilts interactively with pointer coordinates.'
};
