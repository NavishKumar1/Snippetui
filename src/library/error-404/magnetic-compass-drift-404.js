/**
 * Component: Magnetic Compass Drift 404
 * Category: error-404
 */

export const component = {
  id: 'magnetic-compass-drift-404',
  name: 'Magnetic Compass Drift 404',
  category: 'error-404',
  tag: 'Interactive',
  html: `<div class="compass-sandbox" id="compass-drift-container">
  <canvas class="compass-canvas" id="compass-drift-canvas"></canvas>

  <div class="compass-overlay">
    <div class="compass-badge">MAGNETIC FIELD DEVIATION</div>
    <h1 class="compass-title">404</h1>
    <h3 class="compass-subtitle">BEARING: INVALID_COORDINATES</h3>
    <p class="compass-desc">The internal gyroscope is drifting. Move your mouse to polarize the magnetic needle and recalibrate the heading coordinates.</p>
    <a href="#landing" class="compass-btn">Recalibrate Gyro</a>
  </div>
</div>`,
  js: `// Magnetic Compass Drift 404
const container = document.getElementById('compass-drift-container');
if (container) {
  const canvas = container.querySelector('#compass-drift-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  // Compass physics state
  let needleAngle = -Math.PI / 2;
  let needleVelocity = 0.0;
  const springStrength = 0.08;
  const damping = 0.88;

  let outerRingAngle = 0.0;

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

  const loop = () => {
    if (!active) return;
    requestAnimationFrame(loop);

    if (!visible) return;

    // Dark titanium background
    ctx.fillStyle = '#06070a';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height * 0.44;
    const size = 120; // Compass radius

    // Blueprint alignment lines in back
    ctx.strokeStyle = 'rgba(0, 150, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - size * 1.5, cy); ctx.lineTo(cx + size * 1.5, cy);
    ctx.moveTo(cx, cy - size * 1.5); ctx.lineTo(cx, cy + size * 1.5);
    ctx.stroke();

    // Physics calculations
    let targetAngle = -Math.PI / 2; // Default point to north
    if (mouse.active) {
      const dx = mouse.x - cx;
      const dy = mouse.y - cy;
      targetAngle = Math.atan2(dy, dx);
    } else {
      // Natural float drift wobble
      targetAngle = -Math.PI / 2 + Math.sin(Date.now() * 0.002) * 0.15;
    }

    // Shortest angular distance interpolation wrapping
    let diff = targetAngle - needleAngle;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    const force = diff * springStrength;
    needleVelocity += force;
    needleVelocity *= damping;
    needleAngle += needleVelocity;

    // Rotate outer ring slightly when needle swings
    outerRingAngle -= needleVelocity * 0.2;

    // DRAW COMPASS BODY
    // Outer casing gradient
    ctx.save();
    ctx.translate(cx, cy);

    // Drop shadow
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(0, 110, 255, 0.15)';

    // Outer rim
    const ringGrad = ctx.createRadialGradient(0, 0, size - 8, 0, 0, size + 8);
    ringGrad.addColorStop(0, '#10141e');
    ringGrad.addColorStop(0.5, '#20293a');
    ringGrad.addColorStop(1, '#0c1018');
    ctx.fillStyle = ringGrad;
    ctx.beginPath();
    ctx.arc(0, 0, size + 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow

    // Inner dial face
    ctx.fillStyle = '#0a0d14';
    ctx.beginPath();
    ctx.arc(0, 0, size - 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw dial graduations (outer tick marks)
    ctx.save();
    ctx.rotate(outerRingAngle);
    ctx.strokeStyle = '#0080ff';
    ctx.lineWidth = 1;
    for (let i = 0; i < 36; i++) {
      const tickAngle = (i / 36) * Math.PI * 2;
      ctx.beginPath();
      const length = i % 9 === 0 ? 12 : 6;
      ctx.moveTo(Math.cos(tickAngle) * (size - 16), Math.sin(tickAngle) * (size - 16));
      ctx.lineTo(Math.cos(tickAngle) * (size - 16 - length), Math.sin(tickAngle) * (size - 16 - length));
      ctx.stroke();
    }

    // N S E W labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', 0, -size + 30);
    ctx.fillText('S', 0, size - 30);
    ctx.fillText('E', size - 30, 0);
    ctx.fillText('W', -size + 30, 0);
    ctx.restore();

    // DRAW THE MAGNETIC NEEDLE
    ctx.save();
    ctx.rotate(needleAngle);

    // Draw Red North needle half
    const needleGradR = ctx.createLinearGradient(0, -size + 20, 0, 0);
    needleGradR.addColorStop(0, '#ff3b30');
    needleGradR.addColorStop(1, '#a91b1b');
    ctx.fillStyle = needleGradR;
    ctx.beginPath();
    ctx.moveTo(0, -size + 20);
    ctx.lineTo(8, 0);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.fill();

    // Draw Silver South needle half
    const needleGradS = ctx.createLinearGradient(0, size - 20, 0, 0);
    needleGradS.addColorStop(0, '#e2e8f0');
    needleGradS.addColorStop(1, '#64748b');
    ctx.fillStyle = needleGradS;
    ctx.beginPath();
    ctx.moveTo(0, size - 20);
    ctx.lineTo(8, 0);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.fill();

    // Center pivot bolt cap
    ctx.fillStyle = '#0a0d14';
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0080ff';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // Restore needle rotation
    ctx.restore(); // Restore translation
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
  ts: `// Magnetic Compass Drift 404 TS Definitions
const container = document.getElementById('compass-drift-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#compass-drift-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };
  let needleAngle = -Math.PI / 2;
  let needleVelocity = 0.0;
  const springStrength = 0.08;
  const damping = 0.88;
  let outerRingAngle = 0.0;

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

    ctx.fillStyle = '#06070a';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height * 0.44;
    const size = 120;

    ctx.strokeStyle = 'rgba(0, 150, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - size * 1.5, cy); ctx.lineTo(cx + size * 1.5, cy);
    ctx.moveTo(cx, cy - size * 1.5); ctx.lineTo(cx, cy + size * 1.5);
    ctx.stroke();

    let targetAngle = -Math.PI / 2;
    if (mouse.active) {
      const dx = mouse.x - cx;
      const dy = mouse.y - cy;
      targetAngle = Math.atan2(dy, dx);
    } else {
      targetAngle = -Math.PI / 2 + Math.sin(Date.now() * 0.002) * 0.15;
    }

    let diff = targetAngle - needleAngle;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    const force = diff * springStrength;
    needleVelocity += force;
    needleVelocity *= damping;
    needleAngle += needleVelocity;

    outerRingAngle -= needleVelocity * 0.2;

    ctx.save();
    ctx.translate(cx, cy);

    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(0, 110, 255, 0.15)';

    const ringGrad = ctx.createRadialGradient(0, 0, size - 8, 0, 0, size + 8);
    ringGrad.addColorStop(0, '#10141e');
    ringGrad.addColorStop(0.5, '#20293a');
    ringGrad.addColorStop(1, '#0c1018');
    ctx.fillStyle = ringGrad;
    ctx.beginPath();
    ctx.arc(0, 0, size + 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#0a0d14';
    ctx.beginPath();
    ctx.arc(0, 0, size - 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.rotate(outerRingAngle);
    ctx.strokeStyle = '#0080ff';
    ctx.lineWidth = 1;
    for (let i = 0; i < 36; i++) {
      const tickAngle = (i / 36) * Math.PI * 2;
      ctx.beginPath();
      const length = i % 9 === 0 ? 12 : 6;
      ctx.moveTo(Math.cos(tickAngle) * (size - 16), Math.sin(tickAngle) * (size - 16));
      ctx.lineTo(Math.cos(tickAngle) * (size - 16 - length), Math.sin(tickAngle) * (size - 16 - length));
      ctx.stroke();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', 0, -size + 30);
    ctx.fillText('S', 0, size - 30);
    ctx.fillText('E', size - 30, 0);
    ctx.fillText('W', -size + 30, 0);
    ctx.restore();

    ctx.save();
    ctx.rotate(needleAngle);

    const needleGradR = ctx.createLinearGradient(0, -size + 20, 0, 0);
    needleGradR.addColorStop(0, '#ff3b30');
    needleGradR.addColorStop(1, '#a91b1b');
    ctx.fillStyle = needleGradR;
    ctx.beginPath();
    ctx.moveTo(0, -size + 20);
    ctx.lineTo(8, 0);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.fill();

    const needleGradS = ctx.createLinearGradient(0, size - 20, 0, 0);
    needleGradS.addColorStop(0, '#e2e8f0');
    needleGradS.addColorStop(1, '#64748b');
    ctx.fillStyle = needleGradS;
    ctx.beginPath();
    ctx.moveTo(0, size - 20);
    ctx.lineTo(8, 0);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#0a0d14';
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0080ff';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    ctx.restore();
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
  css: `/* Magnetic Compass Drift 404 Styles */
.compass-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #06070a;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #0080ff;
  box-sizing: border-box;
}

.compass-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.compass-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(6, 7, 10, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 128, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.7);
  pointer-events: auto;
  margin-top: 180px;
}

.compass-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(0, 128, 255, 0.06);
  border: 1px solid rgba(0, 128, 255, 0.25);
  color: #0080ff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.compass-title {
  font-size: 90px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 8px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px #0080ff;
}

.compass-subtitle {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #0080ff;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.compass-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 24px;
}

.compass-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid rgba(0, 128, 255, 0.45);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.compass-btn:hover {
  background: rgba(0, 128, 255, 0.1);
  border-color: #0080ff;
  box-shadow: 0 0 15px rgba(0, 128, 255, 0.35);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#06070a] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-[#0080ff]" id="compass-drift-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="compass-drift-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#06070a]/75 backdrop-blur-[12px] border border-[#0080ff]/20 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.7)] mt-[180px]">
    <div class="inline-block px-[10px] py-[4px] rounded-[4px] bg-[#0080ff]/6 border border-[#0080ff]/25 text-[#0080ff] text-[11px] font-bold tracking-[2px] mb-[16px]">MAGNETIC FIELD DEVIATION</div>
    <h1 class="text-[90px] font-black leading-[0.95] tracking-[-2px] mb-[8px] text-white" style="text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px #0080ff;">404</h1>
    <h3 class="text-[13px] font-bold tracking-[1.5px] text-[#0080ff] mb-[12px] uppercase">BEARING: INVALID_COORDINATES</h3>
    <p class="text-[13.5px] leading-relaxed text-[#94a3b8] mb-[24px]">The internal gyroscope is drifting. Move your mouse to polarize the magnetic needle and recalibrate the heading coordinates.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[4px] bg-transparent border border-[#0080ff]/45 text-white text-[13px] font-bold uppercase hover:bg-[#0080ff]/10 hover:border-[#0080ff] hover:shadow-[0_0_15px_rgba(0,128,255,0.35)] hover:translate-y-[-1px] transition-all duration-200">Recalibrate Gyro</a>
  </div>
</div>`
};
