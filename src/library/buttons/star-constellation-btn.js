/**
 * Component: Star Constellation Vector Button
 * Category: buttons
 */

export const component = {
  id: 'star-constellation-btn',
  name: 'Star Constellation',
  category: 'buttons',
  tag: 'Stunning',
  html: `<div class="constellation-btn-wrapper">
  <button class="star-constellation-btn">
    <div class="star-nodes-canvas">
      <span class="star star-1" style="top: 20%; left: 20%;"></span>
      <span class="star star-2" style="top: 35%; left: 50%;"></span>
      <span class="star star-3" style="top: 75%; left: 30%;"></span>
      <span class="star star-4" style="top: 80%; left: 70%;"></span>
      <span class="star star-5" style="top: 25%; left: 80%;"></span>
      
      <!-- Connective SVG path strings -->
      <svg class="constellation-lines-svg">
        <line class="c-line l-1" x1="20%" y1="20%" x2="50%" y2="35%"></line>
        <line class="c-line l-2" x1="50%" y1="35%" x2="30%" y2="75%"></line>
        <line class="c-line l-3" x1="50%" y1="35%" x2="70%" y2="80%"></line>
        <line class="c-line l-4" x1="50%" y1="35%" x2="80%" y2="25%"></line>
      </svg>
    </div>
    <span class="constellation-btn-label">CHART STELLAR</span>
  </button>
</div>`,
  js: `// Star constellation nodes illumination and path tracking on hover
const constBtn = document.querySelector('.star-constellation-btn');
if (constBtn) {
  const stars = constBtn.querySelectorAll('.star');
  const lines = constBtn.querySelectorAll('.c-line');

  constBtn.addEventListener('mouseenter', () => {
    stars.forEach(star => {
      star.style.boxShadow = '0 0 10px #ffffff, 0 0 15px #00f2fe';
      star.style.background = '#ffffff';
    });

    lines.forEach(line => {
      line.style.strokeDashoffset = '0';
      line.style.stroke = 'rgba(0, 242, 254, 0.4)';
    });
  });

  constBtn.addEventListener('mouseleave', () => {
    stars.forEach(star => {
      star.style.boxShadow = 'none';
      star.style.background = 'rgba(255, 255, 255, 0.2)';
    });

    lines.forEach(line => {
      line.style.strokeDashoffset = '100';
      line.style.stroke = 'rgba(255, 255, 255, 0.03)';
    });
  });
}`,
  ts: `// TypeScript Implementation
const constBtn = document.querySelector<HTMLButtonElement>('.star-constellation-btn');
if (constBtn) {
  const stars = constBtn.querySelectorAll<HTMLSpanElement>('.star');
  const lines = constBtn.querySelectorAll<SVGLineElement>('.c-line');

  constBtn.addEventListener('mouseenter', () => {
    stars.forEach(star => {
      star.style.boxShadow = '0 0 10px #ffffff, 0 0 15px #00f2fe';
      star.style.background = '#ffffff';
    });

    lines.forEach(line => {
      line.style.strokeDashoffset = '0';
      line.style.stroke = 'rgba(0, 242, 254, 0.4)';
    });
  });

  constBtn.addEventListener('mouseleave', () => {
    stars.forEach(star => {
      star.style.boxShadow = 'none';
      star.style.background = 'rgba(255, 255, 255, 0.2)';
    });

    lines.forEach(line => {
      line.style.strokeDashoffset = '100';
      line.style.stroke = 'rgba(255, 255, 255, 0.03)';
    });
  });
}`,
  css: `/* Star Constellation Vector Button Styles */
.constellation-btn-wrapper {
  position: relative;
  display: inline-block;
}

.star-constellation-btn {
  background: #020205;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  padding: 16px 36px;
  border-radius: 100px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  position: relative;
  box-shadow: 
    0 10px 25px -5px rgba(0,0,0,0.8),
    inset 0 1px 0 rgba(255,255,255,0.03);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.constellation-btn-label {
  position: relative;
  z-index: 4;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  transition: text-shadow 0.3s;
}

.star-constellation-btn:hover {
  border-color: rgba(0, 242, 254, 0.3);
  transform: translateY(-2px);
  box-shadow: 
    0 15px 30px -5px rgba(0, 0, 0, 0.9),
    0 0 20px rgba(0, 242, 254, 0.12);
}

.star-constellation-btn:hover .constellation-btn-label {
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}

/* Star nodes viewport elements */
.star-nodes-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.star-constellation-btn:hover .star-nodes-canvas {
  opacity: 1;
}

.star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  transition: all 0.3s;
}

.constellation-lines-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.c-line {
  stroke: rgba(255, 255, 255, 0.03);
  stroke-width: 1px;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), stroke 0.3s;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-block">
  <button class="relative bg-[#020205] border border-white/10 px-9 py-4 rounded-full text-white font-bold text-xs tracking-widest hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
    CHART STELLAR
  </button>
</div>`,
  prompt: `Design a premium "Star Constellation Vector Button" component. Encased in a deep indigo space field. On hover, glowing stars light up and link pathways trace bright constellation links that illuminate dynamically.`
};
