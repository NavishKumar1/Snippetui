/**
 * Component: Sonic Amplitude Waves Input
 * Category: inputs
 */

export const component = {
  id: 'sonic-amplitude-input',
  name: 'Sonic Amplitude Waves Input',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="sonic-input-group">
  <input type="text" class="sonic-input-field" placeholder=" " id="sonic-input-demo" autocomplete="off">
  <div class="sonic-wave-track">
    <span class="sonic-wave-bar bar-1"></span>
    <span class="sonic-wave-bar bar-2"></span>
    <span class="sonic-wave-bar bar-3"></span>
    <span class="sonic-wave-bar bar-4"></span>
    <span class="sonic-wave-bar bar-5"></span>
  </div>
  <label class="sonic-input-label" for="sonic-input-demo">SONIC SIGNATURE</label>
</div>`,
  js: `// Keydowns trigger dynamic acoustic wave spikes across the bar tracker
const sonicInput = document.querySelector('.sonic-input-field');
if (sonicInput) {
  const bars = sonicInput.parentElement.querySelectorAll('.sonic-wave-bar');
  
  sonicInput.addEventListener('keydown', () => {
    bars.forEach(bar => {
      bar.style.animation = 'none';
      bar.offsetHeight; // trigger reflow
      
      const duration = Math.random() * 0.3 + 0.2;
      const height = Math.random() * 25 + 5;
      
      bar.style.height = \`\${height}px\`;
      bar.style.animation = \`sonic-amplitude-bounce \${duration}s ease-out\`;
    });
  });
}`,
  ts: `// TypeScript Implementation
const sonicInput = document.querySelector<HTMLInputElement>('.sonic-input-field');
if (sonicInput) {
  const parent = sonicInput.parentElement;
  if (parent) {
    const bars = parent.querySelectorAll<HTMLSpanElement>('.sonic-wave-bar');
    
    sonicInput.addEventListener('keydown', () => {
      bars.forEach(bar => {
        bar.style.animation = 'none';
        bar.offsetHeight; // trigger reflow
        
        const duration = Math.random() * 0.3 + 0.2;
        const height = Math.random() * 25 + 5;
        
        bar.style.height = \`\${height}px\`;
        bar.style.animation = \`sonic-amplitude-bounce \${duration}s ease-out\`;
      });
    });
  }
}`,
  css: `/* Sonic Amplitude Waves Input Styles */
.sonic-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.sonic-input-field {
  width: 100%;
  padding: 16px 18px 24px 18px; /* Extra bottom padding for wave bars */
  background: #06080c;
  border: 1px solid rgba(0, 242, 254, 0.12);
  border-radius: 8px;
  color: #e6f9ff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  z-index: 2;
  position: relative;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.sonic-wave-track {
  position: absolute;
  bottom: 8px;
  left: 18px;
  right: 18px;
  height: 3px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  pointer-events: none;
  z-index: 3;
}

.sonic-wave-bar {
  width: 6px;
  height: 3px;
  background: linear-gradient(180deg, #00f2fe 0%, #4facfe 100%);
  border-radius: 3px;
  transition: all 0.15s ease;
}

.sonic-input-label {
  position: absolute;
  left: 18px;
  top: 40%;
  transform: translateY(-50%);
  color: rgba(0, 242, 254, 0.4);
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  pointer-events: none;
  z-index: 4;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Interactions */
.sonic-input-field:focus {
  border-color: rgba(0, 242, 254, 0.5);
  box-shadow: 
    0 8px 25px rgba(0, 242, 254, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 0.08);
}

.sonic-input-field:focus ~ .sonic-input-label,
.sonic-input-field:not(:placeholder-shown) ~ .sonic-input-label {
  transform: translateY(-155%) scale(0.85);
  color: #00f2fe;
  text-shadow: 0 0 6px rgba(0, 242, 254, 0.4);
  background: #06080c;
  padding: 0 4px;
  z-index: 10;
}

@keyframes sonic-amplitude-bounce {
  0% { transform: scaleY(1); }
  50% { transform: scaleY(3.5); filter: brightness(1.2); }
  100% { transform: scaleY(1); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="sonic-input-demo" autocomplete="off"
    class="peer w-full px-[18px] pt-4 pb-6 bg-[#06080c] border border-cyan-500/20 rounded-lg text-cyan-100 outline-none focus:border-cyan-400 transition-all duration-300 relative z-10" />
  <label for="sonic-input-demo"
    class="absolute left-[18px] top-[40%] -translate-y-1/2 text-xs font-bold tracking-widest text-cyan-400/40 pointer-events-none transition-all duration-300 peer-focus:-translate-y-[155%] peer-focus:scale-85 peer-focus:text-cyan-400 peer-focus:bg-[#06080c] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-translate-y-[155%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-cyan-400 peer-[:not(:placeholder-shown)]:bg-[#06080c] peer-[:not(:placeholder-shown)]:px-1 z-20">
    SONIC SIGNATURE
  </label>
</div>`,
  prompt: `Obsidian dark audio-terminal layout. Neon-cyan interactive frequency wavebars tracking bottom borders. Keydowns trigger sound amplitude vertical scale spikes mimicking voice rhythm.`
};
