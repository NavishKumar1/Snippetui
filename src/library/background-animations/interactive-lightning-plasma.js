/**
 * Component: Interactive Electric Lightning
 * Category: background-animations
 */

export const component = {
  id: 'interactive-lightning-plasma',
  name: 'Interactive Electric Lightning',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="lightning-sandbox" id="lightning-sandbox-container">
  <canvas class="lightning-canvas" id="lightning-canvas-element"></canvas>

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
      <h1 class="demo-headline">High-voltage electric interfaces charging up your users!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Interactive Electric Lightning fractal plasma arc engine
const container = document.getElementById('lightning-sandbox-container');
if (container) {
  const canvas = container.querySelector('#lightning-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Track dynamic mouse position and click trigger
  let mouse = { x: width / 2, y: height * 0.8, active: false };
  let screenFlash = 0; // Screen flash opacity tracker

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  container.addEventListener('mousedown', () => {
    // Trigger intense high-voltage screen flash on user click
    screenFlash = 0.95;
  });

  // Handle resizing
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  // Fractal lightning generation function using perpendicular mid-point displacement
  function generateLightningPath(x1, y1, x2, y2, displacement) {
    const path = [];
    
    const subdivide = (xa, ya, xb, yb, disp) => {
      if (disp < 1.8) {
        path.push({ x: xa, y: ya });
        return;
      }
      
      // Calculate midpoint coordinates
      const midX = (xa + xb) / 2;
      const midY = (ya + yb) / 2;
      
      // Midpoint displacement vector perpendicular to original segment angle
      const dx = xb - xa;
      const dy = yb - ya;
      const length = Math.hypot(dx, dy);
      
      // Perpendicular unit vector
      const nx = -dy / length;
      const ny = dx / length;
      
      // Displace
      const offset = (Math.random() - 0.5) * disp;
      const mx = midX + nx * offset;
      const my = midY + ny * offset;
      
      // Recursively subdivide left and right segments
      subdivide(xa, ya, mx, my, disp * 0.52);
      subdivide(mx, my, xb, yb, disp * 0.52);
    };
    
    subdivide(x1, y1, x2, y2, displacement);
    path.push({ x: x2, y: y2 });
    return path;
  }

  // Scoped Render Loop
  let active = true;
  const loop = () => {
    if (!active) return;

    // Deep plasma black background with faint residual frame decay for motion tail blurs
    ctx.fillStyle = 'rgba(4, 3, 8, 0.28)';
    ctx.fillRect(0, 0, width, height);

    // Dynamic screen lightning flash handler
    if (screenFlash > 0.01) {
      ctx.fillStyle = \`rgba(157, 78, 221, \${screenFlash * 0.22})\`;
      ctx.fillRect(0, 0, width, height);
      screenFlash *= 0.88; // Quick decay
    }

    // Determine lightning target position
    let targetX = mouse.active ? mouse.x : width / 2 + Math.sin(Date.now() * 0.003) * (width * 0.25);
    let targetY = mouse.active ? mouse.y : height * 0.78 + Math.cos(Date.now() * 0.002) * 40;

    // Lightning generation tick (approx 12-15 times per second for realistic organic strike intervals)
    if (Math.random() < 0.24 || screenFlash > 0.6) {
      // Main bolt origin (top center-left to create natural strike angles)
      const startX = width / 2 + (Math.random() - 0.5) * 120;
      const startY = -10;

      // 1. Generate Primary High Voltage Fractal Path
      const mainBoltPath = generateLightningPath(startX, startY, targetX, targetY, 110);

      // Render outer dark-purple electrical discharge glow
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(180, 74, 255, 0.45)';
      ctx.lineWidth = Math.random() * 5 + 4;
      ctx.shadowColor = '#bc34fa';
      ctx.shadowBlur = 22;
      mainBoltPath.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();

      // Render secondary core white high-energy laser spark
      ctx.beginPath();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = Math.random() * 2 + 1.2;
      ctx.shadowBlur = 0; // Turn off shadows for sharp high-energy core
      mainBoltPath.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();

      // 2. Generate side branching arcs
      const branchCount = Math.random() * 3 + 1;
      for (let b = 0; b < branchCount; b++) {
        // Pick a random node on the main bolt to branch from
        if (mainBoltPath.length < 5) continue;
        const branchIndex = Math.floor(Math.random() * (mainBoltPath.length - 2)) + 1;
        const bStart = mainBoltPath[branchIndex];

        // Branch direction vectors slightly pointing downwards
        const bEndX = bStart.x + (Math.random() - 0.5) * 180;
        const bEndY = bStart.y + Math.random() * 120 + 30;

        const branchPath = generateLightningPath(bStart.x, bStart.y, bEndX, bEndY, 45);

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.lineWidth = Math.random() * 2 + 0.5;
        ctx.shadowColor = '#9d4ede';
        ctx.shadowBlur = 10;
        branchPath.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }
      
      // Reset shadows
      ctx.shadowBlur = 0;
    }

    // Draw ambient plasma spark around cursor
    if (mouse.active) {
      ctx.beginPath();
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 45);
      grad.addColorStop(0, 'rgba(188, 52, 250, 0.16)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
      ctx.fill();
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
const container = document.getElementById('lightning-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#lightning-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: width / 2, y: height * 0.8, active: false };
  let screenFlash = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  container.addEventListener('mousedown', () => {
    screenFlash = 0.95;
  });

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  interface Point {
    x: number;
    y: number;
  }

  function generateLightningPath(x1: number, y1: number, x2: number, y2: number, displacement: number): Point[] {
    const path: Point[] = [];
    
    const subdivide = (xa: number, ya: number, xb: number, yb: number, disp: number) => {
      if (disp < 1.8) {
        path.push({ x: xa, y: ya });
        return;
      }
      
      const midX = (xa + xb) / 2;
      const midY = (ya + yb) / 2;
      
      const dx = xb - xa;
      const dy = yb - ya;
      const length = Math.hypot(dx, dy);
      
      const nx = -dy / length;
      const ny = dx / length;
      
      const offset = (Math.random() - 0.5) * disp;
      const mx = midX + nx * offset;
      const my = midY + ny * offset;
      
      subdivide(xa, ya, mx, my, disp * 0.52);
      subdivide(mx, my, xb, yb, disp * 0.52);
    };
    
    subdivide(x1, y1, x2, y2, displacement);
    path.push({ x: x2, y: y2 });
    return path;
  }

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = 'rgba(4, 3, 8, 0.28)';
    ctx.fillRect(0, 0, width, height);

    if (screenFlash > 0.01) {
      ctx.fillStyle = \`rgba(157, 78, 221, \smash{\${screenFlash * 0.22}})\`;
      ctx.fillRect(0, 0, width, height);
      screenFlash *= 0.88;
    }

    const targetX = mouse.active ? mouse.x : width / 2 + Math.sin(Date.now() * 0.003) * (width * 0.25);
    const targetY = mouse.active ? mouse.y : height * 0.78 + Math.cos(Date.now() * 0.002) * 40;

    if (Math.random() < 0.24 || screenFlash > 0.6) {
      const startX = width / 2 + (Math.random() - 0.5) * 120;
      const startY = -10;

      const mainBoltPath = generateLightningPath(startX, startY, targetX, targetY, 110);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(180, 74, 255, 0.45)';
      ctx.lineWidth = Math.random() * 5 + 4;
      ctx.shadowColor = '#bc34fa';
      ctx.shadowBlur = 22;
      mainBoltPath.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = Math.random() * 2 + 1.2;
      ctx.shadowBlur = 0;
      mainBoltPath.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();

      const branchCount = Math.random() * 3 + 1;
      for (let b = 0; b < branchCount; b++) {
        if (mainBoltPath.length < 5) continue;
        const branchIndex = Math.floor(Math.random() * (mainBoltPath.length - 2)) + 1;
        const bStart = mainBoltPath[branchIndex];

        const bEndX = bStart.x + (Math.random() - 0.5) * 180;
        const bEndY = bStart.y + Math.random() * 120 + 30;

        const branchPath = generateLightningPath(bStart.x, bStart.y, bEndX, bEndY, 45);

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.lineWidth = Math.random() * 2 + 0.5;
        ctx.shadowColor = '#9d4ede';
        ctx.shadowBlur = 10;
        branchPath.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }
      
      ctx.shadowBlur = 0;
    }

    if (mouse.active) {
      ctx.beginPath();
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 45);
      grad.addColorStop(0, 'rgba(188, 52, 250, 0.16)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Interactive Electric Lightning styles */
.lightning-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #040308;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.lightning-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<div class="relative w-full h-[480px] bg-[#040308] rounded-[24px] overflow-hidden" id="lightning-sandbox-container">
  <canvas class="w-full h-full block" id="lightning-canvas-element"></canvas>

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
      <h1 class="demo-headline">High-voltage electric interfaces charging up your users!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design a highly creative interactive electric lightning plasma background animation with dynamic fractal branches targeting pointer clicks and cursor moves.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
