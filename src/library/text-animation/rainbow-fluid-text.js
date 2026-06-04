/**
 * Component: Rainbow Color Fluid Loop
 * Category: text-animation
 */

export const component = {
  id: 'rainbow-fluid-text',
  name: 'Rainbow Color Fluid Loop',
  category: 'text-animation',
  tag: 'Animated',
  html: `<div class="rainbow-fluid-text-effect">RAINBOW FLOW</div>`,
  js: `// Vanilla JavaScript Implementation
const rainbowText = document.querySelector('.rainbow-fluid-text-effect');
if (rainbowText) {
  // Speed up rotation on hover
  rainbowText.addEventListener('mouseenter', () => {
    rainbowText.style.animationDuration = '3s';
  });
  rainbowText.addEventListener('mouseleave', () => {
    rainbowText.style.animationDuration = '8s';
  });
}`,
  ts: `// TypeScript Implementation
const rainbowText = document.querySelector<HTMLDivElement>('.rainbow-fluid-text-effect');
if (rainbowText) {
  rainbowText.addEventListener('mouseenter', () => {
    rainbowText.style.animationDuration = '3s';
  });
  rainbowText.addEventListener('mouseleave', () => {
    rainbowText.style.animationDuration = '8s';
  });
}`,
  css: `/* Pure CSS Styles */
.rainbow-fluid-text-effect {
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: linear-gradient(
    to right,
    #ff007f,
    #ff00ff,
    #7f00ff,
    #00f2fe,
    #4facfe,
    #00ff7f,
    #ffff00,
    #ff7f00,
    #ff007f
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: animation-duration 0.5s ease;
  animation: rainbow-shift 8s linear infinite;
}

@keyframes rainbow-shift {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 300% center;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure keyframes & animations in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        'rainbow-shift': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '300% center' }
        }
      },
      animation: {
        'rainbow-shift': 'rainbow-shift 8s linear infinite'
      }
    }
  }
-->
<div class="font-extrabold text-[32px] tracking-wider uppercase bg-gradient-to-r from-[#ff007f] via-[#7f00ff] via-[#00f2fe] via-[#00ff7f] via-[#ffff00] to-[#ff007f] bg-[length:300%_auto] bg-clip-text text-transparent transition-all duration-500 animate-rainbow-shift hover:[animation-duration:3s]">
  RAINBOW FLOW
</div>`,
  prompt: `Design a premium, dynamic rainbow color fluid text animation. The text must utilize a high-definition linear gradient cycling sequentially through pink, violet, cyan, green, and gold, moving continuously from left to right using background-position shifts.`
};
