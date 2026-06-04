/**
 * Component: Neon Border Glow Draw
 * Category: buttons
 */

export const component = {
  id: 'neon-border-btn',
  name: 'Neon Border Glow Draw',
  category: 'buttons',
  tag: 'Glow',
  html: `<button class="neon-draw-button">
  <span class="draw-line draw-line-top"></span>
  <span class="draw-line draw-line-right"></span>
  <span class="draw-line draw-line-bottom"></span>
  <span class="draw-line draw-line-left"></span>
  <span class="neon-draw-label">ENTER</span>
</button>`,
  js: `// Interactive border speedup on click
const drawBtn = document.querySelector('.neon-draw-button');
if (drawBtn) {
  drawBtn.addEventListener('click', () => {
    drawBtn.querySelectorAll('.draw-line').forEach(line => {
      line.style.animationDuration = '0.4s';
    });
    setTimeout(() => {
      drawBtn.querySelectorAll('.draw-line').forEach(line => {
        line.style.animationDuration = '';
      });
    }, 1200);
  });
}`,
  ts: `// TypeScript Implementation
const drawBtn = document.querySelector<HTMLButtonElement>('.neon-draw-button');
if (drawBtn) {
  drawBtn.addEventListener('click', () => {
    drawBtn.querySelectorAll<HTMLSpanElement>('.draw-line').forEach(line => {
      line.style.animationDuration = '0.4s';
    });
    setTimeout(() => {
      drawBtn.querySelectorAll<HTMLSpanElement>('.draw-line').forEach(line => {
        line.style.animationDuration = '';
      });
    }, 1200);
  });
}`,
  css: `/* Neon Border Glow Draw Styles */
.neon-draw-button {
  background: rgba(10, 10, 15, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px 36px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.15em;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  transition: all 0.3s ease;
}

.neon-draw-label {
  position: relative;
  z-index: 5;
  transition: color 0.3s ease;
}

/* Border line definitions */
.draw-line {
  position: absolute;
  background: #00f2fe;
  box-shadow: 0 0 10px #00f2fe, 0 0 20px #8a2be2;
  transition: transform 0.3s ease;
}

/* Top line */
.draw-line-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  transform: scaleX(0);
  transform-origin: left center;
}

/* Right line */
.draw-line-right {
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  transform: scaleY(0);
  transform-origin: top center;
}

/* Bottom line */
.draw-line-bottom {
  bottom: 0;
  right: 0;
  width: 100%;
  height: 2px;
  transform: scaleX(0);
  transform-origin: right center;
}

/* Left line */
.draw-line-left {
  bottom: 0;
  left: 0;
  width: 2px;
  height: 100%;
  transform: scaleY(0);
  transform-origin: bottom center;
}

/* Hover drawing animations */
.neon-draw-button:hover {
  border-color: transparent;
  box-shadow: 0 0 25px rgba(0, 242, 254, 0.35);
}

.neon-draw-button:hover .draw-line-top {
  transform: scaleX(1);
  transition-delay: 0s;
}

.neon-draw-button:hover .draw-line-right {
  transform: scaleY(1);
  transition-delay: 0.15s;
}

.neon-draw-button:hover .draw-line-bottom {
  transform: scaleX(1);
  transition-delay: 0.3s;
}

.neon-draw-button:hover .draw-line-left {
  transform: scaleY(1);
  transition-delay: 0.45s;
}

.neon-draw-button:hover .neon-draw-label {
  color: #00f2fe;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.6);
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="bg-[#0a0a0f]/85 border border-white/5 px-9 py-4 text-white font-semibold text-sm tracking-widest cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,242,254,0.35)]">
  ENTER
</button>`,
  prompt: `Design a premium "Neon Border Glow Draw" button component. Hovering draws a fast-moving neon line sequentially along the four margins of a dark rectangular button, radiating a glowing periwinkle neon light halo around the label.`
};
