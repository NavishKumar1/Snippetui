/**
 * Component: Liquid Mercury Morph 404
 * Category: error-404
 */

export const component = {
  id: 'liquid-mercury-morph-404',
  name: 'Liquid Mercury Morph 404',
  category: 'error-404',
  tag: 'Fluid',
  html: `<div class="mercury-sandbox" id="mercury-morph-container">
  <canvas class="mercury-canvas" id="mercury-canvas-element"></canvas>

  <div class="mercury-overlay">
    <div class="mercury-badge">SECTOR DESTABILIZED</div>
    <h1 class="mercury-title">404</h1>
    <h2 class="mercury-subtitle">LIQUID STATE MISMATCH</h2>
    <p class="mercury-desc">The requested sector code has liquefied. Tap the pool to disperse the chrome surface particles.</p>
    <a href="#landing" class="mercury-btn">Re-Solidify</a>
  </div>
</div>`,
  js: `// Liquid Mercury Morph 404
const container = document.getElementById('mercury-morph-container');
if (container) {
  const canvas = container.querySelector('#mercury-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let centerX = width / 2;
  let centerY = height / 2;

  // Ripple solver arrays
  const GRID_W = 120;
  const GRID_H = 80;
  let buffer1 = new Float32Array(GRID_W * GRID_H);
  let buffer2 = new Float32Array(GRID_W * GRID_H);

  // Mouse ripple coordinates
  const mouse = { x: -1000, y: -1000 };

  const triggerRipple = (mx, my, strength = 6.0) => {
    const gx = Math.floor((mx / width) * GRID_W);
    const gy = Math.floor((my / height) * GRID_H);
    if (gx > 1 && gx < GRID_W - 2 && gy > 1 && gy < GRID_H - 2) {
      const idx = gx + gy * GRID_W;
      buffer1[idx] = strength;
      buffer1[idx + 1] = strength * 0.7;
      buffer1[idx - 1] = strength * 0.7;
      buffer1[idx + GRID_W] = strength * 0.7;
      buffer1[idx - GRID_W] = strength * 0.7;
    }
  };

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerRipple(x, y, 2.5);
  };

  const handleMouseDown = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerRipple(x, y, 9.5);
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mousedown', handleMouseDown);

  // Trigger continuous center ripples to keep it morphing
  let centerInterval = setInterval(() => {
    triggerRipple(centerX + (Math.random() - 0.5) * 80, centerY + (Math.random() - 0.5) * 80, 4.0);
  }, 1000);

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    centerX = width / 2;
    centerY = height / 2;
  };
  window.addEventListener('resize', resize);

  // Tab suspension & IntersectionObserver checking
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

    // 1. Solve Wave Equation
    for (let y = 1; y < GRID_H - 1; y++) {
      for (let x = 1; x < GRID_W - 1; x++) {
        const idx = x + y * GRID_W;
        // Wave equation approximation
        buffer2[idx] = (
          (buffer1[idx - 1] +
           buffer1[idx + 1] +
           buffer1[idx - GRID_W] +
           buffer1[idx + GRID_W]) / 2.0 - buffer2[idx]
        ) * 0.985;
      }
    }

    // Swap buffers
    const temp = buffer1;
    buffer1 = buffer2;
    buffer2 = temp;

    // Render chrome reflection logic on canvas
    ctx.fillStyle = '#06060c';
    ctx.fillRect(0, 0, width, height);

    // Create environment map colors
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Phong shading approximation
    for (let cy = 0; cy < height; cy += 2) {
      const gy = Math.floor((cy / height) * GRID_H);
      for (let cx = 0; cx < width; cx += 2) {
        const gx = Math.floor((cx / width) * GRID_W);

        if (gx > 0 && gx < GRID_W - 1 && gy > 0 && gy < GRID_H - 1) {
          const idx = gx + gy * GRID_W;

          // Compute slope normals Nx, Ny
          const Nx = buffer1[idx - 1] - buffer1[idx + 1];
          const Ny = buffer1[idx - GRID_W] - buffer1[idx + GRID_W];

          // Compute reflection vector displacement mapping
          const rx = Math.floor(cx + Nx * 60);
          const ry = Math.floor(cy + Ny * 60);

          // Render liquid chrome sphere boundary overlay
          const dx = cx - centerX;
          const dy = cy - centerY;
          const dist = Math.hypot(dx, dy);

          // Base background color
          let r = 8, g = 8, b = 18;

          // Liquid core sphere
          if (dist < 140) {
            // Chrome reflection mapping highlights
            const val = 1.0 - dist / 140;
            const spec = Math.pow(Math.max(0, 1.0 - Math.abs(Nx - Ny) * 0.5), 18) * 230;

            r = Math.floor(100 + val * 120 + Nx * 110 + spec);
            g = Math.floor(110 + val * 120 + Ny * 110 + spec);
            b = Math.floor(140 + val * 110 + spec);

            // Red/magenta refraction glow inside sphere
            if (dist > 120) {
              const borderVal = (dist - 120) / 20;
              r = Math.floor(r * (1.0 - borderVal) + borderVal * 255);
              g = Math.floor(g * (1.0 - borderVal) + borderVal * 0);
              b = Math.floor(b * (1.0 - borderVal) + borderVal * 128);
            }
          } else {
            // Background ripple effects
            const ripStrength = Math.abs(Nx + Ny) * 45.0;
            if (ripStrength > 0.5) {
              r = Math.floor(r + ripStrength * 0.8);
              g = Math.floor(g + ripStrength * 1.1);
              b = Math.floor(b + ripStrength * 1.5);
            }
          }

          // Write 2x2 pixel blocks for performance optimization
          for (let dy2 = 0; dy2 < 2; dy2++) {
            for (let dx2 = 0; dx2 < 2; dx2++) {
              const px = cx + dx2;
              const py = cy + dy2;
              if (px < width && py < height) {
                const pixelIdx = (px + py * width) * 4;
                data[pixelIdx] = Math.min(255, Math.max(0, r));
                data[pixelIdx + 1] = Math.min(255, Math.max(0, g));
                data[pixelIdx + 2] = Math.min(255, Math.max(0, b));
                data[pixelIdx + 3] = 255;
              }
            }
          }

        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  };

  loop();

  // Cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    clearInterval(centerInterval);
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  ts: `// Liquid Mercury Morph 404 TS Definitions
const container = document.getElementById('mercury-morph-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#mercury-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let centerX = width / 2;
  let centerY = height / 2;

  const GRID_W = 120;
  const GRID_H = 80;
  let buffer1 = new Float32Array(GRID_W * GRID_H);
  let buffer2 = new Float32Array(GRID_W * GRID_H);

  const triggerRipple = (mx: number, my: number, strength: number = 6.0) => {
    const gx = Math.floor((mx / width) * GRID_W);
    const gy = Math.floor((my / height) * GRID_H);
    if (gx > 1 && gx < GRID_W - 2 && gy > 1 && gy < GRID_H - 2) {
      const idx = gx + gy * GRID_W;
      buffer1[idx] = strength;
      buffer1[idx + 1] = strength * 0.7;
      buffer1[idx - 1] = strength * 0.7;
      buffer1[idx + GRID_W] = strength * 0.7;
      buffer1[idx - GRID_W] = strength * 0.7;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerRipple(x, y, 2.5);
  };

  const handleMouseDown = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerRipple(x, y, 9.5);
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mousedown', handleMouseDown);

  const centerInterval = setInterval(() => {
    triggerRipple(centerX + (Math.random() - 0.5) * 80, centerY + (Math.random() - 0.5) * 80, 4.0);
  }, 1000);

  const resize = () => {
    width = canvas.width = container!.clientWidth;
    height = canvas.height = container!.clientHeight;
    centerX = width / 2;
    centerY = height / 2;
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

    for (let y = 1; y < GRID_H - 1; y++) {
      for (let x = 1; x < GRID_W - 1; x++) {
        const idx = x + y * GRID_W;
        buffer2[idx] = (
          (buffer1[idx - 1] +
           buffer1[idx + 1] +
           buffer1[idx - GRID_W] +
           buffer1[idx + GRID_W]) / 2.0 - buffer2[idx]
        ) * 0.985;
      }
    }

    const temp = buffer1;
    buffer1 = buffer2;
    buffer2 = temp;

    ctx.fillStyle = '#06060c';
    ctx.fillRect(0, 0, width, height);

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let cy = 0; cy < height; cy += 2) {
      const gy = Math.floor((cy / height) * GRID_H);
      for (let cx = 0; cx < width; cx += 2) {
        const gx = Math.floor((cx / width) * GRID_W);

        if (gx > 0 && gx < GRID_W - 1 && gy > 0 && gy < GRID_H - 1) {
          const idx = gx + gy * GRID_W;

          const Nx = buffer1[idx - 1] - buffer1[idx + 1];
          const Ny = buffer1[idx - GRID_W] - buffer1[idx + GRID_W];

          const dx = cx - centerX;
          const dy = cy - centerY;
          const dist = Math.hypot(dx, dy);

          let r = 8, g = 8, b = 18;

          if (dist < 140) {
            const val = 1.0 - dist / 140;
            const spec = Math.pow(Math.max(0, 1.0 - Math.abs(Nx - Ny) * 0.5), 18) * 230;

            r = Math.floor(100 + val * 120 + Nx * 110 + spec);
            g = Math.floor(110 + val * 120 + Ny * 110 + spec);
            b = Math.floor(140 + val * 110 + spec);

            if (dist > 120) {
              const borderVal = (dist - 120) / 20;
              r = Math.floor(r * (1.0 - borderVal) + borderVal * 255);
              g = Math.floor(g * (1.0 - borderVal) + borderVal * 0);
              b = Math.floor(b * (1.0 - borderVal) + borderVal * 128);
            }
          } else {
            const ripStrength = Math.abs(Nx + Ny) * 45.0;
            if (ripStrength > 0.5) {
              r = Math.floor(r + ripStrength * 0.8);
              g = Math.floor(g + ripStrength * 1.1);
              b = Math.floor(b + ripStrength * 1.5);
            }
          }

          for (let dy2 = 0; dy2 < 2; dy2++) {
            for (let dx2 = 0; dx2 < 2; dx2++) {
              const px = cx + dx2;
              const py = cy + dy2;
              if (px < width && py < height) {
                const pixelIdx = (px + py * width) * 4;
                data[pixelIdx] = Math.min(255, Math.max(0, r));
                data[pixelIdx + 1] = Math.min(255, Math.max(0, g));
                data[pixelIdx + 2] = Math.min(255, Math.max(0, b));
                data[pixelIdx + 3] = 255;
              }
            }
          }

        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    clearInterval(centerInterval);
    container!.removeEventListener('mousemove', handleMouseMove);
    container!.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  css: `/* Liquid Mercury Morph 404 Styles */
.mercury-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #06060c;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.mercury-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.mercury-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 480px;
  padding: 30px;
  background: rgba(4, 4, 12, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.6);
  pointer-events: auto;
}

.mercury-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #a0aec0;
  margin-bottom: 16px;
}

.mercury-title {
  font-size: 100px;
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -3px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #ffffff 40%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 10px rgba(0,0,0,0.3));
}

.mercury-subtitle {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #a0aec0;
  margin-bottom: 12px;
}

.mercury-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #718096;
  margin-bottom: 24px;
}

.mercury-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 8px;
  background: #ffffff;
  color: #06060c;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mercury-btn:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.15);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#06060c] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="mercury-morph-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="mercury-canvas-element"></canvas>

  <div class="relative z-[2] text-center max-w-[480px] p-[30px] bg-[#04040c]/45 backdrop-blur-[12px] border border-white/5 rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
    <div class="inline-block px-[12px] py-[4px] rounded-[12px] bg-white/6 border border-white/10 text-[11px] font-bold tracking-[2px] text-[#a0aec0] mb-[16px]">SECTOR DESTABILIZED</div>
    <h1 class="text-[100px] font-black leading-[0.9] tracking-[-3px] mb-[8px] bg-gradient-to-br from-white to-[#8b5cf6] bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">404</h1>
    <h2 class="text-[14px] font-extrabold tracking-[2px] text-[#a0aec0] mb-[12px]">LIQUID STATE MISMATCH</h2>
    <p class="text-[13.5px] leading-relaxed text-[#718096] mb-[24px]">The requested sector code has liquefied. Tap the pool to disperse the chrome surface particles.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[8px] bg-white text-[#06060c] text-[13px] font-bold hover:bg-[#e2e8f0] hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] hover:translate-y-[-1px] transition-all duration-200">Re-Solidify</a>
  </div>
</div>`
};
