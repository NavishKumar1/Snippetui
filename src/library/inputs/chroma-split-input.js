/**
 * Component: Chromatic Aberration Split Input
 * Category: inputs
 */

export const component = {
  id: 'chroma-split-input',
  name: 'Chromatic Aberration Split Input',
  category: 'inputs',
  tag: 'Glitch',
  html: `<div class="chroma-split-inp-group">
  <span class="chroma-inp-layer layer-cyan">DATABASE CODE</span>
  <span class="chroma-inp-layer layer-magenta">DATABASE CODE</span>
  <span class="chroma-inp-layer layer-yellow">DATABASE CODE</span>
  
  <input type="text" class="chroma-split-input-field" placeholder=" " id="chroma-input-demo" autocomplete="off">
  <label class="chroma-split-inp-label" for="chroma-input-demo">DATABASE CODE</label>
</div>`,
  js: `// Interactive keypress chromatic aberration split
const chromaInp = document.querySelector('.chroma-split-input-field');
if (chromaInp) {
  const cyan = chromaInp.parentElement.querySelector('.layer-cyan');
  const magenta = chromaInp.parentElement.querySelector('.layer-magenta');
  const yellow = chromaInp.parentElement.querySelector('.layer-yellow');
  
  chromaInp.addEventListener('keydown', () => {
    // Disperse color channels momentarily on keydowns
    const ox = (Math.random() - 0.5) * 8;
    const oy = (Math.random() - 0.5) * 6;
    
    if (cyan) {
      cyan.style.transform = \`translate(calc(-50% - \${ox}px), calc(-50% - \${oy}px))\`;
      cyan.style.opacity = '0.65';
    }
    if (magenta) {
      magenta.style.transform = \`translate(calc(-50% + \${ox}px), calc(-50% + \${oy}px))\`;
      magenta.style.opacity = '0.65';
    }
    if (yellow) {
      yellow.style.transform = \`translate(calc(-50% - \${ox * 0.5}px), calc(-50% + \${oy * 0.5}px))\`;
      yellow.style.opacity = '0.65';
    }
    
    setTimeout(() => {
      [cyan, magenta, yellow].forEach((layer) => {
        if (layer) {
          layer.style.transform = 'translate(-50%, -50%)';
          layer.style.opacity = '0';
        }
      });
    }, 150);
  });
}`,
  ts: `// TypeScript Implementation
const chromaInp = document.querySelector<HTMLInputElement>('.chroma-split-input-field');
if (chromaInp) {
  const parent = chromaInp.parentElement;
  if (parent) {
    const cyan = parent.querySelector<HTMLSpanElement>('.layer-cyan');
    const magenta = parent.querySelector<HTMLSpanElement>('.layer-magenta');
    const yellow = parent.querySelector<HTMLSpanElement>('.layer-yellow');
    
    chromaInp.addEventListener('keydown', () => {
      const ox = (Math.random() - 0.5) * 8;
      const oy = (Math.random() - 0.5) * 6;
      
      if (cyan) {
        cyan.style.transform = \`translate(calc(-50% - \${ox}px), calc(-50% - \${oy}px))\`;
        cyan.style.opacity = '0.65';
      }
      if (magenta) {
        magenta.style.transform = \`translate(calc(-50% + \${ox}px), calc(-50% + \${oy}px))\`;
        magenta.style.opacity = '0.65';
      }
      if (yellow) {
        yellow.style.transform = \`translate(calc(-50% - \${ox * 0.5}px), calc(-50% + \${oy * 0.5}px))\`;
        yellow.style.opacity = '0.65';
      }
      
      setTimeout(() => {
        [cyan, magenta, yellow].forEach((layer) => {
          if (layer) {
            layer.style.transform = 'translate(-50%, -50%)';
            layer.style.opacity = '0';
          }
        });
      }, 150);
    });
  }
}`,
  css: `/* Chromatic Aberration Split Input Styles */
.chroma-split-inp-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

/* Backstage dispersion layers */
.chroma-inp-layer {
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
  opacity: 0;
  pointer-events: none;
  transition: all 0.15s ease;
}

.layer-cyan { color: #00ffff; mix-blend-mode: screen; z-index: 2; }
.layer-magenta { color: #ff00ff; mix-blend-mode: screen; z-index: 3; }
.layer-yellow { color: #ffff00; mix-blend-mode: screen; z-index: 1; }

.chroma-split-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  outline: none;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  z-index: 2;
  position: relative;
  transition: all 0.3s ease;
}

.chroma-split-inp-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  pointer-events: none;
  z-index: 3;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Hover & Focus state transitions */
.chroma-split-input-field:focus {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 8px 25px rgba(255, 255, 255, 0.05),
    0 0 15px rgba(255, 0, 255, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.05);
}

.chroma-split-input-field:focus + .chroma-split-inp-label,
.chroma-split-input-field:not(:placeholder-shown) + .chroma-split-inp-label {
  transform: translateY(-170%) scale(0.85);
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #ff00ff;
  background-color: #000000;
  padding: 0 6px;
  z-index: 10;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="chroma-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-black border border-white/10 rounded text-white font-bold text-sm tracking-wider outline-none focus:border-white/25 focus:shadow-[0_8px_25px_rgba(255,255,255,0.05)] transition-all duration-300 relative z-10" />
  <label for="chroma-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold tracking-widest pointer-events-none transition-all duration-300 peer-focus:-translate-y-[170%] peer-focus:scale-85 peer-focus:text-white peer-focus:bg-black peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-translate-y-[170%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:bg-black peer-[:not(:placeholder-shown)]:px-1.5 z-20">
    DATABASE CODE
  </label>
</div>`,
  prompt: `Design a premium "Chromatic Aberration Split Input" component. Hollow borders glow on focus. Keypresses dynamically split label layers into cyan/magenta/yellow channels dispersing off-center.`
};
