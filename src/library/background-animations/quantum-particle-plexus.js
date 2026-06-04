/**
 * Component: Quantum Particle Plexus
 * Category: background-animations
 */

export const component = {
  id: 'quantum-particle-plexus',
  name: 'Quantum Particle Plexus',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="plexus-sandbox" id="plexus-sandbox-container">
  <canvas class="plexus-canvas" id="plexus-canvas-element"></canvas>

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
      <h1 class="demo-headline">Connect your subatomic quantum particles in a neat plexus!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Quantum Particle Plexus interconnected network lines
const container = document.getElementById('plexus-sandbox-container');
if (container) {
  const canvas = container.querySelector('#plexus-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Track dynamic mouse positions for particle gravity attraction
  let mouse = { x: -1000, y: -1000, lastX: -1000, lastY: -1000, vx: 0, vy: 0, active: false };

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
    mouse.active = true;

    // Spawn tiny dynamic energy spark particles on mouse movement
    if (Math.random() < 0.35) {
      sparks.push(new EnergySpark(mouse.x, mouse.y));
    }
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.vx = 0;
    mouse.vy = 0;
    mouse.lastX = -1000;
    mouse.lastY = -1000;
  });

  // Handle resizing
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  // Energy Spark constructor
  class EnergySpark {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4;
      this.alpha = 1.0;
      this.decay = Math.random() * 0.02 + 0.015;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = \`rgba(0, 242, 254, \${this.alpha})\`;
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Subatomic Node constructor
  class QuantumNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2.5 + 1.2;
    }

    update() {
      // Wall boundaries bounce
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Elastic cursor gravitational pull
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        const pullRadius = 160;

        if (dist < pullRadius) {
          const force = (pullRadius - dist) / pullRadius;
          this.vx += (dx / dist) * force * 0.08 + mouse.vx * 0.015;
          this.vy += (dy / dist) * force * 0.08 + mouse.vy * 0.015;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      // Speed limit clamp
      const maxSpeed = 1.5;
      const speed = Math.hypot(this.vx, this.vy);
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }

      // Proportional slow decay
      this.vx *= 0.99;
      this.vy *= 0.99;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const nodes = Array.from({ length: 65 }, () => new QuantumNode());
  const sparks = [];

  // Scoped Render Loop
  let active = true;
  const loop = () => {
    if (!active) return;

    // Premium dark cyber space
    ctx.fillStyle = '#030206';
    ctx.fillRect(0, 0, width, height);

    // Update and draw spark emissions
    for (let i = sparks.length - 1; i >= 0; i--) {
      sparks[i].update();
      if (sparks[i].alpha <= 0) {
        sparks.splice(i, 1);
      } else {
        sparks[i].draw();
      }
    }

    // Connect node pathways using proximity rules
    const maxDistance = 110;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];

        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = (maxDistance - dist) / maxDistance;
          ctx.beginPath();
          // Volumetric glowing line
          ctx.strokeStyle = \`rgba(139, 92, 246, \${alpha * 0.28})\`;
          ctx.lineWidth = alpha * 1.0;
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    // Update and draw all plexus nodes
    nodes.forEach(node => {
      node.update();
      node.draw();
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
  ts: `// TypeScript implementation
const container = document.getElementById('plexus-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#plexus-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, lastX: -1000, lastY: -1000, vx: 0, vy: 0, active: false };

  class EnergySpark {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    decay: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4;
      this.alpha = 1.0;
      this.decay = Math.random() * 0.02 + 0.015;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = \`rgba(0, 242, 254, \${this.alpha})\`;
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

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
    mouse.active = true;

    if (Math.random() < 0.35) {
      sparks.push(new EnergySpark(mouse.x, mouse.y));
    }
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.vx = 0;
    mouse.vy = 0;
    mouse.lastX = -1000;
    mouse.lastY = -1000;
  });

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  class QuantumNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;

    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2.5 + 1.2;
    }

    update() {
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        const pullRadius = 160;

        if (dist < pullRadius) {
          const force = (pullRadius - dist) / pullRadius;
          this.vx += (dx / dist) * force * 0.08 + mouse.vx * 0.015;
          this.vy += (dy / dist) * force * 0.08 + mouse.vy * 0.015;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      const maxSpeed = 1.5;
      const speed = Math.hypot(this.vx, this.vy);
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }

      this.vx *= 0.99;
      this.vy *= 0.99;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const nodes = Array.from({ length: 65 }, () => new QuantumNode());
  const sparks: EnergySpark[] = [];

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#030206';
    ctx.fillRect(0, 0, width, height);

    for (let i = sparks.length - 1; i >= 0; i--) {
      sparks[i].update();
      if (sparks[i].alpha <= 0) {
        sparks.splice(i, 1);
      } else {
        sparks[i].draw();
      }
    }

    const maxDistance = 110;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];

        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = (maxDistance - dist) / maxDistance;
          ctx.beginPath();
          ctx.strokeStyle = \`rgba(139, 92, 246, \smash{\${alpha * 0.28}})\`;
          ctx.lineWidth = alpha * 1.0;
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach(node => {
      node.update();
      node.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Quantum Particle Plexus styles */
.plexus-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #030206;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.plexus-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<div class="relative w-full h-[480px] bg-[#030206] rounded-[24px] overflow-hidden" id="plexus-sandbox-container">
  <canvas class="w-full h-full block" id="plexus-canvas-element"></canvas>

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
      <h1 class="demo-headline">Connect your subatomic quantum particles in a neat plexus!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design a high-fidelity quantum plexus node connectivity network background animation with gravitational pointer attraction forces and sparkling cursor emitters.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
