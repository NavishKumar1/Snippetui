/**
 * Component: Chromatic Split Aberration Button
 * Category: buttons
 */

export const component = {
  id: 'chroma-split-btn',
  name: 'Chromatic Split Aberration',
  category: 'buttons',
  tag: 'Glitch',
  html: `<button class="chroma-split-btn">
  <span class="chroma-split-layer layer-cyan">CHROMA SHIFT</span>
  <span class="chroma-split-layer layer-magenta">CHROMA SHIFT</span>
  <span class="chroma-split-layer layer-yellow">CHROMA SHIFT</span>
  <span class="chroma-split-layer layer-main">CHROMA SHIFT</span>
</button>`,
  js: `// Interactive Chromatic split offset on Hover
const splitBtn = document.querySelector('.chroma-split-btn');
if (splitBtn) {
  const cyan = splitBtn.querySelector('.layer-cyan');
  const magenta = splitBtn.querySelector('.layer-magenta');
  const yellow = splitBtn.querySelector('.layer-yellow');
  
  splitBtn.addEventListener('mousemove', (e) => {
    const rect = splitBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate off-center offset multipliers
    const ox = ((x / rect.width) - 0.5) * 8; // Max 4px offset
    const oy = ((y / rect.height) - 0.5) * 8;
    
    if (cyan) cyan.style.transform = \`translate(calc(-50% - \${ox}px), calc(-50% - \${oy}px))\`;
    if (magenta) magenta.style.transform = \`translate(calc(-50% + \${ox}px), calc(-50% + \${oy}px))\`;
    if (yellow) yellow.style.transform = \`translate(calc(-50% - \${ox * 0.5}px), calc(-50% + \${oy * 0.5}px))\`;
  });

  splitBtn.addEventListener('mouseleave', () => {
    // Snap colors back to center focus
    const snapTransition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease';
    
    [cyan, magenta, yellow].forEach((layer) => {
      if (layer) {
        layer.style.transition = snapTransition;
        layer.style.transform = 'translate(-50%, -50%)';
        layer.style.opacity = '0';
      }
    });
  });
  
  splitBtn.addEventListener('mouseenter', () => {
    [cyan, magenta, yellow].forEach((layer) => {
      if (layer) {
        layer.style.transition = 'none';
        layer.style.opacity = '0.7';
      }
    });
  });
}`,
  ts: `// TypeScript Implementation
const splitBtn = document.querySelector<HTMLButtonElement>('.chroma-split-btn');
if (splitBtn) {
  const cyan = splitBtn.querySelector<HTMLSpanElement>('.layer-cyan');
  const magenta = splitBtn.querySelector<HTMLSpanElement>('.layer-magenta');
  const yellow = splitBtn.querySelector<HTMLSpanElement>('.layer-yellow');
  
  splitBtn.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = splitBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ox = ((x / rect.width) - 0.5) * 8;
    const oy = ((y / rect.height) - 0.5) * 8;
    
    if (cyan) cyan.style.transform = \`translate(calc(-50% - \${ox}px), calc(-50% - \${oy}px))\`;
    if (magenta) magenta.style.transform = \`translate(calc(-50% + \${ox}px), calc(-50% + \${oy}px))\`;
    if (yellow) yellow.style.transform = \`translate(calc(-50% - \${ox * 0.5}px), calc(-50% + \${oy * 0.5}px))\`;
  });

  splitBtn.addEventListener('mouseleave', () => {
    const snapTransition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease';
    
    [cyan, magenta, yellow].forEach((layer) => {
      if (layer) {
        layer.style.transition = snapTransition;
        layer.style.transform = 'translate(-50%, -50%)';
        layer.style.opacity = '0';
      }
    });
  });
  
  splitBtn.addEventListener('mouseenter', () => {
    [cyan, magenta, yellow].forEach((layer) => {
      if (layer) {
        layer.style.transition = 'none';
        layer.style.opacity = '0.7';
      }
    });
  });
}`,
  css: `/* Chromatic Split Aberration Button Styles */
.chroma-split-btn {
  position: relative;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 36px;
  height: 50px;
  width: 170px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

/* Layer overlaps */
.chroma-split-layer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.18em;
  width: 100%;
}

.layer-main {
  color: #ffffff;
  z-index: 5;
}

.layer-cyan {
  color: #00ffff;
  mix-blend-mode: screen;
  z-index: 2;
  opacity: 0;
}

.layer-magenta {
  color: #ff00ff;
  mix-blend-mode: screen;
  z-index: 3;
  opacity: 0;
}

.layer-yellow {
  color: #ffff00;
  mix-blend-mode: screen;
  z-index: 1;
  opacity: 0;
}

/* Hover chromatic channels dispersion */
.chroma-split-btn:hover {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 8px 25px rgba(255, 255, 255, 0.05),
    0 0 15px rgba(255, 0, 255, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.chroma-split-btn:active {
  transform: translateY(1px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-black border border-white/10 px-9 py-4 h-[50px] w-[170px] rounded cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:border-white/25 hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-white font-bold text-xs tracking-[0.18em] text-center">CHROMA SHIFT</span>
</button>`,
  prompt: `Design a premium "Chromatic Split Aberration Button" component. A sleek black outline layout separates text layers into three visual color channels (cyan, magenta, yellow). Tracking the cursor shifts each channel off-center dynamically based on mouse coordinate offsets.`
};
