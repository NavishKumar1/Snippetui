/**
 * Component: Luxury Gold Sparkle Emission
 * Category: text-animation
 */

export const component = {
  id: 'luxury-gold-text',
  name: 'Luxury Gold Sparkle',
  category: 'text-animation',
  tag: 'Luxury',
  html: `<div class="luxury-gold-wrapper">
  <span class="luxury-gold-text">LUXURY GOLD</span>
  <div class="gold-sparkle-field"></div>
</div>`,
  js: `// Dynamic spawning of sparkling gold stars
const goldField = document.querySelector('.gold-sparkle-field');
if (goldField) {
  const spawnSpark = () => {
    const spark = document.createElement('div');
    spark.className = 'gold-star';
    
    const size = Math.random() * 8 + 6;
    const startX = Math.random() * 95;
    const startY = Math.random() * 80 + 10;
    
    spark.style.width = \`\${size}px\`;
    spark.style.height = \`\${size}px\`;
    spark.style.left = \`\${startX}%\`;
    spark.style.top = \`\${startY}%\`;
    spark.style.animation = 'star-burst 1.5s ease-out forwards';
    
    goldField.appendChild(spark);
    setTimeout(() => spark.remove(), 1500);
  };
  
  // Occasional sparkling emissions
  setInterval(spawnSpark, 200);
}`,
  ts: `// TypeScript Implementation
const goldField = document.querySelector<HTMLDivElement>('.gold-sparkle-field');
if (goldField) {
  const spawnSpark = () => {
    const spark = document.createElement('div');
    spark.className = 'gold-star';
    
    const size = Math.random() * 8 + 6;
    const startX = Math.random() * 95;
    const startY = Math.random() * 80 + 10;
    
    spark.style.width = \`\${size}px\`;
    spark.style.height = \`\${size}px\`;
    spark.style.left = \`\${startX}%\`;
    spark.style.top = \`\${startY}%\`;
    spark.style.animation = 'star-burst 1.5s ease-out forwards';
    
    goldField.appendChild(spark);
    setTimeout(() => spark.remove(), 1500);
  };
  
  setInterval(spawnSpark, 200);
}`,
  css: `/* Luxury Gold Sparkle Styles */
.luxury-gold-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.luxury-gold-text {
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  
  /* Reflective Gold Foil Gradient */
  background: linear-gradient(
    135deg,
    #bf953f 0%,
    #fcf6ba 25%,
    #b38728 50%,
    #fbf5b7 75%,
    #aa771c 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gold-shine-flow 4s linear infinite;
  filter: drop-shadow(0px 2px 8px rgba(191, 149, 63, 0.45));
}

.gold-sparkle-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 10;
}

/* Sparkle star design */
.gold-star {
  position: absolute;
  background: radial-gradient(circle, #ffffff 10%, #fcf6ba 50%, transparent 100%);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  box-shadow: 0 0 10px #fcf6ba, 0 0 20px #bf953f;
  opacity: 0;
}

@keyframes gold-shine-flow {
  0% { background-position: 0% center; }
  100% { background-position: -200% center; }
}

@keyframes star-burst {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    transform: scale(1.1) rotate(90deg) translateY(-20px);
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex items-center justify-center p-6">
  <span class="font-extrabold text-[32px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] via-[#b38728] to-[#aa771c] bg-[length:200%_auto] animate-pulse filter drop-shadow-[0_2px_8px_rgba(191,149,63,0.45)]">
    LUXURY GOLD
  </span>
</div>`,
  prompt: `Generate an ultra-premium "Luxury Gold Sparkle" typography effect. The text has a metallic gold foil sheen with harmonized linear golden hues. Small sparkles in the shape of golden star-bursts dynamically orbit the word, spawning and shifting in bright light trails, giving a high-end luxury feel.`
};
