/**
 * Component: Retro Synthwave Grid Chrome
 * Category: text-animation
 */

export const component = {
  id: 'retro-synthwave-text',
  name: 'Retro Synthwave Chrome',
  category: 'text-animation',
  tag: 'Classic',
  html: `<div class="retro-synthwave-wrapper">
  <h1 class="retro-synthwave-text" data-text="SYNTHWAVE">SYNTHWAVE</h1>
</div>`,
  js: `// Interactive hover skew scaling
const synthText = document.querySelector('.retro-synthwave-text');
if (synthText) {
  synthText.addEventListener('mouseenter', () => {
    synthText.style.transform = 'skewX(-10deg) scale(1.05)';
  });
  synthText.addEventListener('mouseleave', () => {
    synthText.style.transform = 'skewX(-10deg) scale(1)';
  });
}`,
  ts: `// TypeScript Implementation
const synthText = document.querySelector<HTMLHeadingElement>('.retro-synthwave-text');
if (synthText) {
  synthText.addEventListener('mouseenter', () => {
    synthText.style.transform = 'skewX(-10deg) scale(1.05)';
  });
  synthText.addEventListener('mouseleave', () => {
    synthText.style.transform = 'skewX(-10deg) scale(1)';
  });
}`,
  css: `/* Retro Synthwave Chrome Styles */
.retro-synthwave-wrapper {
  perspective: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.retro-synthwave-text {
  font-family: 'Outfit', sans-serif;
  font-size: 38px;
  font-weight: 900;
  text-transform: uppercase;
  color: #ffffff;
  position: relative;
  letter-spacing: 0.08em;
  transform: skewX(-10deg);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  
  /* Reflective 80s Chrome effect using double gradients */
  background: linear-gradient(
    to bottom,
    #2c3e50 0%,
    #3498db 45%,
    #ffffff 50%,
    #f39c12 52%,
    #e74c3c 70%,
    #9b59b6 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Glowing magenta outline shadow */
  filter: drop-shadow(0 0 10px rgba(255, 0, 255, 0.6))
          drop-shadow(0 0 2px rgba(255, 0, 255, 0.9));
}

.retro-synthwave-text::before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  text-shadow: 
    -1px -1px 0 #ff007f,
    1px -1px 0 #ff007f,
    -1px 1px 0 #ff007f,
    1px 1px 0 #ff007f,
    0px 4px 10px rgba(0, 0, 0, 0.8);
  -webkit-text-fill-color: #0d0d15;
  transform: translate(3px, 3px);
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex items-center justify-center p-5 [perspective:500px]">
  <h1 class="font-black text-[38px] uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#2c3e50] via-[#3498db] via-white via-[#f39c12] to-[#9b59b6] [-webkit-text-stroke:1px_#ff007f] filter drop-shadow-[0_0_10px_rgba(255,0,255,0.6)] skew-x-[-10deg] transition-transform duration-300 hover:scale-105 cursor-pointer">
    SYNTHWAVE
  </h1>
</div>`,
  prompt: `Generate an 80s Retro Synthwave Chrome text animation. The font must be bold, italicized, and stylized with a split top-blue/bottom-orange chrome sunset gradient. A bright neon-pink border outline combined with a deep magenta glowing background shadow should frame the typography, screaming cyber grid nostalgia.`
};
