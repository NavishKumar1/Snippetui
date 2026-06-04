/**
 * Component: Subliquid Bubble Card
 * Category: cards
 */

export const component = {
  id: 'liquid-bubble-card',
  name: 'Subliquid Bubble Card',
  category: 'cards',
  tag: 'Interactive',
  html: `<div class="liquid-bubble-card">
  <div class="card-bubble-pool"></div>
  <div class="liquid-card-content">
    <span class="liquid-card-tag">FLUID ARCHITECTURE</span>
    <h3 class="liquid-card-title">Aquatic Server</h3>
    <p class="liquid-card-desc">Submerged server node running liquid cooling algorithms, monitoring hydrostatic pressure, and bubble heat dissipation cycles.</p>
    <div class="liquid-card-footer">
      <span class="liquid-card-status">TEMP: 18°C</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Subliquid Bubble Spawner on Card Hover
const bubbleCard = document.querySelector('.liquid-bubble-card');
if (bubbleCard) {
  const pool = bubbleCard.querySelector('.card-bubble-pool');
  let bubbleInterval = null;
  
  bubbleCard.addEventListener('mouseenter', () => {
    bubbleInterval = setInterval(() => {
      const bubble = document.createElement('span');
      bubble.className = 'card-water-bubble';
      
      const size = 5 + Math.random() * 10;
      const startX = Math.random() * 100;
      const delay = Math.random() * 0.5;
      
      bubble.style.width = \`\${size}px\`;
      bubble.style.height = \`\${size}px\`;
      bubble.style.left = \`\${startX}%\`;
      bubble.style.animationDelay = \`\${delay}s\`;
      
      pool.appendChild(bubble);
      
      setTimeout(() => {
        bubble.remove();
      }, 2000);
    }, 180);
  });

  bubbleCard.addEventListener('mouseleave', () => {
    clearInterval(bubbleInterval);
  });
  
  bubbleCard.addEventListener('click', () => {
    const bubbles = pool.querySelectorAll('.card-water-bubble');
    bubbles.forEach((b) => {
      b.style.transform = 'scale(1.6)';
      b.style.opacity = '0';
      setTimeout(() => b.remove(), 150);
    });
  });
}`,
  ts: `// TypeScript Implementation
const bubbleCard = document.querySelector<HTMLDivElement>('.liquid-bubble-card');
if (bubbleCard) {
  const pool = bubbleCard.querySelector<HTMLDivElement>('.card-bubble-pool');
  if (pool) {
    let bubbleInterval: number | null = null;
    
    bubbleCard.addEventListener('mouseenter', () => {
      bubbleInterval = window.setInterval(() => {
        const bubble = document.createElement('span');
        bubble.className = 'card-water-bubble';
        
        const size = 5 + Math.random() * 10;
        const startX = Math.random() * 100;
        const delay = Math.random() * 0.5;
        
        bubble.style.width = \`\${size}px\`;
        bubble.style.height = \`\${size}px\`;
        bubble.style.left = \`\${startX}%\`;
        bubble.style.animationDelay = \`\${delay}s\`;
        
        pool.appendChild(bubble);
        
        setTimeout(() => {
          bubble.remove();
        }, 2000);
      }, 180);
    });

    bubbleCard.addEventListener('mouseleave', () => {
      if (bubbleInterval) clearInterval(bubbleInterval);
    });
    
    bubbleCard.addEventListener('click', () => {
      const bubbles = pool.querySelectorAll<HTMLSpanElement>('.card-water-bubble');
      bubbles.forEach((b) => {
        b.style.transform = 'scale(1.6)';
        b.style.opacity = '0';
        setTimeout(() => b.remove(), 150);
      });
    });
  }
}`,
  css: `/* Subliquid Bubble Card Styles */
.liquid-bubble-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: linear-gradient(180deg, rgba(0, 242, 254, 0.03) 0%, rgba(79, 172, 254, 0.1) 100%);
  border-radius: 16px;
  border: 1px solid rgba(0, 242, 254, 0.25);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(79, 172, 254, 0.12),
    inset 0 1px 2px rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-bubble-pool {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* Translucent watery bubble */
.card-water-bubble {
  position: absolute;
  bottom: -20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    inset 0 1px 2px rgba(255,255,255,0.5),
    0 2px 4px rgba(0,0,0,0.08);
  transform: scale(1);
  opacity: 1;
  pointer-events: none;
  animation: card-bubble-float 2s forwards ease-in;
}

.liquid-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, rgba(3, 8, 20, 0.9) 30%, rgba(3, 8, 20, 0.3) 100%);
}

.liquid-card-tag {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  text-shadow: 0 0 5px rgba(0, 242, 254, 0.3);
}

.liquid-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.liquid-card-desc {
  color: #8fa0b5;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.liquid-card-footer {
  border-top: 1px solid rgba(0, 242, 254, 0.2);
  padding-top: 15px;
}

.liquid-card-status {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(0, 242, 254, 0.3);
}

/* Hover organic glass glows */
.liquid-bubble-card:hover {
  border-color: #00f2fe;
  background: linear-gradient(180deg, rgba(0, 242, 254, 0.08) 0%, rgba(79, 172, 254, 0.18) 100%);
  box-shadow: 
    0 20px 45px rgba(0, 242, 254, 0.28),
    inset 0 1px 2px rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.liquid-bubble-card:hover .liquid-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}

/* Dynamic rising & waving math */
@keyframes card-bubble-float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-120px) translateX(12px);
    opacity: 1;
  }
  100% {
    transform: translateY(-280px) translateX(-10px) scale(0.6);
    opacity: 0;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-gradient-to-b from-[#00f2fe]/3 to-[#4facfe]/10 rounded-2xl border border-[#00f2fe]/25 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(79,172,254,0.12)] hover:border-[#00f2fe] hover:shadow-[0_20px_45px_rgba(0,242,254,0.28)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#00f2fe] tracking-widest mb-3">FLUID ARCHITECTURE</div>
    <div class="font-bold text-2xl text-white mb-2.5">Aquatic Server</div>
    <div class="text-xs text-[#8fa0b5] leading-relaxed mb-6">Submerged server node running liquid cooling algorithms, monitoring hydrostatic pressure, and bubble heat dissipation cycles.</div>
    <div class="border-t border-[#00f2fe]/20 pt-4 text-[#00f2fe] font-bold text-xs tracking-wider">
      TEMP: 18°C
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Subliquid Bubble Card" component. Translucent glassmorphic capsule plate glows in turquoise. Hovering spawns buoyant micro water-bubbles from the bottom floating upward in sine-wave paths before popping.`
};
