/**
 * Component: Isometric Pyramid Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'isometric-pyramid-tabs',
  name: 'Isometric Pyramid Tabs',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="pyramid-sandbox" id="pyramid-tabs-container">
  <div class="pyramid-scene">
    <!-- Level 3 (Base) -->
    <div class="pyramid-level level-3" data-level="3" data-height="-20px" data-color="#ff007f">
      <div class="pyramid-face face-top">
        <span class="level-tag">BASE_03</span>
      </div>
      <div class="pyramid-face face-left"></div>
      <div class="pyramid-face face-right"></div>
    </div>

    <!-- Level 2 (Middle) -->
    <div class="pyramid-level level-2" data-level="2" data-height="0px" data-color="#00f2fe">
      <div class="pyramid-face face-top">
        <span class="level-tag">MID_02</span>
      </div>
      <div class="pyramid-face face-left"></div>
      <div class="pyramid-face face-right"></div>
    </div>

    <!-- Level 1 (Top / Apex) -->
    <div class="pyramid-level level-1 active" data-level="1" data-height="20px" data-color="#00ff66">
      <div class="pyramid-face face-top">
        <span class="level-tag">APEX_01</span>
      </div>
      <div class="pyramid-face face-left"></div>
      <div class="pyramid-face face-right"></div>
    </div>
  </div>

  <div class="pyramid-status">
    ELEVATION: <span id="pyramid-height-label" style="color: #00ff66;">+40m</span>
  </div>
</div>`,
  js: `// Isometric Pyramid Tabs depression mechanics
const container = document.getElementById('pyramid-tabs-container');
if (container) {
  const levels = container.querySelectorAll('.pyramid-level');
  const heightLabel = container.querySelector('#pyramid-height-label');

  levels.forEach(level => {
    level.addEventListener('click', () => {
      levels.forEach(l => l.classList.remove('active'));
      level.classList.add('active');

      const color = level.getAttribute('data-color');
      const levelNum = level.getAttribute('data-level');

      // Update height read-out dynamically based on selection
      let heightText = '+40m';
      if (levelNum === '2') heightText = '+20m';
      if (levelNum === '3') heightText = '+0m';

      heightLabel.textContent = heightText;
      heightLabel.style.color = color;
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('pyramid-tabs-container') as HTMLDivElement | null;
if (container) {
  const levels = container.querySelectorAll('.pyramid-level');
  const heightLabel = container.querySelector('#pyramid-height-label') as HTMLSpanElement;

  levels.forEach(level => {
    const levelEl = level as HTMLDivElement;
    levelEl.addEventListener('click', () => {
      levels.forEach(l => (l as HTMLElement).classList.remove('active'));
      levelEl.classList.add('active');

      const color = levelEl.getAttribute('data-color') || '#00ff66';
      const levelNum = levelEl.getAttribute('data-level') || '1';

      let heightText = '+40m';
      if (levelNum === '2') heightText = '+20m';
      if (levelNum === '3') heightText = '+0m';

      if (heightLabel) {
        heightLabel.textContent = heightText;
        heightLabel.style.color = color;
      }
    });
  });
}`,
  css: `/* Isometric Pyramid Tabs styles */
.pyramid-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #0b0f14 0%, #030507 100%);
  border: 1px solid rgba(0, 255, 102, 0.12);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  gap: 20px;
}

.pyramid-scene {
  position: relative;
  width: 200px;
  height: 150px;
  transform: rotateX(60deg) rotateZ(-45deg);
  transform-style: preserve-3d;
}

/* Common Platform Faces */
.pyramid-level {
  position: absolute;
  transform-style: preserve-3d;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.pyramid-face {
  position: absolute;
  box-sizing: border-box;
}

/* Level 3 (Base) sizing & position */
.level-3 {
  width: 140px;
  height: 140px;
  top: 5px;
  left: 5px;
  transform: translateZ(0px);
}
.level-3 .face-top {
  width: 140px;
  height: 140px;
  background: rgba(20, 10, 30, 0.8);
  border: 2px solid rgba(255, 0, 127, 0.2);
}
.level-3 .face-left {
  width: 140px;
  height: 18px;
  background: #4a0025;
  transform: rotateX(-90deg) translateZ(122px);
  transform-origin: bottom center;
}
.level-3 .face-right {
  width: 18px;
  height: 140px;
  background: #36001a;
  transform: rotateY(90deg) translateZ(122px);
  transform-origin: center right;
}

/* Level 2 (Middle) sizing & position */
.level-2 {
  width: 100px;
  height: 100px;
  top: 25px;
  left: 25px;
  transform: translateZ(18px);
}
.level-2 .face-top {
  width: 100px;
  height: 100px;
  background: rgba(10, 20, 30, 0.85);
  border: 2px solid rgba(0, 242, 254, 0.2);
}
.level-2 .face-left {
  width: 100px;
  height: 18px;
  background: #004c54;
  transform: rotateX(-90deg) translateZ(82px);
  transform-origin: bottom center;
}
.level-2 .face-right {
  width: 18px;
  height: 100px;
  background: #00363c;
  transform: rotateY(90deg) translateZ(82px);
  transform-origin: center right;
}

/* Level 1 (Apex) sizing & position */
.level-1 {
  width: 60px;
  height: 60px;
  top: 45px;
  left: 45px;
  transform: translateZ(36px);
}
.level-1 .face-top {
  width: 60px;
  height: 60px;
  background: rgba(10, 30, 20, 0.9);
  border: 2px solid rgba(0, 255, 102, 0.2);
}
.level-1 .face-left {
  width: 60px;
  height: 18px;
  background: #005422;
  transform: rotateX(-90deg) translateZ(42px);
  transform-origin: bottom center;
}
.level-1 .face-right {
  width: 18px;
  height: 60px;
  background: #003c18;
  transform: rotateY(90deg) translateZ(42px);
  transform-origin: center right;
}

/* Face Top styles */
.face-top {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.05);
}

.level-tag {
  font-family: 'Fira Code', monospace;
  font-size: 8px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.4);
  transform: rotateZ(45deg);
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

/* Hover effect */
.pyramid-level:hover {
  filter: brightness(1.2);
}

/* Pressed/Depressed active state animations */
.level-3.active {
  transform: translateZ(-8px);
}
.level-3.active .face-top {
  border-color: #ff007f;
  background: rgba(255, 0, 127, 0.15);
  box-shadow: 0 0 15px rgba(255, 0, 127, 0.4), inset 0 0 15px rgba(255, 0, 127, 0.2);
}
.level-3.active .level-tag {
  color: #ff007f;
}

.level-2.active {
  transform: translateZ(10px);
}
.level-2.active .face-top {
  border-color: #00f2fe;
  background: rgba(0, 242, 254, 0.15);
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.4), inset 0 0 15px rgba(0, 242, 254, 0.2);
}
.level-2.active .level-tag {
  color: #00f2fe;
}

.level-1.active {
  transform: translateZ(28px);
}
.level-1.active .face-top {
  border-color: #00ff66;
  background: rgba(0, 255, 102, 0.15);
  box-shadow: 0 0 15px rgba(0, 255, 102, 0.4), inset 0 0 15px rgba(0, 255, 102, 0.2);
}
.level-1.active .level-tag {
  color: #00ff66;
}

.pyramid-status {
  font-family: 'Fira Code', monospace;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 1px;
}

#pyramid-height-label {
  font-weight: 900;
  transition: color 0.4s ease;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#0b0f14] to-[#030507] border border-emerald-500/10 rounded-3xl flex flex-col items-center justify-center overflow-hidden gap-5" id="pyramid-tabs-container">
  <div class="relative w-[200px] h-[150px] [transform:rotateX(60deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
    
    <!-- Level 3 (Base) -->
    <div class="absolute w-[140px] h-[140px] top-[5px] left-[5px] [transform-style:preserve-3d] cursor-pointer transition-all duration-[400ms] ease-out level-3 active" data-level="3" data-height="-20px" data-color="#ff007f" style="transform: translateZ(0px);">
      <div class="absolute inset-0 bg-[#140a1e]/80 border-2 border-pink-500/20 flex items-center justify-center shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] face-top">
        <span class="font-mono text-[8px] font-black text-white/40 rotate-45 tracking-wider level-tag">BASE_03</span>
      </div>
      <div class="absolute w-[140px] h-[18px] bg-[#4a0025] [transform:rotateX(-90deg)_translateZ(122px)] origin-bottom face-left"></div>
      <div class="absolute w-[18px] h-[140px] bg-[#36001a] [transform:rotateY(90deg)_translateZ(122px)] origin-right face-right"></div>
    </div>

    <!-- Level 2 (Middle) -->
    <div class="absolute w-[100px] h-[100px] top-[25px] left-[25px] [transform-style:preserve-3d] cursor-pointer transition-all duration-[400ms] ease-out level-2" data-level="2" data-height="0px" data-color="#00f2fe" style="transform: translateZ(18px);">
      <div class="absolute inset-0 bg-[#0a141e]/85 border-2 border-cyan-500/20 flex items-center justify-center shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] face-top">
        <span class="font-mono text-[8px] font-black text-white/40 rotate-45 tracking-wider level-tag">MID_02</span>
      </div>
      <div class="absolute w-[100px] h-[18px] bg-[#004c54] [transform:rotateX(-90deg)_translateZ(82px)] origin-bottom face-left"></div>
      <div class="absolute w-[18px] h-[100px] bg-[#00363c] [transform:rotateY(90deg)_translateZ(82px)] origin-right face-right"></div>
    </div>

    <!-- Level 1 (Top / Apex) -->
    <div class="absolute w-[60px] h-[60px] top-[45px] left-[45px] [transform-style:preserve-3d] cursor-pointer transition-all duration-[400ms] ease-out level-1" data-level="1" data-height="20px" data-color="#00ff66" style="transform: translateZ(36px);">
      <div class="absolute inset-0 bg-[#0a1e14]/90 border-2 border-emerald-500/20 flex items-center justify-center shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] face-top">
        <span class="font-mono text-[8px] font-black text-white/40 rotate-45 tracking-wider level-tag">APEX_01</span>
      </div>
      <div class="absolute w-[60px] h-[18px] bg-[#005422] [transform:rotateX(-90deg)_translateZ(42px)] origin-bottom face-left"></div>
      <div class="absolute w-[18px] h-[60px] bg-[#003c18] [transform:rotateY(90deg)_translateZ(42px)] origin-right face-right"></div>
    </div>

  </div>

  <div class="font-mono text-[10px] text-white/35 tracking-widest">
    ELEVATION: <span id="pyramid-height-label" class="text-pink-500 font-extrabold transition-colors duration-400">+0m</span>
  </div>
</div>`,
  prompt: 'Design a highly creative 3D stepped isometric pyramid ziggurat-style platform navigation component.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
component.html = component.html.replace('class="pyramid-level level-1 active"', 'class="pyramid-level level-1 active"');
component.tailwind = component.tailwind.replace('level-3 active', 'level-3'); // Correct base state
component.tailwind = component.tailwind.replace('level-1', 'level-1 active'); // Set top active
component.tailwind = component.tailwind.replace('translate-pink', 'pink');
