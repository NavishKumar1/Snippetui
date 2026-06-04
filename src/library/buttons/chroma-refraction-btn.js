/**
 * Component: Chroma Refraction Button
 * Category: buttons
 */

export const component = {
  id: 'chroma-refraction-btn',
  name: 'Chroma Refraction',
  category: 'buttons',
  tag: 'Premium',
  html: `<div class="refraction-btn-wrapper">
  <div class="refraction-spectrum-glow"></div>
  <button class="chroma-refraction-btn">
    <span class="refraction-label">EMIT SPECTRUM</span>
  </button>
</div>`,
  js: `// Interactive refraction coordinates shifts on hover
const refWrapper = document.querySelector('.refraction-btn-wrapper');
if (refWrapper) {
  const btn = refWrapper.querySelector('.chroma-refraction-btn');
  const glow = refWrapper.querySelector('.refraction-spectrum-glow');

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (glow) {
      glow.style.setProperty('--rx', \`\${x * 35}px\`);
      glow.style.setProperty('--ry', \`\${y * 35}px\`);
      glow.style.opacity = '1';
    }
  });

  btn.addEventListener('mouseleave', () => {
    if (glow) {
      glow.style.setProperty('--rx', '0px');
      glow.style.setProperty('--ry', '0px');
      glow.style.opacity = '0';
    }
  });
}`,
  ts: `// TypeScript Implementation
const refWrapper = document.querySelector<HTMLDivElement>('.refraction-btn-wrapper');
if (refWrapper) {
  const btn = refWrapper.querySelector<HTMLButtonElement>('.chroma-refraction-btn');
  const glow = refWrapper.querySelector<HTMLDivElement>('.refraction-spectrum-glow');

  if (btn) {
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (glow) {
        glow.style.setProperty('--rx', \`\${x * 35}px\`);
        glow.style.setProperty('--ry', \`\${y * 35}px\`);
        glow.style.opacity = '1';
      }
    });

    btn.addEventListener('mouseleave', () => {
      if (glow) {
        glow.style.setProperty('--rx', '0px');
        glow.style.setProperty('--ry', '0px');
        glow.style.opacity = '0';
      }
    });
  }
}`,
  css: `/* Chroma Refraction Button Styles */
.refraction-btn-wrapper {
  position: relative;
  display: inline-block;
}

.chroma-refraction-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 36px;
  border-radius: 6px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
  outline: none;
  position: relative;
  z-index: 5;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 
    0 10px 30px -10px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255,255,255,0.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.refraction-label {
  position: relative;
  z-index: 6;
  background: linear-gradient(135deg, #ffffff 40%, rgba(255,255,255,0.5) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.chroma-refraction-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Translucent split laser spectrum shadow background */
.refraction-spectrum-glow {
  position: absolute;
  inset: -1px;
  border-radius: 6px;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  /* Multilayered split color glows simulating prisma refractions */
  box-shadow: 
    calc(-3px + var(--rx, 0px)) calc(-3px + var(--ry, 0px)) 10px rgba(0, 255, 255, 0.8),
    calc(3px + var(--rx, 0px)) calc(3px + var(--ry, 0px)) 10px rgba(255, 0, 127, 0.8),
    calc(0px + var(--rx, 0px)) calc(5px + var(--ry, 0px)) 15px rgba(255, 215, 0, 0.6);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-block">
  <button class="relative bg-white/5 border border-white/10 px-9 py-4 rounded text-white font-bold text-xs tracking-widest hover:-translate-y-0.5 active:translate-y-0.25 hover:shadow-lg transition-all duration-300">
    EMIT SPECTRUM
  </button>
</div>`,
  prompt: `Design a premium "Chroma Refraction Button". Made of translucent quartz crystal. On hover, it refracts a laser light beam into a dynamic rainbow spectrum behind its borders, shifting angle according to mouse coordinates.`
};
