/**
 * Component: Liquid Distortion wave
 * Category: text-animation
 */

export const component = {
  id: 'liquid-water-text',
  name: 'Liquid Distortion wave',
  category: 'text-animation',
  tag: 'Animated',
  html: `<div class="liquid-water-text-effect" data-text="LIQUID">LIQUID</div>`,
  js: `// Vanilla JavaScript Implementation
const textElement = document.querySelector('.liquid-water-text-effect');
if (textElement) {
  // We can dynamically trigger interactive currents on click
  textElement.addEventListener('click', () => {
    textElement.style.animationDuration = '2s';
    setTimeout(() => {
      textElement.style.animationDuration = '4s';
    }, 2000);
  });
}`,
  ts: `// TypeScript Implementation
const textElement = document.querySelector<HTMLDivElement>('.liquid-water-text-effect');
if (textElement) {
  textElement.addEventListener('click', () => {
    textElement.style.animationDuration = '2s';
    setTimeout(() => {
      textElement.style.animationDuration = '4s';
    }, 2000);
  });
}`,
  css: `/* Pure CSS Styles */
.liquid-water-text-effect {
  position: relative;
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  user-select: none;
  cursor: pointer;
}

.liquid-water-text-effect::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #00f2fe;
  text-shadow: 0 0 15px rgba(0, 242, 254, 0.4);
  border-bottom: 2px solid #00f2fe;
  overflow: hidden;
  animation: liquid-wave 4s ease-in-out infinite;
}

@keyframes liquid-wave {
  0%, 100% {
    clip-path: polygon(0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%);
  }
  50% {
    clip-path: polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure keyframes & animation in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        'liquid-wave': {
          '0%, 100%': { clipPath: 'polygon(0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%)' },
          '50%': { clipPath: 'polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%)' }
        }
      },
      animation: {
        'liquid-wave': 'liquid-wave 4s ease-in-out infinite'
      }
    }
  }
-->
<div class="relative font-extrabold text-[32px] text-white/10 uppercase tracking-widest cursor-pointer select-none
  before:content-['LIQUID'] before:absolute before:inset-0 before:text-[#00f2fe] before:border-b-2 before:border-[#00f2fe] before:overflow-hidden before:animate-liquid-wave before:drop-shadow-[0_0_15px_rgba(0,242,254,0.4)]">
  LIQUID
</div>`,
  prompt: `Generate a fluid, responsive liquid text distortion animation. The text container must have a semi-transparent base text, and an absolute positioned pseudo-element filled with bright cyan water color that morphs dynamically like real flowing waves using polygon clip-paths.`
};
