/**
 * Component: Bioluminescent Neural 404
 * Category: error-404
 */

export const component = {
  id: 'bioluminescent-neural-404',
  name: 'Bioluminescent Neural 404',
  category: 'error-404',
  tag: 'Organic',
  html: `<div class="neural-sandbox" id="neural-mesh-container">
  <canvas class="neural-canvas" id="neural-mesh-canvas"></canvas>

  <div class="neural-overlay">
    <div class="neural-badge">SYNAPSE SPLIT</div>
    <h1 class="neural-title">404</h1>
    <h3 class="neural-subtitle">NEURAL LINK BROKEN</h3>
    <p class="neural-desc">A disconnect occurred within the neural pathway. Trace your cursor over the synapses to trigger electrical impulses.</p>
    <a href="#landing" class="neural-btn">Restore Synapse</a>
  </div>
</div>`,
  js: `// Bioluminescent Neural 404
const container = document.getElementById('neural-mesh-container');
if (container) {
  const canvas = container.querySelector('#neural-mesh-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let centerX = width / 2;
  let centerY = height / 2;

  const mouse = { x: -1000, y: -1000, active: false };

  // Set up neural points
  const points = [];
  const pointCount = 90;

  // Function to create shape outline for "404"
  const get404Outline = () => {
    const coords = [];
    const scale = 25;
    // Left "4"
    coords.push({x: -5, y: -2}, {x: -5, y: -1}, {x: -5, y: 0}, {x: -5, y: 1}, {x: -5, y: 2});
    coords.push({x: -9, y: -2}, {x: -9, y: -1}, {x: -9, y: 0}, {x: -8, y: 0}, {x: -7, y: 0}, {x: -6, y: 0});
    coords.push({x: -9, y: -2}, {x: -8, y: -2});
    
    // Middle "0"
    coords.push({x: -2, y: -2}, {x: -1, y: -2}, {x: 0, y: -2}, {x: 1, y: -2}, {x: 2, y: -2});
    coords.push({x: -2, y: 2}, {x: -1, y: 2}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2});
    coords.push({x: -2, y: -1}, {x: -2, y: 0}, {x: -2, y: 1});
    coords.push({x: 2, y: -1}, {x: 2, y: 0}, {x: 2, y: 1});

    // Right "4"
    coords.push({x: 7, y: -2}, {x: 7, y: -1}, {x: 7, y: 0}, {x: 7, y: 1}, {x: 7, y: 2});
    coords.push({x: 5, y: -2}, {x: 5, y: -1}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0});
    coords.push({x: 5, y: -2}, {x: 6, y: -2});

    return coords.map(c => ({
      x: centerX + c.x * scale,
      y: centerY - 90 + c.y * scale,
      isCore: true
    }));
  };

  const initNeuralMesh = () => {
    points.length = 0;
    
    // Get 404 outline points
    const outline = get404Outline();
    outline.forEach(o => {
      points.push({
        x: o.x,
        y: o.y,
        originX: o.x,
        originY: o.y,
        vx: 0,
        vy: 0,
        isCore: true,
        glow: 0.1,
        radius: Math.random() * 2.5 + 2.0
      });
    });

    // Add ambient background synapse nodes
    const ambientCount = pointCount - points.length;
    for (let i = 0; i < ambientCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      points.push({
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        isCore: false,
        glow: 0.0,
        radius: Math.random() * 2.0 + 1.2
      });
    }
  };

  initNeuralMesh();

  // Mouse move handlers
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
    centerX = width / 2;
    centerY = height / 2;
    initNeuralMesh();
  };
  window.addEventListener('resize', resize);

  // Tab suspension & IntersectionObserver checks
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

    // Premium deep dark obsidian backing
    ctx.fillStyle = '#030206';
    ctx.fillRect(0, 0, width, height);

    // Dynamic wave updates
    points.forEach(p => {
      if (p.isCore) {
        // Core shapes drift elastically around origin coordinates
        const timeOffset = Date.now() * 0.002;
        const tx = p.originX + Math.sin(timeOffset + p.originY) * 6;
        const ty = p.originY + Math.cos(timeOffset + p.originX) * 6;

        p.x += (tx - p.x) * 0.08;
        p.y += (ty - p.y) * 0.08;
      } else {
        // Floating synapse points move with slow velocities
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // Proximity glow computation
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.glow += (force - p.glow) * 0.15;
          // Displace slightly away from cursor
          p.x += (dx / dist) * -1.2 * force;
          p.y += (dy / dist) * -1.2 * force;
        } else {
          p.glow += (0.05 - p.glow) * 0.08;
        }
      } else {
        p.glow += (0.05 - p.glow) * 0.08;
      }
    });

    // Draw connecting synapses connections
    ctx.lineWidth = 0.8;
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        
        // Define max connection distances: core-to-core has higher threshold
        const maxDist = (p1.isCore && p2.isCore) ? 50 : 70;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1.0 - dist / maxDist) * (0.08 + Math.max(p1.glow, p2.glow) * 0.4);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.globalAlpha = alpha;
          // Violet/cyan gradient lines
          ctx.strokeStyle = p1.isCore ? '#c084fc' : '#00f2fe';
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1.0;

    // Draw nodes points
    points.forEach(p => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius + p.glow * 3, 0, Math.PI * 2);

      // Node color
      const color = p.isCore ? '#c084fc' : '#00f2fe';
      ctx.fillStyle = color;
      
      // Specular glow shadow bloom
      if (p.glow > 0.08) {
        ctx.shadowBlur = 6 + p.glow * 12;
        ctx.shadowColor = color;
      }
      ctx.fill();
      ctx.restore();
    });
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
  ts: `// Bioluminescent Neural 404 TS Definitions
interface SynapseNode {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  isCore: boolean;
  glow: number;
  radius: number;
}

const container = document.getElementById('neural-mesh-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#neural-mesh-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let centerX = width / 2;
  let centerY = height / 2;

  const mouse = { x: -1000, y: -1000, active: false };
  const points: SynapseNode[] = [];
  const pointCount = 90;

  const get404Outline = () => {
    const coords = [];
    const scale = 25;
    
    coords.push({x: -5, y: -2}, {x: -5, y: -1}, {x: -5, y: 0}, {x: -5, y: 1}, {x: -5, y: 2});
    coords.push({x: -9, y: -2}, {x: -9, y: -1}, {x: -9, y: 0}, {x: -8, y: 0}, {x: -7, y: 0}, {x: -6, y: 0});
    coords.push({x: -9, y: -2}, {x: -8, y: -2});
    
    coords.push({x: -2, y: -2}, {x: -1, y: -2}, {x: 0, y: -2}, {x: 1, y: -2}, {x: 2, y: -2});
    coords.push({x: -2, y: 2}, {x: -1, y: 2}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2});
    coords.push({x: -2, y: -1}, {x: -2, y: 0}, {x: -2, y: 1});
    coords.push({x: 2, y: -1}, {x: 2, y: 0}, {x: 2, y: 1});

    coords.push({x: 7, y: -2}, {x: 7, y: -1}, {x: 7, y: 0}, {x: 7, y: 1}, {x: 7, y: 2});
    coords.push({x: 5, y: -2}, {x: 5, y: -1}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0});
    coords.push({x: 5, y: -2}, {x: 6, y: -2});

    return coords.map(c => ({
      x: centerX + c.x * scale,
      y: centerY - 90 + c.y * scale,
      isCore: true
    }));
  };

  const initNeuralMesh = () => {
    points.length = 0;
    
    const outline = get404Outline();
    outline.forEach(o => {
      points.push({
        x: o.x,
        y: o.y,
        originX: o.x,
        originY: o.y,
        vx: 0,
        vy: 0,
        isCore: true,
        glow: 0.1,
        radius: Math.random() * 2.5 + 2.0
      });
    });

    const ambientCount = pointCount - points.length;
    for (let i = 0; i < ambientCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      points.push({
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        isCore: false,
        glow: 0.0,
        radius: Math.random() * 2.0 + 1.2
      });
    }
  };

  initNeuralMesh();

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
    centerX = width / 2;
    centerY = height / 2;
    initNeuralMesh();
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

    ctx.fillStyle = '#030206';
    ctx.fillRect(0, 0, width, height);

    points.forEach(p => {
      if (p.isCore) {
        const timeOffset = Date.now() * 0.002;
        const tx = p.originX + Math.sin(timeOffset + p.originY) * 6;
        const ty = p.originY + Math.cos(timeOffset + p.originX) * 6;

        p.x += (tx - p.x) * 0.08;
        p.y += (ty - p.y) * 0.08;
      } else {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.glow += (force - p.glow) * 0.15;
          p.x += (dx / dist) * -1.2 * force;
          p.y += (dy / dist) * -1.2 * force;
        } else {
          p.glow += (0.05 - p.glow) * 0.08;
        }
      } else {
        p.glow += (0.05 - p.glow) * 0.08;
      }
    });

    ctx.lineWidth = 0.8;
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        
        const maxDist = (p1.isCore && p2.isCore) ? 50 : 70;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1.0 - dist / maxDist) * (0.08 + Math.max(p1.glow, p2.glow) * 0.4);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = p1.isCore ? '#c084fc' : '#00f2fe';
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1.0;

    points.forEach(p => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius + p.glow * 3, 0, Math.PI * 2);

      const color = p.isCore ? '#c084fc' : '#00f2fe';
      ctx.fillStyle = color;
      
      if (p.glow > 0.08) {
        ctx.shadowBlur = 6 + p.glow * 12;
        ctx.shadowColor = color;
      }
      ctx.fill();
      ctx.restore();
    });
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
  css: `/* Bioluminescent Neural 404 Styles */
.neural-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #030206;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.neural-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.neural-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(3, 2, 6, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  pointer-events: auto;
}

.neural-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(192, 132, 252, 0.08);
  border: 1px solid rgba(192, 132, 252, 0.2);
  color: #c084fc;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.neural-title {
  font-size: 110px;
  font-weight: 950;
  line-height: 0.9;
  letter-spacing: -2px;
  margin-bottom: 12px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(192, 132, 252, 0.5);
}

.neural-subtitle {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #c084fc;
  margin-bottom: 12px;
}

.neural-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #a0aec0;
  margin-bottom: 24px;
}

.neural-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.neural-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #00f2fe;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.35);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#030206] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="neural-mesh-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="neural-mesh-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#030206]/40 backdrop-blur-[16px] border border-white/4 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
    <div class="inline-block px-[10px] py-[4px] rounded-[20px] bg-[#c084fc]/8 border border-[#c084fc]/20 text-[#c084fc] text-[11px] font-extrabold tracking-[2px] mb-[16px]">SYNAPSE SPLIT</div>
    <h1 class="text-[110px] font-black leading-none tracking-[-2px] mb-[12px] text-white" style="text-shadow: 0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(192, 132, 252, 0.5);">404</h1>
    <h3 class="text-[14px] font-extrabold tracking-[2px] text-[#c084fc] mb-[12px]">NEURAL LINK BROKEN</h3>
    <p class="text-[13.5px] leading-relaxed text-[#a0aec0] mb-[24px]">A disconnect occurred within the neural pathway. Trace your cursor over the synapses to trigger electrical impulses.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[8px] bg-transparent border border-white/18 text-white text-[13px] font-bold hover:bg-white/5 hover:border-[#00f2fe] hover:shadow-[0_0_15px_rgba(0,242,254,0.35)] hover:translate-y-[-1px] transition-all duration-200">Restore Synapse</a>
  </div>
</div>`
};
