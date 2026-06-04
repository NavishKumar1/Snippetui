/**
 * Component: Magnetic Gravity Nav
 * Category: tabs-and-navs
 */

export const component = {
  id: 'magnetic-gravity-nav',
  name: 'Magnetic Gravity Nav',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="magnetic-nav-sandbox" id="magnetic-nav-container">
  <div class="magnetic-navbar">
    <div class="magnetic-glow-blob"></div>
    <button class="magnetic-tab-btn active" data-index="0">Home</button>
    <button class="magnetic-tab-btn" data-index="1">Projects</button>
    <button class="magnetic-tab-btn" data-index="2">Labs</button>
    <button class="magnetic-tab-btn" data-index="3">Settings</button>
  </div>
</div>`,
  js: `// Magnetic Gravity Navbar animation
const container = document.getElementById('magnetic-nav-container');
if (container) {
  const buttons = container.querySelectorAll('.magnetic-tab-btn');
  const blob = container.querySelector('.magnetic-glow-blob');
  
  let currentX = 0;
  let currentWidth = 0;
  let targetX = 0;
  let targetWidth = 0;
  let animId = null;

  const updatePosition = () => {
    const activeBtn = container.querySelector('.magnetic-tab-btn.active');
    if (activeBtn) {
      targetX = activeBtn.offsetLeft;
      targetWidth = activeBtn.clientWidth;
    }
  };

  const animate = () => {
    if (!blob.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }

    // High quality spring-like LERP calculations
    const lerpSpeed = 0.12;
    currentX += (targetX - currentX) * lerpSpeed;
    currentWidth += (targetWidth - currentWidth) * lerpSpeed;

    const diff = Math.abs(targetX - currentX);
    // Stretch blob based on speed / distance
    const stretch = Math.min(diff * 0.35, 20);

    blob.style.transform = \`translateX(\${currentX - stretch * 0.1}px) scaleX(\${1 + stretch / currentWidth})\`;
    blob.style.width = \`\${currentWidth}px\`;

    animId = requestAnimationFrame(animate);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updatePosition();
    });

    // Subtly pull active or hovered button with magnetic effect
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = \`translate(\${x * 0.18}px, \${y * 0.18}px)\`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  updatePosition();
  currentX = targetX;
  currentWidth = targetWidth;
  animate();
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('magnetic-nav-container') as HTMLDivElement | null;
if (container) {
  const buttons = container.querySelectorAll('.magnetic-tab-btn');
  const blob = container.querySelector('.magnetic-glow-blob') as HTMLDivElement;
  
  let currentX = 0;
  let currentWidth = 0;
  let targetX = 0;
  let targetWidth = 0;
  let animId: number;

  const updatePosition = () => {
    const activeBtn = container.querySelector('.magnetic-tab-btn.active') as HTMLButtonElement | null;
    if (activeBtn) {
      targetX = activeBtn.offsetLeft;
      targetWidth = activeBtn.clientWidth;
    }
  };

  const animate = () => {
    if (!blob.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }

    const lerpSpeed = 0.12;
    currentX += (targetX - currentX) * lerpSpeed;
    currentWidth += (targetWidth - currentWidth) * lerpSpeed;

    const diff = Math.abs(targetX - currentX);
    const stretch = Math.min(diff * 0.35, 20);

    blob.style.transform = \`translateX(\${currentX - stretch * 0.1}px) scaleX(\${1 + stretch / currentWidth})\`;
    blob.style.width = \`\${currentWidth}px\`;

    animId = requestAnimationFrame(animate);
  };

  buttons.forEach(btn => {
    const buttonEl = btn as HTMLButtonElement;
    buttonEl.addEventListener('click', () => {
      buttons.forEach(b => (b as HTMLElement).classList.remove('active'));
      buttonEl.classList.add('active');
      updatePosition();
    });

    buttonEl.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = buttonEl.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      buttonEl.style.transform = \`translate(\${x * 0.18}px, \${y * 0.18}px)\`;
    });

    buttonEl.addEventListener('mouseleave', () => {
      buttonEl.style.transform = '';
    });
  });

  updatePosition();
  currentX = targetX;
  currentWidth = targetWidth;
  animate();
}`,
  css: `/* Magnetic Gravity Nav styles */
.magnetic-nav-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #0e171b 0%, #05080a 100%);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.magnetic-navbar {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 40px;
  padding: 6px;
  backdrop-filter: blur(15px);
}

.magnetic-glow-blob {
  position: absolute;
  top: 6px;
  left: 0;
  height: calc(100% - 12px);
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  border-radius: 30px;
  z-index: 1;
  pointer-events: none;
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.3);
  transform-origin: left center;
  transition: transform 0.05s linear; /* Smooth micro adjustment */
}

.magnetic-tab-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 24px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s, transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

.magnetic-tab-btn.active {
  color: #03080f;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#0e171b] to-[#05080a] border border-cyan-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="magnetic-nav-container">
  <div class="relative flex bg-white/2 border border-white/6 rounded-full p-1.5 backdrop-blur-md">
    <div class="magnetic-glow-blob absolute top-[6px] left-0 h-[calc(100%-12px)] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full z-10 pointer-events-none shadow-[0_0_20px_rgba(0,242,254,0.4),inset_0_0_8px_rgba(255,255,255,0.3)] origin-left transition-transform duration-50"></div>
    <button class="magnetic-tab-btn active relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-semibold text-white/50 hover:text-white cursor-pointer z-20 transition [&.active]:text-slate-900" data-index="0">Home</button>
    <button class="magnetic-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-semibold text-white/50 hover:text-white cursor-pointer z-20 transition [&.active]:text-slate-900" data-index="1">Projects</button>
    <button class="magnetic-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-semibold text-white/50 hover:text-white cursor-pointer z-20 transition [&.active]:text-slate-900" data-index="2">Labs</button>
    <button class="magnetic-tab-btn relative bg-transparent border-none px-6 py-2.5 font-sans text-xs font-semibold text-white/50 hover:text-white cursor-pointer z-20 transition [&.active]:text-slate-900" data-index="3">Settings</button>
  </div>
</div>`,
  prompt: 'Design a dynamic magnetic spring tab bar navigation with glowing blue fluid indicator capsule blobs and mouse hover pull effects.'
};
