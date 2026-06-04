/**
 * Component: Falling Physics Text
 * Category: text-animation
 */

export const component = {
  id: 'falling-text',
  name: 'Falling Bounce Drops',
  category: 'text-animation',
  tag: 'Bounce',
  html: `<div class="falling-text-wrapper" style="cursor: pointer;">
  <span class="falling-char" style="--d: 1;">D</span>
  <span class="falling-char" style="--d: 2;">R</span>
  <span class="falling-char" style="--d: 3;">O</span>
  <span class="falling-char" style="--d: 4;">P</span>
</div>`,
  js: `// Re-trigger falling bounce on click
const fallWrapper = document.querySelector('.falling-text-wrapper');
if (fallWrapper) {
  fallWrapper.addEventListener('click', () => {
    const chars = fallWrapper.querySelectorAll('.falling-char');
    chars.forEach(char => {
      char.style.animation = 'none';
      char.offsetHeight; // Trigger reflow
      char.style.animation = 'falling-bounce-loop 2.8s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      char.style.animationDelay = 'calc(var(--d) * 0.15s)';
    });
  });
}`,
  ts: `// TypeScript Implementation
const fallWrapper = document.querySelector<HTMLDivElement>('.falling-text-wrapper');
if (fallWrapper) {
  fallWrapper.addEventListener('click', () => {
    const chars = fallWrapper.querySelectorAll<HTMLSpanElement>('.falling-char');
    chars.forEach(char => {
      char.style.animation = 'none';
      char.offsetHeight; // Trigger reflow
      char.style.animation = 'falling-bounce-loop 2.8s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      char.style.animationDelay = 'calc(var(--d) * 0.15s)';
    });
  });
}`,
  css: `/* Falling Bounce Drops Styles */
.falling-text-wrapper {
  display: flex;
  gap: 8px;
  height: 80px;
  align-items: flex-end;
  padding-bottom: 12px;
}

.falling-char {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  color: #00f2fe;
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 242, 254, 0.3));
  
  /* Infinite gravity dropping bounce loop */
  animation: falling-bounce-loop 2.8s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation-delay: calc(var(--d) * 0.15s);
  transform: translateY(-80px);
  opacity: 0;
}

@keyframes falling-bounce-loop {
  0% {
    transform: translateY(-80px);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  30% {
    transform: translateY(0px) scaleY(0.85); /* Compress on impact */
  }
  40% {
    transform: translateY(-16px) scaleY(1.05); /* Bounce up */
  }
  50% {
    transform: translateY(0px) scaleY(0.95); /* Drop back down */
  }
  60% {
    transform: translateY(-4px) scaleY(1.01); /* Small final bounce */
  }
  70%, 85% {
    transform: translateY(0px) scaleY(1); /* Rest at bottom */
    opacity: 1;
  }
  100% {
    transform: translateY(40px); /* Fall off bottom */
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex gap-2 h-20 items-end pb-3 cursor-pointer">
  <span class="font-extrabold text-[34px] text-[#00f2fe] animate-bounce">D</span>
  <span class="font-extrabold text-[34px] text-[#00f2fe] animate-bounce [animation-delay:150ms]">R</span>
  <span class="font-extrabold text-[34px] text-[#00f2fe] animate-bounce [animation-delay:300ms]">O</span>
  <span class="font-extrabold text-[34px] text-[#00f2fe] animate-bounce [animation-delay:450ms]">P</span>
</div>`,
  prompt: `Design a repeating "Falling Bounce Drops" text animation. The letters drop sequentially from above, bouncing realistically on impact at the bottom line before falling away off-screen, loop repeating infinitely.`
};
