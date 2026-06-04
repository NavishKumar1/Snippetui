/**
 * Component: Bioluminescent Spore Network
 * Category: background-animations
 */

export const component = {
  id: 'bioluminescent-spore-network',
  name: 'Bioluminescent Spore Network',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="spore-sandbox" id="spore-sandbox-container">
  <canvas class="spore-canvas" id="spore-canvas-element"></canvas>

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
      <h1 class="demo-headline">Interact with organic bioluminescent neural networks!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Bioluminescent Spore Network organic mycelium grid logic
const container = document.getElementById('spore-sandbox-container');
if (container) {
  const canvas = container.querySelector('#spore-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Track dynamic mouse positions for spore excitation
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

  // Handle resizing
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  // Mycelium node constructor
  class SporeNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.connections = [];
      this.baseRadius = Math.random() * 4 + 3;
      this.radius = this.baseRadius;
      this.excitation = 0; // Wakes up with mouse proximity
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      // Natural soft breathing pulse
      this.pulsePhase += 0.035;
      const breathing = Math.sin(this.pulsePhase) * 1.5;

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        const wakeRadius = 140;

        if (dist < wakeRadius) {
          const power = (wakeRadius - dist) / wakeRadius;
          this.excitation += (power - this.excitation) * 0.15;
        } else {
          this.excitation *= 0.95; // Decay
        }
      } else {
        this.excitation *= 0.95;
      }

      this.radius = this.baseRadius + breathing + this.excitation * 12;
    }

    draw() {
      ctx.beginPath();
      // Organic color shifting based on excitation: Emerald green -> Amber gold
      const glowAlpha = 0.25 + this.excitation * 0.5;
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2.2);
      
      if (this.excitation > 0.15) {
        grad.addColorStop(0, '#f4a261');
        grad.addColorStop(0.3, 'rgba(233, 196, 106, 0.8)');
        grad.addColorStop(1, 'transparent');
      } else {
        grad.addColorStop(0, '#2a9d8f');
        grad.addColorStop(0.4, 'rgba(42, 157, 143, 0.4)');
        grad.addColorStop(1, 'transparent');
      }

      ctx.fillStyle = grad;
      ctx.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Generate mycelium mesh
  const nodes = Array.from({ length: 48 }, () => new SporeNode());

  // Interconnect nodes to represent natural branching roots
  for (let i = 0; i < nodes.length; i++) {
    const current = nodes[i];
    // Find closest 2 neighbors to connect
    const sorted = nodes
      .map((node, idx) => ({ idx, dist: Math.hypot(node.x - current.x, node.y - current.y) }))
      .filter(item => item.idx !== i)
      .sort((a, b) => a.dist - b.dist);

    for (let c = 0; c < 2; c++) {
      if (sorted[c]) {
        current.connections.push(sorted[c].idx);
      }
    }
  }

  // Electrical mycelium impulse spikes running along paths
  class ElectricalImpulse {
    constructor(startNodeIdx) {
      this.currentNodeIdx = startNodeIdx;
      this.targetNodeIdx = this.getRandomConnection(startNodeIdx);
      this.progress = 0;
      this.speed = Math.random() * 0.035 + 0.015;
    }

    getRandomConnection(idx) {
      const conn = nodes[idx].connections;
      return conn[Math.floor(Math.random() * conn.length)];
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1.0) {
        this.currentNodeIdx = this.targetNodeIdx;
        this.targetNodeIdx = this.getRandomConnection(this.currentNodeIdx);
        this.progress = 0;
      }
    }

    draw() {
      const n1 = nodes[this.currentNodeIdx];
      const n2 = nodes[this.targetNodeIdx];

      if (!n1 || !n2) return;

      const px = n1.x + (n2.x - n1.x) * this.progress;
      const py = n1.y + (n2.y - n1.y) * this.progress;

      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#e9c46a';
      ctx.shadowBlur = 10;
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset
    }
  }

  const impulses = Array.from({ length: 10 }, () => new ElectricalImpulse(Math.floor(Math.random() * nodes.length)));

  // Scoped Render Loop
  let active = true;
  const loop = () => {
    if (!active) return;

    // Rich deep organic dark background
    ctx.fillStyle = '#060a09';
    ctx.fillRect(0, 0, width, height);

    // Draw mycelium connecting roots
    ctx.strokeStyle = 'rgba(42, 157, 143, 0.12)';
    ctx.lineWidth = 1.2;
    nodes.forEach(node => {
      node.connections.forEach(connIdx => {
        const connected = nodes[connIdx];
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(connected.x, connected.y);
        ctx.stroke();
      });
    });

    // Update and draw spore nodes
    nodes.forEach(node => {
      node.update();
      node.draw();
    });

    // Update and draw electrical root impulses
    impulses.forEach(impulse => {
      impulse.update();
      impulse.draw();
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
const container = document.getElementById('spore-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#spore-canvas-element') as HTMLCanvasElement;
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

  class SporeNode {
    x: number;
    y: number;
    connections: number[];
    baseRadius: number;
    radius: number;
    excitation: number;
    pulsePhase: number;

    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.connections = [];
      this.baseRadius = Math.random() * 4 + 3;
      this.radius = this.baseRadius;
      this.excitation = 0;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.pulsePhase += 0.035;
      const breathing = Math.sin(this.pulsePhase) * 1.5;

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        const wakeRadius = 140;

        if (dist < wakeRadius) {
          const power = (wakeRadius - dist) / wakeRadius;
          this.excitation += (power - this.excitation) * 0.15;
        } else {
          this.excitation *= 0.95;
        }
      } else {
        this.excitation *= 0.95;
      }

      this.radius = this.baseRadius + breathing + this.excitation * 12;
    }

    draw() {
      ctx.beginPath();
      const glowAlpha = 0.25 + this.excitation * 0.5;
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2.2);
      
      if (this.excitation > 0.15) {
        grad.addColorStop(0, '#f4a261');
        grad.addColorStop(0.3, 'rgba(233, 196, 106, 0.8)');
        grad.addColorStop(1, 'transparent');
      } else {
        grad.addColorStop(0, '#2a9d8f');
        grad.addColorStop(0.4, 'rgba(42, 157, 143, 0.4)');
        grad.addColorStop(1, 'transparent');
      }

      ctx.fillStyle = grad;
      ctx.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const nodes = Array.from({ length: 48 }, () => new SporeNode());

  for (let i = 0; i < nodes.length; i++) {
    const current = nodes[i];
    const sorted = nodes
      .map((node, idx) => ({ idx, dist: Math.hypot(node.x - current.x, node.y - current.y) }))
      .filter(item => item.idx !== i)
      .sort((a, b) => a.dist - b.dist);

    for (let c = 0; c < 2; c++) {
      if (sorted[c]) {
        current.connections.push(sorted[c].idx);
      }
    }
  }

  class ElectricalImpulse {
    currentNodeIdx: number;
    targetNodeIdx: number;
    progress: number;
    speed: number;

    constructor(startNodeIdx: number) {
      this.currentNodeIdx = startNodeIdx;
      this.targetNodeIdx = this.getRandomConnection(startNodeIdx);
      this.progress = 0;
      this.speed = Math.random() * 0.035 + 0.015;
    }

    getRandomConnection(idx: number): number {
      const conn = nodes[idx].connections;
      return conn[Math.floor(Math.random() * conn.length)];
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1.0) {
        this.currentNodeIdx = this.targetNodeIdx;
        this.targetNodeIdx = this.getRandomConnection(this.currentNodeIdx);
        this.progress = 0;
      }
    }

    draw() {
      const n1 = nodes[this.currentNodeIdx];
      const n2 = nodes[this.targetNodeIdx];

      if (!n1 || !n2) return;

      const px = n1.x + (n2.x - n1.x) * this.progress;
      const py = n1.y + (n2.y - n1.y) * this.progress;

      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#e9c46a';
      ctx.shadowBlur = 10;
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  const impulses = Array.from({ length: 10 }, () => new ElectricalImpulse(Math.floor(Math.random() * nodes.length)));

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#060a09';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(42, 157, 143, 0.12)';
    ctx.lineWidth = 1.2;
    nodes.forEach(node => {
      node.connections.forEach(connIdx => {
        const connected = nodes[connIdx];
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(connected.x, connected.y);
        ctx.stroke();
      });
    });

    nodes.forEach(node => {
      node.update();
      node.draw();
    });

    impulses.forEach(impulse => {
      impulse.update();
      impulse.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Bioluminescent Spore Network styles */
.spore-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #060a09;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.spore-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<div class="relative w-full h-[480px] bg-[#060a09] rounded-[24px] overflow-hidden" id="spore-sandbox-container">
  <canvas class="w-full h-full block" id="spore-canvas-element"></canvas>

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
      <h1 class="demo-headline">Interact with organic bioluminescent neural networks!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design a highly creative biological bioluminescent spore mycelium network background animation pulsing organically and expanding excited nodes under pointer proximity.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
