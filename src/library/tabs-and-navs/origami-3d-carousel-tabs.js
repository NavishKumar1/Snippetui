/**
 * Component: Origami 3D Carousel Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'origami-3d-carousel-tabs',
  name: 'Origami 3D Carousel Tabs',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="origami-carousel-sandbox" id="origami-carousel-container">
  <div class="carousel-layout">
    <!-- Viewport for 3D rotation -->
    <div class="carousel-viewport">
      <div class="carousel-wheel" id="origami-carousel-wheel">
        <!-- Node 0 (DATA) -->
        <div class="origami-node active" data-index="0">
          <div class="origami-crease crease-left"></div>
          <div class="origami-crease crease-right"></div>
          <div class="origami-card-body">
            <span class="origami-num">01</span>
            <h3>DATAFLEX</h3>
            <p>PACKETS: SECURE</p>
          </div>
        </div>

        <!-- Node 1 (WAVE) -->
        <div class="origami-node" data-index="1">
          <div class="origami-crease crease-left"></div>
          <div class="origami-crease crease-right"></div>
          <div class="origami-card-body">
            <span class="origami-num">02</span>
            <h3>WAVESTRM</h3>
            <p>FREQ: 98.4 ghz</p>
          </div>
        </div>

        <!-- Node 2 (GATE) -->
        <div class="origami-node" data-index="2">
          <div class="origami-crease crease-left"></div>
          <div class="origami-crease crease-right"></div>
          <div class="origami-card-body">
            <span class="origami-num">03</span>
            <h3>GATEWAY</h3>
            <p>TUNNEL: ESTABLISHED</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="carousel-controls">
      <button class="carousel-nav-btn prev-btn" id="origami-prev-btn">◀</button>
      <div class="carousel-readout">SECTOR: <span id="origami-readout-label" style="color: #8b5cf6;">DATAFLEX</span></div>
      <button class="carousel-nav-btn next-btn" id="origami-next-btn">▶</button>
    </div>
  </div>
</div>`,
  js: `// Origami 3D Carousel Tabs rotation and folding paper animation logic
const container = document.getElementById('origami-carousel-container');
if (container) {
  const wheel = container.querySelector('#origami-carousel-wheel');
  const nodes = container.querySelectorAll('.origami-node');
  const prevBtn = container.querySelector('#origami-prev-btn');
  const nextBtn = container.querySelector('#origami-next-btn');
  const readout = container.querySelector('#origami-readout-label');

  let activeIndex = 0;
  const totalNodes = nodes.length;
  const readouts = ["DATAFLEX", "WAVESTRM", "GATEWAY"];
  const colors = ["#8b5cf6", "#00f2fe", "#ff007f"];

  function updateCarousel() {
    // Rotate wheel container
    const rotation = activeIndex * -120;
    wheel.style.transform = \`rotateY(\${rotation}deg)\`;

    // Manage folding state classes
    nodes.forEach((node, idx) => {
      node.classList.remove('active');
      if (idx === activeIndex) {
        node.classList.add('active');
      }
    });

    // Update digital dashboard values
    readout.textContent = readouts[activeIndex];
    readout.style.color = colors[activeIndex];
  }

  prevBtn.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + totalNodes) % totalNodes;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % totalNodes;
    updateCarousel();
  });

  // Direct node selection click
  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      activeIndex = idx;
      updateCarousel();
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('origami-carousel-container') as HTMLDivElement | null;
if (container) {
  const wheel = container.querySelector('#origami-carousel-wheel') as HTMLDivElement;
  const nodes = container.querySelectorAll('.origami-node');
  const prevBtn = container.querySelector('#origami-prev-btn') as HTMLButtonElement;
  const nextBtn = container.querySelector('#origami-next-btn') as HTMLButtonElement;
  const readout = container.querySelector('#origami-readout-label') as HTMLSpanElement;

  let activeIndex = 0;
  const totalNodes = nodes.length;
  const readouts = ["DATAFLEX", "WAVESTRM", "GATEWAY"];
  const colors = ["#8b5cf6", "#00f2fe", "#ff007f"];

  function updateCarousel() {
    const rotation = activeIndex * -120;
    if (wheel) wheel.style.transform = \`rotateY(\${rotation}deg)\`;

    nodes.forEach((node, idx) => {
      (node as HTMLElement).classList.remove('active');
      if (idx === activeIndex) {
        (node as HTMLElement).classList.add('active');
      }
    });

    if (readout) {
      readout.textContent = readouts[activeIndex];
      readout.style.color = colors[activeIndex];
    }
  }

  prevBtn.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + totalNodes) % totalNodes;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % totalNodes;
    updateCarousel();
  });

  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      activeIndex = idx;
      updateCarousel();
    });
  });
}`,
  css: `/* Origami 3D Carousel Tabs styles */
.origami-carousel-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #07050f 0%, #020104 100%);
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.carousel-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  perspective: 1000px;
}

.carousel-viewport {
  width: 200px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
}

.carousel-wheel {
  position: relative;
  width: 120px;
  height: 100px;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
  transform: rotateY(0deg);
}

.origami-node {
  position: absolute;
  inset: 0;
  background: rgba(14, 10, 25, 0.85);
  border: 1.5px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s ease, opacity 0.5s ease;
}

/* 3D Circular Positions (translateZ = 85px to space them out around the center wheel) */
.origami-node[data-index="0"] { transform: rotateY(0deg) translateZ(85px); border-color: rgba(139, 92, 246, 0.35); }
.origami-node[data-index="1"] { transform: rotateY(120deg) translateZ(85px); border-color: rgba(0, 242, 254, 0.25); }
.origami-node[data-index="2"] { transform: rotateY(240deg) translateZ(85px); border-color: rgba(255, 0, 127, 0.25); }

/* Origami Creased Paper wings (only visible when folding/unfolding) */
.origami-crease {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background: rgba(255, 255, 255, 0.02);
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  pointer-events: none;
}
.crease-left {
  left: 0;
  border-radius: 12px 0 0 12px;
  border-right: 1px dashed rgba(255, 255, 255, 0.05);
  transform-origin: left center;
}
.crease-right {
  right: 0;
  border-radius: 0 12px 12px 0;
  border-left: 1px dashed rgba(255, 255, 255, 0.05);
  transform-origin: right center;
}

.origami-card-body {
  padding: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  transform: translateZ(12px);
  transition: transform 0.6s ease;
}

.origami-num {
  font-family: 'Fira Code', monospace;
  font-size: 8px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.2);
}

.origami-card-body h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.5px;
}

.origami-card-body p {
  font-family: 'Fira Code', monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

/* Crease fold animation on active state (Unfolds open flat) */
.origami-node.active .crease-left { transform: rotateY(0deg); }
.origami-node.active .crease-right { transform: rotateY(0deg); }

/* Inactive folding state */
.origami-node:not(.active) {
  opacity: 0.45;
}
.origami-node:not(.active) .crease-left { transform: rotateY(-35deg); }
.origami-node:not(.active) .crease-right { transform: rotateY(35deg); }
.origami-node:not(.active) .origami-card-body { transform: translateZ(2px); }

/* Controls layout */
.carousel-controls {
  display: flex;
  align-items: center;
  background: rgba(18, 12, 36, 0.85);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 10px;
  padding: 4px 10px;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.carousel-nav-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 4px 8px;
}

.carousel-nav-btn:hover {
  color: #ffffff;
}

.carousel-readout {
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
  width: 90px;
  text-align: center;
}

#origami-readout-label {
  font-weight: 800;
  transition: color 0.4s ease;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#07050f] to-[#020104] border border-violet-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="origami-carousel-container">
  <div class="flex flex-col items-center gap-5 [perspective:1000px] carousel-layout">
    
    <!-- Viewport for 3D rotation -->
    <div class="w-[200px] h-[120px] flex items-center justify-center [transform-style:preserve-3d] carousel-viewport">
      <div class="relative w-30 h-[100px] [transform-style:preserve-3d] transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] carousel-wheel" id="origami-carousel-wheel" style="transform: rotateY(0deg);">
        
        <!-- Node 0 (DATA) -->
        <div class="absolute inset-0 bg-[#0e0a19]/85 border border-violet-500/35 rounded-xl cursor-pointer shadow-2xl [transform-style:preserve-3d] [backface-visibility:hidden] transition-all duration-[800ms] ease-out [&:not(.active)]:opacity-45 active origami-node" data-index="0" style="transform: rotateY(0deg) translateZ(85px);">
          <div class="absolute top-0 bottom-0 left-0 w-1/2 bg-white/[0.02] border-r border-dashed border-white/5 origin-left rounded-l-xl transition-transform duration-[600ms] ease-out [&:not(.active)]:rotate-y-[-35deg] crease-left"></div>
          <div class="absolute top-0 bottom-0 right-0 w-1/2 bg-white/[0.02] border-l border-dashed border-white/5 origin-right rounded-r-xl transition-transform duration-[600ms] ease-out [&:not(.active)]:rotate-y-[35deg] crease-right"></div>
          <div class="p-3 h-full flex flex-col justify-between box-border [transform:translateZ(12px)] [&:not(.active)]:[transform:translateZ(2px)] transition-transform duration-[600ms] origami-card-body">
            <span class="font-mono text-[8px] font-black text-white/20 origami-num">01</span>
            <h3 class="font-sans text-[13px] font-extrabold text-white tracking-wide m-0">DATAFLEX</h3>
            <p class="font-mono text-[7.5px] text-white/40 m-0">PACKETS: SECURE</p>
          </div>
        </div>

        <!-- Node 1 (WAVE) -->
        <div class="absolute inset-0 bg-[#0e0a19]/85 border border-[#00f2fe]/25 rounded-xl cursor-pointer shadow-2xl [transform-style:preserve-3d] [backface-visibility:hidden] transition-all duration-[800ms] ease-out [&:not(.active)]:opacity-45 origami-node" data-index="1" style="transform: rotateY(120deg) translateZ(85px);">
          <div class="absolute top-0 bottom-0 left-0 w-1/2 bg-white/[0.02] border-r border-dashed border-white/5 origin-left rounded-l-xl transition-transform duration-[600ms] ease-out [&:not(.active)]:rotate-y-[-35deg] crease-left"></div>
          <div class="absolute top-0 bottom-0 right-0 w-1/2 bg-white/[0.02] border-l border-dashed border-white/5 origin-right rounded-r-xl transition-transform duration-[600ms] ease-out [&:not(.active)]:rotate-y-[35deg] crease-right"></div>
          <div class="p-3 h-full flex flex-col justify-between box-border [transform:translateZ(12px)] [&:not(.active)]:[transform:translateZ(2px)] transition-transform duration-[600ms] origami-card-body">
            <span class="font-mono text-[8px] font-black text-white/20 origami-num">02</span>
            <h3 class="font-sans text-[13px] font-extrabold text-white tracking-wide m-0">WAVESTRM</h3>
            <p class="font-mono text-[7.5px] text-white/40 m-0">FREQ: 98.4 ghz</p>
          </div>
        </div>

        <!-- Node 2 (GATE) -->
        <div class="absolute inset-0 bg-[#0e0a19]/85 border border-[#ff007f]/25 rounded-xl cursor-pointer shadow-2xl [transform-style:preserve-3d] [backface-visibility:hidden] transition-all duration-[800ms] ease-out [&:not(.active)]:opacity-45 origami-node" data-index="2" style="transform: rotateY(240deg) translateZ(85px);">
          <div class="absolute top-0 bottom-0 left-0 w-1/2 bg-white/[0.02] border-r border-dashed border-white/5 origin-left rounded-l-xl transition-transform duration-[600ms] ease-out [&:not(.active)]:rotate-y-[-35deg] crease-left"></div>
          <div class="absolute top-0 bottom-0 right-0 w-1/2 bg-white/[0.02] border-l border-dashed border-white/5 origin-right rounded-r-xl transition-transform duration-[600ms] ease-out [&:not(.active)]:rotate-y-[35deg] crease-right"></div>
          <div class="p-3 h-full flex flex-col justify-between box-border [transform:translateZ(12px)] [&:not(.active)]:[transform:translateZ(2px)] transition-transform duration-[600ms] origami-card-body">
            <span class="font-mono text-[8px] font-black text-white/20 origami-num">03</span>
            <h3 class="font-sans text-[13px] font-extrabold text-white tracking-wide m-0">GATEWAY</h3>
            <p class="font-mono text-[7.5px] text-white/40 m-0">TUNNEL: ESTABLISHED</p>
          </div>
        </div>

      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center bg-[#120c24]/85 border border-violet-500/20 rounded-xl px-2.5 py-1 gap-3 shadow-2xl">
      <button class="bg-transparent border-none text-white/40 hover:text-white text-[10px] cursor-pointer transition py-1 px-2" id="origami-prev-btn">◀</button>
      <div class="font-mono text-[9px] text-white/30 tracking-wide w-[90px] text-center">SECTOR: <span id="origami-readout-label" class="text-violet-400 font-extrabold transition-colors duration-400">DATAFLEX</span></div>
      <button class="bg-transparent border-none text-white/40 hover:text-white text-[10px] cursor-pointer transition py-1 px-2" id="origami-next-btn">▶</button>
    </div>
  </div>
</div>`,
  prompt: 'Design a highly creative horizontal 3D origami wheel carousel rotating cards navigation component.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
component.html = component.html.replace('class="origami-node active"', 'class="origami-node active"');
