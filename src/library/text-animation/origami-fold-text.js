/**
 * Component: Abstract Origami Folding
 * Category: text-animation
 */

export const component = {
  id: 'origami-fold-text',
  name: 'Origami Paper Fold',
  category: 'text-animation',
  tag: '3D Folding',
  html: `<div class="origami-fold-container" style="cursor: pointer;">
  <span class="origami-layer origami-front">FOLD</span>
  <span class="origami-layer origami-back">FOLD</span>
</div>`,
  js: `// Speed up fold on click
const origamiContainer = document.querySelector('.origami-fold-container');
if (origamiContainer) {
  origamiContainer.addEventListener('mousedown', () => {
    origamiContainer.querySelectorAll('.origami-layer').forEach(layer => {
      layer.style.animationDuration = '0.6s';
    });
  });
  origamiContainer.addEventListener('mouseup', () => {
    origamiContainer.querySelectorAll('.origami-layer').forEach(layer => {
      layer.style.animationDuration = '2.4s';
    });
  });
}`,
  ts: `// TypeScript Implementation
const origamiContainer = document.querySelector<HTMLDivElement>('.origami-fold-container');
if (origamiContainer) {
  origamiContainer.addEventListener('mousedown', () => {
    origamiContainer.querySelectorAll<HTMLSpanElement>('.origami-layer').forEach(layer => {
      layer.style.animationDuration = '0.6s';
    });
  });
  origamiContainer.addEventListener('mouseup', () => {
    origamiContainer.querySelectorAll<HTMLSpanElement>('.origami-layer').forEach(layer => {
      layer.style.animationDuration = '2.4s';
    });
  });
}`,
  css: `/* Abstract Origami Folding Styles */
.origami-fold-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  perspective: 400px;
  width: 140px;
  height: 60px;
}

.origami-layer {
  position: absolute;
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffffff;
  transform-style: preserve-3d;
  user-select: none;
}

.origami-front {
  color: #00f2fe;
  background: linear-gradient(135deg, #ffffff 30%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform-origin: top center;
  
  /* Infinite 3D paper folding loop */
  animation: origami-fold-f 2.4s infinite alternate ease-in-out;
  z-index: 5;
}

.origami-back {
  color: #8a2be2;
  background: linear-gradient(135deg, #00f2fe 0%, #8a2be2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform-origin: bottom center;
  filter: brightness(0.6) blur(0.5px);
  
  /* Infinite matching 3D paper folding loop */
  animation: origami-fold-b 2.4s infinite alternate ease-in-out;
  z-index: 2;
}

@keyframes origami-fold-f {
  0% {
    transform: rotateX(0deg) translate3d(0, 0, 0);
    filter: brightness(1.15);
  }
  100% {
    transform: rotateX(85deg) translate3d(0, -6px, 10px);
    filter: brightness(0.4) blur(1px);
    opacity: 0.3;
  }
}

@keyframes origami-fold-b {
  0% {
    transform: rotateX(0deg) translate3d(0, 0, 0);
    filter: brightness(0.6);
  }
  100% {
    transform: rotateX(-85deg) translate3d(0, 6px, -10px);
    filter: brightness(1.15) drop-shadow(0 0 10px rgba(138, 43, 226, 0.45));
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex items-center justify-center [perspective:400px] w-36 h-14 cursor-pointer">
  <span class="font-extrabold text-[36px] tracking-widest text-[#00f2fe] animate-pulse">FOLD</span>
</div>`,
  prompt: `Design a premium "Abstract Origami Folding" text effect. The typography folds and skews gracefully in 3D perspective space like geometric origami paper layers, loop repeating infinitely with clean light/shadow transitions.`
};
