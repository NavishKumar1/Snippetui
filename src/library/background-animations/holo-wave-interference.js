/**
 * Component: Holographic Wave Interference
 * Category: background-animations
 */

export const component = {
  id: 'holo-wave-interference',
  name: 'Holographic Wave Interference',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="holo-wave-sandbox" id="holo-wave-container">
  <canvas class="holo-wave-canvas" id="holo-wave-canvas-element"></canvas>

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
        <a href="#">Holograms</a>
        <a href="#">System</a>
        <button class="demo-signup-btn">Calibrate Grid</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>Interference Math</span> Wave Mechanics</div>
      <h1 class="demo-headline">Constructive and destructive wave dynamics in light fields</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Emit Pulse</button>
        <button class="demo-secondary-btn">Oscilloscopes</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Holographic Wave Interference - Grid-based radial wave interference patterns
const container = document.getElementById('holo-wave-container');
if (container) {
  const canvas = container.querySelector('#holo-wave-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

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

  // Setup grid parameters for high-performance rendering
  const gridSpacing = 24;
  
  let active = true;
  let frame = 0;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#040307';
    ctx.fillRect(0, 0, width, height);

    const time = frame * 0.08;
    const wavelength = 55;

    // Define two source emitters for interference
    const emitter1 = { x: width * 0.35, y: height * 0.5 };
    const emitter2 = { x: mouse.active ? mouse.x : width * 0.65 + Math.sin(time * 0.5) * 80, y: mouse.active ? mouse.y : height * 0.5 + Math.cos(time * 0.4) * 50 };

    const cols = Math.ceil(width / gridSpacing);
    const rows = Math.ceil(height / gridSpacing);

    for (let c = 0; c <= cols; c++) {
      const gx = c * gridSpacing;
      for (let r = 0; r <= rows; r++) {
        const gy = r * gridSpacing;

        // Distances from both emitters
        const d1 = Math.hypot(gx - emitter1.x, gy - emitter1.y);
        const d2 = Math.hypot(gx - emitter2.x, gy - emitter2.y);

        // Sine wave calculations
        const w1 = Math.sin(d1 / wavelength - time);
        const w2 = Math.sin(d2 / wavelength - time);

        // Sum amplitudes for interference
        const amplitude = (w1 + w2) / 2; // range [-1, 1]
        
        // Map amplitude to size and color
        const dotSize = Math.max(0.5, (amplitude + 1) * 3);
        const colorIntensity = Math.abs(amplitude); // range [0, 1]

        ctx.beginPath();
        // Cyan-green/indigo holographic spectrum color depending on amplitude
        const hue = 180 + amplitude * 50; // Cyan to Cyan-Blue
        ctx.fillStyle = \`hsla(\${hue}, 90%, 65%, \${0.15 + colorIntensity * 0.55})\`;
        
        // Draw glowing circles
        ctx.arc(gx, gy, dotSize, 0, Math.PI * 2);
        ctx.fill();

        // Optional micro-connection lines for high-end look
        if (colorIntensity > 0.8) {
          ctx.beginPath();
          ctx.strokeStyle = \`rgba(6, 182, 212, \${(colorIntensity - 0.8) * 0.8})\`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(gx - 3, gy);
          ctx.lineTo(gx + 3, gy);
          ctx.moveTo(gx, gy - 3);
          ctx.lineTo(gx, gy + 3);
          ctx.stroke();
        }
      }
    }

    frame++;
    requestAnimationFrame(loop);
  };
  loop();

  // Scoped cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  ts: `// Holographic Wave Interference TypeScript Logic
const container = document.getElementById('holo-wave-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#holo-wave-canvas-element') as HTMLCanvasElement;
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

  const gridSpacing = 24;
  
  let active = true;
  let frame = 0;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#040307';
    ctx.fillRect(0, 0, width, height);

    const time = frame * 0.08;
    const wavelength = 55;

    const emitter1 = { x: width * 0.35, y: height * 0.5 };
    const emitter2 = { 
      x: mouse.active ? mouse.x : width * 0.65 + Math.sin(time * 0.5) * 80, 
      y: mouse.active ? mouse.y : height * 0.5 + Math.cos(time * 0.4) * 50 
    };

    const cols = Math.ceil(width / gridSpacing);
    const rows = Math.ceil(height / gridSpacing);

    for (let c = 0; c <= cols; c++) {
      const gx = c * gridSpacing;
      for (let r = 0; r <= rows; r++) {
        const gy = r * gridSpacing;

        const d1 = Math.hypot(gx - emitter1.x, gy - emitter1.y);
        const d2 = Math.hypot(gx - emitter2.x, gy - emitter2.y);

        const w1 = Math.sin(d1 / wavelength - time);
        const w2 = Math.sin(d2 / wavelength - time);

        const amplitude = (w1 + w2) / 2;
        const dotSize = Math.max(0.5, (amplitude + 1) * 3);
        const colorIntensity = Math.abs(amplitude);

        ctx.beginPath();
        const hue = 180 + amplitude * 50;
        ctx.fillStyle = \`hsla(\${hue}, 90%, 65%, \${0.15 + colorIntensity * 0.55})\`;
        ctx.arc(gx, gy, dotSize, 0, Math.PI * 2);
        ctx.fill();

        if (colorIntensity > 0.8) {
          ctx.beginPath();
          ctx.strokeStyle = \`rgba(6, 182, 212, \${(colorIntensity - 0.8) * 0.8})\`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(gx - 3, gy);
          ctx.lineTo(gx + 3, gy);
          ctx.moveTo(gx, gy - 3);
          ctx.lineTo(gx, gy + 3);
          ctx.stroke();
        }
      }
    }

    frame++;
    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Holographic Wave Interference styles */
.holo-wave-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #040307;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.holo-wave-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design a highly responsive, grid-based holographic radial wave interference visual overlay background that animates to track mouse coordinate oscillations.'
};
