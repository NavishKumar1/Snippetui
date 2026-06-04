/**
 * Component: Mercury Fluid Ripple Input
 * Category: inputs
 */

export const component = {
  id: 'mercury-ripple-input',
  name: 'Mercury Fluid Ripple Input',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="mercury-input-group">
  <svg class="mercury-goo-filter" style="position: absolute; width: 0; height: 0;">
    <defs>
      <filter id="mercury-goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
  
  <div class="mercury-liquid-container">
    <input type="text" class="mercury-input-field" placeholder=" " id="mercury-input-demo" autocomplete="off">
    <div class="mercury-ripple-box"></div>
    <label class="mercury-input-label" for="mercury-input-demo">SILVER MATRIX</label>
  </div>
</div>`,
  js: `// Interactive liquid mercury waves inside borders on keypresses
const mercuryInp = document.querySelector('.mercury-input-field');
if (mercuryInp) {
  const rippleBox = mercuryInp.parentElement.querySelector('.mercury-ripple-box');
  
  mercuryInp.addEventListener('keydown', () => {
    if (!rippleBox) return;
    
    const rip = document.createElement('span');
    rip.className = 'mercury-droplet-wave';
    
    // Spawn at cursor focus area
    const startX = Math.random() * 60 + 20;
    rip.style.left = \`\${startX}%\`;
    rip.style.animation = 'mercury-goo-ripple 0.8s ease-out forwards';
    
    rippleBox.appendChild(rip);
    setTimeout(() => rip.remove(), 800);
  });
}`,
  ts: `// TypeScript Implementation
const mercuryInp = document.querySelector<HTMLInputElement>('.mercury-input-field');
if (mercuryInp) {
  const parent = mercuryInp.parentElement;
  if (parent) {
    const rippleBox = parent.querySelector<HTMLDivElement>('.mercury-ripple-box');
    
    mercuryInp.addEventListener('keydown', () => {
      if (!rippleBox) return;
      
      const rip = document.createElement('span');
      rip.className = 'mercury-droplet-wave';
      
      const startX = Math.random() * 60 + 20;
      rip.style.left = \`\${startX}%\`;
      rip.style.animation = 'mercury-goo-ripple 0.8s ease-out forwards';
      
      rippleBox.appendChild(rip);
      setTimeout(() => rip.remove(), 800);
    });
  }
}`,
  css: `/* Mercury Fluid Ripple Input Styles */
.mercury-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.mercury-liquid-container {
  position: relative;
  width: 100%;
  filter: url('#mercury-goo');
  background: transparent;
}

.mercury-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #121316;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  z-index: 2;
  position: relative;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.mercury-ripple-box {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 12px;
  pointer-events: none;
  z-index: 3;
}

.mercury-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  pointer-events: none;
  z-index: 4;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

.mercury-droplet-wave {
  position: absolute;
  width: 25px;
  height: 25px;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff 0%, #a6afb8 50%, #707b85 100%);
  box-shadow: 0 0 10px rgba(255,255,255,0.4);
  opacity: 0;
  pointer-events: none;
}

/* Interactions */
.mercury-input-field:focus {
  border-color: #a6afb8;
  background: #191b20;
  box-shadow: 
    0 8px 25px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.mercury-input-field:focus ~ .mercury-input-label,
.mercury-input-field:not(:placeholder-shown) ~ .mercury-input-label {
  transform: translateY(-165%) scale(0.85);
  color: #cbd5e1;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  background: #121316;
  padding: 0 5px;
  z-index: 10;
}

@keyframes mercury-goo-ripple {
  0% {
    transform: scale(0.3) translateY(20px);
    opacity: 0.9;
  }
  100% {
    transform: scale(2.4) translateY(-30px);
    opacity: 0;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="mercury-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-[#121316] border border-white/8 rounded-xl text-slate-200 outline-none focus:border-slate-400 focus:bg-[#191b20] transition-all duration-300 relative z-10" />
  <label for="mercury-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs font-bold tracking-widest text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-translate-y-[165%] peer-focus:scale-85 peer-focus:text-slate-300 peer-focus:bg-[#121316] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-translate-y-[165%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-slate-300 peer-[:not(:placeholder-shown)]:bg-[#121316] peer-[:not(:placeholder-shown)]:px-1 z-20">
    SILVER MATRIX
  </label>
</div>`,
  prompt: `Polished mercury fluid metal boundaries. Focused state applies an SVG gooey matrix deformation warping the border. Keydowns trigger metal droplet expansions that organic-blend and bubble.`
};
