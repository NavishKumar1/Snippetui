/**
 * Component: Origami Geometric Fold Card
 * Category: cards
 */

export const component = {
  id: 'origami-fold-card',
  name: 'Origami Geometric Fold Card',
  category: 'cards',
  tag: 'Aesthetic',
  html: `<div class="origami-card-wrapper">
  <div class="origami-fold-card">
    <div class="origami-card-facets">
      <span class="origami-card-facet o-facet-top"></span>
      <span class="origami-card-facet o-facet-bottom"></span>
    </div>
    <div class="origami-fold-card-content">
      <span class="origami-fold-card-tag">3D GEOMETRY</span>
      <h3 class="origami-fold-card-title">Origami Engine</h3>
      <p class="origami-fold-card-desc">Folding discrete topological space, rotating geometric vector facets, and projecting multi-dimensional coordinates.</p>
      <div class="origami-fold-card-footer">
        <span class="origami-fold-card-status">ANGLE RESOLVED</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Interactive Origami 3D fold tilt tracking
const origamiCard = document.querySelector('.origami-fold-card');
if (origamiCard) {
  const facets = origamiCard.querySelector('.origami-card-facets');
  
  origamiCard.addEventListener('mousemove', (e) => {
    const rect = origamiCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt angle conversions for card facets
    const tiltX = ((y / rect.height) - 0.5) * 35; // Max 35deg
    const tiltY = ((x / rect.width) - 0.5) * -35;
    
    if (facets) {
      facets.style.transform = \`rotateX(\${tiltX}deg) rotateY(\${tiltY}deg)\`;
      facets.style.transition = 'none';
    }
  });

  origamiCard.addEventListener('mouseleave', () => {
    if (facets) {
      facets.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
      facets.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  });
}`,
  ts: `// TypeScript Implementation
const origamiCard = document.querySelector<HTMLDivElement>('.origami-fold-card');
if (origamiCard) {
  const facets = origamiCard.querySelector<HTMLDivElement>('.origami-card-facets');
  if (facets) {
    origamiCard.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = origamiCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const tiltX = ((y / rect.height) - 0.5) * 35;
      const tiltY = ((x / rect.width) - 0.5) * -35;
      
      facets.style.transform = \`rotateX(\${tiltX}deg) rotateY(\${tiltY}deg)\`;
      facets.style.transition = 'none';
    });

    origamiCard.addEventListener('mouseleave', () => {
      facets.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
      facets.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }
}`,
  css: `/* Origami Geometric Fold Card Styles */
.origami-card-wrapper {
  perspective: 600px;
  display: inline-block;
  padding: 10px;
}

.origami-fold-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: transparent;
  cursor: pointer;
  overflow: visible;
  z-index: 10;
}

/* 3D structural facets */
.origami-card-facets {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}

.origami-card-facet {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(135deg, #0f1224 0%, #060810 100%);
  border: 1px solid rgba(79, 172, 254, 0.2);
  box-shadow: inset 0 0 20px rgba(79, 172, 254, 0.03);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.o-facet-top {
  top: 0;
  border-bottom: none;
  border-radius: 12px 12px 0 0;
  transform-origin: top;
}

.o-facet-bottom {
  bottom: 0;
  border-top: none;
  border-radius: 0 0 12px 12px;
  transform-origin: bottom;
}

.origami-fold-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  pointer-events: none;
}

.origami-fold-card-tag {
  color: #4facfe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  text-shadow: 0 0 5px rgba(79, 172, 254, 0.25);
}

.origami-fold-card-title {
  color: #c0d8f0;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
  transition: all 0.4s ease;
}

.origami-fold-card-desc {
  color: #8390ad;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.origami-fold-card-footer {
  border-top: 1px solid rgba(79, 172, 254, 0.15);
  padding-top: 15px;
}

.origami-fold-card-status {
  color: #4facfe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

/* Hover folding actions */
.origami-fold-card:hover .o-facet-top {
  transform: rotateX(15deg);
  background: linear-gradient(135deg, #181d3a 0%, #0a0d1b 100%);
  border-color: rgba(79, 172, 254, 0.45);
  box-shadow: inset 0 0 25px rgba(79, 172, 254, 0.12);
}

.origami-fold-card:hover .o-facet-bottom {
  transform: rotateX(-15deg);
  background: linear-gradient(135deg, #101428 0%, #04060b 100%);
  border-color: rgba(79, 172, 254, 0.45);
  box-shadow: inset 0 0 25px rgba(79, 172, 254, 0.12);
}

.origami-fold-card:hover .origami-fold-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #4facfe;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="perspective-[600px] inline-block p-2.5">
  <div class="relative w-[300px] h-[380px] bg-transparent cursor-pointer overflow-visible text-[#4facfe] font-bold text-xs tracking-wider">
    <div class="relative h-full flex flex-col justify-end p-[30px] z-10">
      <div class="font-bold text-xs text-[#4facfe] tracking-widest mb-3">3D GEOMETRY</div>
      <div class="font-bold text-2xl text-slate-200 mb-2.5">Origami Engine</div>
      <div class="text-xs text-[#8390ad] leading-relaxed mb-6">Folding discrete topological space, rotating geometric vector facets, and projecting multi-dimensional coordinates.</div>
      <div class="border-t border-[#4facfe]/15 pt-4 text-[#4facfe] font-bold text-xs tracking-wider">
        ANGLE RESOLVED
      </div>
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Origami Geometric Fold Card" component. Faceted geometric dark-navy layout folds in 3D perspective space on hover. A cursor coordinate hover handler rotates the facets on dynamic tilt axes.`
};
