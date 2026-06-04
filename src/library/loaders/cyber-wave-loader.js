/**
 * Component: Cyber Wave Loader
 * Category: loaders
 */

export const component = {
  id: 'cyber-wave-loader',
  name: 'Cyber Wave Loader',
  category: 'loaders',
  tag: 'Animated',
  html: `<div class="cyber-wave-loader">
  <div class="cyber-wave-bar"></div>
  <div class="cyber-wave-bar"></div>
  <div class="cyber-wave-bar"></div>
  <div class="cyber-wave-bar"></div>
  <div class="cyber-wave-bar"></div>
</div>`,
  js: `// Vanilla JavaScript Implementation
// Dynamic speed change function
const loaderBars = document.querySelectorAll('.cyber-wave-bar');
loaderBars.forEach((bar, index) => {
  // Can adjust animation speeds programmatically
  // bar.style.animationDuration = '0.8s';
});`,
  ts: `// TypeScript Implementation
// Dynamic speed change function
const loaderBars = document.querySelectorAll<HTMLDivElement>('.cyber-wave-bar');
loaderBars.forEach((bar: HTMLDivElement, index: number) => {
  // bar.style.animationDuration = '0.8s';
});`,
  css: `/* Pure CSS Styles */
.cyber-wave-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 60px;
}

.cyber-wave-bar {
  width: 4px;
  height: 8px;
  background: linear-gradient(180deg, #00f2fe 0%, #8a2be2 100%);
  border-radius: 4px;
  animation: cyber-wave-anim 1.2s ease-in-out infinite;
}

.cyber-wave-bar:nth-child(1) { animation-delay: 0.1s; }
.cyber-wave-bar:nth-child(2) { animation-delay: 0.2s; }
.cyber-wave-bar:nth-child(3) { animation-delay: 0.3s; }
.cyber-wave-bar:nth-child(4) { animation-delay: 0.4s; }
.cyber-wave-bar:nth-child(5) { animation-delay: 0.5s; }

@keyframes cyber-wave-anim {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(4); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure cyber-wave animation in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        'cyber-wave': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(4)' }
        }
      },
      animation: {
        'cyber-wave': 'cyber-wave 1.2s ease-in-out infinite'
      }
    }
  }
-->
<div class="flex items-center justify-center gap-1.5 h-[60px]">
  <div class="w-1 h-2 bg-gradient-to-b from-[#00f2fe] to-[#8a2be2] rounded-full animate-cyber-wave [animation-delay:0.1s]"></div>
  <div class="w-1 h-2 bg-gradient-to-b from-[#00f2fe] to-[#8a2be2] rounded-full animate-cyber-wave [animation-delay:0.2s]"></div>
  <div class="w-1 h-2 bg-gradient-to-b from-[#00f2fe] to-[#8a2be2] rounded-full animate-cyber-wave [animation-delay:0.3s]"></div>
  <div class="w-1 h-2 bg-gradient-to-b from-[#00f2fe] to-[#8a2be2] rounded-full animate-cyber-wave [animation-delay:0.4s]"></div>
  <div class="w-1 h-2 bg-gradient-to-b from-[#00f2fe] to-[#8a2be2] rounded-full animate-cyber-wave [animation-delay:0.5s]"></div>
</div>`,
  prompt: `Generate a premium "Cyber Wave Pulsing Loader" styled with industry-leading obsidian-dark aesthetics. The loader must contain 5 vertical neon-gradient bars that pulse in a staggered wave-like rhythm using scaled transform transitions and distinct animation delay offsets.`
};
