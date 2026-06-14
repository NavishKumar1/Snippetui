/**
 * Component: Liquid Chrome Wavefront Background Component
 * Category: background-animations
 */

export const component = {
  id: 'liquid-chrome-wavefront',
  name: 'Liquid Chrome Wavefront',
  category: 'background-animations',
  tag: 'Stunning',
  html: `<div class="chrome-sandbox" id="chrome-sandbox-container">
  <canvas class="chrome-canvas" id="chrome-canvas-element"></canvas>

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
        <a href="#">Chrome</a>
        <button class="demo-signup-btn">Connect Core</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>ULTRA PREMIUM</span> 11th Component</div>
      <h1 class="demo-headline">Reflective fluid liquid mercury waves and environment mappings</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Chrome</button>
        <button class="demo-secondary-btn">Adjust Viscosity</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Liquid Chrome Wavefront - 2D Physical Wave Equation solver with environment reflection
const container = document.getElementById('chrome-sandbox-container');
if (container) {
  const canvas = container.querySelector('#chrome-canvas-element');
  const ctx = canvas.getContext('2d');

  const CONFIG = {
    gridResolution: 108,     // Grid horizontal size (NX). NY scales with aspect ratio
    damping: 0.988,          // Ripple dampening rate (higher = rings ripple longer)
    normalScale: 3.2,        // Scale for surface normals depth rendering
    mouseForce: 1.8,         // Strength of mouse drag waves (impulse height)
    mouseRadius: 0.05,       // Radius of mouse ripple brush
    specularIntensity: 0.85,  // Brightness of metallic reflection hotspots
    autoRainRate: 0.07,      // Probability of random ambient droplets per frame
    autoDripForce: 1.4,      // Force of falling ambient drips
    glowIntensity: 0.32,     // Blurred ambient highlight layer overlay opacity
    grainOpacity: 0.045,     // Tactical film noise pattern opacity
  };

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Grid dimensions
  let NX = CONFIG.gridResolution;
  let NY = Math.max(16, Math.min(NX, Math.round(NX * height / width)));
  let size = (NX + 2) * (NY + 2);
  let stride = NX + 2;

  // Heightmaps
  let heights1, heights2;

  // Offscreen canvas for scaling
  let offscreenCanvas = document.createElement('canvas');
  let offscreenCtx = offscreenCanvas.getContext('2d');
  let imgData;

  function initGrid() {
    NX = CONFIG.gridResolution;
    NY = Math.max(16, Math.min(NX, Math.round(NX * height / width)));
    size = (NX + 2) * (NY + 2);
    stride = NX + 2;

    heights1 = new Float32Array(size);
    heights2 = new Float32Array(size);

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

  // Helper to map flat array indices
  const IX = (x, y) => y * stride + x;

  // Inject height displacement at coordinates
  function injectDrip(gx, gy, force, radiusGrid) {
    const minI = Math.max(1, Math.floor(gx - radiusGrid));
    const maxI = Math.min(NX, Math.ceil(gx + radiusGrid));
    const minJ = Math.max(1, Math.floor(gy - radiusGrid));
    const maxJ = Math.min(NY, Math.ceil(gy + radiusGrid));

    for (let j = minJ; j <= maxJ; j++) {
      const row = j * stride;
      for (let i = minI; i <= maxI; i++) {
        const dx = i - gx;
        const dy = j - gy;
        const distSq = dx * dx + dy * dy;
        const rSq = radiusGrid * radiusGrid;

        if (distSq < rSq) {
          const weight = Math.exp(-distSq / (rSq * 0.45));
          heights1[i + row] += force * weight;
        }
      }
    }
  }

  // Handle pointer movements
  function handleInput(cx, cy) {
    const rect = container.getBoundingClientRect();
    const x = cx - rect.left;
    const y = cy - rect.top;

    const gx = (x / width) * NX + 1;
    const gy = (y / height) * NY + 1;

    let force = CONFIG.mouseForce;
    if (mouse.lastX !== -1000) {
      const dx = cx - mouse.lastX;
      const dy = cy - mouse.lastY;
      const speed = Math.hypot(dx, dy);
      // Faster mouse movement generates higher amplitude waves
      force = Math.min(6.5, CONFIG.mouseForce + speed * 0.15);
    }

    const brushRad = NX * CONFIG.mouseRadius;
    injectDrip(gx, gy, force, brushRad);

    mouse.lastX = cx;
    mouse.lastY = cy;
  }

  // Event bindings
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
      handleInput(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    mouse.lastX = -1000;
    mouse.lastY = -1000;
    mouse.active = false;
  });

  // Resize bindings
  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    initGrid();
  };
  window.addEventListener('resize', resize);

  // Noise Canvas generator
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

  // Render visibility monitors
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

  // Virtual Light Half-Vector for specular Phong-like calculation
  // Directional Light: L = (0.35, -0.35, 0.87)
  // Eye Vector: V = (0, 0, 1.0)
  // Half Vector: H = (L + V) normalized
  const hx = 0.187;
  const hy = -0.187;
  const hz = 0.964;

  let active = true;
  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    // 1. Solve Wave Equation Propagation
    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;
        // Standard discrete wave equation equation
        heights2[idx] = (
          heights1[idx - 1] +
          heights1[idx + 1] +
          heights1[idx - stride] +
          heights1[idx + stride]
        ) * 0.5 - heights2[idx];

        heights2[idx] *= CONFIG.damping;
      }
    }

    // Apply boundary mirror reflections to prevent clipping issues
    for (let i = 1; i <= NX; i++) {
      heights2[i] = heights2[i + stride];
      heights2[i + (NY + 1) * stride] = heights2[i + NY * stride];
    }
    for (let j = 1; j <= NY; j++) {
      heights2[j * stride] = heights2[1 + j * stride];
      heights2[NX + 1 + j * stride] = heights2[NX + j * stride];
    }

    // Swap buffers
    const temp = heights1;
    heights1 = heights2;
    heights2 = temp;

    // 2. Ambient Droplets / Swells (Rain effect)
    if (Math.random() < CONFIG.autoRainRate) {
      const rx = Math.floor(Math.random() * (NX - 4)) + 2;
      const ry = Math.floor(Math.random() * (NY - 4)) + 2;
      const dripForce = (0.4 + Math.random() * 0.6) * CONFIG.autoDripForce;
      injectDrip(rx, ry, dripForce, 2.5);
    }

    // Lissajous Ambient Swell Cursors
    const time = Date.now() * 0.0012;
    const ax1 = (0.5 + Math.sin(time * 0.8) * 0.35) * NX + 1;
    const ay1 = (0.5 + Math.cos(time * 0.5) * 0.35) * NY + 1;
    injectDrip(ax1, ay1, 0.18, 2.0);

    const ax2 = (0.5 + Math.cos(time * 0.9 + 1.5) * 0.3) * NX + 1;
    const ay2 = (0.5 + Math.sin(time * 0.6 + 2.0) * 0.3) * NY + 1;
    injectDrip(ax2, ay2, 0.15, 2.0);

    // 3. Render Heightmap to Offscreen Image Buffer using Environment reflection vectors
    const data = imgData.data;
    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      const imgRow = (j - 1) * NX;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;

        // Calculate heights normals via cross differentiation
        const nxVal = (heights1[idx + 1] - heights1[idx - 1]) * CONFIG.normalScale;
        const nyVal = (heights1[idx + stride] - heights1[idx - stride]) * CONFIG.normalScale;

        // Normalize normal vector (nx, ny, nz)
        const len = Math.hypot(nxVal, nyVal, 1.0);
        const nx = nxVal / len;
        const ny = nyVal / len;
        const nz = 1.0 / len;

        // Specular highlight computation
        const dotSpec = nx * hx + ny * hy + nz * hz;
        let specFactor = 0;
        if (dotSpec > 0) {
          specFactor = Math.pow(dotSpec, 26) * 255 * CONFIG.specularIntensity;
        }

        // Shading: base deep metallic gray/silver
        let r = 50 + heights1[idx] * 18;
        let g = 50 + heights1[idx] * 18;
        let b = 58 + heights1[idx] * 22;

        // Map reflection normal directions to colorful neon environments:
        if (nx > 0) {
          // Electric Blue/Teal reflection
          r += nx * 80;
          g += nx * 175;
          b += nx * 240;
        } else {
          // Cyber Magenta/Pink reflection
          r += -nx * 225;
          g += -nx * 58;
          b += -nx * 160;
        }

        if (ny > 0) {
          // Soft Purple/Lavender reflection
          r += ny * 90;
          g += ny * 52;
          b += ny * 185;
        } else {
          // Deep Indigo shadow
          r += -ny * 12;
          g += -ny * 28;
          b += -ny * 72;
        }

        // Add specular hotspots
        r += specFactor;
        g += specFactor;
        b += specFactor;

        // Clip RGB values
        const rInt = Math.min(255, Math.max(0, Math.round(r)));
        const gInt = Math.min(255, Math.max(0, Math.round(g)));
        const bInt = Math.min(255, Math.max(0, Math.round(b)));

        const pixelIdx = (i - 1 + imgRow) * 4;
        data[pixelIdx]     = rInt;
        data[pixelIdx + 1] = gInt;
        data[pixelIdx + 2] = bInt;
        data[pixelIdx + 3] = 255; // Solid chrome background
      }
    }

    offscreenCtx.putImageData(imgData, 0, 0);

    // 4. Render and Upscale
    ctx.clearRect(0, 0, width, height);

    // Double layer blending: blurred underlying glow
    if (CONFIG.glowIntensity > 0) {
      ctx.save();
      try {
        ctx.filter = 'blur(32px) saturate(1.3)';
        ctx.globalAlpha = CONFIG.glowIntensity;
        ctx.drawImage(offscreenCanvas, 0, 0, width, height);
      } catch (err) {
        // Fallback
      }
      ctx.restore();
    }

    ctx.drawImage(offscreenCanvas, 0, 0, width, height);

    // 5. Draw dynamic film-grain noise overlay
    ctx.save();
    const pattern = ctx.createPattern(noiseCanvas, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.globalCompositeOperation = 'screen';
      // Shift coordinate coordinates randomly to simulate static static
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
  ts: `// Liquid Chrome Wavefront TypeScript Implementation Type Definitions
interface ChromeConfig {
  gridResolution: number;
  damping: number;
  normalScale: number;
  mouseForce: number;
  mouseRadius: number;
  specularIntensity: number;
  autoRainRate: number;
  autoDripForce: number;
  glowIntensity: number;
  grainOpacity: number;
}

const container = document.getElementById('chrome-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#chrome-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  const CONFIG: ChromeConfig = {
    gridResolution: 108,
    damping: 0.988,
    normalScale: 3.2,
    mouseForce: 1.8,
    mouseRadius: 0.05,
    specularIntensity: 0.85,
    autoRainRate: 0.07,
    autoDripForce: 1.4,
    glowIntensity: 0.32,
    grainOpacity: 0.045
  };

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let NX = CONFIG.gridResolution;
  let NY = Math.max(16, Math.min(NX, Math.round(NX * height / width)));
  let size = (NX + 2) * (NY + 2);
  let stride = NX + 2;

  let heights1: Float32Array;
  let heights2: Float32Array;

  let offscreenCanvas = document.createElement('canvas');
  let offscreenCtx = offscreenCanvas.getContext('2d')!;
  let imgData: ImageData;

  function initGrid() {
    NX = CONFIG.gridResolution;
    NY = Math.max(16, Math.min(NX, Math.round(NX * height / width)));
    size = (NX + 2) * (NY + 2);
    stride = NX + 2;

    heights1 = new Float32Array(size);
    heights2 = new Float32Array(size);

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

  function injectDrip(gx: number, gy: number, force: number, radiusGrid: number) {
    const minI = Math.max(1, Math.floor(gx - radiusGrid));
    const maxI = Math.min(NX, Math.ceil(gx + radiusGrid));
    const minJ = Math.max(1, Math.floor(gy - radiusGrid));
    const maxJ = Math.min(NY, Math.ceil(gy + radiusGrid));

    for (let j = minJ; j <= maxJ; j++) {
      const row = j * stride;
      for (let i = minI; i <= maxI; i++) {
        const dx = i - gx;
        const dy = j - gy;
        const distSq = dx * dx + dy * dy;
        const rSq = radiusGrid * radiusGrid;

        if (distSq < rSq) {
          const weight = Math.exp(-distSq / (rSq * 0.45));
          heights1[i + row] += force * weight;
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

    let force = CONFIG.mouseForce;
    if (mouse.lastX !== -1000) {
      const dx = cx - mouse.lastX;
      const dy = cy - mouse.lastY;
      const speed = Math.hypot(dx, dy);
      force = Math.min(6.5, CONFIG.mouseForce + speed * 0.15);
    }

    const brushRad = NX * CONFIG.mouseRadius;
    injectDrip(gx, gy, force, brushRad);

    mouse.lastX = cx;
    mouse.lastY = cy;
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
      handleInput(e.touches[0].clientX, e.touches[0].clientY);
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

    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;
        heights2[idx] = (
          heights1[idx - 1] +
          heights1[idx + 1] +
          heights1[idx - stride] +
          heights1[idx + stride]
        ) * 0.5 - heights2[idx];

        heights2[idx] *= CONFIG.damping;
      }
    }

    for (let i = 1; i <= NX; i++) {
      heights2[i] = heights2[i + stride];
      heights2[i + (NY + 1) * stride] = heights2[i + NY * stride];
    }
    for (let j = 1; j <= NY; j++) {
      heights2[j * stride] = heights2[1 + j * stride];
      heights2[NX + 1 + j * stride] = heights2[NX + j * stride];
    }

    const temp = heights1;
    heights1 = heights2;
    heights2 = temp;

    if (Math.random() < CONFIG.autoRainRate) {
      const rx = Math.floor(Math.random() * (NX - 4)) + 2;
      const ry = Math.floor(Math.random() * (NY - 4)) + 2;
      const dripForce = (0.4 + Math.random() * 0.6) * CONFIG.autoDripForce;
      injectDrip(rx, ry, dripForce, 2.5);
    }

    const time = Date.now() * 0.0012;
    const ax1 = (0.5 + Math.sin(time * 0.8) * 0.35) * NX + 1;
    const ay1 = (0.5 + Math.cos(time * 0.5) * 0.35) * NY + 1;
    injectDrip(ax1, ay1, 0.18, 2.0);

    const ax2 = (0.5 + Math.cos(time * 0.9 + 1.5) * 0.3) * NX + 1;
    const ay2 = (0.5 + Math.sin(time * 0.6 + 2.0) * 0.3) * NY + 1;
    injectDrip(ax2, ay2, 0.15, 2.0);

    const data = imgData.data;
    for (let j = 1; j <= NY; j++) {
      const row = j * stride;
      const imgRow = (j - 1) * NX;
      for (let i = 1; i <= NX; i++) {
        const idx = i + row;

        const nxVal = (heights1[idx + 1] - heights1[idx - 1]) * CONFIG.normalScale;
        const nyVal = (heights1[idx + stride] - heights1[idx - stride]) * CONFIG.normalScale;

        const len = Math.hypot(nxVal, nyVal, 1.0);
        const nx = nxVal / len;
        const ny = nyVal / len;
        const nz = 1.0 / len;

        const dotSpec = nx * hx + ny * hy + nz * hz;
        let specFactor = 0;
        if (dotSpec > 0) {
          specFactor = Math.pow(dotSpec, 26) * 255 * CONFIG.specularIntensity;
        }

        let r = 50 + heights1[idx] * 18;
        let g = 50 + heights1[idx] * 18;
        let b = 58 + heights1[idx] * 22;

        if (nx > 0) {
          r += nx * 80;
          g += nx * 175;
          b += nx * 240;
        } else {
          r += -nx * 225;
          g += -nx * 58;
          b += -nx * 160;
        }

        if (ny > 0) {
          r += ny * 90;
          g += ny * 52;
          b += ny * 185;
        } else {
          r += -ny * 12;
          g += -ny * 28;
          b += -ny * 72;
        }

        r += specFactor;
        g += specFactor;
        b += specFactor;

        const rInt = Math.min(255, Math.max(0, Math.round(r)));
        const gInt = Math.min(255, Math.max(0, Math.round(g)));
        const bInt = Math.min(255, Math.max(0, Math.round(b)));

        const pixelIdx = (i - 1 + imgRow) * 4;
        data[pixelIdx]     = rInt;
        data[pixelIdx + 1] = gInt;
        data[pixelIdx + 2] = bInt;
        data[pixelIdx + 3] = 255;
      }
    }

    offscreenCtx.putImageData(imgData, 0, 0);

    ctx.clearRect(0, 0, width, height);

    if (CONFIG.glowIntensity > 0) {
      ctx.save();
      try {
        ctx.filter = 'blur(32px) saturate(1.3)';
        ctx.globalAlpha = CONFIG.glowIntensity;
        ctx.drawImage(offscreenCanvas, 0, 0, width, height);
      } catch (err) {
        // Fallback
      }
      ctx.restore();
    }

    ctx.drawImage(offscreenCanvas, 0, 0, width, height);

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
}`,
  css: `/* Liquid Chrome Wavefront Styles */
.chrome-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #020106;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.chrome-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<div class="relative w-full h-[480px] bg-[#020106] rounded-[24px] overflow-hidden" id="chrome-sandbox-container">
  <canvas class="w-full h-full block" id="chrome-canvas-element"></canvas>

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
        <a href="#">Chrome</a>
        <button class="demo-signup-btn">Connect Core</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>ULTRA PREMIUM</span> 11th Component</div>
      <h1 class="demo-headline">Reflective fluid liquid mercury waves and environment mappings</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Chrome</button>
        <button class="demo-secondary-btn">Adjust Viscosity</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design an ultra-premium liquid metal reflective chrome background simulation where physical 2D heightmap wave equations propagate mouse ripples across boundaries, calculating surface normals dynamically for environment reflection colors and Phong specular hotspots, layered under film grain noise overlays.'
};

export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
