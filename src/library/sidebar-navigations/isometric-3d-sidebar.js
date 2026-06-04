/**
 * Component: Isometric 3D Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'isometric-3d-sidebar',
  name: 'Isometric 3D Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="iso-container">
  <div class="iso-scene">
    <aside class="iso-sidebar">
      <nav class="iso-nav">
        <a href="#" class="iso-item active" style="--i:0;">
          <div class="iso-face iso-front">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span>HOME</span>
          </div>
          <div class="iso-face iso-top"></div>
          <div class="iso-face iso-right"></div>
        </a>

        <a href="#" class="iso-item" style="--i:1;">
          <div class="iso-face iso-front">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>APPS</span>
          </div>
          <div class="iso-face iso-top"></div>
          <div class="iso-face iso-right"></div>
        </a>

        <a href="#" class="iso-item" style="--i:2;">
          <div class="iso-face iso-front">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21"></path><path d="M16 16l-4-4-4 4"></path></svg>
            <span>CLOUD</span>
          </div>
          <div class="iso-face iso-top"></div>
          <div class="iso-face iso-right"></div>
        </a>

        <a href="#" class="iso-item" style="--i:3;">
          <div class="iso-face iso-front">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span>CFG</span>
          </div>
          <div class="iso-face iso-top"></div>
          <div class="iso-face iso-right"></div>
        </a>
      </nav>
    </aside>
  </div>
</div>`,
  js: `// Isometric Hover Logic
const isoItems = document.querySelectorAll('.iso-item');

isoItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    isoItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Isometric Hover Logic (TypeScript)
const isoItems = document.querySelectorAll<HTMLAnchorElement>('.iso-item');

isoItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    isoItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Isometric 3D Sidebar Styles */
.iso-container {
  display: flex;
  height: 600px;
  background: #2b3a4a;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  align-items: center;
  padding-left: 2rem;
}

.iso-scene {
  perspective: 1500px;
}

.iso-sidebar {
  transform: rotateX(60deg) rotateZ(-45deg);
  transform-style: preserve-3d;
  width: 120px;
}

.iso-nav {
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform-style: preserve-3d;
}

.iso-item {
  position: relative;
  width: 120px;
  height: 120px;
  display: block;
  text-decoration: none;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.iso-item:hover, .iso-item.active {
  transform: translateZ(30px);
}

.iso-face {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  transition: background 0.3s;
}

/* Front Face (Top of block in iso view) */
.iso-front {
  background: #ff5e62;
  transform: translateZ(20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
}
.iso-front span {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
}

/* Right Face */
.iso-right {
  width: 20px;
  background: #cc4b4e;
  transform: rotateY(90deg) translateZ(100px);
}

/* Bottom/Top Face */
.iso-top {
  height: 20px;
  background: #ff9999;
  transform: rotateX(90deg) translateZ(20px);
}

/* Active/Hover Colors */
.iso-item:hover .iso-front, .iso-item.active .iso-front { background: #ff9966; }
.iso-item:hover .iso-right, .iso-item.active .iso-right { background: #cc7a52; }
.iso-item:hover .iso-top, .iso-item.active .iso-top { background: #ffccb3; }

/* Staggered entry animation */
.iso-item {
  animation: iso-drop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes iso-drop {
  0% { transform: translateZ(200px); opacity: 0; }
  100% { transform: translateZ(0); opacity: 1; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a 3D isometric sidebar. The entire sidebar container should be rotated in 3D space (using rotateX and rotateZ). Individual navigation items should be modeled as 3D blocks (using ::before/::after for faces) that pop out towards the user on hover.`
};
