/**
 * Component: Neon Glowing Pulsing Text
 * Category: text-animation
 */

export const component = {
  id: 'neon-glow-text',
  name: 'Neon Glowing Pulsing Text',
  category: 'text-animation',
  tag: 'Animated',
  html: `<div class="neon-glow-text-effect">NEON BREATH</div>`,
  js: `// Vanilla JavaScript Implementation
const textElement = document.querySelector('.neon-glow-text-effect');
if (textElement) {
  // Add micro-interaction on hover
  textElement.addEventListener('mouseenter', () => {
    textElement.style.animationPlayState = 'paused';
  });
  textElement.addEventListener('mouseleave', () => {
    textElement.style.animationPlayState = 'running';
  });
}`,
  ts: `// TypeScript Implementation
const textElement = document.querySelector<HTMLDivElement>('.neon-glow-text-effect');
if (textElement) {
  textElement.addEventListener('mouseenter', () => {
    textElement.style.animationPlayState = 'paused';
  });
  textElement.addEventListener('mouseleave', () => {
    textElement.style.animationPlayState = 'running';
  });
}`,
  css: `/* Pure CSS Styles */
.neon-glow-text-effect {
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: transform 0.3s ease;
  animation: neon-pulse 1.8s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes neon-pulse {
  0% {
    text-shadow: 
      0 0 10px rgba(0, 242, 254, 0.6),
      0 0 20px rgba(0, 242, 254, 0.3),
      0 0 35px rgba(138, 43, 226, 0.6),
      0 0 70px rgba(138, 43, 226, 0.2);
    transform: scale(0.98);
  }
  100% {
    text-shadow: 
      0 0 15px rgba(0, 242, 254, 0.9),
      0 0 30px rgba(0, 242, 254, 0.5),
      0 0 55px rgba(138, 43, 226, 0.9),
      0 0 100px rgba(138, 43, 226, 0.5);
    transform: scale(1.02);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure keyframes & animations in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        'neon-pulse': {
          '0%': {
            textShadow: '0 0 10px rgba(0,242,254,0.6), 0 0 20px rgba(0,242,254,0.3), 0 0 35px rgba(138,43,226,0.6)',
            transform: 'scale(0.98)'
          },
          '100%': {
            textShadow: '0 0 15px rgba(0,242,254,0.9), 0 0 30px rgba(0,242,254,0.5), 0 0 55px rgba(138,43,226,0.9)',
            transform: 'scale(1.02)'
          }
        }
      },
      animation: {
        'neon-pulse': 'neon-pulse 1.8s infinite alternate cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  }
-->
<div class="font-extrabold text-[28px] text-white tracking-widest uppercase transition-transform duration-300 animate-neon-pulse">
  NEON BREATH
</div>`,
  prompt: `Design a high-fidelity cyberpunk text animation featuring a breathing neon pulse. The text must glow using dual glowing gradients (cyan and violet/purple) and expand and contract dynamically using scale transforms.`
};
