/**
 * Component: Curved Wave Loop
 * Category: text-animation
 */

export const component = {
  id: 'curved-loop',
  name: 'Curved Wave Loop',
  category: 'text-animation',
  tag: 'Wave',
  html: `<div class="curved-loop-wrapper" style="cursor: pointer;">
  <span class="wave-char" style="--d: 1;">W</span>
  <span class="wave-char" style="--d: 2;">A</span>
  <span class="wave-char" style="--d: 3;">V</span>
  <span class="wave-char" style="--d: 4;">E</span>
</div>`,
  js: `// Pause wave on hover
const waveWrapper = document.querySelector('.curved-loop-wrapper');
if (waveWrapper) {
  waveWrapper.addEventListener('mouseenter', () => {
    waveWrapper.querySelectorAll('.wave-char').forEach(char => {
      char.style.animationPlayState = 'paused';
    });
  });
  waveWrapper.addEventListener('mouseleave', () => {
    waveWrapper.querySelectorAll('.wave-char').forEach(char => {
      char.style.animationPlayState = 'running';
    });
  });
}`,
  ts: `// TypeScript Implementation
const waveWrapper = document.querySelector<HTMLDivElement>('.curved-loop-wrapper');
if (waveWrapper) {
  waveWrapper.addEventListener('mouseenter', () => {
    waveWrapper.querySelectorAll<HTMLSpanElement>('.wave-char').forEach(char => {
      char.style.animationPlayState = 'paused';
    });
  });
  waveWrapper.addEventListener('mouseleave', () => {
    waveWrapper.querySelectorAll<HTMLSpanElement>('.wave-char').forEach(char => {
      char.style.animationPlayState = 'running';
    });
  });
}`,
  css: `/* Curved Wave Loop Styles */
.curved-loop-wrapper {
  display: flex;
  gap: 8px;
}

.wave-char {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 850;
  color: #00f2fe;
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 242, 254, 0.35));
  
  /* Floating wave physics delay loop */
  animation: curved-wave-loop 1.8s infinite alternate ease-in-out;
  animation-delay: calc(var(--d) * 0.12s);
}

@keyframes curved-wave-loop {
  0% {
    transform: translateY(12px) rotate(-6deg) scale(0.9);
    filter: brightness(0.85);
  }
  100% {
    transform: translateY(-12px) rotate(6deg) scale(1.1);
    filter: brightness(1.15) drop-shadow(0 4px 15px rgba(0, 242, 254, 0.5));
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex gap-2 cursor-pointer">
  <span class="font-extrabold text-[32px] text-[#00f2fe] animate-pulse">W</span>
  <span class="font-extrabold text-[32px] text-[#00f2fe] animate-pulse [animation-delay:120ms]">A</span>
  <span class="font-extrabold text-[32px] text-[#00f2fe] animate-pulse [animation-delay:240ms]">V</span>
  <span class="font-extrabold text-[32px] text-[#00f2fe] animate-pulse [animation-delay:360ms]">E</span>
</div>`,
  prompt: `Design a repeating "Curved Wave Loop" text animation. Individual letters continuously glide up and down along an invisible curved sine-wave path, swaying back and forth with rotating kinetic transitions in terminal cyan.`
};
