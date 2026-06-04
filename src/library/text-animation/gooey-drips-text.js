/**
 * Component: Liquid Gooey Dripping Paint
 * Category: text-animation
 */

export const component = {
  id: 'gooey-drips-text',
  name: 'Liquid Gooey Drips',
  category: 'text-animation',
  tag: 'Gooey',
  html: `<div class="gooey-drips-container" style="cursor: pointer;">
  <span class="gooey-drips-text" data-text="DRIP">DRIP</span>
  <div class="drips-droplets">
    <div class="drop-line" style="--l: 15%; --h: 12px; --delay: 0s;"></div>
    <div class="drop-line" style="--l: 45%; --h: 16px; --delay: 1.5s;"></div>
    <div class="drop-line" style="--l: 75%; --h: 10px; --delay: 0.8s;"></div>
  </div>
</div>`,
  js: `// Speed up dripping on hover
const dripsContainer = document.querySelector('.gooey-drips-container');
if (dripsContainer) {
  dripsContainer.addEventListener('mouseenter', () => {
    dripsContainer.querySelectorAll('.drop-line').forEach(drip => {
      drip.style.animationDuration = '1.2s';
    });
  });
  dripsContainer.addEventListener('mouseleave', () => {
    dripsContainer.querySelectorAll('.drop-line').forEach(drip => {
      drip.style.animationDuration = '3s';
    });
  });
}`,
  ts: `// TypeScript Implementation
const dripsContainer = document.querySelector<HTMLDivElement>('.gooey-drips-container');
if (dripsContainer) {
  dripsContainer.addEventListener('mouseenter', () => {
    dripsContainer.querySelectorAll<HTMLDivElement>('.drop-line').forEach(drip => {
      drip.style.animationDuration = '1.2s';
    });
  });
  dripsContainer.addEventListener('mouseleave', () => {
    dripsContainer.querySelectorAll<HTMLDivElement>('.drop-line').forEach(drip => {
      drip.style.animationDuration = '3s';
    });
  });
}`,
  css: `/* Liquid Gooey Dripping Paint Styles */
.gooey-drips-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.gooey-drips-text {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: linear-gradient(180deg, #00f2fe 0%, #8a2be2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 2px 10px rgba(0, 242, 254, 0.4));
  position: relative;
  z-index: 5;
}

.drips-droplets {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 60%;
  pointer-events: none;
  z-index: 10;
}

/* Dropping lines */
.drop-line {
  position: absolute;
  left: var(--l);
  width: 4px;
  background: linear-gradient(to bottom, #8a2be2 0%, #ff007f 100%);
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(255, 0, 127, 0.6);
  
  /* Repeating fluid drip loop */
  animation: paint-drip-down 3s infinite linear;
  animation-delay: var(--delay);
}

@keyframes paint-drip-down {
  0% {
    height: 0px;
    top: 0px;
    opacity: 0.8;
  }
  40% {
    height: var(--h);
    top: 0px;
    opacity: 1;
  }
  75% {
    height: 8px;
    top: 25px;
    opacity: 0.9;
  }
  100% {
    height: 0px;
    top: 35px;
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex items-center justify-center p-6 cursor-pointer">
  <span class="font-extrabold text-[36px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-b from-[#00f2fe] to-[#8a2be2] filter drop-shadow-[0_2px_10px_rgba(0,242,254,0.4)]">
    DRIP
  </span>
</div>`,
  prompt: `Design a premium "Liquid Gooey Dripping Paint" text effect. The typography is bold with HSL-curated cyan and royal purple gradients. Glowing paint droplets slowly stretch and drip down off the bottom margin of the letters, pool falling in an infinite loop.`
};
