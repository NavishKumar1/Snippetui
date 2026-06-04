/**
 * Component: Quantum String Vibration
 * Category: background-animations
 */

export const component = {
  id: 'quantum-string-vibration',
  name: 'Quantum String Vibration',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="quantum-strings-sandbox" id="quantum-strings-container">
  <canvas class="quantum-strings-canvas" id="quantum-strings-canvas-element"></canvas>

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
        <a href="#">Strings</a>
        <a href="#">Console</a>
        <button class="demo-signup-btn">Calibrate Tension</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>String Theory</span> Quantum Resonance</div>
      <h1 class="demo-headline">Strum vibrating multi-node dimensional strings interactively</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Dampen All</button>
        <button class="demo-secondary-btn">Tune Frequency</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Quantum String Vibration - Vibrating spring-nodes strings that react to mouse sweeps
const container = document.getElementById('quantum-strings-container');
if (container) {
  const canvas = container.querySelector('#quantum-strings-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let mouse = { x: -1000, y: -1000, active: false, lastX: 0, lastY: 0, vx: 0, vy: 0 };

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
    setupStrings();
  };
  window.addEventListener('resize', resize);

  const k = 0.08;      // Spring constant
  const damping = 0.94; // Spring damping factor

  class StringNode {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.targetX = x;
      this.targetY = y;
      this.vx = 0;
      this.vy = 0;
    }

    update() {
      // Hooke's law spring physics back to target anchor
      const ax = (this.targetX - this.x) * k;
      const ay = (this.targetY - this.y) * k;

      this.vx = (this.vx + ax) * damping;
      this.vy = (this.vy + ay) * damping;

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  class ResonanceString {
    constructor(yAnchor) {
      this.yAnchor = yAnchor;
      this.nodesCount = 10;
      this.nodes = [];
      this.color = Math.random() < 0.5 ? 'hsla(180, 100%, 50%,' : 'hsla(280, 100%, 65%,'; // Neon Cyan / Magenta

      const spacing = width / (this.nodesCount - 1);
      for (let i = 0; i < this.nodesCount; i++) {
        this.nodes.push(new StringNode(i * spacing, yAnchor));
      }
    }

    update() {
      // Update nodes
      this.nodes.forEach(node => node.update());

      // Check cursor strumming interaction (intersection with string)
      if (mouse.active && Math.abs(mouse.vy) > 1) {
        for (let i = 1; i < this.nodesCount - 1; i++) {
          const node = this.nodes[i];
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);

          // If mouse is near a node, pull it dynamically
          if (dist < 45) {
            const force = (45 - dist) / 45;
            node.vy += mouse.vy * force * 0.45;
          }
        }
      }
    }

    draw() {
      ctx.beginPath();
      // Draw smooth curve using quadratic curves connecting the node chain
      ctx.moveTo(this.nodes[0].x, this.nodes[0].y);

      for (let i = 0; i < this.nodesCount - 1; i++) {
        const xc = (this.nodes[i].x + this.nodes[i + 1].x) / 2;
        const yc = (this.nodes[i].y + this.nodes[i + 1].y) / 2;
        ctx.quadraticCurveTo(this.nodes[i].x, this.nodes[i].y, xc, yc);
      }
      ctx.lineTo(this.nodes[this.nodesCount - 1].x, this.nodes[this.nodesCount - 1].y);

      // Determine resonance glow based on node velocity displacement
      let totalDisplacement = 0;
      this.nodes.forEach(n => {
        totalDisplacement += Math.abs(n.y - n.targetY);
      });
      const glow = Math.min(1.0, totalDisplacement * 0.015);

      ctx.strokeStyle = \`\${this.color} \${0.25 + glow * 0.75})\`;
      ctx.lineWidth = 1.0 + glow * 2.0;
      
      if (glow > 0.1) {
        ctx.shadowColor = glow > 0.5 ? '#00f2fe' : '#d946ef';
        ctx.shadowBlur = glow * 15;
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    }
  }

  let strings = [];
  const setupStrings = () => {
    strings = [];
    const stringsCount = 10;
    const padding = 50;
    const spacing = (height - padding * 2) / (stringsCount - 1);
    for (let i = 0; i < stringsCount; i++) {
      strings.push(new ResonanceString(padding + i * spacing));
    }
  };
  setupStrings();

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#020104';
    ctx.fillRect(0, 0, width, height);

    strings.forEach(str => {
      str.update();
      str.draw();
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
  ts: `// Quantum String Vibration TypeScript Logic
const container = document.getElementById('quantum-strings-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#quantum-strings-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false, lastX: 0, lastY: 0, vx: 0, vy: 0 };

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

  const k = 0.08;
  const damping = 0.94;

  class StringNode {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    vx: number;
    vy: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.targetX = x;
      this.targetY = y;
      this.vx = 0;
      this.vy = 0;
    }

    update() {
      const ax = (this.targetX - this.x) * k;
      const ay = (this.targetY - this.y) * k;

      this.vx = (this.vx + ax) * damping;
      this.vy = (this.vy + ay) * damping;

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  class ResonanceString {
    yAnchor: number;
    nodesCount: number;
    nodes: StringNode[];
    color: string;

    constructor(yAnchor: number) {
      this.yAnchor = yAnchor;
      this.nodesCount = 10;
      this.nodes = [];
      this.color = Math.random() < 0.5 ? 'hsla(180, 100%, 50%,' : 'hsla(280, 100%, 65%,';

      const spacing = width / (this.nodesCount - 1);
      for (let i = 0; i < this.nodesCount; i++) {
        this.nodes.push(new StringNode(i * spacing, yAnchor));
      }
    }

    update() {
      this.nodes.forEach(node => node.update());

      if (mouse.active && Math.abs(mouse.vy) > 1) {
        for (let i = 1; i < this.nodesCount - 1; i++) {
          const node = this.nodes[i];
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 45) {
            const force = (45 - dist) / 45;
            node.vy += mouse.vy * force * 0.45;
          }
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.nodes[0].x, this.nodes[0].y);

      for (let i = 0; i < this.nodesCount - 1; i++) {
        const xc = (this.nodes[i].x + this.nodes[i + 1].x) / 2;
        const yc = (this.nodes[i].y + this.nodes[i + 1].y) / 2;
        ctx.quadraticCurveTo(this.nodes[i].x, this.nodes[i].y, xc, yc);
      }
      ctx.lineTo(this.nodes[this.nodesCount - 1].x, this.nodes[this.nodesCount - 1].y);

      let totalDisplacement = 0;
      this.nodes.forEach(n => {
        totalDisplacement += Math.abs(n.y - n.targetY);
      });
      const glow = Math.min(1.0, totalDisplacement * 0.015);

      ctx.strokeStyle = \`\${this.color} \${0.25 + glow * 0.75})\`;
      ctx.lineWidth = 1.0 + glow * 2.0;
      
      if (glow > 0.1) {
        ctx.shadowColor = glow > 0.5 ? '#00f2fe' : '#d946ef';
        ctx.shadowBlur = glow * 15;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  let strings: ResonanceString[] = [];
  const setupStrings = () => {
    strings = [];
    const stringsCount = 10;
    const padding = 50;
    const spacing = (height - padding * 2) / (stringsCount - 1);
    for (let i = 0; i < stringsCount; i++) {
      strings.push(new ResonanceString(padding + i * spacing));
    }
  };
  setupStrings();

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    setupStrings();
  };
  window.addEventListener('resize', resize);

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#020104';
    ctx.fillRect(0, 0, width, height);

    strings.forEach(str => {
      str.update();
      str.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Quantum String Vibration styles */
.quantum-strings-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #020104;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.quantum-strings-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design an interactive grid layout of multi-node strings that wobble and oscillate with spring physics when swiped by pointer velocities.'
};
