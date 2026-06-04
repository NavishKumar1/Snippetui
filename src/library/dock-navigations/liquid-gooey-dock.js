/**
 * Component: Liquid Gooey Physics Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'liquid-gooey-dock',
  name: 'Liquid Gooey Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="gooey-dock-container">
  <!-- SVG filter for the gooey effect -->
  <svg width="0" height="0" style="position: absolute;">
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
      <feBlend in="SourceGraphic" in2="goo" />
    </filter>
  </svg>

  <div class="gooey-wrapper">
    <nav class="gooey-dock">
      <div class="gooey-blob"></div>
      
      <a href="#" class="gooey-item active" data-index="0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
      </a>

      <a href="#" class="gooey-item" data-index="1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      </a>

      <a href="#" class="gooey-item" data-index="2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
      </a>

      <a href="#" class="gooey-item" data-index="3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </a>

      <a href="#" class="gooey-item" data-index="4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </a>
    </nav>
  </div>
</div>`,
  js: `// Gooey Physics indicator logic
const gooeyItems = document.querySelectorAll('.gooey-item');
const blob = document.querySelector('.gooey-blob');

function moveBlob(index) {
  if(!blob) return;
  // Width of item is 60px, gap is 0 (handled by padding), container has padding 10px
  // Base offset is 10px left padding. Item center is offset + (index * 60) + 30
  // Blob is 40px wide, so offset it by 20 to center it
  const offset = 10 + (index * 60) + 10; // +10 centers it in the 60px space
  blob.style.transform = \`translateX(\${offset}px)\`;
}

// Init
moveBlob(0);

gooeyItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    gooeyItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    
    const index = parseInt(item.getAttribute('data-index'));
    moveBlob(index);
  });
});`,
  ts: `// Gooey Physics indicator logic (TypeScript)
const gooeyItems = document.querySelectorAll<HTMLAnchorElement>('.gooey-item');
const blob = document.querySelector<HTMLDivElement>('.gooey-blob');

function moveBlob(index: number) {
  if(!blob) return;
  const offset = 10 + (index * 60) + 10;
  blob.style.transform = \`translateX(\${offset}px)\`;
}

// Init
moveBlob(0);

gooeyItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    gooeyItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    
    const index = parseInt(item.getAttribute('data-index') || '0');
    moveBlob(index);
  });
});`,
  css: `/* Liquid Gooey Dock Styles */
.gooey-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 2rem;
  background: #1a1a2e; /* Deep dark background */
}

.gooey-wrapper {
  /* Apply the SVG filter to the wrapper to merge elements */
  filter: url('#goo');
  position: relative;
}

.gooey-dock {
  display: flex;
  align-items: center;
  background: #e94560; /* Vibrant red/pink */
  border-radius: 40px;
  padding: 10px;
  position: relative;
  /* Needs to be opaque for the filter to work correctly */
}

/* The moving liquid blob */
.gooey-blob {
  position: absolute;
  top: 10px;
  left: 0;
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.gooey-item {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #fff;
  z-index: 2;
  transition: color 0.3s;
}

.gooey-item.active {
  color: #e94560; /* Matches dock background when hovering over white blob */
}

.gooey-item svg {
  position: relative;
  z-index: 3;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.gooey-item:hover svg {
  transform: translateY(-4px);
}

.gooey-item.active svg {
  transform: translateY(0);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a liquid gooey physics dock. Utilize an SVG filter (feGaussianBlur and feColorMatrix) applied to the dock container so that a background indicator blob 'melts' and 'snaps' between icons as they are clicked.`
};
