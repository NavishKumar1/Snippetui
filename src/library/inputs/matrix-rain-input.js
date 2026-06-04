/**
 * Component: Matrix Code Rain Input
 * Category: inputs
 */

export const component = {
  id: 'matrix-rain-input',
  name: 'Matrix Code Rain Input',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="matrix-input-group">
  <input type="text" class="matrix-input-field" placeholder=" " id="matrix-input-demo" autocomplete="off">
  <div class="matrix-rain-backdrop">
    <div class="matrix-rain-column" style="left: 10%; --delay: 0s;"></div>
    <div class="matrix-rain-column" style="left: 30%; --delay: 1.2s;"></div>
    <div class="matrix-rain-column" style="left: 50%; --delay: 0.5s;"></div>
    <div class="matrix-rain-column" style="left: 70%; --delay: 1.8s;"></div>
    <div class="matrix-rain-column" style="left: 90%; --delay: 0.9s;"></div>
  </div>
  <div class="matrix-bits-container"></div>
  <label class="matrix-input-label" for="matrix-input-demo">DECRYPT ACCESS</label>
</div>`,
  js: `// Keydowns spawn floating green digital bits that dissolve downward
const matrixInput = document.querySelector('.matrix-input-field');
if (matrixInput) {
  const container = matrixInput.parentElement.querySelector('.matrix-bits-container');
  
  matrixInput.addEventListener('keydown', () => {
    if (!container) return;
    
    const bit = document.createElement('span');
    bit.className = 'matrix-bit-particle';
    bit.textContent = Math.random() > 0.5 ? '1' : '0';
    
    const startX = Math.random() * 80 + 10;
    const startY = Math.random() * 30 + 30;
    
    bit.style.left = \`\${startX}%\u200b\`;
    bit.style.top = \`\${startY}%\u200b\`;
    bit.style.fontSize = \`\${Math.random() * 4 + 10}px\u200b\`;
    
    const driftY = Math.random() * 30 + 20;
    bit.style.setProperty('--drift-y', \`\${driftY}px\u200b\`);
    bit.style.animation = 'matrix-bit-fall 1s linear forwards';
    
    container.appendChild(bit);
    setTimeout(() => bit.remove(), 1000);
  });
}`,
  ts: `// TypeScript Implementation
const matrixInput = document.querySelector<HTMLInputElement>('.matrix-input-field');
if (matrixInput) {
  const parent = matrixInput.parentElement;
  if (parent) {
    const container = parent.querySelector<HTMLDivElement>('.matrix-bits-container');
    
    matrixInput.addEventListener('keydown', () => {
      if (!container) return;
      
      const bit = document.createElement('span');
      bit.className = 'matrix-bit-particle';
      bit.textContent = Math.random() > 0.5 ? '1' : '0';
      
      const startX = Math.random() * 80 + 10;
      const startY = Math.random() * 30 + 30;
      
      bit.style.left = \`\${startX}%\u200b\`;
      bit.style.top = \`\${startY}%\u200b\`;
      bit.style.fontSize = \`\${Math.random() * 4 + 10}px\u200b\`;
      
      const driftY = Math.random() * 30 + 20;
      bit.style.setProperty('--drift-y', \`\${driftY}px\u200b\`);
      bit.style.animation = 'matrix-bit-fall 1s linear forwards';
      
      container.appendChild(bit);
      setTimeout(() => bit.remove(), 1000);
    });
  }
}`,
  css: `/* Matrix Code Rain Input Styles */
.matrix-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.matrix-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #010502;
  border: 1px solid rgba(0, 255, 65, 0.15);
  border-radius: 4px;
  color: #00ff41;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  font-weight: bold;
  outline: none;
  z-index: 2;
  position: relative;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.7),
    inset 0 1px 1px rgba(0, 255, 65, 0.05);
  transition: all 0.3s ease;
}

.matrix-rain-backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 4px;
  z-index: 1;
  pointer-events: none;
  opacity: 0.15;
  transition: opacity 0.3s ease;
}

.matrix-rain-column {
  position: absolute;
  top: -100%;
  width: 1px;
  height: 100%;
  background: linear-gradient(0deg, #00ff41 0%, transparent 100%);
  opacity: 0;
}

.matrix-bits-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 4px;
  pointer-events: none;
  z-index: 3;
}

.matrix-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 255, 65, 0.4);
  font-family: 'Courier New', monospace;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.15em;
  pointer-events: none;
  z-index: 4;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

.matrix-bit-particle {
  position: absolute;
  color: #00ff41;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 5px #00ff41;
  opacity: 0;
  pointer-events: none;
}

/* Interactions */
.matrix-input-field:focus {
  border-color: #00ff41;
  box-shadow: 
    0 8px 25px rgba(0, 255, 65, 0.2),
    inset 0 1px 1px rgba(0, 255, 65, 0.1);
}

.matrix-input-field:focus ~ .matrix-rain-backdrop {
  opacity: 0.45;
}

.matrix-input-field:focus ~ .matrix-rain-backdrop .matrix-rain-column {
  opacity: 1;
  animation: matrix-fall-vertical 2s linear infinite;
  animation-delay: var(--delay);
}

.matrix-input-field:focus ~ .matrix-input-label,
.matrix-input-field:not(:placeholder-shown) ~ .matrix-input-label {
  transform: translateY(-165%) scale(0.85);
  color: #00ff41;
  text-shadow: 0 0 6px rgba(0, 255, 65, 0.6);
  background: #010502;
  padding: 0 4px;
  z-index: 10;
}

@keyframes matrix-fall-vertical {
  0% { top: -100%; }
  100% { top: 100%; }
}

@keyframes matrix-bit-fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(var(--drift-y));
    opacity: 0;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="matrix-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-[#010502] border border-green-500/20 rounded text-[#00ff41] font-bold outline-none focus:border-[#00ff41] transition-all duration-300 relative z-10 font-mono" />
  <label for="matrix-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs font-bold tracking-widest text-green-500/40 pointer-events-none transition-all duration-300 peer-focus:-translate-y-[165%] peer-focus:scale-85 peer-focus:text-[#00ff41] peer-focus:bg-[#010502] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-translate-y-[165%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#00ff41] peer-[:not(:placeholder-shown)]:bg-[#010502] peer-[:not(:placeholder-shown)]:px-1 z-20 font-mono">
    DECRYPT ACCESS
  </label>
</div>`,
  prompt: `Digital phosphor green terminal interface. Focus triggers vertical streams of green matrix code rain cascading inside. Keydowns translate characters to floating green 1s/0s binary particles.`
};
