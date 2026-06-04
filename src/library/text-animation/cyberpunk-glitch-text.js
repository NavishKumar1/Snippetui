/**
 * Component: RGB Glitch Displacement
 * Category: text-animation
 */

export const component = {
  id: 'cyberpunk-glitch-text',
  name: 'RGB Glitch Displacement',
  category: 'text-animation',
  tag: 'Animated',
  html: `<div class="cyberpunk-glitch-text-effect" data-text="CYBERPUNK">CYBERPUNK</div>`,
  js: `// Vanilla JavaScript Implementation
const textElement = document.querySelector('.cyberpunk-glitch-text-effect');
if (textElement) {
  // Play sound or shake elements on click interaction
  textElement.addEventListener('click', () => {
    textElement.classList.add('hyper-glitch');
    setTimeout(() => {
      textElement.classList.remove('hyper-glitch');
    }, 500);
  });
}`,
  ts: `// TypeScript Implementation
const textElement = document.querySelector<HTMLDivElement>('.cyberpunk-glitch-text-effect');
if (textElement) {
  textElement.addEventListener('click', () => {
    textElement.classList.add('hyper-glitch');
    setTimeout(() => {
      textElement.classList.remove('hyper-glitch');
    }, 500);
  });
}`,
  css: `/* Pure CSS Styles */
.cyberpunk-glitch-text-effect {
  position: relative;
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-shadow: 
    0.05em 0 0 rgba(255, 0, 80, 0.75), 
    -0.025em -0.05em 0 rgba(0, 242, 254, 0.75), 
    0.025em 0.05em 0 rgba(138, 43, 226, 0.75);
  animation: cyberpunk-glitch 1s infinite alternate;
  cursor: pointer;
}

.cyberpunk-glitch-text-effect::before,
.cyberpunk-glitch-text-effect::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}

.cyberpunk-glitch-text-effect::before {
  left: 3px;
  text-shadow: -2px 0 #ff0050;
  clip-path: inset(10px 0 85px 0);
  animation: cyberpunk-glitch-slice-1 2s infinite linear alternate-reverse;
}

.cyberpunk-glitch-text-effect::after {
  left: -3px;
  text-shadow: -2px 0 #00f2fe;
  clip-path: inset(80px 0 10px 0);
  animation: cyberpunk-glitch-slice-2 2s infinite linear alternate-reverse;
}

@keyframes cyberpunk-glitch {
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 80, 0.75), -0.025em -0.05em 0 rgba(0, 242, 254, 0.75), 0.025em 0.05em 0 rgba(138, 43, 226, 0.75);
  }
  50% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 80, 0.75), 0.025em 0.025em 0 rgba(0, 242, 254, 0.75), -0.05em -0.05em 0 rgba(138, 43, 226, 0.75);
  }
  100% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 80, 0.75), 0.05em 0 0 rgba(0, 242, 254, 0.75), 0 -0.05em 0 rgba(138, 43, 226, 0.75);
  }
}

@keyframes cyberpunk-glitch-slice-1 {
  0% { clip-path: inset(20px 0 70px 0); }
  20% { clip-path: inset(40px 0 50px 0); }
  40% { clip-path: inset(10px 0 80px 0); }
  60% { clip-path: inset(80px 0 10px 0); }
  80% { clip-path: inset(50px 0 40px 0); }
  100% { clip-path: inset(30px 0 60px 0); }
}

@keyframes cyberpunk-glitch-slice-2 {
  0% { clip-path: inset(70px 0 20px 0); }
  20% { clip-path: inset(50px 0 40px 0); }
  40% { clip-path: inset(80px 0 10px 0); }
  60% { clip-path: inset(10px 0 80px 0); }
  80% { clip-path: inset(40px 0 50px 0); }
  100% { clip-path: inset(60px 0 30px 0); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure keyframes & animations in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        'cyber-glitch': {
          '0%': { textShadow: '0.05em 0 0 rgba(255,0,80,0.75), -0.025em -0.05em 0 rgba(0,242,254,0.75)' },
          '50%': { textShadow: '-0.05em -0.025em 0 rgba(255,0,80,0.75), 0.025em 0.025em 0 rgba(0,242,254,0.75)' },
          '100%': { textShadow: '0.025em 0.05em 0 rgba(255,0,80,0.75), 0.05em 0 0 rgba(0,242,254,0.75)' }
        },
        'slice-1': {
          '0%, 100%': { clipPath: 'inset(20px 0 70px 0)' },
          '40%': { clipPath: 'inset(10px 0 80px 0)' },
          '80%': { clipPath: 'inset(50px 0 40px 0)' }
        },
        'slice-2': {
          '0%, 100%': { clipPath: 'inset(70px 0 20px 0)' },
          '40%': { clipPath: 'inset(80px 0 10px 0)' },
          '80%': { clipPath: 'inset(40px 0 50px 0)' }
        }
      },
      animation: {
        'cyber-glitch': 'cyber-glitch 1s infinite alternate',
        'slice-1': 'slice-1 2s infinite linear alternate-reverse',
        'slice-2': 'slice-2 2s infinite linear alternate-reverse'
      }
    }
  }
-->
<div class="relative font-heading text-[32px] font-extrabold text-white tracking-widest uppercase cursor-pointer animate-cyber-glitch
  before:content-['CYBERPUNK'] before:absolute before:inset-0 before:left-[3px] before:text-shadow-red before:animate-slice-1
  after:content-['CYBERPUNK'] after:absolute after:inset-0 after:left-[-3px] after:text-shadow-blue after:animate-slice-2">
  CYBERPUNK
</div>`,
  prompt: `Design a high-fidelity cyberpunk RGB glitch text animation. The text must display dynamic displacement effects utilizing chromatic aberration (red, cyan, and violet). Set up absolute pseudo-elements that slice dynamically across horizontal clipping coordinates using random steps.`
};
