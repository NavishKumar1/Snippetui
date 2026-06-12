/**
 * Component: Origami 3D Unfold Nav
 * Category: tabs-and-navs
 */

export const component = {
  id: 'origami-3d-unfold-nav',
  name: 'Origami 3D Unfold Nav',
  category: 'tabs-and-navs',
  tag: 'Luxury',
  html: `<div class="origami-nav-sandbox" id="origami-unfold-container">
  <div class="origami-strip">
    <div class="origami-card-item active" data-target="0">
      <div class="origami-flipper">
        <div class="flipper-face front">OVERVIEW</div>
        <div class="flipper-face back">OVERVIEW</div>
      </div>
    </div>
    
    <div class="origami-card-item" data-target="1">
      <div class="origami-flipper">
        <div class="flipper-face front">SERVICES</div>
        <div class="flipper-face back">SERVICES</div>
      </div>
    </div>
    
    <div class="origami-card-item" data-target="2">
      <div class="origami-flipper">
        <div class="flipper-face front">PORTFOLIO</div>
        <div class="flipper-face back">PORTFOLIO</div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Origami 3D Unfold selection triggers
const container = document.getElementById('origami-unfold-container');
if (container) {
  const cards = container.querySelectorAll('.origami-card-item');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('active')) return;
      
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('origami-unfold-container') as HTMLDivElement | null;
if (container) {
  const cards = container.querySelectorAll('.origami-card-item');

  cards.forEach(card => {
    const cardEl = card as HTMLDivElement;
    cardEl.addEventListener('click', () => {
      if (cardEl.classList.contains('active')) return;
      
      cards.forEach(c => (c as HTMLElement).classList.remove('active'));
      cardEl.classList.add('active');
    });
  });
}`,
  css: `/* Origami 3D Unfold Nav styles */
.origami-nav-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #16120e 0%, #060504 100%);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.origami-strip {
  display: flex;
  gap: 12px;
  perspective: 1000px;
}

.origami-card-item {
  width: 100px;
  height: 48px;
  cursor: pointer;
  perspective: 800px;
}

.origami-flipper {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: rotateX(-30deg); /* Natural tilt angle */
}

.origami-card-item.active .origami-flipper {
  transform: rotateX(180deg) translateZ(6px); /* 180 flip forward */
}

.origami-card-item:hover:not(.active) .origami-flipper {
  transform: rotateX(-10deg);
}

.flipper-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 800;
  border-radius: 6px;
  letter-spacing: 0.5px;
  box-sizing: border-box;
}

.flipper-face.front {
  background: #1e1812;
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: rgba(212, 175, 55, 0.7);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.flipper-face.back {
  background: #d4af37;
  border: 1px solid #ffffff;
  color: #0c0906;
  transform: rotateX(180deg); /* Pre-tilted back face */
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#16120e] to-[#060504] border border-[#d4af37]/15 rounded-3xl flex items-center justify-center overflow-hidden" id="origami-unfold-container">
  <div class="flex gap-3 [perspective:1000px]">
    <div class="origami-card-item active w-[100px] h-12 cursor-pointer [perspective:800px]" data-target="0">
      <div class="origami-flipper w-full h-full relative [transform-style:preserve-3d] transition-transform duration-600 cubic-bezier -rotate-x-[30deg] hover:-rotate-x-[10deg] [&.active]:rotate-x-[180deg] [&.active]:translate-z-[6px]">
        <div class="flipper-face front absolute inset-0 [backface-visibility:hidden] flex items-center justify-center font-sans text-[11px] font-extrabold rounded-lg tracking-wide bg-[#1e1812] border border-[#d4af37]/30 text-[#d4af37]/70 shadow-lg">OVERVIEW</div>
        <div class="flipper-face back absolute inset-0 [backface-visibility:hidden] flex items-center justify-center font-sans text-[11px] font-extrabold rounded-lg tracking-wide bg-[#d4af37] border border-white text-[#0c0906] rotate-x-180 shadow-[0_10px_20px_rgba(212,175,55,0.3)]">OVERVIEW</div>
      </div>
    </div>
    
    <div class="origami-card-item w-[100px] h-12 cursor-pointer [perspective:800px]" data-target="1">
      <div class="origami-flipper w-full h-full relative [transform-style:preserve-3d] transition-transform duration-600 cubic-bezier -rotate-x-[30deg] hover:-rotate-x-[10deg] [&.active]:rotate-x-[180deg] [&.active]:translate-z-[6px]">
        <div class="flipper-face front absolute inset-0 [backface-visibility:hidden] flex items-center justify-center font-sans text-[11px] font-extrabold rounded-lg tracking-wide bg-[#1e1812] border border-[#d4af37]/30 text-[#d4af37]/70 shadow-lg">SERVICES</div>
        <div class="flipper-face back absolute inset-0 [backface-visibility:hidden] flex items-center justify-center font-sans text-[11px] font-extrabold rounded-lg tracking-wide bg-[#d4af37] border border-white text-[#0c0906] rotate-x-180 shadow-[0_10px_20px_rgba(212,175,55,0.3)]">SERVICES</div>
      </div>
    </div>
    
    <div class="origami-card-item w-[100px] h-12 cursor-pointer [perspective:800px]" data-target="2">
      <div class="origami-flipper w-full h-full relative [transform-style:preserve-3d] transition-transform duration-600 cubic-bezier -rotate-x-[30deg] hover:-rotate-x-[10deg] [&.active]:rotate-x-[180deg] [&.active]:translate-z-[6px]">
        <div class="flipper-face front absolute inset-0 [backface-visibility:hidden] flex items-center justify-center font-sans text-[11px] font-extrabold rounded-lg tracking-wide bg-[#1e1812] border border-[#d4af37]/30 text-[#d4af37]/70 shadow-lg">PORTFOLIO</div>
        <div class="flipper-face back absolute inset-0 [backface-visibility:hidden] flex items-center justify-center font-sans text-[11px] font-extrabold rounded-lg tracking-wide bg-[#d4af37] border border-white text-[#0c0906] rotate-x-180 shadow-[0_10px_20px_rgba(212,175,55,0.3)]">PORTFOLIO</div>
      </div>
    </div>
  </div>
</div>`,
  prompt: 'Design a luxury 3D origami folding tab bar using rotating flip-cards in 180-degree unfolding perspectives.'
};
// Add tailwind class coordination active hooks
component.tailwind = component.tailwind.replace('class="origami-flipper w-full h-full relative [transform-style:preserve-3d] transition-transform duration-600 cubic-bezier -rotate-x-[30deg] hover:-rotate-x-[10deg] [&.active]:rotate-x-[180deg] [&.active]:translate-z-[6px]"', 'class="origami-flipper w-full h-full relative [transform-style:preserve-3d] transition-transform duration-600 -rotate-x-[30deg] active-flipper"');
