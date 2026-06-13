/**
 * Component: Sound Wave Equalizer 404
 * Category: error-404
 */

export const component = {
  id: 'sound-wave-equalizer-404',
  name: 'Sound Wave Equalizer 404',
  category: 'error-404',
  tag: 'Audio',
  html: `<div class="audio-sandbox" id="audio-equalizer-container">
  <canvas class="audio-canvas" id="audio-eq-canvas"></canvas>

  <div class="audio-overlay">
    <div class="audio-badge">SIGNAL FLATLINE</div>
    <h1 class="audio-title">404</h1>
    <h3 class="audio-subtitle">CARRIER WAVE INTERRUPTED</h3>
    <p class="audio-desc">The requested source frequency returned silence. Move your cursor across the equalizer index to modulate the wave nodes.</p>
    <a href="#landing" class="audio-btn">Re-tune Receiver</a>
  </div>
</div>`,
  js: `// Sound Wave Equalizer 404
const container = document.getElementById('audio-equalizer-container');
if (container) {
  const canvas = container.querySelector('#audio-eq-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  const barCount = 42;
  const amplitudes = new Float32Array(barCount);
  const targets = new Float32Array(barCount);

  // Mouse coordinate listeners
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

    // Dark screen buffer style
    ctx.fillStyle = '#020306';
    ctx.fillRect(0, 0, width, height);

    // Compute waves amplitudes
    const time = Date.now() * 0.003;
    const barWidth = width / barCount;

    for (let i = 0; i < barCount; i++) {
      // Procedural sound wave frequency height
      let targetH = (Math.sin(i * 0.3 + time) * 0.4 + 0.6) * (height * 0.45);

      // Local cursor dampening/frequency flatline modulation
      if (mouse.active) {
        const barX = i * barWidth + barWidth / 2;
        const dx = Math.abs(mouse.x - barX);
        if (dx < 120) {
          const damp = dx / 120; // 0 (at cursor) to 1 (far away)
          // Scale target height down to make it flatline
          targetH = targetH * (0.15 + damp * 0.85);
          // Add small jitter
          targetH += (Math.random() - 0.5) * 12;
        }
      }

      // Smooth height transitions
      amplitudes[i] += (targetH - amplitudes[i]) * 0.12;

      // Draw equalizer bars
      const x = i * barWidth + 2;
      const w = barWidth - 4;
      const h = Math.max(4, amplitudes[i]);
      const y = height - h;

      // Vertical color block gradient (cyan to purple)
      const grad = ctx.createLinearGradient(x, y, x, height);
      grad.addColorStop(0, '#00f2fe'); // Top cyan
      grad.addColorStop(0.5, '#8b5cf6'); // Mid violet
      grad.addColorStop(1, '#ff007f'); // Bottom pink
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      // Draw rounded column nodes
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, 3);
      } else {
        ctx.rect(x, y, w, h);
      }
      ctx.fill();

      // Mirror reflection at top of container
      const mirrorH = h * 0.22;
      const mirrorY = 0;
      const mirrorGrad = ctx.createLinearGradient(x, mirrorY, x, mirrorY + mirrorH);
      mirrorGrad.addColorStop(0, 'rgba(0, 242, 254, 0.25)');
      mirrorGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.fillStyle = mirrorGrad;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, mirrorY, w, mirrorH, 2);
      } else {
        ctx.rect(x, mirrorY, w, mirrorH);
      }
      ctx.fill();
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
  ts: `// Sound Wave Equalizer 404 TS Definitions
const container = document.getElementById('audio-equalizer-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#audio-eq-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  const barCount = 42;
  const amplitudes = new Float32Array(barCount);

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

    ctx.fillStyle = '#020306';
    ctx.fillRect(0, 0, width, height);

    const time = Date.now() * 0.003;
    const barWidth = width / barCount;

    for (let i = 0; i < barCount; i++) {
      let targetH = (Math.sin(i * 0.3 + time) * 0.4 + 0.6) * (height * 0.45);

      if (mouse.active) {
        const barX = i * barWidth + barWidth / 2;
        const dx = Math.abs(mouse.x - barX);
        if (dx < 120) {
          const damp = dx / 120;
          targetH = targetH * (0.15 + damp * 0.85);
          targetH += (Math.random() - 0.5) * 12;
        }
      }

      amplitudes[i] += (targetH - amplitudes[i]) * 0.12;

      const x = i * barWidth + 2;
      const w = barWidth - 4;
      const h = Math.max(4, amplitudes[i]);
      const y = height - h;

      const grad = ctx.createLinearGradient(x, y, x, height);
      grad.addColorStop(0, '#00f2fe');
      grad.addColorStop(0.5, '#8b5cf6');
      grad.addColorStop(1, '#ff007f');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      (ctx as any).roundRect ? (ctx as any).roundRect(x, y, w, h, 3) : ctx.rect(x, y, w, h);
      ctx.fill();

      const mirrorH = h * 0.22;
      const mirrorY = 0;
      const mirrorGrad = ctx.createLinearGradient(x, mirrorY, x, mirrorY + mirrorH);
      mirrorGrad.addColorStop(0, 'rgba(0, 242, 254, 0.25)');
      mirrorGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.fillStyle = mirrorGrad;
      ctx.beginPath();
      (ctx as any).roundRect ? (ctx as any).roundRect(x, mirrorY, w, mirrorH, 2) : ctx.rect(x, mirrorY, w, mirrorH);
      ctx.fill();
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
  css: `/* Sound Wave Equalizer 404 Styles */
.audio-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #020306;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  box-sizing: border-box;
}

.audio-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.audio-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(2, 3, 6, 0.6);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  pointer-events: auto;
}

.audio-badge {
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

.audio-title {
  font-size: 110px;
  font-weight: 950;
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 12px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(0, 242, 254, 0.5);
}

.audio-subtitle {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #00f2fe;
  margin-bottom: 12px;
}

.audio-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #a0aec0;
  margin-bottom: 24px;
}

.audio-btn {
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

.audio-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #00f2fe;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.45);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#020306] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="audio-equalizer-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="audio-eq-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#020306]/60 backdrop-blur-[14px] border border-white/5 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
    <div class="inline-block px-[10px] py-[4px] rounded-[20px] bg-[#00f2fe]/8 border border-[#00f2fe]/20 text-[#00f2fe] text-[11px] font-extrabold tracking-[2px] mb-[16px]">SIGNAL FLATLINE</div>
    <h1 class="text-[110px] font-black leading-[0.95] tracking-[-2px] mb-[12px] text-white" style="text-shadow: 0 0 10px rgba(255,255,255,0.4), 0 0 25px rgba(0, 242, 254, 0.5);">404</h1>
    <h3 class="text-[14px] font-extrabold tracking-[2px] text-[#00f2fe] mb-[12px]">CARRIER WAVE INTERRUPTED</h3>
    <p class="text-[13.5px] leading-relaxed text-[#a0aec0] mb-[24px]">The requested source frequency returned silence. Move your cursor across the equalizer index to modulate the wave nodes.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[8px] bg-transparent border border-white/20 text-white text-[13px] font-bold hover:bg-white/5 hover:border-[#00f2fe] hover:shadow-[0_0_15px_rgba(0,242,254,0.45)] hover:translate-y-[-1px] transition-all duration-200">Re-tune Receiver</a>
  </div>
</div>`
};
