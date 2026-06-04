/**
 * Component: Magnetic Sine Wave Float
 * Category: text-animation
 */

export const component = {
  id: 'kinetic-float-text',
  name: 'Magnetic Sine Wave Float',
  category: 'text-animation',
  tag: 'Animated',
  html: `<div class="kinetic-float-text-effect">
  <span>F</span><span>L</span><span>O</span><span>A</span><span>T</span><span>I</span><span>N</span><span>G</span>
</div>`,
  js: `// Vanilla JavaScript Implementation
const letters = document.querySelectorAll('.kinetic-float-text-effect span');
letters.forEach((letter, index) => {
  // Setup organic mouse interaction
  letter.addEventListener('mouseover', () => {
    letter.style.transform = 'translateY(-20px) scale(1.2)';
    letter.style.color = '#00f2fe';
  });
  letter.addEventListener('mouseout', () => {
    letter.style.transform = '';
    letter.style.color = '';
  });
});`,
  ts: `// TypeScript Implementation
const letters = document.querySelectorAll<HTMLSpanElement>('.kinetic-float-text-effect span');
letters.forEach((letter, index) => {
  letter.addEventListener('mouseover', () => {
    letter.style.transform = 'translateY(-20px) scale(1.2)';
    letter.style.color = '#00f2fe';
  });
  letter.addEventListener('mouseout', () => {
    letter.style.transform = '';
    letter.style.color = '';
  });
});`,
  css: `/* Pure CSS Styles */
.kinetic-float-text-effect {
  display: flex;
  gap: 4px;
  cursor: default;
}

.kinetic-float-text-effect span {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease;
  animation: letter-float-loop 2s ease-in-out infinite alternate;
}

/* Sequential Delayed float keyframes waves */
.kinetic-float-text-effect span:nth-child(1) { animation-delay: 0s; }
.kinetic-float-text-effect span:nth-child(2) { animation-delay: 0.15s; }
.kinetic-float-text-effect span:nth-child(3) { animation-delay: 0.3s; }
.kinetic-float-text-effect span:nth-child(4) { animation-delay: 0.45s; }
.kinetic-float-text-effect span:nth-child(5) { animation-delay: 0.6s; }
.kinetic-float-text-effect span:nth-child(6) { animation-delay: 0.75s; }
.kinetic-float-text-effect span:nth-child(7) { animation-delay: 0.9s; }
.kinetic-float-text-effect span:nth-child(8) { animation-delay: 1.05s; }

@keyframes letter-float-loop {
  0% {
    transform: translateY(0);
    text-shadow: none;
  }
  100% {
    transform: translateY(-14px);
    color: #4facfe;
    text-shadow: 0 10px 20px rgba(79, 172, 254, 0.35);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure keyframes & animations in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        'letter-float': {
          '0%': { transform: 'translateY(0)', textShadow: 'none' },
          '100%': { transform: 'translateY(-14px)', color: '#4facfe', textShadow: '0 10px 20px rgba(79,172,254,0.35)' }
        }
      },
      animation: {
        'letter-float': 'letter-float 2s ease-in-out infinite alternate'
      }
    }
  }
-->
<div class="flex gap-1 cursor-default">
  <span class="inline-block font-heading text-[28px] font-extrabold text-white transition-all duration-300 hover:translate-y-[-20px] hover:scale-120 hover:text-[#00f2fe] animate-letter-float">F</span>
  <span class="inline-block font-heading text-[28px] font-extrabold text-white transition-all duration-300 hover:translate-y-[-20px] hover:scale-120 hover:text-[#00f2fe] animate-letter-float [animation-delay:0.15s]">L</span>
  <span class="inline-block font-heading text-[28px] font-extrabold text-white transition-all duration-300 hover:translate-y-[-20px] hover:scale-120 hover:text-[#00f2fe] animate-letter-float [animation-delay:0.3s]">O</span>
  <span class="inline-block font-heading text-[28px] font-extrabold text-white transition-all duration-300 hover:translate-y-[-20px] hover:scale-120 hover:text-[#00f2fe] animate-letter-float [animation-delay:0.45s]">A</span>
  <span class="inline-block font-heading text-[28px] font-extrabold text-white transition-all duration-300 hover:translate-y-[-20px] hover:scale-120 hover:text-[#00f2fe] animate-letter-float [animation-delay:0.6s]">T</span>
  <span class="inline-block font-heading text-[28px] font-extrabold text-white transition-all duration-300 hover:translate-y-[-20px] hover:scale-120 hover:text-[#00f2fe] animate-letter-float [animation-delay:0.75s]">I</span>
  <span class="inline-block font-heading text-[28px] font-extrabold text-white transition-all duration-300 hover:translate-y-[-20px] hover:scale-120 hover:text-[#00f2fe] animate-letter-float [animation-delay:0.9s]">N</span>
  <span class="inline-block font-heading text-[28px] font-extrabold text-white transition-all duration-300 hover:translate-y-[-20px] hover:scale-120 hover:text-[#00f2fe] animate-letter-float [animation-delay:1.05s]">G</span>
</div>`,
  prompt: `Design a floating, highly interactive kinetic typography layout. Individual letter blocks inside a flex layout must float up and down sequentially according to distinct offsets, rendering a smooth sine wave cycle with soft blue shadows.`
};
