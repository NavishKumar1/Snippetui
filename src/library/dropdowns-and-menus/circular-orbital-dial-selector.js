/**
 * Component: Circular Orbital Dial Selector
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'circular-orbital-dial-selector',
  name: 'Circular Orbital Dial Selector',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="orbital-dial-wrapper">
  <!-- Interactive Trigger Center Orb -->
  <button class="orbital-trigger-orb">
    <div class="orb-inner"></div>
    <span class="orb-title">CORE</span>
  </button>
  
  <!-- Outer Cosmic Dial Systems -->
  <div class="orbital-ring-system">
    <div class="orbital-ring ring-outer"></div>
    <div class="orbital-ring ring-inner"></div>
    
    <div class="orbital-node" style="--a: 0deg;" title="Status">
      <span class="node-icon">📊</span>
    </div>
    <div class="orbital-node" style="--a: 60deg;" title="Security">
      <span class="node-icon">🛡️</span>
    </div>
    <div class="orbital-node" style="--a: 120deg;" title="Database">
      <span class="node-icon">💾</span>
    </div>
    <div class="orbital-node" style="--a: 180deg;" title="Network">
      <span class="node-icon">📡</span>
    </div>
    <div class="orbital-node" style="--a: 240deg;" title="Engines">
      <span class="node-icon">⚙️</span>
    </div>
    <div class="orbital-node" style="--a: 300deg;" title="Terminal">
      <span class="node-icon">💻</span>
    </div>
  </div>
</div>`,
  js: `// Orbital system expansion and rotation 3D parallax on mouse move
const oWrapper = document.querySelector('.orbital-dial-wrapper');
if (oWrapper) {
  const trigger = oWrapper.querySelector('.orbital-trigger-orb');
  const system = oWrapper.querySelector('.orbital-ring-system');
  const nodes = oWrapper.querySelectorAll('.orbital-node');
  
  trigger.addEventListener('click', () => {
    oWrapper.classList.toggle('active');
  });

  // 3D tilt perspective matching mouse position
  oWrapper.addEventListener('mousemove', (e) => {
    if (!oWrapper.classList.contains('active')) return;
    const rect = oWrapper.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    
    system.style.transform = \`translate(-50%, -50%) rotateX(\${-py * 30}deg) rotateY(\${px * 30}deg)\`;
  });

  oWrapper.addEventListener('mouseleave', () => {
    if (oWrapper.classList.contains('active')) {
      system.style.transform = 'translate(-50%, -50%) rotateX(0deg) rotateY(0deg)';
    }
  });

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const title = node.getAttribute('title');
      oWrapper.querySelector('.orb-title').textContent = title.toUpperCase();
      oWrapper.classList.remove('active');
    });
  });
}`,
  ts: `// TypeScript Implementation
const oWrapper = document.querySelector<HTMLDivElement>('.orbital-dial-wrapper');
if (oWrapper) {
  const trigger = oWrapper.querySelector<HTMLButtonElement>('.orbital-trigger-orb');
  const system = oWrapper.querySelector<HTMLDivElement>('.orbital-ring-system');
  const nodes = oWrapper.querySelectorAll<HTMLDivElement>('.orbital-node');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      oWrapper.classList.toggle('active');
    });
  }

  oWrapper.addEventListener('mousemove', (e: MouseEvent) => {
    if (!oWrapper.classList.contains('active') || !system) return;
    const rect = oWrapper.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    
    system.style.transform = \`translate(-50%, -50%) rotateX(\${-py * 30}deg) rotateY(\${px * 30}deg)\`;
  });

  oWrapper.addEventListener('mouseleave', () => {
    if (system && oWrapper.classList.contains('active')) {
      system.style.transform = 'translate(-50%, -50%) rotateX(0deg) rotateY(0deg)';
    }
  });

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const title = node.getAttribute('title');
      const label = oWrapper.querySelector<HTMLSpanElement>('.orb-title');
      if (label && title) {
        label.textContent = title.toUpperCase();
      }
      oWrapper.classList.remove('active');
    });
  });
}`,
  css: `/* Circular Orbital Dial Selector Styles */
.orbital-dial-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  user-select: none;
  overflow: visible;
  box-sizing: border-box;
}

.orbital-trigger-orb {
  position: relative;
  width: 64px;
  height: 64px;
  background: radial-gradient(circle, #0e1726 30%, #050a12 100%);
  border: 2px solid #00f2fe;
  border-radius: 50%;
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.08em;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.3), inset 0 0 8px rgba(0, 242, 254, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.orbital-trigger-orb:hover {
  transform: scale(1.08);
  box-shadow: 0 0 25px rgba(0, 242, 254, 0.6), inset 0 0 10px rgba(0, 242, 254, 0.3);
}

.orb-inner {
  position: absolute;
  inset: 6px;
  border: 1px dashed rgba(0, 242, 254, 0.3);
  border-radius: 50%;
  animation: orb-spin 10s infinite linear;
}

.orb-title {
  position: relative;
  z-index: 2;
  text-shadow: 0 0 6px #00f2fe;
}

/* Ring Orbit Container */
.orbital-ring-system {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg);
  width: 220px;
  height: 220px;
  border-radius: 50%;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  scale: 0.6;
  transform-style: preserve-3d;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), scale 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.25s ease-out;
}

.orbital-dial-wrapper.active .orbital-ring-system {
  opacity: 1;
  scale: 1;
  pointer-events: auto;
}

.orbital-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
}

.ring-outer {
  border: 1.5px solid rgba(0, 242, 254, 0.15);
  background: radial-gradient(circle, transparent 75%, rgba(0, 242, 254, 0.02) 100%);
}

.ring-inner {
  inset: 24px;
  border: 1px dashed rgba(255, 0, 127, 0.15);
  animation: orb-spin 20s infinite linear reverse;
}

/* Astrological Nodes Orbiting */
.orbital-node {
  position: absolute;
  width: 36px;
  height: 36px;
  background: rgba(10, 15, 30, 0.95);
  border: 1.5px solid rgba(0, 242, 254, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.1);
  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  scale: 0;
  
  /* Radial position equation */
  top: calc(50% - 18px + 100px * sin(var(--a)));
  left: calc(50% - 18px + 100px * cos(var(--a)));
}

.orbital-dial-wrapper.active .orbital-node {
  opacity: 1;
  scale: 1;
  transition-delay: calc(var(--a) * 0.0015s);
}

.orbital-node:hover {
  transform: scale(1.2) translateZ(10px);
  border-color: #ffd700;
  background: #ffd700;
  box-shadow: 0 0 18px rgba(255, 215, 0, 0.6);
}

.node-icon {
  font-size: 15px;
  transition: transform 0.3s;
}

.orbital-node:hover .node-icon {
  transform: scale(1.1);
}

@keyframes orb-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[280px] h-[280px] flex items-center justify-center select-none">
  <button class="relative w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-cyan-400 rounded-full text-cyan-400 font-bold text-[10px] tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:scale-105 active:scale-95 transition-all">
    <span>CORE</span>
  </button>
</div>`,
  prompt: `Design a premium "Circular Orbital Dial Selector" menu. The center orb triggers cosmic orbit rings that expand outward, carrying option nodes along curved mathematical angles. Parallaxes in response to mouse movement.`
};
