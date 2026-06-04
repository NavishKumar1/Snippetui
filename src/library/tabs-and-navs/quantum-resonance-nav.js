/**
 * Component: Quantum Resonance Nav
 * Category: tabs-and-navs
 */

export const component = {
  id: 'quantum-resonance-nav',
  name: 'Quantum Resonance Nav',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="quantum-nav-sandbox" id="quantum-nav-container">
  <div class="quantum-navbar">
    <canvas class="quantum-canvas"></canvas>
    <button class="quantum-tab-btn active" data-index="0">PSI_NODE</button>
    <button class="quantum-tab-btn" data-index="1">SPIN_UP</button>
    <button class="quantum-tab-btn" data-index="2">SPIN_DOWN</button>
  </div>
</div>`,
  js: `// Quantum Resonance canvas particles simulator
const container = document.getElementById('quantum-nav-container');
if (container) {
  const canvas = container.querySelector('.quantum-canvas');
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.quantum-tab-btn');
  const nav = container.querySelector('.quantum-navbar');
  
  let animId = null;
  let particles = [];
  let rippleRadius = 0;
  let maxRippleRadius = 0;
  let rippleX = 0;
  
  const resize = () => {
    canvas.width = nav.clientWidth;
    canvas.height = nav.clientHeight;
  };

  const createResonance = (x) => {
    rippleX = x;
    rippleRadius = 0;
    maxRippleRadius = canvas.width * 0.4;
    
    // Shoot quantum particles
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: x,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 3,
        r: Math.random() * 2.5 + 0.5,
        alpha: 1,
        color: Math.random() > 0.5 ? '#00f2fe' : '#9b5de5'
      });
    }
  };

  const animate = () => {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw timeline laser line
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // 2. Draw active quantum resonance ripple
    if (rippleRadius < maxRippleRadius) {
      rippleRadius += 4;
      const alpha = 1 - rippleRadius / maxRippleRadius;
      
      ctx.strokeStyle = \`rgba(0, 242, 254, \${alpha * 0.25})\`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(rippleX, canvas.height / 2, rippleRadius, rippleRadius * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 3. Render and update quantum particles
    particles = particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.03;
      
      if (p.alpha <= 0) return false;

      ctx.save();
      ctx.beginPath();
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return true;
    });

    animId = requestAnimationFrame(animate);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.classList.contains('active')) return;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Calculate local mouse position inside nav
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      createResonance(x);
    });
  });

  resize();
  window.addEventListener('resize', resize);
  animate();
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('quantum-nav-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.quantum-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.quantum-tab-btn');
  const nav = container.querySelector('.quantum-navbar') as HTMLDivElement;
  
  if (ctx) {
    let animId: number;
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      color: string;
    }
    let particles: Particle[] = [];
    let rippleRadius = 0;
    let maxRippleRadius = 0;
    let rippleX = 0;
    
    const resize = () => {
      canvas.width = nav.clientWidth;
      canvas.height = nav.clientHeight;
    };

    const createResonance = (x: number) => {
      rippleX = x;
      rippleRadius = 0;
      maxRippleRadius = canvas.width * 0.4;
      
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: x,
          y: canvas.height / 2,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 3,
          r: Math.random() * 2.5 + 0.5,
          alpha: 1,
          color: Math.random() > 0.5 ? '#00f2fe' : '#9b5de5'
        });
      }
    };

    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      if (rippleRadius < maxRippleRadius) {
        rippleRadius += 4;
        const alpha = 1 - rippleRadius / maxRippleRadius;
        
        ctx.strokeStyle = \`rgba(0, 242, 254, \${alpha * 0.25})\`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(rippleX, canvas.height / 2, rippleRadius, rippleRadius * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
        
        if (p.alpha <= 0) return false;

        ctx.save();
        ctx.beginPath();
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      animId = requestAnimationFrame(animate);
    };

    buttons.forEach(btn => {
      const btnEl = btn as HTMLButtonElement;
      btnEl.addEventListener('click', (e: MouseEvent) => {
        if (btnEl.classList.contains('active')) return;
        buttons.forEach(b => (b as HTMLElement).classList.remove('active'));
        btnEl.classList.add('active');
        
        const rect = nav.getBoundingClientRect();
        const x = e.clientX - rect.left;
        createResonance(x);
      });
    });

    resize();
    window.addEventListener('resize', resize);
    animate();
  }
}`,
  css: `/* Quantum Resonance Nav styles */
.quantum-nav-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #090514 0%, #030207 100%);
  border: 1px solid rgba(155, 93, 229, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.quantum-navbar {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  padding: 4px;
  gap: 4px;
  z-index: 1;
}

.quantum-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.quantum-tab-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 24px;
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.quantum-tab-btn.active {
  color: #00f2fe;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.6);
  background: rgba(0, 242, 254, 0.04);
  border-radius: 4px;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#090514] to-[#030207] border border-purple-500/10 rounded-3xl flex items-center justify-center overflow-hidden" id="quantum-nav-container">
  <div class="quantum-navbar relative flex bg-white/[0.01] border border-white/[0.03] rounded-lg p-1 gap-1 z-10">
    <canvas class="quantum-canvas absolute top-0 left-0 w-full h-full pointer-events-none z-10"></canvas>
    <button class="quantum-tab-btn active relative bg-transparent border-none px-6 py-2.5 font-mono text-[11px] font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#00f2fe] [&.active]:bg-cyan-500/5 [&.active]:rounded" data-index="0">PSI_NODE</button>
    <button class="quantum-tab-btn relative bg-transparent border-none px-6 py-2.5 font-mono text-[11px] font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#00f2fe] [&.active]:bg-cyan-500/5 [&.active]:rounded" data-index="1">SPIN_UP</button>
    <button class="quantum-tab-btn relative bg-transparent border-none px-6 py-2.5 font-mono text-[11px] font-bold text-white/40 cursor-pointer z-20 transition [&.active]:text-[#00f2fe] [&.active]:bg-cyan-500/5 [&.active]:rounded" data-index="2">SPIN_DOWN</button>
  </div>
</div>`,
  prompt: 'Design a quantum light timeline navigation bar with particle explosions and ripples spreading from selected options.'
};
