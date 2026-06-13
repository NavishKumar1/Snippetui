/**
 * Component: CRT Radar Screen 404
 * Category: error-404
 */

export const component = {
  id: 'crt-radar-screen-404',
  name: 'CRT Radar Screen 404',
  category: 'error-404',
  tag: 'Interactive',
  html: `<div class="crt-sandbox" id="crt-radar-container">
  <canvas class="crt-canvas" id="crt-radar-canvas"></canvas>

  <div class="crt-overlay">
    <div class="crt-badge">ANALOG OSCILLOSCOPE</div>
    <h1 class="crt-title">404</h1>
    <h3 class="crt-subtitle">FREQUENCY_LOST: DAMPED</h3>
    <p class="crt-desc">The carrier signal has flatlined. Scan your pointer across the monitor grid to modulate the frequency amplitude and restore the wavelength.</p>
    <a href="#landing" class="crt-btn">Re-tune Signal</a>
  </div>
</div>`,
  js: `// CRT Radar Screen 404
const container = document.getElementById('crt-radar-container');
if (container) {
  const canvas = container.querySelector('#crt-radar-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

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

    // Dark oscilloscope green background
    ctx.fillStyle = '#020d04';
    ctx.fillRect(0, 0, width, height);

    const cy = height * 0.44;

    // 1. Draw grid lines
    ctx.strokeStyle = 'rgba(0, 255, 100, 0.07)';
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

    // Bold center division lines
    ctx.strokeStyle = 'rgba(0, 255, 100, 0.16)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(width, cy);
    ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height);
    ctx.stroke();

    // 2. Draw CRT Sweep signal wave
    ctx.save();
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00ff66';
    ctx.beginPath();

    const time = Date.now() * 0.005;
    
    // Proximity variables for mouse influence
    let amplitude = 40;
    let frequencyMult = 1.0;
    let noiseVal = 0;

    if (mouse.active) {
      const distY = Math.abs(mouse.y - cy);
      // Mouse X controls frequency, mouse Y controls amplitude distortion
      frequencyMult = 0.5 + (mouse.x / width) * 2.5;
      amplitude = 10 + (1.0 - distY / height) * 110;
      
      // High-frequency scanline buzz
      noiseVal = (Math.random() - 0.5) * (amplitude * 0.08);
    }

    for (let x = 0; x < width; x += 2) {
      const rad = (x * 0.015) * frequencyMult - time;
      
      // Complex harmonic formula for standard wave
      let y = Math.sin(rad) * amplitude;
      y += Math.cos(rad * 2.3) * (amplitude * 0.3);
      y += Math.sin(rad * 4.7) * (amplitude * 0.1);

      // Mouse local wave distortion spike
      if (mouse.active) {
        const dx = Math.abs(x - mouse.x);
        if (dx < 100) {
          const envelope = (100 - dx) / 100;
          y += (Math.random() - 0.5) * 24 * envelope;
        }
      }

      const finalY = cy + y + noiseVal;
      if (x === 0) {
        ctx.moveTo(x, finalY);
      } else {
        ctx.lineTo(x, finalY);
      }
    }

    ctx.stroke();
    ctx.restore();

    // 3. Render analog phosphorescent scanner beam overlay scanlines
    for (let y = 0; y < height; y += 4) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(0, y, width, 2);
    }

    // 4. Outer vignette edge glow
    const vigGrad = ctx.createRadialGradient(width / 2, height / 2, height * 0.35, width / 2, height / 2, width * 0.7);
    vigGrad.addColorStop(0, 'rgba(0, 255, 100, 0.0)');
    vigGrad.addColorStop(1, 'rgba(0, 10, 2, 0.85)');
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, width, height);
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
  ts: `// CRT Radar Screen 404 TS Definitions
const container = document.getElementById('crt-radar-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#crt-radar-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

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

    ctx.fillStyle = '#020d04';
    ctx.fillRect(0, 0, width, height);

    const cy = height * 0.44;

    ctx.strokeStyle = 'rgba(0, 255, 100, 0.07)';
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

    ctx.strokeStyle = 'rgba(0, 255, 100, 0.16)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(width, cy);
    ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.save();
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00ff66';
    ctx.beginPath();

    const time = Date.now() * 0.005;
    let amplitude = 40;
    let frequencyMult = 1.0;
    let noiseVal = 0;

    if (mouse.active) {
      const distY = Math.abs(mouse.y - cy);
      frequencyMult = 0.5 + (mouse.x / width) * 2.5;
      amplitude = 10 + (1.0 - distY / height) * 110;
      noiseVal = (Math.random() - 0.5) * (amplitude * 0.08);
    }

    for (let x = 0; x < width; x += 2) {
      const rad = (x * 0.015) * frequencyMult - time;
      let y = Math.sin(rad) * amplitude;
      y += Math.cos(rad * 2.3) * (amplitude * 0.3);
      y += Math.sin(rad * 4.7) * (amplitude * 0.1);

      if (mouse.active) {
        const dx = Math.abs(x - mouse.x);
        if (dx < 100) {
          const envelope = (100 - dx) / 100;
          y += (Math.random() - 0.5) * 24 * envelope;
        }
      }

      const finalY = cy + y + noiseVal;
      if (x === 0) {
        ctx.moveTo(x, finalY);
      } else {
        ctx.lineTo(x, finalY);
      }
    }

    ctx.stroke();
    ctx.restore();

    for (let y = 0; y < height; y += 4) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(0, y, width, 2);
    }

    const vigGrad = ctx.createRadialGradient(width / 2, height / 2, height * 0.35, width / 2, height / 2, width * 0.7);
    vigGrad.addColorStop(0, 'rgba(0, 255, 100, 0.0)');
    vigGrad.addColorStop(1, 'rgba(0, 10, 2, 0.85)');
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, width, height);
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
  css: `/* CRT Radar Screen 404 Styles */
.crt-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #020d04;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #00ff66;
  box-sizing: border-box;
}

.crt-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.crt-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(2, 13, 4, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 255, 102, 0.2);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
  pointer-events: auto;
  margin-top: 180px;
}

.crt-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(0, 255, 102, 0.06);
  border: 1px solid rgba(0, 255, 102, 0.25);
  color: #00ff66;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.crt-title {
  font-size: 90px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 8px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px #00ff66;
}

.crt-subtitle {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #00ff66;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.crt-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #8fa894;
  margin-bottom: 24px;
}

.crt-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid rgba(0, 255, 102, 0.45);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.crt-btn:hover {
  background: rgba(0, 255, 102, 0.1);
  border-color: #00ff66;
  box-shadow: 0 0 15px rgba(0, 255, 102, 0.35);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#020d04] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-[#00ff66]" id="crt-radar-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="crt-radar-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#020d04]/75 backdrop-blur-[12px] border border-[#00ff66]/20 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] mt-[180px]">
    <div class="inline-block px-[10px] py-[4px] rounded-[4px] bg-[#00ff66]/6 border border-[#00ff66]/25 text-[#00ff66] text-[11px] font-bold tracking-[2px] mb-[16px]">ANALOG OSCILLOSCOPE</div>
    <h1 class="text-[90px] font-black leading-[0.95] tracking-[-2px] mb-[8px] text-white" style="text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px #00ff66;">404</h1>
    <h3 class="text-[13px] font-bold tracking-[1.5px] text-[#00ff66] mb-[12px] uppercase">FREQUENCY_LOST: DAMPED</h3>
    <p class="text-[13.5px] leading-relaxed text-[#8fa894] mb-[24px]">The carrier signal has flatlined. Scan your pointer across the monitor grid to modulate the frequency amplitude and restore the wavelength.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[4px] bg-transparent border border-[#00ff66]/45 text-white text-[13px] font-bold uppercase hover:bg-[#00ff66]/10 hover:border-[#00ff66] hover:shadow-[0_0_15px_rgba(0,255,102,0.35)] hover:translate-y-[-1px] transition-all duration-200">Re-tune Signal</a>
  </div>
</div>`
};
