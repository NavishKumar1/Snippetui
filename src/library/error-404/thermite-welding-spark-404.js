/**
 * Component: Thermite Welding Spark 404
 * Category: error-404
 */

export const component = {
  id: 'thermite-welding-spark-404',
  name: 'Thermite Welding Spark 404',
  category: 'error-404',
  tag: 'Particles',
  html: `<div class="welder-sandbox" id="welding-spark-container">
  <canvas class="welder-canvas" id="welding-spark-canvas"></canvas>

  <div class="welder-overlay">
    <div class="welder-badge">ARC WELDER FAILURE</div>
    <h1 class="welder-title">404</h1>
    <h3 class="welder-subtitle">CIRCUIT_BREAK: VOLTAGE_OVERLOAD</h3>
    <p class="welder-desc">Molten circuits are fracturing. Move your pointer to guide the welding arc and fuse the broken connections.</p>
    <a href="#landing" class="welder-btn">Fuse Contacts</a>
  </div>
</div>`,
  js: `// Thermite Welding Spark 404
const container = document.getElementById('welding-spark-container');
if (container) {
  const canvas = container.querySelector('#welding-spark-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  // Sparks array
  const sparks = [];
  const maxSparks = 200;

  class Spark {
    constructor(startX, startY, isCursor = false) {
      this.reset(startX, startY, isCursor);
    }

    reset(startX, startY, isCursor) {
      this.x = startX;
      this.y = startY;
      
      // Arc spray pattern
      const angle = isCursor ? Math.random() * Math.PI * 2 : Math.PI + (Math.random() - 0.5) * 1.5;
      const speed = Math.random() * 6 + 3;
      
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      
      this.life = Math.random() * 40 + 20;
      this.maxLife = this.life;
      this.size = Math.random() * 2 + 1;
      
      // Spark colors: bright white, yellow, orange
      const colors = ['#ffffff', '#ffd700', '#ff8c00', '#ff3b00'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.life--;
      
      // Physics forces
      this.vy += 0.16; // Gravity
      this.x += this.vx;
      this.y += this.vy;

      // Friction
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Bounce on floor bounds
      if (this.y > height) {
        this.y = height;
        this.vy = -this.vy * 0.45;
        this.vx *= 0.7; // Dampen horizontal
      }
      
      // Bounce on walls
      if (this.x < 0) {
        this.x = 0;
        this.vx = -this.vx * 0.45;
      } else if (this.x > width) {
        this.x = width;
        this.vx = -this.vx * 0.45;
      }
    }

    draw() {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      
      // Draw speed-blurred spark tail
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.vx * 1.8, this.y - this.vy * 1.8);
      ctx.stroke();
      ctx.restore();
    }
  }

  // Automator guide point to draw 404 in back
  let autoWeldTime = 0.0;
  const pathPoints = [];
  
  // Tracing points to represent numbers 4, 0, 4
  const buildWeldPath = () => {
    pathPoints.length = 0;
    const cx = width / 2;
    const cy = height * 0.36;
    
    // Left '4' strokes
    pathPoints.push({ x: cx - 120, y: cy - 40 }, { x: cx - 120, y: cy + 10 }, { x: cx - 70, y: cy + 10 }, { x: cx - 70, y: cy - 40 }, { x: cx - 70, y: cy + 50 });
    // Middle '0' stroke loop
    pathPoints.push({ x: cx - 20, y: cy - 40 }, { x: cx + 20, y: cy - 40 }, { x: cx + 20, y: cy + 50 }, { x: cx - 20, y: cy + 50 }, { x: cx - 20, y: cy - 40 });
    // Right '4' strokes
    pathPoints.push({ x: cx + 70, y: cy - 40 }, { x: cx + 70, y: cy + 10 }, { x: cx + 120, y: cy + 10 }, { x: cx + 120, y: cy - 40 }, { x: cx + 120, y: cy + 50 });
  };
  
  buildWeldPath();

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
    buildWeldPath();
  };
  window.addEventListener('resize', resize);

  // Keep track of molten seam welds
  const weldSeam = [];

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

    // Metal plate background dark fill
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(0, 0, width, height);

    // Render cooling molten weld seam trails
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = weldSeam.length - 1; i >= 0; i--) {
      const point = weldSeam[i];
      point.life *= 0.985;
      
      if (point.life < 0.02) {
        weldSeam.splice(i, 1);
        continue;
      }
      
      // Draw molten metal glow
      const radius = 6 * point.life;
      ctx.fillStyle = 'rgba(255, 110, 0, ' + (point.life * 0.45) + ')';
      ctx.shadowBlur = 12 * point.life;
      ctx.shadowColor = '#ff5500';
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Determine welder source point
    let sourceX = 0;
    let sourceY = 0;
    let sparksToSpawn = 0;

    if (mouse.active) {
      sourceX = mouse.x;
      sourceY = mouse.y;
      sparksToSpawn = 4;
      weldSeam.push({ x: sourceX, y: sourceY, life: 1.0 });
    } else {
      // Auto weld trace
      autoWeldTime += 0.025;
      const index = Math.floor(autoWeldTime) % pathPoints.length;
      const currentPoint = pathPoints[index];
      const nextPoint = pathPoints[(index + 1) % pathPoints.length];
      
      const interp = autoWeldTime % 1.0;
      sourceX = currentPoint.x + (nextPoint.x - currentPoint.x) * interp;
      sourceY = currentPoint.y + (nextPoint.y - currentPoint.y) * interp;
      sparksToSpawn = 2;
      
      if (Math.random() < 0.35) {
        weldSeam.push({ x: sourceX, y: sourceY, life: 0.75 });
      }
    }

    // Spawn sparks
    for (let i = 0; i < sparksToSpawn; i++) {
      if (sparks.length < maxSparks) {
        sparks.push(new Spark(sourceX, sourceY, mouse.active));
      } else {
        // Recycle oldest dead spark
        const deadSparkIdx = sparks.findIndex(s => s.life <= 0);
        if (deadSparkIdx !== -1) {
          sparks[deadSparkIdx].reset(sourceX, sourceY, mouse.active);
        }
      }
    }

    // Update and draw sparks
    sparks.forEach(s => {
      if (s.life > 0) {
        s.update();
        s.draw();
      }
    });

    // Draw active bright welding arc flare
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const flareGrad = ctx.createRadialGradient(sourceX, sourceY, 0, sourceX, sourceY, 20);
    flareGrad.addColorStop(0, '#ffffff');
    flareGrad.addColorStop(0.3, '#ffea8c');
    flareGrad.addColorStop(0.7, 'rgba(255, 140, 0, 0.2)');
    flareGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = flareGrad;
    ctx.beginPath();
    ctx.arc(sourceX, sourceY, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
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
  ts: `// Thermite Welding Spark 404 TS Definitions
interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  update(): void;
  draw(): void;
  reset(startX: number, startY: number, isCursor: boolean): void;
}

interface MoltenWeld {
  x: number;
  y: number;
  life: number;
}

interface PathPt {
  x: number;
  y: number;
}

const container = document.getElementById('welding-spark-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#welding-spark-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };
  const sparks: SparkParticle[] = [];
  const maxSparks = 200;

  class Spark implements SparkParticle {
    x!: number;
    y!: number;
    vx!: number;
    vy!: number;
    life!: number;
    maxLife!: number;
    size!: number;
    color!: string;

    constructor(startX: number, startY: number, isCursor = false) {
      this.reset(startX, startY, isCursor);
    }

    reset(startX: number, startY: number, isCursor: boolean) {
      this.x = startX;
      this.y = startY;
      const angle = isCursor ? Math.random() * Math.PI * 2 : Math.PI + (Math.random() - 0.5) * 1.5;
      const speed = Math.random() * 6 + 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = Math.random() * 40 + 20;
      this.maxLife = this.life;
      this.size = Math.random() * 2 + 1;
      const colors = ['#ffffff', '#ffd700', '#ff8c00', '#ff3b00'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.life--;
      this.vy += 0.16;
      this.x += this.vx;
      this.y += this.vy;

      this.vx *= 0.98;
      this.vy *= 0.98;

      if (this.y > height) {
        this.y = height;
        this.vy = -this.vy * 0.45;
        this.vx *= 0.7;
      }
      if (this.x < 0) {
        this.x = 0;
        this.vx = -this.vx * 0.45;
      } else if (this.x > width) {
        this.x = width;
        this.vx = -this.vx * 0.45;
      }
    }

    draw() {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.vx * 1.8, this.y - this.vy * 1.8);
      ctx.stroke();
      ctx.restore();
    }
  }

  let autoWeldTime = 0.0;
  const pathPoints: PathPt[] = [];

  const buildWeldPath = () => {
    pathPoints.length = 0;
    const cx = width / 2;
    const cy = height * 0.36;
    pathPoints.push({ x: cx - 120, y: cy - 40 }, { x: cx - 120, y: cy + 10 }, { x: cx - 70, y: cy + 10 }, { x: cx - 70, y: cy - 40 }, { x: cx - 70, y: cy + 50 });
    pathPoints.push({ x: cx - 20, y: cy - 40 }, { x: cx + 20, y: cy - 40 }, { x: cx + 20, y: cy + 50 }, { x: cx - 20, y: cy + 50 }, { x: cx - 20, y: cy - 40 });
    pathPoints.push({ x: cx + 70, y: cy - 40 }, { x: cx + 70, y: cy + 10 }, { x: cx + 120, y: cy + 10 }, { x: cx + 120, y: cy - 40 }, { x: cx + 120, y: cy + 50 });
  };

  buildWeldPath();

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
    buildWeldPath();
  };
  window.addEventListener('resize', resize);

  const weldSeam: MoltenWeld[] = [];
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

    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = weldSeam.length - 1; i >= 0; i--) {
      const point = weldSeam[i];
      point.life *= 0.985;
      if (point.life < 0.02) {
        weldSeam.splice(i, 1);
        continue;
      }
      const radius = 6 * point.life;
      ctx.fillStyle = 'rgba(255, 110, 0, ' + (point.life * 0.45) + ')';
      ctx.shadowBlur = 12 * point.life;
      ctx.shadowColor = '#ff5500';
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    let sourceX = 0;
    let sourceY = 0;
    let sparksToSpawn = 0;

    if (mouse.active) {
      sourceX = mouse.x;
      sourceY = mouse.y;
      sparksToSpawn = 4;
      weldSeam.push({ x: sourceX, y: sourceY, life: 1.0 });
    } else {
      autoWeldTime += 0.025;
      const index = Math.floor(autoWeldTime) % pathPoints.length;
      const currentPoint = pathPoints[index];
      const nextPoint = pathPoints[(index + 1) % pathPoints.length];
      const interp = autoWeldTime % 1.0;
      sourceX = currentPoint.x + (nextPoint.x - currentPoint.x) * interp;
      sourceY = currentPoint.y + (nextPoint.y - currentPoint.y) * interp;
      sparksToSpawn = 2;
      if (Math.random() < 0.35) {
        weldSeam.push({ x: sourceX, y: sourceY, life: 0.75 });
      }
    }

    for (let i = 0; i < sparksToSpawn; i++) {
      if (sparks.length < maxSparks) {
        sparks.push(new Spark(sourceX, sourceY, mouse.active));
      } else {
        const deadSparkIdx = sparks.findIndex(s => s.life <= 0);
        if (deadSparkIdx !== -1) {
          sparks[deadSparkIdx].reset(sourceX, sourceY, mouse.active);
        }
      }
    }

    sparks.forEach(s => {
      if (s.life > 0) {
        s.update();
        s.draw();
      }
    });

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const flareGrad = ctx.createRadialGradient(sourceX, sourceY, 0, sourceX, sourceY, 20);
    flareGrad.addColorStop(0, '#ffffff');
    flareGrad.addColorStop(0.3, '#ffea8c');
    flareGrad.addColorStop(0.7, 'rgba(255, 140, 0, 0.2)');
    flareGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = flareGrad;
    ctx.beginPath();
    ctx.arc(sourceX, sourceY, 20, 0, Math.PI * 2);
    ctx.fill();
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
  css: `/* Thermite Welding Spark 404 Styles */
.welder-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #0a0a0d;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ff8c00;
  box-sizing: border-box;
}

.welder-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.welder-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(10, 10, 13, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
  pointer-events: auto;
  margin-top: 150px;
}

.welder-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(255, 140, 0, 0.06);
  border: 1px solid rgba(255, 140, 0, 0.25);
  color: #ff8c00;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.welder-title {
  font-size: 90px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 8px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px #ff3b00;
}

.welder-subtitle {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ff8c00;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.welder-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #a69ea1;
  margin-bottom: 24px;
}

.welder-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid rgba(255, 140, 0, 0.45);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.welder-btn:hover {
  background: rgba(255, 140, 0, 0.1);
  border-color: #ff8c00;
  box-shadow: 0 0 15px rgba(255, 140, 0, 0.35);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#0a0a0d] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-[#ff8c00]" id="welding-spark-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="welding-spark-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#0a0a0d]/75 backdrop-blur-[12px] border border-[#ff8c00]/20 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] mt-[150px]">
    <div class="inline-block px-[10px] py-[4px] rounded-[4px] bg-[#ff8c00]/6 border border-[#ff8c00]/25 text-[#ff8c00] text-[11px] font-bold tracking-[2px] mb-[16px]">ARC WELDER FAILURE</div>
    <h1 class="text-[90px] font-black leading-[0.95] tracking-[-2px] mb-[8px] text-white" style="text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px #ff3b00;">404</h1>
    <h3 class="text-[13px] font-bold tracking-[1.5px] text-[#ff8c00] mb-[12px] uppercase">CIRCUIT_BREAK: VOLTAGE_OVERLOAD</h3>
    <p class="text-[13.5px] leading-relaxed text-[#a69ea1] mb-[24px]">Molten circuits are fracturing. Move your pointer to guide the welding arc and fuse the broken connections.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[4px] bg-transparent border border-[#ff8c00]/45 text-white text-[13px] font-bold uppercase hover:bg-[#ff8c00]/10 hover:border-[#ff8c00] hover:shadow-[0_0_15px_rgba(255,140,0,0.35)] hover:translate-y-[-1px] transition-all duration-200">Fuse Contacts</a>
  </div>
</div>`
};
