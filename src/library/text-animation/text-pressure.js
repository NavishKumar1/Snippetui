/**
 * Component: Text Pressure breathing
 * Category: text-animation
 */

export const component = {
  id: 'text-pressure',
  name: 'Text Pressure Breath',
  category: 'text-animation',
  tag: 'Kinetic',
  html: `<div class="text-pressure-wrapper" style="cursor: pointer;">
  <span class="text-pressure-content" data-text="PRESSURE">PRESSURE</span>
</div>`,
  js: `// Speed up pressure pulse on click
const pressureWrap = document.querySelector('.text-pressure-wrapper');
if (pressureWrap) {
  const content = pressureWrap.querySelector('.text-pressure-content');
  pressureWrap.addEventListener('mousedown', () => {
    content.style.animationDuration = '0.8s';
  });
  pressureWrap.addEventListener('mouseup', () => {
    content.style.animationDuration = '3.5s';
  });
}`,
  ts: `// TypeScript Implementation
const pressureWrap = document.querySelector<HTMLDivElement>('.text-pressure-wrapper');
if (pressureWrap) {
  const content = pressureWrap.querySelector<HTMLSpanElement>('.text-pressure-content');
  if (content) {
    pressureWrap.addEventListener('mousedown', () => {
      content.style.animationDuration = '0.8s';
    });
    pressureWrap.addEventListener('mouseup', () => {
      content.style.animationDuration = '3.5s';
    });
  }
}`,
  css: `/* Text Pressure Styles */
.text-pressure-wrapper {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-pressure-content {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, #ffffff 40%, #a5b4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(165, 180, 252, 0.3));
  
  /* Continuous breathing kinetic expansion loop */
  animation: pressure-breath-loop 3.5s infinite alternate ease-in-out;
}

@keyframes pressure-breath-loop {
  0% {
    letter-spacing: -0.06em;
    transform: scaleX(0.8) scaleY(1.05);
    filter: brightness(0.9);
  }
  100% {
    letter-spacing: 0.12em;
    transform: scaleX(1.15) scaleY(0.95);
    filter: brightness(1.15) drop-shadow(0 0 15px rgba(165, 180, 252, 0.45));
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="p-4 flex items-center justify-center cursor-pointer">
  <span class="font-black text-[36px] uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-[#a5b4fc] animate-pulse">
    PRESSURE
  </span>
</div>`,
  prompt: `Design a repeating "Text Pressure Breath" animation. The typography continuously expands and compresses its letter-spacing and horizontal scaling, breathing back and forth infinitely like a dynamic pneumatic weight.`
};
