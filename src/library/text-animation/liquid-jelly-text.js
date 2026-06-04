/**
 * Component: Infinite Liquid Jelly Morph
 * Category: text-animation
 */

export const component = {
  id: 'liquid-jelly-text',
  name: 'Liquid Jelly Morph',
  category: 'text-animation',
  tag: 'Gooey',
  html: `<div class="liquid-jelly-container" style="cursor: pointer;">
  <span class="jelly-char" style="--d: 1;">J</span>
  <span class="jelly-char" style="--d: 2;">E</span>
  <span class="jelly-char" style="--d: 3;">L</span>
  <span class="jelly-char" style="--d: 4;">L</span>
  <span class="jelly-char" style="--d: 5;">Y</span>
</div>`,
  js: `// Interactive scale on click
const jellyContainer = document.querySelector('.liquid-jelly-container');
if (jellyContainer) {
  jellyContainer.addEventListener('mousedown', () => {
    jellyContainer.querySelectorAll('.jelly-char').forEach(char => {
      char.style.transform = 'scale(0.85, 1.25)';
    });
  });
  jellyContainer.addEventListener('mouseup', () => {
    jellyContainer.querySelectorAll('.jelly-char').forEach(char => {
      char.style.transform = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const jellyContainer = document.querySelector<HTMLDivElement>('.liquid-jelly-container');
if (jellyContainer) {
  jellyContainer.addEventListener('mousedown', () => {
    jellyContainer.querySelectorAll<HTMLSpanElement>('.jelly-char').forEach(char => {
      char.style.transform = 'scale(0.85, 1.25)';
    });
  });
  jellyContainer.addEventListener('mouseup', () => {
    jellyContainer.querySelectorAll<HTMLSpanElement>('.jelly-char').forEach(char => {
      char.style.transform = '';
    });
  });
}`,
  css: `/* Liquid Jelly Morph CSS */
.liquid-jelly-container {
  display: flex;
  gap: 6px;
  padding: 12px;
}

.jelly-char {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  color: #ff007f;
  background: linear-gradient(135deg, #ff007f 0%, #8a2be2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 2px 10px rgba(255, 0, 127, 0.4));
  
  /* Infinite elastic jelly coordinate morphing delay loop */
  animation: jelly-elastic-loop 2.4s infinite ease-in-out alternate;
  animation-delay: calc(var(--d) * 0.15s);
  transform-origin: bottom center;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  user-select: none;
}

@keyframes jelly-elastic-loop {
  0% {
    transform: scale(0.9, 1.1) translateY(-4px);
    filter: brightness(0.9);
  }
  35% {
    transform: scale(1.15, 0.85) translateY(0);
    filter: brightness(1.1) drop-shadow(0 0 8px rgba(255, 0, 127, 0.5));
  }
  70% {
    transform: scale(0.85, 1.15) translateY(-2px);
  }
  100% {
    transform: scale(1, 1) translateY(0);
    filter: brightness(1) drop-shadow(0 0 15px rgba(138, 43, 226, 0.5));
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex gap-2 p-3 cursor-pointer">
  <span class="font-extrabold text-[34px] text-[#ff007f] hover:scale-y-[1.35] hover:scale-x-[0.8] transition-transform duration-200">J</span>
  <span class="font-extrabold text-[34px] text-[#ff007f] hover:scale-y-[1.35] hover:scale-x-[0.8] transition-transform duration-200">E</span>
  <span class="font-extrabold text-[34px] text-[#ff007f] hover:scale-y-[1.35] hover:scale-x-[0.8] transition-transform duration-200">L</span>
  <span class="font-extrabold text-[34px] text-[#ff007f] hover:scale-y-[1.35] hover:scale-x-[0.8] transition-transform duration-200">L</span>
  <span class="font-extrabold text-[34px] text-[#ff007f] hover:scale-y-[1.35] hover:scale-x-[0.8] transition-transform duration-200">Y</span>
</div>`,
  prompt: `Design a premium "Liquid Jelly Morph" text animation. Letters dynamically warp like elastic fluid jelly on infinite alternate loops with HSL-curated pink and amethyst purple glowing keyframe coordinates.`
};
