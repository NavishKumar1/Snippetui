/**
 * Component: Refractive Glass Matrix
 * Category: background-animations
 */

export const component = {
  id: 'refractive-glass-matrix',
  name: 'Refractive Glass Matrix',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="refraction-sandbox" id="refraction-sandbox-container">
  <canvas class="refraction-canvas" id="refraction-canvas-element"></canvas>

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
        <a href="#">Security</a>
        <a href="#">Infrastructure</a>
        <button class="demo-signup-btn">Get API Keys</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>Refractive Lens</span> Interactive WebGL feel</div>
      <h1 class="demo-headline">Supercharge your product landing page with glassmorphism refractions</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Deploy Grid</button>
        <button class="demo-secondary-btn">Check Benchmarks</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Refractive Glass Grid Matrix Logic
const container = document.getElementById('refraction-sandbox-container');
if (container) {
  const canvas = container.querySelector('#refraction-canvas-element');
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

  // Setup Grid
  const cols = 28;
  const rows = 16;
  const points = [];

  // Helper to generate base grid points
  const generateGrid = () => {
    points.length = 0;
    const cellW = width / (cols - 1);
    const cellH = height / (rows - 1);
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push({
          origX: c * cellW,
          origY: r * cellH,
          x: c * cellW,
          y: r * cellH,
          vx: 0,
          vy: 0
        });
      }
    }
  };
  generateGrid();
  window.addEventListener('resize', generateGrid);

  // Spark travels along grid lines
  class GridSpark {
    constructor() {
      this.reset();
    }

    reset() {
      this.col = Math.floor(Math.random() * cols);
      this.row = Math.floor(Math.random() * rows);
      this.progress = 0;
      this.speed = Math.random() * 0.02 + 0.01;
      this.dir = Math.random() < 0.5 ? 'h' : 'v';
      this.color = Math.random() < 0.5 ? '#00f2fe' : '#a855f7';
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1.0) {
        this.progress = 0;
        if (this.dir === 'h') {
          this.col = (this.col + 1) % cols;
        } else {
          this.row = (this.row + 1) % rows;
        }
        if (Math.random() < 0.2) {
          this.reset();
        }
      }
    }

    draw() {
      const idx = this.row * cols + this.col;
      const nextIdx = this.dir === 'h' 
        ? this.row * cols + ((this.col + 1) % cols)
        : ((this.row + 1) % rows) * cols + this.col;

      const p1 = points[idx];
      const p2 = points[nextIdx];
      
      if (!p1 || !p2) return;

      const x = p1.x + (p2.x - p1.x) * this.progress;
      const y = p1.y + (p2.y - p1.y) * this.progress;

      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow
    }
  }

  const sparks = Array.from({ length: 12 }, () => new GridSpark());

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#06060c';
    ctx.fillRect(0, 0, width, height);

    // 1. Warp points under mouse grid bubble lens
    const bubbleRadius = 180;
    const forceFactor = 0.55;

    points.forEach(p => {
      let targetX = p.origX;
      let targetY = p.origY;

      if (mouse.active) {
        const dx = p.origX - mouse.x;
        const dy = p.origY - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < bubbleRadius) {
          // Glass lens magnification: stretch coordinates outwards from mouse
          const force = (bubbleRadius - dist) / bubbleRadius;
          const shift = force * bubbleRadius * forceFactor;
          targetX += (dx / dist) * shift;
          targetY += (dy / dist) * shift;
        }
      }

      // Spring physics returning points to target positions
      const ax = (targetX - p.x) * 0.12;
      const ay = (targetY - p.y) * 0.12;
      
      p.vx = (p.vx + ax) * 0.82;
      p.vy = (p.vy + ay) * 0.82;
      
      p.x += p.vx;
      p.y += p.vy;
    });

    // 2. Draw Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 0.8;

    // Horizontal Lines
    for (let r = 0; r < rows; r++) {
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const p = points[r * cols + c];
        if (c === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // Vertical Lines
    for (let c = 0; c < cols; c++) {
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        const p = points[r * cols + c];
        if (r === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // 3. Draw connection lines close to mouse
    if (mouse.active) {
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.12)';
      ctx.lineWidth = 1.2;
      points.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < bubbleRadius - 40) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
    }

    // 4. Update and Draw Sparks
    sparks.forEach(s => {
      s.update();
      s.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
    window.removeEventListener('resize', generateGrid);
  });
}`,
  ts: `// Refractive Glass Matrix TypeScript Logic
const container = document.getElementById('refraction-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#refraction-canvas-element') as HTMLCanvasElement;
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

  const cols = 28;
  const rows = 16;
  interface GridPoint {
    origX: number;
    origY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
  }
  const points: GridPoint[] = [];

  const generateGrid = () => {
    points.length = 0;
    const cellW = width / (cols - 1);
    const cellH = height / (rows - 1);
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push({
          origX: c * cellW,
          origY: r * cellH,
          x: c * cellW,
          y: r * cellH,
          vx: 0,
          vy: 0
        });
      }
    }
  };
  generateGrid();
  window.addEventListener('resize', generateGrid);

  class GridSpark {
    col!: number;
    row!: number;
    progress!: number;
    speed!: number;
    dir!: 'h' | 'v';
    color!: string;

    constructor() {
      this.reset();
    }

    reset() {
      this.col = Math.floor(Math.random() * cols);
      this.row = Math.floor(Math.random() * rows);
      this.progress = 0;
      this.speed = Math.random() * 0.02 + 0.01;
      this.dir = Math.random() < 0.5 ? 'h' : 'v';
      this.color = Math.random() < 0.5 ? '#00f2fe' : '#a855f7';
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1.0) {
        this.progress = 0;
        if (this.dir === 'h') {
          this.col = (this.col + 1) % cols;
        } else {
          this.row = (this.row + 1) % rows;
        }
        if (Math.random() < 0.2) {
          this.reset();
        }
      }
    }

    draw() {
      const idx = this.row * cols + this.col;
      const nextIdx = this.dir === 'h' 
        ? this.row * cols + ((this.col + 1) % cols)
        : ((this.row + 1) % rows) * cols + this.col;

      const p1 = points[idx];
      const p2 = points[nextIdx];
      
      if (!p1 || !p2) return;

      const x = p1.x + (p2.x - p1.x) * this.progress;
      const y = p1.y + (p2.y - p1.y) * this.progress;

      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  const sparks = Array.from({ length: 12 }, () => new GridSpark());

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#06060c';
    ctx.fillRect(0, 0, width, height);

    const bubbleRadius = 180;
    const forceFactor = 0.55;

    points.forEach(p => {
      let targetX = p.origX;
      let targetY = p.origY;

      if (mouse.active) {
        const dx = p.origX - mouse.x;
        const dy = p.origY - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < bubbleRadius) {
          const force = (bubbleRadius - dist) / bubbleRadius;
          const shift = force * bubbleRadius * forceFactor;
          targetX += (dx / dist) * shift;
          targetY += (dy / dist) * shift;
        }
      }

      const ax = (targetX - p.x) * 0.12;
      const ay = (targetY - p.y) * 0.12;
      
      p.vx = (p.vx + ax) * 0.82;
      p.vy = (p.vy + ay) * 0.82;
      
      p.x += p.vx;
      p.y += p.vy;
    });

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 0.8;

    for (let r = 0; r < rows; r++) {
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const p = points[r * cols + c];
        if (c === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    for (let c = 0; c < cols; c++) {
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        const p = points[r * cols + c];
        if (r === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    if (mouse.active) {
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.12)';
      ctx.lineWidth = 1.2;
      points.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < bubbleRadius - 40) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
    }

    sparks.forEach(s => {
      s.update();
      s.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
    window.removeEventListener('resize', generateGrid);
  });
}`,
  css: `/* Refractive Glass Matrix Styles */
.refraction-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #06060c;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.refraction-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design a highly premium 3D perspective grid refractive glass matrix animation with coordinate bubble warping, trailing glow sparks, and pointer connection paths.'
};
