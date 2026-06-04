/**
 * Component: Origami Folding Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'origami-folding-sidebar',
  name: 'Origami Folding Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="ori-container">
  <button class="ori-toggle">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  </button>

  <aside class="ori-sidebar">
    <nav class="ori-nav">
      <div class="ori-fold" style="--i:1;">
        <a href="#" class="ori-item active">
          <svg class="ori-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          <span class="ori-label">Home</span>
        </a>
      </div>
      
      <div class="ori-fold" style="--i:2;">
        <a href="#" class="ori-item">
          <svg class="ori-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span class="ori-label">About</span>
        </a>
      </div>

      <div class="ori-fold" style="--i:3;">
        <a href="#" class="ori-item">
          <svg class="ori-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span class="ori-label">Services</span>
        </a>
      </div>

      <div class="ori-fold" style="--i:4;">
        <a href="#" class="ori-item">
          <svg class="ori-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span class="ori-label">Events</span>
        </a>
      </div>
      
      <div class="ori-fold" style="--i:5;">
        <a href="#" class="ori-item">
          <svg class="ori-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <span class="ori-label">Contact</span>
        </a>
      </div>
    </nav>
  </aside>
</div>`,
  js: `// Origami Folding Logic
const oriToggle = document.querySelector('.ori-toggle');
const oriSidebar = document.querySelector('.ori-sidebar');
const oriItems = document.querySelectorAll('.ori-item');

oriToggle.addEventListener('click', () => {
  oriSidebar.classList.toggle('open');
});

oriItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    oriItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Origami Folding Logic (TypeScript)
const oriToggle = document.querySelector<HTMLButtonElement>('.ori-toggle');
const oriSidebar = document.querySelector<HTMLElement>('.ori-sidebar');
const oriItems = document.querySelectorAll<HTMLAnchorElement>('.ori-item');

if(oriToggle && oriSidebar) {
  oriToggle.addEventListener('click', () => {
    oriSidebar.classList.toggle('open');
  });
}

oriItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    oriItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Origami Folding Sidebar Styles */
.ori-container {
  display: flex;
  height: 600px;
  background: #eceff1;
  font-family: 'Poppins', sans-serif;
  position: relative;
  perspective: 1200px;
}

.ori-toggle {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  background: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  color: #37474f;
  transition: transform 0.2s;
}

.ori-toggle:hover {
  transform: scale(1.05);
}

.ori-sidebar {
  position: absolute;
  top: 90px;
  left: 20px;
  width: 250px;
  z-index: 90;
}

.ori-nav {
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
}

.ori-fold {
  transform-style: preserve-3d;
  transform-origin: top;
  /* Collapsed state: folded up */
  transform: rotateX(-90deg);
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s;
}

/* Staggered delays for folding out */
.ori-sidebar.open .ori-fold {
  transform: rotateX(0deg);
  opacity: 1;
}

.ori-sidebar.open .ori-fold:nth-child(1) { transition-delay: 0.0s; }
.ori-sidebar.open .ori-fold:nth-child(2) { transition-delay: 0.1s; }
.ori-sidebar.open .ori-fold:nth-child(3) { transition-delay: 0.2s; }
.ori-sidebar.open .ori-fold:nth-child(4) { transition-delay: 0.3s; }
.ori-sidebar.open .ori-fold:nth-child(5) { transition-delay: 0.4s; }

/* Reverse stagger for folding in */
.ori-sidebar:not(.open) .ori-fold:nth-child(1) { transition-delay: 0.4s; }
.ori-sidebar:not(.open) .ori-fold:nth-child(2) { transition-delay: 0.3s; }
.ori-sidebar:not(.open) .ori-fold:nth-child(3) { transition-delay: 0.2s; }
.ori-sidebar:not(.open) .ori-fold:nth-child(4) { transition-delay: 0.1s; }
.ori-sidebar:not(.open) .ori-fold:nth-child(5) { transition-delay: 0.0s; }

.ori-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  color: #37474f;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #cfd8dc;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.ori-item::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, #26a69a, #4db6ac);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  z-index: 1;
}

.ori-item.active::before {
  transform: scaleX(1);
}

.ori-icon, .ori-label {
  position: relative;
  z-index: 2;
  transition: color 0.3s;
}

.ori-icon {
  margin-right: 15px;
}

.ori-item.active {
  color: #ffffff;
  border-bottom-color: transparent;
}

.ori-item:hover:not(.active) {
  background: #f5f7f8;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design an origami folding sidebar. When the toggle button is clicked, the navigation items should unfold downwards one by one, using 3D transforms (rotateX) to simulate paper folding out. Give it a clean, modern aesthetic.`
};
