/**
 * Component: Ethereal Vapor Smoke Button
 * Category: buttons
 */

export const component = {
  id: 'ethereal-smoke-btn',
  name: 'Ethereal Smoke',
  category: 'buttons',
  tag: 'Stunning',
  html: `<div class="smoke-btn-wrapper">
  <div class="smoke-canvas-container"></div>
  <button class="ethereal-smoke-btn">
    <span class="smoke-btn-label">CONJURE VAPOR</span>
  </button>
</div>`,
  js: `// Interactive gas smoke curls emitted on cursor hover
const smokeWrapper = document.querySelector('.smoke-btn-wrapper');
if (smokeWrapper) {
  const btn = smokeWrapper.querySelector('.ethereal-smoke-btn');
  const canvas = smokeWrapper.querySelector('.smoke-canvas-container');
  let smokeInterval = null;

  const spawnSmoke = (e) => {
    if (!canvas) return;
    const rect = btn.getBoundingClientRect();
    
    // Position smoke close to hover points
    const x = e ? (e.clientX - rect.left) : (rect.width / 2);
    const y = e ? (e.clientY - rect.top) : (rect.height / 2);
    
    for (let i = 0; i < 3; i++) {
      const wisp = document.createElement('span');
      wisp.className = 'smoke-wisp';
      
      const size = 15 + Math.random() * 25;
      const angle = Math.random() * Math.PI * 2;
      const distance = 10 + Math.random() * 20;
      const dx = Math.cos(angle) * distance;
      const dy = -40 - Math.random() * 40; // upward drift
      
      wisp.style.width = \`\${size}px\`;
      wisp.style.height = \`\${size}px\`;
      wisp.style.left = \`\${x}px\`;
      wisp.style.top = \`\${y}px\`;
      wisp.style.setProperty('--dx', \`\${dx}px\`);
      wisp.style.setProperty('--dy', \`\${dy}px\`);
      
      const colors = ['rgba(0, 242, 254, 0.4)', 'rgba(138, 43, 226, 0.4)', 'rgba(79, 172, 254, 0.3)'];
      wisp.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      canvas.appendChild(wisp);
      setTimeout(() => wisp.remove(), 1200);
    }
  };

  btn.addEventListener('mousemove', (e) => {
    spawnSmoke(e);
  });

  btn.addEventListener('mouseenter', () => {
    smokeInterval = setInterval(() => spawnSmoke(null), 250);
  });

  btn.addEventListener('mouseleave', () => {
    if (smokeInterval) clearInterval(smokeInterval);
  });
}`,
  ts: `// TypeScript Implementation
const smokeWrapper = document.querySelector<HTMLDivElement>('.smoke-btn-wrapper');
if (smokeWrapper) {
  const btn = smokeWrapper.querySelector<HTMLButtonElement>('.ethereal-smoke-btn');
  const canvas = smokeWrapper.querySelector<HTMLDivElement>('.smoke-canvas-container');
  let smokeInterval: any = null;

  const spawnSmoke = (e?: MouseEvent) => {
    if (!canvas || !btn) return;
    const rect = btn.getBoundingClientRect();
    
    const x = e ? (e.clientX - rect.left) : (rect.width / 2);
    const y = e ? (e.clientY - rect.top) : (rect.height / 2);
    
    for (let i = 0; i < 3; i++) {
      const wisp = document.createElement('span');
      wisp.className = 'smoke-wisp';
      
      const size = 15 + Math.random() * 25;
      const angle = Math.random() * Math.PI * 2;
      const distance = 10 + Math.random() * 20;
      const dx = Math.cos(angle) * distance;
      const dy = -40 - Math.random() * 40;
      
      wisp.style.width = \`\${size}px\`;
      wisp.style.height = \`\${size}px\`;
      wisp.style.left = \`\${x}px\`;
      wisp.style.top = \`\${y}px\`;
      wisp.style.setProperty('--dx', \`\${dx}px\`);
      wisp.style.setProperty('--dy', \`\${dy}px\`);
      
      const colors = ['rgba(0, 242, 254, 0.4)', 'rgba(138, 43, 226, 0.4)', 'rgba(79, 172, 254, 0.3)'];
      wisp.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      canvas.appendChild(wisp);
      setTimeout(() => wisp.remove(), 1200);
    }
  };

  if (btn) {
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      spawnSmoke(e);
    });

    btn.addEventListener('mouseenter', () => {
      smokeInterval = setInterval(() => spawnSmoke(), 250);
    });

    btn.addEventListener('mouseleave', () => {
      if (smokeInterval) clearInterval(smokeInterval);
    });
  }
}`,
  css: `/* Ethereal Vapor Smoke Button Styles */
.smoke-btn-wrapper {
  position: relative;
  display: inline-block;
  overflow: visible;
}

.ethereal-smoke-btn {
  background: rgba(13, 13, 21, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 36px;
  border-radius: 100px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
  outline: none;
  position: relative;
  z-index: 5;
  backdrop-filter: blur(8px);
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255,255,255,0.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.smoke-btn-label {
  position: relative;
  z-index: 6;
  background: linear-gradient(135deg, #ffffff 40%, rgba(255,255,255,0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: letter-spacing 0.3s ease;
}

.ethereal-smoke-btn:hover {
  border-color: rgba(0, 242, 254, 0.3);
  transform: translateY(-2px);
  box-shadow: 
    0 15px 30px -5px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(0, 242, 254, 0.15);
}

.ethereal-smoke-btn:hover .smoke-btn-label {
  letter-spacing: 0.22em;
}

/* Smoke particles styling */
.smoke-canvas-container {
  position: absolute;
  inset: -40px;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
}

.smoke-wisp {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(8px);
  transform: translate(-50%, -50%) scale(1);
  animation: smoke-drift-dissipate 1.2s cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
}

@keyframes smoke-drift-dissipate {
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0.8;
  }
  100% {
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(2.2);
    opacity: 0;
    filter: blur(16px);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-block">
  <button class="relative bg-[#0d0d15]/85 border border-white/10 px-9 py-4 rounded-full text-white font-bold text-xs tracking-widest hover:-translate-y-0.5 active:translate-y-0.25 hover:shadow-lg transition-all duration-300">
    CONJURE VAPOR
  </button>
</div>`,
  prompt: `Design an ultra-premium "Ethereal Vapor Smoke Button" component. Encased in a deep, translucent glass capsule. On hover, gorgeous organic curls of cyan and purple smoke float upwards from the borders, twisting and fading dynamically inside the bounding box.`
};
