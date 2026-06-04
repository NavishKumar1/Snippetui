/**
 * Component: Auroral Ribbon Curvature
 * Category: background-animations
 */

export const component = {
  id: 'auroral-ribbon-curve',
  name: 'Auroral Ribbon Curvature',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="auroral-ribbon-sandbox" id="auroral-ribbon-container">
  <canvas class="auroral-ribbon-canvas" id="auroral-ribbon-canvas-element"></canvas>

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
        <a href="#">Aurora</a>
        <a href="#">Design</a>
        <button class="demo-signup-btn">Calibrate Lights</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>Atmospheric Fluidity</span> Solar Storms</div>
      <h1 class="demo-headline">Volumetric northern light curves generated mathematically</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Boost Ionization</button>
        <button class="demo-secondary-btn">Color Profiles</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Auroral Ribbon Curvature - Volumetric glowing northern light curves
const container = document.getElementById('auroral-ribbon-container');
if (container) {
  const canvas = container.querySelector('#auroral-ribbon-canvas-element');
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

  // Setup multiple auroral ribbons
  const ribbons = [
    {
      yOffset: height * 0.45,
      amplitude: 55,
      speed: 0.0008,
      freq: 0.003,
      color: { r: 16, g: 185, b: 129 }, // Emerald Green
      height: 90
    },
    {
      yOffset: height * 0.52,
      amplitude: 70,
      speed: 0.0006,
      freq: 0.002,
      color: { r: 6, g: 182, b: 212 }, // Cyan Blue
      height: 120
    },
    {
      yOffset: height * 0.6,
      amplitude: 45,
      speed: 0.0011,
      freq: 0.004,
      color: { r: 217, g: 70, b: 239 }, // Magenta Pink
      height: 80
    }
  ];

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#020204';
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'screen';

    const time = Date.now();

    ribbons.forEach(rib => {
      ctx.beginPath();
      
      const grad = ctx.createLinearGradient(0, rib.yOffset - rib.height, 0, rib.yOffset + rib.height);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.3, \`rgba(\${rib.color.r}, \${rib.color.g}, \${rib.color.b}, 0.28)\`);
      grad.addColorStop(0.5, \`rgba(\${rib.color.r}, \${rib.color.g}, \${rib.color.b}, 0.45)\`);
      grad.addColorStop(0.7, \`rgba(\${rib.color.r}, \${rib.color.g}, \${rib.color.b}, 0.15)\`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;

      // Draw top boundary
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 15) {
        // Base math oscillation
        let waveY = Math.sin(x * rib.freq + time * rib.speed) * rib.amplitude;
        
        // Add harmonic detail
        waveY += Math.sin(x * 0.01 + time * 0.0025) * 15;

        // Mouse perturbation
        if (mouse.active) {
          const dx = x - mouse.x;
          if (Math.abs(dx) < 160) {
            const pull = (160 - Math.abs(dx)) / 160;
            waveY += (mouse.y - (rib.yOffset + waveY)) * pull * 0.28;
          }
        }

        ctx.lineTo(x, rib.yOffset + waveY - rib.height / 2);
      }

      // Draw bottom boundary
      for (let x = width; x >= 0; x -= 15) {
        let waveY = Math.sin(x * rib.freq + time * rib.speed) * rib.amplitude;
        waveY += Math.sin(x * 0.01 + time * 0.0025) * 15;

        if (mouse.active) {
          const dx = x - mouse.x;
          if (Math.abs(dx) < 160) {
            const pull = (160 - Math.abs(dx)) / 160;
            waveY += (mouse.y - (rib.yOffset + waveY)) * pull * 0.28;
          }
        }

        ctx.lineTo(x, rib.yOffset + waveY + rib.height / 2);
      }

      ctx.closePath();
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';

    requestAnimationFrame(loop);
  };
  loop();

  // Scoped cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  ts: `// Auroral Ribbon Curvature TypeScript Logic
const container = document.getElementById('auroral-ribbon-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#auroral-ribbon-canvas-element') as HTMLCanvasElement;
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

  interface Ribbon {
    yOffset: number;
    amplitude: number;
    speed: number;
    freq: number;
    color: { r: number; g: number; b: number };
    height: number;
  }

  const ribbons: Ribbon[] = [
    {
      yOffset: height * 0.45,
      amplitude: 55,
      speed: 0.0008,
      freq: 0.003,
      color: { r: 16, g: 185, b: 129 },
      height: 90
    },
    {
      yOffset: height * 0.52,
      amplitude: 70,
      speed: 0.0006,
      freq: 0.002,
      color: { r: 6, g: 182, b: 212 },
      height: 120
    },
    {
      yOffset: height * 0.6,
      amplitude: 45,
      speed: 0.0011,
      freq: 0.004,
      color: { r: 217, g: 70, b: 239 },
      height: 80
    }
  ];

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#020204';
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'screen';

    const time = Date.now();

    ribbons.forEach(rib => {
      ctx.beginPath();
      
      const grad = ctx.createLinearGradient(0, rib.yOffset - rib.height, 0, rib.yOffset + rib.height);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.3, \`rgba(\${rib.color.r}, \${rib.color.g}, \${rib.color.b}, 0.28)\`);
      grad.addColorStop(0.5, \`rgba(\${rib.color.r}, \${rib.color.g}, \${rib.color.b}, 0.45)\`);
      grad.addColorStop(0.7, \`rgba(\${rib.color.r}, \${rib.color.g}, \${rib.color.b}, 0.15)\`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;

      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 15) {
        let waveY = Math.sin(x * rib.freq + time * rib.speed) * rib.amplitude;
        waveY += Math.sin(x * 0.01 + time * 0.0025) * 15;

        if (mouse.active) {
          const dx = x - mouse.x;
          if (Math.abs(dx) < 160) {
            const pull = (160 - Math.abs(dx)) / 160;
            waveY += (mouse.y - (rib.yOffset + waveY)) * pull * 0.28;
          }
        }

        ctx.lineTo(x, rib.yOffset + waveY - rib.height / 2);
      }

      for (let x = width; x >= 0; x -= 15) {
        let waveY = Math.sin(x * rib.freq + time * rib.speed) * rib.amplitude;
        waveY += Math.sin(x * 0.01 + time * 0.0025) * 15;

        if (mouse.active) {
          const dx = x - mouse.x;
          if (Math.abs(dx) < 160) {
            const pull = (160 - Math.abs(dx)) / 160;
            waveY += (mouse.y - (rib.yOffset + waveY)) * pull * 0.28;
          }
        }

        ctx.lineTo(x, rib.yOffset + waveY + rib.height / 2);
      }

      ctx.closePath();
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Auroral Ribbon Curvature styles */
.auroral-ribbon-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #020204;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.auroral-ribbon-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design a highly premium atmospheric auroral light ribbon wave simulation using Canvas alpha composite screen blends and responsive sine wave coordinate deformations.'
};
