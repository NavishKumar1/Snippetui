/**
 * Component: Fuzzy Distortion Analog Text
 * Category: text-animation
 */

export const component = {
  id: 'fuzzy-text',
  name: 'Fuzzy Analog Jitter',
  category: 'text-animation',
  tag: 'VHS',
  html: `<div class="fuzzy-text-wrapper" style="cursor: pointer;">
  <span class="fuzzy-text-content" data-text="FUZZY">FUZZY</span>
</div>`,
  js: `// Dynamic cursor shake intensity
const fuzzyWrap = document.querySelector('.fuzzy-text-wrapper');
if (fuzzyWrap) {
  const content = fuzzyWrap.querySelector('.fuzzy-text-content');
  fuzzyWrap.addEventListener('mousemove', (e) => {
    const rx = (Math.random() - 0.5) * 8;
    const ry = (Math.random() - 0.5) * 8;
    content.style.transform = \`translate(\${rx}px, \${ry}px)\`;
  });
  fuzzyWrap.addEventListener('mouseleave', () => {
    content.style.transform = 'translate(0, 0)';
  });
}`,
  ts: `// TypeScript Implementation
const fuzzyWrap = document.querySelector<HTMLDivElement>('.fuzzy-text-wrapper');
if (fuzzyWrap) {
  const content = fuzzyWrap.querySelector<HTMLSpanElement>('.fuzzy-text-content');
  if (content) {
    fuzzyWrap.addEventListener('mousemove', () => {
      const rx = (Math.random() - 0.5) * 8;
      const ry = (Math.random() - 0.5) * 8;
      content.style.transform = \`translate(\${rx}px, \${ry}px)\`;
    });
    fuzzyWrap.addEventListener('mouseleave', () => {
      content.style.transform = 'translate(0, 0)';
    });
  }
}`,
  css: `/* Fuzzy Analog Jitter Styles */
.fuzzy-text-wrapper {
  padding: 16px;
}

.fuzzy-text-content {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: 0.05em;
  position: relative;
  
  /* Constant analog fuzz vibrating shadows loop */
  animation: fuzzy-vibrate-loop 0.12s infinite linear alternate-reverse;
}

@keyframes fuzzy-vibrate-loop {
  0% {
    transform: translate(0.5px, 0.5px);
    text-shadow: 
      -1px -1px 0 rgba(255, 0, 127, 0.7),
      1px 1px 0 rgba(0, 242, 254, 0.7),
      0 0 8px rgba(255, 255, 255, 0.15);
    filter: blur(0.2px);
  }
  50% {
    transform: translate(-1px, 0.2px);
    text-shadow: 
      1px -1.5px 0 rgba(255, 0, 127, 0.8),
      -1px 1px 0 rgba(0, 242, 254, 0.8),
      0 0 12px rgba(255, 255, 255, 0.2);
    filter: blur(1.5px);
  }
  100% {
    transform: translate(0.3px, -0.5px);
    text-shadow: 
      -1.5px 1px 0 rgba(255, 0, 127, 0.7),
      1px -1px 0 rgba(0, 242, 254, 0.7),
      0 0 8px rgba(255, 255, 255, 0.15);
    filter: blur(0.5px);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="p-4 cursor-pointer">
  <span class="font-black text-[36px] uppercase tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.15)] animate-pulse">
    FUZZY
  </span>
</div>`,
  prompt: `Design a repeating "Fuzzy Analog Jitter" text animation. Text is styled in pristine white. Individual letters continuously vibrate with high-speed analog static twitch keyframes, casting retro neon-pink and cyan blurred ghost drop-shadows that mimic old VHS screens.`
};
