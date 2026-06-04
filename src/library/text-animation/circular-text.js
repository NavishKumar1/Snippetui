/**
 * Component: Circular Text Loop
 * Category: text-animation
 */

export const component = {
  id: 'circular-text',
  name: 'Circular Path Rotation',
  category: 'text-animation',
  tag: 'Rotating',
  html: `<div class="circular-text-wrapper" style="cursor: pointer;">
  <svg class="circular-svg" viewBox="0 0 100 100" width="120" height="120">
    <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
    <text class="circular-text-content">
      <textPath href="#circlePath" startOffset="0%">
        SNIPPETUI * PREMIUM COMPONENT * 
      </textPath>
    </text>
  </svg>
</div>`,
  js: `// Pause rotation on hover
const circWrapper = document.querySelector('.circular-text-wrapper');
if (circWrapper) {
  const svg = circWrapper.querySelector('.circular-svg');
  if (svg) {
    circWrapper.addEventListener('mouseenter', () => {
      svg.style.animationPlayState = 'paused';
    });
    circWrapper.addEventListener('mouseleave', () => {
      svg.style.animationPlayState = 'running';
    });
  }
}`,
  ts: `// TypeScript Implementation
const circWrapper = document.querySelector<HTMLDivElement>('.circular-text-wrapper');
if (circWrapper) {
  const svg = circWrapper.querySelector<SVGSVGElement>('.circular-svg');
  if (svg) {
    circWrapper.addEventListener('mouseenter', () => {
      svg.style.animationPlayState = 'paused';
    });
    circWrapper.addEventListener('mouseleave', () => {
      svg.style.animationPlayState = 'running';
    });
  }
}`,
  css: `/* Circular Text Loop CSS */
.circular-text-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.circular-svg {
  animation: circle-rotate-loop 12s linear infinite;
  transform-origin: center center;
}

.circular-text-content {
  fill: #00f2fe;
  font-family: 'Fira Code', monospace;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-shadow: 0 0 4px rgba(0, 242, 254, 0.4);
}

@keyframes circle-rotate-loop {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex items-center justify-center cursor-pointer">
  <svg class="animate-spin [animation-duration:12s]" viewBox="0 0 100 100" width="120" height="120">
    <path id="circlePathTw" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
    <text class="fill-[#00f2fe] font-mono text-[8.5px] font-bold tracking-widest">
      <textPath href="#circlePathTw">
        SNIPPETUI * PREMIUM COMPONENT * 
      </textPath>
    </text>
  </svg>
</div>`,
  prompt: `Design a repeating "Circular Path Rotation" text animation. The typography bends along a clean circle path in terminal cyan, continuously rotating at a smooth, constant speed like a retro tech stamp overlay.`
};
