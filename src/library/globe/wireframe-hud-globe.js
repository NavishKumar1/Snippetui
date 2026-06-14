import { WORLD_MAP_BASE64 } from './world-data.js';

/**
 * Component: Wireframe HUD Globe
 * Category: globe
 */

export const component = {
  id: 'wireframe-hud-globe',
  name: 'Wireframe HUD Globe',
  category: 'globe',
  tag: 'Vector 3D',
  html: `<div class="globe-sandbox" id="wireframe-globe-container">
  <canvas class="globe-canvas" id="wireframe-globe-canvas"></canvas>
  <div class="globe-overlay-hud">
    <div class="hud-scanner-line ring-scanner"></div>
    <div class="hud-data-panel">
      <span class="hud-label">NETWORK SATELLITE LINKS</span>
      <span class="hud-value" id="wireframe-globe-status">ACTIVE ORBITS: 3 / PENDING LINKS: 5</span>
    </div>
  </div>
</div>`,
  js: `// Wireframe HUD Globe Implementation
const WORLD_MAP_BASE64 = "${WORLD_MAP_BASE64}";
const container = document.getElementById('wireframe-globe-container');
if (container) {
  const canvas = container.querySelector('#wireframe-globe-canvas');
  const ctx = canvas.getContext('2d');
  const statusDisplay = container.querySelector('#wireframe-globe-status');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const GLOBE_RADIUS = Math.min(width, height) * 0.35;
  const CAMERA_DISTANCE = 500;
  const SCALE = 350;

  let angleX = -0.2;
  let angleY = 0.5;
  let targetAngleX = -0.2;
  let targetAngleY = 0.5;

  let isDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startAngleX = 0;
  let startAngleY = 0;
  let velocityX = 0.004;
  let velocityY = 0;

  // City Nodes Definition
  const CITIES = [
    { name: 'Tokyo', lon: 139.7, lat: 35.6 },
    { name: 'San Francisco', lon: -122.4, lat: 37.7 },
    { name: 'London', lon: 0.1, lat: 51.5 },
    { name: 'Sydney', lon: 151.2, lat: -33.9 },
    { name: 'Frankfurt', lon: 8.6, lat: 50.1 },
    { name: 'Singapore', lon: 103.8, lat: 1.3 }
  ];

  // Satellite Orbits (Inclinations & Speeds)
  const ORBITS = [
    { incX: 0.5, incZ: 0.2, speed: 0.015, color: '#00f2fe', progress: 0 },
    { incX: -0.7, incZ: -0.4, speed: 0.02, color: '#ff007f', progress: Math.PI / 3 },
    { incX: 0.1, incZ: 0.9, speed: 0.01, color: '#8a2be2', progress: Math.PI * 2 / 3 }
  ];

  // Establish connection pathways between cities
  const CONNECTIONS = [
    { from: 0, to: 1, packets: [] }, // Tokyo -> SF
    { from: 1, to: 2, packets: [] }, // SF -> London
    { from: 2, to: 4, packets: [] }, // London -> Frankfurt
    { from: 4, to: 5, packets: [] }, // Frankfurt -> Singapore
    { from: 5, to: 3, packets: [] }, // Singapore -> Sydney
    { from: 3, to: 0, packets: [] }  // Sydney -> Tokyo
  ];

  // Convert Lon/Lat city nodes to 3D Cartesian coords
  const nodes = CITIES.map(c => {
    const radLon = (c.lon * Math.PI) / 180;
    const radLat = (c.lat * Math.PI) / 180;
    const cosLat = Math.cos(radLat);
    const x = GLOBE_RADIUS * cosLat * Math.sin(radLon);
    const y = GLOBE_RADIUS * Math.sin(radLat);
    const z = GLOBE_RADIUS * cosLat * Math.cos(radLon);
    return { ...c, x, y, z };
  });

  const landPoints = [];
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
            landPoints.push({ x, y, z });
          }
        }
      }
    };
  };
  initLandDots();

  // Periodically trigger packets on connection pathways
  setInterval(() => {
    CONNECTIONS.forEach(conn => {
      if (Math.random() < 0.25) {
        conn.packets.push({ progress: 0, speed: 0.015 + Math.random() * 0.01 });
      }
    });
  }, 1000);

  // Drag interaction hooks
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
  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    // Apply rotation drift
    if (!isDragging) {
      targetAngleY += velocityX;
      targetAngleX += velocityY;
      velocityX *= 0.96;
      velocityY *= 0.96;
      if (Math.abs(velocityX) < 0.001) velocityX = 0.002;
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

    // Coordinate rotator helper
    const rotatePt = (p) => {
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      return { x: x1, y: y2, z: z2 };
    };

    // 1. Draw Lat/Lon Wireframe Grid Circles
    const rings = 10;
    ctx.lineWidth = 1;

    // Draw Longitude Meridian Rings
    for (let r = 0; r < rings; r++) {
      const lonAngle = (r * Math.PI) / rings;
      const points = [];
      for (let s = 0; s <= 60; s++) {
        const latAngle = (s * Math.PI * 2) / 60;
        const x = GLOBE_RADIUS * Math.sin(latAngle) * Math.sin(lonAngle);
        const y = GLOBE_RADIUS * Math.cos(latAngle);
        const z = GLOBE_RADIUS * Math.sin(latAngle) * Math.cos(lonAngle);

        const rotated = rotatePt({ x, y, z });
        const fov = SCALE / (rotated.z + CAMERA_DISTANCE);
        points.push({ x: rotated.x * fov + centerX, y: rotated.y * fov + centerY, z: rotated.z });
      }

      ctx.beginPath();
      points.forEach((p, idx) => {
        // Opacity fading for depth
        const alpha = Math.max(0.04, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
        ctx.strokeStyle = \`rgba(0, 242, 254, \${alpha * 0.12})\`;
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }

    // Draw Latitude Parallel Rings
    for (let r = 1; r < rings; r++) {
      const latAngle = -Math.PI / 2 + (r * Math.PI) / rings;
      const ringRad = GLOBE_RADIUS * Math.cos(latAngle);
      const ringHeight = GLOBE_RADIUS * Math.sin(latAngle);

      const points = [];
      for (let s = 0; s <= 60; s++) {
        const lonAngle = (s * Math.PI * 2) / 60;
        const x = ringRad * Math.sin(lonAngle);
        const y = ringHeight;
        const z = ringRad * Math.cos(lonAngle);

        const rotated = rotatePt({ x, y, z });
        const fov = SCALE / (rotated.z + CAMERA_DISTANCE);
        points.push({ x: rotated.x * fov + centerX, y: rotated.y * fov + centerY, z: rotated.z });
      }

      ctx.beginPath();
      points.forEach((p, idx) => {
        const alpha = Math.max(0.04, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
        ctx.strokeStyle = \`rgba(0, 242, 254, \${alpha * 0.12})\`;
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }

    // Draw Continent Land Dots
    const renderLandPoints = [];
    landPoints.forEach(p => {
      const rotated = rotatePt(p);
      const fov = SCALE / (rotated.z + CAMERA_DISTANCE);
      const projX = rotated.x * fov + centerX;
      const projY = rotated.y * fov + centerY;
      renderLandPoints.push({ projX, projY, z: rotated.z, isBack: rotated.z < 0 });
    });

    renderLandPoints.sort((a, b) => b.z - a.z);

    renderLandPoints.forEach(p => {
      const depthAlpha = Math.max(0.04, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
      ctx.beginPath();
      ctx.arc(p.projX, p.projY, p.isBack ? 0.95 : 1.55, 0, Math.PI * 2);
      ctx.fillStyle = p.isBack ? \`rgba(0, 242, 254, \${depthAlpha * 0.16})\` : \`rgba(0, 242, 254, \${depthAlpha * 0.72})\`;
      ctx.fill();
    });

    // 2. Draw Satellite Orbit Paths & Satellites
    ORBITS.forEach(orb => {
      orb.progress += orb.speed;
      const points = [];
      const orbitRad = GLOBE_RADIUS * 1.35;

      // Draw orbit path lines
      for (let s = 0; s <= 72; s++) {
        const t = (s * Math.PI * 2) / 72;
        // Standard circle rotation relative to orbit inclination variables
        let x = orbitRad * Math.cos(t);
        let y = orbitRad * Math.sin(t) * Math.sin(orb.incX);
        let z = orbitRad * Math.sin(t) * Math.cos(orb.incX);

        // Apply secondary tilt around Z axis
        const xTemp = x;
        x = xTemp * Math.cos(orb.incZ) - y * Math.sin(orb.incZ);
        y = xTemp * Math.sin(orb.incZ) + y * Math.cos(orb.incZ);

        const rotated = rotatePt({ x, y, z });
        const fov = SCALE / (rotated.z + CAMERA_DISTANCE);
        points.push({ x: rotated.x * fov + centerX, y: rotated.y * fov + centerY, z: rotated.z });
      }

      ctx.beginPath();
      points.forEach((p, idx) => {
        const alpha = Math.max(0.04, (p.z + orbitRad) / (2 * orbitRad));
        ctx.strokeStyle = orb.color === '#ff007f' ? \`rgba(255, 0, 127, \${alpha * 0.08})\` : \`rgba(0, 242, 254, \${alpha * 0.08})\`;
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      // Project and draw actual satellite node
      let sx = orbitRad * Math.cos(orb.progress);
      let sy = orbitRad * Math.sin(orb.progress) * Math.sin(orb.incX);
      let sz = orbitRad * Math.sin(orb.progress) * Math.cos(orb.incX);

      const sTempX = sx;
      sx = sTempX * Math.cos(orb.incZ) - sy * Math.sin(orb.incZ);
      sy = sTempX * Math.sin(orb.incZ) + sy * Math.cos(orb.incZ);

      const sRot = rotatePt({ x: sx, y: sy, z: sz });
      const sfov = SCALE / (sRot.z + CAMERA_DISTANCE);
      const sprojX = sRot.x * sfov + centerX;
      const sprojY = sRot.y * sfov + centerY;

      // Pulse glows for satellite core
      ctx.beginPath();
      ctx.arc(sprojX, sprojY, 4, 0, Math.PI * 2);
      ctx.fillStyle = orb.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = orb.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw faint halo bounds
      ctx.beginPath();
      ctx.arc(sprojX, sprojY, 9, 0, Math.PI * 2);
      ctx.strokeStyle = orb.color;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    // 3. Project and Draw connection paths (Beziers) between cities
    CONNECTIONS.forEach(conn => {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];

      const fromRot = rotatePt(fromNode);
      const toRot = rotatePt(toNode);

      // Only render curves if at least one side is facing front
      if (fromRot.z > -50 || toRot.z > -50) {
        const fromFov = SCALE / (fromRot.z + CAMERA_DISTANCE);
        const toFov = SCALE / (toRot.z + CAMERA_DISTANCE);

        const fx = fromRot.x * fromFov + centerX;
        const fy = fromRot.y * fromFov + centerY;
        const tx = toRot.x * toFov + centerX;
        const ty = toRot.y * toFov + centerY;

        // Middle control point lifted outwards dynamically
        const midX = (fx + tx) / 2;
        const midY = (fy + ty) / 2;

        // Vector math to offset control point away from center
        const dx = midX - centerX;
        const dy = midY - centerY;
        const len = Math.sqrt(dx * dx + dy * dy);

        // Multiplier curves the line higher
        const arcCurveFactor = 50; 
        const cx = midX + (dx / len) * arcCurveFactor;
        const cy = midY + (dy / len) * arcCurveFactor;

        // Draw curved bezier line path
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.quadraticCurveTo(cx, cy, tx, ty);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 4. Update and animate packets on the curves
        for (let i = conn.packets.length - 1; i >= 0; i--) {
          const packet = conn.packets[i];
          packet.progress += packet.speed;

          if (packet.progress >= 1) {
            conn.packets.splice(i, 1);
            continue;
          }

          // Evaluate quadratic bezier position (de Casteljau's algorithm)
          const t = packet.progress;
          const px = (1 - t) * (1 - t) * fx + 2 * (1 - t) * t * cx + t * t * tx;
          const py = (1 - t) * (1 - t) * fy + 2 * (1 - t) * t * cy + t * t * ty;

          // Draw packet point
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ff007f';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ff007f';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    });

    // 5. Draw city core labels and nodes
    nodes.forEach(n => {
      const rot = rotatePt(n);
      if (rot.z > -10) {
        const fov = SCALE / (rot.z + CAMERA_DISTANCE);
        const projX = rot.x * fov + centerX;
        const projY = rot.y * fov + centerY;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(projX, projY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00f2fe';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw thin surrounding frame
        ctx.beginPath();
        ctx.arc(projX, projY, 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // City labels (HUD aesthetic)
        ctx.font = "8px 'Fira Code', monospace";
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.textAlign = 'center';
        ctx.fillText(n.name.toUpperCase(), projX, projY - 10);
      }
    });

    // Update active HUD links state count
    let totalPackets = 0;
    CONNECTIONS.forEach(c => totalPackets += c.packets.length);
    if (statusDisplay && Math.random() < 0.05) {
      statusDisplay.textContent = \`ACTIVE ORBITS: 3 / DATA STREAMS: \${totalPackets} / SYSTEM STATUS: ONLINE\`;
    }
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
  ts: `// Wireframe HUD Globe TS Definitions
interface OrbitPath {
  incX: number;
  incZ: number;
  speed: number;
  color: string;
  progress: number;
}

interface DataPacket {
  progress: number;
  speed: number;
}

interface ConnectionPath {
  from: number;
  to: number;
  packets: DataPacket[];
}

interface CityNode {
  name: string;
  lon: number;
  lat: number;
  x: number;
  y: number;
  z: number;
}

const WORLD_MAP_BASE64 = "${WORLD_MAP_BASE64}";
const container = document.getElementById('wireframe-globe-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#wireframe-globe-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const statusDisplay = container.querySelector('#wireframe-globe-status') as HTMLSpanElement;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const GLOBE_RADIUS = Math.min(width, height) * 0.35;
  const CAMERA_DISTANCE = 500;
  const SCALE = 350;

  let angleX = -0.2;
  let angleY = 0.5;
  let targetAngleX = -0.2;
  let targetAngleY = 0.5;

  let isDragging = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startAngleX = 0;
  let startAngleY = 0;
  let velocityX = 0.004;
  let velocityY = 0;

  const CITIES = [
    { name: 'Tokyo', lon: 139.7, lat: 35.6 },
    { name: 'San Francisco', lon: -122.4, lat: 37.7 },
    { name: 'London', lon: 0.1, lat: 51.5 },
    { name: 'Sydney', lon: 151.2, lat: -33.9 },
    { name: 'Frankfurt', lon: 8.6, lat: 50.1 },
    { name: 'Singapore', lon: 103.8, lat: 1.3 }
  ];

  const ORBITS: OrbitPath[] = [
    { incX: 0.5, incZ: 0.2, speed: 0.015, color: '#00f2fe', progress: 0 },
    { incX: -0.7, incZ: -0.4, speed: 0.02, color: '#ff007f', progress: Math.PI / 3 },
    { incX: 0.1, incZ: 0.9, speed: 0.01, color: '#8a2be2', progress: Math.PI * 2 / 3 }
  ];

  const CONNECTIONS: ConnectionPath[] = [
    { from: 0, to: 1, packets: [] },
    { from: 1, to: 2, packets: [] },
    { from: 2, to: 4, packets: [] },
    { from: 4, to: 5, packets: [] },
    { from: 5, to: 3, packets: [] },
    { from: 3, to: 0, packets: [] }
  ];

  const nodes: CityNode[] = CITIES.map(c => {
    const radLon = (c.lon * Math.PI) / 180;
    const radLat = (c.lat * Math.PI) / 180;
    const cosLat = Math.cos(radLat);
    const x = GLOBE_RADIUS * cosLat * Math.sin(radLon);
    const y = GLOBE_RADIUS * Math.sin(radLat);
    const z = GLOBE_RADIUS * cosLat * Math.cos(radLon);
    return { ...c, x, y, z };
  });

  interface LandPoint {
    x: number;
    y: number;
    z: number;
  }
  const landPoints: LandPoint[] = [];
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
            landPoints.push({ x, y, z });
          }
        }
      }
    };
  };
  initLandDots();

  const packetInterval = setInterval(() => {
    CONNECTIONS.forEach(conn => {
      if (Math.random() < 0.25) {
        conn.packets.push({ progress: 0, speed: 0.015 + Math.random() * 0.01 });
      }
    });
  }, 1000);

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
  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    if (!isDragging) {
      targetAngleY += velocityX;
      targetAngleX += velocityY;
      velocityX *= 0.96;
      velocityY *= 0.96;
      if (Math.abs(velocityX) < 0.001) velocityX = 0.002;
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

    const rotatePt = (p: { x: number; y: number; z: number }) => {
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      return { x: x1, y: y2, z: z2 };
    };

    const rings = 10;
    ctx.lineWidth = 1;

    for (let r = 0; r < rings; r++) {
      const lonAngle = (r * Math.PI) / rings;
      const points: any[] = [];
      for (let s = 0; s <= 60; s++) {
        const latAngle = (s * Math.PI * 2) / 60;
        const x = GLOBE_RADIUS * Math.sin(latAngle) * Math.sin(lonAngle);
        const y = GLOBE_RADIUS * Math.cos(latAngle);
        const z = GLOBE_RADIUS * Math.sin(latAngle) * Math.cos(lonAngle);

        const rotated = rotatePt({ x, y, z });
        const fov = SCALE / (rotated.z + CAMERA_DISTANCE);
        points.push({ x: rotated.x * fov + centerX, y: rotated.y * fov + centerY, z: rotated.z });
      }

      ctx.beginPath();
      points.forEach((p, idx) => {
        const alpha = Math.max(0.04, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
        ctx.strokeStyle = \`rgba(0, 242, 254, \${alpha * 0.12})\`;
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }

    for (let r = 1; r < rings; r++) {
      const latAngle = -Math.PI / 2 + (r * Math.PI) / rings;
      const ringRad = GLOBE_RADIUS * Math.cos(latAngle);
      const ringHeight = GLOBE_RADIUS * Math.sin(latAngle);

      const points: any[] = [];
      for (let s = 0; s <= 60; s++) {
        const lonAngle = (s * Math.PI * 2) / 60;
        const x = ringRad * Math.sin(lonAngle);
        const y = ringHeight;
        const z = ringRad * Math.cos(lonAngle);

        const rotated = rotatePt({ x, y, z });
        const fov = SCALE / (rotated.z + CAMERA_DISTANCE);
        points.push({ x: rotated.x * fov + centerX, y: rotated.y * fov + centerY, z: rotated.z });
      }

      ctx.beginPath();
      points.forEach((p, idx) => {
        const alpha = Math.max(0.04, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
        ctx.strokeStyle = \`rgba(0, 242, 254, \${alpha * 0.12})\`;
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }

    // Draw Continent Land Dots
    interface ProjectPoints {
      projX: number;
      projY: number;
      z: number;
      isBack: boolean;
    }
    const renderLandPoints: ProjectPoints[] = [];
    landPoints.forEach(p => {
      const rotated = rotatePt(p);
      const fov = SCALE / (rotated.z + CAMERA_DISTANCE);
      const projX = rotated.x * fov + centerX;
      const projY = rotated.y * fov + centerY;
      renderLandPoints.push({ projX, projY, z: rotated.z, isBack: rotated.z < 0 });
    });

    renderLandPoints.sort((a, b) => b.z - a.z);

    renderLandPoints.forEach(p => {
      const depthAlpha = Math.max(0.04, (p.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
      ctx.beginPath();
      ctx.arc(p.projX, p.projY, p.isBack ? 0.95 : 1.55, 0, Math.PI * 2);
      ctx.fillStyle = p.isBack ? \`rgba(0, 242, 254, \${depthAlpha * 0.16})\` : \`rgba(0, 242, 254, \${depthAlpha * 0.72})\`;
      ctx.fill();
    });

    ORBITS.forEach(orb => {
      orb.progress += orb.speed;
      const points: any[] = [];
      const orbitRad = GLOBE_RADIUS * 1.35;

      for (let s = 0; s <= 72; s++) {
        const t = (s * Math.PI * 2) / 72;
        let x = orbitRad * Math.cos(t);
        let y = orbitRad * Math.sin(t) * Math.sin(orb.incX);
        let z = orbitRad * Math.sin(t) * Math.cos(orb.incX);

        const xTemp = x;
        x = xTemp * Math.cos(orb.incZ) - y * Math.sin(orb.incZ);
        y = xTemp * Math.sin(orb.incZ) + y * Math.cos(orb.incZ);

        const rotated = rotatePt({ x, y, z });
        const fov = SCALE / (rotated.z + CAMERA_DISTANCE);
        points.push({ x: rotated.x * fov + centerX, y: rotated.y * fov + centerY, z: rotated.z });
      }

      ctx.beginPath();
      points.forEach((p, idx) => {
        const alpha = Math.max(0.04, (p.z + orbitRad) / (2 * orbitRad));
        ctx.strokeStyle = orb.color === '#ff007f' ? \`rgba(255, 0, 127, \${alpha * 0.08})\` : \`rgba(0, 242, 254, \${alpha * 0.08})\`;
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      let sx = orbitRad * Math.cos(orb.progress);
      let sy = orbitRad * Math.sin(orb.progress) * Math.sin(orb.incX);
      let sz = orbitRad * Math.sin(orb.progress) * Math.cos(orb.incX);

      const sTempX = sx;
      sx = sTempX * Math.cos(orb.incZ) - sy * Math.sin(orb.incZ);
      sy = sTempX * Math.sin(orb.incZ) + sy * Math.cos(orb.incZ);

      const sRot = rotatePt({ x: sx, y: sy, z: sz });
      const sfov = SCALE / (sRot.z + CAMERA_DISTANCE);
      const sprojX = sRot.x * sfov + centerX;
      const sprojY = sRot.y * sfov + centerY;

      ctx.beginPath();
      ctx.arc(sprojX, sprojY, 4, 0, Math.PI * 2);
      ctx.fillStyle = orb.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = orb.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(sprojX, sprojY, 9, 0, Math.PI * 2);
      ctx.strokeStyle = orb.color;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    CONNECTIONS.forEach(conn => {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];

      const fromRot = rotatePt(fromNode);
      const toRot = rotatePt(toNode);

      if (fromRot.z > -50 || toRot.z > -50) {
        const fromFov = SCALE / (fromRot.z + CAMERA_DISTANCE);
        const toFov = SCALE / (toRot.z + CAMERA_DISTANCE);

        const fx = fromRot.x * fromFov + centerX;
        const fy = fromRot.y * fromFov + centerY;
        const tx = toRot.x * toFov + centerX;
        const ty = toRot.y * toFov + centerY;

        const midX = (fx + tx) / 2;
        const midY = (fy + ty) / 2;

        const dx = midX - centerX;
        const dy = midY - centerY;
        const len = Math.sqrt(dx * dx + dy * dy);

        const arcCurveFactor = 50; 
        const cx = midX + (dx / len) * arcCurveFactor;
        const cy = midY + (dy / len) * arcCurveFactor;

        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.quadraticCurveTo(cx, cy, tx, ty);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = conn.packets.length - 1; i >= 0; i--) {
          const packet = conn.packets[i];
          packet.progress += packet.speed;

          if (packet.progress >= 1) {
            conn.packets.splice(i, 1);
            continue;
          }

          const t = packet.progress;
          const px = (1 - t) * (1 - t) * fx + 2 * (1 - t) * t * cx + t * t * tx;
          const py = (1 - t) * (1 - t) * fy + 2 * (1 - t) * t * cy + t * t * ty;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ff007f';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ff007f';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    });

    nodes.forEach(n => {
      const rot = rotatePt(n);
      if (rot.z > -10) {
        const fov = SCALE / (rot.z + CAMERA_DISTANCE);
        const projX = rot.x * fov + centerX;
        const projY = rot.y * fov + centerY;

        ctx.beginPath();
        ctx.arc(projX, projY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00f2fe';
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(projX, projY, 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.font = "8px 'Fira Code', monospace";
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.textAlign = 'center';
        ctx.fillText(n.name.toUpperCase(), projX, projY - 10);
      }
    });

    let totalPackets = 0;
    CONNECTIONS.forEach(c => totalPackets += c.packets.length);
    if (statusDisplay && Math.random() < 0.05) {
      statusDisplay.textContent = \`ACTIVE ORBITS: 3 / DATA STREAMS: \${totalPackets} / SYSTEM STATUS: ONLINE\`;
    }
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    clearInterval(packetInterval);
    container.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}
`,
  css: `/* Wireframe HUD Globe styles */
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

.hud-scanner-line.ring-scanner {
  width: 80px;
  height: 2px;
  background: #ff007f;
  box-shadow: 0 0 10px #ff007f;
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
  color: #00f2fe;
  font-weight: 500;
}
`,
  tailwind: `<div class="relative w-full h-[520px] bg-[#040408] rounded-[24px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none" id="wireframe-globe-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="wireframe-globe-canvas"></canvas>
  <div class="absolute top-[24px] left-[24px] z-[2] pointer-events-none font-mono flex flex-col gap-[8px]">
    <div class="w-[80px] h-[2px] bg-[#ff007f] shadow-[0_0_10px_#ff007f]" style="animation: scan-left-right 3s ease-in-out infinite alternate;"></div>
    <div class="bg-[#08080c]/65 border border-white/5 p-3 rounded-[10px] backdrop-blur-[8px] flex flex-col gap-[3px]">
      <span class="text-[8px] text-[#6b7280] font-bold tracking-[1.5px]">NETWORK SATELLITE LINKS</span>
      <span class="text-[10.5px] text-[#00f2fe] font-medium" id="wireframe-globe-status">ACTIVE ORBITS: 3 / PENDING LINKS: 5</span>
    </div>
  </div>
</div>`
};
