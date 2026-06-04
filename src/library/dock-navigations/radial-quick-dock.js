/**
 * Component: Radial Quick Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'radial-quick-dock',
  name: 'Radial Quick Menu Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="radial-dock-container">
  <div class="rd-wrapper">
    <!-- Center Button -->
    <button class="rd-center-btn">
      <svg class="rd-plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </button>
    
    <!-- Menu Items -->
    <div class="rd-menu">
      <a href="#" class="rd-item" style="--i: 0;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
      <a href="#" class="rd-item" style="--i: 1;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
      </a>
      <a href="#" class="rd-item" style="--i: 2;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
      <a href="#" class="rd-item" style="--i: 3;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      </a>
      <a href="#" class="rd-item" style="--i: 4;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      </a>
    </div>
  </div>
</div>`,
  js: `// Radial Menu Toggle
const centerBtn = document.querySelector('.rd-center-btn');
const wrapper = document.querySelector('.rd-wrapper');
const rdItems = document.querySelectorAll('.rd-item');

if(centerBtn && wrapper) {
  centerBtn.addEventListener('click', () => {
    wrapper.classList.toggle('active');
  });
}

rdItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    rdItems.forEach(n => n.classList.remove('selected'));
    item.classList.add('selected');
    setTimeout(() => {
      wrapper.classList.remove('active');
    }, 300);
  });
});`,
  ts: `// Radial Menu Toggle (TypeScript)
const centerBtn = document.querySelector<HTMLButtonElement>('.rd-center-btn');
const wrapper = document.querySelector<HTMLDivElement>('.rd-wrapper');
const rdItems = document.querySelectorAll<HTMLAnchorElement>('.rd-item');

if(centerBtn && wrapper) {
  centerBtn.addEventListener('click', () => {
    wrapper.classList.toggle('active');
  });
}

rdItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    rdItems.forEach(n => n.classList.remove('selected'));
    item.classList.add('selected');
    setTimeout(() => {
      wrapper.classList.remove('active');
    }, 300);
  });
});`,
  css: `/* Radial Quick Dock Styles */
.radial-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 300px;
  width: 100%;
  padding-bottom: 3rem;
  background: #111; /* Dark context */
  font-family: 'Inter', sans-serif;
}

.rd-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rd-center-btn {
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff3366, #ff9933);
  border: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 10px 20px rgba(255, 51, 102, 0.4);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.rd-center-btn:hover {
  transform: scale(1.05);
}

.rd-plus {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.rd-wrapper.active .rd-plus {
  transform: rotate(225deg);
}

.rd-menu {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
}

.rd-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  margin-top: -24px;
  margin-left: -24px;
  background: #222;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  /* The magic math for radial positioning */
  --angle: calc(var(--i) * (180deg / 4) + 180deg); 
  --radius: 80px;
}

/* Semi-circle positioning above the button */
.rd-wrapper.active .rd-item {
  opacity: 1;
  transform: rotate(var(--angle)) translateY(var(--radius)) rotate(calc(var(--angle) * -1)) scale(1);
}

/* Staggered delay */
.rd-item:nth-child(1) { transition-delay: 0.02s; }
.rd-item:nth-child(2) { transition-delay: 0.04s; }
.rd-item:nth-child(3) { transition-delay: 0.06s; }
.rd-item:nth-child(4) { transition-delay: 0.08s; }
.rd-item:nth-child(5) { transition-delay: 0.1s; }

.rd-item:hover {
  background: #ff3366;
  border-color: #ff3366;
  color: white;
  transform: rotate(var(--angle)) translateY(calc(var(--radius) + 5px)) rotate(calc(var(--angle) * -1)) scale(1.1) !important;
}

.rd-item.selected {
  background: white;
  color: #ff3366;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a radial quick-menu style dock. It should feature a central action button that, when clicked, fans out into a semi-circle of secondary icons with staggered buttery animations.`
};
