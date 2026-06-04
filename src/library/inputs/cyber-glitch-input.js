/**
 * Component: Cyberpunk Glitch Input
 * Category: inputs
 */

export const component = {
  id: 'cyber-glitch-input',
  name: 'Cyberpunk Glitch Input',
  category: 'inputs',
  tag: 'Glitch',
  html: `<div class="cyber-input-group">
  <input type="text" class="cyber-input-field" placeholder=" " id="cyber-input-demo" autocomplete="off">
  <label class="cyber-input-label" for="cyber-input-demo" data-text="ACCESS CODE">ACCESS CODE</label>
</div>`,
  js: `// Interactive text scramble glitch decoder on Input Focus
const cyberInp = document.querySelector('.cyber-input-field');
if (cyberInp) {
  const label = cyberInp.parentElement.querySelector('.cyber-input-label');
  const originalText = label.getAttribute('data-text');
  let glitchInterval = null;
  const chars = '010101#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  cyberInp.addEventListener('focus', () => {
    let iteration = 0;
    clearInterval(glitchInterval);
    
    glitchInterval = setInterval(() => {
      label.innerText = originalText
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
    }, 45);
  });

  cyberInp.addEventListener('blur', () => {
    clearInterval(glitchInterval);
    label.innerText = originalText;
  });
  
  // Shake coordinate grids slightly on keydowns
  cyberInp.addEventListener('keydown', () => {
    cyberInp.style.animation = 'none';
    cyberInp.offsetHeight; // trigger reflow
    cyberInp.style.animation = 'cyber-input-shake 0.2s linear';
  });
}`,
  ts: `// TypeScript Implementation
const cyberInp = document.querySelector<HTMLInputElement>('.cyber-input-field');
if (cyberInp) {
  const label = cyberInp.parentElement?.querySelector<HTMLLabelElement>('.cyber-input-label');
  if (label) {
    const originalText = label.getAttribute('data-text') || 'ACCESS CODE';
    let glitchInterval: number | null = null;
    const chars = '010101#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    cyberInp.addEventListener('focus', () => {
      let iteration = 0;
      if (glitchInterval) clearInterval(glitchInterval);
      
      glitchInterval = window.setInterval(() => {
        label.innerText = originalText
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
      }, 45);
    });

    cyberInp.addEventListener('blur', () => {
      if (glitchInterval) clearInterval(glitchInterval);
      label.innerText = originalText;
    });
    
    cyberInp.addEventListener('keydown', () => {
      cyberInp.style.animation = 'none';
      cyberInp.offsetHeight; // trigger reflow
      cyberInp.style.animation = 'cyber-input-shake 0.2s linear';
    });
  }
}`,
  css: `/* Cyberpunk Glitch Input Styles */
.cyber-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.cyber-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #020406;
  border: 1px solid #ff007f;
  border-radius: 4px;
  color: #ffffff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  outline: none;
  box-shadow: 0 4px 15px rgba(255, 0, 127, 0.15);
  transition: all 0.2s ease;
}

.cyber-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff007f;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  pointer-events: none;
  transition: all 0.3s ease;
}

/* Focus and active glitch parameters */
.cyber-input-field:focus {
  border-color: #00f2fe;
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.35);
}

.cyber-input-field:focus + .cyber-input-label,
.cyber-input-field:not(:placeholder-shown) + .cyber-input-label {
  transform: translateY(-170%) scale(0.85);
  color: #00f2fe;
  background-color: #020406;
  padding: 0 6px;
  z-index: 10;
}

@keyframes cyber-input-shake {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-2px, 1px); }
  50% { transform: translate(2px, -1px) skewX(1deg); }
  75% { transform: translate(-1px, -1px); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="cyber-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-[#020406] border border-[#ff007f] rounded text-white font-mono text-sm outline-none focus:border-[#00f2fe] focus:shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all duration-300" />
  <label for="cyber-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs text-[#ff007f] font-bold tracking-widest pointer-events-none transition-all duration-300 peer-focus:-translate-y-[170%] peer-focus:scale-85 peer-focus:text-[#00f2fe] peer-focus:bg-[#020406] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-translate-y-[170%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#00f2fe] peer-[:not(:placeholder-shown)]:bg-[#020406] peer-[:not(:placeholder-shown)]:px-1.5 z-20">
    ACCESS CODE
  </label>
</div>`,
  prompt: `Design a premium "Cyberpunk Glitch Input" component. Standard borders glow in hot-pink. Focus decodes the label text using matrix scrambling algorithms while keypresses trigger coordinate grid shakes.`
};
