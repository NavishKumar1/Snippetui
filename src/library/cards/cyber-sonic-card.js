/**
 * Component: Cyber Sonic Waveform Card
 * Category: cards
 */

export const component = {
  id: 'cyber-sonic-card',
  name: 'Cyber Sonic Card',
  category: 'cards',
  tag: 'Interactive',
  html: `<div class="cyber-sonic-card">
  <div class="sonic-waves-viewport">
    <div class="sonic-ring ring-1"></div>
    <div class="sonic-ring ring-2"></div>
    <div class="sonic-ring ring-3"></div>
  </div>
  <div class="sonic-grid-mesh"></div>
  <div class="sonic-card-interior">
    <div class="audio-waves-indicator">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <h3 class="sonic-title">Sonic Telemetry</h3>
    <p class="sonic-desc">Synthesizing frequency spikes and resonant micro-signals in low-latency communication lines.</p>
  </div>
</div>`,
  js: `// Hover reactive amplitude and ripple pitch controls
const sonicCard = document.querySelector('.cyber-sonic-card');
if (sonicCard) {
  const rings = sonicCard.querySelectorAll('.sonic-ring');
  const bars = sonicCard.querySelectorAll('.audio-waves-indicator .bar');
  
  sonicCard.addEventListener('mousemove', (e) => {
    const rect = sonicCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height;
    
    // Modify dynamic scale and animation delays matching cursor coords
    rings.forEach((ring, idx) => {
      const scaleBase = 1 + idx * 0.4;
      const hoverScale = scaleBase + (x * 0.3) + (y * 0.3);
      ring.style.transform = \`translate(-50%, -50%) scale(\${hoverScale})\`;
      ring.style.borderColor = \`rgba(16, 185, 129, \${0.15 + (1-y) * 0.25})\`;
    });

    // Make indicators ripple higher
    bars.forEach((bar) => {
      bar.style.height = \`\${10 + Math.random() * 15}px\`;
    });
  });

  sonicCard.addEventListener('mouseleave', () => {
    rings.forEach((ring, idx) => {
      ring.style.transform = \`translate(-50%, -50%) scale(\${1 + idx * 0.4})\`;
      ring.style.borderColor = 'rgba(16, 185, 129, 0.15)';
    });
    
    bars.forEach((bar) => {
      bar.style.height = '6px';
    });
  });
}`,
  ts: `// TypeScript Implementation
const sonicCard = document.querySelector<HTMLDivElement>('.cyber-sonic-card');
if (sonicCard) {
  const rings = sonicCard.querySelectorAll<HTMLDivElement>('.sonic-ring');
  const bars = sonicCard.querySelectorAll<HTMLSpanElement>('.audio-waves-indicator .bar');
  
  sonicCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = sonicCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    rings.forEach((ring, idx) => {
      const scaleBase = 1 + idx * 0.4;
      const hoverScale = scaleBase + (x * 0.3) + (y * 0.3);
      ring.style.transform = \`translate(-50%, -50%) scale(\${hoverScale})\`;
      ring.style.borderColor = \`rgba(16, 185, 129, \${0.15 + (1-y) * 0.25})\`;
    });

    bars.forEach((bar) => {
      bar.style.height = \`\${10 + Math.random() * 15}px\`;
    });
  });

  sonicCard.addEventListener('mouseleave', () => {
    rings.forEach((ring, idx) => {
      ring.style.transform = \`translate(-50%, -50%) scale(\${1 + idx * 0.4})\`;
      ring.style.borderColor = 'rgba(16, 185, 129, 0.15)';
    });
    
    bars.forEach((bar) => {
      bar.style.height = '6px';
    });
  });
}`,
  css: `/* Cyber Sonic Card Styles */
.cyber-sonic-card {
  position: relative;
  width: 320px;
  height: 220px;
  background: #040806;
  border: 1px solid rgba(16, 185, 129, 0.12);
  border-radius: 16px;
  overflow: hidden;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.7);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.cyber-sonic-card:hover {
  border-color: rgba(16, 185, 129, 0.35);
  box-shadow: 
    0 20px 45px -15px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(16, 185, 129, 0.08);
}

/* Equalizer wire mesh in background */
.sonic-grid-mesh {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-image: 
    radial-gradient(circle at center, rgba(16, 185, 129, 0.03) 0%, transparent 80%),
    linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px);
  background-size: 100% 100%, 8px 8px;
  pointer-events: none;
  opacity: 0.5;
}

/* Ripple wave rings viewport */
.sonic-waves-viewport {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  z-index: 2;
  pointer-events: none;
}

.sonic-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  border: 1.5px solid rgba(16, 185, 129, 0.15);
  border-radius: 50%;
  pointer-events: none;
  box-sizing: border-box;
  transition: transform 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), border-color 0.3s;
}

.ring-1 {
  width: 60px;
  height: 60px;
  animation: sonic-pulse-ripple 2.5s infinite linear;
}

.ring-2 {
  width: 120px;
  height: 120px;
  animation: sonic-pulse-ripple 3.5s infinite linear 0.5s;
}

.ring-3 {
  width: 180px;
  height: 180px;
  animation: sonic-pulse-ripple 4.5s infinite linear 1s;
}

@keyframes sonic-pulse-ripple {
  0% {
    box-shadow: 0 0 0px rgba(16, 185, 129, 0);
  }
  50% {
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);
  }
  100% {
    box-shadow: 0 0 0px rgba(16, 185, 129, 0);
  }
}

/* Internal Content elements */
.sonic-card-interior {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.audio-waves-indicator {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 25px;
}

.audio-waves-indicator .bar {
  width: 3px;
  height: 6px;
  background: #10b981;
  border-radius: 2px;
  transition: height 0.15s ease;
}

.sonic-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.sonic-desc {
  font-size: 12px;
  color: #a3a3a3;
  line-height: 1.5;
  margin: 0;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] h-[220px] bg-[#040806] rounded-2xl border border-emerald-500/10 overflow-hidden flex flex-col justify-end p-6 shadow-2xl">
  <div class="relative z-10 flex flex-col items-start gap-2">
    <div class="flex items-end gap-0.5 h-6">
      <span class="w-[3px] h-[6px] bg-emerald-500 rounded"></span>
    </div>
    <h3 class="text-lg font-bold text-white">Sonic Telemetry</h3>
    <p class="text-xs text-gray-300">Synthesizing frequency spikes and resonant micro-signals in low-latency communication lines.</p>
  </div>
</div>`,
  prompt: `Design a premium "Cyber Sonic Waveform Card" component. An interactive deck showcasing live green laser concentric sound rings rippling outward from the card. On hover, the waves adjust scale, frequency, and borders matching user cursor coordinates.`
};
