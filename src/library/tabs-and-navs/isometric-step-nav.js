/**
 * Component: Isometric Step Nav
 * Category: tabs-and-navs
 */

export const component = {
  id: 'isometric-step-nav',
  name: 'Isometric Step Nav',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="iso-nav-sandbox" id="iso-step-container">
  <div class="iso-grid">
    <div class="iso-step active" data-index="0">
      <div class="step-face top">HOME</div>
      <div class="step-face left"></div>
      <div class="step-face right"></div>
    </div>
    
    <div class="iso-step" data-index="1">
      <div class="step-face top">WORK</div>
      <div class="step-face left"></div>
      <div class="step-face right"></div>
    </div>
    
    <div class="iso-step" data-index="2">
      <div class="step-face top">LABS</div>
      <div class="step-face left"></div>
      <div class="step-face right"></div>
    </div>
  </div>
</div>`,
  js: `// Isometric step clicks
const container = document.getElementById('iso-step-container');
if (container) {
  const steps = container.querySelectorAll('.iso-step');

  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('iso-step-container') as HTMLDivElement | null;
if (container) {
  const steps = container.querySelectorAll('.iso-step');

  steps.forEach(step => {
    const stepEl = step as HTMLDivElement;
    stepEl.addEventListener('click', () => {
      steps.forEach(s => (s as HTMLElement).classList.remove('active'));
      stepEl.classList.add('active');
    });
  });
}`,
  css: `/* Isometric Step Nav styles */
.iso-nav-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #0e1216 0%, #030405 100%);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.iso-grid {
  display: flex;
  gap: 24px;
  transform: rotateX(55deg) rotateZ(-45deg);
  transform-style: preserve-3d;
}

.iso-step {
  position: relative;
  width: 70px;
  height: 70px;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: translateZ(25px); /* Lifted by default */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.iso-step.active {
  transform: translateZ(0px); /* Depressed on active */
}

.step-face {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  box-sizing: border-box;
}

.step-face.top {
  background: #19222b;
  border: 1.5px solid rgba(0, 242, 254, 0.3);
  color: rgba(0, 242, 254, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  box-shadow: inset 0 0 10px rgba(0, 242, 254, 0.1);
  transition: all 0.3s;
}

.iso-step.active .step-face.top {
  background: #00f2fe;
  color: #030405;
  border-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.5);
  font-weight: 900;
}

.step-face.left {
  background: #11171d;
  transform-origin: left center;
  transform: rotateY(-90deg);
  border-right: 1.5px solid rgba(0, 242, 254, 0.15);
}

.step-face.right {
  background: #0d1217;
  transform-origin: bottom center;
  transform: rotateX(-90deg);
  border-top: 1.5px solid rgba(0, 242, 254, 0.15);
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#0e1216] to-[#030405] border border-cyan-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="iso-step-container">
  <div class="flex gap-6 rotate-x-[55deg] -rotate-z-[45deg] [transform-style:preserve-3d]">
    <div class="iso-step active relative w-[70px] h-[70px] [transform-style:preserve-3d] cursor-pointer translate-z-[25px] transition-transform duration-400 [&.active]:translate-z-0 active-iso-step" data-index="0">
      <div class="step-face top absolute inset-0 [transform-style:preserve-3d] bg-[#19222b] border-1.5 border-cyan-400/30 text-cyan-400/70 flex items-center justify-center font-sans text-[11px] font-extrabold tracking-wide active-step-face">HOME</div>
      <div class="step-face left absolute inset-0 [transform-style:preserve-3d] bg-[#11171d] origin-left -rotate-y-90 border-r border-cyan-400/15"></div>
      <div class="step-face right absolute inset-0 [transform-style:preserve-3d] bg-[#0d1217] origin-bottom -rotate-x-90 border-t border-cyan-400/15"></div>
    </div>
    
    <div class="iso-step relative w-[70px] h-[70px] [transform-style:preserve-3d] cursor-pointer translate-z-[25px] transition-transform duration-400 [&.active]:translate-z-0" data-index="1">
      <div class="step-face top absolute inset-0 [transform-style:preserve-3d] bg-[#19222b] border-1.5 border-cyan-400/30 text-cyan-400/70 flex items-center justify-center font-sans text-[11px] font-extrabold tracking-wide">WORK</div>
      <div class="step-face left absolute inset-0 [transform-style:preserve-3d] bg-[#11171d] origin-left -rotate-y-90 border-r border-cyan-400/15"></div>
      <div class="step-face right absolute inset-0 [transform-style:preserve-3d] bg-[#0d1217] origin-bottom -rotate-x-90 border-t border-cyan-400/15"></div>
    </div>
    
    <div class="iso-step relative w-[70px] h-[70px] [transform-style:preserve-3d] cursor-pointer translate-z-[25px] transition-transform duration-400 [&.active]:translate-z-0" data-index="2">
      <div class="step-face top absolute inset-0 [transform-style:preserve-3d] bg-[#19222b] border-1.5 border-cyan-400/30 text-cyan-400/70 flex items-center justify-center font-sans text-[11px] font-extrabold tracking-wide">LABS</div>
      <div class="step-face left absolute inset-0 [transform-style:preserve-3d] bg-[#11171d] origin-left -rotate-y-90 border-r border-cyan-400/15"></div>
      <div class="step-face right absolute inset-0 [transform-style:preserve-3d] bg-[#0d1217] origin-bottom -rotate-x-90 border-t border-cyan-400/15"></div>
    </div>
  </div>
</div>`,
  prompt: 'Design an interactive 3D isometric step staircase navigation with physically depressing buttons and glowing active pads.'
};
component.tailwind = component.tailwind.replace('class="step-face top absolute inset-0 [transform-style:preserve-3d] bg-[#19222b] border-1.5 border-cyan-400/30 text-cyan-400/70 flex items-center justify-center font-sans text-[11px] font-extrabold tracking-wide active-step-face"', 'class="step-face top absolute inset-0 [transform-style:preserve-3d] bg-[#19222b] border-1.5 border-cyan-400/30 text-cyan-400/70 flex items-center justify-center font-sans text-[11px] font-extrabold tracking-wide"');
