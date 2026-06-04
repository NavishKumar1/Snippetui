/**
 * Component: RGB Chromatic Aberration Wave
 * Category: text-animation
 */

export const component = {
  id: 'rgb-chromatic-text',
  name: 'RGB Chromatic Aberration',
  category: 'text-animation',
  tag: 'Warp',
  html: `<div class="rgb-chromatic-container" data-text="CHROMATIC">
  <span class="rgb-layer rgb-red">CHROMATIC</span>
  <span class="rgb-layer rgb-green">CHROMATIC</span>
  <span class="rgb-layer rgb-blue">CHROMATIC</span>
</div>`,
  js: `// Scoped mousemove tilt coordinate shifting
const rgbContainer = document.querySelector('.rgb-chromatic-container');
if (rgbContainer) {
  rgbContainer.addEventListener('mousemove', (e) => {
    const rect = rgbContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    
    const rLayer = rgbContainer.querySelector('.rgb-red');
    const gLayer = rgbContainer.querySelector('.rgb-green');
    const bLayer = rgbContainer.querySelector('.rgb-blue');
    
    if (rLayer && gLayer && bLayer) {
      rLayer.style.transform = \`translate(\${x}px, \${y}px)\`;
      gLayer.style.transform = \`translate(\${-x}px, \${-y}px)\`;
      bLayer.style.transform = \`translate(\${x * 0.5}px, \${-y * 0.5}px)\`;
    }
  });
  
  rgbContainer.addEventListener('mouseleave', () => {
    const layers = rgbContainer.querySelectorAll('.rgb-layer');
    layers.forEach(layer => layer.style.transform = 'translate(0, 0)');
  });
}`,
  ts: `// TypeScript Implementation
const rgbContainer = document.querySelector<HTMLDivElement>('.rgb-chromatic-container');
if (rgbContainer) {
  rgbContainer.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = rgbContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    
    const rLayer = rgbContainer.querySelector<HTMLSpanElement>('.rgb-red');
    const gLayer = rgbContainer.querySelector<HTMLSpanElement>('.rgb-green');
    const bLayer = rgbContainer.querySelector<HTMLSpanElement>('.rgb-blue');
    
    if (rLayer && gLayer && bLayer) {
      rLayer.style.transform = \`translate(\${x}px, \${y}px)\`;
      gLayer.style.transform = \`translate(\${-x}px, \${-y}px)\`;
      bLayer.style.transform = \`translate(\${x * 0.5}px, \${-y * 0.5}px)\`;
    }
  });
  
  rgbContainer.addEventListener('mouseleave', () => {
    const layers = rgbContainer.querySelectorAll<HTMLSpanElement>('.rgb-layer');
    layers.forEach(layer => layer.style.transform = 'translate(0, 0)');
  });
}`,
  css: `/* RGB Chromatic Aberration Styles */
.rgb-chromatic-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: pointer;
}

.rgb-layer {
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ffffff;
  mix-blend-mode: screen;
  transition: transform 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
  user-select: none;
}

/* Three separate color offsets */
.rgb-red {
  color: #ff0055;
  position: relative;
  animation: rgb-wave-r 3s infinite alternate ease-in-out;
}

.rgb-green {
  color: #00ff66;
  position: absolute;
  animation: rgb-wave-g 3s infinite alternate ease-in-out;
}

.rgb-blue {
  color: #0066ff;
  position: absolute;
  animation: rgb-wave-b 3s infinite alternate ease-in-out;
}

@keyframes rgb-wave-r {
  0% { transform: translate(1px, 1px); }
  100% { transform: translate(-1.5px, -1px); }
}

@keyframes rgb-wave-g {
  0% { transform: translate(-1px, -1.5px); }
  100% { transform: translate(1px, 1px); }
}

@keyframes rgb-wave-b {
  0% { transform: translate(-0.5px, 1px); }
  100% { transform: translate(1.5px, -1.5px); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative flex items-center justify-center p-6 cursor-pointer">
  <span class="font-extrabold text-[32px] tracking-widest uppercase text-[#ff0055] mix-blend-screen animate-pulse">CHROMATIC</span>
</div>`,
  prompt: `Design a premium "RGB Chromatic Aberration Wave" text animation. Three stacked versions of clean sans-serif text are rendered in Red, Green, and Blue overlays. By utilizing 'mix-blend-mode: screen' and offset translations, the colors slide apart dynamically, creating a chromatic lens glitch wave.`
};
