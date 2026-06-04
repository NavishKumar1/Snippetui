/**
 * Component: True Focus Lens Blur
 * Category: text-animation
 */

export const component = {
  id: 'true-focus',
  name: 'True Focus Lens Blur',
  category: 'text-animation',
  tag: 'Staggered',
  html: `<div class="true-focus-wrapper" style="cursor: pointer;">
  <span class="focus-word-chunk" style="--w: 1;">TRUE</span>
  <span class="focus-word-chunk" style="--w: 2;">FOCUS</span>
</div>`,
  js: `// Pause focus shift on hover
const focusWrapper = document.querySelector('.true-focus-wrapper');
if (focusWrapper) {
  focusWrapper.addEventListener('mouseenter', () => {
    focusWrapper.querySelectorAll('.focus-word-chunk').forEach(chunk => {
      chunk.style.animationPlayState = 'paused';
    });
  });
  focusWrapper.addEventListener('mouseleave', () => {
    focusWrapper.querySelectorAll('.focus-word-chunk').forEach(chunk => {
      chunk.style.animationPlayState = 'running';
    });
  });
}`,
  ts: `// TypeScript Implementation
const focusWrapper = document.querySelector<HTMLDivElement>('.true-focus-wrapper');
if (focusWrapper) {
  focusWrapper.addEventListener('mouseenter', () => {
    focusWrapper.querySelectorAll<HTMLSpanElement>('.focus-word-chunk').forEach(chunk => {
      chunk.style.animationPlayState = 'paused';
    });
  });
  focusWrapper.addEventListener('mouseleave', () => {
    focusWrapper.querySelectorAll<HTMLSpanElement>('.focus-word-chunk').forEach(chunk => {
      chunk.style.animationPlayState = 'running';
    });
  });
}`,
  css: `/* True Focus Lens Blur Styles */
.true-focus-wrapper {
  display: flex;
  gap: 12px;
}

.focus-word-chunk {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  color: #ffffff;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  
  /* Staggered lens blurring loops */
  animation: true-focus-shift 3.6s infinite ease-in-out;
  animation-delay: calc(var(--w) * 1.8s);
  filter: blur(12px);
  opacity: 0.35;
}

@keyframes true-focus-shift {
  0%, 100% {
    filter: blur(10px);
    opacity: 0.35;
    transform: scale(0.95);
    color: #ffffff;
  }
  30%, 70% {
    filter: blur(0px);
    opacity: 1;
    transform: scale(1.05);
    color: #00f2fe;
    text-shadow: 0 0 15px rgba(0, 242, 254, 0.6);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex gap-3 cursor-pointer">
  <span class="font-extrabold text-[34px] text-white animate-pulse">TRUE</span>
  <span class="font-extrabold text-[34px] text-white animate-pulse [animation-delay:1800ms]">FOCUS</span>
</div>`,
  prompt: `Design a repeating "True Focus Lens Blur" text animation. Multiple word chunks dynamically swap camera focus, dissolving into heavy lens-like blurs and snapping into highly sharp glowing cyan text on alternate staggered repeat loops.`
};
