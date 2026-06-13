/**
 * Component: DNA Helix Synapse 404
 * Category: error-404
 */

export const component = {
  id: 'dna-helix-synapse-404',
  name: 'DNA Helix Synapse 404',
  category: 'error-404',
  tag: '3D Canvas',
  html: `<div class="dna-sandbox" id="dna-synapse-container">
  <canvas class="dna-canvas" id="dna-synapse-canvas"></canvas>

  <div class="dna-overlay">
    <div class="dna-badge">GENETIC CODE MISMATCH</div>
    <h1 class="dna-title">404</h1>
    <h3 class="dna-subtitle">MUTATION_DETECTED: STRAND_BREAK</h3>
    <p class="dna-desc">A critical genetic mutation has severed the link. Hover your observer near the helix to stretch and splice the nucleotide bonds.</p>
    <a href="#landing" class="dna-btn">Splice Sequence</a>
  </div>
</div>`,
  js: `// DNA Helix Synapse 404
const container = document.getElementById('dna-synapse-container');
if (container) {
  const canvas = container.querySelector('#dna-synapse-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };

  // Double Helix node parameters
  const nodeCount = 28;
  const spacing = 16;
  
  // Spring physics variables for node displacement
  const displacementsA = [];
  const displacementsB = [];
  
  for (let i = 0; i < nodeCount; i++) {
    displacementsA.push({ x: 0, y: 0, vx: 0, vy: 0 });
    displacementsB.push({ x: 0, y: 0, vx: 0, vy: 0 });
  }

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

    // Dark bio-laboratory fluid background
    ctx.fillStyle = '#030508';
    ctx.fillRect(0, 0, width, height);

    // Tech mesh grids in back
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const cx = width / 2;
    const cy = height / 2;
    const time = Date.now() * 0.0015;

    // Draw connecting synapses / links
    for (let i = 0; i < nodeCount; i++) {
      const theta = time + i * 0.25;
      const radius = 65; // DNA helix radius

      const baseYA = cy - (nodeCount / 2 - i) * spacing - 40;
      const baseYB = baseYA;

      // Base 3D rotated positions
      const baseXA = cx + Math.sin(theta) * radius;
      const baseXB = cx - Math.sin(theta) * radius;
      
      const zA = Math.cos(theta) * radius;
      const zB = -Math.cos(theta) * radius;

      // Elastic Spring Update for Strand A
      const dispA = displacementsA[i];
      let targetAX = 0;
      let targetAY = 0;
      
      if (mouse.active) {
        const distA = Math.hypot(mouse.x - (baseXA + dispA.x), mouse.y - (baseYA + dispA.y));
        if (distA < 90) {
          const force = (90 - distA) * 0.35;
          targetAX = ((baseXA + dispA.x) - mouse.x) / distA * force;
          targetAY = ((baseYA + dispA.y) - mouse.y) / distA * force;
        }
      }
      
      dispA.vx += (targetAX - dispA.x) * 0.06;
      dispA.vy += (targetAY - dispA.y) * 0.06;
      dispA.vx *= 0.86;
      dispA.vy *= 0.86;
      dispA.x += dispA.vx;
      dispA.y += dispA.vy;

      // Elastic Spring Update for Strand B
      const dispB = displacementsB[i];
      let targetBX = 0;
      let targetBY = 0;
      
      if (mouse.active) {
        const distB = Math.hypot(mouse.x - (baseXB + dispB.x), mouse.y - (baseYB + dispB.y));
        if (distB < 90) {
          const force = (90 - distB) * 0.35;
          targetBX = ((baseXB + dispB.x) - mouse.x) / distB * force;
          targetBY = ((baseYB + dispB.y) - mouse.y) / distB * force;
        }
      }
      
      dispB.vx += (targetBX - dispB.x) * 0.06;
      dispB.vy += (targetBY - dispB.y) * 0.06;
      dispB.vx *= 0.86;
      dispB.vy *= 0.86;
      dispB.x += dispB.vx;
      dispB.y += dispB.vy;

      // Project final coordinates
      const ax = baseXA + dispA.x;
      const ay = baseYA + dispA.y;
      
      const bx = baseXB + dispB.x;
      const by = baseYB + dispB.y;

      // Draw connecting bar
      ctx.save();
      // Draw thicker connector for depth representation
      const alphaFactor = (zA + radius) / (radius * 2) * 0.6 + 0.15;
      ctx.strokeStyle = 'rgba(255, 255, 255, ' + alphaFactor + ')';
      ctx.lineWidth = 2 + (zA + radius) / radius * 1.5;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
      ctx.restore();

      // Draw Nucleotide A (Cyan)
      const sizeA = 5 + (zA + radius) / radius * 3.5;
      ctx.save();
      ctx.fillStyle = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f2fe';
      ctx.globalAlpha = 0.4 + (zA + radius) / (radius * 2) * 0.6;
      ctx.beginPath();
      ctx.arc(ax, ay, sizeA, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Nucleotide B (Pink)
      const sizeB = 5 + (zB + radius) / radius * 3.5;
      ctx.save();
      ctx.fillStyle = '#ff007f';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff007f';
      ctx.globalAlpha = 0.4 + (zB + radius) / (radius * 2) * 0.6;
      ctx.beginPath();
      ctx.arc(bx, by, sizeB, 0, Math.PI * 2);
      ctx.fill();
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
  ts: `// DNA Helix Synapse 404 TS Definitions
interface DNASpringNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const container = document.getElementById('dna-synapse-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('#dna-synapse-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const mouse = { x: -1000, y: -1000, active: false };
  const nodeCount = 28;
  const spacing = 16;
  const displacementsA: DNASpringNode[] = [];
  const displacementsB: DNASpringNode[] = [];

  for (let i = 0; i < nodeCount; i++) {
    displacementsA.push({ x: 0, y: 0, vx: 0, vy: 0 });
    displacementsB.push({ x: 0, y: 0, vx: 0, vy: 0 });
  }

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

    ctx.fillStyle = '#030508';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(0, 242, 254, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const cx = width / 2;
    const cy = height / 2;
    const time = Date.now() * 0.0015;

    for (let i = 0; i < nodeCount; i++) {
      const theta = time + i * 0.25;
      const radius = 65;

      const baseYA = cy - (nodeCount / 2 - i) * spacing - 40;
      const baseYB = baseYA;

      const baseXA = cx + Math.sin(theta) * radius;
      const baseXB = cx - Math.sin(theta) * radius;
      
      const zA = Math.cos(theta) * radius;
      const zB = -Math.cos(theta) * radius;

      const dispA = displacementsA[i];
      let targetAX = 0;
      let targetAY = 0;
      
      if (mouse.active) {
        const distA = Math.hypot(mouse.x - (baseXA + dispA.x), mouse.y - (baseYA + dispA.y));
        if (distA < 90) {
          const force = (90 - distA) * 0.35;
          targetAX = ((baseXA + dispA.x) - mouse.x) / distA * force;
          targetAY = ((baseYA + dispA.y) - mouse.y) / distA * force;
        }
      }
      
      dispA.vx += (targetAX - dispA.x) * 0.06;
      dispA.vy += (targetAY - dispA.y) * 0.06;
      dispA.vx *= 0.86;
      dispA.vy *= 0.86;
      dispA.x += dispA.vx;
      dispA.y += dispA.vy;

      const dispB = displacementsB[i];
      let targetBX = 0;
      let targetBY = 0;
      
      if (mouse.active) {
        const distB = Math.hypot(mouse.x - (baseXB + dispB.x), mouse.y - (baseYB + dispB.y));
        if (distB < 90) {
          const force = (90 - distB) * 0.35;
          targetBX = ((baseXB + dispB.x) - mouse.x) / distB * force;
          targetBY = ((baseYB + dispB.y) - mouse.y) / distB * force;
        }
      }
      
      dispB.vx += (targetBX - dispB.x) * 0.06;
      dispB.vy += (targetBY - dispB.y) * 0.06;
      dispB.vx *= 0.86;
      dispB.vy *= 0.86;
      dispB.x += dispB.vx;
      dispB.y += dispB.vy;

      const ax = baseXA + dispA.x;
      const ay = baseYA + dispA.y;
      const bx = baseXB + dispB.x;
      const by = baseYB + dispB.y;

      ctx.save();
      const alphaFactor = (zA + radius) / (radius * 2) * 0.6 + 0.15;
      ctx.strokeStyle = 'rgba(255, 255, 255, ' + alphaFactor + ')';
      ctx.lineWidth = 2 + (zA + radius) / radius * 1.5;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
      ctx.restore();

      const sizeA = 5 + (zA + radius) / radius * 3.5;
      ctx.save();
      ctx.fillStyle = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f2fe';
      ctx.globalAlpha = 0.4 + (zA + radius) / (radius * 2) * 0.6;
      ctx.beginPath();
      ctx.arc(ax, ay, sizeA, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const sizeB = 5 + (zB + radius) / radius * 3.5;
      ctx.save();
      ctx.fillStyle = '#ff007f';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff007f';
      ctx.globalAlpha = 0.4 + (zB + radius) / (radius * 2) * 0.6;
      ctx.beginPath();
      ctx.arc(bx, by, sizeB, 0, Math.PI * 2);
      ctx.fill();
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
  css: `/* DNA Helix Synapse 404 Styles */
.dna-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #030508;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #00f2fe;
  box-sizing: border-box;
}

.dna-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
}

.dna-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 440px;
  padding: 30px;
  background: rgba(3, 5, 8, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(0, 242, 254, 0.2);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
  pointer-events: auto;
  margin-top: 160px;
}

.dna-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(0, 242, 254, 0.05);
  border: 1px solid rgba(0, 242, 254, 0.25);
  color: #00f2fe;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.dna-title {
  font-size: 90px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 8px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px #ff007f;
}

.dna-subtitle {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #00f2fe;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.dna-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #94b2c0;
  margin-bottom: 24px;
}

.dna-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid rgba(0, 242, 254, 0.45);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.dna-btn:hover {
  background: rgba(0, 242, 254, 0.1);
  border-color: #00f2fe;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.35);
  transform: translateY(-1px);
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#030508] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-[#00f2fe]" id="dna-synapse-container">
  <canvas class="absolute top-0 left-0 w-full h-full block z-[1]" id="dna-synapse-canvas"></canvas>

  <div class="relative z-[2] text-center max-w-[440px] p-[30px] bg-[#030508]/75 backdrop-blur-[14px] border border-[#00f2fe]/20 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] mt-[160px]">
    <div class="inline-block px-[10px] py-[4px] rounded-[4px] bg-[#00f2fe]/5 border border-[#00f2fe]/25 text-[#00f2fe] text-[11px] font-bold tracking-[2px] mb-[16px]">GENETIC CODE MISMATCH</div>
    <h1 class="text-[90px] font-black leading-[0.95] tracking-[-2px] mb-[8px] text-white" style="text-shadow: 0 0 10px rgba(255,255,255,0.25), 0 0 20px #ff007f;">404</h1>
    <h3 class="text-[13px] font-bold tracking-[1.5px] text-[#00f2fe] mb-[12px] uppercase">MUTATION_DETECTED: STRAND_BREAK</h3>
    <p class="text-[13.5px] leading-relaxed text-[#94b2c0] mb-[24px]">A critical genetic mutation has severed the link. Hover your observer near the helix to stretch and splice the nucleotide bonds.</p>
    <a href="#landing" class="inline-block px-[24px] py-[10px] rounded-[4px] bg-transparent border border-[#00f2fe]/45 text-white text-[13px] font-bold uppercase hover:bg-[#00f2fe]/10 hover:border-[#00f2fe] hover:shadow-[0_0_15px_rgba(0,242,254,0.35)] hover:translate-y-[-1px] transition-all duration-200">Splice Sequence</a>
  </div>
</div>`
};
