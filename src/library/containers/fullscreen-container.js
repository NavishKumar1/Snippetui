/**
 * Component: Fullscreen Container
 * Category: containers
 */

export const component = {
  id: 'fullscreen-container',
  name: 'Fullscreen Container',
  category: 'containers',
  tag: 'Premium',
  html: `<div class="fs-launcher">
  <button class="fs-launch-btn">Enter Fullscreen Experience</button>
</div>

<div class="fs-container">
  <div class="fs-bg" style="background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop');"></div>
  <div class="fs-overlay"></div>
  
  <button class="fs-close-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </button>

  <div class="fs-content">
    <div class="fs-game-info">
      <span class="fs-badge">EARLY ACCESS</span>
      <h1 class="fs-title">NEON DRIFTER</h1>
      <p class="fs-desc">Press Start to begin your journey through the synthwave circuits.</p>
    </div>
    
    <div class="fs-menu">
      <button class="fs-menu-item active" data-text="CONTINUE">CONTINUE</button>
      <button class="fs-menu-item" data-text="NEW GAME">NEW GAME</button>
      <button class="fs-menu-item" data-text="MULTIPLAYER">MULTIPLAYER</button>
      <button class="fs-menu-item" data-text="SETTINGS">SETTINGS</button>
      <button class="fs-menu-item" data-text="QUIT">QUIT</button>
    </div>
  </div>
</div>`,
  js: `// Fullscreen Container Logic
const fsLaunchBtn = document.querySelectorAll('.fs-launch-btn');
const fsContainers = document.querySelectorAll('.fs-container');

fsLaunchBtn.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const container = fsContainers[index];
    if(container) {
      container.classList.add('active');
      // Optional: actually request browser fullscreen
      // if (container.requestFullscreen) {
      //   container.requestFullscreen();
      // }
    }
  });
});

fsContainers.forEach(container => {
  const closeBtn = container.querySelector('.fs-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      container.classList.remove('active');
      // if (document.fullscreenElement) {
      //   document.exitFullscreen();
      // }
    });
  }
  
  // Menu interaction
  const menuItems = container.querySelectorAll('.fs-menu-item');
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      menuItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
});`,
  ts: `// Fullscreen Container Logic (TypeScript)
const fsLaunchBtn = document.querySelectorAll<HTMLButtonElement>('.fs-launch-btn');
const fsContainers = document.querySelectorAll<HTMLDivElement>('.fs-container');

fsLaunchBtn.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const container = fsContainers[index];
    if(container) {
      container.classList.add('active');
    }
  });
});

fsContainers.forEach(container => {
  const closeBtn = container.querySelector<HTMLButtonElement>('.fs-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });
  }
  
  const menuItems = container.querySelectorAll<HTMLButtonElement>('.fs-menu-item');
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      menuItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
});`,
  css: `/* Fullscreen Container Styles */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;700&display=swap');

/* Launcher button styling for demo purposes */
.fs-launcher {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111;
}

.fs-launch-btn {
  padding: 16px 32px;
  background: transparent;
  border: 2px solid #00f0ff;
  color: #00f0ff;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.fs-launch-btn:hover {
  background: rgba(0, 240, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
}

/* The actual Fullscreen Container */
.fs-container {
  /* Using fixed positioning to take over the viewport */
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  padding: 40px 10%;
  
  /* Hidden by default */
  opacity: 0;
  visibility: hidden;
  transform: scale(1.05);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  
  font-family: 'Rajdhani', sans-serif;
}

.fs-container.active {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

.fs-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 1;
  filter: saturate(1.2) contrast(1.1);
}

.fs-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%);
  z-index: 2;
}

.fs-close-btn {
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 10;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(4px);
}

.fs-close-btn:hover {
  background: #fff;
  color: #000;
  transform: rotate(90deg);
}

.fs-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  max-width: 800px;
}

.fs-badge {
  display: inline-block;
  background: #ff0055;
  color: #fff;
  padding: 4px 12px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 20px;
  transform: skewX(-15deg);
}

.fs-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(4rem, 8vw, 8rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1;
  text-shadow: 0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3);
  letter-spacing: -2px;
}

.fs-desc {
  font-size: 1.5rem;
  color: #a0a0a0;
  margin: 20px 0 60px 0;
  max-width: 500px;
}

.fs-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}

.fs-menu-item {
  background: transparent;
  border: none;
  color: #666;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 4px;
  padding: 10px 0;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
  text-align: left;
}

.fs-menu-item::before {
  content: attr(data-text);
  position: absolute;
  top: 10px;
  left: 0;
  color: #fff;
  width: 0;
  overflow: hidden;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.fs-menu-item.active {
  color: transparent; /* Hide base text to show overlay */
}

.fs-menu-item.active::before {
  width: 100%;
  text-shadow: 0 0 15px rgba(255,255,255,0.8);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a Fullscreen Container capable of occupying the entire available viewport while maintaining responsiveness. Support immersive gaming experiences, launchers, and application workspaces. Note: Since this requires taking over the screen, build a launcher button to activate it.`
};
