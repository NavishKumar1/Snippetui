/**
 * Component: Quantum Resonance Input
 * Category: inputs
 */

export const component = {
  id: 'quantum-resonance-input',
  name: 'Quantum Resonance',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="quantum-input-wrapper">
  <input type="text" class="quantum-resonance-field" placeholder="Resonance factor..." />
  <label class="quantum-resonance-label">Quantum Factor</label>
  <div class="quantum-wave-equalizer">
    <span class="wave-bar"></span>
    <span class="wave-bar"></span>
    <span class="wave-bar"></span>
    <span class="wave-bar"></span>
    <span class="wave-bar"></span>
    <span class="wave-bar"></span>
  </div>
</div>`,
  js: `// Equalizer oscillation speed adjustment on typing
const wrapper = document.querySelector('.quantum-input-wrapper');
if (wrapper) {
  const input = wrapper.querySelector('.quantum-resonance-field');
  const bars = wrapper.querySelectorAll('.wave-bar');

  input.addEventListener('focus', () => {
    wrapper.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    if (!input.value) {
      wrapper.classList.remove('focused');
    }
  });

  input.addEventListener('input', () => {
    // Accelerate equalizer waves vigorously for 400ms on keypress
    bars.forEach((bar, idx) => {
      bar.style.animationDuration = \`\${0.15 + Math.random() * 0.2}s\`;
      bar.style.transform = \`scaleY(\${1.5 + Math.random() * 1.5})\`;
      
      setTimeout(() => {
        bar.style.animationDuration = \`\${0.4 + idx * 0.1}s\`;
        bar.style.transform = 'none';
      }, 400);
    });
  });
}`,
  ts: `// TypeScript Implementation
const wrapper = document.querySelector<HTMLDivElement>('.quantum-input-wrapper');
if (wrapper) {
  const input = wrapper.querySelector<HTMLInputElement>('.quantum-resonance-field');
  const bars = wrapper.querySelectorAll<HTMLSpanElement>('.wave-bar');

  if (input) {
    input.addEventListener('focus', () => {
      wrapper.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (!input.value) wrapper.classList.remove('focused');
    });

    input.addEventListener('input', () => {
      bars.forEach((bar, idx) => {
        bar.style.animationDuration = \`\${0.15 + Math.random() * 0.2}s\`;
        bar.style.transform = \`scaleY(\${1.5 + Math.random() * 1.5})\`;
        
        setTimeout(() => {
          bar.style.animationDuration = \`\${0.4 + idx * 0.1}s\`;
          bar.style.transform = 'none';
        }, 400);
      });
    });
  }
}`,
  css: `/* Quantum Resonance Input Styles */
.quantum-input-wrapper {
  position: relative;
  width: 280px;
  height: 56px;
  background: rgba(10, 15, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: visible;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.quantum-input-wrapper.focused {
  background: rgba(10, 15, 30, 0.85);
  border-color: rgba(79, 172, 254, 0.3);
  box-shadow: 0 0 20px rgba(79, 172, 254, 0.1);
}

.quantum-resonance-field {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 20px 16px 6px;
  color: #00ffff;
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  position: relative;
  z-index: 5;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
}

.quantum-resonance-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-family: 'Outfit', sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 4;
}

.quantum-input-wrapper.focused .quantum-resonance-label,
.quantum-resonance-field:not(:placeholder-shown) ~ .quantum-resonance-label {
  top: 12px;
  font-size: 11px;
  color: #4facfe;
  text-shadow: 0 0 8px rgba(79, 172, 254, 0.4);
}

/* Oscillating Wave Equalizer at the bottom */
.quantum-wave-equalizer {
  position: absolute;
  bottom: 0;
  left: 12px;
  right: 12px;
  height: 3px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 6;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.quantum-input-wrapper.focused .quantum-wave-equalizer {
  opacity: 1;
}

.wave-bar {
  width: calc(100% / 6 - 2px);
  height: 100%;
  background: linear-gradient(90deg, #00f2fe, #4facfe);
  border-radius: 2px 2px 0 0;
  transform-origin: bottom center;
  animation: bar-oscillate 0.5s infinite alternate ease-in-out;
}

.wave-bar:nth-child(1) { animation-delay: 0.05s; animation-duration: 0.4s; }
.wave-bar:nth-child(2) { animation-delay: 0.15s; animation-duration: 0.5s; }
.wave-bar:nth-child(3) { animation-delay: 0.1s; animation-duration: 0.35s; }
.wave-bar:nth-child(4) { animation-delay: 0.25s; animation-duration: 0.45s; }
.wave-bar:nth-child(5) { animation-delay: 0.2s; animation-duration: 0.55s; }
.wave-bar:nth-child(6) { animation-delay: 0.08s; animation-duration: 0.38s; }

@keyframes bar-oscillate {
  0% {
    transform: scaleY(1);
    background: #4facfe;
  }
  100% {
    transform: scaleY(3.5);
    background: #00f2fe;
    box-shadow: 0 0 10px rgba(0, 242, 254, 0.8);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[280px] h-[56px] bg-[#0a0f1e]/60 rounded border border-white/5 shadow-inner">
  <input type="text" class="w-full h-full bg-transparent border-none outline-none px-4 pt-5 pb-1 text-[#00ffff] font-mono text-xs" placeholder=" " />
  <label class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm transition-all duration-300 pointer-events-none">Quantum Factor</label>
</div>`,
  prompt: `Design a premium "Quantum Resonance Input" component. Set in dark cybernetic blue glass, the input features a subtle bottom equalizer wave. On focus, the wave line oscillates in neon cyan/blue matching typing speed and frequencies like an organic sound deck.`
};
