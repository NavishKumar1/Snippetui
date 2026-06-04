/**
 * Component: Split Reveal Slide
 * Category: text-animation
 */

export const component = {
  id: 'split-reveal-text',
  name: 'Split Reveal Slide',
  category: 'text-animation',
  tag: 'Animated',
  html: `<div class="split-reveal-text-effect">
  <span class="reveal-line">
    <span class="reveal-word">KINETIC</span>
  </span>
  <span class="reveal-line">
    <span class="reveal-word font-gradient">DESIGN</span>
  </span>
</div>`,
  js: `// Vanilla JavaScript Implementation
const container = document.querySelector('.split-reveal-text-effect');
if (container) {
  // Add dynamic scale coordinates on hover
  container.addEventListener('mouseenter', () => {
    container.style.transform = 'scale(1.03)';
  });
  container.addEventListener('mouseleave', () => {
    container.style.transform = 'scale(1)';
  });
}`,
  ts: `// TypeScript Implementation
const container = document.querySelector<HTMLDivElement>('.split-reveal-text-effect');
if (container) {
  container.addEventListener('mouseenter', () => {
    container.style.transform = 'scale(1.03)';
  });
  container.addEventListener('mouseleave', () => {
    container.style.transform = 'scale(1)';
  });
}`,
  css: `/* Pure CSS Styles */
.split-reveal-text-effect {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-line {
  display: block;
  overflow: hidden;
  height: 40px;
  position: relative;
}

.reveal-word {
  display: block;
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.01em;
  transform: translateY(100%);
  animation: split-reveal-loop 4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.reveal-line:nth-child(2) .reveal-word {
  animation-delay: 0.2s;
}

.font-gradient {
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes split-reveal-loop {
  0%, 100% {
    transform: translateY(100%);
  }
  15%, 85% {
    transform: translateY(0);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure keyframes & animations in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        'split-reveal': {
          '0%, 100%': { transform: 'translateY(100%)' },
          '15%, 85%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'split-reveal': 'split-reveal 4s cubic-bezier(0.16, 1, 0.3, 1) infinite'
      }
    }
  }
-->
<div class="flex flex-col items-center gap-2 cursor-pointer transition-transform duration-400 hover:scale-103">
  <span class="block overflow-hidden h-10 relative">
    <span class="block font-heading text-[32px] font-extrabold text-white tracking-tight translate-y-full animate-split-reveal">
      KINETIC
    </span>
  </span>
  <span class="block overflow-hidden h-10 relative">
    <span class="block font-heading text-[32px] font-extrabold bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent tracking-tight translate-y-full animate-split-reveal [animation-delay:0.2s]">
      DESIGN
    </span>
  </span>
</div>`,
  prompt: `Design an elegant split reveal masking slide animation. The texts are separated into lines wrapping individual words. Each word must slice and slide out vertically from a hidden masked container using an entering offset shift loop with delayed intervals.`
};
