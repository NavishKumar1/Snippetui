/**
 * Component: Dynamic Particle Burst Button
 * Category: buttons
 */

export const component = {
  id: 'particle-burst-btn',
  name: 'Particle Burst',
  category: 'buttons',
  tag: 'Interactive',
  html: `<div class="particle-btn-wrapper">
  <button class="particle-burst-btn">
    <span class="particle-burst-label">ACTIVATE SYSTEM</span>
  </button>
</div>`,
  js: `// Interactive dynamic click particle burst
const burstBtn = document.querySelector('.particle-burst-btn');
if (burstBtn) {
  burstBtn.addEventListener('click', (e) => {
    const rect = burstBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Spawn 16 high-fidelity glowing spark particles
    for (let i = 0; i < 16; i++) {
      const particle = document.createElement('span');
      particle.className = 'burst-particle';
      
      // Random directions, distances and colors
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      const destinationX = Math.cos(angle) * distance;
      const destinationY = Math.sin(angle) * distance;
      const size = 4 + Math.random() * 6;
      
      const colors = ['#00f2fe', '#4facfe', '#ff007f', '#ffffff', '#ffd700'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.width = \`\${size}px\`;
      particle.style.height = \`\${size}px\`;
      particle.style.background = randomColor;
      particle.style.boxShadow = \`0 0 10px \${randomColor}\`;
      particle.style.left = \`\${x}px\`;
      particle.style.top = \`\${y}px\`;
      
      // Pass coordinates to CSS custom properties for hardware-accelerated movement
      particle.style.setProperty('--dx', \`\${destinationX}px\`);
      particle.style.setProperty('--dy', \`\${destinationY}px\`);
      
      burstBtn.appendChild(particle);
      
      // Clean up DOM once particle animations conclude
      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  });
}`,
  ts: `// TypeScript Implementation
const burstBtn = document.querySelector<HTMLButtonElement>('.particle-burst-btn');
if (burstBtn) {
  burstBtn.addEventListener('click', (e: MouseEvent) => {
    const rect = burstBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 16; i++) {
      const particle = document.createElement('span');
      particle.className = 'burst-particle';
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      const destinationX = Math.cos(angle) * distance;
      const destinationY = Math.sin(angle) * distance;
      const size = 4 + Math.random() * 6;
      
      const colors = ['#00f2fe', '#4facfe', '#ff007f', '#ffffff', '#ffd700'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.width = \`\${size}px\`;
      particle.style.height = \`\${size}px\`;
      particle.style.background = randomColor;
      particle.style.boxShadow = \`0 0 10px \${randomColor}\`;
      particle.style.left = \`\${x}px\`;
      particle.style.top = \`\${y}px\`;
      
      particle.style.setProperty('--dx', \`\${destinationX}px\`);
      particle.style.setProperty('--dy', \`\${destinationY}px\`);
      
      burstBtn.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  });
}`,
  css: `/* Particle Burst Button Styles */
.particle-btn-wrapper {
  position: relative;
  display: inline-block;
}

.particle-burst-btn {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border: none;
  padding: 16px 36px;
  border-radius: 100px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: visible; /* Required to let particles fly outside the button */
  box-shadow: 
    0 10px 25px rgba(30, 60, 114, 0.4),
    0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.particle-burst-label {
  position: relative;
  z-index: 5;
}

.particle-burst-btn:hover {
  transform: translateY(-3px);
  box-shadow: 
    0 15px 30px rgba(30, 60, 114, 0.5),
    0 0 20px rgba(79, 172, 254, 0.4);
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
}

.particle-burst-btn:active {
  transform: translateY(1px);
}

/* Burst Particle Styling */
.burst-particle {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: burst-fly-fade 0.8s cubic-bezier(0.1, 0.8, 0.25, 1) forwards;
  z-index: 10;
}

@keyframes burst-fly-fade {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0);
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-block">
  <button class="relative bg-gradient-to-r from-[#1e3c72] to-[#2a5298] px-9 py-4 rounded-full text-white font-bold text-sm tracking-wider hover:-translate-y-0.75 hover:shadow-[0_15px_30px_rgba(30,60,114,0.5)] transition-all duration-300 active:translate-y-0.25">
    ACTIVATE SYSTEM
  </button>
</div>`,
  prompt: `Design a premium "Dynamic Particle Burst Button" component. A curved rounded dark-blue capsule button with micro-embossed edges. When clicked, organic neon spark particles explode outward from the exact user click coordinate point, scattering outward in 360-degree directions before softly burning out.`
};
