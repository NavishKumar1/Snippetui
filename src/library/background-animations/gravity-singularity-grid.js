/**
 * Component: Gravity Singularity Grid Background Component
 * Category: background-animations
 */

export const component = {
  id: 'gravity-singularity-grid',
  name: 'Gravity Singularity Grid',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="gravity-sandbox" id="gravity-sandbox-container">
  <canvas class="gravity-canvas" id="gravity-canvas-element"></canvas>

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
        <a href="#">Gravity</a>
        <a href="#">Singularity</a>
        <button class="demo-signup-btn">Escape Horizon</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>ULTRA PREMIUM</span> 12th Component</div>
      <h1 class="demo-headline">Interactive elastic space-time grid curving around gravity centers</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Warp</button>
        <button class="demo-secondary-btn">Adjust Mass</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Gravity Singularity Grid - Relativistic grid warping and accretion particle orbital physics
const container = document.getElementById('gravity-sandbox-container');
if (container) {
  const canvas = container.querySelector('#gravity-canvas-element');
  const ctx = canvas.getContext('2d');

  const CONFIG = {
    cols: 28,                 // Space-time grid columns
    rows: 18,                 // Space-time grid rows
    springTension: 0.09,      // Grid elastic spring tension constant
    damping: 0.16,            // Grid resistance damping multiplier
    warpRadius: 280,          // Influence radius of mouse gravity warp
    warpForce: 1.5,           // Space-time grid deformation multiplier
    particleCount: 220,       // Number of dust particles in the accretion disk
    gConstant: 12.0,          // Gravitational constant G
    centerMass: 2500,         // Mass of central black hole singularity
    mouseMass: 2800,          // Mass of cursor gravitational lens (when active)
    grainOpacity: 0.048,      // Faintness of dynamic camera grain overlay
  };

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let centerX = width / 2;
  let centerY = height / 2;

  // Track cursor gravity
  const mouse = { x: -1000, y: -1000, active: false };

  // Space-time lattice nodes representation
  let nodes = [];

  // Accretion disk particles representation
  let particles = [];

  const particleColors = [
    'rgba(0, 242, 254, 0.72)',  // Cyan highlight
    'rgba(139, 92, 246, 0.75)',  // Violet energy
    'rgba(236, 72, 153, 0.72)',  // Pink thermal
    'rgba(192, 132, 252, 0.65)'   // Lavender drift
  ];

  class DustParticle {
    constructor(isInitial = false) {
      this.reset(isInitial);
    }

    reset(isInitial = false) {
      // Orbital radius distribution
      const r = isInitial 
        ? Math.random() * (Math.min(width, height) * 0.45 - 30) + 30
        : Math.random() * 120 + Math.min(width, height) * 0.35;

      const angle = Math.random() * Math.PI * 2;
      this.x = centerX + Math.cos(angle) * r;
      this.y = centerY + Math.sin(angle) * r;

      // Tangential velocity calculation for stable circular orbit: V = sqrt(G * M / R)
      const speed = Math.sqrt((CONFIG.gConstant * CONFIG.centerMass) / (r + 10));
      this.vx = -Math.sin(angle) * speed + (Math.random() - 0.5) * 0.6;
      this.vy = Math.cos(angle) * speed + (Math.random() - 0.5) * 0.6;

      this.size = Math.random() * 1.5 + 0.8;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.alpha = Math.random() * 0.6 + 0.4;
    }

    update() {
      // Calculate Newtonian gravity pull toward central black hole
      let dx = centerX - this.x;
      let dy = centerY - this.y;
      let dist = Math.hypot(dx, dy);

      if (dist < 18) {
        // Fell into event horizon: respawn at outer accretion disk boundary
        this.reset(false);
        return;
      }

      // Gravitational acceleration: a = G * M / (r^2 + epsilon)
      let force = (CONFIG.gConstant * CONFIG.centerMass) / (dist * dist + 400);
      let ax = (dx / dist) * force;
      let ay = (dy / dist) * force;

      // Calculate gravitational pull toward mouse cursor
      if (mouse.active) {
        let mdx = mouse.x - this.x;
        let mdy = mouse.y - this.y;
        let mdist = Math.hypot(mdx, mdy);

        if (mdist > 8) {
          let mforce = (CONFIG.gConstant * CONFIG.mouseMass) / (mdist * mdist + 600);
          ax += (mdx / mdist) * mforce;
          ay += (mdy / mdist) * mforce;
        }
      }

      this.vx += ax;
      this.vy += ay;
      this.x += this.vx;
      this.y += this.vy;

      // Dampen velocities slightly to prevent infinite energy build
      this.vx *= 0.998;
      this.vy *= 0.998;

      // Out of bounds safety net
      if (dist > Math.max(width, height) * 0.9) {
        this.reset(false);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initGrid() {
    nodes = [];
    for (let j = 0; j <= CONFIG.rows; j++) {
      const yBase = (j / CONFIG.rows) * height;
      for (let i = 0; i <= CONFIG.cols; i++) {
        const xBase = (i / CONFIG.cols) * width;
        nodes.push({
          baseX: xBase,
          baseY: yBase,
          x: xBase,
          y: yBase,
          vx: 0,
          vy: 0
        });
      }
    }
  }

  function initSimulation() {
    centerX = width / 2;
    centerY = height / 2;
    initGrid();

    particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push(new DustParticle(true));
    }
  }

  initSimulation();

  // Create film grain noise pattern
  const noiseCanvas = document.createElement('canvas');
  noiseCanvas.width = 128;
  noiseCanvas.height = 128;
  const nCtx = noiseCanvas.getContext('2d');
  const nData = nCtx.createImageData(128, 128);

  function rebuildNoise() {
    for (let i = 0; i < nData.data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      nData.data[i] = val;
      nData.data[i + 1] = val;
      nData.data[i + 2] = val;
      nData.data[i + 3] = Math.round(CONFIG.grainOpacity * 255);
    }
    nCtx.putImageData(nData, 0, 0);
  }
  rebuildNoise();

  // Mouse & Touch bindings
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.active = false;
  });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = container.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.active = true;
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.active = false;
  });

  // Resize listener
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    initSimulation();
  };
  window.addEventListener('resize', resize);

  // Render control monitoring
  let visible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  const handleVisibility = () => {
    visible = !document.hidden;
  };
  document.addEventListener('visibilitychange', handleVisibility);

  let active = true;
  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    // Premium deep space background
    ctx.fillStyle = '#030107';
    ctx.fillRect(0, 0, width, height);

    // 1. Solve Elastic Grid General Relativity coordinates distortion
    for (let k = 0; k < nodes.length; k++) {
      const n = nodes[k];

      // Gravity bend from central black hole
      let dx = centerX - n.baseX;
      let dy = centerY - n.baseY;
      let dist = Math.hypot(dx, dy);

      let targetX = n.baseX;
      let targetY = n.baseY;

      // Space-time warp equation: displacement towards massive center
      const warpRadiusCenter = Math.min(width, height) * 0.48;
      if (dist < warpRadiusCenter) {
        const force = (warpRadiusCenter - dist) / warpRadiusCenter;
        const pull = force * 60 * CONFIG.warpForce;
        targetX += (dx / dist) * pull;
        targetY += (dy / dist) * pull;
      }

      // Gravity bend from mouse cursor
      if (mouse.active) {
        let mdx = mouse.x - n.baseX;
        let mdy = mouse.y - n.baseY;
        let mdist = Math.hypot(mdx, mdy);

        if (mdist < CONFIG.warpRadius) {
          const mforce = (CONFIG.warpRadius - mdist) / CONFIG.warpRadius;
          const mpull = mforce * 70 * CONFIG.warpForce;
          targetX += (mdx / mdist) * mpull;
          targetY += (mdy / mdist) * mpull;
        }
      }

      // Spring physics (acceleration pull toward warped target position)
      const ax = (targetX - n.x) * CONFIG.springTension - n.vx * CONFIG.damping;
      const ay = (targetY - n.y) * CONFIG.springTension - n.vy * CONFIG.damping;

      n.vx += ax;
      n.vy += ay;
      n.x += n.vx;
      n.y += n.vy;
    }

    // 2. Draw Space-Time Lattice Grid lines (distortion increases brightness)
    const strideVal = CONFIG.cols + 1;
    for (let j = 0; j <= CONFIG.rows; j++) {
      for (let i = 0; i <= CONFIG.cols; i++) {
        const idx = i + j * strideVal;
        const current = nodes[idx];

        // Horizontal lines
        if (i < CONFIG.cols) {
          const nextRight = nodes[idx + 1];
          const distBase = Math.hypot(current.x - current.baseX, current.y - current.baseY);
          const val = Math.min(1.0, distBase * 0.02); // Distortion factor

          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(nextRight.x, nextRight.y);
          
          // Warp grid glow highlights: turquoise/magenta blend where stretched
          ctx.strokeStyle = val > 0.1
            ? \`rgba(0, 242, 254, \${0.06 + val * 0.16})\`
            : 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = val > 0.1 ? 1.0 + val * 0.8 : 0.7;
          ctx.stroke();
        }

        // Vertical lines
        if (j < CONFIG.rows) {
          const nextDown = nodes[idx + strideVal];
          const distBase = Math.hypot(current.x - current.baseX, current.y - current.baseY);
          const val = Math.min(1.0, distBase * 0.02);

          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(nextDown.x, nextDown.y);

          ctx.strokeStyle = val > 0.1
            ? \`rgba(139, 92, 246, \${0.06 + val * 0.16})\`
            : 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = val > 0.1 ? 1.0 + val * 0.8 : 0.7;
          ctx.stroke();
        }
      }
    }

    // Reset alpha for particles
    ctx.globalAlpha = 1.0;

    // 3. Draw accretion disk particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    // Reset global alpha
    ctx.globalAlpha = 1.0;

    // 4. Render volumetric black hole event horizon & glowing accretion aura
    const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 75);
    grad.addColorStop(0, '#000000');
    grad.addColorStop(0.24, '#000000'); // Event horizon boundary
    grad.addColorStop(0.3, 'rgba(236, 72, 153, 0.7)');  // Magenta gas
    grad.addColorStop(0.48, 'rgba(139, 92, 246, 0.55)'); // Violet energy
    grad.addColorStop(0.75, 'rgba(0, 242, 254, 0.2)');   // Cyan aura glow
    grad.addColorStop(1, 'rgba(3, 1, 7, 0)');

    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(centerX, centerY, 75, 0, Math.PI * 2);
    ctx.fill();

    // 5. Draw dynamic film-grain noise overlay
    ctx.save();
    const pattern = ctx.createPattern(noiseCanvas, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.globalCompositeOperation = 'screen';
      ctx.translate(Math.random() * 128, Math.random() * 128);
      ctx.fillRect(-128, -128, width + 256, height + 256);
    }
    ctx.restore();
  };

  loop();

  // Scoped cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  ts: `// Gravity Singularity Grid TypeScript Implementation Type Definitions
interface LatticeConfig {
  cols: number;
  rows: number;
  springTension: number;
  damping: number;
  warpRadius: number;
  warpForce: number;
  particleCount: number;
  gConstant: number;
  centerMass: number;
  mouseMass: number;
  grainOpacity: number;
}

interface LatticeNode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const container = document.getElementById('gravity-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#gravity-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  const CONFIG: LatticeConfig = {
    cols: 28,
    rows: 18,
    springTension: 0.09,
    damping: 0.16,
    warpRadius: 280,
    warpForce: 1.5,
    particleCount: 220,
    gConstant: 12.0,
    centerMass: 2500,
    mouseMass: 2800,
    grainOpacity: 0.048
  };

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let centerX = width / 2;
  let centerY = height / 2;

  const mouse = { x: -1000, y: -1000, active: false };

  let nodes: LatticeNode[] = [];
  let particles: DustParticle[] = [];

  const particleColors = [
    'rgba(0, 242, 254, 0.72)',
    'rgba(139, 92, 246, 0.75)',
    'rgba(236, 72, 153, 0.72)',
    'rgba(192, 132, 252, 0.65)'
  ];

  class DustParticle {
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    size: number = 0;
    color: string = '';
    alpha: number = 0;

    constructor(isInitial = false) {
      this.reset(isInitial);
    }

    reset(isInitial = false) {
      const r = isInitial 
        ? Math.random() * (Math.min(width, height) * 0.45 - 30) + 30
        : Math.random() * 120 + Math.min(width, height) * 0.35;

      const angle = Math.random() * Math.PI * 2;
      this.x = centerX + Math.cos(angle) * r;
      this.y = centerY + Math.sin(angle) * r;

      const speed = Math.sqrt((CONFIG.gConstant * CONFIG.centerMass) / (r + 10));
      this.vx = -Math.sin(angle) * speed + (Math.random() - 0.5) * 0.6;
      this.vy = Math.cos(angle) * speed + (Math.random() - 0.5) * 0.6;

      this.size = Math.random() * 1.5 + 0.8;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.alpha = Math.random() * 0.6 + 0.4;
    }

    update() {
      const dx = centerX - this.x;
      const dy = centerY - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 18) {
        this.reset(false);
        return;
      }

      const force = (CONFIG.gConstant * CONFIG.centerMass) / (dist * dist + 400);
      let ax = (dx / dist) * force;
      let ay = (dy / dist) * force;

      if (mouse.active) {
        const mdx = mouse.x - this.x;
        const mdy = mouse.y - this.y;
        const mdist = Math.hypot(mdx, mdy);

        if (mdist > 8) {
          const mforce = (CONFIG.gConstant * CONFIG.mouseMass) / (mdist * mdist + 600);
          ax += (mdx / mdist) * mforce;
          ay += (mdy / mdist) * mforce;
        }
      }

      this.vx += ax;
      this.vy += ay;
      this.x += this.vx;
      this.y += this.vy;

      this.vx *= 0.998;
      this.vy *= 0.998;

      if (dist > Math.max(width, height) * 0.9) {
        this.reset(false);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initGrid() {
    nodes = [];
    for (let j = 0; j <= CONFIG.rows; j++) {
      const yBase = (j / CONFIG.rows) * height;
      for (let i = 0; i <= CONFIG.cols; i++) {
        const xBase = (i / CONFIG.cols) * width;
        nodes.push({
          baseX: xBase,
          baseY: yBase,
          x: xBase,
          y: yBase,
          vx: 0,
          vy: 0
        });
      }
    }
  }

  function initSimulation() {
    centerX = width / 2;
    centerY = height / 2;
    initGrid();

    particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push(new DustParticle(true));
    }
  }

  initSimulation();

  const noiseCanvas = document.createElement('canvas');
  noiseCanvas.width = 128;
  noiseCanvas.height = 128;
  const nCtx = noiseCanvas.getContext('2d')!;
  const nData = nCtx.createImageData(128, 128);

  function rebuildNoise() {
    for (let i = 0; i < nData.data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      nData.data[i] = val;
      nData.data[i + 1] = val;
      nData.data[i + 2] = val;
      nData.data[i + 3] = Math.round(CONFIG.grainOpacity * 255);
    }
    nCtx.putImageData(nData, 0, 0);
  }
  rebuildNoise();

  container.addEventListener('mousemove', (e) => {
    const rect = container!.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.active = false;
  });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = container!.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.active = true;
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.active = false;
  });

  const resize = () => {
    width = canvas.width = container!.clientWidth;
    height = canvas.height = container!.clientHeight;
    initSimulation();
  };
  window.addEventListener('resize', resize);

  let visible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  const handleVisibility = () => {
    visible = !document.hidden;
  };
  document.addEventListener('visibilitychange', handleVisibility);

  const hx = 0.187;
  const hy = -0.187;
  const hz = 0.964;

  let active = true;
  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    ctx.fillStyle = '#030107';
    ctx.fillRect(0, 0, width, height);

    for (let k = 0; k < nodes.length; k++) {
      const n = nodes[k];

      let dx = centerX - n.baseX;
      let dy = centerY - n.baseY;
      let dist = Math.hypot(dx, dy);

      let targetX = n.baseX;
      let targetY = n.baseY;

      const warpRadiusCenter = Math.min(width, height) * 0.45;
      if (dist < warpRadiusCenter) {
        const force = (warpRadiusCenter - dist) / warpRadiusCenter;
        const pull = force * 60 * CONFIG.warpForce;
        targetX += (dx / dist) * pull;
        targetY += (dy / dist) * pull;
      }

      if (mouse.active) {
        let mdx = mouse.x - n.baseX;
        let mdy = mouse.y - n.baseY;
        let mdist = Math.hypot(mdx, mdy);

        if (mdist < CONFIG.warpRadius) {
          const mforce = (CONFIG.warpRadius - mdist) / CONFIG.warpRadius;
          const mpull = mforce * 70 * CONFIG.warpForce;
          targetX += (mdx / mdist) * mpull;
          targetY += (mdy / mdist) * mpull;
        }
      }

      const ax = (targetX - n.x) * CONFIG.springTension - n.vx * CONFIG.damping;
      const ay = (targetY - n.y) * CONFIG.springTension - n.vy * CONFIG.damping;

      n.vx += ax;
      n.vy += ay;
      n.x += n.vx;
      n.y += n.vy;
    }

    const strideVal = CONFIG.cols + 1;
    for (let j = 0; j <= CONFIG.rows; j++) {
      for (let i = 0; i <= CONFIG.cols; i++) {
        const idx = i + j * strideVal;
        const current = nodes[idx];

        if (i < CONFIG.cols) {
          const nextRight = nodes[idx + 1];
          const distBase = Math.hypot(current.x - current.baseX, current.y - current.baseY);
          const val = Math.min(1.0, distBase * 0.02);

          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(nextRight.x, nextRight.y);
          
          ctx.strokeStyle = val > 0.1
            ? \`rgba(0, 242, 254, \${0.06 + val * 0.16})\`
            : 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = val > 0.1 ? 1.0 + val * 0.8 : 0.7;
          ctx.stroke();
        }

        if (j < CONFIG.rows) {
          const nextDown = nodes[idx + strideVal];
          const distBase = Math.hypot(current.x - current.baseX, current.y - current.baseY);
          const val = Math.min(1.0, distBase * 0.02);

          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(nextDown.x, nextDown.y);

          ctx.strokeStyle = val > 0.1
            ? \`rgba(139, 92, 246, \${0.06 + val * 0.16})\`
            : 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = val > 0.1 ? 1.0 + val * 0.8 : 0.7;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1.0;
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    ctx.globalAlpha = 1.0;

    const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 75);
    grad.addColorStop(0, '#000000');
    grad.addColorStop(0.24, '#000000');
    grad.addColorStop(0.3, 'rgba(236, 72, 153, 0.7)');
    grad.addColorStop(0.48, 'rgba(139, 92, 246, 0.55)');
    grad.addColorStop(0.75, 'rgba(0, 242, 254, 0.2)');
    grad.addColorStop(1, 'rgba(3, 1, 7, 0)');

    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(centerX, centerY, 75, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    const pattern = ctx.createPattern(noiseCanvas, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.globalCompositeOperation = 'screen';
      ctx.translate(Math.random() * 128, Math.random() * 128);
      ctx.fillRect(-128, -128, width + 256, height + 256);
    }
    ctx.restore();
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}
`,
  css: `/* Gravity Singularity Grid Styles */
.gravity-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #030107;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.gravity-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<div class="relative w-full h-[480px] bg-[#030107] rounded-[24px] overflow-hidden" id="gravity-sandbox-container">
  <canvas class="w-full h-full block" id="gravity-canvas-element"></canvas>

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
        <a href="#">Gravity</a>
        <a href="#">Singularity</a>
        <button class="demo-signup-btn">Escape Horizon</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>ULTRA PREMIUM</span> 12th Component</div>
      <h1 class="demo-headline">Interactive elastic space-time grid curving around gravity centers</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Warp</button>
        <button class="demo-secondary-btn">Adjust Mass</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design an ultra-premium gravity black hole singularity background animation with 200+ accretion disk dust particles orbiting stably, overlayed by an interactive coordinate space-time grid that warps elastically toward gravity points, and topped with dynamic film grain static overlays.'
};

export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
