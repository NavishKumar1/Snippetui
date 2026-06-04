/**
 * Component: Nebula Cloud Drift Button
 * Category: buttons
 */

export const component = {
  id: 'nebula-cloud-btn',
  name: 'Nebula Cloud Drift',
  category: 'buttons',
  tag: 'Aesthetic',
  html: `<button class="nebula-cloud-btn">
  <div class="nebula-clouds-container">
    <div class="nebula-gas gas-pink"></div>
    <div class="nebula-gas gas-cyan"></div>
    <div class="nebula-gas gas-purple"></div>
  </div>
  <span class="nebula-text">DISCOVER DEEP SPACE</span>
</button>`,
  js: `// Interactive Nebula Gas shifting on mouse movements
const nebulaBtn = document.querySelector('.nebula-cloud-btn');
if (nebulaBtn) {
  const gases = nebulaBtn.querySelectorAll('.nebula-gas');
  
  nebulaBtn.addEventListener('mousemove', (e) => {
    const rect = nebulaBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Shift gases independently based on coordinate coordinates
    gases.forEach((gas, idx) => {
      const multiplier = (idx + 1) * 15;
      const dx = ((x / rect.width) - 0.5) * multiplier;
      const dy = ((y / rect.height) - 0.5) * multiplier;
      
      gas.style.transform = \`translate(\${dx}px, \${dy}px)\`;
    });
  });

  nebulaBtn.addEventListener('mouseleave', () => {
    gases.forEach((gas) => {
      gas.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
      gas.style.transform = 'translate(0, 0)';
    });
  });
  
  nebulaBtn.addEventListener('mouseenter', () => {
    gases.forEach((gas) => {
      gas.style.transition = 'none';
    });
  });
}`,
  ts: `// TypeScript Implementation
const nebulaBtn = document.querySelector<HTMLButtonElement>('.nebula-cloud-btn');
if (nebulaBtn) {
  const gases = nebulaBtn.querySelectorAll<HTMLDivElement>('.nebula-gas');
  
  nebulaBtn.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = nebulaBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gases.forEach((gas, idx) => {
      const multiplier = (idx + 1) * 15;
      const dx = ((x / rect.width) - 0.5) * multiplier;
      const dy = ((y / rect.height) - 0.5) * multiplier;
      
      gas.style.transform = \`translate(\${dx}px, \${dy}px)\`;
    });
  });

  nebulaBtn.addEventListener('mouseleave', () => {
    gases.forEach((gas) => {
      gas.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
      gas.style.transform = 'translate(0, 0)';
    });
  });
  
  nebulaBtn.addEventListener('mouseenter', () => {
    gases.forEach((gas) => {
      gas.style.transition = 'none';
    });
  });
}`,
  css: `/* Nebula Cloud Drift Button Styles */
.nebula-cloud-btn {
  position: relative;
  background: #04010a;
  border: 1px solid rgba(138, 43, 226, 0.3);
  padding: 16px 36px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.7),
    inset 0 0 10px rgba(138, 43, 226, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.nebula-clouds-container {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.25;
  transition: opacity 0.4s ease;
}

/* Cosmic gas cloud shapes */
.nebula-gas {
  position: absolute;
  border-radius: 50%;
  filter: blur(25px);
  pointer-events: none;
  mix-blend-mode: screen;
}

.gas-pink {
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #ff007f 0%, transparent 70%);
  top: -20px;
  left: -10px;
  animation: cloud-drift-slow-1 8s infinite ease-in-out alternate;
}

.gas-cyan {
  width: 90px;
  height: 90px;
  background: radial-gradient(circle, #00f2fe 0%, transparent 70%);
  bottom: -30px;
  right: -10px;
  animation: cloud-drift-slow-2 10s infinite ease-in-out alternate;
}

.gas-purple {
  width: 70px;
  height: 70px;
  background: radial-gradient(circle, #7b2cbf 0%, transparent 70%);
  top: 10px;
  left: 40%;
  animation: cloud-drift-slow-3 12s infinite ease-in-out alternate;
}

.nebula-text {
  position: relative;
  z-index: 3;
  color: #bf9bf2;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
  transition: all 0.3s ease;
}

/* Hover atmospheric shifts */
.nebula-cloud-btn:hover {
  border-color: rgba(0, 242, 254, 0.5);
  box-shadow: 
    0 10px 30px rgba(138, 43, 226, 0.25),
    0 0 20px rgba(0, 242, 254, 0.15),
    inset 0 0 15px rgba(138, 43, 226, 0.15);
  transform: translateY(-2px);
}

.nebula-cloud-btn:hover .nebula-clouds-container {
  opacity: 0.75;
}

.nebula-cloud-btn:hover .nebula-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe,
    0 0 25px #ff007f;
}

.nebula-cloud-btn:active {
  transform: translateY(1px);
}

/* Slowly waving clouds */
@keyframes cloud-drift-slow-1 {
  0% { top: -20px; left: -10px; }
  100% { top: -10px; left: 10px; }
}

@keyframes cloud-drift-slow-2 {
  0% { bottom: -30px; right: -10px; }
  100% { bottom: -20px; right: 20px; }
}

@keyframes cloud-drift-slow-3 {
  0% { top: 10px; left: 40%; }
  100% { top: 0px; left: 50%; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#04010a] border border-purple-600/30 px-9 py-4 rounded-lg cursor-pointer overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.7)] hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(138,43,226,0.25)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#bf9bf2] font-bold text-xs tracking-[0.18em] [text-shadow:0_0_10px_rgba(138,43,226,0.3)]">DISCOVER DEEP SPACE</span>
</button>`,
  prompt: `Design a premium "Nebula Cloud Drift Button" component. Glowing gas clouds colored in magenta, cyan, and violet drift behind uppercase typography in deep space. Cursor tracking shifts the gas clouds independently, generating vibrant galactic auroras.`
};
