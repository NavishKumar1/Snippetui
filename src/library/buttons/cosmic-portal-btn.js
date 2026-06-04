/**
 * Component: Cosmic Black Hole Portal Button
 * Category: buttons
 */

export const component = {
  id: 'cosmic-portal-btn',
  name: 'Cosmic Black Hole Portal',
  category: 'buttons',
  tag: 'Creative',
  html: `<button class="cosmic-portal-btn">
  <div class="portal-blackhole">
    <div class="portal-ring portal-ring-1"></div>
    <div class="portal-ring portal-ring-2"></div>
    <div class="portal-ring portal-ring-3"></div>
  </div>
  <span class="portal-text">ENTER VOID</span>
</button>`,
  js: `// Interactive portal warp acceleration on hover
const portalBtn = document.querySelector('.cosmic-portal-btn');
if (portalBtn) {
  const rings = portalBtn.querySelectorAll('.portal-ring');
  const text = portalBtn.querySelector('.portal-text');
  
  portalBtn.addEventListener('mouseenter', () => {
    // Warp speed acceleration
    rings.forEach((ring, idx) => {
      ring.style.animationDuration = \`\${1.5 + (idx * 0.5)}s\`;
    });
    if (text) {
      text.style.transform = 'scale(0.95)';
    }
  });

  portalBtn.addEventListener('mouseleave', () => {
    // Return to standby slow stellar rotation
    rings.forEach((ring, idx) => {
      ring.style.animationDuration = \`\${4 + (idx * 1)}s\`;
    });
    if (text) {
      text.style.transform = 'scale(1)';
    }
  });
}`,
  ts: `// TypeScript Implementation
const portalBtn = document.querySelector<HTMLButtonElement>('.cosmic-portal-btn');
if (portalBtn) {
  const rings = portalBtn.querySelectorAll<HTMLDivElement>('.portal-ring');
  const text = portalBtn.querySelector<HTMLSpanElement>('.portal-text');
  
  portalBtn.addEventListener('mouseenter', () => {
    rings.forEach((ring, idx) => {
      ring.style.animationDuration = \`\${1.5 + (idx * 0.5)}s\`;
    });
    if (text) {
      text.style.transform = 'scale(0.95)';
    }
  });

  portalBtn.addEventListener('mouseleave', () => {
    rings.forEach((ring, idx) => {
      ring.style.animationDuration = \`\${4 + (idx * 1)}s\`;
    });
    if (text) {
      text.style.transform = 'scale(1)';
    }
  });
}`,
  css: `/* Cosmic Black Hole Portal Button Styles */
.cosmic-portal-btn {
  position: relative;
  background: #020108;
  border: 1px solid rgba(138, 43, 226, 0.3);
  padding: 16px 36px;
  border-radius: 100px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    inset 0 0 10px rgba(138, 43, 226, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.portal-blackhole {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  opacity: 0.5;
  transition: opacity 0.4s ease;
}

.portal-ring {
  position: absolute;
  inset: 0;
  border: 2px dashed transparent;
  border-radius: 50%;
  animation: portal-spin infinite linear;
}

.portal-ring-1 {
  border-color: rgba(138, 43, 226, 0.4);
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.15);
  animation-duration: 4s;
  padding: 10px;
}

.portal-ring-2 {
  border-color: rgba(255, 0, 127, 0.3);
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.1);
  animation-duration: 5s;
  animation-direction: reverse;
  padding: 20px;
}

.portal-ring-3 {
  border-color: rgba(0, 242, 254, 0.3);
  box-shadow: 0 0 25px rgba(0, 242, 254, 0.1);
  animation-duration: 6s;
  padding: 30px;
}

.portal-text {
  position: relative;
  z-index: 3;
  display: inline-block;
  color: #d8bfd8;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.4);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Hover active interactions */
.cosmic-portal-btn:hover {
  border-color: rgba(138, 43, 226, 0.8);
  box-shadow: 
    0 10px 30px rgba(138, 43, 226, 0.4),
    0 0 20px rgba(255, 0, 127, 0.2),
    inset 0 0 20px rgba(138, 43, 226, 0.2);
  transform: translateY(-2px);
}

.cosmic-portal-btn:hover .portal-blackhole {
  opacity: 0.95;
}

.cosmic-portal-btn:hover .portal-text {
  color: #ffffff;
  text-shadow: 
    0 0 10px #ffffff,
    0 0 20px #8a2be2,
    0 0 30px #ff007f;
}

.cosmic-portal-btn:active {
  transform: translateY(1px);
}

@keyframes portal-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#020108] border border-purple-600/30 px-9 py-4 rounded-full cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:border-purple-600/80 hover:shadow-[0_10px_30px_rgba(138,43,226,0.4)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#d8bfd8] font-bold text-xs tracking-[0.2em] [text-shadow:0_0_10px_rgba(138,43,226,0.4)]">ENTER VOID</span>
</button>`,
  prompt: `Design a premium "Cosmic Black Hole Portal Button" component. A circular dark-nebula capsule layout shows overlapping glowing gravity rings colored in purple and hot-pink rotating in opposite coordinates. Hovering accelerates the spin orbits while slightly contracting the typography as if pulled by gravity.`
};
