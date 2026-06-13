/**
 * Component: Cyber Grid Terminal 404
 * Category: error-404
 */

export const component = {
  id: 'cyber-grid-terminal-404',
  name: 'Cyber Grid Terminal 404',
  category: 'error-404',
  tag: 'Cyberpunk',
  html: `<div class="cyber-sandbox" id="cyber-grid-container">
  <canvas class="cyber-canvas" id="cyber-grid-canvas"></canvas>

  <div class="cyber-hud">
    <div class="hud-tag">// HOST SCAN FAILURE</div>
    <div class="hud-error-digits">404</div>
    <div class="hud-divider"></div>
    <h3 class="hud-status-text">SYSTEM SECURE STATUS: COMPROMISED</h3>
    <p class="hud-details">Directory entry pointer returned NULL. Sector has drifted into void coordinates.</p>
    <div class="hud-btn-row">
      <a href="#landing" class="hud-btn">INIT RECOVERY</a>
    </div>
  </div>
  
  <div class="cyber-noise"></div>
</div>`,
  js: `// Cyber Grid Terminal 404
const container = document.getElementById('cyber-grid-container');
if (container) {
  const canvas = container.querySelector('#cyber-grid-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  // Grid lattice parameters
  const cols = 26;
  const rows = 20;
  const points = [];

  const initGrid = () => {
    points.length = 0;
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        points.push({
          x: (c / cols - 0.5) * 1200, // Wide horizontal spread
          y: (r / rows) * 450 + 100,  // Deep distance spread
          z: 0,
          baseZ: 0
        });
      }
    }
  };

  initGrid();

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  };

  const handleMouseLeave = () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.active = false;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    initGrid();
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

    // Cyber retro space backdrop
    ctx.fillStyle = '#020106';
    ctx.fillRect(0, 0, width, height);

    // Dynamic grid waves
    const time = Date.now() * 0.0035;

    // Apply distortion based on time + cursor attraction
    points.forEach(p => {
      // Procedural sine waves
      let zVal = Math.sin(p.x * 0.008 + time) * Math.cos(p.y * 0.006 + time) * 35;

      // Mouse local deformation
      if (mouse.active) {
        // Project 3D coordinate back to approximate flat screen mapping
        const fov = 350;
        const camZ = 300;
        const scale = fov / (p.y + camZ);
        const px = width / 2 + p.x * scale;
        const py = height * 0.65 + (p.z - 120) * scale;

        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const dist = Math.hypot(dx, dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          zVal += force * -90; // Pull downward
        }
      }

      p.z += (zVal - p.z) * 0.1;
    });

    // Draw horizon sunset grid fade line
    const horizonY = height * 0.35;
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(width, horizonY);
    ctx.stroke();

    // Perspective Projection helper
    const project = (p) => {
      const fov = 350; // Focal length
      const camZ = 280; // Distance from camera
      const scale = fov / (p.y + camZ);
      return {
        x: width / 2 + p.x * scale,
        y: height * 0.58 + (p.z - 80) * scale,
        opacity: Math.pow(p.y / 550, 1.8) // Fade out in distance
      };
    };

    // Draw vertical grid lines (connecting column points)
    const stride = cols + 1;
    ctx.lineWidth = 1.2;

    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      let first = true;
      for (let r = 0; r <= rows; r++) {
        const pt = points[c + r * stride];
        const screen = project(pt);
        
        if (first) {
          ctx.moveTo(screen.x, screen.y);
          first = false;
        } else {
          ctx.lineTo(screen.x, screen.y);
        }
      }
      // Glowing neon cyan gradient lines
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.16)';
      ctx.stroke();
    }

    // Draw horizontal grid lines (connecting row points)
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      let first = true;
      let lineOpacity = 0;
      for (let c = 0; c <= cols; c++) {
        const pt = points[c + r * stride];
        const screen = project(pt);
        lineOpacity = screen.opacity;

        if (first) {
          ctx.moveTo(screen.x, screen.y);
          first = false;
        } else {
          ctx.lineTo(screen.x, screen.y);
        }
      }
      // Brighten neon violet line based on row depth
      ctx.strokeStyle = 'rgba(139, 92, 246, ' + (lineOpacity * 0.35) + ')';
      ctx.stroke();
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
  ts: `// Cyber Grid Terminal 404 TS Definitions
interface GridPoint {
  x: number;
  y: number;
  z: number;
  baseZ: number;
}

const container = document.getElementById('cyber-grid-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#cyber-grid-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  const cols = 26;
  const rows = 20;
  const points: GridPoint[] = [];

  const initGrid = () => {
    points.length = 0;
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        points.push({
          x: (c / cols - 0.5) * 1200,
          y: (r / rows) * 450 + 100,
          z: 0,
          baseZ: 0
        });
      }
    }
  };

  initGrid();

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  };

  const handleMouseLeave = () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.active = false;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  const resize = () => {
    width = canvas.width = container!.clientWidth;
    height = canvas.height = container!.clientHeight;
    initGrid();
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

    const time = Date.now() * 0.0035;

    points.forEach(p => {
      let zVal = Math.sin(p.x * 0.008 + time) * Math.cos(p.y * 0.006 + time) * 35;

      if (mouse.active) {
        const fov = 350;
        const camZ = 280;
        const scale = fov / (p.y + camZ);
        const px = width / 2 + p.x * scale;
        const py = height * 0.65 + (p.z - 120) * scale;

        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const dist = Math.hypot(dx, dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          zVal += force * -90;
        }
      }

      p.z += (zVal - p.z) * 0.1;
    });

    const horizonY = height * 0.35;
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(width, horizonY);
    ctx.stroke();

    const project = (p: GridPoint) => {
      const fov = 350;
      const camZ = 280;
      const scale = fov / (p.y + camZ);
      return {
        x: width / 2 + p.x * scale,
        y: height * 0.58 + (p.z - 80) * scale,
        opacity: Math.pow(p.y / 550, 1.8)
      };
    };

    const stride = cols + 1;
    ctx.lineWidth = 1.2;

    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      let first = true;
      for (let r = 0; r <= rows; r++) {
        const pt = points[c + r * stride];
        const screen = project(pt);
        
        if (first) {
          ctx.moveTo(screen.x, screen.y);
          first = false;
        } else {
          ctx.lineTo(screen.x, screen.y);
        }
      }
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.16)';
      ctx.stroke();
    }

    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      let first = true;
      let lineOpacity = 0;
      for (let c = 0; c <= cols; c++) {
        const pt = points[c + r * stride];
        const screen = project(pt);
        lineOpacity = screen.opacity;

        if (first) {
          ctx.moveTo(screen.x, screen.y);
          first = false;
        } else {
          ctx.lineTo(screen.x, screen.y);
        }
      }
      ctx.strokeStyle = 'rgba(139, 92, 246, ' + (lineOpacity * 0.35) + ')';
      ctx.stroke();
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
  css: `/* Cyber Grid Terminal 404 Styles */
.cyber-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #020106;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fira Code', 'Courier New', monospace;
  box-sizing: border-box;
}

.cyber-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.cyber-hud {
  position: relative;
  z-index: 2;
  text-align: left;
  width: 82%;
  max-width: 440px;
  background: rgba(4, 2, 12, 0.72);
  border: 1px solid rgba(0, 242, 254, 0.25);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 242, 254, 0.1);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.hud-tag {
  font-size: 11px;
  font-weight: 700;
  color: #ff007f;
  margin-bottom: 6px;
  letter-spacing: 2px;
}

.hud-error-digits {
  font-size: 84px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -2px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 25px rgba(0, 242, 254, 0.8);
}

.hud-divider {
  height: 1px;
  background: dashed rgba(0, 242, 254, 0.3);
  margin: 14px 0;
}

.hud-status-text {
  font-size: 13.5px;
  font-weight: 800;
  color: #00f2fe;
  margin-bottom: 8px;
}

.hud-details {
  font-size: 12.5px;
  line-height: 1.6;
  color: #a0aec0;
  margin-bottom: 20px;
}

.hud-btn-row {
  display: flex;
}

.hud-btn {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid #00f2fe;
  color: #00f2fe;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.hud-btn:hover {
  background: rgba(0, 242, 254, 0.08);
  box-shadow: 0 0 12px rgba(0, 242, 254, 0.4);
  transform: translateY(-1px);
}

.cyber-noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 242, 254, 0.03) 0%, rgba(0,0,0,0) 80%);
  pointer-events: none;
  z-index: 3;
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#020106] rounded-[24px] overflow-hidden flex items-center justify-center font-mono text-white" id="cyber-grid-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="cyber-grid-canvas"></canvas>

  <div class="relative z-[2] text-left w-[82%] max-w-[440px] bg-[#04020c]/72 border border-[#00f2fe]/25 rounded-[16px] p-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.7),_0_0_20px_rgba(0,242,254,0.1)] backdrop-blur-[14px]">
    <div class="text-[11px] font-bold text-[#ff007f] mb-[6px] tracking-[2px]">// HOST SCAN FAILURE</div>
    <div class="text-[84px] font-black leading-none tracking-[-2px] text-white" style="text-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 25px rgba(0, 242, 254, 0.8);">404</div>
    <div class="hud-divider h-[1px] border-t border-dashed border-[#00f2fe]/30 my-[14px]"></div>
    <h3 class="text-[13.5px] font-extrabold text-[#00f2fe] mb-[8px]">SYSTEM SECURE STATUS: COMPROMISED</h3>
    <p class="text-[12.5px] leading-relaxed text-[#a0aec0] mb-[20px]">Directory entry pointer returned NULL. Sector has drifted into void coordinates.</p>
    <div class="flex">
      <a href="#landing" class="inline-block px-[20px] py-[8px] rounded-[6px] bg-transparent border border-[#00f2fe] text-[#00f2fe] text-[12px] font-bold hover:bg-[#00f2fe]/8 hover:shadow-[0_0_12px_rgba(0,242,254,0.4)] hover:translate-y-[-1px] transition-all duration-200">INIT RECOVERY</a>
    </div>
  </div>
  
  <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-[3]" style="background: radial-gradient(circle, rgba(0, 242, 254, 0.03) 0%, rgba(0,0,0,0) 80%);"></div>
</div>`
};
