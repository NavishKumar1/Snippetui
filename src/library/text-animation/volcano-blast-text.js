/**
 * Component: Volcano Blast Particle Glow
 * Category: text-animation
 */

export const component = {
  id: 'volcano-blast-text',
  name: 'Volcano Blast Glow',
  category: 'text-animation',
  tag: 'Extreme',
  html: `<div class="volcano-blast-container">
  <span class="volcano-blast-text">VOLCANO</span>
  <div class="ember-particles-field"></div>
</div>`,
  js: `// Dynamic spawning of floating orange embers
const emberField = document.querySelector('.ember-particles-field');
if (emberField) {
  const spawnEmber = () => {
    const ember = document.createElement('div');
    ember.className = 'ember-dot';
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    const driftX = (Math.random() - 0.5) * 40;
    
    ember.style.width = \`\${size}px\`;
    ember.style.height = \`\${size}px\`;
    ember.style.left = \`\${startX}%\`;
    ember.style.setProperty('--drift-x', \`\${driftX}px\`);
    ember.style.animation = 'ember-up 2.5s ease-out forwards';
    
    emberField.appendChild(ember);
    setTimeout(() => ember.remove(), 2500);
  };
  
  // Continuously release molten embers
  setInterval(spawnEmber, 120);
}`,
  ts: `// TypeScript Implementation
const emberField = document.querySelector<HTMLDivElement>('.ember-particles-field');
if (emberField) {
  const spawnEmber = () => {
    const ember = document.createElement('div');
    ember.className = 'ember-dot';
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    const driftX = (Math.random() - 0.5) * 40;
    
    ember.style.width = \`\${size}px\`;
    ember.style.height = \`\${size}px\`;
    ember.style.left = \`\${startX}%\`;
    ember.style.setProperty('--drift-x', \`\${driftX}px\`);
    ember.style.animation = 'ember-up 2.5s ease-out forwards';
    
    emberField.appendChild(ember);
    setTimeout(() => ember.remove(), 2500);
  };
  
  setInterval(spawnEmber, 120);
}`,
  css: `/* Volcano Blast Particle Styles */
.volcano-blast-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.volcano-blast-text {
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: linear-gradient(180deg, #ffffff 15%, #ffbb00 45%, #ff3700 75%, #4a0f00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 4px 15px rgba(255, 55, 0, 0.45));
  animation: volcano-rumble 0.8s ease-in-out infinite alternate;
}

.ember-particles-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 10;
}

/* Spark style */
.ember-dot {
  position: absolute;
  bottom: 10px;
  background: radial-gradient(circle, #ffea00 0%, #ff5e00 80%, transparent 100%);
  border-radius: 50%;
  filter: blur(0.5px);
  box-shadow: 0 0 8px #ff5e00, 0 0 16px #ff2a00;
  opacity: 0.8;
}

@keyframes ember-up {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.9;
  }
  100% {
    transform: translateY(-80px) translateX(var(--drift-x)) scale(0.2);
    opacity: 0;
  }
}

@keyframes volcano-rumble {
  0% {
    transform: translateY(0px) skewX(0.5deg);
  }
  100% {
    transform: translateY(-1.5px) skewX(-0.5deg);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex items-center justify-center p-6">
  <span class="font-extrabold text-[34px] tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-[#ffbb00] via-[#ff3700] to-[#4a0f00] filter drop-shadow-[0_4px_15px_rgba(255,55,0,0.45)]">
    VOLCANO
  </span>
</div>`,
  prompt: `Design a high-impact "Volcano Blast Particle Glow" text effect. The text has a metallic molten magma surface that cascades from bright yellow to red-hot volcanic orange and dark lava ash. Custom Orange ember dots float upwards around the letters, fading away in light trails, giving a rumble kinetic feel.`
};
