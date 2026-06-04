/**
 * Component: Glitch Digital Rainstorm
 * Category: background-animations
 */

export const component = {
  id: 'glitch-rainstorm',
  name: 'Glitch Digital Rainstorm',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="glitch-rain-sandbox" id="glitch-rain-container">
  <canvas class="glitch-rain-canvas" id="glitch-rain-canvas-element"></canvas>

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
        <a href="#">Systems</a>
        <button class="demo-signup-btn">Bypass Firewalls</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>Cyber Sandbox</span> Digital Rain</div>
      <h1 class="demo-headline">Matrix-inspired terminal graphics with dynamic color glitch splits</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Decrypt</button>
        <button class="demo-secondary-btn">Override Shield</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Glitch Digital Rainstorm - Premium Matrix-style falling code with chromatic glitching & mouse shield deflection
const container = document.getElementById('glitch-rain-container');
if (container) {
  const canvas = container.querySelector('#glitch-rain-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let mouse = { x: -1000, y: -1000, active: false, radius: 100 };

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
    setupColumns();
  };
  window.addEventListener('resize', resize);

  const fontSize = 14;
  const chars = '01EX💻☣️⚡🤖⚙️🔓👾';
  let columns = [];

  class RainDrop {
    constructor(x) {
      this.x = x;
      this.reset();
      this.y = Math.random() * -height; // Start off-screen
    }

    reset() {
      this.y = Math.random() * -180 - 20;
      this.speed = Math.random() * 3 + 2;
      this.charsCount = Math.floor(Math.random() * 15 + 10);
      this.opacity = Math.random() * 0.6 + 0.4;
      this.glitch = Math.random() < 0.05; // 5% chance of color split column
    }

    update() {
      this.y += this.speed;

      // Mouse deflection shield
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          // Push droplet out to the sides
          this.x += (dx / dist) * this.speed * 1.5;
        } else {
          // Slowly align back to grid column x coordinate
          const gridColX = Math.floor(this.x / fontSize) * fontSize;
          this.x += (gridColX - this.x) * 0.05;
        }
      }

      if (this.y > height + 200) {
        this.reset();
      }
    }

    draw() {
      ctx.font = \`\${fontSize}px monospace\`;

      for (let i = 0; i < this.charsCount; i++) {
        const cy = this.y - (i * fontSize);
        if (cy < 0 || cy > height) continue;

        // The head of the raindrop is white, trailing body is green/cyan
        const alpha = Math.max(0, this.opacity * (1 - (i / this.charsCount)));
        const char = chars[Math.floor(Math.random() * chars.length)];

        if (i === 0) {
          ctx.fillStyle = \`rgba(255, 255, 255, \${alpha * 0.95})\`;
        } else {
          // Normal color: Neon cyan to emerald green
          const g = Math.floor(180 + (1 - i / this.charsCount) * 75);
          ctx.fillStyle = \`rgba(34, \${g}, 180, \${alpha})\`;
        }

        // Chromatic split glitch rendering
        if (this.glitch && Math.random() < 0.08) {
          // Red channel offset
          ctx.fillStyle = \`rgba(239, 68, 68, \${alpha * 0.85})\`;
          ctx.fillText(char, this.x - 4, cy);
          // Cyan channel offset
          ctx.fillStyle = \`rgba(6, 182, 212, \${alpha * 0.85})\`;
          ctx.fillText(char, this.x + 4, cy);
        } else {
          ctx.fillText(char, this.x, cy);
        }
      }
    }
  }

  const setupColumns = () => {
    columns = [];
    const colsCount = Math.floor(width / fontSize);
    for (let i = 0; i < colsCount; i++) {
      columns.push(new RainDrop(i * fontSize));
    }
  };
  setupColumns();

  let active = true;
  const loop = () => {
    if (!active) return;

    // Fading transparent black background creates falling trail
    ctx.fillStyle = 'rgba(4, 4, 8, 0.28)';
    ctx.fillRect(0, 0, width, height);

    columns.forEach(col => {
      col.update();
      col.draw();
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
  ts: `// Glitch Digital Rainstorm TypeScript Logic
const container = document.getElementById('glitch-rain-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#glitch-rain-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false, radius: 100 };

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
    setupColumns();
  };
  window.addEventListener('resize', resize);

  const fontSize = 14;
  const chars = '01EX💻☣️⚡🤖⚙️🔓👾';
  let columns: RainDrop[] = [];

  class RainDrop {
    x: number;
    y!: number;
    speed!: number;
    charsCount!: number;
    opacity!: number;
    glitch!: boolean;

    constructor(x: number) {
      this.x = x;
      this.reset();
      this.y = Math.random() * -height;
    }

    reset() {
      this.y = Math.random() * -180 - 20;
      this.speed = Math.random() * 3 + 2;
      this.charsCount = Math.floor(Math.random() * 15 + 10);
      this.opacity = Math.random() * 0.6 + 0.4;
      this.glitch = Math.random() < 0.05;
    }

    update() {
      this.y += this.speed;

      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          this.x += (dx / dist) * this.speed * 1.5;
        } else {
          const gridColX = Math.floor(this.x / fontSize) * fontSize;
          this.x += (gridColX - this.x) * 0.05;
        }
      }

      if (this.y > height + 200) {
        this.reset();
      }
    }

    draw() {
      ctx.font = \`\${fontSize}px monospace\`;

      for (let i = 0; i < this.charsCount; i++) {
        const cy = this.y - (i * fontSize);
        if (cy < 0 || cy > height) continue;

        const alpha = Math.max(0, this.opacity * (1 - (i / this.charsCount)));
        const char = chars[Math.floor(Math.random() * chars.length)];

        if (i === 0) {
          ctx.fillStyle = \`rgba(255, 255, 255, \${alpha * 0.95})\`;
        } else {
          const g = Math.floor(180 + (1 - i / this.charsCount) * 75);
          ctx.fillStyle = \`rgba(34, \${g}, 180, \${alpha})\`;
        }

        if (this.glitch && Math.random() < 0.08) {
          ctx.fillStyle = \`rgba(239, 68, 68, \${alpha * 0.85})\`;
          ctx.fillText(char, this.x - 4, cy);
          ctx.fillStyle = \`rgba(6, 182, 212, \${alpha * 0.85})\`;
          ctx.fillText(char, this.x + 4, cy);
        } else {
          ctx.fillText(char, this.x, cy);
        }
      }
    }
  }

  const setupColumns = () => {
    columns = [];
    const colsCount = Math.floor(width / fontSize);
    for (let i = 0; i < colsCount; i++) {
      columns.push(new RainDrop(i * fontSize));
    }
  };
  setupColumns();

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = 'rgba(4, 4, 8, 0.28)';
    ctx.fillRect(0, 0, width, height);

    columns.forEach(col => {
      col.update();
      col.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Glitch Digital Rainstorm styles */
.glitch-rain-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #040408;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.glitch-rain-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design a high-end cyberpunk Matrix falling binary rain background animation featuring chromatic color splits and deflective pointer rain shield physics.'
};
