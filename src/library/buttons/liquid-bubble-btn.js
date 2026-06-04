/**
 * Component: Subliquid Bubble Float Button
 * Category: buttons
 */

export const component = {
  id: 'liquid-bubble-btn',
  name: 'Subliquid Bubble Float',
  category: 'buttons',
  tag: 'Interactive',
  html: `<button class="liquid-bubble-btn">
  <div class="bubble-pool"></div>
  <span class="bubble-text">SUBMERGE</span>
</button>`,
  js: `// Interactive Subliquid Bubble Spawner on Hover
const bubbleBtn = document.querySelector('.liquid-bubble-btn');
if (bubbleBtn) {
  const pool = bubbleBtn.querySelector('.bubble-pool');
  let bubbleInterval = null;
  
  bubbleBtn.addEventListener('mouseenter', () => {
    // Start generating bubbles at regular intervals
    bubbleInterval = setInterval(() => {
      const bubble = document.createElement('span');
      bubble.className = 'water-bubble';
      
      const size = 4 + Math.random() * 8;
      const startX = Math.random() * 100;
      const delay = Math.random() * 0.5;
      
      bubble.style.width = \`\${size}px\`;
      bubble.style.height = \`\${size}px\`;
      bubble.style.left = \`\${startX}%\`;
      bubble.style.animationDelay = \`\${delay}s\`;
      
      pool.appendChild(bubble);
      
      // Clean up when bubble floats off boundary
      setTimeout(() => {
        bubble.remove();
      }, 1500);
    }, 150);
  });

  bubbleBtn.addEventListener('mouseleave', () => {
    clearInterval(bubbleInterval);
  });
  
  bubbleBtn.addEventListener('click', () => {
    // Pop all current bubbles instantly on click
    const bubbles = pool.querySelectorAll('.water-bubble');
    bubbles.forEach((b) => {
      b.style.transform = 'scale(1.5)';
      b.style.opacity = '0';
      setTimeout(() => b.remove(), 150);
    });
  });
}`,
  ts: `// TypeScript Implementation
const bubbleBtn = document.querySelector<HTMLButtonElement>('.liquid-bubble-btn');
if (bubbleBtn) {
  const pool = bubbleBtn.querySelector<HTMLDivElement>('.bubble-pool');
  if (pool) {
    let bubbleInterval: number | null = null;
    
    bubbleBtn.addEventListener('mouseenter', () => {
      bubbleInterval = window.setInterval(() => {
        const bubble = document.createElement('span');
        bubble.className = 'water-bubble';
        
        const size = 4 + Math.random() * 8;
        const startX = Math.random() * 100;
        const delay = Math.random() * 0.5;
        
        bubble.style.width = \`\${size}px\`;
        bubble.style.height = \`\${size}px\`;
        bubble.style.left = \`\${startX}%\`;
        bubble.style.animationDelay = \`\${delay}s\`;
        
        pool.appendChild(bubble);
        
        setTimeout(() => {
          bubble.remove();
        }, 1500);
      }, 150);
    });

    bubbleBtn.addEventListener('mouseleave', () => {
      if (bubbleInterval) clearInterval(bubbleInterval);
    });
    
    bubbleBtn.addEventListener('click', () => {
      const bubbles = pool.querySelectorAll<HTMLSpanElement>('.water-bubble');
      bubbles.forEach((b) => {
        b.style.transform = 'scale(1.5)';
        b.style.opacity = '0';
        setTimeout(() => b.remove(), 150);
      });
    });
  }
}`,
  css: `/* Subliquid Bubble Float Button Styles */
.liquid-bubble-btn {
  position: relative;
  background: linear-gradient(180deg, rgba(0, 242, 254, 0.05) 0%, rgba(79, 172, 254, 0.15) 100%);
  border: 1px solid rgba(0, 242, 254, 0.3);
  padding: 16px 38px;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 8px 20px rgba(79, 172, 254, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.bubble-pool {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* Translucent watery bubble */
.water-bubble {
  position: absolute;
  bottom: -10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 
    inset 0 1px 3px rgba(255,255,255,0.6),
    0 2px 4px rgba(0,0,0,0.1);
  transform: scale(1);
  opacity: 1;
  pointer-events: none;
  animation: bubble-rise-drift 1.5s forwards ease-in;
}

.bubble-text {
  position: relative;
  z-index: 3;
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
  transition: all 0.3s ease;
}

/* Hover visual shifts */
.liquid-bubble-btn:hover {
  border-color: #00f2fe;
  background: linear-gradient(180deg, rgba(0, 242, 254, 0.1) 0%, rgba(79, 172, 254, 0.25) 100%);
  box-shadow: 
    0 12px 30px rgba(0, 242, 254, 0.35),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.liquid-bubble-btn:hover .bubble-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}

.liquid-bubble-btn:active {
  transform: translateY(1px);
}

/* Dynamic rising & waving math */
@keyframes bubble-rise-drift {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-30px) translateX(8px);
    opacity: 1;
  }
  100% {
    transform: translateY(-70px) translateX(-6px) scale(0.5);
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-gradient-to-b from-[#00f2fe]/5 to-[#4facfe]/15 border border-[#00f2fe]/30 px-9 py-4 rounded-full cursor-pointer overflow-hidden shadow-[0_8px_20px_rgba(79,172,254,0.15)] hover:border-[#00f2fe] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#00f2fe] font-bold text-xs tracking-[0.2em] [text-shadow:0_0_10px_rgba(0,242,254,0.4)]">SUBMERGE</span>
</button>`,
  prompt: `Design a premium "Subliquid Bubble Float Button" component. A translucent capsule frosted glass plate glows cyan. Hovering spawns buoyant, glassy water-bubbles from the lower boundaries drifting upward in sine-wave paths before popping organically.`
};
