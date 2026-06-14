/**
 * Component: Liquid Ether Interactive Fluid Background Component
 * Category: background-animations
 */

export const component = {
  id: 'liquid-ether',
  name: 'Liquid Ether',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="ether-sandbox" id="ether-sandbox-container">
  <canvas class="ether-canvas" id="ether-canvas-element"></canvas>

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
        <a href="#">Liquid</a>
        <a href="#">Ether</a>
        <button class="demo-signup-btn">Initialize Flow</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>ULTRA PREMIUM</span> Fluid Dynamics</div>
      <h1 class="demo-headline">Mesmerizing Liquid Ether flow of interactive energy</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Flow</button>
        <button class="demo-secondary-btn">View Fluid API</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Liquid Ether Interactive Fluid Simulation (Stable Fluids Navier-Stokes Solver)
const container = document.getElementById('ether-sandbox-container');
if (container) {
  const canvas = container.querySelector('#ether-canvas-element');
  const ctx = canvas.getContext('2d');

  // Fluid Solver Configurations
  const CONFIG = {
    gridResolution: 88,      // High detail grid resolution. NY scales with aspect ratio
    pressureIterations: 18,  // Jacobi relaxation iterations for pressure solving (sharper swirls)
    colorDecay: 0.988,       // Fade rate of dye/color densities (lingers longer for beautiful trails)
    velocityDecay: 0.985,    // Fade rate of velocity forces (swirls glide further)
    viscosity: 0.00005,      // Velocity diffusion coefficient (lower viscosity = more turbulence)
    diffusion: 0.00005,      // Dye diffusion rate
    mouseForce: 13.5,        // Force multiplier for user inputs (drastically increased)
    mouseRadius: 0.16,       // Brush radius multiplier relative to grid size (drastically increased)
    autoForce: 3.5,          // Autonomous virtual cursor force multiplier
    autoSpeed: 1.0,          // Autonomous motion speed multiplier
    autoResumeDelay: 2500,   // Delay in ms before autonomous motion ramps back up
    takeoverDuration: 500,   // Milliseconds to fully yield to user control
    rampUpDuration: 2200,    // Milliseconds to smoothly ramp autonomous motion back
    glowIntensity: 0.42,     // Layer opacity of the blurred ambient glow (0 to 1)
    velocityGlowScale: 16.0, // Scale for turning velocity hotspots into bright white highlights
  };

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Grid sizes
  let NX = CONFIG.gridResolution;
  let NY = Math.max(16, Math.min(NX, Math.round(NX * height / width)));
  let size = (NX + 2) * (NY + 2);
  let stride = NX + 2;

  // Float32 arrays for high-performance stable solver
  let u, v, u_prev, v_prev;
  let d1, d2, d3, d1_prev, d2_prev, d3_prev;
  let p, div;

  // Offscreen canvas for fast upscaling
  let offscreenCanvas = document.createElement('canvas');
  let offscreenCtx = offscreenCanvas.getContext('2d');
  let imgData;

  function initGrid() {
    NX = CONFIG.gridResolution;
    NY = Math.max(16, Math.min(NX, Math.round(NX * height / width)));
    size = (NX + 2) * (NY + 2);
    stride = NX + 2;

    u = new Float32Array(size);
    v = new Float32Array(size);
    u_prev = new Float32Array(size);
    v_prev = new Float32Array(size);

    d1 = new Float32Array(size);
    d2 = new Float32Array(size);
    d3 = new Float32Array(size);
    d1_prev = new Float32Array(size);
    d2_prev = new Float32Array(size);
    d3_prev = new Float32Array(size);

    p = new Float32Array(size);
    div = new Float32Array(size);

    offscreenCanvas.width = NX;
    offscreenCanvas.height = NY;
    imgData = offscreenCtx.createImageData(NX, NY);
  }

  initGrid();

  // Mouse & Touch Tracking State
  const mouse = {
    x: -1000,
    y: -1000,
    lastX: -1000,
    lastY: -1000,
    active: false
  };

  // Autonomous Motion State
  let lastInteractionTime = Date.now() - CONFIG.autoResumeDelay * 2;
  let takeoverWeight = 1.0; // Blend weight (1.0 = fully autonomous, 0.0 = fully user controlled)

  // Virtual Cursors for Autonomous Ambient Movement
  const virtualCursors = [
    {
      x: 0, y: 0, lastX: 0, lastY: 0,
      angleX: Math.random() * 100, angleY: Math.random() * 100,
      speedX: 0.007, speedY: 0.009,
      ampX: 0.35, ampY: 0.32,
      phase: 0
    },
    {
      x: 0, y: 0, lastX: 0, lastY: 0,
      angleX: Math.random() * 100, angleY: Math.random() * 100,
      speedX: 0.012, speedY: 0.005,
      ampX: 0.28, ampY: 0.38,
      phase: Math.PI / 3
    },
    {
      x: 0, y: 0, lastX: 0, lastY: 0,
      angleX: Math.random() * 100, angleY: Math.random() * 100,
      speedX: 0.006, speedY: 0.011,
      ampX: 0.3, ampY: 0.25,
      phase: (Math.PI * 2) / 3
    }
  ];

  // Fluid Solver Logic
  function set_bnd(b, x) {
    for (let i = 1; i <= NX; i++) {
      x[i] = b === 2 ? -x[i + stride] : x[i + stride];
      x[i + (NY + 1) * stride] = b === 2 ? -x[i + NY * stride] : x[i + NY * stride];
    }
    for (let j = 1; j <= NY; j++) {
      x[j * stride] = b === 1 ? -x[1 + j * stride] : x[1 + j * stride];
      x[NX + 1 + j * stride] = b === 1 ? -x[NX + j * stride] : x[NX + j * stride];
    }

    x[0] = 0.5 * (x[1] + x[stride]);
    x[(NY + 1) * stride] = 0.5 * (x[1 + (NY + 1) * stride] + x[NY * stride]);
    x[NX + 1] = 0.5 * (x[NX] + x[NX + 1 + stride]);
    x[NX + 1 + (NY + 1) * stride] = 0.5 * (x[NX + (NY + 1) * stride] + x[NX + 1 + NY * stride]);
  }

  function lin_solve(b, x, x0, a, c, iterations) {
    const cRecip = 1.0 / c;
    for (let k = 0; k < iterations; k++) {
      for (let j = 1; j <= NY; j++) {
        const row = j * stride;
        for (let i = 1; i <= NX; i++) {
          const idx = i + row;
          x[idx] = (x0[idx] + a * (
            x[idx - 1] +
            x[idx + 1] +
            x[idx - stride] +
            x[idx + stride]
          )) * cRecip;
        }
      }
      set_bnd(b, x);
    }
  }

  function diffuse(b, x, x0, diff, dt) {
    const a = dt * diff * NX * NY;
    lin_solve(b, x, x0, a, 1 + 4 * a, 4);
  }

  function advect(b, d, d0, u, v, dt) {
    const dt0x = dt * NX;
    const dt0y = dt * NY;

    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;

        let x = i - dt0x * u[idx];
        let y = j - dt0y * v[idx];

        if (x < 0.5) x = 0.5;
        if (x > NX + 0.5) x = NX + 0.5;
        if (y < 0.5) y = 0.5;
        if (y > NY + 0.5) y = NY + 0.5;

        const i0 = Math.floor(x);
        const i1 = i0 + 1;
        const j0 = Math.floor(y);
        const j1 = j0 + 1;

        const s1 = x - i0;
        const s0 = 1.0 - s1;
        const t1 = y - j0;
        const t0 = 1.0 - t1;

        const row0 = j0 * stride;
        const row1 = j1 * stride;

        d[idx] =
          s0 * (t0 * d0[i0 + row0] + t1 * d0[i0 + row1]) +
          s1 * (t0 * d0[i1 + row0] + t1 * d0[i1 + row1]);
      }
    }
    set_bnd(b, d);
  }

  function project(u, v, p, div) {
    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;
        div[idx] = -0.5 * (
          (u[idx + 1] - u[idx - 1]) / NX +
          (v[idx + stride] - v[idx - stride]) / NY
        );
        p[idx] = 0;
      }
    }

    set_bnd(0, div);
    set_bnd(0, p);
    lin_solve(0, p, div, 1, 4, CONFIG.pressureIterations);

    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;
        u[idx] -= 0.5 * (p[idx + 1] - p[idx - 1]) * NX;
        v[idx] -= 0.5 * (p[idx + stride] - p[idx - stride]) * NY;
      }
    }

    set_bnd(1, u);
    set_bnd(2, v);
  }

  // Update physical loop
  function step(dt) {
    // Diffuse velocity
    u_prev.set(u);
    diffuse(1, u, u_prev, CONFIG.viscosity, dt);
    v_prev.set(v);
    diffuse(2, v, v_prev, CONFIG.viscosity, dt);

    // Enforce incompressibility
    project(u, v, p, div);

    // Advect velocity
    u_prev.set(u);
    v_prev.set(v);
    advect(1, u, u_prev, u_prev, v_prev, dt);
    advect(2, v, v_prev, u_prev, v_prev, dt);

    // Project again to guarantee divergence-free flow
    project(u, v, p, div);

    // Diffuse colors
    d1_prev.set(d1);
    diffuse(0, d1, d1_prev, CONFIG.diffusion, dt);
    d2_prev.set(d2);
    diffuse(0, d2, d2_prev, CONFIG.diffusion, dt);
    d3_prev.set(d3);
    diffuse(0, d3, d3_prev, CONFIG.diffusion, dt);

    // Advect colors
    d1_prev.set(d1);
    advect(0, d1, d1_prev, u, v, dt);
    d2_prev.set(d2);
    advect(0, d2, d2_prev, u, v, dt);
    d3_prev.set(d3);
    advect(0, d3, d3_prev, u, v, dt);

    // Slowly decay fields over time to prevent saturation
    for (let i = 0; i < size; i++) {
      d1[i] *= CONFIG.colorDecay;
      d2[i] *= CONFIG.colorDecay;
      d3[i] *= CONFIG.colorDecay;
      u[i] *= CONFIG.velocityDecay;
      v[i] *= CONFIG.velocityDecay;
    }
  }

  // Inject forces at coordinates
  function addForce(xGrid, yGrid, vx, vy, colorWeights, radiusGrid) {
    const minI = Math.max(1, Math.floor(xGrid - radiusGrid));
    const maxI = Math.min(NX, Math.ceil(xGrid + radiusGrid));
    const minJ = Math.max(1, Math.floor(yGrid - radiusGrid));
    const maxJ = Math.min(NY, Math.ceil(yGrid + radiusGrid));

    for (let j = minJ; j <= maxJ; j++) {
      const row = j * stride;
      for (let i = minI; i <= maxI; i++) {
        const idx = i + row;
        const dx = i - xGrid;
        const dy = j - yGrid;
        const distSq = dx * dx + dy * dy;
        const rSq = radiusGrid * radiusGrid;

        if (distSq < rSq) {
          // Circular Gaussian-like falloff force
          const weight = Math.exp(-distSq / (rSq * 0.45));
          
          u[idx] += vx * weight;
          v[idx] += vy * weight;
          
          // Enhanced density scaling to make color trails thicker and more glowing
          d1[idx] += colorWeights[0] * weight * 3.2;
          d2[idx] += colorWeights[1] * weight * 3.2;
          d3[idx] += colorWeights[2] * weight * 3.2;

          // Clamp density to prevent math blowups
          if (d1[idx] > 10.0) d1[idx] = 10.0;
          if (d2[idx] > 10.0) d2[idx] = 10.0;
          if (d3[idx] > 10.0) d3[idx] = 10.0;
        }
      }
    }
  }

  // Handle pointer coordinate inputs
  function handleInput(cx, cy) {
    const rect = container.getBoundingClientRect();
    const x = cx - rect.left;
    const y = cy - rect.top;

    // Convert screen coordinates to grid dimensions
    const gx = (x / width) * NX + 1;
    const gy = (y / height) * NY + 1;

    let dx = 0;
    let dy = 0;

    if (mouse.lastX !== -1000) {
      dx = cx - mouse.lastX;
      dy = cy - mouse.lastY;
    } else {
      mouse.lastX = cx;
      mouse.lastY = cy;
      return;
    }

    let scaleX = (dx / width) * NX * CONFIG.mouseForce;
    let scaleY = (dy / height) * NY * CONFIG.mouseForce;

    // Continuous hover-emission: if moving very slowly, inject micro-swirl energy
    const dragSpeed = Math.hypot(dx, dy);
    if (dragSpeed < 1.2 && mouse.active) {
      const hoverPulse = Date.now() * 0.005;
      scaleX += Math.sin(hoverPulse) * 0.8;
      scaleY += Math.cos(hoverPulse * 0.7) * 0.8 - 0.3; // Gentle upward thermal draft
    }

    // Rotate color weights dynamically over time for rainbow flow trails
    const time = Date.now() * 0.0022;
    const w1 = Math.sin(time) * 0.5 + 0.5;
    const w2 = Math.sin(time + 2.0) * 0.5 + 0.5;
    const w3 = Math.sin(time + 4.0) * 0.5 + 0.5;
    const sum = w1 + w2 + w3 + 0.001;
    const colorWeights = [w1 / sum, w2 / sum, w3 / sum];

    const brushRad = NX * CONFIG.mouseRadius;
    addForce(gx, gy, scaleX, scaleY, colorWeights, brushRad);

    mouse.lastX = cx;
    mouse.lastY = cy;
    lastInteractionTime = Date.now();
  }

  // Event Listeners for Interaction
  container.addEventListener('mousemove', (e) => {
    handleInput(e.clientX, e.clientY);
  });

  container.addEventListener('mouseenter', (e) => {
    mouse.lastX = e.clientX;
    mouse.lastY = e.clientY;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.lastX = -1000;
    mouse.lastY = -1000;
    mouse.active = false;
  });

  // Touch device support
  container.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      handleInput(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      mouse.lastX = e.touches[0].clientX;
      mouse.lastY = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    mouse.lastX = -1000;
    mouse.lastY = -1000;
    mouse.active = false;
  });

  // Window resize handler
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    initGrid();
  };
  window.addEventListener('resize', resize);

  // IntersectionObserver to pause rendering when canvas leaves viewport
  let visible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  // Tab visibility monitoring
  const handleVisibility = () => {
    if (document.hidden) {
      visible = false;
    } else {
      // Trigger temporary observer check
      visible = container.getBoundingClientRect().top < window.innerHeight;
    }
  };
  document.addEventListener('visibilitychange', handleVisibility);

  // Main Render Loop
  let frameTime = Date.now();
  let animationFrameId = null;

  const loop = () => {
    if (!container) return;

    animationFrameId = requestAnimationFrame(loop);

    if (!visible) return;

    const now = Date.now();
    let dt = (now - frameTime) * 0.001;
    frameTime = now;

    // Guard against massive time steps from tab swapping
    if (dt > 0.1) dt = 0.1;
    if (dt < 0.0001) dt = 0.001;

    // 1. Smoothly transition takeover states
    const timeSinceInteraction = now - lastInteractionTime;
    if (timeSinceInteraction < CONFIG.autoResumeDelay) {
      // User is active, decay takeoverWeight to 0
      takeoverWeight = Math.max(0.0, takeoverWeight - dt * (1000 / CONFIG.takeoverDuration));
    } else {
      // Idle recovery, ramp takeoverWeight back to 1
      takeoverWeight = Math.min(1.0, takeoverWeight + dt * (1000 / CONFIG.rampUpDuration));
    }

    // 2. Inject Autonomous forces and color dyes
    if (takeoverWeight > 0.005) {
      virtualCursors.forEach((c) => {
        c.angleX += c.speedX * CONFIG.autoSpeed;
        c.angleY += c.speedY * CONFIG.autoSpeed;

        const lx = c.x;
        const ly = c.y;

        // Path generator: Lissajous curves mapped to grid boundary zones
        const targetX = (0.5 + Math.sin(c.angleX + c.phase) * c.ampX) * NX + 1;
        const targetY = (0.5 + Math.cos(c.angleY + c.phase) * c.ampY) * NY + 1;

        if (lx === 0 && ly === 0) {
          c.x = targetX;
          c.y = targetY;
          c.lastX = targetX;
          c.lastY = targetY;
          return;
        }

        c.x = targetX;
        c.y = targetY;

        // Compute simulated delta velocity
        const cvx = (c.x - c.lastX) * CONFIG.autoForce * takeoverWeight;
        const cvy = (c.y - c.lastY) * CONFIG.autoForce * takeoverWeight;

        // Generate fluid colors relative to phase
        const pulse = now * 0.0018 + c.phase;
        const rWeight = (Math.sin(pulse) * 0.5 + 0.5) * takeoverWeight;
        const gWeight = (Math.sin(pulse + 2.0) * 0.5 + 0.5) * takeoverWeight;
        const bWeight = (Math.sin(pulse + 4.0) * 0.5 + 0.5) * takeoverWeight;
        const sum = rWeight + gWeight + bWeight + 0.001;
        const colorWeights = [rWeight / sum, gWeight / sum, bWeight / sum];

        const brushRad = NX * (CONFIG.mouseRadius * 0.8);
        addForce(c.x, c.y, cvx, cvy, colorWeights, brushRad);

        c.lastX = c.x;
        c.lastY = c.y;
      });
    }

    // 3. Process Physics Simulation Solver
    step(dt);

    // 4. Render Grid to Offscreen Image Data Buffer
    const data = imgData.data;
    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      const imgRow = (j - 1) * NX;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;

        const dViolet = d1[idx];
        const dPink = d2[idx];
        const dLavender = d3[idx];
        const speed = Math.hypot(u[idx], v[idx]);

        // Speed-dependent energetic neon white highlights
        const glow = Math.min(1.0, speed * CONFIG.velocityGlowScale);

        // Blending default premium palette colors:
        // Violet: RGB (139, 92, 246)
        // Pink:   RGB (244, 63, 94)
        // Lavender: RGB (192, 132, 252)
        let r = dViolet * 139 + dPink * 244 + dLavender * 192;
        let g = dViolet * 92  + dPink * 63  + dLavender * 132;
        let b = dViolet * 246 + dPink * 94  + dLavender * 252;

        // Hotspots (regions of high velocity and density) turn bright white/cyan
        r += glow * 115;
        g += glow * 195;
        b += glow * 255;

        // Calculate opacity based on local density strength
        const densitySum = dViolet + dPink + dLavender;
        const alpha = Math.min(1.0, densitySum * 0.88);

        // Write directly into ImageData
        const pixelIdx = (i - 1 + imgRow) * 4;
        data[pixelIdx]     = Math.min(255, Math.max(0, Math.round(r)));
        data[pixelIdx + 1] = Math.min(255, Math.max(0, Math.round(g)));
        data[pixelIdx + 2] = Math.min(255, Math.max(0, Math.round(b)));
        data[pixelIdx + 3] = Math.min(255, Math.max(0, Math.round(alpha * 255)));
      }
    }

    offscreenCtx.putImageData(imgData, 0, 0);

    // 5. Draw and Upscale to Main viewport canvas
    ctx.clearRect(0, 0, width, height);

    // Double layer blending: blurred background layer for ambient glow mapping
    if (CONFIG.glowIntensity > 0) {
      ctx.save();
      try {
        ctx.filter = 'blur(28px) saturate(1.4)';
        ctx.globalAlpha = CONFIG.glowIntensity;
        ctx.drawImage(offscreenCanvas, 0, 0, width, height);
      } catch (err) {
        // Fallback for browsers that don't support Canvas filter styling
      }
      ctx.restore();
    }

    // Overlay the primary high-resolution details layer
    ctx.drawImage(offscreenCanvas, 0, 0, width, height);
  };

  loop();

  // Scoped Cleanup
  container.addEventListener('destroyed', () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  ts: `// Liquid Ether TypeScript Implementation Type Definitions
interface FluidConfig {
  gridResolution: number;
  pressureIterations: number;
  colorDecay: number;
  velocityDecay: number;
  viscosity: number;
  diffusion: number;
  mouseForce: number;
  mouseRadius: number;
  autoForce: number;
  autoSpeed: number;
  autoResumeDelay: number;
  takeoverDuration: number;
  rampUpDuration: number;
  glowIntensity: number;
  velocityGlowScale: number;
}

interface VirtualCursor {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  angleX: number;
  angleY: number;
  speedX: number;
  speedY: number;
  ampX: number;
  ampY: number;
  phase: number;
}

const container = document.getElementById('ether-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#ether-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  const CONFIG: FluidConfig = {
    gridResolution: 88,
    pressureIterations: 18,
    colorDecay: 0.988,
    velocityDecay: 0.985,
    viscosity: 0.00005,
    diffusion: 0.00005,
    mouseForce: 13.5,
    mouseRadius: 0.16,
    autoForce: 3.5,
    autoSpeed: 1.0,
    autoResumeDelay: 2500,
    takeoverDuration: 500,
    rampUpDuration: 2200,
    glowIntensity: 0.42,
    velocityGlowScale: 16.0
  };

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let NX = CONFIG.gridResolution;
  let NY = Math.max(16, Math.min(NX, Math.round(NX * height / width)));
  let size = (NX + 2) * (NY + 2);
  let stride = NX + 2;

  let u: Float32Array;
  let v: Float32Array;
  let u_prev: Float32Array;
  let v_prev: Float32Array;
  let d1: Float32Array;
  let d2: Float32Array;
  let d3: Float32Array;
  let d1_prev: Float32Array;
  let d2_prev: Float32Array;
  let d3_prev: Float32Array;
  let p: Float32Array;
  let div: Float32Array;

  const offscreenCanvas = document.createElement('canvas');
  const offscreenCtx = offscreenCanvas.getContext('2d')!;
  let imgData: ImageData;

  function initGrid() {
    NX = CONFIG.gridResolution;
    NY = Math.max(16, Math.min(NX, Math.round(NX * height / width)));
    size = (NX + 2) * (NY + 2);
    stride = NX + 2;

    u = new Float32Array(size);
    v = new Float32Array(size);
    u_prev = new Float32Array(size);
    v_prev = new Float32Array(size);

    d1 = new Float32Array(size);
    d2 = new Float32Array(size);
    d3 = new Float32Array(size);
    d1_prev = new Float32Array(size);
    d2_prev = new Float32Array(size);
    d3_prev = new Float32Array(size);

    p = new Float32Array(size);
    div = new Float32Array(size);

    offscreenCanvas.width = NX;
    offscreenCanvas.height = NY;
    imgData = offscreenCtx.createImageData(NX, NY);
  }

  initGrid();

  const mouse = {
    x: -1000,
    y: -1000,
    lastX: -1000,
    lastY: -1000,
    active: false
  };

  let lastInteractionTime = Date.now() - CONFIG.autoResumeDelay * 2;
  let takeoverWeight = 1.0;

  const virtualCursors: VirtualCursor[] = [
    {
      x: 0, y: 0, lastX: 0, lastY: 0,
      angleX: Math.random() * 100, angleY: Math.random() * 100,
      speedX: 0.007, speedY: 0.009,
      ampX: 0.35, ampY: 0.32,
      phase: 0
    },
    {
      x: 0, y: 0, lastX: 0, lastY: 0,
      angleX: Math.random() * 100, angleY: Math.random() * 100,
      speedX: 0.012, speedY: 0.005,
      ampX: 0.28, ampY: 0.38,
      phase: Math.PI / 3
    },
    {
      x: 0, y: 0, lastX: 0, lastY: 0,
      angleX: Math.random() * 100, angleY: Math.random() * 100,
      speedX: 0.006, speedY: 0.011,
      ampX: 0.3, ampY: 0.25,
      phase: (Math.PI * 2) / 3
    }
  ];

  function set_bnd(b: number, x: Float32Array) {
    for (let i = 1; i <= NX; i++) {
      x[i] = b === 2 ? -x[i + stride] : x[i + stride];
      x[i + (NY + 1) * stride] = b === 2 ? -x[i + NY * stride] : x[i + NY * stride];
    }
    for (let j = 1; j <= NY; j++) {
      x[j * stride] = b === 1 ? -x[1 + j * stride] : x[1 + j * stride];
      x[NX + 1 + j * stride] = b === 1 ? -x[NX + j * stride] : x[NX + j * stride];
    }

    x[0] = 0.5 * (x[1] + x[stride]);
    x[(NY + 1) * stride] = 0.5 * (x[1 + (NY + 1) * stride] + x[NY * stride]);
    x[NX + 1] = 0.5 * (x[NX] + x[NX + 1 + stride]);
    x[NX + 1 + (NY + 1) * stride] = 0.5 * (x[NX + (NY + 1) * stride] + x[NX + 1 + NY * stride]);
  }

  function lin_solve(b: number, x: Float32Array, x0: Float32Array, a: number, c: number, iterations: number) {
    const cRecip = 1.0 / c;
    for (let k = 0; k < iterations; k++) {
      for (let j = 1; j <= NY; j++) {
        const row = j * stride;
        for (let i = 1; i <= NX; i++) {
          const idx = i + row;
          x[idx] = (x0[idx] + a * (
            x[idx - 1] +
            x[idx + 1] +
            x[idx - stride] +
            x[idx + stride]
          )) * cRecip;
        }
      }
      set_bnd(b, x);
    }
  }

  function diffuse(b: number, x: Float32Array, x0: Float32Array, diff: number, dt: number) {
    const a = dt * diff * NX * NY;
    lin_solve(b, x, x0, a, 1 + 4 * a, 4);
  }

  function advect(b: number, d: Float32Array, d0: Float32Array, u: Float32Array, v: Float32Array, dt: number) {
    const dt0x = dt * NX;
    const dt0y = dt * NY;

    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;

        let x = i - dt0x * u[idx];
        let y = j - dt0y * v[idx];

        if (x < 0.5) x = 0.5;
        if (x > NX + 0.5) x = NX + 0.5;
        if (y < 0.5) y = 0.5;
        if (y > NY + 0.5) y = NY + 0.5;

        const i0 = Math.floor(x);
        const i1 = i0 + 1;
        const j0 = Math.floor(y);
        const j1 = j0 + 1;

        const s1 = x - i0;
        const s0 = 1.0 - s1;
        const t1 = y - j0;
        const t0 = 1.0 - t1;

        const row0 = j0 * stride;
        const row1 = j1 * stride;

        d[idx] =
          s0 * (t0 * d0[i0 + row0] + t1 * d0[i0 + row1]) +
          s1 * (t0 * d0[i1 + row0] + t1 * d0[i1 + row1]);
      }
    }
    set_bnd(b, d);
  }

  function project(u: Float32Array, v: Float32Array, p: Float32Array, div: Float32Array) {
    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;
        div[idx] = -0.5 * (
          (u[idx + 1] - u[idx - 1]) / NX +
          (v[idx + stride] - v[idx - stride]) / NY
        );
        p[idx] = 0;
      }
    }

    set_bnd(0, div);
    set_bnd(0, p);
    lin_solve(0, p, div, 1, 4, CONFIG.pressureIterations);

    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;
        u[idx] -= 0.5 * (p[idx + 1] - p[idx - 1]) * NX;
        v[idx] -= 0.5 * (p[idx + stride] - p[idx - stride]) * NY;
      }
    }

    set_bnd(1, u);
    set_bnd(2, v);
  }

  function step(dt: number) {
    u_prev.set(u);
    diffuse(1, u, u_prev, CONFIG.viscosity, dt);
    v_prev.set(v);
    diffuse(2, v, v_prev, CONFIG.viscosity, dt);

    project(u, v, p, div);

    u_prev.set(u);
    v_prev.set(v);
    advect(1, u, u_prev, u_prev, v_prev, dt);
    advect(2, v, v_prev, u_prev, v_prev, dt);

    project(u, v, p, div);

    d1_prev.set(d1);
    diffuse(0, d1, d1_prev, CONFIG.diffusion, dt);
    d2_prev.set(d2);
    diffuse(0, d2, d2_prev, CONFIG.diffusion, dt);
    d3_prev.set(d3);
    diffuse(0, d3, d3_prev, CONFIG.diffusion, dt);

    d1_prev.set(d1);
    advect(0, d1, d1_prev, u, v, dt);
    d2_prev.set(d2);
    advect(0, d2, d2_prev, u, v, dt);
    d3_prev.set(d3);
    advect(0, d3, d3_prev, u, v, dt);

    for (let i = 0; i < size; i++) {
      d1[i] *= CONFIG.colorDecay;
      d2[i] *= CONFIG.colorDecay;
      d3[i] *= CONFIG.colorDecay;
      u[i] *= CONFIG.velocityDecay;
      v[i] *= CONFIG.velocityDecay;
    }
  }

  function addForce(xGrid: number, yGrid: number, vx: number, vy: number, colorWeights: number[], radiusGrid: number) {
    const minI = Math.max(1, Math.floor(xGrid - radiusGrid));
    const maxI = Math.min(NX, Math.ceil(xGrid + radiusGrid));
    const minJ = Math.max(1, Math.floor(yGrid - radiusGrid));
    const maxJ = Math.min(NY, Math.ceil(yGrid + radiusGrid));

    for (let j = minJ; j <= maxJ; j++) {
      const row = j * stride;
      for (let i = minI; i <= maxI; i++) {
        const idx = i + row;
        const dx = i - xGrid;
        const dy = j - yGrid;
        const distSq = dx * dx + dy * dy;
        const rSq = radiusGrid * radiusGrid;

        if (distSq < rSq) {
          const weight = Math.exp(-distSq / (rSq * 0.45));
          u[idx] += vx * weight;
          v[idx] += vy * weight;
          d1[idx] += colorWeights[0] * weight * 3.2;
          d2[idx] += colorWeights[1] * weight * 3.2;
          d3[idx] += colorWeights[2] * weight * 3.2;

          if (d1[idx] > 10.0) d1[idx] = 10.0;
          if (d2[idx] > 10.0) d2[idx] = 10.0;
          if (d3[idx] > 10.0) d3[idx] = 10.0;
        }
      }
    }
  }

  function handleInput(cx: number, cy: number) {
    const rect = container!.getBoundingClientRect();
    const x = cx - rect.left;
    const y = cy - rect.top;

    const gx = (x / width) * NX + 1;
    const gy = (y / height) * NY + 1;

    let dx = 0;
    let dy = 0;

    if (mouse.lastX !== -1000) {
      dx = cx - mouse.lastX;
      dy = cy - mouse.lastY;
    } else {
      mouse.lastX = cx;
      mouse.lastY = cy;
      return;
    }

    let scaleX = (dx / width) * NX * CONFIG.mouseForce;
    let scaleY = (dy / height) * NY * CONFIG.mouseForce;

    const dragSpeed = Math.hypot(dx, dy);
    if (dragSpeed < 1.2 && mouse.active) {
      const hoverPulse = Date.now() * 0.005;
      scaleX += Math.sin(hoverPulse) * 0.8;
      scaleY += Math.cos(hoverPulse * 0.7) * 0.8 - 0.3;
    }

    const time = Date.now() * 0.0022;
    const w1 = Math.sin(time) * 0.5 + 0.5;
    const w2 = Math.sin(time + 2.0) * 0.5 + 0.5;
    const w3 = Math.sin(time + 4.0) * 0.5 + 0.5;
    const sum = w1 + w2 + w3 + 0.001;
    const colorWeights = [w1 / sum, w2 / sum, w3 / sum];

    const brushRad = NX * CONFIG.mouseRadius;
    addForce(gx, gy, scaleX, scaleY, colorWeights, brushRad);

    mouse.lastX = cx;
    mouse.lastY = cy;
    lastInteractionTime = Date.now();
  }

  container.addEventListener('mousemove', (e) => {
    handleInput(e.clientX, e.clientY);
  });

  container.addEventListener('mouseenter', (e) => {
    mouse.lastX = e.clientX;
    mouse.lastY = e.clientY;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.lastX = -1000;
    mouse.lastY = -1000;
    mouse.active = false;
  });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      handleInput(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      mouse.lastX = e.touches[0].clientX;
      mouse.lastY = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    mouse.lastX = -1000;
    mouse.lastY = -1000;
    mouse.active = false;
  });

  const resize = () => {
    width = canvas.width = container!.clientWidth;
    height = canvas.height = container!.clientHeight;
    initGrid();
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
    if (document.hidden) {
      visible = false;
    } else {
      visible = container!.getBoundingClientRect().top < window.innerHeight;
    }
  };
  document.addEventListener('visibilitychange', handleVisibility);

  let frameTime = Date.now();
  let animationFrameId: number | null = null;

  const loop = () => {
    if (!container) return;

    animationFrameId = requestAnimationFrame(loop);

    if (!visible) return;

    const now = Date.now();
    let dt = (now - frameTime) * 0.001;
    frameTime = now;

    if (dt > 0.1) dt = 0.1;
    if (dt < 0.0001) dt = 0.001;

    const timeSinceInteraction = now - lastInteractionTime;
    if (timeSinceInteraction < CONFIG.autoResumeDelay) {
      takeoverWeight = Math.max(0.0, takeoverWeight - dt * (1000 / CONFIG.takeoverDuration));
    } else {
      takeoverWeight = Math.min(1.0, takeoverWeight + dt * (1000 / CONFIG.rampUpDuration));
    }

    if (takeoverWeight > 0.005) {
      virtualCursors.forEach((c) => {
        c.angleX += c.speedX * CONFIG.autoSpeed;
        c.angleY += c.speedY * CONFIG.autoSpeed;

        const lx = c.x;
        const ly = c.y;

        const targetX = (0.5 + Math.sin(c.angleX + c.phase) * c.ampX) * NX + 1;
        const targetY = (0.5 + Math.cos(c.angleY + c.phase) * c.ampY) * NY + 1;

        if (lx === 0 && ly === 0) {
          c.x = targetX;
          c.y = targetY;
          c.lastX = targetX;
          c.lastY = targetY;
          return;
        }

        c.x = targetX;
        c.y = targetY;

        const cvx = (c.x - c.lastX) * CONFIG.autoForce * takeoverWeight;
        const cvy = (c.y - c.lastY) * CONFIG.autoForce * takeoverWeight;

        const pulse = now * 0.0018 + c.phase;
        const rWeight = (Math.sin(pulse) * 0.5 + 0.5) * takeoverWeight;
        const gWeight = (Math.sin(pulse + 2.0) * 0.5 + 0.5) * takeoverWeight;
        const bWeight = (Math.sin(pulse + 4.0) * 0.5 + 0.5) * takeoverWeight;
        const sum = rWeight + gWeight + bWeight + 0.001;
        const colorWeights = [rWeight / sum, gWeight / sum, bWeight / sum];

        const brushRad = NX * (CONFIG.mouseRadius * 0.8);
        addForce(c.x, c.y, cvx, cvy, colorWeights, brushRad);

        c.lastX = c.x;
        c.lastY = c.y;
      });
    }

    step(dt);

    const data = imgData.data;
    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      const imgRow = (j - 1) * NX;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;

        const dViolet = d1[idx];
        const dPink = d2[idx];
        const dLavender = d3[idx];
        const speed = Math.hypot(u[idx], v[idx]);

        const glow = Math.min(1.0, speed * CONFIG.velocityGlowScale);

        let r = dViolet * 139 + dPink * 244 + dLavender * 192;
        let g = dViolet * 92  + dPink * 63  + dLavender * 132;
        let b = dViolet * 246 + dPink * 94  + dLavender * 252;

        r += glow * 115;
        g += glow * 195;
        b += glow * 255;

        const densitySum = dViolet + dPink + dLavender;
        const alpha = Math.min(1.0, densitySum * 0.88);

        const pixelIdx = (i - 1 + imgRow) * 4;
        data[pixelIdx]     = Math.min(255, Math.max(0, Math.round(r)));
        data[pixelIdx + 1] = Math.min(255, Math.max(0, Math.round(g)));
        data[pixelIdx + 2] = Math.min(255, Math.max(0, Math.round(b)));
        data[pixelIdx + 3] = Math.min(255, Math.max(0, Math.round(alpha * 255)));
      }
    }

    offscreenCtx.putImageData(imgData, 0, 0);

    ctx.clearRect(0, 0, width, height);

    if (CONFIG.glowIntensity > 0) {
      ctx.save();
      try {
        ctx.filter = 'blur(28px) saturate(1.4)';
        ctx.globalAlpha = CONFIG.glowIntensity;
        ctx.drawImage(offscreenCanvas, 0, 0, width, height);
      } catch (err) {
        // Fallback
      }
      ctx.restore();
    }

    ctx.drawImage(offscreenCanvas, 0, 0, width, height);
  };

  loop();

  container.addEventListener('destroyed', () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  css: `/* Liquid Ether Background Styling */
.ether-sandbox {
  position: relative;
  width: 100%;
  height: 520px;
  background: #04020a;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.ether-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}
`,
  tailwind: `<div class="relative w-full h-[520px] bg-[#04020a] rounded-[24px] overflow-hidden" id="ether-sandbox-container">
  <canvas class="absolute inset-0 w-full h-full block pointer-events-none" id="ether-canvas-element"></canvas>

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
        <a href="#">Liquid</a>
        <a href="#">Ether</a>
        <button class="demo-signup-btn">Initialize Flow</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>ULTRA PREMIUM</span> Fluid Dynamics</div>
      <h1 class="demo-headline">Mesmerizing Liquid Ether flow of interactive energy</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Flow</button>
        <button class="demo-secondary-btn">View Fluid API</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design an improved ultra-premium real-time fluid dynamics Navier-Stokes background animation resolving incompressibility and pressure equations with wider cursor-following glowing trails of violet, pink, and lavender dyes.'
};

export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
