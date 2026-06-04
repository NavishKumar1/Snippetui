/**
 * Component: Aurora Solar Winds
 * Category: background-animations
 */

export const component = {
  id: 'aurora-solar-winds',
  name: 'Aurora Solar Winds',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="aurora-sandbox" id="aurora-sandbox-container">
  <canvas class="aurora-canvas" id="aurora-canvas-element"></canvas>

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
      <h1 class="demo-headline">Warp through the magnetic polar solar winds of design!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Aurora Solar Winds polar magnetic ribbon fluid logic
const container = document.getElementById('aurora-sandbox-container');
if (container) {
  const canvas = container.querySelector('#aurora-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Track dynamic mouse positions for magnetic gravity pull
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

  // Aurora wave points system
  const ribbonCount = 5;
  const resolution = 40;
  const timeSpeed = 0.0035;

  class AuroraRibbon {
    constructor(color, baseHeight, amplitude, frequency) {
      this.color = color;
      this.baseHeight = baseHeight;
      this.amplitude = amplitude;
      this.frequency = frequency;
      this.phase = Math.random() * Math.PI * 2;
    }

    draw(time) {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      
      // Setup thick electrical glow shadow on GPU
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 32;

      for (let x = 0; x <= resolution; x++) {
        const xPos = (x / resolution) * width;
        
        // Dynamic sine wave height calculation
        let waveY = this.baseHeight + Math.sin(xPos * this.frequency + this.phase + time) * this.amplitude;
        
        // Adding secondary wave layer for complex biological organic motion
        waveY += Math.sin(xPos * (this.frequency * 2) - time * 0.8) * (this.amplitude * 0.35);

        // Magnetic cursor interaction
        if (mouse.active) {
          const dx = xPos - mouse.x;
          const dy = waveY - mouse.y;
          const dist = Math.hypot(dx, dy);
          const limitDist = 180;

          if (dist < limitDist) {
            const pull = (limitDist - dist) / limitDist;
            // Pull coordinates elastically toward mouse
            waveY += (mouse.y - waveY) * pull * 0.65;
          }
        }

        if (x === 0) ctx.moveTo(xPos, waveY);
        else ctx.lineTo(xPos, waveY);
      }
      ctx.stroke();
    }
  }

  const ribbons = [
    new AuroraRibbon('rgba(0, 255, 135, 0.42)', height * 0.38, 48, 0.0042),
    new AuroraRibbon('rgba(0, 242, 254, 0.38)', height * 0.46, 62, 0.0032),
    new AuroraRibbon('rgba(139, 92, 246, 0.32)', height * 0.52, 70, 0.0028),
    new AuroraRibbon('rgba(255, 0, 127, 0.26)', height * 0.60, 50, 0.0038),
    new AuroraRibbon('rgba(0, 255, 135, 0.28)', height * 0.68, 55, 0.0046)
  ];

  // Scoped Render Loop
  let active = true;
  let startTime = Date.now();
  const loop = () => {
    if (!active) return;

    // Draw deep polar night dark sky
    ctx.fillStyle = '#05040a';
    ctx.fillRect(0, 0, width, height);

    const elapsed = (Date.now() - startTime) * timeSpeed;

    ribbons.forEach(ribbon => {
      ribbon.draw(elapsed);
    });

    // Reset shadow blur
    ctx.shadowBlur = 0;

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
const container = document.getElementById('aurora-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#aurora-canvas-element') as HTMLCanvasElement;
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

  const resolution = 40;
  const timeSpeed = 0.0035;

  class AuroraRibbon {
    color: string;
    baseHeight: number;
    amplitude: number;
    frequency: number;
    phase: number;

    constructor(color: string, baseHeight: number, amplitude: number, frequency: number) {
      this.color = color;
      this.baseHeight = baseHeight;
      this.amplitude = amplitude;
      this.frequency = frequency;
      this.phase = Math.random() * Math.PI * 2;
    }

    draw(time: number) {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 32;

      for (let x = 0; x <= resolution; x++) {
        const xPos = (x / resolution) * width;
        let waveY = this.baseHeight + Math.sin(xPos * this.frequency + this.phase + time) * this.amplitude;
        waveY += Math.sin(xPos * (this.frequency * 2) - time * 0.8) * (this.amplitude * 0.35);

        if (mouse.active) {
          const dx = xPos - mouse.x;
          const dy = waveY - mouse.y;
          const dist = Math.hypot(dx, dy);
          const limitDist = 180;

          if (dist < limitDist) {
            const pull = (limitDist - dist) / limitDist;
            waveY += (mouse.y - waveY) * pull * 0.65;
          }
        }

        if (x === 0) ctx.moveTo(xPos, waveY);
        else ctx.lineTo(xPos, waveY);
      }
      ctx.stroke();
    }
  }

  const ribbons = [
    new AuroraRibbon('rgba(0, 255, 135, 0.42)', height * 0.38, 48, 0.0042),
    new AuroraRibbon('rgba(0, 242, 254, 0.38)', height * 0.46, 62, 0.0032),
    new AuroraRibbon('rgba(139, 92, 246, 0.32)', height * 0.52, 70, 0.0028),
    new AuroraRibbon('rgba(255, 0, 127, 0.26)', height * 0.60, 50, 0.0038),
    new AuroraRibbon('rgba(0, 255, 135, 0.28)', height * 0.68, 55, 0.0046)
  ];

  let active = true;
  let startTime = Date.now();
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#05040a';
    ctx.fillRect(0, 0, width, height);

    const elapsed = (Date.now() - startTime) * timeSpeed;

    ribbons.forEach(ribbon => {
      ribbon.draw(elapsed);
    });

    ctx.shadowBlur = 0;

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Aurora Solar Winds styles */
.aurora-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #05040a;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.aurora-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<div class="relative w-full h-[480px] bg-[#05040a] rounded-[24px] overflow-hidden" id="aurora-sandbox-container">
  <canvas class="w-full h-full block" id="aurora-canvas-element"></canvas>

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
      <h1 class="demo-headline">Warp through the magnetic polar solar winds of design!</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Get started</button>
        <button class="demo-secondary-btn">Learn more</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design a polar aurora solar winds magnetic field line simulation with multiple neon green, purple, and blue glowing waves warping dynamically under custom pointer gravity forces.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
