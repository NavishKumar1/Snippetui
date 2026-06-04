/**
 * Component: Magnetic Liquid Ferrofluid Button
 * Category: buttons
 */

export const component = {
  id: 'magnetic-ferrofluid-btn',
  name: 'Magnetic Liquid Ferrofluid',
  category: 'buttons',
  tag: 'Interactive',
  html: `<div class="ferro-btn-container">
  <button class="magnetic-ferrofluid-btn">
    <div class="ferro-fluid-backdrop">
      <div class="ferro-blob ferro-blob-1"></div>
      <div class="ferro-blob ferro-blob-2"></div>
      <div class="ferro-blob ferro-blob-3"></div>
    </div>
    <span class="ferro-text">ENGAGE GRID</span>
  </button>
  
  <!-- Gooey filter for organic liquid merging -->
  <svg style="position: absolute; width: 0; height: 0;" width="0" height="0">
    <defs>
      <filter id="ferro-gooey-effect">
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
</div>`,
  js: `// Interactive Magnetic Ferrofluid cursor tracker
const ferroBtn = document.querySelector('.magnetic-ferrofluid-btn');
if (ferroBtn) {
  const blobs = ferroBtn.querySelectorAll('.ferro-blob');
  
  ferroBtn.addEventListener('mousemove', (e) => {
    const rect = ferroBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Pull blobs toward cursor coordinate with minor spring delays
    blobs.forEach((blob, idx) => {
      const delay = (idx + 1) * 0.15;
      blob.style.transform = \`translate(calc(-50% + \${(x - rect.width / 2) * delay}px), calc(-50% + \${(y - rect.height / 2) * delay}px))\`;
    });
  });

  ferroBtn.addEventListener('mouseleave', () => {
    // Return blobs to home concentric state
    blobs.forEach((blob) => {
      blob.style.transform = 'translate(-50%, -50%)';
      blob.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });
  
  ferroBtn.addEventListener('mouseenter', () => {
    blobs.forEach((blob) => {
      blob.style.transition = 'none';
    });
  });
}`,
  ts: `// TypeScript Implementation
const ferroBtn = document.querySelector<HTMLButtonElement>('.magnetic-ferrofluid-btn');
if (ferroBtn) {
  const blobs = ferroBtn.querySelectorAll<HTMLDivElement>('.ferro-blob');
  
  ferroBtn.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = ferroBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    blobs.forEach((blob, idx) => {
      const delay = (idx + 1) * 0.15;
      blob.style.transform = \`translate(calc(-50% + \${(x - rect.width / 2) * delay}px), calc(-50% + \${(y - rect.height / 2) * delay}px))\`;
    });
  });

  ferroBtn.addEventListener('mouseleave', () => {
    blobs.forEach((blob) => {
      blob.style.transform = 'translate(-50%, -50%)';
      blob.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });
  
  ferroBtn.addEventListener('mouseenter', () => {
    blobs.forEach((blob) => {
      blob.style.transition = 'none';
    });
  });
}`,
  css: `/* Magnetic Liquid Ferrofluid Button Styles */
.ferro-btn-container {
  position: relative;
  display: inline-block;
}

.magnetic-ferrofluid-btn {
  position: relative;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 36px;
  border-radius: 100px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

/* Organic gooey backdrop filter container */
.ferro-fluid-backdrop {
  position: absolute;
  inset: 0;
  filter: url('#ferro-gooey-effect');
  z-index: 1;
  pointer-events: none;
}

.ferro-blob {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  background: linear-gradient(135deg, #111111 0%, #2c2c2c 50%, #000000 100%);
  transform: translate(-50%, -50%);
  box-shadow: inset 0 2px 5px rgba(255,255,255,0.2);
  transition: all 0.3s ease;
}

.ferro-blob-1 {
  width: 45px;
  height: 45px;
  background: #0a0a0a;
}

.ferro-blob-2 {
  width: 35px;
  height: 35px;
  background: #141414;
}

.ferro-blob-3 {
  width: 25px;
  height: 25px;
  background: #000000;
}

.ferro-text {
  position: relative;
  z-index: 3;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  mix-blend-mode: difference; /* Stand out over shifting black fluids */
  transition: all 0.3s ease;
}

/* Hover effects */
.magnetic-ferrofluid-btn:hover {
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.7),
    0 0 20px rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.magnetic-ferrofluid-btn:hover .ferro-blob-1 { width: 55px; height: 55px; }
.magnetic-ferrofluid-btn:hover .ferro-blob-2 { width: 42px; height: 42px; }
.magnetic-ferrofluid-btn:hover .ferro-blob-3 { width: 30px; height: 30px; }

.magnetic-ferrofluid-btn:active {
  transform: translateY(1px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-block">
  <button class="relative bg-black border border-white/10 px-9 py-4 rounded-full cursor-pointer overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:border-white/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.7)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
    <span class="relative z-10 text-white font-bold text-xs tracking-[0.15em] mix-blend-difference">ENGAGE GRID</span>
  </button>
</div>`,
  prompt: `Design a premium "Magnetic Liquid Ferrofluid Button" component. A rounded glossy-black capsule capsule. In the background, three organic pitch-black fluid blobs merge and stretch organically toward the user's cursor position using a high-fidelity SVG gooey filter layout, while standard text coordinates remain legible.`
};
