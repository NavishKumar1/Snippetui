/**
 * Component: Interactive Glitch Neon 404
 * Category: error-404
 */

export const component = {
  id: 'interactive-glitch-neon-404',
  name: 'Interactive Glitch Neon 404',
  category: 'error-404',
  tag: 'Glitch',
  html: `<div class="glitch-sandbox" id="glitch-neon-container">
  <canvas class="glitch-canvas" id="glitch-neon-canvas"></canvas>

  <div class="glitch-content">
    <div class="glitch-layers" data-text="404">
      <div class="glitch-layer shadow-pink">404</div>
      <div class="glitch-layer main-neon">404</div>
      <div class="glitch-layer shadow-cyan">404</div>
    </div>
    
    <h2 class="glitch-subtitle" data-text="COORDINATES LOST IN CYBERSPACE">COORDINATES LOST IN CYBERSPACE</h2>
    <p class="glitch-description">The file you are looking for has been purged or fractured by a digital signal glitch.</p>
    
    <div class="glitch-actions">
      <a href="#landing" class="glitch-btn glitch-btn-primary">Reboot System</a>
      <a href="#library" class="glitch-btn glitch-btn-secondary">Scan Directories</a>
    </div>
  </div>
  
  <div class="crt-scanline"></div>
</div>`,
  js: `// Interactive Glitch Neon 404
const container = document.getElementById('glitch-neon-container');
if (container) {
  const canvas = container.querySelector('#glitch-neon-canvas');
  const ctx = canvas.getContext('2d');
  const layers = container.querySelector('.glitch-layers');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };
  let particles = [];

  class Spark {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 2 + 1;
      this.life = 1.0;
      this.decay = Math.random() * 0.03 + 0.02;
      this.color = Math.random() > 0.5 ? '#ff007f' : '#00f2fe';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05; // Faint gravity
      this.life -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Handle cursor movement inside container
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;

    // Trigger glitch trigger layers
    if (Math.random() < 0.3) {
      triggerTemporaryGlitch();
    }

    // Spawn sparks
    for (let i = 0; i < 3; i++) {
      particles.push(new Spark(mouse.x, mouse.y));
    }
  };

  const handleMouseLeave = () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.active = false;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  function triggerTemporaryGlitch() {
    layers.classList.add('glitching');
    setTimeout(() => {
      layers.classList.remove('glitching');
    }, Math.random() * 180 + 50);
  }

  // Auto trigger glitch periodically
  let glitchInterval = setInterval(() => {
    if (Math.random() < 0.4) {
      triggerTemporaryGlitch();
    }
  }, 2400);

  const resize = () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
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

    // Premium dark cyber space style
    ctx.fillStyle = 'rgba(6, 4, 12, 0.25)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw spark particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      if (p.life <= 0) {
        particles.splice(i, 1);
      } else {
        p.draw();
      }
    }
  };

  loop();

  // Cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    clearInterval(glitchInterval);
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  ts: `// Interactive Glitch Neon 404 TS Definitions
interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  decay: number;
  color: string;
  update(): void;
  draw(): void;
}

const container = document.getElementById('glitch-neon-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#glitch-neon-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const layers = container.querySelector('.glitch-layers') as HTMLDivElement;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };
  let particles: SparkParticle[] = [];

  class Spark implements SparkParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number = 1.0;
    decay: number;
    color: string;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 2 + 1;
      this.decay = Math.random() * 0.03 + 0.02;
      this.color = Math.random() > 0.5 ? '#ff007f' : '#00f2fe';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05;
      this.life -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;

    if (Math.random() < 0.3) {
      triggerTemporaryGlitch();
    }

    for (let i = 0; i < 3; i++) {
      particles.push(new Spark(mouse.x, mouse.y));
    }
  };

  const handleMouseLeave = () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.active = false;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  function triggerTemporaryGlitch() {
    layers.classList.add('glitching');
    setTimeout(() => {
      layers.classList.remove('glitching');
    }, Math.random() * 180 + 50);
  }

  let glitchInterval = setInterval(() => {
    if (Math.random() < 0.4) {
      triggerTemporaryGlitch();
    }
  }, 2400);

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

    ctx.fillStyle = 'rgba(6, 4, 12, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      if (p.life <= 0) {
        particles.splice(i, 1);
      } else {
        p.draw();
      }
    }
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    clearInterval(glitchInterval);
    container!.removeEventListener('mousemove', handleMouseMove);
    container!.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  css: `/* Interactive Glitch Neon 404 Styles */
.glitch-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #06040c;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.glitch-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.glitch-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 480px;
  padding: 30px;
  background: rgba(10, 8, 20, 0.64);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.glitch-layers {
  position: relative;
  display: inline-block;
  font-size: 110px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -2px;
  text-transform: uppercase;
  margin-bottom: 15px;
}

.glitch-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-layer.main-neon {
  position: relative;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px #ff007f, 0 0 30px #ff007f;
  animation: neon-pulse 2s infinite alternate;
}

.glitch-layer.shadow-pink {
  color: #ff007f;
  left: -2px;
  text-shadow: 0 0 10px #ff007f;
  opacity: 0;
  transform: translate(0);
}

.glitch-layer.shadow-cyan {
  color: #00f2fe;
  left: 2px;
  text-shadow: 0 0 10px #00f2fe;
  opacity: 0;
  transform: translate(0);
}

/* Glitch trigger effect */
.glitch-layers.glitching .shadow-pink {
  opacity: 0.8;
  animation: glitch-anim-1 0.2s cubic-bezier(.25, .46, .45, .94) both;
}

.glitch-layers.glitching .shadow-cyan {
  opacity: 0.8;
  animation: glitch-anim-2 0.2s cubic-bezier(.25, .46, .45, .94) reverse both;
}

.glitch-layers.glitching .main-neon {
  animation: glitch-skew 0.2s linear infinite;
}

.glitch-subtitle {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 3px;
  color: #00f2fe;
  margin-bottom: 12px;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
}

.glitch-description {
  font-size: 13.5px;
  line-height: 1.6;
  color: #a0aec0;
  margin-bottom: 24px;
}

.glitch-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.glitch-btn {
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.glitch-btn-primary {
  background: #ff007f;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(255, 0, 127, 0.4);
}

.glitch-btn-primary:hover {
  background: #e60072;
  box-shadow: 0 6px 20px rgba(255, 0, 127, 0.6);
  transform: translateY(-1px);
}

.glitch-btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.glitch-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #00f2fe;
  box-shadow: 0 0 12px rgba(0, 242, 254, 0.3);
  transform: translateY(-1px);
}

.crt-scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
  background-size: 100% 4px, 6px 100%;
  pointer-events: none;
  z-index: 3;
}

@keyframes neon-pulse {
  0% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px #ff007f, 0 0 15px #ff007f;
  }
  100% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px #ff007f, 0 0 30px #ff007f;
  }
}

@keyframes glitch-anim-1 {
  0% {
    transform: translate(0);
    clip-path: inset(40% 0 61% 0);
  }
  20% {
    transform: translate(-4px, 3px);
    clip-path: inset(92% 0 1% 0);
  }
  40% {
    transform: translate(3px, -2px);
    clip-path: inset(15% 0 80% 0);
  }
  60% {
    transform: translate(-3px, 4px);
    clip-path: inset(80% 0 5% 0);
  }
  80% {
    transform: translate(4px, -3px);
    clip-path: inset(30% 0 62% 0);
  }
  100% {
    transform: translate(0);
    clip-path: inset(40% 0 61% 0);
  }
}

@keyframes glitch-anim-2 {
  0% {
    transform: translate(0);
    clip-path: inset(25% 0 58% 0);
  }
  20% {
    transform: translate(3px, -4px);
    clip-path: inset(86% 0 5% 0);
  }
  40% {
    transform: translate(-4px, 2px);
    clip-path: inset(9% 0 85% 0);
  }
  60% {
    transform: translate(4px, -3px);
    clip-path: inset(72% 0 12% 0);
  }
  80% {
    transform: translate(-3px, 4px);
    clip-path: inset(45% 0 51% 0);
  }
  100% {
    transform: translate(0);
    clip-path: inset(25% 0 58% 0);
  }
}

@keyframes glitch-skew {
  0% { transform: skew(0deg); }
  20% { transform: skew(-3deg); }
  40% { transform: skew(4deg); }
  60% { transform: skew(-1deg); }
  80% { transform: skew(3deg); }
  100% { transform: skew(0deg); }
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#06040c] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="glitch-neon-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="glitch-neon-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[480px] p-[30px] bg-[#0a0814]/60 backdrop-blur-[16px] border border-white/8 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
    <div class="glitch-layers relative inline-block text-[110px] font-black leading-none tracking-[-2px] uppercase mb-[15px]" data-text="404">
      <div class="glitch-layer shadow-pink absolute top-0 left-0 w-full h-full text-[#ff007f] left-[-2px] opacity-0 translate-x-0" style="text-shadow: 0 0 10px #ff007f;">404</div>
      <div class="glitch-layer main-neon absolute top-0 left-0 w-full h-full relative text-white" style="text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px #ff007f, 0 0 30px #ff007f; animation: neon-pulse 2s infinite alternate;">404</div>
      <div class="glitch-layer shadow-cyan absolute top-0 left-0 w-full h-full text-[#00f2fe] left-[2px] opacity-0 translate-x-0" style="text-shadow: 0 0 10px #00f2fe;">404</div>
    </div>
    
    <h2 class="text-[14px] font-extrabold tracking-[3px] text-[#00f2fe] mb-[12px]" style="text-shadow: 0 0 10px rgba(0, 242, 254, 0.4);">COORDINATES LOST IN CYBERSPACE</h2>
    <p class="text-[13.5px] leading-relaxed text-[#a0aec0] mb-[24px]">The file you are looking for has been purged or fractured by a digital signal glitch.</p>
    
    <div class="flex gap-[12px] justify-center">
      <a href="#landing" class="px-[22px] py-[10px] rounded-[8px] text-[13px] font-bold text-white bg-[#ff007f] hover:bg-[#e60072] transition-all duration-200 shadow-[0_4px_15px_rgba(255,0,127,0.4)] hover:shadow-[0_6px_20px_rgba(255,0,127,0.6)] hover:translate-y-[-1px]">Reboot System</a>
      <a href="#library" class="px-[22px] py-[10px] rounded-[8px] text-[13px] font-bold text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:border-[#00f2fe] transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,242,254,0.3)] hover:translate-y-[-1px]">Scan Directories</a>
    </div>
  </div>
  
  <div class="crt-scanline absolute top-0 left-0 w-full h-full pointer-events-none z-[3]" style="background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03)); background-size: 100% 4px, 6px 100%;"></div>
</div>`
};
