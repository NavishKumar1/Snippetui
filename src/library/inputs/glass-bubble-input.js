/**
 * Component: Glassmorphic Floating Bubbles Input
 * Category: inputs
 */

export const component = {
  id: 'glass-bubble-input',
  name: 'Glassmorphic Floating Bubbles Input',
  category: 'inputs',
  tag: 'Responsive',
  html: `<div class="glass-input-group">
  <div class="glass-input-pool"></div>
  <input type="text" class="glass-bubble-input-field" placeholder=" " id="glass-input-demo" autocomplete="off">
  <label class="glass-bubble-input-label" for="glass-input-demo">Email Address</label>
</div>`,
  js: `// Interactive Keypress Spores/Bubbles spawner
const bubbleInp = document.querySelector('.glass-bubble-input-field');
if (bubbleInp) {
  const pool = bubbleInp.parentElement.querySelector('.glass-input-pool');
  
  bubbleInp.addEventListener('keydown', () => {
    // Spawn buoyant bubbles inside input area on typing
    const bubble = document.createElement('span');
    bubble.className = 'input-water-bubble';
    
    const size = 4 + Math.random() * 6;
    const startX = 10 + Math.random() * 80;
    
    bubble.style.width = \`\${size}px\`;
    bubble.style.height = \`\${size}px\`;
    bubble.style.left = \`\${startX}%\`;
    
    pool.appendChild(bubble);
    
    setTimeout(() => {
      bubble.remove();
    }, 1000);
  });
}`,
  ts: `// TypeScript Implementation
const bubbleInp = document.querySelector<HTMLInputElement>('.glass-bubble-input-field');
if (bubbleInp) {
  const parent = bubbleInp.parentElement;
  if (parent) {
    const pool = parent.querySelector<HTMLDivElement>('.glass-input-pool');
    
    if (pool) {
      bubbleInp.addEventListener('keydown', () => {
        const bubble = document.createElement('span');
        bubble.className = 'input-water-bubble';
        
        const size = 4 + Math.random() * 6;
        const startX = 10 + Math.random() * 80;
        
        bubble.style.width = \`\${size}px\`;
        bubble.style.height = \`\${size}px\`;
        bubble.style.left = \`\${startX}%\`;
        
        pool.appendChild(bubble);
        
        setTimeout(() => {
          bubble.remove();
        }, 1000);
      });
    }
  }
}`,
  css: `/* Glassmorphic Floating Bubbles Input Styles */
.glass-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.glass-input-pool {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.glass-bubble-input-field {
  width: 100%;
  padding: 16px 18px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 242, 254, 0.25);
  border-radius: 12px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 2;
  position: relative;
  box-shadow: 
    0 4px 15px rgba(79, 172, 254, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.glass-bubble-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  pointer-events: none;
  z-index: 3;
  text-shadow: 0 0 5px rgba(0, 242, 254, 0.25);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Floating water bubbles */
.input-water-bubble {
  position: absolute;
  bottom: 0px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4);
  pointer-events: none;
  z-index: 5;
  animation: input-bubble-float-up 1s forwards ease-in;
}

/* Focus active state transformations */
.glass-bubble-input-field:focus {
  border-color: #00f2fe;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 
    0 8px 25px rgba(0, 242, 254, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
}

.glass-bubble-input-field:focus + .glass-bubble-input-label,
.glass-bubble-input-field:not(:placeholder-shown) + .glass-bubble-input-label {
  transform: translateY(-170%) scale(0.85);
  color: #ffffff;
  text-shadow: 0 0 8px #00f2fe;
  background-color: #0d0d14; /* Match shell block */
  padding: 0 6px;
  z-index: 10;
}

@keyframes input-bubble-float-up {
  0% { transform: translateY(0) scale(1); opacity: 0.8; }
  100% { transform: translateY(-35px) scale(0.5); opacity: 0; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="glass-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-white/2 border border-[#00f2fe]/25 rounded-xl text-white outline-none focus:border-[#00f2fe] focus:bg-white/4 transition-all duration-300 relative z-10" />
  <label for="glass-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-sm text-[#00f2fe] font-bold pointer-events-none transition-all duration-300 peer-focus:-translate-y-[170%] peer-focus:scale-85 peer-focus:text-white peer-focus:bg-[#0d0d14] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-translate-y-[170%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:bg-[#0d0d14] peer-[:not(:placeholder-shown)]:px-1.5 z-20">
    Email Address
  </label>
</div>`,
  prompt: `Design a premium "Glassmorphic Floating Bubbles Input" component. Translucent glass focused outlines glow turquoise. Typing characters dynamically spawns water-bubbles floating up inside input box.`
};
