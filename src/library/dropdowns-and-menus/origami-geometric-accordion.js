/**
 * Component: Origami Geometric Accordion
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'origami-geometric-accordion',
  name: 'Origami Geometric Accordion',
  category: 'dropdowns-and-menus',
  tag: 'Creative',
  html: `<div class="origami-accordion-wrapper">
  <div class="origami-container">
    <div class="origami-item">
      <!-- Unfold Trigger -->
      <button class="origami-trigger">
        <span>MISSION PARAMETERS</span>
        <span class="origami-chevron">▼</span>
      </button>
      
      <!-- Foldable segment blocks -->
      <div class="origami-paper-fold">
        <div class="fold-segment segment-top">
          <p>Initiating tactical orbital drop grid. Telemetry signals synchronized across satellite nodes.</p>
        </div>
        <div class="fold-segment segment-bottom">
          <p>Warning: Refraction fields high. Engage localized cloaking elements immediately.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Origami folding panel toggles with 3D transforms
const orWrapper = document.querySelector('.origami-accordion-wrapper');
if (orWrapper) {
  const trigger = orWrapper.querySelector('.origami-trigger');
  const container = orWrapper.querySelector('.origami-container');
  
  trigger.addEventListener('click', () => {
    container.classList.toggle('unfolded');
  });
}`,
  ts: `// TypeScript Implementation
const orWrapper = document.querySelector<HTMLDivElement>('.origami-accordion-wrapper');
if (orWrapper) {
  const trigger = orWrapper.querySelector<HTMLButtonElement>('.origami-trigger');
  const container = orWrapper.querySelector<HTMLDivElement>('.origami-container');
  
  if (trigger && container) {
    trigger.addEventListener('click', () => {
      container.classList.toggle('unfolded');
    });
  }
}`,
  css: `/* Origami Geometric Accordion Styles */
.origami-accordion-wrapper {
  position: relative;
  width: 290px;
  perspective: 1200px;
  font-family: 'Outfit', sans-serif;
  user-select: none;
  box-sizing: border-box;
  padding: 10px;
}

.origami-container {
  width: 100%;
}

.origami-item {
  position: relative;
  transform-style: preserve-3d;
}

.origami-trigger {
  width: 100%;
  padding: 16px 20px;
  background: #0d0f12;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  z-index: 50;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  transition: all 0.3s;
}

.origami-trigger:hover {
  background: #13171c;
  border-color: rgba(255,255,255,0.15);
}

.origami-chevron {
  font-size: 9px;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.origami-container.unfolded .origami-chevron {
  transform: rotate(180deg);
}

/* 3D Paper Fold Panel Elements */
.origami-paper-fold {
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  height: 0px;
  opacity: 0;
  transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s;
  pointer-events: none;
}

.origami-container.unfolded .origami-paper-fold {
  height: 160px;
  opacity: 1;
  pointer-events: auto;
}

.fold-segment {
  width: 100%;
  height: 80px;
  padding: 14px 20px;
  box-sizing: border-box;
  background: #11151a;
  border-left: 1.5px solid rgba(255, 255, 255, 0.05);
  border-right: 1.5px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s;
  backface-visibility: hidden;
}

.fold-segment p {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  margin: 0;
}

/* Top segment folding from the back */
.segment-top {
  position: absolute;
  top: 0;
  transform-origin: top center;
  transform: rotateX(-90deg);
  background: #151a21;
  box-shadow: inset 0 20px 30px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

/* Bottom segment folding outwards from top segment */
.segment-bottom {
  position: absolute;
  top: 80px;
  transform-origin: bottom center;
  transform: rotateX(90deg);
  background: #0f1318;
  box-shadow: inset 0 -20px 30px rgba(0, 0, 0, 0.5);
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.05);
}

/* Origami Active state adjustments */
.origami-container.unfolded .segment-top {
  transform: rotateX(0deg);
  background: #161c24;
}

.origami-container.unfolded .segment-bottom {
  transform: rotateX(0deg);
  background: #10151c;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[290px] font-sans p-2 select-none" style="perspective: 1200px;">
  <div class="relative">
    <button class="w-full px-5 py-4 bg-[#0d0f12] border border-white/5 text-white font-bold text-xs tracking-wider flex justify-between items-center shadow-lg hover:bg-[#13171c] transition-all">
      <span>MISSION PARAMETERS</span>
      <span class="text-[9px]">▼</span>
    </button>
  </div>
</div>`,
  prompt: `Design a premium "Origami Geometric Accordion" menu. Unfolding the component triggers a gorgeous 3D folding origami rotation on consecutive horizontal paper folds, rendering realistic polygonal lighting and shadows.`
};
