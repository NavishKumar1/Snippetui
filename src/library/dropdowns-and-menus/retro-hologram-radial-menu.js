/**
 * Component: Retro Hologram Radial Menu
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'retro-hologram-radial-menu',
  name: 'Hologram Radial Menu',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="hologram-radial-wrapper">
  <!-- Glowing trigger deck -->
  <button class="hologram-radial-trigger">
    <span class="pulse-indicator"></span>
    PROJECT GRID
  </button>
  
  <!-- Projected Hologram Core -->
  <div class="hologram-projector-ray"></div>
  <div class="radial-ring">
    <button class="radial-item" style="--a: 0deg;" title="Dashboard">🏠</button>
    <button class="radial-item" style="--a: 72deg;" title="Settings">⚙️</button>
    <button class="radial-item" style="--a: 144deg;" title="User">👤</button>
    <button class="radial-item" style="--a: 216deg;" title="Analytics">📊</button>
    <button class="radial-item" style="--a: 288deg;" title="Messages">✉️</button>
  </div>
</div>`,
  js: `// Interactive projector trigger toggle and rotation offsets
const radialWrapper = document.querySelector('.hologram-radial-wrapper');
if (radialWrapper) {
  const trigger = radialWrapper.querySelector('.hologram-radial-trigger');
  const ring = radialWrapper.querySelector('.radial-ring');
  const ray = radialWrapper.querySelector('.hologram-projector-ray');
  
  trigger.addEventListener('click', () => {
    radialWrapper.classList.toggle('active');
    
    if (radialWrapper.classList.contains('active')) {
      trigger.innerHTML = '<span class=\"pulse-indicator active\"></span>COLLAPSE';
    } else {
      trigger.innerHTML = '<span class=\"pulse-indicator\"></span>PROJECT GRID';
    }
  });

  // Slow drift spin on mouse movement
  radialWrapper.addEventListener('mousemove', (e) => {
    if (!radialWrapper.classList.contains('active')) return;
    const rect = radialWrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    
    if (ring) {
      ring.style.transform = \`translate(-50%, -50%) rotate(\${x * 35}deg) rotateX(40deg)\`;
    }
  });

  radialWrapper.addEventListener('mouseleave', () => {
    if (ring && radialWrapper.classList.contains('active')) {
      ring.style.transform = 'translate(-50%, -50%) rotate(0deg) rotateX(40deg)';
    }
  });
}`,
  ts: `// TypeScript Implementation
const radialWrapper = document.querySelector<HTMLDivElement>('.hologram-radial-wrapper');
if (radialWrapper) {
  const trigger = radialWrapper.querySelector<HTMLButtonElement>('.hologram-radial-trigger');
  const ring = radialWrapper.querySelector<HTMLDivElement>('.radial-ring');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      radialWrapper.classList.toggle('active');
      
      if (radialWrapper.classList.contains('active')) {
        trigger.innerHTML = '<span class=\"pulse-indicator active\"></span>COLLAPSE';
      } else {
        trigger.innerHTML = '<span class=\"pulse-indicator\"></span>PROJECT GRID';
      }
    });
  }

  radialWrapper.addEventListener('mousemove', (e: MouseEvent) => {
    if (!radialWrapper.classList.contains('active')) return;
    const rect = radialWrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    
    if (ring) {
      ring.style.transform = \`translate(-50%, -50%) rotate(\${x * 35}deg) rotateX(40deg)\`;
    }
  });
}`,
  css: `/* Retro Hologram Radial Menu Styles */
.hologram-radial-wrapper {
  position: relative;
  width: 260px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  box-sizing: border-box;
}

.hologram-radial-trigger {
  background: rgba(13, 13, 21, 0.9);
  border: 1px solid rgba(0, 242, 254, 0.3);
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 12px 24px;
  border-radius: 100px;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.15);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hologram-radial-trigger:hover {
  transform: scale(1.03);
  box-shadow: 0 0 25px rgba(0, 242, 254, 0.35);
}

.pulse-indicator {
  width: 6px;
  height: 6px;
  background: #ff0055;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 8px #ff0055;
}

.pulse-indicator.active {
  background: #00f2fe;
  box-shadow: 0 0 8px #00f2fe;
  animation: pulse-dot 1s infinite alternate;
}

/* Projection Light Ray cone */
.hologram-projector-ray {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 0px;
  background: linear-gradient(to top, rgba(0, 242, 254, 0.25), transparent);
  clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
  opacity: 0;
  z-index: 2;
  transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s;
  pointer-events: none;
}

.hologram-radial-wrapper.active .hologram-projector-ray {
  height: 120px;
  opacity: 1;
}

/* Radial Menu Ring */
.radial-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg) rotateX(40deg);
  width: 180px;
  height: 180px;
  border: 1px dashed rgba(0, 242, 254, 0.2);
  border-radius: 50%;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  scale: 0.5;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), scale 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.2s ease;
}

.hologram-radial-wrapper.active .radial-ring {
  opacity: 1;
  scale: 1;
  pointer-events: auto;
}

/* Individual floated items in orbital path */
.radial-item {
  position: absolute;
  width: 32px;
  height: 32px;
  background: rgba(13, 13, 21, 0.95);
  border: 1px solid rgba(0, 242, 254, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.1);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Positions elements evenly along circle border */
  top: calc(50% - 16px + 90px * sin(var(--a)));
  left: calc(50% - 16px + 90px * cos(var(--a)));
}

.radial-item:hover {
  transform: scale(1.2);
  border-color: #ffd700;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
  background: #ffd700;
  color: #020205;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] h-[260px] flex items-center justify-center">
  <button class="relative bg-[#0d0d15]/90 border border-cyan-400/30 px-6 py-3 rounded-full text-cyan-400 font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.15)] hover:scale-105 active:scale-95 transition-all">
    PROJECT GRID
  </button>
</div>`,
  prompt: `Design a premium "Retro Hologram Radial Menu" component. Clicking the central projector button releases glowing cyan laser project rays that form a floating circle array of navigation icons in rotating 3D space.`
};
