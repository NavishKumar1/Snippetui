/**
 * Component: Matrix Stream Select
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'matrix-stream-select',
  name: 'Matrix Stream Select',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="mx-select-wrapper">
  <!-- Code Prompt Trigger -->
  <button class="mx-trigger">
    <span>DECRYPT STREAM</span>
    <span class="mx-indicator">■</span>
  </button>
  
  <!-- Falling matrix lines dropdown menu -->
  <div class="mx-menu">
    <div class="mx-canvas-container">
      <canvas class="mx-stream-canvas"></canvas>
    </div>
    <div class="mx-contents">
      <div class="mx-item" style="--i: 0;">
        <span class="mx-prompt">> </span>
        <span class="mx-label">Kernel Node A</span>
      </div>
      <div class="mx-item" style="--i: 1;">
        <span class="mx-prompt">> </span>
        <span class="mx-label">Decrypt Hack B</span>
      </div>
      <div class="mx-item" style="--i: 2;">
        <span class="mx-prompt">> </span>
        <span class="mx-label">Access Terminal C</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Digital falling code rain rendering inside background Canvas on active toggle
const mxWrapper = document.querySelector('.mx-select-wrapper');
if (mxWrapper) {
  const trigger = mxWrapper.querySelector('.mx-trigger');
  const menu = mxWrapper.querySelector('.mx-menu');
  const canvas = mxWrapper.querySelector('.mx-stream-canvas');
  const ctx = canvas.getContext('2d');
  const items = mxWrapper.querySelectorAll('.mx-item');
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    canvas.width = menu.clientWidth || 270;
    canvas.height = 140;
  };
  resizeCanvas();
  
  trigger.addEventListener('click', () => {
    mxWrapper.classList.toggle('active');
    isOpen = mxWrapper.classList.contains('active');
    if (isOpen) {
      resizeCanvas();
    }
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('.mx-label').textContent;
      trigger.querySelector('span').textContent = text.toUpperCase();
      mxWrapper.classList.remove('active');
      isOpen = false;
    });
  });

  document.addEventListener('click', (e) => {
    if (!mxWrapper.contains(e.target)) {
      mxWrapper.classList.remove('active');
      isOpen = false;
    }
  });

  // Matrix Stream Math Model
  const columns = 20;
  const fontSize = 10;
  const drops = Array(columns).fill(0);
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$%#@&';
  
  let animId;
  const draw = () => {
    if (!mxWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    // Translucent black clear to create tail trails
    ctx.fillStyle = 'rgba(2, 6, 3, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      ctx.fillStyle = '#00ff46';
      ctx.font = \`\${fontSize}px monospace\`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = (i * canvas.width) / columns;
        const y = drops[i] * fontSize;
        
        ctx.fillText(char, x, y);
        
        // Random reset to create staggered falling
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const mxWrapper = document.querySelector<HTMLDivElement>('.mx-select-wrapper');
if (mxWrapper) {
  const trigger = mxWrapper.querySelector<HTMLButtonElement>('.mx-trigger');
  const menu = mxWrapper.querySelector<HTMLDivElement>('.mx-menu');
  const canvas = mxWrapper.querySelector<HTMLCanvasElement>('.mx-stream-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const items = mxWrapper.querySelectorAll<HTMLDivElement>('.mx-item');
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    if (canvas && menu) {
      canvas.width = menu.clientWidth || 270;
      canvas.height = 140;
    }
  };
  resizeCanvas();
  
  if (trigger && menu) {
    trigger.addEventListener('click', () => {
      mxWrapper.classList.toggle('active');
      isOpen = mxWrapper.classList.contains('active');
      if (isOpen) {
        resizeCanvas();
      }
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const labelEl = item.querySelector<HTMLSpanElement>('.mx-label');
      const text = labelEl ? labelEl.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span') : null;
      if (label && text) {
        label.textContent = text.toUpperCase();
      }
      mxWrapper.classList.remove('active');
      isOpen = false;
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (mxWrapper && !mxWrapper.contains(e.target as Node)) {
      mxWrapper.classList.remove('active');
      isOpen = false;
    }
  });

  const columns = 20;
  const fontSize = 10;
  const drops = Array(columns).fill(0);
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$%#@&';
  
  let animId: number;
  const draw = () => {
    if (!mxWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.fillStyle = 'rgba(2, 6, 3, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      ctx.fillStyle = '#00ff46';
      ctx.font = \`\${fontSize}px monospace\`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = (i * canvas.width) / columns;
        const y = drops[i] * fontSize;
        
        ctx.fillText(char, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Matrix Stream Select Styles */
.mx-select-wrapper {
  position: relative;
  width: 270px;
  font-family: 'Courier New', Courier, monospace;
  user-select: none;
}

.mx-trigger {
  width: 100%;
  padding: 14px 20px;
  background: #020603;
  border: 1.5px solid rgba(0, 255, 70, 0.25);
  border-radius: 4px;
  color: #00ff46;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(0, 255, 70, 0.1);
  text-shadow: 0 0 4px rgba(0, 255, 70, 0.5);
  transition: all 0.3s;
}

.mx-trigger:hover {
  border-color: #00ff46;
  box-shadow: 0 0 15px rgba(0, 255, 70, 0.3);
}

.mx-indicator {
  font-size: 9px;
  color: #ff0055;
  text-shadow: 0 0 4px rgba(255,0,85,0.6);
  animation: mx-cursor-blink 1s infinite alternate;
}

/* Phosphor green screen dropdown menu panel */
.mx-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: #020603;
  border: 1.5px solid rgba(0, 255, 70, 0.2);
  border-radius: 4px;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
  overflow: hidden;
}

.mx-select-wrapper.active .mx-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  border-color: #00ff46;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 255, 70, 0.15);
}

.mx-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.mx-stream-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.mx-contents {
  position: relative;
  z-index: 2;
  padding: 8px;
  background: rgba(2, 6, 3, 0.85);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* Horizontal slide items */
.mx-item {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  color: rgba(0, 255, 70, 0.7);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 2px;
  opacity: 0;
  transform: translateX(15px);
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.15s, color 0.15s;
  transition-delay: calc(var(--i) * 0.05s);
}

.mx-select-wrapper.active .mx-item {
  opacity: 1;
  transform: translateX(0);
}

.mx-prompt {
  color: #ff0055;
  text-shadow: 0 0 3px rgba(255, 0, 85, 0.5);
  margin-right: 8px;
}

.mx-item:hover {
  background: rgba(0, 255, 70, 0.08);
  color: #00ff46;
  text-shadow: 0 0 4px rgba(0, 255, 70, 0.8);
}

.mx-item:hover .mx-prompt {
  color: #00ff46;
  text-shadow: 0 0 4px #00ff46;
}

@keyframes mx-cursor-blink {
  to { opacity: 0.1; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[270px] font-mono select-none">
  <button class="w-full px-5 py-4 bg-[#020603] border border-green-500 rounded text-green-400 font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:border-green-400 hover:shadow-[0_0_15px_rgba(0,255,70,0.3)] transition-all">
    <span>DECRYPT STREAM</span>
    <span class="text-rose-500 font-bold">■</span>
  </button>
</div>`,
  prompt: `Design a premium "Matrix Stream Select" menu. Toggling runs digital green matrix code rain behind frosted glass panels, while option capsules slide in from the right to overlap the code streams.`
};
