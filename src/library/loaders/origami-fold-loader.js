/**
 * Component: Origami Star Fold Loader
 * Category: loaders
 */

export const component = {
  id: 'origami-fold-loader',
  name: 'Origami Star Fold Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="origami-star-wrapper">
  <div class="star-panel star-l"></div>
  <div class="star-panel star-r"></div>
  <div class="star-panel star-t"></div>
  <div class="star-panel star-b"></div>
</div>`,
  js: `// Reverse unfolding loops on hover state
const star = document.querySelector('.origami-star-wrapper');
if (star) {
  star.addEventListener('mouseenter', () => {
    const panels = star.querySelectorAll('.star-panel');
    panels.forEach(panel => {
      panel.style.animationDirection = 'reverse';
    });
  });
  
  star.addEventListener('mouseleave', () => {
    const panels = star.querySelectorAll('.star-panel');
    panels.forEach(panel => {
      panel.style.animationDirection = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const star = document.querySelector<HTMLDivElement>('.origami-star-wrapper');
if (star) {
  star.addEventListener('mouseenter', () => {
    const panels = star.querySelectorAll<HTMLDivElement>('.star-panel');
    panels.forEach(panel => {
      panel.style.animationDirection = 'reverse';
    });
  });
  
  star.addEventListener('mouseleave', () => {
    const panels = star.querySelectorAll<HTMLDivElement>('.star-panel');
    panels.forEach(panel => {
      panel.style.animationDirection = '';
    });
  });
}`,
  css: `/* Origami Star Fold Loader Styles */
.origami-star-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 300px;
}

.star-panel {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  opacity: 0.85;
  transform-origin: center center;
}

.star-l {
  border-width: 20px 34.6px 20px 0;
  border-color: transparent #00f2fe transparent transparent;
  transform: translate3d(-15px, 0, 0);
  animation: star-unfold-l 1.6s cubic-bezier(0.25, 0.8, 0.25, 1) infinite alternate;
}

.star-r {
  border-width: 20px 0 20px 34.6px;
  border-color: transparent transparent transparent #a28cff;
  transform: translate3d(15px, 0, 0);
  animation: star-unfold-r 1.6s cubic-bezier(0.25, 0.8, 0.25, 1) infinite alternate;
  animation-delay: 0.2s;
}

.star-t {
  border-width: 0 20px 34.6px 20px;
  border-color: transparent transparent #ff007f transparent;
  transform: translate3d(0, -15px, 0);
  animation: star-unfold-t 1.6s cubic-bezier(0.25, 0.8, 0.25, 1) infinite alternate;
  animation-delay: 0.4s;
}

.star-b {
  border-width: 34.6px 20px 0 20px;
  border-color: #ffd700 transparent transparent transparent;
  transform: translate3d(0, 15px, 0);
  animation: star-unfold-b 1.6s cubic-bezier(0.25, 0.8, 0.25, 1) infinite alternate;
  animation-delay: 0.6s;
}

@keyframes star-unfold-l {
  0% { transform: translate3d(-15px, 0, 0) rotateY(0deg); }
  100% { transform: translate3d(-30px, 0, 15px) rotateY(-70deg); }
}

@keyframes star-unfold-r {
  0% { transform: translate3d(15px, 0, 0) rotateY(0deg); }
  100% { transform: translate3d(30px, 0, 15px) rotateY(70deg); }
}

@keyframes star-unfold-t {
  0% { transform: translate3d(0, -15px, 0) rotateX(0deg); }
  100% { transform: translate3d(0, -30px, 15px) rotateX(70deg); }
}

@keyframes star-unfold-b {
  0% { transform: translate3d(0, 15px, 0) rotateX(0deg); }
  100% { transform: translate3d(0, 30px, 15px) rotateX(-70deg); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center [perspective:300px]">
  <div class="absolute w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[34.6px] border-r-cyan-400 opacity-80 left-[35%] animate-pulse"></div>
</div>`,
  prompt: `Origami unfolding geometric star loader. Triangular perspective facets flip outward in three-dimensional paths and merge back seamlessly.`
};
