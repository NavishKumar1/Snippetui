/**
 * Component: Retro Future Laser Wave
 * Category: text-animation
 */

export const component = {
  id: 'retro-laser-text',
  name: 'Retro Laser Wave',
  category: 'text-animation',
  tag: 'Classic',
  html: `<div class="retro-laser-container" style="cursor: pointer;">
  <span class="retro-laser-text" data-text="LASER WAVE">LASER WAVE</span>
  <div class="retro-laser-line"></div>
</div>`,
  js: `// Speed up scan on hover
const laserContainer = document.querySelector('.retro-laser-container');
if (laserContainer) {
  const line = laserContainer.querySelector('.retro-laser-line');
  laserContainer.addEventListener('mouseenter', () => {
    line.style.animationDuration = '0.9s';
  });
  laserContainer.addEventListener('mouseleave', () => {
    line.style.animationDuration = '1.8s';
  });
}`,
  ts: `// TypeScript Implementation
const laserContainer = document.querySelector<HTMLDivElement>('.retro-laser-container');
if (laserContainer) {
  const line = laserContainer.querySelector<HTMLDivElement>('.retro-laser-line');
  if (line) {
    laserContainer.addEventListener('mouseenter', () => {
      line.style.animationDuration = '0.9s';
    });
    laserContainer.addEventListener('mouseleave', () => {
      line.style.animationDuration = '1.8s';
    });
  }
}`,
  css: `/* Retro Future Laser Wave Styles */
.retro-laser-container {
  position: relative;
  display: inline-flex;
  padding: 24px;
}

.retro-laser-text {
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.1);
  
  /* Reflective retro metallic sunset gradient */
  background: linear-gradient(
    180deg,
    #ff007f 0%,
    #ffcc00 48%,
    #ffffff 50%,
    #00f2fe 52%,
    #8a2be2 100%
  );
  background-size: 100% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Metallic specular gleam shadow */
  filter: drop-shadow(0 2px 8px rgba(0, 242, 254, 0.45));
  animation: retro-laser-gleam 3.5s infinite alternate ease-in-out;
}

.retro-laser-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #00f2fe;
  box-shadow: 0 0 10px #00f2fe, 0 0 20px #ff007f;
  pointer-events: none;
  z-index: 10;
  
  /* Repeating horizontal scan grid wave loop */
  animation: retro-laser-sweep 1.8s infinite alternate ease-in-out;
}

@keyframes retro-laser-gleam {
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
}

@keyframes retro-laser-sweep {
  0% {
    top: 25%;
    opacity: 0.6;
    transform: scaleX(0.9);
  }
  100% {
    top: 75%;
    opacity: 1;
    transform: scaleX(1.05);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex p-6 cursor-pointer">
  <span class="font-extrabold text-[34px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-b from-[#ff007f] via-[#ffcc00] via-white via-[#00f2fe] to-[#8a2be2] filter drop-shadow-[0_2px_8px_rgba(0,242,254,0.45)]">
    LASER WAVE
  </span>
</div>`,
  prompt: `Design a premium "Retro Future Laser Wave" text effect. Chrome bold sunset text is actively scanned by a bright horizontal cyan-magenta laser beam line sweeping vertically up and down in infinite cycles.`
};
