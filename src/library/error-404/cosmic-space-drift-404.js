/**
 * Component: Cosmic Space Drift 404
 * Category: error-404
 */

export const component = {
  id: 'cosmic-space-drift-404',
  name: 'Cosmic Space Drift 404',
  category: 'error-404',
  tag: 'Parallax',
  html: `<div class="space-sandbox" id="space-drift-container">
  <!-- Dynamic Space Starfield Canvas -->
  <canvas class="space-canvas" id="space-star-canvas"></canvas>

  <!-- Parallax Astro Layer -->
  <div class="parallax-scene" id="space-parallax-scene">
    <div class="space-layer space-bg-glow" data-depth="0.1"></div>
    <div class="space-layer space-stars-mid" data-depth="0.3"></div>
    
    <!-- Floating Space Junk Debris -->
    <div class="space-layer debris-1" data-depth="0.6"></div>
    <div class="space-layer debris-2" data-depth="0.8"></div>

    <!-- Drifting Astronaut -->
    <div class="space-layer astronaut-layer" data-depth="0.5">
      <div class="astronaut-wrapper">
        <svg class="astronaut-svg" viewBox="0 0 120 160" width="120" height="160">
          <g fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <!-- Helmet -->
            <path d="M60 25c-16.5 0-30 13.5-30 30v10c0 16.5 13.5 30 30 30s30-13.5 30-30V55c0-16.5-13.5-30-30-30z" fill="rgba(10, 10, 30, 0.8)"/>
            <!-- Visor -->
            <path d="M40 45h40c5.5 0 10 4.5 10 10v5c0 5.5-4.5 10-10 10H40c-5.5 0-10-4.5-10-10v-5c0-5.5 4.5-10 10-10z" fill="url(#visor-gradient)" stroke="#00f2fe" stroke-width="2"/>
            <!-- Suit Body -->
            <path d="M35 90h50l8 35H27l8-35z" fill="rgba(255, 255, 255, 0.08)"/>
            <!-- Arms -->
            <path d="M27 95l-15 15 5 15 10-10"/>
            <path d="M93 95l15 15-5 15-10-10"/>
            <!-- Legs -->
            <path d="M42 125v25l-8 5"/>
            <path d="M78 125v25l8 5"/>
            <!-- Life Support Pack -->
            <rect x="42" y="70" width="36" height="20" rx="4" fill="rgba(255, 255, 255, 0.05)"/>
            <!-- Tether Line -->
            <path d="M60 110c0 15 30 20 20 40s-40 20-20 60" stroke="#00f2fe" stroke-dasharray="4 4"/>
          </g>
          <defs>
            <linearGradient id="visor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#ff007f" stop-opacity="0.8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>

  <div class="space-content">
    <div class="space-badge">COMMUNICATION BREAKDOWN</div>
    <h1 class="space-title">404</h1>
    <p class="space-desc">You have drifted past the boundaries of our known solar system. The requested beacon is no longer active.</p>
    <div class="space-actions">
      <a href="#landing" class="space-btn">Signal Landing</a>
    </div>
  </div>
</div>`,
  js: `// Cosmic Space Drift 404
const container = document.getElementById('space-drift-container');
if (container) {
  const canvas = container.querySelector('#space-star-canvas');
  const ctx = canvas.getContext('2d');
  const scene = container.querySelector('#space-parallax-scene');
  const layers = scene.querySelectorAll('.space-layer');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

  // Create stars background
  const starCount = 80;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.05 + 0.02
    });
  }

  // Track cursor movement for parallax target
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouse.tx = e.clientX - rect.left;
    mouse.ty = e.clientY - rect.top;
  };

  container.addEventListener('mousemove', handleMouseMove);

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

    // Smooth mouse interpolation
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;

    // Draw deep space background
    ctx.fillStyle = '#020208';
    ctx.fillRect(0, 0, width, height);

    // Dynamic radial ambient nebula glow
    const radialGlow = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.6);
    radialGlow.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
    radialGlow.addColorStop(0.5, 'rgba(0, 242, 254, 0.03)');
    radialGlow.addColorStop(1, 'rgba(2, 2, 8, 0)');
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    // Draw dynamic background stars
    ctx.fillStyle = '#ffffff';
    stars.forEach(s => {
      s.x -= s.speed;
      if (s.x < 0) s.x = width;
      
      // Slight parallax wiggle
      const px = s.x + (mouse.x - width / 2) * s.speed * 0.1;
      const py = s.y + (mouse.y - height / 2) * s.speed * 0.1;

      ctx.beginPath();
      ctx.globalAlpha = s.alpha * (0.7 + Math.sin(Date.now() * 0.003 + s.x) * 0.3);
      ctx.arc(px, py, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Process CSS Parallax layers displacement
    layers.forEach(layer => {
      const depth = parseFloat(layer.getAttribute('data-depth') || '0.2');
      const offsetX = (mouse.x - width / 2) * depth * 0.24;
      const offsetY = (mouse.y - height / 2) * depth * 0.24;
      layer.style.transform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)';
    });
  };

  loop();

  // Cleanup
  container.addEventListener('destroyed', () => {
    active = false;
    container.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  ts: `// Cosmic Space Drift 404 TS Definitions
interface SpaceStar {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
}

const container = document.getElementById('space-drift-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#space-star-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const scene = container.querySelector('#space-parallax-scene') as HTMLDivElement;
  const layers = scene.querySelectorAll<HTMLDivElement>('.space-layer');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };
  const stars: SpaceStar[] = [];

  for (let i = 0; i < 80; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.05 + 0.02
    });
  }

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    mouse.tx = e.clientX - rect.left;
    mouse.ty = e.clientY - rect.top;
  };

  container.addEventListener('mousemove', handleMouseMove);

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

    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;

    ctx.fillStyle = '#020208';
    ctx.fillRect(0, 0, width, height);

    const radialGlow = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.6);
    radialGlow.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
    radialGlow.addColorStop(0.5, 'rgba(0, 242, 254, 0.03)');
    radialGlow.addColorStop(1, 'rgba(2, 2, 8, 0)');
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    stars.forEach(s => {
      s.x -= s.speed;
      if (s.x < 0) s.x = width;
      
      const px = s.x + (mouse.x - width / 2) * s.speed * 0.1;
      const py = s.y + (mouse.y - height / 2) * s.speed * 0.1;

      ctx.beginPath();
      ctx.globalAlpha = s.alpha * (0.7 + Math.sin(Date.now() * 0.003 + s.x) * 0.3);
      ctx.arc(px, py, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    layers.forEach(layer => {
      const depth = parseFloat(layer.getAttribute('data-depth') || '0.2');
      const offsetX = (mouse.x - width / 2) * depth * 0.24;
      const offsetY = (mouse.y - height / 2) * depth * 0.24;
      layer.style.transform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)';
    });
  };

  loop();

  container.addEventListener('destroyed', () => {
    active = false;
    container!.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibility);
    observer.disconnect();
  });
}`,
  css: `/* Cosmic Space Drift 404 Styles */
.space-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #020208;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.space-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.parallax-scene {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.space-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.space-bg-glow {
  background: radial-gradient(circle at 75% 30%, rgba(255, 0, 127, 0.08) 0%, rgba(0, 0, 0, 0) 60%);
}

.space-stars-mid {
  background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 50px 160px, #ddd, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 80px 120px, #fff, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.4;
}

.debris-1 {
  background: radial-gradient(circle at 15% 20%, rgba(0, 242, 254, 0.1) 0%, rgba(0, 0, 0, 0) 5%);
}

.debris-2 {
  background: radial-gradient(circle at 85% 75%, rgba(139, 92, 246, 0.12) 0%, rgba(0, 0, 0, 0) 8%);
}

.astronaut-layer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.astronaut-wrapper {
  margin-top: -60px;
  animation: astro-float 6s ease-in-out infinite alternate;
}

.space-content {
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 440px;
  padding: 24px;
}

.space-badge {
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

.space-title {
  font-size: 130px;
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -3px;
  margin-bottom: 12px;
  background: linear-gradient(180deg, #ffffff 30%, #a0aec0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
}

.space-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #a0aec0;
  margin-bottom: 24px;
}

.space-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 30px;
  background: linear-gradient(90deg, #00f2fe, #8b5cf6);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
  transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}

.space-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 242, 254, 0.5);
}

@keyframes astro-float {
  0% {
    transform: translateY(-10px) rotate(-3deg);
  }
  100% {
    transform: translateY(10px) rotate(3deg);
  }
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#020208] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="space-drift-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="space-star-canvas"></canvas>

  <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-[2]" id="space-parallax-scene">
    <div class="space-layer absolute top-0 left-0 w-full h-full will-change-transform space-bg-glow" data-depth="0.1" style="background: radial-gradient(circle at 75% 30%, rgba(255, 0, 127, 0.08) 0%, rgba(0, 0, 0, 0) 60%);"></div>
    <div class="space-layer absolute top-0 left-0 w-full h-full will-change-transform space-stars-mid" data-depth="0.3" style="background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 50px 160px, #ddd, rgba(0,0,0,0)); background-repeat: repeat; background-size: 200px 200px; opacity: 0.4;"></div>
    
    <div class="space-layer absolute top-0 left-0 w-full h-full will-change-transform" data-depth="0.6" style="background: radial-gradient(circle at 15% 20%, rgba(0, 242, 254, 0.1) 0%, rgba(0, 0, 0, 0) 5%);"></div>
    <div class="space-layer absolute top-0 left-0 w-full h-full will-change-transform" data-depth="0.8" style="background: radial-gradient(circle at 85% 75%, rgba(139, 92, 246, 0.12) 0%, rgba(0, 0, 0, 0) 8%);"></div>

    <div class="space-layer absolute top-0 left-0 w-full h-full will-change-transform flex items-center justify-center" data-depth="0.5">
      <div class="mt-[-60px]" style="animation: astro-float 6s ease-in-out infinite alternate;">
        <svg viewBox="0 0 120 160" width="120" height="160">
          <g fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M60 25c-16.5 0-30 13.5-30 30v10c0 16.5 13.5 30 30 30s30-13.5 30-30V55c0-16.5-13.5-30-30-30z" fill="rgba(10, 10, 30, 0.8)"/>
            <path d="M40 45h40c5.5 0 10 4.5 10 10v5c0 5.5-4.5 10-10 10H40c-5.5 0-10-4.5-10-10v-5c0-5.5 4.5-10 10-10z" fill="url(#visor-gradient-tw)" stroke="#00f2fe" stroke-width="2"/>
            <path d="M35 90h50l8 35H27l8-35z" fill="rgba(255, 255, 255, 0.08)"/>
            <path d="M27 95l-15 15 5 15 10-10"/>
            <path d="M93 95l15 15-5 15-10-10"/>
            <path d="M42 125v25l-8 5"/>
            <path d="M78 125v25l8 5"/>
            <rect x="42" y="70" width="36" height="20" rx="4" fill="rgba(255, 255, 255, 0.05)"/>
            <path d="M60 110c0 15 30 20 20 40s-40 20-20 60" stroke="#00f2fe" stroke-dasharray="4 4"/>
          </g>
          <defs>
            <linearGradient id="visor-gradient-tw" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#ff007f" stop-opacity="0.8"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>

  <div class="relative z-[3] text-center max-w-[440px] p-[24px]">
    <div class="inline-block px-[10px] py-[4px] rounded-[20px] bg-[#00f2fe]/8 border border-[#00f2fe]/20 text-[#00f2fe] text-[11px] font-extrabold tracking-[2px] mb-[16px]">COMMUNICATION BREAKDOWN</div>
    <h1 class="text-[130px] font-black leading-[0.9] tracking-[-3px] mb-[12px] bg-gradient-to-b from-white to-[#a0aec0] bg-clip-text text-transparent filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">404</h1>
    <p class="text-[13.5px] leading-relaxed text-[#a0aec0] mb-[24px]">You have drifted past the boundaries of our known solar system. The requested beacon is no longer active.</p>
    <div class="space-actions">
      <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[30px] bg-gradient-to-r from-[#00f2fe] to-[#8b5cf6] text-white text-[13px] font-bold shadow-[0_4px_15px_rgba(0,242,254,0.3)] hover:shadow-[0_8px_20px_rgba(0,242,254,0.5)] hover:translate-y-[-2px] transition-all duration-[240ms] ease-out">Signal Landing</a>
    </div>
  </div>
</div>`
};
