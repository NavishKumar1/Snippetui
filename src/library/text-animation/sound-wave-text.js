/**
 * Component: Acoustic Sound Wave Pulse
 * Category: text-animation
 */

export const component = {
  id: 'sound-wave-text',
  name: 'Acoustic Sound Wave',
  category: 'text-animation',
  tag: 'Audio Wave',
  html: `<div class="sound-wave-container" style="cursor: pointer;">
  <span class="wave-pillar" style="--d: 1;">A</span>
  <span class="wave-pillar" style="--d: 2;">U</span>
  <span class="wave-pillar" style="--d: 3;">D</span>
  <span class="wave-pillar" style="--d: 4;">I</span>
  <span class="wave-pillar" style="--d: 5;">O</span>
</div>`,
  js: `// Dynamically increase height scale multiplier on hover
const soundContainer = document.querySelector('.sound-wave-container');
if (soundContainer) {
  soundContainer.addEventListener('mouseenter', () => {
    soundContainer.querySelectorAll('.wave-pillar').forEach(pillar => {
      pillar.style.animationDuration = '0.4s';
    });
  });
  soundContainer.addEventListener('mouseleave', () => {
    soundContainer.querySelectorAll('.wave-pillar').forEach(pillar => {
      pillar.style.animationDuration = '0.9s';
    });
  });
}`,
  ts: `// TypeScript Implementation
const soundContainer = document.querySelector<HTMLDivElement>('.sound-wave-container');
if (soundContainer) {
  soundContainer.addEventListener('mouseenter', () => {
    soundContainer.querySelectorAll<HTMLSpanElement>('.wave-pillar').forEach(pillar => {
      pillar.style.animationDuration = '0.4s';
    });
  });
  soundContainer.addEventListener('mouseleave', () => {
    soundContainer.querySelectorAll<HTMLSpanElement>('.wave-pillar').forEach(pillar => {
      pillar.style.animationDuration = '0.9s';
    });
  });
}`,
  css: `/* Acoustic Sound Wave CSS */
.sound-wave-container {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 80px;
}

.wave-pillar {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 850;
  color: #00f2fe;
  background: linear-gradient(180deg, #ff007f 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 10px rgba(0, 242, 254, 0.4));
  
  /* Staggered dynamic vertical audio pulse wave loops */
  animation: audio-pulse-loop 0.9s infinite alternate ease-in-out;
  animation-delay: calc(var(--d) * 0.15s);
  transform-origin: center center;
}

@keyframes audio-pulse-loop {
  0% {
    transform: scaleY(0.4) scaleX(0.95);
    filter: brightness(0.7) blur(0.5px);
  }
  100% {
    transform: scaleY(1.5) scaleX(1.05);
    filter: brightness(1.2) drop-shadow(0 0 15px rgba(255, 0, 127, 0.6));
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex gap-2 h-20 items-center justify-center cursor-pointer">
  <span class="font-extrabold text-[32px] text-[#00f2fe] animate-pulse">A</span>
  <span class="font-extrabold text-[32px] text-[#00f2fe] animate-pulse [animation-delay:150ms]">U</span>
  <span class="font-extrabold text-[32px] text-[#00f2fe] animate-pulse [animation-delay:300ms]">D</span>
  <span class="font-extrabold text-[32px] text-[#00f2fe] animate-pulse [animation-delay:450ms]">I</span>
  <span class="font-extrabold text-[32px] text-[#00f2fe] animate-pulse [animation-delay:600ms]">O</span>
</div>`,
  prompt: `Design a high-fidelity "Acoustic Sound Wave" text animation. Letters dynamically scale and stretch vertically in real-time on staggered infinite loops, simulating reacting to high-amplitude musical equalizer frequencies in hot-pink and cyan.`
};
