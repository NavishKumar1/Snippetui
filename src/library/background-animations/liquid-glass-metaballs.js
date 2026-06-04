/**
 * Component: Liquid Glass Metaballs
 * Category: background-animations
 */

export const component = {
  id: 'liquid-glass-metaballs',
  name: 'Liquid Glass Metaballs',
  category: 'background-animations',
  tag: 'Premium',
  html: `<div class="metaballs-sandbox" id="metaballs-container">
  <div class="metaballs-wrapper">
    <canvas class="metaballs-canvas" id="metaballs-canvas-element"></canvas>
  </div>

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
        <a href="#">Liquid</a>
        <a href="#">API</a>
        <button class="demo-signup-btn">Connect Fluid</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>CSS Shader</span> Liquid Glass</div>
      <h1 class="demo-headline">Organic metaball fluid elements merging in absolute harmony</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Merge Elements</button>
        <button class="demo-secondary-btn">Adjust Viscosity</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Liquid Glass Metaballs - Interactive CSS-filtered fluid mercury blobs
const container = document.getElementById('metaballs-container');
if (container) {
  const canvas = container.querySelector('#metaballs-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let mouse = { x: width / 2, y: height / 2, active: false };

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

  class FluidBlob {
    constructor() {
      this.radius = Math.random() * 25 + 30;
      this.x = Math.random() * (width - this.radius * 2) + this.radius;
      this.y = Math.random() * (height - this.radius * 2) + this.radius;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
    }

    update() {
      // Bounce
      if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx *= -1;
      if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy *= -1;

      this.x += this.vx;
      this.y += this.vy;
    }

    draw() {
      ctx.beginPath();
      // Draw solid shape (color will blend with CSS filter)
      ctx.fillStyle = '#6366f1'; // Indigo base
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Generate blobs
  const blobs = Array.from({ length: 12 }, () => new FluidBlob());
  
  // Create a special blob for the mouse cursor
  const mouseBlob = {
    x: width / 2,
    y: height / 2,
    radius: 55,
    draw() {
      ctx.beginPath();
      ctx.fillStyle = '#38bdf8'; // Sky blue mouse highlight blob
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  let active = true;
  const loop = () => {
    if (!active) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw floating blobs
    blobs.forEach(blob => {
      blob.update();
      blob.draw();
    });

    // Update and draw mouse blob
    if (mouse.active) {
      mouseBlob.x += (mouse.x - mouseBlob.x) * 0.12;
      mouseBlob.y += (mouse.y - mouseBlob.y) * 0.12;
    } else {
      // Orbit idle center
      const time = Date.now() * 0.0012;
      mouseBlob.x += (width / 2 + Math.sin(time) * 90 - mouseBlob.x) * 0.05;
      mouseBlob.y += (height / 2 + Math.cos(time * 0.8) * 60 - mouseBlob.y) * 0.05;
    }
    mouseBlob.draw();

    requestAnimationFrame(loop);
  };
  loop();

  // Scoped cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  ts: `// Liquid Glass Metaballs TypeScript Logic
const container = document.getElementById('metaballs-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#metaballs-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: width / 2, y: height / 2, active: false };

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

  class FluidBlob {
    radius: number;
    x: number;
    y: number;
    vx: number;
    vy: number;

    constructor() {
      this.radius = Math.random() * 25 + 30;
      this.x = Math.random() * (width - this.radius * 2) + this.radius;
      this.y = Math.random() * (height - this.radius * 2) + this.radius;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
    }

    update() {
      if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx *= -1;
      if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy *= -1;
      this.x += this.vx;
      this.y += this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = '#6366f1';
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const blobs = Array.from({ length: 12 }, () => new FluidBlob());

  const mouseBlob = {
    x: width / 2,
    y: height / 2,
    radius: 55,
    draw() {
      ctx.beginPath();
      ctx.fillStyle = '#38bdf8';
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.clearRect(0, 0, width, height);

    blobs.forEach(blob => {
      blob.update();
      blob.draw();
    });

    if (mouse.active) {
      mouseBlob.x += (mouse.x - mouseBlob.x) * 0.12;
      mouseBlob.y += (mouse.y - mouseBlob.y) * 0.12;
    } else {
      const time = Date.now() * 0.0012;
      mouseBlob.x += (width / 2 + Math.sin(time) * 90 - mouseBlob.x) * 0.05;
      mouseBlob.y += (height / 2 + Math.cos(time * 0.8) * 60 - mouseBlob.y) * 0.05;
    }
    mouseBlob.draw();

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Liquid Glass Metaballs styles */
.metaballs-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #020205;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.metaballs-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #020205;
  filter: blur(16px) contrast(22); /* Blurs and pulls blobs together sharply */
}

.metaballs-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design an interactive organic liquid metaball website background using CSS blur-contrast filters and pointer tracking mercury blobs.'
};
