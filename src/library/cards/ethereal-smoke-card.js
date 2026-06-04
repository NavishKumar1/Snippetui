/**
 * Component: Ethereal Smoke Current Card
 * Category: cards
 */

export const component = {
  id: 'ethereal-smoke-card',
  name: 'Ethereal Smoke Current Card',
  category: 'cards',
  tag: 'Aesthetic',
  html: `<div class="ethereal-smoke-card">
  <div class="smoke-current-backdrop">
    <span class="smoke-wisp wisp-1"></span>
    <span class="smoke-wisp wisp-2"></span>
    <span class="smoke-wisp wisp-3"></span>
  </div>
  <div class="smoke-card-content">
    <span class="smoke-card-tag">ATMOSPHERIC FLOW</span>
    <h3 class="smoke-card-title">Aero Dynamics</h3>
    <p class="smoke-card-desc">Simulating localized atmospheric velocity currents, thermal gas density fields, and kinetic micro turbulence loops.</p>
    <div class="smoke-card-footer">
      <span class="smoke-card-status">FLOW VELOCITY: 42 m/s</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Smoke Current morphing on Hover
const smokeCard = document.querySelector('.ethereal-smoke-card');
if (smokeCard) {
  const wisps = smokeCard.querySelectorAll('.smoke-wisp');
  
  smokeCard.addEventListener('mousemove', (e) => {
    const rect = smokeCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Distort wisps organically based on cursor coordinate inputs
    wisps.forEach((wisp, idx) => {
      const scaleMultiplier = 1 + (idx * 0.15);
      const rotateDeg = ((x / rect.width) - 0.5) * 45 * scaleMultiplier;
      const translateY = ((y / rect.height) - 0.5) * -30 * scaleMultiplier;
      
      wisp.style.transform = \`translateY(\${translateY}px) rotate(\${rotateDeg}deg) scale(\${scaleMultiplier})\`;
    });
  });

  smokeCard.addEventListener('mouseleave', () => {
    // Smooth release back to slow undulating states
    wisps.forEach((wisp, idx) => {
      wisp.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
      wisp.style.transform = \`rotate(0deg) scale(\${1 + (idx * 0.15)})\`;
    });
  });
  
  smokeCard.addEventListener('mouseenter', () => {
    wisps.forEach((wisp) => {
      wisp.style.transition = 'none';
    });
  });
}`,
  ts: `// TypeScript Implementation
const smokeCard = document.querySelector<HTMLDivElement>('.ethereal-smoke-card');
if (smokeCard) {
  const wisps = smokeCard.querySelectorAll<HTMLSpanElement>('.smoke-wisp');
  
  smokeCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = smokeCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    wisps.forEach((wisp, idx) => {
      const scaleMultiplier = 1 + (idx * 0.15);
      const rotateDeg = ((x / rect.width) - 0.5) * 45 * scaleMultiplier;
      const translateY = ((y / rect.height) - 0.5) * -30 * scaleMultiplier;
      
      wisp.style.transform = \`translateY(\${translateY}px) rotate(\${rotateDeg}deg) scale(\${scaleMultiplier})\`;
    });
  });

  smokeCard.addEventListener('mouseleave', () => {
    wisps.forEach((wisp, idx) => {
      wisp.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
      wisp.style.transform = \`rotate(0deg) scale(\${1 + (idx * 0.15)})\`;
    });
  });
  
  smokeCard.addEventListener('mouseenter', () => {
    wisps.forEach((wisp) => {
      wisp.style.transition = 'none';
    });
  });
}`,
  css: `/* Ethereal Smoke Current Card Styles */
.ethereal-smoke-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #020105;
  border-radius: 16px;
  border: 1px solid rgba(138, 43, 226, 0.18);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.7),
    0 0 10px rgba(138, 43, 226, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.smoke-current-backdrop {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.25;
  transition: opacity 0.4s ease;
}

/* Atmospheric smoke vapor curves */
.smoke-wisp {
  position: absolute;
  inset: -20px;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  border: 1.5px solid transparent;
  pointer-events: none;
  mix-blend-mode: screen;
}

.wisp-1 {
  border-color: rgba(0, 242, 254, 0.35);
  box-shadow: inset 0 0 25px rgba(0, 242, 254, 0.1);
  animation: smoke-warp-slow-1 8s infinite ease-in-out alternate;
}

.wisp-2 {
  border-color: rgba(255, 0, 127, 0.25);
  box-shadow: inset 0 0 25px rgba(255, 0, 127, 0.08);
  animation: smoke-warp-slow-2 10s infinite ease-in-out alternate;
}

.wisp-3 {
  border-color: rgba(138, 43, 226, 0.2);
  box-shadow: inset 0 0 25px rgba(138, 43, 226, 0.05);
  animation: smoke-warp-slow-3 12s infinite ease-in-out alternate;
}

.smoke-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #020105 50%, rgba(2, 1, 5, 0.2) 100%);
}

.smoke-card-tag {
  color: #a283e5;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
}

.smoke-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.smoke-card-desc {
  color: #8fa0b5;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.smoke-card-footer {
  border-top: 1px solid rgba(138, 43, 226, 0.15);
  padding-top: 15px;
}

.smoke-card-status {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

/* Hover organic gas transitions */
.ethereal-smoke-card:hover {
  border-color: rgba(0, 242, 254, 0.5);
  box-shadow: 
    0 20px 45px rgba(0, 242, 254, 0.22),
    0 0 20px rgba(138, 43, 226, 0.15);
  transform: translateY(-2px);
}

.ethereal-smoke-card:hover .smoke-current-backdrop {
  opacity: 0.75;
}

.ethereal-smoke-card:hover .smoke-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}

/* Slowly warping gas lines */
@keyframes smoke-warp-slow-1 {
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(0deg); }
  100% { border-radius: 50% 50% 60% 40% / 30% 60% 40% 70%; transform: rotate(15deg); }
}

@keyframes smoke-warp-slow-2 {
  0% { border-radius: 60% 40% 30% 70% / 50% 30% 70% 40%; transform: rotate(0deg); }
  100% { border-radius: 40% 60% 50% 50% / 60% 40% 50% 60%; transform: rotate(-15deg); }
}

@keyframes smoke-warp-slow-3 {
  0% { border-radius: 30% 70% 50% 50% / 40% 60% 30% 70%; transform: rotate(0deg); }
  100% { border-radius: 60% 40% 60% 40% / 50% 50% 60% 40%; transform: rotate(20deg); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#020105] rounded-2xl border border-purple-600/20 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:border-cyan-400/50 hover:shadow-[0_20px_45px_rgba(0,242,254,0.22)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#a283e5] tracking-widest mb-3">ATMOSPHERIC FLOW</div>
    <div class="font-bold text-2xl text-white mb-2.5">Aero Dynamics</div>
    <div class="text-xs text-[#8fa0b5] leading-relaxed mb-6">Simulating localized atmospheric velocity currents, thermal gas density fields, and kinetic micro turbulence loops.</div>
    <div class="border-t border-purple-600/15 pt-4 text-[#00f2fe] font-bold text-xs tracking-wider">
      FLOW VELOCITY: 42 m/s
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Ethereal Smoke Current Card" component. Deep obsidian container glows in magenta/cyan, showing drifting atmospheric smoke wisps. Hovering shifts the waves dynamically to track the pointer coordinates.`
};
