/**
 * Component: Infinite Cyber Spiral Tunnel
 * Category: text-animation
 */

export const component = {
  id: 'spiral-tunnel-text',
  name: 'Infinite Spiral Tunnel',
  category: 'text-animation',
  tag: '3D Warp',
  html: `<div class="spiral-tunnel-wrapper">
  <div class="spiral-ring" style="--r: 1; --delay: 0s;">SPIN</div>
  <div class="spiral-ring" style="--r: 2; --delay: -0.4s;">SPIN</div>
  <div class="spiral-ring" style="--r: 3; --delay: -0.8s;">SPIN</div>
  <div class="spiral-ring" style="--r: 4; --delay: -1.2s;">SPIN</div>
</div>`,
  js: `// Reverse spiral on hover
const spiralWrapper = document.querySelector('.spiral-tunnel-wrapper');
if (spiralWrapper) {
  spiralWrapper.addEventListener('mouseenter', () => {
    spiralWrapper.querySelectorAll('.spiral-ring').forEach(ring => {
      ring.style.animationDirection = 'reverse';
    });
  });
  spiralWrapper.addEventListener('mouseleave', () => {
    spiralWrapper.querySelectorAll('.spiral-ring').forEach(ring => {
      ring.style.animationDirection = 'normal';
    });
  });
}`,
  ts: `// TypeScript Implementation
const spiralWrapper = document.querySelector<HTMLDivElement>('.spiral-tunnel-wrapper');
if (spiralWrapper) {
  spiralWrapper.addEventListener('mouseenter', () => {
    spiralWrapper.querySelectorAll<HTMLDivElement>('.spiral-ring').forEach(ring => {
      ring.style.animationDirection = 'reverse';
    });
  });
  spiralWrapper.addEventListener('mouseleave', () => {
    spiralWrapper.querySelectorAll<HTMLDivElement>('.spiral-ring').forEach(ring => {
      ring.style.animationDirection = 'normal';
    });
  });
}`,
  css: `/* Infinite Cyber Spiral Tunnel CSS */
.spiral-tunnel-wrapper {
  position: relative;
  width: 200px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 600px;
  overflow: hidden;
}

.spiral-ring {
  position: absolute;
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 900;
  text-transform: uppercase;
  color: #00f2fe;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, #00f2fe 0%, #8a2be2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Infinite tunnel scaling coordinates */
  animation: spiral-tunnel-loop 2.4s infinite linear;
  animation-delay: var(--delay);
  transform: translate3d(0, 0, -400px) rotate(0deg);
  opacity: 0;
}

@keyframes spiral-tunnel-loop {
  0% {
    transform: translate3d(0, 0, -400px) rotate(0deg);
    opacity: 0.15;
    filter: blur(4px);
  }
  20% {
    opacity: 0.7;
    filter: blur(1px);
  }
  80% {
    opacity: 0.9;
    filter: blur(0px);
  }
  100% {
    transform: translate3d(0, 0, 200px) rotate(360deg);
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-48 h-28 flex items-center justify-center [perspective:600px] overflow-hidden">
  <span class="font-extrabold text-[34px] tracking-widest text-[#00f2fe] animate-ping">SPIN</span>
</div>`,
  prompt: `Design an "Infinite Cyber Spiral Tunnel" 3D text effect. Letters continuously rotate and scale down from deep focal perspective towards the screen, creating a high-speed hyperspace spiral warp tunnel, looping repeating infinitely.`
};
