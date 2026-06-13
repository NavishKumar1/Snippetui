/**
 * Component: ASCII Matrix Rain 404
 * Category: error-404
 */

export const component = {
  id: 'ascii-matrix-rain-404',
  name: 'ASCII Matrix Rain 404',
  category: 'error-404',
  tag: 'Terminal',
  html: `<div class="matrix-sandbox" id="matrix-rain-container">
  <canvas class="matrix-canvas" id="matrix-rain-canvas"></canvas>

  <div class="matrix-overlay">
    <div class="matrix-badge">SYSTEM FAILURE // STATUS 404</div>
    <h1 class="matrix-title" id="matrix-display-title">404</h1>
    <h3 class="matrix-subtitle">ACCESS_DENIED: RESOURCE_NOT_FOUND</h3>
    <p class="matrix-desc">The requested memory block is unreadable. The matrix stream has corrupted. Move your cursor to interface with the stream.</p>
    <a href="#landing" class="matrix-btn">Reboot Terminal</a>
  </div>
</div>`,
  js: `// ASCII Matrix Rain 404
const container = document.getElementById('matrix-rain-container');
if (container) {
  const canvas = container.querySelector('#matrix-rain-canvas');
  const ctx = canvas.getContext('2d');
  const title = container.querySelector('#matrix-display-title');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&+-=*/<>[]{}';
  const charArray = chars.split('');

  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  let drops = [];

  const initDrops = () => {
    columns = Math.floor(width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * fontSize,
        y: Math.random() * -height,
        speed: Math.random() * 2 + 1.5,
        chars: []
      });
    }
  };

  initDrops();

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
    initDrops();
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

    // Dark matrix tail fade
    ctx.fillStyle = 'rgba(2, 4, 8, 0.12)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = '700 ' + fontSize + 'px monospace';

    // Highlight radius around the mouse
    const forceRadius = 130;

    for (let i = 0; i < drops.length; i++) {
      const drop = drops[i];
      const char = charArray[Math.floor(Math.random() * charArray.length)];

      // Standard movement
      drop.y += drop.speed;

      // Wrap-around
      if (drop.y > height) {
        drop.y = Math.random() * -100;
        drop.speed = Math.random() * 2 + 1.5;
      }

      // Check distance to mouse cursor
      const dx = mouse.x - drop.x;
      const dy = mouse.y - drop.y;
      const dist = Math.hypot(dx, dy);

      let isNearMouse = false;
      let drawChar = char;

      if (mouse.active && dist < forceRadius) {
        isNearMouse = true;
        // Spell out 4 0 4 near the mouse or random numbers
        if (Math.random() < 0.15) {
          drawChar = Math.random() > 0.5 ? '4' : '0';
        }
      }

      // Draw color depending on proximity to mouse
      if (isNearMouse) {
        const glowOpacity = 1.0 - (dist / forceRadius);
        ctx.fillStyle = 'rgba(57, 255, 20, ' + (0.5 + glowOpacity * 0.5) + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#39ff14';
      } else {
        ctx.fillStyle = 'rgba(0, 143, 17, 0.35)';
        ctx.shadowBlur = 0;
      }

      ctx.fillText(drawChar, drop.x, drop.y);
      ctx.shadowBlur = 0; // Reset shadow
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
  ts: `// ASCII Matrix Rain 404 TS definitions
interface MatrixDrop {
  x: number;
  y: number;
  speed: number;
}

const container = document.getElementById('matrix-rain-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#matrix-rain-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&+-=*/<>';
  const charArray = chars.split('');
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  let drops: MatrixDrop[] = [];

  const initDrops = () => {
    columns = Math.floor(width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * fontSize,
        y: Math.random() * -height,
        speed: Math.random() * 2 + 1.5
      });
    }
  };

  initDrops();

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container!.getBoundingClientRect();
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
    initDrops();
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

    ctx.fillStyle = 'rgba(2, 4, 8, 0.12)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = '700 ' + fontSize + 'px monospace';
    const forceRadius = 130;

    for (let i = 0; i < drops.length; i++) {
      const drop = drops[i];
      const char = charArray[Math.floor(Math.random() * charArray.length)];

      drop.y += drop.speed;

      if (drop.y > height) {
        drop.y = Math.random() * -100;
        drop.speed = Math.random() * 2 + 1.5;
      }

      const dx = mouse.x - drop.x;
      const dy = mouse.y - drop.y;
      const dist = Math.hypot(dx, dy);

      let isNearMouse = false;
      let drawChar = char;

      if (mouse.active && dist < forceRadius) {
        isNearMouse = true;
        if (Math.random() < 0.15) {
          drawChar = Math.random() > 0.5 ? '4' : '0';
        }
      }

      if (isNearMouse) {
        const glowOpacity = 1.0 - (dist / forceRadius);
        ctx.fillStyle = 'rgba(57, 255, 20, ' + (0.5 + glowOpacity * 0.5) + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#39ff14';
      } else {
        ctx.fillStyle = 'rgba(0, 143, 17, 0.35)';
        ctx.shadowBlur = 0;
      }

      ctx.fillText(drawChar, drop.x, drop.y);
      ctx.shadowBlur = 0;
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
  css: `/* ASCII Matrix Rain 404 Styles */
.matrix-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #020408;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  color: #39ff14;
  box-sizing: border-box;
}

.matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  opacity: 0.85;
}

.matrix-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 450px;
  padding: 30px;
  background: rgba(2, 4, 8, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(57, 255, 20, 0.15);
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(57, 255, 20, 0.1);
  pointer-events: auto;
}

.matrix-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(57, 255, 20, 0.05);
  border: 1px solid rgba(57, 255, 20, 0.25);
  color: #39ff14;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.matrix-title {
  font-size: 110px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 12px;
  color: #ffffff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3), 0 0 16px #39ff14;
}

.matrix-subtitle {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #39ff14;
  margin-bottom: 12px;
}

.matrix-desc {
  font-size: 13px;
  line-height: 1.6;
  color: #88c090;
  margin-bottom: 24px;
}

.matrix-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid rgba(57, 255, 20, 0.4);
  color: #39ff14;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.matrix-btn:hover {
  background: rgba(57, 255, 20, 0.1);
  border-color: #39ff14;
  box-shadow: 0 0 15px rgba(57, 255, 20, 0.3);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#020408] rounded-[24px] overflow-hidden flex items-center justify-center font-mono text-[#39ff14]" id="matrix-rain-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1] opacity-85" id="matrix-rain-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[450px] p-[30px] bg-[#020408]/75 backdrop-blur-[8px] border border-[#39ff14]/15 rounded-[16px] shadow-[0_0_30px_rgba(57,255,20,0.1)]">
    <div class="inline-block px-[10px] py-[4px] rounded-[4px] bg-[#39ff14]/5 border border-[#39ff14]/25 text-[#39ff14] text-[11px] font-bold tracking-[2px] mb-[16px]">SYSTEM FAILURE // STATUS 404</div>
    <h1 class="text-[110px] font-black leading-[0.95] tracking-[-2px] mb-[12px] text-white" style="text-shadow: 0 0 8px rgba(255, 255, 255, 0.3), 0 0 16px #39ff14;">404</h1>
    <h3 class="text-[13px] font-bold tracking-[1px] text-[#39ff14] mb-[12px]">ACCESS_DENIED: RESOURCE_NOT_FOUND</h3>
    <p class="text-[13px] leading-relaxed text-[#88c090] mb-[24px]">The requested memory block is unreadable. The matrix stream has corrupted. Move your cursor to interface with the stream.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[4px] bg-transparent border border-[#39ff14]/40 text-[#39ff14] text-[13px] font-bold uppercase hover:bg-[#39ff14]/10 hover:border-[#39ff14] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:translate-y-[-1px] transition-all duration-200">Reboot Terminal</a>
  </div>
</div>`
};
