/**
 * Component: Glassmorphism Frosted Fluid Orb
 * Category: buttons
 */

export const component = {
  id: 'glass-fluid-btn',
  name: 'Glassmorphism Fluid Orb',
  category: 'buttons',
  tag: 'Glassmorphic',
  html: `<div class="glass-fluid-container">
  <button class="glass-fluid-btn">
    <div class="glass-fluid-orb"></div>
    <span class="glass-fluid-text">DISCOVER</span>
  </button>
</div>`,
  js: `// Dynamic cursor fluid-orb coordinate tracking
const glassContainer = document.querySelector('.glass-fluid-container');
if (glassContainer) {
  const btn = glassContainer.querySelector('.glass-fluid-btn');
  const orb = glassContainer.querySelector('.glass-fluid-orb');
  
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    orb.style.left = \`\${x}px\`;
    orb.style.top = \`\${y}px\`;
    orb.style.transform = 'translate(-50%, -50%) scale(1.5)';
    orb.style.opacity = '1';
  });
  
  btn.addEventListener('mouseleave', () => {
    orb.style.transform = 'translate(-50%, -50%) scale(0)';
    orb.style.opacity = '0';
    orb.style.transition = 'all 0.4s ease';
  });
  
  btn.addEventListener('mouseenter', () => {
    orb.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
  });
}`,
  ts: `// TypeScript Implementation
const glassContainer = document.querySelector<HTMLDivElement>('.glass-fluid-container');
if (glassContainer) {
  const btn = glassContainer.querySelector<HTMLButtonElement>('.glass-fluid-btn');
  const orb = glassContainer.querySelector<HTMLDivElement>('.glass-fluid-orb');
  
  if (btn && orb) {
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      orb.style.left = \`\${x}px\`;
      orb.style.top = \`\${y}px\`;
      orb.style.transform = 'translate(-50%, -50%) scale(1.5)';
      orb.style.opacity = '1';
    });
    
    btn.addEventListener('mouseleave', () => {
      orb.style.transform = 'translate(-50%, -50%) scale(0)';
      orb.style.opacity = '0';
      orb.style.transition = 'all 0.4s ease';
    });
    
    btn.addEventListener('mouseenter', () => {
      orb.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    });
  }
}`,
  css: `/* Glassmorphism Fluid Orb Styles */
.glass-fluid-container {
  padding: 30px;
  display: inline-flex;
}

.glass-fluid-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 36px;
  border-radius: 100px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 
    0 10px 30px -10px rgba(0,0,0,0.5),
    inset 0 1px 0px rgba(255,255,255,0.1);
  transition: all 0.3s ease;
}

.glass-fluid-text {
  position: relative;
  z-index: 5;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
}

/* Glowing fluid orb background */
.glass-fluid-orb {
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, #00f2fe 0%, #8a2be2 80%, transparent 100%);
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none;
  filter: blur(6px);
  z-index: 2;
}

.glass-fluid-btn:hover {
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
  box-shadow: 
    0 15px 35px -10px rgba(0,0,0,0.6),
    inset 0 1px 0px rgba(255,255,255,0.2);
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="p-[30px] inline-flex">
  <button class="bg-white/5 border border-white/10 px-9 py-4 rounded-full text-white font-semibold text-sm tracking-widest cursor-pointer backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-white/20 hover:scale-105 hover:translate-y-[-2px] transition-all duration-300">
    DISCOVER
  </button>
</div>`,
  prompt: `Design a gorgeous "Glassmorphism Fluid Orb" button component. A frosted glass capsule button contains a dynamic glowing purple-cyan circular liquid orb floating and morphing inside, which tracks the cursor on hover.`
};
