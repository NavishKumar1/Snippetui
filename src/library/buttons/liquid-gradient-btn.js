/**
 * Component: Liquid Gradient Button
 * Category: buttons
 */

export const component = {
  id: 'liquid-gradient-btn',
  name: 'Liquid Gradient Button',
  category: 'buttons',
  tag: 'Interactive',
  html: `<button class="btn-liquid-gradient">Hover Over Me</button>`,
  js: `// Vanilla JavaScript Implementation
const btn = document.querySelector('.btn-liquid-gradient');
if (btn) {
  btn.addEventListener('click', () => {
    console.log('Liquid Button clicked!');
  });
}`,
  ts: `// TypeScript Implementation
const btn = document.querySelector<HTMLButtonElement>('.btn-liquid-gradient');
if (btn) {
  btn.addEventListener('click', (e: MouseEvent) => {
    console.log('Liquid Button clicked!', e);
  });
}`,
  css: `/* Pure CSS Styles */
.btn-liquid-gradient {
  position: relative;
  padding: 16px 36px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: #0d0d15;
  border: 2px solid transparent;
  border-radius: 30px;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  transition: color 0.3s ease;
  z-index: 1;
}

.btn-liquid-gradient::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, #00f2fe, #4facfe, #8a2be2, #00f2fe);
  background-size: 50% 50%;
  animation: liquid-rotate 4s linear infinite;
  z-index: -2;
}

.btn-liquid-gradient::after {
  content: '';
  position: absolute;
  inset: 2px;
  background: #0c0c14;
  border-radius: 28px;
  z-index: -1;
  transition: background 0.3s ease;
}

.btn-liquid-gradient:hover {
  color: #000000;
}

.btn-liquid-gradient:hover::after {
  background: transparent;
}

@keyframes liquid-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure liquid-rotate animation in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        'liquid-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'liquid-rotate': 'liquid-rotate 4s linear infinite'
      }
    }
  }
-->
<button class="group relative px-9 py-4 font-semibold text-sm text-white bg-[#0d0d15] rounded-full overflow-hidden border border-transparent hover:text-black transition-colors duration-300 z-10">
  <span class="absolute -inset-1/2 w-[200%] h-[200%] bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#8a2be2] bg-[length:50%_50%] animate-liquid-rotate -z-20"></span>
  <span class="absolute inset-[2px] bg-[#0c0c14] rounded-[28px] -z-10 group-hover:bg-transparent transition-colors duration-300"></span>
  Hover Over Me
</button>`,
  prompt: `Generate a premium "Liquid Gradient Button" styled with industry-leading obsidian-dark aesthetics. The button must feature a rotating linear gradient border behind a dark core panel, giving the illusion of floating liquid color. On mouse hover, the dark center panel must fade out smoothly, filling the entire button surface with the glowing gradient while shifting the text color.`
};
