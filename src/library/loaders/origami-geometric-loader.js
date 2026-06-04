/**
 * Component: Origami Geometric Facets Loader
 * Category: loaders
 */

export const component = {
  id: 'origami-geometric-loader',
  name: 'Origami Geometric Facets Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="origami-loader-wrapper">
  <div class="origami-box">
    <div class="origami-facet facet-left"></div>
    <div class="origami-facet facet-right"></div>
    <div class="origami-facet facet-top"></div>
    <div class="origami-facet facet-bottom"></div>
  </div>
</div>`,
  js: `// Interactive scale morphing on click
const origamiBox = document.querySelector('.origami-box');
if (origamiBox) {
  origamiBox.addEventListener('click', () => {
    origamiBox.style.transform = 'scale(0.8) rotateX(45deg) rotateY(45deg)';
    setTimeout(() => {
      origamiBox.style.transform = '';
    }, 1500);
  });
}`,
  ts: `// TypeScript Implementation
const origamiBox = document.querySelector<HTMLDivElement>('.origami-box');
if (origamiBox) {
  origamiBox.addEventListener('click', () => {
    origamiBox.style.transform = 'scale(0.8) rotateX(45deg) rotateY(45deg)';
    setTimeout(() => {
      origamiBox.style.transform = '';
    }, 1500);
  });
}`,
  css: `/* Origami Geometric Facets Loader Styles */
.origami-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 400px;
}

.origami-box {
  position: relative;
  width: 50px;
  height: 50px;
  transform-style: preserve-3d;
  animation: origami-cube-rotate 4s infinite linear;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.origami-facet {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  opacity: 0.8;
  transform-origin: center bottom;
}

.facet-left {
  border-width: 0 25px 43.3px 25px;
  border-color: transparent transparent #00f2fe transparent;
  transform: rotateY(-90deg) translateZ(14.4px) rotateX(19.5deg);
  filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.5));
  animation: origami-fold-left 2s ease-in-out infinite alternate;
}

.facet-right {
  border-width: 0 25px 43.3px 25px;
  border-color: transparent transparent #a28cff transparent;
  transform: rotateY(90deg) translateZ(14.4px) rotateX(19.5deg);
  filter: drop-shadow(0 0 10px rgba(162, 140, 255, 0.5));
  animation: origami-fold-right 2s ease-in-out infinite alternate;
}

.facet-top {
  border-width: 0 25px 43.3px 25px;
  border-color: transparent transparent #ff007f transparent;
  transform: rotateX(90deg) translateZ(14.4px) rotateX(19.5deg);
  filter: drop-shadow(0 0 10px rgba(255, 0, 127, 0.5));
  animation: origami-fold-top 2s ease-in-out infinite alternate;
}

.facet-bottom {
  border-width: 0 25px 43.3px 25px;
  border-color: transparent transparent #ffd700 transparent;
  transform: rotateX(-90deg) translateZ(14.4px) rotateX(19.5deg);
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
  animation: origami-fold-bottom 2s ease-in-out infinite alternate;
}

@keyframes origami-cube-rotate {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
}

@keyframes origami-fold-left {
  0%, 100% { transform: rotateY(-90deg) translateZ(14.4px) rotateX(19.5deg); }
  50% { transform: rotateY(-90deg) translateZ(14.4px) rotateX(45deg); }
}

@keyframes origami-fold-right {
  0%, 100% { transform: rotateY(90deg) translateZ(14.4px) rotateX(19.5deg); }
  50% { transform: rotateY(90deg) translateZ(14.4px) rotateX(45deg); }
}

@keyframes origami-fold-top {
  0%, 100% { transform: rotateX(90deg) translateZ(14.4px) rotateX(19.5deg); }
  50% { transform: rotateX(90deg) translateZ(14.4px) rotateX(45deg); }
}

@keyframes origami-fold-bottom {
  0%, 100% { transform: rotateX(-90deg) translateZ(14.4px) rotateX(19.5deg); }
  50% { transform: rotateX(-90deg) translateZ(14.4px) rotateX(45deg); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center [perspective:400px]">
  <div class="relative w-[50px] h-[50px] [transform-style:preserve-3d] animate-spin">
    <div class="absolute w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[43.3px] border-b-cyan-400 opacity-80" style="transform: rotateY(-90deg) translateZ(14.4px) rotateX(19.5deg)"></div>
  </div>
</div>`,
  prompt: `Geometric 3D origami facet loader. Four vector triangular panels fold and unfold dynamically in three-dimensional coordinates while the central polyhedron body rotates.`
};
