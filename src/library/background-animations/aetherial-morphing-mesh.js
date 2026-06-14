/**
 * Component: Aetherial Morphing Mesh Background Component
 * Category: background-animations
 */

export const component = {
  id: 'aetherial-morphing-mesh',
  name: 'Aetherial Morphing Mesh',
  category: 'background-animations',
  tag: 'Premium',
  html: `<div class="mesh-sandbox" id="mesh-sandbox-container">
  <canvas class="mesh-canvas" id="mesh-canvas-element"></canvas>

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
        <a href="#">Aetherial</a>
        <a href="#">Mesh</a>
        <button class="demo-signup-btn">Enter Portal</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>BILLION DOLLAR</span> Design Aesthetic</div>
      <h1 class="demo-headline">Warp through elastically morphing gradient mesh networks</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Portal</button>
        <button class="demo-secondary-btn">Adjust Elasticity</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Aetherial Morphing Mesh - Interactive Gradient Mesh with Elastic Grid & Film Grain
const container = document.getElementById('mesh-sandbox-container');
if (container) {
  const canvas = container.querySelector('#mesh-canvas-element');
  const ctx = canvas.getContext('2d');

  const CONFIG = {
    cols: 16,               // Horizontal grid resolution
    rows: 12,               // Vertical grid resolution
    springTension: 0.08,    // Elastic grid spring stiffness (Hooke's Law)
    damping: 0.15,          // Elastic grid velocity damping/friction
    warpRadius: 240,        // Radius of mouse influence warp field
    warpForce: 1.6,         // Distortion push multiplier
    morphSpeed: 0.85,       // Background gradient movement speed multiplier
    grainOpacity: 0.05,     // Faintness of dynamic camera noise overlay
    gridOpacity: 0.07,      // Faintness of the elastic wireframe overlay
  };

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Grid node coordinates representation
  let nodes = [];
  const mouse = { x: -1000, y: -1000, active: false };

  // Color Anchors floating in cosmic spaces
  // Cyber Pink, Royal Violet, Emerald Teal, Sunburst Gold, Sapphire Blue
  const anchors = [
    {
      x: 0, y: 0, dx: 0, dy: 0,
      color: 'rgba(236, 72, 153, 0.72)', // Magenta
      phase: 0, speedX: 0.0006, speedY: 0.0004,
      ampX: 0.38, ampY: 0.32
    },
    {
      x: 0, y: 0, dx: 0, dy: 0,
      color: 'rgba(139, 92, 246, 0.75)', // Violet/Indigo
      phase: Math.PI / 2, speedX: 0.0004, speedY: 0.0008,
      ampX: 0.4, ampY: 0.28
    },
    {
      x: 0, y: 0, dx: 0, dy: 0,
      color: 'rgba(20, 184, 166, 0.62)', // Teal
      phase: Math.PI, speedX: 0.0008, speedY: 0.0005,
      ampX: 0.32, ampY: 0.4
    },
    {
      x: 0, y: 0, dx: 0, dy: 0,
      color: 'rgba(245, 158, 11, 0.58)', // Sunburst Amber
      phase: Math.PI * 1.5, speedX: 0.0005, speedY: 0.0007,
      ampX: 0.28, ampY: 0.35
    },
    {
      x: 0, y: 0, dx: 0, dy: 0,
      color: 'rgba(59, 130, 246, 0.7)',  // Blue
      phase: Math.PI * 0.75, speedX: 0.0009, speedY: 0.0006,
      ampX: 0.35, ampY: 0.3
    }
  ];

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

  initGrid();

  // Generate dynamic grayscale noise pattern
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

  // Pointer event mappings
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
    initGrid();
  };
  window.addEventListener('resize', resize);

  // Render loop control
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

    // Premium dark obsidian space depth
    ctx.fillStyle = '#05030b';
    ctx.fillRect(0, 0, width, height);

    const time = Date.now() * CONFIG.morphSpeed;

    // 1. Move Background Color Anchors organically
    anchors.forEach((a) => {
      a.x = width * (0.5 + Math.sin(time * a.speedX + a.phase) * a.ampX);
      a.y = height * (0.5 + Math.cos(time * a.speedY + a.phase) * a.ampY);
    });

    // 2. Solve Elastic Grid Physics equations
    for (let k = 0; k < nodes.length; k++) {
      const n = nodes[k];
      const dx = mouse.x - n.baseX;
      const dy = mouse.y - n.baseY;
      const dist = Math.hypot(dx, dy);

      let targetX = n.baseX;
      let targetY = n.baseY;

      // Elastic repulsive force from cursor position
      if (mouse.active && dist < CONFIG.warpRadius) {
        const force = (CONFIG.warpRadius - dist) / CONFIG.warpRadius;
        const warpForceVal = force * 52 * CONFIG.warpForce;
        const angle = Math.atan2(dy, dx);
        
        targetX += Math.cos(angle) * warpForceVal;
        targetY += Math.sin(angle) * warpForceVal;
      }

      // Spring-damper force calculation (Hooke's Law + viscous resistance)
      const ax = (targetX - n.x) * CONFIG.springTension - n.vx * CONFIG.damping;
      const ay = (targetY - n.y) * CONFIG.springTension - n.vy * CONFIG.damping;

      n.vx += ax;
      n.vy += ay;
      n.x += n.vx;
      n.y += n.vy;
    }

    // 3. Render Blended Gradient Mesh anchors
    // Displace anchors based on closest local grid displacement to make the colors warp elastically
    anchors.forEach((a) => {
      // Find closest node to anchors base
      let closestNode = nodes[0];
      let minDist = 999999;
      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        const dist = Math.hypot(a.x - n.baseX, a.y - n.baseY);
        if (dist < minDist) {
          minDist = dist;
          closestNode = n;
        }
      }
      
      const dispX = closestNode.x - closestNode.baseX;
      const dispY = closestNode.y - closestNode.baseY;

      // Draw volumetric radial gradients with shifted locations
      const grad = ctx.createRadialGradient(
        a.x + dispX * 0.85, a.y + dispY * 0.85, 0,
        a.x + dispX * 0.85, a.y + dispY * 0.85, Math.max(width, height) * 0.55
      );
      grad.addColorStop(0, a.color);
      grad.addColorStop(1, 'rgba(5, 3, 11, 0)');
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    });

    // 4. Render Warped Wireframe Grid network overlay
    ctx.strokeStyle = \`rgba(255, 255, 255, \${CONFIG.gridOpacity})\`;
    ctx.lineWidth = 0.8;
    const strideVal = CONFIG.cols + 1;

    for (let j = 0; j <= CONFIG.rows; j++) {
      for (let i = 0; i <= CONFIG.cols; i++) {
        const idx = i + j * strideVal;
        const current = nodes[idx];

        // Draw horizontal grid lines
        if (i < CONFIG.cols) {
          const nextRight = nodes[idx + 1];
          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(nextRight.x, nextRight.y);
          ctx.stroke();
        }

        // Draw vertical grid lines
        if (j < CONFIG.rows) {
          const nextDown = nodes[idx + strideVal];
          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(nextDown.x, nextDown.y);
          ctx.stroke();
        }
      }
    }

    // 5. Draw dynamic film-grain noise overlay
    ctx.save();
    const pattern = ctx.createPattern(noiseCanvas, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.globalCompositeOperation = 'screen';
      // Shift coordinate coordinates randomly on every frame for tactile film static
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
  ts: `// Aetherial Morphing Mesh TypeScript Implementation Type Definitions
interface MeshConfig {
  cols: number;
  rows: number;
  springTension: number;
  damping: number;
  warpRadius: number;
  warpForce: number;
  morphSpeed: number;
  grainOpacity: number;
  gridOpacity: number;
}

interface MeshNode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface ColorAnchor {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
  phase: number;
  speedX: number;
  speedY: number;
  ampX: number;
  ampY: number;
}

const container = document.getElementById('mesh-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#mesh-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  const CONFIG: MeshConfig = {
    cols: 16,
    rows: 12,
    springTension: 0.08,
    damping: 0.15,
    warpRadius: 240,
    warpForce: 1.6,
    morphSpeed: 0.85,
    grainOpacity: 0.05,
    gridOpacity: 0.07
  };

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let nodes: MeshNode[] = [];
  const mouse = { x: -1000, y: -1000, active: false };

  const anchors: ColorAnchor[] = [
    {
      x: 0, y: 0, dx: 0, dy: 0,
      color: 'rgba(236, 72, 153, 0.72)',
      phase: 0, speedX: 0.0006, speedY: 0.0004,
      ampX: 0.38, ampY: 0.32
    },
    {
      x: 0, y: 0, dx: 0, dy: 0,
      color: 'rgba(139, 92, 246, 0.75)',
      phase: Math.PI / 2, speedX: 0.0004, speedY: 0.0008,
      ampX: 0.4, ampY: 0.28
    },
    {
      x: 0, y: 0, dx: 0, dy: 0,
      color: 'rgba(20, 184, 166, 0.62)',
      phase: Math.PI, speedX: 0.0008, speedY: 0.0005,
      ampX: 0.32, ampY: 0.4
    },
    {
      x: 0, y: 0, dx: 0, dy: 0,
      color: 'rgba(245, 158, 11, 0.58)',
      phase: Math.PI * 1.5, speedX: 0.0005, speedY: 0.0007,
      ampX: 0.28, ampY: 0.35
    },
    {
      x: 0, y: 0, dx: 0, dy: 0,
      color: 'rgba(59, 130, 246, 0.7)',
      phase: Math.PI * 0.75, speedX: 0.0009, speedY: 0.0006,
      ampX: 0.35, ampY: 0.3
    }
  ];

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

  initGrid();

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
    visible = !document.hidden;
  };
  document.addEventListener('visibilitychange', handleVisibility);

  let active = true;
  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    ctx.fillStyle = '#05030b';
    ctx.fillRect(0, 0, width, height);

    const time = Date.now() * CONFIG.morphSpeed;

    anchors.forEach((a) => {
      a.x = width * (0.5 + Math.sin(time * a.speedX + a.phase) * a.ampX);
      a.y = height * (0.5 + Math.cos(time * a.speedY + a.phase) * a.ampY);
    });

    for (let k = 0; k < nodes.length; k++) {
      const n = nodes[k];
      const dx = mouse.x - n.baseX;
      const dy = mouse.y - n.baseY;
      const dist = Math.hypot(dx, dy);

      let targetX = n.baseX;
      let targetY = n.baseY;

      if (mouse.active && dist < CONFIG.warpRadius) {
        const force = (CONFIG.warpRadius - dist) / CONFIG.warpRadius;
        const warpForceVal = force * 52 * CONFIG.warpForce;
        const angle = Math.atan2(dy, dx);
        
        targetX += Math.cos(angle) * warpForceVal;
        targetY += Math.sin(angle) * warpForceVal;
      }

      const ax = (targetX - n.x) * CONFIG.springTension - n.vx * CONFIG.damping;
      const ay = (targetY - n.y) * CONFIG.springTension - n.vy * CONFIG.damping;

      n.vx += ax;
      n.vy += ay;
      n.x += n.vx;
      n.y += n.vy;
    }

    anchors.forEach((a) => {
      let closestNode = nodes[0];
      let minDist = 999999;
      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        const dist = Math.hypot(a.x - n.baseX, a.y - n.baseY);
        if (dist < minDist) {
          minDist = dist;
          closestNode = n;
        }
      }
      
      const dispX = closestNode.x - closestNode.baseX;
      const dispY = closestNode.y - closestNode.baseY;

      const grad = ctx.createRadialGradient(
        a.x + dispX * 0.85, a.y + dispY * 0.85, 0,
        a.x + dispX * 0.85, a.y + dispY * 0.85, Math.max(width, height) * 0.55
      );
      grad.addColorStop(0, a.color);
      grad.addColorStop(1, 'rgba(5, 3, 11, 0)');
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    });

    ctx.strokeStyle = \`rgba(255, 255, 255, \${CONFIG.gridOpacity})\`;
    ctx.lineWidth = 0.8;
    const strideVal = CONFIG.cols + 1;

    for (let j = 0; j <= CONFIG.rows; j++) {
      for (let i = 0; i <= CONFIG.cols; i++) {
        const idx = i + j * strideVal;
        const current = nodes[idx];

        if (i < CONFIG.cols) {
          const nextRight = nodes[idx + 1];
          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(nextRight.x, nextRight.y);
          ctx.stroke();
        }

        if (j < CONFIG.rows) {
          const nextDown = nodes[idx + strideVal];
          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(nextDown.x, nextDown.y);
          ctx.stroke();
        }
      }
    }

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
  css: `/* Aetherial Morphing Mesh Styles */
.mesh-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #05030b;
  border-radius: 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.mesh-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`,
  tailwind: `<div class="relative w-full h-[480px] bg-[#05030b] rounded-[24px] overflow-hidden" id="mesh-sandbox-container">
  <canvas class="w-full h-full block" id="mesh-canvas-element"></canvas>

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
        <a href="#">Aetherial</a>
        <a href="#">Mesh</a>
        <button class="demo-signup-btn">Enter Portal</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>BILLION DOLLAR</span> Design Aesthetic</div>
      <h1 class="demo-headline">Warp through elastically morphing gradient mesh networks</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Portal</button>
        <button class="demo-secondary-btn">Adjust Elasticity</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design an ultra-premium morphing gradient mesh background with dynamic color anchors floating under sines and cosines, overlayed by an interactive elastic mesh grid that warps elastically from cursor movements, topped with a dynamic film grain pattern noise overlay.'
};

export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
