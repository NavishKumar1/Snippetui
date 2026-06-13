/**
 * Component: Quantum Superposition 404
 * Category: error-404
 */

export const component = {
  id: 'quantum-superposition-404',
  name: 'Quantum Superposition 404',
  category: 'error-404',
  tag: 'Quantum',
  html: `<div class="quantum-sandbox" id="quantum-super-container">
  <canvas class="quantum-canvas" id="quantum-super-canvas"></canvas>

  <div class="quantum-overlay">
    <div class="quantum-badge">PROBABILITY COLLAPSE</div>
    <h1 class="quantum-title" id="quantum-display-title">404</h1>
    <h3 class="quantum-subtitle">COORDINATES UNCERTAIN</h3>
    <p class="quantum-desc">The requested file exists in a superposition of states. Hover your observer to collapse the probability wave.</p>
    <a href="#landing" class="quantum-btn">Re-Center Matrix</a>
  </div>
</div>`,
  js: `// Quantum Superposition 404
const container = document.getElementById('quantum-super-container');
if (container) {
  const canvas = container.querySelector('#quantum-super-canvas');
  const ctx = canvas.getContext('2d');
  const title = container.querySelector('#quantum-display-title');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  // Set up particles that represent probability field clouds
  const particles = [];
  const particleCount = 110;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      ox: Math.random() * width,
      oy: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2.0 + 0.8,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

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

    // Dark quantum space background
    ctx.fillStyle = '#020206';
    ctx.fillRect(0, 0, width, height);

    const time = Date.now() * 0.003;
    const centerX = width / 2;
    const centerY = height / 2;

    // Collapse strength depends on mouse distance to center
    let collapseFactor = 0.0;
    if (mouse.active) {
      const dx = mouse.x - centerX;
      const dy = mouse.y - centerY;
      const dist = Math.hypot(dx, dy);
      collapseFactor = Math.max(0, 1.0 - dist / 280);
    }

    // Tweak the title font blur filter dynamically based on collapse
    const blurPx = (1.0 - collapseFactor) * 12;
    title.style.filter = 'blur(' + blurPx + 'px)';
    title.style.opacity = 0.35 + collapseFactor * 0.65;

    // Update and draw superposition probability clouds
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Pull particles toward center if collapsed
      if (collapseFactor > 0.05) {
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        const dist = Math.hypot(dx, dy);
        p.x += (dx / dist) * collapseFactor * 2.0;
        p.y += (dy / dist) * collapseFactor * 2.0;
      }

      ctx.beginPath();
      ctx.fillStyle = p.isCore ? '#ff007f' : '#00f2fe';
      ctx.globalAlpha = p.alpha * (1.0 - collapseFactor * 0.5);
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw overlapping blurred wave states in back
    if (collapseFactor < 0.95) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.font = '900 130px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // State 1: Cyan shift
      const shift1X = Math.sin(time) * (1.0 - collapseFactor) * 20;
      const shift1Y = Math.cos(time * 0.7) * (1.0 - collapseFactor) * 12;
      ctx.fillStyle = 'rgba(0, 242, 254, ' + (0.16 * (1.0 - collapseFactor)) + ')';
      ctx.fillText('404', centerX + shift1X, centerY - 60 + shift1Y);

      // State 2: Magenta shift
      const shift2X = -Math.sin(time * 0.8) * (1.0 - collapseFactor) * 20;
      const shift2Y = -Math.cos(time * 0.9) * (1.0 - collapseFactor) * 12;
      ctx.fillStyle = 'rgba(255, 0, 127, ' + (0.16 * (1.0 - collapseFactor)) + ')';
      ctx.fillText('404', centerX + shift2X, centerY - 60 + shift2Y);

      ctx.restore();
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
  ts: `// Quantum Superposition 404 TS Definitions
interface ProbParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  isCore?: boolean;
}

const container = document.getElementById('quantum-super-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#quantum-super-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const title = container.querySelector('#quantum-display-title') as HTMLHeadingElement;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };
  const particles: ProbParticle[] = [];

  for (let i = 0; i < 110; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2.0 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
      isCore: Math.random() > 0.5
    });
  }

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

    ctx.fillStyle = '#020206';
    ctx.fillRect(0, 0, width, height);

    const time = Date.now() * 0.003;
    const centerX = width / 2;
    const centerY = height / 2;

    let collapseFactor = 0.0;
    if (mouse.active) {
      const dx = mouse.x - centerX;
      const dy = mouse.y - centerY;
      const dist = Math.hypot(dx, dy);
      collapseFactor = Math.max(0, 1.0 - dist / 280);
    }

    const blurPx = (1.0 - collapseFactor) * 12;
    title.style.filter = 'blur(' + blurPx + 'px)';
    title.style.opacity = (0.35 + collapseFactor * 0.65).toString();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (collapseFactor > 0.05) {
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        const dist = Math.hypot(dx, dy);
        p.x += (dx / dist) * collapseFactor * 2.0;
        p.y += (dy / dist) * collapseFactor * 2.0;
      }

      ctx.beginPath();
      ctx.fillStyle = p.isCore ? '#ff007f' : '#00f2fe';
      ctx.globalAlpha = p.alpha * (1.0 - collapseFactor * 0.5);
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    if (collapseFactor < 0.95) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.font = '900 130px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const shift1X = Math.sin(time) * (1.0 - collapseFactor) * 20;
      const shift1Y = Math.cos(time * 0.7) * (1.0 - collapseFactor) * 12;
      ctx.fillStyle = 'rgba(0, 242, 254, ' + (0.16 * (1.0 - collapseFactor)) + ')';
      ctx.fillText('404', centerX + shift1X, centerY - 60 + shift1Y);

      const shift2X = -Math.sin(time * 0.8) * (1.0 - collapseFactor) * 20;
      const shift2Y = -Math.cos(time * 0.9) * (1.0 - collapseFactor) * 12;
      ctx.fillStyle = 'rgba(255, 0, 127, ' + (0.16 * (1.0 - collapseFactor)) + ')';
      ctx.fillText('404', centerX + shift2X, centerY - 60 + shift2Y);

      ctx.restore();
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
  css: `/* Quantum Superposition 404 Styles */
.quantum-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #020206;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.quantum-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.quantum-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(2, 2, 6, 0.45);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  pointer-events: auto;
}

.quantum-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(0, 242, 254, 0.08);
  border: 1px solid rgba(0, 242, 254, 0.2);
  color: #00f2fe;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.quantum-title {
  font-size: 120px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -3px;
  margin-bottom: 12px;
  color: #ffffff;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.5), 0 0 25px rgba(0, 242, 254, 0.6);
  transition: filter 0.1s ease, opacity 0.1s ease;
  will-change: filter, opacity;
}

.quantum-subtitle {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #00f2fe;
  margin-bottom: 12px;
}

.quantum-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #a0aec0;
  margin-bottom: 24px;
}

.quantum-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(0, 242, 254, 0.3);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.quantum-btn:hover {
  background: rgba(0, 242, 254, 0.08);
  border-color: #00f2fe;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.45);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#020206] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="quantum-super-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="quantum-super-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#020206]/45 backdrop-blur-[14px] border border-white/5 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
    <div class="inline-block px-[10px] py-[4px] rounded-[20px] bg-[#00f2fe]/8 border border-[#00f2fe]/20 text-[#00f2fe] text-[11px] font-extrabold tracking-[2px] mb-[16px]">PROBABILITY COLLAPSE</div>
    <h1 class="text-[120px] font-black leading-[0.95] tracking-[-3px] mb-[12px] text-white transition-[filter,opacity] duration-100 will-change-[filter,opacity]" id="quantum-display-title" style="text-shadow: 0 0 12px rgba(255, 255, 255, 0.5), 0 0 25px rgba(0, 242, 254, 0.6);">404</h1>
    <h3 class="text-[14px] font-extrabold tracking-[2px] text-[#00f2fe] mb-[12px]">COORDINATES UNCERTAIN</h3>
    <p class="text-[13.5px] leading-relaxed text-[#a0aec0] mb-[24px]">The requested file exists in a superposition of states. Hover your observer to collapse the probability wave.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[8px] bg-transparent border border-[#00f2fe]/30 text-white text-[13px] font-bold hover:bg-[#00f2fe]/8 hover:border-[#00f2fe] hover:shadow-[0_0_15px_rgba(0,242,254,0.45)] hover:translate-y-[-1px] transition-all duration-200">Re-Center Matrix</a>
  </div>
</div>`
};
