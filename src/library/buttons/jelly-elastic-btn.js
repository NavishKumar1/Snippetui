/**
 * Component: Abstract Elastic Jelly Stretch
 * Category: buttons
 */

export const component = {
  id: 'jelly-elastic-btn',
  name: 'Elastic Jelly Stretch',
  category: 'buttons',
  tag: 'Kinetic',
  html: `<div class="jelly-btn-container">
  <button class="jelly-elastic-btn">
    <span class="jelly-btn-label">BOUNCE</span>
  </button>
</div>`,
  js: `// satisfying jelly coordinates stretch on hover
const jellyBtn = document.querySelector('.jelly-elastic-btn');
if (jellyBtn) {
  jellyBtn.addEventListener('mousedown', () => {
    jellyBtn.style.transform = 'scale(0.85, 1.25)';
  });
  jellyBtn.addEventListener('mouseup', () => {
    jellyBtn.style.transform = '';
  });
}`,
  ts: `// TypeScript Implementation
const jellyBtn = document.querySelector<HTMLButtonElement>('.jelly-elastic-btn');
if (jellyBtn) {
  jellyBtn.addEventListener('mousedown', () => {
    jellyBtn.style.transform = 'scale(0.85, 1.25)';
  });
  jellyBtn.addEventListener('mouseup', () => {
    jellyBtn.style.transform = '';
  });
}`,
  css: `/* Abstract Elastic Jelly Styles */
.jelly-btn-container {
  padding: 30px;
  display: inline-flex;
}

.jelly-elastic-btn {
  background: linear-gradient(135deg, #ff007f 0%, #8a2be2 100%);
  border: none;
  padding: 16px 36px;
  border-radius: 14px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.1em;
  cursor: pointer;
  outline: none;
  position: relative;
  box-shadow: 
    0 10px 25px -5px rgba(255, 0, 127, 0.4),
    0 0 15px rgba(138, 43, 226, 0.2);
  
  /* Elastic jelly bounce transitions */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.45);
  transform-origin: bottom center;
}

.jelly-btn-label {
  display: inline-block;
  transition: transform 0.3s ease;
}

.jelly-elastic-btn:hover {
  transform: scale(1.15, 0.85) translateY(-5px);
  box-shadow: 
    0 15px 30px -5px rgba(255, 0, 127, 0.6),
    0 0 25px rgba(138, 43, 226, 0.35);
}

.jelly-elastic-btn:hover .jelly-btn-label {
  transform: scale(0.9, 1.1) translateY(-2px);
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="p-[30px] inline-flex">
  <button class="bg-gradient-to-br from-[#ff007f] to-[#8a2be2] px-9 py-4 rounded-xl text-white font-extrabold text-sm tracking-widest cursor-pointer shadow-[0_10px_25px_-5px_rgba(255,0,127,0.4)] transition-transform duration-300 hover:scale-y-[0.85] hover:scale-x-[1.15]">
    BOUNCE
  </button>
</div>`,
  prompt: `Design a premium "Elastic Jelly Stretch" button component. A bright pink-purple capsule button stretches horizontally and vertically dynamically on hover or click, snapping back with satisfying jelly physics.`
};
