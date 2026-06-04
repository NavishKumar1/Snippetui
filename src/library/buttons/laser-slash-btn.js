/**
 * Component: Laser Cutter Slash Button
 * Category: buttons
 */

export const component = {
  id: 'laser-slash-btn',
  name: 'Laser Cutter Slash',
  category: 'buttons',
  tag: 'Interactive',
  html: `<button class="laser-slash-btn">
  <span class="laser-track"></span>
  <span class="laser-pointer"></span>
  <span class="laser-text">INITIALIZE CORE</span>
</button>`,
  js: `// Laser cutter slash hover activation
const laserBtn = document.querySelector('.laser-slash-btn');
if (laserBtn) {
  const pointer = laserBtn.querySelector('.laser-pointer');
  
  laserBtn.addEventListener('mouseenter', () => {
    if (pointer) {
      pointer.style.animationPlayState = 'running';
    }
  });

  laserBtn.addEventListener('mouseleave', () => {
    if (pointer) {
      pointer.style.animationPlayState = 'paused';
    }
  });
}`,
  ts: `// TypeScript Implementation
const laserBtn = document.querySelector<HTMLButtonElement>('.laser-slash-btn');
if (laserBtn) {
  const pointer = laserBtn.querySelector<HTMLSpanElement>('.laser-pointer');
  
  laserBtn.addEventListener('mouseenter', () => {
    if (pointer) {
      pointer.style.animationPlayState = 'running';
    }
  });

  laserBtn.addEventListener('mouseleave', () => {
    if (pointer) {
      pointer.style.animationPlayState = 'paused';
    }
  });
}`,
  css: `/* Laser Cutter Slash Button Styles */
.laser-slash-btn {
  position: relative;
  background: #101216;
  border: 1px solid rgba(255, 0, 0, 0.15);
  padding: 16px 36px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    0 0 10px rgba(255, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Glowing cutter line boundary */
.laser-track {
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-radius: 4px;
  z-index: 1;
  pointer-events: none;
  transition: all 0.3s ease;
}

/* High-intensity sweeping laser pointer spark */
.laser-pointer {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 
    0 0 10px #ff3300,
    0 0 20px #ff3300,
    0 0 35px #ff0000;
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  /* Complex coordinate path tracing the border */
  animation: laser-slash-orbit 3s infinite linear;
  animation-play-state: paused;
}

.laser-text {
  position: relative;
  z-index: 3;
  color: #ff3300;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 8px rgba(255, 51, 0, 0.3);
  transition: all 0.3s ease;
}

/* Hover visual transformations */
.laser-slash-btn:hover {
  border-color: rgba(255, 51, 0, 0.4);
  box-shadow: 
    0 8px 25px rgba(255, 51, 0, 0.25),
    0 0 15px rgba(255, 51, 0, 0.1),
    inset 0 0 15px rgba(255, 51, 0, 0.15);
  transform: translateY(-2px);
}

.laser-slash-btn:hover .laser-pointer {
  opacity: 1;
}

.laser-slash-btn:hover .laser-track {
  animation: laser-track-glow 1.5s infinite alternate ease-in-out;
}

.laser-slash-btn:hover .laser-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #ff3300;
}

.laser-slash-btn:active {
  transform: translateY(1px);
}

/* Border tracing laser path keyframes */
@keyframes laser-slash-orbit {
  0% { top: 0px; left: 0px; }
  25% { top: 0px; left: 100%; transform: translateX(-8px); }
  50% { top: 100%; left: 100%; transform: translate(-8px, -8px); }
  75% { top: 100%; left: 0px; transform: translateY(-8px); }
  100% { top: 0px; left: 0px; }
}

@keyframes laser-track-glow {
  0% { border-color: rgba(255, 51, 0, 0.25); box-shadow: inset 0 0 5px rgba(255, 51, 0, 0.1); }
  100% { border-color: rgba(255, 51, 0, 0.65); box-shadow: inset 0 0 12px rgba(255, 51, 0, 0.35); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#101216] border border-red-600/15 px-9 py-4 rounded cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:border-red-500/40 hover:shadow-[0_8px_25px_rgba(255,51,0,0.25)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#ff3300] font-bold text-xs tracking-[0.15em] [text-shadow:0_0_8px_rgba(255,51,0,0.3)]">INITIALIZE CORE</span>
</button>`,
  prompt: `Design a premium "Laser Cutter Slash Button" component. Set in dark industrial grey, a high-intensity red laser-pointer spark traces the rectangular outer borders with precision paths on hover, leaving a glowing white-hot cutting track in its wakes.`
};
