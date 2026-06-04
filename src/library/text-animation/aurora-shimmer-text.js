/**
 * Component: Aurora Holographic Shimmer
 * Category: text-animation
 */

export const component = {
  id: 'aurora-shimmer-text',
  name: 'Aurora Holographic Shimmer',
  category: 'text-animation',
  tag: 'Hologram',
  html: `<div class="aurora-shimmer-container" style="cursor: pointer;">
  <span class="aurora-shimmer-text">SHIMMER</span>
</div>`,
  js: `// Speed up flow on click
const shimmerContainer = document.querySelector('.aurora-shimmer-container');
if (shimmerContainer) {
  const text = shimmerContainer.querySelector('.aurora-shimmer-text');
  shimmerContainer.addEventListener('mousedown', () => {
    text.style.animationDuration = '1s';
  });
  shimmerContainer.addEventListener('mouseup', () => {
    text.style.animationDuration = '5s';
  });
}`,
  ts: `// TypeScript Implementation
const shimmerContainer = document.querySelector<HTMLDivElement>('.aurora-shimmer-container');
if (shimmerContainer) {
  const text = shimmerContainer.querySelector<HTMLSpanElement>('.aurora-shimmer-text');
  if (text) {
    shimmerContainer.addEventListener('mousedown', () => {
      text.style.animationDuration = '1s';
    });
    shimmerContainer.addEventListener('mouseup', () => {
      text.style.animationDuration = '5s';
    });
  }
}`,
  css: `/* Aurora Shimmer Styles */
.aurora-shimmer-container {
  display: inline-flex;
  padding: 24px;
}

.aurora-shimmer-text {
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  
  /* Holographic periwinkle and soft gold flow gradient */
  background: linear-gradient(
    90deg,
    #8ec5fc 0%,
    #e0c3fc 25%,
    #fcf6ba 50%,
    #8ec5fc 75%,
    #e0c3fc 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Constant shimmer slide loop */
  animation: aurora-shimmer-flow 5s linear infinite;
  filter: drop-shadow(0px 2px 10px rgba(224, 195, 252, 0.4));
}

@keyframes aurora-shimmer-flow {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: -200% center;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="inline-flex p-6 cursor-pointer">
  <span class="font-extrabold text-[34px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#8ec5fc] via-[#e0c3fc] to-[#fcf6ba] bg-[length:200%_auto] animate-pulse">
    SHIMMER
  </span>
</div>`,
  prompt: `Design a premium "Aurora Holographic Shimmer" text effect. The text shines with a flowing periwinkle and soft gold northern lights aura gradient, loop repeating infinitely in a smooth metallic shine.`
};
