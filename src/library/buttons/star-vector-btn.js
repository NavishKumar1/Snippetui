/**
 * Component: Constellation Star Vector Button
 * Category: buttons
 */

export const component = {
  id: 'star-vector-btn',
  name: 'Constellation Star Vector',
  category: 'buttons',
  tag: 'Interactive',
  html: `<button class="star-vector-btn">
  <svg class="constellation-svg" width="100%" height="100%">
    <!-- Dynamic connection lines drawn via JS -->
    <line class="constell-line line-1" x1="20%" y1="30%" x2="50%" y2="50%" />
    <line class="constell-line line-2" x1="80%" y1="70%" x2="50%" y2="50%" />
    <line class="constell-line line-3" x1="50%" y1="15%" x2="50%" y2="50%" />
  </svg>
  
  <span class="star-node node-1" style="left: 20%; top: 30%;"></span>
  <span class="star-node node-2" style="left: 80%; top: 70%;"></span>
  <span class="star-node node-3" style="left: 50%; top: 15%;"></span>
  <span class="star-node cursor-node"></span>

  <span class="constell-text">CONNECT STARS</span>
</button>`,
  js: `// Interactive Constellation line drawing to cursor coords
const constellBtn = document.querySelector('.star-vector-btn');
if (constellBtn) {
  const line1 = constellBtn.querySelector('.line-1');
  const line2 = constellBtn.querySelector('.line-2');
  const line3 = constellBtn.querySelector('.line-3');
  const cursorNode = constellBtn.querySelector('.cursor-node');
  const lines = [line1, line2, line3];
  
  constellBtn.addEventListener('mousemove', (e) => {
    const rect = constellBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Position cursor helper node
    if (cursorNode) {
      cursorNode.style.left = \`\${x}px\`;
      cursorNode.style.top = \`\${y}px\`;
      cursorNode.style.opacity = '1';
    }
    
    // Draw SVG vectors connecting nodes to mouse
    lines.forEach((line) => {
      if (line) {
        line.setAttribute('x2', \`\${x}px\`);
        line.setAttribute('y2', \`\${y}px\`);
        line.style.opacity = '0.5';
      }
    });
  });

  constellBtn.addEventListener('mouseleave', () => {
    // Reset vectors to center
    const rect = constellBtn.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    
    if (cursorNode) cursorNode.style.opacity = '0';
    
    lines.forEach((line) => {
      if (line) {
        line.style.transition = 'all 0.5s ease';
        line.setAttribute('x2', \`\${cx}px\`);
        line.setAttribute('y2', \`\${cy}px\`);
        line.style.opacity = '0.15';
      }
    });
  });
  
  constellBtn.addEventListener('mouseenter', () => {
    lines.forEach((line) => {
      if (line) line.style.transition = 'none';
    });
  });
}`,
  ts: `// TypeScript Implementation
const constellBtn = document.querySelector<HTMLButtonElement>('.star-vector-btn');
if (constellBtn) {
  const line1 = constellBtn.querySelector<SVGLineElement>('.line-1');
  const line2 = constellBtn.querySelector<SVGLineElement>('.line-2');
  const line3 = constellBtn.querySelector<SVGLineElement>('.line-3');
  const cursorNode = constellBtn.querySelector<HTMLSpanElement>('.cursor-node');
  const lines = [line1, line2, line3];
  
  constellBtn.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = constellBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (cursorNode) {
      cursorNode.style.left = \`\${x}px\`;
      cursorNode.style.top = \`\${y}px\`;
      cursorNode.style.opacity = '1';
    }
    
    lines.forEach((line) => {
      if (line) {
        line.setAttribute('x2', \`\${x}px\`);
        line.setAttribute('y2', \`\${y}px\`);
        line.style.opacity = '0.5';
      }
    });
  });

  constellBtn.addEventListener('mouseleave', () => {
    const rect = constellBtn.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    
    if (cursorNode) cursorNode.style.opacity = '0';
    
    lines.forEach((line) => {
      if (line) {
        line.style.transition = 'all 0.5s ease';
        line.setAttribute('x2', \`\${cx}px\`);
        line.setAttribute('y2', \`\${cy}px\`);
        line.style.opacity = '0.15';
      }
    });
  });
  
  constellBtn.addEventListener('mouseenter', () => {
    lines.forEach((line) => {
      if (line) line.style.transition = 'none';
    });
  });
}`,
  css: `/* Constellation Star Vector Button Styles */
.star-vector-btn {
  position: relative;
  background: #020308;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 16px 36px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    0 0 10px rgba(0, 242, 254, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.constellation-svg {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* Glowing star vector lines */
.constell-line {
  stroke: #00f2fe;
  stroke-width: 1px;
  opacity: 0.15;
  stroke-dasharray: 2 2;
  transition: opacity 0.3s ease;
}

/* Cosmic star node points */
.star-node {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 
    0 0 6px #00f2fe,
    0 0 12px #ffffff;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
  transition: all 0.3s ease;
}

.cursor-node {
  width: 6px;
  height: 6px;
  background: #00f2fe;
  opacity: 0;
}

.constell-text {
  position: relative;
  z-index: 3;
  color: #c8d6e5;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.25);
  transition: all 0.3s ease;
}

/* Hover constellation linkage */
.star-vector-btn:hover {
  border-color: rgba(0, 242, 254, 0.4);
  box-shadow: 
    0 8px 25px rgba(0, 242, 254, 0.25),
    0 0 15px rgba(0, 242, 254, 0.15),
    inset 0 0 10px rgba(0, 242, 254, 0.1);
  transform: translateY(-2px);
}

.star-vector-btn:hover .constell-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}

.star-vector-btn:hover .star-node {
  transform: translate(-50%, -50%) scale(1.5);
}

.star-vector-btn:active {
  transform: translateY(1px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#020308] border border-white/10 px-9 py-4 rounded-lg cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:border-[#00f2fe]/40 hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-slate-300 font-bold text-xs tracking-[0.2em] [text-shadow:0_0_8px_rgba(0,242,254,0.25)]">CONNECT STARS</span>
</button>`,
  prompt: `Design a premium "Constellation Star Vector Button" component. Hollow star node dots anchor in deep space. Tracking the cursor dynamically draws glowing neon-cyan vector connection lines linking all stars to the cursor point.`
};
