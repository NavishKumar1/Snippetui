/**
 * Component: Magnetic Liquid Gooey Hover
 * Category: text-animation
 */

export const component = {
  id: 'magnetic-liquid-text',
  name: 'Magnetic Liquid Gooey',
  category: 'text-animation',
  tag: 'Gooey',
  html: `<div class="magnetic-liquid-container">
  <svg style="display: none;">
    <defs>
      <filter id="liquid-gooey-filter">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
  <div class="magnetic-gooey-box">
    <span class="gooey-letter" style="--d: 1;">G</span>
    <span class="gooey-letter" style="--d: 2;">O</span>
    <span class="gooey-letter" style="--d: 3;">O</span>
    <span class="gooey-letter" style="--d: 4;">E</span>
    <span class="gooey-letter" style="--d: 5;">Y</span>
  </div>
</div>`,
  js: `// Add gooey magnetic drag effects on hover
const gooeyLetters = document.querySelectorAll('.gooey-letter');
gooeyLetters.forEach(letter => {
  letter.addEventListener('mousemove', (e) => {
    const rect = letter.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    letter.style.transform = \`translate(\${x * 0.4}px, \${y * 0.4}px) scale(1.15)\`;
  });
  letter.addEventListener('mouseleave', () => {
    letter.style.transform = 'translate(0, 0) scale(1)';
  });
});`,
  ts: `// TypeScript Implementation
const gooeyLetters = document.querySelectorAll<HTMLSpanElement>('.gooey-letter');
gooeyLetters.forEach(letter => {
  letter.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = letter.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    letter.style.transform = \`translate(\${x * 0.4}px, \${y * 0.4}px) scale(1.15)\`;
  });
  letter.addEventListener('mouseleave', () => {
    letter.style.transform = 'translate(0, 0) scale(1)';
  });
});`,
  css: `/* Magnetic Liquid Gooey Styles */
.magnetic-liquid-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(13, 13, 21, 0.4);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.magnetic-gooey-box {
  display: flex;
  gap: 12px;
  filter: url('#liquid-gooey-filter');
}

.gooey-letter {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 800;
  color: #00f2fe;
  background: #00f2fe;
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  animation: gooey-float 2.5s infinite alternate ease-in-out;
  animation-delay: calc(var(--d) * 0.15s);
  user-select: none;
}

@keyframes gooey-float {
  0% {
    transform: translateY(0);
    color: #00f2fe;
  }
  100% {
    transform: translateY(-8px);
    color: #8a2be2;
    text-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex items-center justify-center p-4 bg-[#0d0d15]/40 rounded-xl border border-white/5">
  <div class="flex gap-3" style="filter: url('#liquid-gooey-filter');">
    <span class="font-extrabold text-[34px] text-[#00f2fe] hover:scale-110 cursor-pointer transition-transform duration-200">G</span>
    <span class="font-extrabold text-[34px] text-[#00f2fe] hover:scale-110 cursor-pointer transition-transform duration-200">O</span>
    <span class="font-extrabold text-[34px] text-[#00f2fe] hover:scale-110 cursor-pointer transition-transform duration-200">O</span>
    <span class="font-extrabold text-[34px] text-[#00f2fe] hover:scale-110 cursor-pointer transition-transform duration-200">E</span>
    <span class="font-extrabold text-[34px] text-[#00f2fe] hover:scale-110 cursor-pointer transition-transform duration-200">Y</span>
  </div>
</div>`,
  prompt: `Create a "Magnetic Liquid Gooey Hover" text effect. The letters are styled with bold cyber cyan and amethyst purple colors. An SVG Gaussian Blur and Color Matrix filter merges adjacent letters like bubbling magnetic ferrofluid drop when hovered, with standard cubic-bezier drag animations.`
};
