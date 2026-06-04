/**
 * Component: Liquid Fluid Bubble / Ripple
 * Category: text-animation
 */

export const component = {
  id: 'liquid-bubble-text',
  name: 'Liquid Fluid Bubble',
  category: 'text-animation',
  tag: 'Ripple',
  html: `<div class="liquid-bubble-container" style="cursor: pointer;">
  <span class="liquid-bubble-text" data-text="BUBBLE">BUBBLE</span>
  <div class="bubble-ripples">
    <div class="ripple-ring" style="--d: 0s;"></div>
    <div class="ripple-ring" style="--d: 1.2s;"></div>
  </div>
</div>`,
  js: `// Speed up ripples on hover
const bubbleContainer = document.querySelector('.liquid-bubble-container');
if (bubbleContainer) {
  bubbleContainer.addEventListener('mouseenter', () => {
    bubbleContainer.querySelectorAll('.ripple-ring').forEach(ring => {
      ring.style.animationDuration = '1.2s';
    });
  });
  bubbleContainer.addEventListener('mouseleave', () => {
    bubbleContainer.querySelectorAll('.ripple-ring').forEach(ring => {
      ring.style.animationDuration = '2.4s';
    });
  });
}`,
  ts: `// TypeScript Implementation
const bubbleContainer = document.querySelector<HTMLDivElement>('.liquid-bubble-container');
if (bubbleContainer) {
  bubbleContainer.addEventListener('mouseenter', () => {
    bubbleContainer.querySelectorAll<HTMLDivElement>('.ripple-ring').forEach(ring => {
      ring.style.animationDuration = '1.2s';
    });
  });
  bubbleContainer.addEventListener('mouseleave', () => {
    bubbleContainer.querySelectorAll<HTMLDivElement>('.ripple-ring').forEach(ring => {
      ring.style.animationDuration = '2.4s';
    });
  });
}`,
  css: `/* Liquid Fluid Bubble CSS Styles */
.liquid-bubble-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.liquid-bubble-text {
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #00f2fe;
  background: linear-gradient(180deg, #ffffff 30%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 2px 10px rgba(0, 242, 254, 0.45));
  position: relative;
  z-index: 5;
  animation: bubble-float-loop 2s infinite alternate ease-in-out;
}

.bubble-ripples {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
}

/* Expanding ripple rings */
.ripple-ring {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 242, 254, 0.35);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.15), inset 0 0 10px rgba(0, 242, 254, 0.1);
  
  /* Infinite water ripple loops */
  animation: bubble-ripple-loop 2.4s infinite linear;
  animation-delay: var(--d);
}

@keyframes bubble-float-loop {
  0% { transform: translateY(0); }
  100% { transform: translateY(-6px); }
}

@keyframes bubble-ripple-loop {
  0% {
    width: 20px;
    height: 10px;
    opacity: 1;
    transform: scale(0.9);
  }
  100% {
    width: 200px;
    height: 90px;
    opacity: 0;
    transform: scale(1.1);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex items-center justify-center p-6 cursor-pointer">
  <span class="font-extrabold text-[34px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-[#00f2fe] filter drop-shadow-[0_2px_10px_rgba(0,242,254,0.45)]">
    BUBBLE
  </span>
</div>`,
  prompt: `Design a premium "Liquid Fluid Bubble" text animation. Bold periwinkle letters float gently inside the container while concentric, glowing blue circular ripple rings continuously expand outwards from behind the baseline, looping infinitely.`
};
