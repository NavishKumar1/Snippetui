/**
 * Component: Radar Sonar Scanner 404
 * Category: error-404
 */

export const component = {
  id: 'radar-sonar-scanner-404',
  name: 'Radar Sonar Scanner 404',
  category: 'error-404',
  tag: 'Interactive',
  html: `<div class="radar-sandbox" id="sonar-scanner-container">
  <canvas class="radar-canvas" id="sonar-scanner-canvas"></canvas>

  <div class="radar-overlay">
    <div class="radar-badge">PINGING BEACON SEARCH</div>
    <h1 class="radar-title">404</h1>
    <h3 class="radar-subtitle">SIGNAL_LOST: TIMEOUT</h3>
    <p class="radar-desc">No response from host. The sonar scanner is sweeps for lost data beacons. Hover your observer to spawn echo targets.</p>
    <a href="#landing" class="radar-btn">Broaden Range</a>
  </div>
</div>`,
  js: `// Radar Sonar Scanner 404
const container = document.getElementById('sonar-scanner-container');
if (container) {
  const canvas = container.querySelector('#sonar-scanner-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  // Generate 404 dot matrix pattern points relative to center
  const dotPoints = [];
  const spacing = 18;

  // Let's draw 4 0 4 grid coordinates manually
  // Width: 18 columns, Height: 7 rows
  const gridPattern = [
    '10001  11111  10001',
    '10001  10001  10001',
    '10001  10001  10001',
    '11111  10001  11111',
    '00001  10001  00001',
    '00001  10001  00001',
    '00001  11111  00001'
  ];

  const initPatternPoints = () => {
    dotPoints.length = 0;
    const cols = gridPattern[0].length;
    const rows = gridPattern.length;
    const startX = - (cols * spacing) / 2;
    const startY = - (rows * spacing) / 2 - 30; // Shift slightly above overlay

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (gridPattern[r][c] === '1') {
          dotPoints.push({
            rx: startX + c * spacing,
            ry: startY + r * spacing,
            intensity: 0.0
          });
        }
      }
    }
  };

  initPatternPoints();

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  };

  const handleMouseLeave = () => {
    mouse.active = false;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    initPatternPoints();
  };
  window.addEventListener('resize', resize);

  // User cursor targets
  const cursorPings = [];

  // Tab suspension & IntersectionObserver check
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
  let sweepAngle = 0.0;

  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    // Dark military radar glass
    ctx.fillStyle = '#010f0a';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const maxRadarRadius = Math.max(width, height) * 0.7;

    // Draw concentric circles
    ctx.strokeStyle = 'rgba(0, 255, 140, 0.07)';
    ctx.lineWidth = 1.5;
    for (let r = 100; r < maxRadarRadius; r += 100) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw grid axes lines
    ctx.beginPath();
    ctx.moveTo(cx - maxRadarRadius, cy);
    ctx.lineTo(cx + maxRadarRadius, cy);
    ctx.moveTo(cx, cy - maxRadarRadius);
    ctx.lineTo(cx, cy + maxRadarRadius);
    ctx.stroke();

    // Increment sweep angle
    sweepAngle += 0.022;
    const currentAngle = sweepAngle % (Math.PI * 2);

    // Draw sweeping radar gradient cone
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(currentAngle);
    
    // Draw sweeping line
    ctx.strokeStyle = '#00ff8c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(maxRadarRadius, 0);
    ctx.stroke();

    // Semi-transparent trailing sweep wedge
    const gradientSteps = 40;
    for (let i = 0; i < gradientSteps; i++) {
      const alpha = (gradientSteps - i) / gradientSteps * 0.14;
      ctx.fillStyle = 'rgba(0, 255, 140, ' + alpha + ')';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxRadarRadius, -i * 0.03, -i * 0.03 - 0.03, true);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Check angle hit on 404 dot matrix points
    dotPoints.forEach(p => {
      // Angle of this dot point from radar center
      const angle = Math.atan2(p.ry, p.rx);
      const normalizedAngle = angle < 0 ? angle + Math.PI * 2 : angle;

      // Difference between sweep angle and point angle
      const diff = Math.abs(currentAngle - normalizedAngle);
      if (diff < 0.04) {
        p.intensity = 1.0;
      }

      // Draw the dots
      if (p.intensity > 0.01) {
        p.intensity *= 0.96; // Decay
        ctx.fillStyle = 'rgba(0, 255, 140, ' + p.intensity + ')';
        ctx.shadowBlur = 10 * p.intensity;
        ctx.shadowColor = '#00ff8c';
        ctx.beginPath();
        ctx.arc(cx + p.rx, cy + p.ry, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = 'rgba(0, 255, 140, 0.08)';
        ctx.beginPath();
        ctx.arc(cx + p.rx, cy + p.ry, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Check distance / sweep hit for mouse
    if (mouse.active) {
      const dx = mouse.x - cx;
      const dy = mouse.y - cy;
      const angle = Math.atan2(dy, dx);
      const normalizedAngle = angle < 0 ? angle + Math.PI * 2 : angle;
      const diff = Math.abs(currentAngle - normalizedAngle);

      if (diff < 0.04 && Math.random() < 0.25) {
        cursorPings.push({
          x: mouse.x,
          y: mouse.y,
          radius: 5,
          alpha: 1.0
        });
      }
    }

    // Update & draw cursor radar echo pings
    for (let i = cursorPings.length - 1; i >= 0; i--) {
      const ping = cursorPings[i];
      ping.radius += 2.2;
      ping.alpha *= 0.94;

      if (ping.alpha < 0.01) {
        cursorPings.splice(i, 1);
        continue;
      }

      ctx.strokeStyle = 'rgba(0, 255, 140, ' + ping.alpha + ')';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(0, 255, 140, ' + (ping.alpha * 0.3) + ')';
      ctx.beginPath();
      ctx.arc(ping.x, ping.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  loop();

  // Cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  ts: `// Radar Sonar Scanner 404 TS Definitions
interface RadarPoint {
  rx: number;
  ry: number;
  intensity: number;
}

interface RadarPing {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

const container = document.getElementById('sonar-scanner-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#sonar-scanner-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };
  const dotPoints: RadarPoint[] = [];
  const spacing = 18;

  const gridPattern = [
    '10001  11111  10001',
    '10001  10001  10001',
    '10001  10001  10001',
    '11111  10001  11111',
    '00001  10001  00001',
    '00001  10001  00001',
    '00001  11111  00001'
  ];

  const initPatternPoints = () => {
    dotPoints.length = 0;
    const cols = gridPattern[0].length;
    const rows = gridPattern.length;
    const startX = - (cols * spacing) / 2;
    const startY = - (rows * spacing) / 2 - 30;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (gridPattern[r][c] === '1') {
          dotPoints.push({
            rx: startX + c * spacing,
            ry: startY + r * spacing,
            intensity: 0.0
          });
        }
      }
    }
  };

  initPatternPoints();

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container!.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  };

  const handleMouseLeave = () => {
    mouse.active = false;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  const resize = () => {
    width = canvas.width = container!.clientWidth;
    height = canvas.height = container!.clientHeight;
    initPatternPoints();
  };
  window.addEventListener('resize', resize);

  const cursorPings: RadarPing[] = [];
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
  let sweepAngle = 0.0;

  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    ctx.fillStyle = '#010f0a';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const maxRadarRadius = Math.max(width, height) * 0.7;

    ctx.strokeStyle = 'rgba(0, 255, 140, 0.07)';
    ctx.lineWidth = 1.5;
    for (let r = 100; r < maxRadarRadius; r += 100) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(cx - maxRadarRadius, cy);
    ctx.lineTo(cx + maxRadarRadius, cy);
    ctx.moveTo(cx, cy - maxRadarRadius);
    ctx.lineTo(cx, cy + maxRadarRadius);
    ctx.stroke();

    sweepAngle += 0.022;
    const currentAngle = sweepAngle % (Math.PI * 2);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(currentAngle);
    
    ctx.strokeStyle = '#00ff8c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(maxRadarRadius, 0);
    ctx.stroke();

    const gradientSteps = 40;
    for (let i = 0; i < gradientSteps; i++) {
      const alpha = (gradientSteps - i) / gradientSteps * 0.14;
      ctx.fillStyle = 'rgba(0, 255, 140, ' + alpha + ')';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxRadarRadius, -i * 0.03, -i * 0.03 - 0.03, true);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    dotPoints.forEach(p => {
      const angle = Math.atan2(p.ry, p.rx);
      const normalizedAngle = angle < 0 ? angle + Math.PI * 2 : angle;
      const diff = Math.abs(currentAngle - normalizedAngle);
      if (diff < 0.04) {
        p.intensity = 1.0;
      }

      if (p.intensity > 0.01) {
        p.intensity *= 0.96;
        ctx.fillStyle = 'rgba(0, 255, 140, ' + p.intensity + ')';
        ctx.shadowBlur = 10 * p.intensity;
        ctx.shadowColor = '#00ff8c';
        ctx.beginPath();
        ctx.arc(cx + p.rx, cy + p.ry, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = 'rgba(0, 255, 140, 0.08)';
        ctx.beginPath();
        ctx.arc(cx + p.rx, cy + p.ry, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    if (mouse.active) {
      const dx = mouse.x - cx;
      const dy = mouse.y - cy;
      const angle = Math.atan2(dy, dx);
      const normalizedAngle = angle < 0 ? angle + Math.PI * 2 : angle;
      const diff = Math.abs(currentAngle - normalizedAngle);

      if (diff < 0.04 && Math.random() < 0.25) {
        cursorPings.push({
          x: mouse.x,
          y: mouse.y,
          radius: 5,
          alpha: 1.0
        });
      }
    }

    for (let i = cursorPings.length - 1; i >= 0; i--) {
      const ping = cursorPings[i];
      ping.radius += 2.2;
      ping.alpha *= 0.94;

      if (ping.alpha < 0.01) {
        cursorPings.splice(i, 1);
        continue;
      }

      ctx.strokeStyle = 'rgba(0, 255, 140, ' + ping.alpha + ')';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(0, 255, 140, ' + (ping.alpha * 0.3) + ')';
      ctx.beginPath();
      ctx.arc(ping.x, ping.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    container!.removeEventListener('mousemove', handleMouseMove);
    container!.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  css: `/* Radar Sonar Scanner 404 Styles */
.radar-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #010f0a;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #00ff8c;
  box-sizing: border-box;
}

.radar-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.radar-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(1, 15, 10, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 255, 140, 0.2);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.7);
  pointer-events: auto;
  margin-top: 150px;
}

.radar-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(0, 255, 140, 0.05);
  border: 1px solid rgba(0, 255, 140, 0.25);
  color: #00ff8c;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.radar-title {
  font-size: 90px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 8px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px #00ff8c;
}

.radar-subtitle {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #00ff8c;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.radar-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #8fa69d;
  margin-bottom: 24px;
}

.radar-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid rgba(0, 255, 140, 0.45);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.radar-btn:hover {
  background: rgba(0, 255, 140, 0.1);
  border-color: #00ff8c;
  box-shadow: 0 0 15px rgba(0, 255, 140, 0.35);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#010f0a] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-[#00ff8c]" id="sonar-scanner-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="sonar-scanner-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#010f0a]/75 backdrop-blur-[12px] border border-[#00ff8c]/20 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.7)] mt-[150px]">
    <div class="inline-block px-[10px] py-[4px] rounded-[4px] bg-[#00ff8c]/5 border border-[#00ff8c]/25 text-[#00ff8c] text-[11px] font-bold tracking-[2px] mb-[16px]">PINGING BEACON SEARCH</div>
    <h1 class="text-[90px] font-black leading-[0.95] tracking-[-2px] mb-[8px] text-white" style="text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px #00ff8c;">404</h1>
    <h3 class="text-[13px] font-bold tracking-[1.5px] text-[#00ff8c] mb-[12px] uppercase">SIGNAL_LOST: TIMEOUT</h3>
    <p class="text-[13.5px] leading-relaxed text-[#8fa69d] mb-[24px]">No response from host. The sonar scanner is sweeps for lost data beacons. Hover your observer to spawn echo targets.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[4px] bg-transparent border border-[#00ff8c]/45 text-white text-[13px] font-bold uppercase hover:bg-[#00ff8c]/10 hover:border-[#00ff8c] hover:shadow-[0_0_15px_rgba(0,255,140,0.35)] hover:translate-y-[-1px] transition-all duration-200">Broaden Range</a>
  </div>
</div>`
};
