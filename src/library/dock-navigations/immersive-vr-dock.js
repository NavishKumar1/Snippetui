/**
 * Component: Immersive VR Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'immersive-vr-dock',
  name: 'Immersive VR Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="vr-dock-container">
  <div class="vr-world-bg"></div>
  
  <div class="vr-dock-wrapper">
    <nav class="vr-dock">
      <a href="#" class="vr-item">
        <div class="vr-icon-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        </div>
        <span class="vr-label">Home</span>
      </a>

      <a href="#" class="vr-item">
        <div class="vr-icon-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
        </div>
        <span class="vr-label">Library</span>
      </a>

      <a href="#" class="vr-item active">
        <div class="vr-icon-box vr-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"></path></svg>
        </div>
        <span class="vr-label">Play</span>
      </a>

      <a href="#" class="vr-item">
        <div class="vr-icon-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <span class="vr-label">Social</span>
      </a>

      <a href="#" class="vr-item">
        <div class="vr-icon-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </div>
        <span class="vr-label">Settings</span>
      </a>
    </nav>
  </div>
</div>`,
  js: `// Immersive VR Dock 3D perspective tracking
const vrContainer = document.querySelector('.vr-dock-container');
const vrDock = document.querySelector('.vr-dock');
const vrItems = document.querySelectorAll('.vr-item');

vrContainer.addEventListener('mousemove', (e) => {
  const rect = vrContainer.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  // Calculate subtle rotation
  const rotateY = (x / rect.width) * 15; // Max 15 deg
  const rotateX = -(y / rect.height) * 15;
  
  vrDock.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
});

vrContainer.addEventListener('mouseleave', () => {
  vrDock.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

vrItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    vrItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Immersive VR Dock 3D perspective tracking (TypeScript)
const vrContainer = document.querySelector<HTMLDivElement>('.vr-dock-container');
const vrDock = document.querySelector<HTMLElement>('.vr-dock');
const vrItems = document.querySelectorAll<HTMLAnchorElement>('.vr-item');

if (vrContainer && vrDock) {
  vrContainer.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = vrContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate subtle rotation
    const rotateY = (x / rect.width) * 15; // Max 15 deg
    const rotateX = -(y / rect.height) * 15;
    
    vrDock.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
  });

  vrContainer.addEventListener('mouseleave', () => {
    vrDock.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

vrItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    vrItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Immersive VR Dock Styles */
.vr-dock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 100%;
  font-family: 'Outfit', sans-serif;
  position: relative;
  perspective: 1000px;
  background: #000;
  overflow: hidden;
}

.vr-world-bg {
  position: absolute;
  top: -50%; left: -50%; right: -50%; bottom: -50%;
  background: 
    radial-gradient(circle at 50% 50%, rgba(0, 255, 128, 0.1) 0%, transparent 60%),
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 100% 100%, 40px 40px, 40px 40px;
  transform: rotateX(60deg) translateZ(-100px);
  animation: bg-move 20s linear infinite;
  z-index: 1;
}

@keyframes bg-move {
  0% { background-position: 0 0, 0 0, 0 0; }
  100% { background-position: 0 0, 0 400px, 400px 0; }
}

.vr-dock-wrapper {
  position: relative;
  z-index: 10;
  transform-style: preserve-3d;
}

.vr-dock {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  padding: 30px;
  background: rgba(10, 20, 20, 0.6);
  border: 1px solid rgba(0, 255, 128, 0.2);
  border-radius: 30px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  box-shadow: 
    0 20px 50px rgba(0,0,0,0.8),
    inset 0 0 20px rgba(0, 255, 128, 0.1);
}

.vr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transform-style: preserve-3d;
  position: relative;
}

.vr-icon-box {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255,255,255,0.05);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  transform: translateZ(10px);
}

.vr-icon-box.vr-primary {
  width: 72px;
  height: 72px;
  background: rgba(0, 255, 128, 0.1);
  border-color: rgba(0, 255, 128, 0.3);
  color: #00ff80;
  box-shadow: 0 0 20px rgba(0, 255, 128, 0.2);
}

.vr-label {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.4s;
  transform: translateZ(5px);
  opacity: 0;
}

.vr-item:hover .vr-icon-box {
  transform: translateZ(40px);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255,255,255,0.2);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.vr-item:hover .vr-icon-box.vr-primary {
  background: rgba(0, 255, 128, 0.2);
  color: #00ff80;
  border-color: rgba(0, 255, 128, 0.5);
  box-shadow: 0 10px 30px rgba(0, 255, 128, 0.4);
}

.vr-item:hover .vr-label {
  transform: translateZ(20px);
  opacity: 1;
  color: #fff;
}

.vr-item.active .vr-icon-box {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border-color: rgba(255,255,255,0.4);
  transform: translateZ(20px);
}

.vr-item.active .vr-icon-box.vr-primary {
  background: #00ff80;
  color: #000;
  border-color: #00ff80;
  box-shadow: 0 0 30px rgba(0, 255, 128, 0.6);
}

.vr-item.active .vr-label {
  opacity: 1;
  color: #fff;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design an immersive VR-style dock navigation. It should have a 3D perspective effect that tracks mouse movement, and icons that project forward on hover in 3D space.`
};
