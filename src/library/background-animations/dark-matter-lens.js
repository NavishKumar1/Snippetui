/**
 * Component: Dark Matter Lens
 * Category: background-animations
 */

export const component = {
  id: 'dark-matter-lens',
  name: 'Dark Matter Lens',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="dark-matter-sandbox" id="dark-matter-container">
  <canvas class="dark-matter-canvas" id="dark-matter-canvas-element"></canvas>

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
        <a href="#">Technology</a>
        <a href="#">Observatory</a>
        <button class="demo-signup-btn">Simulate Warp</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>Relativity Simulation</span> Gravity Lens</div>
      <h1 class="demo-headline">Warp light coordinates dynamically using gravitational math</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Toggle Singularity</button>
        <button class="demo-secondary-btn">Adjust Mass</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Dark Matter Lens - Gravitational lensing coordinate-warping grid
const container = document.getElementById('dark-matter-container');
if (container) {
  const canvas = container.querySelector('#dark-matter-canvas-element');
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
    setupGrid();
  };
  window.addEventListener('resize', resize);

  // Initialize a grid of particles
  let particles = [];
  const gridSpacing = 20;

  const setupGrid = () => {
    particles = [];
    for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
      for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
        particles.push({
          origX: x,
          origY: y,
          x: x,
          y: y,
          color: (Math.random() < 0.15) ? '#a855f7' : '#ffffff' // Lavender accents
        });
      }
    }
  };
  setupGrid();

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#020205';
    ctx.fillRect(0, 0, width, height);

    const lensRadius = 140;
    const gravityCenter = mouse.active ? mouse : { x: width / 2 + Math.sin(Date.now() * 0.001) * 100, y: height / 2 + Math.cos(Date.now() * 0.0008) * 60 };

    particles.forEach(p => {
      const dx = p.origX - gravityCenter.x;
      const dy = p.origY - gravityCenter.y;
      const dist = Math.hypot(dx, dy);

      if (dist < lensRadius) {
        // Gravitational lens deflection formula (Einstein Ring squeeze)
        // Deflection force is strong near the center but drops off
        const force = Math.pow((lensRadius - dist) / lensRadius, 1.8);
        const deflectionAngle = Math.atan2(dy, dx);
        
        // Push outward from singularity to create the lens shadow,
        // but squeeze at the boundary (creating Einstein ring glow)
        const deflectionDistance = force * 45;
        p.x = p.origX + Math.cos(deflectionAngle) * deflectionDistance;
        p.y = p.origY + Math.sin(deflectionAngle) * deflectionDistance;
      } else {
        // Return to origin
        p.x += (p.origX - p.x) * 0.1;
        p.y += (p.origY - p.y) * 0.1;
      }

      // Draw particle with size mapping relative to deflection
      const distDelta = Math.hypot(p.x - p.origX, p.y - p.origY);
      const dotRadius = distDelta > 3 ? 1.5 + (distDelta * 0.08) : 1.2;

      ctx.beginPath();
      if (p.color === '#a855f7') {
        // Volumetric glow for warped matter particles
        ctx.fillStyle = distDelta > 5 ? '#f472b6' : '#a855f7'; // Shift color under pressure
      } else {
        ctx.fillStyle = distDelta > 10 ? '#38bdf8' : 'rgba(255, 255, 255, 0.45)';
      }
      ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw dark event horizon border
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
    ctx.lineWidth = 2;
    ctx.arc(gravityCenter.x, gravityCenter.y, lensRadius, 0, Math.PI * 2);
    ctx.stroke();

    requestAnimationFrame(loop);
  };
  loop();

  // Scoped cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  ts: `// Dark Matter Lens TypeScript Logic
const container = document.getElementById('dark-matter-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#dark-matter-canvas-element') as HTMLCanvasElement;
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

  interface LensParticle {
    origX: number;
    origY: number;
    x: number;
    y: number;
    color: string;
  }

  let particles: LensParticle[] = [];
  const gridSpacing = 20;

  const setupGrid = () => {
    particles = [];
    for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
      for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
        particles.push({
          origX: x,
          origY: y,
          x: x,
          y: y,
          color: (Math.random() < 0.15) ? '#a855f7' : '#ffffff'
        });
      }
    }
  };
  setupGrid();

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    setupGrid();
  };
  window.addEventListener('resize', resize);

  let active = true;
  const loop = () => {
    if (!active) return;

    ctx.fillStyle = '#020205';
    ctx.fillRect(0, 0, width, height);

    const lensRadius = 140;
    const gravityCenter = mouse.active ? mouse : { 
      x: width / 2 + Math.sin(Date.now() * 0.001) * 100, 
      y: height / 2 + Math.cos(Date.now() * 0.0008) * 60 
    };

    particles.forEach(p => {
      const dx = p.origX - gravityCenter.x;
      const dy = p.origY - gravityCenter.y;
      const dist = Math.hypot(dx, dy);

      if (dist < lensRadius) {
        const force = Math.pow((lensRadius - dist) / lensRadius, 1.8);
        const deflectionAngle = Math.atan2(dy, dx);
        const deflectionDistance = force * 45;
        p.x = p.origX + Math.cos(deflectionAngle) * deflectionDistance;
        p.y = p.origY + Math.sin(deflectionAngle) * deflectionDistance;
      } else {
        p.x += (p.origX - p.x) * 0.1;
        p.y += (p.origY - p.y) * 0.1;
      }

      const distDelta = Math.hypot(p.x - p.origX, p.y - p.origY);
      const dotRadius = distDelta > 3 ? 1.5 + (distDelta * 0.08) : 1.2;

      ctx.beginPath();
      if (p.color === '#a855f7') {
        ctx.fillStyle = distDelta > 5 ? '#f472b6' : '#a855f7';
      } else {
        ctx.fillStyle = distDelta > 10 ? '#38bdf8' : 'rgba(255, 255, 255, 0.45)';
      }
      ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
    ctx.lineWidth = 2;
    ctx.arc(gravityCenter.x, gravityCenter.y, lensRadius, 0, Math.PI * 2);
    ctx.stroke();

    requestAnimationFrame(loop);
  };
  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
  });
}`,
  css: `/* Dark Matter Lens styles */
.dark-matter-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #020205;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.dark-matter-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: 'Design a highly premium relativity-based dark matter gravitational lensing mesh where matter coordinates deflect dynamically to build an Einstein Ring visual glow.'
};
