/**
 * Component: Cosmic Portal Swirl Card
 * Category: cards
 */

export const component = {
  id: 'cosmic-portal-card',
  name: 'Cosmic Portal Swirl Card',
  category: 'cards',
  tag: 'Creative',
  html: `<div class="cosmic-portal-card">
  <div class="portal-card-blackhole">
    <div class="portal-card-ring pc-ring-1"></div>
    <div class="portal-card-ring pc-ring-2"></div>
    <div class="portal-card-ring pc-ring-3"></div>
  </div>
  <div class="portal-card-content">
    <span class="portal-card-tag">STELLAR OBSERVATORY</span>
    <h3 class="portal-card-title">Quantum Nebula</h3>
    <p class="portal-card-desc">Tracking active cosmic dust clusters, gravity wave frequencies, and quantum space warp coordinate calculations.</p>
    <div class="portal-card-footer">
      <span class="portal-card-status">ORBIT STABLE</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Portal Orb Speedup on Hover
const portalCard = document.querySelector('.cosmic-portal-card');
if (portalCard) {
  const rings = portalCard.querySelectorAll('.portal-card-ring');
  const text = portalCard.querySelector('.portal-card-title');
  
  portalCard.addEventListener('mouseenter', () => {
    // Accelerate cosmic rotation orbits
    rings.forEach((ring, idx) => {
      ring.style.animationDuration = \`\${2 + (idx * 0.8)}s\`;
    });
    if (text) {
      text.style.transform = 'scale(0.96)';
      text.style.color = '#ffffff';
    }
  });

  portalCard.addEventListener('mouseleave', () => {
    // Decelerate to standard orbit velocities
    rings.forEach((ring, idx) => {
      ring.style.animationDuration = \`\${5 + (idx * 1.5)}s\`;
    });
    if (text) {
      text.style.transform = 'scale(1)';
      text.style.color = '#d8bfd8';
    }
  });
}`,
  ts: `// TypeScript Implementation
const portalCard = document.querySelector<HTMLDivElement>('.cosmic-portal-card');
if (portalCard) {
  const rings = portalCard.querySelectorAll<HTMLDivElement>('.portal-card-ring');
  const text = portalCard.querySelector<HTMLHeadingElement>('.portal-card-title');
  
  portalCard.addEventListener('mouseenter', () => {
    rings.forEach((ring, idx) => {
      ring.style.animationDuration = \`\${2 + (idx * 0.8)}s\`;
    });
    if (text) {
      text.style.transform = 'scale(0.96)';
      text.style.color = '#ffffff';
    }
  });

  portalCard.addEventListener('mouseleave', () => {
    rings.forEach((ring, idx) => {
      ring.style.animationDuration = \`\${5 + (idx * 1.5)}s\`;
    });
    if (text) {
      text.style.transform = 'scale(1)';
      text.style.color = '#d8bfd8';
    }
  });
}`,
  css: `/* Cosmic Portal Swirl Card Styles */
.cosmic-portal-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #020106;
  border-radius: 16px;
  border: 1px solid rgba(138, 43, 226, 0.25);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.7),
    0 0 15px rgba(138, 43, 226, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.portal-card-blackhole {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 180px;
  height: 180px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  opacity: 0.4;
  transition: opacity 0.4s ease;
}

.portal-card-ring {
  position: absolute;
  inset: 0;
  border: 1px dashed transparent;
  border-radius: 50%;
  animation: portal-ring-rotate infinite linear;
}

.pc-ring-1 {
  border-color: rgba(138, 43, 226, 0.4);
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.15);
  animation-duration: 5s;
  padding: 15px;
}

.pc-ring-2 {
  border-color: rgba(255, 0, 127, 0.3);
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.1);
  animation-duration: 6.5s;
  animation-direction: reverse;
  padding: 30px;
}

.pc-ring-3 {
  border-color: rgba(0, 242, 254, 0.3);
  box-shadow: 0 0 25px rgba(0, 242, 254, 0.1);
  animation-duration: 8s;
  padding: 45px;
}

.portal-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #020106 50%, rgba(2, 1, 6, 0.3) 100%);
}

.portal-card-tag {
  color: #a283e5;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 10px;
}

.portal-card-title {
  color: #d8bfd8;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  transition: all 0.4s ease;
}

.portal-card-desc {
  color: #8fa0b5;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.portal-card-footer {
  border-top: 1px solid rgba(138, 43, 226, 0.2);
  padding-top: 15px;
}

.portal-card-status {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(0, 242, 254, 0.3);
}

/* Hover cosmic warps */
.cosmic-portal-card:hover {
  border-color: rgba(138, 43, 226, 0.7);
  box-shadow: 
    0 20px 45px rgba(138, 43, 226, 0.35),
    0 0 20px rgba(0, 242, 254, 0.15),
    inset 0 0 15px rgba(138, 43, 226, 0.15);
  transform: translateY(-2px);
}

.cosmic-portal-card:hover .portal-card-blackhole {
  opacity: 0.85;
}

.cosmic-portal-card:hover .portal-card-status {
  color: #ffffff;
  text-shadow: 0 0 8px #00f2fe;
}

@keyframes portal-ring-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#020106] rounded-2xl border border-purple-600/25 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:border-purple-600/70 hover:shadow-[0_20px_45px_rgba(138,43,226,0.35)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#a283e5] tracking-widest mb-2.5">STELLAR OBSERVATORY</div>
    <div class="font-bold text-2xl text-pink-200 mb-2 transition-transform duration-300 group-hover:scale-95">Quantum Nebula</div>
    <div class="text-xs text-[#8fa0b5] leading-relaxed mb-6">Tracking active cosmic dust clusters, gravity wave frequencies, and quantum space warp coordinate calculations.</div>
    <div class="border-t border-purple-600/20 pt-4 text-[#00f2fe] font-bold text-xs tracking-wider">
      ORBIT STABLE
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Cosmic Portal Swirl Card" component. Circular galaxy loops in purple and turquoise rotate inside. Hovering accelerates rotation speeds while slightly shrinking the typography on depth parallax layers.`
};
