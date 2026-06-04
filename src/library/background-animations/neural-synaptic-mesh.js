/**
 * Component: Neural Synaptic Mesh
 * Category: background-animations
 */

export const component = {
  id: 'neural-synaptic-mesh',
  name: 'Neural Synaptic Mesh',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="synaptic-sandbox" id="synaptic-mesh-container">
  <canvas class="synaptic-canvas" id="synaptic-mesh-canvas"></canvas>

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
        <a href="#">Solutions</a>
        <a href="#">Pricing</a>
        <button class="demo-signup-btn">Launch Console</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>Cognitive AI</span> Neural Mesh</div>
      <h1 class="demo-headline">Intelligent network topology with interactive synapses</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Connect Nodes</button>
        <button class="demo-secondary-btn">Analyze Link</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Neural Synaptic Mesh - Interactive network connecting nodes with active light pulse synapses
const container = document.getElementById('synaptic-mesh-container');
if (container) {
  const canvas = container.querySelector('#synaptic-mesh-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let mouse = { x: -1000, y: -1000, active: false, radius: 180 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Spawn node on click
  container.addEventListener('click', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    nodes.push(new SynapticNode(x, y));
    if (nodes.length > 100) nodes.shift(); // keep it optimized
  });

  // Handle resizing
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  class SynapticNode {
    constructor(x, y) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.baseRadius = Math.random() * 2 + 1.5;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      // Wall bounce
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.vx += (dx / dist) * force * 0.08;
          this.vy += (dy / dist) * force * 0.08;
        }
      }

      // Apply friction limits
      this.vx *= 0.98;
      this.vy *= 0.98;

      this.x += this.vx;
      this.y += this.vy;
      this.pulsePhase += 0.05;
    }

    draw() {
      const radius = this.baseRadius + Math.sin(this.pulsePhase) * 0.6;
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class SynapsePulse {
    constructor(fromNode, toNode) {
      this.from = fromNode;
      this.to = toNode;
      this.progress = 0;
      this.speed = Math.random() * 0.015 + 0.008;
    }

    update() {
      this.progress += this.speed;
      return this.progress >= 1;
    }

    draw() {
      const px = this.from.x + (this.to.x - this.from.x) * this.progress;
      const py = this.from.y + (this.to.y - this.from.y) * this.progress;
      ctx.beginPath();
      // Glowing neon light blue pulse
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0ea5e9';
      ctx.shadowBlur = 10;
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  // Populate nodes
  const nodes = Array.from({ length: 65 }, () => new SynapticNode());
  const pulses = [];

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#020204';
    ctx.fillRect(0, 0, width, height);

    // Update and draw nodes
    nodes.forEach(node => node.update());

    // Connect node lines using threshold
    const connectDist = 135;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectDist) {
          const alpha = (connectDist - dist) / connectDist;
          ctx.beginPath();
          // Royal blue / Violet blending connections
          ctx.strokeStyle = \`rgba(99, 102, 241, \${alpha * 0.22})\`;
          ctx.lineWidth = alpha * 0.8;
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();

          // Sporadically fire active pulses along the connections
          if (pulses.length < 25 && Math.random() < 0.0003) {
            pulses.push(new SynapsePulse(n1, n2));
          }
        }
      }
    }

    // Update and draw synapse pulses
    for (let i = pulses.length - 1; i >= 0; i--) {
      const done = pulses[i].update();
      if (done) {
        pulses.splice(i, 1);
      } else {
        pulses[i].draw();
      }
    }

    // Draw nodes on top
    nodes.forEach(node => node.draw());

    requestAnimationFrame(loop);
  };
  loop();

  // Scoped cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  ts: `// Neural Synaptic Mesh TypeScript Logic
const container = document.getElementById('synaptic-mesh-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#synaptic-mesh-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false, radius: 180 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  container.addEventListener('click', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    nodes.push(new SynapticNode(x, y));
    if (nodes.length > 100) nodes.shift();
  });

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  class SynapticNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseRadius: number;
    pulsePhase: number;

    constructor(x?: number, y?: number) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.baseRadius = Math.random() * 2 + 1.5;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.vx += (dx / dist) * force * 0.08;
          this.vy += (dy / dist) * force * 0.08;
        }
      }

      this.vx *= 0.98;
      this.vy *= 0.98;

      this.x += this.vx;
      this.y += this.vy;
      this.pulsePhase += 0.05;
    }

    draw() {
      const radius = this.baseRadius + Math.sin(this.pulsePhase) * 0.6;
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class SynapsePulse {
    from: SynapticNode;
    to: SynapticNode;
    progress: number;
    speed: number;

    constructor(fromNode: SynapticNode, toNode: SynapticNode) {
      this.from = fromNode;
      this.to = toNode;
      this.progress = 0;
      this.speed = Math.random() * 0.015 + 0.008;
    }

    update(): boolean {
      this.progress += this.speed;
      return this.progress >= 1;
    }

    draw() {
      const px = this.from.x + (this.to.x - this.from.x) * this.progress;
      const py = this.from.y + (this.to.y - this.from.y) * this.progress;
      ctx.beginPath();
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0ea5e9';
      ctx.shadowBlur = 10;
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  const nodes: SynapticNode[] = Array.from({ length: 65 }, () => new SynapticNode());
  const pulses: SynapsePulse[] = [];

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#020204';
    ctx.fillRect(0, 0, width, height);

    nodes.forEach(node => node.update());

    const connectDist = 135;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectDist) {
          const alpha = (connectDist - dist) / connectDist;
          ctx.beginPath();
          ctx.strokeStyle = \`rgba(99, 102, 241, \${alpha * 0.22})\`;
          ctx.lineWidth = alpha * 0.8;
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();

          if (pulses.length < 25 && Math.random() < 0.0003) {
            pulses.push(new SynapsePulse(n1, n2));
          }
        }
      }
    }

    for (let i = pulses.length - 1; i >= 0; i--) {
      const done = pulses[i].update();
      if (done) {
        pulses.splice(i, 1);
      } else {
        pulses[i].draw();
      }
    }

    nodes.forEach(node => node.draw());

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Neural Synaptic Mesh styles */
.synaptic-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #020204;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.synaptic-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design a highly premium cognitive AI neural network connection mesh background with glowing synapse light pulse waves, node repulsion physics, and click node spawning.'
};
