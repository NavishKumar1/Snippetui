import { WORLD_MAP_BASE64 } from './world-data.js';

export const component = {
  id: 'biolume-particle-globe',
  name: 'Bioluminescent Particle Globe',
  category: 'globe',
  tag: 'Quantum 3D',
  html: `<div class="globe-sandbox biolume-theme" id="biolume-globe-container">
  <canvas class="globe-canvas" id="biolume-globe-canvas"></canvas>
  <div class="globe-overlay-hud">
    <div class="hud-scanner-line purple-scanner"></div>
    <div class="hud-data-panel">
      <span class="hud-label">QUANTUM PARTICLE COHERENCE</span>
      <span class="hud-value" id="biolume-globe-coherence">COHERENCE: 94.8% // PARTICLES: 850</span>
    </div>
  </div>
</div>`,
  js: `// Bioluminescent Particle Globe Implementation
const WORLD_MAP_BASE64 = "${WORLD_MAP_BASE64}";
const container = document.getElementById('biolume-globe-container');
if (container) {
  const canvas = container.querySelector('#biolume-globe-canvas');
  const ctx = canvas.getContext('2d');
  const coherenceDisplay = container.querySelector('#biolume-globe-coherence');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const GLOBE_RADIUS = Math.min(width, height) * 0.35;
  const CAMERA_DISTANCE = 500;
  const SCALE = 350;

  let angleX = 0.4;
  let angleY = 0.6;
  let targetAngleX = 0.4;
  let targetAngleY = 0.6;

  let isDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startAngleX = 0;
  let startAngleY = 0;
  let velocityX = 0.003;
  let velocityY = 0;

  // Interactivity values
  let scatterFactor = 0; // Increases on drag, decays over time
  let targetScatter = 0;

  // Continent coordinate polygons for scanning
  const CONTINENTS = [
    // North America
    [[-168, 65], [-150, 70], [-100, 75], [-60, 75], [-50, 60], [-60, 50], [-80, 25], [-90, 15], [-100, 15], [-110, 8], [-115, 15], [-105, 20], [-120, 35], [-125, 48], [-165, 54]],
    // South America
    [[-80, 12], [-72, 10], [-60, 10], [-50, -5], [-35, -7], [-40, -20], [-60, -40], [-70, -55], [-75, -45], [-72, -30], [-80, -10], [-81, 5]],
    // Greenland
    [[-73, 70], [-60, 83], [-20, 83], [-10, 75], [-40, 60], [-50, 60]],
    // Africa
    [[-17, 32], [-5, 36], [10, 37], [30, 31], [32, 28], [50, 12], [46, -20], [34, -34], [20, -35], [10, -15], [8, 5], [-10, 10]],
    // Europe & Asia
    [[-10, 65], [10, 70], [30, 72], [60, 75], [90, 77], [120, 75], [160, 75], [170, 65], [140, 35], [120, 15], [108, 18], [98, 10], [90, 15], [80, 10], [75, 20], [60, 25], [40, 22], [30, 35], [26, 40], [10, 45], [-5, 40], [-10, 50], [-10, 60]],
    // India & SEA
    [[70, 22], [80, 22], [80, 8], [75, 8]],
    [[95, 20], [105, 20], [105, 5], [95, 10]],
    // Australia
    [[113, -25], [130, -10], [145, -15], [153, -28], [151, -38], [140, -38], [115, -35]],
    // Madagascar & Islands
    [[45, -12], [50, -12], [48, -25], [43, -25]]
  ];

  // Helper to load high-resolution map image and scan pixels
  const landPoints = [];
  const particles = [];
  const particleCount = 850;

  const initLandDots = () => {
    const img = new Image();
    img.src = WORLD_MAP_BASE64;
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 360;
      offscreen.height = 180;
      const oCtx = offscreen.getContext('2d');
      oCtx.drawImage(img, 0, 0, 360, 180);

      const imgData = oCtx.getImageData(0, 0, 360, 180).data;

      // Scan at 5-degree steps for a clean particle density
      const step = 5.0;
      for (let lat = -80; lat <= 80; lat += step) {
        const radLat = (lat * Math.PI) / 180;
        const cosLat = Math.cos(radLat);
        const sinLat = Math.sin(radLat);

        for (let lon = -180; lon < 180; lon += step) {
          const xIndex = Math.floor(lon + 180);
          const yIndex = Math.floor(90 - lat);
          const pixelIdx = (yIndex * 360 + xIndex) * 4;

          if (imgData[pixelIdx] > 128) {
            const radLon = (lon * Math.PI) / 180;
            const x = cosLat * Math.sin(radLon);
            const y = sinLat;
            const z = cosLat * Math.cos(radLon);

            landPoints.push({ x, y, z });
          }
        }
      }

      // Instantiate swarm particles once landPoints are mapped
      for (let i = 0; i < particleCount; i++) {
        const home = landPoints[Math.floor(Math.random() * landPoints.length)] || { x: 0, y: 0, z: 0 };
        
        particles.push({
          homeX: home.x,
          homeY: home.y,
          homeZ: home.z,
          offsetX: (Math.random() - 0.5) * 0.15,
          offsetY: (Math.random() - 0.5) * 0.15,
          offsetZ: (Math.random() - 0.5) * 0.15,
          orbitSpeed: 0.02 + Math.random() * 0.04,
          orbitPhase: Math.random() * Math.PI * 2,
          orbitRadius: 10 + Math.random() * 25,
          size: 1 + Math.random() * 1.5,
          color: Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(138, 43, 226, ' // Cyan vs Purple
        });
      }
    };
  };

  initLandDots();

  // Mouse interaction hooks
  const onMouseDown = (e) => {
    isDragging = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    startAngleX = targetAngleX;
    startAngleY = targetAngleY;
    container.style.cursor = 'grabbing';
    targetScatter = 30; // blow sparks outward slightly on drag
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startMouseX;
    const dy = e.clientY - startMouseY;

    targetAngleY = startAngleY + dx * 0.005;
    targetAngleX = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, startAngleX - dy * 0.005));

    velocityX = dx * 0.00025;
    velocityY = -dy * 0.00025;
    targetScatter = Math.min(80, targetScatter + Math.sqrt(dx*dx + dy*dy) * 0.1);
  };

  const onMouseUp = () => {
    isDragging = false;
    container.style.cursor = 'grab';
    targetScatter = 0; // return to home shapes
  };

  container.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
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
  let time = 0;
  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    time += 0.5;

    // Apply rotation drift
    if (!isDragging) {
      targetAngleY += velocityX;
      targetAngleX += velocityY;
      velocityX *= 0.96;
      velocityY *= 0.96;
      if (Math.abs(velocityX) < 0.001) velocityX = 0.0015;
    }

    angleX += (targetAngleX - angleX) * 0.12;
    angleY += (targetAngleY - angleY) * 0.12;

    // Decays scatter factors smoothly
    scatterFactor += (targetScatter - scatterFactor) * 0.08;

    // Premium glowing bio-spore background trace
    ctx.fillStyle = 'rgba(4, 3, 10, 0.28)';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    const renderPoints = [];

    particles.forEach(p => {
      p.orbitPhase += p.orbitSpeed;
      
      // Trigonometric swarm noise calculation
      const swingX = Math.sin(p.orbitPhase) * p.orbitRadius;
      const swingY = Math.cos(p.orbitPhase) * p.orbitRadius;
      const swingZ = Math.sin(p.orbitPhase * 1.5) * p.orbitRadius;

      // Base globe position
      const bx = p.homeX * GLOBE_RADIUS;
      const by = p.homeY * GLOBE_RADIUS;
      const bz = p.homeZ * GLOBE_RADIUS;

      // Combine base + dynamic orbit oscillations + scatter vector offsets
      const sx = bx + swingX + p.offsetX * scatterFactor * 25;
      const sy = by + swingY + p.offsetY * scatterFactor * 25;
      const sz = bz + swingZ + p.offsetZ * scatterFactor * 25;

      // Rotate coordinates in 3D
      const x1 = sx * cosY - sz * sinY;
      const z1 = sx * sinY + sz * cosY;
      const y2 = sy * cosX - z1 * sinX;
      const z2 = sy * sinX + z1 * cosX;

      const fov = SCALE / (z2 + CAMERA_DISTANCE);
      const projX = x1 * fov + centerX;
      const projY = y2 * fov + centerY;

      renderPoints.push({
        projX,
        projY,
        z: z2,
        size: p.size,
        color: p.color,
        isBack: z2 < 0
      });
    });

    // Sort by depth
    renderPoints.sort((a, b) => b.z - a.z);

    renderPoints.forEach(p => {
      const depthAlpha = Math.max(0.04, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
      
      ctx.beginPath();
      // Particles on front are slightly larger and brighter
      ctx.arc(p.projX, p.projY, p.isBack ? p.size * 0.6 : p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.isBack ? \`\${p.color}\${depthAlpha * 0.15})\` : \`\${p.color}\${depthAlpha * 0.8})\`;
      ctx.fill();
    });

    // Update quantum coherence HUD feedback based on particle scattering
    if (coherenceDisplay && Math.random() < 0.05) {
      const coherence = Math.max(20, 100 - scatterFactor * 1.6);
      coherenceDisplay.textContent = \`COHERENCE: \${coherence.toFixed(1)}% // ACTIVE QUANTUM FLUX: ONLINE\`;
    }
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    container.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}
`,
  ts: `// Bioluminescent Particle Globe TS Definitions
const WORLD_MAP_BASE64 = "${WORLD_MAP_BASE64}";
interface SwarmParticle {
  homeX: number;
  homeY: number;
  homeZ: number;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  orbitSpeed: number;
  orbitPhase: number;
  orbitRadius: number;
  size: number;
  color: string;
}

const container = document.getElementById('biolume-globe-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#biolume-globe-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const coherenceDisplay = container.querySelector('#biolume-globe-coherence') as HTMLSpanElement;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const GLOBE_RADIUS = Math.min(width, height) * 0.35;
  const CAMERA_DISTANCE = 500;
  const SCALE = 350;

  let angleX = 0.4;
  let angleY = 0.6;
  let targetAngleX = 0.4;
  let targetAngleY = 0.6;

  let isDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startAngleX = 0;
  let startAngleY = 0;
  let velocityX = 0.003;
  let velocityY = 0;

  let scatterFactor = 0;
  let targetScatter = 0;

  const CONTINENTS = [
    [[-168, 65], [-150, 70], [-100, 75], [-60, 75], [-50, 60], [-60, 50], [-80, 25], [-90, 15], [-100, 15], [-110, 8], [-115, 15], [-105, 20], [-120, 35], [-125, 48], [-165, 54]],
    [[-80, 12], [-72, 10], [-60, 10], [-50, -5], [-35, -7], [-40, -20], [-60, -40], [-70, -55], [-75, -45], [-72, -30], [-80, -10], [-81, 5]],
    [[-73, 70], [-60, 83], [-20, 83], [-10, 75], [-40, 60], [-50, 60]],
    [[-17, 32], [-5, 36], [10, 37], [30, 31], [32, 28], [50, 12], [46, -20], [34, -34], [20, -35], [10, -15], [8, 5], [-10, 10]],
    [[-10, 65], [10, 70], [30, 72], [60, 75], [90, 77], [120, 75], [160, 75], [170, 65], [140, 35], [120, 15], [108, 18], [98, 10], [90, 15], [80, 10], [75, 20], [60, 25], [40, 22], [30, 35], [26, 40], [10, 45], [-5, 40], [-10, 50], [-10, 60]],
    [[70, 22], [80, 22], [80, 8], [75, 8]],
    [[95, 20], [105, 20], [105, 5], [95, 10]],
    [[113, -25], [130, -10], [145, -15], [153, -28], [151, -38], [140, -38], [115, -35]],
    [[45, -12], [50, -12], [48, -25], [43, -25]]
  ];

  const landPoints: { x: number; y: number; z: number }[] = [];
  const particles: SwarmParticle[] = [];
  const particleCount = 850;

  const initLandDots = () => {
    const img = new Image();
    img.src = WORLD_MAP_BASE64;
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 360;
      offscreen.height = 180;
      const oCtx = offscreen.getContext('2d')!;
      oCtx.drawImage(img, 0, 0, 360, 180);

      const imgData = oCtx.getImageData(0, 0, 360, 180).data;

      const step = 5.0;
      for (let lat = -80; lat <= 80; lat += step) {
        const radLat = (lat * Math.PI) / 180;
        const cosLat = Math.cos(radLat);
        const sinLat = Math.sin(radLat);

        for (let lon = -180; lon < 180; lon += step) {
          const xIndex = Math.floor(lon + 180);
          const yIndex = Math.floor(90 - lat);
          const pixelIdx = (yIndex * 360 + xIndex) * 4;

          if (imgData[pixelIdx] > 128) {
            const radLon = (lon * Math.PI) / 180;
            const x = cosLat * Math.sin(radLon);
            const y = sinLat;
            const z = cosLat * Math.cos(radLon);

            landPoints.push({ x, y, z });
          }
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const home = landPoints[Math.floor(Math.random() * landPoints.length)] || { x: 0, y: 0, z: 0 };
        
        particles.push({
          homeX: home.x,
          homeY: home.y,
          homeZ: home.z,
          offsetX: (Math.random() - 0.5) * 0.15,
          offsetY: (Math.random() - 0.5) * 0.15,
          offsetZ: (Math.random() - 0.5) * 0.15,
          orbitSpeed: 0.02 + Math.random() * 0.04,
          orbitPhase: Math.random() * Math.PI * 2,
          orbitRadius: 10 + Math.random() * 25,
          size: 1 + Math.random() * 1.5,
          color: Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(138, 43, 226, '
        });
      }
    };
  };

  initLandDots();

  const onMouseDown = (e: MouseEvent) => {
    isDragging = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    startAngleX = targetAngleX;
    startAngleY = targetAngleY;
    container.style.cursor = 'grabbing';
    targetScatter = 30;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startMouseX;
    const dy = e.clientY - startMouseY;

    targetAngleY = startAngleY + dx * 0.005;
    targetAngleX = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, startAngleX - dy * 0.005));

    velocityX = dx * 0.00025;
    velocityY = -dy * 0.00025;
    targetScatter = Math.min(80, targetScatter + Math.sqrt(dx*dx + dy*dy) * 0.1);
  };

  const onMouseUp = () => {
    isDragging = false;
    container.style.cursor = 'grab';
    targetScatter = 0;
  };

  container.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  const resize = () => {
    width = canvas.width = container!.clientWidth;
    height = canvas.height = container!.clientHeight;
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

    if (!isDragging) {
      targetAngleY += velocityX;
      targetAngleX += velocityY;
      velocityX *= 0.96;
      velocityY *= 0.96;
      if (Math.abs(velocityX) < 0.001) velocityX = 0.0015;
    }

    angleX += (targetAngleX - angleX) * 0.12;
    angleY += (targetAngleY - angleY) * 0.12;

    scatterFactor += (targetScatter - scatterFactor) * 0.08;

    ctx.fillStyle = 'rgba(4, 3, 10, 0.28)';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    const renderPoints: any[] = [];

    particles.forEach(p => {
      p.orbitPhase += p.orbitSpeed;
      
      const swingX = Math.sin(p.orbitPhase) * p.orbitRadius;
      const swingY = Math.cos(p.orbitPhase) * p.orbitRadius;
      const swingZ = Math.sin(p.orbitPhase * 1.5) * p.orbitRadius;

      const bx = p.homeX * GLOBE_RADIUS;
      const by = p.homeY * GLOBE_RADIUS;
      const bz = p.homeZ * GLOBE_RADIUS;

      const sx = bx + swingX + p.offsetX * scatterFactor * 25;
      const sy = by + swingY + p.offsetY * scatterFactor * 25;
      const sz = bz + swingZ + p.offsetZ * scatterFactor * 25;

      const x1 = sx * cosY - sz * sinY;
      const z1 = sx * sinY + sz * cosY;
      const y2 = sy * cosX - z1 * sinX;
      const z2 = sy * sinX + z1 * cosX;

      const fov = SCALE / (z2 + CAMERA_DISTANCE);
      const projX = x1 * fov + centerX;
      const projY = y2 * fov + centerY;

      renderPoints.push({
        projX,
        projY,
        z: z2,
        size: p.size,
        color: p.color,
        isBack: z2 < 0
      });
    });

    renderPoints.sort((a, b) => b.z - a.z);

    renderPoints.forEach(p => {
      const depthAlpha = Math.max(0.04, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
      
      ctx.beginPath();
      ctx.arc(p.projX, p.projY, p.isBack ? p.size * 0.6 : p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.isBack ? \`\${p.color}\${depthAlpha * 0.15})\` : \`\${p.color}\${depthAlpha * 0.8})\`;
      ctx.fill();
    });

    if (coherenceDisplay && Math.random() < 0.05) {
      const coherence = Math.max(20, 100 - scatterFactor * 1.6);
      coherenceDisplay.textContent = \`COHERENCE: \${coherence.toFixed(1)}% // ACTIVE QUANTUM FLUX: ONLINE\`;
    }
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    container.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  css: `/* Bioluminescent Particle Globe styles */
.globe-sandbox.biolume-theme {
  position: relative;
  width: 100%;
  height: 520px;
  background: #04030a;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
  box-sizing: border-box;
}

.globe-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.globe-overlay-hud {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 2;
  pointer-events: none;
  font-family: 'Fira Code', monospace;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hud-scanner-line.purple-scanner {
  width: 80px;
  height: 2px;
  background: #a855f7;
  box-shadow: 0 0 10px #a855f7;
  animation: scan-left-right 3s ease-in-out infinite alternate;
}

.hud-data-panel {
  background: rgba(8, 8, 12, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 8px 14px;
  border-radius: 10px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hud-label {
  font-size: 8px;
  color: #6b7280;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.hud-value {
  font-size: 10.5px;
  color: #a855f7;
  font-weight: 500;
}
`
};
