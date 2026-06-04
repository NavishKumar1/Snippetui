/**
 * Component: Origami Geometric Fold Button
 * Category: buttons
 */

export const component = {
  id: 'origami-fold-btn',
  name: 'Origami Geometric Fold',
  category: 'buttons',
  tag: 'Aesthetic',
  html: `<div class="origami-btn-wrapper">
  <button class="origami-fold-btn">
    <div class="origami-facets">
      <span class="origami-facet facet-top"></span>
      <span class="origami-facet facet-bottom"></span>
    </div>
    <span class="origami-text">FOLD DIMENSION</span>
  </button>
</div>`,
  js: `// Interactive Origami 3D fold tilt tracking
const origamiBtn = document.querySelector('.origami-fold-btn');
if (origamiBtn) {
  const facets = origamiBtn.querySelector('.origami-facets');
  
  origamiBtn.addEventListener('mousemove', (e) => {
    const rect = origamiBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert coordinate coordinates to angles for 3D tilt
    const tiltX = ((y / rect.height) - 0.5) * 30; // Max tilt 30deg
    const tiltY = ((x / rect.width) - 0.5) * -30;
    
    facets.style.transform = \`rotateX(\${tiltX}deg) rotateY(\${tiltY}deg)\`;
    facets.style.transition = 'none';
  });

  origamiBtn.addEventListener('mouseleave', () => {
    facets.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    facets.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}`,
  ts: `// TypeScript Implementation
const origamiBtn = document.querySelector<HTMLButtonElement>('.origami-fold-btn');
if (origamiBtn) {
  const facets = origamiBtn.querySelector<HTMLDivElement>('.origami-facets');
  if (facets) {
    origamiBtn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = origamiBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const tiltX = ((y / rect.height) - 0.5) * 30;
      const tiltY = ((x / rect.width) - 0.5) * -30;
      
      facets.style.transform = \`rotateX(\${tiltX}deg) rotateY(\${tiltY}deg)\`;
      facets.style.transition = 'none';
    });

    origamiBtn.addEventListener('mouseleave', () => {
      facets.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
      facets.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }
}`,
  css: `/* Origami Geometric Fold Button Styles */
.origami-btn-wrapper {
  perspective: 400px;
  display: inline-block;
}

.origami-fold-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 16px 36px;
  cursor: pointer;
  outline: none;
  overflow: visible;
  z-index: 10;
}

/* 3D structural facets */
.origami-facets {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}

.origami-facet {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(135deg, #1b1f38 0%, #0c0e1a 100%);
  border: 1px solid rgba(79, 172, 254, 0.25);
  box-shadow: inset 0 0 15px rgba(79, 172, 254, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.facet-top {
  top: 0;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  transform-origin: top;
}

.facet-bottom {
  bottom: 0;
  border-top: none;
  border-radius: 0 0 6px 6px;
  transform-origin: bottom;
}

.origami-text {
  position: relative;
  z-index: 3;
  color: #4facfe;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 8px rgba(79, 172, 254, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Hover dynamic folding actions */
.origami-fold-btn:hover .facet-top {
  transform: rotateX(15deg);
  background: linear-gradient(135deg, #24294a 0%, #121528 100%);
  border-color: rgba(79, 172, 254, 0.5);
  box-shadow: inset 0 0 20px rgba(79, 172, 254, 0.15);
}

.origami-fold-btn:hover .facet-bottom {
  transform: rotateX(-15deg);
  background: linear-gradient(135deg, #181c33 0%, #090a14 100%);
  border-color: rgba(79, 172, 254, 0.5);
  box-shadow: inset 0 0 20px rgba(79, 172, 254, 0.15);
}

.origami-fold-btn:hover .origami-text {
  color: #ffffff;
  text-shadow: 
    0 0 10px #ffffff,
    0 0 20px #4facfe;
  letter-spacing: 0.18em;
}

.origami-fold-btn:active .facet-top { transform: rotateX(5deg); }
.origami-fold-btn:active .facet-bottom { transform: rotateX(-5deg); }
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="perspective-[400px] inline-block">
  <button class="relative bg-transparent border-none px-9 py-4 cursor-pointer overflow-visible text-[#4facfe] font-bold text-xs tracking-[0.15em] [text-shadow:0_0_8px_rgba(79,172,254,0.3)] hover:text-white transition-all duration-300">
    FOLD DIMENSION
  </button>
</div>`,
  prompt: `Design a premium "Origami Geometric Fold Button" component. Faceted geometric dark-navy layout folds in 3D perspective space on hover. A cursor coordinate hover handler rotates the facets on dynamic tilt axes while stretching the typography in visual depth layers.`
};
