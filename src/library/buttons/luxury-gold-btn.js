/**
 * Component: Luxury Gold Specular Button
 * Category: buttons
 */

export const component = {
  id: 'luxury-gold-btn',
  name: 'Luxury Gold Specular',
  category: 'buttons',
  tag: 'Luxury',
  html: `<button class="luxury-gold-btn">
  <div class="gold-lens-shine"></div>
  <span class="gold-btn-content">
    <span class="gold-icon">✦</span>
    <span class="gold-text">PURCHASE NOW</span>
  </span>
</button>`,
  js: `// Interactive dynamic gold glint angle
const goldBtn = document.querySelector('.luxury-gold-btn');
if (goldBtn) {
  const glint = goldBtn.querySelector('.gold-lens-shine');
  
  goldBtn.addEventListener('mousemove', (e) => {
    const rect = goldBtn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    
    // Set specular reflection custom variable based on mouse position
    glint.style.left = \`\${x}%\`;
    glint.style.transition = 'none';
  });

  goldBtn.addEventListener('mouseleave', () => {
    glint.style.transition = 'left 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    glint.style.left = '-100%';
  });
}`,
  ts: `// TypeScript Implementation
const goldBtn = document.querySelector<HTMLButtonElement>('.luxury-gold-btn');
if (goldBtn) {
  const glint = goldBtn.querySelector<HTMLDivElement>('.gold-lens-shine');
  
  if (glint) {
    goldBtn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = goldBtn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      
      glint.style.left = \`\${x}%\`;
      glint.style.transition = 'none';
    });

    goldBtn.addEventListener('mouseleave', () => {
      glint.style.transition = 'left 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
      glint.style.left = '-100%';
    });
  }
}`,
  css: `/* Luxury Gold Specular Button Styles */
.luxury-gold-btn {
  position: relative;
  background: linear-gradient(135deg, #110d05 0%, #1e1708 100%);
  border: 1px solid transparent;
  background-clip: padding-box;
  padding: 16px 38px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 215, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Polished Dual Gold Border using pseudo element */
.luxury-gold-btn::before {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 1;
  margin: -1px; /* border thickness */
  border-radius: 4px;
  background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.luxury-gold-btn::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 2;
  background: linear-gradient(135deg, #110d05 0%, #1e1708 100%);
  border-radius: 4px;
  margin: 0px;
}

.gold-btn-content {
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 10px;
}

.gold-text {
  color: #bf953f;
  background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 50%, #b38728 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  transition: all 0.3s ease;
}

.gold-icon {
  color: #fcf6ba;
  font-size: 12px;
  text-shadow: 0 0 10px rgba(252, 246, 186, 0.8);
  animation: gold-shimmer-star 2s infinite ease-in-out;
}

/* Dynamic Specular Lens Glint overlay */
.gold-lens-shine {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  left: -100%;
  z-index: 3;
  pointer-events: none;
}

/* Hover State Animations */
.luxury-gold-btn:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 30px rgba(179, 135, 40, 0.25),
    0 0 20px rgba(251, 245, 183, 0.1),
    inset 0 1px 1px rgba(255, 215, 0, 0.3);
}

.luxury-gold-btn:hover::before {
  opacity: 0.8;
}

.luxury-gold-btn:hover .gold-text {
  background: linear-gradient(135deg, #ffffff 0%, #fcf6ba 50%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(252, 246, 186, 0.4);
}

.luxury-gold-btn:active {
  transform: translateY(1px);
}

@keyframes gold-shimmer-star {
  0%, 100% { opacity: 0.5; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.1); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-gradient-to-br from-[#110d05] to-[#1e1708] px-9 py-4 rounded cursor-pointer overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_30px_rgba(179,135,40,0.25)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 flex items-center gap-2">
    <span class="text-[#fcf6ba] text-xs">✦</span>
    <span class="bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] bg-clip-text text-transparent font-bold text-xs tracking-[0.15em]">PURCHASE NOW</span>
  </span>
</button>`,
  prompt: `Design a premium "Luxury Gold Specular Button" component. A matte-black charcoal luxury card button outlined in complex, metallic chrome-gold gradient borders. When hovered, a bright specular lens-glint sweep shoots across the text face accompanied by an ambient warm golden halo shadow glow.`
};
