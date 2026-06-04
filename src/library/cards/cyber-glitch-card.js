/**
 * Component: Cyber Glitch Scanline Card
 * Category: cards
 */

export const component = {
  id: 'cyber-glitch-card',
  name: 'Cyber Glitch Scanline Card',
  category: 'cards',
  tag: 'Glitch',
  html: `<div class="cyber-glitch-card" data-title="Security Core">
  <span class="cyber-card-scanline"></span>
  <div class="cyber-card-content">
    <span class="cyber-card-tag">GATEWAY FIREWALL</span>
    <h3 class="cyber-card-title">Security Core</h3>
    <p class="cyber-card-desc">Real-time threat level analysis filtering foreign IP sweeps and active buffer overruns.</p>
    <div class="cyber-card-footer">
      <div class="cyber-stat">
        <span class="stat-label">THREAT LEVEL</span>
        <span class="stat-value">0.02%</span>
      </div>
      <div class="cyber-stat">
        <span class="stat-label">BANDWIDTH</span>
        <span class="stat-value">9.8 GB/s</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Interactive text scramble glitch decoder on Hover
const cyberCard = document.querySelector('.cyber-glitch-card');
if (cyberCard) {
  const title = cyberCard.querySelector('.cyber-card-title');
  const originalText = title.innerText;
  let glitchInterval = null;
  const chars = '010101#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  cyberCard.addEventListener('mouseenter', () => {
    let iteration = 0;
    clearInterval(glitchInterval);
    
    glitchInterval = setInterval(() => {
      title.innerText = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      if (iteration >= originalText.length) {
        clearInterval(glitchInterval);
      }
      iteration += 1 / 3;
    }, 40);
  });

  cyberCard.addEventListener('mouseleave', () => {
    clearInterval(glitchInterval);
    title.innerText = originalText;
  });
}`,
  ts: `// TypeScript Implementation
const cyberCard = document.querySelector<HTMLDivElement>('.cyber-glitch-card');
if (cyberCard) {
  const title = cyberCard.querySelector<HTMLHeadingElement>('.cyber-card-title');
  if (title) {
    const originalText = title.innerText;
    let glitchInterval: number | null = null;
    const chars = '010101#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    cyberCard.addEventListener('mouseenter', () => {
      let iteration = 0;
      if (glitchInterval) clearInterval(glitchInterval);
      
      glitchInterval = window.setInterval(() => {
        title.innerText = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        if (iteration >= originalText.length) {
          if (glitchInterval) clearInterval(glitchInterval);
        }
        iteration += 1 / 3;
      }, 40);
    });

    cyberCard.addEventListener('mouseleave', () => {
      if (glitchInterval) clearInterval(glitchInterval);
      title.innerText = originalText;
    });
  }
}`,
  css: `/* Cyber Glitch Scanline Card Styles */
.cyber-glitch-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #020406;
  border-radius: 8px;
  border: 1px solid #ff007f;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 10px 25px rgba(255, 0, 127, 0.15),
    inset 0 0 10px rgba(255, 0, 127, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Glowing cyberpunk scanline loop */
.cyber-card-scanline {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #00f2fe;
  box-shadow: 0 0 12px #00f2fe;
  top: -10px;
  opacity: 0;
  z-index: 10;
}

.cyber-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
}

.cyber-card-tag {
  color: #ff007f;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 12px;
  text-shadow: 0 0 5px rgba(255, 0, 127, 0.4);
}

.cyber-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
}

.cyber-card-desc {
  color: #8fa0b5;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  line-height: 1.6;
  margin-bottom: 25px;
}

.cyber-card-footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 0, 127, 0.2);
  padding-top: 15px;
}

.cyber-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  color: #8fa0b5;
  font-family: 'Outfit', sans-serif;
  font-size: 9px;
  letter-spacing: 0.1em;
}

.stat-value {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.3);
}

/* Hover glitch states */
.cyber-glitch-card:hover {
  border-color: #00f2fe;
  box-shadow: 
    0 15px 35px rgba(0, 242, 254, 0.3),
    inset 0 0 15px rgba(0, 242, 254, 0.15);
  animation: cyber-card-shake-glitch 0.3s linear;
  transform: translateY(-2px);
}

.cyber-glitch-card:hover .cyber-card-scanline {
  animation: cyber-scan-loop-card 2s infinite linear;
}

.cyber-glitch-card:hover .cyber-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}

@keyframes cyber-scan-loop-card {
  0% { top: 0%; opacity: 0.6; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

@keyframes cyber-card-shake-glitch {
  0%, 100% { transform: translate(0, 0) translateY(-2px); }
  20% { transform: translate(-2px, 2px) translateY(-2px); }
  40% { transform: translate(2px, -2px) skewX(2deg) translateY(-2px); }
  60% { transform: translate(-2px, -2px) skewX(-2deg) translateY(-2px); }
  80% { transform: translate(2px, 2px) translateY(-2px); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#020406] rounded-lg border border-[#ff007f] flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_10px_25px_rgba(255,0,127,0.15)] hover:border-[#00f2fe] hover:shadow-[0_15px_35px_rgba(0,242,254,0.3)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="font-bold text-xs text-[#ff007f] tracking-widest mb-3">GATEWAY FIREWALL</div>
  <div class="font-bold text-2xl text-white mb-2.5">Security Core</div>
  <div class="text-xs text-[#8fa0b5] font-mono leading-relaxed mb-6">Real-time threat level analysis filtering foreign IP sweeps and active buffer overruns.</div>
  <div class="flex justify-between border-t border-[#ff007f]/20 pt-4">
    <div class="flex flex-col">
      <span class="text-[9px] text-[#8fa0b5] tracking-wider mb-1">THREAT LEVEL</span>
      <span class="font-bold text-sm text-[#00f2fe]">0.02%</span>
    </div>
    <div class="flex flex-col">
      <span class="text-[9px] text-[#8fa0b5] tracking-wider mb-1">BANDWIDTH</span>
      <span class="font-bold text-sm text-[#00f2fe]">9.8 GB/s</span>
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Cyber Glitch Scanline Card" component. Outlined in neon-pink, the card contains high-fidelity console telemetry logs. Hovering triggers cyber-glitch coordinate shakes and active horizontal green scanlines traversing the card.`
};
