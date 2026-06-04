/**
 * Component: Luxury Gold Specular Card
 * Category: cards
 */

export const component = {
  id: 'luxury-gold-card',
  name: 'Luxury Gold Specular Card',
  category: 'cards',
  tag: 'Luxury',
  html: `<div class="luxury-gold-card">
  <div class="luxury-gold-card-shine"></div>
  <div class="luxury-gold-card-content">
    <div class="gold-card-header">
      <span class="gold-card-star">✦</span>
      <span class="gold-card-category">VIP PRESTIGE</span>
    </div>
    <h3 class="gold-card-title">Centurion Club</h3>
    <p class="gold-card-desc">Exclusive access to global wealth management tools, direct private aviation logs, and concierge operations.</p>
    <div class="gold-card-footer">
      <span class="gold-card-status">ELITE ACCOUNT</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Gold Glint Specular Angle Sweep
const goldCard = document.querySelector('.luxury-gold-card');
if (goldCard) {
  const glint = goldCard.querySelector('.luxury-gold-card-shine');
  
  goldCard.addEventListener('mousemove', (e) => {
    const rect = goldCard.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    
    if (glint) {
      glint.style.left = \`\${x}%\`;
      glint.style.transition = 'none';
    }
  });

  goldCard.addEventListener('mouseleave', () => {
    if (glint) {
      glint.style.transition = 'left 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)';
      glint.style.left = '-100%';
    }
  });
}`,
  ts: `// TypeScript Implementation
const goldCard = document.querySelector<HTMLDivElement>('.luxury-gold-card');
if (goldCard) {
  const glint = goldCard.querySelector<HTMLDivElement>('.luxury-gold-card-shine');
  
  if (glint) {
    goldCard.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = goldCard.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      
      glint.style.left = \`\${x}%\`;
      glint.style.transition = 'none';
    });

    goldCard.addEventListener('mouseleave', () => {
      glint.style.transition = 'left 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)';
      glint.style.left = '-100%';
    });
  }
}`,
  css: `/* Luxury Gold Specular Card Styles */
.luxury-gold-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: linear-gradient(135deg, #0e0a04 0%, #1a1307 100%);
  border: 1px solid transparent;
  background-clip: padding-box;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.75),
    inset 0 1px 1px rgba(255, 215, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Outer gold border mask using pseudo-element */
.luxury-gold-card::before {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 1;
  margin: -1px;
  border-radius: 12px;
  background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.luxury-gold-card::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 2;
  background: linear-gradient(135deg, #0e0a04 0%, #1a1307 100%);
  border-radius: 12px;
  margin: 0px;
}

.luxury-gold-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 4;
}

.gold-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.gold-card-star {
  color: #fcf6ba;
  font-size: 14px;
  text-shadow: 0 0 8px rgba(252, 246, 186, 0.8);
  animation: gold-star-breathe 2s infinite ease-in-out alternate;
}

.gold-card-category {
  color: #bf953f;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.gold-card-title {
  color: #bf953f;
  background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 50%, #b38728 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

.gold-card-desc {
  color: #928374;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.gold-card-footer {
  border-top: 1px solid rgba(191, 149, 63, 0.15);
  padding-top: 15px;
}

.gold-card-status {
  color: #fbf5b7;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(251, 245, 183, 0.3);
}

/* Diagonal specular sheen */
.luxury-gold-card-shine {
  position: absolute;
  top: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-30deg);
  left: -100%;
  z-index: 3;
  pointer-events: none;
}

/* Hover effects */
.luxury-gold-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 20px 45px rgba(179, 135, 40, 0.18),
    0 0 20px rgba(251, 245, 183, 0.08);
}

.luxury-gold-card:hover::before {
  opacity: 0.9;
}

.luxury-gold-card:hover .gold-card-title {
  background: linear-gradient(135deg, #ffffff 0%, #fcf6ba 50%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes gold-star-breathe {
  0% { transform: scale(0.9); opacity: 0.6; }
  100% { transform: scale(1.1); opacity: 1; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-gradient-to-br from-[#0e0a04] to-[#1a1307] rounded-xl cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.75)] hover:shadow-[0_20px_45px_rgba(179,135,40,0.18)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end p-[30px] z-10">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-[#fcf6ba] text-xs">✦</span>
      <span class="text-[#bf953f] font-bold text-xs tracking-widest">VIP PRESTIGE</span>
    </div>
    <div class="bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] bg-clip-text text-transparent font-bold text-2xl mb-2.5">Centurion Club</div>
    <div class="text-xs text-[#928374] leading-relaxed mb-6">Exclusive access to global wealth management tools, direct private aviation logs, and concierge operations.</div>
    <div class="border-t border-[#bf953f]/15 pt-4 text-[#fbf5b7] font-bold text-xs tracking-wider">
      ELITE ACCOUNT
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Luxury Gold Specular Card" component. Polished dark-obsidian plate outlines with metallic gold gradient borders. Hovering sweeps a diagonal specular light glint flare across the face, reflecting premium prestige.`
};
