/**
 * Component: Steampunk Gear Mechanism 404
 * Category: error-404
 */

export const component = {
  id: 'steampunk-gear-mechanism-404',
  name: 'Steampunk Gear Mechanism 404',
  category: 'error-404',
  tag: 'Interactive',
  html: `<div class="steampunk-sandbox" id="steampunk-gear-container">
  <canvas class="steampunk-canvas" id="steampunk-gear-canvas"></canvas>

  <div class="steampunk-overlay">
    <div class="steampunk-badge">COGWHEEL ALIGNMENT</div>
    <h1 class="steampunk-title">404</h1>
    <h3 class="steampunk-subtitle">MECHANICAL_DESYNCHRONIZATION</h3>
    <p class="steampunk-desc">The server's gears have jammed. Click and drag the gear train horizontally to align the pressure plates and clear the desync.</p>
    <div class="steampunk-status" id="steampunk-lock-status">GEARS JAMMED (DRAG TO ROTATE)</div>
    <a href="#landing" class="steampunk-btn">Re-engage Clutch</a>
  </div>
</div>`,
  js: `// Steampunk Gear Mechanism 404
const container = document.getElementById('steampunk-gear-container');
if (container) {
  const canvas = container.querySelector('#steampunk-gear-canvas');
  const ctx = canvas.getContext('2d');
  const statusEl = container.querySelector('#steampunk-lock-status');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let isDragging = false;
  let startX = 0;
  let baseRotation = 0.0;
  let targetRotation = 0.0;

  // Gear properties
  const gears = [
    { x: 0.28, y: 0.35, radius: 65, teeth: 16, color: '#b8860b', speedMult: -1.25 }, // Left
    { x: 0.50, y: 0.35, radius: 80, teeth: 20, color: '#cd7f32', speedMult: 1.0 },   // Middle
    { x: 0.72, y: 0.35, radius: 65, teeth: 16, color: '#b8860b', speedMult: -1.25 }  // Right
  ];

  const drawGear = (cx, cy, r, teeth, angle, color) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    // Draw main gear body shadow
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';

    // Outer gear circle rim
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, r - 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow

    // Draw teeth
    ctx.fillStyle = color;
    for (let i = 0; i < teeth; i++) {
      const theta = (i / teeth) * Math.PI * 2;
      ctx.save();
      ctx.rotate(theta);
      ctx.beginPath();
      // Trapezoidal tooth shape
      ctx.moveTo(-6, -r + 10);
      ctx.lineTo(-4, -r - 5);
      ctx.lineTo(4, -r - 5);
      ctx.lineTo(6, -r + 10);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Inner rim cutout (spokes)
    ctx.fillStyle = '#110d0a';
    ctx.beginPath();
    ctx.arc(0, 0, r - 16, 0, Math.PI * 2);
    ctx.fill();

    // Spokes
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    for (let i = 0; i < 4; i++) {
      const spTheta = (i / 4) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(spTheta) * (r - 16), Math.sin(spTheta) * (r - 16));
      ctx.stroke();
    }

    // Center brass cap
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();

    // Center rivet screw details
    ctx.fillStyle = '#5c4033';
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const handleMouseDown = (e) => {
    isDragging = true;
    const rect = container.getBoundingClientRect();
    startX = e.clientX - rect.left;
    container.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const dx = currentX - startX;
    
    // Convert drag movement to rotation angle change
    targetRotation = baseRotation + dx * 0.007;

    // Trigger state change message if spinning fast
    if (Math.abs(dx) > 5) {
      statusEl.textContent = 'PRESSURE RELEASED // SLIPSTREAM ENGAGED';
      statusEl.style.color = '#ffd700';
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    baseRotation = targetRotation;
    container.style.cursor = 'default';
    statusEl.textContent = 'GEARS LOCKED // WAITING';
    statusEl.style.color = '#cd7f32';
  };

  container.addEventListener('mousedown', handleMouseDown);
  container.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  };
  window.addEventListener('resize', resize);

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
  let currentRotation = 0.0;

  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    // Background style
    ctx.fillStyle = '#110d0a';
    ctx.fillRect(0, 0, width, height);

    // Grid lines for blueprint layout
    ctx.strokeStyle = 'rgba(205, 127, 50, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Interlock speed ratio physics smoothing
    currentRotation += (targetRotation - currentRotation) * 0.1;

    // Draw the Gears
    gears.forEach(gear => {
      const gx = width * gear.x;
      const gy = height * gear.y;
      const angle = currentRotation * gear.speedMult;
      drawGear(gx, gy, gear.radius, gear.teeth, angle, gear.color);
    });
  };

  loop();

  // Cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    container.removeEventListener('mousedown', handleMouseDown);
    container.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  ts: `// Steampunk Gear Mechanism 404 TS Definitions
interface SteampunkGear {
  x: number;
  y: number;
  radius: number;
  teeth: number;
  color: string;
  speedMult: number;
}

const container = document.getElementById('steampunk-gear-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#steampunk-gear-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const statusEl = container.querySelector('#steampunk-lock-status') as HTMLDivElement;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let isDragging = false;
  let startX = 0;
  let baseRotation = 0.0;
  let targetRotation = 0.0;

  const gears: SteampunkGear[] = [
    { x: 0.28, y: 0.35, radius: 65, teeth: 16, color: '#b8860b', speedMult: -1.25 },
    { x: 0.50, y: 0.35, radius: 80, teeth: 20, color: '#cd7f32', speedMult: 1.0 },
    { x: 0.72, y: 0.35, radius: 65, teeth: 16, color: '#b8860b', speedMult: -1.25 }
  ];

  const drawGear = (cx: number, cy: number, r: number, teeth: number, angle: number, color: string) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, r - 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    for (let i = 0; i < teeth; i++) {
      const theta = (i / teeth) * Math.PI * 2;
      ctx.save();
      ctx.rotate(theta);
      ctx.beginPath();
      ctx.moveTo(-6, -r + 10);
      ctx.lineTo(-4, -r - 5);
      ctx.lineTo(4, -r - 5);
      ctx.lineTo(6, -r + 10);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    ctx.fillStyle = '#110d0a';
    ctx.beginPath();
    ctx.arc(0, 0, r - 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    for (let i = 0; i < 4; i++) {
      const spTheta = (i / 4) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(spTheta) * (r - 16), Math.sin(spTheta) * (r - 16));
      ctx.stroke();
    }

    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#5c4033';
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const handleMouseDown = (e: MouseEvent) => {
    isDragging = true;
    const rect = container!.getBoundingClientRect();
    startX = e.clientX - rect.left;
    container!.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const rect = container!.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const dx = currentX - startX;
    targetRotation = baseRotation + dx * 0.007;

    if (Math.abs(dx) > 5) {
      statusEl.textContent = 'PRESSURE RELEASED // SLIPSTREAM ENGAGED';
      statusEl.style.color = '#ffd700';
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    baseRotation = targetRotation;
    container!.style.cursor = 'default';
    statusEl.textContent = 'GEARS LOCKED // WAITING';
    statusEl.style.color = '#cd7f32';
  };

  container.addEventListener('mousedown', handleMouseDown);
  container.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);

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
  let currentRotation = 0.0;

  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    ctx.fillStyle = '#110d0a';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(205, 127, 50, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    currentRotation += (targetRotation - currentRotation) * 0.1;

    gears.forEach(gear => {
      const gx = width * gear.x;
      const gy = height * gear.y;
      const angle = currentRotation * gear.speedMult;
      drawGear(gx, gy, gear.radius, gear.teeth, angle, gear.color);
    });
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    container!.removeEventListener('mousedown', handleMouseDown);
    container!.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  css: `/* Steampunk Gear Mechanism 404 Styles */
.steampunk-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #110d0a;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #cd7f32;
  box-sizing: border-box;
  user-select: none;
}

.steampunk-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.steampunk-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(17, 13, 10, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(205, 127, 50, 0.25);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
  pointer-events: auto;
  margin-top: 100px;
}

.steampunk-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(205, 127, 50, 0.08);
  border: 1px solid rgba(205, 127, 50, 0.35);
  color: #ffd700;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.steampunk-title {
  font-size: 90px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 8px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px #cd7f32;
}

.steampunk-subtitle {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #cd7f32;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.steampunk-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #a69f96;
  margin-bottom: 16px;
}

.steampunk-status {
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
  color: #cd7f32;
  margin-bottom: 24px;
  letter-spacing: 1px;
  transition: color 0.15s ease;
}

.steampunk-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid rgba(205, 127, 50, 0.5);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.steampunk-btn:hover {
  background: rgba(205, 127, 50, 0.1);
  border-color: #ffd700;
  box-shadow: 0 0 15px rgba(205, 127, 50, 0.35);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#110d0a] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-[#cd7f32] select-none" id="steampunk-gear-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="steampunk-gear-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#110d0a]/75 backdrop-blur-[12px] border border-[#cd7f32]/25 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] mt-[100px]">
    <div class="inline-block px-[10px] py-[4px] rounded-[4px] bg-[#cd7f32]/8 border border-[#cd7f32]/35 text-[#ffd700] text-[11px] font-extrabold tracking-[2px] mb-[16px]">COGWHEEL ALIGNMENT</div>
    <h1 class="text-[90px] font-black leading-[0.95] tracking-[-2px] mb-[8px] text-white" style="text-shadow: 0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px #cd7f32;">404</h1>
    <h3 class="text-[13px] font-extrabold tracking-[1.5px] text-[#cd7f32] mb-[12px] uppercase">MECHANICAL_DESYNCHRONIZATION</h3>
    <p class="text-[13.5px] leading-relaxed text-[#a69f96] mb-[16px]">The server's gears have jammed. Click and drag the gear train horizontally to align the pressure plates and clear the desync.</p>
    <div class="font-mono text-[11px] font-bold text-[#cd7f32] mb-[24px] tracking-[1px] transition-colors duration-150" id="steampunk-lock-status">GEARS JAMMED (DRAG TO ROTATE)</div>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[6px] bg-transparent border border-[#cd7f32]/50 text-white text-[13px] font-bold uppercase hover:bg-[#cd7f32]/10 hover:border-[#ffd700] hover:shadow-[0_0_15px_rgba(205,127,50,0.35)] hover:translate-y-[-1px] transition-all duration-200">Re-engage Clutch</a>
  </div>
</div>`
};
