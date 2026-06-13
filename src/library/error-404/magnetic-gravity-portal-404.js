/**
 * Component: Magnetic Gravity Portal 404
 * Category: error-404
 */

export const component = {
  id: 'magnetic-gravity-portal-404',
  name: 'Magnetic Gravity Portal 404',
  category: 'error-404',
  tag: 'Interactive',
  html: `<div class="portal-sandbox" id="magnetic-portal-container">
  <canvas class="portal-canvas" id="portal-canvas-element"></canvas>

  <div class="portal-overlay">
    <div class="portal-badge">GRAVITATIONAL ANOMALY</div>
    <h1 class="portal-title">404</h1>
    <p class="portal-desc">The resource index has drifted too close to the event horizon. Sweep your cursor to rescue the floating characters.</p>
    <a href="#landing" class="portal-btn">Escape Orbit</a>
  </div>
</div>`,
  js: `// Magnetic Gravity Portal 404
const container = document.getElementById('magnetic-portal-container');
if (container) {
  const canvas = container.querySelector('#portal-canvas-element');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let centerX = width / 2;
  let centerY = height / 2;

  const mouse = { x: -1000, y: -1000, active: false };

  // Set up letters array
  const letters = '404PAGELOST'.split('');
  const nodes = [];

  // Initialize character coordinates in a ring
  const initCharacters = () => {
    nodes.length = 0;
    const radius = 160;
    for (let i = 0; i < letters.length; i++) {
      const angle = (i / letters.length) * Math.PI * 2;
      const tx = centerX + Math.cos(angle) * radius;
      const ty = centerY + Math.sin(angle) * radius;
      nodes.push({
        char: letters[i],
        x: tx,
        y: ty,
        baseX: tx,
        baseY: ty,
        vx: 0,
        vy: 0,
        angle: angle,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04
      });
    }
  };

  initCharacters();

  // Mouse & Touch events
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
    initCharacters();
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

    // Dark space backdrop
    ctx.fillStyle = '#05030a';
    ctx.fillRect(0, 0, width, height);

    // 1. Draw dynamic portal center accretion disk
    const time = Date.now() * 0.0025;
    ctx.save();
    
    // Portal outer violet glow
    const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 150);
    glowGrad.addColorStop(0, 'rgba(139, 92, 246, 0.45)');
    glowGrad.addColorStop(0.3, 'rgba(236, 72, 153, 0.2)');
    glowGrad.addColorStop(0.7, 'rgba(0, 242, 254, 0.05)');
    glowGrad.addColorStop(1, 'rgba(5, 3, 10, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
    ctx.fill();

    // Portal singularity event horizon core
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
    ctx.fill();

    // Spinning accretion rings
    ctx.lineWidth = 1.5;
    for (let r = 50; r < 95; r += 14) {
      ctx.strokeStyle = r % 28 === 0 ? 'rgba(0, 242, 254, 0.25)' : 'rgba(236, 72, 153, 0.25)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, r + Math.sin(time + r) * 4, time * (r % 2 === 0 ? 1 : -1), time * (r % 2 === 0 ? 1 : -1) + Math.PI * 1.5);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Solve letter dynamics (orbit base + magnetic mouse snap + springs)
    nodes.forEach((node, idx) => {
      // Base slow rotation around portal center
      node.angle += 0.006;
      const radius = 120 + Math.sin(time * 0.5 + idx) * 12;
      node.baseX = centerX + Math.cos(node.angle) * radius;
      node.baseY = centerY + Math.sin(node.angle) * radius;

      let tx = node.baseX;
      let ty = node.baseY;

      // Mouse magnetic snapping force
      if (mouse.active) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 180) {
          // Attract letters toward cursor position
          const force = (180 - dist) / 180;
          tx = node.x + (dx / dist) * force * 50;
          ty = node.y + (dy / dist) * force * 50;
        }
      }

      // Spring calculation back to targeted coordinates
      const ax = (tx - node.x) * 0.08 - node.vx * 0.12;
      const ay = (ty - node.y) * 0.08 - node.vy * 0.12;

      node.vx += ax;
      node.vy += ay;
      node.x += node.vx;
      node.y += node.vy;

      // Rotate letter tile slightly
      node.rot += node.rotSpeed;

      // Render letter tiles
      ctx.save();
      ctx.translate(node.x, node.y);
      ctx.rotate(node.rot);

      // Glass tile backing
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.24)';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.roundRect(-16, -16, 32, 32, 6);
      ctx.fill();
      ctx.stroke();

      // Holographic glowing text character
      ctx.fillStyle = idx % 2 === 0 ? '#ff007f' : '#00f2fe';
      ctx.font = 'bold 15px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 4;
      ctx.shadowColor = ctx.fillStyle;
      ctx.fillText(node.char, 0, 0);

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
  ts: `// Magnetic Gravity Portal 404 TS Definitions
interface LetterNode {
  char: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  angle: number;
  rot: number;
  rotSpeed: number;
}

const container = document.getElementById('magnetic-portal-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#portal-canvas-element') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  let centerX = width / 2;
  let centerY = height / 2;

  const mouse = { x: -1000, y: -1000, active: false };
  const letters = '404PAGELOST'.split('');
  const nodes: LetterNode[] = [];

  const initCharacters = () => {
    nodes.length = 0;
    const radius = 160;
    for (let i = 0; i < letters.length; i++) {
      const angle = (i / letters.length) * Math.PI * 2;
      const tx = centerX + Math.cos(angle) * radius;
      const ty = centerY + Math.sin(angle) * radius;
      nodes.push({
        char: letters[i],
        x: tx,
        y: ty,
        baseX: tx,
        baseY: ty,
        vx: 0,
        vy: 0,
        angle: angle,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04
      });
    }
  };

  initCharacters();

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
    initCharacters();
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

    ctx.fillStyle = '#05030a';
    ctx.fillRect(0, 0, width, height);

    const time = Date.now() * 0.0025;
    ctx.save();
    
    const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 150);
    glowGrad.addColorStop(0, 'rgba(139, 92, 246, 0.45)');
    glowGrad.addColorStop(0.3, 'rgba(236, 72, 153, 0.2)');
    glowGrad.addColorStop(0.7, 'rgba(0, 242, 254, 0.05)');
    glowGrad.addColorStop(1, 'rgba(5, 3, 10, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 1.5;
    for (let r = 50; r < 95; r += 14) {
      ctx.strokeStyle = r % 28 === 0 ? 'rgba(0, 242, 254, 0.25)' : 'rgba(236, 72, 153, 0.25)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, r + Math.sin(time + r) * 4, time * (r % 2 === 0 ? 1 : -1), time * (r % 2 === 0 ? 1 : -1) + Math.PI * 1.5);
      ctx.stroke();
    }
    ctx.restore();

    nodes.forEach((node, idx) => {
      node.angle += 0.006;
      const radius = 120 + Math.sin(time * 0.5 + idx) * 12;
      node.baseX = centerX + Math.cos(node.angle) * radius;
      node.baseY = centerY + Math.sin(node.angle) * radius;

      let tx = node.baseX;
      let ty = node.baseY;

      if (mouse.active) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          tx = node.x + (dx / dist) * force * 50;
          ty = node.y + (dy / dist) * force * 50;
        }
      }

      const ax = (tx - node.x) * 0.08 - node.vx * 0.12;
      const ay = (ty - node.y) * 0.08 - node.vy * 0.12;

      node.vx += ax;
      node.vy += ay;
      node.x += node.vx;
      node.y += node.vy;

      node.rot += node.rotSpeed;

      ctx.save();
      ctx.translate(node.x, node.y);
      ctx.rotate(node.rot);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.24)';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      // Polyfill roundRect for TS if needed
      (ctx as any).roundRect ? (ctx as any).roundRect(-16, -16, 32, 32, 6) : ctx.rect(-16, -16, 32, 32);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = idx % 2 === 0 ? '#ff007f' : '#00f2fe';
      ctx.font = 'bold 15px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 4;
      ctx.shadowColor = ctx.fillStyle;
      ctx.fillText(node.char, 0, 0);

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
  css: `/* Magnetic Gravity Portal 404 Styles */
.portal-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #05030a;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.portal-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.portal-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(5, 3, 10, 0.5);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  pointer-events: auto;
}

.portal-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: #c084fc;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.portal-title {
  font-size: 110px;
  font-weight: 950;
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 12px;
  color: #ffffff;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.4), 0 0 24px rgba(139, 92, 246, 0.6);
}

.portal-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #a0aec0;
  margin-bottom: 24px;
}

.portal-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.portal-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #8b5cf6;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.45);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#05030a] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="magnetic-portal-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="portal-canvas-element"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#05030a]/50 backdrop-blur-[14px] border border-white/5 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
    <div class="inline-block px-[10px] py-[4px] rounded-[20px] bg-[#8b5cf6]/8 border border-[#8b5cf6]/20 text-[#c084fc] text-[11px] font-extrabold tracking-[2px] mb-[16px]">GRAVITATIONAL ANOMALY</div>
    <h1 class="text-[110px] font-black leading-[0.95] tracking-[-2px] mb-[12px] text-white" style="text-shadow: 0 0 12px rgba(255, 255, 255, 0.4), 0 0 24px rgba(139, 92, 246, 0.6);">404</h1>
    <p class="text-[13.5px] leading-relaxed text-[#a0aec0] mb-[24px]">The resource index has drifted too close to the event horizon. Sweep your cursor to rescue the floating characters.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[8px] bg-transparent border border-white/20 text-white text-[13px] font-bold hover:bg-white/5 hover:border-[#8b5cf6] hover:shadow-[0_0_15px_rgba(139,92,246,0.45)] hover:translate-y-[-1px] transition-all duration-200">Escape Orbit</a>
  </div>
</div>`
};
