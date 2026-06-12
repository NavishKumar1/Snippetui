/**
 * Component: Text Gradient Shimmer
 * Category: text-animation
 */

export const component = {
  id: 'text-gradient-shimmer',
  name: 'Text Gradient Shimmer',
  category: 'text-animation',
  tag: 'Animated',
  html: `<div class="text-shimmer-effect">SHIMMER EFFECT</div>`,
  js: `// Pure CSS Component - No Javascript required`,
  ts: `// Pure CSS Component - No TypeScript required`,
  css: `/* Pure CSS Styles */
.text-shimmer-effect {
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.01em;
  background: linear-gradient(90deg, #5b5c68 0%, #ffffff 50%, #5b5c68 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-shimmer-anim 3s linear infinite;
}

@keyframes text-shimmer-anim {
  0% { background-position: 0% center; }
  100% { background-position: -200% center; }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure keyframes & animation in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '-200% center' }
        }
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite'
      }
    }
  }
-->
<div class="font-extrabold text-[28px] tracking-tight bg-gradient-to-r from-[#5b5c68] via-white to-[#5b5c68] bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
  SHIMMER EFFECT
</div>`,
  prompt: `Generate a premium, modern "Text Gradient Shimmer Animation" styled with industry-leading obsidian-dark aesthetics. The text must display a high-contrast metallic shine that slides continuously from left to right using a background gradient shimmer transition.`
};
