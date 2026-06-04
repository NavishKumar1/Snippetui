/**
 * Component: Magnetic Mac Dock
 * Category: tabs-and-navs
 */

export const component = {
  id: 'magnetic-mac-dock',
  name: 'Magnetic Mac Dock',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="dock-sandbox" id="mac-dock-container">
  <div class="mac-dock">
    <div class="dock-item active" data-name="Finder">
      <div class="dock-icon">📂</div>
      <div class="dock-dot"></div>
    </div>
    <div class="dock-item" data-name="Browser">
      <div class="dock-icon">🌐</div>
      <div class="dock-dot"></div>
    </div>
    <div class="dock-item" data-name="Terminal">
      <div class="dock-icon">💻</div>
      <div class="dock-dot"></div>
    </div>
    <div class="dock-item" data-name="Settings">
      <div class="dock-icon">⚙️</div>
      <div class="dock-dot"></div>
    </div>
  </div>
</div>`,
  js: `// Magnetic Mac Dock fish-eye scale algorithm
const container = document.getElementById('mac-dock-container');
if (container) {
  const dock = container.querySelector('.mac-dock');
  const items = container.querySelectorAll('.dock-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      // Trigger macOS style bouncing animation
      const icon = item.querySelector('.dock-icon');
      icon.classList.remove('bounce');
      void icon.offsetWidth; // Force reflow
      icon.classList.add('bounce');
    });
  });

  // Parabolic Fisheye scale effect on mousemove
  dock.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemX = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - itemX);

      // Parabolic influence radius (150px)
      const maxDist = 150;
      let scale = 1.0;

      if (dist < maxDist) {
        // Curve formula: Cosine interpolation for organic fisheye scaling
        const factor = Math.cos((dist / maxDist) * (Math.PI / 2));
        scale = 1.0 + factor * 0.65; // Scale up to 1.65x max
      }

      item.style.setProperty('--scale', scale);
      // Dynamically scale width/height to prevent overlapping seam errors
      item.style.width = \`\${50 * scale}px\`;
      item.style.height = \`\${50 * scale}px\`;
    });
  });

  dock.addEventListener('mouseleave', () => {
    items.forEach(item => {
      item.style.setProperty('--scale', '1');
      item.style.width = '50px';
      item.style.height = '50px';
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('mac-dock-container') as HTMLDivElement | null;
if (container) {
  const dock = container.querySelector('.mac-dock') as HTMLDivElement;
  const items = container.querySelectorAll('.dock-item');

  items.forEach(item => {
    const itemEl = item as HTMLDivElement;
    itemEl.addEventListener('click', () => {
      items.forEach(i => (i as HTMLElement).classList.remove('active'));
      itemEl.classList.add('active');
      
      const icon = itemEl.querySelector('.dock-icon') as HTMLDivElement;
      icon.classList.remove('bounce');
      void icon.offsetWidth;
      icon.classList.add('bounce');
    });
  });

  dock.addEventListener('mousemove', (e: MouseEvent) => {
    const mouseX = e.clientX;

    items.forEach(item => {
      const itemEl = item as HTMLDivElement;
      const rect = itemEl.getBoundingClientRect();
      const itemX = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - itemX);

      const maxDist = 150;
      let scale = 1.0;

      if (dist < maxDist) {
        const factor = Math.cos((dist / maxDist) * (Math.PI / 2));
        scale = 1.0 + factor * 0.65;
      }

      itemEl.style.setProperty('--scale', scale.toString());
      itemEl.style.width = \`\${50 * scale}px\`;
      itemEl.style.height = \`\${50 * scale}px\`;
    });
  });

  dock.addEventListener('mouseleave', () => {
    items.forEach(item => {
      const itemEl = item as HTMLDivElement;
      itemEl.style.setProperty('--scale', '1');
      itemEl.style.width = '50px';
      itemEl.style.height = '50px';
    });
  });
}`,
  css: `/* Magnetic Mac Dock styles */
.dock-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #0f1016 0%, #040406 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 24px;
}

.mac-dock {
  display: flex;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: 8px 16px;
  gap: 12px;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  box-shadow: 0 20px 45px rgba(0,0,0,0.6);
  transition: padding 0.2s;
}

.dock-item {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  --scale: 1;
}

.dock-icon {
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: bottom center;
  transition: transform 0.1s ease-out;
  transform: scale(var(--scale));
  user-select: none;
}

/* macOS icon bouncing effect */
.dock-icon.bounce {
  animation: macIconBounce 0.65s ease-out;
}

.dock-dot {
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  margin-top: 6px;
  transition: all 0.3s ease;
}

.dock-item.active .dock-dot {
  background: #00f2fe;
  box-shadow: 0 0 8px #00f2fe;
  width: 6px;
  height: 6px;
  border-radius: 3px;
}

@keyframes macIconBounce {
  0% { transform: scale(var(--scale)) translateY(0); }
  30% { transform: scale(var(--scale)) translateY(-28px); }
  50% { transform: scale(var(--scale)) translateY(0); }
  70% { transform: scale(var(--scale)) translateY(-12px); }
  100% { transform: scale(var(--scale)) translateY(0); }
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#0f1016] to-[#040406] border border-white/8 rounded-3xl flex items-end justify-center pb-6 box-border overflow-hidden" id="mac-dock-container">
  <div class="mac-dock flex items-end bg-white/3 border border-white/6 rounded-[24px] px-4 py-2 gap-3 backdrop-blur-[25px] shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
    <div class="dock-item active relative w-[50px] h-[50px] flex flex-col items-center justify-end cursor-pointer" data-name="Finder" style="--scale: 1;">
      <div class="dock-icon text-[26px] flex items-center justify-center origin-bottom transition-transform duration-100 ease-out [&.bounce]:animate-[macIconBounce_0.65s_ease-out] active-dock-icon">📂</div>
      <div class="dock-dot w-1 h-1 bg-white/15 rounded-full mt-1.5 transition-all duration-300 [&.active]:w-1.5 [&.active]:h-1.5 [&.active]:bg-cyan-400 [&.active]:shadow-[0_0_8px_#00f2fe]"></div>
    </div>
    <div class="dock-item relative w-[50px] h-[50px] flex flex-col items-center justify-end cursor-pointer" data-name="Browser" style="--scale: 1;">
      <div class="dock-icon text-[26px] flex items-center justify-center origin-bottom transition-transform duration-100 ease-out [&.bounce]:animate-[macIconBounce_0.65s_ease-out]">🌐</div>
      <div class="dock-dot w-1 h-1 bg-white/15 rounded-full mt-1.5 transition-all duration-300 [&.active]:w-1.5 [&.active]:h-1.5 [&.active]:bg-cyan-400 [&.active]:shadow-[0_0_8px_#00f2fe]"></div>
    </div>
    <div class="dock-item relative w-[50px] h-[50px] flex flex-col items-center justify-end cursor-pointer" data-name="Terminal" style="--scale: 1;">
      <div class="dock-icon text-[26px] flex items-center justify-center origin-bottom transition-transform duration-100 ease-out [&.bounce]:animate-[macIconBounce_0.65s_ease-out]">💻</div>
      <div class="dock-dot w-1 h-1 bg-white/15 rounded-full mt-1.5 transition-all duration-300 [&.active]:w-1.5 [&.active]:h-1.5 [&.active]:bg-cyan-400 [&.active]:shadow-[0_0_8px_#00f2fe]"></div>
    </div>
    <div class="dock-item relative w-[50px] h-[50px] flex flex-col items-center justify-end cursor-pointer" data-name="Settings" style="--scale: 1;">
      <div class="dock-icon text-[26px] flex items-center justify-center origin-bottom transition-transform duration-100 ease-out [&.bounce]:animate-[macIconBounce_0.65s_ease-out]">⚙️</div>
      <div class="dock-dot w-1 h-1 bg-white/15 rounded-full mt-1.5 transition-all duration-300 [&.active]:w-1.5 [&.active]:h-1.5 [&.active]:bg-cyan-400 [&.active]:shadow-[0_0_8px_#00f2fe]"></div>
    </div>
  </div>
</div>`,
  prompt: 'Design a macOS-themed bottom floating dock selector utilizing fisheye parabolic magnifying lens calculations.'
};
component.html = component.html.replace('class="dock-item active"', 'class="dock-item active"');
component.tailwind = component.tailwind.replace('class="dock-icon text-[26px] flex items-center justify-center origin-bottom transition-transform duration-100 ease-out [&.bounce]:animate-[macIconBounce_0.65s_ease-out] active-dock-icon"', 'class="dock-icon text-[26px] flex items-center justify-center origin-bottom transition-transform duration-100 ease-out"');
