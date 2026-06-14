import { WORLD_MAP_BASE64 } from './world-data.js';

export const component = {
  id: 'dotted-connection-globe',
  name: 'Dotted Connection Globe',
  category: 'globe',
  tag: 'Canvas 3D',
  html: `<div class="globe-sandbox" id="dotted-globe-container">
  <canvas class="globe-canvas" id="dotted-globe-canvas"></canvas>
  <div class="globe-overlay-hud">
    <div class="hud-scanner-line"></div>
    <div class="hud-data-panel">
      <span class="hud-label">COORDINATE MONITORING</span>
      <span class="hud-value" id="dotted-globe-coords">LAT: 0.00° / LON: 0.00°</span>
    </div>
  </div>
</div>`,
  js: `// Dotted Connection Globe Implementation
const WORLD_MAP_BASE64 = "${WORLD_MAP_BASE64}";
const container = document.getElementById('dotted-globe-container');
if (container) {
  const canvas = container.querySelector('#dotted-globe-canvas');
  const ctx = canvas.getContext('2d');
  const coordDisplay = container.querySelector('#dotted-globe-coords');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  // Globe parameters
  const GLOBE_RADIUS = Math.min(width, height) * 0.35;
  const CAMERA_DISTANCE = 500;
  const SCALE = 350;

  // 3D Angles
  let angleX = 0.3;
  let angleY = 0.8;
  let targetAngleX = 0.3;
  let targetAngleY = 0.8;

  // Drag Interaction States
  let isDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startAngleX = 0;
  let startAngleY = 0;
  let velocityX = 0.003; // Default auto-rotate drift
  let velocityY = 0;

  // Beacons definition (Longitude/Latitude coordinates)
  const BEACONS = [
    { name: 'London', lon: 0, lat: 51.5, color: '#00f2fe' },
    { name: 'New York', lon: -74, lat: 40.7, color: '#00f2fe' },
    { name: 'Tokyo', lon: 139.7, lat: 35.6, color: '#ff007f' },
    { name: 'Sydney', lon: 151.2, lat: -33.9, color: '#00f2fe' },
    { name: 'São Paulo', lon: -46.6, lat: -23.5, color: '#8a2be2' },
    { name: 'Cape Town', lon: 18.4, lat: -33.9, color: '#ff007f' }
  ];

  // Continent coordinate polygons for scanning
  // Helper to load high-resolution map image and scan pixels
  const dotPoints = [];
  const initWorldDots = () => {
    const img = new Image();
    img.src = WORLD_MAP_BASE64;
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 360;
      offscreen.height = 180;
      const oCtx = offscreen.getContext('2d');
      oCtx.drawImage(img, 0, 0, 360, 180);

      const imgData = oCtx.getImageData(0, 0, 360, 180).data;

      // Scan the map at 3.6-degree steps for beautiful high details
      const step = 3.6;
      for (let lat = -85; lat <= 85; lat += step) {
        const radLat = (lat * Math.PI) / 180;
        const cosLat = Math.cos(radLat);
        const sinLat = Math.sin(radLat);

        for (let lon = -180; lon < 180; lon += step) {
          const xIndex = Math.floor(lon + 180);
          const yIndex = Math.floor(90 - lat);
          const pixelIdx = (yIndex * 360 + xIndex) * 4;

          // Check if pixel is white (land)
          if (imgData[pixelIdx] > 128) {
            const radLon = (lon * Math.PI) / 180;
            const x = GLOBE_RADIUS * cosLat * Math.sin(radLon);
            const y = GLOBE_RADIUS * sinLat;
            const z = GLOBE_RADIUS * cosLat * Math.cos(radLon);

            dotPoints.push({ x, y, z });
          }
        }
      }
    };
  };

  initWorldDots();

  // Pre-calculate beacon coordinates
  const preparedBeacons = BEACONS.map(b => {
    const radLon = (b.lon * Math.PI) / 180;
    const radLat = (b.lat * Math.PI) / 180;
    const cosLat = Math.cos(radLat);
    const x = GLOBE_RADIUS * cosLat * Math.sin(radLon);
    const y = GLOBE_RADIUS * Math.sin(radLat);
    const z = GLOBE_RADIUS * cosLat * Math.cos(radLon);

    return { ...b, x, y, z, pulse: Math.random() * Math.PI };
  });

  // Drag event listeners
  const onMouseDown = (e) => {
    isDragging = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    startAngleX = targetAngleX;
    startAngleY = targetAngleY;
    container.style.cursor = 'grabbing';
  };

  const onMouseMove = (e) => {
    if (!isDragging) {
      // Calculate hovered coordinate overlay for HUD feedback
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      // Project mouse screen coordinates to spherical lon/lat estimation
      const dLon = ((mouseX / width) * 360 - (angleY * 180) / Math.PI) % 360;
      const dLat = -((mouseY / height) * 180) % 180;
      const cleanLon = dLon < -180 ? dLon + 360 : (dLon > 180 ? dLon - 360 : dLon);
      const cleanLat = Math.max(-90, Math.min(90, dLat));
      if (coordDisplay) {
        coordDisplay.textContent = \`LAT: \${cleanLat.toFixed(2)}° / LON: \${cleanLon.toFixed(2)}°\`;
      }
      return;
    }

    const dx = e.clientX - startMouseX;
    const dy = e.clientY - startMouseY;

    // Adjust angles based on drag distance
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

  // IntersectionObserver to prevent background render cycles
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

    // Apply inertia rotation drift
    if (!isDragging) {
      targetAngleY += velocityX;
      targetAngleX += velocityY;
      velocityX *= 0.96;
      velocityY *= 0.96;
      if (Math.abs(velocityX) < 0.001) velocityX = 0.0015; // default slow drift
    }

    // Smooth angle interpolation
    angleX += (targetAngleX - angleX) * 0.12;
    angleY += (targetAngleY - angleY) * 0.12;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Trig matrices for rotation
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    // Render Back-Side Points First (Depth Sorting)
    const renderPoints = [];

    dotPoints.forEach(p => {
      // 3D rotation
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;

      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const fov = SCALE / (z2 + CAMERA_DISTANCE);
      const projX = x1 * fov + centerX;
      const projY = y2 * fov + centerY;

      renderPoints.push({ projX, projY, z: z2, isBack: z2 < 0 });
    });

    // Sort: draw back side first
    renderPoints.sort((a, b) => b.z - a.z);

    // Draw grid dots
    renderPoints.forEach(p => {
      const depthAlpha = Math.max(0.06, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
      ctx.beginPath();
      ctx.arc(p.projX, p.projY, p.isBack ? 0.75 : 1.25, 0, Math.PI * 2);
      ctx.fillStyle = p.isBack ? \`rgba(255, 255, 255, \${depthAlpha * 0.15})\` : \`rgba(0, 242, 254, \${depthAlpha * 0.8})\`;
      ctx.fill();
    });

    // Rotate and Render Beacons
    preparedBeacons.forEach(b => {
      const x1 = b.x * cosY - b.z * sinY;
      const z1 = b.x * sinY + b.z * cosY;
      const y2 = b.y * cosX - z1 * sinX;
      const z2 = b.y * sinX + z1 * cosX;

      // Only display fully visible front beacons
      if (z2 > -20) {
        const fov = SCALE / (z2 + CAMERA_DISTANCE);
        const projX = x1 * fov + centerX;
        const projY = y2 * fov + centerY;

        b.pulse += 0.05;
        const pulseSize = 4 + Math.sin(b.pulse) * 6;

        // Draw outer pulse ring
        ctx.beginPath();
        ctx.arc(projX, projY, pulseSize + 4, 0, Math.PI * 2);
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = Math.max(0, 1 - (pulseSize / 10));
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Draw solid beacon core
        ctx.beginPath();
        ctx.arc(projX, projY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Label details layout
        ctx.font = "bold 9px 'Fira Code', monospace";
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText(b.name.toUpperCase(), projX + 10, projY - 2);

        // Subtly connect London and NY or Tokyo with lines
        preparedBeacons.forEach(other => {
          if (other !== b && other.name === 'London' && b.name === 'New York') {
            const ox1 = other.x * cosY - other.z * sinY;
            const oz1 = other.x * sinY + other.z * cosY;
            const oy2 = other.y * cosX - oz1 * sinX;
            const oz2 = other.y * sinX + oz1 * cosX;

            if (oz2 > -20) {
              const ofov = SCALE / (oz2 + CAMERA_DISTANCE);
              const oprojX = ox1 * ofov + centerX;
              const oprojY = oy2 * ofov + centerY;

              ctx.beginPath();
              ctx.moveTo(projX, projY);
              ctx.lineTo(oprojX, oprojY);
              ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
              ctx.setLineDash([3, 3]);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
        });
      }
    });
  };

  loop();

  // Cleanup
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
  ts: `// Dotted Connection Globe TS Definitions
const WORLD_MAP_BASE64 = "${WORLD_MAP_BASE64}";
interface DotPoint {
  x: number;
  y: number;
  z: number;
}

interface Beacon {
  name: string;
  lon: number;
  lat: number;
  color: string;
  x: number;
  y: number;
  z: number;
  pulse: number;
}

const container = document.getElementById('dotted-globe-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#dotted-globe-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const coordDisplay = container.querySelector('#dotted-globe-coords') as HTMLSpanElement;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const GLOBE_RADIUS = Math.min(width, height) * 0.35;
  const CAMERA_DISTANCE = 500;
  const SCALE = 350;

  let angleX = 0.3;
  let angleY = 0.8;
  let targetAngleX = 0.3;
  let targetAngleY = 0.8;

  let isDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startAngleX = 0;
  let startAngleY = 0;
  let velocityX = 0.003;
  let velocityY = 0;

  const BEACONS = [
    { name: 'London', lon: 0, lat: 51.5, color: '#00f2fe' },
    { name: 'New York', lon: -74, lat: 40.7, color: '#00f2fe' },
    { name: 'Tokyo', lon: 139.7, lat: 35.6, color: '#ff007f' },
    { name: 'Sydney', lon: 151.2, lat: -33.9, color: '#00f2fe' },
    { name: 'São Paulo', lon: -46.6, lat: -23.5, color: '#8a2be2' },
    { name: 'Cape Town', lon: 18.4, lat: -33.9, color: '#ff007f' }
  ];

  const dotPoints: DotPoint[] = [];
  const initWorldDots = () => {
    const img = new Image();
    img.src = WORLD_MAP_BASE64;
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 360;
      offscreen.height = 180;
      const oCtx = offscreen.getContext('2d')!;
      oCtx.drawImage(img, 0, 0, 360, 180);

      const imgData = oCtx.getImageData(0, 0, 360, 180).data;

      const step = 3.6;
      for (let lat = -85; lat <= 85; lat += step) {
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

            dotPoints.push({ x, y, z });
          }
        }
      }
    };
  };

  initWorldDots();

  const preparedBeacons: Beacon[] = BEACONS.map(b => {
    const radLon = (b.lon * Math.PI) / 180;
    const radLat = (b.lat * Math.PI) / 180;
    const cosLat = Math.cos(radLat);
    const x = GLOBE_RADIUS * cosLat * Math.sin(radLon);
    const y = GLOBE_RADIUS * Math.sin(radLat);
    const z = GLOBE_RADIUS * cosLat * Math.cos(radLon);

    return { ...b, x, y, z, pulse: Math.random() * Math.PI };
  });

  const onMouseDown = (e: MouseEvent) => {
    isDragging = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
    startAngleX = targetAngleX;
    startAngleY = targetAngleY;
    container.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      const dLon = ((mouseX / width) * 360 - (angleY * 180) / Math.PI) % 360;
      const dLat = -((mouseY / height) * 180) % 180;
      const cleanLon = dLon < -180 ? dLon + 360 : (dLon > 180 ? dLon - 360 : dLon);
      const cleanLat = Math.max(-90, Math.min(90, dLat));
      if (coordDisplay) {
        coordDisplay.textContent = \`LAT: \${cleanLat.toFixed(2)}° / LON: \${cleanLon.toFixed(2)}°\`;
      }
      return;
    }

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

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    const renderPoints: any[] = [];

    dotPoints.forEach(p => {
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const fov = SCALE / (z2 + CAMERA_DISTANCE);
      const projX = x1 * fov + centerX;
      const projY = y2 * fov + centerY;

      renderPoints.push({ projX, projY, z: z2, isBack: z2 < 0 });
    });

    renderPoints.sort((a, b) => b.z - a.z);

    renderPoints.forEach(p => {
      const depthAlpha = Math.max(0.06, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
      ctx.beginPath();
      ctx.arc(p.projX, p.projY, p.isBack ? 0.75 : 1.25, 0, Math.PI * 2);
      ctx.fillStyle = p.isBack ? \`rgba(255, 255, 255, \${depthAlpha * 0.15})\` : \`rgba(0, 242, 254, \${depthAlpha * 0.8})\`;
      ctx.fill();
    });

    preparedBeacons.forEach(b => {
      const x1 = b.x * cosY - b.z * sinY;
      const z1 = b.x * sinY + b.z * cosY;
      const y2 = b.y * cosX - z1 * sinX;
      const z2 = b.y * sinX + z1 * cosX;

      if (z2 > -20) {
        const fov = SCALE / (z2 + CAMERA_DISTANCE);
        const projX = x1 * fov + centerX;
        const projY = y2 * fov + centerY;

        b.pulse += 0.05;
        const pulseSize = 4 + Math.sin(b.pulse) * 6;

        ctx.beginPath();
        ctx.arc(projX, projY, pulseSize + 4, 0, Math.PI * 2);
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = Math.max(0, 1 - (pulseSize / 10));
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        ctx.beginPath();
        ctx.arc(projX, projY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = "bold 9px 'Fira Code', monospace";
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText(b.name.toUpperCase(), projX + 10, projY - 2);

        preparedBeacons.forEach(other => {
          if (other !== b && other.name === 'London' && b.name === 'New York') {
            const ox1 = other.x * cosY - other.z * sinY;
            const oz1 = other.x * sinY + other.z * cosY;
            const oy2 = other.y * cosX - oz1 * sinX;
            const oz2 = other.y * sinX + oz1 * cosX;

            if (oz2 > -20) {
              const ofov = SCALE / (oz2 + CAMERA_DISTANCE);
              const oprojX = ox1 * ofov + centerX;
              const oprojY = oy2 * ofov + centerY;

              ctx.beginPath();
              ctx.moveTo(projX, projY);
              ctx.lineTo(oprojX, oprojY);
              ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
              ctx.setLineDash([3, 3]);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
        });
      }
    });
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
  css: `/* Dotted Connection Globe styles */
.globe-sandbox {
  position: relative;
  width: 100%;
  height: 520px;
  background: #040408;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
  box-sizing: border-box;
}

.globe-sandbox:active {
  cursor: grabbing;
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

.hud-scanner-line {
  width: 80px;
  height: 2px;
  background: var(--accent-cyan, #00f2fe);
  box-shadow: 0 0 10px var(--accent-cyan, #00f2fe);
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
  color: var(--text-muted, #6b7280);
  font-weight: 700;
  letter-spacing: 1.5px;
}

.hud-value {
  font-size: 10.5px;
  color: var(--accent-cyan, #00f2fe);
  font-weight: 500;
}

@keyframes scan-left-right {
  0% { transform: scaleX(0.2); opacity: 0.4; }
  100% { transform: scaleX(1); opacity: 1; }
}
`,
  tailwind: `<div class="relative w-full h-[520px] bg-[#040408] rounded-[24px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none" id="dotted-globe-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="dotted-globe-canvas"></canvas>
  <div class="absolute top-[24px] left-[24px] z-[2] pointer-events-none font-mono flex flex-col gap-[8px]">
    <div class="w-[80px] h-[2px] bg-[#00f2fe] shadow-[0_0_10px_#00f2fe]" style="animation: scan-left-right 3s ease-in-out infinite alternate;"></div>
    <div class="bg-[#08080c]/65 border border-white/5 padding-[8px_14px] p-3 rounded-[10px] backdrop-blur-[8px] flex flex-col gap-[3px]">
      <span class="text-[8px] text-[#6b7280] font-bold tracking-[1.5px]">COORDINATE MONITORING</span>
      <span class="text-[10.5px] text-[#00f2fe] font-medium" id="dotted-globe-coords">LAT: 0.00° / LON: 0.00°</span>
    </div>
  </div>
</div>`
};
