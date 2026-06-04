/**
 * Component: Split Text Reveal
 * Category: text-animation
 */

export const component = {
  id: 'split-text',
  name: 'Split Text Reveal',
  category: 'text-animation',
  tag: 'Modern',
  html: `<div class="split-text-wrapper" style="cursor: pointer;">
  <span class="split-text-left">SPL</span>
  <span class="split-text-right">IT</span>
</div>`,
  js: `// Speed up animation on click
const splitWrap = document.querySelector('.split-text-wrapper');
if (splitWrap) {
  splitWrap.addEventListener('mousedown', () => {
    splitWrap.style.transform = 'scale(0.95)';
  });
  splitWrap.addEventListener('mouseup', () => {
    splitWrap.style.transform = 'scale(1)';
  });
}`,
  ts: `// TypeScript Implementation
const splitWrap = document.querySelector<HTMLDivElement>('.split-text-wrapper');
if (splitWrap) {
  splitWrap.addEventListener('mousedown', () => {
    splitWrap.style.transform = 'scale(0.95)';
  });
  splitWrap.addEventListener('mouseup', () => {
    splitWrap.style.transform = 'scale(1)';
  });
}`,
  css: `/* Split Text Reveal CSS */
.split-text-wrapper {
  display: inline-flex;
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #ffffff;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.split-text-left,
.split-text-right {
  display: inline-block;
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 10px rgba(0, 242, 254, 0.3));
}

.split-text-left {
  animation: split-left-loop 3s infinite cubic-bezier(0.77, 0, 0.175, 1);
}

.split-text-right {
  animation: split-right-loop 3s infinite cubic-bezier(0.77, 0, 0.175, 1);
}

@keyframes split-left-loop {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-15px);
    opacity: 0.5;
  }
}

@keyframes split-right-loop {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(15px);
    opacity: 0.5;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="inline-flex font-black text-[34px] tracking-tighter uppercase transition-transform duration-200 cursor-pointer active:scale-95">
  <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#00f2fe] to-[#4facfe] animate-pulse">SPL</span>
  <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#00f2fe] to-[#4facfe] animate-pulse [animation-delay:150ms]">IT</span>
</div>`,
  prompt: `Design a premium "Split Text Reveal" repeating animation. The text is bold and modern, splitting vertically down the center into left and right layers that pull apart smoothly in an infinite cycle before locking back into unified high-end cyan typography.`
};
