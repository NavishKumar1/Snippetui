/**
 * Component: Comic Book Pop-Art Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'comic-popart-sidebar',
  name: 'Comic Book Pop-Art Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="comic-container">
  <aside class="comic-sidebar">
    <div class="comic-header">
      <h1 class="comic-title">KAPOW!</h1>
    </div>

    <nav class="comic-nav">
      <a href="#" class="comic-item active">
        <span class="comic-shadow"></span>
        <span class="comic-text">HEROES</span>
      </a>

      <a href="#" class="comic-item">
        <span class="comic-shadow"></span>
        <span class="comic-text">VILLAINS</span>
      </a>

      <a href="#" class="comic-item">
        <span class="comic-shadow"></span>
        <span class="comic-text">ISSUES</span>
      </a>

      <a href="#" class="comic-item">
        <span class="comic-shadow"></span>
        <span class="comic-text">STORE</span>
      </a>
    </nav>
  </aside>
</div>`,
  js: `// Comic Pop-Art Logic
const comicItems = document.querySelectorAll('.comic-item');

comicItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    comicItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Comic Pop-Art Logic (TypeScript)
const comicItems = document.querySelectorAll<HTMLAnchorElement>('.comic-item');

comicItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    comicItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Comic Book Pop-Art Sidebar Styles */
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');

.comic-container {
  display: flex;
  height: 600px;
  background: #ffeb3b; /* Vibrant Yellow */
  background-image: radial-gradient(#f44336 20%, transparent 20%);
  background-size: 15px 15px; /* Halftone pattern */
  font-family: 'Bangers', cursive;
  padding: 20px;
}

.comic-sidebar {
  width: 250px;
  height: 100%;
  background: #fff;
  border: 5px solid #000;
  box-shadow: 10px 10px 0 #000;
  display: flex;
  flex-direction: column;
  position: relative;
  transform: rotate(-2deg);
}

.comic-header {
  padding: 30px 20px;
  text-align: center;
  border-bottom: 5px solid #000;
  background: #2196f3; /* Comic Blue */
  position: relative;
}

.comic-title {
  margin: 0;
  font-size: 48px;
  color: #ffeb3b;
  text-shadow: 4px 4px 0 #f44336, 6px 6px 0 #000;
  letter-spacing: 2px;
  transform: rotate(-5deg);
}

/* Action burst behind title */
.comic-header::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 150px; height: 100px;
  background: #ffeb3b;
  z-index: 0;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  border: 4px solid #000;
  animation: pulse-burst 2s infinite alternate;
}

.comic-title {
  position: relative;
  z-index: 1;
}

@keyframes pulse-burst {
  0% { transform: translate(-50%, -50%) scale(1); }
  100% { transform: translate(-50%, -50%) scale(1.1); }
}

.comic-nav {
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex: 1;
  background: #fff;
}

.comic-item {
  position: relative;
  display: block;
  text-decoration: none;
  cursor: pointer;
  /* Push to make room for shadow */
  margin-bottom: 10px;
}

.comic-shadow {
  position: absolute;
  top: 6px;
  left: 6px;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 1;
  transition: all 0.2s;
}

.comic-text {
  position: relative;
  display: block;
  background: #fff;
  border: 4px solid #000;
  padding: 15px 20px;
  font-size: 24px;
  color: #000;
  z-index: 2;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-align: center;
  letter-spacing: 2px;
}

/* Colors for different items */
.comic-item:nth-child(1) .comic-text { background: #4caf50; color: #fff;}
.comic-item:nth-child(2) .comic-text { background: #9c27b0; color: #fff;}
.comic-item:nth-child(3) .comic-text { background: #ff9800; color: #fff;}
.comic-item:nth-child(4) .comic-text { background: #00bcd4; color: #fff;}

.comic-item:hover .comic-text {
  transform: translate(-4px, -4px);
}

.comic-item:hover .comic-shadow {
  transform: translate(4px, 4px);
}

.comic-item.active .comic-text {
  transform: translate(6px, 6px);
  background: #fff !important;
  color: #000 !important;
}

.comic-item.active .comic-shadow {
  display: none;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a bold, colorful Comic Book Pop-Art sidebar. Use heavy black borders, stark primary colors (yellow, red, blue), halftone background patterns, and the 'Bangers' Google font. Items should have harsh drop shadows that simulate physical offset printing blocks.`
};
