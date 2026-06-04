/**
 * Component: Acoustic Equalizer Wave Card
 * Category: cards
 */

export const component = {
  id: 'equalizer-pulse-card',
  name: 'Acoustic Equalizer Wave Card',
  category: 'cards',
  tag: 'Interactive',
  html: `<div class="equalizer-pulse-card">
  <div class="card-equalizer-waves">
    <span class="card-eq-bar ce-bar-1"></span>
    <span class="card-eq-bar ce-bar-2"></span>
    <span class="card-eq-bar ce-bar-3"></span>
    <span class="card-eq-bar ce-bar-4"></span>
    <span class="card-eq-bar ce-bar-5"></span>
    <span class="card-eq-bar ce-bar-6"></span>
    <span class="card-eq-bar ce-bar-7"></span>
  </div>
  <div class="eq-card-content">
    <span class="eq-card-tag">SOUND SYNTHESIZER</span>
    <h3 class="eq-card-title">Acoustic Core</h3>
    <p class="eq-card-desc">Analyzing high-frequency audio streams, calculating dynamic wave amplitudes, and rendering spatial equalizer grids.</p>
    <div class="eq-card-footer">
      <span class="eq-card-status">FREQUENCY ACTIVE</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Equalizer Wave Frequency Pulse on Card Hover
const eqCard = document.querySelector('.equalizer-pulse-card');
if (eqCard) {
  const bars = eqCard.querySelectorAll('.card-eq-bar');
  
  eqCard.addEventListener('mouseenter', () => {
    // Accelerate acoustic frequencies on hover
    bars.forEach((bar, index) => {
      bar.style.animationPlayState = 'running';
      bar.style.animationDuration = \`\${0.3 + (index * 0.08)}s\`;
    });
  });

  eqCard.addEventListener('mouseleave', () => {
    // Decelerate to standard slow standby states
    bars.forEach((bar) => {
      bar.style.animationDuration = '1.5s';
    });
  });
}`,
  ts: `// TypeScript Implementation
const eqCard = document.querySelector<HTMLDivElement>('.equalizer-pulse-card');
if (eqCard) {
  const bars = eqCard.querySelectorAll<HTMLSpanElement>('.card-eq-bar');
  
  eqCard.addEventListener('mouseenter', () => {
    bars.forEach((bar, index) => {
      bar.style.animationPlayState = 'running';
      bar.style.animationDuration = \`\${0.3 + (index * 0.08)}s\`;
    });
  });

  eqCard.addEventListener('mouseleave', () => {
    bars.forEach((bar) => {
      bar.style.animationDuration = '1.5s';
    });
  });
}`,
  css: `/* Acoustic Equalizer Wave Card Styles */
.equalizer-pulse-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #04060a;
  border-radius: 16px;
  border: 1px solid rgba(0, 242, 254, 0.2);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.5),
    inset 0 0 10px rgba(0, 242, 254, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Audio equalizer bars container */
.card-equalizer-waves {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 50px;
  width: 120px;
  z-index: 1;
  pointer-events: none;
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.card-eq-bar {
  display: block;
  width: 4px;
  height: 100%;
  background: linear-gradient(to top, #00f2fe 0%, #4facfe 100%);
  border-radius: 20px;
  transform-origin: bottom;
  animation: card-eq-bounce 1.2s infinite ease-in-out alternate;
  animation-play-state: paused; /* Conserve CPU in standby */
}

/* Speed delays for visual complexity */
.ce-bar-1 { animation-delay: 0.1s; height: 30%; }
.ce-bar-2 { animation-delay: 0.4s; height: 70%; }
.ce-bar-3 { animation-delay: 0.2s; height: 50%; }
.ce-bar-4 { animation-delay: 0.6s; height: 90%; }
.ce-bar-5 { animation-delay: 0.3s; height: 40%; }
.ce-bar-6 { animation-delay: 0.5s; height: 80%; }
.ce-bar-7 { animation-delay: 0.15s; height: 60%; }

.eq-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #04060a 50%, rgba(4, 6, 10, 0.3) 100%);
}

.eq-card-tag {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  text-shadow: 0 0 5px rgba(0, 242, 254, 0.3);
}

.eq-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.eq-card-desc {
  color: #8da4be;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.eq-card-footer {
  border-top: 1px solid rgba(0, 242, 254, 0.2);
  padding-top: 15px;
}

.eq-card-status {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(0, 242, 254, 0.3);
}

/* Hover dynamic wave bouncing adjustments */
.equalizer-pulse-card:hover {
  border-color: #00f2fe;
  box-shadow: 
    0 20px 45px rgba(0, 242, 254, 0.28),
    0 0 20px rgba(0, 242, 254, 0.12),
    inset 0 0 15px rgba(0, 242, 254, 0.15);
  transform: translateY(-2px);
}

.equalizer-pulse-card:hover .card-equalizer-waves {
  opacity: 0.9;
}

.equalizer-pulse-card:hover .card-eq-bar {
  animation-play-state: running;
}

.equalizer-pulse-card:hover .eq-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}

.equalizer-pulse-card:active {
  transform: translateY(1px);
}

@keyframes card-eq-bounce {
  0% { transform: scaleY(0.2); }
  100% { transform: scaleY(1); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#04060a] rounded-2xl border border-[#00f2fe]/25 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-[#00f2fe] hover:shadow-[0_20px_45px_rgba(0,242,254,0.28)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#00f2fe] tracking-widest mb-3">SOUND SYNTHESIZER</div>
    <div class="font-bold text-2xl text-white mb-2.5">Acoustic Core</div>
    <div class="text-xs text-[#8da4be] leading-relaxed mb-6">Analyzing high-frequency audio streams, calculating dynamic wave amplitudes, and rendering spatial equalizer grids.</div>
    <div class="border-t border-[#00f2fe]/20 pt-4 text-[#00f2fe] font-bold text-xs tracking-wider">
      FREQUENCY ACTIVE
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Acoustic Equalizer Wave Card" component. Set inside a capsule dark-indigo structure, 7 equalizer sound wave lines scale dynamically. Hovering accelerates the acoustic frequencies.`
};
