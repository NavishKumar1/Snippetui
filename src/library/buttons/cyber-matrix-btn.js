/**
 * Component: Cyber Matrix Rain Button
 * Category: buttons
 */

export const component = {
  id: 'cyber-matrix-btn',
  name: 'Cyber Matrix Rain',
  category: 'buttons',
  tag: 'Glitch',
  html: `<button class="cyber-matrix-btn">
  <div class="matrix-rain-container">
    <span class="matrix-stream stream-1"></span>
    <span class="matrix-stream stream-2"></span>
    <span class="matrix-stream stream-3"></span>
    <span class="matrix-stream stream-4"></span>
  </div>
  <span class="matrix-text" data-text="ACCESS GRANTED">ACCESS GRANTED</span>
</button>`,
  js: `// Interactive Scramble Decoder on Hover
const matrixBtn = document.querySelector('.cyber-matrix-btn');
if (matrixBtn) {
  const textSpan = matrixBtn.querySelector('.matrix-text');
  const originalText = textSpan.getAttribute('data-text');
  let scrambleInterval = null;
  
  const chars = '010101BCDEFHIJKLMNOPQRSTUVWXYZ@#$%&';
  
  matrixBtn.addEventListener('mouseenter', () => {
    let iteration = 0;
    clearInterval(scrambleInterval);
    
    scrambleInterval = setInterval(() => {
      textSpan.innerText = originalText
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
        clearInterval(scrambleInterval);
      }
      iteration += 1 / 3;
    }, 30);
  });

  matrixBtn.addEventListener('mouseleave', () => {
    clearInterval(scrambleInterval);
    textSpan.innerText = originalText;
  });
}`,
  ts: `// TypeScript Implementation
const matrixBtn = document.querySelector<HTMLButtonElement>('.cyber-matrix-btn');
if (matrixBtn) {
  const textSpan = matrixBtn.querySelector<HTMLSpanElement>('.matrix-text');
  if (textSpan) {
    const originalText = textSpan.getAttribute('data-text') || 'ACCESS GRANTED';
    let scrambleInterval: number | null = null;
    const chars = '010101BCDEFHIJKLMNOPQRSTUVWXYZ@#$%&';
    
    matrixBtn.addEventListener('mouseenter', () => {
      let iteration = 0;
      if (scrambleInterval) clearInterval(scrambleInterval);
      
      scrambleInterval = window.setInterval(() => {
        textSpan.innerText = originalText
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
          if (scrambleInterval) clearInterval(scrambleInterval);
        }
        iteration += 1 / 3;
      }, 30);
    });

    matrixBtn.addEventListener('mouseleave', () => {
      if (scrambleInterval) clearInterval(scrambleInterval);
      textSpan.innerText = originalText;
    });
  }
}`,
  css: `/* Cyber Matrix Rain Button Styles */
.cyber-matrix-btn {
  position: relative;
  background: #020803;
  border: 1px solid #00ff66;
  padding: 16px 36px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 255, 102, 0.15),
    inset 0 0 8px rgba(0, 255, 102, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.matrix-rain-container {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.35;
  display: flex;
  justify-content: space-around;
  transition: opacity 0.3s ease;
}

.matrix-stream {
  display: block;
  width: 2px;
  height: 200%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 255, 102, 0.8) 50%,
    transparent 100%
  );
  transform: translateY(-100%);
  animation: matrix-fall 2.5s infinite linear;
}

.stream-1 { animation-delay: 0.1s; animation-duration: 2.2s; }
.stream-2 { animation-delay: 0.8s; animation-duration: 3s; }
.stream-3 { animation-delay: 0.4s; animation-duration: 1.8s; }
.stream-4 { animation-delay: 1.2s; animation-duration: 2.6s; }

.matrix-text {
  position: relative;
  z-index: 3;
  color: #00ff66;
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.25em;
  text-shadow: 
    0 0 4px rgba(0, 255, 102, 0.5),
    0 0 10px rgba(0, 255, 102, 0.2);
  transition: all 0.3s ease;
}

/* Hover effects */
.cyber-matrix-btn:hover {
  border-color: #ffffff;
  box-shadow: 
    0 8px 25px rgba(0, 255, 102, 0.4),
    0 0 15px rgba(0, 255, 102, 0.2),
    inset 0 0 15px rgba(0, 255, 102, 0.25);
  transform: translateY(-2px);
}

.cyber-matrix-btn:hover .matrix-rain-container {
  opacity: 0.75;
}

.cyber-matrix-btn:hover .matrix-text {
  color: #ffffff;
  text-shadow: 
    0 0 5px #ffffff,
    0 0 15px #00ff66,
    0 0 25px #00ff66;
}

.cyber-matrix-btn:active {
  transform: translateY(1px);
}

@keyframes matrix-fall {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#020803] border border-[#00ff66] px-9 py-4 rounded cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,255,102,0.15)] hover:border-white hover:shadow-[0_8px_25px_rgba(0,255,102,0.4)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#00ff66] font-extrabold text-xs tracking-[0.25em] font-mono [text-shadow:0_0_4px_rgba(0,255,102,0.5)]">ACCESS GRANTED</span>
</button>`,
  prompt: `Design a premium "Cyber Matrix Rain Button" component. A dark green console rectangular layout shows vertical binary code stream drops scrolling down the face. Hovering runs a sophisticated matrix-decoder scramble code that visually decodes coordinates into alphanumeric characters before settling.`
};
