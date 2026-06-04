/**
 * Component: Retro Synthwave Grid Button
 * Category: buttons
 */

export const component = {
  id: 'retro-synthwave-btn',
  name: 'Retro Synthwave Grid',
  category: 'buttons',
  tag: 'Aesthetic',
  html: `<button class="retro-synthwave-btn">
  <div class="retro-grid-container">
    <div class="retro-grid-lines"></div>
  </div>
  <div class="retro-scanlines"></div>
  <span class="retro-btn-text" data-text="NEON DRIVER">NEON DRIVER</span>
</button>`,
  js: `// Interactive Synthwave Grid Speedup on Hover
const synthBtn = document.querySelector('.retro-synthwave-btn');
if (synthBtn) {
  const gridLines = synthBtn.querySelector('.retro-grid-lines');
  
  synthBtn.addEventListener('mouseenter', () => {
    if (gridLines) {
      gridLines.style.animationPlayState = 'running';
      gridLines.style.animationDuration = '0.5s';
    }
  });

  synthBtn.addEventListener('mouseleave', () => {
    if (gridLines) {
      gridLines.style.animationDuration = '1.5s';
    }
  });
}`,
  ts: `// TypeScript Implementation
const synthBtn = document.querySelector<HTMLButtonElement>('.retro-synthwave-btn');
if (synthBtn) {
  const gridLines = synthBtn.querySelector<HTMLDivElement>('.retro-grid-lines');
  
  synthBtn.addEventListener('mouseenter', () => {
    if (gridLines) {
      gridLines.style.animationPlayState = 'running';
      gridLines.style.animationDuration = '0.5s';
    }
  });

  synthBtn.addEventListener('mouseleave', () => {
    if (gridLines) {
      gridLines.style.animationDuration = '1.5s';
    }
  });
}`,
  css: `/* Retro Synthwave Grid Button Styles */
.retro-synthwave-btn {
  position: relative;
  background: #0d0115;
  border: 2px solid #ff007f;
  padding: 16px 36px;
  border-radius: 8px;
  color: #00ffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.2em;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 0 10px #ff007f,
    inset 0 0 10px rgba(255, 0, 127, 0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.retro-grid-container {
  position: absolute;
  inset: 0;
  perspective: 100px;
  overflow: hidden;
  z-index: 1;
  opacity: 0.6;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.retro-grid-lines {
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  width: 200%;
  height: 200%;
  background-image: 
    linear-gradient(to right, rgba(255, 0, 127, 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 0, 127, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  transform: rotateX(75deg);
  transform-origin: center center;
  animation: retro-grid-scroll 1.5s infinite linear;
}

.retro-scanlines {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  ), linear-gradient(
    90deg, 
    rgba(255, 0, 0, 0.06), 
    rgba(0, 255, 0, 0.02), 
    rgba(0, 0, 255, 0.06)
  );
  background-size: 100% 4px, 6px 100%;
  z-index: 2;
  pointer-events: none;
}

.retro-btn-text {
  position: relative;
  z-index: 3;
  color: #00ffff;
  text-shadow: 
    0 0 5px #00ffff,
    0 0 10px #00ffff,
    0 0 20px #00ffff;
  transition: all 0.3s ease;
}

/* Hover effects */
.retro-synthwave-btn:hover {
  border-color: #00ffff;
  box-shadow: 
    0 0 25px #00ffff,
    inset 0 0 15px rgba(0, 255, 255, 0.5);
  transform: translateY(-2px);
}

.retro-synthwave-btn:hover .retro-grid-container {
  opacity: 1;
}

.retro-synthwave-btn:hover .retro-grid-lines {
  background-image: 
    linear-gradient(to right, rgba(0, 255, 255, 0.4) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 255, 255, 0.4) 1px, transparent 1px);
}

.retro-synthwave-btn:hover .retro-btn-text {
  color: #ffffff;
  text-shadow: 
    0 0 5px #ffffff,
    0 0 10px #ff007f,
    0 0 20px #ff007f;
}

.retro-synthwave-btn:active {
  transform: translateY(1px);
}

@keyframes retro-grid-scroll {
  from {
    transform: rotateX(75deg) translateY(0);
  }
  to {
    transform: rotateX(75deg) translateY(20px);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#0d0115] border-2 border-[#ff007f] px-9 py-4 rounded-lg text-[#00ffff] font-extrabold text-sm tracking-[0.2em] cursor-pointer overflow-hidden shadow-[0_0_10px_#ff007f] hover:border-[#00ffff] hover:shadow-[0_0_25px_#00ffff] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <div class="absolute inset-0 perspective-[100px] overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
    <div class="absolute inset-[-50%] w-[200%] h-[200%] bg-[linear-gradient(to_right,rgba(255,0,127,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,127,0.3)_1px,transparent_1px)] bg-[size:20px_20px] [transform:rotateX(75deg)] animate-[retro-grid-scroll_1.5s_infinite_linear]"></div>
  </div>
  <span class="relative z-10 [text-shadow:0_0_5px_#00ffff,0_0_10px_#00ffff] hover:[text-shadow:0_0_5px_#white,0_0_10px_#ff007f]">NEON DRIVER</span>
</button>`,
  prompt: `Design a premium "Retro Synthwave Grid Button" component. Set in a deep cybernetic indigo, the button features a hot pink border glowing intensely. In the background, a virtual horizontal synthwave grid stretches in perspective, scrolling downwards. The glowing cyan font reflects high-fidelity neon tube styling, flashing white/pink upon cursor hover.`
};
