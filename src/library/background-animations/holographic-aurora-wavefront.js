/**
 * Component: Holographic Aurora Wavefront Background Component
 * Category: background-animations
 */

export const component = {
  id: 'holographic-aurora-wavefront',
  name: 'Holographic Aurora Wavefront',
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
        <a href="#">Holographic</a>
        <a href="#">Aurora</a>
        <button class="demo-signup-btn">Launch Wavefront</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>ULTRA PREMIUM</span> 10th Component</div>
      <h1 class="demo-headline">Additative volumetric auroral waves with refractive color separation</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Aurora</button>
        <button class="demo-secondary-btn">Adjust Wavefront</button>
      </div>
    </main>
  </div>
</div>`,
  js: `// Holographic Aurora Wavefront - Volumetric ribbon curves with spring dynamics & grain
const container = document.getElementById('aurora-sandbox-container');
if (container) {
  const canvas = container.querySelector('#aurora-canvas-element');
  const ctx = canvas.getContext('2d');

  const CONFIG = {
    ribbonCount: 5,           // Number of overlapping auroral curtains
    pointsPerRibbon: 120,     // Horizontal resolution of wave physics
    springTension: 0.07,      // Ribbon elastic grid stiffness
    damping: 0.16,            // Ribbon vertical dampening/resistance
    warpRadius: 260,          // Distance of mouse gravitational warp field
    warpForce: 1.45,          // Interactive warp displacement factor
    waveSpeed: 0.85,          // Global wave drift speed
    grainOpacity: 0.05,       // Opacity of dynamic camera noise overlay
    chromaOffset: 4.5,        // Chromatic aberration pixel separation offset
  };

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  // Ribbons physics representations
  let ribbons = [];

  // Define unique color profiles for additive blending
  const colorProfiles = [
    { primary: 'rgba(0, 242, 254, 0.28)', secondary: 'rgba(139, 92, 246, 0.0)' },  // Cyan to transparent
    { primary: 'rgba(139, 92, 246, 0.25)', secondary: 'rgba(236, 72, 153, 0.0)' },  // Violet to transparent
    { primary: 'rgba(236, 72, 153, 0.22)', secondary: 'rgba(245, 158, 11, 0.0)' },  // Magenta to transparent
    { primary: 'rgba(16, 185, 129, 0.24)', secondary: 'rgba(0, 242, 254, 0.0)' },  // Emerald to transparent
    { primary: 'rgba(245, 158, 11, 0.2)', secondary: 'rgba(139, 92, 246, 0.0)' }    // Amber to transparent
  ];

  function initWaves() {
    ribbons = [];
    const count = CONFIG.ribbonCount;
    const res = CONFIG.pointsPerRibbon;

    for (let r = 0; r < count; r++) {
      const points = [];
      const baseH = height * (0.35 + (r / count) * 0.35); // Distributed baseline heights
      
      for (let i = 0; i <= res; i++) {
        const xCoord = (i / res) * width;
        points.push({
          x: xCoord,
          y: baseH,
          vy: 0,
          baseHeight: baseH
        });
      }

      ribbons.push({
        points: points,
        profile: colorProfiles[r % colorProfiles.length],
        speed: 0.0008 + r * 0.0003,
        freq: 0.004 + r * 0.002,
        amp: 45 + r * 15,
        phase: r * (Math.PI / 4)
      });
    }
  }

  initWaves();

  // Create film grain noise pattern canvas
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
    initWaves();
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

    // Midnight sky background depth
    ctx.fillStyle = '#020106';
    ctx.fillRect(0, 0, width, height);

    const time = Date.now() * CONFIG.waveSpeed;

    // 1. Solve Wave Mechanics and Gravitational Mouse Warp
    ribbons.forEach((ribbon) => {
      const len = ribbon.points.length;
      for (let i = 0; i < len; i++) {
        const p = ribbon.points[i];
        
        // Solar-wind nested wave drift baseline target
        let targetY = p.baseHeight + 
          Math.sin(time * ribbon.speed + p.x * ribbon.freq + ribbon.phase) * ribbon.amp + 
          Math.cos(time * (ribbon.speed * 0.7) + p.x * (ribbon.freq * 1.5) + ribbon.phase) * (ribbon.amp * 0.4);

        // Calculate cursor displacement attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - targetY;
        const dist = Math.hypot(dx, dy);

        if (mouse.active && dist < CONFIG.warpRadius) {
          const force = (CONFIG.warpRadius - dist) / CONFIG.warpRadius;
          const attractionStrength = force * 65 * CONFIG.warpForce;
          
          // Pull ribbon vertically toward mouse Y
          targetY += (mouse.y - targetY) * force * CONFIG.warpForce;
        }

        // Spring acceleration & resistance
        const ay = (targetY - p.y) * CONFIG.springTension - p.vy * CONFIG.damping;
        p.vy += ay;
        p.y += p.vy;
      }
    });

    // 2. Render Additive Glowing Volumetric Curtains
    ctx.globalCompositeOperation = 'screen';

    ribbons.forEach((ribbon) => {
      const len = ribbon.points.length;

      // Draw chromatic passes: Red shifted Left (-chromaOffset), Cyan shifted Right (+chromaOffset)
      const passes = [
        { offset: -CONFIG.chromaOffset, color: 'rgba(236, 72, 153, 0.18)' }, // Magenta-Red channel
        { offset: CONFIG.chromaOffset, color: 'rgba(0, 242, 254, 0.22)' }    // Cyan-Blue channel
      ];

      passes.forEach((pass) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        // Draw bottom to wave boundary
        ctx.lineTo(ribbon.points[0].x + pass.offset, ribbon.points[0].y);
        for (let i = 1; i < len; i++) {
          ctx.lineTo(ribbon.points[i].x + pass.offset, ribbon.points[i].y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        // Create volumetric vertical gradient fill
        const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
        grad.addColorStop(0, pass.color);
        grad.addColorStop(0.65, ribbon.profile.primary);
        grad.addColorStop(1, ribbon.profile.secondary);

        ctx.fillStyle = grad;
        ctx.fill();
      });
    });

    // Reset composite mode to draw grain normal
    ctx.globalCompositeOperation = 'source-over';

    // 3. Render dynamic film-grain noise overlay
    ctx.save();
    const pattern = ctx.createPattern(noiseCanvas, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.globalCompositeOperation = 'screen';
      // Random coordinates offset to simulate camera grain flicker
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
  ts: `// Holographic Aurora Wavefront TypeScript Implementation Type Definitions
interface WaveConfig {
  ribbonCount: number;
  pointsPerRibbon: number;
  springTension: number;
  damping: number;
  warpRadius: number;
  warpForce: number;
  waveSpeed: number;
  grainOpacity: number;
  chromaOffset: number;
}

interface WavePoint {
  x: number;
  y: number;
  vy: number;
  baseHeight: number;
}

interface ColorProfile {
  primary: string;
  secondary: string;
}

interface Ribbon {
  points: WavePoint[];
  profile: ColorProfile;
  speed: number;
  freq: number;
  amp: number;
  phase: number;
}

const container = document.getElementById('aurora-sandbox-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#aurora-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  const CONFIG: WaveConfig = {
    ribbonCount: 5,
    pointsPerRibbon: 120,
    springTension: 0.07,
    damping: 0.16,
    warpRadius: 260,
    warpForce: 1.45,
    waveSpeed: 0.85,
    grainOpacity: 0.05,
    chromaOffset: 4.5
  };

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };
  let ribbons: Ribbon[] = [];

  const colorProfiles: ColorProfile[] = [
    { primary: 'rgba(0, 242, 254, 0.28)', secondary: 'rgba(139, 92, 246, 0.0)' },
    { primary: 'rgba(139, 92, 246, 0.25)', secondary: 'rgba(236, 72, 153, 0.0)' },
    { primary: 'rgba(236, 72, 153, 0.22)', secondary: 'rgba(245, 158, 11, 0.0)' },
    { primary: 'rgba(16, 185, 129, 0.24)', secondary: 'rgba(0, 242, 254, 0.0)' },
    { primary: 'rgba(245, 158, 11, 0.2)', secondary: 'rgba(139, 92, 246, 0.0)' }
  ];

  function initWaves() {
    ribbons = [];
    const count = CONFIG.ribbonCount;
    const res = CONFIG.pointsPerRibbon;

    for (let r = 0; r < count; r++) {
      const points: WavePoint[] = [];
      const baseH = height * (0.35 + (r / count) * 0.35);
      
      for (let i = 0; i <= res; i++) {
        const xCoord = (i / res) * width;
        points.push({
          x: xCoord,
          y: baseH,
          vy: 0,
          baseHeight: baseH
        });
      }

      ribbons.push({
        points: points,
        profile: colorProfiles[r % colorProfiles.length],
        speed: 0.0008 + r * 0.0003,
        freq: 0.004 + r * 0.002,
        amp: 45 + r * 15,
        phase: r * (Math.PI / 4)
      });
    }
  }

  initWaves();

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
    initWaves();
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

    ctx.fillStyle = '#020106';
    ctx.fillRect(0, 0, width, height);

    const time = Date.now() * CONFIG.waveSpeed;

    ribbons.forEach((ribbon) => {
      const len = ribbon.points.length;
      for (let i = 0; i < len; i++) {
        const p = ribbon.points[i];
        
        let targetY = p.baseHeight + 
          Math.sin(time * ribbon.speed + p.x * ribbon.freq + ribbon.phase) * ribbon.amp + 
          Math.cos(time * (ribbon.speed * 0.7) + p.x * (ribbon.freq * 1.5) + ribbon.phase) * (ribbon.amp * 0.4);

        const dx = mouse.x - p.x;
        const dy = mouse.y - targetY;
        const dist = Math.hypot(dx, dy);

        if (mouse.active && dist < CONFIG.warpRadius) {
          const force = (CONFIG.warpRadius - dist) / CONFIG.warpRadius;
          targetY += (mouse.y - targetY) * force * CONFIG.warpForce;
        }

        const ay = (targetY - p.y) * CONFIG.springTension - p.vy * CONFIG.damping;
        p.vy += ay;
        p.y += p.vy;
      }
    });

    ctx.globalCompositeOperation = 'screen';

    ribbons.forEach((ribbon) => {
      const len = ribbon.points.length;

      const passes = [
        { offset: -CONFIG.chromaOffset, color: 'rgba(236, 72, 153, 0.18)' },
        { offset: CONFIG.chromaOffset, color: 'rgba(0, 242, 254, 0.22)' }
      ];

      passes.forEach((pass) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        ctx.lineTo(ribbon.points[0].x + pass.offset, ribbon.points[0].y);
        for (let i = 1; i < len; i++) {
          ctx.lineTo(ribbon.points[i].x + pass.offset, ribbon.points[i].y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
        grad.addColorStop(0, pass.color);
        grad.addColorStop(0.65, ribbon.profile.primary);
        grad.addColorStop(1, ribbon.profile.secondary);

        ctx.fillStyle = grad;
        ctx.fill();
      });
    });

    ctx.globalCompositeOperation = 'source-over';

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
  css: `/* Holographic Aurora Wavefront Styles */
.aurora-sandbox {
  position: relative;
  width: 100%;
  height: 480px;
  background: #020106;
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
  tailwind: `<div class="relative w-full h-[480px] bg-[#020106] rounded-[24px] overflow-hidden" id="aurora-sandbox-container">
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
        <a href="#">Holographic</a>
        <a href="#">Aurora</a>
        <button class="demo-signup-btn">Launch Wavefront</button>
      </nav>
    </header>
    
    <main class="demo-hero">
      <div class="demo-badge"><span>ULTRA PREMIUM</span> 10th Component</div>
      <h1 class="demo-headline">Additative volumetric auroral waves with refractive color separation</h1>
      <div class="demo-actions">
        <button class="demo-primary-btn">Initialize Aurora</button>
        <button class="demo-secondary-btn">Adjust Wavefront</button>
      </div>
    </main>
  </div>
</div>`,
  prompt: 'Design an ultra-premium background animation with multiple overlapping volumetric auroral ribbon curtains screen blended together, animated under nested wave functions, warping vertically elastically on mouse coordinates, with chromatic red-cyan refraction offsets, and overlayed with a dynamic film grain overlay.'
};

export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
