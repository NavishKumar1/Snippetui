/**
 * Component: Chromatic Aberration Prism Card
 * Category: cards
 */

export const component = {
  id: 'chroma-prism-card',
  name: 'Chromatic Aberration Prism Card',
  category: 'cards',
  tag: 'Glitch',
  html: `<div class="chroma-prism-card">
  <span class="prism-card-layer p-layer-cyan">SPECTRAL SHIFT</span>
  <span class="prism-card-layer p-layer-magenta">SPECTRAL SHIFT</span>
  <span class="prism-card-layer p-layer-yellow">SPECTRAL SHIFT</span>
  
  <div class="prism-card-content">
    <span class="prism-card-tag">REFRACTION LABS</span>
    <h3 class="prism-card-title">Spectral Shift</h3>
    <p class="prism-card-desc">Splitting composite light rays into chromatic channels, tracking prism focal indexes, and calculating spatial RGB aberration delays.</p>
    <div class="prism-card-footer">
      <span class="prism-card-status">SPECTRUM RESOLVED</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Chromatic Prism split offset on Hover
const prismCard = document.querySelector('.chroma-prism-card');
if (prismCard) {
  const cyan = prismCard.querySelector('.p-layer-cyan');
  const magenta = prismCard.querySelector('.p-layer-magenta');
  const yellow = prismCard.querySelector('.p-layer-yellow');
  
  prismCard.addEventListener('mousemove', (e) => {
    const rect = prismCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate off-center offset multipliers
    const ox = ((x / rect.width) - 0.5) * 12; // Max 6px offset
    const oy = ((y / rect.height) - 0.5) * 12;
    
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
  });

  prismCard.addEventListener('mouseleave', () => {
    // Snap color channels back to zero offset hidden state
    const snapTransition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease';
    
    [cyan, magenta, yellow].forEach((layer) => {
      if (layer) {
        layer.style.transition = snapTransition;
        layer.style.transform = 'translate(-50%, -50%)';
        layer.style.opacity = '0';
      }
    });
  });
  
  prismCard.addEventListener('mouseenter', () => {
    [cyan, magenta, yellow].forEach((layer) => {
      if (layer) {
        layer.style.transition = 'none';
      }
    });
  });
}`,
  ts: `// TypeScript Implementation
const prismCard = document.querySelector<HTMLDivElement>('.chroma-prism-card');
if (prismCard) {
  const cyan = prismCard.querySelector<HTMLSpanElement>('.p-layer-cyan');
  const magenta = prismCard.querySelector<HTMLSpanElement>('.p-layer-magenta');
  const yellow = prismCard.querySelector<HTMLSpanElement>('.p-layer-yellow');
  
  prismCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = prismCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ox = ((x / rect.width) - 0.5) * 12;
    const oy = ((y / rect.height) - 0.5) * 12;
    
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
  });

  prismCard.addEventListener('mouseleave', () => {
    const snapTransition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease';
    
    [cyan, magenta, yellow].forEach((layer) => {
      if (layer) {
        layer.style.transition = snapTransition;
        layer.style.transform = 'translate(-50%, -50%)';
        layer.style.opacity = '0';
      }
    });
  });
  
  prismCard.addEventListener('mouseenter', () => {
    [cyan, magenta, yellow].forEach((layer) => {
      if (layer) {
        layer.style.transition = 'none';
      }
    });
  });
}`,
  css: `/* Chromatic Aberration Prism Card Styles */
.chroma-prism-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #000000;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.7),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  transition: all 0.4s ease;
}

/* Dispersion layers in backstage */
.prism-card-layer {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.2em;
  width: 100%;
  opacity: 0;
  pointer-events: none;
}

.p-layer-cyan {
  color: #00ffff;
  mix-blend-mode: screen;
  z-index: 2;
}

.p-layer-magenta {
  color: #ff00ff;
  mix-blend-mode: screen;
  z-index: 3;
}

.p-layer-yellow {
  color: #ffff00;
  mix-blend-mode: screen;
  z-index: 1;
}

.prism-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 5;
  background: linear-gradient(to top, #000000 50%, rgba(0, 0, 0, 0.1) 100%);
}

.prism-card-tag {
  color: #a0aec0;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
}

.prism-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.prism-card-desc {
  color: #718096;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.prism-card-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 15px;
}

.prism-card-status {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}

/* Hover dispersion transitions */
.chroma-prism-card:hover {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 20px 45px rgba(255, 255, 255, 0.05),
    0 0 20px rgba(255, 0, 255, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.chroma-prism-card:hover .prism-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #ff00ff;
}

.chroma-prism-card:active {
  transform: translateY(1px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-black rounded-2xl border border-white/10 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:border-white/25 hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-slate-400 tracking-widest mb-3">REFRACTION LABS</div>
    <div class="font-bold text-2xl text-white mb-2.5">Spectral Shift</div>
    <div class="text-xs text-slate-600 leading-relaxed mb-6">Splitting composite light rays into chromatic channels, tracking prism focal indexes, and calculating spatial RGB aberration delays.</div>
    <div class="border-t border-white/10 pt-4 text-white font-bold text-xs tracking-wider">
      SPECTRUM RESOLVED
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Chromatic Aberration Prism Card" component. Outlined in raw black obsidian, hovering splits text borders into individual spectrum channels (cyan, magenta, yellow) that disperse based on coordinate offsets.`
};
