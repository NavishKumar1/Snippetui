import { WORLD_MAP_BASE64 } from './world-data.js';

export const component = {
  id: 'matrix-cyber-globe',
  name: 'Matrix Cyber Globe',
  category: 'globe',
  tag: 'Digital 3D',
  html: `<div class="globe-sandbox matrix-theme" id="matrix-globe-container">
  <canvas class="globe-canvas" id="matrix-globe-canvas"></canvas>
  <div class="globe-overlay-hud">
    <div class="hud-scanner-line green-scanner"></div>
    <div class="hud-data-panel">
      <span class="hud-label">CYBER SYSTEM GRID</span>
      <span class="hud-value" id="matrix-globe-console">SYSTEM: SECURE // BITRATE: 1.8GB/S</span>
    </div>
  </div>
</div>`,
  js: `// Matrix Cyber Globe Implementation
const WORLD_MAP_BASE64 = "${WORLD_MAP_BASE64}";
const container = document.getElementById('matrix-globe-container');
if (container) {
  const canvas = container.querySelector('#matrix-globe-canvas');
  const ctx = canvas.getContext('2d');
  const consoleDisplay = container.querySelector('#matrix-globe-console');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const GLOBE_RADIUS = Math.min(width, height) * 0.35;
  const CAMERA_DISTANCE = 500;
  const SCALE = 350;

  let angleX = 0.2;
  let angleY = 0.5;
  let targetAngleX = 0.2;
  let targetAngleY = 0.5;

  let isDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startAngleX = 0;
  let startAngleY = 0;
  let velocityX = 0.0035;
  let velocityY = 0;

  // Characters used for matrix rain
  const MATRIX_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%&*ｦｧｹﾒｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';

  // Scan points
  const matrixPoints = [];
  const initMatrixDots = () => {
    const img = new Image();
    img.src = WORLD_MAP_BASE64;
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 360;
      offscreen.height = 180;
      const oCtx = offscreen.getContext('2d');
      oCtx.drawImage(img, 0, 0, 360, 180);

      const imgData = oCtx.getImageData(0, 0, 360, 180).data;

      // Scan at 4.5-degree steps for a clean character grid density
      const step = 4.5;
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
            const x = GLOBE_RADIUS * cosLat * Math.sin(radLon);
            const y = GLOBE_RADIUS * sinLat;
            const z = GLOBE_RADIUS * cosLat * Math.cos(radLon);

            matrixPoints.push({
              x, y, z,
              char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
              charSpeed: Math.random() * 0.05 + 0.02,
              charTimer: Math.random() * Math.PI,
              // Offset for vertical rain coordinates
              rainOffset: Math.random() * Math.PI * 2
            });
          }
        }
      }
    };
  };

  initMatrixDots();

  // Drag listeners
  const onMouseDown = (e) => {
    isDragging = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    startAngleX = targetAngleX;
    startAngleY = targetAngleY;
    container.style.cursor = 'grabbing';
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startMouseX;
    const dy = e.clientY - startMouseY;

    targetAngleY = startAngleY + dx * 0.005;
    targetAngleX = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, startAngleX - dy * 0.005));

    velocityX = dx * 0.0002;
    velocityY = -dy * 0.0002;
  };

  const onMouseUp = () => {
    isDragging = false;
    container.style.cursor = 'grab';
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
      if (Math.abs(velocityX) < 0.001) velocityX = 0.0018;
    }

    angleX += (targetAngleX - angleX) * 0.12;
    angleY += (targetAngleY - angleY) * 0.12;

    // Premium matrix trail fade effect
    ctx.fillStyle = 'rgba(4, 4, 8, 0.4)';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    const renderQueue = [];

    matrixPoints.forEach(p => {
      // 3D rotation
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const fov = SCALE / (z2 + CAMERA_DISTANCE);
      const projX = x1 * fov + centerX;
      const projY = y2 * fov + centerY;

      // Update random character occasionally
      p.charTimer += p.charSpeed;
      if (p.charTimer >= Math.PI) {
        p.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        p.charTimer = 0;
      }

      // Compute matrix rain brightness using a descending wave function
      // Based on relative 3D latitude (p.y) + time + individual coordinate offsets
      const rainWave = Math.sin(p.y * 0.06 - time * 0.12 + p.rainOffset);
      let brightness = Math.max(0.1, (rainWave + 1) / 2);

      // Super glow highlights for leading packets
      let isLeader = rainWave > 0.93;

      renderQueue.push({
        projX,
        projY,
        z: z2,
        char: p.char,
        brightness,
        isLeader,
        isBack: z2 < 0,
        fov
      });
    });

    // Sort by depth
    renderQueue.sort((a, b) => b.z - a.z);

    renderQueue.forEach(p => {
      const depthAlpha = Math.max(0.05, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
      
      // Calculate font scale based on depth fov
      const fontSize = Math.floor(7 * p.fov);
      ctx.font = \`\${fontSize}px 'Fira Code', monospace\`;
      
      if (p.isBack) {
        // Backside: Faint, muted green
        ctx.fillStyle = \`rgba(16, 185, 129, \${depthAlpha * 0.12 * p.brightness})\`;
        ctx.fillText(p.char, p.projX, p.projY);
      } else {
        if (p.isLeader) {
          // Leader packet: Bright glowing white-green
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#10b981';
          ctx.fillText(p.char, p.projX, p.projY);
          ctx.shadowBlur = 0;
        } else {
          // Normal packet: Matrix green
          ctx.fillStyle = \`rgba(34, 197, 94, \${depthAlpha * p.brightness})\`;
          ctx.fillText(p.char, p.projX, p.projY);
        }
      }
    });

    // Update CLI console log message
    if (consoleDisplay && Math.random() < 0.03) {
      const statuses = [
        'SYSTEM: ACTIVE // DECRYPTING DATA STREAM...',
        'IP: 192.168.1.104 // SECTOR: SHIELD_DYNAMICS',
        'PORT SCAN COMPLETED // FIREWALL: OPERATIONAL',
        'INJECTING MATRIX GLYPH DATA // COMPILING...'
      ];
      consoleDisplay.textContent = statuses[Math.floor(Math.random() * statuses.length)];
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
  ts: `// Matrix Cyber Globe TS Definitions
const WORLD_MAP_BASE64 = "${WORLD_MAP_BASE64}";
interface MatrixPoint {
  x: number;
  y: number;
  z: number;
  char: string;
  charSpeed: number;
  charTimer: number;
  rainOffset: number;
}

const container = document.getElementById('matrix-globe-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#matrix-globe-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const consoleDisplay = container.querySelector('#matrix-globe-console') as HTMLSpanElement;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const GLOBE_RADIUS = Math.min(width, height) * 0.35;
  const CAMERA_DISTANCE = 500;
  const SCALE = 350;

  let angleX = 0.2;
  let angleY = 0.5;
  let targetAngleX = 0.2;
  let targetAngleY = 0.5;

  let isDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startAngleX = 0;
  let startAngleY = 0;
  let velocityX = 0.0035;
  let velocityY = 0;

  const MATRIX_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%&*ｦｧｹﾒｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';

  const matrixPoints: MatrixPoint[] = [];
  const initMatrixDots = () => {
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
            const x = GLOBE_RADIUS * cosLat * Math.sin(radLon);
            const y = GLOBE_RADIUS * sinLat;
            const z = GLOBE_RADIUS * cosLat * Math.cos(radLon);

            matrixPoints.push({
              x, y, z,
              char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
              charSpeed: Math.random() * 0.05 + 0.02,
              charTimer: Math.random() * Math.PI,
              rainOffset: Math.random() * Math.PI * 2
            });
          }
        }
      }
    };
  };

  initMatrixDots();

  const onMouseDown = (e: MouseEvent) => {
    isDragging = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    startAngleX = targetAngleX;
    startAngleY = targetAngleY;
    container.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startMouseX;
    const dy = e.clientY - startMouseY;

    targetAngleY = startAngleY + dx * 0.005;
    targetAngleX = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, startAngleX - dy * 0.005));

    velocityX = dx * 0.0002;
    velocityY = -dy * 0.0002;
  };

  const onMouseUp = () => {
    isDragging = false;
    container.style.cursor = 'grab';
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
  let time = 0;
  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    time += 0.5;

    if (!isDragging) {
      targetAngleY += velocityX;
      targetAngleX += velocityY;
      velocityX *= 0.96;
      velocityY *= 0.96;
      if (Math.abs(velocityX) < 0.001) velocityX = 0.0018;
    }

    angleX += (targetAngleX - angleX) * 0.12;
    angleY += (targetAngleY - angleY) * 0.12;

    ctx.fillStyle = 'rgba(4, 4, 8, 0.4)';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    const renderQueue: any[] = [];

    dotPoints.forEach(p => {
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const fov = SCALE / (z2 + CAMERA_DISTANCE);
      const projX = x1 * fov + centerX;
      const projY = y2 * fov + centerY;

      p.charTimer += p.charSpeed;
      if (p.charTimer >= Math.PI) {
        p.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        p.charTimer = 0;
      }

      const rainWave = Math.sin(p.y * 0.06 - time * 0.12 + p.rainOffset);
      const brightness = Math.max(0.1, (rainWave + 1) / 2);
      const isLeader = rainWave > 0.93;

      renderQueue.push({
        projX,
        projY,
        z: z2,
        char: p.char,
        brightness,
        isLeader,
        isBack: z2 < 0,
        fov
      });
    });

    renderQueue.sort((a, b) => b.z - a.z);

    renderQueue.forEach(p => {
      const depthAlpha = Math.max(0.05, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
      const fontSize = Math.floor(7 * p.fov);
      ctx.font = \`\${fontSize}px 'Fira Code', monospace\`;
      
      if (p.isBack) {
        ctx.fillStyle = \`rgba(16, 185, 129, \${depthAlpha * 0.12 * p.brightness})\`;
        ctx.fillText(p.char, p.projX, p.projY);
      } else {
        if (p.isLeader) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#10b981';
          ctx.fillText(p.char, p.projX, p.projY);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = \`rgba(34, 197, 94, \${depthAlpha * p.brightness})\`;
          ctx.fillText(p.char, p.projX, p.projY);
        }
      }
    });

    if (consoleDisplay && Math.random() < 0.03) {
      const statuses = [
        'SYSTEM: ACTIVE // DECRYPTING DATA STREAM...',
        'IP: 192.168.1.104 // SECTOR: SHIELD_DYNAMICS',
        'PORT SCAN COMPLETED // FIREWALL: OPERATIONAL',
        'INJECTING MATRIX GLYPH DATA // COMPILING...'
      ];
      consoleDisplay.textContent = statuses[Math.floor(Math.random() * statuses.length)];
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
  css: `/* Matrix Cyber Globe styles */
.globe-sandbox.matrix-theme {
  position: relative;
  width: 100%;
  height: 520px;
  background: #020204;
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

.hud-scanner-line.green-scanner {
  width: 80px;
  height: 2px;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
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
  color: #10b981;
  font-weight: 500;
}
`
};
