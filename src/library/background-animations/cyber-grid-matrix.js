/**
 * Component: Cyber Grid Matrix
 * Category: background-animations
 */

export const component = {
  id: 'cyber-grid-matrix',
  name: 'Cyber Grid Matrix',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="cyber-sandbox" id="cyber-sandbox-container">
  <canvas class="cyber-canvas" id="cyber-canvas-element"></canvas>

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
      <h1 class="demo-headline">Warp through the glowing 3D perspective grids of design!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Cyber Grid Matrix perspective grid with binary cascade streams
const container = document.getElementById('cyber-sandbox-container');
if (container) {
  const canvas = container.querySelector('#cyber-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Track dynamic mouse positions for elastic mesh grid warp
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

  // Grid mesh intersection nodes
  const gridRows = 16;
  const gridCols = 22;
  const points = [];

  class GridPoint {
    constructor(px, py) {
      this.baseX = px;
      this.baseY = py;
      this.x = px;
      this.y = py;
      this.vx = 0;
      this.vy = 0;
    }

    update() {
      // Elastic spring restore forces
      const k = 0.08;      // Stiffness
      const damp = 0.82;   // Dampening
      
      const ax = (this.baseX - this.x) * k;
      const ay = (this.baseY - this.y) * k;
      this.vx = (this.vx + ax) * damp;
      this.vy = (this.vy + ay) * damp;

      // Mouse mesh push/repulsion warp
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const forceRadius = 140;

        if (dist < forceRadius) {
          const push = (forceRadius - dist) / forceRadius;
          const angle = Math.atan2(dy, dx);
          // Push grid intersection elastically
          this.vx += Math.cos(angle) * push * 6;
          this.vy += Math.sin(angle) * push * 6;
        }
      }

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  // Generate grid nodes
  const generateGrid = () => {
    points.length = 0;
    const xStep = width / (gridCols - 1);
    const yStep = height / (gridRows - 1);

    for (let r = 0; r < gridRows; r++) {
      points[r] = [];
      for (let c = 0; c < gridCols; c++) {
        points[r][c] = new GridPoint(c * xStep, r * yStep);
      }
    }
  };
  generateGrid();

  // Falling binary streams
  const streamsCount = 20;
  class BinaryStream {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -100;
      this.speed = Math.random() * 2 + 1.5;
      this.chars = Array.from({ length: Math.floor(Math.random() * 12 + 6) }, () => Math.random() > 0.5 ? '1' : '0');
    }

    update() {
      this.y += this.speed;
      if (this.y - this.chars.length * 15 > height) {
        this.reset();
      }
    }

    draw() {
      ctx.font = '11px Fira Code, monospace';
      this.chars.forEach((char, idx) => {
        const charY = this.y - idx * 15;
        if (charY < 0 || charY > height) return;

        // Fades down the stream column
        const alpha = (1.0 - (idx / this.chars.length)) * 0.45;
        ctx.fillStyle = \`rgba(0, 242, 254, \${alpha})\`;

        // Warp character placement slightly matching grid offsets
        let offsetCharX = 0;
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = charY - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const pull = (120 - dist) / 120;
            offsetCharX = Math.sin(charY * 0.05) * pull * 15;
          }
        }

        ctx.fillText(char, this.x + offsetCharX, charY);
      });
    }
  }

  const streams = Array.from({ length: streamsCount }, () => new BinaryStream());

  // Scoped Render Loop
  let active = true;
  const loop = () => {
    if (!active) return;

    // Dark matrix grid background
    ctx.fillStyle = '#020306';
    ctx.fillRect(0, 0, width, height);

    // Update and draw cascading cyber characters
    streams.forEach(stream => {
      stream.update();
      stream.draw();
    });

    // Update mesh nodes
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        points[r][c].update();
      }
    }

    // Draw horizontal grid lines
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.07)';
    ctx.lineWidth = 1;
    for (let r = 0; r < gridRows; r++) {
      ctx.beginPath();
      for (let c = 0; c < gridCols; c++) {
        const pt = points[r][c];
        if (c === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }

    // Draw vertical grid lines
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.07)';
    for (let c = 0; c < gridCols; c++) {
      ctx.beginPath();
      for (let r = 0; r < gridRows; r++) {
        const pt = points[r][c];
        if (r === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }

    // Highlight intersection nodes
    ctx.fillStyle = 'rgba(0, 242, 254, 0.22)';
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const pt = points[r][c];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

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
const container = document.getElementById('cyber-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#cyber-canvas-element') as HTMLCanvasElement;
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

  const gridRows = 16;
  const gridCols = 22;
  const points: GridPoint[][] = [];

  class GridPoint {
    baseX: number;
    baseY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;

    constructor(px: number, py: number) {
      this.baseX = px;
      this.baseY = py;
      this.x = px;
      this.y = py;
      this.vx = 0;
      this.vy = 0;
    }

    update() {
      const k = 0.08;
      const damp = 0.82;
      
      const ax = (this.baseX - this.x) * k;
      const ay = (this.baseY - this.y) * k;
      this.vx = (this.vx + ax) * damp;
      this.vy = (this.vy + ay) * damp;

      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const forceRadius = 140;

        if (dist < forceRadius) {
          const push = (forceRadius - dist) / forceRadius;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * push * 6;
          this.vy += Math.sin(angle) * push * 6;
        }
      }

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  const generateGrid = () => {
    points.length = 0;
    const xStep = width / (gridCols - 1);
    const yStep = height / (gridRows - 1);

    for (let r = 0; r < gridRows; r++) {
      points[r] = [];
      for (let c = 0; c < gridCols; c++) {
        points[r][c] = new GridPoint(c * xStep, r * yStep);
      }
    }
  };
  generateGrid();

  class BinaryStream {
    x!: number;
    y!: number;
    speed!: number;
    chars!: string[];

    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -100;
      this.speed = Math.random() * 2 + 1.5;
      this.chars = Array.from({ length: Math.floor(Math.random() * 12 + 6) }, () => Math.random() > 0.5 ? '1' : '0');
    }

    update() {
      this.y += this.speed;
      if (this.y - this.chars.length * 15 > height) {
        this.reset();
      }
    }

    draw() {
      ctx.font = '11px Fira Code, monospace';
      this.chars.forEach((char, idx) => {
        const charY = this.y - idx * 15;
        if (charY < 0 || charY > height) return;

        const alpha = (1.0 - (idx / this.chars.length)) * 0.45;
        ctx.fillStyle = \`rgba(0, 242, 254, \smash{\${alpha}})\`;

        let offsetCharX = 0;
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = charY - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const pull = (120 - dist) / 120;
            offsetCharX = Math.sin(charY * 0.05) * pull * 15;
          }
        }

        ctx.fillText(char, this.x + offsetCharX, charY);
      });
    }
  }

  const streams = Array.from({ length: 20 }, () => new BinaryStream());

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#020306';
    ctx.fillRect(0, 0, width, height);

    streams.forEach(stream => {
      stream.update();
      stream.draw();
    });

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        points[r][c].update();
      }
    }

    ctx.strokeStyle = 'rgba(0, 242, 254, 0.07)';
    ctx.lineWidth = 1;
    for (let r = 0; r < gridRows; r++) {
      ctx.beginPath();
      for (let c = 0; c < gridCols; c++) {
        const pt = points[r][c];
        if (c === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(139, 92, 246, 0.07)';
    for (let c = 0; c < gridCols; c++) {
      ctx.beginPath();
      for (let r = 0; r < gridRows; r++) {
        const pt = points[r][c];
        if (r === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(0, 242, 254, 0.22)';
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const pt = points[r][c];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Cyber Grid Matrix styles */
.cyber-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #020306;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.cyber-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<div class="relative w-full h-[480px] bg-[#020306] rounded-[24px] overflow-hidden" id="cyber-sandbox-container">
  <canvas class="w-full h-full block" id="cyber-canvas-element"></canvas>

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
      <h1 class="demo-headline">Warp through the glowing 3D perspective grids of design!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design a highly creative 3D perspective cyber grid matrix with falling binary character cascades and physical pointer elastic warp coordinates.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
