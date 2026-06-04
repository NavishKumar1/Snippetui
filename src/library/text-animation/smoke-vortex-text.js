/**
 * Component: Fluid Smoke Vortex
 * Category: text-animation
 */

export const component = {
  id: 'smoke-vortex-text',
  name: 'Fluid Smoke Vortex',
  category: 'text-animation',
  tag: 'Stunning',
  html: `<div class="smoke-vortex-wrapper" style="cursor: pointer;">
  <span class="smoke-vortex-content" data-text="SMOKE">SMOKE</span>
</div>`,
  js: `// Speed up wave flow on click
const smokeWrap = document.querySelector('.smoke-vortex-wrapper');
if (smokeWrap) {
  const content = smokeWrap.querySelector('.smoke-vortex-content');
  smokeWrap.addEventListener('mousedown', () => {
    content.style.animationDuration = '2s';
  });
  smokeWrap.addEventListener('mouseup', () => {
    content.style.animationDuration = '6s';
  });
}`,
  ts: `// TypeScript Implementation
const smokeWrap = document.querySelector<HTMLDivElement>('.smoke-vortex-wrapper');
if (smokeWrap) {
  const content = smokeWrap.querySelector<HTMLSpanElement>('.smoke-vortex-content');
  if (content) {
    smokeWrap.addEventListener('mousedown', () => {
      content.style.animationDuration = '2s';
    });
    smokeWrap.addEventListener('mouseup', () => {
      content.style.animationDuration = '6s';
    });
  }
}`,
  css: `/* Fluid Smoke Vortex Styles */
.smoke-vortex-wrapper {
  padding: 16px;
}

.smoke-vortex-content {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ffffff;
  position: relative;
  
  /* Text fill smoky fog shifting gradient */
  background: linear-gradient(
    45deg,
    #00f2fe 0%,
    #8a2be2 25%,
    #ffd700 50%,
    #ff007f 75%,
    #00f2fe 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Rolling dynamic smoke keyframes loop */
  animation: smoke-rolling-flow 6s ease infinite alternate;
  filter: drop-shadow(0 2px 10px rgba(138, 43, 226, 0.4));
}

@keyframes smoke-rolling-flow {
  0% {
    background-position: 0% 50%;
    filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.45));
    transform: translateY(0) skewX(-1deg);
  }
  50% {
    background-position: 100% 50%;
    filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.45));
    transform: translateY(-2px) skewX(2deg);
  }
  100% {
    background-position: 0% 50%;
    filter: drop-shadow(0 0 10px rgba(138, 43, 226, 0.45));
    transform: translateY(1.5px) skewX(-2deg);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="p-4 cursor-pointer">
  <span class="font-extrabold text-[36px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-tr from-[#00f2fe] via-[#8a2be2] via-[#ffd700] to-[#ff007f] bg-[length:300%_300%] filter drop-shadow-[0_2px_10px_rgba(138,43,226,0.4)] animate-pulse">
    SMOKE
  </span>
</div>`,
  prompt: `Design a gorgeous "Fluid Smoke Vortex" typography animation. Text is filled with rolling HSL-curated indigo, hot-pink and teal gaseous smoke nebulae drifting inside the letters on infinite alternating cycles.`
};
