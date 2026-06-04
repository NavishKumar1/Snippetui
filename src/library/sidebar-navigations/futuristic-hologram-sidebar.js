/**
 * Component: Futuristic Hologram Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'futuristic-hologram-sidebar',
  name: 'Futuristic Hologram Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="fhs-container">
  <!-- Holographic projector base -->
  <div class="fhs-projector"></div>

  <aside class="fhs-sidebar">
    <div class="fhs-scan-line"></div>
    
    <div class="fhs-header">
      <div class="fhs-logo-container">
        <svg class="fhs-logo" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 22 12 17 22 22 12 2"></polygon></svg>
      </div>
      <h2 class="fhs-title">VANGUARD OS</h2>
    </div>

    <div class="fhs-content">
      <nav class="fhs-nav">
        <div class="fhs-item-wrapper active">
          <a href="#" class="fhs-item">
            <span class="fhs-bracket">[</span>
            <span class="fhs-label">OPERATIONS</span>
            <span class="fhs-bracket">]</span>
          </a>
          <div class="fhs-sub-nav">
            <a href="#" class="fhs-sub-item">Mission Log</a>
            <a href="#" class="fhs-sub-item">Tactical Map</a>
          </div>
        </div>

        <div class="fhs-item-wrapper">
          <a href="#" class="fhs-item">
            <span class="fhs-bracket">[</span>
            <span class="fhs-label">ARMORY</span>
            <span class="fhs-bracket">]</span>
          </a>
          <div class="fhs-sub-nav">
            <a href="#" class="fhs-sub-item">Loadouts</a>
            <a href="#" class="fhs-sub-item">Upgrades</a>
          </div>
        </div>

        <div class="fhs-item-wrapper">
          <a href="#" class="fhs-item">
            <span class="fhs-bracket">[</span>
            <span class="fhs-label">COMMUNICATIONS</span>
            <span class="fhs-bracket">]</span>
          </a>
        </div>
      </nav>
    </div>

    <div class="fhs-footer">
      <div class="fhs-status">SYSTEM NORMAL // 98%</div>
    </div>
  </aside>
</div>`,
  js: `// Hologram Sidebar Interactions
const fhsWrappers = document.querySelectorAll('.fhs-item-wrapper');

fhsWrappers.forEach(wrapper => {
  const item = wrapper.querySelector('.fhs-item');
  
  item.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Toggle active state for accordion effect
    if (wrapper.classList.contains('active')) {
      wrapper.classList.remove('active');
    } else {
      fhsWrappers.forEach(w => w.classList.remove('active'));
      wrapper.classList.add('active');
    }
  });
});`,
  ts: `// Hologram Sidebar Interactions (TypeScript)
const fhsWrappers = document.querySelectorAll<HTMLDivElement>('.fhs-item-wrapper');

fhsWrappers.forEach(wrapper => {
  const item = wrapper.querySelector<HTMLAnchorElement>('.fhs-item');
  
  if (item) {
    item.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      
      // Toggle active state for accordion effect
      if (wrapper.classList.contains('active')) {
        wrapper.classList.remove('active');
      } else {
        fhsWrappers.forEach(w => w.classList.remove('active'));
        wrapper.classList.add('active');
      }
    });
  }
});`,
  css: `/* Futuristic Hologram Sidebar Styles */
.fhs-container {
  display: flex;
  height: 600px;
  background: #020508;
  padding: 2rem;
  font-family: 'Rajdhani', 'Share Tech Mono', sans-serif;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
}

.fhs-projector {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 100px;
  background: radial-gradient(ellipse, #00f3ff 0%, transparent 70%);
  filter: blur(20px);
  opacity: 0.5;
  z-index: 1;
}

.fhs-sidebar {
  width: 280px;
  height: 100%;
  background: rgba(0, 20, 30, 0.4);
  border: 1px solid rgba(0, 243, 255, 0.3);
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  /* Hologram Effect */
  box-shadow: 
    0 0 15px rgba(0, 243, 255, 0.1),
    inset 0 0 20px rgba(0, 243, 255, 0.1);
  backdrop-filter: blur(4px);
  transform: rotateY(5deg);
  transform-style: preserve-3d;
}

.fhs-scan-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: rgba(0, 243, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.8);
  animation: hologram-scan 4s linear infinite;
  pointer-events: none;
}

@keyframes hologram-scan {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.fhs-header {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
}

.fhs-logo {
  color: #00f3ff;
  filter: drop-shadow(0 0 5px #00f3ff);
  animation: pulse-holo 2s infinite alternate;
}

@keyframes pulse-holo {
  0% { opacity: 0.7; filter: drop-shadow(0 0 2px #00f3ff); }
  100% { opacity: 1; filter: drop-shadow(0 0 10px #00f3ff); }
}

.fhs-title {
  margin: 1rem 0 0 0;
  color: #fff;
  font-size: 1.5rem;
  letter-spacing: 3px;
  text-shadow: 0 0 5px #00f3ff;
}

.fhs-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}
.fhs-content::-webkit-scrollbar { display: none; }

.fhs-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fhs-item-wrapper {
  display: flex;
  flex-direction: column;
}

.fhs-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: rgba(0, 243, 255, 0.6);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 2px;
  padding: 0.5rem 0;
  transition: all 0.3s;
}

.fhs-item:hover, .fhs-item-wrapper.active .fhs-item {
  color: #00f3ff;
  text-shadow: 0 0 8px #00f3ff;
}

.fhs-bracket {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s;
}
.fhs-item .fhs-bracket:last-child {
  transform: translateX(10px);
}

.fhs-item:hover .fhs-bracket,
.fhs-item-wrapper.active .fhs-bracket {
  opacity: 1;
  transform: translateX(0);
}

.fhs-sub-nav {
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0, 1, 0, 1);
}

.fhs-item-wrapper.active .fhs-sub-nav {
  max-height: 200px;
  transition: max-height 0.4s ease-in-out;
}

.fhs-sub-item {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 0;
  letter-spacing: 1px;
  position: relative;
  transition: all 0.2s;
}

.fhs-sub-item::before {
  content: '>';
  position: absolute;
  left: -15px;
  color: #00f3ff;
  opacity: 0;
  transition: opacity 0.2s;
}

.fhs-sub-item:hover {
  color: #fff;
}
.fhs-sub-item:hover::before {
  opacity: 1;
}

.fhs-footer {
  padding: 1rem;
  border-top: 1px solid rgba(0, 243, 255, 0.2);
  text-align: center;
}

.fhs-status {
  font-size: 0.8rem;
  color: #00f3ff;
  letter-spacing: 2px;
  animation: glitch-text 5s infinite;
}

@keyframes glitch-text {
  0%, 95%, 100% { opacity: 1; transform: none; }
  96% { opacity: 0.8; transform: skewX(10deg); }
  97% { opacity: 1; transform: skewX(-10deg); }
  98% { opacity: 0.9; transform: none; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a futuristic hologram sidebar interface. Use a transparent blue/cyan color palette with glowing borders, scan line animations, and perspective tilting to simulate a 3D projected interface.`
};
