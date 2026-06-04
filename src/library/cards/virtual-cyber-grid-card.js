/**
 * Component: Virtual Reality Cyber Grid Card
 * Category: cards
 */

export const component = {
  id: 'virtual-cyber-grid-card',
  name: 'Virtual Reality Cyber Grid',
  category: 'cards',
  tag: 'Interactive',
  html: `<div class="virtual-grid-card">
  <div class="grid-3d-scene">
    <div class="grid-cube">
      <span class="cube-face face-front"></span>
      <span class="cube-face face-back"></span>
      <span class="cube-face face-top"></span>
      <span class="cube-face face-bottom"></span>
      <span class="cube-face face-left"></span>
      <span class="cube-face face-right"></span>
    </div>
  </div>
  <div class="grid-card-content">
    <span class="grid-card-tag">VIRTUAL MATRIX</span>
    <h3 class="grid-card-title">Isometric Core</h3>
    <p class="grid-card-desc">Projecting spatial bounding coordinates, mapping isometric spatial meshes, and managing rendering pathways.</p>
    <div class="grid-card-footer">
      <span class="grid-card-status">BOUNDING BOX: ACTIVE</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Virtual Reality Cyber Grid 3D Cube Rotation
const virtualGridCard = document.querySelector('.virtual-grid-card');
if (virtualGridCard) {
  const cube = virtualGridCard.querySelector('.grid-cube');
  
  virtualGridCard.addEventListener('mousemove', (e) => {
    const rect = virtualGridCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Rotate cube based on cursor position coordinate offsets
    const rx = ((y / rect.height) - 0.5) * 60; // Max 60deg
    const ry = ((x / rect.width) - 0.5) * -60;
    
    if (cube) {
      cube.style.transform = \`rotateX(\${45 + rx}deg) rotateY(\${45 + ry}deg)\`;
      cube.style.transition = 'none';
    }
  });

  virtualGridCard.addEventListener('mouseleave', () => {
    if (cube) {
      cube.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
      cube.style.transform = 'rotateX(45deg) rotateY(45deg)';
    }
  });
}`,
  ts: `// TypeScript Implementation
const virtualGridCard = document.querySelector<HTMLDivElement>('.virtual-grid-card');
if (virtualGridCard) {
  const cube = virtualGridCard.querySelector<HTMLDivElement>('.grid-cube');
  
  virtualGridCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = virtualGridCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rx = ((y / rect.height) - 0.5) * 60;
    const ry = ((x / rect.width) - 0.5) * -60;
    
    if (cube) {
      cube.style.transform = \`rotateX(\${45 + rx}deg) rotateY(\${45 + ry}deg)\`;
      cube.style.transition = 'none';
    }
  });

  virtualGridCard.addEventListener('mouseleave', () => {
    if (cube) {
      cube.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
      cube.style.transform = 'rotateX(45deg) rotateY(45deg)';
    }
  });
}`,
  css: `/* Virtual Reality Cyber Grid Card Styles */
.virtual-grid-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #020205;
  border-radius: 16px;
  border: 1px solid rgba(0, 242, 254, 0.2);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.7),
    inset 0 0 10px rgba(0, 242, 254, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.grid-3d-scene {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
  perspective: 400px;
  z-index: 1;
  pointer-events: none;
  opacity: 0.35;
  transition: opacity 0.4s ease;
}

/* 3D Wireframe Bounding Cube */
.grid-cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateY(45deg);
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.cube-face {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid #00f2fe;
  box-shadow: inset 0 0 8px rgba(0, 242, 254, 0.25);
  background: rgba(0, 242, 254, 0.02);
}

/* Face transforms */
.face-front  { transform: rotateY(0deg) translateZ(50px); }
.face-back   { transform: rotateY(180deg) translateZ(50px); }
.face-top    { transform: rotateX(90deg) translateZ(50px); }
.face-bottom { transform: rotateX(-90deg) translateZ(50px); }
.face-left   { transform: rotateY(-90deg) translateZ(50px); }
.face-right  { transform: rotateY(90deg) translateZ(50px); }

.grid-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #020205 60%, rgba(2, 2, 5, 0.1) 100%);
}

.grid-card-tag {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 12px;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.3);
}

.grid-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.grid-card-desc {
  color: #8fa0b5;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.grid-card-footer {
  border-top: 1px solid rgba(0, 242, 254, 0.2);
  padding-top: 15px;
}

.grid-card-status {
  color: #ff007f;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(255, 0, 127, 0.3);
}

/* Hover grid scanner sweeps */
.virtual-grid-card:hover {
  border-color: rgba(0, 242, 254, 0.65);
  box-shadow: 
    0 20px 45px rgba(0, 242, 254, 0.28),
    0 0 20px rgba(0, 242, 254, 0.15),
    inset 0 0 15px rgba(0, 242, 254, 0.15);
  transform: translateY(-2px);
}

.virtual-grid-card:hover .grid-3d-scene {
  opacity: 0.9;
}

.virtual-grid-card:hover .grid-cube .cube-face {
  border-color: #ff007f;
  box-shadow: inset 0 0 12px rgba(255, 0, 127, 0.35);
}

.virtual-grid-card:hover .grid-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#020205] rounded-2xl border border-[#00f2fe]/20 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:border-[#00f2fe]/65 hover:shadow-[0_20px_45px_rgba(0,242,254,0.28)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#00f2fe] tracking-widest mb-3">VIRTUAL MATRIX</div>
    <div class="font-bold text-2xl text-white mb-2.5">Isometric Core</div>
    <div class="text-xs text-[#8fa0b5] leading-relaxed mb-6">Projecting spatial bounding coordinates, mapping isometric spatial meshes, and managing rendering pathways.</div>
    <div class="border-t border-[#00f2fe]/20 pt-4 text-fuchsia-500 font-bold text-xs tracking-wider">
      BOUNDING BOX: ACTIVE
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Virtual Reality Cyber Grid Card" component. An isometric coordinate grid container shows a rotating 3D wireframe bounding cube that tilts dynamically to follow the cursor coordinate tracker.`
};
