/**
 * Component: Floating Island Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'floating-island-dock',
  name: 'Floating Island Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="island-dock-container">
  <nav class="island-dock">
    <a href="#" class="id-item active" data-island="Home">
      <div class="id-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
      </div>
      <div class="id-dot"></div>
    </a>

    <a href="#" class="id-item" data-island="Explore">
      <div class="id-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
      </div>
      <div class="id-dot"></div>
    </a>

    <div class="id-pill-container">
      <a href="#" class="id-item id-pill" data-island="Play">
        <div class="id-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"></path></svg>
        </div>
      </a>
      <div class="id-pill-shadow"></div>
    </div>

    <a href="#" class="id-item" data-island="Library">
      <div class="id-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>
      </div>
      <div class="id-dot"></div>
    </a>

    <a href="#" class="id-item" data-island="Profile">
      <div class="id-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </div>
      <div class="id-dot"></div>
    </a>
  </nav>
</div>`,
  js: `// Floating Island Interactions
const islandItems = document.querySelectorAll('.id-item');

islandItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    if(item.classList.contains('id-pill')) {
      // Pill bounce
      item.style.transform = 'scale(0.9) translateY(4px)';
      setTimeout(() => item.style.transform = '', 150);
      return;
    }
    islandItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Floating Island Interactions (TypeScript)
const islandItems = document.querySelectorAll<HTMLAnchorElement>('.id-item');

islandItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    if(item.classList.contains('id-pill')) {
      // Pill bounce
      item.style.transform = 'scale(0.9) translateY(4px)';
      setTimeout(() => item.style.transform = '', 150);
      return;
    }
    islandItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Floating Island Dock Styles */
.island-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 2.5rem;
  font-family: 'Inter', sans-serif;
  background: radial-gradient(circle at bottom center, #2e1065, #000000 70%);
}

.island-dock {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.75rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  box-shadow: 
    0 20px 40px -10px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -2px 10px rgba(255, 255, 255, 0.02);
  position: relative;
}

.id-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: #a78bfa; /* Light purple */
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.id-item:hover {
  color: #fff;
  transform: translateY(-8px);
}

.id-item.active {
  color: #fff;
}

.id-icon {
  position: relative;
  z-index: 2;
}

.id-dot {
  position: absolute;
  bottom: -8px;
  width: 6px;
  height: 6px;
  background: #c084fc;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 10px #c084fc;
}

.id-item.active .id-dot {
  opacity: 1;
  transform: scale(1);
}

/* Tooltips */
.id-item::before {
  content: attr(data-island);
  position: absolute;
  top: -45px;
  background: #fff;
  color: #000;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 20px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px) scale(0.8);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.id-item:hover::before {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Center Pill */
.id-pill-container {
  position: relative;
  margin: 0 -0.5rem;
  transform: translateY(-15px);
}

.id-pill {
  width: 80px;
  height: 64px;
  background: linear-gradient(135deg, #c084fc, #9333ea);
  border-radius: 32px;
  color: white;
  z-index: 3;
  box-shadow: 
    0 10px 25px rgba(147, 51, 234, 0.5),
    inset 0 2px 4px rgba(255,255,255,0.4);
}

.id-pill:hover {
  transform: translateY(-5px);
  color: white;
  box-shadow: 
    0 15px 35px rgba(147, 51, 234, 0.6),
    inset 0 2px 4px rgba(255,255,255,0.5);
}

.id-pill::before {
  top: -55px; /* Adjust tooltip position for pill */
}

.id-pill-shadow {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 20px;
  background: rgba(147, 51, 234, 0.4);
  filter: blur(15px);
  border-radius: 50%;
  z-index: 1;
  transition: all 0.4s;
}

.id-pill:hover ~ .id-pill-shadow {
  width: 70px;
  filter: blur(20px);
  background: rgba(147, 51, 234, 0.6);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a premium floating island dock. It should have a detached feel with aggressive, buttery-smooth hover states that lift icons. Include a prominent, pill-shaped center action button.`
};
