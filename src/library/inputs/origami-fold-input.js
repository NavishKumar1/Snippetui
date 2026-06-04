/**
 * Component: Origami 3D Fold Input
 * Category: inputs
 */

export const component = {
  id: 'origami-fold-input',
  name: 'Origami 3D Fold Input',
  category: 'inputs',
  tag: 'Aesthetic',
  html: `<div class="origami-inp-wrapper">
  <div class="origami-input-box">
    <div class="origami-inp-facets">
      <span class="origami-inp-facet oi-facet-top"></span>
      <span class="origami-inp-facet oi-facet-bottom"></span>
    </div>
    <input type="text" class="origami-fold-input-field" placeholder=" " id="origami-input-demo" autocomplete="off">
    <label class="origami-fold-input-label" for="origami-input-demo">PROFILER</label>
  </div>
</div>`,
  js: `// Interactive Origami 3D fold tilt tracking on Focus
const origamiInp = document.querySelector('.origami-fold-input-field');
if (origamiInp) {
  const box = origamiInp.parentElement;
  
  origamiInp.addEventListener('focus', () => {
    box.classList.add('is-folded-open');
  });

  origamiInp.addEventListener('blur', () => {
    box.classList.remove('is-folded-open');
  });
}`,
  ts: `// TypeScript Implementation
const origamiInp = document.querySelector<HTMLInputElement>('.origami-fold-input-field');
if (origamiInp) {
  const box = origamiInp.parentElement;
  if (box) {
    origamiInp.addEventListener('focus', () => {
      box.classList.add('is-folded-open');
    });

    origamiInp.addEventListener('blur', () => {
      box.classList.remove('is-folded-open');
    });
  }
}`,
  css: `/* Origami 3D Fold Input Styles */
.origami-inp-wrapper {
  perspective: 400px;
  display: inline-block;
  padding: 10px;
}

.origami-input-box {
  position: relative;
  width: 260px;
  background: transparent;
  z-index: 10;
}

/* 3D structural facets */
.origami-inp-facets {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}

.origami-inp-facet {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(135deg, #0f1224 0%, #060810 100%);
  border: 1px solid rgba(79, 172, 254, 0.25);
  box-shadow: inset 0 0 15px rgba(79, 172, 254, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.oi-facet-top {
  top: 0;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  transform-origin: top;
}

.oi-facet-bottom {
  bottom: 0;
  border-top: none;
  border-radius: 0 0 6px 6px;
  transform-origin: bottom;
}

.origami-fold-input-field {
  width: 100%;
  padding: 16px 18px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  z-index: 2;
  position: relative;
}

.origami-fold-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #4facfe;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.15em;
  pointer-events: none;
  z-index: 3;
  text-shadow: 0 0 8px rgba(79, 172, 254, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Folding states */
.is-folded-open .oi-facet-top {
  transform: rotateX(20deg);
  background: linear-gradient(135deg, #181d3a 0%, #0a0d1b 100%);
  border-color: rgba(79, 172, 254, 0.5);
  box-shadow: inset 0 0 20px rgba(79, 172, 254, 0.15);
}

.is-folded-open .oi-facet-bottom {
  transform: rotateX(-20deg);
  background: linear-gradient(135deg, #101428 0%, #04060b 100%);
  border-color: rgba(79, 172, 254, 0.5);
  box-shadow: inset 0 0 20px rgba(79, 172, 254, 0.15);
}

.origami-fold-input-field:focus + .origami-fold-input-label,
.origami-fold-input-field:not(:placeholder-shown) + .origami-fold-input-label {
  transform: translateY(-170%) scale(0.85);
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #4facfe;
  background-color: #0d0d14;
  padding: 0 6px;
  z-index: 10;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="perspective-[400px] inline-block p-2.5">
  <div class="relative w-[260px] bg-transparent cursor-pointer overflow-visible text-[#4facfe] font-bold text-xs tracking-[0.15em] [text-shadow:0_0_8px_rgba(79,172,254,0.3)] hover:text-white transition-all duration-300">
    <input type="text" placeholder=" " id="origami-input-demo" autocomplete="off"
      class="peer w-full px-[18px] py-4 bg-transparent text-white outline-none relative z-10" />
    <label for="origami-input-demo"
      class="absolute left-[18px] top-1/2 -translate-y-1/2 text-sm text-[#4facfe] font-bold tracking-widest pointer-events-none transition-all duration-300 peer-focus:-translate-y-[170%] peer-focus:scale-85 peer-focus:text-white peer-focus:bg-[#0d0d14] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-translate-y-[170%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:bg-[#0d0d14] peer-[:not(:placeholder-shown)]:px-1.5 z-20">
      PROFILER
    </label>
  </div>
</div>`,
  prompt: `Design a premium "Origami 3D Fold Input" component. Faceted geometric dark-navy layout folds open in 3D perspective space when focused.`
};
