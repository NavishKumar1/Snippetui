/**
 * Component: Blur Text Reveal
 * Category: text-animation
 */

export const component = {
  id: 'blur-text',
  name: 'Blur Text Focus',
  category: 'text-animation',
  tag: 'Staggered',
  html: `<div class="blur-text-wrapper" style="cursor: pointer;">
  <span class="blur-char" style="--i: 1;">B</span>
  <span class="blur-char" style="--i: 2;">L</span>
  <span class="blur-char" style="--i: 3;">U</span>
  <span class="blur-char" style="--i: 4;">R</span>
</div>`,
  js: `// Dynamically restart focus animation
const blurWrapper = document.querySelector('.blur-text-wrapper');
if (blurWrapper) {
  blurWrapper.addEventListener('click', () => {
    const chars = blurWrapper.querySelectorAll('.blur-char');
    chars.forEach(char => {
      char.style.animation = 'none';
      char.offsetHeight; // Trigger reflow
      char.style.animation = 'blur-in-out 3.5s infinite ease-in-out';
      char.style.animationDelay = 'calc(var(--i) * 0.15s)';
    });
  });
}`,
  ts: `// TypeScript Implementation
const blurWrapper = document.querySelector<HTMLDivElement>('.blur-text-wrapper');
if (blurWrapper) {
  blurWrapper.addEventListener('click', () => {
    const chars = blurWrapper.querySelectorAll<HTMLSpanElement>('.blur-char');
    chars.forEach(char => {
      char.style.animation = 'none';
      char.offsetHeight; // Trigger reflow
      char.style.animation = 'blur-in-out 3.5s infinite ease-in-out';
      char.style.animationDelay = 'calc(var(--i) * 0.15s)';
    });
  });
}`,
  css: `/* Blur Text Focus Styles */
.blur-text-wrapper {
  display: flex;
  gap: 4px;
}

.blur-char {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  color: #ffffff;
  animation: blur-in-out 3.5s infinite ease-in-out;
  animation-delay: calc(var(--i) * 0.18s);
  filter: blur(12px);
  opacity: 0;
}

@keyframes blur-in-out {
  0%, 100% {
    filter: blur(12px);
    opacity: 0;
    transform: scale(0.9);
  }
  40%, 60% {
    filter: blur(0px);
    opacity: 1;
    transform: scale(1);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex gap-1 cursor-pointer">
  <span class="font-extrabold text-[34px] text-white animate-pulse">B</span>
  <span class="font-extrabold text-[34px] text-white animate-pulse [animation-delay:150ms]">L</span>
  <span class="font-extrabold text-[34px] text-white animate-pulse [animation-delay:300ms]">U</span>
  <span class="font-extrabold text-[34px] text-white animate-pulse [animation-delay:450ms]">R</span>
</div>`,
  prompt: `Design a repeating "Blur Text Focus" animation. Individual characters dynamically and sequentially dissolve into deep blurs and snap into pristine focus, loop repeating infinitely with elegant text-glow transitions.`
};
