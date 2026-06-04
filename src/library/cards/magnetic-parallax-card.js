/**
 * Component: Magnetic Parallax 3D Card
 * Category: cards
 */

export const component = {
  id: 'magnetic-parallax-card',
  name: 'Magnetic Parallax 3D Card',
  category: 'cards',
  tag: 'Interactive',
  html: `<div class="parallax-card-container">
  <div class="parallax-card">
    <div class="parallax-card-bg"></div>
    <div class="parallax-card-glow"></div>
    <div class="parallax-card-content">
      <span class="parallax-card-tag">ANALYTICS</span>
      <h3 class="parallax-card-title">Data Intelligence</h3>
      <p class="parallax-card-desc">Real-time deep diagnostic algorithms and neural network metric charts.</p>
      <div class="parallax-card-metric">99.8%</div>
    </div>
  </div>
</div>`,
  js: `// Interactive 3D Magnetic Parallax tilt tracking
const parallaxContainer = document.querySelector('.parallax-card-container');
if (parallaxContainer) {
  const card = parallaxContainer.querySelector('.parallax-card');
  const content = parallaxContainer.querySelector('.parallax-card-content');
  const bg = parallaxContainer.querySelector('.parallax-card-bg');
  const glow = parallaxContainer.querySelector('.parallax-card-glow');
  
  parallaxContainer.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt angle conversions
    const rotateX = ((y / rect.height) - 0.5) * -25; // Max 25deg tilt
    const rotateY = ((x / rect.width) - 0.5) * 25;
    
    // Position glowing coordinates
    if (glow) {
      glow.style.left = \`\${x}px\`;
      glow.style.top = \`\${y}px\`;
      glow.style.opacity = '1';
    }
    
    card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
    card.style.transition = 'none';
    
    // Shift contents for parallax depth layers
    if (content) {
      const dx = ((x / rect.width) - 0.5) * -12;
      const dy = ((y / rect.height) - 0.5) * -12;
      content.style.transform = \`translate3d(\${dx}px, \${dy}px, 30px)\`;
      content.style.transition = 'none';
    }
    
    if (bg) {
      const bx = ((x / rect.width) - 0.5) * 8;
      const by = ((y / rect.height) - 0.5) * 8;
      bg.style.transform = \`translate3d(\${bx}px, \${by}px, -10px) scale(1.15)\`;
      bg.style.transition = 'none';
    }
  });

  parallaxContainer.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    
    if (glow) glow.style.opacity = '0';
    
    if (content) {
      content.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
      content.style.transform = 'translate3d(0px, 0px, 30px)';
    }
    
    if (bg) {
      bg.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
      bg.style.transform = 'translate3d(0px, 0px, -10px) scale(1.1)';
    }
  });
}`,
  ts: `// TypeScript Implementation
const parallaxContainer = document.querySelector<HTMLDivElement>('.parallax-card-container');
if (parallaxContainer) {
  const card = parallaxContainer.querySelector<HTMLDivElement>('.parallax-card');
  const content = parallaxContainer.querySelector<HTMLDivElement>('.parallax-card-content');
  const bg = parallaxContainer.querySelector<HTMLDivElement>('.parallax-card-bg');
  const glow = parallaxContainer.querySelector<HTMLDivElement>('.parallax-card-glow');
  
  if (card) {
    parallaxContainer.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const rotateX = ((y / rect.height) - 0.5) * -25;
      const rotateY = ((x / rect.width) - 0.5) * 25;
      
      if (glow) {
        glow.style.left = \`\${x}px\`;
        glow.style.top = \`\${y}px\`;
        glow.style.opacity = '1';
      }
      
      card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
      card.style.transition = 'none';
      
      if (content) {
        const dx = ((x / rect.width) - 0.5) * -12;
        const dy = ((y / rect.height) - 0.5) * -12;
        content.style.transform = \`translate3d(\${dx}px, \${dy}px, 30px)\`;
        content.style.transition = 'none';
      }
      
      if (bg) {
        const bx = ((x / rect.width) - 0.5) * 8;
        const by = ((y / rect.height) - 0.5) * 8;
        bg.style.transform = \`translate3d(\${bx}px, \${by}px, -10px) scale(1.15)\`;
        bg.style.transition = 'none';
      }
    });

    parallaxContainer.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      
      if (glow) glow.style.opacity = '0';
      
      if (content) {
        content.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        content.style.transform = 'translate3d(0px, 0px, 30px)';
      }
      
      if (bg) {
        bg.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        bg.style.transform = 'translate3d(0px, 0px, -10px) scale(1.1)';
      }
    });
  }
}`,
  css: `/* Magnetic Parallax 3D Card Styles */
.parallax-card-container {
  perspective: 800px;
  display: inline-block;
  padding: 20px;
}

.parallax-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #09090f;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transform-style: preserve-3d;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.5),
    0 1px 3px rgba(255, 255, 255, 0.05);
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease;
}

/* Layered backdrop */
.parallax-card-bg {
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 10% 80%, rgba(0, 242, 254, 0.1) 0%, transparent 50%);
  transform: translate3d(0, 0, -10px) scale(1.1);
  pointer-events: none;
  z-index: 1;
}

/* Radial light glow tracking */
.parallax-card-glow {
  position: absolute;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(0, 242, 254, 0.18) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.5s ease;
}

/* Floating content layer */
.parallax-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  transform: translate3d(0px, 0px, 30px);
  z-index: 3;
}

.parallax-card-tag {
  align-self: flex-start;
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
}

.parallax-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.parallax-card-desc {
  color: #9ca3af;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.parallax-card-metric {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 800;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
}

.parallax-card:hover {
  border-color: rgba(0, 242, 254, 0.25);
  box-shadow: 
    0 20px 45px rgba(0, 0, 0, 0.65),
    0 0 15px rgba(0, 242, 254, 0.1);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="perspective-[800px] inline-block p-5">
  <div class="group relative w-[300px] h-[380px] bg-[#09090f] rounded-2xl border border-white/8 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#00f2fe]/25 hover:shadow-[0_20px_45px_rgba(0,0,0,0.65)] transition-all duration-300">
    <div class="absolute -start-[10%] -top-[10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_80%_20%,rgba(138,43,226,0.15)_0%,transparent_60%)] -z-10"></div>
    <div class="font-bold text-xs text-[#00f2fe] tracking-widest mb-3">ANALYTICS</div>
    <div class="font-bold text-2xl text-white mb-2.5">Data Intelligence</div>
    <div class="text-xs text-[#9ca3af] leading-relaxed mb-5">Real-time deep diagnostic algorithms and neural network metric charts.</div>
    <div class="font-extrabold text-3xl text-white">99.8%</div>
  </div>
</div>`,
  prompt: `Design a premium "Magnetic Parallax 3D Card" component. An obsidian rectangular card container tilts dynamically on 3D X/Y angles tracking the cursor coordinates. Inside, the textual layouts and glowing color nebulas float independently to generate a massive 3D parallax depth effect.`
};
