/**
 * Component: Glowing Neon Tube Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'neon-tube-dock',
  name: 'Neon Tube Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="neon-dock-container">
  <nav class="neon-dock">
    <div class="neon-tube"></div>
    
    <a href="#" class="neon-item active" style="--clr: #00ffff;" data-index="0">
      <svg class="neon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
      <span class="neon-label">HOME</span>
    </a>

    <a href="#" class="neon-item" style="--clr: #ff00ff;" data-index="1">
      <svg class="neon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      <span class="neon-label">FILES</span>
    </a>

    <a href="#" class="neon-item" style="--clr: #00ff00;" data-index="2">
      <svg class="neon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
      <span class="neon-label">PLAY</span>
    </a>

    <a href="#" class="neon-item" style="--clr: #ffff00;" data-index="3">
      <svg class="neon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      <span class="neon-label">CHAT</span>
    </a>

    <a href="#" class="neon-item" style="--clr: #ff3333;" data-index="4">
      <svg class="neon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      <span class="neon-label">SYS</span>
    </a>
  </nav>
</div>`,
  js: `// Neon Tube Logic
const neonItems = document.querySelectorAll('.neon-item');
const tube = document.querySelector('.neon-tube');

function moveTube(item) {
  if(!tube) return;
  const index = parseInt(item.getAttribute('data-index'));
  const clr = item.style.getPropertyValue('--clr');
  
  // Update tube position
  const offset = index * 70; // 70px width per item
  tube.style.transform = \`translateX(\${offset}px)\`;
  
  // Update tube color
  tube.style.background = clr;
  tube.style.boxShadow = \`0 0 10px \${clr}, 0 0 20px \${clr}, 0 0 40px \${clr}\`;
}

// Init
moveTube(document.querySelector('.neon-item.active'));

neonItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    neonItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    moveTube(item);
  });
});`,
  ts: `// Neon Tube Logic (TypeScript)
const neonItems = document.querySelectorAll<HTMLAnchorElement>('.neon-item');
const tube = document.querySelector<HTMLDivElement>('.neon-tube');

function moveTube(item: HTMLAnchorElement | null) {
  if(!tube || !item) return;
  const index = parseInt(item.getAttribute('data-index') || '0');
  const clr = item.style.getPropertyValue('--clr');
  
  // Update tube position
  const offset = index * 70; // 70px width per item
  tube.style.transform = \`translateX(\${offset}px)\`;
  
  // Update tube color
  tube.style.background = clr;
  tube.style.boxShadow = \`0 0 10px \${clr}, 0 0 20px \${clr}, 0 0 40px \${clr}\`;
}

// Init
moveTube(document.querySelector<HTMLAnchorElement>('.neon-item.active'));

neonItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    neonItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    moveTube(item);
  });
});`,
  css: `/* Neon Tube Dock Styles */
.neon-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 2rem;
  background: #050505; /* Deep black */
  font-family: 'Courier New', Courier, monospace;
}

.neon-dock {
  display: flex;
  position: relative;
  background: #111;
  padding: 10px;
  border-radius: 16px;
  border: 1px solid #222;
}

/* The glowing tube that slides */
.neon-tube {
  position: absolute;
  top: 0;
  left: 10px;
  width: 70px; /* Width of one item */
  height: 100%;
  border-radius: 12px;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 0.2;
}

/* Base line under the dock */
.neon-dock::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #222;
}

.neon-item {
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #555;
  z-index: 2;
  position: relative;
  transition: color 0.3s;
}

.neon-icon {
  margin-bottom: 5px;
  transition: all 0.3s;
}

.neon-label {
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s;
}

/* Hover Effects */
.neon-item:hover {
  color: var(--clr);
}
.neon-item:hover .neon-icon {
  filter: drop-shadow(0 0 5px var(--clr));
  transform: translateY(-5px);
}
.neon-item:hover .neon-label {
  opacity: 1;
  transform: translateY(-2px);
}

/* Active Effects */
.neon-item.active {
  color: var(--clr);
  text-shadow: 0 0 5px var(--clr);
}
.neon-item.active .neon-icon {
  filter: drop-shadow(0 0 8px var(--clr));
  transform: translateY(-5px);
}
.neon-item.active .neon-label {
  opacity: 1;
  transform: translateY(-2px);
}

/* Flicker effect on active item icon */
.neon-item.active .neon-icon {
  animation: flicker 2s infinite alternate;
}

@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    opacity: 1;
  }
  20%, 24%, 55% {
    opacity: 0.5;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a Glowing Neon Tube Dock. Each icon should have a specific neon color. A background 'tube' should slide to the active item, changing its color and glow dynamically based on the active icon's specific color.`
};
