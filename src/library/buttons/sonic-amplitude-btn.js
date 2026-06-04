/**
 * Component: Sonic Amplitude Wave Button
 * Category: buttons
 */

export const component = {
  id: 'sonic-amplitude-btn',
  name: 'Sonic Amplitude Wave',
  category: 'buttons',
  tag: 'Interactive',
  html: `<button class="sonic-amplitude-btn">
  <div class="sonic-wave-container">
    <!-- SVG Oscillating Soundwave -->
    <svg class="sonic-svg" viewBox="0 0 200 40" preserveAspectRatio="none">
      <path class="sonic-path" d="M 0 20 Q 25 20, 50 20 T 100 20 T 150 20 T 200 20" />
    </svg>
  </div>
  <span class="sonic-text">TRANSMIT FREQUENCY</span>
</button>`,
  js: `// Interactive Sonic Amplitude Waveform morphing on hover
const sonicBtn = document.querySelector('.sonic-amplitude-btn');
if (sonicBtn) {
  const path = sonicBtn.querySelector('.sonic-path');
  let waveFrame = 0;
  let waveAnim = null;
  
  function animateWave() {
    waveFrame += 0.15;
    
    // Dynamic sine-wave coordinate morphing
    const amp1 = 8 * Math.sin(waveFrame);
    const amp2 = 6 * Math.cos(waveFrame * 1.5);
    
    const d = \`M 0 20 
               Q 25 \${20 + amp1}, 50 20 
               T 100 \${20 + amp2} 
               T 150 \${20 - amp1} 
               T 200 20\`;
               
    if (path) path.setAttribute('d', d);
    waveAnim = requestAnimationFrame(animateWave);
  }

  sonicBtn.addEventListener('mouseenter', () => {
    animateWave();
  });

  sonicBtn.addEventListener('mouseleave', () => {
    if (waveAnim) cancelAnimationFrame(waveAnim);
    // Reset path back to flat horizon line
    if (path) {
      path.setAttribute('d', 'M 0 20 Q 25 20, 50 20 T 100 20 T 150 20 T 200 20');
    }
  });
}`,
  ts: `// TypeScript Implementation
const sonicBtn = document.querySelector<HTMLButtonElement>('.sonic-amplitude-btn');
if (sonicBtn) {
  const path = sonicBtn.querySelector<SVGPathElement>('.sonic-path');
  let waveFrame = 0;
  let waveAnim: number | null = null;
  
  function animateWave() {
    waveFrame += 0.15;
    const amp1 = 8 * Math.sin(waveFrame);
    const amp2 = 6 * Math.cos(waveFrame * 1.5);
    
    const d = \`M 0 20 
               Q 25 \${20 + amp1}, 50 20 
               T 100 \${20 + amp2} 
               T 150 \${20 - amp1} 
               T 200 20\`;
               
    if (path) path.setAttribute('d', d);
    waveAnim = requestAnimationFrame(animateWave);
  }

  sonicBtn.addEventListener('mouseenter', () => {
    animateWave();
  });

  sonicBtn.addEventListener('mouseleave', () => {
    if (waveAnim) cancelAnimationFrame(waveAnim);
    if (path) {
      path.setAttribute('d', 'M 0 20 Q 25 20, 50 20 T 100 20 T 150 20 T 200 20');
    }
  });
}`,
  css: `/* Sonic Amplitude Wave Button Styles */
.sonic-amplitude-btn {
  position: relative;
  background: #040810;
  border: 1px solid rgba(0, 168, 255, 0.25);
  padding: 16px 36px;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 168, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.sonic-wave-container {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.15;
  transition: opacity 0.3s ease;
}

.sonic-svg {
  width: 100%;
  height: 100%;
}

.sonic-path {
  fill: none;
  stroke: #00a8ff;
  stroke-width: 2px;
  stroke-linecap: round;
  transition: stroke 0.3s ease;
}

.sonic-text {
  position: relative;
  z-index: 3;
  color: #00a8ff;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-shadow: 0 0 8px rgba(0, 168, 255, 0.3);
  transition: all 0.3s ease;
}

/* Hover active frequencies */
.sonic-amplitude-btn:hover {
  border-color: #00a8ff;
  box-shadow: 
    0 8px 25px rgba(0, 168, 255, 0.3),
    0 0 15px rgba(0, 168, 255, 0.15),
    inset 0 0 10px rgba(0, 168, 255, 0.1);
  transform: translateY(-2px);
}

.sonic-amplitude-btn:hover .sonic-wave-container {
  opacity: 0.6;
}

.sonic-amplitude-btn:hover .sonic-path {
  stroke: #ffffff;
}

.sonic-amplitude-btn:hover .sonic-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00a8ff;
}

.sonic-amplitude-btn:active {
  transform: translateY(1px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#040810] border border-[#00a8ff]/25 px-9 py-4 rounded-full cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#00a8ff] hover:shadow-[0_8px_25px_rgba(0,168,255,0.3)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#00a8ff] font-bold text-xs tracking-[0.18em] [text-shadow:0_0_8px_rgba(0,168,255,0.3)]">TRANSMIT FREQUENCY</span>
</button>`,
  prompt: `Design a premium "Sonic Amplitude Wave Button" component. A rounded dark capsule. Inside, a horizontal SVG sine-wave oscillates dynamically on hover mimicking frequency spectrum visualizers, with letters glowing electric-cyan.`
};
