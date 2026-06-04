/**
 * Component: Supernova Starfield Warp
 * Category: background-animations
 */

export const component = {
  id: 'supernova-starfield-warp',
  name: 'Supernova Starfield Warp',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="warp-sandbox" id="warp-sandbox-container">
  <canvas class="warp-canvas" id="warp-canvas-element"></canvas>

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
      <h1 class="demo-headline">Warp through the infinite dimensions of premium design!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Supernova Starfield Warp 3D cosmic perspective projection
const container = document.getElementById('warp-sandbox-container');
if (container) {
  const canvas = container.querySelector('#warp-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Track dynamic mouse positions for camera perspective tilts
  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
  let warpSpeed = 1.0;
  let targetWarp = 1.0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
  });

  container.addEventListener('mousedown', () => {
    // Hyperdrive acceleration trigger on mouse click
    targetWarp = 18.0;
  });

  container.addEventListener('mouseup', () => {
    targetWarp = 1.0;
  });

  container.addEventListener('mouseleave', () => {
    mouse.targetX = width / 2;
    mouse.targetY = height / 2;
    targetWarp = 1.0;
  });

  // Handle resizing
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  // 3D Star constructor
  const starsCount = 140;
  class Star {
    constructor() {
      this.reset();
      // Distribute randomly in Z depth plane initially
      this.z = Math.random() * 1000;
    }

    reset() {
      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = (Math.random() - 0.5) * height * 1.5;
      this.z = 1000;
      this.color = Math.random() > 0.5 ? '#9d4ede' : '#00f2fe';
    }

    update(speed) {
      this.z -= speed;
      if (this.z <= 0) {
        this.reset();
      }
    }

    draw() {
      // 3D Coordinate Projection onto 2D viewport
      const focalLength = 300;
      
      // Shift origin based on mouse movement for realistic camera tilt panning
      const shiftedX = this.x - (mouse.x - width / 2) * 0.42;
      const shiftedY = this.y - (mouse.y - height / 2) * 0.42;

      const px = width / 2 + (shiftedX * (focalLength / this.z));
      const py = height / 2 + (shiftedY * (focalLength / this.z));

      // Skip rendering if outside viewport boundaries
      if (px < 0 || px > width || py < 0 || py > height) return;

      // Draw volumetric moving line/streak. Larger speed = longer streak lines
      const prevZ = this.z + warpSpeed * 1.5;
      const prevPx = width / 2 + (shiftedX * (focalLength / prevZ));
      const prevPy = height / 2 + (shiftedY * (focalLength / prevZ));

      const size = Math.max(0.5, (1000 - this.z) * 0.0028);

      ctx.beginPath();
      ctx.strokeStyle = this.color;
      // High speed warp lines become thicker and longer
      ctx.lineWidth = size * (warpSpeed > 5 ? 1.5 : 0.8);
      ctx.moveTo(px, py);
      ctx.lineTo(prevPx, prevPy);
      ctx.stroke();
    }
  }

  const stars = Array.from({ length: starsCount }, () => new Star());

  // Scoped Render Loop
  let active = true;
  const loop = () => {
    if (!active) return;

    // Faint decay fill to create beautiful trailing blur streaks
    ctx.fillStyle = 'rgba(6, 4, 14, 0.22)';
    ctx.fillRect(0, 0, width, height);

    // Spring/LERP mouse coordinates & warp speeds elastically
    mouse.x += (mouse.targetX - mouse.x) * 0.07;
    mouse.y += (mouse.targetY - mouse.y) * 0.07;
    warpSpeed += (targetWarp - warpSpeed) * 0.065;

    // Draw central cosmic core nebula glow
    const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 140 + warpSpeed * 4);
    grad.addColorStop(0, 'rgba(157, 78, 221, 0.16)');
    grad.addColorStop(0.5, 'rgba(0, 242, 254, 0.05)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(width/2, height/2, 140 + warpSpeed * 4, 0, Math.PI * 2);
    ctx.fill();

    // Update and draw stars
    stars.forEach(star => {
      star.update(4.5 + warpSpeed * 1.2);
      star.draw();
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
const container = document.getElementById('warp-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#warp-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
  let warpSpeed = 1.0;
  let targetWarp = 1.0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
  });

  container.addEventListener('mousedown', () => {
    targetWarp = 18.0;
  });

  container.addEventListener('mouseup', () => {
    targetWarp = 1.0;
  });

  container.addEventListener('mouseleave', () => {
    mouse.targetX = width / 2;
    mouse.targetY = height / 2;
    targetWarp = 1.0;
  });

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

  class Star {
    x!: number;
    y!: number;
    z!: number;
    color!: string;

    constructor() {
      this.reset();
      this.z = Math.random() * 1000;
    }

    reset() {
      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = (Math.random() - 0.5) * height * 1.5;
      this.z = 1000;
      this.color = Math.random() > 0.5 ? '#9d4ede' : '#00f2fe';
    }

    update(speed: number) {
      this.z -= speed;
      if (this.z <= 0) {
        this.reset();
      }
    }

    draw() {
      const focalLength = 300;
      const shiftedX = this.x - (mouse.x - width / 2) * 0.42;
      const shiftedY = this.y - (mouse.y - height / 2) * 0.42;

      const px = width / 2 + (shiftedX * (focalLength / this.z));
      const py = height / 2 + (shiftedY * (focalLength / this.z));

      if (px < 0 || px > width || py < 0 || py > height) return;

      const prevZ = this.z + warpSpeed * 1.5;
      const prevPx = width / 2 + (shiftedX * (focalLength / prevZ));
      const prevPy = height / 2 + (shiftedY * (focalLength / prevZ));

      const size = Math.max(0.5, (1000 - this.z) * 0.0028);

      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = size * (warpSpeed > 5 ? 1.5 : 0.8);
      ctx.moveTo(px, py);
      ctx.lineTo(prevPx, prevPy);
      ctx.stroke();
    }
  }

  const stars = Array.from({ length: 140 }, () => new Star());

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = 'rgba(6, 4, 14, 0.22)';
    ctx.fillRect(0, 0, width, height);

    mouse.x += (mouse.targetX - mouse.x) * 0.07;
    mouse.y += (mouse.targetY - mouse.y) * 0.07;
    warpSpeed += (targetWarp - warpSpeed) * 0.065;

    const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 140 + warpSpeed * 4);
    grad.addColorStop(0, 'rgba(157, 78, 221, 0.16)');
    grad.addColorStop(0.5, 'rgba(0, 242, 254, 0.05)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(width/2, height/2, 140 + warpSpeed * 4, 0, Math.PI * 2);
    ctx.fill();

    stars.forEach(star => {
      star.update(4.5 + warpSpeed * 1.2);
      star.draw();
    });

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Supernova Starfield Warp styles */
.warp-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #06040e;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.warp-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<div class="relative w-full h-[480px] bg-[#06040e] rounded-[24px] overflow-hidden" id="warp-sandbox-container">
  <canvas class="w-full h-full block" id="warp-canvas-element"></canvas>

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
      <h1 class="demo-headline">Warp through the infinite dimensions of premium design!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design a 3D perspective cosmic starfield tunnel hyperdrive warp background animation tilting with camera panning and accelerating on clicks.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
