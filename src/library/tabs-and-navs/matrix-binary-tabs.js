/**
 * Component: Matrix Binary Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'matrix-binary-tabs',
  name: 'Matrix Binary Tabs',
  category: 'tabs-and-navs',
  tag: 'Creative',
  html: `<div class="matrix-tabs-sandbox" id="matrix-tabs-container">
  <div class="matrix-nav">
    <canvas class="matrix-canvas"></canvas>
    <button class="matrix-tab-btn active" data-index="0">NEO</button>
    <button class="matrix-tab-btn" data-index="1">TRINITY</button>
    <button class="matrix-tab-btn" data-index="2">MORPHEUS</button>
  </div>
</div>`,
  js: `// Matrix digital binary code rain simulator inside tabs
const container = document.getElementById('matrix-tabs-container');
if (container) {
  const canvas = container.querySelector('.matrix-canvas');
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.matrix-tab-btn');
  const nav = container.querySelector('.matrix-nav');
  
  let animId = null;
  let targetX = 0;
  let targetWidth = 0;
  let currentX = 0;
  let currentWidth = 0;

  const resize = () => {
    canvas.width = nav.clientWidth;
    canvas.height = nav.clientHeight;
    updateTargets();
    currentX = targetX;
    currentWidth = targetWidth;
  };

  const updateTargets = () => {
    const active = container.querySelector('.matrix-tab-btn.active');
    if (active) {
      targetX = active.offsetLeft;
      targetWidth = active.clientWidth;
    }
  };

  const binaryStreams = [];
  const streamCount = 12;

  for (let i = 0; i < streamCount; i++) {
    binaryStreams.push({
      x: Math.random() * 260,
      y: Math.random() * -30,
      speed: Math.random() * 2 + 1.5,
      char: Math.random() > 0.5 ? '1' : '0',
      opacity: Math.random() * 0.5 + 0.3
    });
  }

  const animate = () => {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const lerpSpeed = 0.09;
    currentX += (targetX - currentX) * lerpSpeed;
    currentWidth += (targetWidth - currentWidth) * lerpSpeed;

    // Draw active background area bounding box
    ctx.save();
    ctx.strokeStyle = 'rgba(57, 255, 20, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(57, 255, 20, 0.05)';
    ctx.beginPath();
    ctx.roundRect(currentX, 4, currentWidth, canvas.height - 8, 4);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Render binary falling rain clipped inside the active bounding box
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(currentX, 4, currentWidth, canvas.height - 8, 4);
    ctx.clip();

    ctx.font = '7.5px "Fira Code", monospace';
    ctx.fillStyle = '#39ff14';

    binaryStreams.forEach(stream => {
      // Pull stream X coordinates into current bounding box domain
      const relativeX = currentX + (stream.x % currentWidth);
      
      stream.y += stream.speed;
      if (stream.y > canvas.height) {
        stream.y = Math.random() * -10;
        stream.char = Math.random() > 0.5 ? '1' : '0';
      }

      ctx.save();
      ctx.globalAlpha = stream.opacity;
      ctx.fillText(stream.char, relativeX, stream.y);
      ctx.restore();
    });

    ctx.restore();

    animId = requestAnimationFrame(animate);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateTargets();
    });
  });

  resize();
  window.addEventListener('resize', resize);
  animate();
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('matrix-tabs-container') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.matrix-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const buttons = container.querySelectorAll('.matrix-tab-btn');
  const nav = container.querySelector('.matrix-nav') as HTMLDivElement;
  
  if (ctx) {
    let animId: number;
    let targetX = 0;
    let targetWidth = 0;
    let currentX = 0;
    let currentWidth = 0;

    const resize = () => {
      canvas.width = nav.clientWidth;
      canvas.height = nav.clientHeight;
      updateTargets();
      currentX = targetX;
      currentWidth = targetWidth;
    };

    const updateTargets = () => {
      const active = container.querySelector('.matrix-tab-btn.active') as HTMLButtonElement | null;
      if (active) {
        targetX = active.offsetLeft;
        targetWidth = active.clientWidth;
      }
    };

    interface Stream {
      x: number;
      y: number;
      speed: number;
      char: string;
      opacity: number;
    }

    const binaryStreams: Stream[] = [];
    const streamCount = 12;

    for (let i = 0; i < streamCount; i++) {
      binaryStreams.push({
        x: Math.random() * 260,
        y: Math.random() * -30,
        speed: Math.random() * 2 + 1.5,
        char: Math.random() > 0.5 ? '1' : '0',
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const lerpSpeed = 0.09;
      currentX += (targetX - currentX) * lerpSpeed;
      currentWidth += (targetWidth - currentWidth) * lerpSpeed;

      ctx.save();
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.fillStyle = 'rgba(57, 255, 20, 0.05)';
      ctx.beginPath();
      ctx.roundRect(currentX, 4, currentWidth, canvas.height - 8, 4);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(currentX, 4, currentWidth, canvas.height - 8, 4);
      ctx.clip();

      ctx.font = '7.5px "Fira Code", monospace';
      ctx.fillStyle = '#39ff14';

      binaryStreams.forEach(stream => {
        const relativeX = currentX + (stream.x % currentWidth);
        
        stream.y += stream.speed;
        if (stream.y > canvas.height) {
          stream.y = Math.random() * -10;
          stream.char = Math.random() > 0.5 ? '1' : '0';
        }

        ctx.save();
        ctx.globalAlpha = stream.opacity;
        ctx.fillText(stream.char, relativeX, stream.y);
        ctx.restore();
      });

      ctx.restore();

      animId = requestAnimationFrame(animate);
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => (b as HTMLElement).classList.remove('active'));
        btn.classList.add('active');
        updateTargets();
      });
    });

    resize();
    window.addEventListener('resize', resize);
    animate();
  }
}`,
  css: `/* Matrix Binary Tabs style */
.matrix-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #051405 0%, #010501 100%);
  border: 1px solid rgba(57, 255, 20, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.matrix-nav {
  position: relative;
  display: flex;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(57, 255, 20, 0.2);
  border-radius: 6px;
  padding: 4px;
  gap: 4px;
  z-index: 1;
}

.matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

.matrix-tab-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 24px;
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  font-weight: 700;
  color: rgba(57, 255, 20, 0.5);
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s ease;
  letter-spacing: 0.5px;
}

.matrix-tab-btn.active {
  color: #39ff14;
  text-shadow: 0 0 8px rgba(57, 255, 20, 0.6);
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#051405] to-[#010501] border border-green-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="matrix-tabs-container">
  <div class="matrix-nav relative flex bg-black/70 border border-green-500/20 rounded-lg p-1 gap-1 z-10">
    <canvas class="matrix-canvas absolute top-0 left-0 pointer-events-none z-10"></canvas>
    <button class="matrix-tab-btn active relative bg-transparent border-none px-6 py-2.5 font-mono text-[11px] font-bold text-green-500/50 cursor-pointer z-20 transition [&.active]:text-[#39ff14]" data-index="0">NEO</button>
    <button class="matrix-tab-btn relative bg-transparent border-none px-6 py-2.5 font-mono text-[11px] font-bold text-green-500/50 cursor-pointer z-20 transition [&.active]:text-[#39ff14]" data-index="1">TRINITY</button>
    <button class="matrix-tab-btn relative bg-transparent border-none px-6 py-2.5 font-mono text-[11px] font-bold text-green-500/50 cursor-pointer z-20 transition [&.active]:text-[#39ff14]" data-index="2">MORPHEUS</button>
  </div>
</div>`,
  prompt: 'Design a matrix digital rain selector bar navigation component with code dropping inside the active tabs.'
};
component.html = component.html.replace('class="matrix-tab-btn active"', 'class="matrix-tab-btn active"');
