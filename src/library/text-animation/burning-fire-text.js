/**
 * Component: Burning Fire Particle Glow
 * Category: text-animation
 */

export const component = {
  id: 'burning-fire-text',
  name: 'Burning Fire Particle Glow',
  category: 'text-animation',
  tag: 'Animated',
  html: `<div class="burning-fire-text-effect">FIRE GLOW</div>`,
  js: `// Vanilla JavaScript Implementation
const fireText = document.querySelector('.burning-fire-text-effect');
if (fireText) {
  // Enhance flicker intensity dynamic triggers on click
  fireText.addEventListener('click', () => {
    fireText.style.animationDuration = '0.3s';
    setTimeout(() => {
      fireText.style.animationDuration = '0.9s';
    }, 1500);
  });
}`,
  ts: `// TypeScript Implementation
const fireText = document.querySelector<HTMLDivElement>('.burning-fire-text-effect');
if (fireText) {
  fireText.addEventListener('click', () => {
    fireText.style.animationDuration = '0.3s';
    setTimeout(() => {
      fireText.style.animationDuration = '0.9s';
    }, 1500);
  });
}`,
  css: `/* Pure CSS Styles */
.burning-fire-text-effect {
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  user-select: none;
  cursor: pointer;
  animation: fire-flicker 0.9s infinite alternate ease-in-out;
}

@keyframes fire-flicker {
  0% {
    text-shadow: 
      0 0 4px #ffffff,
      0 -4px 6px #ffec3d,
      1px -8px 10px #ff7a45,
      -1px -12px 14px #ff4d4f;
    transform: translateY(0) skewX(-1deg);
  }
  50% {
    text-shadow: 
      0 0 3px #ffffff,
      0 -5px 7px #ffec3d,
      2px -9px 12px #ff7a45,
      -2px -14px 16px #ff4d4f;
    transform: translateY(-1px) skewX(1deg);
  }
  100% {
    text-shadow: 
      0 0 5px #ffffff,
      0 -3px 5px #ffec3d,
      1px -7px 8px #ff7a45,
      -1px -10px 12px #ff4d4f;
    transform: translateY(1px) skewX(0deg);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure keyframes & animations in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        'fire-flicker': {
          '0%': {
            textShadow: '0 0 4px #ffffff, 0 -4px 6px #ffec3d, 1px -8px 10px #ff7a45, -1px -12px 14px #ff4d4f',
            transform: 'translateY(0) skewX(-1deg)'
          },
          '50%': {
            textShadow: '0 0 3px #ffffff, 0 -5px 7px #ffec3d, 2px -9px 12px #ff7a45, -2px -14px 16px #ff4d4f',
            transform: 'translateY(-1px) skewX(1deg)'
          },
          '100%': {
            textShadow: '0 0 5px #ffffff, 0 -3px 5px #ffec3d, 1px -7px 8px #ff7a45, -1px -10px 12px #ff4d4f',
            transform: 'translateY(1px) skewX(0deg)'
          }
        }
      },
      animation: {
        'fire-flicker': 'fire-flicker 0.9s infinite alternate ease-in-out'
      }
    }
  }
-->
<div class="font-extrabold text-[32px] text-white tracking-wider uppercase select-none cursor-pointer animate-fire-flicker">
  FIRE GLOW
</div>`,
  prompt: `Design an intense fire burning text animation with flickering flames. The text-shadow property must be stacked with multiple layers of bright yellow (#ffec3d), vibrant orange (#ff7a45), and hot red (#ff4d4f) glowing coordinates that shift organically using keyframe transforms and skew displacements.`
};
