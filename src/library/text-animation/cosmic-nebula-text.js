/**
 * Component: Cosmic Nebula Stardust
 * Category: text-animation
 */

export const component = {
  id: 'cosmic-nebula-text',
  name: 'Cosmic Nebula Stardust',
  category: 'text-animation',
  tag: 'Stunning',
  html: `<div class="cosmic-nebula-wrapper">
  <span class="cosmic-nebula-text" data-text="NEBULA">NEBULA</span>
</div>`,
  js: `// Dynamic cosmic gas drift tilt
const nebulaContainer = document.querySelector('.cosmic-nebula-wrapper');
if (nebulaContainer) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const text = nebulaContainer.querySelector('.cosmic-nebula-text');
    if (text) {
      text.style.textShadow = \`
        \${-x}px \${-y}px 15px rgba(138, 43, 226, 0.6),
        \${x}px \${y}px 25px rgba(79, 172, 254, 0.6),
        0 0 40px rgba(0, 242, 254, 0.3)
      \`;
    }
  });
}`,
  ts: `// TypeScript Implementation
const nebulaContainer = document.querySelector<HTMLDivElement>('.cosmic-nebula-wrapper');
if (nebulaContainer) {
  document.addEventListener('mousemove', (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const text = nebulaContainer.querySelector<HTMLSpanElement>('.cosmic-nebula-text');
    if (text) {
      text.style.textShadow = \`
        \${-x}px \${-y}px 15px rgba(138, 43, 226, 0.6),
        \${x}px \${y}px 25px rgba(79, 172, 254, 0.6),
        0 0 40px rgba(0, 242, 254, 0.3)
      \`;
    }
  });
}`,
  css: `/* Cosmic Nebula Stardust Styles */
.cosmic-nebula-wrapper {
  padding: 30px;
  background: radial-gradient(circle, rgba(13,13,21,0.2) 0%, transparent 80%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cosmic-nebula-text {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  
  /* Text Fill Shimmer gradient */
  background: linear-gradient(135deg, #ffffff 30%, #e0c3fc 70%, #8ec5fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Glowing Cosmic Nebula Shadows */
  text-shadow: 
    0 0 10px rgba(138, 43, 226, 0.5),
    0 0 20px rgba(79, 172, 254, 0.5),
    0 0 35px rgba(0, 242, 254, 0.2);
  
  animation: cosmic-nebula-pulse 3.5s infinite alternate ease-in-out;
}

@keyframes cosmic-nebula-pulse {
  0% {
    filter: brightness(0.95);
    text-shadow: 
      0 0 8px rgba(138, 43, 226, 0.4),
      0 0 16px rgba(79, 172, 254, 0.4),
      0 0 25px rgba(0, 242, 254, 0.15);
    transform: scale(0.98);
  }
  100% {
    filter: brightness(1.15) drop-shadow(0 0 8px rgba(0, 242, 254, 0.2));
    text-shadow: 
      0 0 16px rgba(138, 43, 226, 0.7),
      0 0 30px rgba(79, 172, 254, 0.7),
      0 0 50px rgba(0, 242, 254, 0.35);
    transform: scale(1.02);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="p-[30px] bg-[radial-gradient(circle,rgba(13,13,21,0.2)_0%,transparent_80%)] flex items-center justify-center">
  <span class="font-extrabold text-[36px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-br from-white via-[#e0c3fc] to-[#8ec5fc] filter drop-shadow-[0_0_10px_rgba(138,43,226,0.5)] animate-pulse">
    NEBULA
  </span>
</div>`,
  prompt: `Generate an ultra-premium "Cosmic Nebula Stardust" text effect. The typography is bright white to light periwinkle and soft cyan. Multi-layered, cosmic periwinkle and purple stardust nebulae glow clouds expand and shift gently behind and inside the letters, creating a stunning deep space aesthetic.`
};
