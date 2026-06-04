/**
 * Component: Retro Arcade Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'retro-arcade-sidebar',
  name: 'Retro Arcade Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="retro-sidebar-container">
  <aside class="retro-sidebar">
    <div class="rs-header">
      <h1 class="rs-title">PLAYER 1</h1>
      <div class="rs-score">SCORE: 99420</div>
    </div>

    <nav class="rs-nav">
      <a href="#" class="rs-item active">
        <span class="rs-cursor">▶</span>
        <span class="rs-text">START GAME</span>
      </a>
      <a href="#" class="rs-item">
        <span class="rs-cursor">▶</span>
        <span class="rs-text">HIGH SCORES</span>
      </a>
      <a href="#" class="rs-item">
        <span class="rs-cursor">▶</span>
        <span class="rs-text">OPTIONS</span>
      </a>
      <a href="#" class="rs-item">
        <span class="rs-cursor">▶</span>
        <span class="rs-text">CREDITS</span>
      </a>
    </nav>

    <div class="rs-footer">
      <div class="rs-insert-coin">INSERT COIN</div>
      <div class="rs-credits">CREDITS 3</div>
    </div>
  </aside>
</div>`,
  js: `// Retro Arcade Interactions
const retroItems = document.querySelectorAll('.rs-item');

retroItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    retroItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });

  item.addEventListener('click', (e) => {
    e.preventDefault();
    // Screen flash effect
    document.querySelector('.retro-sidebar-container').style.background = '#fff';
    setTimeout(() => {
      document.querySelector('.retro-sidebar-container').style.background = '#000';
    }, 50);
  });
});`,
  ts: `// Retro Arcade Interactions (TypeScript)
const retroItems = document.querySelectorAll<HTMLAnchorElement>('.rs-item');

retroItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    retroItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });

  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    // Screen flash effect
    const container = document.querySelector<HTMLDivElement>('.retro-sidebar-container');
    if(container) {
      container.style.background = '#fff';
      setTimeout(() => {
        container.style.background = '#000';
      }, 50);
    }
  });
});`,
  css: `/* Retro Arcade Sidebar Styles */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.retro-sidebar-container {
  display: flex;
  height: 600px;
  background: #000;
  padding: 1rem;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  transition: background 0.05s;
}

.retro-sidebar {
  width: 300px;
  height: 100%;
  background: #000;
  border: 4px solid #fff;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-shadow: 
    inset 0 0 0 4px #000,
    inset 0 0 0 8px #fff,
    10px 10px 0px #333;
}

.rs-header {
  text-align: center;
  margin-bottom: 4rem;
}

.rs-title {
  color: #ff0000;
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 0px #fff;
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0%, 100% { color: #ff0000; }
  50% { color: #ff5555; }
}

.rs-score {
  color: #fff;
  font-size: 1rem;
}

.rs-nav {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
}

.rs-item {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
}

.rs-cursor {
  opacity: 0;
  margin-right: 1rem;
  color: #ffff00;
}

.rs-item.active .rs-cursor {
  opacity: 1;
  animation: blink 0.5s infinite;
}

.rs-item.active .rs-text {
  color: #ffff00;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.rs-footer {
  text-align: center;
  margin-top: auto;
}

.rs-insert-coin {
  color: #00ffff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  animation: blink 1s infinite;
}

.rs-credits {
  color: #fff;
  font-size: 0.8rem;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a Retro 8-bit Arcade sidebar navigation. Use blocky borders, pixel fonts (like Press Start 2P), bright primary colors (red/yellow/cyan) against a black background, and a blinking cursor for the active state.`
};
