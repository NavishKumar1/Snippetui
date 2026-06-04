/**
 * Component: Mirror Refraction Split
 * Category: text-animation
 */

export const component = {
  id: 'mirror-split-text',
  name: 'Mirror Refraction Split',
  category: 'text-animation',
  tag: 'Glassmorphism',
  html: `<div class="mirror-split-container" style="cursor: pointer;">
  <span class="mirror-top" data-text="REFRACT">REFRACT</span>
  <span class="mirror-bottom" data-text="REFRACT">REFRACT</span>
</div>`,
  js: `// Shift mirror plane on mousemove
const mirrorWrap = document.querySelector('.mirror-split-container');
if (mirrorWrap) {
  mirrorWrap.addEventListener('mousemove', (e) => {
    const rect = mirrorWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    
    const top = mirrorWrap.querySelector('.mirror-top');
    const bottom = mirrorWrap.querySelector('.mirror-bottom');
    if (top && bottom) {
      top.style.transform = \`translateX(\${x}px)\`;
      bottom.style.transform = \`translateX(\${-x}px) scaleY(0.95)\`;
    }
  });
  
  mirrorWrap.addEventListener('mouseleave', () => {
    const top = mirrorWrap.querySelector('.mirror-top');
    const bottom = mirrorWrap.querySelector('.mirror-bottom');
    if (top && bottom) {
      top.style.transform = 'none';
      bottom.style.transform = 'none';
    }
  });
}`,
  ts: `// TypeScript Implementation
const mirrorWrap = document.querySelector<HTMLDivElement>('.mirror-split-container');
if (mirrorWrap) {
  mirrorWrap.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = mirrorWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    
    const top = mirrorWrap.querySelector<HTMLSpanElement>('.mirror-top');
    const bottom = mirrorWrap.querySelector<HTMLSpanElement>('.mirror-bottom');
    if (top && bottom) {
      top.style.transform = \`translateX(\${x}px)\`;
      bottom.style.transform = \`translateX(\${-x}px) scaleY(0.95)\`;
    }
  });
  
  mirrorWrap.addEventListener('mouseleave', () => {
    const top = mirrorWrap.querySelector<HTMLSpanElement>('.mirror-top');
    const bottom = mirrorWrap.querySelector<HTMLSpanElement>('.mirror-bottom');
    if (top && bottom) {
      top.style.transform = 'none';
      bottom.style.transform = 'none';
    }
  });
}`,
  css: `/* Mirror Refraction Split CSS */
.mirror-split-container {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  align-items: center;
}

.mirror-top,
.mirror-bottom {
  display: block;
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffffff;
  overflow: hidden;
  height: 25px; /* Half height of characters */
  position: relative;
  transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  user-select: none;
}

.mirror-top {
  line-height: 50px; /* Offset to center top half */
  transform-origin: bottom center;
  background: linear-gradient(180deg, #ffffff 40%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Constant subtle wave reflection */
  animation: mirror-float-t 2.8s infinite alternate ease-in-out;
}

.mirror-bottom {
  line-height: 0px; /* Offset to center bottom half */
  transform-origin: top center;
  opacity: 0.65;
  background: linear-gradient(180deg, #00f2fe 0%, #8a2be2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: blur(0.5px) drop-shadow(0 0 10px rgba(0, 242, 254, 0.4));
  
  /* Constant matching inverted wave reflection */
  animation: mirror-float-b 2.8s infinite alternate ease-in-out;
}

@keyframes mirror-float-t {
  0% { transform: translateY(0) skewX(0deg); }
  100% { transform: translateY(-1.5px) skewX(1deg); }
}

@keyframes mirror-float-b {
  0% { transform: translateY(0) skewX(0deg) scaleY(0.95); }
  100% { transform: translateY(1.5px) skewX(-1deg) scaleY(0.92); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="inline-flex flex-col items-center cursor-pointer">
  <span class="font-black text-[36px] uppercase tracking-widest text-[#00f2fe] h-[25px] [line-height:50px] overflow-hidden animate-pulse">
    REFRACT
  </span>
</div>`,
  prompt: `Design a premium "Mirror Refraction Split" text animation. The word splits horizontally down the exact baseline center, showing a refracted mirror glass offset that floats and shears continuously on alternate loops, reacting to mouse gestures.`
};
